#!/usr/bin/env node
/* Render flyer.html → flyer.pdf (A4) and a preview PNG, using Playwright. */
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(ROOT, 'flyer.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(700);
  await page.pdf({
    path: path.join(ROOT, 'flyer.pdf'),
    format: 'A4', printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  // preview screenshot of just the sheet
  const el = await page.$('.sheet');
  await el.screenshot({ path: path.join(ROOT, 'scripts', 'screens', 'flyer-preview.png') });
  await browser.close();
  console.log('flyer.pdf + scripts/screens/flyer-preview.png written');
})();
