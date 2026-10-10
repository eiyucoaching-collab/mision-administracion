/**
 * Módulo de Migración y Versionado de LocalStorage
 * Misión Administración (Opo-Defensa E1)
 *
 * Controla la evolución del esquema de almacenamiento local, garantizando
 * compatibilidad hacia atrás, sanitización no destructiva y copias de seguridad de origen.
 */

export const STORAGE_KEYS = {
  VERSION: 'opo_e1_storage_version',
  HISTORY: 'opo_e1_history',
  FAILED_QIDS: 'opo_e1_failed_qids',
  FLASHCARDS_RATING: 'opo_e1_flashcards_rating',
  PLAN_CHECKLIST: 'opo_e1_plan_checklist',
  HIGHLIGHTER: 'opo_e1_highlighter',
  CIFRAS_DRILL: 'opo_e1_cifras_drill',
  // Claves de copia de seguridad del estado original previo a migración v2
  HISTORY_V1_BACKUP: 'opo_e1_history_v1_backup',
  FAILED_QIDS_V1_BACKUP: 'opo_e1_failed_qids_v1_backup',
  CIFRAS_DRILL_V1_BACKUP: 'opo_e1_cifras_drill_v1_backup'
};

export const CURRENT_STORAGE_VERSION = 2;

/**
 * Normaliza campos básicos de un registro histórico sin recalcular notas ni umbrales
 * @param {Object} rawItem - Entrada histórica en bruto
 * @param {number} index - Posición en la lista
 * @returns {Object} Entrada normalizada preservando todos los datos originales
 */
export function migrateHistoryItem(rawItem, index = 0) {
  if (!rawItem || typeof rawItem !== 'object') {
    return null;
  }

  const date = rawItem.date || new Date().toISOString();
  const id = rawItem.id || `exam_${new Date(date).getTime() || Date.now()}_${index}`;
  const mode = (typeof rawItem.mode === 'string' && rawItem.mode) ? rawItem.mode : (rawItem.mode || 'desconocido');

  // Clonar para no perder ninguna propiedad preexistente
  const normalized = { ...rawItem, id, date, mode };

  if (rawItem.correct !== undefined) normalized.correct = Number(rawItem.correct);
  if (rawItem.wrong !== undefined) normalized.wrong = Number(rawItem.wrong);
  if (rawItem.blank !== undefined) normalized.blank = Number(rawItem.blank);
  if (rawItem.totalGraded !== undefined) normalized.totalGraded = Number(rawItem.totalGraded);
  if (rawItem.timeSpentSecs !== undefined) normalized.timeSpentSecs = Number(rawItem.timeSpentSecs);

  // NO recalcular notas ni umbrales provisionales: mantener exactamente lo registrado originalmente
  if (rawItem.score !== undefined) normalized.score = Number(rawItem.score);
  if (rawItem.cutoffScore !== undefined) normalized.cutoffScore = Number(rawItem.cutoffScore);
  if (rawItem.passed !== undefined) normalized.passed = Boolean(rawItem.passed);

  return normalized;
}

/**
 * Sanitiza la lista de IDs de preguntas falladas asegurando números enteros positivos
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
 * Sanitiza el récord de cifras rápidas asegurando tipos numéricos no negativos
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
 * Ejecuta la migración del almacenamiento a v2 con copia de seguridad obligatoria previa
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

  // 1. ANTES DE MIGRAR: Preservar copia de seguridad intacta de las claves v1 si no existen backups
  const rawHistoryStr = storage.getItem(STORAGE_KEYS.HISTORY);
  if (rawHistoryStr !== null && storage.getItem(STORAGE_KEYS.HISTORY_V1_BACKUP) === null) {
    storage.setItem(STORAGE_KEYS.HISTORY_V1_BACKUP, rawHistoryStr);
  }

  const rawFailedStr = storage.getItem(STORAGE_KEYS.FAILED_QIDS);
  if (rawFailedStr !== null && storage.getItem(STORAGE_KEYS.FAILED_QIDS_V1_BACKUP) === null) {
    storage.setItem(STORAGE_KEYS.FAILED_QIDS_V1_BACKUP, rawFailedStr);
  }

  const rawCifrasStr = storage.getItem(STORAGE_KEYS.CIFRAS_DRILL);
  if (rawCifrasStr !== null && storage.getItem(STORAGE_KEYS.CIFRAS_DRILL_V1_BACKUP) === null) {
    storage.setItem(STORAGE_KEYS.CIFRAS_DRILL_V1_BACKUP, rawCifrasStr);
  }

  // 2. Normalización no destructiva
  try {
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

    if (rawFailedStr) {
      try {
        const rawFailed = JSON.parse(rawFailedStr);
        const sanitizedFailed = sanitizeFailedQuestionIds(rawFailed);
        storage.setItem(STORAGE_KEYS.FAILED_QIDS, JSON.stringify(sanitizedFailed));
      } catch (errFailed) {
        console.warn('[Migration] Error parseando falladas legadas:', errFailed);
      }
    }

    if (rawCifrasStr) {
      try {
        const rawCifras = JSON.parse(rawCifrasStr);
        const sanitizedCifras = sanitizeCifrasDrill(rawCifras);
        storage.setItem(STORAGE_KEYS.CIFRAS_DRILL, JSON.stringify(sanitizedCifras));
      } catch (errCifras) {
        console.warn('[Migration] Error parseando cifras drill legado:', errCifras);
      }
    }

    // 3. Actualizar versión a v2
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
