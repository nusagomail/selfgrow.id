/**
 * Infografis "Kurangi Gula Tanpa Menderita". Identitas visual: meja periksa label. Latar mint
 * pucat seperti kertas laboratorium, panel putih bergaris hitam tebal ala tabel Informasi Nilai
 * Gizi, judul huruf tegak sempit (SgLabel, Oswald), dan gula digambar sebagai kubus putih
 * isometrik (1 kubus = 1 sendok teh ≈ 4 g). Merah koral hanya untuk yang melewati batas.
 */

const C = {
  ink: "#111816",
  teal: "#0f766e",
  mint: "#dff3ec",
  coral: "#e4572e",
  grey: "#6b7b76",
};

/** Satu kubus gula isometrik (SVG) di titik (x, y), sisi s. */
function cube(x, y, s = 22, over = false) {
  const h = s / 2;
  const top = over ? "#ffe3da" : "#ffffff";
  const left = over ? "#f6b8a5" : "#e3ece9";
  const right = over ? "#f0a088" : "#c9d8d3";
  const line = over ? C.coral : "#8fa7a0";
  return `<g stroke="${line}" stroke-width="1" stroke-linejoin="round">
    <polygon points="${x},${y} ${x + s},${y - h} ${x + 2 * s},${y} ${x + s},${y + h}" fill="${top}"/>
    <polygon points="${x},${y} ${x + s},${y + h} ${x + s},${y + h + s} ${x},${y + s}" fill="${left}"/>
    <polygon points="${x + s},${y + h} ${x + 2 * s},${y} ${x + 2 * s},${y + s} ${x + s},${y + h + s}" fill="${right}"/>
  </g>`;
}

/** Tumpukan n kubus dalam kolom-kolom berisi `per` kubus, kubus ke-`limit`+ berwarna koral. */
function stack(n, { per = 4, s = 18, limit = Infinity, start = 0 } = {}) {
  const cols = Math.ceil(n / per);
  const w = cols * (2 * s + 6) + 4;
  const hgt = per * s + s + 8;
  let g = "";
  for (let i = 0; i < n; i++) {
    const col = Math.floor(i / per);
    const row = i % per;
    g += cube(2 + col * (2 * s + 6), hgt - s - 4 - row * s, s, start + i >= limit);
  }
  return `<svg width="${w}" height="${hgt}" viewBox="0 0 ${w} ${hgt}">${g}</svg>`;
}

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">Meja periksa · Kurangi Gula Tanpa Menderita</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Anatomi label: tiga langkah membaca gula dalam 10 detik. */
function anatomy() {
  const row = (k, v, cls = "") => `<div class="lr ${cls}"><span>${k}</span><span>${v}</span></div>`;
  return card(
    "Membaca label dalam 10 detik",
    `<div class="anat">
      <div class="label">
        <div class="lt">INFORMASI NILAI GIZI</div>
        ${row("Takaran saji", "200 ml", "hl1")}
        ${row("Jumlah sajian per kemasan", "2", "hl2")}
        <div class="thick"></div>
        <div class="lr sm"><span>JUMLAH PER SAJIAN</span><span></span></div>
        ${row("Energi total", "130 kkal")}
        ${row("Lemak total", "3 g")}
        ${row("Protein", "4 g")}
        ${row("Karbohidrat total", "22 g")}
        ${row("&nbsp;&nbsp;Gula", "12 g", "hl3")}
        ${row("Garam (natrium)", "95 mg")}
        <div class="thin"></div>
        <div class="lr sm"><span>Contoh: susu cokelat kemasan 400 ml</span><span></span></div>
      </div>
      <ol class="steps">
        <li><b>1</b><div><h4>Takaran saji</h4><p>Angka di bawahnya berlaku untuk <u>200 ml</u>, bukan sebotol.</p></div></li>
        <li><b>2</b><div><h4>Jumlah sajian</h4><p>Satu kemasan = 2 sajian. Habis sebotol? Kalikan dua: <u>24 g</u>.</p></div></li>
        <li><b>3</b><div><h4>Gula ÷ 4</h4><p>24 g ÷ 4 = <u>6 sendok teh</u> gula pasir.</p></div></li>
      </ol>
    </div>`,
    "Label boleh saja jujur. Yang menipu adalah kebiasaan kita membaca satu baris saja.",
  );
}

/** 2. Batas harian dalam kubus. */
function limits() {
  return card(
    "Batas harian, dalam kubus gula",
    `<div class="lim">
      <div class="lim-row"><div class="lim-k"><span class="big">50 g</span><span>Batas Kemenkes<br>≈ 12,5 sendok teh</span></div>${stack(12, { per: 1, s: 14 })}<span class="half">+½</span></div>
      <div class="lim-row"><div class="lim-k"><span class="big teal">25 g</span><span>Anjuran ketat WHO<br>≈ 6 sendok teh</span></div>${stack(6, { per: 1, s: 14 })}</div>
      <p class="legend">${stack(1, { per: 1, s: 14 })}<span>1 kubus = 1 sendok teh gula pasir ≈ 4 gram</span></p>
    </div>`,
    "Batas ini untuk semua gula dalam sehari: minuman, camilan, saus, dan gula di meja.",
  );
}

/** 3. Gula dengan seribu nama. */
function names() {
  const tags = [
    "sukrosa",
    "glukosa",
    "fruktosa",
    "dekstrosa",
    "maltosa",
    "sirup glukosa",
    "sirup jagung tinggi fruktosa",
    "gula aren",
    "gula kelapa",
    "madu",
    "molase",
    "susu kental manis",
    "sari buah pekat",
    "gula invert",
  ];
  return card(
    "Gula dengan seribu nama",
    `<div class="names">${tags.map((t, i) => `<span class="nt${i % 5 === 1 ? " alt" : ""}">${t}</span>`).join("")}</div>
    <div class="komp">
      <div class="kh">KOMPOSISI</div>
      <p><mark>Gula</mark>, tepung terigu, minyak nabati, <mark>sirup glukosa</mark>, kakao bubuk, <mark>dekstrosa</mark>, garam, pengemulsi, perisa.</p>
      <div class="karrow">urutan dari yang <b>paling banyak</b> → paling sedikit</div>
    </div>`,
    "Kalau gula ada di tiga urutan teratas, atau muncul dengan tiga nama berbeda, anggap itu camilan manis.",
  );
}

/** 4. Satu hari contoh: 68 g, melewati garis 50 g. */
function day() {
  const items = [
    ["07.00", "Teh manis (2 sdt)", 2],
    ["10.30", "Es kopi susu gula aren", 7],
    ["13.00", "Susu cokelat kemasan, sebotol", 6],
    ["16.00", "Kue sore", 2],
  ];
  let used = 0;
  const cols = items
    .map(([t, k, n]) => {
      const svg = stack(n, { per: 7, s: 16, limit: 12.5, start: used });
      used += n;
      return `<div class="dcol"><div class="dsv">${svg}</div><div class="dt">${t}</div><div class="dk">${k}</div><div class="dg">${n * 4} g</div></div>`;
    })
    .join("");
  return card(
    "Satu hari contoh: 17 sendok teh",
    `<div class="day">${cols}</div>
    <div class="dsum"><span>Total</span><b>68 g</b><span class="over">+18 g di atas batas 50 g</span></div>`,
    "Tidak ada yang terasa berlebihan. Masalahnya ada di jumlah, bukan di satu gelas.",
  );
}

/** 5. Tukar, bukan berhenti: 68 g → 26 g. */
function swaps() {
  const rows = [
    ["Teh manis 2 sdt", "Teh 1 sdt", 8, 4],
    ["Es kopi susu gula aren", "Minta “gulanya setengah”", 28, 14],
    ["Susu cokelat sebotol", "Susu tawar atau air putih", 24, 0],
    ["Kue sore", "Tetap kue sore", 8, 8],
  ];
  return card(
    "Tukar, bukan berhenti",
    `<div class="sw">${rows
      .map(
        ([a, b, x, y]) => `<div class="swr">
        <div class="swa"><span>${a}</span><em>${x} g</em></div>
        <div class="swar">→</div>
        <div class="swb"><span>${b}</span><em>${y} g</em></div>
      </div>`,
      )
      .join("")}
    <div class="swt"><span>68 g</span><span class="swar">→</span><span class="teal">26 g</span></div></div>`,
    "Kopinya tetap. Kuenya tetap. Yang hilang hanya gula yang tidak pernah terasa.",
  );
}

/** 6. Tangga lidah: empat minggu turun bertahap. */
function ladder() {
  const steps = [
    ["Minggu 1", "1,5 sdt", 3],
    ["Minggu 2", "1 sdt", 2],
    ["Minggu 3", "½ sdt", 1],
    ["Minggu 4", "pertahankan", 1],
  ];
  return card(
    "Tangga lidah: turun seperempat setiap minggu",
    `<div class="lad">
      <div class="lstep l0"><div class="lsv">${stack(4, { per: 4, s: 16 })}</div><b>Sekarang</b><span>2 sdt</span></div>
      ${steps
        .map(
          ([w, v, n], i) =>
            `<div class="lstep l${i + 1}"><div class="lsv">${stack(n, { per: 4, s: 16 })}</div><b>${w}</b><span>${v}</span></div>`,
        )
        .join("")}
    </div>`,
    "Dalam satu penelitian kecil, setelah tiga bulan mengurangi gula, puding yang sama terasa sekitar 40% lebih manis.",
  );
}

export const GULA_FIGURES = {
  "anatomi-label": {
    html: anatomy,
    alt: "Tabel Informasi Nilai Gizi susu cokelat: takaran saji 200 ml, 2 sajian per kemasan, gula 12 g per sajian. Satu botol berarti 24 g atau 6 sendok teh.",
  },
  "batas-harian": {
    html: limits,
    alt: "Batas gula Kemenkes 50 g sehari digambar sebagai 12½ kubus gula, anjuran ketat WHO 25 g sebagai 6 kubus; 1 kubus kira-kira 4 gram.",
  },
  "nama-lain-gula": {
    html: names,
    alt: "Empat belas nama lain gula di label, seperti sirup glukosa, dekstrosa, dan gula aren, serta contoh daftar komposisi yang diurutkan dari bahan terbanyak.",
  },
  "hari-gula": {
    html: day,
    alt: "Satu hari contoh: teh manis 8 g, es kopi susu gula aren 28 g, susu cokelat sebotol 24 g, kue sore 8 g. Total 68 g, 18 g di atas batas 50 g.",
  },
  "tukar-pilihan": {
    html: swaps,
    alt: "Empat penukaran: teh 2 sdt menjadi 1 sdt, kopi susu gula setengah, susu cokelat menjadi susu tawar, kue tetap. Total turun dari 68 g ke 26 g.",
  },
  "tangga-lidah": {
    html: ladder,
    alt: "Tangga empat minggu: dari 2 sendok teh per gelas turun ke 1,5, 1, lalu setengah sendok teh.",
  },
};

export const GULA_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:6px;color:${C.ink};background:${C.mint};
  background-image:linear-gradient(rgba(15,118,110,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(15,118,110,.07) 1px,transparent 1px);
  background-size:24px 24px;border:3px solid ${C.ink}}
.in{padding:30px 34px 28px}
.tag{font-family:SgLabel,sans-serif;font-size:13px;letter-spacing:.14em;color:${C.teal};text-transform:uppercase}
h2{font-family:SgLabel,sans-serif;font-size:40px;line-height:1.05;text-transform:uppercase;letter-spacing:.01em;margin:6px 0 20px}
.foot{margin-top:18px;font-size:17px;font-weight:600;line-height:1.4;border-top:3px solid ${C.ink};padding-top:12px}
u{text-decoration:none;background:linear-gradient(transparent 55%, #ffd2c4 55%);font-weight:800}
/* anatomi */
.anat{display:grid;grid-template-columns:300px 1fr;gap:26px;align-items:start}
.label{background:#fff;border:3px solid ${C.ink};padding:10px 12px;font-size:14px}
.lt{font-family:SgLabel,sans-serif;font-size:22px;letter-spacing:.02em;border-bottom:8px solid ${C.ink};padding-bottom:4px;margin-bottom:4px}
.lr{display:flex;justify-content:space-between;padding:4px 4px;border-bottom:1px solid ${C.ink}}
.lr.sm{font-size:11px;font-weight:800;border:0}
.thick{border-top:5px solid ${C.ink};margin:2px 0}
.thin{border-top:3px solid ${C.ink};margin-top:6px}
.hl1,.hl2{background:#d4efe7;outline:2px solid ${C.teal};font-weight:800}
.hl3{background:#ffe0d6;outline:2px solid ${C.coral};font-weight:800}
.steps{list-style:none;padding:0;display:grid;gap:14px}
.steps li{display:flex;gap:12px;background:#fff;border:2px solid ${C.ink};padding:12px 14px}
.steps b{flex-shrink:0;width:34px;height:34px;background:${C.ink};color:#fff;font-family:SgLabel,sans-serif;font-size:20px;display:flex;align-items:center;justify-content:center}
.steps h4{font-family:SgLabel,sans-serif;font-size:19px;text-transform:uppercase;letter-spacing:.03em}
.steps p{font-size:15px;line-height:1.4;margin-top:2px}
/* batas */
.lim{display:grid;gap:18px}
.lim-row{display:flex;align-items:center;gap:16px;background:#fff;border:2px solid ${C.ink};padding:12px 16px}
.lim-k{width:180px;flex-shrink:0;display:flex;flex-direction:column;gap:2px;font-size:14px;font-weight:600;line-height:1.3}
.big{font-family:SgLabel,sans-serif;font-size:38px;line-height:1}
.teal{color:${C.teal}}
.half{font-family:SgLabel,sans-serif;font-size:24px;color:${C.grey}}
.legend{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600}
/* nama */
.names{display:flex;flex-wrap:wrap;gap:9px}
.nt{background:#fff;border:2px solid ${C.ink};padding:6px 12px;font-weight:700;font-size:16px}
.nt.alt{background:${C.ink};color:#fff}
.komp{margin-top:20px;background:#fff;border:3px solid ${C.ink};padding:14px 16px}
.kh{font-family:SgLabel,sans-serif;font-size:18px;letter-spacing:.06em}
.komp p{font-size:16px;line-height:1.5;margin-top:4px}
mark{background:#ffd2c4;font-weight:800}
.karrow{margin-top:8px;font-size:14px;color:${C.teal};font-weight:700}
/* hari */
.day{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;align-items:end}
.dcol{background:#fff;border:2px solid ${C.ink};padding:10px;display:flex;flex-direction:column;align-items:center;text-align:center;min-height:250px}
.dsv{flex:1;display:flex;align-items:flex-end}
.dt{font-family:SgLabel,sans-serif;font-size:20px;margin-top:6px}
.dk{font-size:13px;font-weight:600;line-height:1.3;min-height:34px}
.dg{font-family:SgLabel,sans-serif;font-size:24px;color:${C.teal}}
.dsum{margin-top:14px;display:flex;align-items:baseline;gap:14px;background:${C.ink};color:#fff;padding:10px 16px;font-weight:700}
.dsum b{font-family:SgLabel,sans-serif;font-size:36px}
.dsum .over{margin-left:auto;color:#ffb39c}
/* tukar */
.sw{display:grid;gap:10px}
.swr{display:grid;grid-template-columns:1fr 34px 1fr;align-items:center}
.swa,.swb{display:flex;justify-content:space-between;align-items:center;background:#fff;border:2px solid ${C.ink};padding:10px 14px;font-weight:600;font-size:16px}
.swa em{font-style:normal;font-family:SgLabel,sans-serif;font-size:22px;color:${C.coral}}
.swb em{font-style:normal;font-family:SgLabel,sans-serif;font-size:22px;color:${C.teal}}
.swb{border-color:${C.teal};background:#f3fbf8}
.swar{text-align:center;font-weight:800;font-size:22px}
.swt{display:flex;justify-content:center;gap:18px;align-items:center;font-family:SgLabel,sans-serif;font-size:48px;margin-top:6px}
.swt span:first-child{color:${C.coral};text-decoration:line-through;text-decoration-thickness:4px}
/* tangga */
.lad{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;align-items:end}
.lstep{background:#fff;border:2px solid ${C.ink};display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:10px 6px 12px;text-align:center}
.lstep.l0{height:250px;background:#fff2ed;border-color:${C.coral}}
.lstep.l1{height:220px}.lstep.l2{height:190px}.lstep.l3{height:160px}.lstep.l4{height:160px;background:#e7f6f1;border-color:${C.teal}}
.lstep b{font-family:SgLabel,sans-serif;font-size:19px;margin-top:8px;text-transform:uppercase}
.lstep span{font-size:15px;font-weight:700;color:${C.teal}}
.lsv{display:flex;align-items:flex-end}
`;
