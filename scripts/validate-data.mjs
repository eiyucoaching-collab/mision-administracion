/**
 * VALIDACIÓN ESTRICTA DEL BANCO DE PREGUNTAS (CI/CD & NPM TEST)
 * Misión Administración (Opo-Defensa E1)
 */

import { QUESTION_BANK } from '../src/data/questions.js';

const ALLOWED_LAWS = new Set([
  'Constitución Española de 1978',
  'Ley 50/1997 del Gobierno',
  'Ley 40/2015 de Régimen Jurídico del Sector Público',
  'Texto Refundido del Estatuto de los Trabajadores (TRLET / RD Leg 2/2015)',
  'IV Convenio Único para el personal laboral de la AGE (IV CUAGE)',
  'Ley Orgánica 3/2007 para la igualdad efectiva de mujeres y hombres',
  'Ley Orgánica 1/2004 de Medidas de Protección Integral contra la Violencia de Género',
  'Real Decreto 486/1997 sobre disposiciones mínimas de seguridad y salud en los lugares de trabajo',
  'Ley 31/1995 de Prevención de Riesgos Laborales',
  'Ley 43/2010 del servicio postal universal y RD 1829/1999',
  'Norma ISO 216 / DIN 476 (Formatos de Papel)',
  'Norma DIN 66399 (Niveles de Destrucción de Soportes de Información)',
  'Ley 9/1968 sobre Secretos Oficiales',
  'Reglamento General de Protección de Datos (RGPD) / LOPDGDD 3/2018',
  'Buenas Prácticas Operativas y Seguridad en Dependencias Oficiales'
]);

const ALLOWED_SOURCE_TYPES = new Set([
  'norma_verificada',
  'norma_identificada_sin_auditar',
  'original_propia',
  'sin_verificar'
]);

const errors = [];
const seenIds = new Set();
const letterDist = { 0: 0, 1: 0, 2: 0, 3: 0 };
let longestCorrectCount = 0;
let shortestCorrectCount = 0;

console.log(`\n=== INICIANDO VALIDACIÓN DE ${QUESTION_BANK.length} PREGUNTAS ===\n`);

QUESTION_BANK.forEach((q, idx) => {
  const prefix = `[Pregunta ID ${q.id ?? `(sin id en índice ${idx})`}]`;

  // 1. IDs únicos
  if (q.id === undefined || q.id === null) {
    errors.push(`${prefix}: Falta el campo 'id' obligatorio.`);
  } else if (seenIds.has(q.id)) {
    errors.push(`${prefix}: ID duplicado '${q.id}'.`);
  } else {
    seenIds.add(q.id);
  }

  // 2. Exactamente 4 opciones
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    errors.push(`${prefix}: Debe tener exactamente 4 opciones. Tiene ${q.options ? q.options.length : 0}.`);
  } else {
    // Ninguna opción vacía
    q.options.forEach((opt, optIdx) => {
      if (!opt || typeof opt !== 'string' || opt.trim().length === 0) {
        errors.push(`${prefix}: La opción en índice ${optIdx} está vacía.`);
      }
    });
  }

  // 3. Índice correct válido (0, 1, 2, 3)
  if (q.correct === undefined || ![0, 1, 2, 3].includes(q.correct)) {
    errors.push(`${prefix}: Índice 'correct' inválido (${q.correct}). Debe ser 0, 1, 2 o 3.`);
  } else if (Array.isArray(q.options) && q.options.length === 4) {
    letterDist[q.correct]++;

    // Medición de opción más larga y más corta
    const lengths = q.options.map(opt => opt.length);
    const maxLength = Math.max(...lengths);
    const minLength = Math.min(...lengths);
    if (q.options[q.correct].length === maxLength) {
      longestCorrectCount++;
    }
    if (q.options[q.correct].length === minLength) {
      shortestCorrectCount++;
    }
  }

  // 4. Campos requeridos: law, article, explanation
  if (!q.law || typeof q.law !== 'string' || q.law.trim().length === 0) {
    errors.push(`${prefix}: Falta campo 'law'.`);
  }

  if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length === 0) {
    errors.push(`${prefix}: Falta campo 'explanation'.`);
  }

  // 5. SourceType válido
  if (!q.sourceType || !ALLOWED_SOURCE_TYPES.has(q.sourceType)) {
    errors.push(`${prefix}: 'sourceType' no válido o ausente ('${q.sourceType}'). Permitidos: ${[...ALLOWED_SOURCE_TYPES].join(', ')}.`);
  }
});

// Comprobar sesgos estadísticos
const total = QUESTION_BANK.length;
const maxLetterPct = total > 0 ? (Math.max(...Object.values(letterDist)) / total) * 100 : 0;
const longestPct = total > 0 ? (longestCorrectCount / total) * 100 : 0;
const shortestPct = total > 0 ? (shortestCorrectCount / total) * 100 : 0;

console.log(`Distribución de letras fijas en base: A=${letterDist[0]}, B=${letterDist[1]}, C=${letterDist[2]}, D=${letterDist[3]} (Máxima letra: ${maxLetterPct.toFixed(1)}%)`);
console.log(`Opción correcta más larga: ${longestCorrectCount}/${total} (${longestPct.toFixed(1)}%) [Banda requerida: 15%–35%]`);
console.log(`Opción correcta más corta: ${shortestCorrectCount}/${total} (${shortestPct.toFixed(1)}%) [Banda requerida: 15%–35%]\n`);

if (maxLetterPct > 35) {
  errors.push(`[SESGO DISTRIBUCIÓN] Una letra de respuesta correcta supera el umbral máximo de tolerancia del 35%: ${maxLetterPct.toFixed(1)}%`);
}

if (longestPct < 15 || longestPct > 35) {
  errors.push(`[SESGO LONGITUD] La opción correcta es la más larga en ${longestPct.toFixed(1)}%, fuera de la banda admisible (15%–35%).`);
}

if (shortestPct < 15 || shortestPct > 35) {
  errors.push(`[SESGO LONGITUD] La opción correcta es la más corta en ${shortestPct.toFixed(1)}%, fuera de la banda admisible (15%–35%).`);
}

if (errors.length > 0) {
  console.error(`❌ SE ENCONTRARON ${errors.length} ERRORES DE INTEGRIDAD:`);
  errors.slice(0, 20).forEach(err => console.error(`  - ${err}`));
  if (errors.length > 20) {
    console.error(`  ... y ${errors.length - 20} errores más.`);
  }
  process.exit(1);
} else {
  console.log(`✅ VALIDACIÓN EXITOSA: Todas las ${total} preguntas cumplen los estándares de integridad.`);
  process.exit(0);
}
