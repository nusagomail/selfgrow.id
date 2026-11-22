/**
 * Infografis "Bicara di Depan Umum Tanpa Gemetar". Identitas visual: panggung teater. Latar tirai
 * merah marun, lantai papan kayu, cahaya lampu sorot kuning hangat, dan kartu catatan pembicara
 * (cue card) berwarna gading dengan tulisan tangan (SgHand) dan judul serif (SgSerif).
 * Metafora: lampu sorot yang kamu rasakan jauh lebih terang dan lebar daripada yang dilihat penonton.
 */

const C = {
  curtain: "#5a1420",
  curtainDk: "#3d0c15",
  floor: "#3b2a20",
  light: "#ffd27a",
  lightSoft: "rgba(255,210,122,.18)",
  paper: "#fbf5e6",
  ink: "#2a1a14",
  red: "#b3261e",
  green: "#2f7d4f",
  mute: "#8a7a6a",
  text: "#f8ecd8",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">✦ Panggung · Bicara Tanpa Gemetar</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Lampu sorot: yang kamu kira vs yang sebenarnya. */
function spotlight() {
  const cone = (x, w, label, sub, strong) => `
    <g>
      <polygon points="${x},20 ${x - w},250 ${x + w},250" fill="${strong ? "rgba(255,210,122,.55)" : "rgba(255,210,122,.22)"}"/>
      <ellipse cx="${x}" cy="250" rx="${w}" ry="16" fill="${strong ? "rgba(255,210,122,.7)" : "rgba(255,210,122,.32)"}"/>
      <circle cx="${x}" cy="18" r="9" fill="${C.light}"/>
      <rect x="${x - 9}" y="196" width="18" height="40" rx="8" fill="${C.ink}"/><circle cx="${x}" cy="186" r="11" fill="${C.ink}"/>
      <text x="${x}" y="290" class="sl" text-anchor="middle">${label}</text>
      <text x="${x}" y="312" class="ss" text-anchor="middle">${sub}</text>
    </g>`;
  return card(
    "Lampu sorotnya tidak seterang yang kamu kira",
    `<svg viewBox="0 0 652 330" class="stage" aria-hidden="true">
      <rect x="0" y="250" width="652" height="80" fill="${C.floor}"/>
      ${cone(170, 150, "Yang kamu rasakan", "semua orang melihat gugupku", true)}
      ${cone(482, 60, "Yang sebenarnya", "penonton memikirkan hal lain", false)}
    </svg>`,
    "Orang cenderung memperkirakan dirinya diperhatikan sekitar dua kali lebih banyak dari kenyataannya (efek lampu sorot; Gilovich, Medvec & Savitsky, 2000).",
  );
}

/** 2. Tubuh yang sama, dua label. */
function relabel() {
  const signs = ["Jantung berdebar", "Napas lebih cepat", "Tangan dingin", "Perut tidak enak"];
  return card(
    "Badan yang sama, dua cara membacanya",
    `<div class="rl">
      <div class="sig">${signs.map((s) => `<span>${s}</span>`).join("")}</div>
      <div class="fork">
        <div class="path bad"><b>“Aku cemas.”</b><p>Otak membaca bahaya → ingin kabur, fokus ke diri sendiri</p></div>
        <div class="path good"><b>“Aku bersemangat.”</b><p>Otak membaca peluang → energinya dipakai untuk tampil</p></div>
      </div>
    </div>`,
    "Cemas dan bersemangat sama-sama keadaan tubuh yang “menyala”. Mengganti labelnya lebih mudah daripada memaksa diri tenang (Brooks, 2014).",
  );
}

/** 3. Kartu kerangka Raka. */
function cueCard() {
  return card(
    "Satu kartu yang menyelamatkan saat lupa",
    `<div class="cue">
      <div class="row"><span>PEMBUKA</span><p>Kuartal ini biaya operasional naik 18%. Saya akan tunjukkan dari mana, dan apa yang bisa kita lakukan.</p></div>
      <div class="row main"><span>PESAN</span><p>Dua pos biaya bisa dihemat Rp1,2 M tanpa memotong orang.</p></div>
      <div class="row"><span>1</span><p>Dari mana kenaikannya</p></div>
      <div class="row"><span>2</span><p>Dua pos yang bisa dihemat</p></div>
      <div class="row"><span>3</span><p>Rencana 3 bulan</p></div>
      <div class="row"><span>PENUTUP</span><p>Mohon persetujuan untuk mulai bulan depan.</p></div>
    </div>`,
    "Kalau pikiran kosong, lihat kartu, cari nomor berikutnya, dan lanjutkan dari sana.",
  );
}

/** 4. Tangga latihan. */
function ladder() {
  const s = [
    ["Baca dalam hati", "terasa siap, padahal belum"],
    ["Ucapkan lantang, sendirian", "kalimat yang macet mulai terlihat"],
    ["Berdiri, pakai pengatur waktu", "tahu durasi yang sebenarnya"],
    ["Rekam di ponsel, tonton sekali", "lihat yang orang lain lihat"],
    ["Di depan satu teman", "rasakan sedikit tekanan"],
    ["Simulasi di ruangan aslinya", "hari H terasa sudah pernah terjadi"],
  ];
  return card(
    "Enam anak tangga latihan",
    `<div class="ld">${s
      .map(
        ([a, b], i) =>
          `<div class="step" style="margin-left:${i * 34}px"><span>${i + 1}</span><div><b>${a}</b><small>${b}</small></div></div>`,
      )
      .join("")}</div>`,
    "Membaca slide dalam hati bukan latihan. Latihan adalah mengucapkannya dengan suara.",
  );
}

/** 5. Saat ada yang salah. */
function rescue() {
  const r = [
    [
      "Pikiran tiba-tiba kosong",
      "“Sebentar, saya cek catatan.” Lihat kartu, ulangi poin terakhir, lanjut.",
    ],
    [
      "Pertanyaan yang tidak bisa dijawab",
      "“Saya belum punya angka pastinya. Saya kirim setelah rapat hari ini.”",
    ],
    [
      "Slide atau proyektor mati",
      "Ambil kartu. Ceritakan tiga poinmu tanpa layar; pesannya tetap sama.",
    ],
    [
      "Suara bergetar di awal",
      "Berhenti, tarik napas, embuskan pelan, lalu ucapkan kalimat pertama lebih lambat.",
    ],
  ];
  return card(
    "Kalimat penyelamat, disiapkan sebelum naik panggung",
    `<div class="rs">${r.map(([a, b]) => `<div class="rsi"><h4>${a}</h4><p>${b}</p></div>`).join("")}</div>`,
    "Penonton memaafkan gangguan kecil. Yang mereka ingat adalah bagaimana kamu melanjutkan.",
  );
}

export const PANGGUNG_FIGURES = {
  "lampu-sorot": {
    html: spotlight,
    alt: "Dua lampu sorot di panggung: yang kamu rasakan sangat lebar dan terang, yang sebenarnya kecil dan redup.",
  },
  "gugup-semangat": {
    html: relabel,
    alt: "Empat tanda tubuh yang sama (jantung berdebar, napas cepat, tangan dingin, perut tidak enak) dibaca sebagai cemas atau bersemangat.",
  },
  "kartu-kerangka": {
    html: cueCard,
    alt: "Kartu catatan Raka: pembuka, satu pesan utama, tiga poin bernomor, dan penutup berisi permintaan.",
  },
  "tangga-latihan": {
    html: ladder,
    alt: "Enam anak tangga latihan dari membaca dalam hati sampai simulasi di ruangan aslinya.",
  },
  "kalimat-penyelamat": {
    html: rescue,
    alt: "Empat situasi yang bisa salah saat presentasi dan kalimat penyelamat untuk masing-masing.",
  },
};

export const PANGGUNG_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:16px;color:${C.text};
  background:radial-gradient(ellipse at 50% -10%,rgba(255,210,122,.22),transparent 60%),
  repeating-linear-gradient(90deg,${C.curtain} 0 26px,${C.curtainDk} 26px 30px,${C.curtain} 30px 52px)}
.in{padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${C.light}}
h2{font-family:SgSerif,serif;font-weight:400;font-size:36px;line-height:1.1;margin:8px 0 18px;color:#fff}
.foot{margin-top:16px;font-size:15px;line-height:1.45;color:${C.text};opacity:.85}
.stage{width:100%;height:auto;background:#1c0a0e;border-radius:10px}
.sl{font-size:18px;font-weight:800;fill:${C.light}}
.ss{font-size:14px;fill:${C.text}}
.rl{display:grid;gap:14px}
.sig{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.sig span{background:${C.light};color:${C.ink};font-weight:700;font-size:15px;padding:8px 14px;border-radius:99px}
.fork{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.path{background:${C.paper};color:${C.ink};border-radius:10px;padding:16px;border-top:6px solid}
.path.bad{border-top-color:${C.red}}
.path.good{border-top-color:${C.green}}
.path b{font-family:SgHand,cursive;font-size:30px;line-height:1}
.path p{font-size:15px;line-height:1.45;margin-top:8px}
.cue{background:${C.paper};color:${C.ink};border-radius:8px;padding:14px 20px;transform:rotate(-.6deg);box-shadow:0 8px 0 rgba(0,0,0,.25);
  background-image:repeating-linear-gradient(${C.paper} 0 33px,#e6c9c0 33px 34px)}
.row{display:grid;grid-template-columns:86px 1fr;gap:10px;align-items:baseline;padding:4px 0}
.row span{font-family:SgMono,monospace;font-size:12px;color:${C.red}}
.row p{font-family:SgHand,cursive;font-size:24px;line-height:1.15}
.row.main p{background:rgba(255,210,122,.6);padding:0 6px;border-radius:4px}
.ld{display:grid;gap:8px}
.step{display:flex;gap:12px;align-items:center;background:${C.paper};color:${C.ink};border-radius:10px;padding:10px 14px;max-width:470px;border-bottom:4px solid ${C.floor}}
.step span{font-family:SgSerif,serif;font-size:26px;color:${C.red};width:22px}
.step b{display:block;font-size:16px}
.step small{font-size:13px;color:${C.mute}}
.rs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.rsi{background:${C.paper};color:${C.ink};border-radius:10px;padding:14px 16px;border-left:6px solid ${C.light}}
.rsi h4{font-size:16px}
.rsi p{font-family:SgHand,cursive;font-size:22px;line-height:1.2;margin-top:6px}
`;
