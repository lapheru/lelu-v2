import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
page.on('console', msg => logs.push({type:'console', text: msg.text(), location: msg.location()}));
page.on('pageerror', e => logs.push({type:'pageerror', message: e.message, stack: e.stack}));
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const buttons = await page.$$eval('button', els => els.map(el => el.innerText));
const chatButton = await page.$('button:has-text("💬")');
let chatPanel = false;
if (chatButton) {
  await chatButton.click();
  await page.waitForTimeout(300);
  const text = await page.$eval('body', b => b.innerText);
  chatPanel = text.includes('assistant') || text.includes('Lélu thinking') || text.includes('active events');
}
await page.screenshot({ path: '/workspaces/Lelu-/runtime-working.png', fullPage: true });
console.log('BUTTONS', JSON.stringify(buttons));
console.log('CHAT_PANEL_VISIBLE', chatPanel);
console.log('LOGS', JSON.stringify(logs, null, 2));
await browser.close();
