import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPRITE = path.join(__dirname, 'brand_assets', 'Gemini_Generated_Image_u4dtgsu4dtgsu4dt.png').replace(/\\/g, '/');
const OUT = path.join(__dirname, 'temporary screenshots');
const W = 2754, H = 1536;
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const tmpDir = os.tmpdir();

async function crop(label, x, y, w, h, scale=0.3) {
  const sw = Math.max(1, Math.round(w*scale)), sh = Math.max(1, Math.round(h*scale));
  const html = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;overflow:hidden}body{width:${sw}px;height:${sh}px}</style></head>
<body><img src="file:///${SPRITE}" style="position:absolute;left:${-x*scale}px;top:${-y*scale}px;width:${W*scale}px;height:${H*scale}px"></body></html>`;
  const htmlPath = path.join(tmpDir, `d_${label}.html`).replace(/\\/g, '/');
  fs.writeFileSync(htmlPath, html);
  await page.setViewport({ width: sw, height: sh, deviceScaleFactor: 1 });
  await page.goto(`file:///${htmlPath}`, { waitUntil: 'load', timeout: 15000 });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, `${label}.png`), clip: {x:0,y:0,width:sw,height:sh} });
  fs.unlinkSync(htmlPath);
  console.log(`✓ ${label}.png [sprite: x=${x},y=${y} ${w}×${h}]`);
}

// Right column: probe where cream-icon panel really ends (try larger heights)
await crop('rc-y0-h500',  2010, 0,   744, 500);
await crop('rc-y0-h700',  2010, 0,   744, 700);

// Find where navy-cream logo starts (top of icon)
await crop('rc-y300-h700', 2010, 300, 744, 700);
await crop('rc-y250-h800', 2010, 250, 744, 800);

// Find navy-cream bottom / transparent-gold top
await crop('rc-y950-h300', 2010, 950,  744, 300);
await crop('rc-y1020-h500', 2010, 1020, 744, 500);

await browser.close();
