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

  it('migrateHistoryItem normaliza registros v1 incompletos', () => {
    // Registro v1 sin mode, sin cutoffScore, sin totalGraded explícito
    const v1Item = {
      score: 34.6666,
      correct: 38,
      wrong: 10,
      blank: 12
    };
    const migrated = migrateHistoryItem(v1Item, 0);
    assert.equal(migrated.mode, 'oficial', 'Total 60 se normaliza como modo oficial');
    assert.equal(migrated.score, 34.67);
    assert.equal(migrated.totalGraded, 60);
    assert.equal(migrated.cutoffScore, 30);
    assert.equal(migrated.passed, true);
    assert.ok(migrated.id.startsWith('exam_'));
    assert.ok(migrated.date);

    // Registro parcial de 20 preguntas (bloque común)
    const partialItem = {
      correct: 14,
      wrong: 6,
      blank: 0
    };
    const migratedPartial = migrateHistoryItem(partialItem, 1);
    assert.equal(migratedPartial.mode, 'comun');
    assert.equal(migratedPartial.totalGraded, 20);
    assert.equal(migratedPartial.cutoffScore, 10);
    assert.equal(migratedPartial.score, 12.00); // 14 - 6/3 = 12
    assert.equal(migratedPartial.passed, true);
  });

  it('migrateStorage actualiza almacenamiento sin versionar a v2 y es idempotente', () => {
    const storage = createMockStorage({
      [STORAGE_KEYS.HISTORY]: JSON.stringify([
        { correct: 40, wrong: 10, blank: 10 }
      ]),
      [STORAGE_KEYS.FAILED_QIDS]: JSON.stringify(['10', '20', '10', 'inv']),
      [STORAGE_KEYS.CIFRAS_DRILL]: JSON.stringify({ bestScore: '18', bestStreak: '3' })
    });

    // 1. Primera ejecución: migra de v1 a v2
    const res1 = migrateStorage(storage);
    assert.equal(res1.migrated, true);
    assert.equal(res1.fromVersion, 1);
    assert.equal(res1.toVersion, 2);
    assert.equal(storage.getItem(STORAGE_KEYS.VERSION), '2');

    // Verificar que los datos en storage se sanitizaron
    const history = JSON.parse(storage.getItem(STORAGE_KEYS.HISTORY));
    assert.equal(history.length, 1);
    assert.equal(history[0].mode, 'oficial');
    assert.equal(history[0].totalGraded, 60);
    assert.equal(history[0].cutoffScore, 30);

    const failed = JSON.parse(storage.getItem(STORAGE_KEYS.FAILED_QIDS));
    assert.deepEqual(failed, [10, 20]);

    const drill = JSON.parse(storage.getItem(STORAGE_KEYS.CIFRAS_DRILL));
    assert.deepEqual(drill, { bestScore: 18, bestStreak: 3 });

    // 2. Segunda ejecución: ya en v2, no debe migrar nuevamente
    const res2 = migrateStorage(storage);
    assert.equal(res2.migrated, false);
    assert.equal(res2.fromVersion, 2);
    assert.equal(res2.toVersion, 2);
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
});
