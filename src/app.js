/**
 * MISIÓN ADMINISTRACIÓN (OPO-DEFENSA E1)
 * Arquitectura SPA Frontend Senior - Modo Offline-First
 * E1 Servicios Administrativos (Personal Laboral Fijo Defensa / CUAGE)
 */

import { SYLLABUS } from './data/syllabus.js';
import { CIFRAS_SAGRADAS, TRAMPAS_EXAMEN } from './data/cifras_y_trampas.js';
import { FLASHCARDS } from './data/flashcards.js';
import { QUESTION_BANK } from './data/questions.js';

class OpoDefensaApp {
  constructor() {
    this.syllabus = SYLLABUS;
    this.cifras = CIFRAS_SAGRADAS;
    this.trampas = TRAMPAS_EXAMEN;
    this.flashcards = FLASHCARDS;
    this.questionBank = QUESTION_BANK;

    // Estado de Navegación
    this.activeTab = 'dashboard';

    // Estado del Módulo de Estudio
    this.selectedTopicId = 1;
    this.studySubTab = 'temas'; // 'temas' | 'cifras' | 'trampas'
    this.studySearchQuery = '';

    // Estado del Simulador Oficial
    this.examState = {
      mode: 'oficial', // 'oficial' | 'comun' | 'especifico' | 'falladas'
      status: 'idle', // 'idle' | 'running' | 'finished'
      questions: [],
      currentIndex: 0,
      userAnswers: {}, // { qId: optionIndex }
      flagged: new Set(), // Set of qIds marcadas con duda
      timeRemaining: 3600, // 60 minutos = 3600 segundos
      timerInterval: null,
      filterReview: 'all', // 'all' | 'wrong' | 'correct' | 'blank'
      results: null
    };

    // Estado de Flashcards
    this.flashcardState = {
      category: 'all',
      cards: [...this.flashcards],
      currentIndex: 0,
      isFlipped: false
    };

    // Almacenamiento Local (Offline-First)
    this.loadPersistence();

    // Inicializar la aplicación
    this.init();
  }

  // =========================================================================
  // PERSISTENCIA (LOCALSTORAGE)
  // =========================================================================
  loadPersistence() {
    try {
      this.examHistory = JSON.parse(localStorage.getItem('opo_e1_history')) || [];
      this.failedQuestions = new Set(JSON.parse(localStorage.getItem('opo_e1_failed_qids')) || []);
      this.cardRatings = JSON.parse(localStorage.getItem('opo_e1_flashcards_rating')) || {};
    } catch (e) {
      console.warn('Error cargando LocalStorage:', e);
      this.examHistory = [];
      this.failedQuestions = new Set();
      this.cardRatings = {};
    }
  }

  saveHistory(result) {
    this.examHistory.unshift(result);
    // Limitar a los últimos 50 simulacros
    if (this.examHistory.length > 50) this.examHistory.pop();
    try {
      localStorage.setItem('opo_e1_history', JSON.stringify(this.examHistory));
      localStorage.setItem('opo_e1_failed_qids', JSON.stringify(Array.from(this.failedQuestions)));
    } catch (e) {
      console.warn('Error guardando en LocalStorage:', e);
    }
  }

  saveCardRating(cardId, rating) {
    this.cardRatings[cardId] = rating;
    try {
      localStorage.setItem('opo_e1_flashcards_rating', JSON.stringify(this.cardRatings));
    } catch (e) {}
  }

  // =========================================================================
  // INICIALIZACIÓN Y ENRUTAMIENTO
  // =========================================================================
  init() {
    // Configurar listeners de hash para navegación fluida
    window.addEventListener('hashchange', () => this.handleHashChange());
    if (window.location.hash) {
      this.handleHashChange();
    } else {
      this.setTab('dashboard');
    }

    // Inicializar PWA Service Worker
    this.registerServiceWorker();

    // Registrar atajos de teclado globales para el simulador
    window.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['dashboard', 'estudio', 'simulador', 'flashcards', 'analiticas'];
    if (validTabs.includes(hash)) {
      this.setTab(hash, false);
    }
  }

  setTab(tabName, updateHash = true) {
    this.activeTab = tabName;
    if (updateHash) {
      window.location.hash = tabName;
    }

    // Actualizar botones de navegación (desktop y móvil)
    document.querySelectorAll('[data-tab-target]').forEach(btn => {
      const target = btn.getAttribute('data-tab-target');
      if (target === tabName) {
        btn.classList.add('nav-active');
      } else {
        btn.classList.remove('nav-active');
      }
    });

    // Renderizar la vista correspondiente
    const mainContainer = document.getElementById('app-main-content');
    if (!mainContainer) return;

    switch (tabName) {
      case 'dashboard':
        mainContainer.innerHTML = this.renderDashboard();
        this.bindDashboardEvents();
        break;
      case 'estudio':
        mainContainer.innerHTML = this.renderStudyCenter();
        this.bindStudyEvents();
        break;
      case 'simulador':
        mainContainer.innerHTML = this.renderSimulator();
        this.bindSimulatorEvents();
        break;
      case 'flashcards':
        mainContainer.innerHTML = this.renderFlashcards();
        this.bindFlashcardsEvents();
        break;
      case 'analiticas':
        mainContainer.innerHTML = this.renderAnalytics();
        this.bindAnalyticsEvents();
        break;
      default:
        mainContainer.innerHTML = this.renderDashboard();
        this.bindDashboardEvents();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('SW registrado con éxito:', reg.scope))
          .catch(err => console.log('SW falló:', err));
      });
    }
  }

  // =========================================================================
  // MÓDULO 1: DASHBOARD / INICIO
  // =========================================================================
  renderDashboard() {
    // Métricas calculadas
    const totalSimulacros = this.examHistory.length;
    const ultimosSimulacros = this.examHistory.slice(0, 5);
    const mediaPuntos = totalSimulacros > 0
      ? (this.examHistory.reduce((acc, curr) => acc + curr.netScore, 0) / totalSimulacros).toFixed(2)
      : '0.00';
    const aprobadosCount = this.examHistory.filter(h => h.passed).length;
    const probAprobado = totalSimulacros > 0
      ? Math.round((aprobadosCount / totalSimulacros) * 100)
      : 0;

    return `
      <div class="space-y-8 animate-fadeIn">
        <!-- HERO CARD DE CONVOCATORIA -->
        <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl select-none pointer-events-none">⚔️</div>
          <div class="max-w-3xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              Convocatoria Oficial Resolución 430/38310/2026 &bull; Grupo E1
            </div>
            <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Misión Administración <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">Defensa</span>
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              Centro de Alto Rendimiento para Opositores a Personal Laboral Fijo del <strong>Ministerio de Defensa</strong> (IV Convenio Único AGE). Temario oficial íntegro de 10 temas, banco de 204 preguntas oficiales, simulador real con penalización (-0,33) y flashcards de recuperación activa.
            </p>

            <div class="pt-4 flex flex-wrap gap-3">
              <button onclick="window.app.startNewExam('oficial')" class="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 text-sm sm:text-base">
                <span>🎯</span> Iniciar Simulacro Oficial (60 + 6 Reserva)
              </button>
              <button onclick="window.app.setTab('estudio')" class="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-all text-sm sm:text-base flex items-center gap-2">
                <span>📖</span> Abrir Temario Completo
              </button>
            </div>
          </div>
        </div>

        <!-- 4 INDICADORES CARDINALES -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Temario Oficial</div>
            <div class="text-2xl sm:text-3xl font-black text-white mt-1">10 Temas</div>
            <div class="text-xs text-sky-400 mt-1 font-medium">4 Comunes + 6 Específicos</div>
          </div>

          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Banco de Test</div>
            <div class="text-2xl sm:text-3xl font-black text-white mt-1">204 Preguntas</div>
            <div class="text-xs text-emerald-400 mt-1 font-medium">33% Común / 67% Específico</div>
          </div>

          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Media Neta (-0,33)</div>
            <div class="text-2xl sm:text-3xl font-black ${mediaPuntos >= 30 ? 'text-emerald-400' : 'text-amber-400'} mt-1">
              ${mediaPuntos} <span class="text-sm font-normal text-slate-400">/ 60</span>
            </div>
            <div class="text-xs text-slate-400 mt-1">Corte oficial: 30,00 pts</div>
          </div>

          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Probabilidad Aprobado</div>
            <div class="text-2xl sm:text-3xl font-black ${probAprobado >= 60 ? 'text-emerald-400' : probAprobado >= 40 ? 'text-amber-400' : 'text-slate-400'} mt-1">
              ${probAprobado}%
            </div>
            <div class="text-xs text-slate-400 mt-1">${aprobadosCount} de ${totalSimulacros} aprobados</div>
          </div>
        </div>

        <!-- ACCESOS RÁPIDOS A LOS 4 MODOS DE TEST -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Modos de Entrenamiento Táctico
            </h2>
            <span class="text-xs text-slate-400 font-medium">Selecciona un modo para entrenar</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- MODO 1: SIMULACRO OFICIAL -->
            <div onclick="window.app.startNewExam('oficial')" class="group cursor-pointer bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all shadow-md hover:-translate-y-1">
              <div class="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center text-2xl mb-4 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                🎖️
              </div>
              <h3 class="text-lg font-bold text-white mb-1">Simulacro Real Defensa</h3>
              <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                60 preguntas ordinarias (20 comunes + 40 específicas) + 6 de reserva. Cronómetro de 60 min con aviso y penalización oficial de -0,33.
              </p>
              <span class="text-xs font-bold text-sky-400 flex items-center gap-1">Entrenar Ahora &rarr;</span>
            </div>

            <!-- MODO 2: BLOQUE COMÚN -->
            <div onclick="window.app.startNewExam('comun')" class="group cursor-pointer bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all shadow-md hover:-translate-y-1">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-2xl mb-4 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors">
                ⚖️
              </div>
              <h3 class="text-lg font-bold text-white mb-1">Bloque Común (33%)</h3>
              <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                20 preguntas de los Temas 1 al 4 (Constitución, Gobierno, Personal Laboral CUAGE e Igualdad).
              </p>
              <span class="text-xs font-bold text-indigo-400 flex items-center gap-1">Iniciar Común &rarr;</span>
            </div>

            <!-- MODO 3: BLOQUE ESPECÍFICO -->
            <div onclick="window.app.startNewExam('especifico')" class="group cursor-pointer bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all shadow-md hover:-translate-y-1">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                🛡️
              </div>
              <h3 class="text-lg font-bold text-white mb-1">Bloque Específico (67%)</h3>
              <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                40 preguntas de los Temas 5 al 10 (Accesos, Paquetería, Reprografía DIN, Correos, Recados y PRL).
              </p>
              <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">Iniciar Específico &rarr;</span>
            </div>

            <!-- MODO 4: CUADERNO DE FALLADAS -->
            <div onclick="window.app.startNewExam('falladas')" class="group cursor-pointer bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 transition-all shadow-md hover:-translate-y-1">
              <div class="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center text-2xl mb-4 group-hover:bg-rose-500 group-hover:text-slate-950 transition-colors">
                📓
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-white mb-1">Cuaderno de Falladas</h3>
                <span class="px-2 py-0.5 rounded-full text-xs font-bold ${this.failedQuestions.size > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-500'}">
                  ${this.failedQuestions.size}
                </span>
              </div>
              <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                Reentrena exclusivamente las preguntas que has fallado en simulacros para eliminar tus puntos débiles.
              </p>
              <span class="text-xs font-bold text-rose-400 flex items-center gap-1">Repasar Errores &rarr;</span>
            </div>
          </div>
        </div>

        <!-- MÉTODO DIARIO DE ALTO RENDIMIENTO (3 PASOS) -->
        <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>⚡</span> El Ciclo Diario de Estudio Recomendado (60 Minutos)
          </h3>
          <p class="text-xs sm:text-sm text-slate-400 mb-6">
            Sigue este flujo diario para garantizar la asimilación a largo plazo sin agotamiento cognitivo:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
              <div class="text-xs font-extrabold text-sky-400 uppercase tracking-wider mb-2">Paso 1 &bull; 20 Minutos</div>
              <h4 class="text-base font-bold text-white mb-1">Lectura Activa del Manual</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Abre un tema en el Centro de Estudio. Subraya mentalmente las citas del BOE y las advertencias de "Trampa de Examen".
              </p>
            </div>

            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
              <div class="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">Paso 2 &bull; 15 Minutos</div>
              <h4 class="text-base font-bold text-white mb-1">Recuperación con Flashcards</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Repasa las tarjetas del día. Fuerza a tu cerebro a recordar el plazo exacto o la norma antes de voltear la tarjeta.
              </p>
            </div>

            <div class="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
              <div class="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2">Paso 3 &bull; 25 Minutos</div>
              <h4 class="text-base font-bold text-white mb-1">Test Táctico y Corrección</h4>
              <p class="text-xs text-slate-400 leading-relaxed">
                Realiza una sesión de test, gestiona el riesgo de dejar en blanco (-0,33) y lee con detenimiento cada justificación legal.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindDashboardEvents() {}

  // =========================================================================
  // MÓDULO 2: CENTRO DE ESTUDIO Y MANUAL INTERACTIVO
  // =========================================================================
  renderStudyCenter() {
    const activeTopic = this.syllabus.find(t => t.id === this.selectedTopicId) || this.syllabus[0];

    return `
      <div class="space-y-6 animate-fadeIn">
        <!-- HEADER DEL CENTRO DE ESTUDIO -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>📖</span> Centro de Estudio Oficial E1
            </h1>
            <p class="text-xs sm:text-sm text-slate-400">
              Programa oficial de 10 temas desarrollado exhaustivamente con citas literales del BOE y análisis técnico.
            </p>
          </div>

          <!-- SELECTOR DE SUBPESTAÑAS (TEMAS / CIFRAS / TRAMPAS) -->
          <div class="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button onclick="window.app.setStudySubTab('temas')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'temas' ? 'bg-sky-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              10 Temas Íntegros
            </button>
            <button onclick="window.app.setStudySubTab('cifras')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'cifras' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              ⭐ 50 Cifras BOE
            </button>
            <button onclick="window.app.setStudySubTab('trampas')" class="px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'trampas' ? 'bg-rose-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              ⚠️ Control de Trampas
            </button>
          </div>
        </div>

        ${this.renderStudyContent(activeTopic)}
      </div>
    `;
  }

  renderStudyContent(activeTopic) {
    if (this.studySubTab === 'cifras') {
      return this.renderCifrasSagradas();
    }
    if (this.studySubTab === 'trampas') {
      return this.renderTrampasExamen();
    }

    // SUBPESTAÑA PRINCIPAL: LOS 10 TEMAS
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- ÍNDICE LATERAL DE LOS 10 TEMAS -->
        <div class="lg:col-span-4 space-y-3">
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
              <span>Temario de Convocatoria</span>
              <span class="text-sky-400">10 Temas</span>
            </div>

            <!-- BLOQUE COMÚN -->
            <div class="mb-4">
              <div class="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wider mb-2 px-1">
                Bloque Común (33,3% &bull; Temas 1-4)
              </div>
              <div class="space-y-1">
                ${this.syllabus.filter(t => t.block === 'comun').map(t => `
                  <button onclick="window.app.selectTopic(${t.id})" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${t.id === this.selectedTopicId ? 'bg-sky-500/15 text-sky-300 font-bold border border-sky-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${t.id === this.selectedTopicId ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'}">
                      ${t.id}
                    </span>
                    <span class="truncate">${t.shortTitle}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- BLOQUE ESPECÍFICO -->
            <div>
              <div class="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider mb-2 px-1">
                Bloque Específico (66,7% &bull; Temas 5-10)
              </div>
              <div class="space-y-1">
                ${this.syllabus.filter(t => t.block === 'especifico').map(t => `
                  <button onclick="window.app.selectTopic(${t.id})" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${t.id === this.selectedTopicId ? 'bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${t.id === this.selectedTopicId ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'}">
                      ${t.id}
                    </span>
                    <span class="truncate">${t.shortTitle}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- CUERPO PRINCIPAL DEL TEMA SELECCIONADO -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <!-- ENCABEZADO DEL TEMA -->
            <div class="border-b border-slate-800 pb-6 mb-6">
              <div class="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                <span>${activeTopic.icon}</span>
                <span>${activeTopic.weight}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                ${activeTopic.title}
              </h2>
              <p class="text-xs sm:text-sm text-slate-400 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                ⚖️ <strong>Referencia Normativa:</strong> ${activeTopic.lawRef}
              </p>
            </div>

            <!-- EPÍGRAFES DESARROLLADOS -->
            <div class="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
              ${activeTopic.sections.map((sec, idx) => `
                <div class="space-y-4">
                  <h3 class="text-lg sm:text-xl font-bold text-white flex items-center gap-2 pt-2 border-t border-slate-800/50">
                    <span class="w-2 h-2 rounded-full bg-sky-400"></span>
                    ${sec.title}
                  </h3>
                  <div class="prose prose-invert max-w-none text-slate-300">
                    ${sec.content}
                  </div>

                  ${sec.quote ? `
                    <div class="relative bg-slate-950/80 border-l-4 border-sky-400 p-4 rounded-r-xl my-4">
                      <p class="text-sky-200 text-xs sm:text-sm italic font-medium leading-relaxed">
                        "${sec.quote}"
                      </p>
                      <div class="text-[11px] font-bold text-sky-400 uppercase mt-2">
                        &mdash; ${sec.quoteSource}
                      </div>
                    </div>
                  ` : ''}

                  ${sec.alert ? `
                    <div class="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 my-4">
                      <div class="flex items-start gap-3">
                        <span class="text-xl">⚠️</span>
                        <div>
                          <h4 class="text-xs sm:text-sm font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                            ${sec.alert.title}
                          </h4>
                          <p class="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                            ${sec.alert.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>

            <!-- TABLA DE CIFRAS SAGRADAS DEL TEMA -->
            ${activeTopic.keyFigures && activeTopic.keyFigures.length > 0 ? `
              <div class="mt-10 pt-6 border-t border-slate-800">
                <h4 class="text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>⭐</span> Cifras Sagradas Clave de este Tema
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  ${activeTopic.keyFigures.map(fig => `
                    <div class="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                      <div class="text-xs text-slate-400 font-medium">${fig.term}</div>
                      <div class="text-sm font-bold text-white mt-0.5">${fig.value}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- CONTROL DE TRAMPAS DEL TEMA -->
            ${activeTopic.examTraps && activeTopic.examTraps.length > 0 ? `
              <div class="mt-6">
                <h4 class="text-sm font-extrabold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>🎯</span> Trampas Típicas de Examen en este Tema
                </h4>
                <ul class="space-y-2">
                  ${activeTopic.examTraps.map(trap => `
                    <li class="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3 text-xs sm:text-sm text-rose-200/90 flex items-start gap-2">
                      <span class="text-rose-400 font-bold">&bull;</span>
                      <span>${trap}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- BOTONES DE ACCIÓN AL PIE DEL TEMA -->
            <div class="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button onclick="window.app.startTopicQuiz(${activeTopic.id})" class="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg">
                <span>🎯</span> Entrenar Preguntas de este Tema
              </button>
              <button onclick="window.app.setTab('flashcards')" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm border border-slate-700">
                <span>🗂️</span> Ver Flashcards Relacionadas
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCifrasSagradas() {
    return `
      <div class="space-y-6">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-2xl font-black text-white flex items-center gap-2">
                <span>⭐</span> Las 50 Cifras Sagradas del BOE
              </h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-1">
                Plazos, mayorías parlamentarias, porcentajes, medidas DIN y prescripciones que suponen el 80% de las preguntas de memoria numérica.
              </p>
            </div>
            <button onclick="window.print()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2">
              <span>🖨️</span> Imprimir en PDF (Ctrl+P)
            </button>
          </div>

          <!-- LISTADO DE LAS 50 CIFRAS -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${this.cifras.map(c => `
              <div class="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                      ${c.tema}
                    </span>
                    <span class="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      ${c.cifra}
                    </span>
                  </div>
                  <h4 class="text-sm font-bold text-white mb-1">${c.concepto}</h4>
                  <p class="text-xs text-slate-400 leading-relaxed">${c.detalle}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderTrampasExamen() {
    return `
      <div class="space-y-6">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-black text-white flex items-center gap-2">
              <span>⚠️</span> Control de Trampas Lingüísticas y de Tribunal
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              Desglose de los conceptos confusos donde la mayoría de opositores tropieza en el examen oficial de Defensa E1.
            </p>
          </div>

          <div class="space-y-4">
            ${this.trampas.map(t => `
              <div class="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div class="text-xs font-black uppercase text-rose-400 tracking-wider">
                  Trampa #${t.id}: ${t.titulo}
                </div>
                <div class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs sm:text-sm text-rose-200">
                  <strong>La Trampa del Tribunal:</strong> ${t.trampa}
                </div>
                <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs sm:text-sm text-emerald-200">
                  <strong>La Realidad Oficial (BOE):</strong> ${t.realidad}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  selectTopic(topicId) {
    this.selectedTopicId = topicId;
    this.setTab('estudio');
  }

  setStudySubTab(subTab) {
    this.studySubTab = subTab;
    this.setTab('estudio');
  }

  startTopicQuiz(topicId) {
    const topicQuestions = this.questionBank.filter(q => q.topicId === topicId);
    if (topicQuestions.length === 0) return;
    this.setupExamSession(topicQuestions, `Tema ${topicId}`);
  }

  bindStudyEvents() {}

  // =========================================================================
  // MÓDULO 3: SIMULADOR DE EXAMEN OFICIAL (MOTOR REAL)
  // =========================================================================
  renderSimulator() {
    if (this.examState.status === 'running') {
      return this.renderActiveExam();
    }
    if (this.examState.status === 'finished') {
      return this.renderExamResults();
    }
    return this.renderSimulatorLauncher();
  }

  renderSimulatorLauncher() {
    return `
      <div class="max-w-4xl mx-auto space-y-6 animate-fadeIn">
        <div class="text-center space-y-2 mb-8">
          <h1 class="text-3xl sm:text-4xl font-black text-white">
            Simulador de Examen Oficial E1
          </h1>
          <p class="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto">
            Configurado con los parámetros exactos de la convocatoria oficial de la Subsecretaría de Defensa (Resolución 430/38310/2026).
          </p>
        </div>

        <!-- REGLAS DE CORTE OFICIAL -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span>📋</span> Normas Oficiales de Calificación
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div class="text-slate-400">Preguntas del Ejercicio</div>
              <div class="text-base font-bold text-white mt-1">60 Ord + 6 Reserva</div>
              <div class="text-slate-500 text-[11px] mt-0.5">20 comunes + 40 específicas</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div class="text-slate-400">Tiempo Máximo</div>
              <div class="text-base font-bold text-white mt-1">60 Minutos</div>
              <div class="text-slate-500 text-[11px] mt-0.5">Con aviso en últimos 10 min</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div class="text-slate-400">Fórmula de Puntuación</div>
              <div class="text-base font-bold text-amber-400 mt-1">Aciertos - (Errores &times; 1/3)</div>
              <div class="text-slate-500 text-[11px] mt-0.5">Blancas computan 0. Corte: 30 pts</div>
            </div>
          </div>
        </div>

        <!-- SELECTOR DE MODALIDAD DE EXAMEN -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onclick="window.app.startNewExam('oficial')" class="p-6 bg-gradient-to-br from-sky-950/70 to-slate-900 border border-sky-500/40 hover:border-sky-400 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">🎖️</div>
            <h3 class="text-lg font-bold text-white group-hover:text-sky-300">Simulacro Oficial Defensa</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              60 preguntas ordinarias + 6 de reserva con distribución exacta (33% comunes / 67% específicas) y cronómetro de 60 minutos.
            </p>
          </button>

          <button onclick="window.app.startNewExam('comun')" class="p-6 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">⚖️</div>
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-300">Modo Bloque Común</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              20 preguntas de los Temas 1 al 4 (Constitución, Gobierno, Personal Laboral CUAGE e Igualdad).
            </p>
          </button>

          <button onclick="window.app.startNewExam('especifico')" class="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">🛡️</div>
            <h3 class="text-lg font-bold text-white group-hover:text-emerald-300">Modo Bloque Específico</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              40 preguntas de los Temas 5 al 10 (Accesos, Paquetes, DIN 476, Correos, Recados y Averías/PRL).
            </p>
          </button>

          <button onclick="window.app.startNewExam('falladas')" class="p-6 bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">📓</div>
            <h3 class="text-lg font-bold text-white group-hover:text-rose-300">
              Modo Preguntas Falladas (${this.failedQuestions.size})
            </h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              Entrena las preguntas que tienes guardadas en tu cuaderno de errores para corregir debilidades.
            </p>
          </button>
        </div>
      </div>
    `;
  }

  startNewExam(mode) {
    let pool = [];
    if (mode === 'oficial') {
      // 60 ordinarias: 20 comunes + 40 específicas
      // 6 de reserva: 2 comunes + 4 específicas
      const comunPool = this.shuffleArray(this.questionBank.filter(q => q.block === 'comun'));
      const espPool = this.shuffleArray(this.questionBank.filter(q => q.block === 'especifico'));

      const comunOrd = comunPool.slice(0, 20);
      const espOrd = espPool.slice(0, 40);
      const comunRes = comunPool.slice(20, 22);
      const espRes = espPool.slice(40, 44);

      pool = [...comunOrd, ...espOrd, ...comunRes, ...espRes];
    } else if (mode === 'comun') {
      const comunPool = this.shuffleArray(this.questionBank.filter(q => q.block === 'comun'));
      pool = comunPool.slice(0, 20);
    } else if (mode === 'especifico') {
      const espPool = this.shuffleArray(this.questionBank.filter(q => q.block === 'especifico'));
      pool = espPool.slice(0, 40);
    } else if (mode === 'falladas') {
      if (this.failedQuestions.size === 0) {
        alert('¡Enhorabuena! No tienes preguntas registradas en tu Cuaderno de Falladas.');
        return;
      }
      pool = this.questionBank.filter(q => this.failedQuestions.has(q.id));
      pool = this.shuffleArray(pool);
    }

    this.setupExamSession(pool, mode);
  }

  setupExamSession(questions, mode) {
    if (this.examState.timerInterval) {
      clearInterval(this.examState.timerInterval);
    }

    this.examState = {
      mode: mode,
      status: 'running',
      questions: questions,
      currentIndex: 0,
      userAnswers: {},
      flagged: new Set(),
      timeRemaining: 3600, // 60 min
      timerInterval: null,
      filterReview: 'all',
      results: null
    };

    // Iniciar cuenta atrás
    this.examState.timerInterval = setInterval(() => {
      this.examState.timeRemaining--;
      this.updateTimerDisplay();
      if (this.examState.timeRemaining <= 0) {
        this.finishExam(true);
      }
    }, 1000);

    this.setTab('simulador');
  }

  updateTimerDisplay() {
    const el = document.getElementById('exam-timer');
    if (!el) return;
    const mins = Math.floor(this.examState.timeRemaining / 60);
    const secs = this.examState.timeRemaining % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    el.innerText = formatted;

    // Aviso de últimos 10 minutos (<= 600 segundos)
    if (this.examState.timeRemaining <= 600) {
      el.classList.add('text-rose-400', 'animate-pulse');
      el.classList.remove('text-sky-400');
    }
  }

  renderActiveExam() {
    const q = this.examState.questions[this.examState.currentIndex];
    const totalQ = this.examState.questions.length;
    const isReserve = this.examState.mode === 'oficial' && this.examState.currentIndex >= 60;
    const selectedOpt = this.examState.userAnswers[q.id];
    const isFlagged = this.examState.flagged.has(q.id);

    const answeredCount = Object.keys(this.examState.userAnswers).length;

    return `
      <div class="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
        <!-- BARRA SUPERIOR DE ESTADO DEL SIMULACRO -->
        <div class="sticky top-16 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-black uppercase px-2.5 py-1 rounded-lg ${isReserve ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'}">
              ${isReserve ? `Reserva #${this.examState.currentIndex - 59}` : `Pregunta ${this.examState.currentIndex + 1} / ${totalQ}`}
            </span>
            <span class="text-xs text-slate-400 hidden sm:inline">
              ${answeredCount} de ${totalQ} respondidas
            </span>
          </div>

          <div class="flex items-center gap-4">
            <!-- CRONÓMETRO REGRESIVO -->
            <div class="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
              <span class="text-xs">⏱️</span>
              <span id="exam-timer" class="font-mono font-black text-sm text-sky-400">
                ${Math.floor(this.examState.timeRemaining / 60)}:${String(this.examState.timeRemaining % 60).padStart(2, '0')}
              </span>
            </div>

            <button onclick="window.app.confirmFinishExam()" class="px-4 py-1.5 bg-rose-500 hover:bg-rose-400 active:scale-95 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-all">
              Finalizar
            </button>
          </div>
        </div>

        <!-- TARJETA DE PREGUNTA PRINCIPAL -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                ${q.topic}
              </span>
              <span class="text-[11px] text-slate-500 ml-2 font-mono">ID #${q.id}</span>
            </div>
            <button onclick="window.app.toggleFlag(${q.id})" class="px-3 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${isFlagged ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}">
              <span>⭐</span>
              <span>${isFlagged ? 'Marcada con Duda' : 'Marcar para Dudar'}</span>
            </button>
          </div>

          <div class="text-base sm:text-xl font-bold text-white leading-relaxed">
            ${q.question}
          </div>

          <!-- OPCIONES A, B, C, D (GRANDES TÁCTILES) -->
          <div class="space-y-3 pt-2">
            ${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOpt === idx;
              return `
                <button onclick="window.app.selectAnswer(${q.id}, ${idx})" class="w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 active:scale-[0.99] ${isSelected ? 'bg-sky-500/15 border-sky-400 text-white font-medium shadow-md shadow-sky-500/10' : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300'}">
                  <span class="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-black text-xs ${isSelected ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'}">
                    ${letter}
                  </span>
                  <span class="text-sm sm:text-base leading-relaxed pt-0.5">${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- BOTÓN PARA DEJAR EN BLANCO -->
          ${selectedOpt !== undefined ? `
            <div class="pt-2 text-right">
              <button onclick="window.app.clearAnswer(${q.id})" class="text-xs text-slate-400 hover:text-rose-400 underline font-medium">
                Dejar en Blanco (No resta)
              </button>
            </div>
          ` : ''}
        </div>

        <!-- NAVEGACIÓN Y REJILLA RÁPIDA -->
        <div class="flex items-center justify-between gap-3">
          <button onclick="window.app.prevQuestion()" ${this.examState.currentIndex === 0 ? 'disabled' : ''} class="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all">
            &larr; Anterior
          </button>

          <button onclick="window.app.toggleGridModal()" class="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5">
            <span>🔢</span> Ver Rejilla (${answeredCount}/${totalQ})
          </button>

          <button onclick="window.app.nextQuestion()" ${this.examState.currentIndex === totalQ - 1 ? 'disabled' : ''} class="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs sm:text-sm transition-all">
            Siguiente &rarr;
          </button>
        </div>

        <!-- REJILLA DE NAVEGACIÓN RÁPIDA EXPANDIBLE -->
        <div id="exam-grid-container" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Cuadrícula Táctil de Navegación Rápida
            </h4>
            <div class="flex items-center gap-3 text-[11px] text-slate-400">
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-sky-400 inline-block"></span> Respondida</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-slate-800 inline-block"></span> En blanco</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-amber-400 inline-block"></span> Duda</span>
            </div>
          </div>

          <div class="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
            ${this.examState.questions.map((ques, idx) => {
              const isCurrent = idx === this.examState.currentIndex;
              const hasAns = this.examState.userAnswers[ques.id] !== undefined;
              const isDuda = this.examState.flagged.has(ques.id);

              let bgClass = 'bg-slate-800 text-slate-400 border-slate-700';
              if (hasAns) bgClass = 'bg-sky-500/20 text-sky-300 border-sky-500/50';
              if (isDuda) bgClass = 'bg-amber-500/20 text-amber-300 border-amber-500/50';
              if (isCurrent) bgClass += ' ring-2 ring-white font-black';

              return `
                <button onclick="window.app.jumpToQuestion(${idx})" class="h-9 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${bgClass}">
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  selectAnswer(qId, optIdx) {
    this.examState.userAnswers[qId] = optIdx;
    this.renderSimulatorUpdate();
  }

  clearAnswer(qId) {
    delete this.examState.userAnswers[qId];
    this.renderSimulatorUpdate();
  }

  toggleFlag(qId) {
    if (this.examState.flagged.has(qId)) {
      this.examState.flagged.delete(qId);
    } else {
      this.examState.flagged.add(qId);
    }
    this.renderSimulatorUpdate();
  }

  prevQuestion() {
    if (this.examState.currentIndex > 0) {
      this.examState.currentIndex--;
      this.renderSimulatorUpdate();
    }
  }

  nextQuestion() {
    if (this.examState.currentIndex < this.examState.questions.length - 1) {
      this.examState.currentIndex++;
      this.renderSimulatorUpdate();
    }
  }

  jumpToQuestion(idx) {
    this.examState.currentIndex = idx;
    this.renderSimulatorUpdate();
  }

  toggleGridModal() {
    const el = document.getElementById('exam-grid-container');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  renderSimulatorUpdate() {
    const mainContainer = document.getElementById('app-main-content');
    if (mainContainer && this.activeTab === 'simulador') {
      mainContainer.innerHTML = this.renderSimulator();
    }
  }

  handleKeyboardShortcuts(e) {
    if (this.activeTab !== 'simulador' || this.examState.status !== 'running') return;
    const key = e.key.toUpperCase();
    const currentQ = this.examState.questions[this.examState.currentIndex];
    if (!currentQ) return;

    if (['1', 'A'].includes(key)) this.selectAnswer(currentQ.id, 0);
    else if (['2', 'B'].includes(key)) this.selectAnswer(currentQ.id, 1);
    else if (['3', 'C'].includes(key)) this.selectAnswer(currentQ.id, 2);
    else if (['4', 'D'].includes(key)) this.selectAnswer(currentQ.id, 3);
    else if (e.key === 'ArrowRight') this.nextQuestion();
    else if (e.key === 'ArrowLeft') this.prevQuestion();
  }

  confirmFinishExam() {
    const unanswered = this.examState.questions.length - Object.keys(this.examState.userAnswers).length;
    const msg = unanswered > 0
      ? `Tienes ${unanswered} preguntas en blanco. ¿Deseas finalizar y calificar ahora?`
      : '¿Deseas finalizar y calificar el simulacro ahora?';

    if (confirm(msg)) {
      this.finishExam(false);
    }
  }

  finishExam(isTimeout = false) {
    if (this.examState.timerInterval) {
      clearInterval(this.examState.timerInterval);
      this.examState.timerInterval = null;
    }

    // Calcular Resultados Oficiales
    // En modo oficial: 60 preguntas ordinarias son las que determinan la nota.
    // Si alguna de las 60 se anula (o si usamos las 60 ordinarias), computamos sobre las 60 ordinarias.
    const questionsToGrade = this.examState.mode === 'oficial'
      ? this.examState.questions.slice(0, 60)
      : this.examState.questions;

    let correct = 0;
    let wrong = 0;
    let blank = 0;

    const reviewList = [];

    questionsToGrade.forEach((q, idx) => {
      const userAns = this.examState.userAnswers[q.id];
      const isCorrect = userAns === q.correct;
      const isBlank = userAns === undefined;

      if (isBlank) {
        blank++;
      } else if (isCorrect) {
        correct++;
        // Si estaba en el cuaderno de fallos y la ha acertado, la quitamos
        this.failedQuestions.delete(q.id);
      } else {
        wrong++;
        // Registrar en cuaderno de fallos
        this.failedQuestions.add(q.id);
      }

      reviewList.push({
        num: idx + 1,
        question: q,
        userAns: userAns,
        isCorrect: isCorrect,
        isBlank: isBlank
      });
    });

    // FÓRMULA OFICIAL: Aciertos - (Errores * 1/3)
    const netScore = Math.max(0, +(correct - (wrong * (1 / 3))).toFixed(2));
    const passed = netScore >= (questionsToGrade.length * 0.5); // 50% de corte = 30 puntos en 60 ord.
    const timeSpentSecs = 3600 - this.examState.timeRemaining;

    const results = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mode: this.examState.mode,
      total: questionsToGrade.length,
      correct,
      wrong,
      blank,
      netScore,
      passed,
      timeSpent: `${Math.floor(timeSpentSecs / 60)} min ${timeSpentSecs % 60} s`,
      reviewList
    };

    this.examState.status = 'finished';
    this.examState.results = results;

    // Guardar en histórico
    this.saveHistory(results);

    this.setTab('simulador');
  }

  renderExamResults() {
    const res = this.examState.results;
    if (!res) return this.renderSimulatorLauncher();

    const filteredReviews = res.reviewList.filter(item => {
      if (this.examState.filterReview === 'wrong') return !item.isCorrect && !item.isBlank;
      if (this.examState.filterReview === 'correct') return item.isCorrect;
      if (this.examState.filterReview === 'blank') return item.isBlank;
      return true;
    });

    return `
      <div class="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
        <!-- CABECERA DE RESULTADOS OFICIALES -->
        <div class="bg-gradient-to-br ${res.passed ? 'from-emerald-950 via-slate-900 to-slate-900 border-emerald-500/50' : 'from-rose-950 via-slate-900 to-slate-900 border-rose-500/50'} border rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase ${res.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}">
            ${res.passed ? '🎉 ¡APROBADO OFICIAL!' : '❌ NO APTO (Por debajo del corte)'}
          </div>

          <h2 class="text-4xl sm:text-6xl font-black text-white">
            ${res.netScore} <span class="text-xl sm:text-2xl font-medium text-slate-400">/ ${res.total} Netos</span>
          </h2>

          <p class="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            ${res.passed
              ? 'Has superado el umbral del 50% (mínimo 30 puntos netos) establecido en las bases oficiales de la Subsecretaría de Defensa.'
              : 'Para superar el corte de la convocatoria necesitas un mínimo de 30 puntos netos. Repasa tus errores en el solucionario abajo.'}
          </p>

          <!-- 4 TARJETAS RESUMEN -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div class="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div class="text-[11px] font-bold text-slate-400">Aciertos (+1,00)</div>
              <div class="text-xl font-black text-emerald-400 mt-1">${res.correct}</div>
            </div>
            <div class="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div class="text-[11px] font-bold text-slate-400">Fallos (-0,33)</div>
              <div class="text-xl font-black text-rose-400 mt-1">${res.wrong}</div>
            </div>
            <div class="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div class="text-[11px] font-bold text-slate-400">En Blanco (0,00)</div>
              <div class="text-xl font-black text-slate-400 mt-1">${res.blank}</div>
            </div>
            <div class="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div class="text-[11px] font-bold text-slate-400">Tiempo Invertido</div>
              <div class="text-sm font-bold text-sky-400 mt-1">${res.timeSpent}</div>
            </div>
          </div>

          <div class="pt-2 flex flex-wrap justify-center gap-3">
            <button onclick="window.app.startNewExam('${res.mode}')" class="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold rounded-xl shadow transition-all text-xs sm:text-sm">
              🔄 Repetir Simulacro
            </button>
            <button onclick="window.app.startNewExam('falladas')" class="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-slate-950 font-extrabold rounded-xl shadow transition-all text-xs sm:text-sm">
              📓 Entrenar Solo Falladas (${this.failedQuestions.size})
            </button>
          </div>
        </div>

        <!-- REVISIÓN Y DESGLOSE PORMENORIZADO CON CITAS DEL BOE -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🔍</span> Solucionario Razonado con Cita Legal
            </h3>

            <!-- FILTRO DE REVISIÓN -->
            <div class="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold">
              <button onclick="window.app.setReviewFilter('all')" class="px-3 py-1 rounded-lg ${this.examState.filterReview === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400'}">
                Todas (${res.total})
              </button>
              <button onclick="window.app.setReviewFilter('wrong')" class="px-3 py-1 rounded-lg ${this.examState.filterReview === 'wrong' ? 'bg-rose-500 text-slate-950' : 'text-slate-400'}">
                Solo Falladas (${res.wrong})
              </button>
              <button onclick="window.app.setReviewFilter('blank')" class="px-3 py-1 rounded-lg ${this.examState.filterReview === 'blank' ? 'bg-slate-700 text-white' : 'text-slate-400'}">
                En Blanco (${res.blank})
              </button>
            </div>
          </div>

          <div class="space-y-4">
            ${filteredReviews.map(item => {
              const q = item.question;
              return `
                <div class="bg-slate-900 border ${item.isCorrect ? 'border-emerald-500/30' : item.isBlank ? 'border-slate-800' : 'border-rose-500/40'} rounded-2xl p-5 space-y-3">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black ${item.isCorrect ? 'bg-emerald-500 text-slate-950' : item.isBlank ? 'bg-slate-800 text-slate-400' : 'bg-rose-500 text-slate-950'}">
                        ${item.num}
                      </span>
                      <span class="text-xs font-bold text-slate-400">${q.topic}</span>
                    </div>

                    <span class="text-xs font-bold px-2 py-0.5 rounded-md ${item.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : item.isBlank ? 'bg-slate-800 text-slate-400' : 'bg-rose-500/20 text-rose-400'}">
                      ${item.isCorrect ? 'Correcta (+1.00)' : item.isBlank ? 'En Blanco (0.00)' : 'Fallo (-0.33)'}
                    </span>
                  </div>

                  <p class="text-sm sm:text-base font-bold text-white leading-relaxed">
                    ${q.question}
                  </p>

                  <!-- OPCIONES -->
                  <div class="space-y-1.5 text-xs sm:text-sm">
                    ${q.options.map((opt, oIdx) => {
                      const isCorrectAnswer = oIdx === q.correct;
                      const isUserChoice = oIdx === item.userAns;
                      let badgeClass = 'bg-slate-950 text-slate-400 border-slate-800';

                      if (isCorrectAnswer) {
                        badgeClass = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold';
                      } else if (isUserChoice && !isCorrectAnswer) {
                        badgeClass = 'bg-rose-500/15 border-rose-500/50 text-rose-300 line-through';
                      }

                      return `
                        <div class="p-3 rounded-xl border flex items-center gap-3 ${badgeClass}">
                          <span class="font-black">${['A', 'B', 'C', 'D'][oIdx]}</span>
                          <span>${opt}</span>
                          ${isCorrectAnswer ? '<span class="ml-auto text-xs text-emerald-400 font-bold">✓ Correcta</span>' : ''}
                          ${isUserChoice && !isCorrectAnswer ? '<span class="ml-auto text-xs text-rose-400 font-bold">✗ Tu opción</span>' : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <!-- JUSTIFICACIÓN LEGAL LITERAL -->
                  <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-1.5">
                    <div class="text-[11px] font-black uppercase text-sky-400 flex items-center gap-1.5">
                      <span>⚖️</span> ${q.law} &bull; ${q.article}
                    </div>
                    <p class="leading-relaxed text-slate-300">${q.explanation}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  setReviewFilter(filter) {
    this.examState.filterReview = filter;
    this.setTab('simulador');
  }

  bindSimulatorEvents() {}

  // =========================================================================
  // MÓDULO 4: FLASHCARDS (RECUPERACIÓN ACTIVA)
  // =========================================================================
  renderFlashcards() {
    const categories = ['all', ...new Set(this.flashcards.map(c => c.category))];
    const filteredCards = this.flashcardState.category === 'all'
      ? this.flashcards
      : this.flashcards.filter(c => c.category === this.flashcardState.category);

    if (this.flashcardState.currentIndex >= filteredCards.length) {
      this.flashcardState.currentIndex = 0;
    }

    const card = filteredCards[this.flashcardState.currentIndex] || filteredCards[0];
    const total = filteredCards.length;
    const currentRating = card ? this.cardRatings[card.id] : null;

    return `
      <div class="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
        <div class="text-center space-y-2">
          <h1 class="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
            <span>🗂️</span> Tarjetas de Recuperación Activa
          </h1>
          <p class="text-xs sm:text-sm text-slate-400">
            Fuerza a tu mente a evocar el concepto antes de voltear la tarjeta. Califica cada respuesta para priorizar las dudosas.
          </p>
        </div>

        <!-- SELECTOR DE CATEGORÍA -->
        <div class="flex flex-wrap justify-center gap-2">
          ${categories.map(cat => `
            <button onclick="window.app.setFlashcardCategory('${cat}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.flashcardState.category === cat ? 'bg-sky-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}">
              ${cat === 'all' ? 'Todas las Categorías' : cat}
            </button>
          `).join('')}
        </div>

        <!-- VISOR DE TARJETA 3D FLIP -->
        ${card ? `
          <div class="perspective-1000 my-6">
            <div onclick="window.app.flipCard()" class="cursor-pointer min-h-[260px] sm:min-h-[300px] w-full bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative select-none">
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span class="font-bold text-sky-400 uppercase tracking-wider">${card.category}</span>
                <span>Tarjeta ${this.flashcardState.currentIndex + 1} de ${total}</span>
              </div>

              <!-- CONTENIDO SEGÚN ESTADO DE VOLTEO -->
              <div class="my-auto py-6 text-center space-y-3">
                ${!this.flashcardState.isFlipped ? `
                  <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">Pregunta / Concepto</div>
                  <div class="text-lg sm:text-2xl font-black text-white leading-relaxed">
                    ${card.front}
                  </div>
                  <div class="text-xs text-sky-400/80 pt-4 flex items-center justify-center gap-1">
                    <span>👆</span> Toca para voltear y ver la solución
                  </div>
                ` : `
                  <div class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Solución Oficial BOE</div>
                  <div class="text-base sm:text-xl font-bold text-emerald-200 leading-relaxed">
                    ${card.back}
                  </div>
                  <div class="text-xs font-mono text-slate-400 pt-2">
                    ⚖️ ${card.reference}
                  </div>
                `}
              </div>

              <div class="text-center text-[11px] text-slate-500">
                ${currentRating ? `Estado actual: <strong class="uppercase text-amber-400">${currentRating}</strong>` : 'Sin evaluar aún'}
              </div>
            </div>
          </div>

          <!-- BOTONES DE AUTOEVALUACIÓN -->
          <div class="grid grid-cols-3 gap-3">
            <button onclick="window.app.rateCard(${card.id}, 'fallada')" class="py-3 px-2 bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 border border-rose-500/30 rounded-2xl text-rose-400 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
              <span>❌</span>
              <span>Fallada</span>
            </button>
            <button onclick="window.app.rateCard(${card.id}, 'duda')" class="py-3 px-2 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-500/30 rounded-2xl text-amber-400 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
              <span>🤔</span>
              <span>Con Duda</span>
            </button>
            <button onclick="window.app.rateCard(${card.id}, 'facil')" class="py-3 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 border border-emerald-500/30 rounded-2xl text-emerald-400 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
              <span>✅</span>
              <span>Fácil</span>
            </button>
          </div>

          <!-- CONTROLES DE NAVEGACIÓN -->
          <div class="flex items-center justify-between pt-4">
            <button onclick="window.app.prevCard()" ${this.flashcardState.currentIndex === 0 ? 'disabled' : ''} class="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 font-bold rounded-xl text-xs">
              &larr; Anterior
            </button>
            <button onclick="window.app.nextCard()" ${this.flashcardState.currentIndex === total - 1 ? 'disabled' : ''} class="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-extrabold rounded-xl text-xs">
              Siguiente &rarr;
            </button>
          </div>
        ` : `
          <div class="text-center py-12 text-slate-400">No hay tarjetas en esta categoría.</div>
        `}
      </div>
    `;
  }

  setFlashcardCategory(cat) {
    this.flashcardState.category = cat;
    this.flashcardState.currentIndex = 0;
    this.flashcardState.isFlipped = false;
    this.setTab('flashcards');
  }

  flipCard() {
    this.flashcardState.isFlipped = !this.flashcardState.isFlipped;
    this.setTab('flashcards');
  }

  rateCard(cardId, rating) {
    this.saveCardRating(cardId, rating);
    this.nextCard();
  }

  nextCard() {
    this.flashcardState.currentIndex++;
    this.flashcardState.isFlipped = false;
    this.setTab('flashcards');
  }

  prevCard() {
    if (this.flashcardState.currentIndex > 0) {
      this.flashcardState.currentIndex--;
      this.flashcardState.isFlipped = false;
      this.setTab('flashcards');
    }
  }

  bindFlashcardsEvents() {}

  // =========================================================================
  // MÓDULO 5: ANALÍTICAS Y CUADRO DE MANDO
  // =========================================================================
  renderAnalytics() {
    const totalSimulacros = this.examHistory.length;
    const mediaPuntos = totalSimulacros > 0
      ? (this.examHistory.reduce((acc, curr) => acc + curr.netScore, 0) / totalSimulacros).toFixed(2)
      : '0.00';
    const aprobadosCount = this.examHistory.filter(h => h.passed).length;
    const probAprobado = totalSimulacros > 0
      ? Math.round((aprobadosCount / totalSimulacros) * 100)
      : 0;

    // Precisión Común vs Específico en todo el historial
    let totalComunCorrect = 0, totalComunTotal = 0;
    let totalEspCorrect = 0, totalEspTotal = 0;

    this.examHistory.forEach(h => {
      if (h.reviewList) {
        h.reviewList.forEach(r => {
          if (r.question && r.question.block === 'comun') {
            totalComunTotal++;
            if (r.isCorrect) totalComunCorrect++;
          } else if (r.question && r.question.block === 'especifico') {
            totalEspTotal++;
            if (r.isCorrect) totalEspCorrect++;
          }
        });
      }
    });

    const pctComun = totalComunTotal > 0 ? Math.round((totalComunCorrect / totalComunTotal) * 100) : 0;
    const pctEsp = totalEspTotal > 0 ? Math.round((totalEspCorrect / totalEspTotal) * 100) : 0;

    return `
      <div class="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>📊</span> Cuadro de Mando y Analíticas
          </h1>
          <p class="text-xs sm:text-sm text-slate-400">
            Diagnóstico continuo de tu rendimiento por bloques para asegurar el aprobado en el examen oficial de Defensa E1.
          </p>
        </div>

        <!-- 3 KPIs MAESTROS -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Simulacros Realizados</div>
            <div class="text-3xl font-black text-white mt-1">${totalSimulacros}</div>
            <div class="text-xs text-sky-400 mt-1">${aprobadosCount} aprobados oficialmente</div>
          </div>

          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Nota Neta Media (-0,33)</div>
            <div class="text-3xl font-black ${mediaPuntos >= 30 ? 'text-emerald-400' : 'text-amber-400'} mt-1">
              ${mediaPuntos} <span class="text-base text-slate-500 font-normal">/ 60</span>
            </div>
            <div class="text-xs text-slate-400 mt-1">Barrera de corte: 30,00 netos</div>
          </div>

          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div class="text-xs text-slate-400 font-bold uppercase tracking-wider">Probabilidad de Plaza</div>
            <div class="text-3xl font-black ${probAprobado >= 60 ? 'text-emerald-400' : probAprobado >= 40 ? 'text-amber-400' : 'text-slate-400'} mt-1">
              ${probAprobado}%
            </div>
            <div class="text-xs text-slate-400 mt-1">Basado en superación de corte</div>
          </div>
        </div>

        <!-- RADAR / BARRAS DE PRECISIÓN POR BLOQUE -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <span>🎯</span> Precisión Discriminada por Bloque de Convocatoria
          </h2>

          <div class="space-y-5">
            <!-- BLOQUE COMÚN -->
            <div>
              <div class="flex justify-between text-xs font-bold mb-1.5">
                <span class="text-indigo-400">Bloque Común (33,3% del examen &bull; Temas 1-4)</span>
                <span class="text-white">${pctComun}% (${totalComunCorrect}/${totalComunTotal})</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-3.5 border border-slate-800 overflow-hidden">
                <div class="bg-indigo-500 h-full rounded-full transition-all duration-500" style="width: ${pctComun}%"></div>
              </div>
            </div>

            <!-- BLOQUE ESPECÍFICO -->
            <div>
              <div class="flex justify-between text-xs font-bold mb-1.5">
                <span class="text-emerald-400">Bloque Específico (66,7% del examen &bull; Temas 5-10)</span>
                <span class="text-white">${pctEsp}% (${totalEspCorrect}/${totalEspTotal})</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-3.5 border border-slate-800 overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all duration-500" style="width: ${pctEsp}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- HISTORIAL DE SIMULACROS -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <span>📜</span> Histórico de Pruebas Realizadas
            </h2>
            ${totalSimulacros > 0 ? `
              <button onclick="window.app.clearHistory()" class="text-xs text-rose-400 hover:underline">
                Borrar Historial
              </button>
            ` : ''}
          </div>

          ${totalSimulacros > 0 ? `
            <div class="space-y-2.5">
              ${this.examHistory.map((h, i) => `
                <div class="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-black uppercase px-2 py-0.5 rounded ${h.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}">
                        ${h.passed ? 'APROBADO' : 'SUSPENSO'}
                      </span>
                      <span class="text-xs font-bold text-white uppercase">${h.mode}</span>
                    </div>
                    <div class="text-[11px] text-slate-500 mt-1">${h.date} &bull; Tiempo: ${h.timeSpent}</div>
                  </div>

                  <div class="flex items-center gap-4 text-xs font-mono">
                    <span class="text-emerald-400 font-bold">+${h.correct} aciertos</span>
                    <span class="text-rose-400 font-bold">-${h.wrong} fallos</span>
                    <span class="text-slate-400">${h.blank} blanco</span>
                    <span class="text-base font-black ${h.passed ? 'text-emerald-400' : 'text-amber-400'} ml-2">
                      ${h.netScore} pts
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-center py-8 text-slate-500 text-xs">
              Aún no has completado ningún simulacro. Inicia uno en la pestaña Simulador.
            </div>
          `}
        </div>
      </div>
    `;
  }

  clearHistory() {
    if (confirm('¿Estás seguro de que deseas borrar tu histórico de simulacros?')) {
      this.examHistory = [];
      localStorage.removeItem('opo_e1_history');
      this.setTab('analiticas');
    }
  }

  bindAnalyticsEvents() {}

  // =========================================================================
  // UTILIDADES
  // =========================================================================
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new OpoDefensaApp();
});
