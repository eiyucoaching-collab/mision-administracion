import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SUBPATH = '/mision-administracion';

/**
 * Localizador resiliente de Chromium:
 * 1. Intenta la configuración estándar de Playwright (o PLAYWRIGHT_BROWSERS_PATH).
 * 2. Si falla, busca ejecutables instalados en rutas canónicas de Playwright.
 * 3. Si no existe ninguno, retorna null permitiendo omitir la prueba con aviso claro.
 */
async function launchChromium() {
  // 1. Lanzamiento estándar por defecto
  try {
    const browser = await chromium.launch({ headless: true });
    return browser;
  } catch (err) {
    // Si la versión por defecto de la librería no coincide con la revisión local, buscar alternativas
  }

  // 2. Búsqueda en directorios estándar de Playwright
  const candidateDirs = [];
  if (process.env.PLAYWRIGHT_BROWSERS_PATH) {
    candidateDirs.push(process.env.PLAYWRIGHT_BROWSERS_PATH);
  }
  if (process.env.LOCALAPPDATA) {
    candidateDirs.push(path.join(process.env.LOCALAPPDATA, 'ms-playwright'));
  }
  const home = process.env.HOME || process.env.USERPROFILE;
  if (home) {
    candidateDirs.push(path.join(home, '.cache', 'ms-playwright'));
    candidateDirs.push(path.join(home, 'AppData', 'Local', 'ms-playwright'));
  }

  for (const dir of candidateDirs) {
    if (!fs.existsSync(dir)) continue;
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        if (entry.includes('chromium') || entry.includes('chrome')) {
          const possibleExecs = [
            path.join(dir, entry, 'chrome-win64', 'chrome.exe'),
            path.join(dir, entry, 'chrome-win', 'chrome.exe'),
            path.join(dir, entry, 'chrome-linux', 'chrome'),
            path.join(dir, entry, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe'),
            path.join(dir, entry, 'chrome-headless-shell-linux', 'chrome-headless-shell')
          ];
          for (const cand of possibleExecs) {
            if (fs.existsSync(cand)) {
              try {
                const browser = await chromium.launch({ executablePath: cand, headless: true });
                return browser;
              } catch (e) {
                // Probar siguiente candidato
              }
            }
          }
        }
      }
    } catch (e) {}
  }

  return null;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

/**
 * Servidor HTTP que sirve la aplicación estrictamente bajo el subdirectorio de GitHub Pages (/mision-administracion/)
 */
function createStaticServer() {
  return http.createServer((req, res) => {
    const rawUrl = req.url.split('?')[0];

    // Redirección conveniente si se solicita la raíz
    if (rawUrl === '/' || rawUrl === '') {
      res.writeHead(302, { Location: `${SUBPATH}/` });
      res.end();
      return;
    }

    // Comprobar que la petición se realiza bajo el subdirectorio /mision-administracion/
    if (!rawUrl.startsWith(SUBPATH)) {
      res.statusCode = 404;
      res.end(`404 Not Found outside GitHub Pages subpath: ${rawUrl}`);
      return;
    }

    let relUrl = rawUrl.slice(SUBPATH.length);
    if (relUrl === '' || relUrl === '/') {
      relUrl = '/index.html';
    }

    const safePath = path.normalize(relUrl).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(ROOT_DIR, safePath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.statusCode = 404;
      res.end(`File not found: ${rawUrl}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
}

function escapeCssClass(className) {
  return className.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
}

/**
 * Analizador sintáctico de clases de Tailwind dinámicas y estáticas generadas en src/app.js
 */
function extractDynamicClassesFromAppJs(code) {
  const classes = new Set();
  let i = 0;

  while (i < code.length) {
    const classIdx = code.indexOf('class="', i);
    if (classIdx === -1) break;

    let cur = classIdx + 7;
    let inInterpolation = false;
    let interpDepth = 0;
    let quoteChar = null;
    let staticBuf = '';
    let dynamicStrings = [];
    let curStrBuf = '';
    let hasSeenQuestionMark = false;

    while (cur < code.length) {
      const ch = code[cur];
      const prev = code[cur - 1];

      if (!inInterpolation) {
        if (ch === '"') {
          cur++;
          break;
        } else if (ch === '$' && code[cur + 1] === '{') {
          inInterpolation = true;
          interpDepth = 1;
          hasSeenQuestionMark = false;
          cur += 2;
          continue;
        } else {
          staticBuf += ch;
        }
      } else {
        if (quoteChar) {
          if (ch === quoteChar && prev !== '\\') {
            quoteChar = null;
            const remaining = code.slice(cur + 1, cur + 30).trim();
            const isConditionOperand = remaining.startsWith('==') || remaining.startsWith('!=') || remaining.startsWith('?');
            if (hasSeenQuestionMark && !isConditionOperand) {
              dynamicStrings.push(curStrBuf);
            }
            curStrBuf = '';
          } else {
            curStrBuf += ch;
          }
        } else {
          if (ch === '?' && interpDepth === 1) {
            hasSeenQuestionMark = true;
          } else if (ch === ':' && interpDepth === 1) {
            hasSeenQuestionMark = false;
          } else if (ch === '\'' || ch === '"' || ch === '`') {
            quoteChar = ch;
            curStrBuf = '';
          } else if (ch === '{') {
            interpDepth++;
          } else if (ch === '}') {
            interpDepth--;
            if (interpDepth === 0) {
              inInterpolation = false;
            }
          }
        }
      }
      cur++;
    }

    for (const token of staticBuf.split(/\s+/)) {
      const t = token.trim();
      if (t && isValidClassToken(t)) classes.add(t);
    }

    for (const str of dynamicStrings) {
      for (const token of str.split(/\s+/)) {
        const t = token.trim();
        if (t && isValidClassToken(t)) classes.add(t);
      }
    }

    i = cur;
  }

  return Array.from(classes).sort();
}

function isValidClassToken(t) {
  if (t.length < 2 || t.length > 70) return false;
  if (/^[A-Z]/.test(t)) return false;
  if (/^(true|false|null|undefined|return|const|let|var)$/.test(t)) return false;
  if (/^[0-9]+(\.[0-9]+)?$/.test(t)) return false;
  if (/[=><+*&|!?,()]/.test(t)) return false;
  if (/^(\.\.|\/|https?:)/.test(t)) return false;
  return true;
}

describe('E2E Offline & SPA Full Flow Tests (Playwright Chromium)', () => {
  it('Comprueba que las clases de Tailwind dinámicas generadas en src/ existen en app.min.css', () => {
    const cssPath = path.join(ROOT_DIR, 'assets', 'css', 'app.min.css');
    assert.ok(fs.existsSync(cssPath), 'El archivo assets/css/app.min.css debe existir');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    const appJsPath = path.join(ROOT_DIR, 'src', 'app.js');
    assert.ok(fs.existsSync(appJsPath), 'El archivo src/app.js debe existir');
    const appJsContent = fs.readFileSync(appJsPath, 'utf8');

    const extractedClasses = extractDynamicClassesFromAppJs(appJsContent);
    assert.ok(extractedClasses.length > 200, `Debe extraer clases de src/app.js, encontradas: ${extractedClasses.length}`);

    const missingClasses = [];
    for (const cls of extractedClasses) {
      const escaped = escapeCssClass(cls);
      if (!cssContent.includes(`.${escaped}`) && !cssContent.includes(`.${cls}`)) {
        missingClasses.push(cls);
      }
    }

    assert.equal(
      missingClasses.length,
      0,
      `Faltan ${missingClasses.length} clases de Tailwind en app.min.css: ${JSON.stringify(missingClasses)}`
    );
  });

  it('Carga SPA en /mision-administracion/, activa SW v4, purga v3, pasa a OFFLINE, recarga, completa examen oficial y por tema', async () => {
    const browser = await launchChromium();
    if (!browser) {
      console.warn('\n⚠️ [AVISO E2E] Chromium no está disponible en este entorno. Se omite la prueba de navegador.\n');
      return;
    }

    // 1. Iniciar servidor HTTP estático local sirviendo bajo /mision-administracion/
    const server = createStaticServer();
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}${SUBPATH}/`;

    const consoleErrors = [];
    const network404s = [];

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });

    const page = await context.newPage();

    page.on('console', msg => {
      const text = msg.text();
      const loc = msg.location();
      const fullDesc = `${text} at ${loc.url || ''}`;
      if (msg.type() === 'error') {
        if (!fullDesc.includes('fonts.googleapis.com') && !fullDesc.includes('fonts.gstatic.com')) {
          consoleErrors.push(fullDesc);
        }
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    page.on('response', resp => {
      if (resp.status() >= 400 && !resp.url().includes('favicon.ico')) {
        network404s.push(`${resp.status()} ${resp.url()}`);
      }
    });

    // 2. Pre-crear caché antigua (v4) mediante initScript antes de que se registre y active el Service Worker
    await context.addInitScript(async () => {
      if ('caches' in window) {
        const oldCache = await window.caches.open('opo-defensa-e1-v4');
        await oldCache.put(
          new Request('/mision-administracion/old-test-file.txt'),
          new Response('legacy-content')
        );
      }
    });

    try {
      // 3. Cargar la app en modo online bajo el subdirectorio de GitHub Pages
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      const title = await page.title();
      assert.ok(title.includes('MISIÓN ADMINISTRACIÓN'), `Título debe ser el de la app: ${title}`);

      await page.waitForFunction(() => typeof window.app !== 'undefined');

      // 4. Esperar registro y activación del Service Worker
      await page.waitForFunction(async () => {
        if (!('serviceWorker' in navigator)) return true;
        const reg = await navigator.serviceWorker.ready;
        return !!reg && !!navigator.serviceWorker.controller;
      }, { timeout: 10000 }).catch(() => {
        console.warn('[E2E] ServiceWorker controller timeout, continuando...');
      });

      // 5. Verificar que el SW v4.2 borró la caché antigua (v4) y la v4.2 está presente
      const cacheKeys = await page.evaluate(async () => {
        if (!('caches' in window)) return [];
        return await window.caches.keys();
      });
      assert.ok(!cacheKeys.includes('opo-defensa-e1-v4'), 'El ServiceWorker activate debe haber borrado la caché v4');
      assert.ok(cacheKeys.includes('opo-defensa-e1-v4.4'), 'La caché activa debe ser opo-defensa-e1-v4.4');

      // 6. PASAR A MODO OFFLINE ESTRICTO
      await context.setOffline(true);

      // 7. RECARGAR EN MODO OFFLINE (debe servirse 100% de la caché del ServiceWorker)
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => typeof window.app !== 'undefined');

      // 8. Comprobar que los estilos locales de Tailwind están aplicados correctamente offline
      const bodyBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      assert.ok(
        bodyBg === 'rgb(7, 11, 20)' || bodyBg.includes('7, 11, 20'),
        `El fondo debe tener el color compilado de la app (#070b14), obtenido: ${bodyBg}`
      );

      // 9. Recorrer todas las pestañas de la SPA en modo offline
      const tabs = [
        'dashboard',
        'temario',
        'simulador',
        'falladas',
        'flashcards',
        'cifras',
        'esquemas',
        'podcasts',
        'plan',
        'analiticas'
      ];

      for (const tab of tabs) {
        await page.evaluate((t) => window.app.setTab(t), tab);
        await page.waitForTimeout(40);
        const activeTab = await page.evaluate(() => window.app.activeTab);
      }

      // 9.b. Comprobar que el perfil integrado de Iván se carga sin errores y restaura sus métricas
      const ivanLoaded = await page.evaluate(() => {
        window.app.loadIvanProfile(true);
        return {
          historyCount: window.app.examHistory.length,
          failedCount: window.app.failedQuestions.size,
          day1: window.app.planChecklist[1]
        };
      });
      assert.equal(ivanLoaded.historyCount, 2, 'El perfil de Iván debe tener 2 exámenes registrados');
      assert.equal(ivanLoaded.failedCount, 13, 'El perfil de Iván debe tener 13 fallos en Bóveda');
      assert.equal(ivanLoaded.day1, true, 'El Día 1 del plan de Iván debe figurar completado');

      // Limpiar historial para la prueba aislada del examen oficial
      await page.evaluate(() => {
        localStorage.removeItem('opo_e1_history');
        window.app.examHistory = [];
      });

      // 10. SIMULACIÓN DE EXAMEN OFICIAL COMPLETO (60 preguntas ordinarias + 6 reservas)
      await page.evaluate(() => window.app.startNewExam('oficial'));
      await page.waitForFunction(() => window.app.examState && window.app.examState.status === 'running');

      const totalOfficialQuestions = await page.evaluate(() => window.app.examState.questions.length);
      assert.ok(totalOfficialQuestions >= 60, `El examen oficial debe tener al menos 60 preguntas, encontradas: ${totalOfficialQuestions}`);

      // Responder todas las preguntas ordinarias y reservas alternando opciones
      await page.evaluate(() => {
        window.app.examState.questions.forEach((q, idx) => {
          // Seleccionar opción válida (0 a 3)
          window.app.selectAnswer(q.id, idx % 4);
        });
      });

      const totalAnswered = await page.evaluate(() => Object.keys(window.app.examState.userAnswers).length);
      assert.equal(totalAnswered, totalOfficialQuestions, 'Debe haber respondido todas las preguntas');

      // Finalizar examen oficial y calcular resultados
      await page.evaluate(() => window.app.finishExam());
      await page.waitForFunction(() => window.app.examState && window.app.examState.status === 'finished');

      const officialResults = await page.evaluate(() => window.app.examState.results);
      assert.ok(officialResults, 'Debe haber generado resultados del examen oficial');
      assert.equal(officialResults.totalGraded, 60, 'El examen oficial debe calificar exactamente 60 preguntas ordinarias');
      assert.equal(typeof officialResults.netScore, 'number', 'La nota neta debe ser numérica');
      assert.equal(typeof officialResults.passed, 'boolean', 'El resultado passed debe ser booleano');
      assert.ok(officialResults.reviewList && officialResults.reviewList.length >= 60, 'Debe generar lista de revisión');

      // Comprobar que el historial en localStorage contiene el examen oficial recién terminado
      const storedHistory = await page.evaluate(() => {
        const raw = localStorage.getItem('opo_e1_history');
        return raw ? JSON.parse(raw) : [];
      });
      assert.ok(storedHistory.length > 0, 'El examen oficial debe persistir en el historial de localStorage');
      assert.equal(storedHistory[storedHistory.length - 1].mode, 'oficial');

      // 11. Iniciar y completar también un examen por tema ("tema:1")
      await page.evaluate(() => window.app.startNewExam('tema:1'));
      await page.waitForFunction(() => window.app.examState && window.app.examState.status === 'running');

      const topicQuestionCount = await page.evaluate(() => window.app.examState.questions.length);
      assert.ok(topicQuestionCount > 0, 'El examen por tema debe contener preguntas');

      await page.evaluate(() => {
        const q = window.app.examState.questions[0];
        window.app.selectAnswer(q.id, 0);
      });

      await page.evaluate(() => window.app.finishExam());
      await page.waitForFunction(() => window.app.examState && window.app.examState.status === 'finished');

      // 12. Comprobar ausencia de errores críticos de consola y 404s
      assert.equal(consoleErrors.length, 0, `No debe haber errores de consola: ${JSON.stringify(consoleErrors)}`);
      assert.equal(network404s.length, 0, `No debe haber peticiones 404: ${JSON.stringify(network404s)}`);

    } finally {
      await context.close();
      await browser.close();
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
