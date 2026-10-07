/**
 * PERSONAJES WAIFU, LORE NARRATIVO Y EXPRESIONES DE ÁNIMO
 * MISIÓN ADMINISTRACIÓN (v34.0 Live2D VTuber Full Edition)
 * 100% Mentoras Femeninas con avatares Live2D y voces neurales en castellano.
 */

const WAIFU_MENTORS = {
  1: {
    id: "valeria",
    name: "Comandante Valeria",
    title: "Estratega Constitucional y Normativa de Gobierno",
    blockTitle: "Misión 01: Constitución y Gobierno",
    themeColor: "#38bdf8",
    bgStyle: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(14, 165, 233, 0.25))",
    imgSrc: "",
    introDialogue: "¡Aspirante! Soy la Comandante Valeria. Bienvenido a la Academia Táctica de la AGE. Para defender el Estado, primero debes dominar la Constitución Española de 1978 y la Ley 40/2015. No toleraré imprecisiones normativas. ¡Demuéstrame tu rigor!",
    victoryDialogue: "¡Excelente desempeño táctico! Has demostrado un conocimiento impecable de la Carta Magna y la estructura del Gobierno. Tienes madera de oficial.",
    defeatDialogue: "Mmm... Necesitas reforzar los principios del artículo 103 de la CE y la Ley 40/2015. Repasa los apuntes y vuelve a la carga.",
    moods: {
      happy: "🤩 ¡Brillante deducción jurídica!",
      sad: "😨 Error de bulto en la norma. Revisa el articulado.",
      thinking: "🤔 Sabia prudencia táctica. Evitar la resta de 0,33 es de estrategas."
    },
    reactions: {
      correct: ["¡Brillante deducción jurídica!", "¡Exacto! Ese es el rigor que busco en la AGE.", "Impecable. Sabía que no me defraudarías."],
      wrong: ["¡Cuidado! Esa respuesta violaría la Constitución.", "Error de bulto en la norma. Revisa el articulado.", "Mmm... Recuerda consultar siempre el texto consolidado."],
      pass: ["Sabia prudencia táctica. Evitar la resta de 0,33 es de estrategas.", "Bien jugado. Si no hay certeza 100%, pasar es la mejor táctica.", "Un oficial sabe cuándo contener el fuego."]
    }
  },

  2: {
    id: "aoi",
    name: "Inspectora Aoi",
    title: "Defensora de Empleo Público e Igualdad",
    blockTitle: "Misión 02: Empleo Público e Igualdad",
    themeColor: "#c084fc",
    bgStyle: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(192, 132, 252, 0.25))",
    imgSrc: "",
    introDialogue: "¡Hola, recluta! Soy la Inspectora Aoi. En este bloque aprenderemos todo sobre el TREBEP, los derechos de los empleados públicos y las Leyes de Igualdad y Violencia de Género. ¡La justicia y el respeto son nuestra máxima prioridad!",
    victoryDialogue: "¡Kyaaa! ¡Lo has hecho genial! Se nota que te importan los derechos de los trabajadores y el código de conducta ético.",
    defeatDialogue: "¡Oye! No podemos permitir despistes en los derechos fundamentales ni en el TREBEP. ¡A repasar con energía!",
    moods: {
      happy: "🤩 ¡Asombroso! Conocimiento perfecto del TREBEP.",
      sad: "😨 ¡Cuidado! Eso vulneraría el Código de Conducta.",
      thinking: "🤔 ¡Buena decisión! Proteger tus puntos también es proteger tus derechos."
    },
    reactions: {
      correct: ["¡Asombroso! Conocimiento perfecto del TREBEP.", "¡Muy bien! Principio de igualdad aplicado a la perfección.", "¡Me encanta tu nivel de precisión!"],
      wrong: ["¡Cuidado! Eso vulneraría el Código de Conducta.", "Revisa bien los permisos y situaciones administrativas del TREBEP.", "¡No te me despistes aquí!"],
      pass: ["¡Buena decisión! Proteger tus puntos también es proteger tus derechos.", "Pasar a tiempo evita sorpresas en el marcador.", "¡Táctica inteligente!"]
    }
  },

  3: {
    id: "maya",
    name: "Teniente Maya",
    title: "Especialista en Derecho del Trabajo y Jurisdicción",
    blockTitle: "Misión 03: Derecho del Trabajo",
    themeColor: "#f43f5e",
    bgStyle: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(244, 63, 94, 0.25))",
    imgSrc: "",
    introDialogue: "¡Atención! Soy la Teniente Maya. En el ámbito laboral no hay lugar para dudar: jornada, salario, despidos e infracciones de la LISOS. Si quieres superar el Bloque Específico, tienes que ser rápido y letal con el Estatuto de los Trabajadores.",
    victoryDialogue: "¡Aplastante! Has ejecutado el examen con la precisión de una unidad de élite laboral. ¡Misión cumplida!",
    defeatDialogue: "Has caído en una trampa de plazos o indemnizaciones. En la jurisdicción social, un día de retraso en el plazo de 20 días por despido significa la caducidad.",
    moods: {
      happy: "🤩 ¡Impacto directo! Dominio total del Estatuto.",
      sad: "😨 ¡Fallaste la indemnización! Ojo con los plazos.",
      thinking: "🤔 ¡Retirada táctica a tiempo! Sin bajas en tu puntuación."
    },
    reactions: {
      correct: ["¡Impacto directo! El Estatuto de los Trabajadores en la palma de tu mano.", "¡Táctica impecable!", "¡Así se responde en el orden social!"],
      wrong: ["¡Fallaste la indemnización! Recuerda: 33 días en improcedente, 20 en objetivo.", "Ojo con los plazos de caducidad y prescripción.", "¡Concentración, recluta!"],
      pass: ["¡Retirada táctica a tiempo! Sin bajas en tu puntuación.", "Evitaste el impacto de la penalización. Buena maniobra.", "Un buen combatiente sabe qué batallas librar."]
    }
  },

  4: {
    id: "sakura",
    name: "Oficial Sakura",
    title: "Jefa de Personal y Gestora del IV CUAGE",
    blockTitle: "Misión 04: IV CUAGE (Personal Laboral)",
    themeColor: "#fbbf24",
    bgStyle: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(251, 191, 36, 0.25))",
    imgSrc: "",
    introDialogue: "Ara ara~ ¡Saludos! Soy la Oficial Sakura, responsable de la gestión del IV CUAGE. Esta es la norma MÁS IMPORTANTE de tu temario E1. Desde el Grupo E1 hasta el Concurso Abierto y Permanente (CAP), debes dominar cada detalle si quieres tu plaza en la AGE.",
    victoryDialogue: "¡Espléndido, opositor-kun/chan! Conoces el Convenio Colectivo Único mejor que muchos gestores veteranos. Tu plaza E1 está casi asegurada.",
    defeatDialogue: "Vaya, vaya... Parece que te has confundido entre los grupos profesionales E1, E2 o M1. Ven a mi despacho a repasar la clasificación.",
    moods: {
      happy: "🤩 ¡Ara ara! Qué dominio del IV CUAGE más fascinante.",
      sad: "😨 Cuidado con el régimen disciplinario: >3 días es muy grave.",
      thinking: "🤔 Una elección muy prudente. 0 XP es mejor que -0,33 XP."
    },
    reactions: {
      correct: ["¡Ara ara! Qué dominio del IV CUAGE más fascinante.", "¡Exacto! El Grupo E1 exige titulación de ESO.", "¡Respuesta de 10 sobre el Concurso Abierto y Permanente!"],
      wrong: ["Cuidado con el régimen disciplinario: más de 3 días de ausencia es falta muy grave.", "Te has liado con las pagas extra o los trienios.", "¡Revisa la estructura retributiva!"],
      pass: ["Una elección muy prudente. El IV CUAGE premia a los precavidos.", "Inteligente decisión. 0 XP es mejor que perder 0,33 XP.", "¡Muy bien jugado!"]
    }
  },

  5: {
    id: "elena",
    name: "Capitana Elena",
    title: "Especialista en Prevención de Riesgos y Sindicalismo",
    blockTitle: "Misión 05: Prevención de Riesgos y LOLS",
    themeColor: "#34d399",
    bgStyle: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(52, 211, 153, 0.25))",
    imgSrc: "",
    introDialogue: "¡Salud y seguridad ante todo! Soy la Capitana Elena. En mi módulo aprenderás la Ley 31/1995 de Prevención de Riesgos Laborales y la Ley Orgánica de Libertad Sindical. La protección de los trabajadores y sus derechos colectivos es sagrada.",
    victoryDialogue: "¡Misión impecable! Has demostrado que la seguridad preventiva y la negociación sindical no tienen secretos para ti. ¡Aprobado con honores!",
    defeatDialogue: "¡Alerta de riesgo! Recuerda que el Comité de Seguridad y Salud se constituye a partir de 50 trabajadores y los EPIs deben ser 100% gratuitos.",
    moods: {
      happy: "🤩 ¡Excelente! Medida preventiva ejecutada a la perfección.",
      sad: "😨 ¡Atención! Los reconocimientos son voluntarios.",
      thinking: "🤔 ¡Buena evaluación de riesgo! Cero bajas en tu marcador."
    },
    reactions: {
      correct: ["¡Excelente! Medida preventiva ejecutada a la perfección.", "¡Exacto! El 10% da la consideración de sindicato más representativo.", "¡Gran conocimiento del comité paritario!"],
      wrong: ["¡Atención! Los reconocimientos médicos son voluntarios salvo excepciones.", "Revisa las funciones de los Delegados de Prevención.", "¡Cuidado con la normativa de seguridad!"],
      pass: ["¡Buena evaluación de riesgo! En prevención, anticipar el peligro es ganar.", "Decisión segura y protegida.", "¡Cero bajas en tu marcador!"]
    }
  },

  6: {
    id: "rin",
    name: "Mayor Rin",
    title: "Guardiana de la Seguridad Social, ISFAS y Clases Pasivas",
    blockTitle: "Misión 06: Seguridad Social, ISFAS y Clases Pasivas",
    themeColor: "#f59e0b",
    bgStyle: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(245, 158, 11, 0.25))",
    imgSrc: "",
    introDialogue: "Bienvenido al área más especializada de Defensa. Soy la Mayor Rin. Aquí estudiaremos el Régimen General de la Seguridad Social, el ISFAS (RDL 1/2000 y Ley 29/2014) y Clases Pasivas (RDL 670/1987). Las pensiones y la protección militar requieren máxima concentración.",
    victoryDialogue: "¡Extraordinario! Has descifrado la compleja red de la Seguridad Social militar y las Clases Pasivas. Tu preparación roza la perfección.",
    defeatDialogue: "Un despiste crucial. Recuerda: desde el 1 de enero de 2011, los nuevos funcionarios cotizan en el Régimen General, quedando Clases Pasivas a extinguir.",
    moods: {
      happy: "🤩 ¡Magistral! La Tesorería General es caja única del sistema.",
      sad: "😨 Ojo: la prescripción general en la SS es de 5 años.",
      thinking: "🤔 Estrategia impecable. El cálculo de pensiones requiere cautela."
    },
    reactions: {
      correct: ["¡Magistral! La Tesorería General es caja única del sistema.", "¡Perfecto! ISFAS gestiona la protección de las Fuerzas Armadas y Guardia Civil.", "¡Así se calcula el haber regulador!"],
      wrong: ["Ojo: la prescripción general de prestaciones en la SS es de 5 años.", "No olvides que para el 100% en Clases Pasivas se exigen 35 años de servicio.", "¡Revisa la normativa de ISFAS!"]
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WAIFU_MENTORS };
}
