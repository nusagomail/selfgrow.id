/**
 * Infografis "Gajian Kok Cepat Habis?". Identitas visual: instalasi pipa air. Gaji digambarkan
 * sebagai air yang mengalir dari keran lewat pipa tembaga ke tiga ember (wajib, tujuan, bebas),
 * dengan tetesan bocor berwarna oranye. Latar biru muda seperti cetak biru, label huruf mesin
 * (SgMono). Metafora: masalahnya bukan airnya kurang, tapi alirannya tidak diatur.
 */

const C = {
  bg: "#eaf3fb",
  grid: "rgba(43,108,176,.08)",
  ink: "#1c2b3a",
  water: "#2b6cb0",
  waterLt: "#8ec5ef",
  copper: "#b8733d",
  leak: "#e07a3f",
  green: "#2f855a",
  mute: "#5b6b7b",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">Instalasi · Gajian Kok Cepat Habis?</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

const bucket = (label, amount, pct, fill, color) => `
<div class="bk"><div class="pail"><div class="water" style="height:${fill}%;background:${color}"></div></div><b>${label}</b><span>${amount}</span><em>${pct}</em></div>`;

/** 1. Aliran gaji ke tiga ember. */
function flow() {
  return card(
    "Atur alirannya di hari gajian",
    `<div class="fl">
      <div class="tap"><div class="head">GAJI Rp6,8 jt</div><div class="spout"></div></div>
      <div class="pipes"><span></span><span></span><span></span></div>
      <div class="bks">${bucket("Wajib", "Rp3,3 jt", "48%", 90, C.water)}${bucket("Tujuan", "Rp1 jt", "15%", 55, C.green)}${bucket("Bebas", "Rp2,5 jt", "37%", 75, C.waterLt)}</div>
    </div>`,
    "Pembagian Fikri. Pedoman umum 50/30/20 (wajib/bebas/tujuan) dari Warren & Tyagi; sesuaikan dengan kondisimu.",
  );
}

/** 2. Saldo selama sebulan: sebelum dan sesudah. */
function month() {
  const before = [100, 80, 62, 50, 38, 28, 20, 14, 9, 6, 4, 2, 2];
  const after = [100, 94, 88, 82, 76, 70, 64, 58, 52, 46, 40, 34, 28];
  const pts = (arr) => arr.map((v, i) => `${20 + i * 50},${220 - v * 1.9}`).join(" ");
  return card(
    "Uang bebas selama sebulan",
    `<svg viewBox="0 0 660 260" class="mo" aria-hidden="true">
      <line x1="20" y1="222" x2="640" y2="222" stroke="${C.mute}" stroke-width="1.5"/>
      <polyline points="${pts(before)}" fill="none" stroke="${C.leak}" stroke-width="5" stroke-linejoin="round"/>
      <polyline points="${pts(after)}" fill="none" stroke="${C.water}" stroke-width="5" stroke-linejoin="round"/>
      <text x="20" y="246" class="ax">tgl 25 (gajian)</text><text x="300" y="246" class="ax">tgl 10</text><text x="560" y="246" class="ax">tgl 24</text>
      <text x="300" y="150" class="lb" fill="${C.leak}">sebelum: habis di minggu kedua</text>
      <text x="380" y="70" class="lb" fill="${C.water}">dengan jatah harian</text>
    </svg>`,
    "Jumlah uangnya sama. Yang berubah adalah kecepatan alirannya.",
  );
}

/** 3. Tetes kecil, ember besar. */
function drips() {
  const d = [
    ["Kopi & jajan", "Rp150 rb/minggu", "Rp7,8 jt/tahun"],
    ["Ongkir & biaya layanan", "Rp60 rb/minggu", "Rp3,1 jt/tahun"],
    ["Langganan jarang dipakai", "Rp120 rb/bulan", "Rp1,4 jt/tahun"],
    ["Biaya admin & transfer", "Rp30 rb/bulan", "Rp360 rb/tahun"],
  ];
  return card(
    "Tetes kecil, ember besar",
    `<div class="dr">${d.map(([a, b, c]) => `<div class="dri"><span class="drop"></span><div><b>${a}</b><small>${b}</small></div><em>${c}</em></div>`).join("")}
      <div class="drt"><span>Total setahun</span><b>±Rp12,7 jt</b></div></div>`,
    "Contoh perkiraan Fikri. Tidak semuanya perlu dihapus; separuhnya saja sudah besar.",
  );
}

/** 4. Kenapa kantong terpisah berhasil. */
function pockets() {
  const r = [
    [
      "Satu rekening untuk semua",
      "Semua uang terasa boleh dipakai. Tabungan selalu “nanti kalau ada sisa”.",
      C.leak,
    ],
    [
      "Rekening atau kantong terpisah",
      "Uang tujuan sudah “pergi” sejak hari gajian. Yang terlihat hanya uang bebas.",
      C.water,
    ],
  ];
  return card(
    "Kenapa kantong terpisah berhasil",
    `<div class="pk">${r.map(([a, b, c]) => `<div class="pki" style="border-color:${c}"><h4 style="color:${c}">${a}</h4><p>${b}</p></div>`).join("")}</div>
     <div class="steps"><span>1. Gaji masuk</span><span>→</span><span>2. Transfer otomatis ke kantong wajib dan tujuan</span><span>→</span><span>3. Sisa = jatah bebas</span></div>`,
    "Orang cenderung memperlakukan uang berbeda menurut “label” tempatnya (akuntansi mental, Thaler 1999). Manfaatkan itu.",
  );
}

/** 5. Tinjauan bulanan 15 menit. */
function review() {
  const c = [
    "Berapa sisa uang bebas di hari sebelum gajian?",
    "Dua pengeluaran terbesar di luar rencana, apa saja?",
    "Apakah kantong tujuan terisi sesuai rencana?",
    "Satu kebocoran yang akan ditambal bulan depan",
    "Satu hal yang berhasil dan akan dipertahankan",
  ];
  return card(
    "Tinjauan 15 menit sebelum gajian",
    `<div class="rv">${c.map((x, i) => `<p><span>${String(i + 1).padStart(2, "0")}</span>${x}</p>`).join("")}</div>`,
  );
}

export const GAJIAN_FIGURES = {
  "aliran-gaji": {
    html: flow,
    alt: "Gaji Rp6,8 juta mengalir lewat pipa ke tiga ember: wajib Rp3,3 juta (48%), tujuan Rp1 juta (15%), bebas Rp2,5 juta (37%).",
  },
  "saldo-sebulan": {
    html: month,
    alt: "Dua garis uang bebas selama sebulan: sebelumnya habis di minggu kedua, dengan jatah harian menurun perlahan sampai sebelum gajian.",
  },
  "tetes-kecil": {
    html: drips,
    alt: "Empat kebocoran kecil Fikri dan totalnya setahun: kopi dan jajan Rp7,8 juta, ongkir Rp3,1 juta, langganan Rp1,4 juta, biaya admin Rp360 ribu; total sekitar Rp12,7 juta.",
  },
  "kantong-terpisah": {
    html: pockets,
    alt: "Perbandingan satu rekening untuk semua dengan kantong terpisah, dan tiga langkah transfer otomatis di hari gajian.",
  },
  "tinjauan-bulanan": {
    html: review,
    alt: "Lima pertanyaan tinjauan bulanan 15 menit sebelum gajian.",
  },
};

export const GAJIAN_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:12px;color:${C.ink};background:${C.bg};
  background-image:linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px);background-size:20px 20px;border:2px solid ${C.water}}
.in{padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${C.water}}
h2{font-size:32px;font-weight:800;line-height:1.15;margin:6px 0 18px}
.foot{margin-top:16px;font-size:15px;line-height:1.45;color:${C.mute}}
.fl{display:flex;flex-direction:column;align-items:center}
.tap .head{background:${C.copper};color:#fff;font-family:SgMono,monospace;font-size:15px;padding:8px 16px;border-radius:8px}
.tap .spout{width:16px;height:30px;background:${C.copper};margin:0 auto}
.pipes{position:relative;width:480px;height:40px;border-top:14px solid ${C.copper};border-radius:6px 6px 0 0}
.pipes span{position:absolute;top:0;width:14px;height:40px;background:${C.copper}}
.pipes span:nth-child(1){left:60px}.pipes span:nth-child(2){left:233px}.pipes span:nth-child(3){right:60px}
.bks{display:grid;grid-template-columns:repeat(3,160px);gap:20px;justify-content:center}
.bk{display:flex;flex-direction:column;align-items:center;gap:3px}
.pail{position:relative;width:110px;height:120px;border:5px solid ${C.ink};border-top:0;border-radius:0 0 24px 24px;background:#fff;overflow:hidden;clip-path:polygon(0 0,100% 0,90% 100%,10% 100%)}
.water{position:absolute;left:0;right:0;bottom:0}
.bk b{font-size:18px;margin-top:6px}
.bk span{font-family:SgMono,monospace;font-size:15px}
.bk em{font-style:normal;font-size:13px;color:${C.mute}}
.mo{width:100%;height:auto;background:#fff;border-radius:10px}
.ax{font-family:SgMono,monospace;font-size:13px;fill:${C.mute}}
.lb{font-size:16px;font-weight:800}
.dr{display:grid;gap:10px}
.dri{display:grid;grid-template-columns:30px 1fr auto;gap:12px;align-items:center;background:#fff;border-radius:10px;padding:12px 16px}
.drop{width:18px;height:24px;background:${C.leak};border-radius:50% 50% 50% 50%/60% 60% 40% 40%;transform:rotate(180deg)}
.dri b{display:block;font-size:17px}
.dri small{font-family:SgMono,monospace;font-size:13px;color:${C.mute}}
.dri em{font-style:normal;font-family:SgMono,monospace;font-size:17px;color:${C.leak};font-weight:500}
.drt{display:flex;justify-content:space-between;align-items:baseline;background:${C.water};color:#fff;border-radius:10px;padding:12px 16px}
.drt b{font-family:SgMono,monospace;font-size:24px}
.pk{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pki{background:#fff;border-radius:10px;padding:16px;border-top:6px solid}
.pki h4{font-size:18px}
.pki p{font-size:15px;line-height:1.45;margin-top:6px}
.steps{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:14px;font-family:SgMono,monospace;font-size:13px}
.steps span:nth-child(odd){background:#fff;border:1px solid ${C.water};border-radius:6px;padding:6px 10px}
.rv{background:#fff;border-radius:10px;padding:12px 18px}
.rv p{display:flex;gap:14px;font-size:17px;padding:10px 0;border-bottom:1px dashed #c7d6e4}
.rv p span{font-family:SgMono,monospace;color:${C.water}}
`;
