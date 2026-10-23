// Visual audit: node scripts/shots.mjs <label>   (needs `npm run preview` on :3000)
// Saves screenshots/<label>/<page>-<width>.png and prints overflow, small-text and small-tap-target counts.
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const label = process.argv[2] || 'run';
const pages = { home: '/', city: '/nevada/las-vegas', program: '/loan-programs/va-loans', contact: '/contact', calculator: '/mortgage-calculator' };
const widths = [375, 768, 1440];
const out = path.join('screenshots', label);
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
for (const [name, url] of Object.entries(pages)) {
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:3000${url}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 800));
    const m = await page.evaluate(() => {
      const small = new Set(); const tap = new Set();
      document.querySelectorAll('body *').forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') return;
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (hasText && parseFloat(cs.fontSize) < 14) small.add(el.tagName + '.' + String(el.className).slice(0, 30) + ' ' + cs.fontSize);
        if (el.matches('a,button') && !el.closest('p,li > span') ) {
          const r = el.getBoundingClientRect();
          if (r.width && (r.height < 44) && cs.display !== 'inline') tap.add(el.textContent.trim().slice(0, 25) + ' ' + Math.round(r.height));
        }
      });
      return { overflow: document.documentElement.scrollWidth > window.innerWidth, small: [...small], tap: [...tap] };
    });
    console.log(`${name}@${w}: overflowX=${m.overflow} smallText=${m.small.length} smallTap=${m.tap.length}`);
    if (w === 375 && name === 'home') console.log('  small:', m.small.slice(0, 12).join(' | '), '\n  tap:', m.tap.slice(0, 12).join(' | '));
    await page.screenshot({ path: path.join(out, `${name}-${w}.png`), fullPage: true });
    await page.close();
  }
}
await browser.close();
