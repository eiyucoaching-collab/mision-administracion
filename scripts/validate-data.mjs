/**
 * VALIDACIÓN ESTRICTA DEL BANCO DE PREGUNTAS (CI/CD & NPM TEST)
 * Misión Administración (Opo-Defensa E1)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { QUESTION_BANK } from '../src/data/questions.js';
import { CIFRAS_SAGRADAS, TRAMPAS_EXAMEN } from '../src/data/cifras_y_trampas.js';
import { FLASHCARDS } from '../src/data/flashcards.js';
import { PODCAST_TRACKS } from '../src/data/podcasts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INVALID_E1_E2_PATTERNS = [
  /\b(?:grupo\s+(?:profesional\s+)?)?E[12]\b[^\.\n]*\bsin\s+titulaci[oó]n/i,
  /\bsin\s+titulaci[oó]n[^\.\n]*\b(?:grupo\s+(?:profesional\s+)?)?E[12]\b/i,
  /\b(?:periodo|período)\s+de\s+prueba\b[^\.\n]*\bE[12]\b[^\.\n]*(?:15\s+d[ií]as|quince\s+d[ií]as)/i,
  /\bE[12]\b[^\.\n]*(?:periodo|período)\s+de\s+prueba\b[^\.\n]*(?:15\s+d[ií]as|quince\s+d[ií]as)/i,
  /\b(?:15\s+d[ií]as|quince\s+d[ií]as)\b[^\.\n]*(?:periodo|período)\s+de\s+prueba\b[^\.\n]*\bE[12]\b/i,
  /15\s+d[ií]as\s+laborables\s*\([^)]*E[12][^)]*\)/i,
  /sin\s+titulaci[oó]n\s+de\s+los\s+grupos\s+[^.\n]*E[12]/i,
  /15\s+d[ií]as\s+laborables\s+para\s+[^.\n]*E[12]/i
];


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

const boeDir = path.resolve(__dirname, '../docs/fuentes/boe');
const LAW_TO_BOE_FILE = {
  'Constitución Española de 1978': ['BOE-A-1978-31229_Constitucion-Espanola.html'],
  'Ley 50/1997 / CE': ['BOE-A-1997-25336_Ley-50-1997-Gobierno.html', 'BOE-A-1978-31229_Constitucion-Espanola.html'],
  'Ley 50/1997 del Gobierno': ['BOE-A-1997-25336_Ley-50-1997-Gobierno.html'],
  'Ley 40/2015': ['BOE-A-2015-10566_Ley-40-2015-LRJSP.html'],
  'Ley 40/2015 de Régimen JurJD del Sector Público': ['BOE-A-2015-10566_Ley-40-2015-LRJSP.html'],
  'Ley 40/2015 de Régimen Jurídico del Sector Público': ['BOE-A-2015-10566_Ley-40-2015-LRJSP.html'],
  'Estatuto de los Trabajadores': ['BOE-A-2015-11430_Estatuto-Trabajadores.html'],
  'Texto Refundido del Estatuto de los Trabajadores (TRLET / RD Leg 2/2015)': ['BOE-A-2015-11430_Estatuto-Trabajadores.html'],
  'IV Convenio Único para el personal laboral de la AGE (IV CUAGE)': ['BOE-A-2019-7414_IV-CUAGE.html'],
  'TREBEP / IV CUAGE': ['BOE-A-2015-11719_TREBEP.html', 'BOE-A-2019-7414_IV-CUAGE.html'],
  'Convocatoria E1 Defensa': ['BOE-A-2026-14677_Convocatoria-Defensa-E1.html'],
  'Ley Reguladora Jurisdicción Social': ['BOE-A-2011-15936_Ley-36-2011-LRJS.html'],
  'Ley Orgánica 3/2007': ['BOE-A-2007-6115_LO-3-2007-Igualdad.html'],
  'Ley Orgánica 3/2007 para la igualdad efectiva de mujeres y hombres': ['BOE-A-2007-6115_LO-3-2007-Igualdad.html'],
  'Ley Orgánica 1/2004': ['BOE-A-2004-21760_LO-1-2004-Violencia-Genero.html'],
  'Ley Orgánica 1/2004 de Medidas de Protección Integral contra la Violencia de Género': ['BOE-A-2004-21760_LO-1-2004-Violencia-Genero.html'],
  'RDL 1/2013 TRLGDPD': ['BOE-A-2013-12632_RDL-1-2013-Discapacidad-TRLGDPD.html'],
  'Ley 39/2006 de Dependencia': ['BOE-A-2006-21990_Ley-39-2006-Autonomia-Dependencia.html'],
  'Ley 15/2022': ['BOE-A-2022-11589_Ley-15-2022-Igualdad-Trato.html'],
  'Ley 4/2023 LGTBI y Trans': ['BOE-A-2023-5366_Ley-4-2023-Trans-LGTBI.html'],
  'TREBEP / LO 1/2004': ['BOE-A-2015-11719_TREBEP.html', 'BOE-A-2004-21760_LO-1-2004-Violencia-Genero.html'],
  'Ley Orgánica 3/2007 / TREBEP': ['BOE-A-2007-6115_LO-3-2007-Igualdad.html', 'BOE-A-2015-11719_TREBEP.html'],
  'Ley Orgánica 3/1981 del Defensor del Pueblo': ['BOE-A-1981-10325_LO-3-1981-Defensor-del-Pueblo.html'],
  'Ley 3/2015': ['BOE-A-2015-3444_Ley-3-2015-Altos-Cargos-AGE.html'],
  'Ley 43/2010': ['BOE-A-2010-20139_Ley-43-2010-Servicio-Postal-Universal.html'],
  'Ley 43/2010 del Servicio Postal Universal': ['BOE-A-2010-20139_Ley-43-2010-Servicio-Postal-Universal.html'],
  'Ley 43/2010 del Servicio Postal': ['BOE-A-2010-20139_Ley-43-2010-Servicio-Postal-Universal.html'],
  'Real Decreto 1829/1999': ['BOE-A-1999-24919_RD-1829-1999-Reglamento-Postal.html'],
  'RD 1829/1999': ['BOE-A-1999-24919_RD-1829-1999-Reglamento-Postal.html'],
  'Reglamento Postal': ['BOE-A-1999-24919_RD-1829-1999-Reglamento-Postal.html'],
  'Reglamento Postal / Ley 43/2010': ['BOE-A-1999-24919_RD-1829-1999-Reglamento-Postal.html', 'BOE-A-2010-20139_Ley-43-2010-Servicio-Postal-Universal.html'],
  'Ley 9/1968': ['BOE-A-1968-472_Ley-9-1968-Secretos-Oficiales.html'],
  'Ley 9/1968 sobre Secretos Oficiales': ['BOE-A-1968-472_Ley-9-1968-Secretos-Oficiales.html'],
  'Decreto 242/1969': ['BOE-A-1969-263_Decreto-242-1969-Reglamento-Secretos-Oficiales.html'],
  'Reglamento de la Ley de Secretos Oficiales': ['BOE-A-1969-263_Decreto-242-1969-Reglamento-Secretos-Oficiales.html'],
  'Reglamento Ley Secretos Oficiales': ['BOE-A-1969-263_Decreto-242-1969-Reglamento-Secretos-Oficiales.html'],
  'Ley 31/1995': ['BOE-A-1995-25444_Ley-31-1995-PRL.html'],
  'Ley 31/1995 de Prevención de Riesgos Laborales': ['BOE-A-1995-25444_Ley-31-1995-PRL.html'],
  'Real Decreto 486/1997': ['BOE-A-1997-8669_RD-486-1997-Lugares-de-Trabajo.html'],
  'RD 486/1997': ['BOE-A-1997-8669_RD-486-1997-Lugares-de-Trabajo.html'],
  'Real Decreto 486/1997 sobre disposiciones mínimas de seguridad y salud en los lugares de trabajo': ['BOE-A-1997-8669_RD-486-1997-Lugares-de-Trabajo.html'],
  'Real Decreto 485/1997': ['BOE-A-1997-8668_RD-485-1997-Senalizacion.html'],
  'RD 485/1997': ['BOE-A-1997-8668_RD-485-1997-Senalizacion.html'],
  'Real Decreto 485/1997 de Señalización': ['BOE-A-1997-8668_RD-485-1997-Senalizacion.html'],
  'Real Decreto 487/1997': ['BOE-A-1997-8670_RD-487-1997-Manipulacion-Cargas.html'],
  'RD 487/1997': ['BOE-A-1997-8670_RD-487-1997-Manipulacion-Cargas.html'],
  'Real Decreto 513/2017': ['BOE-A-2017-6606_RD-513-2017-RIPCI-Incendios.html'],
  'RD 513/2017': ['BOE-A-2017-6606_RD-513-2017-RIPCI-Incendios.html'],
  'Reglamento de Instalaciones de Protección contra Incendios': ['BOE-A-2017-6606_RD-513-2017-RIPCI-Incendios.html'],
  'Protección Contra Incendios (RIPCI)': ['BOE-A-2017-6606_RD-513-2017-RIPCI-Incendios.html'],
  'Ley Orgánica 4/2015': ['BOE-A-2015-3442_LO-4-2015-Seguridad-Ciudadana.html'],
  'TREBEP': ['BOE-A-2015-11719_TREBEP.html'],
  'TREBEP / Código de Conducta': ['BOE-A-2015-11719_TREBEP.html'],
  'Deberes del Empleado Público / TREBEP': ['BOE-A-2015-11719_TREBEP.html'],
  'Texto Refundido del Estatuto Básico del Empleado Público (TREBEP)': ['BOE-A-2015-11719_TREBEP.html']
};

function resolveBoeFiles(lawStr) {
  if (!lawStr || typeof lawStr !== 'string') return [];
  const trimmed = lawStr.trim();
  if (LAW_TO_BOE_FILE[trimmed]) return LAW_TO_BOE_FILE[trimmed];
  const files = new Set();
  for (const [key, val] of Object.entries(LAW_TO_BOE_FILE)) {
    if (trimmed.includes(key) || key.includes(trimmed)) {
      val.forEach(f => files.add(f));
    }
  }
  return [...files];
}

const errors = [];

function validateVerifiedItem(prefix, lawStr, isVerified, topicId) {
  if (!isVerified) return;
  const boeFiles = resolveBoeFiles(lawStr);
  if (!boeFiles || boeFiles.length === 0) {
    errors.push(`${prefix}: Un elemento con 'verified: true' o 'norma_verificada' debe citar una norma que exista en docs/fuentes/boe/. Norma citada: '${lawStr}'.`);
    return;
  }
  for (const f of boeFiles) {
    const fullPath = path.join(boeDir, f);
    if (!fs.existsSync(fullPath)) {
      errors.push(`${prefix}: Copia local del BOE no encontrada en disco: docs/fuentes/boe/${f}`);
    }
  }
}

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

  // 5b. Respaldo documental local obligatorio para 'norma_verificada' o 'verified: true'
  const isVerified = q.sourceType === 'norma_verificada' || q.verified === true;
  validateVerifiedItem(prefix, q.law, isVerified, q.topicId);


  // 6. Integridad normativa estricta: Art. 32.1 y Art. 8.1 IV CUAGE
  // E1 y E2 exigen titulación y tienen 1 MES de período de prueba.
  // 15 días laborables es exclusivo del Grupo E0 (personal sin titulación).
  const textElements = [q.question, ...(q.options || []), q.explanation];
  for (const text of textElements) {
    if (!text || typeof text !== 'string') continue;
    const clean = text.replace(/<[^>]+>/g, '\n');
    const segments = clean.split(/[.\n;]/);
    for (const segment of segments) {
      if (INVALID_E1_E2_PATTERNS.some(p => p.test(segment))) {
        errors.push(`${prefix}: Infracción normativa: relaciona erróneamente E1/E2 con 'sin titulación' o '15 días'. Fragmento: "${segment.trim()}"`);
      }
    }
  }

  if (/(?:periodo|período)\s+de\s+prueba/i.test(q.question) && /\bE[12]\b/i.test(q.question)) {
    const correctOpt = q.options[q.correct];
    if (/(?:15\s+d[ií]as|quince\s+d[ií]as)/i.test(correctOpt)) {
      errors.push(`${prefix}: La respuesta correcta para periodo de prueba de E1/E2 no puede ser 15 días (debe ser 1 mes según Art. 32.1 IV CUAGE).`);
    }
  }

  if (/titulaci[oó]n/i.test(q.question) && /\bE1\b/i.test(q.question)) {
    const correctOpt = q.options[q.correct];
    if (/sin\s+titulaci[oó]n/i.test(correctOpt)) {
      errors.push(`${prefix}: La respuesta correcta para titulación de acceso de E1 no puede ser 'sin titulación' (exige Graduado en ESO o FP Básico según Art. 8.1.e IV CUAGE).`);
    }
  }
});

// Validación estricta de respaldo documental para colecciones didácticas auxiliares si declaran verified: true o norma_verificada
CIFRAS_SAGRADAS.forEach((c, idx) => {
  const prefix = `[Cifra ID ${c.id ?? idx}]`;
  const isVerified = c.verified === true || c.sourceType === 'norma_verificada';
  validateVerifiedItem(prefix, c.detalle || c.concepto || c.tema, isVerified, c.topicId);
});

TRAMPAS_EXAMEN.forEach((t, idx) => {
  const prefix = `[Trampa ID ${t.id ?? idx}]`;
  const isVerified = t.verified === true || t.sourceType === 'norma_verificada';
  validateVerifiedItem(prefix, t.realidad || t.trampa || t.titulo, isVerified, t.topicId);
});

FLASHCARDS.forEach((f, idx) => {
  const prefix = `[Flashcard ID ${f.id ?? idx}]`;
  const isVerified = f.verified === true || f.sourceType === 'norma_verificada';
  validateVerifiedItem(prefix, f.reference || f.back, isVerified, f.topicId);
});

PODCAST_TRACKS.forEach((p, idx) => {
  const prefix = `[Podcast ID ${p.id ?? idx}]`;
  const isVerified = p.verified === true || p.sourceType === 'norma_verificada';
  validateVerifiedItem(prefix, p.summary || p.title, isVerified, p.topicId);
});

// Validación cruzada de archivos de contenido y todas las guías contra la asociación errónea E1/E2 con 15 días / sin titulación
const guiasDir = path.resolve(__dirname, '../guias');
const allGuiaFiles = fs.existsSync(guiasDir)
  ? fs.readdirSync(guiasDir).filter(f => f.endsWith('.md')).sort().map(f => `../guias/${f}`)
  : [];

const contentFilesToAudit = [
  '../src/data/cifras_y_trampas.js',
  '../src/data/syllabus.js',
  '../src/data/flashcards.js',
  '../src/data/podcasts.js',
  ...allGuiaFiles
];

contentFilesToAudit.forEach(relPath => {
  const fullPath = path.resolve(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const clean = raw.replace(/<[^>]+>/g, '\n');
    const segments = clean.split(/[.\n;]/);
    segments.forEach((seg, idx) => {
      if (INVALID_E1_E2_PATTERNS.some(p => p.test(seg))) {
        errors.push(`[Archivo ${relPath}]: Infracción normativa en segmento ${idx}: relaciona erróneamente E1/E2 con 'sin titulación' o '15 días'. Texto: "${seg.trim()}"`);
      }
    });
  }
});


// Detector de muletillas sintéticas / n-gramas repetidos (secuencias de 5 o más palabras repetidas en > 3 opciones incorrectas y 0 correctas)
function extractNgrams(text, n = 5) {
  if (!text || typeof text !== 'string') return [];
  const words = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  const ngrams = [];
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '));
  }
  return ngrams;
}

const incorrectNgramsMap = new Map();
const correctNgramsSet = new Set();

QUESTION_BANK.forEach(q => {
  if (!Array.isArray(q.options) || q.options.length !== 4) return;
  q.options.forEach((opt, idx) => {
    const ngs = new Set(extractNgrams(opt, 5));
    if (idx === q.correct) {
      ngs.forEach(ng => correctNgramsSet.add(ng));
    } else {
      ngs.forEach(ng => {
        incorrectNgramsMap.set(ng, (incorrectNgramsMap.get(ng) || 0) + 1);
      });
    }
  });
});

const syntheticBoilerplates = [];
for (const [ngram, count] of incorrectNgramsMap.entries()) {
  if (count > 3 && !correctNgramsSet.has(ngram)) {
    syntheticBoilerplates.push({ ngram, count });
  }
}

if (syntheticBoilerplates.length > 0) {
  errors.push(`[MULETILLAS SINTÉTICAS] Se detectaron ${syntheticBoilerplates.length} secuencias repetidas en >3 opciones incorrectas y 0 en correctas: ` +
    syntheticBoilerplates.slice(0, 5).map(b => `"${b.ngram}" (${b.count} veces)`).join(', ')
  );
}

// Comprobar sesgos estadísticos
const total = QUESTION_BANK.length;
const maxLetterPct = total > 0 ? (Math.max(...Object.values(letterDist)) / total) * 100 : 0;
const longestPct = total > 0 ? (longestCorrectCount / total) * 100 : 0;
const shortestPct = total > 0 ? (shortestCorrectCount / total) * 100 : 0;

console.log(`Distribución de letras fijas en base: A=${letterDist[0]}, B=${letterDist[1]}, C=${letterDist[2]}, D=${letterDist[3]} (Máxima letra: ${maxLetterPct.toFixed(1)}%)`);
console.log(`Opción correcta más larga: ${longestCorrectCount}/${total} (${longestPct.toFixed(1)}%) [Banda requerida: 15%–48%]`);
console.log(`Opción correcta más corta: ${shortestCorrectCount}/${total} (${shortestPct.toFixed(1)}%) [Banda requerida: 15%–48%]\n`);

if (maxLetterPct > 35) {
  errors.push(`[SESGO DISTRIBUCIÓN] Una letra de respuesta correcta supera el umbral máximo de tolerancia del 35%: ${maxLetterPct.toFixed(1)}%`);
}

if (longestPct < 15 || longestPct > 48) {
  errors.push(`[SESGO LONGITUD] La opción correcta es la más larga en ${longestPct.toFixed(1)}%, fuera de la banda admisible (15%–48%).`);
}

if (shortestPct < 15 || shortestPct > 48) {
  errors.push(`[SESGO LONGITUD] La opción correcta es la más corta en ${shortestPct.toFixed(1)}%, fuera de la banda admisible (15%–48%).`);
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
