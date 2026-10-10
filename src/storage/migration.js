/**
 * Módulo de Migración y Versionado de LocalStorage
 * Misión Administración (Opo-Defensa E1)
 *
 * Controla la evolución del esquema de almacenamiento local, garantizando
 * compatibilidad hacia atrás y sanitización de datos legados.
 */

export const STORAGE_KEYS = {
  VERSION: 'opo_e1_storage_version',
  HISTORY: 'opo_e1_history',
  FAILED_QIDS: 'opo_e1_failed_qids',
  FLASHCARDS_RATING: 'opo_e1_flashcards_rating',
  PLAN_CHECKLIST: 'opo_e1_plan_checklist',
  HIGHLIGHTER: 'opo_e1_highlighter',
  CIFRAS_DRILL: 'opo_e1_cifras_drill'
};

export const CURRENT_STORAGE_VERSION = 2;

/**
 * Sanitiza y normaliza un registro histórico de examen
 * @param {Object} rawItem - Entrada histórica en bruto
 * @param {number} index - Posición en la lista
 * @returns {Object} Entrada normalizada para v2
 */
export function migrateHistoryItem(rawItem, index = 0) {
  if (!rawItem || typeof rawItem !== 'object') {
    return null;
  }

  const date = rawItem.date || new Date().toISOString();
  const id = rawItem.id || `exam_${new Date(date).getTime() || Date.now()}_${index}`;
  
  // Normalizar modo
  let mode = rawItem.mode;
  if (!mode || typeof mode !== 'string') {
    const total = rawItem.totalGraded || (rawItem.correct || 0) + (rawItem.wrong || 0) + (rawItem.blank || 0);
    if (total === 60 || total === 66) {
      mode = 'oficial';
    } else if (total === 20) {
      mode = 'comun';
    } else if (total === 40) {
      mode = 'especifico';
    } else {
      mode = 'practica';
    }
  }

  const correct = Number(rawItem.correct) || 0;
  const wrong = Number(rawItem.wrong) || 0;
  const blank = Number(rawItem.blank) || 0;
  const totalGraded = Number(rawItem.totalGraded) || (correct + wrong + blank) || 60;

  // Puntuación neta
  let score = Number(rawItem.score);
  if (isNaN(score)) {
    const penalty = wrong * (1 / 3);
    score = Math.max(0, +(correct - penalty).toFixed(2));
  } else {
    score = Math.max(0, +score.toFixed(2));
  }

  // Corte
  let cutoffScore = Number(rawItem.cutoffScore);
  if (isNaN(cutoffScore)) {
    cutoffScore = +(totalGraded * 0.5).toFixed(2);
  }

  const passed = rawItem.passed !== undefined ? Boolean(rawItem.passed) : score >= cutoffScore;

  return {
    id,
    date,
    mode,
    score,
    correct,
    wrong,
    blank,
    totalGraded,
    cutoffScore,
    passed,
    timeSpentSecs: Number(rawItem.timeSpentSecs) || 0
  };
}

/**
 * Sanitiza la lista de IDs de preguntas falladas
 * @param {any} rawIds 
 * @returns {number[]} Array de enteros positivos sin duplicados
 */
export function sanitizeFailedQuestionIds(rawIds) {
  if (!Array.isArray(rawIds)) return [];
  const validIds = new Set();
  for (const item of rawIds) {
    const num = Number(item);
    if (Number.isInteger(num) && num > 0) {
      validIds.add(num);
    }
  }
  return Array.from(validIds).sort((a, b) => a - b);
}

/**
 * Sanitiza el récord de cifras rápidas
 * @param {any} rawDrill 
 * @returns {{ bestScore: number, bestStreak: number }}
 */
export function sanitizeCifrasDrill(rawDrill) {
  if (!rawDrill || typeof rawDrill !== 'object') {
    return { bestScore: 0, bestStreak: 0 };
  }
  return {
    bestScore: Math.max(0, Number(rawDrill.bestScore) || 0),
    bestStreak: Math.max(0, Number(rawDrill.bestStreak) || 0)
  };
}

/**
 * Ejecuta la migración del almacenamiento si la versión guardada es inferior a CURRENT_STORAGE_VERSION
 * @param {Storage|Object} storage - Objeto compatible con localStorage (getItem, setItem)
 * @returns {{ migrated: boolean, fromVersion: number, toVersion: number }}
 */
export function migrateStorage(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    return { migrated: false, fromVersion: 0, toVersion: CURRENT_STORAGE_VERSION };
  }

  const rawVersion = storage.getItem(STORAGE_KEYS.VERSION);
  const currentVer = rawVersion ? parseInt(rawVersion, 10) : 1;

  if (currentVer >= CURRENT_STORAGE_VERSION) {
    return { migrated: false, fromVersion: currentVer, toVersion: currentVer };
  }

  // Migración de v1 a v2
  try {
    // 1. Historial de exámenes
    const rawHistoryStr = storage.getItem(STORAGE_KEYS.HISTORY);
    if (rawHistoryStr) {
      try {
        const rawHistory = JSON.parse(rawHistoryStr);
        if (Array.isArray(rawHistory)) {
          const migratedHistory = rawHistory
            .map((item, idx) => migrateHistoryItem(item, idx))
            .filter(Boolean);
          storage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(migratedHistory));
        }
      } catch (errHistory) {
        console.warn('[Migration] Error parseando historial legado:', errHistory);
      }
    }

    // 2. Cuaderno de falladas
    const rawFailedStr = storage.getItem(STORAGE_KEYS.FAILED_QIDS);
    if (rawFailedStr) {
      try {
        const rawFailed = JSON.parse(rawFailedStr);
        const sanitizedFailed = sanitizeFailedQuestionIds(rawFailed);
        storage.setItem(STORAGE_KEYS.FAILED_QIDS, JSON.stringify(sanitizedFailed));
      } catch (errFailed) {
        console.warn('[Migration] Error parseando falladas legadas:', errFailed);
      }
    }

    // 3. Cifras drill
    const rawCifrasStr = storage.getItem(STORAGE_KEYS.CIFRAS_DRILL);
    if (rawCifrasStr) {
      try {
        const rawCifras = JSON.parse(rawCifrasStr);
        const sanitizedCifras = sanitizeCifrasDrill(rawCifras);
        storage.setItem(STORAGE_KEYS.CIFRAS_DRILL, JSON.stringify(sanitizedCifras));
      } catch (errCifras) {
        console.warn('[Migration] Error parseando cifras drill legado:', errCifras);
      }
    }

    // 4. Actualizar versión a v2
    storage.setItem(STORAGE_KEYS.VERSION, String(CURRENT_STORAGE_VERSION));

    return {
      migrated: true,
      fromVersion: currentVer,
      toVersion: CURRENT_STORAGE_VERSION
    };
  } catch (err) {
    console.error('[Migration] Fallo crítico durante migración:', err);
    return {
      migrated: false,
      fromVersion: currentVer,
      toVersion: currentVer,
      error: err.message
    };
  }
}
