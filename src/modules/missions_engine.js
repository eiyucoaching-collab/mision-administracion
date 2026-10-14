/**
 * @file src/modules/missions_engine.js
 * @description Motor de Misiones Diarias, Persistencia Reactiva y Notificaciones PWA (Objetivo 19-D Murcia)
 */

export const STORAGE_KEY_MISSIONS = 'opo_e1_daily_missions_v1';
export const EXAM_DATE = new Date('2026-12-19T10:00:00+01:00');
export const SUBSANACION_LIMIT = new Date('2026-10-19T23:59:59+02:00');

// Plantillas de misiones adaptadas al cuadrante real de trabajo y autoescuela
export const SCHEDULE_TEMPLATES = {
  1: { // Lunes (Día Libre - Carga Profunda)
    titulo: 'Lunes de Carga Profunda (Día Libre)',
    ventana: '09:00 - 14:00',
    notificaciones: [{ hora: '09:00', msg: '⚔️ Inicio Bloque Troncal: Teoría + Literalidad + Simulacro' }],
    tareas: [
      { id: 'cloze_mon', tipo: 'cloze', meta: 10, actual: 0, desc: 'Completar 10 extractos en Entrenador de Literalidad (#literalidad)' },
      { id: 'sim_mon', tipo: 'simulacro', meta: 1, actual: 0, desc: 'Ejecutar 1 Simulacro Oficial (60 preg / 60 min) con nota neta ≥ 35' },
      { id: 'srs_mon', tipo: 'srs', meta: 15, actual: 0, desc: 'Limpiar hasta 15 preguntas de Caja 1 y 2 en Bóveda Leitner (#errores)' }
    ]
  },
  2: { // Martes (Autoescuela 10:15-11:00 + Turno Tarde)
    titulo: 'Martes Táctico (Pre y Post Autoescuela)',
    ventana: '08:30 - 10:00 | 11:30 - 13:30 | 21:30 - 22:15',
    notificaciones: [
      { hora: '08:30', msg: '📘 Bloque 1 (08:30-10:00): Literalidad y esquema antes de la autoescuela.' },
      { hora: '10:00', msg: '🚗 Pausa activa: Clase de conducir a las 10:15. Progreso guardado.' },
      { hora: '11:30', msg: '🎯 Bloque 2 (11:30-13:30): Sprint 45 min + Corrección de fallos.' },
      { hora: '21:30', msg: '🌙 Cierre nocturno (45 min): Limpieza rápida de Bóveda Leitner.' }
    ],
    tareas: [
      { id: 'cloze_tue', tipo: 'cloze', meta: 6, actual: 0, desc: '[08:30-10:00] Dominar 6 extractos clave de Literalidad pre-autoescuela' },
      { id: 'sprint_tue', tipo: 'sprint', meta: 45, actual: 0, desc: '[11:30-13:30] Completar 1 Sprint 45\' (45 preguntas) post-autoescuela' },
      { id: 'srs_tue', tipo: 'srs', meta: 10, actual: 0, desc: '[21:30-22:15] Repasar 10 fallos pendientes en Bóveda SRS' }
    ]
  },
  3: { // Miércoles (Turno Intensivo 12:30 - 20:30)
    titulo: 'Miércoles Intensivo (Bloque Único Matinal)',
    ventana: '08:30 - 11:30 (Entrada trabajo: 12:30)',
    notificaciones: [
      { hora: '08:30', msg: '⚡ Miércoles Intensivo: Tienes 3h antes del turno de las 12:30. Prioridad Parte Específica.' }
    ],
    tareas: [
      { id: 'trampa_wed', tipo: 'trampas', meta: 20, actual: 0, desc: '[08:30-09:45] Superar batería Caza-Trampas (20 preguntas críticas)' },
      { id: 'sprint_wed', tipo: 'sprint', meta: 45, actual: 0, desc: '[09:45-11:00] Ejecutar Sprint 45\' centrado en Parte Específica (70% peso)' },
      { id: 'srs_wed', tipo: 'srs', meta: 10, actual: 0, desc: '[11:00-11:30] Graduar 10 tarjetas de la Bóveda Leitner' }
    ]
  },
  4: { // Jueves (Autoescuela 10:15-11:00 + Turno Tarde)
    titulo: 'Jueves de Precisión (Pre y Post Autoescuela)',
    ventana: '08:30 - 10:00 | 11:30 - 13:30 | 21:30 - 22:15',
    notificaciones: [
      { hora: '08:30', msg: '📐 Bloque 1 (08:30-10:00): Plazos, mayorías y tablas técnicas.' },
      { hora: '10:00', msg: '🚗 Fin de bloque 1: Clase de conducir de 10:15 a 11:00.' },
      { hora: '11:30', msg: '🎯 Bloque 2 (11:30-13:30): Batería de test y auditoría de riesgo.' },
      { hora: '21:30', msg: '🌙 Cierre nocturno: Repaso ligero de fallos del día.' }
    ],
    tareas: [
      { id: 'cloze_thu', tipo: 'cloze', meta: 8, actual: 0, desc: '[08:30-10:00] Resolver 8 extractos de plazos/medidas sin errores' },
      { id: 'sprint_thu', tipo: 'sprint', meta: 45, actual: 0, desc: '[11:30-13:30] Completar Sprint 45\' manteniendo rentabilidad positiva en dudas' },
      { id: 'srs_thu', tipo: 'srs', meta: 12, actual: 0, desc: '[21:30-22:15] Limpiar 12 preguntas de la Bóveda de Fallos' }
    ]
  },
  5: { // Viernes
    titulo: 'Viernes de Consolidación Semanal',
    ventana: '09:30 - 13:30',
    notificaciones: [{ hora: '09:30', msg: '🔥 Viernes de Consolidación: Batería de 50+ preguntas y cierre de bloque.' }],
    tareas: [
      { id: 'sim_fri', tipo: 'simulacro', meta: 1, actual: 0, desc: 'Realizar Simulacro o Sprint completo del bloque semanal' },
      { id: 'trampa_fri', tipo: 'trampas', meta: 20, actual: 0, desc: 'Completar sesión Caza-Trampas sin fallar preguntas seguras [🟢]' },
      { id: 'cloze_fri', tipo: 'cloze', meta: 8, actual: 0, desc: 'Repasar 8 extractos de literalidad del bloque específico' }
    ]
  },
  6: { // Sábado
    titulo: 'Sábado de Condiciones Reales (Hora Examen 10:00)',
    ventana: '09:30 - 13:30',
    notificaciones: [{ hora: '09:45', msg: '⏱️ Prepárate: A las 10:00 (hora oficial del 19-D) arranca el Simulacro Oficial.' }],
    tareas: [
      { id: 'sim_sat', tipo: 'simulacro', meta: 1, actual: 0, desc: '[10:00 Exactas] Simulacro Oficial 60+6 preguntas a ritmo real (60 min)' },
      { id: 'srs_sat', tipo: 'srs', meta: 20, actual: 0, desc: 'Auditar y limpiar los fallos generados en el simulacro del sábado' }
    ]
  },
  0: { // Domingo
    titulo: 'Domingo de Descanso Activo y Planificación',
    ventana: '16:30 - 18:00 (Post-turno matinal)',
    notificaciones: [{ hora: '16:30', msg: '🛡️ Sesión ligera dominical: Limpieza SRS y sincronización de backup.' }],
    tareas: [
      { id: 'srs_sun', tipo: 'srs', meta: 15, actual: 0, desc: '[16:30-17:30] Limpieza de Bóveda Leitner (solo tarjetas vencidas)' },
      { id: 'sync_sun', tipo: 'backup', meta: 1, actual: 0, desc: '[17:30-18:00] Sincronizar Gist / Descargar Backup JSON semanal' }
    ]
  }
};

export class DailyMissionsManager {
  constructor(syncCallback = null, customDate = null) {
    this.syncCallback = syncCallback; // Función opcional para disparar Gist Sync
    this.customDate = customDate; // Útil para testing
    this.state = this.loadState();
    this.ensureTodayMission();
    this.bindGlobalEvents();
    this.initNotificationWatcher();
  }

  getTodayKey() {
    const now = this.customDate ? new Date(this.customDate) : new Date();
    return now.toISOString().split('T')[0];
  }

  loadState() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY_MISSIONS);
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error leyendo estado de misiones:', e);
    }
    return {
      streak: 0,
      lastCompletedDate: null,
      totalXp: 0,
      notificationsEnabled: false,
      notifiedTimestamps: {},
      history: {}
    };
  }

  saveState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(this.state));
      }
      if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
        window.dispatchEvent(new CustomEvent('opo:missions-updated', { detail: this.getTodayMission() }));
      }
      if (typeof this.syncCallback === 'function') {
        clearTimeout(this._syncTimeout);
        this._syncTimeout = setTimeout(() => this.syncCallback(this.state), 3000);
      }
    } catch (e) {
      console.error('Error guardando progreso de misiones:', e);
    }
  }

  ensureTodayMission() {
    const todayKey = this.getTodayKey();
    if (!this.state.history[todayKey]) {
      const now = this.customDate ? new Date(this.customDate) : new Date();
      const dayOfWeek = now.getDay();
      const template = SCHEDULE_TEMPLATES[dayOfWeek] || SCHEDULE_TEMPLATES[1];
      const tareas = JSON.parse(JSON.stringify(template.tareas));

      // Si estamos antes del 19/10/2026 y no se ha confirmado Murcia, inyectar tarea administrativa prioritaria
      const isConfirmed = typeof localStorage !== 'undefined' && localStorage.getItem('opo_ips_murcia_confirmado') === 'true';
      if (now <= SUBSANACION_LIMIT && !isConfirmed) {
        tareas.unshift({
          id: 'admin_ips_murcia',
          tipo: 'admin',
          meta: 1,
          actual: 0,
          desc: '⚠️ PRIORIDAD BOE: Confirmar cambio de sede a MURCIA (Recuadro 20) en IPS antes del 19/10'
        });
      }

      this.state.history[todayKey] = {
        date: todayKey,
        titulo: template.titulo,
        ventana: template.ventana,
        notificaciones: template.notificaciones,
        tareas,
        completada: false
      };
      this.saveState();
    }
  }

  getTodayMission() {
    this.ensureTodayMission();
    return this.state.history[this.getTodayKey()];
  }

  /**
   * Actualiza el progreso automáticamente cuando el usuario hace tests, SRS o literalidad
   */
  recordProgress(tipo, cantidad = 1) {
    const mission = this.getTodayMission();
    let changed = false;

    mission.tareas.forEach(t => {
      if (t.tipo === tipo && t.actual < t.meta) {
        t.actual = Math.min(t.meta, t.actual + cantidad);
        this.state.totalXp += (cantidad * 10);
        changed = true;
      }
    });

    const todasCompletas = mission.tareas.every(t => t.actual >= t.meta);
    if (todasCompletas && !mission.completada) {
      mission.completada = true;
      this.updateStreak(mission.date);
      this.state.totalXp += 100; // Bonus por misión diaria completada
      this.sendNotification('🏆 ¡Misión Diaria Completada!', `Has sumado +100 XP. Racha actual: ${this.state.streak} días seguidos.`);
      changed = true;
    }

    if (changed) this.saveState();
  }

  toggleTaskManual(taskId) {
    const mission = this.getTodayMission();
    const task = mission.tareas.find(t => t.id === taskId);
    if (!task) return;

    if (task.actual < task.meta) {
      task.actual = task.meta;
      if (taskId === 'admin_ips_murcia' && typeof localStorage !== 'undefined') {
        localStorage.setItem('opo_ips_murcia_confirmado', 'true');
      }
    } else {
      task.actual = 0;
      if (taskId === 'admin_ips_murcia' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('opo_ips_murcia_confirmado');
      }
    }

    const todasCompletas = mission.tareas.every(t => t.actual >= t.meta);
    if (todasCompletas && !mission.completada) {
      mission.completada = true;
      this.updateStreak(mission.date);
    } else if (!todasCompletas) {
      mission.completada = false;
    }
    this.saveState();
  }

  updateStreak(todayKey) {
    const now = this.customDate ? new Date(this.customDate) : new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split('T')[0];

    if (this.state.lastCompletedDate === yesterdayKey) {
      this.state.streak += 1;
    } else if (this.state.lastCompletedDate !== todayKey) {
      this.state.streak = 1;
    }
    this.state.lastCompletedDate = todayKey;
  }

  bindGlobalEvents() {
    if (typeof window === 'undefined') return;

    window.addEventListener('opo:test-finished', (e) => {
      const { mode, questionsCount } = e.detail || {};
      if (mode === 'simulacro' || mode === 'oficial' || mode === 'real2025') {
        this.recordProgress('simulacro', 1);
      } else if (mode === 'sprint' || mode === 'sprint45') {
        this.recordProgress('sprint', questionsCount || 45);
      } else if (mode === 'trampas') {
        this.recordProgress('trampas', questionsCount || 20);
      } else if (mode === 'srs') {
        this.recordProgress('srs', questionsCount || 10);
      }
    });

    window.addEventListener('opo:cloze-completed', (e) => {
      this.recordProgress('cloze', e.detail?.count || 1);
    });

    window.addEventListener('opo:backup-synced', () => {
      this.recordProgress('backup', 1);
    });
  }

  async requestNotificationPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    try {
      const permission = await Notification.requestPermission();
      this.state.notificationsEnabled = (permission === 'granted');
      this.saveState();
      if (this.state.notificationsEnabled) {
        this.sendNotification('🔔 Alertas Tácticas Activadas', 'Recibirás avisos al inicio de cada bloque y pausas de autoescuela.');
      }
      return this.state.notificationsEnabled;
    } catch (e) {
      console.warn('Error al solicitar permiso de notificación:', e);
      return false;
    }
  }

  async sendNotification(title, body) {
    if (!this.state.notificationsEnabled) return;
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    try {
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title, {
            body,
            icon: './assets/icons/icon-192.png',
            badge: './assets/icons/icon-192.png',
            vibrate: [200, 100, 200],
            tag: `opo-alert-${Date.now()}`
          });
          return;
        }
      }
      new Notification(title, { body, icon: './assets/icons/icon-192.png' });
    } catch (e) {
      console.warn('Fallback notificación:', e);
    }
  }

  initNotificationWatcher() {
    if (typeof window === 'undefined') return;

    if (this._notifInterval) clearInterval(this._notifInterval);
    this._notifInterval = setInterval(() => {
      if (!this.state.notificationsEnabled) return;
      const now = new Date();
      const currentHM = now.toTimeString().slice(0, 5); // "HH:MM"
      const todayKey = this.getTodayKey();
      const mission = this.getTodayMission();

      if (mission && Array.isArray(mission.notificaciones)) {
        mission.notificaciones.forEach(notif => {
          const stampKey = `${todayKey}_${notif.hora}`;
          if (notif.hora === currentHM && !this.state.notifiedTimestamps[stampKey]) {
            this.state.notifiedTimestamps[stampKey] = true;
            this.saveState();
            this.sendNotification('⚔️ Opo-Defensa E1 • Misión en Curso', notif.msg);
          }
        });
      }
    }, 30000); // Chequeo cada 30 segundos
    if (this._notifInterval && typeof this._notifInterval.unref === 'function') {
      this._notifInterval.unref();
    }
  }

  destroy() {
    if (this._notifInterval) {
      clearInterval(this._notifInterval);
      this._notifInterval = null;
    }
    if (this._syncTimeout) {
      clearTimeout(this._syncTimeout);
      this._syncTimeout = null;
    }
  }
}
