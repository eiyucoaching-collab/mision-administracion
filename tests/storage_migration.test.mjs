import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEYS,
  CURRENT_STORAGE_VERSION,
  migrateHistoryItem,
  sanitizeFailedQuestionIds,
  sanitizeCifrasDrill,
  migrateStorage
} from '../src/storage/migration.js';

// Mock de localStorage en memoria para tests
function createMockStorage(initialData = {}) {
  const store = new Map(Object.entries(initialData));
  return {
    getItem: (key) => store.has(key) ? store.get(key) : null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
    _store: store
  };
}

describe('Storage Migration v1 -> v2 Tests', () => {
  it('sanitizeFailedQuestionIds normaliza strings numéricos, elimina duplicados y descarta inválidos', () => {
    const raw = ['12', 15, '12', -4, 'abc', null, undefined, 42];
    const cleaned = sanitizeFailedQuestionIds(raw);
    assert.deepEqual(cleaned, [12, 15, 42]);
  });

  it('sanitizeCifrasDrill asegura tipos numéricos positivos', () => {
    assert.deepEqual(sanitizeCifrasDrill(null), { bestScore: 0, bestStreak: 0 });
    assert.deepEqual(sanitizeCifrasDrill({ bestScore: '25', bestStreak: -5 }), { bestScore: 25, bestStreak: 0 });
    assert.deepEqual(sanitizeCifrasDrill({ bestScore: 10, bestStreak: 4 }), { bestScore: 10, bestStreak: 4 });
  });

  it('migrateHistoryItem no recalcula notas ni umbrales con supuestos provisionales', () => {
    // Registro v1 con sus propias métricas originales
    const v1Item = {
      id: 'custom_id_123',
      date: '2026-09-01T10:00:00.000Z',
      mode: 'oficial',
      score: 28.45,
      correct: 35,
      wrong: 19,
      blank: 6,
      totalGraded: 60,
      cutoffScore: 30.00,
      passed: false
    };

    const migrated = migrateHistoryItem(v1Item, 0);
    // Debe preservar la nota intacta sin recalcular con fórmulas
    assert.equal(migrated.score, 28.45);
    assert.equal(migrated.cutoffScore, 30.00);
    assert.equal(migrated.passed, false);
    assert.equal(migrated.id, 'custom_id_123');

    // Registro sin nota ni umbral: no debe inventarlos
    const incompleteItem = {
      correct: 10,
      wrong: 5,
      blank: 5
    };
    const migratedIncomplete = migrateHistoryItem(incompleteItem, 1);
    assert.equal(migratedIncomplete.score, undefined);
    assert.equal(migratedIncomplete.cutoffScore, undefined);
    assert.equal(migratedIncomplete.passed, undefined);
    assert.ok(migratedIncomplete.id);
  });

  it('migrateStorage guarda copias de seguridad intactas en claves *_v1_backup antes de migrar', () => {
    const rawHistory = JSON.stringify([{ id: 'old1', score: 25 }]);
    const rawFailed = JSON.stringify(['10', '20', '10']);
    const rawCifras = JSON.stringify({ bestScore: '15', bestStreak: '4' });

    const storage = createMockStorage({
      [STORAGE_KEYS.HISTORY]: rawHistory,
      [STORAGE_KEYS.FAILED_QIDS]: rawFailed,
      [STORAGE_KEYS.CIFRAS_DRILL]: rawCifras
    });

    const res = migrateStorage(storage);
    assert.equal(res.migrated, true);

    // Verificar que las copias de seguridad contienen el valor exacto previo a la migración
    assert.equal(storage.getItem(STORAGE_KEYS.HISTORY_V1_BACKUP), rawHistory);
    assert.equal(storage.getItem(STORAGE_KEYS.FAILED_QIDS_V1_BACKUP), rawFailed);
    assert.equal(storage.getItem(STORAGE_KEYS.CIFRAS_DRILL_V1_BACKUP), rawCifras);

    // Verificar que los datos activos fueron normalizados
    const migratedHistory = JSON.parse(storage.getItem(STORAGE_KEYS.HISTORY));
    assert.equal(migratedHistory[0].score, 25);
    const migratedFailed = JSON.parse(storage.getItem(STORAGE_KEYS.FAILED_QIDS));
    assert.deepEqual(migratedFailed, [10, 20]);
  });

  it('migrateStorage es idempotente y no sobreescribe backups preexistentes', () => {
    const storage = createMockStorage({
      [STORAGE_KEYS.VERSION]: '2',
      [STORAGE_KEYS.HISTORY]: JSON.stringify([{ id: 'v2_item' }]),
      [STORAGE_KEYS.HISTORY_V1_BACKUP]: JSON.stringify([{ id: 'original_v1' }])
    });

    const res = migrateStorage(storage);
    assert.equal(res.migrated, false);
    assert.equal(storage.getItem(STORAGE_KEYS.HISTORY_V1_BACKUP), JSON.stringify([{ id: 'original_v1' }]));
  });

  it('migrateStorage resiste JSON corrupto sin provocar excepciones', () => {
    const storage = createMockStorage({
      [STORAGE_KEYS.HISTORY]: '{ corrupt json [',
      [STORAGE_KEYS.FAILED_QIDS]: 'null not array',
      [STORAGE_KEYS.CIFRAS_DRILL]: 'undefined'
    });

    const res = migrateStorage(storage);
    assert.equal(res.migrated, true);
    assert.equal(storage.getItem(STORAGE_KEYS.VERSION), '2');
  });

  it('Importar export antiguo de progreso no pierde datos de historial ni falladas', () => {
    const oldExportData = {
      app: 'Misión Administración - Opo-Defensa E1',
      version: '2.1.0',
      examHistory: [
        { date: '2026-08-01', score: 32.5, correct: 35, wrong: 5, blank: 20 }
      ],
      failedQuestionIds: ['105', 106, '105'],
      cifrasBestScore: { bestScore: '12', bestStreak: '3' }
    };

    const storage = createMockStorage();
    // Simular guardado desde importProgress
    storage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(oldExportData.examHistory));
    storage.setItem(STORAGE_KEYS.FAILED_QIDS, JSON.stringify(oldExportData.failedQuestionIds));
    storage.setItem(STORAGE_KEYS.CIFRAS_DRILL, JSON.stringify(oldExportData.cifrasBestScore));

    migrateStorage(storage);

    const history = JSON.parse(storage.getItem(STORAGE_KEYS.HISTORY));
    assert.equal(history.length, 1);
    assert.equal(history[0].score, 32.5);
    assert.equal(history[0].correct, 35);

    const failed = JSON.parse(storage.getItem(STORAGE_KEYS.FAILED_QIDS));
    assert.deepEqual(failed, [105, 106]);
  });
});
