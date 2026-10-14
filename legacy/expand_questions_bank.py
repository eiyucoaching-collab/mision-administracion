# Script generador de 100 preguntas oficiales adicionales para E1 Defensa / AGE
import json

NEW_QUESTIONS = [
  # ==========================================
  # TEMA 1: CONSTITUCIÓN ESPAÑOLA (ID 61 a 70)
  # ==========================================
  {
    "id": 61, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿En qué artículo de la Constitución Española se proclama la igualdad de todos los españoles ante la ley sin discriminación?",
    "options": ["Artículo 9.2", "Artículo 14", "Artículo 10", "Artículo 16"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Artículo 14 CE",
    "explanation": "El artículo 14 CE establece que los españoles son iguales ante la ley, sin que pueda prevalecer discriminación alguna por razón de nacimiento, raza, sexo, religión, opinión o cualquier otra condición o circunstancia personal o social."
  },
  {
    "id": 62, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "El plazo máximo de la detención preventiva sin puesta a disposición judicial según el artículo 17.2 de la CE es de:",
    "options": ["24 horas", "48 horas", "72 horas", "96 horas"],
    "correct": 2, "law": "Constitución Española de 1978", "article": "Artículo 17.2 CE",
    "explanation": "La detención preventiva no podrá durar más del tiempo estrictamente necesario para la realización de las averiguaciones tendentes al esclarecimiento de los hechos, y, en todo caso, en el plazo máximo de 72 horas, el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial."
  },
  {
    "id": 63, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿Cuál es la forma política del Estado español según el artículo 1.3 de la Constitución?",
    "options": ["República parlamentaria", "Monarquía parlamentaria", "Estado autonómico", "Democracia representativa"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Artículo 1.3 CE",
    "explanation": "El artículo 1.3 de la CE establece tajantemente: 'La forma política del Estado español es la Monarquía parlamentaria'."
  },
  {
    "id": 64, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "Según el artículo 68.1 de la CE, ¿cuál es el número mínimo y máximo de Diputados que pueden componer el Congreso?",
    "options": ["Entre 250 y 350", "Entre 300 y 400", "Entre 350 y 450", "Fijo en 350"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Artículo 68.1 CE",
    "explanation": "El Congreso se compone de un mínimo de 300 y un máximo de 400 Diputados, elegidos por sufragio universal, libre, igual, directo y secreto (actualmente fijado en 350 por la LOREG)."
  },
  {
    "id": 65, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿A quién corresponde sancionar y promulgar las leyes según la Constitución Española?",
    "options": ["Al Presidente del Gobierno", "Al Presidente del Congreso", "Al Rey", "Al Tribunal Constitucional"],
    "correct": 2, "law": "Constitución Española de 1978", "article": "Artículo 62.a y 91 CE",
    "explanation": "Corresponde al Rey sancionar y promulgar las leyes en el plazo de quince días, y ordenar su inmediata publicación."
  },
  {
    "id": 66, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿Qué mayoría se exige para la aprobación, modificación o derogación de las Leyes Orgánicas en el Congreso?",
    "options": ["Mayoría simple de los presentes", "Mayoría absoluta en una votación final sobre el conjunto del proyecto", "Mayoría de dos tercios", "Mayoría de tres quintos"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Artículo 81.2 CE",
    "explanation": "La aprobación, modificación o derogación de las leyes orgánicas exigirá mayoría absoluta del Congreso, en una votación final sobre el conjunto del proyecto."
  },
  {
    "id": 67, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿Quién nombra a los miembros del Tribunal Constitucional según el artículo 159 de la CE?",
    "options": ["El Presidente del Gobierno", "Las Cortes Generales en sesión conjunta", "El Rey, a propuesta de los órganos constitucionales", "El Consejo General del Poder Judicial"],
    "correct": 2, "law": "Constitución Española de 1978", "article": "Artículo 159.1 CE",
    "explanation": "Los miembros del Tribunal Constitucional son nombrados formalmente por el Rey: 4 a propuesta del Congreso, 4 a propuesta del Senado, 2 a propuesta del Gobierno y 2 a propuesta del CGPJ."
  },
  {
    "id": 68, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "El Defensor del Pueblo es designado por:",
    "options": ["El Gobierno para defender la Administración", "Las Cortes Generales como alto comisionado para defender los derechos del Título I", "El Consejo de Ministros", "El Rey a propuesta del Fiscal General"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Artículo 54 CE",
    "explanation": "Una ley orgánica regulará la institución del Defensor del Pueblo, como alto comisionado de las Cortes Generales, designado por éstas para la defensa de los derechos comprendidos en el Título I."
  },
  {
    "id": 69, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿Cuál es el plazo de convalidación o derogación de un Real Decreto-Ley por el Congreso de los Diputados?",
    "options": ["15 días siguientes a su promulgación", "30 días siguientes a su promulgación", "60 días hábiles", "3 meses naturales"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Artículo 86.2 CE",
    "explanation": "Los Decretos-leyes deberán ser sometidos de forma inmediata a debate y votación de totalidad al Congreso de los Diputados dentro del plazo de los 30 días siguientes a su promulgación."
  },
  {
    "id": 70, "block": "comun", "mission": 1, "topic": "Constitución Española de 1978",
    "question": "¿En qué año y fecha exacta fue ratificada en referéndum la Constitución Española?",
    "options": ["31 de octubre de 1978", "6 de diciembre de 1978", "27 de diciembre de 1978", "29 de diciembre de 1978"],
    "correct": 1, "law": "Constitución Española de 1978", "article": "Historia Constitucional CE 1978",
    "explanation": "La Constitución fue aprobada por las Cortes el 31 de octubre de 1978, ratificada por el pueblo español en referéndum el 6 de diciembre de 1978, sancionada por el Rey el 27 de diciembre y publicada en el BOE el 29 de diciembre de 1978."
  },

  # ==========================================
  # TEMA 2: GOBIERNO Y AGE (ID 71 a 80)
  # ==========================================
  {
    "id": 71, "block": "comun", "mission": 2, "topic": "Ley 50/1997 del Gobierno",
    "question": "¿Quién propone el nombramiento y separación de los Ministros?",
    "options": ["El Congreso de los Diputados", "El Presidente del Gobierno", "El Rey por iniciativa propia", "El Consejo de Ministros"],
    "correct": 1, "law": "Ley 50/1997 del Gobierno", "article": "Artículo 12.2 Ley 50/1997",
    "explanation": "Los Ministros son nombrados y separados por el Rey, a propuesta exclusiva del Presidente del Gobierno."
  },
  {
    "id": 72, "block": "comun", "mission": 2, "topic": "Ley 40/2015 del Régimen Jurídico del Sector Público",
    "question": "En la estructura ministerial de la AGE, ¿cuál de los siguientes es un Órgano Directivo y NO un Órgano Superior?",
    "options": ["El Ministro", "El Secretario de Estado", "El Subsecretario", "El Presidente del Gobierno"],
    "correct": 2, "law": "Ley 40/2015", "article": "Artículo 55.2 Ley 40/2015",
    "explanation": "Son órganos superiores los Ministros y los Secretarios de Estado. Son órganos directivos los Subsecretarios y Secretarios Generales, y los Directores Generales y Subdirectores Generales."
  },
  {
    "id": 73, "block": "comun", "mission": 2, "topic": "Ley 40/2015 del Régimen Jurídico del Sector Público",
    "question": "¿Quién ostenta la representación ordinaria del Gobierno de España en el territorio de una Comunidad Autónoma?",
    "options": ["El Presidente de la Comunidad Autónoma", "El Delegado del Gobierno", "El Subdelegado del Gobierno", "El Ministro de Política Territorial"],
    "correct": 1, "law": "Ley 40/2015", "article": "Artículo 72 Ley 40/2015",
    "explanation": "Los Delegados del Gobierno representan al Gobierno de la Nación en el territorio de la respectiva Comunidad Autónoma, sin perjuicio de la representación ordinaria del Estado que ostenta el Presidente autonómico."
  },
  {
    "id": 74, "block": "comun", "mission": 2, "topic": "Ley 40/2015 del Régimen Jurídico del Sector Público",
    "question": "¿Qué rango jerárquico tienen los Delegados del Gobierno en las Comunidades Autónomas?",
    "options": ["Rango de Ministro", "Rango de Secretario de Estado", "Rango de Subsecretario", "Rango de Director General"],
    "correct": 2, "law": "Ley 40/2015", "article": "Artículo 72.2 Ley 40/2015",
    "explanation": "Los Delegados del Gobierno tendrán rango de Subsecretario y serán nombrados y separados por Real Decreto del Consejo de Ministros, a propuesta del Presidente del Gobierno."
  },
  {
    "id": 75, "block": "comun", "mission": 2, "topic": "Ley 40/2015 del Régimen Jurídico del Sector Público",
    "question": "¿Cuál es la titulación o requisito exigido para ser nombrado Subsecretario o Director General en un Ministerio?",
    "options": ["Ser funcionario de carrera del Subgrupo A1", "Cualquier ciudadano con título universitario", "Ser personal eventual con más de 5 años de experiencia", "Haber sido diputado o senador"],
    "correct": 0, "law": "Ley 40/2015", "article": "Artículo 63.2 y 66.2 Ley 40/2015",
    "explanation": "Los Subsecretarios y Directores Generales habrán de nombrarse entre funcionarios de carrera del Estado, de las CCAA o de las EELL, pertenecientes al Subgrupo A1, salvo excepciones motivadas en el caso de Directores Generales."
  },
  {
    "id": 76, "block": "comun", "mission": 2, "topic": "Ley 50/1997 del Gobierno",
    "question": "Las reuniones del Consejo de Ministros tienen carácter:",
    "options": ["Público y retransmitido en directo", "Secreto", "Reservado solo a los medios acreditados", "Público previo acuerdo del Presidente"],
    "correct": 1, "law": "Ley 50/1997 del Gobierno", "article": "Artículo 5.3 Ley 50/1997",
    "explanation": "Las deliberaciones del Consejo de Ministros serán secretas. Los miembros del Consejo de Ministros están obligados a guardar secreto sobre las opiniones y votos emitidos."
  },
  {
    "id": 77, "block": "comun", "mission": 2, "topic": "Ley 50/1997 del Gobierno",
    "question": "¿Quién actúa como Secretario del Consejo de Ministros?",
    "options": ["El Ministro de Defensa", "El Ministro de la Presidencia", "El Subsecretario de la Presidencia", "El Vicepresidente Primero"],
    "correct": 1, "law": "Ley 50/1997 del Gobierno", "article": "Artículo 5.2 Ley 50/1997",
    "explanation": "Actuará como Secretario del Consejo de Ministros el Ministro de la Presidencia (o en su defecto el Ministro que determine el Presidente)."
  },
  {
    "id": 78, "block": "comun", "mission": 2, "topic": "Ley 40/2015 del Régimen Jurídico del Sector Público",
    "question": "¿Cuál de las siguientes figuras existe en las provincias donde NO radica la sede de la Delegación del Gobierno?",
    "options": ["Un Delegado Provincial", "Un Subdelegado del Gobierno", "Un Comisionado del Estado", "Un Director Territorial"],
    "correct": 1, "law": "Ley 40/2015", "article": "Artículo 74 Ley 40/2015",
    "explanation": "En cada provincia y bajo la inmediata dependencia del Delegado del Gobierno, existirá un Subdelegado del Gobierno, con nivel de Subdirector General."
  },
  {
    "id": 79, "block": "comun", "mission": 2, "topic": "Ley 50/1997 del Gobierno",
    "question": "¿Qué instrumento normativo dictan los Ministros en el ejercicio de sus competencias propias?",
    "options": ["Reales Decretos Legislativos", "Reales Decretos del Consejo", "Órdenes Ministeriales", "Directivas de Estado"],
    "correct": 2, "law": "Ley 50/1997 del Gobierno", "article": "Artículo 4.1.f) y 24.1.f) Ley 50/1997",
    "explanation": "Los Ministros ejercen la potestad reglamentaria en las materias propias de su Departamento mediante Órdenes Ministeriales."
  },
  {
    "id": 80, "block": "comun", "mission": 2, "topic": "Ley 40/2015 del Régimen Jurídico del Sector Público",
    "question": "La delegación de competencias entre órganos de una misma Administración Pública:",
    "options": ["Supone la transferencia de la titularidad de la competencia", "No supone la cesión de la titularidad de la competencia, sino solo de su ejercicio", "Requiere siempre autorización judicial", "Solo cabe entre órganos de distinto ministerio"],
    "correct": 1, "law": "Ley 40/2015", "article": "Artículo 9.1 Ley 40/2015",
    "explanation": "La delegación de competencias no supone la cesión de la titularidad de la competencia ni de los elementos determinantes de su ejercicio, sino únicamente de su ejercicio material."
  },

  # ==========================================
  # TEMA 3: EMPLEO PÚBLICO Y TREBEP (ID 81 a 90)
  # ==========================================
  {
    "id": 81, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "Son funcionarios interinos los que, por razones expresamente justificadas de necesidad y urgencia, son nombrados como tales con carácter temporal para:",
    "options": ["Puestos de confianza política exclusiva", "La existencia de plazas vacantes cuando no sea posible su cobertura por funcionarios de carrera (máximo 3 años)", "Sustituir únicamente personal de baja por maternidad", "Realizar tareas no administrativas"],
    "correct": 1, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 10.1.a) TREBEP",
    "explanation": "El art. 10 TREBEP limita el nombramiento de interinos en vacante a un máximo de 3 años, tras los cuales la plaza debe ser cubierta por funcionario de carrera o amortizada."
  },
  {
    "id": 82, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "¿Cuál de las siguientes es una falta disciplinaria MUY GRAVE según el artículo 95 del TREBEP?",
    "options": ["La falta de asistencia injustificada de un día", "El retraso reiterado en el horario de trabajo", "El abandono del servicio y la vulneración del deber de fidelidad a la Constitución", "La incorrección con el público"],
    "correct": 2, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 95.2.b) TREBEP",
    "explanation": "El abandono del servicio, así como no hacerse cargo voluntariamente de las tareas o funciones que tienen encomendadas, es una falta MUY GRAVE tipificada legalmente."
  },
  {
    "id": 83, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "Las faltas disciplinarias muy graves prescriben a los:",
    "options": ["6 meses", "1 año", "2 años", "3 años"],
    "correct": 3, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 97.1 TREBEP",
    "explanation": "Las infracciones muy graves prescribirán a los 3 años, las graves a los 2 años y las leves a los 6 meses."
  },
  {
    "id": 84, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "¿Cuál de las siguientes sanciones NO puede imponerse por la comisión de faltas disciplinarias según el TREBEP?",
    "options": ["Separación del servicio", "Suspensión firme de funciones", "Sanción económica de reducción de sueldo o multa de haber", "Traslado forzoso"],
    "correct": 2, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 96.3 TREBEP",
    "explanation": "En ningún caso podrá imponerse la sanción de reducción de sueldo ni la sanción de multa de haber en el régimen disciplinario de los funcionarios públicos."
  },
  {
    "id": 85, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "¿A cuántos días de vacaciones anuales retribuidas tiene derecho un empleado público como mínimo?",
    "options": ["20 días hábiles", "22 días hábiles o un mes natural", "30 días hábiles", "15 días laborables"],
    "correct": 1, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 50 TREBEP",
    "explanation": "Los empleados públicos tendrán derecho a disfrutar, como mínimo, durante cada año natural, de unas vacaciones retribuidas de 22 días hábiles, o de los días que correspondan proporcionalmente si el tiempo de servicio durante el año fue menor."
  },
  {
    "id": 86, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "El permiso por matrimonio o pareja de hecho regulado en el TREBEP tiene una duración de:",
    "options": ["10 días hábiles", "15 días naturales", "20 días naturales", "1 mes"],
    "correct": 1, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 48.l) TREBEP",
    "explanation": "Por matrimonio o registro o constitución formalizada por documento público de pareja de hecho: 15 días naturales."
  },
  {
    "id": 87, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "¿Qué titulación exige el Subgrupo C2 para el ingreso en la función pública?",
    "options": ["Título de Bachiller", "Título de Graduado en Educación Secundaria Obligatoria (ESO)", "Título de Técnico Superior", "Certificado de escolaridad sin titulación"],
    "correct": 1, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 76 TREBEP",
    "explanation": "Para el acceso a los cuerpos o escalas del Subgrupo C2 se exigirá estar en posesión del título de Graduado en Educación Secundaria Obligatoria (mismo nivel formativo básico que el Grupo E1 laboral)."
  },
  {
    "id": 88, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "¿En cuál de las siguientes situaciones administrativas el funcionario NO percibe retribuciones básicas ni complementarias?",
    "options": ["Servicio activo", "Servicios especiales", "Excedencia voluntaria por interés particular", "Suspensión provisional de funciones"],
    "correct": 2, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 89.2 TREBEP",
    "explanation": "La excedencia voluntaria por interés particular no devenga retribuciones de ningún tipo ni computa tiempo a efectos de ascensos, trienios ni derechos pasivos."
  },
  {
    "id": 89, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "¿A los cuántos años de servicio continuado se adquiere el derecho al primer trienio?",
    "options": ["Al primer año", "A los 2 años", "A los 3 años", "A los 5 años"],
    "correct": 2, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 23 TREBEP",
    "explanation": "Los trienios consisten en una cantidad igual para cada Subgrupo o Grupo de clasificación por cada tres años de servicio."
  },
  {
    "id": 90, "block": "comun", "mission": 3, "topic": "TREBEP (RDL 5/2015)",
    "question": "La pérdida de la condición de funcionario de carrera se produce por:",
    "options": ["Una sanción de suspensión firme de 6 meses", "Renuncia a la condición de funcionario aceptada por la Administración", "Baja por incapacidad temporal de más de 30 días", "Cumplimiento de 50 años de edad"],
    "correct": 1, "law": "TREBEP (RDL 5/2015)", "article": "Artículo 63 TREBEP",
    "explanation": "Son causas de pérdida de la condición de funcionario: renuncia, pérdida de la nacionalidad, jubilación total, sanción disciplinaria de separación del servicio e inhabilitación absoluta o especial."
  },

  # ==========================================
  # TEMA 4: IGUALDAD Y VIOLENCIA DE GÉNERO (ID 91 a 100)
  # ==========================================
  {
    "id": 91, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "Según la LO 3/2007, se entiende por composición equilibrada aquella presencia de mujeres y hombres en la que las personas de cada sexo:",
    "options": ["Sean exactamente el 50% de cada género", "No superen el 60% ni sean menos del 40%", "Las mujeres representen al menos el 70%", "No superen el 55%"],
    "correct": 1, "law": "Ley Orgánica 3/2007", "article": "Disposición Adicional Primera LO 3/2007",
    "explanation": "Se entiende por composición o presencia equilibrada la presencia de mujeres y hombres de forma que ningún sexo supere el 60% ni sea inferior al 40%."
  },
  {
    "id": 92, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "¿Qué constituye el acoso sexual según el artículo 7 de la LO 3/2007?",
    "options": ["Cualquier crítica laboral injustificada", "Cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o efecto de atentar contra la dignidad de la persona", "Cualquier discrepancia horaria", "Un despido disciplinario improcedente"],
    "correct": 1, "law": "Ley Orgánica 3/2007", "article": "Artículo 7.1 LO 3/2007",
    "explanation": "Constituye acoso sexual cualquier comportamiento, verbal o físico, de naturaleza sexual que tenga el propósito o produzca el efecto de atentar contra la dignidad de una persona, en particular cuando se crea un entorno intimidatorio, degradante u ofensivo."
  },
  {
    "id": 93, "block": "comun", "mission": 4, "topic": "Ley Orgánica 1/2004 contra la Violencia de Género",
    "question": "La funcionaria o empleada pública víctima de violencia de género tiene derecho a:",
    "options": ["La reducción de jornada, reordenación del tiempo de trabajo y traslado a otra localidad sin necesidad de vacante", "Una subida automática de dos grupos salariales", "La excedencia forzosa con el 100% de sueldo indefinido", "La jubilación anticipada a los 30 años"],
    "correct": 0, "law": "Ley Orgánica 1/2004", "article": "Artículo 24 LO 1/2004 y Art. 82 TREBEP",
    "explanation": "Las empleadas públicas víctimas de violencia sobre la mujer tienen derecho a la reducción o a la reordenación de su tiempo de trabajo, a la movilidad geográfica (traslado de localidad) y a la excedencia por violencia sobre la mujer."
  },
  {
    "id": 94, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "En el orden social de la jurisdicción, cuando la parte actora alegue indicios fundamentados de discriminación por razón de sexo, corresponde probar la ausencia de discriminación:",
    "options": ["A la parte demandada (inversión de la carga de la prueba)", "A la parte actora siempre sin excepción", "Al Ministerio Fiscal exclusivamente", "Al perito judicial"],
    "correct": 0, "law": "Ley Orgánica 3/2007", "article": "Artículo 13 LO 3/2007",
    "explanation": "En los procedimientos en que las alegaciones de la parte actora se fundamenten en actuaciones discriminatorias, corresponderá a la persona demandada probar que sus medidas fueron objetivas y no discriminatorias (inversión de la carga de la prueba)."
  },
  {
    "id": 95, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "¿A partir de qué número de trabajadores es obligatorio que una empresa o entidad elabore y aplique un Plan de Igualdad?",
    "options": ["A partir de 25 trabajadores", "A partir de 50 trabajadores", "A partir de 100 trabajadores", "A partir de 250 trabajadores"],
    "correct": 1, "law": "Ley Orgánica 3/2007", "article": "Artículo 45.2 LO 3/2007",
    "explanation": "Las empresas de 50 o más trabajadores están obligadas legalmente a elaborar y aplicar un Plan de Igualdad."
  },
  {
    "id": 96, "block": "comun", "mission": 4, "topic": "Ley Orgánica 1/2004 contra la Violencia de Género",
    "question": "El Juzgado especializado creado por la LO 1/2004 para instruir y juzgar delitos relacionados con la violencia de género se denomina:",
    "options": ["Juzgado de lo Social", "Juzgado de Violencia sobre la Mujer", "Juzgado de Menores", "Juzgado Central de Instrucción"],
    "correct": 1, "law": "Ley Orgánica 1/2004", "article": "Artículo 43 LO 1/2004",
    "explanation": "La Ley Orgánica 1/2004 creó los Juzgados de Violencia sobre la Mujer dentro del orden jurisdiccional penal."
  },
  {
    "id": 97, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "El principio de transversalidad de la igualdad de género (mainstreaming) significa que:",
    "options": ["Solo afecta al Ministerio de Igualdad", "Los poderes públicos integrarán activamente la dimensión de igualdad en todas sus políticas y actuaciones", "Solo se aplica en los procesos electorales", "Es una recomendación no vinculante"],
    "correct": 1, "law": "Ley Orgánica 3/2007", "article": "Artículo 15 LO 3/2007",
    "explanation": "El principio de transversalidad obliga a todos los poderes públicos a integrar el principio de igualdad en la definición y presupuestación de todas sus políticas de forma transversal."
  },
  {
    "id": 98, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "Cualquier represalia, trato adverso o efecto negativo producido sobre una persona como consecuencia de haber presentado una queja o reclamación por discriminación constituye:",
    "options": ["Una indemnización obligatoria", "Una falta leve laboral", "Una conducta discriminatoria prohibida por la ley (indemnidad)", "Un acto no revisable"],
    "correct": 2, "law": "Ley Orgánica 3/2007", "article": "Artículo 9 LO 3/2007",
    "explanation": "También se considerará discriminación por razón de sexo cualquier trato adverso o efecto negativo que se produzca en una persona como consecuencia de la presentación por su parte de una queja, reclamación o demanda (garantía de indemnidad)."
  },
  {
    "id": 99, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "¿Qué es la discriminación indirecta por razón de sexo?",
    "options": ["Un insulto explícito hacia una mujer", "Una disposición, criterio o práctica aparentemente neutra que sitúa a personas de un sexo en desventaja particular con respecto a las de otro", "Cualquier delito penal", "Un despido justificado objetivamente"],
    "correct": 1, "law": "Ley Orgánica 3/2007", "article": "Artículo 6.2 LO 3/2007",
    "explanation": "Se considera discriminación indirecta aquella situación en que una disposición, criterio o práctica aparentemente neutros pone a personas de un sexo en desventaja particular con respecto a personas del otro, salvo justificación objetiva y legítima."
  },
  {
    "id": 100, "block": "comun", "mission": 4, "topic": "Ley Orgánica 3/2007 de Igualdad",
    "question": "En la Administración General del Estado, ¿cada cuánto tiempo se aprueba y evalúa el Plan de Igualdad entre mujeres y hombres?",
    "options": ["Anualmente", "Cada legislatura", "Al inicio de cada año fiscal", "En los términos que fije el propio plan, con seguimiento periódico continuo"],
    "correct": 3, "law": "Ley Orgánica 3/2007", "article": "Artículo 51 LO 3/2007 y Art. 64 TREBEP",
    "explanation": "El Gobierno aprobará, al inicio de cada legislatura, un Plan para la Igualdad entre mujeres y hombres en la AGE, estableciendo sus mecanismos de seguimiento y evaluación periódica."
  },

  # ==========================================
  # TEMA 5: IV CUAGE (PERSONAL LABORAL AGE) (ID 101 a 110)
  # ==========================================
  {
    "id": 101, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "El IV Convenio Colectivo Único para el personal laboral de la AGE (IV CUAGE) resulta de aplicación a:",
    "options": ["Todos los funcionarios y militares de Defensa", "El personal laboral que presta servicios en la Administración General del Estado y sus organismos públicos", "Exclusivamente a los contratados de alta dirección", "A las empresas privadas subcontratadas"],
    "correct": 1, "law": "IV CUAGE", "article": "Artículo 1 IV CUAGE",
    "explanation": "El IV CUAGE regula las relaciones laborales del personal laboral de la Administración General del Estado y sus organismos públicos dependientes."
  },
  {
    "id": 102, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "¿Cuál es la titulación requerida para el acceso al Grupo Profesional E1 según el sistema de clasificación del IV CUAGE?",
    "options": ["Título de Bachiller o FP de Grado Medio", "Título de Graduado en Educación Secundaria Obligatoria (ESO) o equivalente", "Título de Técnico Superior de FP", "Grado Universitario"],
    "correct": 1, "law": "IV CUAGE", "article": "Artículo 16 IV CUAGE",
    "explanation": "El Grupo Profesional E1 integra puestos y funciones operativas que requieren la titulación básica de Graduado en Educación Secundaria Obligatoria (ESO) o formación laboral equivalente."
  },
  {
    "id": 103, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "El Grupo Profesional M1 del IV CUAGE requiere estar en posesión de:",
    "options": ["Título de Graduado en ESO", "Título de Técnico Superior de Formación Profesional (Grado Superior) o equivalente", "Título de Doctor", "Título de Máster Oficial"],
    "correct": 1, "law": "IV CUAGE", "article": "Artículo 16 IV CUAGE",
    "explanation": "El Grupo Profesional M1 agrupa actividades técnicas especializadas que exigen el título de Técnico Superior de FP (Ciclo Formativo de Grado Superior)."
  },
  {
    "id": 104, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "El órgano paritario de interpretación, vigilancia, estudio y aplicación del IV CUAGE se denomina:",
    "options": ["Tribunal Constitucional", "Comisión Paritaria (COPA)", "Mesa General de Negociación", "Junta Arbitral Laboral"],
    "correct": 1, "law": "IV CUAGE", "article": "Artículo 7 IV CUAGE",
    "explanation": "La Comisión Paritaria del IV Convenio Único (COPA) es el órgano colegiado encargado de la vigilancia, interpretación y seguimiento de los acuerdos del convenio."
  },
  {
    "id": 105, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "En el IV CUAGE, ¿cuál de las siguientes sanciones corresponde a la comisión de faltas MUY GRAVES?",
    "options": ["Apercibimiento por escrito", "Suspensión de empleo y sueldo de hasta 15 días", "Despido disciplinario o suspensión de empleo y sueldo de más de 3 meses hasta 6 años", "Inhabilitación de por vida"],
    "correct": 2, "law": "IV CUAGE", "article": "Régimen Disciplinario IV CUAGE",
    "explanation": "Las faltas muy graves del personal laboral conllevan el despido disciplinario con pérdida del puesto o la suspensión de empleo y sueldo superior a 3 meses hasta un máximo de 6 años."
  },
  {
    "id": 106, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "El periodo de prueba fijado en el IV CUAGE para los trabajadores del Grupo Profesional E1 es de:",
    "options": ["15 días laborables", "1 mes", "3 meses", "6 meses"],
    "correct": 1, "law": "IV CUAGE", "article": "Artículo 23 IV CUAGE",
    "explanation": "Para el personal de los Grupos E1 y E2, el periodo de prueba no podrá exceder de un mes de trabajo efectivo."
  },
  {
    "id": 107, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "La provisión de puestos de trabajo vacantes de personal laboral en el ámbito del IV CUAGE se realiza en primer lugar mediante:",
    "options": ["Concurso de traslados", "Oposición libre", "Nombramiento directo discrecional", "Contratación temporal externa"],
    "correct": 0, "law": "IV CUAGE", "article": "Artículo 29 IV CUAGE",
    "explanation": "Los puestos vacantes se ofertan prioritariamente a concurso de traslados entre el personal laboral fijo, y posteriormente las vacantes no cubiertas a promoción interna y turno libre."
  },
  {
    "id": 108, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "¿Cuál es la jornada ordinaria anual de trabajo efectiva fijada en el IV Convenio Único para el personal laboral de la AGE?",
    "options": ["1.800 horas", "1.642 horas anuales (equivalente a 37,5 horas semanales)", "2.000 horas anuales", "1.450 horas"],
    "correct": 1, "law": "IV CUAGE", "article": "Artículo 46 IV CUAGE",
    "explanation": "La jornada general de trabajo en cómputo anual para el personal laboral de la AGE es de 1.642 horas, con un promedio de 37 horas y media semanales."
  },
  {
    "id": 109, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "En el régimen disciplinario del IV CUAGE, las faltas leves prescriben a los:",
    "options": ["10 días naturales", "10 días hábiles", "1 mes", "6 meses"],
    "correct": 0, "law": "IV CUAGE", "article": "Régimen Disciplinario IV CUAGE y Art. 60 ET",
    "explanation": "Conforme al Estatuto de los Trabajadores y el Convenio Único, las faltas leves laborales prescriben a los diez días de su conocimiento por la dirección."
  },
  {
    "id": 110, "block": "especifico", "mission": 5, "topic": "IV CUAGE (Convenio Único)",
    "question": "El complemento retributivo que retribuye la prestación de servicios en horario nocturno (entre las 22:00 h y las 06:00 h) se denomina:",
    "options": ["Complemento de Productividad", "Plus de Nocturnidad", "Complemento Singular de Puesto", "Gratificación extraordinaria"],
    "correct": 1, "law": "IV CUAGE", "article": "Estructura Salarial IV CUAGE",
    "explanation": "Las horas trabajadas durante el período comprendido entre las 22:00 horas de la noche y las 06:00 horas de la mañana devengan el complemento específico de nocturnidad."
  },

  # ==========================================
  # TEMA 6: ESTATUTO DE LOS TRABAJADORES (ID 111 a 120)
  # ==========================================
  {
    "id": 111, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "El plazo para interponer la demanda judicial por despido ante los Juzgados de lo Social es de:",
    "options": ["15 días naturales", "20 días hábiles", "1 mes natural", "3 meses"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 59.3 ET y Art. 103 LRJS",
    "explanation": "El ejercicio de la acción contra el despido caduca a los 20 días hábiles siguientes a aquel en que se hubiera producido el despido. Es un plazo de caducidad procesal muy estricto."
  },
  {
    "id": 112, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "¿Cuál es la indemnización legal fijada para el despido declarado IMPROCEDENTE tras la reforma laboral?",
    "options": ["20 días por año de servicio, máximo 12 mensualidades", "33 días por año de servicio, con un máximo de 24 mensualidades", "45 días por año de servicio sin tope", "60 días por año de servicio"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 56.1 ET",
    "explanation": "La indemnización por despido improcedente es de 33 días de salario por año de servicio, prorrateándose por meses los periodos inferiores y hasta un máximo de 24 mensualidades."
  },
  {
    "id": 113, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "¿Cuál es la indemnización legal fijada en el despido por causas OBJETIVAS (económicas, técnicas, organizativas o de producción)?",
    "options": ["10 días por año", "20 días de salario por año de servicio, con un máximo de 12 mensualidades", "33 días por año", "40 días por año"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 53.1.b) ET",
    "explanation": "En el despido objetivo, la empresa debe poner a disposición del trabajador una indemnización de 20 días por año de servicio, prorrateándose por meses los períodos inferiores a un año y con un máximo de 12 mensualidades."
  },
  {
    "id": 114, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "Entre el final de una jornada de trabajo ordinaria y el comienzo de la siguiente debe mediar, como mínimo:",
    "options": ["8 horas", "10 horas", "12 horas", "14 horas"],
    "correct": 2, "law": "Estatuto de los Trabajadores", "article": "Artículo 34.3 ET",
    "explanation": "Entre el final de una jornada y el comienzo de la siguiente mediarán, como mínimo, 12 horas de descanso ininterrumpido."
  },
  {
    "id": 115, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "El descanso semanal mínimo de los trabajadores según el artículo 37 del ET es de:",
    "options": ["Un día ininterrumpido", "Día y medio ininterrumpido (36 horas)", "Dos días completos (48 horas)", "Medio día"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 37.1 ET",
    "explanation": "Los trabajadores tendrán derecho a un descanso semanal mínimo, acumulable por períodos de hasta catorce días, de día y medio ininterrumpido que comprenderá la tarde del sábado o la mañana del lunes y el día completo del domingo."
  },
  {
    "id": 116, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "El número máximo de horas extraordinarias que puede realizar un trabajador al año (salvo fuerza mayor) es de:",
    "options": ["50 horas", "80 horas", "100 horas", "120 horas"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 35.2 ET",
    "explanation": "El número de horas extraordinarias no podrá ser superior a 80 al año, salvo las realizadas para prevenir o reparar siniestros y otros daños extraordinarios y urgentes (fuerza mayor)."
  },
  {
    "id": 117, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "¿Cuál es la duración del periodo de prueba máximo para trabajadores NO técnicos si el convenio colectivo no dispone nada?",
    "options": ["15 días", "2 meses (3 meses en empresas de menos de 25 trabajadores)", "6 meses", "1 año"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 14.1 ET",
    "explanation": "En defecto de pacto en convenio, el periodo de prueba no podrá exceder de seis meses para los técnicos titulados, ni de dos meses para los demás trabajadores (tres meses en empresas de menos de veinticinco trabajadores)."
  },
  {
    "id": 118, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "¿A cuántas pagas extraordinarias al año tiene derecho como mínimo el trabajador según el Estatuto de los Trabajadores?",
    "options": ["Una paga", "Dos gratificaciones extraordinarias al año", "Tres pagas completas", "Ninguna obligatoria por ley"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 31 ET",
    "explanation": "El trabajador tiene derecho a dos gratificaciones extraordinarias al año, una de ellas con ocasión de las fiestas de Navidad y la otra en el mes que se fije por convenio colectivo o acuerdo."
  },
  {
    "id": 119, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "Las deudas por salarios adeudados por la empresa prescriben en el plazo de:",
    "options": ["6 meses", "1 año desde el momento en que debieron ser percibidos", "3 años", "5 años"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 59.1 ET",
    "explanation": "Las acciones derivadas del contrato de trabajo que no tengan señalado plazo especial prescribirán al año de su terminación o devengo (incluye las deudas de salario pendientes)."
  },
  {
    "id": 120, "block": "especifico", "mission": 6, "topic": "Estatuto de los Trabajadores (RDL 2/2015)",
    "question": "En caso de huelga legal declarada por los trabajadores:",
    "options": ["El contrato de trabajo se extingue definitivamente", "El contrato se suspende, cesando la obligación de trabajar y de abonar el salario durante los días de huelga", "El trabajador percibe el 50% del salario", "El despido es automático"],
    "correct": 1, "law": "Estatuto de los Trabajadores", "article": "Artículo 45.1.m) ET",
    "explanation": "El ejercicio del derecho de huelga legal suspende el contrato de trabajo con exoneración de las obligaciones recíprocas de trabajar y remunerar el trabajo."
  },

  # ==========================================
  # TEMA 7: PREVENCIÓN DE RIESGOS LABORALES (ID 121 a 130)
  # ==========================================
  {
    "id": 121, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "¿A partir de qué número de trabajadores es obligatoria la constitución del Comité de Seguridad y Salud en un centro de trabajo?",
    "options": ["A partir de 10 trabajadores", "A partir de 30 trabajadores", "A partir de 50 trabajadores", "A partir de 100 trabajadores"],
    "correct": 2, "law": "Ley 31/1995 de PRL", "article": "Artículo 38.2 Ley 31/1995",
    "explanation": "Se constituirá un Comité de Seguridad y Salud en todas las empresas o centros de trabajo que cuenten con 50 o más trabajadores."
  },
  {
    "id": 122, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "El Comité de Seguridad y Salud es un órgano:",
    "options": ["Unilateral de la empresa", "Paritario y colegiado de consulta y participación en materia de prevención", "Dirigido exclusivamente por la Inspección de Trabajo", "Exclusivo de los sindicatos sin presencia de la empresa"],
    "correct": 1, "law": "Ley 31/1995 de PRL", "article": "Artículo 38.1 Ley 31/1995",
    "explanation": "El Comité de Seguridad y Salud es el órgano paritario y colegiado de participación destinado a la consulta regular y periódica de las actuaciones de la empresa en materia de prevención de riesgos (formado a partes iguales por Delegados de Prevención y representantes de la empresa)."
  },
  {
    "id": 123, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "¿Quién designa a los Delegados de Prevención en una empresa o centro de la AGE?",
    "options": ["El Ministerio de Trabajo", "Los propios trabajadores de entre los representantes del personal (delegados de personal o miembros del comité de empresa)", "El jefe de personal", "El servicio de prevención ajeno"],
    "correct": 1, "law": "Ley 31/1995 de PRL", "article": "Artículo 35.2 Ley 31/1995",
    "explanation": "Los Delegados de Prevención son los representantes de los trabajadores con funciones específicas en prevención, elegidos por y entre los representantes del personal."
  },
  {
    "id": 124, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "¿Cuál de los siguientes es un principio rector de la acción preventiva según el artículo 15 de la LPRL?",
    "options": ["Anteponer la protección individual a la colectiva", "Anteponer la protección colectiva a la individual", "Priorizar el coste económico de las medidas", "Evitar las evaluaciones periódicas"],
    "correct": 1, "law": "Ley 31/1995 de PRL", "article": "Artículo 15.1.h) Ley 31/1995",
    "explanation": "El artículo 15.1.h de la LPRL obliga expresamente a: 'Adoptar medidas que antepongan la protección colectiva a la individual'."
  },
  {
    "id": 125, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "La vigilancia de la salud de los trabajadores mediante reconocimientos médicos es, por regla general:",
    "options": ["Obligatoria en todos los casos sin excepción", "Voluntaria para el trabajador, salvo supuestos legalmente tasados de riesgo específico", "De pago para el empleado", "Prohibida por el Estatuto de los Trabajadores"],
    "correct": 1, "law": "Ley 31/1995 de PRL", "article": "Artículo 22.1 Ley 31/1995",
    "explanation": "Esta vigilancia solo podrá llevarse a cabo cuando el trabajador preste su consentimiento (voluntariedad), salvo en los casos en que los reconocimientos sean imprescindibles para evaluar los efectos de las condiciones de trabajo sobre la salud o para verificar si el estado de salud puede constituir un peligro."
  },
  {
    "id": 126, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "En caso de riesgo grave e inminente en el puesto de trabajo, el trabajador tiene derecho a:",
    "options": ["Abandonar de inmediato el lugar de trabajo e interrumpir su actividad sin ser sancionado", "Seguir trabajando hasta que el inspector llegue", "Exigir una indemnización por despido", "Presentar una queja previa en 3 días hábiles"],
    "correct": 0, "law": "Ley 31/1995 de PRL", "article": "Artículo 21.2 Ley 31/1995",
    "explanation": "El trabajador tendrá derecho a interrumpir su actividad y abandonar el lugar de trabajo cuando considere que dicha actividad entraña un riesgo grave e inminente para su vida o salud, sin que pueda sufrir perjuicio alguno."
  },
  {
    "id": 127, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "El coste de las medidas relativas a la seguridad y salud en el trabajo:",
    "options": ["Deberá ser compartido al 50% entre empresa y trabajador", "No deberá recaer en modo alguno sobre los trabajadores", "Se descontará de la nómina mensual", "Se financiará mediante multas"],
    "correct": 1, "law": "Ley 31/1995 de PRL", "article": "Artículo 14.5 Ley 31/1995",
    "explanation": "El coste de las medidas relativas a la seguridad y la salud en el trabajo no deberá recaer en modo alguno sobre los trabajadores."
  },
  {
    "id": 128, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "La formación en materia preventiva impartida por el empresario al trabajador:",
    "options": ["Deberá impartirse, siempre que sea posible, dentro de la jornada de trabajo o descontándose el tiempo invertido", "Deberá pagarla el trabajador en su primer año", "Solo se realiza en días festivos", "Es voluntaria para la empresa"],
    "correct": 0, "law": "Ley 31/1995 de PRL", "article": "Artículo 19.2 Ley 31/1995",
    "explanation": "La formación se deberá impartir dentro de la jornada de trabajo o, si no fuera posible, en otras horas con el descuento en aquélla del tiempo invertido en la misma, siendo su coste a cargo del empresario."
  },
  {
    "id": 129, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "En una empresa de entre 50 y 100 trabajadores, ¿cuántos Delegados de Prevención corresponden por ley?",
    "options": ["1 Delegado de Prevención", "2 Delegados de Prevención", "3 Delegados de Prevención", "4 Delegados de Prevención"],
    "correct": 1, "law": "Ley 31/1995 de PRL", "article": "Artículo 35.2 Ley 31/1995",
    "explanation": "La escala del art. 35 fija: de 50 a 100 trabajadores corresponden exactamente 2 Delegados de Prevención."
  },
  {
    "id": 130, "block": "especifico", "mission": 7, "topic": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "question": "¿Qué organismo de la Administración General del Estado tiene como misión técnica la investigación y asesoramiento en prevención de riesgos?",
    "options": ["El Instituto Nacional de Seguridad y Salud en el Trabajo (INSST)", "El Consejo de Estado", "La Dirección General de Tráfico", "El Juzgado de lo Social"],
    "correct": 0, "law": "Ley 31/1995 de PRL", "article": "Artículo 8 Ley 31/1995",
    "explanation": "El Instituto Nacional de Seguridad y Salud en el Trabajo (INSST) es el órgano científico técnico especializado de la Administración General del Estado."
  },

  # ==========================================
  # TEMA 8: SEGURIDAD SOCIAL E ISFAS (ID 131 a 140)
  # ==========================================
  {
    "id": 131, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "El organismo que gestiona y custodia los fondos de la 'caja única' de la Seguridad Social es:",
    "options": ["El Instituto Nacional de la Seguridad Social (INSS)", "La Tesorería General de la Seguridad Social (TGSS)", "El Ministerio de Hacienda", "El Banco de España"],
    "correct": 1, "law": "Ley General de la Seguridad Social", "article": "Artículo 74 TRLGSS",
    "explanation": "La Tesorería General de la Seguridad Social (TGSS) es el servicio común con personalidad jurídica propia donde se unifican todos los recursos financieros y la caja única del sistema."
  },
  {
    "id": 132, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "¿De qué Ministerio depende orgánicamente el Instituto Social de las Fuerzas Armadas (ISFAS)?",
    "options": ["Ministerio de Inclusión, Seguridad Social y Migraciones", "Ministerio de Defensa", "Ministerio de Sanidad", "Ministerio del Interior"],
    "correct": 1, "law": "Régimen Especial ISFAS", "article": "Estatuto del ISFAS",
    "explanation": "El ISFAS es un organismo autónomo adscrito al Ministerio de Defensa a través de la Subsecretaría de Defensa (Secretaría de Estado de Defensa)."
  },
  {
    "id": 133, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "¿Cuál es la entidad gestora competente para el reconocimiento y pago de las pensiones de jubilación e incapacidad permanente en el Régimen General?",
    "options": ["La TGSS", "El INSS (Instituto Nacional de la Seguridad Social)", "El SEPE", "El ISFAS"],
    "correct": 1, "law": "Ley General de la Seguridad Social", "article": "Artículo 71 TRLGSS",
    "explanation": "El INSS es la Entidad Gestora de la Seguridad Social que tiene a su cargo la gestión y administración de las prestaciones económicas del sistema (salvo desempleo y no contributivas)."
  },
  {
    "id": 134, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "La afiliación a la Seguridad Social es:",
    "options": ["Obligatoria para toda persona que inicie una actividad laboral, única para toda la vida del trabajador y vitalicia", "Renovable cada año", "Diferente cada vez que se cambia de empresa", "Voluntaria para el personal laboral"],
    "correct": 0, "law": "Ley General de la Seguridad Social", "article": "Artículo 138 TRLGSS",
    "explanation": "La afiliación es obligatoria, única para toda la vida de la persona y general para todos los regímenes que integran el sistema de Seguridad Social."
  },
  {
    "id": 135, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "¿Quién tiene la obligación de ingresar las cuotas de cotización (tanto la cuota patronal como la aportación del trabajador) en la Seguridad Social?",
    "options": ["El propio trabajador en ventanilla bancaria", "El empresario o Administración empleadora", "El sindicato mayoritario", "La mutua colaboradora"],
    "correct": 1, "law": "Ley General de la Seguridad Social", "article": "Artículo 141 y 142 TRLGSS",
    "explanation": "El sujeto responsable del pago de las cuotas es el empresario o la Administración empleadora, que descuenta la cuota obrera en la nómina y la ingresa junto con la cuota patronal en la TGSS."
  },
  {
    "id": 136, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "¿Cuál es la duración máxima ordinaria del subsidio de Incapacidad Temporal (baja médica)?",
    "options": ["180 días", "365 días (un año), prorrogable por otros 180 días si se prevé curación", "2 años fijos", "90 días"],
    "correct": 1, "law": "Ley General de la Seguridad Social", "article": "Artículo 169 TRLGSS",
    "explanation": "La Incapacidad Temporal tendrá una duración máxima de 365 días, prorrogables por otros 180 días naturales cuando se presuma que durante ellos el trabajador pueda ser dado de alta médica por curación."
  },
  {
    "id": 137, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "El régimen de Clases Pasivas del Estado se aplica a:",
    "options": ["Todos los trabajadores contratados laborales del IV CUAGE", "Los funcionarios civiles de carrera y militares de carrera que ingresaron con anterioridad al 1 de enero de 2011", "Exclusivamente a los autónomos", "A cualquier ciudadano mayor de 65 años"],
    "correct": 1, "law": "Régimen de Clases Pasivas", "article": "RDL 670/1987 y RDL 13/2010",
    "explanation": "El Régimen de Clases Pasivas ampara a los funcionarios y militares ingresados antes del 1 de enero de 2011. A partir de esa fecha, todos los nuevos funcionarios ingresan en el Régimen General de la Seguridad Social."
  },
  {
    "id": 138, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "En el Régimen General de la Seguridad Social, en caso de enfermedad común, ¿a partir de qué día de baja médica comienza a devengarse el subsidio con cargo a la Seguridad Social o Mutua?",
    "options": ["Desde el primer día", "A partir del 4º día (del día 4 al 15 a cargo de la empresa; del 16 en adelante con cargo a la SS/Mutua)", "A partir del 30º día", "A partir del segundo mes"],
    "correct": 1, "law": "Ley General de la Seguridad Social", "article": "Artículo 173 TRLGSS",
    "explanation": "En enfermedad común: días 1 a 3 no hay subsidio legal (salvo mejora en convenio), días 4 a 15 paga la empresa, y a partir del día 16 paga la Seguridad Social o Mutua colaboradora."
  },
  {
    "id": 139, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "¿Cuál es la base de cotización mínima fijada en el Régimen General?",
    "options": ["El Salario Mínimo Interprofesional (SMI) incrementado en un sexto", "Cero euros si no se trabaja", "500 euros mensuales fijos", "El doble del IPREM"],
    "correct": 0, "law": "Ley General de la Seguridad Social", "article": "Artículo 148 TRLGSS",
    "explanation": "Las bases mínimas de cotización en las distintas categorías profesionales no podrán ser inferiores a la cuantía del Salario Mínimo Interprofesional vigente incrementado en un sexto (prorrateo de pagas extra)."
  },
  {
    "id": 140, "block": "especifico", "mission": 8, "topic": "Seguridad Social e ISFAS",
    "question": "El organismo público competente para la gestión y abono de las prestaciones contributivas por DESEMPLEO es:",
    "options": ["La TGSS", "El Servicio Público de Empleo Estatal (SEPE)", "El INSS", "La Dirección General de Costes de Personal"],
    "correct": 1, "law": "Ley General de la Seguridad Social", "article": "Artículo 294 TRLGSS",
    "explanation": "La gestión de las funciones y servicios derivados de las prestaciones por desempleo corresponde al Servicio Público de Empleo Estatal (SEPE)."
  },

  # ==========================================
  # TEMA 9: REGISTRO Y PROCEDIMIENTO LEY 39/2015 (ID 141 a 150)
  # ==========================================
  {
    "id": 141, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "¿Quiénes están OBLIGADOS a relacionarse a través de medios electrónicos con las Administraciones Públicas para efectuar cualquier trámite administrativo?",
    "options": ["Todas las personas físicas mayores de 18 años", "Las personas jurídicas, las entidades sin personalidad jurídica y quienes ejerzan actividad profesional con colegiación obligatoria", "Solo los extranjeros", "Exclusivamente los funcionarios públicos en su vida privada"],
    "correct": 1, "law": "Ley 39/2015 LPACAP", "article": "Artículo 14.2 Ley 39/2015",
    "explanation": "Están obligadas a relacionarse electrónicamente: las personas jurídicas (sociedades), entidades sin personalidad jurídica, profesionales colegiados, notarios, registradores y los empleados públicos en los trámites con su administración."
  },
  {
    "id": 142, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "El Registro Electrónico General de cada Administración Pública estará accesible para la presentación de documentos:",
    "options": ["De 9:00 h a 14:00 h en días laborables", "Todos los días del año durante las veinticuatro horas", "De lunes a viernes excluidos festivos", "Durante 12 horas al día"],
    "correct": 1, "law": "Ley 39/2015 LPACAP", "article": "Artículo 31.1 Ley 39/2015",
    "explanation": "El Registro Electrónico de cada Administración u Organismo garantizará que está accesible todos los días del año durante las veinticuatro horas."
  },
  {
    "id": 143, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "En el cómputo de plazos por días en el procedimiento administrativo, siempre que no se exprese que son naturales:",
    "options": ["Se entienden que son días hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos", "Se entienden naturales incluyendo todos los días", "Se cuentan los sábados pero se excluyen los domingos", "Son 20 días en todos los trámites"],
    "correct": 0, "law": "Ley 39/2015 LPACAP", "article": "Artículo 30.2 Ley 39/2015",
    "explanation": "Siempre que por Ley o en el Derecho de la Unión Europea no se exprese otro cómputo, cuando los plazos se señalen por días, se entiende que éstos son hábiles, excluyéndose del cómputo los sábados, los domingos y los declarados festivos."
  },
  {
    "id": 144, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "¿Cómo se computan los plazos fijados por MESES en la Ley 39/2015?",
    "options": ["Se cuentan siempre 30 días exactos", "De fecha a fecha, concluyendo el mismo día correlativo del mes de vencimiento", "El último día hábil del mes", "Siempre vencen en lunes"],
    "correct": 1, "law": "Ley 39/2015 LPACAP", "article": "Artículo 30.4 Ley 39/2015",
    "explanation": "Los plazos fijados por meses se computan de fecha a fecha: el plazo concluye el mismo día en que se produjo la notificación en el mes de vencimiento (o el último día del mes si en el de vencimiento no hubiera día equivalente)."
  },
  {
    "id": 145, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "¿Cuál es el plazo máximo ordinario que tiene la Administración para dictar y notificar resolución expresa si la norma reguladora del procedimiento no fija plazo?",
    "options": ["1 mes", "3 meses", "6 meses", "1 año"],
    "correct": 1, "law": "Ley 39/2015 LPACAP", "article": "Artículo 21.3 Ley 39/2015",
    "explanation": "Cuando las normas reguladoras de los procedimientos no fijen el plazo máximo, éste será de tres meses."
  },
  {
    "id": 146, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "Cuando una notificación electrónica esté disponible en la sede electrónica y el interesado no acceda a su contenido, ¿a los cuántos días naturales se entiende rechazada la notificación?",
    "options": ["A los 3 días", "A los 5 días", "A los 10 días naturales", "A los 15 días hábiles"],
    "correct": 2, "law": "Ley 39/2015 LPACAP", "article": "Artículo 43.2 Ley 39/2015",
    "explanation": "Cuando la notificación por medios electrónicos sea de carácter obligatorio, se entenderá rechazada cuando hayan transcurrido 10 días naturales desde la puesta a disposición de la notificación sin que se acceda a su contenido."
  },
  {
    "id": 147, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "Contra los actos administrativos que NO ponen fin a la vía administrativa cabe interponer:",
    "options": ["Recurso Potestativo de Reposición", "Recurso de Alzada ante el superior jerárquico", "Recurso Contencioso-Administrativo directo", "Recurso de Amparo"],
    "correct": 1, "law": "Ley 39/2015 LPACAP", "article": "Artículo 121.1 Ley 39/2015",
    "explanation": "Las resoluciones y actos de trámite cualificados que no pongan fin a la vía administrativa podrán ser recurridos en alzada ante el órgano superior jerárquico del que los dictó."
  },
  {
    "id": 148, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "¿Cuál es el plazo para interponer el Recurso Potestativo de Reposición si el acto administrativo es EXPRESO?",
    "options": ["10 días hábiles", "15 días naturales", "1 mes", "3 meses"],
    "correct": 2, "law": "Ley 39/2015 LPACAP", "article": "Artículo 124.1 Ley 39/2015",
    "explanation": "El plazo para la interposición del recurso potestativo de reposición será de un mes, si el acto fuera expreso."
  },
  {
    "id": 149, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "En el trámite de subsanación y mejora de la solicitud (art. 68), si la solicitud no reúne los requisitos exigidos, ¿qué plazo se concede al interesado para subsanar?",
    "options": ["5 días", "10 días hábiles", "15 días naturales", "1 mes"],
    "correct": 1, "law": "Ley 39/2015 LPACAP", "article": "Artículo 68.1 Ley 39/2015",
    "explanation": "Se requerirá al interesado para que, en un plazo de diez días, subsane la falta o acompañe los documentos preceptivos, con indicación de que si así no lo hiciera se le tendrá por desistido."
  },
  {
    "id": 150, "block": "especifico", "mission": 9, "topic": "Ley 39/2015 LPACAP",
    "question": "El trámite de AUDIENCIA a los interesados en el procedimiento administrativo se realiza en un plazo no inferior a 10 días ni superior a:",
    "options": ["15 días", "20 días", "30 días", "2 meses"],
    "correct": 0, "law": "Ley 39/2015 LPACAP", "article": "Artículo 82.2 Ley 39/2015",
    "explanation": "Los interesados podrán alegar y presentar los documentos que estimen pertinentes en un plazo no inferior a diez días ni superior a quince días."
  },

  # ==========================================
  # TEMA 10: DOCUMENTOS Y ARCHIVO EN DEFENSA (ID 151 a 160)
  # ==========================================
  {
    "id": 151, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "¿Qué documento administrativo se utiliza comúnmente para la comunicación escrita entre órganos que pertenecen a un MISMO Ministerio u organismo?",
    "options": ["El Oficio", "La Nota Interior", "El Bando", "El Real Decreto"],
    "correct": 1, "law": "Manual de Documentos Administrativos", "article": "Clasificación de Documentos Administrativos",
    "explanation": "La Nota Interior es el documento administrativo utilizado para las comunicaciones internas entre unidades u órganos pertenecientes a un mismo Departamento Ministerial."
  },
  {
    "id": 152, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "¿Qué documento administrativo se utiliza para comunicaciones entre órganos de DISTINTOS Ministerios o con autoridades y ciudadanos externos?",
    "options": ["La Nota Interior", "El Oficio", "La Providencia", "La Declaración responsable"],
    "correct": 1, "law": "Manual de Documentos Administrativos", "article": "Clasificación de Documentos Administrativos",
    "explanation": "El Oficio es el documento oficial por excelencia utilizado para la comunicación externa entre diferentes órganos de distintas Administraciones, Ministerios o con particulares."
  },
  {
    "id": 153, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "El documento administrativo de constancia que expide un funcionario competente para acreditar hechos, acuerdos o datos que constan en un expediente se denomina:",
    "options": ["Certificado (o Certificación)", "Resolución", "Notificación", "Dictamen"],
    "correct": 0, "law": "Manual de Documentos Administrativos", "article": "Documentos de Constancia",
    "explanation": "El Certificado es el documento administrativo expedido por órgano competente que acredita fehacientemente actos, situaciones o resoluciones que constan en los registros oficiales."
  },
  {
    "id": 154, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "En el sistema archivístico del Ministerio de Defensa, el archivo donde se conservan los documentos en tramitación activa o uso muy frecuente (hasta 5 años) se denomina:",
    "options": ["Archivo Histórico", "Archivo de Gestión (o de Oficina)", "Archivo Intermedio", "Archivo Central"],
    "correct": 1, "law": "Sistema Archivístico de la Defensa (RD 2598/1998)", "article": "Ciclo Vital de los Documentos",
    "explanation": "El Archivo de Gestión o de oficina custodia la documentación en su primera fase activa mientras dura la tramitación de los asuntos o su consulta administrativa diaria."
  },
  {
    "id": 155, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "El Archivo que coordina y recibe la documentación transferida desde los archivos de gestión de un mismo Departamento Ministerial una vez finalizado el trámite se denomina:",
    "options": ["Archivo Central", "Archivo General Militar", "Archivo de Indias", "Archivo Privado"],
    "correct": 0, "law": "Sistema Archivístico de la Defensa (RD 2598/1998)", "article": "Ciclo Vital de los Documentos",
    "explanation": "El Archivo Central de cada Ministerio recibe los expedientes transferidos por los archivos de gestión una vez concluido su trámite inmediato y conserva la documentación en fase semiactiva."
  },
  {
    "id": 156, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "La operación consistente en la eliminación reglamentada y autorizada de documentos que han perdido su valor probatorio y administrativo se denomina:",
    "options": ["Foliación", "Expurgo", "Catalogación", "Registro de salida"],
    "correct": 1, "law": "Normativa de Archivos de la AGE", "article": "Comisión Superior Calificadora de Documentos Administrativos",
    "explanation": "El expurgo es el proceso de eliminación física controlada de documentos que han perdido valor administrativo, legal e histórico, tras el preceptivo dictamen de la Comisión de Valoración Documental."
  },
  {
    "id": 157, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "El principio archivístico fundamental según el cual los documentos de un fondo deben conservarse en el orden en que fueron creados por la institución productora se denomina:",
    "options": ["Principio de caducidad", "Principio de procedencia y orden original", "Principio de jerarquía militar", "Principio de publicidad"],
    "correct": 1, "law": "Teoría Archivística de la AGE", "article": "Principios Básicos de Archivo",
    "explanation": "El principio de procedencia establece que cada documento debe estar situado en el fondo documental del que procede y respetar el orden original con el que se tramitó."
  },
  {
    "id": 158, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "El documento que refleja la manifestación de voluntad de un órgano administrativo que decide sobre el fondo de un asunto poniendo fin al procedimiento es:",
    "options": ["Una Nota Interior", "Una Resolución", "Un Acuse de recibo", "Una Carta de servicios"],
    "correct": 1, "law": "Manual de Documentos Administrativos", "article": "Documentos Decisorios",
    "explanation": "La Resolución es el acto administrativo definitivo que resuelve el fondo del procedimiento administrativo y produce plenos efectos jurídicos frente a terceros."
  },
  {
    "id": 159, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "¿Cuál es la función principal del Archivo General Militar de Segovia en el sistema archivístico de Defensa?",
    "options": ["Custodiar expedientes abiertos del año en curso", "Custodiar el archivo histórico militar con fondos del Ejército de Tierra desde el siglo XVIII", "Almacenar facturas de compras", "Tramitar nóminas de soldados"],
    "correct": 1, "law": "Sistema Archivístico de la Defensa (RD 2598/1998)", "article": "Archivos Históricos Militares",
    "explanation": "El Archivo General Militar de Segovia es el archivo histórico más antiguo de las Fuerzas Armadas españolas, custodio del patrimonio documental histórico del Ejército de Tierra."
  },
  {
    "id": 160, "block": "especifico", "mission": 10, "topic": "Documentación y Archivos en Defensa",
    "question": "El código alfanumérico que identifica unívocamente a cada órgano, centro directivo o unidad administrativa en el Directorio Común de la AGE se denomina:",
    "options": ["Código Postal", "Código DIR3", "Código IBAN", "Código CIF"],
    "correct": 1, "law": "Esquema Nacional de Interoperabilidad (ENI)", "article": "Directorio Común DIR3",
    "explanation": "El código DIR3 es el identificador único oficial que permite a los sistemas de registro y tramitación electrónica identificar con precisión a cada unidad u oficina de la Administración pública española."
  }
]

# Leer el archivo questions.js original
with open("questions.js", "r", encoding="utf-8") as f:
    content = f.read()

# Convertir el array a texto JS formateado
js_items = []
for q in NEW_QUESTIONS:
    opts_str = ",\n      ".join([f'"{opt}"' for opt in q["options"]])
    item_str = f"""  {{
    id: {q["id"]},
    block: "{q["block"]}",
    mission: {q["mission"]},
    topic: "{q["topic"]}",
    question: "{q["question"]}",
    options: [
      {opts_str}
    ],
    correct: {q["correct"]},
    law: "{q["law"]}",
    article: "{q["article"]}",
    explanation: "{q["explanation"]}"
  }}"""
    js_items.append(item_str)

full_addition = ",\n\n  // ==========================================\n  // BANCO AMPLIADO 100 PREGUNTAS OFICIALES E1 (ID 61 A 160)\n  // ==========================================\n" + ",\n".join(js_items)

# Reemplazar antes del cierre del array ];
if "];" in content:
    # Cortar antes del último ];
    last_idx = content.rfind("];")
    new_content = content[:last_idx].rstrip() + full_addition + "\n];\n"
    with open("questions.js", "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"✅ Se han añadido con éxito 100 preguntas oficiales adicionales. Total estimado: {60 + len(NEW_QUESTIONS)} preguntas.")
else:
    print("❌ No se encontró el cierre ]; en questions.js")
