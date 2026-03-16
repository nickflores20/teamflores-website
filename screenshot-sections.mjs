import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'temporary screenshots');
const BASE = 'http://localhost:3000';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

async function goto(url) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 25000 });
  await page.evaluate(() => sessionStorage.setItem('tf-loaded', '1'));
  await new Promise(r => setTimeout(r, 600));
}

// Rebuild first so changes are reflected
// Navbar — top of page (transparent state)
await goto(BASE);
await page.screenshot({ path: path.join(OUT, 'v3-navbar-top.png'), clip: { x:0, y:0, width:1440, height:90 } });
console.log('✓ v3-navbar-top.png');

// Navbar — scrolled (fixed elements render at viewport_y + scrollY in page coords)
const scrollY = 300;
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: path.join(OUT, 'v3-navbar-scrolled.png'), clip: { x:0, y:scrollY, width:1440, height:90 } });
console.log('✓ v3-navbar-scrolled.png');

// Footer — logo section
const footerTop = await page.evaluate(() => document.querySelector('footer').offsetTop);
await page.evaluate((y) => window.scrollTo(0, y), footerTop);
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: path.join(OUT, 'v3-footer-logo.png'), clip: { x:0, y:footerTop, width:1440, height:900 } });
console.log('✓ v3-footer-logo.png');

// About page — sand section with logo
await goto(BASE + '/about');
const sandTop = await page.evaluate(() => {
  const sections = document.querySelectorAll('section');
  for (const s of sections) {
    if (window.getComputedStyle(s).background.includes('240, 230, 210') ||
        s.style.background === '#F0E6D2') return s.offsetTop;
  }
  return 900;
});
const sandClipY = Math.max(0, sandTop - 60);
await page.evaluate((y) => window.scrollTo(0, y), sandClipY);
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: path.join(OUT, 'v3-about-sand.png'), clip: { x:0, y:sandClipY, width:1440, height:900 } });
console.log('✓ v3-about-sand.png');

// Mobile navbar
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3 });
await goto(BASE);
await page.screenshot({ path: path.join(OUT, 'v3-navbar-mobile.png'), clip: { x:0, y:0, width:390, height:75 } });
console.log('✓ v3-navbar-mobile.png');

await browser.close();
