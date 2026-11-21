/**
 * Render video pengantar ebook (D41, D43): template adegan + data → MP4 1280×720 + poster JPG.
 *   node scripts/demo/intro-video/render.mjs [--keys] [--no-voice]
 * Hasil: scripts/demo/videos/{slug}.mp4 dan {slug}.jpg. Butuh Playwright dan ffmpeg.
 *
 * Suara:
 * - Musik latar disintesis sendiri (music.mjs), selalu ada.
 * - Narasi rekaman jadi (voice/{slug}/{indeks adegan}.mp3, mis. dari ElevenLabs) dipakai bila ada.
 * - Narasi dari `say` tiap adegan lewat Google Cloud Text-to-Speech. Kunci API tidak ada di
 *   kode: disisipkan proxy jaringan lingkungan (network secret untuk texttospeech.googleapis.com).
 *   Bila tidak tersedia, video tetap jadi dengan musik saja. Musik dikecilkan otomatis saat
 *   narasi berbicara (ducking).
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { GULA_INTRO } from "./gula.mjs";
import { HARGA_INTRO } from "./harga.mjs";
import { MINGGU_INTRO } from "./minggu.mjs";
import { writeMusic } from "./music.mjs";
import { NEGO_INTRO } from "./nego.mjs";
import { OVERTHINKING_INTRO } from "./overthinking.mjs";
import { PAYLATER_INTRO } from "./paylater.mjs";
import { SCROLL_INTRO } from "./scroll.mjs";
import { STOIK_INTRO } from "./stoik.mjs";
import { TERIAK_INTRO } from "./teriak.mjs";
import { TIDAK_INTRO } from "./tidak.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../../..");
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const FPS = 30;
// Render satu video saja: --only <slug>
const onlyArg = process.argv.indexOf("--only");
const ONLY = onlyArg >= 0 ? process.argv[onlyArg + 1] : null;
const VIDEOS = [
  PAYLATER_INTRO,
  SCROLL_INTRO,
  TIDAK_INTRO,
  OVERTHINKING_INTRO,
  HARGA_INTRO,
  GULA_INTRO,
  NEGO_INTRO,
  TERIAK_INTRO,
  MINGGU_INTRO,
  STOIK_INTRO,
].filter((v) => !ONLY || v.slug === ONLY);
const VOICE = { languageCode: "id-ID", name: "id-ID-Wavenet-A" };
/** Jeda sebelum narasi mulai di tiap adegan, dan jeda setelahnya sebelum adegan berganti. */
const LEAD = 0.6;
const TAIL = 0.9;

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
copyFileSync(
  join(here, "../fonts/jetbrains-mono-latin-500-normal.woff2"),
  join(work, "mono.woff2"),
);
copyFileSync(join(here, "../fonts/oswald-latin-600-normal.woff2"), join(work, "label.woff2"));
copyFileSync(
  join(here, "../fonts/dm-serif-display-latin-400-normal.woff2"),
  join(work, "serif.woff2"),
);
copyFileSync(join(here, "../fonts/caveat-latin-700-normal.woff2"), join(work, "hand.woff2"));
const outDir = join(here, "../videos");
mkdirSync(outDir, { recursive: true });

const ffprobeSeconds = (file) =>
  Number(
    execFileSync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=nw=1:nk=1",
      file,
    ])
      .toString()
      .trim(),
  );

/** Sintesis satu kalimat narasi → WAV. Mengembalikan null bila layanan suara tidak tersedia. */
async function speak(text, file, voice) {
  const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice,
      audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 44100, speakingRate: 1.0 },
    }),
  }).catch(() => null);
  if (!res?.ok) {
    console.warn(
      `narasi tidak tersedia (HTTP ${res?.status ?? "gagal"}); video dibuat tanpa suara narator`,
    );
    return null;
  }
  const { audioContent } = await res.json();
  writeFileSync(file, Buffer.from(audioContent, "base64"));
  return ffprobeSeconds(file);
}

const browser = await chromium.launch();
for (const base of VIDEOS) {
  const data = structuredClone(base);
  copyFileSync(join(here, "../covers", `${data.slug}.jpg`), join(work, "cover.jpg"));
  // Video yang dirancang khusus (D46) memakai template sendiri; selain itu kotak adegan.
  copyFileSync(join(here, data.template ?? "template.html"), join(work, "template.html"));

  // 1) Narasi per adegan; durasi adegan mengikuti panjang suaranya.
  const clips = [];
  if (!process.argv.includes("--no-voice") && !process.argv.includes("--keys")) {
    for (const [i, s] of data.scenes.entries()) {
      if (!s.say) continue;
      // Narasi yang sudah direkam (mis. dari ElevenLabs) di voice/{slug}/{i}.mp3 diutamakan.
      const recorded = join(here, "voice", data.slug, `${i}.mp3`);
      if (existsSync(recorded)) {
        s.dur = LEAD + ffprobeSeconds(recorded) + TAIL;
        clips.push({ scene: i, file: recorded });
        continue;
      }
      const file = join(work, `say-${i}.wav`);
      const secs = await speak(s.say, file, data.voice ?? VOICE);
      if (secs === null) {
        clips.length = 0;
        break;
      }
      s.dur = LEAD + secs + TAIL;
      clips.push({ scene: i, file });
    }
  }
  data.captions = Boolean(data.captions && clips.length > 0);

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
  const timeline = await page.evaluate(() => window.TIMELINE);

  if (process.argv.includes("--keys")) {
    for (const [i, sc] of timeline.entries()) {
      await page.evaluate((x) => window.render(x), sc.start + sc.dur * 0.75);
      await page.screenshot({
        path: join(work, `key-${i}-${sc.type}.jpg`),
        type: "jpeg",
        quality: 80,
      });
    }
    console.log("keys", work, `${duration.toFixed(1)}s`);
    await page.close();
    continue;
  }

  // 2) Gambar setiap frame.
  rmSync(join(work, "frames"), { recursive: true, force: true });
  mkdirSync(join(work, "frames"));
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
  await page.close();

  // 3) Musik latar sepanjang video.
  const music = join(work, "music.wav");
  writeMusic(music, {
    seconds: duration + 0.5,
    bpm: data.music?.bpm ?? 84,
    mood: data.music?.mood ?? "hangat",
  });

  // 4) Campur suara: narasi di posisi adegannya, musik dikecilkan saat narasi bicara.
  const inputs = ["-framerate", String(FPS), "-i", join(work, "frames", "%05d.jpg"), "-i", music];
  for (const c of clips) inputs.push("-i", c.file);
  let filter;
  if (clips.length > 0) {
    const parts = clips.map((c, k) => {
      const ms = Math.round((timeline[c.scene].start + LEAD) * 1000);
      return `[${k + 2}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay=${ms}|${ms}[n${k}]`;
    });
    const labels = clips.map((_, k) => `[n${k}]`).join("");
    filter = [
      ...parts,
      `${labels}amix=inputs=${clips.length}:normalize=0,volume=1.6,apad,asplit=2[nv][sc]`,
      "[1:a]volume=0.55[m]",
      "[m][sc]sidechaincompress=threshold=0.02:ratio=10:attack=30:release=600[duck]",
      "[duck][nv]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]",
    ].join(";");
  } else {
    filter = "[1:a]volume=0.6[a]";
  }
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    ...inputs,
    "-filter_complex",
    filter,
    "-map",
    "0:v",
    "-map",
    "[a]",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "23",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-shortest",
    "-movflags",
    "+faststart",
    join(outDir, `${data.slug}.mp4`),
  ]);
  console.log(
    "video",
    data.slug,
    `${duration.toFixed(1)}s`,
    clips.length > 0 ? `narasi ${clips.length} adegan` : "musik saja",
  );
}
await browser.close();
