import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPRITE = path.join(__dirname, 'brand_assets', 'Gemini_Generated_Image_u4dtgsu4dtgsu4dt.png').replace(/\\/g, '/');
const OUT = path.join(__dirname, 'public', 'brand_assets');
const W = 2754, H = 1536;
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const tmpDir = os.tmpdir();

async function crop(name, x, y, w, h) {
  const htmlPath = path.join(tmpDir, `crop_${name}.html`).replace(/\\/g, '/');
  fs.writeFileSync(htmlPath, `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden}body{width:${w}px;height:${h}px;background:transparent}</style></head>
<body><img src="file:///${SPRITE}" style="position:absolute;left:${-x}px;top:${-y}px;width:${W}px;height:${H}px"></body></html>`);
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.goto(`file:///${htmlPath}`, { waitUntil: 'load', timeout: 15000 });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, `${name}.png`), clip: { x:0, y:0, width:w, height:h }, omitBackground: true });
  fs.unlinkSync(htmlPath);
  console.log(`✓ ${name}.png  (${w}×${h})`);
}

// navy-cream: shift left 30px to capture the "T" in "Team", stop before bottom bleed
await crop('logo-navy-cream',       1980, 0, 800, 1008);
// transparent-gold: tight crop, centered on the gold icon
await crop('logo-transparent-gold', 2110, 1030, 640, 480);

await browser.close();
