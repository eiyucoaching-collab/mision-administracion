/**
 * MISIÓN ADMINISTRACIÓN (OPO-DEFENSA E1)
 * Arquitectura SPA Frontend Senior - Modo Offline-First
 * E1 Servicios Administrativos (Personal Laboral Fijo Defensa / CUAGE)
 * Incluye:
 * - Preguntas del Examen Oficial Real (1 de Febrero de 2025)
 * - Simulación Oficial 60 + 6 Reservas y Anulaciones Reales del Tribunal
 * - Copia de Seguridad: Exportar / Importar Progreso en JSON (LocalStorage)
 * - Plan de Estudio Táctico con Regla 33% / 67%
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
    this.studySubTab = 'temas'; // 'temas' | 'cifras' | 'trampas' | 'plan'
    this.studySearchQuery = '';

    // Estado del Simulador Oficial
    this.examState = {
      mode: 'oficial', // 'oficial' | 'comun' | 'especifico' | 'falladas' | 'real2025'
      status: 'idle', // 'idle' | 'running' | 'finished'
      questions: [],
      currentIndex: 0,
      userAnswers: {}, // { qId: optionIndex }
      crossedOptions: {}, // { qId: [optIdx, ...] } Descarte táctico (-0,33)
      flagged: new Set(), // Set of qIds marcadas con duda
      timeRemaining: 3600, // 60 minutos = 3600 segundos
      timerInterval: null,
      filterReview: 'all', // 'all' | 'wrong' | 'correct' | 'blank'
      results: null,
      applyAnnulments: false // Simulación de las 7 anulaciones históricas de 2025
    };

    // Estado de Flashcards (Sistema Leitner con Re-inserción Automática)
    this.flashcardState = {
      category: 'all',
      statusFilter: 'all', // 'all' | 'fallada' | 'duda' | 'por_dominar' | 'facil'
      sessionDeck: [],
      currentIndex: 0,
      isFlipped: false,
      reviewedCount: 0,
      reinsertedCount: 0
    };

    // Estado del Drill Ráfaga de Cifras Sagradas (2 Minutos)
    this.cifrasDrillState = {
      status: 'idle', // 'idle' | 'running' | 'finished'
      timeRemaining: 120, // 2 minutos contrarreloj
      timerInterval: null,
      questions: [],
      currentIndex: 0,
      score: { correct: 0, wrong: 0, streak: 0, maxStreak: 0 },
      failedList: [],
      feedback: null
    };

    // Almacenamiento Local (Offline-First)
    this.loadPersistence();

    // Inicializar la baraja de flashcards
    this.initFlashcardSession();

    // Inicializar la aplicación
    this.init();
  }

  // =========================================================================
  // PERSISTENCIA Y COPIAS DE SEGURIDAD (JSON EXPORT/IMPORT)
  // =========================================================================
  loadPersistence() {
    try {
      this.examHistory = JSON.parse(localStorage.getItem('opo_e1_history')) || [];
      this.failedQuestions = new Set(JSON.parse(localStorage.getItem('opo_e1_failed_qids')) || []);
      this.cardRatings = JSON.parse(localStorage.getItem('opo_e1_flashcards_rating')) || {};
      this.planChecklist = JSON.parse(localStorage.getItem('opo_e1_plan_checklist')) || {};
      this.highlighterEnabled = localStorage.getItem('opo_e1_highlighter') !== 'false';
      this.cifrasBestScore = JSON.parse(localStorage.getItem('opo_e1_cifras_drill')) || { bestScore: 0, bestStreak: 0 };
    } catch (e) {
      console.warn('Error cargando LocalStorage:', e);
      this.examHistory = [];
      this.failedQuestions = new Set();
      this.cardRatings = {};
      this.planChecklist = {};
      this.highlighterEnabled = true;
      this.cifrasBestScore = { bestScore: 0, bestStreak: 0 };
    }
  }

  saveHistory(result) {
    this.examHistory.unshift(result);
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

  togglePlanDay(dayNum) {
    this.planChecklist[dayNum] = !this.planChecklist[dayNum];
    try {
      localStorage.setItem('opo_e1_plan_checklist', JSON.stringify(this.planChecklist));
    } catch (e) {}
    this.setTab(this.activeTab);
  }

  // EXPORTAR PROGRESO A FICHERO JSON
  exportProgress() {
    const backupData = {
      app: 'Misión Administración - Opo-Defensa E1',
      version: '2.1.0',
      exportDate: new Date().toISOString(),
      examHistory: this.examHistory,
      failedQuestionIds: Array.from(this.failedQuestions),
      cardRatings: this.cardRatings,
      planChecklist: this.planChecklist,
      highlighterEnabled: this.highlighterEnabled,
      cifrasBestScore: this.cifrasBestScore
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opo-defensa-e1-progreso-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // IMPORTAR PROGRESO DESDE FICHERO JSON
  importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.examHistory) {
          this.examHistory = data.examHistory;
          localStorage.setItem('opo_e1_history', JSON.stringify(this.examHistory));
        }
        if (data.failedQuestionIds) {
          this.failedQuestions = new Set(data.failedQuestionIds);
          localStorage.setItem('opo_e1_failed_qids', JSON.stringify(Array.from(this.failedQuestions)));
        }
        if (data.cardRatings) {
          this.cardRatings = data.cardRatings;
          localStorage.setItem('opo_e1_flashcards_rating', JSON.stringify(this.cardRatings));
        }
        if (data.planChecklist) {
          this.planChecklist = data.planChecklist;
          localStorage.setItem('opo_e1_plan_checklist', JSON.stringify(this.planChecklist));
        }
        if (data.highlighterEnabled !== undefined) {
          this.highlighterEnabled = data.highlighterEnabled;
          localStorage.setItem('opo_e1_highlighter', this.highlighterEnabled ? 'true' : 'false');
        }
        if (data.cifrasBestScore) {
          this.cifrasBestScore = data.cifrasBestScore;
          localStorage.setItem('opo_e1_cifras_drill', JSON.stringify(this.cifrasBestScore));
        }

        this.initFlashcardSession();
        alert('¡Progreso restaurado con éxito! Se han cargado tus estadísticas, cuaderno de fallos y récord de cifras.');
        this.setTab(this.activeTab);
      } catch (err) {
        alert('Error al leer el archivo JSON. Asegúrate de seleccionar un archivo de copia de seguridad válido.');
      }
    };
    reader.readAsText(file);
  }

  // DESCARGAR GUÍA TEÓRICA OFICIAL (STUDIO .MD)
  downloadGuide(topicId) {
    const guides = {
      1: 'guia_tema_01_constitucion_espanola.md',
      2: 'guia_tema_02_gobierno_y_age.md',
      3: 'guia_tema_03_personal_laboral_cuage.md',
      4: 'guia_tema_04_politicas_igualdad_discapacidad.md',
      5: 'guia_tema_05_control_accesos.md',
      6: 'guia_tema_06_paqueteria_valija.md',
      7: 'guia_tema_07_reprografia_formatos_din.md',
      8: 'guia_tema_08_correspondencia_burofax_correos.md',
      9: 'guia_tema_09_recados_oficiales_secretos.md',
      10: 'guia_tema_10_anomalias_averias_prl.md'
    };
    const filename = guides[topicId] || 'guia_estudio.md';
    const link = document.createElement('a');
    link.href = `./guias/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // ALTERNAR EFECTO ROTULADOR / SUBRAYADO MNEMOTÉCNICO
  toggleHighlighter() {
    this.highlighterEnabled = !this.highlighterEnabled;
    try {
      localStorage.setItem('opo_e1_highlighter', this.highlighterEnabled ? 'true' : 'false');
    } catch (e) {}
    this.setTab(this.activeTab);
  }

  // MOTOR MNEMOTÉCNICO COGNITIVO: SUBRAYADO SELECTIVO DE RETENCIÓN RÁPIDA
  applyMnemonicHighlights(html) {
    if (!this.highlighterEnabled || !html) return html;

    // Solo transforma texto plano respetando etiquetas y atributos HTML existentes
    return html.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
      if (tag) return tag;
      if (!text || text.trim() === '') return text;

      let res = text;

      // 1. Rosa Flúor: Prohibiciones tajantes, trampas y salvedades legales
      res = res.replace(/\b(TERMINANTEMENTE PROHIBIDO|NUNCA|JAM[ÁA]S|PROHIBICI[ÓO]N|PROHIBIDO|NO PUEDE FIRMAR|NO son altos cargos|NO se suspenden|NO resta|NO tienen amparo|Bulto deteriorado|Pendiente de revisión)\b/gi,
        '<span class="subrayado-rosa font-bold">$1</span>');

      // 2. Amarillo Neón: Cifras sagradas, plazos, porcentajes y dimensiones exactas
      res = res.replace(/\b(\d+[\d,\.]*\s*(?:días naturales|días laborables|días|horas|meses|semanas|años|metros cuadrados|metros cúbicos|metros|m²|m³|cm|mm|kg|kilogramos|gramos|g\/m²|%|artículos))\b/gi,
        '<span class="subrayado-amarillo font-bold">$1</span>');
      res = res.replace(/\b(3\/5|2\/3|1\/10|17\s*ºC\s*a\s*27\s*ºC|14\s*ºC\s*a\s*25\s*ºC|841\s*x\s*1189\s*mm|594\s*x\s*841\s*mm|420\s*x\s*594\s*mm|297\s*x\s*420\s*mm|210\s*x\s*297\s*mm|148\s*x\s*210\s*mm)\b/gi,
        '<span class="subrayado-amarillo font-bold">$1</span>');

      // 3. Verde Menta: Procedimientos clave, validez, acuses y garantías
      res = res.replace(/\b(Burofax|cartas? certificadas?|acuses? de recibo|doble sobre|recibí por duplicado|hoja de remisión|precinto numerado|Libro de Visitas|armario clavero|por escrito|Procedimiento Preferente y Sumario|Recurso de Amparo|1 mes|15 días naturales|15 días laborables)\b/gi,
        '<span class="subrayado-verde font-bold">$1</span>');

      // 4. Cian Eléctrico: Leyes, Reales Decretos y artículos normativos
      res = res.replace(/\b(artículo\s+\d+(?:\.\d+)?|art\.\s*\d+(?:\.\d+)?|Ley\s+\d+\/\d+|Real\s+Decreto\s+\d+\/\d+|RD\s+486\/1997|TRLET|CUAGE|TREBEP|ISO\s+216|DIN\s+476|DIN\s+66399)\b/gi,
        '<span class="subrayado-cian font-bold">$1</span>');

      // 5. Lila Mnemotécnico: Órganos superiores, directivos y autoridades
      res = res.replace(/\b(Consejo de Ministros|Presidente del Gobierno|Subsecretarios?|Secretarios? de Estado|Delegados? del Gobierno|Subdelegados? del Gobierno|Defensor del Pueblo|Tribunal Constitucional)\b/gi,
        '<span class="subrayado-lila font-bold">$1</span>');

      return res;
    });
  }

  // =========================================================================
  // INICIALIZACIÓN Y ENRUTAMIENTO
  // =========================================================================
  init() {
    window.addEventListener('hashchange', () => this.handleHashChange());
    if (window.location.hash) {
      this.handleHashChange();
    } else {
      this.setTab('dashboard');
    }

    this.registerServiceWorker();
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

    // Limpiar temporizador del Drill si se cambia de pestaña
    if (this.cifrasDrillState && this.cifrasDrillState.timerInterval && tabName !== 'estudio') {
      clearInterval(this.cifrasDrillState.timerInterval);
      this.cifrasDrillState.timerInterval = null;
      this.cifrasDrillState.status = 'idle';
    }

    document.querySelectorAll('[data-tab-target]').forEach(btn => {
      const target = btn.getAttribute('data-tab-target');
      if (target === tabName) {
        btn.classList.add('nav-active');
      } else {
        btn.classList.remove('nav-active');
      }
    });

    const mainContainer = document.getElementById('app-main-content');
    if (!mainContainer) return;

    switch (tabName) {
      case 'dashboard':
        mainContainer.innerHTML = this.renderDashboard();
        break;
      case 'estudio':
        mainContainer.innerHTML = this.renderStudyCenter();
        break;
      case 'simulador':
        mainContainer.innerHTML = this.renderSimulator();
        break;
      case 'flashcards':
        mainContainer.innerHTML = this.renderFlashcards();
        break;
      case 'analiticas':
        mainContainer.innerHTML = this.renderAnalytics();
        break;
      default:
        mainContainer.innerHTML = this.renderDashboard();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('SW registrado:', reg.scope))
          .catch(err => console.log('SW error:', err));
      });
    }
  }

  // =========================================================================
  // MÓDULO 1: DASHBOARD / INICIO
  // =========================================================================
  renderDashboard() {
    const totalSimulacros = this.examHistory.length;
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
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-sky-500/10 text-sky-400 border border-sky-500/30">
                <span class="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                Subsecretaría de Defensa &bull; Grupo E1 Servicios Administrativos
              </span>
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                ⭐ Incluye Examen Real 1-Feb-2025
              </span>
            </div>

            <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Misión Administración <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">Defensa</span>
            </h1>

            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              Centro de Entrenamiento Táctico para Personal Laboral Fijo (IV CUAGE). Formato oficial de <strong>60 preguntas ordinarias + 6 de reserva (60 min)</strong>, penalización (-0,33) y calibración según la <strong>Regla 33% Común / 67% Específico</strong>.
            </p>

            <div class="pt-4 flex flex-wrap gap-3">
              <button onclick="window.app.startNewExam('oficial')" class="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 text-sm sm:text-base">
                <span>🎯</span> Simulacro Oficial Real (60 + 6 Reserva)
              </button>
              <button onclick="window.app.setTab('estudio')" class="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-600 transition-all text-sm sm:text-base flex items-center gap-2">
                <span>📖</span> Temario 10 Temas Íntegros
              </button>
              <button onclick="window.app.setStudySubTab('plan')" class="px-5 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded-xl border border-emerald-500/30 transition-all text-sm flex items-center gap-2">
                <span>📅</span> Plan 33% / 67% (14 Días)
              </button>
            </div>
          </div>
        </div>

        <!-- 4 INDICADORES CARDINALES -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Regla de Examen</div>
            <div class="text-2xl sm:text-3xl font-black text-white mt-1">33% / 67%</div>
            <div class="text-xs text-sky-400 mt-1 font-medium">20 Comunes / 40 Específicas</div>
          </div>

          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Banco de Test</div>
            <div class="text-2xl sm:text-3xl font-black text-white mt-1">204 Preguntas</div>
            <div class="text-xs text-emerald-400 mt-1 font-medium">Con Examen 2025 y Reservas</div>
          </div>

          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Media Neta (-0,33)</div>
            <div class="text-2xl sm:text-3xl font-black ${mediaPuntos >= 30 ? 'text-emerald-400' : 'text-amber-400'} mt-1">
              ${mediaPuntos} <span class="text-sm font-normal text-slate-400">/ 60</span>
            </div>
            <div class="text-xs text-slate-400 mt-1">Corte oficial: 30,00 pts (50%)</div>
          </div>

          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Probabilidad Aprobado</div>
            <div class="text-2xl sm:text-3xl font-black ${probAprobado >= 60 ? 'text-emerald-400' : probAprobado >= 40 ? 'text-amber-400' : 'text-slate-400'} mt-1">
              ${probAprobado}%
            </div>
            <div class="text-xs text-slate-400 mt-1">${aprobadosCount} de ${totalSimulacros} aprobados</div>
          </div>
        </div>

        <!-- SECCIÓN: LA REGLA METODOLÓGICA DEL 33% / 67% -->
        <div class="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Estrategia Metodológica Oficial
              </span>
              <h2 class="text-xl sm:text-2xl font-black text-white mt-2">
                Dónde se Gana Realmente la Plaza en Defensa
              </h2>
            </div>
            <button onclick="window.app.setStudySubTab('plan')" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-all self-start sm:self-auto">
              Ver Calendario 14 Días &rarr;
            </button>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Aprenderse la Constitución o el Gobierno es necesario pero no suficiente. El <strong>66,7% de tu nota final (40 preguntas de 60)</strong> depende exclusivamente de los 6 temas específicos de conserjería, paquetería, reprografía, burofax y seguridad militar. Aplica siempre esta proporción en tus sesiones de estudio:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-indigo-400 uppercase">1/3 del Tiempo &bull; 33,3% del Examen</span>
                <span class="text-xs font-mono font-bold text-white">20 Preguntas</span>
              </div>
              <h3 class="text-base font-bold text-white">Bloque Común (Temas 1 al 4)</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Constitución Española (1978 y reforma art. 49 de 2024), Gobierno y AGE (Ley 50/1997 y Ley 40/2015), Personal Laboral (CUAGE y ET) y Políticas de Igualdad.
              </p>
            </div>

            <div class="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-emerald-400 uppercase">2/3 del Tiempo &bull; 66,7% del Examen</span>
                <span class="text-xs font-mono font-bold text-emerald-400 font-black">40 Preguntas (Clave)</span>
              </div>
              <h3 class="text-base font-bold text-white">Bloque Específico (Temas 5 al 10)</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Control de Accesos militar, Paquetería y Valija, Reprografía y Serie DIN 476, Envíos Postales y Burofax, Recados y Secretos Oficiales, y Averías/PRL (RD 486/1997).
              </p>
            </div>
          </div>
        </div>

        <!-- ACCESOS RÁPIDOS A LOS MODOS DE TEST -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Modos de Entrenamiento Táctico
            </h2>
            <span class="text-xs text-slate-400 font-medium">Selecciona una modalidad</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- MODO 1: SIMULACRO OFICIAL -->
            <div onclick="window.app.startNewExam('oficial')" class="group cursor-pointer bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all shadow-md hover:-translate-y-1">
              <div class="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center text-2xl mb-4 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                🎖️
              </div>
              <h3 class="text-lg font-bold text-white mb-1">Simulacro Real Defensa</h3>
              <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                60 ordinarias + 6 de reserva (60 min). Simulación de penalización (-0,33) y gestión de anulaciones históricas.
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
                20 preguntas de los Temas 1 al 4 (Constitución, Gobierno, Personal Laboral e Igualdad).
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
                40 preguntas de los Temas 5 al 10 (Accesos, Paquetes, DIN 476, Correos, Recados y PRL).
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
                Reentrena tus errores acumulados en LocalStorage hasta vaciar el cuaderno a 0.
              </p>
              <span class="text-xs font-bold text-rose-400 flex items-center gap-1">Repasar Errores &rarr;</span>
            </div>
          </div>
        </div>

        <!-- PANEL DE COPIA DE SEGURIDAD (EXPORTAR / IMPORTAR PROGRESO) -->
        <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-1 text-center sm:text-left">
            <h3 class="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>💾</span> Copia de Seguridad Offline de tu Progreso
            </h3>
            <p class="text-xs text-slate-400 max-w-xl">
              Descarga tus estadísticas y tu cuaderno de errores en un archivo JSON para no perder nada si limpias la memoria de tu móvil o cambias de dispositivo.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button onclick="window.app.exportProgress()" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2 shadow">
              <span>📥</span> Descargar Progreso (JSON)
            </button>
            <label class="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs rounded-xl shadow cursor-pointer flex items-center gap-2">
              <span>📤</span> Restaurar Copia
              <input type="file" accept=".json" onchange="window.app.importProgress(event)" class="hidden">
            </label>
          </div>
        </div>
      </div>
    `;
  }

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
              Programa íntegro de 10 temas: 4 Bloque Común (33%) + 6 Bloque Específico (67%).
            </p>
          </div>

          <!-- SELECTOR DE SUBPESTAÑAS -->
          <div class="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl flex-wrap">
            <button onclick="window.app.setStudySubTab('temas')" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'temas' ? 'bg-sky-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              10 Temas Íntegros
            </button>
            <button onclick="window.app.setStudySubTab('cifras')" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'cifras' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              ⭐ 50 Cifras BOE
            </button>
            <button onclick="window.app.setStudySubTab('trampas')" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'trampas' ? 'bg-rose-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              ⚠️ Control de Trampas
            </button>
            <button onclick="window.app.setStudySubTab('plan')" class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${this.studySubTab === 'plan' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">
              📅 Plan 14 Días (33/67)
            </button>
          </div>
        </div>

        <!-- BARRA DE TÉCNICAS DE ESTUDIO COGNITIVO Y ROTULADOR MNEMOTÉCNICO -->
        <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">🖍️</span>
              <div>
                <h3 class="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <span>Técnica de Subrayado Mnemotécnico Flúor</span>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">Alto Rendimiento</span>
                </h3>
                <p class="text-[11px] text-slate-400">Codificación cromática neurocognitiva para fijar cifras exactas, plazos y neutralizar trampas del Tribunal</p>
              </div>
            </div>
            <button onclick="window.app.toggleHighlighter()" class="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${this.highlighterEnabled ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'}">
              <span>${this.highlighterEnabled ? '⚡' : '⚪'}</span>
              <span>${this.highlighterEnabled ? 'Efecto Subrayado: ACTIVADO' : 'Efecto Subrayado: DESACTIVADO'}</span>
            </button>
          </div>

          <!-- LEYENDA CROMÁTICA OFICIAL -->
          <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-bold">
            <span class="subrayado-amarillo px-2.5 py-0.5 rounded flex items-center gap-1">
              <span>🟡</span> <span>Cifras, Plazos & Fechas BOE</span>
            </span>
            <span class="subrayado-cian px-2.5 py-0.5 rounded flex items-center gap-1">
              <span>🔵</span> <span>Leyes & Conceptos Clave</span>
            </span>
            <span class="subrayado-verde px-2.5 py-0.5 rounded flex items-center gap-1">
              <span>🟢</span> <span>Procedimientos & Garantías</span>
            </span>
            <span class="subrayado-rosa px-2.5 py-0.5 rounded flex items-center gap-1">
              <span>🔴</span> <span>Trampas & Prohibiciones</span>
            </span>
            <span class="subrayado-lila px-2.5 py-0.5 rounded flex items-center gap-1">
              <span>🟣</span> <span>Órganos, Mandos & Rangos</span>
            </span>
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
    if (this.studySubTab === 'plan') {
      return this.renderStudyPlanView();
    }

    // SUBPESTAÑA PRINCIPAL: LOS 10 TEMAS
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- ÍNDICE LATERAL DE LOS 10 TEMAS -->
        <div class="lg:col-span-4 space-y-3">
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
              <span>Temario Oficial</span>
              <span class="text-sky-400 font-mono">10 Temas</span>
            </div>

            <!-- BLOQUE COMÚN (33%) -->
            <div class="mb-4">
              <div class="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                <span>Bloque Común (33,3%)</span>
                <span>20 Q</span>
              </div>
              <div class="space-y-1">
                ${this.syllabus.filter(t => t.block === 'comun').map(t => `
                  <button onclick="window.app.selectTopic(${t.id})" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${t.id === this.selectedTopicId ? 'bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${t.id === this.selectedTopicId ? 'bg-indigo-400 text-slate-950' : 'bg-slate-800 text-slate-400'}">
                      ${t.id}
                    </span>
                    <span class="truncate">${t.shortTitle}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- BLOQUE ESPECÍFICO (67% - DONDE SE GANA LA PLAZA) -->
            <div>
              <div class="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                <span>Bloque Específico (66,7%)</span>
                <span>40 Q</span>
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
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <span>${activeTopic.icon}</span>
                  <span>${activeTopic.weight}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="window.app.downloadGuide(${activeTopic.id})" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm">
                    <span>📥</span> Descargar Guía (.MD)
                  </button>
                  <button onclick="window.print()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm">
                    <span>🖨️</span> Imprimir
                  </button>
                </div>
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
                    ${this.applyMnemonicHighlights(sec.content)}
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
                    <div class="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 sm:p-5 my-4">
                      <div class="flex items-start gap-3">
                        <span class="text-xl">⚠️</span>
                        <div>
                          <h4 class="text-xs sm:text-sm font-extrabold text-rose-300 uppercase tracking-wider mb-1">
                            ${sec.alert.title}
                          </h4>
                          <p class="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                            ${this.applyMnemonicHighlights(sec.alert.desc)}
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
                      <div class="text-sm font-bold text-white mt-0.5">
                        <span class="subrayado-amarillo">${fig.value}</span>
                      </div>
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
                      <span class="subrayado-rosa">${trap}</span>
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

  // CALENDARIO DE ESTUDIO TÁCTICO 14 DÍAS (REGLA 33% / 67%)
  renderStudyPlanView() {
    const planDays = [
      { day: 1, block: "Común (33%)", title: "Tema 1: Constitución Española de 1978", tasks: "Estructura formal, Título Preliminar, valores del 1.1, principios 9.3, Título I y garantías del art. 53.", badge: "bg-indigo-500/20 text-indigo-400" },
      { day: 2, block: "Común (33%)", title: "Tema 1 bis: Reformas Constitucionales", tasks: "Reforma 1992 (art. 13.2), Reforma 2011 (art. 135) y Reforma febrero 2024 (art. 49 personas con discapacidad). Procedimientos arts. 167 y 168.", badge: "bg-indigo-500/20 text-indigo-400" },
      { day: 3, block: "Común (33%)", title: "Tema 2: El Gobierno y la AGE", tasks: "Ley 50/1997, moción censura (1/10 y 5 días) y cuestión confianza. Ley 40/2015: Órganos Superiores, Directivos (Subdirectores NO altos cargos), Delegados y Subdelegados.", badge: "bg-indigo-500/20 text-indigo-400" },
      { day: 4, block: "Común (33%)", title: "Tema 3 y 4: Laboral CUAGE e Igualdad", tasks: "Contrato escrito, periodo de prueba E1 (1 mes CUAGE), despido disciplinario (art. 54 ET). LO 3/2007, LO 1/2004, discapacidad 33% y dependencia.", badge: "bg-indigo-500/20 text-indigo-400" },
      { day: 5, block: "Específico (67%)", title: "Tema 5 (1 Esp): Control de Accesos", tasks: "Identificación obligatoria (DNI/Pasaporte/TIE), Libro de Visitas, pases visibles, límites del conserje E1 (cero fuerza) y custodia de llaves en clavero.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 6, block: "Específico (67%)", title: "Tema 6 (2 Esp): Paquetería y Valija", tasks: "Albaranes y salvedades por daños externos, valija oficial MINISDEF con precintos y hoja de ruta. Protocolo TEDAX ante paquetes sospechosos.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 7, block: "Específico (67%)", title: "Tema 7 (3 Esp): Reprografía y DIN 476", tasks: "Norma ISO 216 / DIN 476: medidas exactas A0 a A5, relación de escalas, gramaje 80 g/m² (peso folio 5 g), alimentador ADF, bypass y desatascos.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 8, block: "Específico (67%)", title: "Tema 8 (4 Esp): Correspondencia Correos", tasks: "Carta ordinaria, certificada (15 días naturales en oficina), Burofax probatorio (Q32 examen 2025), Paquete Azul (20 kg). Oficios vs Notas Interiores.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 9, block: "Específico (67%)", title: "Tema 9 (5 Esp): Recados Oficiales", tasks: "Recados interiores y exteriores, recibí por duplicado. Actuación ante firmas (Q53 examen 2025: solo firmar recibí material). Ley 9/1968 Secretos: doble sobre neutro.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 10, block: "Específico (67%)", title: "Tema 10 (6 Esp): Averías y PRL", tasks: "Partes de avería y avisos urgentes. RD 486/1997: techos 3 m, superficie libre 2 m², pasillos 1 m, temperaturas 17 a 27 ºC. Prohibido ascensor en incendio.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 11, block: "Específico (67%)", title: "Entrenamiento Específico Intensivo", tasks: "Realizar test exclusivo de 40 preguntas del Bloque Específico. Repaso de las 50 Cifras Sagradas y tablas mnemotécnicas.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 12, block: "Específico (67%)", title: "Caza-Trampas Funcional", tasks: "Revisión de las 10 trampas lingüísticas recurrentes de los tribunales de oposición de conserjería militar.", badge: "bg-emerald-500/20 text-emerald-400" },
      { day: 13, block: "Consolidación", title: "Simulacro Oficial Completo (60+6)", tasks: "Realizar el simulacro de 60 ordinarias + 6 de reserva bajo cronómetro de 60 minutos con penalización de -0,33.", badge: "bg-sky-500/20 text-sky-400" },
      { day: 14, block: "Consolidación", title: "Vaciado del Cuaderno de Fallos", tasks: "Reentrenar exclusivamente las preguntas erradas hasta lograr el 100% de acierto y consolidar el aprobado.", badge: "bg-rose-500/20 text-rose-400" }
    ];

    const completedCount = Object.values(this.planChecklist).filter(Boolean).length;
    const progressPct = Math.round((completedCount / 14) * 100);

    return `
      <div class="space-y-6">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Plan Guiado de Alto Rendimiento
              </span>
              <h2 class="text-2xl font-black text-white mt-2">
                Plan Táctico en 14 Días (Regla 33% / 67%)
              </h2>
            </div>
            <div class="text-right">
              <span class="text-xs text-slate-400 font-bold">Progreso del Plan</span>
              <div class="text-xl font-black text-emerald-400">${progressPct}% (${completedCount}/14 días)</div>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
            Este itinerario distribuye exactamente **1/3 del esfuerzo para los 4 temas comunes (Días 1 a 4)** y **2/3 del esfuerzo para los 6 temas específicos (Días 5 a 12)**, asegurando que dedicas el mayor tiempo donde se concentran las 40 preguntas determinantes del examen.
          </p>

          <div class="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
            <div class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <!-- LISTA DE LOS 14 DÍAS CON CHECKBOX INTERACTIVO -->
        <div class="space-y-3">
          ${planDays.map(p => {
            const isDone = !!this.planChecklist[p.day];
            return `
              <div onclick="window.app.togglePlanDay(${p.day})" class="cursor-pointer bg-slate-900 border ${isDone ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'} hover:border-slate-700 rounded-2xl p-5 transition-all flex items-start gap-4">
                <div class="w-6 h-6 shrink-0 mt-0.5 rounded-lg border flex items-center justify-center font-black text-xs transition-colors ${isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-700 text-transparent'}">
                  ✓
                </div>
                <div class="flex-1 space-y-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs font-black text-white">DÍA ${p.day}</span>
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${p.badge}">
                      ${p.block}
                    </span>
                    ${isDone ? '<span class="text-[10px] font-bold text-emerald-400 uppercase ml-auto">Completado</span>' : ''}
                  </div>
                  <h4 class="text-sm sm:text-base font-bold text-white ${isDone ? 'line-through text-slate-400' : ''}">
                    ${p.title}
                  </h4>
                  <p class="text-xs text-slate-400 leading-relaxed">
                    ${p.tasks}
                  </p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // MÓDULO DE CIFRAS SAGRADAS Y DRILL INTERACTIVO CONTRARRELOJ (2 MINUTOS)
  // =========================================================================
  renderCifrasSagradas() {
    if (this.cifrasDrillState.status === 'running') {
      return this.renderCifrasDrillRunning();
    }
    if (this.cifrasDrillState.status === 'finished') {
      return this.renderCifrasDrillFinished();
    }

    return `
      <div class="space-y-6">
        <!-- HERO BANNER: MODO RÁFAGA INTERACTIVO (2 MINUTOS) -->
        <div class="bg-gradient-to-r from-amber-500/20 via-slate-900 to-indigo-950/40 border border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div class="space-y-2 text-center md:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
              <span>⚡ NUEVO</span> <span>Modo Ráfaga Contrarreloj</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-black text-white">
              Drill de Reflejo Numérico (2 Minutos)
            </h3>
            <p class="text-xs sm:text-sm text-slate-300 max-w-xl">
              Mecaniza tu retención: entrena preguntas de memoria instantánea contrarreloj con 4 opciones rápidas para responder en menos de 10 segundos en el examen de Defensa E1.
            </p>
            ${this.cifrasBestScore && this.cifrasBestScore.bestScore > 0 ? `
              <div class="text-xs text-amber-300/90 font-mono pt-1 flex items-center justify-center md:justify-start gap-3">
                <span>⭐ Récord: <strong>${this.cifrasBestScore.bestScore} aciertos</strong></span>
                <span>🔥 Mejor racha: <strong>${this.cifrasBestScore.bestStreak} seguidas</strong></span>
              </div>
            ` : ''}
          </div>
          <button onclick="window.app.startCifrasDrill()" class="shrink-0 px-7 py-4 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-400/25 transition-all text-base flex items-center gap-2.5">
            <span class="text-xl">⚡</span>
            <span>Iniciar Drill (2 Min)</span>
          </button>
        </div>

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
            <button onclick="window.print()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2 shadow-sm">
              <span>🖨️</span> Imprimir en PDF (Ctrl+P)
            </button>
          </div>

          <!-- LISTADO DE LAS 50 CIFRAS -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${this.cifras.map(c => `
              <div class="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-sm">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                      ${c.tema}
                    </span>
                    <span class="subrayado-amarillo text-xs font-black px-2.5 py-0.5 rounded-md pulse-cifra">
                      ${c.cifra}
                    </span>
                  </div>
                  <h4 class="text-sm font-extrabold text-white mb-1.5 leading-snug">
                    <span class="subrayado-cian">${c.concepto}</span>
                  </h4>
                  <p class="text-xs text-slate-300 leading-relaxed pt-1">
                    ${this.applyMnemonicHighlights(c.detalle)}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  startCifrasDrill() {
    this.cifrasDrillState.questions = this.generateCifrasDrillQuestions();
    this.cifrasDrillState.currentIndex = 0;
    this.cifrasDrillState.timeRemaining = 120; // 2 minutos exactos
    this.cifrasDrillState.score = { correct: 0, wrong: 0, streak: 0, maxStreak: 0 };
    this.cifrasDrillState.failedList = [];
    this.cifrasDrillState.feedback = null;
    this.cifrasDrillState.status = 'running';

    if (this.cifrasDrillState.timerInterval) {
      clearInterval(this.cifrasDrillState.timerInterval);
    }

    this.cifrasDrillState.timerInterval = setInterval(() => {
      this.cifrasDrillState.timeRemaining--;
      this.updateCifrasDrillTimer();
      if (this.cifrasDrillState.timeRemaining <= 0) {
        this.finishCifrasDrill();
      }
    }, 1000);

    this.setTab('estudio');
  }

  updateCifrasDrillTimer() {
    const el = document.getElementById('cifras-drill-timer');
    if (!el) return;
    const mins = Math.floor(this.cifrasDrillState.timeRemaining / 60);
    const secs = this.cifrasDrillState.timeRemaining % 60;
    el.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (this.cifrasDrillState.timeRemaining <= 20) {
      el.classList.add('text-rose-400', 'animate-pulse');
    }
  }

  generateDistractors(targetCifra, allCifras) {
    const target = targetCifra.trim().toLowerCase();
    const unitMatch = target.match(/(horas?|d[íi]as|mes(?:es)?|a[ñn]os?|m²|m³|metros?|mm|cm|kg|g\/m²|ºc|%|\d+\/\d+)/i);
    const unit = unitMatch ? unitMatch[1].toLowerCase() : null;

    let pool = allCifras
      .map(c => c.cifra)
      .filter(val => val.trim().toLowerCase() !== target);

    pool = [...new Set(pool)];

    let similar = [];
    if (unit) {
      similar = pool.filter(val => val.toLowerCase().includes(unit));
    }

    const chosen = [];
    similar.sort(() => Math.random() - 0.5);
    for (const s of similar) {
      if (chosen.length < 3 && !chosen.includes(s)) {
        chosen.push(s);
      }
    }

    pool.sort(() => Math.random() - 0.5);
    for (const p of pool) {
      if (chosen.length < 3 && !chosen.includes(p)) {
        chosen.push(p);
      }
    }

    return chosen.slice(0, 3);
  }

  generateCifrasDrillQuestions() {
    const questions = this.cifras.map(c => {
      const distractors = this.generateDistractors(c.cifra, this.cifras);
      const options = [c.cifra, ...distractors].sort(() => Math.random() - 0.5);
      return {
        id: c.id,
        tema: c.tema,
        concepto: c.concepto,
        correct: c.cifra,
        detalle: c.detalle,
        options: options
      };
    });
    return questions.sort(() => Math.random() - 0.5);
  }

  answerCifrasDrill(optIdx) {
    if (this.cifrasDrillState.status !== 'running' || this.cifrasDrillState.feedback !== null) return;

    const q = this.cifrasDrillState.questions[this.cifrasDrillState.currentIndex];
    if (!q) return;

    const chosen = q.options[optIdx];
    const isCorrect = chosen === q.correct;

    if (isCorrect) {
      this.cifrasDrillState.score.correct++;
      this.cifrasDrillState.score.streak++;
      if (this.cifrasDrillState.score.streak > this.cifrasDrillState.score.maxStreak) {
        this.cifrasDrillState.score.maxStreak = this.cifrasDrillState.score.streak;
      }
    } else {
      this.cifrasDrillState.score.wrong++;
      this.cifrasDrillState.score.streak = 0;
      this.cifrasDrillState.failedList.push({ ...q, chosenAnswer: chosen });
    }

    this.cifrasDrillState.feedback = {
      selectedIdx: optIdx,
      isCorrect,
      correctIdx: q.options.indexOf(q.correct)
    };

    this.renderStudyCenterUpdate();

    setTimeout(() => {
      if (this.cifrasDrillState.status !== 'running') return;
      this.cifrasDrillState.feedback = null;
      this.cifrasDrillState.currentIndex++;
      if (this.cifrasDrillState.currentIndex >= this.cifrasDrillState.questions.length) {
        this.finishCifrasDrill();
      } else {
        this.renderStudyCenterUpdate();
      }
    }, 420);
  }

  finishCifrasDrill() {
    if (this.cifrasDrillState.timerInterval) {
      clearInterval(this.cifrasDrillState.timerInterval);
      this.cifrasDrillState.timerInterval = null;
    }
    this.cifrasDrillState.status = 'finished';

    if (this.cifrasDrillState.score.correct > (this.cifrasBestScore?.bestScore || 0)) {
      this.cifrasBestScore = {
        bestScore: this.cifrasDrillState.score.correct,
        bestStreak: Math.max(this.cifrasDrillState.score.maxStreak, this.cifrasBestScore?.bestStreak || 0)
      };
      try {
        localStorage.setItem('opo_e1_cifras_drill', JSON.stringify(this.cifrasBestScore));
      } catch (e) {}
    }

    this.setTab('estudio');
  }

  exitCifrasDrill() {
    if (this.cifrasDrillState.timerInterval) {
      clearInterval(this.cifrasDrillState.timerInterval);
      this.cifrasDrillState.timerInterval = null;
    }
    this.cifrasDrillState.status = 'idle';
    this.setTab('estudio');
  }

  renderStudyCenterUpdate() {
    const mainContainer = document.getElementById('app-main-content');
    if (mainContainer && this.activeTab === 'estudio') {
      mainContainer.innerHTML = this.renderStudyCenter();
    }
  }

  renderCifrasDrillRunning() {
    const q = this.cifrasDrillState.questions[this.cifrasDrillState.currentIndex];
    const totalQ = this.cifrasDrillState.questions.length;
    const mins = Math.floor(this.cifrasDrillState.timeRemaining / 60);
    const secs = this.cifrasDrillState.timeRemaining % 60;
    const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const fb = this.cifrasDrillState.feedback;

    return `
      <div class="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12 select-none">
        <!-- BARRA SUPERIOR DEL DRILL -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between shadow-xl">
          <div class="flex items-center gap-3">
            <button onclick="window.app.exitCifrasDrill()" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all">
              &larr; Salir
            </button>
            <div>
              <div class="text-[10px] font-extrabold uppercase text-slate-400">Progreso</div>
              <div class="text-xs font-black text-sky-400">
                ${this.cifrasDrillState.currentIndex + 1} de ${totalQ}
              </div>
            </div>
          </div>

          <!-- TEMPORIZADOR CONTRARRELOJ -->
          <div id="cifras-drill-timer" class="text-2xl sm:text-3xl font-black font-mono px-4 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 ${this.cifrasDrillState.timeRemaining <= 20 ? 'text-rose-400 animate-pulse' : 'text-amber-400'} shadow-inner">
            ${timerStr}
          </div>

          <!-- MARCADOR Y RACHA -->
          <div class="text-right flex items-center gap-3">
            <div class="${this.cifrasDrillState.score.streak > 2 ? 'animate-combo' : ''}">
              <div class="text-[10px] font-extrabold uppercase text-amber-400">Racha</div>
              <div class="text-base font-black text-white flex items-center justify-end gap-1">
                <span>🔥</span> <span>${this.cifrasDrillState.score.streak}</span>
              </div>
            </div>
            <div>
              <div class="text-[10px] font-extrabold uppercase text-emerald-400">Aciertos</div>
              <div class="text-base font-black text-emerald-300">
                ${this.cifrasDrillState.score.correct}
              </div>
            </div>
          </div>
        </div>

        <!-- TARJETA DEL CONCEPTO -->
        <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
            ${q.tema}
          </span>
          <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">¿Cuál es la cifra o plazo exacto?</div>
          <h2 class="text-xl sm:text-3xl font-black text-white leading-relaxed">
            ${q.concepto}
          </h2>
        </div>

        <!-- 4 BOTONES RÁPIDOS DE OPCIÓN (REACCIÓN INMEDIATA) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          ${q.options.map((opt, idx) => {
            let btnClass = 'bg-slate-900 border-slate-800 hover:border-amber-400 hover:bg-slate-800 text-white active:scale-95';
            if (fb) {
              if (idx === fb.correctIdx) {
                btnClass = 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 font-black';
              } else if (idx === fb.selectedIdx && !fb.isCorrect) {
                btnClass = 'bg-rose-500 border-rose-400 text-white font-black';
              } else {
                btnClass = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-40';
              }
            }

            return `
              <button
                onclick="window.app.answerCifrasDrill(${idx})"
                class="p-4 sm:p-5 rounded-2xl border text-base sm:text-lg font-bold transition-all flex items-center justify-between shadow-md ${btnClass}">
                <span class="truncate">${opt}</span>
                <kbd class="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 opacity-70">${idx + 1}</kbd>
              </button>
            `;
          }).join('')}
        </div>

        <div class="text-center text-xs text-slate-500">
          💡 Puedes responder pulsando en pantalla o con las teclas <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">[1]</kbd>, <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">[2]</kbd>, <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">[3]</kbd>, <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">[4]</kbd>.
        </div>
      </div>
    `;
  }

  renderCifrasDrillFinished() {
    const score = this.cifrasDrillState.score;
    const answered = score.correct + score.wrong;
    const accuracy = answered > 0 ? Math.round((score.correct / answered) * 100) : 0;
    const isNewRecord = score.correct >= (this.cifrasBestScore?.bestScore || 0) && score.correct > 0;

    return `
      <div class="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
        <!-- SCORECARD FINAL -->
        <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <div class="text-5xl">🏆</div>
          <h2 class="text-2xl sm:text-3xl font-black text-white">
            ¡Drill de Cifras Completado!
          </h2>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Has entrenado tu memoria de reflejo numérico para el examen de E1 Servicios Administrativos.
          </p>

          ${isNewRecord ? `
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
              <span>⭐ ¡NUEVO RÉCORD PERSONAL!</span>
            </div>
          ` : ''}

          <!-- MÉTRICAS CLAVE -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <div class="text-[10px] font-bold text-slate-400 uppercase">Aciertos</div>
              <div class="text-2xl font-black text-emerald-400 mt-1">${score.correct}</div>
            </div>
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <div class="text-[10px] font-bold text-slate-400 uppercase">Fallos</div>
              <div class="text-2xl font-black text-rose-400 mt-1">${score.wrong}</div>
            </div>
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <div class="text-[10px] font-bold text-slate-400 uppercase">Precisión</div>
              <div class="text-2xl font-black text-sky-400 mt-1">${accuracy}%</div>
            </div>
            <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
              <div class="text-[10px] font-bold text-slate-400 uppercase">Racha Máx.</div>
              <div class="text-2xl font-black text-amber-400 mt-1">${score.maxStreak}</div>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-3 pt-4">
            <button onclick="window.app.startCifrasDrill()" class="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-amber-400/20">
              ⚡ Repetir Drill (2 Min)
            </button>
            <button onclick="window.app.exitCifrasDrill()" class="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-all border border-slate-700">
              📖 Volver a la Tabla Completa
            </button>
          </div>
        </div>

        <!-- REFUERZO DE CIFRAS FALLADAS -->
        ${this.cifrasDrillState.failedList.length > 0 ? `
          <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-black text-white flex items-center gap-2">
                <span>⚠️</span> Cifras para Consolidar (${this.cifrasDrillState.failedList.length})
              </h3>
              <span class="text-xs text-rose-400 font-bold">Repaso de fallos</span>
            </div>
            <div class="space-y-3">
              ${this.cifrasDrillState.failedList.map(item => `
                <div class="bg-slate-950/80 border border-rose-950/40 rounded-2xl p-4 space-y-2">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                      ${item.tema}
                    </span>
                    <span class="text-xs font-mono line-through text-rose-400 font-bold">
                      Marcaste: ${item.chosenAnswer}
                    </span>
                  </div>
                  <h4 class="text-sm font-bold text-white">${item.concepto}</h4>
                  <div class="text-xs text-slate-300 flex items-center gap-2 pt-1 border-t border-slate-800">
                    <span class="text-emerald-400 font-extrabold">Oficial BOE:</span>
                    <span class="subrayado-amarillo font-black px-2 py-0.5 rounded">${item.correct}</span>
                  </div>
                  <p class="text-xs text-slate-400 pt-1 leading-relaxed">
                    ${this.applyMnemonicHighlights(item.detalle)}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 text-center text-emerald-300 text-sm font-bold">
            🎉 ¡Impresionante! Has clavado todas las respuestas sin cometer un solo fallo.
          </div>
        `}
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
              <div class="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
                <div class="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Trampa #${t.id}: ${t.titulo}</span>
                </div>
                <div class="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 text-xs sm:text-sm text-rose-200 leading-relaxed">
                  <strong class="text-rose-400 block mb-1 flex items-center gap-1.5">
                    <span>❌</span> <span>La Trampa del Tribunal (Falso):</span>
                  </strong>
                  <span class="subrayado-rosa">${t.trampa}</span>
                </div>
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 text-xs sm:text-sm text-emerald-200 leading-relaxed">
                  <strong class="text-emerald-400 block mb-1 flex items-center gap-1.5">
                    <span>✅</span> <span>La Realidad Oficial (BOE - Verdadero):</span>
                  </strong>
                  <span class="subrayado-verde">${t.realidad}</span>
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

  // =========================================================================
  // MÓDULO 3: SIMULADOR DE EXAMEN OFICIAL (MOTOR REAL CON RESERVAS Y 2025)
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
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            ⭐ Examen Oficial Real 1 de Febrero de 2025 Integrado
          </div>
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
              <div class="text-slate-500 text-[11px] mt-0.5">20 comunes + 40 específicas (+6 res)</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div class="text-slate-400">Tiempo Máximo</div>
              <div class="text-base font-bold text-white mt-1">60 Minutos</div>
              <div class="text-slate-500 text-[11px] mt-0.5">Gestión de las 66 preguntas</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div class="text-slate-400">Fórmula de Puntuación</div>
              <div class="text-base font-bold text-amber-400 mt-1">Aciertos - (Errores &times; 1/3)</div>
              <div class="text-slate-500 text-[11px] mt-0.5">Blancas 0. Corte: 30 pts netos</div>
            </div>
          </div>
        </div>

        <!-- SELECTOR DE MODALIDAD DE EXAMEN -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button onclick="window.app.startNewExam('oficial')" class="p-6 bg-gradient-to-br from-sky-950/70 to-slate-900 border border-sky-500/40 hover:border-sky-400 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">🎖️</div>
            <h3 class="text-lg font-bold text-white group-hover:text-sky-300">Simulacro Oficial (60 + 6 Res)</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              El ejercicio íntegro: 60 preguntas ordinarias + 6 de reserva (2 comunes, 4 específicas) bajo cronómetro oficial de 60 minutos.
            </p>
          </button>

          <button onclick="window.app.startNewExam('real2025')" class="p-6 bg-gradient-to-br from-amber-950/70 to-slate-900 border border-amber-500/40 hover:border-amber-400 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">⭐</div>
            <h3 class="text-lg font-bold text-white group-hover:text-amber-300">Examen Real 1-Feb-2025</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              Entrenamiento con las preguntas literales del último examen oficial de Defensa (Burofax Q32, Recados Q53, Subsecretarios Q61 y reservas).
            </p>
          </button>

          <button onclick="window.app.startNewExam('comun')" class="p-6 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">⚖️</div>
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-300">Bloque Común (33%)</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              20 preguntas de los Temas 1 al 4 (Constitución, Gobierno, Personal Laboral CUAGE e Igualdad).
            </p>
          </button>

          <button onclick="window.app.startNewExam('especifico')" class="p-6 bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group">
            <div class="text-3xl mb-3">🛡️</div>
            <h3 class="text-lg font-bold text-white group-hover:text-emerald-300">Bloque Específico (67%)</h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              40 preguntas de los Temas 5 al 10 (Accesos, Paquetes, DIN 476, Correos, Recados y Averías/PRL).
            </p>
          </button>

          <button onclick="window.app.startNewExam('falladas')" class="p-6 bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-3xl text-left transition-all hover:scale-[1.01] shadow-xl group sm:col-span-2 lg:col-span-1">
            <div class="text-3xl mb-3">📓</div>
            <h3 class="text-lg font-bold text-white group-hover:text-rose-300">
              Preguntas Falladas (${this.failedQuestions.size})
            </h3>
            <p class="text-xs text-slate-400 mt-1 leading-relaxed">
              Reentrena las preguntas de tu cuaderno de errores hasta conseguir dominarlas todas a 0 fallos.
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
      // 6 de reserva: 2 comunes (R1, R2) + 4 específicas (R3, R4, R5, R6)
      const comunPool = this.shuffleArray(this.questionBank.filter(q => q.block === 'comun'));
      const espPool = this.shuffleArray(this.questionBank.filter(q => q.block === 'especifico'));

      const comunOrd = comunPool.slice(0, 20);
      const espOrd = espPool.slice(0, 40);
      const comunRes = comunPool.slice(20, 22);
      const espRes = espPool.slice(40, 44);

      pool = [...comunOrd, ...espOrd, ...comunRes, ...espRes];
    } else if (mode === 'real2025') {
      // Priorizar preguntas oficiales reales de la convocatoria de febrero 2025
      const comunPool = this.questionBank.filter(q => q.block === 'comun');
      const espPool = this.questionBank.filter(q => q.block === 'especifico');

      const realComun = comunPool.filter(q => q.isRealExam2025);
      const otherComun = this.shuffleArray(comunPool.filter(q => !q.isRealExam2025));

      const realEsp = espPool.filter(q => q.isRealExam2025);
      const otherEsp = this.shuffleArray(espPool.filter(q => !q.isRealExam2025));

      const comunOrd = [...realComun, ...otherComun.slice(0, 20 - realComun.length)];
      const espOrd = [...realEsp, ...otherEsp.slice(0, 40 - realEsp.length)];
      const comunRes = otherComun.slice(20 - realComun.length, 22 - realComun.length);
      const espRes = otherEsp.slice(40 - realEsp.length, 44 - realEsp.length);

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
      crossedOptions: {}, // { [qId]: [optIdx, ...] } Descarte táctico (-0,33)
      flagged: new Set(),
      timeRemaining: 3600, // 60 min
      timerInterval: null,
      filterReview: 'all',
      results: null,
      applyAnnulments: false
    };

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

    if (this.examState.timeRemaining <= 600) {
      el.classList.add('text-rose-400', 'animate-pulse');
      el.classList.remove('text-sky-400');
    }
  }

  renderActiveExam() {
    const q = this.examState.questions[this.examState.currentIndex];
    const totalQ = this.examState.questions.length;
    const isReserve = (this.examState.mode === 'oficial' || this.examState.mode === 'real2025') && this.examState.currentIndex >= 60;
    const reserveNum = isReserve ? (this.examState.currentIndex - 59) : 0;
    const selectedOpt = this.examState.userAnswers[q.id];
    const isFlagged = this.examState.flagged.has(q.id);

    const answeredCount = Object.keys(this.examState.userAnswers).length;

    return `
      <div class="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
        <!-- BARRA SUPERIOR DE ESTADO DEL SIMULACRO -->
        <div class="sticky top-16 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-black uppercase px-2.5 py-1 rounded-lg ${isReserve ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'}">
              ${isReserve ? `⭐ RESERVA R${reserveNum} (${reserveNum <= 2 ? 'Común' : 'Específica'})` : `Pregunta ${this.examState.currentIndex + 1} de 60`}
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
              ${q.isRealExam2025 ? '<span class="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded ml-2 border border-amber-500/20">Examen Real 2025</span>' : ''}
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

          <!-- INDICADOR TÁCTICO DE DESCARTE (-0,33) -->
          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 px-1 text-xs">
            <div class="flex items-center gap-1.5 text-slate-400">
              <span class="text-amber-400">💡</span>
              <span><strong>Descarte Táctico (−0,33):</strong> Clic derecho, doble clic o pulsa ✂️ para tachar distractores.</span>
            </div>
            ${(() => {
              const crossedList = this.examState.crossedOptions[q.id] || [];
              const remaining = 4 - crossedList.length;
              const isFavorable = crossedList.length >= 2;
              return `
                <div class="font-bold flex items-center gap-1.5 ${isFavorable ? 'text-emerald-400' : crossedList.length === 1 ? 'text-amber-400' : 'text-slate-400'}">
                  <span>Viables:</span>
                  <span class="px-2 py-0.5 rounded-md ${isFavorable ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-slate-800 text-slate-300'}">
                    ${remaining} de 4 ${isFavorable ? '🎯 ¡Compensa arriesgarse!' : ''}
                  </span>
                </div>
              `;
            })()}
          </div>

          <!-- OPCIONES A, B, C, D (GRANDES TÁCTILES CON DESCARTE TÁCTICO) -->
          <div class="space-y-3 pt-2">
            ${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOpt === idx;
              const crossedList = this.examState.crossedOptions[q.id] || [];
              const isCrossed = crossedList.includes(idx);
              return `
                <div class="relative group">
                  <button
                    onclick="window.app.handleOptionClick(${q.id}, ${idx})"
                    oncontextmenu="event.preventDefault(); window.app.toggleCrossOption(${q.id}, ${idx}, event)"
                    ondblclick="window.app.toggleCrossOption(${q.id}, ${idx}, event)"
                    class="w-full text-left p-4 sm:p-5 pr-14 rounded-2xl border transition-all flex items-start gap-4 active:scale-[0.99] select-none ${
                      isCrossed
                        ? 'option-crossed'
                        : isSelected
                          ? 'bg-sky-500/15 border-sky-400 text-white font-medium shadow-md shadow-sky-500/10'
                          : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300'
                    }">
                    <span class="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-black text-xs ${
                      isCrossed
                        ? 'bg-rose-950/60 text-rose-400 border border-rose-800/50'
                        : isSelected
                          ? 'bg-sky-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                    }">
                      ${letter}
                    </span>
                    <span class="text-sm sm:text-base leading-relaxed pt-0.5 ${isCrossed ? 'line-through decoration-rose-500 decoration-2' : ''}">
                      ${opt}
                    </span>
                  </button>

                  <!-- BOTÓN TÁCTIL DE TACHAR/DESCARTAR (MOBILE & DESKTOP) -->
                  <button
                    type="button"
                    onclick="window.app.toggleCrossOption(${q.id}, ${idx}, event)"
                    title="${isCrossed ? 'Restaurar opción descartada' : 'Tachar / Descartar opción (−0,33)'}"
                    class="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                      isCrossed
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30'
                        : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 opacity-70 group-hover:opacity-100'
                    }">
                    <span>${isCrossed ? '↩️' : '✂️'}</span>
                    <span class="hidden sm:inline text-[10px] uppercase font-bold">${isCrossed ? 'Tachada' : 'Tachar'}</span>
                  </button>
                </div>
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

        <!-- REJILLA DE NAVEGACIÓN RÁPIDA -->
        <div id="exam-grid-container" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Cuadrícula Táctil de Navegación Rápida
            </h4>
            <div class="flex items-center gap-3 text-[11px] text-slate-400">
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-sky-400 inline-block"></span> Respondida</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-slate-800 inline-block"></span> Blanco</span>
              <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded bg-amber-400 inline-block"></span> Duda</span>
            </div>
          </div>

          <!-- 60 PREGUNTAS ORDINARIAS -->
          <div>
            <div class="text-[11px] font-bold text-slate-400 uppercase mb-2">Preguntas Ordinarias (1 a 60)</div>
            <div class="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
              ${this.examState.questions.slice(0, 60).map((ques, idx) => {
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

          <!-- 6 PREGUNTAS DE RESERVA (SI ES MODO OFICIAL) -->
          ${this.examState.questions.length > 60 ? `
            <div class="pt-3 border-t border-slate-800">
              <div class="text-[11px] font-bold text-amber-400 uppercase mb-2 flex items-center gap-1.5">
                <span>⭐</span> Preguntas de Reserva (R1 a R6) &bull; Clave ante Anulaciones
              </div>
              <div class="grid grid-cols-6 gap-2">
                ${this.examState.questions.slice(60, 66).map((ques, rIdx) => {
                  const realIdx = 60 + rIdx;
                  const isCurrent = realIdx === this.examState.currentIndex;
                  const hasAns = this.examState.userAnswers[ques.id] !== undefined;
                  const isDuda = this.examState.flagged.has(ques.id);

                  let bgClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                  if (hasAns) bgClass = 'bg-amber-500 text-slate-950 font-black border-amber-400';
                  if (isCurrent) bgClass += ' ring-2 ring-white';

                  return `
                    <button onclick="window.app.jumpToQuestion(${realIdx})" class="h-9 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${bgClass}">
                      R${rIdx + 1}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  handleOptionClick(qId, optIdx) {
    const crossed = this.examState.crossedOptions[qId] || [];
    if (crossed.includes(optIdx)) {
      this.examState.crossedOptions[qId] = crossed.filter(i => i !== optIdx);
    }
    this.selectAnswer(qId, optIdx);
  }

  toggleCrossOption(qId, optIdx, event) {
    if (event) {
      event.stopPropagation();
      if (event.preventDefault) event.preventDefault();
    }
    if (!this.examState.crossedOptions[qId]) {
      this.examState.crossedOptions[qId] = [];
    }
    const crossed = this.examState.crossedOptions[qId];
    const foundIdx = crossed.indexOf(optIdx);
    if (foundIdx >= 0) {
      crossed.splice(foundIdx, 1);
    } else {
      crossed.push(optIdx);
      if (this.examState.userAnswers[qId] === optIdx) {
        delete this.examState.userAnswers[qId];
      }
    }
    this.renderSimulatorUpdate();
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
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    // 1. ATAJOS EN EL SIMULADOR DE EXAMEN
    if (this.activeTab === 'simulador' && this.examState.status === 'running') {
      const key = e.key.toUpperCase();
      const currentQ = this.examState.questions[this.examState.currentIndex];
      if (!currentQ) return;

      if (['1', 'A'].includes(key)) this.handleOptionClick(currentQ.id, 0);
      else if (['2', 'B'].includes(key)) this.handleOptionClick(currentQ.id, 1);
      else if (['3', 'C'].includes(key)) this.handleOptionClick(currentQ.id, 2);
      else if (['4', 'D'].includes(key)) this.handleOptionClick(currentQ.id, 3);
      else if (e.key === 'ArrowRight') this.nextQuestion();
      else if (e.key === 'ArrowLeft') this.prevQuestion();
      return;
    }

    // 2. ATAJOS EN EL MÓDULO DE FLASHCARDS (LEITNER)
    if (this.activeTab === 'flashcards') {
      const deck = this.flashcardState.sessionDeck;
      if (!deck || deck.length === 0 || this.flashcardState.currentIndex >= deck.length) return;
      const currentCard = deck[this.flashcardState.currentIndex];
      if (!currentCard) return;

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        this.flipCard();
      } else if (e.key === '1') {
        e.preventDefault();
        this.rateCard(currentCard.id, 'fallada');
      } else if (e.key === '2') {
        e.preventDefault();
        this.rateCard(currentCard.id, 'duda');
      } else if (e.key === '3') {
        e.preventDefault();
        this.rateCard(currentCard.id, 'facil');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextCard();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevCard();
      }
      return;
    }

    // 3. ATAJOS EN EL DRILL RÁFAGA DE CIFRAS (2 MINUTOS)
    if (this.activeTab === 'estudio' && this.cifrasDrillState && this.cifrasDrillState.status === 'running') {
      const key = e.key.toUpperCase();
      if (['1', 'A'].includes(key)) {
        e.preventDefault();
        this.answerCifrasDrill(0);
      } else if (['2', 'B'].includes(key)) {
        e.preventDefault();
        this.answerCifrasDrill(1);
      } else if (['3', 'C'].includes(key)) {
        e.preventDefault();
        this.answerCifrasDrill(2);
      } else if (['4', 'D'].includes(key)) {
        e.preventDefault();
        this.answerCifrasDrill(3);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.exitCifrasDrill();
      }
      return;
    }
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

    this.calculateResults();
    this.examState.status = 'finished';
    this.saveHistory(this.examState.results);
    this.setTab('simulador');
  }

  // CÁLCULO DE RESULTADOS CON OPCIÓN DE ANULACIONES HISTÓRICAS 2025
  calculateResults() {
    let questionsToGrade = [];
    const isOficial = this.examState.mode === 'oficial';

    if (!isOficial) {
      questionsToGrade = this.examState.questions.map((q, idx) => ({ q, num: idx + 1, isAnnulled: false }));
    } else if (!this.examState.applyAnnulments) {
      // Modo Oficial Estándar: Las primeras 60 preguntas ordinarias
      questionsToGrade = this.examState.questions.slice(0, 60).map((q, idx) => ({ q, num: idx + 1, isAnnulled: false }));
    } else {
      // MODO REAL PLANTILLA DEFINITIVA 2025:
      // Se anularon 7 preguntas: Q10 y Q12 (Común), Q21, Q34, Q35, Q36, Q37 (Específico).
      // Se sustituyen por R1 (Q61), R2 (Q62), R3 (Q63), R4 (Q64), R5 (Q65), R6 (Q66).
      const ord = this.examState.questions.slice(0, 60);
      const res = this.examState.questions.slice(60, 66);

      const annulledMap = {
        9: res[0],   // Q10 anulada -> sustituida por R1
        11: res[1],  // Q12 anulada -> sustituida por R2
        20: res[2],  // Q21 anulada -> sustituida por R3
        33: res[3],  // Q34 anulada -> sustituida por R4
        34: res[4],  // Q35 anulada -> sustituida por R5
        35: res[5],  // Q36 anulada -> sustituida por R6
        36: null     // Q37 anulada -> no quedan más reservas (cuenta sobre 59)
      };

      questionsToGrade = ord.map((q, idx) => {
        if (annulledMap.hasOwnProperty(idx)) {
          const replacement = annulledMap[idx];
          if (replacement) {
            return {
              q: replacement,
              num: `${idx + 1} (Sustituida por R${res.indexOf(replacement) + 1})`,
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
    }

    let correct = 0;
    let wrong = 0;
    let blank = 0;
    const reviewList = [];

    questionsToGrade.forEach(item => {
      const q = item.q;
      const userAns = this.examState.userAnswers[q.id];
      const isCorrect = userAns === q.correct;
      const isBlank = userAns === undefined;

      if (isBlank) {
        blank++;
      } else if (isCorrect) {
        correct++;
        this.failedQuestions.delete(q.id);
      } else {
        wrong++;
        this.failedQuestions.add(q.id);
      }

      reviewList.push({
        num: item.num,
        question: q,
        userAns: userAns,
        isCorrect: isCorrect,
        isBlank: isBlank,
        isAnnulled: item.isAnnulled
      });
    });

    const netScore = Math.max(0, +(correct - (wrong * (1 / 3))).toFixed(2));
    const passed = netScore >= (questionsToGrade.length * 0.5);
    const timeSpentSecs = 3600 - this.examState.timeRemaining;

    this.examState.results = {
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
      reviewList,
      appliedAnnulments: this.examState.applyAnnulments
    };
  }

  toggleAnnulments() {
    this.examState.applyAnnulments = !this.examState.applyAnnulments;
    this.calculateResults();
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
              : 'Para superar el corte necesitas un mínimo de 30 puntos netos. Repasa tus errores en el solucionario abajo.'}
          </p>

          <!-- INTERRUPTOR DE SIMULACIÓN DE ANULACIONES 2025 -->
          ${(this.examState.mode === 'oficial' || this.examState.mode === 'real2025') ? `
            <div class="pt-2">
              <button onclick="window.app.toggleAnnulments()" class="px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all border flex items-center gap-2 mx-auto ${this.examState.applyAnnulments ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg' : 'bg-slate-950/80 text-amber-400 border-amber-500/40 hover:bg-slate-800'}">
                <span>⚡</span>
                <span>${this.examState.applyAnnulments ? 'Desactivar Anulaciones Tribunal 2025' : 'Simular Plantilla Real 2025 (7 Anulaciones + Reservas)'}</span>
              </button>
              <p class="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
                ${this.examState.applyAnnulments
                  ? 'Actualmente viendo la nota final tras sustituir las 7 preguntas anuladas por tus respuestas a las 6 reservas.'
                  : 'Pulsa para comprobar cómo hubiera cambiado tu nota con las 7 anulaciones que dictaminó el tribunal de Defensa en febrero 2025.'}
              </p>
            </div>
          ` : ''}

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
              📓 Entrenar Falladas (${this.failedQuestions.size})
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
                      <span class="w-auto px-2 h-6 rounded-md flex items-center justify-center text-xs font-black ${item.isCorrect ? 'bg-emerald-500 text-slate-950' : item.isBlank ? 'bg-slate-800 text-slate-400' : 'bg-rose-500 text-slate-950'}">
                        ${item.num}
                      </span>
                      <span class="text-xs font-bold text-slate-400">${q.topic}</span>
                      ${q.isRealExam2025 ? '<span class="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Examen Real 2025</span>' : ''}
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
                    <p class="leading-relaxed text-slate-300">${this.applyMnemonicHighlights(q.explanation)}</p>
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

  // =========================================================================
  // =========================================================================
  // MÓDULO 4: FLASHCARDS (SISTEMA LEITNER CON RE-INSERCIÓN Y ATAJOS)
  // =========================================================================
  initFlashcardSession() {
    const cards = this.getFilteredFlashcards();
    this.flashcardState.sessionDeck = [...cards];
    this.flashcardState.currentIndex = 0;
    this.flashcardState.isFlipped = false;
    this.flashcardState.reviewedCount = 0;
    this.flashcardState.reinsertedCount = 0;
  }

  getFilteredFlashcards() {
    let list = this.flashcardState.category === 'all'
      ? [...this.flashcards]
      : this.flashcards.filter(c => c.category === this.flashcardState.category);

    if (this.flashcardState.statusFilter === 'fallada') {
      list = list.filter(c => this.cardRatings[c.id] === 'fallada');
    } else if (this.flashcardState.statusFilter === 'duda') {
      list = list.filter(c => this.cardRatings[c.id] === 'duda');
    } else if (this.flashcardState.statusFilter === 'por_dominar') {
      list = list.filter(c => this.cardRatings[c.id] !== 'facil');
    } else if (this.flashcardState.statusFilter === 'facil') {
      list = list.filter(c => this.cardRatings[c.id] === 'facil');
    }

    return list;
  }

  setFlashcardCategory(cat) {
    this.flashcardState.category = cat;
    this.initFlashcardSession();
    this.setTab('flashcards');
  }

  setFlashcardStatusFilter(status) {
    this.flashcardState.statusFilter = status;
    this.initFlashcardSession();
    this.setTab('flashcards');
  }

  renderFlashcards() {
    const categories = ['all', ...new Set(this.flashcards.map(c => c.category))];

    // Conteo global de cajas Leitner
    const totalCards = this.flashcards.length;
    const falladasCount = this.flashcards.filter(c => this.cardRatings[c.id] === 'fallada').length;
    const dudasCount = this.flashcards.filter(c => this.cardRatings[c.id] === 'duda').length;
    const facilesCount = this.flashcards.filter(c => this.cardRatings[c.id] === 'facil').length;
    const porDominarCount = this.flashcards.filter(c => this.cardRatings[c.id] !== 'facil').length;

    const deck = this.flashcardState.sessionDeck;
    const totalInDeck = deck ? deck.length : 0;
    const isCompleted = totalInDeck > 0 && this.flashcardState.currentIndex >= totalInDeck;

    return `
      <div class="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16">
        <div class="text-center space-y-2">
          <h1 class="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
            <span>🗂️</span> Sistema Leitner de Flashcards
          </h1>
          <p class="text-xs sm:text-sm text-slate-400">
            Repetición espaciada: las tarjetas marcadas como <strong>Falladas</strong> se reinsertan al final de la baraja hasta que las consolides como <strong>Fáciles</strong>.
          </p>
        </div>

        <!-- CAJAS LEITNER: ESTADO GLOBAL DE APRENDIZAJE -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div onclick="window.app.setFlashcardStatusFilter('fallada')" class="cursor-pointer bg-slate-900 border ${this.flashcardState.statusFilter === 'fallada' ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'} hover:border-rose-500/50 rounded-2xl p-3 text-center transition-all shadow-sm">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Caja 1 &bull; Falladas</div>
            <div class="text-xl font-black text-rose-400 mt-0.5">${falladasCount}</div>
          </div>
          <div onclick="window.app.setFlashcardStatusFilter('duda')" class="cursor-pointer bg-slate-900 border ${this.flashcardState.statusFilter === 'duda' ? 'border-amber-500 bg-amber-950/20' : 'border-slate-800'} hover:border-amber-500/50 rounded-2xl p-3 text-center transition-all shadow-sm">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Caja 2 &bull; Con Duda</div>
            <div class="text-xl font-black text-amber-400 mt-0.5">${dudasCount}</div>
          </div>
          <div onclick="window.app.setFlashcardStatusFilter('facil')" class="cursor-pointer bg-slate-900 border ${this.flashcardState.statusFilter === 'facil' ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-800'} hover:border-emerald-500/50 rounded-2xl p-3 text-center transition-all shadow-sm">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Caja 3 &bull; Dominadas</div>
            <div class="text-xl font-black text-emerald-400 mt-0.5">${facilesCount}</div>
          </div>
          <div onclick="window.app.setFlashcardStatusFilter('por_dominar')" class="cursor-pointer bg-slate-900 border ${this.flashcardState.statusFilter === 'por_dominar' ? 'border-sky-500 bg-sky-950/20' : 'border-slate-800'} hover:border-sky-500/50 rounded-2xl p-3 text-center transition-all shadow-sm">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Por Dominar</div>
            <div class="text-xl font-black text-sky-400 mt-0.5">${porDominarCount}</div>
          </div>
        </div>

        <!-- SELECTOR DE FILTRO POR ESTADO LEITNER -->
        <div class="space-y-2">
          <div class="text-[10px] font-extrabold uppercase text-slate-400 text-center tracking-wider">Filtrar por Estado de Aprendizaje</div>
          <div class="flex flex-wrap justify-center gap-2">
            <button onclick="window.app.setFlashcardStatusFilter('all')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.flashcardState.statusFilter === 'all' ? 'bg-sky-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}">
              Todas (${totalCards})
            </button>
            <button onclick="window.app.setFlashcardStatusFilter('fallada')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.flashcardState.statusFilter === 'fallada' ? 'bg-rose-500 text-white shadow' : 'bg-slate-900 border border-slate-800 text-rose-400 hover:text-white'}">
              ❌ Solo Falladas (${falladasCount})
            </button>
            <button onclick="window.app.setFlashcardStatusFilter('duda')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.flashcardState.statusFilter === 'duda' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-amber-400 hover:text-white'}">
              🤔 Solo Dudosas (${dudasCount})
            </button>
            <button onclick="window.app.setFlashcardStatusFilter('por_dominar')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.flashcardState.statusFilter === 'por_dominar' ? 'bg-indigo-500 text-white shadow' : 'bg-slate-900 border border-slate-800 text-indigo-400 hover:text-white'}">
              🎯 Por Dominar (${porDominarCount})
            </button>
            <button onclick="window.app.setFlashcardStatusFilter('facil')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${this.flashcardState.statusFilter === 'facil' ? 'bg-emerald-500 text-slate-950 shadow' : 'bg-slate-900 border border-slate-800 text-emerald-400 hover:text-white'}">
              ✅ Dominadas (${facilesCount})
            </button>
          </div>
        </div>

        <!-- SELECTOR DE CATEGORÍA -->
        <div class="flex flex-wrap justify-center gap-1.5 pt-1">
          ${categories.map(cat => `
            <button onclick="window.app.setFlashcardCategory('${cat}')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${this.flashcardState.category === cat ? 'bg-slate-200 text-slate-950 font-black shadow' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'}">
              ${cat === 'all' ? 'Todos los Temas' : cat}
            </button>
          `).join('')}
        </div>

        <!-- PANTALLA SEGÚN ESTADO DE LA BARAJA -->
        ${isCompleted ? `
          <!-- SESIÓN LEITNER COMPLETADA -->
          <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-5 shadow-2xl animate-fadeIn my-6">
            <div class="text-5xl">🎉</div>
            <h2 class="text-2xl sm:text-3xl font-black text-white">¡Sesión Leitner Completada!</h2>
            <p class="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Has revisado con éxito todas las tarjetas activas de esta ronda.
              ${this.flashcardState.reinsertedCount > 0 ? `<br><span class="text-amber-400 font-bold">⚡ Se reinsertaron y consolidaron ${this.flashcardState.reinsertedCount} tarjetas que habías fallado previamente.</span>` : '<br><span class="text-emerald-400 font-bold">¡Ronda perfecta sin fallos!</span>'}
            </p>
            <div class="flex flex-wrap justify-center gap-3 pt-3">
              <button onclick="window.app.initFlashcardSession(); window.app.setTab('flashcards');" class="px-5 py-3 bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow">
                🔄 Repetir Esta Baraja
              </button>
              ${porDominarCount > 0 ? `
                <button onclick="window.app.setFlashcardStatusFilter('por_dominar')" class="px-5 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow">
                  🎯 Repasar Por Dominar (${porDominarCount})
                </button>
              ` : ''}
              <button onclick="window.app.setFlashcardStatusFilter('all')" class="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all border border-slate-700">
                Ver Todas las Tarjetas
              </button>
            </div>
          </div>
        ` : totalInDeck > 0 ? `
          <!-- VISOR DE TARJETA 3D FLIP -->
          ${(() => {
            const card = deck[this.flashcardState.currentIndex];
            if (!card) return '';
            const currentRating = this.cardRatings[card.id];

            return `
              <div class="perspective-1000 my-4">
                <div onclick="window.app.flipCard()" class="cursor-pointer min-h-[270px] sm:min-h-[310px] w-full bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative select-none">
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span class="font-bold text-sky-400 uppercase tracking-wider">${card.category}</span>
                    <div class="flex items-center gap-2">
                      ${this.flashcardState.reinsertedCount > 0 ? `
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🔄 ${this.flashcardState.reinsertedCount} reinsertadas
                        </span>
                      ` : ''}
                      <span class="font-mono font-bold">${this.flashcardState.currentIndex + 1} / ${totalInDeck}</span>
                    </div>
                  </div>

                  <!-- CONTENIDO SEGÚN ESTADO DE VOLTEO -->
                  <div class="my-auto py-4 text-center space-y-3">
                    ${!this.flashcardState.isFlipped ? `
                      <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pregunta / Concepto</div>
                      <div class="text-lg sm:text-2xl font-black text-white leading-relaxed">
                        ${card.front}
                      </div>
                      <div class="text-xs text-sky-400/90 pt-3 flex items-center justify-center gap-1.5 font-medium">
                        <span>👆 Toca para voltear o pulsa</span>
                        <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[10px]">Espacio</kbd>
                        <span>/</span>
                        <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono text-[10px]">Enter</kbd>
                      </div>
                    ` : `
                      <div class="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Solución Oficial BOE</div>
                      <div class="text-base sm:text-xl font-bold text-emerald-200 leading-relaxed">
                        ${this.applyMnemonicHighlights(card.back)}
                      </div>
                      <div class="text-xs font-mono text-slate-400 pt-2">
                        ⚖️ ${card.reference}
                      </div>
                    `}
                  </div>

                  <div class="text-center text-[11px] text-slate-500">
                    ${currentRating ? `Estado actual: <strong class="uppercase ${currentRating === 'facil' ? 'text-emerald-400' : currentRating === 'duda' ? 'text-amber-400' : 'text-rose-400'}">${currentRating}</strong>` : 'Sin evaluar aún en esta sesión'}
                  </div>
                </div>
              </div>

              <!-- BOTONES DE AUTOEVALUACIÓN (SISTEMA LEITNER CON ATAJOS) -->
              <div class="grid grid-cols-3 gap-3">
                <button onclick="window.app.rateCard(${card.id}, 'fallada')" class="py-3 px-2 bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 border border-rose-500/30 rounded-2xl text-rose-400 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
                  <div class="flex items-center gap-1">
                    <span>❌</span>
                    <span>Fallada</span>
                    <kbd class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950/80 border border-rose-800/80 text-rose-300 ml-1">[1]</kbd>
                  </div>
                  <span class="text-[10px] text-rose-300/80 font-normal">Reinserta al final</span>
                </button>

                <button onclick="window.app.rateCard(${card.id}, 'duda')" class="py-3 px-2 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-500/30 rounded-2xl text-amber-400 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
                  <div class="flex items-center gap-1">
                    <span>🤔</span>
                    <span>Con Duda</span>
                    <kbd class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 border border-amber-800/80 text-amber-300 ml-1">[2]</kbd>
                  </div>
                  <span class="text-[10px] text-amber-300/80 font-normal">Para repasar</span>
                </button>

                <button onclick="window.app.rateCard(${card.id}, 'facil')" class="py-3 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 border border-emerald-500/30 rounded-2xl text-emerald-400 font-extrabold text-xs sm:text-sm transition-all flex flex-col items-center gap-1">
                  <div class="flex items-center gap-1">
                    <span>✅</span>
                    <span>Fácil</span>
                    <kbd class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 ml-1">[3]</kbd>
                  </div>
                  <span class="text-[10px] text-emerald-300/80 font-normal">Consolidada</span>
                </button>
              </div>

              <!-- CONTROLES DE NAVEGACIÓN MANUAL -->
              <div class="flex items-center justify-between pt-3">
                <button onclick="window.app.prevCard()" ${this.flashcardState.currentIndex === 0 ? 'disabled' : ''} class="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5">
                  <span>&larr; Anterior</span>
                  <kbd class="text-[10px] font-mono px-1 rounded bg-black/40 text-slate-400">[←]</kbd>
                </button>
                <button onclick="window.app.nextCard()" ${this.flashcardState.currentIndex === totalInDeck - 1 ? 'disabled' : ''} class="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-1.5">
                  <span>Siguiente &rarr;</span>
                  <kbd class="text-[10px] font-mono px-1 rounded bg-black/20 text-slate-950">[→]</kbd>
                </button>
              </div>
            `;
          })()}
        ` : `
          <!-- ESTADO VACÍO -->
          <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 my-6">
            <div class="text-4xl">🔍</div>
            <h3 class="text-lg font-bold text-white">No hay tarjetas con el filtro seleccionado</h3>
            <p class="text-xs text-slate-400 max-w-sm mx-auto">
              No tienes tarjetas en este estado para la categoría elegida. Puedes cambiar de filtro o reiniciar la baraja.
            </p>
            <div class="pt-2">
              <button onclick="window.app.setFlashcardStatusFilter('all')" class="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs">
                Mostrar Todas las Tarjetas
              </button>
            </div>
          </div>
        `}
      </div>
    `;
  }

  flipCard() {
    this.flashcardState.isFlipped = !this.flashcardState.isFlipped;
    this.setTab('flashcards');
  }

  rateCard(cardId, rating) {
    this.saveCardRating(cardId, rating);
    this.flashcardState.reviewedCount++;

    const deck = this.flashcardState.sessionDeck;
    const currentCard = deck ? deck[this.flashcardState.currentIndex] : null;

    // RE-INSERCIÓN LEITNER: Si la tarjeta es marcada como fallada, se reinserta al final de la baraja activa
    if (rating === 'fallada' && currentCard) {
      deck.push(currentCard);
      this.flashcardState.reinsertedCount++;
    }

    this.flashcardState.currentIndex++;
    this.flashcardState.isFlipped = false;
    this.setTab('flashcards');
  }

  nextCard() {
    if (this.flashcardState.sessionDeck && this.flashcardState.currentIndex < this.flashcardState.sessionDeck.length - 1) {
      this.flashcardState.currentIndex++;
      this.flashcardState.isFlipped = false;
      this.setTab('flashcards');
    }
  }

  prevCard() {
    if (this.flashcardState.currentIndex > 0) {
      this.flashcardState.currentIndex--;
      this.flashcardState.isFlipped = false;
      this.setTab('flashcards');
    }
  }

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
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>📊</span> Cuadro de Mando y Analíticas
            </h1>
            <p class="text-xs sm:text-sm text-slate-400">
              Diagnóstico continuo según la proporción oficial del 33% Común y 67% Específico.
            </p>
          </div>

          <!-- BOTONES DE EXPORTAR / IMPORTAR BACKUP -->
          <div class="flex items-center gap-2">
            <button onclick="window.app.exportProgress()" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 shadow">
              <span>📥</span> Exportar JSON
            </button>
            <label class="px-3.5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs rounded-xl shadow cursor-pointer flex items-center gap-1.5">
              <span>📤</span> Importar
              <input type="file" accept=".json" onchange="window.app.importProgress(event)" class="hidden">
            </label>
          </div>
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
                      ${h.appliedAnnulments ? '<span class="text-[10px] font-bold bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">Plantilla 2025</span>' : ''}
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
