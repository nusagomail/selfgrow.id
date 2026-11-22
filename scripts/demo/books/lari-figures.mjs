/**
 * Infografis "Dari Rebahan ke Lari 5K". Identitas visual: lintasan atletik dan nomor dada.
 * Merah bata lintasan dengan garis putih, kartu bergaya nomor dada (bib) dengan lubang peniti,
 * angka tegak sempit (SgLabel), aksen biru lapangan. Energik tapi tidak mengintimidasi pemula.
 */

const C = {
  track: "#c4492f",
  trackDk: "#9e3622",
  white: "#fffaf5",
  ink: "#1f1d1b",
  blue: "#2f6fa8",
  grass: "#5d9a52",
  walk: "#cfc7bd",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="lanes"></div><div class="in">
  <div class="tag">Lintasan · Dari Rebahan ke Lari 5K</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

const WEEKS = [
  [1, 8, 1, 2],
  [2, 6, 2, 2],
  [3, 5, 3, 2],
  [4, 4, 5, 2],
  [5, 3, 8, 2],
  [6, 2, 12, 2],
  [7, 1, 20, 0],
  [8, 1, 30, 0],
];

/** 1. Delapan minggu sebagai pita lari/jalan. */
function plan() {
  return card(
    "Delapan minggu, sedikit demi sedikit",
    `<div class="pl">${WEEKS.map(([w, n, r, j]) => {
      const seg = [];
      for (let i = 0; i < n; i++) {
        seg.push(`<span class="r" style="flex:${r}"></span>`);
        if (j) seg.push(`<span class="w" style="flex:${j}"></span>`);
      }
      return `<div class="row"><b>M${w}</b><div class="bar">${seg.join("")}</div><em>${j ? `${n}× lari ${r}′ + jalan ${j}′` : `lari ${r}′ tanpa henti`}</em></div>`;
    }).join("")}</div>
    <div class="lg"><span class="r"></span>lari <span class="w"></span>jalan</div>`,
    "Tiga sesi seminggu, satu hari istirahat di antaranya. Pemanasan 5 menit jalan cepat sebelum setiap sesi.",
  );
}

/** 2. Tes bicara: zona intensitas. */
function talk() {
  const z = [
    ["Terlalu ringan", "Bisa bernyanyi", C.walk],
    ["Pas untuk pemula", "Bisa mengobrol dengan kalimat lengkap", C.grass],
    ["Terlalu berat", "Hanya bisa mengucapkan satu-dua kata", C.track],
  ];
  return card(
    "Tes bicara",
    `<div class="tk">${z.map(([a, b, c], i) => `<div class="tki${i === 1 ? " on" : ""}" style="border-color:${c}"><span class="dot" style="background:${c}"></span><h4>${a}</h4><p>${b}</p></div>`).join("")}</div>`,
    "Pemula paling sering gagal bukan karena kurang kuat, tapi karena berlari terlalu cepat.",
  );
}

/** 3. Satu sesi latihan dari awal sampai akhir. */
function session() {
  const s = [
    ["5′", "Pemanasan", "Jalan cepat, ayunkan lengan", C.blue],
    ["15–30′", "Sesi inti", "Sesuai jadwal minggu ini", C.track],
    ["5′", "Pendinginan", "Jalan santai sampai napas normal", C.blue],
    ["5′", "Peregangan ringan", "Betis, paha depan, paha belakang", C.grass],
  ];
  return card(
    "Anatomi satu sesi",
    `<div class="ss">${s.map(([m, t, d, c]) => `<div class="bib" style="--c:${c}"><i></i><i></i><span class="m">${m}</span><b>${t}</b><small>${d}</small></div>`).join("")}</div>`,
  );
}

/** 4. Minggu aktif WHO. */
function who() {
  return card(
    "Berapa yang dianjurkan?",
    `<div class="wh">
      <div class="whi"><span class="big">150–300</span><b>menit per minggu</b><p>aktivitas sedang, misalnya jalan cepat atau lari santai</p></div>
      <div class="or">atau</div>
      <div class="whi"><span class="big">75–150</span><b>menit per minggu</b><p>aktivitas berat, misalnya lari yang membuat sulit bicara</p></div>
    </div>`,
    "WHO, Guidelines on physical activity and sedentary behaviour (2020), untuk orang dewasa. Tiga sesi lari seminggu ditambah jalan kaki di hari lain membantu mencapai anjuran ini.",
  );
}

/** 5. Sinyal berhenti. */
function stop() {
  const s = [
    [
      "Berhenti dan cari pertolongan",
      [
        "Nyeri atau rasa tertekan di dada",
        "Sesak napas yang tidak membaik saat berhenti",
        "Pusing berat atau hampir pingsan",
      ],
      C.track,
    ],
    [
      "Istirahat dan amati",
      [
        "Nyeri tajam di satu titik sendi atau tulang",
        "Nyeri yang makin parah saat lari",
        "Pincang",
      ],
      "#e0913a",
    ],
    [
      "Wajar untuk pemula",
      [
        "Pegal di betis dan paha 1–2 hari",
        "Napas berat tapi masih bisa bicara",
        "Ingin berhenti di menit-menit awal",
      ],
      C.grass,
    ],
  ];
  return card(
    "Kapan harus berhenti",
    `<div class="sp">${s.map(([t, l, c]) => `<div class="spc" style="border-top-color:${c}"><h4 style="color:${c}">${t}</h4>${l.map((x) => `<p>${x}</p>`).join("")}</div>`).join("")}</div>`,
  );
}

/** 6. Naik pelan: jarak mingguan dan batas 30% dalam dua minggu. */
function progress() {
  const rows = [
    ["Minggu ini", 6, "6 km", C.white],
    ["Naik ±10%", 6.6, "6,6 km", C.grass],
    ["Naik 30%", 7.8, "7,8 km", "#e0913a"],
    ["Naik 60%", 9.6, "9,6 km", "#ffd7c9"],
  ];
  return card(
    "Naik pelan, cederanya lebih jarang",
    `<div class="np">${rows
      .map(
        ([a, v, t, c]) =>
          `<div class="npr"><span class="npl">${a}</span><span class="npt"><i style="width:${(v / 10) * 100}%;background:${c}"></i></span><b>${t}</b></div>`,
      )
      .join(
        "",
      )}<p class="npn">Batas aman yang sering dipakai: jangan lebih dari <b>30% dalam dua minggu</b>.</p></div>`,
    "Pelari pemula yang menaikkan jarak mingguan lebih dari 30% lebih sering mengalami cedera khas jarak (Nielsen dkk., 2014).",
  );
}

/** 7. Lari di cuaca Indonesia. */
function weather() {
  const r = [
    ["05.00–07.00", "Paling ramah", "Udara lebih sejuk, jalan masih sepi.", C.grass],
    ["16.30–18.00", "Boleh", "Panas mulai turun. Pilih rute teduh.", "#e0913a"],
    ["10.00–15.00", "Hindari", "Panas dan lembap membuat jantung bekerja lebih keras.", "#ffd7c9"],
  ];
  return card(
    "Kapan dan di mana berlari",
    `<div class="wx">${r
      .map(
        ([a, b, c2, col]) =>
          `<div class="wxi" style="border-left-color:${col}"><b>${a}</b><span>${b}</span><p>${c2}</p></div>`,
      )
      .join(
        "",
      )}</div><p class="wxn">Cek kualitas udara sebelum keluar. Kalau sedang buruk, ganti dengan jalan cepat di dalam ruangan atau naik-turun tangga.</p>`,
  );
}

export const LARI_FIGURES = {
  "rencana-8-minggu": {
    html: plan,
    alt: "Delapan pita latihan: minggu 1 delapan kali lari 1 menit jalan 2 menit, terus bertambah sampai minggu 8 lari 30 menit tanpa henti.",
  },
  "tes-bicara": {
    html: talk,
    alt: "Tes bicara tiga zona: terlalu ringan bisa bernyanyi, pas untuk pemula bisa mengobrol kalimat lengkap, terlalu berat hanya satu-dua kata.",
  },
  "anatomi-sesi": {
    html: session,
    alt: "Satu sesi latihan: pemanasan 5 menit, sesi inti 15–30 menit, pendinginan 5 menit, peregangan ringan 5 menit.",
  },
  "anjuran-who": {
    html: who,
    alt: "Anjuran WHO untuk orang dewasa: 150–300 menit aktivitas sedang atau 75–150 menit aktivitas berat per minggu.",
  },
  "naik-pelan": {
    html: progress,
    alt: "Jarak mingguan 6 km dibandingkan kenaikan 10%, 30%, dan 60%; batas yang sering dipakai adalah tidak lebih dari 30% dalam dua minggu.",
  },
  "cuaca-lari": {
    html: weather,
    alt: "Waktu lari di cuaca Indonesia: pukul 5 sampai 7 pagi paling ramah, sore 16.30 sampai 18.00 boleh, pukul 10 sampai 15 dihindari.",
  },
  "sinyal-berhenti": {
    html: stop,
    alt: "Tiga kelompok sinyal: berhenti dan cari pertolongan untuk nyeri dada, istirahat untuk nyeri sendi tajam, wajar untuk pegal 1–2 hari.",
  },
};

export const LARI_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;border-radius:16px;overflow:hidden;color:${C.white};background:${C.track}}
.lanes{position:absolute;inset:0;background:repeating-linear-gradient(180deg, transparent 0 58px, rgba(255,255,255,.5) 58px 61px);opacity:.35}
.in{position:relative;padding:32px 34px 28px}
.tag{font-family:SgLabel,sans-serif;font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:#ffd7c9}
h2{font-family:SgLabel,sans-serif;font-size:44px;line-height:1.02;text-transform:uppercase;margin:6px 0 18px}
.foot{margin-top:16px;font-size:15px;line-height:1.45;color:#ffe9e0}
.pl{display:grid;gap:7px;background:${C.white};color:${C.ink};border-radius:12px;padding:14px}
.row{display:grid;grid-template-columns:40px 1fr 190px;gap:10px;align-items:center}
.row b{font-family:SgLabel,sans-serif;font-size:20px;color:${C.track}}
.bar{display:flex;gap:2px;height:20px}
.bar .r{background:${C.track};border-radius:3px}
.bar .w{background:${C.walk};border-radius:3px}
.row em{font-style:normal;font-size:13px;font-weight:700}
.lg{display:flex;gap:8px;align-items:center;margin-top:10px;font-size:14px;font-weight:700}
.lg span{display:inline-block;width:18px;height:12px;border-radius:3px}
.lg .r{background:${C.white}}
.lg .w{background:${C.walk};margin-left:10px}
.tk{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.tki{background:${C.white};color:${C.ink};border-radius:12px;padding:16px;border-top:8px solid}
.tki.on{transform:translateY(-8px);box-shadow:0 10px 0 rgba(0,0,0,.2)}
.tki .dot{display:inline-block;width:16px;height:16px;border-radius:50%}
.tki h4{font-family:SgLabel,sans-serif;font-size:24px;text-transform:uppercase;margin-top:6px}
.tki p{font-size:15px;line-height:1.4;margin-top:4px}
.ss{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.bib{position:relative;background:${C.white};color:${C.ink};border-radius:8px;padding:22px 12px 14px;text-align:center;border-top:10px solid var(--c)}
.bib i{position:absolute;top:6px;width:8px;height:8px;border-radius:50%;background:#bbb}
.bib i:first-child{left:10px}.bib i:nth-child(2){right:10px}
.bib .m{display:block;font-family:SgLabel,sans-serif;font-size:40px;line-height:1;color:var(--c)}
.bib b{display:block;font-size:16px;margin-top:6px}
.bib small{display:block;font-size:13px;line-height:1.35;margin-top:4px}
.wh{display:grid;grid-template-columns:1fr 60px 1fr;align-items:center}
.whi{background:${C.white};color:${C.ink};border-radius:12px;padding:18px;text-align:center}
.whi .big{display:block;font-family:SgLabel,sans-serif;font-size:56px;line-height:1;color:${C.track}}
.whi b{display:block;font-size:16px;margin-top:4px}
.whi p{font-size:14px;line-height:1.4;margin-top:6px}
.or{text-align:center;font-family:SgLabel,sans-serif;font-size:22px;text-transform:uppercase}
.sp{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.spc{background:${C.white};color:${C.ink};border-radius:12px;padding:14px;border-top:8px solid}
.spc h4{font-family:SgLabel,sans-serif;font-size:20px;text-transform:uppercase;line-height:1.1;margin-bottom:8px}
.spc p{font-size:14px;line-height:1.35;padding:6px 0;border-bottom:1px dashed #ddd}
.np{display:grid;gap:10px}
.npr{display:grid;grid-template-columns:130px 1fr 80px;gap:12px;align-items:center}
.npl{font-family:SgLabel,sans-serif;font-size:16px;letter-spacing:.06em;text-transform:uppercase}
.npt{height:26px;border-radius:6px;background:rgba(0,0,0,.18);overflow:hidden}
.npt i{display:block;height:100%;border-radius:6px}
.npr b{font-family:SgLabel,sans-serif;font-size:20px;text-align:right}
.npn{margin-top:8px;background:${C.white};color:${C.ink};border-radius:10px;padding:12px 14px;font-size:16px}
.wx{display:grid;gap:10px}
.wxi{background:rgba(0,0,0,.18);border-left:6px solid;border-radius:10px;padding:12px 16px;display:grid;grid-template-columns:130px 110px 1fr;gap:12px;align-items:center}
.wxi b{font-family:SgLabel,sans-serif;font-size:20px}
.wxi span{font-weight:800;font-size:15px;color:${C.white};text-transform:uppercase;letter-spacing:.04em}
.wxi p{font-size:15px;line-height:1.4}
.wxn{margin-top:12px;background:${C.white};color:${C.ink};border-radius:10px;padding:12px 14px;font-size:15px;line-height:1.45}
`;
