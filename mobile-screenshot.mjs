import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const width = parseInt(process.argv[3]) || 375;
const label = process.argv[4] ? `-${process.argv[4]}` : '';

let i = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${i}${label}.png`))) i++;
const outputPath = path.join(screenshotDir, `screenshot-${i}${label}.png`);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/Kalianny Flores/.cache/puppeteer/chrome/win64-146.0.7680.76/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outputPath}`);
