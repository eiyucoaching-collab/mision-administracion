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

// Detección automática del ejecutable de Chromium preinstalado en la máquina
function getChromiumExecutablePath() {
  const localAppData = process.env.LOCALAPPDATA || '';
  const playwrightDir = path.join(localAppData, 'ms-playwright');
  if (!fs.existsSync(playwrightDir)) return undefined;

  const entries = fs.readdirSync(playwrightDir);
  // Buscar carpetas chromium-* con chrome.exe
  for (const entry of entries) {
    if (entry.startsWith('chromium-')) {
      const candidateWin64 = path.join(playwrightDir, entry, 'chrome-win64', 'chrome.exe');
      if (fs.existsSync(candidateWin64)) return candidateWin64;
      const candidateWin = path.join(playwrightDir, entry, 'chrome-win', 'chrome.exe');
      if (fs.existsSync(candidateWin)) return candidateWin;
    }
  }
  return undefined;
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

function createStaticServer() {
  return http.createServer((req, res) => {
    const rawUrl = req.url.split('?')[0];
    const safePath = path.normalize(rawUrl).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(ROOT_DIR, safePath === '/' ? 'index.html' : safePath);

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

describe('E2E Offline & SPA Full Flow Tests (Playwright Chromium)', () => {
  it('Carga la SPA, activa ServiceWorker, pasa a OFFLINE, recarga, navega pestañas y completa examen por tema', async () => {
    const executablePath = getChromiumExecutablePath();
    assert.ok(executablePath, 'Debe localizar el ejecutable de Chromium preinstalado en ms-playwright');

    // 1. Iniciar servidor HTTP estático local
    const server = createStaticServer();
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = server.address().port;
    const baseUrl = `http://127.0.0.1:${port}/`;

    const consoleErrors = [];
    const network404s = [];

    // 2. Lanzar navegador Chromium
    const browser = await chromium.launch({
      executablePath,
      headless: true
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });

    const page = await context.newPage();

    // Capturar errores de consola y respuestas 404
    page.on('console', msg => {
      const text = msg.text();
      const loc = msg.location();
      const fullDesc = `${text} at ${loc.url || ''}`;
      console.log(`[CONSOLE ${msg.type()}] ${fullDesc}`);
      if (msg.type() === 'error') {
        // Ignorar el fallo esperado de descarga de Google Fonts externas en modo offline
        if (!fullDesc.includes('fonts.googleapis.com') && !fullDesc.includes('fonts.gstatic.com')) {
          consoleErrors.push(fullDesc);
        }
      }
    });

    page.on('requestfailed', req => {
      console.log(`[REQUEST FAILED] ${req.url()} - ${req.failure()?.errorText}`);
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    page.on('response', resp => {
      if (resp.status() >= 400 && !resp.url().includes('favicon.ico')) {
        network404s.push(`${resp.status()} ${resp.url()}`);
      }
    });

    try {
      // 3. Cargar la app online la primera vez para que el SW cachee los recursos
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      const title = await page.title();
      assert.ok(title.includes('MISIÓN ADMINISTRACIÓN'), `Título debe ser el de la app: ${title}`);

      // Esperar a que window.app esté inicializado
      await page.waitForFunction(() => typeof window.app !== 'undefined');

      // Esperar registro y activación completa del ServiceWorker y sus cachés
      await page.waitForFunction(async () => {
        if (!('serviceWorker' in navigator)) return true;
        const reg = await navigator.serviceWorker.ready;
        return !!reg && !!navigator.serviceWorker.controller;
      }, { timeout: 10000 }).catch(() => {
        console.warn('[E2E] ServiceWorker controller timeout, continuando...');
      });

      // 4. PASAR A MODO OFFLINE ESTRICTO
      await context.setOffline(true);

      // 5. RECARGAR EN MODO OFFLINE
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => typeof window.app !== 'undefined');

      // 6. Comprobar que los estilos compilados locales de Tailwind están aplicados
      const bodyBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      // --bg-dark es #070b14 = rgb(7, 11, 20)
      assert.ok(
        bodyBg === 'rgb(7, 11, 20)' || bodyBg.includes('7, 11, 20'),
        `El fondo debe tener el color compilado de la app (#070b14), obtenido: ${bodyBg}`
      );

      // 7. Recorrer todas las pestañas de la SPA
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
        await page.waitForTimeout(50);
        const activeTab = await page.evaluate(() => window.app.activeTab);
        assert.equal(activeTab, tab, `Pestaña activa debe ser ${tab}`);
      }

      // 8. En el simulador, iniciar y completar un examen por tema ("tema:1")
      await page.evaluate(() => window.app.startNewExam('tema:1'));
      await page.waitForFunction(() => window.app.examState && window.app.examState.status === 'running');

      const questionCount = await page.evaluate(() => window.app.examState.questions.length);
      assert.ok(questionCount > 0, 'El examen por tema debe contener preguntas');

      // Responder la primera pregunta
      await page.evaluate(() => {
        const q = window.app.examState.questions[0];
        window.app.selectAnswer(q.id, 0);
      });

      const answered = await page.evaluate(() => Object.keys(window.app.examState.userAnswers).length);
      assert.equal(answered, 1, 'Debe registrar 1 respuesta seleccionada');

      // Finalizar examen
      await page.evaluate(() => window.app.finishExam());
      await page.waitForFunction(() => window.app.examState && window.app.examState.status === 'finished');

      const results = await page.evaluate(() => window.app.examState.results);
      assert.ok(results, 'Debe haber generado resultados de examen');
      assert.ok(results.totalGraded > 0, 'Debe haber calificado preguntas');

      // 9. Comprobar que no hubo errores críticos de consola ni 404
      assert.equal(consoleErrors.length, 0, `No debe haber errores de consola: ${JSON.stringify(consoleErrors)}`);
      assert.equal(network404s.length, 0, `No debe haber peticiones 404: ${JSON.stringify(network404s)}`);

    } finally {
      await context.close();
      await browser.close();
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
