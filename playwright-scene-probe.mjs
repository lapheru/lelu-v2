import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const logs = [];
page.on("console", (msg) => {
  if (msg.type() === "error") logs.push(`console.error: ${msg.text()}`);
});
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));

await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
// Let the awakening sequence + morph cycle run a while.
await page.waitForTimeout(9000);

// 1) Pixel map of the viewport (brightness grid, 48x30).
const map = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return "NO_CANVAS";
  const w = canvas.width;
  const h = canvas.height;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return "NO_2D_CTX";
  ctx.drawImage(canvas, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  const cols = 48;
  const rows = 30;
  const lines = [];
  for (let r = 0; r < rows; r += 1) {
    let line = "";
    for (let col = 0; col < cols; col += 1) {
      const x = Math.floor(((col + 0.5) / cols) * w);
      const y = Math.floor(((r + 0.5) / rows) * h);
      const i = (y * w + x) * 4;
      const R = data[i];
      const G = data[i + 1];
      const B = data[i + 2];
      const bright = (R + G + B) / 3;
      let ch = ".";
      if (bright > 200) ch = "█";
      else if (bright > 120) ch = "▓";
      else if (bright > 60) ch = "▒";
      else if (bright > 25) ch = "░";
      line += ch;
    }
    lines.push(line);
  }
  return lines.join("\n");
});

// 2) Color at concentric radii from screen center (detect concentric shells).
const rings = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return "NO_CANVAS";
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  ctx.drawImage(canvas, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  const sample = (x, y) => {
    const i = (Math.floor(y) * w + Math.floor(x)) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const out = [];
  // Sample radius as fraction of screen height from center.
  for (let f = 0; f <= 48; f += 2) {
    const radius = (f / 48) * (h / 2);
    const a = sample(cx + radius, cy);
    const b = sample(cx - radius, cy);
    const c2 = sample(cx, cy + radius);
    const d = sample(cx, cy - radius);
    out.push(
      `${f.toString().padStart(2)}|${radius.toFixed(0).padStart(3)}|R${a[0]},${a[1]},${a[2]}|L${b[0]},${b[1]},${b[2]}|D${c2[0]},${c2[1]},${c2[2]}|U${d[0]},${d[1]},${d[2]}`,
    );
  }
  return out.join("\n");
});

// 3) Attempt scene-graph access via canvas internals / window globals.
const sceneProbe = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return "NO_CANVAS";
  const keys = Object.getOwnPropertyNames(canvas).filter((k) =>
    k.toLowerCase().includes("r3f") || k.toLowerCase().includes("three") || k.toLowerCase().includes("root") || k.toLowerCase().includes("store"),
  );
  let found = "";
  try {
    const root = canvas.__r3fRoot || canvas.__r3f || canvas.__fiber;
    if (root) found = `FOUND key, type=${typeof root}, props=${Object.keys(root).slice(0, 10).join(",")}`;
    if (canvas.__r3fRoot?.store) found += ` store=${typeof canvas.__r3fRoot.store.getState}`;
  } catch (e) {
    found = `ERR ${e.message}`;
  }
  return `canvasKeys=${keys.join(",")} | ${found}`;
});

console.log("=== BRIGHTNESS MAP (48x30, top=screen top) ===");
console.log(map);
console.log("\n=== CONCENTRIC RING SAMPLES (fraction of half-height, R/L/D/U from center) ===");
console.log(rings);
console.log("\n=== SCENE GRAPH PROBE ===");
console.log(sceneProbe);
console.log("\n=== PAGE ERRORS ===");
console.log(logs.join("\n") || "none");

await page.screenshot({ path: "probe-frame.png" });
await browser.close();
