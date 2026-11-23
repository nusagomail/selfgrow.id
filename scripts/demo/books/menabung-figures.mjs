/**
 * Infografis "Seni Menabung Tanpa Tersiksa". Identitas visual: denah pipa air. Kertas krem,
 * pipa tebal hijau toska, tangki terakota dengan garis ukur, label huruf tegak sempit (SgLabel),
 * catatan kecil huruf mesin (SgMono). Gagasannya: tabungan mengalir lewat pipa, bukan dipompa.
 */

const C = {
  paper: "#f6efe3",
  ink: "#2b2622",
  mute: "#7a6f64",
  pipe: "#0e7c86",
  pipeDark: "#095a61",
  tank: "#d2691e",
  tankSoft: "#f3d2b5",
  red: "#b23b3b",
  line: "#d9cbb6",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">DENAH PIPA · SENI MENABUNG</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

const tank = (name, target, date, pct, color = C.tank) => `
<div class="tk"><div class="tkb"><div class="lvl" style="height:${pct}%;background:${color}"></div>
<div class="ticks"><i></i><i></i><i></i></div><span class="pct">${pct}%</span></div>
<b>${name}</b><small>${target}</small><small>${date}</small></div>`;

/** 1. Menabung dari sisa vs di depan. */
function twoPipes() {
  const row = (label, steps, good) => `
  <div class="pr ${good ? "good" : "bad"}"><div class="prl">${label}</div><div class="flow">${steps
    .map(
      ([t, s], i) =>
        `${i ? `<div class="seg"></div>` : ""}<div class="st"><b>${t}</b><small>${s}</small></div>`,
    )
    .join("")}</div></div>`;
  return card(
    "Pompa tangan atau pipa?",
    `${row(
      "DARI SISA",
      [
        ["Gaji masuk", "tanggal 25"],
        ["Belanja & jajan", "puluhan keputusan"],
        ["Sisa?", "sering Rp0"],
      ],
      false,
    )}${row(
      "DI DEPAN",
      [
        ["Gaji masuk", "tanggal 25"],
        ["Tabungan pindah", "otomatis, tanggal 26"],
        ["Belanja dari sisa", "aman sejak awal"],
      ],
      true,
    )}`,
    "Cara pertama harus dimenangkan setiap hari. Cara kedua diputuskan sekali.",
  );
}

/** 2. Satu hari gajian. */
function payday() {
  const ev = [
    ["25 · 08.00", "Gaji masuk", "Rp5.200.000", C.ink],
    ["26 · 07.00", "Pipa 1 → Dana darurat", "− Rp300.000", C.pipe],
    ["26 · 07.00", "Pipa 2 → Laptop kerja", "− Rp200.000", C.pipe],
    ["26 · 07.05", "Autodebet kos & listrik", "− Rp1.650.000", C.mute],
    ["26 · 07.10", "Sisa untuk hidup sebulan", "Rp3.050.000", C.tank],
  ];
  return card(
    "Sehari setelah gajian",
    `<div class="tl">${ev
      .map(
        ([t, a, b, c]) =>
          `<div class="ev"><span class="tm">${t}</span><span class="dot" style="background:${c}"></span><span class="ea">${a}</span><span class="eb" style="color:${c}">${b}</span></div>`,
      )
      .join("")}</div>`,
    "Transfer dijadwalkan sehari setelah gajian, sebelum kamu sempat membuka aplikasi belanja. Angka ilustrasi.",
  );
}

/** 3. Tangki bernama. */
function tanks() {
  return card(
    "Satu tangki, satu tujuan",
    `<div class="tks">${tank("Dana darurat", "Rp10.500.000", "bertahap", 62)}${tank("Laptop kerja", "Rp7.000.000", "Juni 2027", 35, C.pipe)}${tank("Mudik Lebaran", "Rp3.000.000", "Maret 2027", 80, "#c99a2e")}</div>`,
    "Nama, angka, tanggal. Uang yang diberi nama lebih sulit dipakai sembarangan (Soman & Cheema, 2011).",
  );
}

/** 4. Peta sistem lengkap. */
function map() {
  const part = (n, t, d) =>
    `<div class="pt"><span class="n">${n}</span><div><b>${t}</b><p>${d}</p></div></div>`;
  return card(
    "Lima bagian pipa",
    `<div class="mp">
      <div class="src">GAJI & PENGHASILAN</div>
      <div class="parts">
        ${part("1", "Pipa utama", "Transfer otomatis sehari setelah gajian")}
        ${part("2", "Tangki bernama", "Satu tujuan, satu angka, satu tanggal")}
        ${part("3", "Pembesar pipa", "Separuh kenaikan gaji masuk tabungan")}
        ${part("4", "Penampung hujan", "Pembagian THR & bonus ditulis sebelum datang")}
        ${part("5", "Aturan keran", "Tujuan & darurat boleh; godaan tunggu 48 jam")}
      </div>
    </div>`,
    "Pasang sekali, rawat sesekali. Sisanya mengalir sendiri.",
  );
}

export const MENABUNG_FIGURES = {
  "dua-pipa": {
    html: twoPipes,
    alt: "Dua alur: menabung dari sisa (gaji masuk, belanja, sisa sering nol) dan menabung di depan (gaji masuk, tabungan pindah otomatis, belanja dari sisa).",
  },
  "jam-gajian": {
    html: payday,
    alt: "Linimasa sekitar gajian: gaji masuk tanggal 25, keesokan paginya dua transfer otomatis ke dana darurat dan tabungan laptop, autodebet kos, dan sisa untuk hidup sebulan.",
  },
  "tangki-tujuan": {
    html: tanks,
    alt: "Tiga tangki tabungan bernama: dana darurat, laptop kerja, dan mudik Lebaran, masing-masing dengan target, tanggal, dan tingkat isi.",
  },
  "peta-pipa": {
    html: map,
    alt: "Lima bagian sistem menabung: pipa utama, tangki bernama, pembesar pipa, penampung hujan, dan aturan keran.",
  },
};

export const MENABUNG_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:14px;color:${C.ink};background:${C.paper};
  background-image:radial-gradient(${C.line} 1.2px,transparent 1.2px);background-size:22px 22px;
  box-shadow:inset 0 0 0 2px ${C.line}}
.in{padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.14em;color:${C.mute}}
h2{font-family:SgLabel,sans-serif;font-weight:600;text-transform:uppercase;font-size:36px;letter-spacing:.02em;line-height:1.1;margin:8px 0 22px;color:${C.pipeDark}}
.foot{margin-top:20px;font-size:15px;line-height:1.45;color:${C.mute}}
.pr{display:grid;grid-template-columns:110px 1fr;align-items:center;gap:12px;margin-bottom:18px}
.prl{font-family:SgLabel,sans-serif;font-size:18px;letter-spacing:.06em}
.pr.bad .prl{color:${C.red}}.pr.good .prl{color:${C.pipe}}
.flow{display:flex;align-items:center}
.st{background:#fff;border:3px solid;border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;min-width:150px}
.pr.bad .st{border-color:#d8b0a8}.pr.good .st{border-color:${C.pipe}}
.st b{font-size:16px}.st small{font-family:SgMono,monospace;font-size:12px;color:${C.mute}}
.seg{flex:1;height:14px;border-radius:7px;min-width:18px}
.pr.bad .seg{background:repeating-linear-gradient(90deg,#d8b0a8 0 10px,transparent 10px 16px)}
.pr.good .seg{background:${C.pipe};box-shadow:inset 0 -4px 0 ${C.pipeDark}}
.tl{display:grid;gap:10px;position:relative;padding-left:4px}
.ev{display:grid;grid-template-columns:104px 18px 1fr auto;align-items:center;gap:10px;background:#fff;border-radius:10px;padding:12px 16px;border:2px solid ${C.line}}
.tm{font-family:SgMono,monospace;font-size:14px;color:${C.mute}}
.dot{width:14px;height:14px;border-radius:50%}
.ea{font-size:17px;font-weight:700}
.eb{font-family:SgMono,monospace;font-size:16px;font-weight:700}
.tks{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.tk{display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center}
.tkb{position:relative;width:120px;height:170px;border:5px solid ${C.ink};border-radius:16px 16px 22px 22px;background:#fff;overflow:hidden;margin-bottom:10px}
.lvl{position:absolute;left:0;right:0;bottom:0;opacity:.9}
.ticks{position:absolute;right:6px;top:18px;bottom:18px;display:flex;flex-direction:column;justify-content:space-between}
.ticks i{display:block;width:14px;height:3px;background:${C.ink};opacity:.5}
.pct{position:absolute;left:0;right:0;top:44%;font-family:SgLabel,sans-serif;font-size:28px;color:${C.ink}}
.tk b{font-size:18px}.tk small{font-family:SgMono,monospace;font-size:13px;color:${C.mute}}
.mp{display:grid;gap:14px}
.src{background:${C.pipe};color:#fff;font-family:SgLabel,sans-serif;font-size:20px;letter-spacing:.08em;text-align:center;border-radius:10px;padding:12px}
.parts{display:grid;gap:10px;border-left:12px solid ${C.pipe};margin-left:30px;padding-left:18px}
.pt{display:flex;gap:14px;align-items:center;background:#fff;border:2px solid ${C.line};border-radius:10px;padding:12px 14px}
.n{flex:none;width:40px;height:40px;border-radius:50%;background:${C.tank};color:#fff;font-family:SgLabel,sans-serif;font-size:22px;display:grid;place-items:center}
.pt b{font-size:18px}.pt p{font-size:15px;color:${C.mute};margin-top:2px}
`;
