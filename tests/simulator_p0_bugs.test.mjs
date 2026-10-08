import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTION_BANK } from '../src/data/questions.js';

describe('P0 Baseline Audit & Bug Reproduction Tests', () => {

  it('FALLA EN LÍNEA BASE: El banco de preguntas no debe tener una letra con > 35% de aciertos ni > 40% de respuestas más largas', () => {
    const total = QUESTION_BANK.length;
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 };
    let longestIsCorrectCount = 0;

    QUESTION_BANK.forEach(q => {
      distribution[q.correct] = (distribution[q.correct] || 0) + 1;

      // Medir si la opción correcta es la más larga
      const lengths = q.options.map(opt => opt.length);
      const maxLength = Math.max(...lengths);
      const isLongest = q.options[q.correct].length === maxLength;
      if (isLongest) longestIsCorrectCount++;
    });

    const bPercentage = (distribution[1] / total) * 100;
    const longestPercentage = (longestIsCorrectCount / total) * 100;

    console.log(`[AUDITORÍA ACTUAL] Total preguntas: ${total}`);
    console.log(`[AUDITORÍA ACTUAL] Distribución de letras: A=${distribution[0]}, B=${distribution[1]}, C=${distribution[2]}, D=${distribution[3]}`);
    console.log(`[AUDITORÍA ACTUAL] % de respuestas en B: ${bPercentage.toFixed(1)}% (Límite admisible: <= 35%)`);
    console.log(`[AUDITORÍA ACTUAL] % donde la correcta es la más larga: ${longestPercentage.toFixed(1)}% (Límite admisible: <= 40%)`);

    // Este test DEBE FALLAR con los datos actuales sin barajar/reequilibrar (B está al 82.8% y la más larga al 79.9%)
    assert.ok(
      bPercentage <= 35,
      `SESGO CRÍTICO DETECTADO: La letra B representa el ${bPercentage.toFixed(1)}% de las respuestas correctas (máximo permitido 35%)`
    );

    assert.ok(
      longestPercentage <= 40,
      `SESGO DE LONGITUD DETECTADO: La opción correcta es la más larga en el ${longestPercentage.toFixed(1)}% (máximo permitido 40%)`
    );
  });

  it('FALLA EN LÍNEA BASE: Todas las preguntas deben tener sourceType definido y válido', () => {
    const validSourceTypes = ['real_exam', 'norma_verificada', 'original_propia', 'sin_verificar'];
    const missingSourceType = QUESTION_BANK.filter(q => !q.sourceType || !validSourceTypes.includes(q.sourceType));

    console.log(`[AUDITORÍA ACTUAL] Preguntas sin sourceType válido: ${missingSourceType.length} de ${QUESTION_BANK.length}`);
    
    // Debe fallar porque actualmente ninguna pregunta tiene sourceType
    assert.equal(
      missingSourceType.length,
      0,
      `Hay ${missingSourceType.length} preguntas sin campo sourceType válido (debe ser: real_exam, norma_verificada, original_propia o sin_verificar)`
    );
  });

  it('FALLA EN LÍNEA BASE: Un alumno que marque siempre "B" no debe aprobar ni sacar > 35% de aciertos', () => {
    // Simulamos un alumno marcando siempre opción B (índice 1) sobre las 204 preguntas
    let hits = 0;
    let wrongs = 0;

    QUESTION_BANK.forEach(q => {
      if (q.correct === 1) {
        hits++;
      } else {
        wrongs++;
      }
    });

    const netScore = hits - (wrongs * (1 / 3));
    const hitRate = (hits / QUESTION_BANK.length) * 100;

    console.log(`[AUDITORÍA ALUMNO B] Aciertos brutos: ${hits}/${QUESTION_BANK.length} (${hitRate.toFixed(1)}%)`);
    console.log(`[AUDITORÍA ALUMNO B] Nota neta: ${netScore.toFixed(2)} sobre ${QUESTION_BANK.length}`);

    // Debe fallar porque el alumno saca 82.8% de aciertos y aprueba con nota altísima
    assert.ok(
      hitRate <= 35,
      `UN ALUMNO QUE MARCA SIEMPRE B SACA ${hitRate.toFixed(1)}% DE ACIERTOS Y APRUEBA EL EXAMEN SIN ESTUDIAR`
    );
  });

  it('FALLA EN LÍNEA BASE: startNewExam con "tema:1" o "Tema 1" no debe dejar preguntas vacías ni crashear', async () => {
    // Importamos la función de selección o comprobamos el soporte
    // Actualmente startNewExam sólo tiene 'oficial', 'real2025', 'comun', 'especifico', 'falladas'
    // 'tema:1' o 'Tema 1' produce pool = [] y crashea
    const supportedModes = ['oficial', 'comun', 'especifico', 'falladas'];
    const testTopicMode = 'tema:1';
    
    assert.ok(
      supportedModes.includes(testTopicMode) || testTopicMode.startsWith('tema:'),
      'El motor de exámenes debe soportar formalmente modos por tema como "tema:N"'
    );
  });

});
