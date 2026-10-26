/**
 * @file src/config/exam_config.js
 * @description Configuración oficial canónica del proceso selectivo (Resolución 430/38310/2026, BOE-A-2026-14677)
 * Grupo Profesional E1 - Servicios Administrativos | Ministerio de Defensa (IV CUAGE)
 */

export const OFFICIAL_EXAM_CONFIG = {
  convocatoria: 'Resolución 430/38310/2026 (BOE-A-2026-14677)',
  categoria: 'Grupo Profesional E1 - Servicios Administrativos',
  ministerio: 'Ministerio de Defensa (IV CUAGE)',
  fechaExamen: '2026-12-19',
  sedePrincipal: 'Murcia',
  plazasTurnoLibre: 40,
  tiempoMinutos: 60,
  tiempoSegundos: 3600,
  totalOrdinarias: 60,
  ordinariasComun: 20,
  ordinariasEspecifico: 40,
  totalReservas: 6,
  reservasComun: 2, // R1 y R2 sustituyen exclusivamente preguntas anuladas del Bloque Común
  reservasEspecifico: 4, // R3, R4, R5 y R6 sustituyen exclusivamente preguntas anuladas del Bloque Específico
  penalizacionOficial: 1 / 3, // Cada fallo resta exactamente un tercio del valor de una correcta (-0.3333 pts)
  corteAprobadoMinimo: 30.00, // 50% de la puntuación máxima
  cortePlazaEstimado: 50.00, // Margen de seguridad para plaza directa en Murcia
  ponderacionBloques: {
    comun: 20 / 60, // 33.33%
    especifico: 40 / 60 // 66.67%
  }
};

export const EXAM_MODES_CONFIG = {
  inedito: {
    id: 'inedito',
    name: 'Simulacro Oficial Inédito (Preguntas Nuevas)',
    shortName: 'Simulacro Inédito',
    badge: '100% Inédito',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: '60 ordinarias (20 comunes + 40 específicas) + 6 reservas seleccionadas exclusivamente de preguntas nunca vistas antes. Evalúa tu nota real sin sesgo de memoria.',
    timeMin: 60,
    totalQuestions: 66,
    gradedQuestions: 60,
    cutoff: 30.00
  },
  oficial_age_2025: {
    id: 'oficial_age_2025',
    name: 'Examen Oficial Íntegro AGE (25/02/2025)',
    shortName: 'AGE 25/02/2025',
    badge: 'Examen Real Íntegro',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    description: 'Las 60 preguntas del ejercicio unitario IV CUAGE en orden y opciones oficiales originales, con R1 incorporada tras la anulación formal de P11.',
    timeMin: 60,
    totalQuestions: 60,
    gradedQuestions: 60,
    cutoff: 30.00
  },
  oficial_defensa_2025: {
    id: 'oficial_defensa_2025',
    name: 'Examen Oficial Íntegro Defensa (01/02/2025)',
    shortName: 'Defensa 01/02/2025',
    badge: 'Convocatoria Anterior',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    description: '59 preguntas operativas reales validadas de la convocatoria anterior del Ministerio de Defensa en su secuencia oficial.',
    timeMin: 60,
    totalQuestions: 59,
    gradedQuestions: 59,
    cutoff: 29.50
  },
  oficial: {
    id: 'oficial',
    name: 'Simulacro Aleatorio General (Banco 310)',
    shortName: 'Simulacro General',
    badge: '60 + 6 Reserva',
    badgeClass: 'bg-slate-700 text-slate-300 border-slate-600',
    description: 'Simulacro completo con barajado del banco íntegro (20 comunes + 40 específicas + 6 reservas). Penalización oficial -1/3 y sustitución por bloque.',
    timeMin: 60,
    totalQuestions: 66,
    gradedQuestions: 60,
    cutoff: 30.00
  },
  evaluacion_final: {
    id: 'evaluacion_final',
    name: 'Examen de Evaluación Final (Diagnóstico 19-D)',
    shortName: 'Evaluación Final',
    badge: 'Prueba de Corte',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    description: 'Simulacro reservado para la evaluación final antes del examen. Mide si tienes consolidado el margen de corte (>= 42 netos para plaza).',
    timeMin: 60,
    totalQuestions: 66,
    gradedQuestions: 60,
    cutoff: 30.00
  }
};
