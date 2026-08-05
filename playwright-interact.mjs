import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
const chatButton = await page.$('button:has-text("💬")');
let chatClicked = false;
if (chatButton) {
  await chatButton.click();
  chatClicked = true;
  await page.waitForTimeout(500);
}
const panelHtml = await page.$eval('body', b => b.innerText);
const hasChatPanel = panelHtml.includes('active events') || panelHtml.includes('Lélu thinking') || panelHtml.includes('assistant');
console.log('CHAT_BUTTON_FOUND', !!chatButton);
console.log('CHAT_CLICKED', chatClicked);
console.log('HAS_CHAT_PANEL', hasChatPanel);
await browser.close();
