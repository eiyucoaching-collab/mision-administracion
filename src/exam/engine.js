/**
 * MOTOR DE EXÁMENES PURO (SIN DEPENDENCIAS DE DOM)
 * Misión Administración (Opo-Defensa E1)
 * 
 * Implementa barajado estocástico de opciones, remapeo de índices,
 * cálculo estricto de penalización (-1/3), umbrales proporcionales y gestión
 * de preguntas de reserva sin posiciones mágicas.
 */

/**
 * Baraja un array in-place o devuelve copia barajada usando Fisher-Yates
 */
export function shuffleArray(array, rng = Math.random) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Baraja las 4 opciones de una pregunta y remapea el índice 'correct'
 * Mantiene inalterada la correspondencia del texto correcto.
 */
export function shuffleQuestionOptions(question, rng = Math.random) {
  if (!question || !Array.isArray(question.options)) return question;

  const originalOptions = question.options;
  const originalCorrectIndex = question.correct;
  const originalCorrectText = originalOptions[originalCorrectIndex];

  // Generamos pares [opcion, indexOriginal]
  const indexedOptions = originalOptions.map((text, idx) => ({ text, originalIdx: idx }));
  const shuffledIndexed = shuffleArray(indexedOptions, rng);

  // Encontramos la nueva posición de la opción correcta
  const newCorrectIndex = shuffledIndexed.findIndex(item => item.text === originalCorrectText);

  return {
    ...question,
    options: shuffledIndexed.map(item => item.text),
    correct: newCorrectIndex,
    _originalCorrect: originalCorrectIndex
  };
}

/**
 * Determina el límite de tiempo en segundos según el modo y número de preguntas
 */
export function getTimeLimitForMode(mode, questionCount = 60) {
  if (mode === 'oficial' || mode === 'real2025') return 3600; // 60 minutos oficiales
  if (mode === 'sprint45') return 2700; // 45 preguntas = 45 minutos
  if (mode === 'trampas') return 1200;  // 20 preguntas trampa = 20 minutos
  if (mode === 'comun') return 1200;   // 20 preguntas = 20 minutos
  if (mode === 'especifico') return 2400; // 40 preguntas = 40 minutos
  if (mode === 'srs') return Math.max(600, questionCount * 60);
  
  // Modos por tema o personalizados: 60 segundos por pregunta (mínimo 10 min)
  return Math.max(600, questionCount * 60);
}

/**
 * Normaliza una pregunta para soportar esquemas duales transparentemente
 */
export function normalizeQuestion(q) {
  if (!q || typeof q !== 'object') return q;
  const topicId = q.topicId ?? q.temaId ?? 1;
  const block = q.block || q.bloque || (topicId <= 4 ? 'comun' : 'especifico');
  return {
    ...q,
    id: q.id,
    block,
    topicId,
    topic: q.topic || q.temaNombre || `Tema ${topicId}`,
    question: q.question || q.pregunta || '',
    options: q.options || q.opciones || [],
    correct: q.correct ?? q.correcta ?? 0,
    law: q.law || q.referenciaLegal || '',
    article: q.article || '',
    explanation: q.explanation || q.explicacion || '',
    sourceType: q.sourceType || 'original_propia',
    isTrap: Boolean(q.isTrap || q.esTrampa)
  };
}

/**
 * Crea el pool de preguntas para una sesión de examen con opciones barajadas
 */
export function createExamPool(questionBank, mode, options = {}) {
  const { failedQuestionsSet = new Set(), srsQuestionIds = new Set(), allowUnverified = false, rng = Math.random } = options;

  // Normalizar esquema de todas las preguntas
  const normalizedBank = (questionBank || []).map(normalizeQuestion);

  // En simulacro oficial/real nunca entran preguntas sin verificar bajo ninguna circunstancia
  const effectiveAllow = (mode === 'oficial' || mode === 'real2025') ? false : allowUnverified;
  const validBank = effectiveAllow 
    ? normalizedBank 
    : normalizedBank.filter(q => q.sourceType !== 'sin_verificar');

  let selectedQuestions = [];

  if (mode === 'oficial') {
    // 60 ordinarias: 20 comunes + 40 específicas
    // 6 de reserva: 2 comunes (R1, R2) + 4 específicas (R3, R4, R5, R6)
    const comunPool = shuffleArray(validBank.filter(q => q.block === 'comun'), rng);
    const espPool = shuffleArray(validBank.filter(q => q.block === 'especifico'), rng);

    const comunOrd = comunPool.slice(0, 20);
    const espOrd = espPool.slice(0, 40);
    const comunRes = comunPool.slice(20, 22);
    const espRes = espPool.slice(40, 44);
    selectedQuestions = [...comunOrd, ...espOrd, ...comunRes, ...espRes];
  } else if (mode === 'sprint45') {
    // 45 preguntas tácticas: 15 comunes + 30 específicas (45 minutos)
    const comunPool = shuffleArray(validBank.filter(q => q.block === 'comun'), rng);
    const espPool = shuffleArray(validBank.filter(q => q.block === 'especifico'), rng);
    selectedQuestions = [...comunPool.slice(0, 15), ...espPool.slice(0, 30)];
  } else if (mode === 'trampas') {
    // Preguntas trampa: marcadas expresamente o con distractores clásicos del tribunal
    const trapKeywords = ['15 días', 'período de prueba', 'periodo de prueba', 'E0', 'E1', 'E2', 'subdirector general', 'inviolable', 'doble sobre', '17 ºc', '841', '1189', '40%', '60%', 'amparo'];
    const trapPool = validBank.filter(q => {
      if (q.isTrap) return true;
      const text = `${q.question} ${q.explanation}`.toLowerCase();
      return trapKeywords.some(kw => text.includes(kw.toLowerCase()));
    });
    const fallbackPool = trapPool.length >= 20 ? trapPool : validBank;
    selectedQuestions = shuffleArray(fallbackPool, rng).slice(0, 20);
  } else if (mode === 'srs') {
    // Preguntas pendientes de revisión según la Bóveda Leitner SRS
    const targetSet = srsQuestionIds instanceof Set ? srsQuestionIds : new Set(srsQuestionIds || []);
    if (targetSet.size === 0) {
      return {
        questions: [],
        error: 'No tienes preguntas pendientes de revisión en tu Bóveda de Fallos (SRS) para hoy.'
      };
    }
    const srsPool = validBank.filter(q => targetSet.has(q.id));
    selectedQuestions = shuffleArray(srsPool, rng);
  } else if (mode === 'real2025') {
    // Simulacro priorizando preguntas identificadas de convocatoria (60 ordinarias + 6 reservas)
    const realComun = shuffleArray(validBank.filter(q => q.block === 'comun' && (q.sourceType === 'real_exam' || q.isRealExam2025)), rng);
    const otherComun = shuffleArray(validBank.filter(q => q.block === 'comun' && !(q.sourceType === 'real_exam' || q.isRealExam2025)), rng);
    const realEsp = shuffleArray(validBank.filter(q => q.block === 'especifico' && (q.sourceType === 'real_exam' || q.isRealExam2025)), rng);
    const otherEsp = shuffleArray(validBank.filter(q => q.block === 'especifico' && !(q.sourceType === 'real_exam' || q.isRealExam2025)), rng);

    const fullComun = [...realComun, ...otherComun];
    const fullEsp = [...realEsp, ...otherEsp];

    const comunOrd = fullComun.slice(0, 20);
    const espOrd = fullEsp.slice(0, 40);
    const comunRes = fullComun.slice(20, 22);
    const espRes = fullEsp.slice(40, 44);

    selectedQuestions = [...comunOrd, ...espOrd, ...comunRes, ...espRes];
  } else if (mode === 'comun') {
    const comunPool = shuffleArray(validBank.filter(q => q.block === 'comun'), rng);
    selectedQuestions = comunPool.slice(0, 20);
  } else if (mode === 'especifico') {
    const espPool = shuffleArray(validBank.filter(q => q.block === 'especifico'), rng);
    selectedQuestions = espPool.slice(0, 40);
  } else if (mode === 'falladas') {
    if (!failedQuestionsSet || failedQuestionsSet.size === 0) {
      return {
        questions: [],
        error: 'No tienes preguntas registradas en tu Cuaderno de Falladas.'
      };
    }
    const failedPool = validBank.filter(q => failedQuestionsSet.has(q.id));
    selectedQuestions = shuffleArray(failedPool, rng);
  } else if (typeof mode === 'string' && (mode.startsWith('tema:') || mode.toLowerCase().startsWith('tema '))) {
    // Modo por tema específico: "tema:1", "tema:5", "Tema 3"
    const topicIdStr = mode.replace(/^tema:?/i, '').trim();
    const topicId = parseInt(topicIdStr, 10);
    const topicPool = validBank.filter(q => q.topicId === topicId);
    if (topicPool.length === 0) {
      return {
        questions: [],
        error: `No hay preguntas disponibles para el Tema ${topicId}.`
      };
    }
    selectedQuestions = shuffleArray(topicPool, rng);
  } else {
    // Fallback genérico barajado
    selectedQuestions = shuffleArray(validBank, rng).slice(0, 20);
  }

  if (selectedQuestions.length === 0) {
    return {
      questions: [],
      error: 'El bloque o modalidad seleccionada no contiene preguntas válidas.'
    };
  }

  // Barajar opciones de cada pregunta individual para eliminar sesgos de posición
  const preparedQuestions = selectedQuestions.map(q => shuffleQuestionOptions(q, rng));

  return {
    questions: preparedQuestions,
    error: null
  };
}

/**
 * Calcula los resultados objetivos de un simulacro
 */
export function calculateExamScore(sessionState) {
  const {
    mode,
    questions,
    userAnswers = {},
    confidenceLevels = {},
    penaltyRate = (1 / 3),
    timeRemaining = 0,
    initialTime = 3600
  } = sessionState;

  let questionsToGrade = [];

  if (mode === 'oficial' || mode === 'real2025') {
    const ordinarias = questions.slice(0, 60);
    const reservas = questions.slice(60, 66);
    let nextReservaIdx = 0;

    questionsToGrade = ordinarias.map((q, idx) => {
      // Las preguntas de reserva sólo sustituyen preguntas legítimamente marcadas como anuladas
      if (q.annulled === true) {
        if (nextReservaIdx < reservas.length) {
          const replacement = reservas[nextReservaIdx++];
          return {
            q: replacement,
            num: `${idx + 1} (Sustituida por R${nextReservaIdx})`,
            isAnnulled: true,
            replacedBy: replacement
          };
        } else {
          return {
            q: q,
            num: `${idx + 1} (Anulada sin reserva)`,
            isAnnulled: true,
            ignored: true
          };
        }
      }
      return { q, num: idx + 1, isAnnulled: false };
    }).filter(item => !item.ignored);
  } else {
    questionsToGrade = questions.map((q, idx) => ({ q, num: idx + 1, isAnnulled: false }));
  }

  // Tasa de penalización configurable (por defecto 1/3 ~ 0.33, o 0.25)
  const effectivePenalty = typeof penaltyRate === 'number' && !isNaN(penaltyRate)
    ? Math.abs(penaltyRate)
    : (1 / 3);

  let correct = 0;
  let wrong = 0;
  let blank = 0;
  const reviewList = [];
  const newlyFailedIds = [];
  const newlySucceededIds = [];

  // Metacognición: desglose por nivel de confianza
  const confidenceBreakdown = {
    segura: { count: 0, correct: 0, wrong: 0, blank: 0, net: 0 },
    duda: { count: 0, correct: 0, wrong: 0, blank: 0, net: 0, theoreticalEV: +(0.5 - 0.5 * effectivePenalty).toFixed(3), empiricalYield: 0 },
    riesgo: { count: 0, correct: 0, wrong: 0, blank: 0, net: 0, theoreticalEV: +(0.25 - 0.75 * effectivePenalty).toFixed(3), empiricalYield: 0 }
  };

  questionsToGrade.forEach(item => {
    const q = item.q;
    const userAns = userAnswers[q.id];
    const isBlank = userAns === undefined || userAns === null;
    const isCorrect = !isBlank && userAns === q.correct;
    const conf = confidenceLevels[q.id] || (isBlank ? 'riesgo' : 'segura');
    const bucket = confidenceBreakdown[conf] || confidenceBreakdown.segura;

    bucket.count++;
    if (isBlank) {
      blank++;
      bucket.blank++;
    } else if (isCorrect) {
      correct++;
      bucket.correct++;
      newlySucceededIds.push(q.id);
    } else {
      wrong++;
      bucket.wrong++;
      newlyFailedIds.push(q.id);
    }

    reviewList.push({
      num: item.num,
      question: q,
      userAns: userAns,
      isCorrect: isCorrect,
      isBlank: isBlank,
      confidence: conf,
      isAnnulled: item.isAnnulled
    });
  });

  // Calcular rendimiento neto empírico por nivel de confianza
  ['segura', 'duda', 'riesgo'].forEach(cat => {
    const b = confidenceBreakdown[cat];
    b.net = +(b.correct - (b.wrong * effectivePenalty)).toFixed(2);
    b.empiricalYield = b.net;
  });

  const totalGraded = questionsToGrade.length;
  const penalty = +(wrong * effectivePenalty).toFixed(4);
  const rawNetScore = +(correct - penalty).toFixed(2);
  const netScore = Math.max(0, rawNetScore);
  const cutoffScore = +(totalGraded * 0.5).toFixed(2);
  const passed = netScore >= cutoffScore;

  // Rentabilidad del Riesgo: puntos netos generados en dudas y riesgos frente a dejar en blanco (0)
  const doubtNet = confidenceBreakdown.duda.net;
  const riskNet = confidenceBreakdown.riesgo.net;
  const totalRiskNet = +(doubtNet + riskNet).toFixed(2);

  let tacticalAdvice = '';
  if (confidenceBreakdown.duda.count > 0) {
    if (doubtNet > 0) {
      tacticalAdvice = `Rentabilidad en Dudas 50/50: +${doubtNet.toFixed(2)} puntos netos. Tu precisión al descartar entre 2 opciones es estadísticamente rentable. El 19/12 debes arriesgar en estas dudas.`;
    } else {
      tacticalAdvice = `En tus dudas 50/50 has cedido ${Math.abs(doubtNet).toFixed(2)} puntos. Si no logras descartar con total seguridad 2 distractores, la decisión táctica correcta es dejar en blanco.`;
    }
  } else if (confidenceBreakdown.riesgo.count > 0) {
    if (riskNet < 0) {
      tacticalAdvice = `Has perdido ${Math.abs(riskNet).toFixed(2)} puntos en respuestas al azar: el valor esperado del azar puro con 4 opciones es negativo. En el examen oficial, déjalas en blanco.`;
    } else {
      tacticalAdvice = `Has ganado ${riskNet.toFixed(2)} puntos en azar por fortuna, pero recuerda que estadísticamente el azar puro a 4 opciones tiene EV <= 0.`;
    }
  } else {
    tacticalAdvice = `Todas tus respuestas fueron con confianza Segura (100%). Mantén la concentración para blindar el corte.`;
  }

  const timeSpentSecs = Math.max(0, initialTime - timeRemaining);

  return {
    id: Date.now(),
    date: new Date().toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    mode,
    totalGraded,
    correct,
    wrong,
    blank,
    netScore,
    rawNetScore,
    cutoffScore,
    passed,
    penaltyRate: effectivePenalty,
    timeSpentSecs,
    reviewList,
    newlyFailedIds,
    newlySucceededIds,
    confidenceBreakdown,
    totalRiskNet,
    tacticalAdvice
  };
}

/**
 * Inicializa el estado puro de una sesión de examen (sin DOM ni intervalos)
 */
export function initExamSessionState(questionBank, mode, options = {}) {
  const poolResult = createExamPool(questionBank, mode, options);
  if (poolResult.error || !poolResult.questions || poolResult.questions.length === 0) {
    return {
      error: poolResult.error || 'No se han podido cargar preguntas para esta modalidad.',
      questions: [],
      mode,
      status: 'idle'
    };
  }

  const timeLimit = getTimeLimitForMode(mode, poolResult.questions.length);

  return {
    error: null,
    mode,
    status: 'running',
    questions: poolResult.questions,
    currentIndex: 0,
    userAnswers: {},
    crossedOptions: {},
    confidenceLevels: {}, // { [qId]: 'segura' | 'duda' | 'riesgo' }
    flagged: new Set(),
    initialTime: timeLimit,
    timeRemaining: timeLimit,
    filterReview: 'all',
    results: null
  };
}

/**
 * Calcula las métricas del panel y analíticas aislando estrictamente
 * los simulacros oficiales de 60 preguntas frente a tests parciales o por tema.
 */
export function calculateDashboardMetrics(history = []) {
  if (!Array.isArray(history) || history.length === 0) {
    return {
      totalExams: 0,
      oficialCount: 0,
      mediaOficial: '0.00',
      pctOficialAprobado: null,
      aprobadosOficialCount: 0,
      parcialCount: 0,
      mediaParcialPct: '0.0'
    };
  }

  // Modos oficiales: 60 preguntas ordinarias
  const oficialSims = history.filter(h => h && (h.mode === 'oficial' || h.mode === 'real2025'));
  // Modos parciales: tests por tema ('tema:N', 'Tema N'), comunes (20q), específicos (40q), falladas
  const parcialSims = history.filter(h => h && h.mode !== 'oficial' && h.mode !== 'real2025');

  const oficialCount = oficialSims.length;
  let mediaOficial = '0.00';
  let pctOficialAprobado = null;
  let aprobadosOficialCount = 0;

  if (oficialCount > 0) {
    const sumOficialNet = oficialSims.reduce((acc, h) => acc + (typeof h.netScore === 'number' ? h.netScore : 0), 0);
    mediaOficial = (sumOficialNet / oficialCount).toFixed(2);
    aprobadosOficialCount = oficialSims.filter(h => h.passed === true).length;
    pctOficialAprobado = Math.round((aprobadosOficialCount / oficialCount) * 100);
  }

  const parcialCount = parcialSims.length;
  let mediaParcialPct = '0.0';
  if (parcialCount > 0) {
    const sumPct = parcialSims.reduce((acc, h) => {
      const total = h.totalGraded || h.total || 20;
      const score = typeof h.netScore === 'number' ? h.netScore : 0;
      return acc + (total > 0 ? (score / total) * 100 : 0);
    }, 0);
    mediaParcialPct = (sumPct / parcialCount).toFixed(1);
  }

  return {
    totalExams: history.length,
    oficialCount,
    mediaOficial,
    pctOficialAprobado,
    aprobadosOficialCount,
    parcialCount,
    mediaParcialPct
  };
}

