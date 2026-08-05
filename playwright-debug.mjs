import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push({type:'pageerror', message:e.message, stack:e.stack}));
page.on('console', msg => {
  if (msg.type() === 'error') errors.push({type:'console', text: msg.text()});
});
page.on('requestfailed', req => errors.push({type:'requestfailed', url:req.url(), status:req.failure()?.errorText || 'failed'}));
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
console.log('PAGE_URL', page.url());
console.log('ERRORS', JSON.stringify(errors, null, 2));
await browser.close();
