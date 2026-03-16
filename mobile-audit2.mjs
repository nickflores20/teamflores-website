import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

const STORAGE_KEY = 'teamflores_leadform';
const BASE_URL = 'http://localhost:3000/apply';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/Kalianny Flores/.cache/puppeteer/chrome/win64-146.0.7680.76/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

async function shot(label, step, answers) {
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate((key, data) => localStorage.setItem(key, JSON.stringify(data)), STORAGE_KEY,
    { step, answers, contactSubStep: 0, contact: { firstName: '', lastName: '', email: '', phone: '' } });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  // Scroll the lead-nav into view so we see the bottom of the form
  await page.evaluate(() => {
    const nav = document.querySelector('.lead-nav');
    if (nav) nav.scrollIntoView({ behavior: 'instant', block: 'end' });
  });
  await new Promise(r => setTimeout(r, 300));
  const out = path.join(screenshotDir, `audit-${label}.png`);
  await page.screenshot({ path: out, fullPage: false });
  await page.close();
  console.log(`✓ ${label}`);
}

const priceAnswers = { 1: '90210', 2: 'purchase', 4: 'single_family', 5: 'excellent', 6: 'yes', 7: 'offer_pending', 8: 'primary' };

await shot('step9-nav-visible', 9, priceAnswers);
await shot('step2-nav-visible', 2, { 1: '90210' });

await browser.close();
console.log('Done.');
