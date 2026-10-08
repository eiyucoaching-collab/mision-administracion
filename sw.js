// Service Worker - Misión Administración (Opo-Defensa E1)
const CACHE_NAME = 'opo-defensa-e1-v3';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manual_temario.html',
  './entrenador_eficaz.html',
  './comprension.html',
  './fichas_cifras_sagradas.html',
  './manifest.json',
  './src/app.js',
  './src/data/syllabus.js',
  './src/data/questions.js',
  './src/data/questions.json',
  './src/data/cifras_y_trampas.js',
  './src/data/flashcards.js',
  './src/data/podcasts.js',
  './src/data/esquemas.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching static assets for offline use...');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Some assets failed to precache:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Bypass audio range requests to let native browser media streaming work seamlessly
  if (event.request.headers.get('range') || event.request.url.includes('/audio/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset, fetch update in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
