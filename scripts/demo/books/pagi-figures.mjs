/**
 * Infografis "Pagi yang Menang". Identitas visual: halaman jurnal saat matahari terbit. Latar
 * gradasi krem ke jingga muda, judul tulisan tangan (SgHand), jam kecil huruf mesin (SgMono),
 * kartu seperti kertas tempel yang sedikit miring. Warna: jingga fajar, biru langit, kuning.
 */

const C = {
  ink: "#2e2a28",
  mute: "#7b6e66",
  sun: "#e07a1f",
  sky: "#3d6fb6",
  yellow: "#f6c945",
  rose: "#d9534f",
  paper: "#fffaf2",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="sunrise"></div><div class="in">
  <div class="tag">jurnal pagi · sari</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Pagi dikejar vs pagi dipimpin. */
function twoMornings() {
  const col = (title, cls, items) => `
  <div class="col ${cls}"><h3>${title}</h3>${items
    .map(([t, a]) => `<div class="it"><span class="tm">${t}</span><span>${a}</span></div>`)
    .join("")}</div>`;
  return card(
    "Dua pagi, jam yang sama",
    `<div class="cols">${col("Dikejar", "lose", [
      ["05.00", "Alarm ditunda 4×"],
      ["05.47", "Buka 32 pesan grup kantor"],
      ["06.05", "Mandi sambil cemas"],
      ["06.12", "Kartu KRL ketinggalan"],
      ["06.16", "Lari ke stasiun, tanpa sarapan"],
    ])}${col("Dipimpin", "win", [
      ["05.30", "Bangun, alarm di dekat pintu"],
      ["05.32", "Jendela dibuka, segelas air"],
      ["05.40", "Peregangan 5 menit"],
      ["05.55", "Sarapan yang disiapkan semalam"],
      ["06.10", "Ambil tas di dekat pintu, berangkat"],
    ])}</div>`,
    "Yang berbeda bukan jam bangunnya, tapi siapa yang memimpin.",
  );
}

/** 2. Landasan pacu 15 menit. */
function runway() {
  const s = [
    ["0'", "Berdiri", "alarm di meja dekat pintu", C.sky],
    ["1'", "Cahaya", "buka tirai atau jendela", C.yellow],
    ["2'", "Cairan", "segelas air yang disiapkan semalam", C.sky],
    ["3–14'", "Tanpa layar", "mandi, salat, berpakaian", C.sun],
    ["15'", "Baru ponsel", "cek yang mendesak saja", C.mute],
  ];
  return card(
    "Landasan pacu 15 menit pertama",
    `<div class="rw">${s
      .map(
        ([t, a, b, c]) =>
          `<div class="rs"><span class="rt" style="background:${c};color:${c === C.yellow ? C.ink : "#fff"}">${t}</span><div><b>${a}</b><small>${b}</small></div></div>`,
      )
      .join("")}</div>`,
    "Diputuskan semalam, dijalankan tanpa berpikir saat otak belum menyala penuh.",
  );
}

/** 3. Tiga jangkar. */
function anchors() {
  const a = [
    ["Gerak", "tubuh", "Setelah minum air, aku meregangkan badan 5 menit.", C.sky, -2],
    ["Isi", "perut", "Setelah mandi, aku makan roti dan telur yang disiapkan semalam.", C.sun, 1.5],
    ["Arah", "kepala", "Setelah duduk di kereta, aku menulis satu prioritas hari ini.", C.rose, -1],
  ];
  return card(
    "Tiga jangkar, bukan sepuluh kebiasaan",
    `<div class="an">${a
      .map(
        ([t, s, k, c, r]) =>
          `<div class="note" style="transform:rotate(${r}deg);border-top-color:${c}"><h4 style="color:${c}">${t}</h4><small>untuk ${s}</small><p>${k}</p></div>`,
      )
      .join("")}</div>`,
    'Pola kalimatnya: "Setelah (kebiasaan lama), aku akan (kebiasaan baru)."',
  );
}

/** 4. Kurva pembentukan kebiasaan (ilustrasi pola, bukan data asli). */
function curve() {
  const pts = [];
  for (let d = 0; d <= 120; d += 4) {
    const y = 1 - Math.exp(-d / 28);
    pts.push(`${40 + d * 5},${250 - y * 200}`);
  }
  const miss = [
    [34, 1 - Math.exp(-34 / 28)],
    [58, 1 - Math.exp(-58 / 28)],
  ];
  return card(
    "Bolong sekali tidak mengulang dari nol",
    `<svg viewBox="0 0 660 290" width="652" height="286">
      <line x1="40" y1="250" x2="640" y2="250" stroke="${C.mute}" stroke-width="2"/>
      <line x1="40" y1="30" x2="40" y2="250" stroke="${C.mute}" stroke-width="2"/>
      <text x="44" y="24" class="ax">terasa otomatis</text>
      <text x="560" y="276" class="ax">hari</text>
      <line x1="370" y1="40" x2="370" y2="250" stroke="${C.sky}" stroke-dasharray="6 6" stroke-width="2"/>
      <text x="380" y="118" class="lb" fill="${C.sky}">± 66 hari</text>
      <polyline points="${pts.join(" ")}" fill="none" stroke="${C.sun}" stroke-width="6" stroke-linecap="round"/>
      ${miss
        .map(
          ([d, y]) =>
            `<circle cx="${40 + d * 5}" cy="${250 - y * 200}" r="10" fill="${C.paper}" stroke="${C.rose}" stroke-width="4"/>`,
        )
        .join("")}
      <text x="${40 + 34 * 5 + 16}" y="${250 - (1 - Math.exp(-34 / 28)) * 200 + 34}" class="lb" fill="${C.rose}">hari bolong</text>
    </svg>`,
    "Ilustrasi pola dari Lally dkk. (2010): kemajuan cepat di awal lalu melandai. Satu hari terlewat hampir tidak mengubah kurvanya.",
  );
}

export const PAGI_FIGURES = {
  "dua-pagi": {
    html: twoMornings,
    alt: "Dua linimasa pagi Sari dengan jam berangkat yang sama: pagi yang dikejar (alarm ditunda, pesan kantor, kartu ketinggalan) dan pagi yang dipimpin (jendela, air, peregangan, sarapan, tas siap).",
  },
  "landasan-pacu": {
    html: runway,
    alt: "Landasan pacu lima belas menit pertama: berdiri, cahaya, segelas air, bersiap tanpa layar, baru membuka ponsel di menit ke-15.",
  },
  "tiga-jangkar": {
    html: anchors,
    alt: "Tiga kertas tempel: gerak untuk tubuh, isi untuk perut, dan arah untuk kepala, masing-masing dengan kalimat setelah-aku-akan.",
  },
  "kurva-kebiasaan": {
    html: curve,
    alt: "Kurva ilustrasi pembentukan kebiasaan yang naik cepat lalu melandai sekitar hari ke-66, dengan dua titik hari bolong yang tidak menurunkan kurva.",
  },
};

export const PAGI_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;border-radius:20px;overflow:hidden;color:${C.ink};
  background:linear-gradient(180deg,#fff4e2 0%,#ffe7cf 55%,#fde0c8 100%)}
.sunrise{position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;
  background:radial-gradient(circle,${C.yellow} 0 38%,rgba(246,201,69,.35) 39% 60%,transparent 61%)}
.in{position:relative;padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.1em;color:${C.mute}}
h2{font-family:SgHand,cursive;font-size:46px;line-height:1.05;margin:6px 0 20px;color:${C.sun}}
.foot{margin-top:18px;font-size:15px;line-height:1.45;color:${C.mute}}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.col{background:${C.paper};border-radius:14px;padding:16px;box-shadow:0 6px 14px -8px rgba(120,70,20,.35)}
.col h3{font-family:SgHand,cursive;font-size:32px;margin-bottom:8px}
.col.lose h3{color:${C.rose}}.col.win h3{color:${C.sky}}
.it{display:grid;grid-template-columns:58px 1fr;gap:8px;padding:7px 0;border-top:1px dashed #e8d6c4;font-size:15px}
.col.lose .it span:last-child{color:${C.mute};text-decoration:line-through;text-decoration-color:rgba(217,83,79,.5)}
.tm{font-family:SgMono,monospace;font-size:13px;color:${C.mute};padding-top:2px}
.rw{display:grid;gap:10px}
.rs{display:flex;align-items:center;gap:14px;background:${C.paper};border-radius:12px;padding:10px 14px}
.rt{flex:none;min-width:70px;text-align:center;font-family:SgMono,monospace;font-size:15px;font-weight:700;color:#fff;border-radius:8px;padding:8px 6px}
.rs b{font-size:18px;display:block}.rs small{font-size:14px;color:${C.mute}}
.an{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:6px 2px}
.note{background:${C.paper};border-top:10px solid;border-radius:6px;padding:14px;box-shadow:0 8px 16px -10px rgba(120,70,20,.45);min-height:190px}
.note h4{font-family:SgHand,cursive;font-size:36px;line-height:1}
.note small{font-family:SgMono,monospace;font-size:12px;color:${C.mute}}
.note p{font-size:15px;line-height:1.45;margin-top:10px}
svg{display:block;background:${C.paper};border-radius:14px}
.ax{font-family:SgMono,monospace;font-size:13px;fill:${C.mute}}
.lb{font-family:SgHand,cursive;font-size:24px}
`;
