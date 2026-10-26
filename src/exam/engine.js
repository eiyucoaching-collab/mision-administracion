/**
 * MOTOR DE EXÁMENES PURO (SIN DEPENDENCIAS DE DOM)
 * Misión Administración (Opo-Defensa E1)
 * 
 * Implementa barajado estocástico de opciones, remapeo de índices,
 * cálculo estricto de penalización (-1/3), umbrales proporcionales y gestión
 * de preguntas de reserva sin posiciones mágicas.
 */

export const EXAM_MODES = {
  OFICIAL: 'oficial',                    // Simulacro Tipo Examen Mezclado (60 ord + 6 res)
  INEDITO: 'inedito',                    // Simulacro Oficial Inédito (Preguntas nunca vistas)
  OFICIAL_AGE_2025: 'oficial_age_2025',  // Examen Oficial AGE 25/02/2025 (60 preguntas íntegras)
  OFICIAL_DEFENSA_2025: 'oficial_defensa_2025', // Examen Oficial Defensa 01/02/2025 (59 preguntas íntegras)
  EVALUACION_FINAL: 'evaluacion_final',  // Examen de Evaluación Final (Diagnóstico de corte 19-D)
  SPRINT_45: 'sprint45',                 // 45 preguntas (15 común + 30 específica) en 45 min
  TRAMPAS: 'trampas',                    // 20 preguntas trampa en 20 min
  SRS: 'srs',                            // Repaso de Bóveda Leitner SRS
  COMUN: 'comun',                        // 20 preguntas bloque común
  ESPECIFICO: 'especifico',              // 40 preguntas bloque específico
  FALLADAS: 'falladas'                   // Cuaderno de falladas
};

/**
 * Identifica si un modo corresponde a una prueba oficial de 60 preguntas
 */
export function isOfficialMode(mode) {
  return ['oficial', 'real2025', 'inedito', 'evaluacion_final', 'oficial_age_2025', 'oficial_defensa_2025'].includes(mode);
}

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
  if (isOfficialMode(mode)) return 3600; // 60 minutos oficiales Anexo V
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
  const effectiveAllow = isOfficialMode(mode) ? false : allowUnverified;
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
  } else if (mode === 'inedito') {
    // Simulacro Oficial Inédito: selecciona 20 comunes + 40 específicas + 6 reservas
    // exclusivamente de preguntas que el usuario NO ha visto todavía
    const seenSet = new Set(Array.from(options.seenQuestionIds || []).map(Number));
    const unseenBank = validBank.filter(q => !seenSet.has(Number(q.id)));
    const unseenComun = shuffleArray(unseenBank.filter(q => q.block === 'comun'), rng);
    const unseenEsp = shuffleArray(unseenBank.filter(q => q.block === 'especifico'), rng);

    let comunOrd = unseenComun.slice(0, 20);
    let espOrd = unseenEsp.slice(0, 40);
    let comunRes = unseenComun.slice(20, 22);
    let espRes = unseenEsp.slice(40, 44);

    // Si faltan inéditas en común para completar 22, rellenar con las vistas del banco común
    if (comunOrd.length + comunRes.length < 22) {
      const remainingNeeded = 22 - (comunOrd.length + comunRes.length);
      const seenComun = shuffleArray(validBank.filter(q => q.block === 'comun' && seenSet.has(Number(q.id))), rng);
      const combinedComun = [...comunOrd, ...comunRes, ...seenComun.slice(0, remainingNeeded)];
      comunOrd = combinedComun.slice(0, 20);
      comunRes = combinedComun.slice(20, 22);
    }

    // Si faltan inéditas en específico para completar 44, rellenar con las vistas del banco específico
    if (espOrd.length + espRes.length < 44) {
      const remainingNeeded = 44 - (espOrd.length + espRes.length);
      const seenEsp = shuffleArray(validBank.filter(q => q.block === 'especifico' && seenSet.has(Number(q.id))), rng);
      const combinedEsp = [...espOrd, ...espRes, ...seenEsp.slice(0, remainingNeeded)];
      espOrd = combinedEsp.slice(0, 40);
      espRes = combinedEsp.slice(40, 44);
    }

    selectedQuestions = [...comunOrd, ...espOrd, ...comunRes, ...espRes];
  } else if (mode === 'oficial_age_2025') {
    // Examen Oficial Íntegro AGE / MITECO (25/02/2025): IDs 191 a 250 en secuencia exacta
    // 60 preguntas ordenadas tal como figuraron en la plantilla oficial definitiva (P11 reemplazada por R1)
    const ageQuestions = validBank
      .filter(q => q.id >= 191 && q.id <= 250)
      .sort((a, b) => a.id - b.id);

    if (ageQuestions.length < 60) {
      return {
        questions: [],
        error: 'No se encontraron las 60 preguntas oficiales del examen AGE 25/02/2025.'
      };
    }
    selectedQuestions = ageQuestions;
  } else if (mode === 'oficial_defensa_2025') {
    // Examen Oficial Íntegro Defensa (01/02/2025): IDs 132 a 190 en secuencia exacta
    // 59 preguntas reales validadas de la convocatoria anterior de Defensa
    const defQuestions = validBank
      .filter(q => q.id >= 132 && q.id <= 190)
      .sort((a, b) => a.id - b.id);

    if (defQuestions.length === 0) {
      return {
        questions: [],
        error: 'No se encontraron las preguntas oficiales del examen de Defensa 01/02/2025.'
      };
    }
    selectedQuestions = defQuestions;
  } else if (mode === 'evaluacion_final') {
    // Examen de Evaluación Final reservado: 20 común + 40 específica + 6 reservas
    const comunPool = shuffleArray(validBank.filter(q => q.block === 'comun'), rng);
    const espPool = shuffleArray(validBank.filter(q => q.block === 'especifico'), rng);
    selectedQuestions = [
      ...comunPool.slice(0, 20),
      ...espPool.slice(0, 40),
      ...comunPool.slice(20, 22),
      ...espPool.slice(40, 44)
    ];
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
    const targetSet = new Set(Array.from(srsQuestionIds || []).map(Number));
    if (targetSet.size === 0) {
      return {
        questions: [],
        error: 'No tienes preguntas pendientes de revisión en tu Bóveda de Fallos (SRS) para hoy.'
      };
    }
    const srsPool = validBank.filter(q => targetSet.has(Number(q.id)));
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

  // Barajar opciones de cada pregunta individual para eliminar sesgos de posición,
  // salvo en exámenes oficiales íntegros donde se preserva el orden original del cuadernillo oficial
  const shouldShuffleOptions = options.shuffleOptions ?? !(mode === 'oficial_age_2025' || mode === 'oficial_defensa_2025');
  const preparedQuestions = shouldShuffleOptions
    ? selectedQuestions.map(q => shuffleQuestionOptions(q, rng))
    : selectedQuestions.map(q => ({ ...q }));

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

  const isOfficial60WithReserves = (mode === 'oficial' || mode === 'real2025' || mode === 'inedito' || mode === 'evaluacion_final');

  if (isOfficial60WithReserves) {
    const ordinarias = questions.slice(0, 60);
    const reservas = questions.slice(60, 66);

    // Separar reservas por bloque según la convocatoria oficial:
    // Bloque Común: 2 reservas (R1, R2)
    // Bloque Específico: 4 reservas (R3, R4, R5, R6)
    const comunReservas = reservas.filter((r, rIdx) => r.block === 'comun' || (!r.block && rIdx < 2));
    const espReservas = reservas.filter((r, rIdx) => r.block === 'especifico' || (!r.block && rIdx >= 2));

    let nextComunIdx = 0;
    let nextEspIdx = 0;

    questionsToGrade = ordinarias.map((q, idx) => {
      // Las preguntas de reserva sólo sustituyen preguntas legítimamente anuladas en su respectivo bloque
      if (q.annulled === true) {
        const isComun = q.block === 'comun' || (!q.block && idx < 20);
        if (isComun && nextComunIdx < comunReservas.length) {
          const replacement = comunReservas[nextComunIdx++];
          const rNum = nextComunIdx;
          return {
            q: replacement,
            num: `${idx + 1} (Sustituida por R${rNum} Común)`,
            isAnnulled: true,
            replacedBy: replacement
          };
        } else if (!isComun && nextEspIdx < espReservas.length) {
          const replacement = espReservas[nextEspIdx++];
          const rNum = nextEspIdx + 2;
          return {
            q: replacement,
            num: `${idx + 1} (Sustituida por R${rNum} Específica)`,
            isAnnulled: true,
            replacedBy: replacement
          };
        } else {
          return {
            q: q,
            num: `${idx + 1} (Anulada sin reserva en su bloque)`,
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

  // Puntuación desglosada por bloque oficial (Común 33.3% vs Específico 66.7%)
  const blockScores = {
    comun: { total: 0, correct: 0, wrong: 0, blank: 0, net: 0, pct: 0 },
    especifico: { total: 0, correct: 0, wrong: 0, blank: 0, net: 0, pct: 0 }
  };

  questionsToGrade.forEach(item => {
    const q = item.q;
    const isComun = q.block === 'comun' || (!q.block && (q.topicId ? q.topicId <= 4 : (typeof item.num === 'number' ? item.num <= 20 : false)));
    const blk = isComun ? blockScores.comun : blockScores.especifico;
    blk.total++;

    const userAns = userAnswers[q.id];
    const isBlank = userAns === undefined || userAns === null;
    const isCorrect = !isBlank && userAns === q.correct;
    const conf = confidenceLevels[q.id] || (isBlank ? 'riesgo' : 'segura');
    const bucket = confidenceBreakdown[conf] || confidenceBreakdown.segura;

    bucket.count++;
    if (isBlank) {
      blank++;
      bucket.blank++;
      blk.blank++;
    } else if (isCorrect) {
      correct++;
      bucket.correct++;
      blk.correct++;
      newlySucceededIds.push(q.id);
    } else {
      wrong++;
      bucket.wrong++;
      blk.wrong++;
      newlyFailedIds.push(q.id);
    }

    reviewList.push({
      id: q.id,
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

  // Calcular rendimiento neto por bloque
  ['comun', 'especifico'].forEach(b => {
    const blk = blockScores[b];
    blk.net = +(blk.correct - (blk.wrong * effectivePenalty)).toFixed(2);
    blk.pct = blk.total > 0 ? +((blk.correct / blk.total) * 100).toFixed(1) : 0;
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
      tacticalAdvice = `Has cedido ${Math.abs(riskNet).toFixed(2)} puntos en respuestas arriesgadas: ante dudas totales donde no descartas opciones o hay distractores trampa (p < 0.25), el valor esperado es negativo. En esas preguntas, déjalas en blanco.`;
    } else {
      tacticalAdvice = `Has obtenido +${riskNet.toFixed(2)} puntos en preguntas de riesgo. Recuerda la matemática del EV con penalización -1/3: el azar puro entre 4 opciones tiene EV neutro (0.00); solo resulta matemáticamente rentable arriesgar cuando descartas al menos un distractor (EV > 0).`;
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
    blockScores,
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
  const oficialSims = history.filter(h => h && isOfficialMode(h.mode));
  // Modos parciales: tests por tema ('tema:N', 'Tema N'), comunes (20q), específicos (40q), falladas
  const parcialSims = history.filter(h => h && !isOfficialMode(h.mode));

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

/**
 * Calcula el panel integral de preparación real para el opositor (Auditoría Psicométrica y Táctica)
 * Aísla los últimos 5 simulacros oficiales/inéditos, analiza mediana y peor resultado,
 * balance por bloques (Común 33% vs Específico 67%), calibración de confianza y cobertura del banco.
 */
export function calculateReadinessMetrics(history = [], questionBank = [], options = {}) {
  const { srsVault = {}, failedQuestionsSet = new Set(), seenQuestionIds: explicitSeen } = options;

  // 1. Filtrar los últimos 5 simulacros oficiales / inéditos de 60 preguntas
  const oficialHistory = history.filter(h => h && isOfficialMode(h.mode));
  const recentMocks = oficialHistory.slice(0, 5);

  let medianScore = null;
  let worstScore = null;
  let bestScore = null;
  let averageScore = null;
  let consecutiveAbove42 = 0;

  if (recentMocks.length > 0) {
    const scores = recentMocks.map(m => typeof m.netScore === 'number' ? m.netScore : 0);
    const sortedScores = [...scores].sort((a, b) => a - b);
    const mid = Math.floor(sortedScores.length / 2);
    medianScore = sortedScores.length % 2 !== 0 
      ? sortedScores[mid] 
      : +((sortedScores[mid - 1] + sortedScores[mid]) / 2).toFixed(2);
    worstScore = sortedScores[0];
    bestScore = sortedScores[sortedScores.length - 1];
    averageScore = +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);

    // Contar racha consecutiva de simulacros con >= 42.00 netos dentro de los 60 min
    for (const mock of oficialHistory) {
      const net = typeof mock.netScore === 'number' ? mock.netScore : 0;
      const spent = mock.timeSpentSecs || 0;
      if (net >= 42.00 && (spent <= 3600 || !mock.timeSpentSecs)) {
        consecutiveAbove42++;
      } else {
        break;
      }
    }
  }

  const targetPlazaAchieved = consecutiveAbove42 >= 3;

  // 2. Cobertura del banco: porcentaje de preguntas memorizadas vs realmente inéditas
  const seenSet = new Set();
  if (explicitSeen && explicitSeen.size > 0) {
    explicitSeen.forEach(id => seenSet.add(Number(id)));
  } else {
    history.forEach(h => {
      if (Array.isArray(h.reviewList)) {
        h.reviewList.forEach(r => {
          const qId = r.id || r.question?.id;
          if (qId) seenSet.add(Number(qId));
        });
      }
    });
    Object.keys(srsVault || {}).forEach(id => seenSet.add(Number(id)));
    if (failedQuestionsSet) {
      failedQuestionsSet.forEach(id => seenSet.add(Number(id)));
    }
  }

  const normalizedBank = (questionBank || []).map(normalizeQuestion);
  const totalBankCount = normalizedBank.length;
  let seenCount = 0;
  let unseenComun = 0;
  let unseenEsp = 0;

  normalizedBank.forEach(q => {
    if (seenSet.has(Number(q.id))) {
      seenCount++;
    } else {
      if (q.block === 'comun' || q.topicId <= 4) {
        unseenComun++;
      } else {
        unseenEsp++;
      }
    }
  });

  const unseenCount = Math.max(0, totalBankCount - seenCount);
  const pctMemorized = totalBankCount > 0 ? Math.round((seenCount / totalBankCount) * 100) : 0;
  const pctUnseen = 100 - pctMemorized;

  // 3. Calibración metacognitiva acumulada (Segura / Duda / Riesgo)
  const calibration = {
    segura: { total: 0, correct: 0, wrong: 0, blank: 0, accuracyPct: null, netYield: 0, status: 'insuficiente' },
    duda: { total: 0, correct: 0, wrong: 0, blank: 0, accuracyPct: null, netYield: 0, profitable: false },
    riesgo: { total: 0, correct: 0, wrong: 0, blank: 0, accuracyPct: null, netYield: 0, profitable: false }
  };

  history.forEach(h => {
    if (h.confidenceBreakdown) {
      ['segura', 'duda', 'riesgo'].forEach(cat => {
        const b = h.confidenceBreakdown[cat];
        if (b) {
          calibration[cat].total += (b.count || 0);
          calibration[cat].correct += (b.correct || 0);
          calibration[cat].wrong += (b.wrong || 0);
          calibration[cat].blank += (b.blank || 0);
        }
      });
    } else if (Array.isArray(h.reviewList)) {
      h.reviewList.forEach(r => {
        const conf = r.confidence || (r.isBlank ? 'riesgo' : 'segura');
        if (calibration[conf]) {
          calibration[conf].total++;
          if (r.isBlank) calibration[conf].blank++;
          else if (r.isCorrect) calibration[conf].correct++;
          else calibration[conf].wrong++;
        }
      });
    }
  });

  ['segura', 'duda', 'riesgo'].forEach(cat => {
    const c = calibration[cat];
    const answered = c.correct + c.wrong;
    c.accuracyPct = answered > 0 ? Math.round((c.correct / answered) * 100) : null;
    c.netYield = +(c.correct - (c.wrong * (1 / 3))).toFixed(2);
  });

  if (calibration.segura.accuracyPct !== null) {
    calibration.segura.status = calibration.segura.accuracyPct >= 85 ? 'calibrada' : 'dunning_kruger';
  }
  calibration.duda.profitable = calibration.duda.netYield > 0;
  calibration.riesgo.profitable = calibration.riesgo.netYield > 0;

  // 4. Rendimiento por bloques (Común 33.3% vs Específico 66.7%)
  const blockAccuracies = {
    comun: { total: 0, correct: 0, wrong: 0, blank: 0, net: 0, pct: null },
    especifico: { total: 0, correct: 0, wrong: 0, blank: 0, net: 0, pct: null },
    descompensado: false
  };

  history.forEach(h => {
    if (h.blockScores) {
      ['comun', 'especifico'].forEach(b => {
        const bs = h.blockScores[b];
        if (bs) {
          blockAccuracies[b].total += (bs.total || 0);
          blockAccuracies[b].correct += (bs.correct || 0);
          blockAccuracies[b].wrong += (bs.wrong || 0);
          blockAccuracies[b].blank += (bs.blank || 0);
          blockAccuracies[b].net += (bs.net || 0);
        }
      });
    } else if (Array.isArray(h.reviewList)) {
      h.reviewList.forEach(r => {
        const isComun = r.question?.block === 'comun' || (!r.question?.block && (r.question?.topicId ? r.question?.topicId <= 4 : false));
        const blk = isComun ? blockAccuracies.comun : blockAccuracies.especifico;
        blk.total++;
        if (r.isBlank) blk.blank++;
        else if (r.isCorrect) blk.correct++;
        else blk.wrong++;
      });
    }
  });

  ['comun', 'especifico'].forEach(b => {
    const blk = blockAccuracies[b];
    const answered = blk.correct + blk.wrong;
    blk.pct = answered > 0 ? Math.round((blk.correct / answered) * 100) : null;
    blk.net = +(blk.correct - (blk.wrong * (1 / 3))).toFixed(2);
  });

  if (blockAccuracies.especifico.pct !== null && blockAccuracies.especifico.pct < 65) {
    blockAccuracies.descompensado = true;
  }

  // 5. Diagnóstico Integral y Nivel de Preparación
  let readinessLevel = 'SIN_SIMULACROS';
  let readinessSummary = 'Aún no has completado simulacros oficiales de 60 preguntas.';
  if (recentMocks.length > 0) {
    if (targetPlazaAchieved) {
      readinessLevel = 'PLAZA_BLINDADA';
      readinessSummary = '¡Nivel sobresaliente! Has encadenado 3 simulacros consecutivos con nota >= 42.00 netos dentro de los 60 minutos.';
    } else if (medianScore !== null && medianScore >= 42.00) {
      readinessLevel = 'ZONA_PLAZA';
      readinessSummary = 'Estás en zona competitiva de plaza directa (mediana >= 42 netos). Mantén el rigor para blindar la consistencia.';
    } else if (medianScore !== null && medianScore >= 30.00) {
      readinessLevel = 'ZONA_CORTE';
      readinessSummary = 'Superas el corte mínimo (30 puntos), pero aún no tienes margen de seguridad para asegurar plaza en Murcia (se requiere >= 42 netos).';
    } else {
      readinessLevel = 'EN_RIESGO';
      readinessSummary = 'Mediana inferior a 30.00 netos: quedarías fuera del corte eliminatorio. Refuerza la Bóveda SRS y la parte específica.';
    }
  }

  return {
    totalOficialExams: oficialHistory.length,
    recentMocks,
    medianScore,
    worstScore,
    bestScore,
    averageScore,
    consecutiveAbove42,
    targetPlazaAchieved,
    blockAccuracies,
    bankCoverage: {
      totalBank: totalBankCount,
      seenCount,
      unseenCount,
      unseenComun,
      unseenEsp,
      pctMemorized,
      pctUnseen
    },
    calibration,
    readinessLevel,
    readinessSummary
  };
}

