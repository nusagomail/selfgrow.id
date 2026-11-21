/**
 * Infografis "Keluar dari Lingkaran Overthinking". Identitas visual: malam yang tenang. Latar biru
 * tua bergradasi, bintang kecil, bentuk lembut tanpa garis tebal, judul serif, catatan tulisan
 * tangan berwarna kuning bulan. Kebalikan dari gaya stiker "Berani Bilang Tidak".
 */

const C = {
  night: "#1b2340",
  indigo: "#2e3a6b",
  lav: "#b9addf",
  moon: "#f3e6b5",
  mist: "#e8e6f3",
  soft: "#7c6fc4",
};

const stars = (n, seed = 3) => {
  let s = seed;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from(
    { length: n },
    () =>
      `<i class="st" style="left:${(r() * 100).toFixed(1)}%;top:${(r() * 100).toFixed(1)}%;opacity:${(0.25 + r() * 0.6).toFixed(2)};transform:scale(${(0.5 + r()).toFixed(2)})"></i>`,
  ).join("");
};

const card = (title, body, hand = "", seed = 3) => `
<div class="card"><div class="sky">${stars(38, seed)}</div>
  <div class="in">
    <div class="tag">Keluar dari Lingkaran Overthinking</div>
    <h2>${title}</h2>
    ${body}
    ${hand ? `<p class="hand">${hand}</p>` : ""}
  </div>
</div>`;

/** 1. Spiral pikiran. */
function spiral() {
  const pts = [];
  for (let t = 0; t < Math.PI * 7; t += 0.08) {
    const r = 12 + t * 13;
    pts.push(`${(330 + Math.cos(t) * r).toFixed(1)},${(230 + Math.sin(t) * r * 0.78).toFixed(1)}`);
  }
  const thoughts = [
    ["Tadi aku ngomong salah ya?", 70, 40],
    ["Dia pasti kesal", 460, 70],
    ["Nanti dibahas di rapat...", 480, 330],
    ["Kalau aku dipecat?", 90, 360],
    ["Kenapa aku begini terus?", 250, 205],
  ];
  return card(
    "Lingkaran yang menyala di malam hari",
    `<div class="spiral"><svg viewBox="0 0 660 460"><polyline points="${pts.join(" ")}" fill="none" stroke="${C.lav}" stroke-width="3" stroke-linecap="round" opacity=".75"/></svg>
      ${thoughts.map(([t, x, y]) => `<span class="th" style="left:${x}px;top:${y}px">${t}</span>`).join("")}
    </div>`,
    "semakin dipikir, semakin ke tengah, semakin sempit",
    5,
  );
}

/** 2. Pohon kekhawatiran. */
function tree() {
  const node = (t, cls = "") => `<div class="nd ${cls}">${t}</div>`;
  return card(
    "Pohon kekhawatiran",
    `<div class="tree">
      ${node("Aku sedang khawatir tentang…", "root")}
      ${node("Bisakah aku melakukan sesuatu?")}
      <div class="two">
        <div class="br">${node("Bisa", "yes")}${node("Bisa sekarang?")}<div class="two">${node("Ya → lakukan langkah terkecil", "leaf")}${node("Belum → jadwalkan", "leaf")}</div></div>
        <div class="br">${node("Tidak bisa", "no")}${node("Lepaskan perhatian: napas, jurnal, atau hal di depanmu", "leaf rel")}</div>
      </div>
    </div>`,
    "setiap cabang berakhir dengan tindakan atau pelepasan, bukan putaran",
    11,
  );
}

/** 3. Halaman jurnal pikiran. */
function journal() {
  const rows = [
    ["Situasi", "Pesan ke atasan belum dibalas 3 jam"],
    ["Pikiran otomatis", "Dia pasti marah sama kerjaanku"],
    ["Bukti mendukung", "Biasanya dia cepat membalas"],
    ["Bukti sebaliknya", "Hari ini dia rapat seharian"],
    ["Pikiran yang lebih seimbang", "Mungkin dia sibuk. Tunggu besok pagi"],
  ];
  return `<div class="card paperc"><div class="in">
    <div class="tag dark">Keluar dari Lingkaran Overthinking</div>
    <h2 class="ink">Satu halaman jurnal pikiran</h2>
    <div class="page">${rows
      .map(([k, v]) => `<div class="ln"><b>${k}</b><span>${v}</span></div>`)
      .join("")}</div>
    <p class="hand ink2">tulis pelan-pelan, pikiran yang ditulis jadi lebih kecil</p>
  </div></div>`;
}

/** 4. Napas kotak. */
function boxBreath() {
  const sides = [
    ["Tarik napas", "4 hitungan", "top"],
    ["Tahan", "4 hitungan", "right"],
    ["Hembuskan", "4 hitungan", "bottom"],
    ["Tahan", "4 hitungan", "left"],
  ];
  return card(
    "Napas kotak",
    `<div class="box"><div class="sq"><div class="moon"></div></div>
      ${sides.map(([t, s, p]) => `<div class="bs ${p}"><b>${t}</b><span>${s}</span></div>`).join("")}
    </div>`,
    "ulangi empat putaran, cukup sekitar satu menit",
    17,
  );
}

/** 5. Jam waktu khawatir. */
function clock() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return `<line x1="${180 + Math.sin(a) * 140}" y1="${180 - Math.cos(a) * 140}" x2="${180 + Math.sin(a) * 152}" y2="${180 - Math.cos(a) * 152}" stroke="${C.lav}" stroke-width="3" stroke-linecap="round"/>`;
  }).join("");
  // 19.30–19.45 → sektor 30–45 menit pada jarum menit.
  const arc = (m) => {
    const a = (m / 60) * Math.PI * 2;
    return [180 + Math.sin(a) * 130, 180 - Math.cos(a) * 130];
  };
  const [x1, y1] = arc(30);
  const [x2, y2] = arc(45);
  return card(
    "Waktu khawatir: 15 menit, tempat yang sama",
    `<div class="clockw"><svg viewBox="0 0 360 360" width="300" height="300">
        <circle cx="180" cy="180" r="160" fill="${C.indigo}"/>${ticks}
        <path d="M180 180 L${x1} ${y1} A130 130 0 0 1 ${x2} ${y2} Z" fill="${C.moon}" opacity=".85"/>
        <line x1="180" y1="180" x2="180" y2="70" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
        <line x1="180" y1="180" x2="245" y2="210" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
        <circle cx="180" cy="180" r="9" fill="#fff"/></svg>
      <ol class="rules"><li><b>Pilih jamnya</b>, misalnya 19.30–19.45. Jangan dekat jam tidur.</li><li><b>Saat khawatir datang</b> di luar jam itu, tulis satu baris, lalu tunda.</li><li><b>Di jamnya</b>, buka catatan dan pikirkan dengan sengaja. Setelah 15 menit, tutup.</li></ol>
    </div>`,
    "kekhawatiran boleh datang, tapi kamu yang menentukan jam tamunya",
    23,
  );
}

/** 6. Lingkar kendali. */
function circles() {
  return card(
    "Tiga lingkaran",
    `<div class="rings">
      <div class="r3"><span class="lbl">Di luar kendali</span>
        <div class="r2"><span class="lbl">Bisa kupengaruhi</span>
          <div class="r1"><span class="lbl">Bisa kukendalikan</span></div></div></div>
      <ul class="ex">
        <li><i style="background:${C.moon}"></i><b>Kendali:</b> persiapanku, jam tidurku, kata-kataku</li>
        <li><i style="background:${C.lav}"></i><b>Pengaruh:</b> suasana rapat, cara orang memandang kerjaku</li>
        <li><i style="background:#56609a"></i><b>Di luar:</b> keputusan atasan, cuaca, masa lalu</li>
      </ul>
    </div>`,
    "taruh tenaga di lingkaran paling dalam",
    29,
  );
}

export const OVERTHINKING_FIGURES = {
  "spiral-pikiran": {
    html: spiral,
    alt: "Spiral yang mengecil ke tengah dengan pikiran-pikiran seperti: tadi aku ngomong salah ya, dia pasti kesal, kalau aku dipecat.",
  },
  "pohon-kekhawatiran": {
    html: tree,
    alt: "Pohon keputusan: bisakah aku melakukan sesuatu? Kalau bisa dan sekarang, lakukan langkah terkecil; kalau belum, jadwalkan; kalau tidak bisa, lepaskan perhatian.",
  },
  "jurnal-pikiran": {
    html: journal,
    alt: "Halaman jurnal bergaris berisi situasi, pikiran otomatis, bukti mendukung, bukti sebaliknya, dan pikiran yang lebih seimbang.",
  },
  "napas-kotak": {
    html: boxBreath,
    alt: "Diagram napas kotak: tarik napas empat hitungan, tahan empat, hembuskan empat, tahan empat.",
  },
  "waktu-khawatir": {
    html: clock,
    alt: "Jam dengan sektor 15 menit berwarna kuning sebagai waktu khawatir, beserta tiga aturan memakainya.",
  },
  "lingkar-kendali": {
    html: circles,
    alt: "Tiga lingkaran bertumpuk: bisa kukendalikan di tengah, bisa kupengaruhi, dan di luar kendali paling luar, dengan contoh masing-masing.",
  },
};

export const OVERTHINKING_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;border-radius:32px;overflow:hidden;color:${C.mist};
  background:radial-gradient(120% 90% at 80% 0%, #3b4785 0%, ${C.indigo} 40%, ${C.night} 100%)}
.sky{position:absolute;inset:0}
.st{position:absolute;width:3px;height:3px;border-radius:50%;background:#fff}
.in{position:relative;padding:38px 40px 34px}
.tag{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${C.lav}}
.tag.dark{color:#6a6290}
h2{font-family:SgSerif,serif;font-weight:400;font-size:36px;line-height:1.15;margin:10px 0 24px;color:#fff}
h2.ink{color:${C.night}}
.hand{font-family:SgHand,cursive;font-size:27px;color:${C.moon};margin-top:20px}
.hand.ink2{color:#6a5ab0}
.spiral{position:relative;height:460px}.spiral svg{position:absolute;inset:0;width:660px;height:460px}
.th{position:absolute;font-size:15px;font-weight:600;padding:8px 13px;border-radius:18px;background:rgba(255,255,255,.12);backdrop-filter:blur(2px);color:#fff;white-space:nowrap}
.tree{display:flex;flex-direction:column;gap:12px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.br{display:flex;flex-direction:column;gap:12px}
.nd{border-radius:18px;padding:12px 14px;text-align:center;font-size:15px;line-height:1.35;background:rgba(255,255,255,.1)}
.nd.root{background:${C.lav};color:${C.night};font-weight:800;font-size:17px}
.nd.yes{background:rgba(243,230,181,.2);color:${C.moon};font-weight:800}
.nd.no{background:rgba(185,173,223,.2);color:${C.lav};font-weight:800}
.nd.leaf{background:rgba(243,230,181,.92);color:${C.night};font-weight:700}
.nd.leaf.rel{background:rgba(185,173,223,.92)}
.paperc{background:#f7f4ee;color:${C.night}}
.page{background:#fffdf8;border-radius:18px;padding:16px 22px;box-shadow:0 14px 30px rgba(27,35,64,.15);
  background-image:repeating-linear-gradient(transparent 0 47px, #d9dcec 47px 48px);border-left:5px solid #e5a1a1}
.ln{display:grid;grid-template-columns:180px 1fr;gap:14px;min-height:48px;align-items:center}
.ln b{font-size:14px;color:#6a6290}
.ln span{font-family:SgHand,cursive;font-size:24px;line-height:1.05;color:#2c3570}
.box{position:relative;height:400px}
.sq{position:absolute;left:180px;top:70px;width:300px;height:260px;border:4px solid ${C.lav};border-radius:28px;display:flex;align-items:center;justify-content:center}
.moon{width:90px;height:90px;border-radius:50%;background:${C.moon};box-shadow:0 0 40px rgba(243,230,181,.6)}
.bs{position:absolute;text-align:center}.bs b{display:block;font-size:19px;color:#fff}.bs span{font-size:14px;color:${C.lav}}
.bs.top{left:250px;top:10px;width:160px}.bs.bottom{left:250px;top:345px;width:160px}
.bs.left{left:30px;top:180px;width:140px}.bs.right{left:490px;top:180px;width:140px}
.clockw{display:grid;grid-template-columns:300px 1fr;gap:26px;align-items:center}
.rules{display:grid;gap:14px;padding-left:20px;font-size:16px;line-height:1.45;color:${C.mist}}
.rules b{color:${C.moon}}
.rings{display:grid;grid-template-columns:320px 1fr;gap:24px;align-items:center}
.r3,.r2,.r1{border-radius:50%;display:flex;align-items:flex-start;justify-content:center;position:relative}
.r3{width:320px;height:320px;background:#56609a;padding-top:14px}
.r2{width:220px;height:220px;background:${C.lav};position:absolute;top:70px;left:50px;padding-top:12px}
.r1{width:120px;height:120px;background:${C.moon};position:absolute;top:70px;left:50px;align-items:center}
.lbl{font-size:13px;font-weight:800;color:${C.night};text-align:center;max-width:110px;line-height:1.2}
.r3>.lbl{color:#fff}
.ex{list-style:none;padding:0;display:grid;gap:14px;font-size:16px;line-height:1.45}
.ex i{display:inline-block;width:14px;height:14px;border-radius:50%;margin-right:8px;vertical-align:-1px}
.ex b{color:#fff}
`;
