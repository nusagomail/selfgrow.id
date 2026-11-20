/**
 * Render sampul ebook DEMO (600x900 JPEG) dari desain HTML dengan Playwright (D36).
 * Jalankan lokal: node scripts/demo/render-covers.mjs  → scripts/demo/covers/{slug}.jpg
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { EBOOKS } from "./ebooks.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../..");
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const font = pathToFileURL(
  join(
    root,
    "apps/site/node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  ),
).href;
const mark = `data:image/png;base64,${readFileSync(join(root, "apps/site/public/brand/mark-192.png")).toString("base64")}`;

const esc = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Motif geometris per kategori (SVG 400x600, digambar di belakang judul). */
function motif(kind, accent) {
  const a = accent;
  const w = "rgba(255,255,255,0.10)";
  switch (kind) {
    case "bars":
      return [0, 1, 2, 3, 4]
        .map(
          (i) =>
            `<rect x="${250 + i * 26}" y="${430 - i * 30}" width="18" height="${80 + i * 30}" rx="4" fill="${i === 4 ? a : w}"/>`,
        )
        .join("");
    case "dots":
      return Array.from(
        { length: 30 },
        (_, i) =>
          `<circle cx="${230 + (i % 6) * 28}" cy="${300 + Math.floor(i / 6) * 28}" r="${i === 29 ? 9 : 6}" fill="${i === 29 ? a : w}"/>`,
      ).join("");
    case "grid":
      return Array.from(
        { length: 20 },
        (_, i) =>
          `<rect x="${220 + (i % 5) * 34}" y="${300 + Math.floor(i / 5) * 34}" width="26" height="26" rx="5" fill="${i === 7 || i === 13 ? a : w}"/>`,
      ).join("");
    case "steps":
      return [0, 1, 2, 3]
        .map(
          (i) =>
            `<rect x="${200 + i * 45}" y="${440 - i * 50}" width="45" height="${50 + i * 50}" fill="${i === 3 ? a : w}"/>`,
        )
        .join("");
    case "rings":
      return [140, 105, 70, 35]
        .map(
          (r, i) =>
            `<circle cx="300" cy="400" r="${r}" fill="none" stroke="${i === 3 ? a : w}" stroke-width="${i === 3 ? 6 : 10}"/>`,
        )
        .join("");
    case "wave":
      return [0, 1, 2]
        .map(
          (i) =>
            `<path d="M0 ${430 + i * 40} Q100 ${380 + i * 40} 200 ${430 + i * 40} T400 ${430 + i * 40}" fill="none" stroke="${i === 0 ? a : w}" stroke-width="10" stroke-linecap="round"/>`,
        )
        .join("");
    case "arc":
      return `<path d="M120 520 A180 180 0 0 1 400 300" fill="none" stroke="${w}" stroke-width="30"/><path d="M180 520 A120 120 0 0 1 400 360" fill="none" stroke="${a}" stroke-width="12"/>`;
    case "sun":
      return (
        `<circle cx="300" cy="420" r="70" fill="${a}"/>` +
        Array.from({ length: 12 }, (_, i) => {
          const t = (i / 12) * Math.PI * 2;
          return `<line x1="${300 + Math.cos(t) * 90}" y1="${420 + Math.sin(t) * 90}" x2="${300 + Math.cos(t) * 130}" y2="${420 + Math.sin(t) * 130}" stroke="${w}" stroke-width="10" stroke-linecap="round"/>`;
        }).join("")
      );
    case "circles":
      return `<circle cx="250" cy="420" r="90" fill="${w}"/><circle cx="330" cy="380" r="60" fill="${w}"/><circle cx="300" cy="470" r="32" fill="${a}"/>`;
    case "split":
      return `<circle cx="290" cy="420" r="110" fill="none" stroke="${w}" stroke-width="10"/><path d="M290 310 A110 110 0 0 1 290 530 Z" fill="${a}"/>`;
    default:
      return "";
  }
}

function html(e) {
  const c = e.cover;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Jakarta;src:url(${font}) format("woff2");font-weight:200 800}
*{box-sizing:border-box;margin:0}
body{width:400px;height:600px;font-family:Jakarta,sans-serif;overflow:hidden}
.cover{position:relative;width:400px;height:600px;padding:34px 30px;color:#fff;
 background:radial-gradient(120% 80% at 100% 0%,rgba(255,255,255,.18),transparent 55%),linear-gradient(160deg,${c.from},${c.to});
 display:flex;flex-direction:column}
svg{position:absolute;inset:0}
.top{position:relative;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.85}
.cat{position:relative;margin-top:26px;font-size:12px;font-weight:700;color:${c.accent};letter-spacing:.06em}
h1{position:relative;margin-top:10px;font-size:${e.title.length > 30 ? 34 : 40}px;line-height:1.08;font-weight:800;letter-spacing:-.02em;text-wrap:balance;max-width:330px}
.sub{position:relative;margin-top:14px;font-size:13px;line-height:1.45;opacity:.85;max-width:300px}
.bottom{position:relative;margin-top:auto;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800}
.bottom img{width:26px;height:26px}
.bar{position:absolute;left:30px;bottom:78px;width:44px;height:5px;border-radius:3px;background:${c.accent}}
</style></head><body><div class="cover">
<svg viewBox="0 0 400 600" aria-hidden="true">${motif(c.motif, c.accent)}</svg>
<div class="top"><span>Ebook</span><span>SelfGrow</span></div>
<div class="cat">${esc(e.category)}</div>
<h1>${esc(e.title)}</h1>
<p class="sub">${esc(e.summary)}</p>
<span class="bar"></span>
<div class="bottom"><img src="${mark}" alt=""><span>SelfGrow</span></div>
</div></body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 400, height: 600 },
  deviceScaleFactor: 1.5,
});
for (const e of EBOOKS) {
  const file = join(here, "covers", `${e.slug}.html`);
  writeFileSync(file, html(e));
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  const out = join(here, "covers", `${e.slug}.jpg`);
  await page.screenshot({ path: out, type: "jpeg", quality: 86 });
  console.log("cover", e.slug);
}
await browser.close();
