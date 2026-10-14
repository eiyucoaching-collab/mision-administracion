/**
 * ENTRENADOR DE LITERALIDAD - CLOZE DELETION
 * Misión Administración (Opo-Defensa E1)
 * 
 * Textos normativos literales verificados de la Constitución, leyes de la AGE,
 * IV CUAGE, igualdad, seguridad militar, valija, reprografía, correos y PRL.
 * Las palabras clave entre {{...}} representan huecos mnemotécnicos interactivos.
 */

export const CLOZE_BANK = [
  // --- TEMA 1: CONSTITUCIÓN ESPAÑOLA ---
  {
    id: 'cloze_t1_01',
    topicId: 1,
    topicName: 'Tema 1: Constitución Española de 1978',
    norma: 'Constitución Española (art. 1.1)',
    preguntaGuia: 'Valores superiores del ordenamiento jurídico',
    text: 'España se constituye en un Estado {{social y democrático de Derecho}}, que propugna como valores superiores de su ordenamiento jurídico la {{libertad}}, la {{justicia}}, la {{igualdad}} y el {{pluralismo político}}.',
    explanation: 'El art. 1.1 CE fija 4 valores superiores. El pluralismo político es uno de ellos, no el pluralismo territorial.'
  },
  {
    id: 'cloze_t1_02',
    topicId: 1,
    topicName: 'Tema 1: Constitución Española de 1978',
    norma: 'Constitución Española (art. 1.2 y 1.3)',
    preguntaGuia: 'Soberanía nacional y forma política',
    text: 'La soberanía nacional reside en el {{pueblo español}}, del que emanan los poderes del Estado. La forma política del Estado español es la {{Monarquía parlamentaria}}.',
    explanation: 'Trampa clásica: la monarquía parlamentaria es la forma política del Estado, mientras que la forma de Estado es social y democrático de Derecho.'
  },
  {
    id: 'cloze_t1_03',
    topicId: 1,
    topicName: 'Tema 1: Constitución Española de 1978',
    norma: 'Constitución Española (art. 53.2)',
    preguntaGuia: 'Ámbito de protección del Recurso de Amparo',
    text: 'Cualquier ciudadano podrá recabar la tutela de las libertades y derechos reconocidos en el artículo 14 y la Sección primera del Capítulo segundo (artículos {{15 a 29}}) ante los Tribunales ordinarios por un procedimiento basado en los principios de {{preferencia y sumariedad}} y, en su caso, a través del recurso de amparo ante el {{Tribunal Constitucional}}. Este último recurso será aplicable a la objeción de conciencia reconocida en el artículo {{30}}.',
    explanation: 'El recurso de amparo protege el art. 14, los arts. 15 al 29 y la objeción de conciencia del art. 30.2.'
  },
  {
    id: 'cloze_t1_04',
    topicId: 1,
    topicName: 'Tema 1: Constitución Española de 1978',
    norma: 'Constitución Española (art. 116)',
    preguntaGuia: 'Plazos de los estados de alarma y excepción',
    text: 'El estado de alarma será declarado por el Gobierno mediante decreto acordado en Consejo de Ministros por un plazo máximo de {{15 días}}, dando cuenta al Congreso. El estado de excepción será declarado por el Gobierno previa autorización del Congreso; la autorización y proclamación determinará el plazo, que no podrá exceder de {{30 días}}, prorrogables por otro plazo igual.',
    explanation: 'Alarma: máx 15 días (prórroga requiere autorización del Congreso). Excepción: máx 30 días prorrogable por otros 30 días.'
  },

  // --- TEMA 2: GOBIERNO Y ADMINISTRACIÓN GENERAL DEL ESTADO ---
  {
    id: 'cloze_t2_01',
    topicId: 2,
    topicName: 'Tema 2: Gobierno y Administración General del Estado',
    norma: 'Ley 40/2015 (art. 55) y Ley 3/2015',
    preguntaGuia: 'Diferenciación entre Órganos Superiores y Órganos Directivos',
    text: 'En la organización central son órganos superiores los {{Ministros}} y los {{Secretarios de Estado}}. Son órganos directivos los {{Subsecretarios}} y Secretarios Generales, los {{Secretarios Generales Técnicos}} y Directores Generales, y los {{Subdirectores Generales}}. Todos ellos tienen la consideración de alto cargo excepto los {{Subdirectores Generales}}.',
    explanation: 'El Subdirector General es órgano directivo pero NO tiene consideración legal de alto cargo según el art. 1 de la Ley 3/2015.'
  },
  {
    id: 'cloze_t2_02',
    topicId: 2,
    topicName: 'Tema 2: Gobierno y Administración General del Estado',
    norma: 'Ley 40/2015 (art. 71 y 73)',
    preguntaGuia: 'Rango y nombramiento de Delegados y Subdelegados del Gobierno',
    text: 'Los Delegados del Gobierno representan al Gobierno de la Nación en el territorio de las Comunidades Autónomas, tienen rango de {{Subsecretario}} y son nombrados por {{Real Decreto del Consejo de Ministros}} a propuesta del Presidente del Gobierno. Los Subdelegados del Gobierno en las provincias tienen nivel de {{Subdirector General}} y son nombrados por el {{Delegado del Gobierno}} por libre designación entre funcionarios de carrera del Subgrupo {{A1}}.',
    explanation: 'Delegado: rango Subsecretario (nombra Consejo de Ministros). Subdelegado: rango Subdirector General (nombra Delegado del Gobierno, funcionario A1).'
  },

  // --- TEMA 3: PERSONAL LABORAL Y CONVENIO ÚNICO (IV CUAGE) ---
  {
    id: 'cloze_t3_01',
    topicId: 3,
    topicName: 'Tema 3: Personal Laboral y Convenio Único (IV CUAGE)',
    norma: 'IV CUAGE (art. 32.1) y Base 7.9 Convocatoria',
    preguntaGuia: 'Periodos de prueba según el grupo profesional',
    text: 'El periodo de prueba para el personal con titulación de los Grupos E1 y E2 es de {{1 mes}}. Para el personal sin titulación del Grupo profesional {{E0}} es de {{15 días laborables}}. Para el Grupo 3 (M1/M2) es de {{3 meses}}, y para los Grupos 1 y 2 es de {{6 meses}}.',
    explanation: 'Los 15 días laborables son exclusivos del Grupo E0 (sin titulación). E1 y E2 tienen 1 mes completo.'
  },
  {
    id: 'cloze_t3_02',
    topicId: 3,
    topicName: 'Tema 3: Personal Laboral y Convenio Único (IV CUAGE)',
    norma: 'TREBEP (art. 97) y IV CUAGE (art. 64.2)',
    preguntaGuia: 'Prescripción de faltas disciplinarias del personal laboral',
    text: 'Las faltas muy graves prescribirán a los {{3 años}}, las graves a los {{2 años}} y las leves a los {{6 meses}}. Las sanciones impuestas por faltas muy graves prescribirán a los {{3 años}}, las graves a los {{2 años}} y las leves al {{año}}.',
    explanation: 'Prescripción de faltas: 3 años (muy graves), 2 años (graves), 6 meses (leves). Prescripción de sanciones: 3 años, 2 años y 1 año.'
  },

  // --- TEMA 4: POLÍTICAS DE IGUALDAD Y DISCAPACIDAD ---
  {
    id: 'cloze_t4_01',
    topicId: 4,
    topicName: 'Tema 4: Políticas de Igualdad y Discapacidad',
    norma: 'Ley Orgánica 3/2007 (DA 1ª) y RDL 1/2013 (art. 59)',
    preguntaGuia: 'Presencia equilibrada y reserva de plazas por discapacidad',
    text: 'Se entiende por composición equilibrada la presencia de mujeres y hombres de forma que las personas de cada sexo no superen el {{60%}} ni sean menos del {{40%}}. En las ofertas de empleo público se reservará un cupo no inferior al {{7%}} de las vacantes para ser cubiertas entre personas con discapacidad, de modo que al menos el {{2%}} de las plazas sea cubierto por personas con discapacidad intelectual.',
    explanation: 'Composición equilibrada: banda 40%-60%. Cuota discapacidad OEP: 7% total, reservando el 2% específico para discapacidad intelectual.'
  },

  // --- TEMA 5: CONTROL DE ACCESOS Y SEGURIDAD EN EDIFICIOS MILITARES ---
  {
    id: 'cloze_t5_01',
    topicId: 5,
    topicName: 'Tema 5: Control de Accesos y Seguridad en Edificios',
    norma: 'Buenas Prácticas Operativas y Seguridad en Dependencias Oficiales',
    preguntaGuia: 'Procedimiento de identificación en control de acceso',
    text: 'El personal que accede a una dependencia militar sin acreditación oficial debe identificarse exhibiendo {{DNI, pasaporte o carné de conducir en vigor}}. Se anotará su nombre, documento, hora de entrada y {{persona o departamento de destino}} en el {{Libro de Registro de Visitas}}, portando en lugar visible la {{tarjeta de visitante}}.',
    explanation: 'El registro de visitas garantiza la trazabilidad y la seguridad física del recinto militar.'
  },

  // --- TEMA 6: PAQUETERÍA Y VALIJA DIPLOMÁTICA/MILITAR ---
  {
    id: 'cloze_t6_01',
    topicId: 6,
    topicName: 'Tema 6: Paquetería y Valija Oficial',
    norma: 'Manual Operativo de Registro y Valija',
    preguntaGuia: 'Inspección de paquetería y detección de bultos sospechosos',
    text: 'Toda correspondencia o paquetería recibida debe ser examinada mediante {{escáner de rayos X}} o detector de metales. Si se detecta un paquete sospechoso (olor extraño, cables, manchas grasientas, peso descompensado), queda {{terminantemente prohibido manipularlo, abrirlo o moverlo}}; se debe {{aislar la zona}} y avisar de inmediato a la {{seguridad militar o Fuerzas y Cuerpos de Seguridad}}.',
    explanation: 'Regla de oro: ante bulto sospechoso, NUNCA mover ni manipular; aislar, evacuar y alertar.'
  },
  {
    id: 'cloze_t6_02',
    topicId: 6,
    topicName: 'Tema 6: Paquetería y Valija Oficial',
    norma: 'Régimen de Valija Oficial y Convenio de Viena',
    preguntaGuia: 'Seguridad y documentación de la Valija',
    text: 'La valija oficial o diplomática tiene carácter {{inviolable}} y no podrá ser abierta ni retenida. El envío de valija debe ir acompañado de una {{hoja de remisión por duplicado}} donde consten los bultos remitidos, y el cierre debe asegurarse mediante {{precinto numerado}} intacto que coincida con el acta de entrega.',
    explanation: 'La valija oficial viaja precintada con numeración única y relación por duplicado para acuse de recibo.'
  },

  // --- TEMA 7: REPROGRAFÍA Y FORMATOS DE PAPEL DIN ---
  {
    id: 'cloze_t7_01',
    topicId: 7,
    topicName: 'Tema 7: Reprografía y Formatos de Papel DIN',
    norma: 'Norma ISO 216 / DIN 476',
    preguntaGuia: 'Dimensiones y proporciones de la serie DIN A',
    text: 'El formato base de la serie DIN A es el {{DIN A0}}, cuya superficie es exactamente de {{1 metro cuadrado}} y sus medidas son {{841 x 1189 milímetros}}. El formato estándar de oficina es el {{DIN A4}}, con dimensiones de {{210 x 297 milímetros}}. La relación entre ancho y largo en toda la serie es de {{1 : raíz de 2}}.',
    explanation: 'Un pliego A0 cortado por la mitad genera dos A1, luego cuatro A2, ocho A3 y 16 hojas DIN A4.'
  },
  {
    id: 'cloze_t7_02',
    topicId: 7,
    topicName: 'Tema 7: Reprografía y Formatos de Papel DIN',
    norma: 'Norma DIN 66399 (Destrucción de Información)',
    preguntaGuia: 'Niveles de seguridad en destructoras de papel',
    text: 'La norma DIN 66399 clasifica la destrucción de soportes de papel (categoría P) en {{7 niveles de seguridad}} (de P-1 a P-7). Para documentos administrativos generales se exige nivel {{P-3 o P-4}}, mientras que para información clasificada o secreto militar se exigen niveles de máxima seguridad {{P-6 o P-7}} con partículas microscópicas.',
    explanation: 'P-1 a P-7: cuanto más alto el número, menor es el tamaño de partícula tras la trituración.'
  },

  // --- TEMA 8: CORRESPONDENCIA, BUROFAX Y CORREOS ---
  {
    id: 'cloze_t8_01',
    topicId: 8,
    topicName: 'Tema 8: Correspondencia, Burofax y Correos',
    norma: 'Ley 43/2010 del Servicio Postal y Reglamento Postal (RD 1829/1999)',
    preguntaGuia: 'Límites de peso y plazos de recogida',
    text: 'El peso máximo admitido para una carta ordinaria o certificada en el servicio postal universal es de {{2 kilogramos}}. El paquete azul o postal admite envíos de hasta {{20 kilogramos}}. Si un envío notificado no puede ser entregado a domicilio, permanecerá en lista de la oficina postal durante un plazo de {{15 días naturales}}.',
    explanation: 'Carta: hasta 2 kg. Paquete postal: hasta 20 kg. Depósito en oficina tras aviso: 15 días naturales.'
  },
  {
    id: 'cloze_t8_02',
    topicId: 8,
    topicName: 'Tema 8: Correspondencia, Burofax y Correos',
    norma: 'Reglamento Postal y Medios Telemáticos Fechados',
    preguntaGuia: 'Valor probatorio del Burofax',
    text: 'El Burofax es un servicio postal que acredita fehacientemente tanto la {{entrega fehaciente}} al destinatario como el {{contenido literal íntegro}} del documento remitido, mediante la emisión de una {{certificación de texto}} y un {{acuse de recibo}} firmado.',
    explanation: 'A diferencia de la carta certificada (que solo prueba envío y recepción), el burofax certifica el texto exacto enviado.'
  },

  // --- TEMA 9: RECADOS OFICIALES Y SECRETOS OFICIALES ---
  {
    id: 'cloze_t9_01',
    topicId: 9,
    topicName: 'Tema 9: Recados Oficiales y Secretos Oficiales',
    norma: 'Ley 9/1968 sobre Secretos Oficiales',
    preguntaGuia: 'Categorías legales y autoridades competentes',
    text: 'Los asuntos, actos o documentos clasificados solo pueden ser calificados en dos categorías: {{SECRETO}} y {{RESERVADO}}. La facultad para calificar de SECRETO corresponde exclusivamente al {{Consejo de Ministros}}. La calificación de RESERVADO corresponde al Consejo de Ministros y a la {{Junta de Jefes de Estado Mayor}}.',
    explanation: 'Solo existen dos clasificaciones formales en la Ley 9/1968: Secreto y Reservado.'
  },
  {
    id: 'cloze_t9_02',
    topicId: 9,
    topicName: 'Tema 9: Recados Oficiales y Secretos Oficiales',
    norma: 'Reglamento de Seguridad de Información Clasificada',
    preguntaGuia: 'Embalaje y transporte de información clasificada',
    text: 'Para el traslado manual de documentación clasificada se utilizará el sistema de {{doble sobre opaco}}. El sobre interior llevará estampada la {{clasificación de seguridad}} correspondiente y el sello de origen. El sobre exterior debe ser completamente {{neutro, sin marcas de confidencialidad}} para no revelar la naturaleza de su contenido a terceros.',
    explanation: 'El sobre exterior NUNCA lleva el sello de Secreto; debe ser neutro y opaco para no llamar la atención.'
  },

  // --- TEMA 10: PREVENCIÓN DE RIESGOS LABORALES Y CONDICIONES AMBIENTALES ---
  {
    id: 'cloze_t10_01',
    topicId: 10,
    topicName: 'Tema 10: Prevención de Riesgos Laborales',
    norma: 'Real Decreto 486/1997 (Anexos I y III)',
    preguntaGuia: 'Parámetros de temperatura, humedad y dimensiones',
    text: 'En los locales de trabajo cerrados donde se realicen trabajos sedentarios propios de oficinas, la temperatura estará comprendida entre {{17 ºC y 27 ºC}}. La humedad relativa estará comprendida entre el {{30% y el 70%}} (entre el 45% y el 65% si existe riesgo de electricidad estática). La altura mínima de los techos en locales generales será de {{3 metros}} (2,5 metros en oficinas y despachos de servicios).',
    explanation: 'Oficina (sedentario): 17 a 27 ºC. Trabajos ligeros: 14 a 25 ºC. Humedad: 30 a 70%. Altura: 3 m (despacho: 2,5 m).'
  }
];

export const CLOZE_EXPANSION_PACK = [
  {
    id: "cloze-l39-notificaciones-42",
    topicId: 7,
    temaId: 7,
    topicName: "Tema 7: Tratamiento de la Correspondencia y Envíos Postales",
    titulo: "Ley 39/2015 (Art. 42.2) - Práctica de notificaciones en papel",
    preguntaGuia: "Práctica de notificaciones en papel y reglas horarias",
    referencia: "Art. 42.2 Ley 39/2015 LPACAP",
    norma: "Art. 42.2 Ley 39/2015 LPACAP",
    texto: "Cuando la notificación se practique en el domicilio del interesado, de no hallarse presente éste, podrá hacerse cargo cualquier persona mayor de {{14 años}} que se encuentre en el domicilio y haga constar su identidad. Si nadie se hiciera cargo, se repetirá el intento por {{una sola vez}} y en una hora distinta dentro de los {{tres días siguientes}}. En caso de que el primer intento se haya realizado antes de las {{quince horas}}, el segundo intento deberá realizarse después de las {{quince horas}} y viceversa, dejando en todo caso al menos un margen de diferencia de {{tres horas}} entre ambos intentos.",
    text: "Cuando la notificación se practique en el domicilio del interesado, de no hallarse presente éste, podrá hacerse cargo cualquier persona mayor de {{14 años}} que se encuentre en el domicilio y haga constar su identidad. Si nadie se hiciera cargo, se repetirá el intento por {{una sola vez}} y en una hora distinta dentro de los {{tres días siguientes}}. En caso de que el primer intento se haya realizado antes de las {{quince horas}}, el segundo intento deberá realizarse después de las {{quince horas}} y viceversa, dejando en todo caso al menos un margen de diferencia de {{tres horas}} entre ambos intentos.",
    explanation: "Doble requisito: cambio de turno respecto a las 15:00 h y al menos 3 horas de margen entre intentos."
  },
  {
    id: "cloze-ivcuage-prescripcion-faltas",
    topicId: 3,
    temaId: 3,
    topicName: "Tema 3: Personal Laboral al Servicio de la AGE (IV CUAGE)",
    titulo: "IV Convenio Único AGE - Prescripción de Faltas Disciplinarias",
    preguntaGuia: "Prescripción de faltas leves, graves y muy graves",
    referencia: "Régimen Disciplinario IV CUAGE y Art. 97 TREBEP",
    norma: "Régimen Disciplinario IV CUAGE y Art. 97 TREBEP",
    texto: "Las faltas {{leves}} prescribirán a los {{diez días}}; las faltas {{graves}} a los {{veinte días}}, y las {{muy graves}} a los {{sesenta días}}, contados a partir de la fecha en que la Administración tuvo conocimiento de su comisión y, en todo caso, a los {{seis meses}} de haberse cometido.",
    text: "Las faltas {{leves}} prescribirán a los {{diez días}}; las faltas {{graves}} a los {{veinte días}}, y las {{muy graves}} a los {{sesenta días}}, contados a partir de la fecha en que la Administración tuvo conocimiento de su comisión y, en todo caso, a los {{seis meses}} de haberse cometido.",
    explanation: "Leves: 10 días; graves: 20 días; muy graves: 60 días desde conocimiento, y en todo caso a los 6 meses."
  },
  {
    id: "cloze-rd486-termohigrometrico",
    topicId: 10,
    temaId: 10,
    topicName: "Tema 10: Prevención de Riesgos Laborales",
    titulo: "RD 486/1997 (Anexo III) - Temperatura y Humedad en Locales de Trabajo",
    preguntaGuia: "Rangos termohigrométricos en oficinas y riesgo de estática",
    referencia: "Anexo III.3 del Real Decreto 486/1997",
    norma: "Anexo III.3 del Real Decreto 486/1997",
    texto: "La temperatura de los locales donde se realicen trabajos sedentarios propios de oficinas o similares estará comprendida entre {{17 y 27 °C}}. La temperatura de los locales donde se realicen trabajos ligeros estará comprendida entre {{14 y 25 °C}}. La humedad relativa estará comprendida entre el {{30 y el 70 por 100}}, excepto en los locales donde existan riesgos por electricidad estática en los que el límite inferior será el {{50 por 100}}.",
    text: "La temperatura de los locales donde se realicen trabajos sedentarios propios de oficinas o similares estará comprendida entre {{17 y 27 °C}}. La temperatura de los locales donde se realicen trabajos ligeros estará comprendida entre {{14 y 25 °C}}. La humedad relativa estará comprendida entre el {{30 y el 70 por 100}}, excepto en los locales donde existan riesgos por electricidad estática en los que el límite inferior será el {{50 por 100}}.",
    explanation: "Electricidad estática eleva el límite inferior de humedad del 30% al 50%."
  },
  {
    id: "cloze-rd486-dimensiones",
    topicId: 10,
    temaId: 10,
    topicName: "Tema 10: Prevención de Riesgos Laborales",
    titulo: "RD 486/1997 (Anexo I) - Dimensiones Mínimas de los Locales",
    preguntaGuia: "Dimensiones y volúmenes mínimos por trabajador",
    referencia: "Anexo I.2 del Real Decreto 486/1997",
    norma: "Anexo I.2 del Real Decreto 486/1997",
    texto: "Las dimensiones de los locales de trabajo deberán permitir que los trabajadores realicen su trabajo sin riesgos: {{3 metros}} de altura desde el piso hasta el techo, No obstante, en locales comerciales, de servicios, oficinas y despachos, la altura podrá reducirse a {{2,5 metros}}. Asimismo, deberán existir {{2 metros cuadrados}} de superficie libre por trabajador y {{10 metros cúbicos}}, no ocupados, por trabajador.",
    text: "Las dimensiones de los locales de trabajo deberán permitir que los trabajadores realicen su trabajo sin riesgos: {{3 metros}} de altura desde el piso hasta el techo, No obstante, en locales comerciales, de servicios, oficinas y despachos, la altura podrá reducirse a {{2,5 metros}}. Asimismo, deberán existir {{2 metros cuadrados}} de superficie libre por trabajador y {{10 metros cúbicos}}, no ocupados, por trabajador.",
    explanation: "Altura: 3 m (2,5 m en oficinas); Superficie: 2 m² libres; Volumen: 10 m³ no ocupados por trabajador."
  },
  {
    id: "cloze-iso216-formatos-papel",
    topicId: 8,
    temaId: 8,
    topicName: "Tema 8: Reprografía, Encuadernación y Formatos Normalizados",
    titulo: "Norma ISO 216 / DIN 476 - Dimensiones Serie A y Peso Base",
    preguntaGuia: "Formatos de papel normalizados ISO 216 / DIN 476",
    referencia: "Norma UNE-EN ISO 216 (DIN 476)",
    norma: "Norma UNE-EN ISO 216 (DIN 476)",
    texto: "El formato base de la serie principal es el {{A0}}, cuya superficie equivale a {{1 metro cuadrado}} y sus dimensiones exactas son {{841 x 1189 mm}}. El formato estándar de oficina {{A4}} mide {{210 x 297 mm}}, el formato {{A3}} mide {{297 x 420 mm}} y el formato {{A5}} mide {{148 x 210 mm}}. La serie complementaria {{B}} posee medidas intermedias (promedios geométricos de la serie A) y la serie {{C}} se destina exclusivamente a {{sobres y carpetas}}.",
    text: "El formato base de la serie principal es el {{A0}}, cuya superficie equivale a {{1 metro cuadrado}} y sus dimensiones exactas son {{841 x 1189 mm}}. El formato estándar de oficina {{A4}} mide {{210 x 297 mm}}, el formato {{A3}} mide {{297 x 420 mm}} y el formato {{A5}} mide {{148 x 210 mm}}. La serie complementaria {{B}} posee medidas intermedias (promedios geométricos de la serie A) y la serie {{C}} se destina exclusivamente a {{sobres y carpetas}}.",
    explanation: "Serie A: papel general; Serie B: pósteres/pasaportes; Serie C: sobres y carpetas diseñados para albergar formatos A."
  },
  {
    id: "cloze-correos-pesos-dimensiones",
    topicId: 7,
    temaId: 7,
    topicName: "Tema 7: Tratamiento de la Correspondencia y Envíos Postales",
    titulo: "Servicios Postales - Pesos y Dimensiones de Cartas y Paquetería",
    preguntaGuia: "Límites de peso y dimensiones en cartas de Correos",
    referencia: "Condiciones Generales de Productos de Correos",
    norma: "Condiciones Generales de Productos de Correos",
    texto: "Tanto la carta ordinaria como la carta certificada tienen un peso máximo admisible de {{2 kilogramos}}. En formato sobre o caja para cartas, la suma de largo, ancho y alto no debe superar los {{90 cm}}, sin que la mayor dimensión exceda de {{60 cm}}. En formato rollo o tubo, la suma del largo más dos veces el diámetro no superará los {{104 cm}}, sin que la mayor dimensión supere los {{90 cm}}.",
    text: "Tanto la carta ordinaria como la carta certificada tienen un peso máximo admisible de {{2 kilogramos}}. En formato sobre o caja para cartas, la suma de largo, ancho y alto no debe superar los {{90 cm}}, sin que la mayor dimensión exceda de {{60 cm}}. En formato rollo o tubo, la suma del largo más dos veces el diámetro no superará los {{104 cm}}, sin que la mayor dimensión supere los {{90 cm}}.",
    explanation: "Cartas: máx 2 kg. Sobre/caja: L+A+A <= 90 cm (máx 60 cm). Rollo: L+2D <= 104 cm (máx 90 cm)."
  }
];

// Integrar automáticamente los extractos de expansión en el banco principal
CLOZE_BANK.push(...CLOZE_EXPANSION_PACK);

