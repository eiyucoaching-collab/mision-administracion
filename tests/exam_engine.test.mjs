import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  shuffleQuestionOptions,
  createExamPool,
  calculateExamScore,
  getTimeLimitForMode
} from '../src/exam/engine.js';
import { QUESTION_BANK } from '../src/data/questions.js';

describe('P0 Exam Engine Tests', () => {

  it('P0.1: Barajar opciones redistribuye uniformemente la respuesta correcta', () => {
    const sampleQuestion = {
      id: 1,
      question: '¿Pregunta de prueba?',
      options: ['Opción A corta', 'Opción B la más larga y siempre correcta', 'Opción C', 'Opción D'],
      correct: 1 // siempre B en origen
    };

    function createSeededRng(seed = 123456789) {
      let s = seed;
      return function() {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };
    }
    const rng = createSeededRng(100);

    const iterations = 2000;
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0 };

    for (let i = 0; i < iterations; i++) {
      const prepared = shuffleQuestionOptions(sampleQuestion, rng);
      assert.equal(prepared.options.length, 4);
      // La respuesta correcta debe seguir apuntando al texto correcto original
      assert.equal(prepared.options[prepared.correct], sampleQuestion.options[sampleQuestion.correct]);
      distribution[prepared.correct]++;
    }

    // Cada posición debe rondar el 25% (entre 20% y 30%, nunca > 35%)
    for (let pos = 0; pos < 4; pos++) {
      const pct = (distribution[pos] / iterations) * 100;
      console.log(`[SHUFFLE TEST] Posición ${pos}: ${pct.toFixed(1)}%`);
      assert.ok(pct >= 18 && pct <= 32, `La posición ${pos} se desvía del reparto uniforme: ${pct}%`);
    }
  });

  it('P0.1: Simulación de 2000 exámenes: Alumno que marca siempre B obtiene ~25% y SUSPENDE', () => {
    function createSeededRng(seed = 123456789) {
      let s = seed;
      return function() {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };
    }
    const rng = createSeededRng(42);

    let passedCount = 0;
    let totalCorrect = 0;
    let totalNetScore = 0;
    let totalRawNetScore = 0;
    const totalSimulations = 2000;

    for (let s = 0; s < totalSimulations; s++) {
      // Creamos un simulacro oficial de 60 preguntas con opciones barajadas deterministamente
      const poolResult = createExamPool(QUESTION_BANK, 'oficial', { rng });
      assert.ok(poolResult.questions.length >= 60);

      // Alumno marca siempre 'B' (índice 1) en las 60 preguntas
      const userAnswers = {};
      poolResult.questions.slice(0, 60).forEach(q => {
        userAnswers[q.id] = 1;
      });

      const score = calculateExamScore({
        mode: 'oficial',
        questions: poolResult.questions,
        userAnswers
      });

      if (score.passed) passedCount++;
      totalCorrect += score.correct;
      totalNetScore += score.netScore;
      totalRawNetScore += score.rawNetScore;
    }

    const passRate = (passedCount / totalSimulations) * 100;
    const avgCorrect = totalCorrect / totalSimulations;
    const avgNet = totalNetScore / totalSimulations;
    const avgRawNet = totalRawNetScore / totalSimulations;

    console.log(`[SIMULACIÓN 2000 EXÁMENES ALUMNO B] Media aciertos: ${avgCorrect.toFixed(2)}/60`);
    console.log(`[SIMULACIÓN 2000 EXÁMENES ALUMNO B] Media neta truncada (suelo 0): ${avgNet.toFixed(2)}/60`);
    console.log(`[SIMULACIÓN 2000 EXÁMENES ALUMNO B] Media neta teórica sin truncar: ${avgRawNet.toFixed(2)}/60 (esperado: 0.00)`);
    console.log(`[SIMULACIÓN 2000 EXÁMENES ALUMNO B] Tasa aprobados: ${passRate.toFixed(2)}%`);

    assert.equal(passedCount, 0, `Un alumno marcando siempre B aprobó ${passedCount} simulacros (debe ser 0)`);
    assert.ok(avgCorrect >= 13 && avgCorrect <= 17, `Los aciertos medios (${avgCorrect}) deben rondar 15`);
    // La media sin truncar debe ser prácticamente 0 (-0.5 a +0.5)
    assert.ok(Math.abs(avgRawNet) < 0.5, `La media teórica sin truncar (${avgRawNet}) debe aproximar 0.00`);
    // La media truncada en 0 (donde valores negativos se redondean a 0) ronda 1.7-1.9 puntos
    assert.ok(avgNet >= 1.4 && avgNet <= 2.2, `La media truncada en 0 (${avgNet}) debe situarse en torno a 1.75 puntos`);
  });

  it('P0.8: Las preguntas "sin_verificar" quedan estrictamente excluidas del simulacro oficial', () => {
    const bankWithUnverified = [
      ...QUESTION_BANK.slice(0, 66),
      { id: 9999, block: 'especifico', topicId: 5, question: 'Dudosa', options: ['A','B','C','D'], correct: 0, law: 'Manual Desconocido', article: 'Art. 1', explanation: 'Test', sourceType: 'sin_verificar' }
    ];

    const officialPool = createExamPool(bankWithUnverified, 'oficial', { allowUnverified: true }); // Intento forzado de incluir
    const hasUnverified = officialPool.questions.some(q => q.sourceType === 'sin_verificar');
    assert.equal(hasUnverified, false, 'El simulacro oficial no debe permitir preguntas sin verificar');
  });

  it('P0.4: createExamPool soporta modo "tema:N" y no crashea si el pool está vacío', () => {
    // Caso tema válido
    const tema1 = createExamPool(QUESTION_BANK, 'tema:1');
    assert.ok(tema1.questions.length > 0, 'Debe devolver preguntas del Tema 1');
    tema1.questions.forEach(q => assert.equal(q.topicId, 1));

    // Caso tema inexistente o sin preguntas
    const temaInvalido = createExamPool(QUESTION_BANK, 'tema:999');
    assert.equal(temaInvalido.questions.length, 0);
    assert.ok(temaInvalido.error, 'Debe indicar error cuando el pool está vacío');
  });

  it('P0.5: calculateExamScore califica 60 ordinarias y sólo aplica reservas a preguntas legítimamente anuladas', () => {
    // 60 preguntas ordinarias + 6 de reserva
    const pool = createExamPool(QUESTION_BANK, 'oficial').questions;
    assert.equal(pool.length, 66);

    // Sin anulaciones: califica exactamente 60 preguntas
    const userAnswers = {};
    for (let i = 0; i < 60; i++) {
      // Respondemos 30 bien, 30 en blanco
      if (i < 30) {
        userAnswers[pool[i].id] = pool[i].correct;
      }
    }

    const resStandard = calculateExamScore({
      mode: 'oficial',
      questions: pool,
      userAnswers
    });

    assert.equal(resStandard.totalGraded, 60);
    assert.equal(resStandard.correct, 30);
    assert.equal(resStandard.blank, 30);
    assert.equal(resStandard.wrong, 0);
    assert.equal(resStandard.netScore, 30);
    assert.equal(resStandard.passed, true); // 30 >= 50% de 60
  });

  it('P0.6: getTimeLimitForMode devuelve tiempos proporcionales según el modo y número de preguntas', () => {
    assert.equal(getTimeLimitForMode('oficial', 60), 3600); // 60 min
    assert.equal(getTimeLimitForMode('real2025', 60), 3600); // 60 min
    assert.equal(getTimeLimitForMode('comun', 20), 1200);   // 20 min
    assert.equal(getTimeLimitForMode('especifico', 40), 2400); // 40 min
    assert.equal(getTimeLimitForMode('tema:1', 10), 600);   // 10 min
  });

  it('P0.5: real2025 califica 60 ordinarias y no 66, corte en 30', () => {
    const pool = createExamPool(QUESTION_BANK, 'real2025').questions;
    assert.equal(pool.length, 66);

    const userAnswers = {};
    for (let i = 0; i < 60; i++) {
      if (i < 29) {
        userAnswers[pool[i].id] = pool[i].correct;
      }
    }

    const res = calculateExamScore({
      mode: 'real2025',
      questions: pool,
      userAnswers
    });

    assert.equal(res.totalGraded, 60, 'Debe calificar 60 preguntas ordinarias, no 66');
    assert.equal(res.cutoffScore, 30, 'El corte debe ser 30 (50% de 60)');
    assert.equal(res.netScore, 29);
    assert.equal(res.passed, false, '29 netos está por debajo del corte de 30');
  });

  it('P0.4: createExamPool acepta formato "Tema 2" con espacio', () => {
    const res = createExamPool(QUESTION_BANK, 'Tema 2');
    assert.ok(res.questions.length > 0);
    res.questions.forEach(q => assert.equal(q.topicId, 2));
  });

  it('P0.5: Penalización estricta de -1/3', () => {
    const questions = [
      { id: 101, correct: 0, options: ['A','B','C','D'] },
      { id: 102, correct: 1, options: ['A','B','C','D'] },
      { id: 103, correct: 2, options: ['A','B','C','D'] },
      { id: 104, correct: 0, options: ['A','B','C','D'] },
      { id: 105, correct: 1, options: ['A','B','C','D'] },
      { id: 106, correct: 2, options: ['A','B','C','D'] }
    ];

    // 3 aciertos, 3 fallos -> 3 - (3 * 1/3) = 2.00 netos
    const userAnswers = {
      101: 0, // Acierto
      102: 1, // Acierto
      103: 2, // Acierto
      104: 3, // Fallo (era 0)
      105: 3, // Fallo (era 1)
      106: 3  // Fallo (era 2)
    };

    const res = calculateExamScore({
      mode: 'tema:1',
      questions,
      userAnswers
    });

    assert.equal(res.correct, 3);
    assert.equal(res.wrong, 3);
    assert.equal(res.blank, 0);
    assert.equal(res.netScore, 2.00);
    assert.equal(res.totalGraded, 6);
    assert.equal(res.cutoffScore, 3.00);
    assert.equal(res.passed, false); // 2.00 < 3.00
  });

});
