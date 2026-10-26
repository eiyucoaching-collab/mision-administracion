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
