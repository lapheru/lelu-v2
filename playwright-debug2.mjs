import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
page.on('console', msg => logs.push({type:'console', text: msg.text(), args: msg.args().map(a=>a.toString())}));
page.on('pageerror', e => logs.push({type:'pageerror', message: e.message, stack: e.stack}));
page.on('request', req => logs.push({type:'request', url: req.url(), resourceType: req.resourceType()}));
page.on('response', async res => {
  if (res.url() === 'http://127.0.0.1:5173/') {
    logs.push({type:'response', url: res.url(), status: res.status(), body: await res.text().then(t => t.slice(0, 500))});
  }
});
await page.goto('http://127.0.0.1:5173', { waitUntil: 'load' });
await page.waitForTimeout(1000);
const html = await page.content();
const rootHtml = await page.$eval('body', b => b.innerHTML.slice(0, 1000));
await page.screenshot({ path: '/workspaces/Lelu-/runtime-debug2.png', fullPage: true });
console.log('HTML_LENGTH', html.length);
console.log('BODY_HTML', rootHtml);
console.log('LOGS', JSON.stringify(logs, null, 2));
await browser.close();
