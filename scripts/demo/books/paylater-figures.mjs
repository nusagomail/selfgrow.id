/**
 * Infografis ebook "Lepas dari Jerat Paylater" (HTML → PNG lewat render-figures.mjs).
 * Angka mengikuti contoh tokoh Nadia di isi buku (ilustrasi, dibulatkan).
 */

const rp = (n) => `Rp${Math.round(n).toLocaleString("id-ID")}`;

const card = (title, body, note = "") => `
<div class="card">
  <div class="kicker">Lepas dari Jerat Paylater</div>
  <h2>${title}</h2>
  ${body}
  ${note ? `<p class="note">${note}</p>` : ""}
</div>`;

/** Gambar 1: cicilan Nadia menumpuk dari bulan ke bulan. */
function stack() {
  const H = ["Headset", 131];
  const P = ["Ponsel", 437];
  const S = ["Skincare & baju", 310];
  const K = ["Kartu kredit", 160];
  const L = ["Pinjol", 330];
  const T = ["Sepatu", 220];
  const months = [
    ["Jan", [H]],
    ["Feb", [H]],
    ["Mar", [H, P]],
    ["Apr", [H, P]],
    ["Mei", [H, P]],
    ["Jun", [H, P, S, K]],
    ["Jul", [H, P, S, K]],
    ["Agu", [H, P, S, K, L]],
    ["Sep", [H, P, S, K, L, T]],
  ];
  const colors = {
    Headset: "#1d7a34",
    Ponsel: "#f4ac13",
    "Skincare & baju": "#3c9631",
    "Kartu kredit": "#e07a1f",
    Pinjol: "#c0392b",
    Sepatu: "#7fbf6a",
  };
  const max = 1600;
  const bars = months
    .map(([m, parts]) => {
      const total = parts.reduce((a, [, v]) => a + v, 0);
      const segs = parts
        .map(
          ([k, v]) =>
            `<div class="seg" style="height:${(v / max) * 300}px;background:${colors[k]}"></div>`,
        )
        .join("");
      return `<div class="col"><div class="val">${(total / 1000).toFixed(2).replace(".", ",")} jt</div><div class="stackbar">${segs}</div><div class="m">${m}</div></div>`;
    })
    .join("");
  const legend = Object.entries(colors)
    .map(([k, c]) => `<span><i style="background:${c}"></i>${k}</span>`)
    .join("");
  return card(
    "Cicilan Nadia per bulan",
    `<div class="chart">${bars}</div><div class="legend">${legend}</div>
     <div class="callout">Sembilan bulan, dari <b>Rp131 ribu</b> menjadi <b>hampir Rp1,6 juta</b> per bulan. Tidak ada satu pun keputusan yang terasa besar.</div>`,
    "Angka dalam ribu rupiah, dibulatkan. Ilustrasi tokoh dalam buku ini.",
  );
}

/** Gambar 2: harga di etalase vs total yang dibayar. */
function trueCost() {
  const rows = [
    ["Bayar lunas", 1200000, "#1d7a34"],
    ["Cicil 3 bulan", 1293600, "#7fbf6a"],
    ["Cicil 6 bulan", 1387200, "#f4ac13"],
    ["Cicil 12 bulan", 1574400, "#c0392b"],
  ];
  const bars = rows
    .map(
      ([k, v, c]) =>
        `<div class="hrow"><div class="hl">${k}</div><div class="htrack"><div class="hbar" style="width:${(v / 1600000) * 100}%;background:${c}"></div></div><div class="hv">${rp(v)}</div></div>`,
    )
    .join("");
  return card(
    "Harga di etalase vs yang kamu bayar",
    `<p class="lead">Headset seharga <b>${rp(1200000)}</b>, biaya layanan contoh 2,6% per bulan.</p>
     <div class="hbars">${bars}</div>
     <div class="callout warn">Cicil 12 bulan = membayar <b>${rp(374400)}</b> lebih mahal. Itu sepertiga harga headsetnya sendiri.</div>`,
    "Ilustrasi. Biaya tiap layanan berbeda; selalu cek rincian sebelum menyetujui.",
  );
}

/** Gambar 3: lingkaran jerat. */
function cycle() {
  const steps = [
    ["Gaji masuk", "Rasanya lega, saldo terlihat besar"],
    ["Cicilan memotong", "Seperempat gaji langsung hilang"],
    ["Uang kurang", "Tanggal 20 sudah tipis"],
    ["Bayar nanti lagi", "Untuk makan, ongkir, kebutuhan"],
    ["Cicilan bertambah", "Bulan depan dipotong lebih banyak"],
  ];
  const r = 190;
  const nodes = steps
    .map(([t, d], i) => {
      const a = -Math.PI / 2 + (i / steps.length) * Math.PI * 2;
      const x = 330 + Math.cos(a) * r;
      const y = 250 + Math.sin(a) * r;
      return `<div class="node" style="left:${x - 95}px;top:${y - 48}px"><b>${i + 1}. ${t}</b><span>${d}</span></div>`;
    })
    .join("");
  return card(
    "Lingkaran jerat paylater",
    `<div class="cycle"><svg viewBox="0 0 660 500"><circle cx="330" cy="250" r="190" fill="none" stroke="#e2d9c6" stroke-width="26"/><circle cx="330" cy="250" r="190" fill="none" stroke="#c0392b" stroke-width="6" stroke-dasharray="14 12"/><text x="330" y="244" text-anchor="middle" font-size="22" font-weight="800" fill="#7a2a20">Berputar</text><text x="330" y="272" text-anchor="middle" font-size="16" fill="#7a5b4b">setiap bulan</text></svg>${nodes}</div>
     <div class="callout">Lingkaran ini baru putus kalau <b>langkah 4</b> dihentikan. Itulah tugas Bab 4.</div>`,
  );
}

/** Gambar 4: tujuh langkah minggu pertama. */
function firstWeek() {
  const items = [
    ["Hari 1", "Matikan fitur paylater di semua aplikasi belanja"],
    ["Hari 1", "Hapus kartu yang tersimpan di aplikasi belanja & ojol"],
    ["Hari 2", "Matikan notifikasi promo dan berhenti ikut live jualan"],
    ["Hari 3", "Buat aturan 48 jam untuk belanja di atas Rp200 ribu"],
    ["Hari 4", 'Buka rekening atau kantong "Darurat Kecil"'],
    ["Hari 5", "Setor pertama ke Darurat Kecil, sekecil apa pun"],
    ["Hari 7", "Ceritakan rencanamu ke satu orang yang kamu percaya"],
  ];
  return card(
    "7 hari pertama: berhenti menggali lubang",
    `<ol class="checks">${items
      .map(
        ([d, t]) =>
          `<li><span class="box"></span><span class="day">${d}</span><span>${t}</span></li>`,
      )
      .join("")}</ol>`,
  );
}

/** Gambar 5: peta utang Nadia. */
function debtMap() {
  const debts = [
    ["Kartu kredit", 3200000, "Bunga ±1,75%/bln", "#c0392b"],
    ["Ponsel (paylater)", 2622000, "Biaya 2,6%/bln", "#e07a1f"],
    ["Pinjol legal", 1650000, "5 cicilan lagi", "#e07a1f"],
    ["Pinjam sepupu", 1000000, "Tanpa bunga", "#3c9631"],
    ["Skincare & baju", 930000, "Biaya 3%/bln", "#f4ac13"],
    ["Sepatu lari", 660000, "Promo 0%", "#3c9631"],
    ["Headset", 524800, "Biaya 2,6%/bln", "#f4ac13"],
  ];
  const total = debts.reduce((a, d) => a + d[1], 0);
  const blk = ([k, v, note, c]) =>
    `<div class="blk" style="flex:${v};background:${c}"><b>${k}</b><span>${rp(v)}</span><em>${note}</em></div>`;
  // Dua baris seperti peta kotak: tiga utang terbesar di atas, sisanya di bawah.
  const blocks = `<div class="brow">${debts.slice(0, 3).map(blk).join("")}</div><div class="brow">${debts
    .slice(3)
    .map(blk)
    .join("")}</div>`;
  return card(
    "Peta utang Nadia",
    `<div class="total">Total sisa utang <b>${rp(total)}</b></div><div class="blocks">${blocks}</div>
     <div class="legend"><span><i style="background:#c0392b"></i>Paling mahal</span><span><i style="background:#f4ac13"></i>Berbiaya</span><span><i style="background:#3c9631"></i>Murah / tanpa bunga</span></div>`,
    "Ukuran kotak sebanding dengan sisa utang.",
  );
}

/** Gambar 6: ke mana gaji Nadia pergi, sebelum vs sesudah. */
function beforeAfter() {
  const before = [
    ["Kebutuhan pokok", 3050, "#1d7a34"],
    ["Cicilan", 1590, "#c0392b"],
    ["Ojol, pesan antar, nongkrong", 1160, "#f4ac13"],
  ];
  const after = [
    ["Kebutuhan pokok", 3050, "#1d7a34"],
    ["Cicilan", 1590, "#c0392b"],
    ["Ojol, pesan antar, nongkrong", 460, "#f4ac13"],
    ["Pelunasan ekstra", 700, "#0f2d4a"],
  ];
  const bar = (parts) =>
    `<div class="sbar">${parts
      .map(
        ([k, v, c]) =>
          `<div style="flex:${v};background:${c}" title="${k}"><span>${(v / 1000).toFixed(2).replace(".", ",")}</span></div>`,
      )
      .join("")}</div>`;
  const legend = [...after]
    .map(([k, , c]) => `<span><i style="background:${c}"></i>${k}</span>`)
    .join("");
  return card(
    "Gaji Rp5,8 juta: sebelum dan sesudah",
    `<div class="sb"><div class="sl">Sebelum</div>${bar(before)}</div>
     <div class="sb"><div class="sl">Sesudah</div>${bar(after)}</div>
     <div class="legend">${legend}</div>
     <div class="callout">Tidak ada gaji tambahan. Rp700 ribu per bulan ditemukan dari pengeluaran yang selama ini tidak terasa.</div>`,
    "Dalam juta rupiah per bulan.",
  );
}

/** Gambar 7: urutan pelunasan bulan demi bulan. */
function timeline() {
  const months = ["B1", "B2", "B3", "B4", "B5", "B6", "B7"];
  const rows = [
    ["Headset", 1, "Lunas dengan uang jual barang"],
    ["Skincare & baju", 1, "Lunas dengan uang jual barang"],
    ["Pinjol legal", 3, "Dipercepat"],
    ["Sepatu lari", 3, "Selesai sesuai jadwal"],
    ["Kartu kredit", 6, "Bola salju terbesar"],
    ["Ponsel", 6, "Selesai sesuai jadwal"],
    ["Pinjam sepupu", 7, "Dicicil di akhir"],
  ];
  const head = months.map((m) => `<div class="th">${m}</div>`).join("");
  const body = rows
    .map(
      ([k, end, note]) =>
        `<div class="tl"><div class="tk"><b>${k}</b><span>${note}</span></div>${months
          .map(
            (_, i) =>
              `<div class="tc${i + 1 < end ? " on" : i + 1 === end ? " done" : ""}">${i + 1 === end ? "✓" : ""}</div>`,
          )
          .join("")}</div>`,
    )
    .join("");
  return card(
    "Tujuh bulan menuju nol",
    `<div class="tgrid"><div class="tl head"><div class="tk"></div>${head}</div>${body}</div>
     <div class="callout">Setiap utang yang lunas membebaskan cicilannya untuk menyerang utang berikutnya. Bola saljunya membesar.</div>`,
    "Rencana ilustrasi; hasil nyata bergantung pada angka masing-masing.",
  );
}

/** Gambar 8: rambu pinjol ilegal. */
function illegal() {
  const signs = [
    "Tidak terdaftar di OJK (cek di situs OJK atau Kontak OJK 157)",
    "Menawarkan lewat SMS, WhatsApp, atau DM tanpa kamu minta",
    "Meminta akses ke semua kontak, galeri, dan lokasi ponsel",
    "Cair tanpa syarat, tanpa penjelasan bunga dan denda",
    "Menagih dengan ancaman, kata kasar, atau menyebar data",
  ];
  return card(
    "Rambu pinjol ilegal",
    `<ul class="signs">${signs.map((s) => `<li><span class="x">!</span>${s}</li>`).join("")}</ul>
     <div class="callout warn">Satu saja tanda di atas sudah cukup alasan untuk <b>tidak</b> meminjam.</div>`,
  );
}

/** Gambar 9: lampu lalu lintas sebelum klik bayar nanti. */
function trafficLight() {
  const q = [
    ["Apakah ini kebutuhan yang sudah ada di anggaranku bulan ini?", "Tidak → berhenti"],
    ["Bisakah aku membayar lunas hari ini tanpa mengganggu kebutuhan pokok?", "Tidak → berhenti"],
    ["Tanpa bunga, tenor ≤ 3 bulan, dan aku tahu rincian biayanya?", "Tidak → tunda"],
    ["Total cicilanku setelah ini tetap di bawah 10% gaji?", "Tidak → tunda"],
  ];
  return card(
    'Empat pertanyaan sebelum "bayar nanti"',
    `<div class="tlight">${q
      .map(
        ([t, n], i) =>
          `<div class="tq"><div class="tn">${i + 1}</div><div><b>${t}</b><span>${n}</span></div></div>`,
      )
      .join(
        "",
      )}<div class="tok">Empat kali "ya"? Boleh, dan catat di anggaran hari ini juga.</div></div>`,
  );
}

/** Gambar 10: peta 90 hari. */
function roadmap() {
  const phases = [
    [
      "Hari 1–7",
      "Berhenti menggali",
      "Matikan paylater, hapus kartu tersimpan, buka Darurat Kecil.",
    ],
    ["Hari 8–30", "Lihat semuanya", "Peta utang, cek SLIK, temukan uang ekstra di anggaran."],
    [
      "Hari 31–60",
      "Mulai menyerang",
      "Lunasi utang terkecil, gulirkan cicilannya ke utang berikutnya.",
    ],
    [
      "Hari 61–90",
      "Kunci kebiasaan",
      "Tinjau tiap minggu, isi Darurat Kecil, tetapkan aturan paylater sehat.",
    ],
  ];
  return card(
    "Peta 90 hari",
    `<div class="road">${phases
      .map(
        ([d, t, x], i) =>
          `<div class="ph"><div class="dot">${i + 1}</div><div><span class="pd">${d}</span><b>${t}</b><p>${x}</p></div></div>`,
      )
      .join("")}</div>`,
  );
}

export const FIGURES = {
  "cicilan-menumpuk": {
    html: stack,
    alt: "Grafik batang cicilan Nadia dari Januari sampai September yang naik dari Rp131 ribu menjadi hampir Rp1,6 juta per bulan",
  },
  "harga-sebenarnya": {
    html: trueCost,
    alt: "Perbandingan total harga headset Rp1,2 juta jika dibayar lunas atau dicicil 3, 6, dan 12 bulan",
  },
  "lingkaran-jerat": {
    html: cycle,
    alt: "Diagram lingkaran: gaji masuk, cicilan memotong, uang kurang, bayar nanti lagi, cicilan bertambah",
  },
  "tujuh-hari": {
    html: firstWeek,
    alt: "Daftar centang tujuh langkah minggu pertama untuk berhenti menambah utang paylater",
  },
  "peta-utang": {
    html: debtMap,
    alt: "Peta utang Nadia berupa kotak-kotak sebanding besar sisa utang, total sekitar Rp10,6 juta",
  },
  "sebelum-sesudah": {
    html: beforeAfter,
    alt: "Dua batang pembagian gaji Rp5,8 juta sebelum dan sesudah menata ulang pengeluaran",
  },
  "tujuh-bulan": {
    html: timeline,
    alt: "Linimasa tujuh bulan pelunasan utang Nadia satu per satu",
  },
  "rambu-pinjol": {
    html: illegal,
    alt: "Lima tanda pinjaman online ilegal",
  },
  "empat-pertanyaan": {
    html: trafficLight,
    alt: "Empat pertanyaan yang harus dijawab ya sebelum memakai paylater",
  },
  "peta-90-hari": {
    html: roadmap,
    alt: "Peta empat tahap 90 hari menuju bebas paylater",
  },
};

export const FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;background:#fbf8f1;border-radius:28px;padding:40px 40px 34px;color:#1d2a21;border:1px solid #ece4d3}
.kicker{font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#1d7a34}
h2{font-size:30px;line-height:1.15;margin:8px 0 22px;letter-spacing:-.01em}
.note{margin-top:16px;font-size:13px;color:#7a7466}
.lead{font-size:17px;margin-bottom:18px}
.callout{margin-top:22px;padding:16px 18px;border-radius:16px;background:#e2f0e4;font-size:16px;line-height:1.5}
.callout.warn{background:#fbe3d3}
.chart{display:flex;align-items:flex-end;gap:14px;height:360px;padding-top:10px;border-bottom:2px solid #e2d9c6}
.col{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}
.stackbar{width:100%;display:flex;flex-direction:column-reverse;border-radius:8px 8px 0 0;overflow:hidden}
.seg{width:100%}
.val{font-size:13px;font-weight:800;margin-bottom:6px;color:#5f5a4c}
.m{position:relative;top:30px;font-size:14px;font-weight:700;color:#5f5a4c;height:0}
.legend{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:22px;font-size:14px}
.chart+.legend{margin-top:58px}
.legend i{display:inline-block;width:14px;height:14px;border-radius:4px;margin-right:6px;vertical-align:-2px}
.hbars{display:grid;gap:14px}
.hrow{display:grid;grid-template-columns:140px 1fr 130px;align-items:center;gap:12px;font-size:16px}
.hl{font-weight:700}.hv{font-weight:800;text-align:right}
.htrack{height:30px;background:#efe8d8;border-radius:9px;overflow:hidden}.hbar{height:100%;border-radius:9px}
.cycle{position:relative;height:500px}.cycle svg{position:absolute;inset:0;width:660px;height:500px}
.node{position:absolute;width:190px;background:#fff;border:2px solid #ead9c9;border-radius:16px;padding:10px 12px;font-size:13px;line-height:1.35;box-shadow:0 6px 14px rgba(80,50,20,.08)}
.node b{display:block;font-size:15px;color:#7a2a20;margin-bottom:2px}
.checks{list-style:none;padding:0;display:grid;gap:12px}
.checks li{display:grid;grid-template-columns:30px 70px 1fr;align-items:center;gap:12px;font-size:17px;background:#fff;border:1px solid #ece4d3;border-radius:14px;padding:12px 14px}
.box{width:26px;height:26px;border:3px solid #1d7a34;border-radius:8px}
.day{font-weight:800;color:#1d7a34;font-size:14px}
.total{font-size:18px;margin-bottom:14px}
.blocks{display:grid;grid-template-rows:180px 150px;gap:6px}.brow{display:flex;gap:6px}
.blk{border-radius:12px;color:#fff;padding:12px 10px;display:flex;flex-direction:column;gap:4px;overflow:hidden;min-width:0}
.blk b{font-size:14px;line-height:1.2}.blk span{font-size:15px;font-weight:800}.blk em{font-size:12px;font-style:normal;opacity:.9}
.sb{display:grid;grid-template-columns:90px 1fr;align-items:center;gap:12px;margin-bottom:14px}
.sl{font-weight:800}
.sbar{display:flex;height:54px;border-radius:12px;overflow:hidden}
.sbar>div{display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px}
.tgrid{display:grid;gap:8px}
.tl{display:grid;grid-template-columns:200px repeat(7,1fr);gap:6px;align-items:center}
.tl.head .th{font-size:13px;font-weight:800;text-align:center;color:#5f5a4c}
.tk b{display:block;font-size:15px}.tk span{font-size:12px;color:#7a7466}
.tc{height:34px;border-radius:8px;background:#efe8d8;display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff}
.tc.on{background:#f4ac13}.tc.done{background:#1d7a34}
.signs{list-style:none;padding:0;display:grid;gap:12px}
.signs li{display:flex;gap:14px;align-items:center;font-size:17px;background:#fff;border:1px solid #f0d8c8;border-radius:14px;padding:12px 14px}
.x{flex-shrink:0;width:32px;height:32px;border-radius:50%;background:#c0392b;color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center}
.tlight{display:grid;gap:12px}
.tq{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid #ece4d3;border-radius:14px;padding:14px}
.tn{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:#f4ac13;color:#1d2a21;font-weight:800;display:flex;align-items:center;justify-content:center}
.tq b{display:block;font-size:17px;line-height:1.35}.tq span{font-size:14px;color:#c0392b;font-weight:700}
.tok{padding:16px 18px;border-radius:16px;background:#1d7a34;color:#fff;font-weight:800;font-size:17px}
.road{display:grid;gap:0;position:relative}
.ph{display:flex;gap:18px;padding-bottom:22px;position:relative}
.ph:not(:last-child)::before{content:"";position:absolute;left:21px;top:44px;bottom:0;width:4px;background:#cfe4d2}
.dot{flex-shrink:0;width:46px;height:46px;border-radius:50%;background:#1d7a34;color:#fff;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center}
.pd{display:block;font-size:13px;font-weight:800;color:#1d7a34;letter-spacing:.06em;text-transform:uppercase}
.ph b{display:block;font-size:20px;margin:2px 0 4px}.ph p{font-size:16px;line-height:1.45;color:#4b4739}
`;
