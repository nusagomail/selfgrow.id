/**
 * Render sampul 100 ebook katalog DEMO (500x750 JPEG) dari desain HTML dengan Playwright (D38).
 * Lima tata letak × palet per kategori × motif, supaya rak terlihat seperti toko buku sungguhan.
 *
 *   node scripts/demo/render-covers.mjs           → scripts/demo/covers/{slug}.jpg
 *   node scripts/demo/render-covers.mjs --sheet   → juga covers-sheet.html untuk ditinjau
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CATALOG, catalogBooks } from "./catalog.mjs";

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

/** Palet per kategori: [warna tua, warna kedua, aksen, kertas terang]. */
const PALETTES = {
  "Keuangan Pribadi": [
    ["#073e1f", "#1d7a34", "#f4ac13", "#f6f1e4"],
    ["#0f2d4a", "#1f5f8b", "#f4ac13", "#eef3f6"],
    ["#1d3b2a", "#5b8c5a", "#ffd166", "#f3f0e6"],
  ],
  "Kebiasaan & Disiplin": [
    ["#0f4c4f", "#1b7f79", "#ff8a5b", "#f2efe8"],
    ["#203b46", "#3d6e7c", "#ffb703", "#eef1ef"],
    ["#14532d", "#2f8f5b", "#ffe066", "#f1f4ec"],
  ],
  "Produktivitas & Fokus": [
    ["#1e2a78", "#3949ab", "#ffd166", "#eef0f8"],
    ["#22223b", "#4a4e69", "#f2a541", "#f2efe9"],
    ["#0b3954", "#087e8b", "#ff5a5f", "#eef4f4"],
  ],
  "Karier & Pekerjaan": [
    ["#14213d", "#2b3a67", "#fca311", "#f1efe9"],
    ["#283618", "#606c38", "#dda15e", "#f4f1e6"],
    ["#1b263b", "#415a77", "#e0e1dd", "#eceff3"],
  ],
  "Kesehatan Mental & Emosi": [
    ["#4a2c6d", "#7b5ea7", "#f6c177", "#f3eff6"],
    ["#2d3047", "#5c6b9c", "#e0b1cb", "#f0eef4"],
    ["#3c2a4d", "#6d597a", "#eaac8b", "#f5efec"],
  ],
  "Kesehatan & Kebugaran": [
    ["#9b2226", "#e2583e", "#ffe08a", "#f8efe9"],
    ["#005f73", "#0a9396", "#ee9b00", "#ecf4f3"],
    ["#bc4b1c", "#e9a23b", "#2b2d42", "#faf1e4"],
  ],
  "Komunikasi & Relasi": [
    ["#0b5ea8", "#2a9df4", "#ffd23f", "#edf3fa"],
    ["#7a1f3d", "#c44569", "#ffd5a5", "#f8eef0"],
    ["#1d3557", "#457b9d", "#f1faee", "#eef2f6"],
  ],
  "Bisnis & Penghasilan Tambahan": [
    ["#1b1b1b", "#2d6a4f", "#f4a261", "#f2f0ea"],
    ["#3d2c1e", "#8c5a2b", "#ffd166", "#f6efe6"],
    ["#0d1b2a", "#1b4965", "#62b6cb", "#edf3f6"],
  ],
  "Keluarga & Parenting": [
    ["#9c4a3c", "#d77a61", "#fff1c1", "#fbf1ea"],
    ["#386641", "#6a994e", "#f2e8cf", "#f3f5ec"],
    ["#5e548e", "#9f86c0", "#ffe5d9", "#f4f1f8"],
  ],
  "Mindset & Makna Hidup": [
    ["#101820", "#34495e", "#e9c46a", "#efede7"],
    ["#2b2118", "#6f4e37", "#e9c46a", "#f5f0e8"],
    ["#0b132b", "#3a506b", "#5bc0be", "#eaf1f3"],
  ],
};

const MOTIFS = ["bars", "rings", "steps", "dots", "wave", "arc", "sun", "grid", "circles", "split"];

/** Motif geometris di area 400x400 (digambar dengan warna "w" samar dan satu aksen). */
function motif(kind, a, w) {
  switch (kind) {
    case "bars":
      return [0, 1, 2, 3, 4]
        .map(
          (i) =>
            `<rect x="${70 + i * 56}" y="${290 - i * 50}" width="38" height="${90 + i * 50}" rx="6" fill="${i === 4 ? a : w}"/>`,
        )
        .join("");
    case "dots":
      return Array.from(
        { length: 36 },
        (_, i) =>
          `<circle cx="${70 + (i % 6) * 52}" cy="${70 + Math.floor(i / 6) * 52}" r="${i === 22 ? 16 : 10}" fill="${i === 22 ? a : w}"/>`,
      ).join("");
    case "grid":
      return Array.from(
        { length: 25 },
        (_, i) =>
          `<rect x="${55 + (i % 5) * 60}" y="${55 + Math.floor(i / 5) * 60}" width="48" height="48" rx="8" fill="${i === 7 || i === 18 ? a : w}"/>`,
      ).join("");
    case "steps":
      return [0, 1, 2, 3]
        .map(
          (i) =>
            `<rect x="${40 + i * 80}" y="${300 - i * 70}" width="80" height="${60 + i * 70}" fill="${i === 3 ? a : w}"/>`,
        )
        .join("");
    case "rings":
      return [170, 130, 90, 50]
        .map(
          (r, i) =>
            `<circle cx="200" cy="200" r="${r}" fill="none" stroke="${i === 3 ? a : w}" stroke-width="${i === 3 ? 12 : 16}"/>`,
        )
        .join("");
    case "wave":
      return [0, 1, 2, 3]
        .map(
          (i) =>
            `<path d="M0 ${130 + i * 60} Q100 ${70 + i * 60} 200 ${130 + i * 60} T400 ${130 + i * 60}" fill="none" stroke="${i === 1 ? a : w}" stroke-width="16" stroke-linecap="round"/>`,
        )
        .join("");
    case "arc":
      return `<path d="M30 380 A300 300 0 0 1 380 40" fill="none" stroke="${w}" stroke-width="46"/><path d="M110 380 A220 220 0 0 1 380 120" fill="none" stroke="${a}" stroke-width="18"/><path d="M190 380 A140 140 0 0 1 380 200" fill="none" stroke="${w}" stroke-width="26"/>`;
    case "sun":
      return (
        `<circle cx="200" cy="200" r="88" fill="${a}"/>` +
        Array.from({ length: 14 }, (_, i) => {
          const t = (i / 14) * Math.PI * 2;
          return `<line x1="${200 + Math.cos(t) * 118}" y1="${200 + Math.sin(t) * 118}" x2="${200 + Math.cos(t) * 168}" y2="${200 + Math.sin(t) * 168}" stroke="${w}" stroke-width="14" stroke-linecap="round"/>`;
        }).join("")
      );
    case "circles":
      return `<circle cx="160" cy="210" r="130" fill="${w}"/><circle cx="270" cy="160" r="90" fill="${w}"/><circle cx="240" cy="280" r="46" fill="${a}"/>`;
    case "split":
      return `<circle cx="200" cy="200" r="150" fill="none" stroke="${w}" stroke-width="16"/><path d="M200 50 A150 150 0 0 1 200 350 Z" fill="${a}"/>`;
    default:
      return "";
  }
}

const svg = (kind, a, w, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 400 400" aria-hidden="true">${motif(kind, a, w)}</svg>`;

function titleSize(title, base) {
  const n = title.length;
  let size = base;
  if (n > 34) size = base - 12;
  else if (n > 26) size = base - 7;
  else if (n > 18) size = base - 3;
  // Kata terpanjang harus muat satu baris di lebar teks sampul (±330px, huruf tebal ±0,62em).
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  return Math.min(size, Math.floor(330 / (longest * 0.62)));
}

/** Lima tata letak sampul. */
function cover(b) {
  const [dark, mid, accent, paper] = b.palette;
  const W = "rgba(255,255,255,0.13)";
  const D = "rgba(0,0,0,0.08)";
  const cat = esc(b.category);
  const title = esc(b.title);
  const sub = esc(b.subtitle);
  const brand = `<div class="brand"><img src="${mark}" alt=""><span>SelfGrow</span></div>`;
  switch (b.layout) {
    case 0: // Gelap klasik: judul di atas, motif besar di bawah.
      return `<div class="c l0" style="background:radial-gradient(120% 80% at 100% 0%,rgba(255,255,255,.16),transparent 55%),linear-gradient(160deg,${dark},${mid})">
        ${svg(b.motif, accent, W, "m0")}
        <div class="kicker" style="color:${accent}">${cat}</div>
        <h1 style="font-size:${titleSize(b.title, 46)}px">${title}</h1>
        <p class="sub">${sub}</p>
        <div class="foot">${brand}</div></div>`;
    case 1: // Kertas terang dengan pita warna di atas.
      return `<div class="c l1" style="background:${paper};color:${dark}">
        <div class="band" style="background:${dark};color:${accent}">${cat}</div>
        ${svg(b.motif, accent, `${mid}33`, "m1")}
        <h1 style="font-size:${titleSize(b.title, 44)}px;color:${dark}">${title}</h1>
        <p class="sub" style="color:${dark}">${sub}</p>
        <div class="rule" style="background:${accent}"></div>
        <div class="foot" style="color:${dark}">${brand}</div></div>`;
    case 2: // Terbelah: ilustrasi di atas, judul di bidang terang bawah.
      return `<div class="c l2" style="background:${paper};color:${dark}">
        <div class="art" style="background:linear-gradient(150deg,${dark},${mid})">${svg(b.motif, accent, W, "m2")}
          <div class="kicker on" style="color:${accent}">${cat}</div></div>
        <div class="txt"><h1 style="font-size:${titleSize(b.title, 38)}px;color:${dark}">${title}</h1>
        <p class="sub" style="color:${dark}">${sub}</p></div>
        <div class="foot" style="color:${dark}">${brand}</div></div>`;
    case 3: // Tipografis: judul raksasa, kata terakhir beraksen, bingkai tipis.
      {
        const words = b.title.split(" ");
        const last = words.pop();
        return `<div class="c l3" style="background:linear-gradient(170deg,${mid},${dark})">
        <div class="frame" style="border-color:${accent}66"></div>
        <div class="kicker" style="color:${accent}">${cat}</div>
        <h1 style="font-size:${titleSize(b.title, 54)}px">${esc(words.join(" "))} <span style="color:${accent}">${esc(last ?? "")}</span></h1>
        ${svg(b.motif, accent, W, "m3")}
        <p class="sub">${sub}</p>
        <div class="foot">${brand}</div></div>`;
      }
    default: // Lambang di tengah, judul tengah, bingkai.
      return `<div class="c l4" style="background:${paper};color:${dark}">
        <div class="frame" style="border-color:${dark}22"></div>
        <div class="kicker" style="color:${mid}">${cat}</div>
        <div class="emblem" style="background:linear-gradient(150deg,${dark},${mid})">${svg(b.motif, accent, W, "m4")}</div>
        <h1 style="font-size:${titleSize(b.title, 40)}px;color:${dark}">${title}</h1>
        <p class="sub" style="color:${dark}">${sub}</p>
        <div class="foot center" style="color:${dark}">${brand}</div></div>`;
  }
}

const CSS = `@font-face{font-family:Jakarta;src:url(${font}) format("woff2");font-weight:200 800}
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif}
.c{position:relative;width:400px;height:600px;overflow:hidden;color:#fff;display:flex;flex-direction:column;padding:36px 32px}
h1{position:relative;font-weight:800;line-height:1.04;letter-spacing:-.025em;text-wrap:balance}
.kicker{position:relative;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.sub{position:relative;font-size:14px;line-height:1.45;opacity:.85;text-wrap:pretty}
.foot{position:relative;margin-top:auto;display:flex}
.foot.center{justify-content:center}
.brand{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:800;letter-spacing:.02em}
.brand img{width:26px;height:26px}
svg{position:absolute}
.l0 .kicker{margin-top:4px}.l0 h1{margin-top:14px}.l0 .sub{margin-top:14px;max-width:300px}
.l0 .m0{width:330px;height:330px;right:-40px;bottom:-30px}
.l1{padding-top:0}.l1 .band{margin:0 -32px;padding:30px 32px 18px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.l1 .m1{width:260px;height:260px;right:-50px;bottom:40px}
.l1 h1{margin-top:44px}.l1 .sub{margin-top:16px;max-width:290px}
.l1 .rule{position:relative;width:56px;height:6px;border-radius:3px;margin-top:22px}
.l2{padding:0}.l2 .art{position:relative;height:300px}.l2 .m2{width:300px;height:300px;left:50px;top:10px}
.l2 .kicker.on{position:absolute;left:32px;top:30px}
.l2 .txt{padding:26px 32px 0}.l2 .sub{margin-top:12px}.l2 .foot{padding:0 32px 30px}
.l3 .frame,.l4 .frame{position:absolute;inset:16px;border:2px solid;border-radius:4px;pointer-events:none}
.l3 .kicker{margin-top:8px}.l3 h1{margin-top:26px}
.l3 .m3{width:180px;height:180px;right:24px;bottom:70px;opacity:.9}
.l3 .sub{margin-top:18px;max-width:200px}
.l4{align-items:center;text-align:center}.l4 .kicker{margin-top:14px}
.l4 .emblem{position:relative;width:170px;height:170px;border-radius:50%;margin-top:26px;overflow:hidden}
.l4 .m4{width:170px;height:170px;left:0;top:0}
.l4 h1{margin-top:26px}.l4 .sub{margin-top:12px;max-width:300px}`;

/** Semua buku katalog dengan desain sampul deterministik. */
function designedBooks() {
  const cats = Object.keys(CATALOG);
  return catalogBooks().map((b) => ({
    ...b,
    palette: PALETTES[b.category][b.index % PALETTES[b.category].length],
    layout: b.index % 5,
    motif: MOTIFS[(b.index * 3 + cats.indexOf(b.category)) % MOTIFS.length],
  }));
}

const page = (inner) =>
  `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${inner}</body></html>`;

{
  const books = designedBooks();
  const outDir = join(here, "covers");
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const work = join(tmpdir(), "selfgrow-covers");
  mkdirSync(work, { recursive: true });

  const browser = await chromium.launch();
  const tab = await browser.newPage({
    viewport: { width: 400, height: 600 },
    deviceScaleFactor: 1.25,
  });
  for (const b of books) {
    const file = join(work, `${b.slug}.html`);
    writeFileSync(file, page(cover(b)));
    await tab.goto(pathToFileURL(file).href);
    await tab.evaluate(() => document.fonts.ready);
    await tab.screenshot({ path: join(outDir, `${b.slug}.jpg`), type: "jpeg", quality: 82 });
  }
  if (process.argv.includes("--sheet")) {
    const sheet = join(work, "sheet.html");
    writeFileSync(
      sheet,
      `<!doctype html><html><body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(10,120px);gap:8px;padding:8px">${books
        .map(
          (b) =>
            `<img src="${pathToFileURL(join(outDir, `${b.slug}.jpg`)).href}" style="width:120px">`,
        )
        .join("")}</body></html>`,
    );
    const sh = await browser.newPage({ viewport: { width: 1288, height: 1900 } });
    await sh.goto(pathToFileURL(sheet).href);
    await sh.waitForTimeout(500);
    await sh.screenshot({ path: join(work, "sheet.png"), fullPage: true });
    console.log("sheet", join(work, "sheet.png"));
  }
  await browser.close();
  console.log(`${books.length} sampul → ${outDir}`);
}
