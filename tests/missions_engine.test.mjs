import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  DailyMissionsManager,
  SCHEDULE_TEMPLATES,
  STORAGE_KEY_MISSIONS,
  SUBSANACION_LIMIT
} from '../src/modules/missions_engine.js';

// Mock simple de LocalStorage para pruebas en Node
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] !== undefined ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

// Mock de EventTarget para window en pruebas de eventos
class MockWindow {
  constructor() {
    this.listeners = {};
  }
  addEventListener(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
  }
  removeEventListener(type, cb) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter(fn => fn !== cb);
  }
  dispatchEvent(event) {
    const list = this.listeners[event.type] || [];
    list.forEach(fn => fn(event));
    return true;
  }
}

class MockCustomEvent {
  constructor(type, params = {}) {
    this.type = type;
    this.detail = params.detail || {};
  }
}

describe('Misiones Diarias y Motor de Persistencia (MissionsEngine)', () => {
  let mockStorage;

  beforeEach(() => {
    mockStorage = new MockLocalStorage();
    globalThis.localStorage = mockStorage;
    globalThis.window = new MockWindow();
    globalThis.CustomEvent = MockCustomEvent;
  });

  afterEach(() => {
    delete globalThis.localStorage;
    delete globalThis.window;
    delete globalThis.CustomEvent;
  });

  it('Genera la plantilla correcta según el día de la semana (Lunes = 1)', () => {
    // 2026-10-12 fue Lunes
    const monday = new Date('2026-10-12T10:00:00Z');
    const manager = new DailyMissionsManager(null, monday);
    const mission = manager.getTodayMission();

    assert.equal(mission.date, '2026-10-12');
    assert.ok(mission.titulo.includes('Lunes'));
    assert.ok(Array.isArray(mission.tareas));
    assert.ok(mission.tareas.length >= 3);
  });

  it('Inyecta la tarea administrativa de confirmación IPS Murcia antes del 19/10/2026', () => {
    const preLimit = new Date('2026-10-15T09:00:00Z');
    const manager = new DailyMissionsManager(null, preLimit);
    const mission = manager.getTodayMission();

    const adminTask = mission.tareas.find(t => t.id === 'admin_ips_murcia');
    assert.ok(adminTask, 'Debe existir la tarea prioritaria de Murcia');
    assert.equal(adminTask.tipo, 'admin');
    assert.ok(adminTask.desc.includes('MURCIA'));
  });

  it('No inyecta la tarea de Murcia si la fecha es posterior al 19/10/2026', () => {
    const postLimit = new Date('2026-10-25T09:00:00Z');
    const manager = new DailyMissionsManager(null, postLimit);
    const mission = manager.getTodayMission();

    const adminTask = mission.tareas.find(t => t.id === 'admin_ips_murcia');
    assert.equal(adminTask, undefined, 'No debe existir la tarea de Murcia tras el 19/10');
  });

  it('No inyecta la tarea de Murcia si ya se confirmó previamente en localStorage', () => {
    mockStorage.setItem('opo_ips_murcia_confirmado', 'true');
    const preLimit = new Date('2026-10-15T09:00:00Z');
    const manager = new DailyMissionsManager(null, preLimit);
    const mission = manager.getTodayMission();

    const adminTask = mission.tareas.find(t => t.id === 'admin_ips_murcia');
    assert.equal(adminTask, undefined);
  });

  it('recordProgress acumula progreso, suma XP y completa la misión con bonus al alcanzar todas las metas', () => {
    // Usamos domingo (tipo srs y backup) post-límite para tener sólo 2 tareas
    const sunday = new Date('2026-10-25T17:00:00Z');
    const manager = new DailyMissionsManager(null, sunday);
    const mission = manager.getTodayMission();

    assert.equal(mission.completada, false);
    const initialXp = manager.state.totalXp;

    // Completar tarea srs
    const srsTask = mission.tareas.find(t => t.tipo === 'srs');
    manager.recordProgress('srs', srsTask.meta);
    assert.equal(srsTask.actual, srsTask.meta);
    assert.equal(mission.completada, false);

    // Completar tarea backup
    const backupTask = mission.tareas.find(t => t.tipo === 'backup');
    manager.recordProgress('backup', backupTask.meta);
    assert.equal(backupTask.actual, backupTask.meta);

    // Ahora la misión debe estar completada y haberse sumado el bonus de +100 XP
    assert.equal(mission.completada, true);
    assert.ok(manager.state.totalXp >= initialXp + 100);
    assert.equal(manager.state.streak, 1);
  });

  it('toggleTaskManual permite marcar y desmarcar una tarea manualmente', () => {
    const monday = new Date('2026-10-26T10:00:00Z');
    const manager = new DailyMissionsManager(null, monday);
    const mission = manager.getTodayMission();
    const task = mission.tareas[0];

    assert.equal(task.actual, 0);

    // Marcar como completada
    manager.toggleTaskManual(task.id);
    assert.equal(task.actual, task.meta);

    // Desmarcar
    manager.toggleTaskManual(task.id);
    assert.equal(task.actual, 0);
  });

  it('Escucha eventos globales CustomEvent del DOM y actualiza las tareas correspondientes', () => {
    const monday = new Date('2026-10-26T10:00:00Z');
    const manager = new DailyMissionsManager(null, monday);
    const mission = manager.getTodayMission();

    const clozeTask = mission.tareas.find(t => t.tipo === 'cloze');
    const simTask = mission.tareas.find(t => t.tipo === 'simulacro');

    assert.equal(clozeTask.actual, 0);
    assert.equal(simTask.actual, 0);

    // Disparar evento de literalidad
    window.dispatchEvent(new CustomEvent('opo:cloze-completed', { detail: { count: 3 } }));
    assert.equal(clozeTask.actual, 3);

    // Disparar evento de test terminado en modo oficial
    window.dispatchEvent(new CustomEvent('opo:test-finished', { detail: { mode: 'oficial', questionsCount: 66 } }));
    assert.equal(simTask.actual, 1);
  });

  it('Gestiona racha continua entre días consecutivos', () => {
    const day1 = new Date('2026-10-25T10:00:00Z');
    const manager1 = new DailyMissionsManager(null, day1);
    manager1.updateStreak('2026-10-25');
    assert.equal(manager1.state.streak, 1);

    // Guardar estado y pasar al día 2
    mockStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(manager1.state));

    const day2 = new Date('2026-10-26T10:00:00Z');
    const manager2 = new DailyMissionsManager(null, day2);
    manager2.updateStreak('2026-10-26');
    assert.equal(manager2.state.streak, 2);
  });
});
