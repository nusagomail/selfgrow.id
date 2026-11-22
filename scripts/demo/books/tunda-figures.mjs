/**
 * Infografis "Berhenti Menunda Mulai Hari Ini". Identitas visual: panel mixer suara. Latar grafit,
 * empat fader berwarna (teal, kuning, merah muda, hijau limau) untuk empat tuas motivasi, label
 * kecil huruf mesin (SgMono), lampu indikator. Gagasannya: menunda bukan sifat tetap, tapi
 * pengaturan yang bisa digeser.
 */

const C = {
  bg: "#1f2430",
  panel: "#2a3040",
  text: "#e8ecf3",
  mute: "#8d99ae",
  teal: "#2ec4b6",
  amber: "#ffb02e",
  pink: "#ff5fa2",
  lime: "#b5e853",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag"><span class="led"></span>MIXER · BERHENTI MENUNDA</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

const fader = (label, sub, pos, color, up = true) => `
<div class="fd"><div class="trk"><div class="fill" style="height:${pos}%;background:${color}"></div><div class="knob" style="bottom:calc(${pos}% - 12px)"></div></div>
<b style="color:${color}">${label}</b><small>${sub}</small><em>${up ? "naikkan ↑" : "turunkan ↓"}</em></div>`;

/** 1. Rumus menunda sebagai empat fader. */
function formula() {
  return card(
    "Rumus di balik menunda",
    `<div class="fm">
      <div class="eq"><span class="t">DORONGAN =</span><div class="frac"><div class="num"><span style="color:${C.teal}">Keyakinan</span> × <span style="color:${C.amber}">Nilai</span></div><div class="den"><span style="color:${C.pink}">Gangguan</span> × <span style="color:${C.lime}">Jarak tenggat</span></div></div></div>
      <div class="fds">${fader("Keyakinan", "aku bisa", 30, C.teal)}${fader("Nilai", "ini berarti", 40, C.amber)}${fader("Gangguan", "godaan lain", 80, C.pink, false)}${fader("Jarak", "tenggat jauh", 75, C.lime, false)}</div>
    </div>`,
    "Teori Motivasi Temporal (Steel, 2007). Menggeser satu tuas sudah mengubah hasilnya.",
  );
}

/** 2. Siklus menghindar. */
function loop() {
  const s = [
    ["Buka tugas", C.text],
    ["Muncul rasa tidak enak", C.pink],
    ["Kabur ke hal lain", C.amber],
    ["Lega sebentar", C.lime],
    ["Rasa bersalah", C.pink],
    ["Tugas terasa makin berat", C.text],
  ];
  return card(
    "Lingkaran yang membuat menunda terasa enak",
    `<div class="lp">${s
      .map(([t, c], i) => {
        const a = (i / s.length) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + 38 * Math.cos(a);
        const y = 50 + 38 * Math.sin(a);
        return `<div class="node" style="left:${x}%;top:${y}%;border-color:${c};color:${c}"><span>${i + 1}</span>${t}</div>`;
      })
      .join("")}<div class="ctr">menunda<br>= menenangkan<br>perasaan</div></div>`,
    "Yang dihindari bukan tugasnya, tapi perasaan yang muncul saat memulainya.",
  );
}

/** 3. Tangga dari tugas raksasa ke langkah dua menit. */
function ladder() {
  const s = [
    ["Menyelesaikan skripsi", "terlalu besar, menakutkan", 100],
    ["Menulis bab 3", "masih kabur", 75],
    ["Menulis subbab metode", "lebih jelas", 52],
    ["Menulis 3 judul subbab", "dua menit, hampir konyol", 28],
  ];
  return card(
    "Pecah sampai terlalu kecil untuk ditolak",
    `<div class="ld">${s.map(([t, d, w], i) => `<div class="lr"><div class="lb" style="width:${w}%;background:${i === s.length - 1 ? C.teal : C.panel};${i === s.length - 1 ? `color:${C.bg}` : ""}"><b>${t}</b><small>${d}</small></div></div>`).join("")}</div>`,
    "Langkah pertama yang baik terasa terlalu mudah. Justru itu tujuannya.",
  );
}

/** 4. Empat tuas, empat teknik. */
function levers() {
  const t = [
    [
      "Keyakinan",
      C.teal,
      "Langkah dua menit; tulis versi jelek pertama; lihat contoh yang sudah jadi",
    ],
    [
      "Nilai",
      C.amber,
      "Ingat alasannya; gabungkan dengan hal yang kamu sukai; hadiah kecil setelahnya",
    ],
    ["Gangguan", C.pink, "Ponsel di ruangan lain; satu tab saja; mode fokus di jam yang sama"],
    [
      "Jarak",
      C.lime,
      "Tenggat kecil setiap minggu; janji setor ke teman atau dosen; tanggal di kalender",
    ],
  ];
  return card(
    "Satu tuas, beberapa cara menggesernya",
    `<div class="lv">${t.map(([a, c, b]) => `<div class="lvi" style="border-color:${c}"><b style="color:${c}">${a}</b><p>${b}</p></div>`).join("")}</div>`,
  );
}

/** 5. Setelah gagal: dua jalan. */
function forgive() {
  return card(
    "Setelah menunda lagi",
    `<div class="fg">
      <div class="fgc bad"><h4>Menghukum diri</h4><p>“Aku memang pemalas.”</p><p>→ perasaan makin berat</p><p>→ tugas makin dihindari</p></div>
      <div class="fgc good"><h4>Memaafkan diri</h4><p>“Kemarin aku menghindar karena takut hasilnya jelek. Wajar. Hari ini mulai dua menit.”</p><p>→ perasaan lebih ringan</p><p>→ lebih mudah memulai</p></div>
    </div>`,
    "Mahasiswa yang memaafkan diri setelah menunda di ujian pertama, lebih sedikit menunda di ujian berikutnya (Wohl, Pychyl & Bennett, 2010).",
  );
}

export const TUNDA_FIGURES = {
  "rumus-menunda": {
    html: formula,
    alt: "Rumus dorongan: keyakinan kali nilai dibagi gangguan kali jarak tenggat, digambarkan sebagai empat fader mixer.",
  },
  "lingkaran-menghindar": {
    html: loop,
    alt: "Lingkaran enam langkah: buka tugas, rasa tidak enak, kabur ke hal lain, lega sebentar, rasa bersalah, tugas terasa makin berat.",
  },
  "tangga-dua-menit": {
    html: ladder,
    alt: "Tangga yang memecah 'menyelesaikan skripsi' menjadi 'menulis tiga judul subbab' yang selesai dalam dua menit.",
  },
  "empat-tuas": {
    html: levers,
    alt: "Empat tuas motivasi dan cara menggesernya: keyakinan, nilai, gangguan, dan jarak tenggat.",
  },
  "memaafkan-diri": {
    html: forgive,
    alt: "Dua jalan setelah menunda: menghukum diri membuat tugas makin dihindari, memaafkan diri membuat lebih mudah memulai.",
  },
};

export const TUNDA_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:18px;color:${C.text};background:${C.bg};
  background-image:linear-gradient(180deg,rgba(255,255,255,.04),transparent 40%);box-shadow:inset 0 0 0 2px #333a4c}
.in{padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.12em;color:${C.mute};display:flex;align-items:center;gap:8px}
.led{width:9px;height:9px;border-radius:50%;background:${C.lime};box-shadow:0 0 10px ${C.lime}}
h2{font-size:32px;font-weight:800;line-height:1.15;margin:8px 0 20px}
.foot{margin-top:18px;font-size:15px;line-height:1.45;color:${C.mute}}
.fm{display:grid;gap:20px}
.eq{display:flex;align-items:center;gap:14px;background:${C.panel};border-radius:12px;padding:14px 18px;font-weight:800}
.eq .t{font-family:SgMono,monospace;font-size:18px}
.frac{display:flex;flex-direction:column;align-items:center;font-size:19px}
.num{padding-bottom:6px;border-bottom:2px solid ${C.text}}
.den{padding-top:6px}
.fds{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.fd{background:${C.panel};border-radius:12px;padding:16px 10px 12px;display:flex;flex-direction:column;align-items:center;gap:4px}
.trk{position:relative;width:10px;height:150px;border-radius:5px;background:#151922;margin-bottom:8px}
.fill{position:absolute;left:0;right:0;bottom:0;border-radius:5px;opacity:.85}
.knob{position:absolute;left:-15px;width:40px;height:24px;border-radius:5px;background:#d6dbe5;box-shadow:0 3px 0 #8d99ae}
.fd b{font-size:16px}
.fd small{font-family:SgMono,monospace;font-size:11px;color:${C.mute}}
.fd em{font-style:normal;font-size:12px;font-weight:700}
.lp{position:relative;height:380px}
.node{position:absolute;transform:translate(-50%,-50%);width:170px;background:${C.panel};border:2px solid;border-radius:12px;padding:10px;font-size:14px;font-weight:700;text-align:center;line-height:1.3}
.node span{display:block;font-family:SgMono,monospace;font-size:12px;opacity:.7}
.ctr{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;font-family:SgMono,monospace;font-size:14px;color:${C.mute};line-height:1.5}
.ld{display:grid;gap:10px}
.lr{display:flex;justify-content:flex-start}
.lb{border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:2px;min-width:240px}
.lb b{font-size:18px}
.lb small{font-family:SgMono,monospace;font-size:12px;opacity:.8}
.lv{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.lvi{background:${C.panel};border-radius:12px;padding:16px;border-left:6px solid}
.lvi b{font-size:20px}
.lvi p{font-size:15px;line-height:1.5;margin-top:6px}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fgc{background:${C.panel};border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:8px;border-top:6px solid}
.fgc.bad{border-top-color:${C.pink}}
.fgc.good{border-top-color:${C.lime}}
.fgc h4{font-size:20px}
.fgc p{font-size:15px;line-height:1.45}
.fgc p:nth-child(2){font-family:SgMono,monospace;font-size:14px;color:${C.mute}}
`;
