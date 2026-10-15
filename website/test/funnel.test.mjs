// Funnel test: course lesson 10's pre-launch checklist.
// Run: npm test   (starts the server on a temp data dir, drives Chromium with Playwright)
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  const { execSync } = await import('node:child_process');
  const globalRoot = execSync('npm root -g').toString().trim();
  ({ chromium } = require(path.join(globalRoot, 'playwright')));
}

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const PORT = 3911;
const BASE = `http://localhost:${PORT}`;
const PASSWORD = 'test-password-123';
const dataDir = mkdtempSync(path.join(tmpdir(), 'ce-leads-'));
const shotDir = process.env.SHOT_DIR || path.join(root, 'test', 'screenshots');
mkdirSync(shotDir, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' (' + detail + ')' : ''}`);
};

const server = spawn(process.execPath, ['server.js'], {
  cwd: root,
  env: { ...process.env, PORT: String(PORT), ADMIN_PASSWORD: PASSWORD, DATA_DIR: dataDir },
  stdio: ['ignore', 'pipe', 'inherit'],
});
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => d.toString().includes('http://localhost') && resolve());
  server.on('exit', (code) => reject(new Error('server exited ' + code)));
  setTimeout(() => reject(new Error('server start timeout')), 8000);
});

const launchOpts = { headless: true };
try {
  require('node:fs').accessSync('/opt/pw-browsers/chromium');
} catch {}
const browser = await chromium.launch(launchOpts);

try {
  // 1. Portfolio videos play to the end (only those with a src; placeholders reported).
  {
    const page = await browser.newPage();
    await page.goto(`${BASE}/hvac`);
    await page.waitForSelector('.work-card');
    const cards = await page.locator('.work-card').count();
    const videos = page.locator('.work-card video');
    const nVideos = await videos.count();
    check('portfolio renders five creative roles', cards === 5, `${cards} cards`);
    if (nVideos === 0) {
      console.log('SKIP  portfolio videos play to the end (no videos in manifest yet; re-run after portfolio generation)');
    } else {
      for (let i = 0; i < nVideos; i++) {
        const ended = await videos.nth(i).evaluate(
          (v) =>
            new Promise((res) => {
              v.muted = true;
              v.playbackRate = 16;
              v.addEventListener('ended', () => res(true), { once: true });
              v.addEventListener('error', () => res(false), { once: true });
              v.play().catch(() => res(false));
              setTimeout(() => res(false), 60000);
            })
        );
        check(`portfolio video ${i + 1} plays to the end`, ended);
      }
    }
    await page.close();
  }

  // 2. Every CTA opens the same form.
  {
    const page = await browser.newPage();
    await page.goto(`${BASE}/hvac`);
    const ctas = page.locator('[data-open-sample]');
    const n = await ctas.count();
    let allOpen = true;
    let sameText = new Set();
    for (let i = 0; i < n; i++) {
      await ctas.nth(i).scrollIntoViewIfNeeded();
      await ctas.nth(i).click();
      const open = await page.locator('dialog.sample[open] form[data-lead-form]').isVisible();
      allOpen &&= open;
      sameText.add((await ctas.nth(i).innerText()).trim());
      await page.locator('dialog.sample .dialog-close').click();
    }
    check('there is a CTA after every block (≥6 incl. nav)', n >= 6, `${n} CTAs`);
    check('every CTA opens the same free-sample form', allOpen);
    check('every CTA uses the same wording', sameText.size === 1, [...sameText].join(' | '));
    await page.close();
  }

  // 3. Invalid data is rejected, no private fields in URL.
  {
    const page = await browser.newPage();
    await page.goto(`${BASE}/hvac`);
    await page.locator('[data-open-sample]').first().click();
    const dlg = page.locator('dialog.sample');
    await dlg.locator('[name=name]').fill('Test');
    await dlg.locator('[name=email]').fill('not-an-email');
    await dlg.locator('button[type=submit]').click();
    const emailErr = await dlg.locator('[data-err=email]').innerText();
    check('client-side validation rejects a bad email', emailErr.length > 0, emailErr);
    check('no form data leaks into the URL', !page.url().includes('not-an-email') && !page.url().includes('?'), page.url());

    const api = await page.request.post(`${BASE}/api/lead`, {
      data: { name: '', company: 'x'.repeat(500), email: 'bad', town: '', service: '', consent: false },
    });
    const body = await api.json();
    check('server rejects invalid data with 422', api.status() === 422, JSON.stringify(Object.keys(body.errors || {})));
    const xss = await page.request.post(`${BASE}/api/lead`, { headers: { 'content-type': 'text/plain' }, data: 'x' });
    check('server rejects non-JSON bodies', xss.status() === 415);
    await page.close();
  }

  // 4. A marked test request arrives exactly once.
  const marker = `TEST-${Date.now()}`;
  {
    const page = await browser.newPage();
    await page.goto(`${BASE}/hvac`);
    await page.locator('[data-open-sample]').nth(2).click();
    const dlg = page.locator('dialog.sample');
    await dlg.locator('[name=name]').fill('Funnel Test <script>alert(1)</script>');
    await dlg.locator('[name=company]').fill(marker);
    await dlg.locator('[name=email]').fill('test@example.com');
    await dlg.locator('[name=phone]').fill('413-555-0100');
    await dlg.locator('[name=town]').fill('Orange');
    await dlg.locator('[name=service]').selectOption({ index: 1 });
    await dlg.locator('[name=consent]').check();
    await dlg.locator('button[type=submit]').click();
    await dlg.locator('[data-status].ok').waitFor({ timeout: 5000 });
    check('valid submission shows a confirmation', true);
    const stored = JSON.parse(readFileSync(path.join(dataDir, 'leads.json'), 'utf8'));
    check('test request stored exactly once', stored.filter((l) => l.company === marker).length === 1);
    await page.close();
  }

  // 5. Admin is protected; the lead appears once and is escaped.
  {
    const anon = await browser.newContext();
    const r = await anon.request.get(`${BASE}/admin`);
    check('unauthenticated visitor gets 401 on /admin', r.status() === 401, String(r.status()));
    const wrong = await anon.request.get(`${BASE}/admin`, {
      headers: { authorization: 'Basic ' + Buffer.from('admin:wrong').toString('base64') },
    });
    check('wrong password gets 401', wrong.status() === 401);
    await anon.close();

    const ctx = await browser.newContext({ httpCredentials: { username: 'admin', password: PASSWORD } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/admin`);
    const html = await page.content();
    const count = html.split(marker).length - 1;
    check('test request appears once in the admin view', count === 1, `${count}`);
    check('admin output is HTML-escaped', !html.includes('<script>alert(1)</script>'));
    await page.screenshot({ path: path.join(shotDir, 'admin.png'), fullPage: true });
    await ctx.close();
  }

  // 6. Phone and desktop widths, no horizontal scroll.
  for (const [label, width, height] of [['phone', 390, 844], ['desktop', 1280, 900]]) {
    for (const route of ['/', '/hvac', '/free-sample']) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(`${BASE}${route}`);
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(`${route} has no horizontal scroll at ${width}px`, overflow <= 1, `overflow ${overflow}px`);
      const name = `${label}-${route === '/' ? 'home' : route.slice(1)}.png`;
      await page.screenshot({ path: path.join(shotDir, name), fullPage: true });
      await page.close();
    }
  }

  // 7. Security headers and path traversal.
  {
    const ctx = await browser.newContext();
    const r = await ctx.request.get(`${BASE}/hvac`);
    check('CSP header present', !!r.headers()['content-security-policy']);
    const trav = await ctx.request.get(`${BASE}/..%2Fserver.js`);
    check('path traversal blocked', trav.status() === 403 || trav.status() === 404, String(trav.status()));
    await ctx.close();
  }
} finally {
  await browser.close();
  server.kill();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
