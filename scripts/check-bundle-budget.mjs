// Gagal bila JS awal `app` melebihi 200 KB gzip atau JS halaman `site` melebihi 50 KB (BLUEPRINT bagian 10).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const budgets = [
  { name: "app (bundle awal)", dir: "apps/app/dist/client", entryOnly: true, limitKb: 200 },
  { name: "site (per halaman)", dir: "apps/site/dist/client", entryOnly: false, limitKb: 50 },
];

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const gzKb = (file) => gzipSync(readFileSync(file)).length / 1024;
let failed = false;

for (const b of budgets) {
  let files;
  if (b.entryOnly) {
    const html = readFileSync(join(b.dir, "index.html"), "utf8");
    files = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.js)"/g)].map((m) =>
      join(b.dir, m[1]),
    );
  } else {
    files = walk(b.dir).filter((f) => f.endsWith(".js"));
  }
  const total = files.reduce((sum, f) => sum + gzKb(f), 0);
  const ok = total <= b.limitKb;
  if (!ok) failed = true;
  console.log(
    `${ok ? "OK " : "GAGAL"} ${b.name}: ${total.toFixed(1)} KB gzip (batas ${b.limitKb} KB)`,
  );
}

process.exit(failed ? 1 : 0);
