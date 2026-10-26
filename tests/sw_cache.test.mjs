import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SW_PATH = path.resolve(__dirname, '..', 'sw.js');

describe('Service Worker Cache Cleanup & Lifecycle Tests', () => {
  it('Verifica que sw.js utiliza v4.6, ejecuta skipWaiting, claim, y el activate borra cachés antiguas (v4.5, v4.4, v4.3, v4.2, v4, v3 y anteriores)', async () => {
    const swCode = fs.readFileSync(SW_PATH, 'utf8');

    // 1. Crear entorno simulado de Service Worker
    const listeners = {};
    let skipWaitingCalled = false;
    let clientsClaimCalled = false;
    const deletedCaches = [];
    const activeCaches = new Set(['opo-defensa-e1-v1', 'opo-defensa-e1-v2', 'opo-defensa-e1-v3', 'opo-defensa-e1-v4', 'opo-defensa-e1-v4.2', 'opo-defensa-e1-v4.3', 'opo-defensa-e1-v4.4', 'opo-defensa-e1-v4.5', 'opo-defensa-e1-v4.6']);

    const mockCaches = {
      keys: async () => Array.from(activeCaches),
      delete: async (key) => {
        deletedCaches.push(key);
        activeCaches.delete(key);
        return true;
      },
      open: async (name) => {
        activeCaches.add(name);
        return {
          addAll: async () => {},
          put: async () => {},
          match: async () => null
        };
      },
      match: async () => null
    };

    const mockSelf = {
      addEventListener: (type, handler) => {
        listeners[type] = handler;
      },
      skipWaiting: () => {
        skipWaitingCalled = true;
      },
      clients: {
        claim: async () => {
          clientsClaimCalled = true;
        }
      },
      caches: mockCaches
    };

    const context = vm.createContext({
      self: mockSelf,
      caches: mockCaches,
      console: {
        log: () => {},
        warn: () => {},
        error: () => {}
      }
    });

    // Ejecutar el script del Service Worker
    vm.runInContext(swCode, context);

    // 2. Verificar que los listeners fueron registrados
    assert.ok(typeof listeners['install'] === 'function', 'Debe registrar listener de install');
    assert.ok(typeof listeners['activate'] === 'function', 'Debe registrar listener de activate');
    assert.ok(typeof listeners['fetch'] === 'function', 'Debe registrar listener de fetch');

    // 3. Simular evento install
    let installWaitPromise = null;
    listeners['install']({
      waitUntil: (promise) => {
        installWaitPromise = promise;
      }
    });
    await installWaitPromise;
    assert.equal(skipWaitingCalled, true, 'Debe invocar skipWaiting() para no quedar bloqueado en waiting');

    // 4. Simular evento activate
    let activateWaitPromise = null;
    listeners['activate']({
      waitUntil: (promise) => {
        activateWaitPromise = promise;
      }
    });
    await activateWaitPromise;

    // 5. Verificar purga de cachés antiguas
    assert.ok(deletedCaches.includes('opo-defensa-e1-v1'), 'Debe haber borrado v1');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v2'), 'Debe haber borrado v2');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v3'), 'Debe haber borrado v3');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v4'), 'Debe haber borrado v4');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v4.2'), 'Debe haber borrado v4.2');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v4.3'), 'Debe haber borrado v4.3');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v4.4'), 'Debe haber borrado v4.4');
    assert.ok(deletedCaches.includes('opo-defensa-e1-v4.5'), 'Debe haber borrado v4.5');
    assert.ok(!deletedCaches.includes('opo-defensa-e1-v4.6'), 'NO debe haber borrado la caché activa v4.6');

    // 6. Verificar que sólo permanece v4.6
    const remainingKeys = await mockCaches.keys();
    assert.deepEqual(remainingKeys, ['opo-defensa-e1-v4.6'], 'Solo debe quedar la caché opo-defensa-e1-v4.6');

    // 7. Verificar que clients.claim() fue invocado
    assert.equal(clientsClaimCalled, true, 'Debe reclamar clientes inmediatamente con clients.claim()');
  });

  it('Verifica que todas las rutas de STATIC_ASSETS en sw.js son relativas (sin "/" inicial)', () => {
    const swCode = fs.readFileSync(SW_PATH, 'utf8');
    const match = swCode.match(/const\s+STATIC_ASSETS\s*=\s*\[([\s\S]*?)\];/);
    assert.ok(match, 'Debe encontrarse el array STATIC_ASSETS en sw.js');

    const assetsStr = match[1];
    const assetEntries = assetsStr
      .split(',')
      .map(s => s.trim().replace(/^['"`]|['"`]$/g, ''))
      .filter(Boolean);

    assert.ok(assetEntries.length > 5, 'Debe contener los assets precacheados');
    for (const asset of assetEntries) {
      assert.ok(
        !asset.startsWith('/'),
        `La ruta ${asset} no debe empezar por "/" (debe ser relativa como "./..." o "...")`
      );
      assert.ok(
        asset.startsWith('./') || asset === '.',
        `La ruta ${asset} debe empezar explícitamente por "./"`
      );
    }
  });
});
