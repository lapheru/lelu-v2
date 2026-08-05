import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
const html = await page.content();
console.log('LENGTH', html.length);
await page.screenshot({ path: '/workspaces/Lelu-/runtime-capture.png', fullPage: true });
await browser.close();
