/**
 * ESQUEMAS VISUALES Y MAPAS CONCEPTUALES VECTORIALES (SVG / CSS)
 * Diseñados para fijación visual de alto impacto en E1 Defensa / AGE.
 */

export const ESQUEMAS = [
  {
    id: "age",
    topicId: 2,
    badge: "Tema 2: Ley 40/2015",
    title: "Estructura Jerárquica de la Administración General del Estado (AGE)",
    subtitle: "Diferenciación estricta entre Órganos Superiores, Directivos y Territoriales con condición de Alto Cargo",
    description: "Esquema esencial para responder sin dudar las preguntas sobre nombramientos, rangos y quién ostenta la condición legal de Alto Cargo.",
    renderSvg: () => `
      <div class="w-full overflow-x-auto py-2">
        <div class="min-w-[700px] bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <!-- NIVEL 1: GOBIERNO -->
          <div class="flex flex-col items-center">
            <div class="w-full max-w-md bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl p-4 text-center shadow-lg shadow-sky-500/20 border border-sky-400/40">
              <span class="text-[10px] font-black uppercase tracking-widest text-sky-100 bg-sky-950/40 px-2.5 py-0.5 rounded-full">Constitución / Ley 50/1997</span>
              <h3 class="text-lg font-black text-white mt-1">PRESIDENTE DEL GOBIERNO Y CONSEJO DE MINISTROS</h3>
              <p class="text-xs text-sky-100/90 mt-0.5">Órgano colegiado supremo de dirección política y administrativa</p>
            </div>
            <div class="w-0.5 h-6 bg-slate-700"></div>
          </div>

          <!-- NIVEL 2: ORGANIZACIÓN CENTRAL (ÓRGANOS SUPERIORES VS DIRECTIVOS) -->
          <div class="grid grid-cols-2 gap-6 relative">
            <!-- COLUMNA IZQUIERDA: ÓRGANOS SUPERIORES -->
            <div class="bg-slate-900/90 border-2 border-indigo-500/50 rounded-2xl p-5 space-y-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black uppercase text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                  ÓRGANOS SUPERIORES
                </span>
                <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ALTOS CARGOS
                </span>
              </div>
              <p class="text-xs text-slate-300">Establecen los planes de actuación de la organización.</p>
              
              <div class="space-y-2.5 pt-1">
                <div class="bg-slate-950 border border-indigo-500/30 rounded-xl p-3">
                  <div class="font-extrabold text-white text-sm">MINISTROS</div>
                  <div class="text-[11px] text-slate-400">Jefes superiores del Departamento y miembros del Consejo de Ministros.</div>
                </div>
                <div class="bg-slate-950 border border-indigo-500/30 rounded-xl p-3">
                  <div class="font-extrabold text-white text-sm">SECRETARIOS DE ESTADO</div>
                  <div class="text-[11px] text-slate-400">Responsables directos de la acción del Gobierno en un sector específico.</div>
                </div>
              </div>
            </div>

            <!-- COLUMNA DERECHA: ÓRGANOS DIRECTIVOS -->
            <div class="bg-slate-900/90 border-2 border-sky-500/50 rounded-2xl p-5 space-y-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                  ÓRGANOS DIRECTIVOS
                </span>
                <span class="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  EJECUCIÓN DE PLANES
                </span>
              </div>
              <p class="text-xs text-slate-300">Desarrollo y ejecución de las directrices ministeriales.</p>

              <div class="space-y-2 pt-1 text-xs">
                <div class="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-white">SUBSECRETARIOS</span>
                    <span class="text-[10px] text-slate-400 block">Jefatura superior del personal del Ministerio.</span>
                  </div>
                  <span class="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Alto Cargo</span>
                </div>
                <div class="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-white">SECRETARIOS GENERALES</span>
                    <span class="text-[10px] text-slate-400 block">Rango de Subsecretario (órgano excepcional).</span>
                  </div>
                  <span class="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Alto Cargo</span>
                </div>
                <div class="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-white">SECRETARIOS GENERALES TÉCNICOS / DIRECTORES GENERALES</span>
                    <span class="text-[10px] text-slate-400 block">Gestión de áreas homogéneas del Ministerio.</span>
                  </div>
                  <span class="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Alto Cargo</span>
                </div>
                <div class="bg-rose-950/20 border-2 border-rose-500/50 rounded-xl p-2.5 flex items-center justify-between">
                  <div>
                    <span class="font-black text-rose-300">SUBDIRECTORES GENERALES</span>
                    <span class="text-[10px] text-slate-400 block">Funcionarios de carrera Subgrupo A1 con 2 años.</span>
                  </div>
                  <span class="text-[10px] text-rose-400 font-black bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30 uppercase">
                    ⚠️ NO ES ALTO CARGO
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- NIVEL 3: ORGANIZACIÓN TERRITORIAL (PERIFÉRICA) -->
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase text-amber-400 tracking-wider">
                ORGANIZACIÓN TERRITORIAL DE LA AGE (DELEGACIONES Y SUBDELEGACIONES)
              </span>
              <span class="text-[11px] text-slate-400 font-mono">Arts. 69 a 75 Ley 40/2015</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-black text-white text-sm">DELEGADO DEL GOBIERNO (Comunidad Autónoma)</span>
                  <span class="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">Rango Subsecretario</span>
                </div>
                <p class="text-xs text-slate-300">
                  Representa al Gobierno de la Nación en la Comunidad Autónoma.
                </p>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                  ⚖️ Nombrado por <strong>Real Decreto del Consejo de Ministros</strong> a propuesta del Presidente del Gobierno.
                </div>
              </div>

              <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-black text-white text-sm">SUBDELEGADO DEL GOBIERNO (Provincia)</span>
                  <span class="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">Rango Subdirector General</span>
                </div>
                <p class="text-xs text-slate-300">
                  Bajo la dependencia del Delegado del Gobierno en cada provincia.
                </p>
                <div class="text-[11px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                  ⚖️ Nombrado por <strong>libre designación por el Delegado del Gobierno</strong> entre funcionarios A1.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "reformas_ce",
    topicId: 1,
    badge: "Tema 1: Título X CE",
    title: "Comparativa de las Vías de Reforma Constitucional (Arts. 167 y 168)",
    subtitle: "Procedimiento Ordinario vs. Procedimiento Agravado y sus mayorías cualificadas",
    description: "Cuadro sinóptico de doble columna para no dudar entre las mayorías de 3/5 y 2/3, la disolución de Cortes y el carácter del referéndum.",
    renderSvg: () => `
      <div class="w-full overflow-x-auto py-2">
        <div class="min-w-[700px] bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div class="text-center max-w-xl mx-auto space-y-1">
            <span class="text-xs font-black uppercase text-sky-400 tracking-wider">Título X de la Constitución Española de 1978</span>
            <h3 class="text-lg sm:text-xl font-black text-white">¿Ordinario (Art. 167) o Agravado (Art. 168)?</h3>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <!-- VÍA ORDINARIA -->
            <div class="bg-slate-900/90 border-2 border-sky-500/50 rounded-2xl p-5 space-y-4 shadow-lg">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <span class="text-sm font-black text-sky-400">PROCEDIMIENTO ORDINARIO</span>
                <span class="text-xs font-mono font-bold bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded">Artículo 167 CE</span>
              </div>

              <div class="space-y-3 text-xs text-slate-300">
                <div>
                  <span class="font-bold text-white block mb-0.5">Ámbito de aplicación:</span>
                  Cualquier reforma constitucional que NO afecte a materias especialmente protegidas.
                </div>

                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span class="font-bold text-amber-300 block mb-1">1ª Mayoría Requerida:</span>
                  <span class="text-base font-black text-white">3/5 de cada Cámara</span>
                  <div class="text-[11px] text-slate-400 mt-0.5">3/5 de los Diputados y 3/5 de los Senadores.</div>
                </div>

                <div>
                  <span class="font-bold text-white block mb-0.5">Falta de acuerdo inicial:</span>
                  Se crea una <strong>Comisión Mixta Paritaria</strong> de Diputados y Senadores.
                </div>

                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span class="font-bold text-white block mb-0.5">Vía subsidiaria si el texto no logra 3/5 en el Senado:</span>
                  El Congreso puede aprobarlo por <strong>mayoría de 2/3</strong>, siempre que el Senado haya alcanzado al menos <strong>mayoría absoluta</strong>.
                </div>

                <div class="bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/30">
                  <span class="font-black text-indigo-300 block mb-0.5">Referéndum:</span>
                  <span class="font-bold text-white">POTESTATIVO (No obligatorio)</span>
                  <div class="text-[11px] text-slate-300 mt-1">
                    Solo se celebra si lo solicita una <strong>décima parte (1/10)</strong> de los miembros de cualquiera de las Cámaras dentro de los <strong>15 días siguientes</strong> a su aprobación.
                  </div>
                </div>
              </div>
            </div>

            <!-- VÍA AGRAVADA -->
            <div class="bg-slate-900/90 border-2 border-rose-500/50 rounded-2xl p-5 space-y-4 shadow-lg">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <span class="text-sm font-black text-rose-400">PROCEDIMIENTO AGRAVADO</span>
                <span class="text-xs font-mono font-bold bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded">Artículo 168 CE</span>
              </div>

              <div class="space-y-3 text-xs text-slate-300">
                <div class="bg-rose-950/20 p-2.5 rounded-xl border border-rose-500/30">
                  <span class="font-bold text-rose-300 block mb-0.5">Ámbito protegido obligatorio:</span>
                  1. Revisión TOTAL de la Constitución.<br>
                  2. <strong>Título Preliminar</strong> (arts. 1 al 9).<br>
                  3. <strong>Capítulo II, Sección 1ª del Título I</strong> (arts. 15 al 29: Derechos Fundamentales).<br>
                  4. <strong>Título II</strong> (arts. 56 al 65: La Corona).
                </div>

                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span class="font-bold text-amber-300 block mb-1">Paso 1 &bull; Principio de Reforma:</span>
                  <span class="text-base font-black text-white">Mayoría de 2/3 de cada Cámara</span>
                </div>

                <div class="bg-rose-950/30 p-3 rounded-xl border border-rose-500/40 text-rose-200">
                  <span class="font-black text-rose-300 block mb-0.5">Paso 2 &bull; Efecto Inmediato:</span>
                  <strong>DISOLUCIÓN INMEDIATA DE LAS CORTES GENERALES</strong> y convocatoria de nuevas elecciones generales.
                </div>

                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span class="font-bold text-amber-300 block mb-1">Paso 3 &bull; Nuevas Cortes Generales:</span>
                  Ratificación de la decisión y aprobación del nuevo texto por <strong>mayoría de 2/3 de ambas Cámaras</strong>.
                </div>

                <div class="bg-rose-950/30 p-3 rounded-xl border border-rose-500/40">
                  <span class="font-black text-rose-300 block mb-0.5">Paso 4 &bull; Referéndum:</span>
                  <span class="font-black text-white">PRECEPTIVO Y VINCULANTE (Obligatorio)</span>
                  <div class="text-[11px] text-rose-200 mt-1">
                    Sometimiento obligatorio a referéndum para su ratificación final por todo el pueblo español.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "din_formatos",
    topicId: 7,
    badge: "Tema 7: ISO 216 / DIN 476",
    title: "Infografía Técnica Proporcional de Formatos de Papel DIN",
    subtitle: "Dimensiones en milímetros, superficie en m² y principio de duplicación por el lado largo",
    description: "Visualización gráfica a escala de los tamaños DIN A0 a DIN A5. Recuerda: cada tamaño es la mitad exacta del anterior.",
    renderSvg: () => `
      <div class="w-full overflow-x-auto py-2">
        <div class="min-w-[700px] bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span class="text-xs font-black uppercase text-amber-400">Norma Internacional ISO 216 &bull; DIN 476</span>
              <h3 class="text-lg font-black text-white">Relación Geométrica 1 : √2 (Proporción Áurea Reprográfica)</h3>
            </div>
            <div class="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              Gramaje estándar: <strong>80 g/m²</strong> (oficinas)
            </div>
          </div>

          <!-- DIAGRAMA VISUAL ANIDADO EN CSS/SVG -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <!-- CAJA ANIDADA GRÁFICA -->
            <div class="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div class="relative w-full aspect-[841/1189] max-h-[380px] mx-auto bg-slate-950 border-2 border-sky-400 rounded-xl p-3 flex flex-col justify-between">
                <div class="flex items-center justify-between text-xs text-sky-400 font-bold">
                  <span>DIN A0 (1 m² &bull; 841 x 1189 mm)</span>
                  <span>Pliego de partida</span>
                </div>

                <!-- SUBDIVISIÓN A1 -->
                <div class="w-full h-1/2 border-t-2 border-dashed border-indigo-400 pt-2 flex gap-2">
                  <div class="w-1/2 h-full border-r-2 border-dashed border-emerald-400 pr-2 flex flex-col justify-between">
                    <span class="text-[11px] font-bold text-indigo-300">A1 (594 x 841 mm)</span>

                    <!-- SUBDIVISIÓN A2 & A3 -->
                    <div class="w-full h-1/2 border-t-2 border-dashed border-amber-400 pt-1 flex gap-1">
                      <div class="w-1/2 h-full border-r-2 border-dashed border-rose-400 pr-1 flex flex-col justify-between">
                        <span class="text-[10px] font-bold text-amber-300">A2 (420x594)</span>
                        <div class="bg-rose-500/20 border border-rose-500 p-1 rounded text-[9px] font-black text-rose-300">
                          A3 (297x420)
                          <div class="bg-sky-400 text-slate-950 rounded px-1 text-[8px] font-black mt-0.5">
                            A4 (210x297)
                          </div>
                        </div>
                      </div>
                      <div class="w-1/2 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        Mitad A2
                      </div>
                    </div>
                  </div>
                  <div class="w-1/2 flex items-center justify-center text-xs font-bold text-slate-500">
                    Mitad A0 = A1
                  </div>
                </div>
              </div>
            </div>

            <!-- TABLA DE MEDIDAS OFICIALES EXAMEN -->
            <div class="lg:col-span-5 space-y-2">
              <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="font-black text-white text-sm">DIN A0</span>
                  <span class="text-[11px] text-slate-400 block">Superficie base: 1 m²</span>
                </div>
                <span class="font-mono text-xs font-bold text-sky-400">841 x 1189 mm</span>
              </div>

              <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="font-black text-white text-sm">DIN A1</span>
                  <span class="text-[11px] text-slate-400 block">Mitad de A0</span>
                </div>
                <span class="font-mono text-xs font-bold text-sky-400">594 x 841 mm</span>
              </div>

              <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="font-black text-white text-sm">DIN A2</span>
                  <span class="text-[11px] text-slate-400 block">Mitad de A1</span>
                </div>
                <span class="font-mono text-xs font-bold text-sky-400">420 x 594 mm</span>
              </div>

              <div class="bg-slate-900 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="font-black text-amber-300 text-sm">DIN A3</span>
                  <span class="text-[11px] text-amber-200/80 block">⚠️ DOBLE del A4</span>
                </div>
                <span class="font-mono text-xs font-bold text-amber-300">297 x 420 mm</span>
              </div>

              <div class="bg-sky-500/10 border-2 border-sky-400 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="font-black text-sky-300 text-sm">DIN A4</span>
                  <span class="text-[11px] text-sky-200/80 block">⭐ Formato estándar de oficina</span>
                </div>
                <span class="font-mono text-xs font-black text-white">210 x 297 mm</span>
              </div>

              <div class="bg-slate-900 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="font-black text-emerald-300 text-sm">DIN A5</span>
                  <span class="text-[11px] text-emerald-200/80 block">⚠️ MITAD exacta del A4</span>
                </div>
                <span class="font-mono text-xs font-bold text-emerald-300">148 x 210 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "circuito_postal",
    topicId: 8,
    badge: "Tema 8: Correos y Documentación",
    title: "Circuito de Correspondencia, Burofax y Tipos de Documentos",
    subtitle: "Régimen de fehaciencia postal y distinción entre Oficio y Nota Interior",
    description: "Flujograma del tratamiento documental para distinguir el valor probatorio de cartas ordinarias, certificadas y burofax.",
    renderSvg: () => `
      <div class="w-full overflow-x-auto py-2">
        <div class="min-w-[700px] bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div class="text-center max-w-xl mx-auto space-y-1">
            <span class="text-xs font-black uppercase text-emerald-400 tracking-wider">Tratamiento Postal y Probatorio en Servicios Administrativos</span>
            <h3 class="text-lg sm:text-xl font-black text-white">Grados de Fehaciencia de la Correspondencia Oficial</h3>
          </div>

          <!-- 3 RUTAS POSTALES SEGÚN FEHACIENCIA -->
          <div class="grid grid-cols-3 gap-4">
            <!-- RUTA 1: CARTA ORDINARIA -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Nivel 1</span>
                <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Baja seguridad</span>
              </div>
              <h4 class="text-sm font-black text-white">CARTA ORDINARIA</h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Envío simple sin código de seguimiento numérico. Se deposita en buzón sin requerir firma del destinatario.
              </p>
              <div class="bg-rose-950/20 border border-rose-500/30 rounded-xl p-2.5 text-[11px] text-rose-300">
                ❌ <strong>Valor probatorio nulo:</strong> No acredita ni la fecha de entrega, ni el receptor, ni el contenido.
              </div>
            </div>

            <!-- RUTA 2: CARTA CERTIFICADA CON ACUSE -->
            <div class="bg-slate-900 border border-sky-500/30 rounded-2xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-sky-400 uppercase">Nivel 2</span>
                <span class="text-[10px] bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20">Fehaciente</span>
              </div>
              <h4 class="text-sm font-black text-white">CARTA CERTIFICADA + ACUSE</h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Asignación de código de barras / seguimiento. Entrega bajo firma con DNI del receptor o aviso rosa devuelto al remitente.
              </p>
              <div class="bg-sky-950/30 border border-sky-500/40 rounded-xl p-2.5 text-[11px] text-sky-200">
                ✔️ <strong>Acredita la entrega:</strong> Fecha, hora y persona receptora. NO certifica el contenido del sobre.
              </div>
            </div>

            <!-- RUTA 3: BUROFAX CON CERTIFICACIÓN -->
            <div class="bg-slate-900 border-2 border-emerald-500/60 rounded-2xl p-4 space-y-3 shadow-lg shadow-emerald-500/10">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-emerald-400 uppercase">Nivel 3 Máximo</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-black">Plena Prueba</span>
              </div>
              <h4 class="text-sm font-black text-white">BUROFAX CON CERTIFICACIÓN</h4>
              <p class="text-xs text-slate-300 leading-relaxed">
                Emisión de testimonio notarial de Correos con depósito y acuse de recibo más certificación de texto íntegro.
              </p>
              <div class="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-2.5 text-[11px] text-emerald-200 font-bold">
                ⭐ <strong>Máximo valor judicial:</strong> Prueba legal fehaciente tanto de la ENTREGA como del CONTENIDO ÍNTEGRO enviado.
              </div>
            </div>
          </div>

          <!-- COMPARATIVA DOCUMENTAL: OFICIO VS NOTA INTERIOR -->
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span class="text-xs font-black uppercase text-amber-400 tracking-wider">
              REGLA DE ORO DE LOS DOCUMENTOS ADMINISTRATIVOS
            </span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-white text-sm">OFICIO</span>
                  <span class="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">Comunicación Externa</span>
                </div>
                <p class="text-slate-300">
                  Se dirige a <strong>otros Ministerios</strong>, órganos constitucionales, Comunidades Autónomas, Ayuntamientos, entidades o ciudadanos particulares.
                </p>
              </div>

              <div class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-white text-sm">NOTA INTERIOR</span>
                  <span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Comunicación Interna</span>
                </div>
                <p class="text-slate-300">
                  Uso <strong>estrictamente interno</strong> entre unidades u órganos pertenecientes al <strong>mismo Departamento Ministerial o Centro</strong>. Nunca sale al exterior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
];
