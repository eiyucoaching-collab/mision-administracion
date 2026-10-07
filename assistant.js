/**
 * MOTOR CONSULTOR IA WAIFU & SUPER AGENT PARTY MULTI-AGENTE (v17.0)
 * Permite que las 6 mentoras debatan en equipo colaborativo (Party Mode).
 */

class WaifuAIAssistant {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.dialogueHistory = [];

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'es-ES';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }

    this.knowledgeBase = {
      valeria: [
        "¡Kyaa~! Como Comandante Constitucional te recuerdo: El artículo 1.1 proclama que España es un Estado social y democrático de Derecho. Y si dudas sobre los principios de la Administración, ¡acude siempre al artículo 103.1!",
        "¡Atención Aspirante-kun! La Ley 40/2015 distingue entre Órganos Superiores (Ministros y Secretarios de Estado) y Órganos Directivos (Subsecretarios y Directores Generales). ¡Ganbatte!",
        "La protección de los derechos del 14 al 29 es super reforzada: requiere Ley Orgánica, procedimiento preferente y sumario, y Recurso de Amparo ante el Tribunal Constitucional."
      ],
      aoi: [
        "¡Konnichiwa! En el TREBEP los funcionarios de carrera ocupan puestos permanentes, mientras que el personal eventual sólo hace funciones de confianza o asesoramiento especial.",
        "¡No olvides los permisos del Art. 48 del TREBEP! Matrimonio: 15 días naturales. Enfermedad grave de familiar 1er grado: 5 días hábiles. Asuntos particulares: 6 días al año.",
        "La Ley de Igualdad 3/2007 exige el principio de presencia equilibrada: ningún sexo superará el 60% ni bajará del 40% en tribunales de selección."
      ],
      maya: [
        "¡Atención combatiente-kun! En el Estatuto de los Trabajadores la jornada máxima es de 40 horas semanales de promedio en cómputo anual. ¡Y las horas extra tienen un límite de 80 horas al año!",
        "¡Regla de oro de despidos! Despido Objetivo: 20 días por año con un máximo de 12 mensualidades. Despido Improcedente: 33 días por año con un máximo de 24 mensualidades.",
        "Para impugnar un despido en el Juzgado de lo Social dispones de un plazo de caducidad estricto de 20 días hábiles previa papeleta en el SMAC."
      ],
      sakura: [
        "Ara ara~ En el IV CUAGE el Grupo Profesional E1 exige el título de Educación Secundaria Obligatoria. Los trienios se perfeccionan cada 3 años de servicios prestados.",
        "El Concurso Abierto y Permanente (CAP) es el procedimiento ordinario y continuo de provisión de puestos para el personal laboral fijo de la AGE.",
        "Ausentarse del trabajo durante más de 3 días consecutivos sin causa justificada es sancionado como Falta Muy Grave con suspensión de empleo y sueldo."
      ],
      elena: [
        "¡Salud y seguridad! El artículo 15 de la Ley de Prevención exige anteponer SIEMPRE la protección colectiva a los equipos de protección individual (EPIs).",
        "Los reconocimientos médicos son voluntarios para el trabajador, salvo que sean indispensables para evaluar efectos del trabajo o exista riesgo para terceros.",
        "El Comité de Seguridad y Salud es obligatorio en centros con 50 o más trabajadores. Es paritario y colegiado."
      ],
      rin: [
        "¡Atención militar! El ISFAS es un Organismo Autónomo adscrito al Ministerio de Defensa a través de la Subsecretaría que gestiona el régimen especial de las Fuerzas Armadas.",
        "En el Régimen de Clases Pasivas del Estado se exigen 35 años de servicios efectivos prestados al Estado para percibir el 100% del Haber Regulador.",
        "Desde el 1 de enero de 2011 todos los nuevos funcionarios ingresan en el Régimen General de la Seguridad Social, quedando Clases Pasivas a extinguir."
      ]
    };
  }

  logAIRIDialogue(userMsg, waifuResponse, waifuName = "Mentora") {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.dialogueHistory.push({ time: timeStr, user: userMsg, waifu: waifuResponse });

    const historyContainer = document.getElementById('airi-dialogue-history');
    if (historyContainer) {
      const entry = document.createElement('div');
      entry.innerHTML = `
        <div style="color: var(--neon-cyan); margin-top: 4px;"><strong>[${timeStr}] TÚ:</strong> ${userMsg}</div>
        <div style="color: var(--neon-purple); margin-left: 10px;"><strong>[${waifuName}]:</strong> ${waifuResponse}</div>
      `;
      historyContainer.appendChild(entry);
      historyContainer.scrollTop = historyContainer.scrollHeight;
    }
  }

  startMicListening(onTranscriptCallback, onErrorCallback) {
    if (!this.recognition) {
      if (onErrorCallback) onErrorCallback("Reconocimiento de voz por micrófono no soportado en este navegador.");
      return;
    }

    if (this.isListening) return;

    this.isListening = true;
    this.recognition.start();

    this.recognition.onresult = (event) => {
      this.isListening = false;
      const transcript = event.results[0][0].transcript;
      if (onTranscriptCallback) onTranscriptCallback(transcript);
    };

    this.recognition.onerror = (err) => {
      this.isListening = false;
      if (onErrorCallback) onErrorCallback("Error o permiso denegado en micrófono.");
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  askMentor(question, waifuId = 'valeria', waifuName = 'Mentora') {
    const qLower = question.toLowerCase();
    const answers = this.knowledgeBase[waifuId] || this.knowledgeBase.valeria;

    let response = "";
    if (qLower.includes('constitucion') || qLower.includes('art 1') || qLower.includes('103') || qLower.includes('ley 40')) {
      response = answers[0];
    } else if (qLower.includes('permiso') || qLower.includes('despido') || qLower.includes('indemnizacion') || qLower.includes('cuage')) {
      response = answers[1];
    } else if (qLower.includes('igualdad') || qLower.includes('prevencion') || qLower.includes('isfas') || qLower.includes('clases pasivas')) {
      response = answers[2];
    } else {
      const randomAns = answers[Math.floor(Math.random() * answers.length)];
      response = `¡Kyaa~! Te he escuchado atentamente: ${randomAns}`;
    }

    this.logAIRIDialogue(question, response, waifuName);
    return response;
  }

  runSuperAgentPartyDebate(query) {
    const partyResults = [
      {
        waifu: "Valeria",
        id: "valeria",
        role: "Análisis Constitucional",
        text: `Desde la perspectiva del derecho administrativo y la Ley 40/2015, "${query}" requiere examinar el principio de legalidad y la responsabilidad patrimonial del artículo 106.2 CE.`
      },
      {
        waifu: "Aoi",
        id: "aoi",
        role: "Perspectiva del TREBEP",
        text: `¡Complemento la opinión de Valeria! En el empleo público (RDL 5/2015), esto afecta al régimen de situaciones administrativas y a las garantías del funcionario.`
      },
      {
        waifu: "Maya",
        id: "maya",
        role: "Perspectiva Laboral ET",
        text: `¡Si fuera personal laboral regido por el Estatuto de los Trabajadores, se aplicaría la prescripción del Art 59 o el procedimiento del SMAC en 20 días!`
      },
      {
        waifu: "Sakura",
        id: "sakura",
        role: "Encuadre IV CUAGE",
        text: `Ara ara~ En el Convenio Único AGE (IV CUAGE), esto se clasifica según la tabla retributiva del Grupo E1 y las faltas del capítulo disciplinario.`
      },
      {
        waifu: "Elena",
        id: "elena",
        role: "Evaluación de PRL",
        text: `¡Punto crítico de seguridad! El artículo 15 de la Ley 31/1995 exige verificar la evaluación de riesgos y la protección del trabajador.`
      },
      {
        waifu: "Rin",
        id: "rin",
        role: "Dictamen Final Seguridad Social e ISFAS",
        text: `¡Dictamen final de la Party! Se aplicará la protección de la TGSS o del ISFAS si pertenece a Defensa, garantizando la cobertura integra.`
      }
    ];

    return partyResults;
  }
}

const waifuAIAssistant = new WaifuAIAssistant();
