/**
 * Render video pengantar ebook (D41): template.html + data → MP4 1280×720 + poster JPG.
 *   node scripts/demo/intro-video/render.mjs [--keys]
 * Hasil: scripts/demo/videos/{slug}.mp4 dan {slug}.jpg. Butuh Playwright dan ffmpeg.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PAYLATER_INTRO } from "./paylater.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../../..");
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const FPS = 30;
const VIDEOS = [PAYLATER_INTRO];

const work = join(tmpdir(), "selfgrow-intro");
rmSync(work, { recursive: true, force: true });
mkdirSync(join(work, "frames"), { recursive: true });
copyFileSync(
  join(
    root,
    "apps/site/node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  ),
  join(work, "font.woff2"),
);
copyFileSync(join(root, "apps/site/public/brand/mark-192.png"), join(work, "mark.png"));
copyFileSync(join(here, "template.html"), join(work, "template.html"));
const outDir = join(here, "../videos");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const data of VIDEOS) {
  copyFileSync(join(here, "../covers", `${data.slug}.jpg`), join(work, "cover.jpg"));
  const page = await browser.newPage({
    viewport: { width: 960, height: 540 },
    deviceScaleFactor: 4 / 3,
  });
  page.on("pageerror", (e) => console.error("PAGEERROR", e.message));
  await page.addInitScript((d) => {
    window.DATA = d;
  }, data);
  await page.goto(pathToFileURL(join(work, "template.html")).href);
  await page.evaluate(() => document.fonts.ready);
  const duration = await page.evaluate(() => window.DURATION);
  if (process.argv.includes("--keys")) {
    for (const t of [2.8, 11, 20, 31, 39, 45, 50]) {
      await page.evaluate((x) => window.render(x), t);
      await page.screenshot({ path: join(work, `key-${t}.jpg`), type: "jpeg", quality: 80 });
    }
    console.log("keys", work);
    continue;
  }
  const n = Math.round(duration * FPS);
  for (let i = 0; i < n; i++) {
    await page.evaluate((x) => window.render(x), i / FPS);
    await page.screenshot({
      path: join(work, "frames", `${String(i).padStart(5, "0")}.jpg`),
      type: "jpeg",
      quality: 92,
    });
  }
  await page.evaluate(() => window.render(2.8));
  await page.screenshot({ path: join(outDir, `${data.slug}.jpg`), type: "jpeg", quality: 85 });
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-framerate",
    String(FPS),
    "-i",
    join(work, "frames", "%05d.jpg"),
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    join(outDir, `${data.slug}.mp4`),
  ]);
  console.log("video", data.slug, `${duration}s`);
}
await browser.close();
