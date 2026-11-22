/**
 * Infografis "Umur 25 dan Merasa Tertinggal". Identitas visual: peta pendakian. Latar kertas
 * pasir dengan garis kontur topografi, jalur bertitik berwarna terakota dan hijau sage, penanda
 * pos seperti di peta gunung, judul serif (SgSerif) dan label huruf mesin (SgMono).
 * Metafora: setiap orang mendaki gunung yang berbeda; kamu tidak bisa tertinggal di jalur yang
 * tidak dilalui orang lain.
 */

const C = {
  sand: "#f3ead8",
  contour: "rgba(120,96,64,.16)",
  ink: "#2f2a24",
  terra: "#b9643c",
  sage: "#5c7a5a",
  sky: "#6f8fa6",
  mute: "#7a6e60",
  paper: "#fffaf0",
};

const contours = `
<svg class="topo" viewBox="0 0 720 600" preserveAspectRatio="none" aria-hidden="true">
  ${[0, 1, 2, 3, 4, 5, 6]
    .map(
      (i) =>
        `<ellipse cx="${560 - i * 6}" cy="${120 + i * 4}" rx="${60 + i * 46}" ry="${36 + i * 30}" fill="none" stroke="${C.contour}" stroke-width="2"/>`,
    )
    .join("")}
</svg>`;

const card = (title, body, foot = "") => `
<div class="card">${contours}<div class="in">
  <div class="tag">▲ Peta · Umur 25 dan Merasa Tertinggal</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Panggung dan belakang panggung. */
function stage() {
  const front = [
    "Foto lamaran",
    "Kunci rumah baru",
    "Kartu nama jabatan baru",
    "Liburan ke Jepang",
  ];
  const back = [
    "Cicilan 20 tahun",
    "Bertengkar soal biaya pernikahan",
    "Lembur sampai pukul sepuluh",
    "Kerja dua tahun tanpa cuti untuk menabung",
    "Ragu apakah pilihan ini benar",
    "Hari-hari biasa yang tidak difoto",
  ];
  return card(
    "Yang kamu lihat dan yang tidak",
    `<div class="st">
      <div class="front"><h4>Di layar</h4>${front.map((x) => `<span>${x}</span>`).join("")}</div>
      <div class="back"><h4>Di luar layar</h4>${back.map((x) => `<span>${x}</span>`).join("")}</div>
    </div>`,
    "Kamu membandingkan seluruh hidupmu, termasuk bagian yang tidak difoto, dengan potongan terbaik hidup orang lain.",
  );
}

/** 2. Gunung yang berbeda-beda. */
function mountains() {
  const m = [
    ["Rani", "Menikah 24", 90, C.terra],
    ["Dimas", "Rumah pertama 27", 130, C.sky],
    ["Tara", "Pindah ke desain 27", 70, C.sage],
    ["Pak Hendro", "Usaha sendiri 45", 160, C.mute],
  ];
  return card(
    "Tidak ada satu jalur untuk semua orang",
    `<svg viewBox="0 0 652 250" class="mt" aria-hidden="true">
      ${m
        .map(([n, t, h, c], i) => {
          const x = 90 + i * 160;
          return `<polygon points="${x - 70},220 ${x},${220 - h} ${x + 70},220" fill="${c}" opacity=".85"/>
            <path d="M${x - 50},220 Q${x - 10},${220 - h / 2} ${x},${220 - h + 6}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 5"/>
            <text x="${x}" y="${208 - h}" text-anchor="middle" class="mn">${n}</text>
            <text x="${x}" y="242" text-anchor="middle" class="mtx">${t}</text>`;
        })
        .join("")}
    </svg>`,
    "Rata-rata usia pendiri perusahaan rintisan yang tumbuh paling cepat di Amerika Serikat adalah 45 tahun (Azoulay dkk., 2020).",
  );
}

/** 3. Tiga penggaris. */
function rulers() {
  const r = [
    [
      "Penggaris orang lain",
      "“Dia sudah punya rumah, aku belum.”",
      "Selalu ada yang lebih dulu. Hasilnya: selalu merasa kalah.",
      C.terra,
      "ganti",
    ],
    [
      "Penggaris dirimu setahun lalu",
      "“Setahun lalu aku belum bisa menyetir; sekarang bisa.”",
      "Melihat kemajuan yang nyata dan bisa dikendalikan.",
      C.sky,
      "pakai",
    ],
    [
      "Penggaris nilai",
      "“Apakah hari ini aku hidup sesuai yang kuanggap penting?”",
      "Bisa dipenuhi hari ini juga, berapa pun umurmu.",
      C.sage,
      "pakai",
    ],
  ];
  return card(
    "Tiga penggaris",
    `<div class="rl">${r
      .map(
        ([a, q, b, c, s]) =>
          `<div class="rli" style="--c:${c}"><div class="ticks"></div><div><h4>${a} <em class="${s}">${s === "ganti" ? "ganti" : "pakai"}</em></h4><q>${q}</q><p>${b}</p></div></div>`,
      )
      .join("")}</div>`,
  );
}

/** 4. Nilai dan tujuan. */
function compass() {
  return card(
    "Nilai adalah arah, tujuan adalah tempat",
    `<div class="cp">
      <div class="dw"><div class="dial"><span class="n">N</span><div class="needle"></div></div><b>NILAI</b><small>arah yang dipilih</small></div>
      <div class="ex">
        <p><b>Nilai Tara:</b> berkarya</p>
        <p><b>Tujuan di sepanjang jalan:</b> lulus kursus desain, membuat poster acara kampus, pindah ke bidang desain</p>
        <p class="note">Tujuan bisa tercapai atau gagal. Arah tetap bisa diikuti hari ini juga, dengan langkah sekecil apa pun.</p>
      </div>
    </div>`,
    "Gagasan ini diambil dari terapi penerimaan dan komitmen (Acceptance and Commitment Therapy).",
  );
}

/** 5. Jawaban saat Lebaran. */
function answers() {
  const q = [
    [
      "“Kapan nikah?”",
      "“Doakan saja, Tante. Sekarang aku lagi fokus belajar desain. Tante sendiri gimana kabarnya?”",
    ],
    [
      "“Kerja di mana sekarang? Gajinya berapa?”",
      "“Masih di kampus, Om, sambil ikut kursus desain. Seru, banyak hal baru.”",
    ],
    ["“Si Rani sudah punya anak, lho.”", "“Iya, aku ikut senang buat Rani.”"],
  ];
  return card(
    "Jawaban yang sudah disiapkan",
    `<div class="aw">${q.map(([a, b]) => `<div class="awi"><p class="qq">${a}</p><p class="aa">${b}</p></div>`).join("")}</div>`,
    "Jawab singkat, hangat, lalu kembalikan pertanyaan. Kamu tidak berutang penjelasan panjang.",
  );
}

export const TERTINGGAL_FIGURES = {
  "panggung-belakang": {
    html: stage,
    alt: "Perbandingan yang terlihat di layar (lamaran, rumah baru, jabatan, liburan) dengan yang tidak terlihat (cicilan, lembur, keraguan, hari-hari biasa).",
  },
  "gunung-berbeda": {
    html: mountains,
    alt: "Empat gunung dengan puncak berbeda: menikah di 24, rumah pertama di 27, pindah ke bidang desain di 27, usaha sendiri di 45.",
  },
  "tiga-penggaris": {
    html: rulers,
    alt: "Tiga penggaris: orang lain (ganti), dirimu setahun lalu (pakai), dan nilai (pakai).",
  },
  "kompas-nilai": {
    html: compass,
    alt: "Kompas nilai: nilai adalah arah, tujuan adalah tempat di sepanjang jalan. Contoh nilai berkarya dengan tiga tujuan.",
  },
  "jawaban-lebaran": {
    html: answers,
    alt: "Tiga pertanyaan keluarga saat Lebaran dan contoh jawaban yang singkat dan hangat.",
  },
};

export const TERTINGGAL_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;overflow:hidden;width:720px;border-radius:14px;color:${C.ink};background:${C.sand};border:2px solid #d8c8a8}
.topo{position:absolute;inset:0;width:100%;height:100%}
.in{position:relative;padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${C.terra}}
h2{font-family:SgSerif,serif;font-weight:400;font-size:36px;line-height:1.1;margin:8px 0 18px}
.foot{margin-top:16px;font-size:15px;line-height:1.45;color:${C.mute}}
.st{display:grid;grid-template-columns:1fr 1.4fr;gap:12px}
.st h4{font-family:SgMono,monospace;font-size:13px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
.front,.back{border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:6px}
.front{background:#fff;border:2px solid ${C.terra}}
.front span{background:${C.terra};color:#fff;border-radius:8px;padding:8px 10px;font-weight:700;font-size:15px}
.back{background:rgba(255,255,255,.5);border:2px dashed ${C.mute}}
.back span{border-bottom:1px dotted ${C.mute};padding:6px 2px;font-size:15px;color:${C.ink}}
.mt{width:100%;height:auto}
.mn{font-family:SgSerif,serif;font-size:20px;fill:${C.ink}}
.mtx{font-family:SgMono,monospace;font-size:13px;fill:${C.ink}}
.rl{display:grid;gap:12px}
.rli{display:grid;grid-template-columns:26px 1fr;gap:14px;background:${C.paper};border-radius:12px;padding:14px 16px;border:2px solid var(--c)}
.ticks{background:repeating-linear-gradient(var(--c) 0 2px,transparent 2px 10px);border-left:4px solid var(--c);opacity:.8}
.rli h4{font-size:18px;display:flex;gap:8px;align-items:center}
.rli h4 em{font-style:normal;font-family:SgMono,monospace;font-size:11px;text-transform:uppercase;padding:2px 8px;border-radius:99px;color:#fff}
.rli h4 em.ganti{background:${C.terra}}
.rli h4 em.pakai{background:${C.sage}}
.rli q{display:block;font-family:SgSerif,serif;font-size:19px;margin-top:4px;quotes:none}
.rli p{font-size:14px;color:${C.mute};margin-top:4px}
.cp{display:grid;grid-template-columns:200px 1fr;gap:20px;align-items:center}
.dial{position:relative;width:180px;height:180px;border-radius:50%;background:${C.paper};border:6px solid ${C.ink};display:flex;flex-direction:column;align-items:center;justify-content:center}
.dial .n{position:absolute;top:8px;font-family:SgMono,monospace;font-weight:700;color:${C.terra}}
.needle{position:absolute;width:12px;height:140px;background:linear-gradient(${C.terra} 50%,${C.ink} 50%);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);transform:rotate(28deg)}
.dw{display:flex;flex-direction:column;align-items:center;gap:2px}
.dw b{margin-top:8px;font-family:SgMono,monospace;font-size:14px}
.dw small{font-size:12px;color:${C.mute}}
.ex{display:grid;gap:10px}
.ex p{background:${C.paper};border-radius:10px;padding:10px 14px;font-size:16px;line-height:1.45}
.ex p.note{background:transparent;padding:0;color:${C.mute};font-size:15px}
.aw{display:grid;gap:10px}
.awi{background:${C.paper};border-radius:12px;padding:12px 16px;border-left:6px solid ${C.sage}}
.qq{font-family:SgSerif,serif;font-size:21px;color:${C.terra}}
.aa{font-size:16px;line-height:1.45;margin-top:4px}
`;
