/**
 * BANCO DE PREGUNTAS TÁCTICAS - MISIÓN ADMINISTRACIÓN (GRUPO E1 AGE / DEFENSA)
 * 20 Preguntas Bloque Común (1/3) + 40 Preguntas Bloque Específico (2/3)
 */

const QUESTION_BANK = [
  // ==========================================
  // MISIÓN 1: CONTROL CONSTITUCIONAL Y GOBIERNO (COMÚN)
  // ==========================================
  {
    id: 1,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "Según el artículo 1.1 de la Constitución Española, España se constituye en un Estado:",
    options: [
      "Monárquico y social de derecho",
      "Social y democrático de Derecho",
      "Federal, democrático y pluralista",
      "Autonómico y social de Derecho"
    ],
    correct: 1, // B
    law: "Constitución Española de 1978",
    article: "Artículo 1.1 CE",
    explanation: "España se constituye en un Estado social y democrático de Derecho, que propugna como valores superiores de su ordenamiento jurídico la libertad, la justicia, la igualdad y el pluralismo político."
  },
  {
    id: 2,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿En cuál de los siguientes artículos de la CE se regula la indemnidad y el principio de legalidad penal?",
    options: [
      "Artículo 14",
      "Artículo 25",
      "Artículo 9.3",
      "Artículo 10"
    ],
    correct: 1, // B
    law: "Constitución Española de 1978",
    article: "Artículo 25.1 CE",
    explanation: "El art. 25.1 CE establece que nadie puede ser condenado o sancionado por acciones u omisiones que en el momento de producirse no constituyan delito, falta o infracción administrativa."
  },
  {
    id: 3,
    block: "comun",
    mission: 1,
    topic: "Ley 50/1997 del Gobierno",
    question: "¿A quién corresponde la aprobación de los Real Decretos-Leyes y Real Decretos Legislativos?",
    options: [
      "Al Presidente del Gobierno en exclusiva",
      "Al Consejo de Ministros",
      "A las Cortes Generales",
      "A las Comisiones Delegadas del Gobierno"
    ],
    correct: 1, // B
    law: "Ley 50/1997, del Gobierno",
    article: "Artículo 5.1.c) Ley 50/1997",
    explanation: "Corresponde al Consejo de Ministros aprobar los Real Decretos-Leyes y los Real Decretos Legislativos conforme a lo dispuesto en la Constitución."
  },
  {
    id: 4,
    block: "comun",
    mission: 1,
    topic: "Ley 40/2015 LRJSP",
    question: "Según el artículo 3 de la Ley 40/2015, ¿cuál de los siguientes NO es un principio general de actuación del Sector Público?",
    options: [
      "Eficacia y eficiencia",
      "Desconcentración y descentralización",
      "Lucro institucional",
      "Transparencia y participación ciudadana"
    ],
    correct: 2, // C
    law: "Ley 40/2015, de Régimen Jurídico del Sector Público",
    article: "Artículo 3.1 Ley 40/2015",
    explanation: "El lucro institucional no existe. Las Administraciones Públicas se sirven con objetividad a los intereses generales bajo principios de eficacia, eficiencia, transparencia, descentralización y coordinación."
  },
  {
    id: 5,
    block: "comun",
    mission: 1,
    topic: "Ley 40/2015 LRJSP",
    question: "La delegación de competencias entre órganos administrativos:",
    options: [
      "Altera la titularidad de la competencia",
      "No altera la titularidad de la competencia, sino únicamente su ejercicio",
      "Solo puede realizarse en órganos jerárquicamente superiores",
      "Es irrevocable una vez acordada"
    ],
    correct: 1, // B
    law: "Ley 40/2015, de Régimen Jurídico del Sector Público",
    article: "Artículo 9.1 Ley 40/2015",
    explanation: "La delegación de competencias no altera la titularidad de la competencia y es revocable en cualquier momento por el órgano que la haya conferido."
  },
  {
    id: 6,
    block: "comun",
    mission: 1,
    topic: "Ley 40/2015 LRJSP",
    question: "¿Quién ostenta la representación ordinaria del Ministerio y dirige los servicios comunes del mismo?",
    options: [
      "El Secretario de Estado",
      "El Subsecretario",
      "El Director General",
      "El Subdirector General"
    ],
    correct: 1, // B
    law: "Ley 40/2015, de Régimen Jurídico del Sector Público",
    article: "Artículo 63.1 Ley 40/2015",
    explanation: "Los Subsecretarios ostentan la representación ordinaria del Ministerio, dirigen los servicios comunes y ejercen las competencias correspondientes a dichos servicios."
  },
  {
    id: 7,
    block: "comun",
    mission: 1,
    topic: "Ley 40/2015 LRJSP",
    question: "Los Subdelegados del Gobierno en las Provincias son nombrados por:",
    options: [
      "El Presidente del Gobierno por Real Decreto",
      "El Ministro del Interior",
      "El Delegado del Gobierno en la Comunidad Autónoma entre funcionarios A1",
      "El Consejo de Ministros"
    ],
    correct: 2, // C
    law: "Ley 40/2015, de Régimen Jurídico del Sector Público",
    article: "Artículo 74.1 Ley 40/2015",
    explanation: "Los Subdelegados del Gobierno en las provincias son nombrados por el Delegado del Gobierno en la respectiva Comunidad Autónoma mediante resolución entre funcionarios de carrera Subgrupo A1."
  },
  {
    id: 8,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿Qué artículo de la CE consagra la primacía de los Tratados Internacionales válidamente celebrados tras su publicación oficial?",
    options: [
      "Artículo 96.1",
      "Artículo 103",
      "Artículo 149",
      "Artículo 97"
    ],
    correct: 0, // A
    law: "Constitución Española de 1978",
    article: "Artículo 96.1 CE",
    explanation: "Los tratados internacionales válidamente celebrados, una vez publicados oficialmente en España, formarán parte del ordenamiento interno."
  },
  {
    id: 9,
    block: "comun",
    mission: 1,
    topic: "Ley 50/1997 del Gobierno",
    question: "El Gobierno cesante continúa en funciones hasta:",
    options: [
      "La celebración de las elecciones generales",
      "La toma de posesión del nuevo Gobierno",
      "La disolución de las Cortes Generales",
      "La propuesta del Rey al candidato"
    ],
    correct: 1, // B
    law: "Ley 50/1997, del Gobierno",
    article: "Artículo 21.1 Ley 50/1997",
    explanation: "El Gobierno cesa tras la celebración de elecciones generales, pérdida de confianza parlamentaria, o dimisión/fallecimiento del Presidente, continuando en funciones hasta la toma de posesión del nuevo Gobierno."
  },
  {
    id: 10,
    block: "comun",
    mission: 1,
    topic: "Ley 40/2015 LRJSP",
    question: "La avocación se realiza mediante acuerdo motivado que deberá ser notificado a los interesados en el procedimiento:",
    options: [
      "Antes o en el momento de dictarse la resolución final",
      "Con carácter previo a la resolución final",
      "Únicamente tras la finalización del expediente",
      "No requiere notificación formal"
    ],
    correct: 1, // B
    law: "Ley 40/2015, de Régimen Jurídico del Sector Público",
    article: "Artículo 10.2 Ley 40/2015",
    explanation: "La avocación se realizará mediante acuerdo motivado que deberá ser notificado a los interesados en el procedimiento con anterioridad o en el momento de dictarse la resolución final. Contra el acuerdo de avocación no cabrá recurso."
  },

  // ==========================================
  // MISIÓN 2: EMPLEO PÚBLICO, IGUALDAD Y DERECHOS (COMÚN)
  // ==========================================
  {
    id: 11,
    block: "comun",
    mission: 2,
    topic: "TREBEP (RDL 5/2015)",
    question: "Según el artículo 8 del TREBEP, ¿cuál de los siguientes NO es un tipo de personal al servicio de las Administraciones Públicas?",
    options: [
      "Funcionarios de carrera",
      "Funcionarios interinos",
      "Personal directivo profesional contratado laboralmente ajeno al convenio",
      "Personal eventual"
    ],
    correct: 2, // C
    law: "TREBEP (RD Legislativo 5/2015)",
    article: "Artículo 8.2 TREBEP",
    explanation: "Los empleados públicos se clasifican en: Funcionarios de carrera, Funcionarios interinos, Personal laboral (fijo, por tiempo indefinido o temporal) y Personal eventual."
  },
  {
    id: 12,
    block: "comun",
    mission: 2,
    topic: "TREBEP (RDL 5/2015)",
    question: "El personal eventual desempeña funciones expresamente calificadas como de:",
    options: [
      "Gestión de personal fiduciario",
      "Confianza o asesoramiento especial",
      "Inspección de servicios de alto nivel",
      "Ejecución de actividades permanentes de la AGE"
    ],
    correct: 1, // B
    law: "TREBEP (RD Legislativo 5/2015)",
    article: "Artículo 12.1 TREBEP",
    explanation: "Es personal eventual el que, en virtud de nombramiento y con carácter no permanente, sólo realiza funciones expresamente calificadas como de confianza o asesoramiento especial."
  },
  {
    id: 13,
    block: "comun",
    mission: 2,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "El principio de presencia equilibrada se entiende como la presencia de mujeres y hombres de forma que ningún sexo supere el:",
    options: [
      "50% ni sea inferior al 50%",
      "60% ni sea inferior al 40%",
      "70% ni sea inferior al 30%",
      "65% ni sea inferior al 35%"
    ],
    correct: 1, // B
    law: "Ley Orgánica 3/2007 para la igualdad efectiva de mujeres y hombres",
    article: "Disposición Adicional 1ª LO 3/2007",
    explanation: "A los efectos de esta Ley, se entiende por composición equilibrada la presencia de mujeres y hombres de forma que, en el conjunto a que se refiera, las personas de cada sexo no superen el 60% ni sean inferiores al 40%."
  },
  {
    id: 14,
    block: "comun",
    mission: 2,
    topic: "Ley Orgánica 1/2004 Violencia de Género",
    question: "La empleada pública víctima de violencia de género que se vea obligada a abandonar el puesto de trabajo en la localidad donde venía prestando sus servicios tiene derecho a:",
    options: [
      "El traslado a otro puesto de trabajo de análogas características en otra localidad de su elección",
      "Excedencia forzosa con cobro del 100% de retribuciones durante 3 años",
      "Jubilación anticipada por incapacidad laboral",
      "Licencia retribuida indefinida"
    ],
    correct: 0, // A
    law: "Ley Orgánica 1/2004 / TREBEP art. 82",
    article: "Artículo 82 TREBEP / LO 1/2004",
    explanation: "Tienen derecho a la movilidad y al traslado a un puesto de trabajo de análogas características en otra localidad que la empleada considere conveniente, con reserva de puesto."
  },
  {
    id: 15,
    block: "comun",
    mission: 2,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿En qué situación administrativa se declara a un funcionario cuando es nombrado miembro del Gobierno de la Nación o de un Gobierno Autonómico?",
    options: [
      "Servicio activo con comisión de servicios",
      "Excedencia voluntaria por interés particular",
      "Servicios especiales",
      "Suspensión provisional de funciones"
    ],
    correct: 2, // C
    law: "TREBEP (RD Legislativo 5/2015)",
    article: "Artículo 87.1.a) TREBEP",
    explanation: "Los funcionarios de carrera serán declarados en servicios especiales cuando sean nombrados miembros del Gobierno o de los órganos de gobierno de las CCAA."
  },
  {
    id: 16,
    block: "comun",
    mission: 2,
    topic: "TREBEP (RDL 5/2015)",
    question: "Los principios éticos y de conducta recogidos en los artículos 52 a 54 del TREBEP obligan a los empleados públicos a actuar con:",
    options: [
      "Objetividad, neutralidad e imparcialidad",
      "Discreción política según el partido de turno",
      "Lucro profesional legítimo",
      "Autonomía decisoria sin sujeción a instrucciones"
    ],
    correct: 0, // A
    law: "TREBEP (RD Legislativo 5/2015)",
    article: "Artículos 52 a 54 TREBEP",
    explanation: "Los empleados públicos deben actuar con objetividad, integridad, neutralidad, responsabilidad, imparcialidad y confidencialidad."
  },
  {
    id: 17,
    block: "comun",
    mission: 2,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿Cuál es la sanción máxima de suspensión de funciones por falta muy grave impuesta a un funcionario?",
    options: [
      "Hasta 2 años",
      "Hasta 3 años",
      "De 16 días a 6 años",
      "De 1 mes a 1 año"
    ],
    correct: 2, // C
    law: "TREBEP (RD Legislativo 5/2015)",
    article: "Artículo 96.1.c) TREBEP",
    explanation: "La sanción de suspensión de funciones por falta muy grave tendrá una duración máxima de 6 años y un mínimo de 16 días (o según régimen de desarrollo aplicable)."
  },
  {
    id: 18,
    block: "comun",
    mission: 2,
    topic: "RD Legislativo 1/2013 Discapacidad",
    question: "En las ofertas de empleo público se reservará un cupo no inferior al ____ para ser cubierto entre personas con discapacidad:",
    options: [
      "5 por ciento",
      "7 por ciento",
      "10 por ciento",
      "3 por ciento"
    ],
    correct: 1, // B
    law: "RD Legislativo 1/2013 / TREBEP art. 59",
    article: "Artículo 59.1 TREBEP",
    explanation: "En las ofertas de empleo público se reservará un cupo no inferior al 7% de las vacantes para ser cubiertas entre personas con discapacidad (2% para discapacidad intelectual)."
  },
  {
    id: 19,
    block: "comun",
    mission: 2,
    topic: "TREBEP (RDL 5/2015)",
    question: "Las retribuciones básicas de los funcionarios de carrera son:",
    options: [
      "El complemento de destino y el complemento específico",
      "El sueldo y los trienios",
      "El sueldo, la productividad y el específico",
      "El salario base y el complemento de puesto"
    ],
    correct: 1, // B
    law: "TREBEP (RD Legislativo 5/2015)",
    article: "Artículo 23 TREBEP",
    explanation: "Las retribuciones básicas son las que retribuyen al funcionario según la adscripción de su cuerpo o escala a un determinado Subgrupo o Grupo y por su antigüedad. Comprenden el sueldo y los trienios."
  },
  {
    id: 20,
    block: "comun",
    mission: 2,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "El acoso sexual y el acoso por razón de sexo en el ámbito laboral se consideran en todo caso:",
    options: [
      "Actos ilícitos civiles sin sanción disciplinaria",
      "Actos discriminatorios",
      "Faltas leves de convivencia",
      "Causas justificadas de traslado obligatorio"
    ],
    correct: 1, // B
    law: "Ley Orgánica 3/2007",
    article: "Artículo 7.3 LO 3/2007",
    explanation: "El acoso sexual y el acoso por razón de sexo se consideran en todo caso actos discriminatorios por razón de sexo."
  },

  // ==========================================
  // MISIÓN 3: DERECHO DEL TRABAJO Y CONTRATACIÓN (ESPECÍFICO)
  // ==========================================
  {
    id: 21,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "¿Cuál es la edad mínima legal general para trabajar por cuenta ajena en España?",
    options: [
      "14 años con autorización paterna",
      "16 años cumplidos",
      "18 años en todo caso",
      "15 años finalizada la ESO"
    ],
    correct: 1, // B
    law: "Estatuto de los Trabajadores",
    article: "Artículo 6.1 ET",
    explanation: "Se prohíbe la admisión al trabajo a los menores de 16 años, salvo la intervención en espectáculos públicos en casos excepcionales autorizados."
  },
  {
    id: 22,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "La duración del período de prueba en los contratos de trabajo se rige en primer lugar por:",
    options: [
      "Lo que decida unilateralmente el empresario",
      "Lo establecido en los convenios colectivos",
      "El límite estatutario infranqueable de 1 mes",
      "La decisión de la Inspección de Trabajo"
    ],
    correct: 1, // B
    law: "Estatuto de los Trabajadores",
    article: "Artículo 14.1 ET",
    explanation: "Podrá concertarse por escrito un período de prueba, con sujeción a los límites de duración que, en su caso, se establezcan en los convenios colectivos."
  },
  {
    id: 23,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "La jornada ordinaria de trabajo efectivo de trabajo en el ámbito laboral general no podrá superar las:",
    options: [
      "40 horas semanales de promedio en cómputo anual",
      "37,5 horas semanales diarias de promedio",
      "35 horas semanales en todo caso",
      "42 horas semanales en época estival"
    ],
    correct: 0, // A
    law: "Estatuto de los Trabajadores",
    article: "Artículo 34.1 ET",
    explanation: "La duración de la jornada de trabajo será la pactada en los convenios colectivos o contratos de trabajo. La duración máxima de la jornada ordinaria de trabajo efectivo será de 40 horas semanales de trabajo efectivo de promedio en cómputo anual."
  },
  {
    id: 24,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "El descanso mínimo semanal retribuido e ininterrumpido para los trabajadores mayores de edad es de:",
    options: [
      "24 horas consecutivas (1 día)",
      "Un día y medio ininterrumpido (36 horas)",
      "Dos días completos (48 horas)",
      "30 horas continuadas"
    ],
    correct: 1, // B
    law: "Estatuto de los Trabajadores",
    article: "Artículo 37.1 ET",
    explanation: "Los trabajadores tendrán derecho a un descanso semanal ininterrumpido de un día y medio continuado (acumulable por períodos de hasta 14 días)."
  },
  {
    id: 25,
    block: "especifico",
    mission: 3,
    topic: "Ley 36/2011 Reguladora Jurisdicción Social",
    question: "¿Cuál es el plazo general para interponer la demanda por despido ante el Juzgado de lo Social?",
    options: [
      "10 días hábiles",
      "20 días hábiles",
      "30 días naturales",
      "1 mes caducable"
    ],
    correct: 1, // B
    law: "Ley 36/2011 de la Jurisdicción Social",
    article: "Artículo 103.1 LRJS",
    explanation: "El trabajador podrá reclamar contra el despido dentro de los 20 días hábiles siguientes a aquél en que se hubiera producido."
  },
  {
    id: 26,
    block: "especifico",
    mission: 3,
    topic: "LISOS (RDL 5/2000)",
    question: "Según el RDL 5/2000 (LISOS), la falta de pago o los retrasos continuados en el pago del salario debido a un trabajador constituye una infracción:",
    options: [
      "Leve",
      "Grave",
      "Muy grave",
      "Delictiva exclusiva de la jurisdicción penal"
    ],
    correct: 2, // C
    law: "LISOS (RD Legislativo 5/2000)",
    article: "Artículo 8.1 LISOS",
    explanation: "El impago y los retrasos continuados en el pago del salario debido se tipifican como infracción muy grave en materia de relaciones laborales."
  },
  {
    id: 27,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "Las vacaciones anuales retribuidas no sustituibles por compensación económica no podrán ser inferiores a:",
    options: [
      "20 días naturales",
      "30 días naturales",
      "22 días laborables salvo acuerdo",
      "15 días hábiles"
    ],
    correct: 1, // B
    law: "Estatuto de los Trabajadores",
    article: "Artículo 38.1 ET",
    explanation: "El período de vacaciones anuales retribuidas no será sustituible por compensación económica y su duración no será inferior a 30 días naturales."
  },
  {
    id: 28,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "En el despido declarado improcedente, el empresario en el plazo de 5 días podrá optar entre la readmisión del trabajador o el abono de una indemnización de:",
    options: [
      "20 días de salario por año de servicio con tope de 12 mensualidades",
      "33 días de salario por año de servicio con un máximo de 24 mensualidades",
      "45 días por año sin tope alguno",
      "25 días por año con un máximo de 18 mensualidades"
    ],
    correct: 1, // B
    law: "Estatuto de los Trabajadores",
    article: "Artículo 56.1 ET",
    explanation: "La indemnización por despido improcedente es de 33 días de salario por año de servicio, prorrateándose por meses los períodos de tiempo inferiores a un año, hasta un máximo de 24 mensualidades."
  },
  {
    id: 29,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "El despido objetivo por causas económicas, técnicas, organizativas o de producción exige el abono de una indemnización de:",
    options: [
      "12 días por año con tope de 24 mensualidades",
      "20 días de salario por año de servicio con un máximo de 12 mensualidades",
      "33 días por año con tope de 24 mensualidades",
      "Sin indemnización al ser causa justa"
    ],
    correct: 1, // B
    law: "Estatuto de los Trabajadores",
    article: "Artículo 53.1.b) ET",
    explanation: "El despido por causas objetivas requiere poner a disposición del trabajador una indemnización de 20 días por año de servicio, prorrateándose por meses y con un máximo de 12 mensualidades."
  },
  {
    id: 30,
    block: "especifico",
    mission: 3,
    topic: "Estatuto de los Trabajadores",
    question: "El derecho a la negociación colectiva laboral entre representantes de los trabajadores y empresarios se garantiza expresamente en el artículo ____ de la Constitución:",
    options: [
      "Artículo 28",
      "Artículo 37.1",
      "Artículo 35",
      "Artículo 14"
    ],
    correct: 1, // B
    law: "Constitución Española / ET",
    article: "Artículo 37.1 CE",
    explanation: "El artículo 37.1 de la CE garantiza el derecho a la negociación colectiva laboral entre los representantes de los trabajadores y empresarios, así como la fuerza vinculante de los convenios."
  },

  // ==========================================
  // MISIÓN 4: IV CUAGE (PERSONAL LABORAL DE LA AGE) (ESPECÍFICO)
  // ==========================================
  {
    id: 31,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "¿En qué Grupo Profesional del IV CUAGE se encuadra al personal con titulación de Graduado en Educación Secundaria Obligatoria (ESO) o equivalente?",
    options: [
      "Grupo Profesional M1",
      "Grupo Profesional E2",
      "Grupo Profesional E1",
      "Grupo Profesional E0"
    ],
    correct: 2, // C
    law: "IV CUAGE",
    article: "Clasificación Profesional IV CUAGE",
    explanation: "El Grupo Profesional E1 exige como requisito de acceso el Título de Graduado en ESO o Formación Básica / equivalente. Es el grupo clave de la convocatoria E1 Servicios Administrativos."
  },
  {
    id: 32,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "¿Cuál es el sistema ordinario de provisión de puestos de trabajo del personal laboral fijo del IV CUAGE?",
    options: [
      "Concurso Abierto y Permanente (CAP)",
      "Los concursos de traslados y los procesos de movilidad regulados en el IV CUAGE",
      "Libre Designación Directa por el Ministro",
      "Permuta forzosa interministerial"
    ],
    correct: 1, // B
    law: "IV CUAGE",
    article: "Provisión de puestos IV CUAGE",
    explanation: "La provisión de puestos del personal laboral de la AGE se realiza mediante concursos de traslados y demás sistemas de movilidad previstos en el IV CUAGE. El CAP es un sistema propio de la función pública funcionarial (Ley 20/2021), no del convenio laboral."
  },
  {
    id: 33,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "La retribución por antigüedad en el IV CUAGE se devenga mediante trienios, que consisten en el cumplimiento de:",
    options: [
      "Cada 2 años de servicio",
      "Cada 3 años de servicios prestados",
      "Cada 5 años ininterrumpidos",
      "Cada 4 años con evaluación favorable"
    ],
    correct: 1, // B
    law: "IV CUAGE",
    article: "Estructura Retributiva IV CUAGE",
    explanation: "La antigüedad retribuye la permanencia del trabajador en la AGE mediante trienios, devengándose por cada tres años de servicios prestados."
  },
  {
    id: 34,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "Las pagas extraordinarias del personal laboral del IV CUAGE se devengan en los meses de:",
    options: [
      "Mayo y Noviembre",
      "Junio y Diciembre",
      "Julio y Enero",
      "Marzo y Septiembre"
    ],
    correct: 1, // B
    law: "IV CUAGE",
    article: "Estructura Retributiva IV CUAGE",
    explanation: "Las dos pagas extraordinarias se percibirán con la retribución de los meses de junio y diciembre."
  },
  {
    id: 35,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "¿Qué grupo profesional del IV CUAGE requiere titulación de Técnico Superior de FP (Grado Superior)?",
    options: [
      "Grupo M3",
      "Grupo M2",
      "Grupo M1",
      "Grupo E2"
    ],
    correct: 2, // C
    law: "IV CUAGE",
    article: "Clasificación Profesional IV CUAGE",
    explanation: "El Grupo Profesional M1 requiere la titulación de Técnico Superior de Formación Profesional o equivalente."
  },
  {
    id: 36,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "En el régimen disciplinario del IV CUAGE, las ausencias no justificadas al trabajo de más de 3 días consecutivos constituyen una falta:",
    options: [
      "Leve",
      "Grave",
      "Muy grave",
      "Mera falta administrativa involuntaria"
    ],
    correct: 2, // C
    law: "IV CUAGE",
    article: "Régimen Disciplinario IV CUAGE",
    explanation: "La falta de asistencia no justificada de más de 3 días consecutivos se clasifica como falta muy grave en el IV CUAGE."
  },
  {
    id: 37,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "La sanción por falta leve en el IV CUAGE consiste en amonestación por escrito o suspensión de empleo y sueldo de hasta:",
    options: [
      "2 días",
      "7 días",
      "15 días",
      "1 mes"
    ],
    correct: 0, // A
    law: "IV CUAGE",
    article: "Régimen Disciplinario IV CUAGE",
    explanation: "Las faltas leves pueden ser sancionadas con amonestación por escrito o suspensión de empleo y sueldo de hasta 2 días."
  },
  {
    id: 38,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "El órgano colegiado competente para la interpretación, vigilancia y aplicación del IV CUAGE es la:",
    options: [
      "Comisión de Seguimiento del EBEP",
      "Comisión Paritaria",
      "Junta Central de Personal Laboral",
      "Comisión de Retribuciones de Hacienda"
    ],
    correct: 1, // B
    law: "IV CUAGE",
    article: "Órgano de Gobierno del Convenio IV CUAGE",
    explanation: "La Comisión Paritaria es el órgano paritario de interpretación, vigilancia, estudio y aplicación del Convenio Colectivo Único de la AGE."
  },
  {
    id: 39,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "La jornada ordinaria de trabajo del personal del IV CUAGE de promedio en cómputo anual es de:",
    options: [
      "40 horas semanales",
      "37,5 horas semanales",
      "35 horas semanales estrictas",
      "36 horas y media"
    ],
    correct: 1, // B
    law: "IV CUAGE",
    article: "Jornada laboral IV CUAGE",
    explanation: "La jornada ordinaria de trabajo es de 37,5 horas semanales de promedio en cómputo anual."
  },
  {
    id: 40,
    block: "especifico",
    mission: 4,
    topic: "IV CUAGE (Convenio Único AGE)",
    question: "El número de días hábiles de vacaciones retribuidas por año completo de servicio en el IV CUAGE es de:",
    options: [
      "30 días hábiles",
      "22 días hábiles",
      "24 días laborables",
      "20 días naturales"
    ],
    correct: 1, // B
    law: "IV CUAGE",
    article: "Vacaciones IV CUAGE",
    explanation: "El personal del IV CUAGE tiene derecho a disfrutar de 22 días hábiles de vacaciones por año completo de servicio (o parte proporcional)."
  },

  // ==========================================
  // MISIÓN 5: PREVENCIÓN DE RIESGOS Y LIBERTAD SINDICAL (ESPECÍFICO)
  // ==========================================
  {
    id: 41,
    block: "especifico",
    mission: 5,
    topic: "Ley 31/1995 de PRL",
    question: "El Comité de Seguridad y Salud se constituirá obligatoriamente en todas las empresas o centros de trabajo que cuenten con:",
    options: [
      "10 o más trabajadores",
      "25 o más trabajadores",
      "50 o más trabajadores",
      "100 o más trabajadores"
    ],
    correct: 2, // C
    law: "Ley 31/1995 de Prevención de Riesgos Laborales",
    article: "Artículo 38.1 LPRL",
    explanation: "El Comité de Seguridad y Salud es el órgano paritario de participación constituido en todas las empresas o centros que cuenten con 50 o más trabajadores."
  },
  {
    id: 42,
    block: "especifico",
    mission: 5,
    topic: "Ley 31/1995 de PRL",
    question: "Los reconocimientos médicos en la vigilancia de la salud practicados por el empresario son con carácter general:",
    options: [
      "Obligatorios para todo el personal sin excepción",
      "Voluntarios para el trabajador, salvo excepciones legales específicas",
      "Exclusivamente semestrales",
      "A cargo del propio empleado"
    ],
    correct: 1, // B
    law: "Ley 31/1995 de Prevención de Riesgos Laborales",
    article: "Artículo 22.1 LPRL",
    explanation: "La vigilancia de la salud sólo podrá llevarse a cabo cuando el trabajador preste su consentimiento (voluntario), salvo en los casos en que la realización sea imprescindible para evaluar los efectos de las condiciones de trabajo o verificar si el estado de salud entraña peligro."
  },
  {
    id: 43,
    block: "especifico",
    mission: 5,
    topic: "Ley 31/1995 de PRL",
    question: "¿Quiénes eligen a los Delegados de Prevención en los centros de trabajo?",
    options: [
      "La Dirección de la empresa / Administración",
      "Los trabajadores por sufragio directo e individual",
      "Los representantes del personal entre los miembros del Comité / Delegados de Personal",
      "La Inspección de Trabajo"
    ],
    correct: 2, // C
    law: "Ley 31/1995 de Prevención de Riesgos Laborales",
    article: "Artículo 35.2 LPRL",
    explanation: "Los Delegados de Prevención son designados por y entre los representantes del personal en el ámbito de los comités de empresa o delegados de personal."
  },
  {
    id: 44,
    block: "especifico",
    mission: 5,
    topic: "LO 11/1985 Libertad Sindical",
    question: "¿Qué porcentaje de representación a nivel estatal otorga a un sindicato la condición de 'Más Representativo'?",
    options: [
      "5% de los delegados",
      "10% o más de los delegados a nivel estatal",
      "15% autonómico únicamente",
      "50% más un voto"
    ],
    correct: 1, // B
    law: "Ley Orgánica 11/1985 de Libertad Sindical",
    article: "Artículo 6.2.a) LOLS",
    explanation: "Tienen la consideración de sindicatos más representativos a nivel estatal los que acrediten una audiencia del 10% o más del total de delegados de personal o miembros del comité."
  },
  {
    id: 45,
    block: "especifico",
    mission: 5,
    topic: "LO 11/1985 Libertad Sindical",
    question: "Según el artículo 28.1 de la CE y la LOLS, ¿quiénes están EXCLUIDOS del ejercicio del derecho de sindicación?",
    options: [
      "El personal laboral del IV CUAGE",
      "Los miembros de las Fuerzas Armadas y de los Institutos Armados de carácter militar",
      "Los funcionarios civiles de la AGE",
      "Los trabajadores a tiempo parcial"
    ],
    correct: 1, // B
    law: "Ley Orgánica 11/1985 / Art. 28.1 CE",
    article: "Artículo 1.3 LOLS / 28.1 CE",
    explanation: "La ley exceptúa del ejercicio del derecho de sindicación a los miembros de las Fuerzas Armadas y de los Institutos Armados de carácter militar (Guardia Civil)."
  },
  {
    id: 46,
    block: "especifico",
    mission: 5,
    topic: "Ley 31/1995 de PRL",
    question: "Ante una situación de riesgo laboral grave e inminente, el trabajador tiene derecho a:",
    options: [
      "Abandonar el lugar de trabajo sin ser sancionado salvo mala fe",
      "Continuar trabajando bajo su propia responsabilidad exclusivamente",
      "Exigir una indemnización inmediata",
      "Dimitir con derecho a paro automático"
    ],
    correct: 0, // A
    law: "Ley 31/1995 de Prevención de Riesgos Laborales",
    article: "Artículo 21.2 LPRL",
    explanation: "El trabajador tendrá derecho a interrumpir su actividad y abandonar el lugar de trabajo si considera que dicha actividad entraña un riesgo grave e inminente para su vida o salud."
  },
  {
    id: 47,
    block: "especifico",
    mission: 5,
    topic: "LO 11/1985 Libertad Sindical",
    question: "Se podrán constituir Secciones Sindicales por los trabajadores afiliados a un sindicato en el ámbito de:",
    options: [
      "Únicamente empresas de más de 500 trabajadores",
      "La empresa o centro de trabajo",
      "Solo en las sedes ministeriales centrales",
      "Cualquier plaza pública"
    ],
    correct: 1, // B
    law: "Ley Orgánica 11/1985 de Libertad Sindical",
    article: "Artículo 8.1 LOLS",
    explanation: "Los trabajadores afiliados a un sindicato podrán, en el ámbito de la empresa o centro de trabajo, constituir Secciones Sindicales de conformidad con lo establecido en los estatutos del sindicato."
  },
  {
    id: 48,
    block: "especifico",
    mission: 5,
    topic: "Ley 31/1995 de PRL",
    question: "Los Equipos de Protección Individual (EPIs) deben ser proporcionados por la Administración o empresario de forma:",
    options: [
      "Gratuita para el trabajador",
      "Cofinanciada al 50%",
      "Descontada del salario en la paga extra",
      "Previo depósito de fianza reembolsable"
    ],
    correct: 0, // A
    law: "Ley 31/1995 de Prevención de Riesgos Laborales",
    article: "Artículo 17.2 LPRL",
    explanation: "El empresario/Administración deberá proporcionar gratuitamente a los trabajadores los equipos de protección individual adecuados para el desempeño de sus funciones."
  },
  {
    id: 49,
    block: "especifico",
    mission: 5,
    topic: "LO 11/1985 Libertad Sindical",
    question: "Los actos del empresario o de la Administración vulneradores de la libertad sindical son sancionados con la nulidad radical y pueden dar lugar a:",
    options: [
      "Indemnización por daños y perjuicios morales o materiales",
      "Archivado sin responsabilidades",
      "Sanción disciplinaria al sindicato",
      "Pérdida del derecho de huelga"
    ],
    correct: 0, // A
    law: "Ley Orgánica 11/1985 de Libertad Sindical",
    article: "Artículo 15 LOLS",
    explanation: "El juzgador declarará la nulidad radical de la conducta violatoria y ordenará el cese inmediato, así como la reparación de las consecuencias y la indemnización que proceda."
  },
  {
    id: 50,
    block: "especifico",
    mission: 5,
    topic: "Ley 31/1995 de PRL",
    question: "La formación de los trabajadores en materia preventiva debe impartirse:",
    options: [
      "Dentro de la jornada de trabajo o descontando el tiempo invertido",
      "Siempre fuera de la jornada sin compensación",
      "Únicamente en el momento de la jubilación",
      "A costa del trabajador interesado"
    ],
    correct: 0, // A
    law: "Ley 31/1995 de Prevención de Riesgos Laborales",
    article: "Artículo 19.2 LPRL",
    explanation: "La formación se impartirá, siempre que sea posible, dentro de la jornada de trabajo o, en su defecto, en otras horas pero con el descuento en la misma del tiempo invertido en ella."
  },

  // ==========================================
  // MISIÓN 6: SEGURIDAD SOCIAL, ISFAS Y CLASES PASIVAS (ESPECÍFICO)
  // ==========================================
  {
    id: 51,
    block: "especifico",
    mission: 6,
    topic: "LGSS (RDL 8/2015)",
    question: "El principio de caja única en el sistema de la Seguridad Social española significa que:",
    options: [
      "Cada Comunidad Autónoma gestiona sus propios recursos económicos",
      "La titularidad de todos los fondos y recursos del sistema pertenece exclusivamente a la Tesorería General de la Seguridad Social (TGSS)",
      "Los municipios recaudan las cotizaciones",
      "Las Mutuas son propietarias del capital recaudado"
    ],
    correct: 1, // B
    law: "Ley General de la Seguridad Social (RDL 8/2015)",
    article: "Artículo 5.1 LGSS",
    explanation: "La Tesorería General de la Seguridad Social (TGSS), como caja única del sistema, custodia y gestiona todos los fondos de la Seguridad Social bajo el principio de solidaridad financiera."
  },
  {
    id: 52,
    block: "especifico",
    mission: 6,
    topic: "ISFAS (RDL 1/2000)",
    question: "¿Qué organismo gestiona el Régimen Especial de la Seguridad Social de las Fuerzas Armadas y de la Guardia Civil?",
    options: [
      "MUFACE",
      "ISFAS (Instituto Social de las Fuerzas Armadas)",
      "MUGEJU",
      "INSS"
    ],
    correct: 1, // B
    law: "Real Decreto Legislativo 1/2000 (ISFAS)",
    article: "Artículo 1 RDL 1/2000",
    explanation: "El ISFAS es el organismo autónomo adscrito al Ministerio de Defensa encargado de la gestión del Régimen Especial de Seguridad Social de las Fuerzas Armadas."
  },
  {
    id: 53,
    block: "especifico",
    mission: 6,
    topic: "Ley 29/2014 / ISFAS",
    question: "Los alumnos de los centros docentes de formación de la Guardia Civil y de las Fuerzas Armadas cotizan al ISFAS en función de:",
    options: [
      "El Salario Mínimo Interprofesional",
      "El grupo retributivo o haber regulador correspondiente según su nivel de formación",
      "Una cuota fija simbólica exenta",
      "El régimen de autónomos"
    ],
    correct: 1, // B
    law: "Ley 29/2014 / RDL 1/2000",
    article: "Normativa de Personal y Cotización ISFAS",
    explanation: "La cotización de los alumnos en academias y centros de formación se efectúa sobre el haber regulador o grupo retributivo aplicable a su escala."
  },
  {
    id: 54,
    block: "especifico",
    mission: 6,
    topic: "Clases Pasivas (RDL 670/1987)",
    question: "Desde el 1 de enero de 2011, los funcionarios de nuevo ingreso en la Administración General del Estado quedan obligatoriamente encuadrados en:",
    options: [
      "El Régimen de Clases Pasivas del Estado",
      "El Régimen General de la Seguridad Social",
      "El Plan de Pensiones Privado Obligatorio",
      "El Régimen Especial de Autónomos"
    ],
    correct: 1, // B
    law: "Real Decreto-ley 13/2010 / RDL 670/1987",
    article: "Disposición Adicional 3ª RDL 13/2010",
    explanation: "El Régimen de Clases Pasivas es un sistema a extinguir. El personal que acceda a la condición de funcionario público estatal a partir del 01/01/2011 queda integrado en el Régimen General de la Seguridad Social a efectos de pensiones."
  },
  {
    id: 55,
    block: "especifico",
    mission: 6,
    topic: "Clases Pasivas (RDL 670/1987)",
    question: "¿Cuántos años de servicios efectivos al Estado se requieren para alcanzar el 100% del Haber Regulador en la pensión de Clases Pasivas?",
    options: [
      "25 años",
      "30 años",
      "35 o más años",
      "40 años"
    ],
    correct: 2, // C
    law: "Real Decreto Legislativo 670/1987 de Clases Pasivas",
    article: "Artículo 31 RDL 670/1987",
    explanation: "Con 35 o más años de servicios reconocidos al Estado se percibe el 100% del haber regulador establecido para su cuerpo o escala."
  },
  {
    id: 56,
    block: "especifico",
    mission: 6,
    topic: "ISFAS (RDL 1/2000)",
    question: "En el ISFAS, el titular del derecho a la asistencia sanitaria puede elegir anualmente entre ser atendido por la Red Sanitaria Pública o por:",
    options: [
      "Cualquier médico privado sin concierto previa factura",
      "Entidades de Seguro Privado concertadas con el ISFAS (ej. Asisa, Adeslas)",
      "Únicamente por sanidad militar de campaña",
      "Mutuas de Accidentes de Trabajo"
    ],
    correct: 1, // B
    law: "Real Decreto Legislativo 1/2000 (ISFAS)",
    article: "Asistencia Sanitaria ISFAS",
    explanation: "El titular puede adscribirse anualmente a los Servicios Públicos de Salud o a las Entidades de Seguro Privado que hayan suscrito concierto con el ISFAS."
  },
  {
    id: 57,
    block: "especifico",
    mission: 6,
    topic: "LGSS (RDL 8/2015)",
    question: "Las prestaciones contributivas de la Seguridad Social se financian fundamentalmente mediante:",
    options: [
      "Donaciones privadas y patrimonio",
      "Las cotizaciones de trabajadores y empresarios",
      "Impuestos indirectos sobre el consumo (IVA)",
      "Tasas administrativas"
    ],
    correct: 1, // B
    law: "Ley General de la Seguridad Social (RDL 8/2015)",
    article: "Artículo 109 LGSS",
    explanation: "Las prestaciones contributivas se financian mediante las cuotas de las personas obligadas a cotizar (empleadores y trabajadores)."
  },
  {
    id: 58,
    block: "especifico",
    mission: 6,
    topic: "Clases Pasivas (RDL 670/1987)",
    question: "¿A qué edad se produce con carácter general la jubilación forzosa por edad de los funcionarios en Clases Pasivas?",
    options: [
      "60 años",
      "65 años",
      "67 años",
      "70 años"
    ],
    correct: 1, // B
    law: "Real Decreto Legislativo 670/1987 de Clases Pasivas",
    article: "Artículo 28.2 RDL 670/1987",
    explanation: "La jubilación forzosa se declara de oficio al cumplir el funcionario los 65 años de edad (salvo excepciones como Magistrados y Jueces a los 70)."
  },
  {
    id: 59,
    block: "especifico",
    mission: 6,
    topic: "LGSS (RDL 8/2015)",
    question: "El derecho al reconocimiento de las prestaciones de la Seguridad Social prescribe en el plazo de:",
    options: [
      "1 año",
      "5 años a contar desde el día siguiente al hecho causante",
      "3 años",
      "No prescribe en ningún caso"
    ],
    correct: 1, // B
    law: "Ley General de la Seguridad Social (RDL 8/2015)",
    article: "Artículo 53.1 LGSS",
    explanation: "El derecho al reconocimiento de las prestaciones prescribirá a los 5 años, contados desde el día siguiente a aquel en que tenga lugar el hecho causante de la prestación."
  },
  {
    id: 60,
    block: "especifico",
    mission: 6,
    topic: "Clases Pasivas (RDL 670/1987)",
    question: "La pensión de viudedad en Clases Pasivas equivale con carácter general al ____ de la base reguladora del causante:",
    options: [
      "25%",
      "50%",
      "70%",
      "100%"
    ],
    correct: 1, // B
    law: "Real Decreto Legislativo 670/1987 de Clases Pasivas",
    article: "Artículo 38 RDL 670/1987",
    explanation: "La cuantía de la pensión de viudedad será el 50% del haber regulador correspondiente al cuerpo o escala del causante."
  },

  {"id":61,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"Según el artículo 9.3 CE, ¿cuál de los siguientes NO es un principio garantizado?","options":["La legalidad y la jerarquía normativa","La publicidad de las normas","La irretroactividad de las disposiciones sancionadoras no favorables","La retroactividad absoluta de todas las normas"],"correct":3,"law":"Constitución Española de 1978","article":"Artículo 9.3 CE","explanation":"El art. 9.3 CE garantiza la legalidad, jerarquía normativa, publicidad de las normas, irretroactividad de las disposiciones sancionadoras no favorables o restrictivas de derechos, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad. No existe retroactividad absoluta."},
  {"id":62,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Cuántos artículos tiene la Constitución Española de 1978?","options":["169","170","168","155"],"correct":0,"law":"Constitución Española de 1978","article":"Estructura CE","explanation":"La CE consta de 169 artículos, 11 títulos (Preliminar + 10), 4 disposiciones adicionales, 9 transitorias, 1 derogatoria y 1 final."},
  {"id":63,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Qué artículo de la CE regula la libertad de cátedra?","options":["Artículo 20.1.c","Artículo 27.2","Artículo 16","Artículo 21"],"correct":0,"law":"Constitución Española de 1978","article":"Artículo 20.1.c) CE","explanation":"El art. 20.1.c) CE reconoce la libertad de cátedra dentro del derecho a la libertad de expresión. El 27.2 garantiza la libertad de enseñanza."},
  {"id":64,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"La moción de censura debe ser propuesta al menos por:","options":["Una décima parte de los diputados","Una quinta parte de los diputados","Una cuarta parte de los diputados","Una décima parte del Senado"],"correct":0,"law":"Constitución Española de 1978","article":"Artículo 113.2 CE","explanation":"La moción de censura deberá ser propuesta al menos por una décima parte de los Diputados y habrá de incluir un candidato a la Presidencia del Gobierno."},
  {"id":65,"block":"comun","mission":1,"topic":"Ley 40/2015 LRJSP","question":"La competencia administrativa se ejerce, entre otros, por los siguientes principios:","options":["Centralización y jerarquía","Descentralización, desconcentración y coordinación","Discrecionalidad y oportunidad","Autonomía y jerarquía"],"correct":1,"law":"Ley 40/2015 LRJSP","article":"Artículo 3.1 Ley 40/2015","explanation":"La organización y funcionamiento del Sector Público se rige por los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación."},
  {"id":66,"block":"comun","mission":2,"topic":"TREBEP (RDL 5/2015)","question":"¿Cuántos días hábiles de vacaciones corresponden anualmente a los funcionarios (TREBEP)?","options":["30 días naturales","22 días hábiles","24 días laborables","25 días naturales"],"correct":1,"law":"TREBEP (RDL 5/2015)","article":"Artículo 50 TREBEP","explanation":"Los funcionarios de carrera tienen derecho a 22 días hábiles de vacaciones por año completo de servicio (o parte proporcional)."},
  {"id":67,"block":"comun","mission":2,"topic":"Ley Orgánica 1/2004 Violencia de Género","question":"La reducción de jornada de la funcionaria víctima de violencia de género es:","options":["No procede en la Administración","Un derecho reconocido con derecho a la reducción de jornada con disminución proporcional de retribuciones","Solo procede por 3 meses","Imposible de solicitar"],"correct":1,"law":"TREBEP / LO 1/2004","article":"Artículo 82 TREBEP","explanation":"Las empleadas públicas víctimas de violencia de género tienen derecho a la reducción de jornada con la consiguiente disminución proporcional de retribuciones."},
  {"id":68,"block":"comun","mission":2,"topic":"RD Legislativo 1/2013 Discapacidad","question":"El cupo de reserva del 2% para personas con discapacidad intelectual en la AGE se aplica:","options":["A todas las convocatorias","En las ofertas de empleo público del personal laboral y funcionario de la AGE","Solo a plazas de chofer","Nunca"],"correct":1,"law":"TREBEP art. 59 / RD-Leg 1/2013","article":"Artículo 59.1 TREBEP","explanation":"Del 7% de reserva, se reservará el 2% para personas con discapacidad intelectual en las ofertas de la AGE."},
  {"id":69,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"Según el art. 1.3 ET, ¿cuál NO está excluido del ámbito de aplicación del Estatuto de los Trabajadores?","options":["Los funcionarios públicos","Las prestaciones personales obligatorias","El personal laboral de la AGE","Los trabajos familiares salvo prueba de asalariado"],"correct":2,"law":"Estatuto de los Trabajadores","article":"Artículo 1.3 ET","explanation":"El personal laboral de la AGE SÍ está incluido en el ET. Los funcionarios, las prestaciones obligatorias y los trabajos familiares (salvo prueba) están excluidos."},
  {"id":70,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"El principio 'in dubio pro operario' significa que:","options":["Se aplica la norma más favorable al empresario","Ante la duda en la interpretación, se favorece al trabajador","Se aplica la norma más antigua","Se aplica la norma jerárquicamente superior"],"correct":1,"law":"Derecho del Trabajo","article":"Principios interpretativos","explanation":"El principio 'in dubio pro operario' establece que ante la duda en la interpretación de una norma, se estará a la interpretación más favorable para el trabajador."},
  {"id":71,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"La condición más beneficiosa significa que:","options":["Las mejoras adquiridas por el trabajador se mantienen aunque el convenio cambie","Solo se aplica la ley","El empresario puede reducirla unilateralmente","No existe en el ordenamiento"],"correct":0,"law":"Derecho del Trabajo","article":"Principios del derecho laboral","explanation":"La condición más beneficiosa implica que las condiciones superiores adquiridas por el trabajador se incorporan a su contrato y no pueden ser suprimidas unilateralmente."},
  {"id":72,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"¿Cuál es la duración máxima del contrato eventual por circunstancias de la producción?","options":["3 meses","6 meses ampliables a 12 por convenio sectorial","12 meses ampliables a 18","2 años"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 15.1.b) ET","explanation":"El contrato eventual tiene una duración máxima de 6 meses dentro de un período de 12 (ampliable a 12/18 por convenio sectorial)."},
  {"id":73,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"¿Cuántos días de descanso entre jornadas tiene garantizado todo trabajador (art. 34.3 ET)?","options":["8 horas","10 horas","12 horas","24 horas"],"correct":2,"law":"Estatuto de los Trabajadores","article":"Artículo 34.3 ET","explanation":"Entre el final de una jornada y el comienzo de la siguiente mediarán, como mínimo, 12 horas de descanso."},
  {"id":74,"block":"especifico","mission":4,"topic":"IV CUAGE","question":"El IV CUAGE establece una jornada semanal de promedio en cómputo anual de:","options":["40 horas","37,5 horas","35 horas","42 horas"],"correct":1,"law":"IV CUAGE","article":"Jornada IV CUAGE","explanation":"La jornada ordinaria del personal laboral de la AGE sujeto al IV CUAGE es de 37,5 horas semanales de promedio en cómputo anual."},
  {"id":75,"block":"especifico","mission":4,"topic":"IV CUAGE","question":"¿Qué órgano se crea para el seguimiento de la aplicación del IV CUAGE?","options":["La Comisión Paritaria","El Comité de Empresa","La Junta de Personal","El Consejo de Ministros"],"correct":0,"law":"IV CUAGE","article":"Comisión Paritaria","explanation":"La Comisión Paritaria es el órgano paritario de interpretación, vigilancia, estudio y aplicación del Convenio."},
  {"id":76,"block":"especifico","mission":5,"topic":"Ley 31/1995 PRL","question":"El deber de información a los trabajadores sobre los riesgos del puesto (art. 18 LPRL) corresponde a:","options":["Los representantes de los trabajadores","El empresario","La Inspección de Trabajo","El Comité de Seguridad"],"correct":1,"law":"Ley 31/1995 PRL","article":"Artículo 18.1 LPRL","explanation":"El empresario adoptará las medidas adecuadas para que los trabajadores y sus representantes reciban información sobre los riesgos del puesto y las medidas de protección."},
  {"id":77,"block":"especifico","mission":5,"topic":"LO 11/1985 Libertad Sindical","question":"¿Qué derechos tienen los sindicatos más representativos?","options":["Solo negociar convenios de empresa","Representación institucional ante las Administraciones Públicas y negociación de convenios supraempresariales","Solo el derecho de huelga","Ningún derecho especial"],"correct":1,"law":"LO 11/1985 LOLS","article":"Artículo 6.3 LOLS","explanation":"Los sindicatos más representativos gozan de representación institucional ante las AAPP y de la capacidad para negociar convenios de ámbito supraempresarial."},
  {"id":78,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"¿Cuánto tiempo cotizado se exige como mínimo para acceder a la prestación contributiva por desempleo?","options":["180 días en los últimos 5 años","360 días en los últimos 6 años","720 días en los últimos 8 años","90 días en el último año"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 266 LGSS","explanation":"Se exige haber cotizado al menos 360 días dentro de los 6 años anteriores a la situación legal de desempleo."},
  {"id":79,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"En la incapacidad temporal por contingencias comunes, ¿desde qué día se cobra el 75% de la base reguladora?","options":["Día 4","Día 8","Día 15","Día 21"],"correct":3,"law":"LGSS (RDL 8/2015)","article":"Artículo 172 LGSS","explanation":"Desde el día 4 al 20 se cobra el 60% de la base reguladora; desde el día 21 en adelante, el 75%."},
  {"id":80,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"¿Qué se entiende por accidente de trabajo 'in itinere'?","options":["El ocurrido en el centro de trabajo","El sufrido al ir o volver del trabajo","El ocurrido durante las vacaciones","El ocurrido por imprudencia temeraria"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 156.2.a) LGSS","explanation":"Se considera accidente de trabajo el sufrido al ir o al volver del lugar de trabajo (in itinere), salvo imprudencia temeraria."},
  {"id":81,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Cuál de las siguientes NO es una de las formas de reforma constitucional previstas en la CE?","options":["Reforma ordinaria (art. 167)","Reforma agravada (art. 168)","Reforma por iniciativa popular directa sin Cortes","Revisión total mediante procedimiento agravado"],"correct":2,"law":"Constitución Española de 1978","article":"Artículos 166-169 CE","explanation":"Las reformas constitucionales solo pueden aprobarse mediante los procedimientos de los arts. 167 (ordinario) y 168 (agravado para revisión total o materias nucleares). No existe iniciativa popular directa que sustituya a las Cortes."},
  {"id":82,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Qué órgano ejerce la potestad legislativa del Estado?","options":["El Gobierno","Las Cortes Generales","El Tribunal Constitucional","El Consejo de Estado"],"correct":1,"law":"Constitución Española de 1978","article":"Artículo 66.2 CE","explanation":"Las Cortes Generales representan al pueblo español y ejercen la potestad legislativa del Estado, aprueban los Presupuestos y controlan la acción del Gobierno."},
  {"id":83,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"El Presidente del Gobierno es elegido mediante el procedimiento de:","options":["Elección directa popular","Investidura parlamentaria ante el Congreso","Nombramiento por el Rey sin control","Elección por el Senado"],"correct":1,"law":"Constitución Española de 1978","article":"Artículo 99 CE","explanation":"Tras la propuesta del Rey, con refrendo del Presidente del Congreso, el candidato se somete a la investidura: debe obtener la confianza del Congreso de los Diputados."},
  {"id":84,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Cuál es la duración de una legislatura en España?","options":["Tres años","Cuatro años","Cinco años","Seis años"],"correct":1,"law":"Constitución Española de 1978","article":"Artículo 68.4 CE","explanation":"El Congreso se elige por cuatro años (art. 68.4 CE); el Senado también (art. 69.6 CE). El mandato del Congreso termina a los cuatro años o al disolverse las Cámaras."},
  {"id":85,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"El Tribunal Constitucional está compuesto por ____ magistrados nombrados por el Rey:","options":["9","10","12","15"],"correct":2,"law":"Constitución Española de 1978","article":"Artículo 159.1 CE","explanation":"El Tribunal Constitucional se compone de 12 miembros nombrados por el Rey: 4 a propuesta del Congreso, 4 del Senado, 2 del Gobierno y 2 del Consejo General del Poder Judicial."},
  {"id":86,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Qué Título de la CE regula la organización territorial del Estado?","options":["Título V","Título VI","Título VIII","Título IX"],"correct":2,"law":"Constitución Española de 1978","article":"Título VIII CE","explanation":"El Título VIII (arts. 137-158) regula la organización territorial: principios generales, la Administración Local y las Comunidades Autónomas."},
  {"id":87,"block":"comun","mission":1,"topic":"Ley 50/1997 del Gobierno","question":"¿Qué órgano puede crear Comisiones Delegadas del Gobierno?","options":["El Presidente del Gobierno","El Consejo de Ministros","Las Cortes Generales","El Senado"],"correct":1,"law":"Ley 50/1997, del Gobierno","article":"Artículo 6.1 Ley 50/1997","explanation":"El Consejo de Ministros, a propuesta del Presidente, puede crear, modificar o suprimir Comisiones Delegadas del Gobierno para examinar cuestiones de interés común."},
  {"id":88,"block":"comun","mission":1,"topic":"Ley 40/2015 LRJSP","question":"La encomienda de gestión entre órganos de la misma Administración:","options":["Altera la titularidad de la competencia","No altera la titularidad de la competencia ni los elementos sustantivos de su ejercicio","Transfiere la competencia definitivamente","Requiere ley orgánica"],"correct":1,"law":"Ley 40/2015","article":"Artículo 11 Ley 40/2015","explanation":"La encomienda de gestión no supone cesión de la titularidad de la competencia ni de los elementos sustantivos de su ejercicio, siendo responsabilidad del órgano encomendante dictar cuantos actos requiera."},
  {"id":89,"block":"comun","mission":1,"topic":"Ley 39/2015 LPAC","question":"¿Cuál es el plazo máximo para resolver un procedimiento administrativo ordinario (Ley 39/2015)?","options":["Uno mes","Tres meses","Seis meses","Un año"],"correct":1,"law":"Ley 39/2015","article":"Artículo 21.3 LPAC","explanation":"La Administración está obligada a dictar resolución expresa y a notificarla en el plazo máximo de tres meses, salvo que la norma establezca otro mayor."},
  {"id":90,"block":"comun","mission":1,"topic":"Ley 39/2015 LPAC","question":"¿Qué es el silencio administrativo negativo?","options":["Que la Administración no contesta nunca","Que transcurrido el plazo sin resolución se entiende desestimada la solicitud en los casos previstos","Que la solicitud se entiende aceptada","Que el expediente caduca automáticamente"],"correct":1,"law":"Ley 39/2015","article":"Artículo 24 LPAC","explanation":"El silencio administrativo negativo es una ficción legal: transcurrido el plazo sin resolución expresa, la solicitud se entiende desestimada en los supuestos en que la ley lo prevea. El silencio estimatorio debe ser expreso."},
  {"id":91,"block":"comun","mission":1,"topic":"Ley 39/2015 LPAC","question":"Los recursos administrativos ordinarios son:","options":["Solo el de reposición","El de reposición y el de alzada","El contencioso-administrativo","La reclamación económico-administrativa"],"correct":1,"law":"Ley 39/2015","article":"Artículos 112-122 LPAC","explanation":"Los recursos administrativos ordinarios son el de alzada (contra actos que no ponen fin a la vía administrativa) y el de reposición (potestativo, contra actos que ponen fin a la vía)."},
  {"id":92,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"La cláusula de conciencia y el secreto profesional de los periodistas se reconocen en:","options":["Artículo 16 CE","Artículo 20.1.d) CE","Artículo 24 CE","Artículo 18 CE"],"correct":1,"law":"Constitución Española de 1978","article":"Artículo 20.1.d) CE","explanation":"El art. 20.1.d) CE reconoce el derecho a comunicar o recibir libremente información veraz; el mismo artículo en sus letras e) y f) la cláusula de conciencia y el secreto profesional."},
  {"id":93,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"¿Qué artículo de la CE establece que España se organiza territorialmente en municipios, provincias y Comunidades Autónomas?","options":["Artículo 137","Artículo 140","Artículo 141","Artículo 148"],"correct":0,"law":"Constitución Española de 1978","article":"Artículo 137 CE","explanation":"El art. 137 CE establece la organización territorial del Estado en municipios, provincias y Comunidades Autónomas, gozando cada una de autonomía para la gestión de sus intereses."},
  {"id":94,"block":"comun","mission":1,"topic":"Constitución Española de 1978","question":"La sucesión al trono se regula en:","options":["Título II CE","Título IV CE","Título I CE","Título VIII CE"],"correct":0,"law":"Constitución Española de 1978","article":"Artículo 57 CE (Título II)","explanation":"El Título II (La Corona, arts. 56-65) regula el Rey, sus funciones y la sucesión al trono conforme al orden regular de primogenitura y representación."},
  {"id":95,"block":"comun","mission":2,"topic":"TREBEP (RDL 5/2015)","question":"¿Cuál es la jornada de trabajo semanal en cómputo anual de los funcionarios públicos (TREBEP)?","options":["40 horas","37,5 horas","35 horas","42 horas"],"correct":1,"law":"TREBEP (RDL 5/2015)","article":"Artículo 47 TREBEP","explanation":"La jornada de trabajo de los funcionarios será en cómputo anual la que determine la legislación, siendo de 37,5 horas semanales de promedio la jornada general."},
  {"id":96,"block":"comun","mission":2,"topic":"TREBEP (RDL 5/2015)","question":"El régimen de incompatibilidades de los empleados públicos se regula en:","options":["La Ley 53/1984","La Ley 39/2015","El Código Civil","La Ley 50/1997"],"correct":0,"law":"Ley 53/1984 de Incompatibilidades","article":"Ámbito general","explanation":"La Ley 53/1984 regula las incompatibilidades del personal al servicio de las Administraciones Públicas, prohibiendo la acumulación de puestos en el sector público salvo excepciones."},
  {"id":97,"block":"comun","mission":2,"topic":"TREBEP (RDL 5/2015)","question":"Los sistemas de selección del personal funcionario de carrera son:","options":["Oposición, concurso y concurso-oposición","Solo oposición","Solo concurso","Nombramiento directo"],"correct":0,"law":"TREBEP (RDL 5/2015)","article":"Artículo 61 TREBEP","explanation":"La selección del personal funcionario se realiza mediante oposición, concurso u oposición-concurso, garantizando los principios de igualdad, mérito y capacidad."},
  {"id":98,"block":"comun","mission":2,"topic":"Ley Orgánica 3/2007 de Igualdad","question":"¿A partir de cuántos trabajadores las empresas deben elaborar un plan de igualdad?","options":["25 o más","50 o más","100 o más","250 o más"],"correct":1,"law":"Ley Orgánica 3/2007 / RD-Ley 6/2019","article":"Artículo 45 LO 3/2007","explanation":"Las empresas de 50 o más trabajadores están obligadas a elaborar y aplicar un plan de igualdad (umbral rebajado desde 250 por el RD-Ley 6/2019)."},
  {"id":99,"block":"comun","mission":2,"topic":"Ley Orgánica 3/2007 de Igualdad","question":"¿Qué se entiende por discriminación indirecta?","options":["Trato peyorativo directo por sexo","Una disposición o práctica aparentemente neutra que perjudica a personas de un sexo de forma desproporcionada","Solo el acoso","La preferencia por contratar mujeres"],"correct":1,"law":"Ley Orgánica 3/2007","article":"Artículo 6.2 LO 3/2007","explanation":"La discriminación indirecta es una disposición, criterio o práctica aparentemente neutros que ocasiona desventajas a personas de un sexo respecto del otro."},
  {"id":100,"block":"comun","mission":2,"topic":"Ley Orgánica 1/2004 Violencia de Género","question":"¿Qué órganos judiciales son competentes en materia de violencia de género?","options":["Los Juzgados de lo Penal","Los Juzgados de Violencia sobre la Mujer","Los Juzgados de lo Contencioso","Los Juzgados de Primera Instancia"],"correct":1,"law":"LO 1/2004 Violencia de Género","article":"Artículo 43 y ss. LO 1/2004","explanation":"Los Juzgados de Violencia sobre la Mujer conocen de la instrucción de los delitos de violencia de género y de las materias civiles conexas."},
  {"id":101,"block":"comun","mission":2,"topic":"Ley 39/2006 de Dependencia","question":"¿Cuáles son los grados de dependencia reconocidos por la Ley 39/2006?","options":["Leve, moderada y severa","Grado I (moderada), Grado II (severa) y Grado III (gran dependencia)","Primera, segunda y tercera","Básica, media y alta"],"correct":1,"law":"Ley 39/2006 de Dependencia","article":"Artículo 26 Ley 39/2006","explanation":"La dependencia se clasifica en Grado I (moderada), Grado II (severa) y Grado III (gran dependencia), según la necesidad de ayuda."},
  {"id":102,"block":"comun","mission":2,"topic":"Ley 4/2023 LGTBI","question":"¿Qué ley garantiza la igualdad real y efectiva de las personas trans y los derechos LGTBI?","options":["LO 3/2007","Ley 4/2023","LO 1/2004","Ley 39/2006"],"correct":1,"law":"Ley 4/2023 LGTBI","article":"Ámbito general","explanation":"La Ley 4/2023, de 28 de febrero, garantiza la igualdad real y efectiva de las personas trans y la protección de los derechos de las personas LGTBI."},
  {"id":103,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"¿Cuáles son los elementos esenciales del contrato de trabajo?","options":["Consentimiento, objeto y causa","Solo consentimiento","Forma escrita siempre","Solo el salario"],"correct":0,"law":"Estatuto de los Trabajadores","article":"Artículo 1.1 y 2 ET","explanation":"Los elementos esenciales del contrato de trabajo son el consentimiento, el objeto (prestación de servicios) y la causa (intercambio trabajo-salario)."},
  {"id":104,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"¿Qué se entiende por trabajador fijo-discontinuo?","options":["Un trabajador eventual","Un trabajador que presta servicios de forma intermitente por la naturaleza de la actividad, con derecho a llamamiento","Un becario","Un autónomo"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 16 ET","explanation":"El contrato fijo-discontinuo se concierta para la realización de trabajos de naturaleza estacional o de temporada, o para prestaciones intermitentes, con derecho de llamamiento."},
  {"id":105,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"El contrato de trabajo a tiempo parcial:","options":["Puede ser indefinido o temporal","Solo puede ser temporal","No permite horas complementarias","Prohíbe la realización de horas extraordinarias"],"correct":0,"law":"Estatuto de los Trabajadores","article":"Artículo 12 ET","explanation":"El contrato a tiempo parcial puede concertarse por tiempo indefinido o por duración determinada. Los trabajadores a tiempo parcial tienen derechos equivalentes a los de jornada completa."},
  {"id":106,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"¿Cuántas horas extraordinarias al año como máximo puede realizar un trabajador (salvo fuerza mayor)?","options":["60","80","100","120"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 35.2 ET","explanation":"El número de horas extraordinarias no podrá ser superior a 80 al año, salvo las compensadas por descanso y las de fuerza mayor."},
  {"id":107,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"La movilidad funcional entre grupos profesionales distintos exige:","options":["Solo comunicación verbal","Titulación académica o profesional exigida o acreditación de aptitud","La firma de un nuevo contrato","La autorización de la Inspección"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 39.2 ET","explanation":"La movilidad funcional para la realización de funciones no correspondientes al grupo profesional exige titulación académica o profesional o acreditación de las aptitudes necesarias."},
  {"id":108,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"La modificación sustancial de condiciones de trabajo de carácter individual exige:","options":["Acuerdo previo siempre","Comunicación por escrito al trabajador con un preaviso mínimo de 15 días","Solo comunicación verbal","Autorización judicial"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 41.3 ET","explanation":"La modificación sustancial individual debe ser notificada por escrito al trabajador con una antelación mínima de 15 días a la fecha de su efectividad."},
  {"id":109,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"¿Cuáles son causas de despido colectivo (art. 51 ET)?","options":["Solo económicas","Económicas, técnicas, organizativas o de producción","Disciplinarias","Solo técnicas"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 51 ET","explanation":"El despido colectivo debe estar fundado en causas económicas, técnicas, organizativas o de producción, con un periodo de consultas y comunicación a la autoridad laboral."},
  {"id":110,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"En la suspensión del contrato por causas económicas (art. 45.1.h ET), el trabajador:","options":["Pierde todos los derechos","Conserva el puesto y deja de percibir salario temporalmente, con posibilidad de prestaciones","Es despedido","Debe renunciar"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 45.1.h) ET","explanation":"La suspensión por causas económicas, técnicas, organizativas o de producción implica la exención de trabajar y remunerar de forma temporal, conservando el trabajador su empleo y con acceso a prestaciones."},
  {"id":111,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"El Fondo de Garantía Salarial (FOGASA) responde en caso de insolvencia por:","options":["Las vacaciones y pluses","Salarios e indemnizaciones en los límites legales","Las cotizaciones","Las pensiones"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 33 ET","explanation":"El FOGASA abona los salarios pendientes de pago e indemnizaciones reconocidas por despido o extinción, en los importes y límites legales, ante insolvencia del empresario."},
  {"id":112,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"El trabajo nocturno es el realizado entre:","options":["Las 20:00 y las 6:00","Las 22:00 y las 6:00","Las 23:00 y las 7:00","Las 21:00 y las 5:00"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 36.1 ET","explanation":"Se considera trabajo nocturno el realizado entre las 22:00 horas y las 6:00 horas."},
  {"id":113,"block":"especifico","mission":3,"topic":"Estatuto de los Trabajadores","question":"La distribución irregular de la jornada no puede superar el ___ de la jornada ordinaria:","options":["5%","10%","15%","20%"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 34.2 ET","explanation":"Mediante convenio colectivo o acuerdo con los representantes se puede establecer la distribución irregular de la jornada a lo largo del año, sin que pueda exceder del 10% de la jornada ordinaria."},
  {"id":114,"block":"especifico","mission":3,"topic":"Ley 3/2023 de Empleo","question":"¿Cuál es la función principal del Servicio Público de Empleo Estatal (SEPE)?","options":["Gestionar pensiones","La intermediación laboral y la gestión de las prestaciones por desempleo","La formación universitaria","La inspección laboral"],"correct":1,"law":"Ley 3/2023 de Empleo","article":"Organización del SEPE","explanation":"El SEPE gestiona las prestaciones por desempleo, la intermediación laboral y las políticas activas de empleo de ámbito estatal."},
  {"id":115,"block":"especifico","mission":3,"topic":"Ley 3/2022 de Formación Profesional","question":"¿Qué título se obtiene al superar un ciclo formativo de grado medio?","options":["Técnico Básico","Técnico","Técnico Superior","Graduado"],"correct":1,"law":"Ley 3/2022 de FP","article":"Grados de FP","explanation":"Al superar un ciclo formativo de grado medio se obtiene el título de Técnico; el de grado superior otorga el de Técnico Superior."},
  {"id":116,"block":"especifico","mission":3,"topic":"Ley 3/2022 de Formación Profesional","question":"El acceso a los ciclos formativos de grado superior requiere:","options":["La ESO","El Bachillerato o una prueba de acceso","No requiere titulación","Solo la mayoría de edad"],"correct":1,"law":"Ley 3/2022 de FP","article":"Acceso a ciclos de grado superior","explanation":"Para acceder a un ciclo de grado superior se requiere el título de Bachillerato o superar una prueba de acceso (con los requisitos de edad establecidos)."},
  {"id":117,"block":"especifico","mission":4,"topic":"IV CUAGE","question":"¿Qué elementos componen la clasificación profesional del IV CUAGE?","options":["Solo grupos profesionales","Grupos profesionales y áreas funcionales con especialidades","Solo categorías laborales","Ninguna, solo titulaciones"],"correct":1,"law":"IV CUAGE","article":"Clasificación Profesional","explanation":"El IV CUAGE estructura la clasificación en grupos profesionales y áreas funcionales (Administración, Técnica, Servicios Generales y otras), con especialidades."},
  {"id":118,"block":"especifico","mission":4,"topic":"IV CUAGE","question":"¿Cuántos días de permiso por asuntos particulares reconoce el IV CUAGE al personal laboral?","options":["3 días","6 días hábiles","10 días","2 días"],"correct":1,"law":"IV CUAGE","article":"Permisos y licencias","explanation":"El personal laboral del IV CUAGE tiene derecho a 6 días hábiles de permiso por asuntos particulares al año, en línea con lo previsto para los funcionarios."},
  {"id":119,"block":"especifico","mission":4,"topic":"IV CUAGE","question":"Las ausencias injustificadas al trabajo de más de 3 días consecutivos constituyen en el IV CUAGE:","options":["Falta leve","Falta grave","Falta muy grave","No es falta"],"correct":2,"law":"IV CUAGE","article":"Régimen disciplinario","explanation":"El IV CUAGE tipifica como falta muy grave la ausencia injustificada al trabajo de más de tres días consecutivos o cinco alternos en un periodo."},
  {"id":120,"block":"especifico","mission":4,"topic":"IV CUAGE","question":"La promoción interna en el IV CUAGE se realiza mediante:","options":["Concurso de méritos puro","Concurso-oposición con valoración de méritos y pruebas","Designación directa","Antigüedad automática"],"correct":1,"law":"IV CUAGE","article":"Promoción interna","explanation":"La promoción interna del personal laboral se realiza mediante procesos de concurso-oposición, valorando los méritos y superando las pruebas correspondientes."},
  {"id":121,"block":"especifico","mission":5,"topic":"Ley 31/1995 PRL","question":"¿Quién es el Delegado de Prevención en la Administración?","options":["Designado por la Inspección","Un representante del personal especializado en prevención","El jefe de personal","Un técnico externo"],"correct":1,"law":"Ley 31/1995 PRL","article":"Artículo 35 LPRL","explanation":"El Delegado de Prevención es el representante de los trabajadores con funciones específicas en materia de prevención, designado por y entre los representantes del personal."},
  {"id":122,"block":"especifico","mission":5,"topic":"Ley 31/1995 PRL","question":"En un centro de trabajo con 50 o más trabajadores debe constituirse:","options":["El Comité de Empresa","El Comité de Seguridad y Salud","La Comisión Paritaria","La Asamblea de Trabajadores"],"correct":1,"law":"Ley 31/1995 PRL","article":"Artículo 38 LPRL","explanation":"El Comité de Seguridad y Salud es un órgano paritario y colegiado que se constituye en centros con 50 o más trabajadores, integrado por delegados de prevención y el empresario."},
  {"id":123,"block":"especifico","mission":5,"topic":"Ley 31/1995 PRL","question":"¿Qué derecho tiene el trabajador ante un riesgo grave e inminente?","options":["Solo avisar al sindicato","Interrumpir su actividad y abandonar el lugar de trabajo sin sanción salvo mala fe o negligencia","Continuar trabajando","Solicitar el traslado"],"correct":1,"law":"Ley 31/1995 PRL","article":"Artículo 21 LPRL","explanation":"El trabajador puede interrumpir su actividad y abandonar el lugar de trabajo cuando considere que existe un riesgo grave e inminente, sin que pueda ser sancionado salvo mala fe o negligencia."},
  {"id":124,"block":"especifico","mission":5,"topic":"RD-Ley 17/1977 Huelga","question":"En los servicios esenciales para la comunidad, la autoridad gubernativa debe fijar:","options":["Sanciones a los huelguistas","Servicios mínimos para garantizar el contenido esencial del derecho","La prohibición de la huelga","La mediación obligatoria"],"correct":1,"law":"RD-Ley 17/1977","article":"Artículo 10 RD-Ley 17/1977","explanation":"Cuando la huelga afecte a servicios esenciales de la comunidad, la autoridad gubernativa acordará las medidas necesarias para asegurar el mantenimiento de dichos servicios mediante servicios mínimos."},
  {"id":125,"block":"especifico","mission":5,"topic":"Estatuto de los Trabajadores","question":"La ultraactividad del convenio colectivo tras su denuncia sin acuerdo se mantiene como máximo:","options":["Sin límite","1 año","6 meses","2 años"],"correct":1,"law":"Estatuto de los Trabajadores","article":"Artículo 86.3 ET","explanation":"Transcurrido un año desde la denuncia del convenio sin que se haya acordado un nuevo convenio o laudo, aquél pierde vigencia salvo pacto en contrario."},
  {"id":126,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"¿Cuál es el plazo de prescripción del derecho a la prestación por desempleo?","options":["1 año","6 meses","3 años","No prescribe"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 266.2 LGSS","explanation":"El derecho a la prestación por desempleo prescribe a los 6 meses desde la situación legal de desempleo."},
  {"id":127,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"La prestación por desempleo contributiva durante los primeros 180 días es del:","options":["60% de la base reguladora","70% de la base reguladora","80% de la base reguladora","50% de la base reguladora"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 270 LGSS","explanation":"Durante los primeros 180 días de percepción, la cuantía es del 70% de la base reguladora; a partir del día 181, del 60%."},
  {"id":128,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"¿Qué porcentaje de cotización por contingencias comunes corresponde al trabajador?","options":["23,6%","4,7%","28,3%","1%"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Tarifas de cotización","explanation":"El tipo de contingencias comunes es del 28,3%, del cual el 23,6% corresponde al empresario y el 4,7% al trabajador."},
  {"id":129,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"En la incapacidad permanente, la gran invalidez es:","options":["La pérdida total de la capacidad para trabajar","La situación en la que el trabajador necesita la asistencia de otra persona para los actos esenciales de la vida","Una pensión temporal","No existe"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 197 LGSS","explanation":"La gran invalidez es la situación del trabajador afecto de incapacidad permanente que, además, necesita la asistencia de otra persona para los actos esenciales de la vida (se incrementa la pensión)."},
  {"id":130,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"¿Qué porcentaje de la base reguladora corresponde a la pensión de viudedad en el Régimen General?","options":["40%","52% (ampliable al 70% con cargas)","60%","75%"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 225 LGSS","explanation":"La pensión de viudedad es del 52% de la base reguladora, ampliándose al 70% cuando concurran cargas familiares y el pensionista tenga 65 años y no perciba otras rentas."},
  {"id":131,"block":"especifico","mission":6,"topic":"Ley 35/2006 IRPF","question":"La retención a cuenta del IRPF sobre los rendimientos del trabajo se calcula aplicando:","options":["Un tipo fijo del 15%","Un porcentaje según tablas que considera las circunstancias personales y familiares","Solo el salario base","El tipo de la empresa"],"correct":1,"law":"Ley 35/2006 IRPF","article":"Artículos 85 y ss.","explanation":"El porcentaje de retención se determina según las tablas de retención del IRPF, considerando la cuantía de las retribuciones y las circunstancias personales y familiares del contribuyente."},
  {"id":132,"block":"especifico","mission":6,"topic":"MUFACE / Clases Pasivas","question":"MUFACE es la entidad que gestiona la asistencia sanitaria de:","options":["Los militares","Los funcionarios civiles del Estado","Los trabajadores autónomos","Los pensionistas del Régimen General"],"correct":1,"law":"Régimen Mutualismo Administrativo","article":"Ámbito MUFACE","explanation":"MUFACE (Mutualidad General de Funcionarios Civiles del Estado) gestiona la asistencia sanitaria y prestaciones sociales de los funcionarios civiles del Estado."},
  {"id":133,"block":"especifico","mission":6,"topic":"Clases Pasivas (RDL 670/1987)","question":"¿Cuántos años de servicios se requieren en Clases Pasivas para percibir el 100% del haber regulador?","options":["30 años","35 años","40 años","25 años"],"correct":1,"law":"RDL 670/1987","article":"Artículo 31 RDL 670/1987","explanation":"Con 35 o más años de servicios reconocidos se percibe el 100% del haber regulador en la pensión de jubilación de Clases Pasivas."},
  {"id":134,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"Las pensiones no contributivas se financian mediante:","options":["Cotizaciones de trabajadores","Aportaciones del Estado (impuestos)","Cuotas de autónomos","Primas de seguros privados"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 8 LGSS","explanation":"Las prestaciones no contributivas se financian con cargo a las aportaciones del Estado, financiadas con impuestos, a diferencia de las contributivas financiadas con cotizaciones."},
  {"id":135,"block":"especifico","mission":6,"topic":"LGSS (RDL 8/2015)","question":"En el accidente de trabajo, ¿qué presunción establece la LGSS?","options":["Que no es accidente laboral","La presunción de que el accidente ocurrido en lugar y tiempo de trabajo es laboral (iuris tantum)","Que siempre es enfermedad común","Que se requiere prueba en todos los casos"],"correct":1,"law":"LGSS (RDL 8/2015)","article":"Artículo 156.3 LGSS","explanation":"Se presume, salvo prueba en contrario, que son constitutivas de accidente de trabajo las lesiones que sufra el trabajador durante el tiempo y en el lugar del trabajo (presunción iuris tantum)."},

  // ==========================================
  // BANCO AMPLIADO 100 PREGUNTAS OFICIALES E1 (ID 61 A 160)
  // ==========================================
  {
    id: 61,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿En qué artículo de la Constitución Española se proclama la igualdad de todos los españoles ante la ley sin discriminación?",
    options: [
      "Artículo 9.2",
      "Artículo 14",
      "Artículo 10",
      "Artículo 16"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Artículo 14 CE",
    explanation: "El artículo 14 CE establece que los españoles son iguales ante la ley, sin que pueda prevalecer discriminación alguna por razón de nacimiento, raza, sexo, religión, opinión o cualquier otra condición o circunstancia personal o social."
  },
  {
    id: 62,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "El plazo máximo de la detención preventiva sin puesta a disposición judicial según el artículo 17.2 de la CE es de:",
    options: [
      "24 horas",
      "48 horas",
      "72 horas",
      "96 horas"
    ],
    correct: 2,
    law: "Constitución Española de 1978",
    article: "Artículo 17.2 CE",
    explanation: "La detención preventiva no podrá durar más del tiempo estrictamente necesario para la realización de las averiguaciones tendentes al esclarecimiento de los hechos, y, en todo caso, en el plazo máximo de 72 horas, el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial."
  },
  {
    id: 63,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿Cuál es la forma política del Estado español según el artículo 1.3 de la Constitución?",
    options: [
      "República parlamentaria",
      "Monarquía parlamentaria",
      "Estado autonómico",
      "Democracia representativa"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Artículo 1.3 CE",
    explanation: "El artículo 1.3 de la CE establece tajantemente: 'La forma política del Estado español es la Monarquía parlamentaria'."
  },
  {
    id: 64,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "Según el artículo 68.1 de la CE, ¿cuál es el número mínimo y máximo de Diputados que pueden componer el Congreso?",
    options: [
      "Entre 250 y 350",
      "Entre 300 y 400",
      "Entre 350 y 450",
      "Fijo en 350"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Artículo 68.1 CE",
    explanation: "El Congreso se compone de un mínimo de 300 y un máximo de 400 Diputados, elegidos por sufragio universal, libre, igual, directo y secreto (actualmente fijado en 350 por la LOREG)."
  },
  {
    id: 65,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿A quién corresponde sancionar y promulgar las leyes según la Constitución Española?",
    options: [
      "Al Presidente del Gobierno",
      "Al Presidente del Congreso",
      "Al Rey",
      "Al Tribunal Constitucional"
    ],
    correct: 2,
    law: "Constitución Española de 1978",
    article: "Artículo 62.a y 91 CE",
    explanation: "Corresponde al Rey sancionar y promulgar las leyes en el plazo de quince días, y ordenar su inmediata publicación."
  },
  {
    id: 66,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿Qué mayoría se exige para la aprobación, modificación o derogación de las Leyes Orgánicas en el Congreso?",
    options: [
      "Mayoría simple de los presentes",
      "Mayoría absoluta en una votación final sobre el conjunto del proyecto",
      "Mayoría de dos tercios",
      "Mayoría de tres quintos"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Artículo 81.2 CE",
    explanation: "La aprobación, modificación o derogación de las leyes orgánicas exigirá mayoría absoluta del Congreso, en una votación final sobre el conjunto del proyecto."
  },
  {
    id: 67,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿Quién nombra a los miembros del Tribunal Constitucional según el artículo 159 de la CE?",
    options: [
      "El Presidente del Gobierno",
      "Las Cortes Generales en sesión conjunta",
      "El Rey, a propuesta de los órganos constitucionales",
      "El Consejo General del Poder Judicial"
    ],
    correct: 2,
    law: "Constitución Española de 1978",
    article: "Artículo 159.1 CE",
    explanation: "Los miembros del Tribunal Constitucional son nombrados formalmente por el Rey: 4 a propuesta del Congreso, 4 a propuesta del Senado, 2 a propuesta del Gobierno y 2 a propuesta del CGPJ."
  },
  {
    id: 68,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "El Defensor del Pueblo es designado por:",
    options: [
      "El Gobierno para defender la Administración",
      "Las Cortes Generales como alto comisionado para defender los derechos del Título I",
      "El Consejo de Ministros",
      "El Rey a propuesta del Fiscal General"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Artículo 54 CE",
    explanation: "Una ley orgánica regulará la institución del Defensor del Pueblo, como alto comisionado de las Cortes Generales, designado por éstas para la defensa de los derechos comprendidos en el Título I."
  },
  {
    id: 69,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿Cuál es el plazo de convalidación o derogación de un Real Decreto-Ley por el Congreso de los Diputados?",
    options: [
      "15 días siguientes a su promulgación",
      "30 días siguientes a su promulgación",
      "60 días hábiles",
      "3 meses naturales"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Artículo 86.2 CE",
    explanation: "Los Decretos-leyes deberán ser sometidos de forma inmediata a debate y votación de totalidad al Congreso de los Diputados dentro del plazo de los 30 días siguientes a su promulgación."
  },
  {
    id: 70,
    block: "comun",
    mission: 1,
    topic: "Constitución Española de 1978",
    question: "¿En qué año y fecha exacta fue ratificada en referéndum la Constitución Española?",
    options: [
      "31 de octubre de 1978",
      "6 de diciembre de 1978",
      "27 de diciembre de 1978",
      "29 de diciembre de 1978"
    ],
    correct: 1,
    law: "Constitución Española de 1978",
    article: "Historia Constitucional CE 1978",
    explanation: "La Constitución fue aprobada por las Cortes el 31 de octubre de 1978, ratificada por el pueblo español en referéndum el 6 de diciembre de 1978, sancionada por el Rey el 27 de diciembre y publicada en el BOE el 29 de diciembre de 1978."
  },
  {
    id: 71,
    block: "comun",
    mission: 2,
    topic: "Ley 50/1997 del Gobierno",
    question: "¿Quién propone el nombramiento y separación de los Ministros?",
    options: [
      "El Congreso de los Diputados",
      "El Presidente del Gobierno",
      "El Rey por iniciativa propia",
      "El Consejo de Ministros"
    ],
    correct: 1,
    law: "Ley 50/1997 del Gobierno",
    article: "Artículo 12.2 Ley 50/1997",
    explanation: "Los Ministros son nombrados y separados por el Rey, a propuesta exclusiva del Presidente del Gobierno."
  },
  {
    id: 72,
    block: "comun",
    mission: 2,
    topic: "Ley 40/2015 del Régimen Jurídico del Sector Público",
    question: "En la estructura ministerial de la AGE, ¿cuál de los siguientes es un Órgano Directivo y NO un Órgano Superior?",
    options: [
      "El Ministro",
      "El Secretario de Estado",
      "El Subsecretario",
      "El Presidente del Gobierno"
    ],
    correct: 2,
    law: "Ley 40/2015",
    article: "Artículo 55.2 Ley 40/2015",
    explanation: "Son órganos superiores los Ministros y los Secretarios de Estado. Son órganos directivos los Subsecretarios y Secretarios Generales, y los Directores Generales y Subdirectores Generales."
  },
  {
    id: 73,
    block: "comun",
    mission: 2,
    topic: "Ley 40/2015 del Régimen Jurídico del Sector Público",
    question: "¿Quién ostenta la representación ordinaria del Gobierno de España en el territorio de una Comunidad Autónoma?",
    options: [
      "El Presidente de la Comunidad Autónoma",
      "El Delegado del Gobierno",
      "El Subdelegado del Gobierno",
      "El Ministro de Política Territorial"
    ],
    correct: 1,
    law: "Ley 40/2015",
    article: "Artículo 72 Ley 40/2015",
    explanation: "Los Delegados del Gobierno representan al Gobierno de la Nación en el territorio de la respectiva Comunidad Autónoma, sin perjuicio de la representación ordinaria del Estado que ostenta el Presidente autonómico."
  },
  {
    id: 74,
    block: "comun",
    mission: 2,
    topic: "Ley 40/2015 del Régimen Jurídico del Sector Público",
    question: "¿Qué rango jerárquico tienen los Delegados del Gobierno en las Comunidades Autónomas?",
    options: [
      "Rango de Ministro",
      "Rango de Secretario de Estado",
      "Rango de Subsecretario",
      "Rango de Director General"
    ],
    correct: 2,
    law: "Ley 40/2015",
    article: "Artículo 72.2 Ley 40/2015",
    explanation: "Los Delegados del Gobierno tendrán rango de Subsecretario y serán nombrados y separados por Real Decreto del Consejo de Ministros, a propuesta del Presidente del Gobierno."
  },
  {
    id: 75,
    block: "comun",
    mission: 2,
    topic: "Ley 40/2015 del Régimen Jurídico del Sector Público",
    question: "¿Cuál es la titulación o requisito exigido para ser nombrado Subsecretario o Director General en un Ministerio?",
    options: [
      "Ser funcionario de carrera del Subgrupo A1",
      "Cualquier ciudadano con título universitario",
      "Ser personal eventual con más de 5 años de experiencia",
      "Haber sido diputado o senador"
    ],
    correct: 0,
    law: "Ley 40/2015",
    article: "Artículo 63.2 y 66.2 Ley 40/2015",
    explanation: "Los Subsecretarios y Directores Generales habrán de nombrarse entre funcionarios de carrera del Estado, de las CCAA o de las EELL, pertenecientes al Subgrupo A1, salvo excepciones motivadas en el caso de Directores Generales."
  },
  {
    id: 76,
    block: "comun",
    mission: 2,
    topic: "Ley 50/1997 del Gobierno",
    question: "Las reuniones del Consejo de Ministros tienen carácter:",
    options: [
      "Público y retransmitido en directo",
      "Secreto",
      "Reservado solo a los medios acreditados",
      "Público previo acuerdo del Presidente"
    ],
    correct: 1,
    law: "Ley 50/1997 del Gobierno",
    article: "Artículo 5.3 Ley 50/1997",
    explanation: "Las deliberaciones del Consejo de Ministros serán secretas. Los miembros del Consejo de Ministros están obligados a guardar secreto sobre las opiniones y votos emitidos."
  },
  {
    id: 77,
    block: "comun",
    mission: 2,
    topic: "Ley 50/1997 del Gobierno",
    question: "¿Quién actúa como Secretario del Consejo de Ministros?",
    options: [
      "El Ministro de Defensa",
      "El Ministro de la Presidencia",
      "El Subsecretario de la Presidencia",
      "El Vicepresidente Primero"
    ],
    correct: 1,
    law: "Ley 50/1997 del Gobierno",
    article: "Artículo 5.2 Ley 50/1997",
    explanation: "Actuará como Secretario del Consejo de Ministros el Ministro de la Presidencia (o en su defecto el Ministro que determine el Presidente)."
  },
  {
    id: 78,
    block: "comun",
    mission: 2,
    topic: "Ley 40/2015 del Régimen Jurídico del Sector Público",
    question: "¿Cuál de las siguientes figuras existe en las provincias donde NO radica la sede de la Delegación del Gobierno?",
    options: [
      "Un Delegado Provincial",
      "Un Subdelegado del Gobierno",
      "Un Comisionado del Estado",
      "Un Director Territorial"
    ],
    correct: 1,
    law: "Ley 40/2015",
    article: "Artículo 74 Ley 40/2015",
    explanation: "En cada provincia y bajo la inmediata dependencia del Delegado del Gobierno, existirá un Subdelegado del Gobierno, con nivel de Subdirector General."
  },
  {
    id: 79,
    block: "comun",
    mission: 2,
    topic: "Ley 50/1997 del Gobierno",
    question: "¿Qué instrumento normativo dictan los Ministros en el ejercicio de sus competencias propias?",
    options: [
      "Reales Decretos Legislativos",
      "Reales Decretos del Consejo",
      "Órdenes Ministeriales",
      "Directivas de Estado"
    ],
    correct: 2,
    law: "Ley 50/1997 del Gobierno",
    article: "Artículo 4.1.f) y 24.1.f) Ley 50/1997",
    explanation: "Los Ministros ejercen la potestad reglamentaria en las materias propias de su Departamento mediante Órdenes Ministeriales."
  },
  {
    id: 80,
    block: "comun",
    mission: 2,
    topic: "Ley 40/2015 del Régimen Jurídico del Sector Público",
    question: "La delegación de competencias entre órganos de una misma Administración Pública:",
    options: [
      "Supone la transferencia de la titularidad de la competencia",
      "No supone la cesión de la titularidad de la competencia, sino solo de su ejercicio",
      "Requiere siempre autorización judicial",
      "Solo cabe entre órganos de distinto ministerio"
    ],
    correct: 1,
    law: "Ley 40/2015",
    article: "Artículo 9.1 Ley 40/2015",
    explanation: "La delegación de competencias no supone la cesión de la titularidad de la competencia ni de los elementos determinantes de su ejercicio, sino únicamente de su ejercicio material."
  },
  {
    id: 81,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "Son funcionarios interinos los que, por razones expresamente justificadas de necesidad y urgencia, son nombrados como tales con carácter temporal para:",
    options: [
      "Puestos de confianza política exclusiva",
      "La existencia de plazas vacantes cuando no sea posible su cobertura por funcionarios de carrera (máximo 3 años)",
      "Sustituir únicamente personal de baja por maternidad",
      "Realizar tareas no administrativas"
    ],
    correct: 1,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 10.1.a) TREBEP",
    explanation: "El art. 10 TREBEP limita el nombramiento de interinos en vacante a un máximo de 3 años, tras los cuales la plaza debe ser cubierta por funcionario de carrera o amortizada."
  },
  {
    id: 82,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿Cuál de las siguientes es una falta disciplinaria MUY GRAVE según el artículo 95 del TREBEP?",
    options: [
      "La falta de asistencia injustificada de un día",
      "El retraso reiterado en el horario de trabajo",
      "El abandono del servicio y la vulneración del deber de fidelidad a la Constitución",
      "La incorrección con el público"
    ],
    correct: 2,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 95.2.b) TREBEP",
    explanation: "El abandono del servicio, así como no hacerse cargo voluntariamente de las tareas o funciones que tienen encomendadas, es una falta MUY GRAVE tipificada legalmente."
  },
  {
    id: 83,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "Las faltas disciplinarias muy graves prescriben a los:",
    options: [
      "6 meses",
      "1 año",
      "2 años",
      "3 años"
    ],
    correct: 3,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 97.1 TREBEP",
    explanation: "Las infracciones muy graves prescribirán a los 3 años, las graves a los 2 años y las leves a los 6 meses."
  },
  {
    id: 84,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿Cuál de las siguientes sanciones NO puede imponerse por la comisión de faltas disciplinarias según el TREBEP?",
    options: [
      "Separación del servicio",
      "Suspensión firme de funciones",
      "Sanción económica de reducción de sueldo o multa de haber",
      "Traslado forzoso"
    ],
    correct: 2,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 96.3 TREBEP",
    explanation: "En ningún caso podrá imponerse la sanción de reducción de sueldo ni la sanción de multa de haber en el régimen disciplinario de los funcionarios públicos."
  },
  {
    id: 85,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿A cuántos días de vacaciones anuales retribuidas tiene derecho un empleado público como mínimo?",
    options: [
      "20 días hábiles",
      "22 días hábiles o un mes natural",
      "30 días hábiles",
      "15 días laborables"
    ],
    correct: 1,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 50 TREBEP",
    explanation: "Los empleados públicos tendrán derecho a disfrutar, como mínimo, durante cada año natural, de unas vacaciones retribuidas de 22 días hábiles, o de los días que correspondan proporcionalmente si el tiempo de servicio durante el año fue menor."
  },
  {
    id: 86,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "El permiso por matrimonio o pareja de hecho regulado en el TREBEP tiene una duración de:",
    options: [
      "10 días hábiles",
      "15 días naturales",
      "20 días naturales",
      "1 mes"
    ],
    correct: 1,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 48.l) TREBEP",
    explanation: "Por matrimonio o registro o constitución formalizada por documento público de pareja de hecho: 15 días naturales."
  },
  {
    id: 87,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿Qué titulación exige el Subgrupo C2 para el ingreso en la función pública?",
    options: [
      "Título de Bachiller",
      "Título de Graduado en Educación Secundaria Obligatoria (ESO)",
      "Título de Técnico Superior",
      "Certificado de escolaridad sin titulación"
    ],
    correct: 1,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 76 TREBEP",
    explanation: "Para el acceso a los cuerpos o escalas del Subgrupo C2 se exigirá estar en posesión del título de Graduado en Educación Secundaria Obligatoria (mismo nivel formativo básico que el Grupo E1 laboral)."
  },
  {
    id: 88,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿En cuál de las siguientes situaciones administrativas el funcionario NO percibe retribuciones básicas ni complementarias?",
    options: [
      "Servicio activo",
      "Servicios especiales",
      "Excedencia voluntaria por interés particular",
      "Suspensión provisional de funciones"
    ],
    correct: 2,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 89.2 TREBEP",
    explanation: "La excedencia voluntaria por interés particular no devenga retribuciones de ningún tipo ni computa tiempo a efectos de ascensos, trienios ni derechos pasivos."
  },
  {
    id: 89,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "¿A los cuántos años de servicio continuado se adquiere el derecho al primer trienio?",
    options: [
      "Al primer año",
      "A los 2 años",
      "A los 3 años",
      "A los 5 años"
    ],
    correct: 2,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 23 TREBEP",
    explanation: "Los trienios consisten en una cantidad igual para cada Subgrupo o Grupo de clasificación por cada tres años de servicio."
  },
  {
    id: 90,
    block: "comun",
    mission: 3,
    topic: "TREBEP (RDL 5/2015)",
    question: "La pérdida de la condición de funcionario de carrera se produce por:",
    options: [
      "Una sanción de suspensión firme de 6 meses",
      "Renuncia a la condición de funcionario aceptada por la Administración",
      "Baja por incapacidad temporal de más de 30 días",
      "Cumplimiento de 50 años de edad"
    ],
    correct: 1,
    law: "TREBEP (RDL 5/2015)",
    article: "Artículo 63 TREBEP",
    explanation: "Son causas de pérdida de la condición de funcionario: renuncia, pérdida de la nacionalidad, jubilación total, sanción disciplinaria de separación del servicio e inhabilitación absoluta o especial."
  },
  {
    id: 91,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "Según la LO 3/2007, se entiende por composición equilibrada aquella presencia de mujeres y hombres en la que las personas de cada sexo:",
    options: [
      "Sean exactamente el 50% de cada género",
      "No superen el 60% ni sean menos del 40%",
      "Las mujeres representen al menos el 70%",
      "No superen el 55%"
    ],
    correct: 1,
    law: "Ley Orgánica 3/2007",
    article: "Disposición Adicional Primera LO 3/2007",
    explanation: "Se entiende por composición o presencia equilibrada la presencia de mujeres y hombres de forma que ningún sexo supere el 60% ni sea inferior al 40%."
  },
  {
    id: 92,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "¿Qué constituye el acoso sexual según el artículo 7 de la LO 3/2007?",
    options: [
      "Cualquier crítica laboral injustificada",
      "Cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o efecto de atentar contra la dignidad de la persona",
      "Cualquier discrepancia horaria",
      "Un despido disciplinario improcedente"
    ],
    correct: 1,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 7.1 LO 3/2007",
    explanation: "Constituye acoso sexual cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, en particular cuando se crea un entorno intimidatorio, degradante u ofensivo."
  },
  {
    id: 93,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 1/2004 contra la Violencia de Género",
    question: "La funcionaria o empleada pública víctima de violencia de género tiene derecho a:",
    options: [
      "La reducción de jornada, reordenación del tiempo de trabajo y traslado a otra localidad sin necesidad de vacante",
      "Una subida automática de dos grupos salariales",
      "La excedencia forzosa con el 100% de sueldo indefinido",
      "La jubilación anticipada a los 30 años"
    ],
    correct: 0,
    law: "Ley Orgánica 1/2004",
    article: "Artículo 24 LO 1/2004 y Art. 82 TREBEP",
    explanation: "Las empleadas públicas víctimas de violencia sobre la mujer tienen derecho a la reducción o a la reordenación de su tiempo de trabajo, a la movilidad geográfica (traslado de localidad) y a la excedencia por violencia sobre la mujer."
  },
  {
    id: 94,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "En el orden social de la jurisdicción, cuando la parte actora alegue indicios fundamentados de discriminación por razón de sexo, corresponde probar la ausencia de discriminación:",
    options: [
      "A la parte demandada (inversión de la carga de la prueba)",
      "A la parte actora siempre sin excepción",
      "Al Ministerio Fiscal exclusivamente",
      "Al perito judicial"
    ],
    correct: 0,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 13 LO 3/2007",
    explanation: "En los procedimientos en que las alegaciones de la parte actora se fundamenten en actuaciones discriminatorias, corresponderá a la persona demandada probar que sus medidas fueron objetivas y no discriminatorias (inversión de la carga de la prueba)."
  },
  {
    id: 95,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "¿A partir de qué número de trabajadores es obligatorio que una empresa o entidad elabore y aplique un Plan de Igualdad?",
    options: [
      "A partir de 25 trabajadores",
      "A partir de 50 trabajadores",
      "A partir de 100 trabajadores",
      "A partir de 250 trabajadores"
    ],
    correct: 1,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 45.2 LO 3/2007",
    explanation: "Las empresas de 50 o más trabajadores están obligadas legalmente a elaborar y aplicar un Plan de Igualdad."
  },
  {
    id: 96,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 1/2004 contra la Violencia de Género",
    question: "El Juzgado especializado creado por la LO 1/2004 para instruir y juzgar delitos relacionados con la violencia de género se denomina:",
    options: [
      "Juzgado de lo Social",
      "Juzgado de Violencia sobre la Mujer",
      "Juzgado de Menores",
      "Juzgado Central de Instrucción"
    ],
    correct: 1,
    law: "Ley Orgánica 1/2004",
    article: "Artículo 43 LO 1/2004",
    explanation: "La Ley Orgánica 1/2004 creó los Juzgados de Violencia sobre la Mujer dentro del orden jurisdiccional penal."
  },
  {
    id: 97,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "El principio de transversalidad de la igualdad de género (mainstreaming) significa que:",
    options: [
      "Solo afecta al Ministerio de Igualdad",
      "Los poderes públicos integrarán activamente la dimensión de igualdad en todas sus políticas y actuaciones",
      "Solo se aplica en los procesos electorales",
      "Es una recomendación no vinculante"
    ],
    correct: 1,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 15 LO 3/2007",
    explanation: "El principio de transversalidad obliga a todos los poderes públicos a integrar el principio de igualdad en la definición y presupuestación de todas sus políticas de forma transversal."
  },
  {
    id: 98,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "Cualquier represalia, trato adverso o efecto negativo producido sobre una persona como consecuencia de haber presentado una queja o reclamación por discriminación constituye:",
    options: [
      "Una indemnización obligatoria",
      "Una falta leve laboral",
      "Una conducta discriminatoria prohibida por la ley (indemnidad)",
      "Un acto no revisable"
    ],
    correct: 2,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 9 LO 3/2007",
    explanation: "También se considerará discriminación por razón de sexo cualquier trato adverso o efecto negativo que se produzca en una persona como consecuencia de la presentación por su parte de una queja, reclamación o demanda (garantía de indemnidad)."
  },
  {
    id: 99,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "¿Qué es la discriminación indirecta por razón de sexo?",
    options: [
      "Un insulto explícito hacia una mujer",
      "Una disposición, criterio o práctica aparentemente neutra que sitúa a personas de un sexo en desventaja particular con respecto a las de otro",
      "Cualquier delito penal",
      "Un despido justificado objetivamente"
    ],
    correct: 1,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 6.2 LO 3/2007",
    explanation: "Se considera discriminación indirecta aquella situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular con respecto a personas del otro, salvo justificación objetiva y legítima."
  },
  {
    id: 100,
    block: "comun",
    mission: 4,
    topic: "Ley Orgánica 3/2007 de Igualdad",
    question: "En la Administración General del Estado, ¿cada cuánto tiempo se aprueba y evalúa el Plan de Igualdad entre mujeres y hombres?",
    options: [
      "Anualmente",
      "Cada legislatura",
      "Al inicio de cada año fiscal",
      "En los términos que fije el propio plan, con seguimiento periódico continuo"
    ],
    correct: 3,
    law: "Ley Orgánica 3/2007",
    article: "Artículo 51 LO 3/2007 y Art. 64 TREBEP",
    explanation: "El Gobierno aprobará, al inicio de cada legislatura, un Plan para la Igualdad entre mujeres y hombres en la AGE, estableciendo sus mecanismos de seguimiento y evaluación periódica."
  },
  {
    id: 101,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "El IV Convenio Colectivo Único para el personal laboral de la AGE (IV CUAGE) resulta de aplicación a:",
    options: [
      "Todos los funcionarios y militares de Defensa",
      "El personal laboral que presta servicios en la Administración General del Estado y sus organismos públicos",
      "Exclusivamente a los contratados de alta dirección",
      "A las empresas privadas subcontratadas"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Artículo 1 IV CUAGE",
    explanation: "El IV CUAGE regula las relaciones laborales del personal laboral de la Administración General del Estado y sus organismos públicos dependientes."
  },
  {
    id: 102,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "¿Cuál es la titulación requerida para el acceso al Grupo Profesional E1 según el sistema de clasificación del IV CUAGE?",
    options: [
      "Título de Bachiller o FP de Grado Medio",
      "Título de Graduado en Educación Secundaria Obligatoria (ESO) o equivalente",
      "Título de Técnico Superior de FP",
      "Grado Universitario"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Artículo 16 IV CUAGE",
    explanation: "El Grupo Profesional E1 integra puestos y funciones operativas que requieren la titulación básica de Graduado en Educación Secundaria Obligatoria (ESO) o formación laboral equivalente."
  },
  {
    id: 103,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "El Grupo Profesional M1 del IV CUAGE requiere estar en posesión de:",
    options: [
      "Título de Graduado en ESO",
      "Título de Técnico Superior de Formación Profesional (Grado Superior) o equivalente",
      "Título de Doctor",
      "Título de Máster Oficial"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Artículo 16 IV CUAGE",
    explanation: "El Grupo Profesional M1 agrupa actividades técnicas especializadas que exigen el título de Técnico Superior de FP (Ciclo Formativo de Grado Superior)."
  },
  {
    id: 104,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "El órgano paritario de interpretación, vigilancia, estudio y aplicación del IV CUAGE se denomina:",
    options: [
      "Tribunal Constitucional",
      "Comisión Paritaria (COPA)",
      "Mesa General de Negociación",
      "Junta Arbitral Laboral"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Artículo 7 IV CUAGE",
    explanation: "La Comisión Paritaria del IV Convenio Único (COPA) es el órgano colegiado encargado de la vigilancia, interpretación y seguimiento de los acuerdos del convenio."
  },
  {
    id: 105,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "En el IV CUAGE, ¿cuál de las siguientes sanciones corresponde a la comisión de faltas MUY GRAVES?",
    options: [
      "Apercibimiento por escrito",
      "Suspensión de empleo y sueldo de hasta 15 días",
      "Despido disciplinario o suspensión de empleo y sueldo de más de 3 meses hasta 6 años",
      "Inhabilitación de por vida"
    ],
    correct: 2,
    law: "IV CUAGE",
    article: "Régimen Disciplinario IV CUAGE",
    explanation: "Las faltas muy graves del personal laboral conllevan el despido disciplinario con pérdida del puesto o la suspensión de empleo y sueldo superior a 3 meses hasta un máximo de 6 años."
  },
  {
    id: 106,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "El periodo de prueba fijado en el IV CUAGE para los trabajadores del Grupo Profesional E1 es de:",
    options: [
      "15 días laborables",
      "1 mes",
      "3 meses",
      "6 meses"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Artículo 23 IV CUAGE",
    explanation: "Para el personal de los Grupos E1 y E2, el periodo de prueba no podrá exceder de un mes de trabajo efectivo."
  },
  {
    id: 107,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "La provisión de puestos de trabajo vacantes de personal laboral en el ámbito del IV CUAGE se realiza en primer lugar mediante:",
    options: [
      "Concurso de traslados",
      "Oposición libre",
      "Nombramiento directo discrecional",
      "Contratación temporal externa"
    ],
    correct: 0,
    law: "IV CUAGE",
    article: "Artículo 29 IV CUAGE",
    explanation: "Los puestos vacantes se ofertan prioritariamente a concurso de traslados entre el personal laboral fijo, y posteriormente las vacantes no cubiertas a promoción interna y turno libre."
  },
  {
    id: 108,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "¿Cuál es la jornada ordinaria anual de trabajo efectiva fijada en el IV Convenio Único para el personal laboral de la AGE?",
    options: [
      "1.800 horas",
      "1.642 horas anuales (equivalente a 37,5 horas semanales)",
      "2.000 horas anuales",
      "1.450 horas"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Artículo 46 IV CUAGE",
    explanation: "La jornada general de trabajo en cómputo anual para el personal laboral de la AGE es de 1.642 horas, con un promedio de 37 horas y media semanales."
  },
  {
    id: 109,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "En el régimen disciplinario del IV CUAGE, las faltas leves prescriben a los:",
    options: [
      "10 días naturales",
      "10 días hábiles",
      "1 mes",
      "6 meses"
    ],
    correct: 0,
    law: "IV CUAGE",
    article: "Régimen Disciplinario IV CUAGE y Art. 60 ET",
    explanation: "Conforme al Estatuto de los Trabajadores y el Convenio Único, las faltas leves laborales prescriben a los diez días de su conocimiento por la dirección."
  },
  {
    id: 110,
    block: "especifico",
    mission: 5,
    topic: "IV CUAGE (Convenio Único)",
    question: "El complemento retributivo que retribuye la prestación de servicios en horario nocturno (entre las 22:00 h y las 06:00 h) se denomina:",
    options: [
      "Complemento de Productividad",
      "Plus de Nocturnidad",
      "Complemento Singular de Puesto",
      "Gratificación extraordinaria"
    ],
    correct: 1,
    law: "IV CUAGE",
    article: "Estructura Salarial IV CUAGE",
    explanation: "Las horas trabajadas durante el período comprendido entre las 22:00 horas de la noche y las 06:00 horas de la mañana devengan el complemento específico de nocturnidad."
  },
  {
    id: 111,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "El plazo para interponer la demanda judicial por despido ante los Juzgados de lo Social es de:",
    options: [
      "15 días naturales",
      "20 días hábiles",
      "1 mes natural",
      "3 meses"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 59.3 ET y Art. 103 LRJS",
    explanation: "El ejercicio de la acción contra el despido caduca a los 20 días hábiles siguientes a aquel en que se hubiera producido el despido. Es un plazo de caducidad procesal muy estricto."
  },
  {
    id: 112,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "¿Cuál es la indemnización legal fijada para el despido declarado IMPROCEDENTE tras la reforma laboral?",
    options: [
      "20 días por año de servicio, máximo 12 mensualidades",
      "33 días por año de servicio, con un máximo de 24 mensualidades",
      "45 días por año de servicio sin tope",
      "60 días por año de servicio"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 56.1 ET",
    explanation: "La indemnización por despido improcedente es de 33 días de salario por año de servicio, prorrateándose por meses los periodos inferiores y hasta un máximo de 24 mensualidades."
  },
  {
    id: 113,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "¿Cuál es la indemnización legal fijada en el despido por causas OBJETIVAS (económicas, técnicas, organizativas o de producción)?",
    options: [
      "10 días por año",
      "20 días de salario por año de servicio, con un máximo de 12 mensualidades",
      "33 días por año",
      "40 días por año"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 53.1.b) ET",
    explanation: "En el despido objetivo, la empresa debe poner a disposición del trabajador una indemnización de 20 días por año de servicio, prorrateándose por meses los períodos inferiores a un año y con un máximo de 12 mensualidades."
  },
  {
    id: 114,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "Entre el final de una jornada de trabajo ordinaria y el comienzo de la siguiente debe mediar, como mínimo:",
    options: [
      "8 horas",
      "10 horas",
      "12 horas",
      "14 horas"
    ],
    correct: 2,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 34.3 ET",
    explanation: "Entre el final de una jornada y el comienzo de la siguiente mediarán, como mínimo, 12 horas de descanso ininterrumpido."
  },
  {
    id: 115,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "El descanso semanal mínimo de los trabajadores según el artículo 37 del ET es de:",
    options: [
      "Un día ininterrumpido",
      "Día y medio ininterrumpido (36 horas)",
      "Dos días completos (48 horas)",
      "Medio día"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 37.1 ET",
    explanation: "Los trabajadores tendrán derecho a un descanso semanal mínimo, acumulable por períodos de hasta catorce días, de día y medio ininterrumpido que comprenderá la tarde del sábado o la mañana del lunes y el día completo del domingo."
  },
  {
    id: 116,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "El número máximo de horas extraordinarias que puede realizar un trabajador al año (salvo fuerza mayor) es de:",
    options: [
      "50 horas",
      "80 horas",
      "100 horas",
      "120 horas"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 35.2 ET",
    explanation: "El número de horas extraordinarias no podrá ser superior a 80 al año, salvo las realizadas para prevenir o reparar siniestros y otros daños extraordinarios y urgentes (fuerza mayor)."
  },
  {
    id: 117,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "¿Cuál es la duración del periodo de prueba máximo para trabajadores NO técnicos si el convenio colectivo no dispone nada?",
    options: [
      "15 días",
      "2 meses (3 meses en empresas de menos de 25 trabajadores)",
      "6 meses",
      "1 año"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 14.1 ET",
    explanation: "En defecto de pacto en convenio, el periodo de prueba no podrá exceder de seis meses para los técnicos titulados, ni de dos meses para los demás trabajadores (tres meses en empresas de menos de veinticinco trabajadores)."
  },
  {
    id: 118,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "¿A cuántas pagas extraordinarias al año tiene derecho como mínimo el trabajador según el Estatuto de los Trabajadores?",
    options: [
      "Una paga",
      "Dos gratificaciones extraordinarias al año",
      "Tres pagas completas",
      "Ninguna obligatoria por ley"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 31 ET",
    explanation: "El trabajador tiene derecho a dos gratificaciones extraordinarias al año, una de ellas con ocasión de las fiestas de Navidad y la otra en el mes que se fije por convenio colectivo o acuerdo."
  },
  {
    id: 119,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "Las deudas por salarios adeudados por la empresa prescriben en el plazo de:",
    options: [
      "6 meses",
      "1 año desde el momento en que debieron ser percibidos",
      "3 años",
      "5 años"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 59.1 ET",
    explanation: "Las acciones derivadas del contrato de trabajo que no tengan señalado plazo especial prescribirán al año de su terminación o devengo (incluye las deudas de salario pendientes)."
  },
  {
    id: 120,
    block: "especifico",
    mission: 6,
    topic: "Estatuto de los Trabajadores (RDL 2/2015)",
    question: "En caso de huelga legal declarada por los trabajadores:",
    options: [
      "El contrato de trabajo se extingue definitivamente",
      "El contrato se suspende, cesando la obligación de trabajar y de abonar el salario durante los días de huelga",
      "El trabajador percibe el 50% del salario",
      "El despido es automático"
    ],
    correct: 1,
    law: "Estatuto de los Trabajadores",
    article: "Artículo 45.1.m) ET",
    explanation: "El ejercicio del derecho de huelga legal suspende el contrato de trabajo con exoneración de las obligaciones recíprocas de trabajar y remunerar el trabajo."
  },
  {
    id: 121,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "¿A partir de qué número de trabajadores es obligatoria la constitución del Comité de Seguridad y Salud en un centro de trabajo?",
    options: [
      "A partir de 10 trabajadores",
      "A partir de 30 trabajadores",
      "A partir de 50 trabajadores",
      "A partir de 100 trabajadores"
    ],
    correct: 2,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 38.2 Ley 31/1995",
    explanation: "Se constituirá un Comité de Seguridad y Salud en todas las empresas o centros de trabajo que cuenten con 50 o más trabajadores."
  },
  {
    id: 122,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "El Comité de Seguridad y Salud es un órgano:",
    options: [
      "Unilateral de la empresa",
      "Paritario y colegiado de consulta y participación en materia de prevención",
      "Dirigido exclusivamente por la Inspección de Trabajo",
      "Exclusivo de los sindicatos sin presencia de la empresa"
    ],
    correct: 1,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 38.1 Ley 31/1995",
    explanation: "El Comité de Seguridad y Salud es el órgano paritario y colegiado de participación destinado a la consulta regular y periódica de las actuaciones de la empresa en materia de prevención de riesgos (formado a partes iguales por Delegados de Prevención y representantes de la empresa)."
  },
  {
    id: 123,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "¿Quién designa a los Delegados de Prevención en una empresa o centro de la AGE?",
    options: [
      "El Ministerio de Trabajo",
      "Los propios trabajadores de entre los representantes del personal (delegados de personal o miembros del comité de empresa)",
      "El jefe de personal",
      "El servicio de prevención ajeno"
    ],
    correct: 1,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 35.2 Ley 31/1995",
    explanation: "Los Delegados de Prevención son los representantes de los trabajadores con funciones específicas en prevención, elegidos por y entre los representantes del personal."
  },
  {
    id: 124,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "¿Cuál de los siguientes es un principio rector de la acción preventiva según el artículo 15 de la LPRL?",
    options: [
      "Anteponer la protección individual a la colectiva",
      "Anteponer la protección colectiva a la individual",
      "Priorizar el coste económico de las medidas",
      "Evitar las evaluaciones periódicas"
    ],
    correct: 1,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 15.1.h) Ley 31/1995",
    explanation: "El artículo 15.1.h de la LPRL obliga expresamente a: 'Adoptar medidas que antepongan la protección colectiva a la individual'."
  },
  {
    id: 125,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "La vigilancia de la salud de los trabajadores mediante reconocimientos médicos es, por regla general:",
    options: [
      "Obligatoria en todos los casos sin excepción",
      "Voluntaria para el trabajador, salvo supuestos legalmente tasados de riesgo específico",
      "De pago para el empleado",
      "Prohibida por el Estatuto de los Trabajadores"
    ],
    correct: 1,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 22.1 Ley 31/1995",
    explanation: "Esta vigilancia solo podrá llevarse a cabo cuando el trabajador preste su consentimiento (voluntariedad), salvo en los casos en que los reconocimientos sean imprescindibles para evaluar los efectos de las condiciones de trabajo sobre la salud o para verificar si el estado de salud puede constituir un peligro."
  },
  {
    id: 126,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "En caso de riesgo grave e inminente en el puesto de trabajo, el trabajador tiene derecho a:",
    options: [
      "Abandonar de inmediato el lugar de trabajo e interrumpir su actividad sin ser sancionado",
      "Seguir trabajando hasta que el inspector llegue",
      "Exigir una indemnización por despido",
      "Presentar una queja previa en 3 días hábiles"
    ],
    correct: 0,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 21.2 Ley 31/1995",
    explanation: "El trabajador tendrá derecho a interrumpir su actividad y abandonar el lugar de trabajo cuando considere que dicha actividad entraña un riesgo grave e inminente para su vida o salud, sin que pueda sufrir perjuicio alguno."
  },
  {
    id: 127,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "El coste de las medidas relativas a la seguridad y salud en el trabajo:",
    options: [
      "Deberá ser compartido al 50% entre empresa y trabajador",
      "No deberá recaer en modo alguno sobre los trabajadores",
      "Se descontará de la nómina mensual",
      "Se financiará mediante multas"
    ],
    correct: 1,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 14.5 Ley 31/1995",
    explanation: "El coste de las medidas relativas a la seguridad y la salud en el trabajo no deberá recaer en modo alguno sobre los trabajadores."
  },
  {
    id: 128,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "La formación en materia preventiva impartida por el empresario al trabajador:",
    options: [
      "Deberá impartirse, siempre que sea posible, dentro de la jornada de trabajo o descontándose el tiempo invertido",
      "Deberá pagarla el trabajador en su primer año",
      "Solo se realiza en días festivos",
      "Es voluntaria para la empresa"
    ],
    correct: 0,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 19.2 Ley 31/1995",
    explanation: "La formación se deberá impartir dentro de la jornada de trabajo o, si no fuera posible, en otras horas con el descuento en aquélla del tiempo invertido en la misma, siendo su coste a cargo del empresario."
  },
  {
    id: 129,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "En una empresa de entre 50 y 100 trabajadores, ¿cuántos Delegados de Prevención corresponden por ley?",
    options: [
      "1 Delegado de Prevención",
      "2 Delegados de Prevención",
      "3 Delegados de Prevención",
      "4 Delegados de Prevención"
    ],
    correct: 1,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 35.2 Ley 31/1995",
    explanation: "La escala del art. 35 fija: de 50 a 100 trabajadores corresponden exactamente 2 Delegados de Prevención."
  },
  {
    id: 130,
    block: "especifico",
    mission: 7,
    topic: "Ley 31/1995 de Prevención de Riesgos Laborales",
    question: "¿Qué organismo de la Administración General del Estado tiene como misión técnica la investigación y asesoramiento en prevención de riesgos?",
    options: [
      "El Instituto Nacional de Seguridad y Salud en el Trabajo (INSST)",
      "El Consejo de Estado",
      "La Dirección General de Tráfico",
      "El Juzgado de lo Social"
    ],
    correct: 0,
    law: "Ley 31/1995 de PRL",
    article: "Artículo 8 Ley 31/1995",
    explanation: "El Instituto Nacional de Seguridad y Salud en el Trabajo (INSST) es el órgano científico técnico especializado de la Administración General del Estado."
  },
  {
    id: 131,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "El organismo que gestiona y custodia los fondos de la 'caja única' de la Seguridad Social es:",
    options: [
      "El Instituto Nacional de la Seguridad Social (INSS)",
      "La Tesorería General de la Seguridad Social (TGSS)",
      "El Ministerio de Hacienda",
      "El Banco de España"
    ],
    correct: 1,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 74 TRLGSS",
    explanation: "La Tesorería General de la Seguridad Social (TGSS) es el servicio común con personalidad jurídica propia donde se unifican todos los recursos financieros y la caja única del sistema."
  },
  {
    id: 132,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "¿De qué Ministerio depende orgánicamente el Instituto Social de las Fuerzas Armadas (ISFAS)?",
    options: [
      "Ministerio de Inclusión, Seguridad Social y Migraciones",
      "Ministerio de Defensa",
      "Ministerio de Sanidad",
      "Ministerio del Interior"
    ],
    correct: 1,
    law: "Régimen Especial ISFAS",
    article: "Estatuto del ISFAS",
    explanation: "El ISFAS es un organismo autónomo adscrito al Ministerio de Defensa a través de la Subsecretaría de Defensa (Secretaría de Estado de Defensa)."
  },
  {
    id: 133,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "¿Cuál es la entidad gestora competente para el reconocimiento y pago de las pensiones de jubilación e incapacidad permanente en el Régimen General?",
    options: [
      "La TGSS",
      "El INSS (Instituto Nacional de la Seguridad Social)",
      "El SEPE",
      "El ISFAS"
    ],
    correct: 1,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 71 TRLGSS",
    explanation: "El INSS es la Entidad Gestora de la Seguridad Social que tiene a su cargo la gestión y administración de las prestaciones económicas del sistema (salvo desempleo y no contributivas)."
  },
  {
    id: 134,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "La afiliación a la Seguridad Social es:",
    options: [
      "Obligatoria para toda persona que inicie una actividad laboral, única para toda la vida del trabajador y vitalicia",
      "Renovable cada año",
      "Diferente cada vez que se cambia de empresa",
      "Voluntaria para el personal laboral"
    ],
    correct: 0,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 138 TRLGSS",
    explanation: "La afiliación es obligatoria, única para toda la vida de la persona y general para todos los regímenes que integran el sistema de Seguridad Social."
  },
  {
    id: 135,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "¿Quién tiene la obligación de ingresar las cuotas de cotización (tanto la cuota patronal como la aportación del trabajador) en la Seguridad Social?",
    options: [
      "El propio trabajador en ventanilla bancaria",
      "El empresario o Administración empleadora",
      "El sindicato mayoritario",
      "La mutua colaboradora"
    ],
    correct: 1,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 141 y 142 TRLGSS",
    explanation: "El sujeto responsable del pago de las cuotas es el empresario o la Administración empleadora, que descuenta la cuota obrera en la nómina y la ingresa junto con la cuota patronal en la TGSS."
  },
  {
    id: 136,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "¿Cuál es la duración máxima ordinaria del subsidio de Incapacidad Temporal (baja médica)?",
    options: [
      "180 días",
      "365 días (un año), prorrogable por otros 180 días si se prevé curación",
      "2 años fijos",
      "90 días"
    ],
    correct: 1,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 169 TRLGSS",
    explanation: "La Incapacidad Temporal tendrá una duración máxima de 365 días, prorrogables por otros 180 días naturales cuando se presuma que durante ellos el trabajador pueda ser dado de alta médica por curación."
  },
  {
    id: 137,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "El régimen de Clases Pasivas del Estado se aplica a:",
    options: [
      "Todos los trabajadores contratados laborales del IV CUAGE",
      "Los funcionarios civiles de carrera y militares de carrera que ingresaron con anterioridad al 1 de enero de 2011",
      "Exclusivamente a los autónomos",
      "A cualquier ciudadano mayor de 65 años"
    ],
    correct: 1,
    law: "Régimen de Clases Pasivas",
    article: "RDL 670/1987 y RDL 13/2010",
    explanation: "El Régimen de Clases Pasivas ampara a los funcionarios y militares ingresados antes del 1 de enero de 2011. A partir de esa fecha, todos los nuevos funcionarios ingresan en el Régimen General de la Seguridad Social."
  },
  {
    id: 138,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "En el Régimen General de la Seguridad Social, en caso de enfermedad común, ¿a partir de qué día de baja médica comienza a devengarse el subsidio con cargo a la Seguridad Social o Mutua?",
    options: [
      "Desde el primer día",
      "A partir del 4º día (del día 4 al 15 a cargo de la empresa; del 16 en adelante con cargo a la SS/Mutua)",
      "A partir del 30º día",
      "A partir del segundo mes"
    ],
    correct: 1,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 173 TRLGSS",
    explanation: "En enfermedad común: días 1 a 3 no hay subsidio legal (salvo mejora en convenio), días 4 a 15 paga la empresa, y a partir del día 16 paga la Seguridad Social o Mutua colaboradora."
  },
  {
    id: 139,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "¿Cuál es la base de cotización mínima fijada en el Régimen General?",
    options: [
      "El Salario Mínimo Interprofesional (SMI) incrementado en un sexto",
      "Cero euros si no se trabaja",
      "500 euros mensuales fijos",
      "El doble del IPREM"
    ],
    correct: 0,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 148 TRLGSS",
    explanation: "Las bases mínimas de cotización en las distintas categorías profesionales no podrán ser inferiores a la cuantía del Salario Mínimo Interprofesional vigente incrementado en un sexto (prorrateo de pagas extra)."
  },
  {
    id: 140,
    block: "especifico",
    mission: 8,
    topic: "Seguridad Social e ISFAS",
    question: "El organismo público competente para la gestión y abono de las prestaciones contributivas por DESEMPLEO es:",
    options: [
      "La TGSS",
      "El Servicio Público de Empleo Estatal (SEPE)",
      "El INSS",
      "La Dirección General de Costes de Personal"
    ],
    correct: 1,
    law: "Ley General de la Seguridad Social",
    article: "Artículo 294 TRLGSS",
    explanation: "La gestión de las funciones y servicios derivados de las prestaciones por desempleo corresponde al Servicio Público de Empleo Estatal (SEPE)."
  },
  {
    id: 141,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "¿Quiénes están OBLIGADOS a relacionarse a través de medios electrónicos con las Administraciones Públicas para efectuar cualquier trámite administrativo?",
    options: [
      "Todas las personas físicas mayores de 18 años",
      "Las personas jurídicas, las entidades sin personalidad jurídica y quienes ejerzan actividad profesional con colegiación obligatoria",
      "Solo los extranjeros",
      "Exclusivamente los funcionarios públicos en su vida privada"
    ],
    correct: 1,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 14.2 Ley 39/2015",
    explanation: "Están obligadas a relacionarse electrónicamente: las personas jurídicas (sociedades), entidades sin personalidad jurídica, profesionales colegiados, notarios, registradores y los empleados públicos en los trámites con su administración."
  },
  {
    id: 142,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "El Registro Electrónico General de cada Administración Pública estará accesible para la presentación de documentos:",
    options: [
      "De 9:00 h a 14:00 h en días laborables",
      "Todos los días del año durante las veinticuatro horas",
      "De lunes a viernes excluidos festivos",
      "Durante 12 horas al día"
    ],
    correct: 1,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 31.1 Ley 39/2015",
    explanation: "El Registro Electrónico de cada Administración u Organismo garantizará que está accesible todos los días del año durante las veinticuatro horas."
  },
  {
    id: 143,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "En el cómputo de plazos por días en el procedimiento administrativo, siempre que no se exprese que son naturales:",
    options: [
      "Se entienden que son días hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos",
      "Se entienden naturales incluyendo todos los días",
      "Se cuentan los sábados pero se excluyen los domingos",
      "Son 20 días en todos los trámites"
    ],
    correct: 0,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 30.2 Ley 39/2015",
    explanation: "Siempre que por Ley o en el Derecho de la Unión Europea no se exprese otro cómputo, cuando los plazos se señalen por días, se entiende que éstos son hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos."
  },
  {
    id: 144,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "¿Cómo se computan los plazos fijados por MESES en la Ley 39/2015?",
    options: [
      "Se cuentan siempre 30 días exactos",
      "De fecha a fecha, concluyendo el mismo día correlativo del mes de vencimiento",
      "El último día hábil del mes",
      "Siempre vencen en lunes"
    ],
    correct: 1,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 30.4 Ley 39/2015",
    explanation: "Los plazos fijados por meses se computan de fecha a fecha: el plazo concluye el mismo día en que se produjo la notificación en el mes de vencimiento (o el último día del mes si en el de vencimiento no hubiera día equivalente)."
  },
  {
    id: 145,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "¿Cuál es el plazo máximo ordinario que tiene la Administración para dictar y notificar resolución expresa si la norma reguladora del procedimiento no fija plazo?",
    options: [
      "1 mes",
      "3 meses",
      "6 meses",
      "1 año"
    ],
    correct: 1,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 21.3 Ley 39/2015",
    explanation: "Cuando las normas reguladoras de los procedimientos no fijen el plazo máximo, éste será de tres meses."
  },
  {
    id: 146,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "Cuando una notificación electrónica esté disponible en la sede electrónica y el interesado no acceda a su contenido, ¿a los cuántos días naturales se entiende rechazada la notificación?",
    options: [
      "A los 3 días",
      "A los 5 días",
      "A los 10 días naturales",
      "A los 15 días hábiles"
    ],
    correct: 2,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 43.2 Ley 39/2015",
    explanation: "Cuando la notificación por medios electrónicos sea de carácter obligatorio, se entenderá rechazada cuando hayan transcurrido 10 días naturales desde la puesta a disposición de la notificación sin que se acceda a su contenido."
  },
  {
    id: 147,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "Contra los actos administrativos que NO ponen fin a la vía administrativa cabe interponer:",
    options: [
      "Recurso Potestativo de Reposición",
      "Recurso de Alzada ante el superior jerárquico",
      "Recurso Contencioso-Administrativo directo",
      "Recurso de Amparo"
    ],
    correct: 1,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 121.1 Ley 39/2015",
    explanation: "Las resoluciones y actos de trámite cualificados que no pongan fin a la vía administrativa podrán ser recurridos en alzada ante el órgano superior jerárquico del que los dictó."
  },
  {
    id: 148,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "¿Cuál es el plazo para interponer el Recurso Potestativo de Reposición si el acto administrativo es EXPRESO?",
    options: [
      "10 días hábiles",
      "15 días naturales",
      "1 mes",
      "3 meses"
    ],
    correct: 2,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 124.1 Ley 39/2015",
    explanation: "El plazo para la interposición del recurso potestativo de reposición será de un mes, si el acto fuera expreso."
  },
  {
    id: 149,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "En el trámite de subsanación y mejora de la solicitud (art. 68), si la solicitud no reúne los requisitos exigidos, ¿qué plazo se concede al interesado para subsanar?",
    options: [
      "5 días",
      "10 días hábiles",
      "15 días naturales",
      "1 mes"
    ],
    correct: 1,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 68.1 Ley 39/2015",
    explanation: "Se requerirá al interesado para que, en un plazo de diez días, subsane la falta o acompañe los documentos preceptivos, con indicación de que si así no lo hiciera se le tendrá por desistido."
  },
  {
    id: 150,
    block: "especifico",
    mission: 9,
    topic: "Ley 39/2015 LPACAP",
    question: "El trámite de AUDIENCIA a los interesados en el procedimiento administrativo se realiza en un plazo no inferior a 10 días ni superior a:",
    options: [
      "15 días",
      "20 días",
      "30 días",
      "2 meses"
    ],
    correct: 0,
    law: "Ley 39/2015 LPACAP",
    article: "Artículo 82.2 Ley 39/2015",
    explanation: "Los interesados podrán alegar y presentar los documentos que estimen pertinentes en un plazo no inferior a diez días ni superior a quince días."
  },
  {
    id: 151,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "¿Qué documento administrativo se utiliza comúnmente para la comunicación escrita entre órganos que pertenecen a un MISMO Ministerio u organismo?",
    options: [
      "El Oficio",
      "La Nota Interior",
      "El Bando",
      "El Real Decreto"
    ],
    correct: 1,
    law: "Manual de Documentos Administrativos",
    article: "Clasificación de Documentos Administrativos",
    explanation: "La Nota Interior es el documento administrativo utilizado para las comunicaciones internas entre unidades u órganos pertenecientes a un mismo Departamento Ministerial."
  },
  {
    id: 152,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "¿Qué documento administrativo se utiliza para comunicaciones entre órganos de DISTINTOS Ministerios o con autoridades y ciudadanos externos?",
    options: [
      "La Nota Interior",
      "El Oficio",
      "La Providencia",
      "La Declaración responsable"
    ],
    correct: 1,
    law: "Manual de Documentos Administrativos",
    article: "Clasificación de Documentos Administrativos",
    explanation: "El Oficio es el documento oficial por excelencia utilizado para la comunicación externa entre diferentes órganos de distintas Administraciones, Ministerios o con particulares."
  },
  {
    id: 153,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "El documento administrativo de constancia que expide un funcionario competente para acreditar hechos, acuerdos o datos que constan en un expediente se denomina:",
    options: [
      "Certificado (o Certificación)",
      "Resolución",
      "Notificación",
      "Dictamen"
    ],
    correct: 0,
    law: "Manual de Documentos Administrativos",
    article: "Documentos de Constancia",
    explanation: "El Certificado es el documento administrativo expedido por órgano competente que acredita fehacientemente actos, situaciones o resoluciones que constan en los registros oficiales."
  },
  {
    id: 154,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "En el sistema archivístico del Ministerio de Defensa, el archivo donde se conservan los documentos en tramitación activa o uso muy frecuente (hasta 5 años) se denomina:",
    options: [
      "Archivo Histórico",
      "Archivo de Gestión (o de Oficina)",
      "Archivo Intermedio",
      "Archivo Central"
    ],
    correct: 1,
    law: "Sistema Archivístico de la Defensa (RD 2598/1998)",
    article: "Ciclo Vital de los Documentos",
    explanation: "El Archivo de Gestión o de oficina custodia la documentación en su primera fase activa mientras dura la tramitación de los asuntos o su consulta administrativa diaria."
  },
  {
    id: 155,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "El Archivo que coordina y recibe la documentación transferida desde los archivos de gestión de un mismo Departamento Ministerial una vez finalizado el trámite se denomina:",
    options: [
      "Archivo Central",
      "Archivo General Militar",
      "Archivo de Indias",
      "Archivo Privado"
    ],
    correct: 0,
    law: "Sistema Archivístico de la Defensa (RD 2598/1998)",
    article: "Ciclo Vital de los Documentos",
    explanation: "El Archivo Central de cada Ministerio recibe los expedientes transferidos por los archivos de gestión una vez concluido su trámite inmediato y conserva la documentación en fase semiactiva."
  },
  {
    id: 156,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "La operación consistente en la eliminación reglamentada y autorizada de documentos que han perdido su valor probatorio y administrativo se denomina:",
    options: [
      "Foliación",
      "Expurgo",
      "Catalogación",
      "Registro de salida"
    ],
    correct: 1,
    law: "Normativa de Archivos de la AGE",
    article: "Comisión Superior Calificadora de Documentos Administrativos",
    explanation: "El expurgo es el proceso de eliminación física controlada de documentos que han perdido valor administrativo, legal e histórico, tras el preceptivo dictamen de la Comisión de Valoración Documental."
  },
  {
    id: 157,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "El principio archivístico fundamental según el cual los documentos de un fondo deben conservarse en el orden en que fueron creados por la institución productora se denomina:",
    options: [
      "Principio de caducidad",
      "Principio de procedencia y orden original",
      "Principio de jerarquía militar",
      "Principio de publicidad"
    ],
    correct: 1,
    law: "Teoría Archivística de la AGE",
    article: "Principios Básicos de Archivo",
    explanation: "El principio de procedencia establece que cada documento debe estar situado en el fondo documental del que procede y respetar el orden original con el que se tramitó."
  },
  {
    id: 158,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "El documento que refleja la manifestación de voluntad de un órgano administrativo que decide sobre el fondo de un asunto poniendo fin al procedimiento es:",
    options: [
      "Una Nota Interior",
      "Una Resolución",
      "Un Acuse de recibo",
      "Una Carta de servicios"
    ],
    correct: 1,
    law: "Manual de Documentos Administrativos",
    article: "Documentos Decisorios",
    explanation: "La Resolución es el acto administrativo definitivo que resuelve el fondo del procedimiento administrativo y produce plenos efectos jurídicos frente a terceros."
  },
  {
    id: 159,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "¿Cuál es la función principal del Archivo General Militar de Segovia en el sistema archivístico de Defensa?",
    options: [
      "Custodiar expedientes abiertos del año en curso",
      "Custodiar el archivo histórico militar con fondos del Ejército de Tierra desde el siglo XVIII",
      "Almacenar facturas de compras",
      "Tramitar nóminas de soldados"
    ],
    correct: 1,
    law: "Sistema Archivístico de la Defensa (RD 2598/1998)",
    article: "Archivos Históricos Militares",
    explanation: "El Archivo General Militar de Segovia es el archivo histórico más antiguo de las Fuerzas Armadas españolas, custodio del patrimonio documental histórico del Ejército de Tierra."
  },
  {
    id: 160,
    block: "especifico",
    mission: 10,
    topic: "Documentación y Archivos en Defensa",
    question: "El código alfanumérico que identifica unívocamente a cada órgano, centro directivo o unidad administrativa en el Directorio Común de la AGE se denomina:",
    options: [
      "Código Postal",
      "Código DIR3",
      "Código IBAN",
      "Código CIF"
    ],
    correct: 1,
    law: "Esquema Nacional de Interoperabilidad (ENI)",
    article: "Directorio Común DIR3",
    explanation: "El código DIR3 es el identificador único oficial que permite a los sistemas de registro y tramitación electrónica identificar con precisión a cada unidad u oficina de la Administración pública española."
  }
];
