import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPRITE = path.join(__dirname, 'brand_assets', 'Gemini_Generated_Image_u4dtgsu4dtgsu4dt.png').replace(/\\/g, '/');
const W = 2754, H = 1536;
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const tmpDir = os.tmpdir();

// Re-crop navbar logo: inset 5px all sides to remove edge bleed/border pixels
// The logo panel occupies approx y=0..730 of the sprite; h=620 stays safely inside
const srcX=30, srcY=24, w=1370, h=460;
const htmlPath = path.join(tmpDir, 'recrop_nav.html').replace(/\\/g, '/');
fs.writeFileSync(htmlPath, `<!DOCTYPE html><html><head>
<style>*{margin:0;padding:0;overflow:hidden}body{width:${w}px;height:${h}px;background:transparent}</style></head>
<body><img src="file:///${SPRITE}" style="position:absolute;left:${-srcX}px;top:${-srcY}px;width:${W}px;height:${H}px"></body></html>`);
await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
await page.goto(`file:///${htmlPath}`, { waitUntil: 'load', timeout: 15000 });
await new Promise(r => setTimeout(r, 300));

for (const dest of [
  path.join(__dirname, 'brand_assets', 'logo-navbar.png'),
  path.join(__dirname, 'public', 'brand_assets', 'logo-navbar.png'),
]) {
  await page.screenshot({ path: dest, clip: { x:0, y:0, width:w, height:h }, omitBackground: true });
}
fs.unlinkSync(htmlPath);
await browser.close();
console.log(`✓ logo-navbar.png re-cropped to ${w}×${h} (inset 5px all sides)`);
