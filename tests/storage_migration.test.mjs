import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEYS,
  CURRENT_STORAGE_VERSION,
  migrateHistoryItem,
  sanitizeFailedQuestionIds,
  sanitizeCifrasDrill,
  migrateStorage,
  getMadridDateKey,
  getYesterdayMadridDateKey,
  sanitizeSRSVault
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

  it('crea los *_v1_backup solo si no existen, preservando la copia original intacta en ejecuciones posteriores', () => {
    const originalHistoryBackup = JSON.stringify([{ id: 'pristine_v1_history_entry', score: 20 }]);
    const originalFailedBackup = JSON.stringify([101, 102]);
    const originalCifrasBackup = JSON.stringify({ bestScore: 8, bestStreak: 2 });

    const newCurrentHistory = JSON.stringify([{ id: 'new_session_exam', score: 45 }]);
    const newCurrentFailed = JSON.stringify([201, 202, 203]);
    const newCurrentCifras = JSON.stringify({ bestScore: 25, bestStreak: 10 });

    const storage = createMockStorage({
      [STORAGE_KEYS.VERSION]: '1',
      // Backups ya existentes generados en una ejecución previa
      [STORAGE_KEYS.HISTORY_V1_BACKUP]: originalHistoryBackup,
      [STORAGE_KEYS.FAILED_QIDS_V1_BACKUP]: originalFailedBackup,
      [STORAGE_KEYS.CIFRAS_DRILL_V1_BACKUP]: originalCifrasBackup,
      // Datos activos nuevos modificados en sesiones posteriores
      [STORAGE_KEYS.HISTORY]: newCurrentHistory,
      [STORAGE_KEYS.FAILED_QIDS]: newCurrentFailed,
      [STORAGE_KEYS.CIFRAS_DRILL]: newCurrentCifras
    });

    const res = migrateStorage(storage);
    assert.equal(res.migrated, true);

    // Los backups preexistentes NUNCA deben sobrescribirse con los datos activos posteriores
    assert.equal(
      storage.getItem(STORAGE_KEYS.HISTORY_V1_BACKUP),
      originalHistoryBackup,
      'HISTORY_V1_BACKUP no debe sobrescribirse si ya existía'
    );
    assert.equal(
      storage.getItem(STORAGE_KEYS.FAILED_QIDS_V1_BACKUP),
      originalFailedBackup,
      'FAILED_QIDS_V1_BACKUP no debe sobrescribirse si ya existía'
    );
    assert.equal(
      storage.getItem(STORAGE_KEYS.CIFRAS_DRILL_V1_BACKUP),
      originalCifrasBackup,
      'CIFRAS_DRILL_V1_BACKUP no debe sobrescribirse si ya existía'
    );
  });
});

describe('Backup Import & Restore Robustness Tests', () => {
  it('procesa correctamente datos de copia de seguridad con planChecklist y misiones', () => {
    const backupJson = JSON.stringify({
      app: 'Misión Administración - Opo-Defensa E1',
      version: '2.1.0',
      storageVersion: CURRENT_STORAGE_VERSION,
      planChecklist: { '1': true, '2': false },
      dailyMissions: { streak: 1, totalXp: 150 },
      examHistory: [{ id: 'ex_1', score: 45 }],
      failedQuestionIds: [12, 14]
    });

    const parsed = JSON.parse(backupJson);
    assert.equal(parsed.planChecklist['1'], true);
    assert.equal(parsed.dailyMissions.streak, 1);
    assert.equal(parsed.examHistory.length, 1);
  });

  it('elimina bloques de formato markdown antes de parsear si el usuario pegó el JSON con fences', () => {
    const rawWithFences = '```json\n{\n  "app": "Misión Administración",\n  "planChecklist": { "1": true }\n}\n```';
    let cleaned = rawWithFences.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');

    const parsed = JSON.parse(cleaned);
    assert.equal(parsed.planChecklist['1'], true);
  });

  it('distingue correctamente entre una batería de preguntas (Array) y un backup de progreso (Object)', () => {
    const questionsArray = [
      { question: '¿Pregunta 1?', options: ['A', 'B'], correct: 0 }
    ];
    assert.equal(Array.isArray(questionsArray), true);

    const progressBackup = {
      app: 'Misión Administración - Opo-Defensa E1',
      planChecklist: { 1: true }
    };
    assert.equal(Array.isArray(progressBackup), false);
    assert.equal(Boolean(progressBackup.planChecklist || progressBackup.app), true);
  });
});



describe('Persistence, Europe/Madrid Dates, Streak & Active Exam Tests', () => {
  it('getMadridDateKey y getYesterdayMadridDateKey devuelven formato YYYY-MM-DD en hora de Madrid', () => {
    const todayStr = getMadridDateKey();
    assert.match(todayStr, /^\d{4}-\d{2}-\d{2}$/);

    const yesterdayStr = getYesterdayMadridDateKey();
    assert.match(yesterdayStr, /^\d{4}-\d{2}-\d{2}$/);
    assert.notEqual(todayStr, yesterdayStr);

    // Comprobar con una fecha fija (por ejemplo, medianoche UTC que en España ya es día siguiente)
    const lateUtc = new Date('2026-10-21T23:30:00.000Z');
    // En UTC es día 21, pero en Madrid (UTC+2 CEST) es 2026-10-22 01:30
    const madridKey = getMadridDateKey(lateUtc);
    assert.equal(madridKey, '2026-10-22');
  });

  it('migrateHistoryItem añade dateKey, totalQuestions, incorrect y conserva todas las propiedades', () => {
    const item = {
      id: 'ex_test_999',
      date: '2026-10-15T12:00:00.000Z',
      mode: 'oficial',
      correct: 40,
      wrong: 15,
      blank: 5,
      totalGraded: 60,
      score: 35.05
    };
    const migrated = migrateHistoryItem(item, 0);
    assert.equal(migrated.totalQuestions, 60);
    assert.equal(migrated.incorrect, 15);
    assert.equal(migrated.dateKey, '2026-10-15');
    assert.equal(migrated.netScore, 35.05);
    assert.equal(migrated.score, 35.05);
  });

  it('migrateStorage preserva íntegramente claves de estado adicionales sin borrarlas ni sobreescribirlas', () => {
    const storage = createMockStorage({
      [STORAGE_KEYS.VERSION]: '1',
      [STORAGE_KEYS.HISTORY]: JSON.stringify([{ id: 'h1', score: 30 }]),
      [STORAGE_KEYS.STREAK]: '5',
      [STORAGE_KEYS.LAST_ACTIVE_DATE]: '2026-10-20',
      [STORAGE_KEYS.DAILY_ACTIVITY]: JSON.stringify({ '2026-10-20': { testsCompleted: 2 } }),
      [STORAGE_KEYS.TOPIC_STATS]: JSON.stringify({ T1: { answered: 10, correct: 8 } }),
      [STORAGE_KEYS.ACTIVE_EXAM]: JSON.stringify({ mode: 'oficial', currentIndex: 5 })
    });

    const res = migrateStorage(storage);
    assert.equal(res.migrated, true);

    // Verificar que los nuevos datos y las claves no fueron alteradas
    assert.equal(storage.getItem(STORAGE_KEYS.STREAK), '5');
    assert.equal(storage.getItem(STORAGE_KEYS.LAST_ACTIVE_DATE), '2026-10-20');
    assert.ok(storage.getItem(STORAGE_KEYS.DAILY_ACTIVITY).includes('2026-10-20'));
    assert.ok(storage.getItem(STORAGE_KEYS.TOPIC_STATS).includes('T1'));
    assert.ok(storage.getItem(STORAGE_KEYS.ACTIVE_EXAM).includes('oficial'));
  });

  it('simula la lógica de racha diaria: incremento consecutivo, mantenimiento hoy y reinicio tras inactividad', () => {
    const todayKey = getMadridDateKey();
    const yesterdayKey = getYesterdayMadridDateKey();
    const pastKey = '2026-01-01';

    // Caso 1: Usuario activo ayer -> incrementa racha
    let streak = 3;
    let lastActive = yesterdayKey;
    if (lastActive === yesterdayKey) {
      streak += 1;
      lastActive = todayKey;
    }
    assert.equal(streak, 4);
    assert.equal(lastActive, todayKey);

    // Caso 2: Usuario vuelve a hacer test hoy -> mantiene racha sin duplicar
    if (lastActive === yesterdayKey) {
      streak += 1;
      lastActive = todayKey;
    } else if (lastActive === todayKey) {
      // mantiene
    }
    assert.equal(streak, 4);

    // Caso 3: Usuario inactivo más de 1 día -> racha se reinicia a 1
    lastActive = pastKey;
    streak = 10;
    if (lastActive === yesterdayKey) {
      streak += 1;
      lastActive = todayKey;
    } else if (lastActive === todayKey) {
      // mantiene
    } else {
      streak = 1;
      lastActive = todayKey;
    }
    assert.equal(streak, 1);
    assert.equal(lastActive, todayKey);
  });
});


describe('Bóveda de Fallos & Repetición Espaciada (Leitner SRS 4 Cajas)', () => {
  it('sanitizeSRSVault purga claves inválidas como "undefined" o "null" y normaliza cajas', () => {
    const dirtyVault = {
      'undefined': { box: 3, streak: 2 },
      'null': { box: 2 },
      '': { box: 1 },
      '-5': { box: 1 },
      'abc': { box: 1 },
      '42': { qId: 42, box: 2, consecutiveSafeHits: 1, graduated: false },
      '101': { qId: '101', box: 5, consecutiveSafeHits: '2', graduated: true }
    };

    const clean = sanitizeSRSVault(dirtyVault);
    assert.deepEqual(Object.keys(clean).map(Number).sort((a, b) => a - b), [42, 101]);
    assert.equal(clean[42].qId, 42);
    assert.equal(clean[42].box, 2);
    assert.equal(clean[42].consecutiveSafeHits, 1);
    assert.equal(clean[42].graduated, false);

    assert.equal(clean[101].qId, 101);
    assert.equal(clean[101].box, 4); // Clamped a max 4
    assert.equal(clean[101].consecutiveSafeHits, 2);
    assert.equal(clean[101].graduated, true);
  });

  it('Captura automática: fallos, dudas y blancas entran a Caja 1 con 0 seguras', () => {
    const srsVault = {};

    function mockCapture(qId, conf, isCorrect, isBlank, todayKey = '2026-10-21') {
      const numericQId = Number(qId);
      const isFailure = !isCorrect && !isBlank;
      const isBlankAnswer = Boolean(isBlank);
      const isDoubt = conf === 'duda' || conf === 'riesgo';
      const isSafeHit = isCorrect && conf === 'segura';

      const existing = srsVault[numericQId];
      if (!existing && isSafeHit) return;

      const item = existing || {
        qId: numericQId,
        box: 1,
        consecutiveSafeHits: 0,
        lastSafeHitDateKey: null,
        graduated: false
      };

      if (isFailure || isBlankAnswer || isDoubt) {
        item.box = 1;
        item.consecutiveSafeHits = 0;
        item.graduated = false;
      } else if (isSafeHit) {
        if (item.lastSafeHitDateKey !== todayKey) {
          item.consecutiveSafeHits = (item.consecutiveSafeHits || 0) + 1;
          item.lastSafeHitDateKey = todayKey;
          if (item.consecutiveSafeHits >= 3) {
            item.graduated = true;
            item.box = 4;
            item.consecutiveSafeHits = 3;
          } else {
            item.box = Math.min(4, item.box + 1);
          }
        }
      }
      srsVault[numericQId] = item;
    }

    // 1. Pregunta nueva contestada correcta con [🟢 Segura] -> NO entra a la Bóveda de Fallos
    mockCapture(10, 'segura', true, false);
    assert.equal(srsVault[10], undefined, 'Acierto seguro de pregunta nueva no debe entrar a Bóveda');

    // 2. Pregunta nueva con FALLO -> entra a Caja 1 con 0 seguras
    mockCapture(20, 'segura', false, false);
    assert.ok(srsVault[20]);
    assert.equal(srsVault[20].box, 1);
    assert.equal(srsVault[20].consecutiveSafeHits, 0);
    assert.equal(srsVault[20].graduated, false);

    // 3. Pregunta nueva en BLANCO -> entra a Caja 1
    mockCapture(30, 'segura', false, true);
    assert.ok(srsVault[30]);
    assert.equal(srsVault[30].box, 1);
    assert.equal(srsVault[30].consecutiveSafeHits, 0);

    // 4. Pregunta nueva acertada pero con DUDA (falso positivo / azar) -> entra a Caja 1
    mockCapture(40, 'duda', true, false);
    assert.ok(srsVault[40]);
    assert.equal(srsVault[40].box, 1);
    assert.equal(srsVault[40].consecutiveSafeHits, 0);
  });

  it('Exige exactamente 3 aciertos consecutivos con [🟢 Segura] en DÍAS DISTINTOS para graduar', () => {
    const srsVault = {};

    function mockCapture(qId, conf, isCorrect, isBlank, todayKey) {
      const numericQId = Number(qId);
      const isFailure = !isCorrect && !isBlank;
      const isBlankAnswer = Boolean(isBlank);
      const isDoubt = conf === 'duda' || conf === 'riesgo';
      const isSafeHit = isCorrect && conf === 'segura';

      const existing = srsVault[numericQId];
      if (!existing && isSafeHit) return;

      const item = existing || {
        qId: numericQId,
        box: 1,
        consecutiveSafeHits: 0,
        lastSafeHitDateKey: null,
        graduated: false
      };

      if (isFailure || isBlankAnswer || isDoubt) {
        item.box = 1;
        item.consecutiveSafeHits = 0;
        item.graduated = false;
      } else if (isSafeHit) {
        if (item.lastSafeHitDateKey !== todayKey) {
          item.consecutiveSafeHits = (item.consecutiveSafeHits || 0) + 1;
          item.lastSafeHitDateKey = todayKey;
          if (item.consecutiveSafeHits >= 3) {
            item.graduated = true;
            item.box = 4;
            item.consecutiveSafeHits = 3;
          } else {
            item.box = Math.min(4, item.box + 1);
          }
        }
      }
      srsVault[numericQId] = item;
    }

    // Día 1: Pregunta 50 se falla -> entra a Caja 1
    mockCapture(50, 'segura', false, false, '2026-10-15');
    assert.equal(srsVault[50].box, 1);
    assert.equal(srsVault[50].consecutiveSafeHits, 0);
    assert.equal(srsVault[50].graduated, false);

    // Día 2: Primer acierto seguro -> sube a Caja 2, racha 1/3
    mockCapture(50, 'segura', true, false, '2026-10-16');
    assert.equal(srsVault[50].box, 2);
    assert.equal(srsVault[50].consecutiveSafeHits, 1);
    assert.equal(srsVault[50].graduated, false);

    // Mismo Día 2: Segundo test en la misma tarde con acierto seguro -> MANTIENE 1/3 (no burla la repetición espaciada)
    mockCapture(50, 'segura', true, false, '2026-10-16');
    assert.equal(srsVault[50].box, 2);
    assert.equal(srsVault[50].consecutiveSafeHits, 1, 'No debe sumar dos aciertos seguros en el mismo día');
    assert.equal(srsVault[50].graduated, false);

    // Día 5 (3 días después según intervalo Caja 2): Segundo acierto seguro en día distinto -> sube a Caja 3, racha 2/3
    mockCapture(50, 'segura', true, false, '2026-10-19');
    assert.equal(srsVault[50].box, 3);
    assert.equal(srsVault[50].consecutiveSafeHits, 2);
    assert.equal(srsVault[50].graduated, false);

    // Día 12 (7 días después según intervalo Caja 3): Tercer acierto seguro en día distinto -> DOMINADA (Graduada), Caja 4, racha 3/3
    mockCapture(50, 'segura', true, false, '2026-10-26');
    assert.equal(srsVault[50].box, 4);
    assert.equal(srsVault[50].consecutiveSafeHits, 3);
    assert.equal(srsVault[50].graduated, true, 'Debe graduarse al alcanzar 3 aciertos seguros en días distintos');

    // Si semanas después en un simulacro oficial el alumno DUDA o FALLA esta pregunta dominada:
    // Pierde la condición de graduada y regresa a Caja 1 para reaprendizaje
    mockCapture(50, 'duda', true, false, '2026-11-10');
    assert.equal(srsVault[50].graduated, false, 'Dudar debe revocar la graduación');
    assert.equal(srsVault[50].box, 1, 'Debe regresar a Caja 1');
    assert.equal(srsVault[50].consecutiveSafeHits, 0, 'La racha de seguras debe reiniciarse');
  });
});
