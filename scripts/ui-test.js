#!/usr/bin/env node
/* Playwright UI test for Bodhi Map graph: node selection, traversal, search,
   zoom, theme, and selected-label visibility. Serves the app over HTTP, drives
   real clicks, asserts via window._cy, and screenshots each scenario. */
'use strict';
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8137;
const SHOTS = path.join(__dirname, 'screens');
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const ok = (name, cond, info) => { results.push({ name, pass: !!cond, info }); console.log(`${cond ? '✓' : '✗ FAIL'}  ${name}${info ? '  — ' + info : ''}`); };

async function shot(page, name) { await page.screenshot({ path: path.join(SHOTS, name + '.png') }); }

async function state(page) {
  return page.evaluate(() => {
    const cy = window._cy;
    const pa = cy.nodes('.path-active');
    const faded = cy.nodes('.faded');
    return {
      nodes: cy.nodes('[!isCluster]').length,
      pathActive: pa.map((n) => n.id()),
      paFont: pa.length ? pa.numericStyle('font-size') : null,
      paLabel: pa.length ? pa.data('label') : null,
      highlights: cy.nodes('.highlight').length,
      fadedOpacity: faded.length ? faded.first().numericStyle('opacity') : null,
      zoom: cy.zoom(),
      theme: document.documentElement.getAttribute('data-theme'),
    };
  });
}

async function clickNode(page, id) {
  const p = await page.evaluate((id) => {
    const cy = window._cy; const n = cy.getElementById(id);
    if (!n || n.length === 0) return null;
    cy.zoom(1.35); cy.center(n);
    const rp = n.renderedPosition();
    const r = document.getElementById('cy').getBoundingClientRect();
    return { x: r.left + rp.x, y: r.top + rp.y };
  }, id);
  if (!p) throw new Error('node not found: ' + id);
  await page.mouse.click(p.x, p.y);
  await page.waitForTimeout(450);
}

(async () => {
  const server = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 900));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  page.on('pageerror', (e) => console.log('  ⚠ page error:', e.message));

  try {
    await page.goto(`http://localhost:${PORT}/app.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => window._cy && window._cy.nodes().length > 0, { timeout: 15000 });
    await page.waitForTimeout(1400);                  // let fcose layout settle
    await page.keyboard.press('Escape');              // dismiss first-visit welcome
    await page.evaluate(() => { var w = document.getElementById('welcomeModal'); if (w) w.classList.remove('open'); });
    await page.waitForTimeout(300);

    // 1) initial load
    let s = await state(page);
    ok('loads with full graph (>110 nodes)', s.nodes > 110, s.nodes + ' nodes');
    ok('default theme is dark', s.theme === 'dark', s.theme);
    await shot(page, '01-load');

    // 2) node selection on the graph canvas
    await clickNode(page, 'lora');
    s = await state(page);
    const panelOpen = await page.evaluate(() => document.getElementById('panel').classList.contains('open'));
    const h2 = await page.textContent('.panel h2');
    ok('clicking a node opens the detail panel', panelOpen);
    ok('panel shows the clicked node (LoRA)', /LoRA/i.test(h2 || ''), h2);
    ok('clicked node is spotlighted (path-active)', s.pathActive.includes('lora'), s.pathActive.join(','));
    ok('selected label is enlarged (font-size ~19)', s.paFont >= 18, s.paFont + 'px');
    ok('neighbors are highlighted', s.highlights >= 1, s.highlights + ' highlighted');
    ok('context stays visible (faded opacity ~0.2, not invisible)', s.fadedOpacity >= 0.15 && s.fadedOpacity <= 0.4, s.fadedOpacity);
    await shot(page, '02-dark-node-selected');

    // 3) traversal via a side-panel connection link
    const target = await page.getAttribute('.panel [data-goto]', 'data-goto');
    await page.click('.panel [data-goto]');
    await page.waitForTimeout(550);
    s = await state(page);
    ok('panel connection link traverses to that node', s.pathActive.includes(target), 'target=' + target + ' active=' + s.pathActive.join(','));
    ok('traversed node label is enlarged', s.paFont >= 18, s.paFont + 'px');
    await shot(page, '03-traversed');

    // 4) fuzzy search → Enter selects
    await page.fill('#search', '');
    await page.click('#search');
    await page.type('#search', 'attention', { delay: 25 });
    await page.waitForSelector('.search-results.open .sr-item', { timeout: 4000 });
    const firstResult = await page.textContent('.search-results .sr-item b');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);
    const h2b = await page.textContent('.panel h2');
    s = await state(page);
    ok('search shows ranked results', !!firstResult, 'top=' + firstResult);
    ok('Enter selects the result & focuses it', /Attention/i.test(h2b || ''), h2b);
    ok('searched node is spotlighted', s.pathActive.length === 1, s.pathActive.join(','));
    await shot(page, '04-search-select');

    // 5) zoom (wheel over the canvas)
    const z0 = (await state(page)).zoom;
    await page.mouse.move(700, 470);
    await page.mouse.wheel(0, -600);
    await page.waitForTimeout(300);
    const z1 = (await state(page)).zoom;
    ok('scroll wheel zooms the graph', Math.abs(z1 - z0) > 0.05, `z0=${z0.toFixed(2)} z1=${z1.toFixed(2)}`);
    await shot(page, '05-zoomed');
    await page.click('#fitBtn'); await page.waitForTimeout(500);

    // 6) theme toggle + selected-label visibility in LIGHT theme (the reported problem case)
    await page.click('#themeToggle');
    await page.waitForTimeout(300);
    s = await state(page);
    ok('theme toggles to light', s.theme === 'light', s.theme);
    await clickNode(page, 'dpo');
    s = await state(page);
    const h2c = await page.textContent('.panel h2');
    ok('light theme: clicking selects node (DPO)', /DPO/i.test(h2c || ''), h2c);
    ok('light theme: selected label enlarged & visible', s.paFont >= 18, s.paFont + 'px');
    ok('light theme: context visible (faded ~0.2)', s.fadedOpacity >= 0.15 && s.fadedOpacity <= 0.4, s.fadedOpacity);
    await shot(page, '06-light-node-selected');

    // 7) guided path + compare modal smoke test
    await page.keyboard.press('Escape');
    await page.click('#startPath'); await page.waitForTimeout(500);
    const guided = await page.evaluate(() => document.getElementById('guidedBox').classList.contains('open'));
    ok('Guided Path opens', guided);
    await shot(page, '07-guided-path');
    await page.keyboard.press('Escape');
    await page.click('#compareBtn'); await page.waitForTimeout(400);
    const compare = await page.evaluate(() => document.getElementById('compareModal').classList.contains('open'));
    ok('Compare modal opens', compare);
    await shot(page, '08-compare');
    await page.keyboard.press('Escape');

    // 9) cluster legend click zooms to that cluster
    await page.click('#fitBtn'); await page.waitForTimeout(500);
    const ext0 = await page.evaluate(() => { const e = window._cy.extent(); return { x: e.x1, w: e.w }; });
    await page.click('.legend-item[data-cluster="peft"]');
    await page.waitForTimeout(750);
    const ext1 = await page.evaluate(() => { const e = window._cy.extent(); return { x: e.x1, w: e.w }; });
    ok('cluster legend click zooms/pans the graph', Math.abs(ext1.w - ext0.w) > 5 || Math.abs(ext1.x - ext0.x) > 20, `w ${ext0.w.toFixed(0)}→${ext1.w.toFixed(0)}`);
    await shot(page, '09-cluster-zoom');

    // 10) level filter hides/restores nodes
    await page.click('#fitBtn'); await page.waitForTimeout(400);
    const vis = () => page.evaluate(() => window._cy.nodes('[!isCluster]').filter((n) => n.style('display') !== 'none').length);
    const v0 = await vis();
    await page.click('.level-chip[data-level="5"]'); await page.waitForTimeout(350);
    const v1 = await vis();
    ok('toggling a level off hides those nodes', v1 < v0, `${v0} → ${v1} visible`);
    await shot(page, '10-level-filtered');
    await page.click('.level-chip[data-level="5"]'); await page.waitForTimeout(350);
    const v2 = await vis();
    ok('re-enabling the level restores nodes', v2 === v0, `${v2} visible`);

    // 11) decision wizard reaches a recommendation
    await page.click('#startDecision'); await page.waitForTimeout(400);
    ok('decision wizard opens', await page.evaluate(() => document.getElementById('decisionBox').classList.contains('open')));
    const opts = await page.$$('#decisionBox .fb-answer');
    ok('wizard shows answer options', opts.length >= 2, opts.length + ' options');
    await page.click('#decisionBox .fb-answer:nth-child(2)'); await page.waitForTimeout(300);
    for (let i = 0; i < 5; i++) { if (await page.$('#decisionBox .fb-rec')) break; const a = await page.$('#decisionBox .fb-answer'); if (!a) break; await a.click(); await page.waitForTimeout(250); }
    ok('wizard reaches a recommendation', await page.evaluate(() => !!document.querySelector('#decisionBox .fb-rec')));
    await shot(page, '11-decision-wizard');
    await page.keyboard.press('Escape');

    // 12) deep-link restore (fresh pages)
    const p2 = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    await p2.goto(`http://localhost:${PORT}/app.html#concept=mla`, { waitUntil: 'load' });
    await p2.waitForFunction(() => window._cy && window._cy.nodes().length > 0, { timeout: 15000 });
    await p2.waitForTimeout(1500);
    const dlH2 = await p2.textContent('.panel h2');
    const dlActive = await p2.evaluate(() => window._cy.nodes('.path-active').map((n) => n.id()));
    ok('deep link #concept=mla restores that node', dlActive.includes('mla') && /MLA|Latent/i.test(dlH2 || ''), `h2=${dlH2}`);
    await shot(p2, '12-deeplink-concept');
    await p2.goto(`http://localhost:${PORT}/app.html#compare=peft`, { waitUntil: 'load' });
    await p2.waitForFunction(() => window._cy, { timeout: 15000 }); await p2.waitForTimeout(1500);
    ok('deep link #compare=peft opens the Compare modal', await p2.evaluate(() => document.getElementById('compareModal').classList.contains('open')));
    await p2.close();

    // 13) mobile viewport adapts
    const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
    await m.goto(`http://localhost:${PORT}/app.html`, { waitUntil: 'load' });
    await m.waitForFunction(() => window._cy && window._cy.nodes().length > 0, { timeout: 15000 });
    await m.waitForTimeout(1400);
    await m.keyboard.press('Escape');
    await m.evaluate(() => { var w = document.getElementById('welcomeModal'); if (w) w.classList.remove('open'); });
    ok('mobile: graph still renders', (await m.evaluate(() => window._cy.nodes('[!isCluster]').length)) > 110);
    ok('mobile: brand collapses to the logo only', await m.evaluate(() => { const el = document.querySelector('.brand-text'); return el ? getComputedStyle(el).display === 'none' : false; }));
    ok('mobile: graph canvas drops below the wrapped top bar', await m.evaluate(() => parseInt(getComputedStyle(document.getElementById('cy')).top) >= 100));
    await shot(m, '13-mobile');
    await m.close();

  } catch (e) {
    ok('test run completed without exceptions', false, e.message);
  } finally {
    await browser.close();
    server.kill();
  }

  const passed = results.filter((r) => r.pass).length;
  console.log(`\n${passed}/${results.length} checks passed.  Screenshots → ${path.relative(ROOT, SHOTS)}/`);
  process.exit(passed === results.length ? 0 : 1);
})();
