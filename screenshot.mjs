import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 4000)); // wait for animations to settle
await page.screenshot({ path: 'screenshot_current.png', fullPage: false });
await browser.close();
console.log('Screenshot saved: screenshot_current.png');
