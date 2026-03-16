import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const STORAGE_KEY = 'teamflores_leadform';
const BASE_URL = 'http://localhost:3000/apply';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/Kalianny Flores/.cache/puppeteer/chrome/win64-146.0.7680.76/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

async function shot(label, step, answers = {}, scrollY = 500, fullPage = false) {
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate((key, data) => localStorage.setItem(key, JSON.stringify(data)), STORAGE_KEY, { step, answers, contactSubStep: 0, contact: { firstName: '', lastName: '', email: '', phone: '' } });
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
  await new Promise(r => setTimeout(r, 300));
  const out = path.join(screenshotDir, `audit-${label}.png`);
  await page.screenshot({ path: out, fullPage });
  await page.close();
  console.log(`✓ ${label}`);
}

const priceAnswers = { 1: '90210', 2: 'purchase', 4: 'single_family', 5: 'excellent', 6: 'yes', 7: 'offer_pending', 8: 'primary' };
const contactAnswers = { ...priceAnswers, 9: '300_350k', 10: '10pct', 11: 'fixed', 12: '100_125k', 13: 'employed', 14: 'no', 15: 'yes', 16: 'yes', 17: 'google' };

// Viewport shots (what user sees)
await shot('step1-zip-375', 1, {});
await shot('step2-loantype-375', 2, { 1: '90210' });
await shot('step4-proptype-375', 4, { 1: '90210', 2: 'purchase' });
await shot('step9-price-375', 9, priceAnswers);
await shot('step18-contact-375', 18, contactAnswers);

// Full-page shots to verify all content accessible
await shot('step9-price-FULL', 9, priceAnswers, 0, true);
await shot('step2-loantype-FULL', 2, { 1: '90210' }, 0, true);

await browser.close();
console.log('Done.');
