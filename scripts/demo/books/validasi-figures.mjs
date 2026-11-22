/**
 * Infografis "Validasi Ide Sebelum Modal Habis". Identitas visual: buku catatan eksperimen.
 * Kertas gading berpetak hijau muda, tinta biru tua, stabilo kuning, stempel merah
 * "TERBUKTI / BELUM", label huruf mesin (SgMono), catatan pinggir tulisan tangan (SgHand).
 * Metafora: ide usaha adalah dugaan yang harus diuji dulu, bukan rencana yang langsung dibiayai.
 */

const C = {
  paper: "#fbf9f1",
  grid: "rgba(63,125,100,.12)",
  ink: "#1d2b4a",
  green: "#3f7d64",
  red: "#c0392b",
  hi: "rgba(255,221,87,.65)",
  mute: "#6b7280",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="margin"></div><div class="in">
  <div class="tag">Eksperimen · Validasi Ide</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Pertanyaan buruk vs baik. */
function questions() {
  const q = [
    ["Kamu mau beli bekal sehat kalau aku jual?", "Kemarin makan siang di mana? Berapa?"],
    ["Ide ini bagus, kan?", "Kapan terakhir kamu kesulitan cari makan siang sehat?"],
    ["Kira-kira mau bayar berapa?", "Sudah pernah langganan katering? Kenapa berhenti?"],
  ];
  return card(
    "Tanyakan masa lalu, bukan masa depan",
    `<table class="qt"><thead><tr><th class="bad">Mengundang basa-basi</th><th class="good">Mengungkap perilaku</th></tr></thead>
      <tbody>${q.map(([a, b]) => `<tr><td class="bad">${a}</td><td class="good">${b}</td></tr>`).join("")}</tbody></table>`,
    "Orang sulit menebak apa yang akan mereka lakukan, tapi bisa menceritakan apa yang sudah mereka lakukan. Prinsip ini dipopulerkan Rob Fitzpatrick dalam The Mom Test (2013).",
  );
}

/** 2. Tangga bukti. */
function ladder() {
  const s = [
    ["Pujian", "“Wah, ide bagus!”", 10],
    ["Cerita masa lalu", "“Aku sudah tiga kali coba katering.”", 30],
    ["Waktu atau kontak", "Mengisi daftar tunggu, mau ditelepon", 55],
    ["Uang", "Membayar uang muka atau pesanan pertama", 80],
    ["Kembali lagi", "Memesan ulang tanpa dibujuk", 100],
  ];
  return card(
    "Tangga bukti",
    `<div class="ld">${s
      .map(
        ([a, b, w], i) =>
          `<div class="lr"><div class="bar" style="width:${30 + w * 0.55}%"><b>${a}</b><small>${b}</small></div>${i >= 3 ? '<span class="stamp">KUAT</span>' : ""}</div>`,
      )
      .join("")}</div>`,
    "Makin tinggi anak tangganya, makin besar yang diserahkan calon pembeli, dan makin bisa dipercaya buktinya.",
  );
}

/** 3. Kartu hipotesis. */
function hypothesis() {
  return card(
    "Tulis dugaannya sebelum menguji",
    `<div class="hy">
      <p><span>AKU MENDUGA</span> <mark>karyawan kantor di sekitar Jalan Pettarani</mark></p>
      <p><span>AKAN</span> <mark>membayar Rp35.000 untuk bekal sehat yang diantar</mark></p>
      <p><span>TERBUKTI KALAU</span> <mark>minimal 5 dari 30 orang yang ditawari membayar uang muka dalam 7 hari</mark></p>
      <p class="note">Batas lulus ditulis sebelum uji, supaya hasilnya tidak ditafsirkan sesuka hati.</p>
    </div>`,
  );
}

/** 4. Modal bertahap. */
function tranches() {
  const t = [
    ["Uji", "Rp500 rb", "Bahan 10 porsi contoh, ongkos antar", "5 orang bayar uang muka", 8],
    [
      "Coba kecil",
      "Rp2,5 jt",
      "Masak di dapur rumah 2 minggu, kemasan sederhana",
      "20 pesanan per minggu",
      30,
    ],
    ["Tambah", "Rp10 jt", "Peralatan dapur, kemasan bermerek", "Pesanan ulang di atas 50%", 100],
  ];
  return card(
    "Keluarkan modal sesuai buktinya",
    `<div class="tc">${t
      .map(
        ([a, b, c, d, w]) =>
          `<div class="tci"><div class="tch"><b>${a}</b><span>${b}</span></div><div class="meter"><i style="width:${w}%"></i></div><p>${c}</p><small>Naik tahap kalau: ${d}</small></div>`,
      )
      .join("")}</div>`,
    "Total Rp13 juta: modal aman Nadia setelah dana daruratnya dipisahkan. Setiap tahap baru dibuka kalau tahap sebelumnya lolos.",
  );
}

/** 5. Lanjut, ubah, atau berhenti. */
function decide() {
  const d = [
    ["LANJUT", "Lolos batas uji dan pembeli kembali lagi", C.green],
    ["UBAH", "Ada yang membayar, tapi bukan pembeli atau produk yang kamu duga", "#d68a1a"],
    ["BERHENTI", "Dua kali uji yang berbeda tidak lolos batas", C.red],
  ];
  return card(
    "Lanjut, ubah, atau berhenti",
    `<div class="dc">${d.map(([a, b, c]) => `<div class="dci" style="--c:${c}"><span class="st">${a}</span><p>${b}</p></div>`).join("")}</div>`,
    "Berhenti setelah menghabiskan Rp2 juta adalah keberhasilan, dibanding berhenti setelah menghabiskan Rp40 juta.",
  );
}

export const VALIDASI_FIGURES = {
  "pertanyaan-baik": {
    html: questions,
    alt: "Tiga pasang pertanyaan: yang mengundang basa-basi tentang masa depan, dan yang mengungkap perilaku di masa lalu.",
  },
  "tangga-bukti": {
    html: ladder,
    alt: "Tangga bukti dari pujian, cerita masa lalu, waktu atau kontak, uang, sampai pembelian ulang.",
  },
  "kartu-dugaan": {
    html: hypothesis,
    alt: "Kartu dugaan Nadia: karyawan di sekitar Jalan Pettarani akan membayar Rp35.000 untuk bekal sehat; terbukti kalau 5 dari 30 membayar uang muka dalam 7 hari.",
  },
  "modal-bertahap": {
    html: tranches,
    alt: "Tiga tahap modal: uji Rp500 ribu, coba kecil Rp2,5 juta, tambah Rp10 juta, masing-masing dengan syarat naik tahap.",
  },
  "lanjut-ubah-berhenti": {
    html: decide,
    alt: "Tiga keputusan setelah uji: lanjut, ubah, atau berhenti, beserta syaratnya.",
  },
};

export const VALIDASI_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;border-radius:10px;color:${C.ink};background:${C.paper};
  background-image:linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px);background-size:22px 22px;border:1px solid #d9d4c3;box-shadow:0 3px 0 #e6e0cc}
.margin{position:absolute;top:0;bottom:0;left:52px;border-left:2px solid rgba(192,57,43,.35)}
.in{position:relative;padding:28px 32px 26px 74px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:${C.green}}
h2{font-size:30px;font-weight:800;line-height:1.15;margin:6px 0 16px}
.foot{margin-top:14px;font-size:15px;line-height:1.45;color:${C.mute}}
.qt{width:100%;border-collapse:separate;border-spacing:8px 8px;margin:-8px}
.qt th{font-family:SgMono,monospace;font-size:12px;text-transform:uppercase;text-align:left;padding:4px 6px}
.qt th.bad{color:${C.red}}
.qt th.good{color:${C.green}}
.qt td{background:#fff;border-radius:8px;padding:12px;font-size:16px;line-height:1.4;width:50%;vertical-align:top}
.qt td.bad{border-left:4px solid ${C.red};text-decoration:line-through;text-decoration-color:rgba(192,57,43,.5)}
.qt td.good{border-left:4px solid ${C.green}}
.ld{display:grid;gap:8px}
.lr{display:flex;align-items:center;gap:10px}
.bar{background:#fff;border:2px solid ${C.ink};border-radius:8px;padding:8px 12px;display:flex;flex-direction:column}
.bar b{font-size:16px}
.bar small{font-size:13px;color:${C.mute}}
.lr:nth-child(4) .bar,.lr:nth-child(5) .bar{background:${C.hi}}
.stamp{font-family:SgMono,monospace;font-weight:700;color:${C.red};border:3px solid ${C.red};border-radius:6px;padding:2px 8px;transform:rotate(-8deg);font-size:14px}
.hy{display:grid;gap:12px}
.hy p{font-family:SgHand,cursive;font-size:28px;line-height:1.2}
.hy span{display:block;font-family:SgMono,monospace;font-size:12px;color:${C.green};letter-spacing:.08em}
.hy mark{background:linear-gradient(transparent 45%,${C.hi} 45%);color:${C.ink};padding:0 2px}
.hy .note{font-family:Jakarta,sans-serif;font-size:15px;color:${C.mute}}
.tc{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.tci{background:#fff;border:2px solid ${C.ink};border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px}
.tch{display:flex;justify-content:space-between;align-items:baseline}
.tch b{font-size:17px}
.tch span{font-family:SgMono,monospace;font-size:15px;color:${C.green}}
.meter{height:10px;border-radius:5px;background:#e8efe9}
.meter i{display:block;height:100%;border-radius:5px;background:${C.green}}
.tci p{font-size:14px;line-height:1.4}
.tci small{font-size:12px;color:${C.red};font-weight:700}
.dc{display:grid;gap:10px}
.dci{display:flex;align-items:center;gap:16px;background:#fff;border-radius:10px;padding:12px 16px;border:2px solid var(--c)}
.dci .st{font-family:SgMono,monospace;font-weight:700;font-size:16px;color:var(--c);border:3px solid var(--c);border-radius:6px;padding:4px 10px;transform:rotate(-4deg);min-width:118px;text-align:center}
.dci p{font-size:16px;line-height:1.4}
`;
