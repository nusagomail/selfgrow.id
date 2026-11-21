/**
 * Infografis ebook "Lepas dari Scroll Tanpa Ujung" (HTML → PNG lewat render-figures.mjs).
 * Angka tokoh Dimas adalah ilustrasi; data nasional diberi sumber di isi buku.
 */
import { FIGURE_CSS as BASE_CSS } from "./paylater-figures.mjs";

const card = (title, body, note = "") => `
<div class="card">
  <div class="kicker">Lepas dari Scroll Tanpa Ujung</div>
  <h2>${title}</h2>
  ${body}
  ${note ? `<p class="note">${note}</p>` : ""}
</div>`;

/** Gambar 1: 365 kotak hari, sebagian terisi waktu layar. */
function yearGrid() {
  const cells = Array.from(
    { length: 365 },
    (_, i) => `<i class="${i < 91 ? "on" : i < 110 ? "dim" : ""}"></i>`,
  ).join("");
  return card(
    "Satu tahun, dilihat dari layar",
    `<p class="lead">Setiap kotak adalah satu hari penuh, 24 jam.</p>
     <div class="year">${cells}</div>
     <div class="legend"><span><i style="background:#c0392b"></i>91 hari: rata-rata 6 jam sehari</span><span><i style="background:#f4ac13"></i>+19 hari: 7 jam 12 menit (Dimas)</span></div>
     <div class="callout warn">Enam jam sehari, kalau dijumlahkan, sama dengan <b>tiga bulan penuh</b> setiap tahun tanpa tidur, tanpa makan, hanya menatap layar.</div>`,
    "Rata-rata 6,05 jam/hari: data.ai, State of Mobile 2024 (data 2023). Angka Dimas ilustrasi.",
  );
}

/** Gambar 2: lingkaran scroll. */
function loop() {
  const steps = [
    ["Pemicu", "Bosan, notifikasi, menunggu, canggung"],
    ["Buka", "Jempol bergerak sebelum pikiran ikut"],
    ["Hadiah acak", "Kadang lucu, kadang penting, kadang zonk"],
    ["Tanpa ujung", "Tidak ada halaman terakhir untuk berhenti"],
  ];
  const r = 170;
  const nodes = steps
    .map(([t, d], i) => {
      const a = -Math.PI / 2 + (i / steps.length) * Math.PI * 2;
      const x = 330 + Math.cos(a) * r;
      const y = 230 + Math.sin(a) * r;
      return `<div class="node" style="left:${x - 100}px;top:${y - 46}px"><b>${i + 1}. ${t}</b><span>${d}</span></div>`;
    })
    .join("");
  return card(
    "Kenapa jempol tidak mau berhenti",
    `<div class="cycle" style="height:460px"><svg viewBox="0 0 660 460" style="height:460px"><circle cx="330" cy="230" r="170" fill="none" stroke="#e2d9c6" stroke-width="26"/><circle cx="330" cy="230" r="170" fill="none" stroke="#c0392b" stroke-width="6" stroke-dasharray="14 12"/><text x="330" y="224" text-anchor="middle" font-size="22" font-weight="800" fill="#7a2a20">Sekali lagi</text><text x="330" y="252" text-anchor="middle" font-size="16" fill="#7a5b4b">"satu video lagi"</text></svg>${nodes}</div>
     <div class="callout">Lingkaran ini tidak dipatahkan dengan niat, tetapi dengan <b>mengubah pemicunya</b> dan <b>memasang ujung</b> buatanmu sendiri (Bab 5 dan 6).</div>`,
  );
}

/** Gambar 3: tiga golongan aplikasi. */
function threeKinds() {
  const col = (cls, title, desc, apps) =>
    `<div class="kind ${cls}"><b>${title}</b><p>${desc}</p><ul>${apps.map((a) => `<li>${a}</li>`).join("")}</ul></div>`;
  return card(
    "Tiga golongan aplikasi di ponselmu",
    `<div class="kinds">
      ${col("tool", "Alat", "Dibuka untuk satu tujuan, lalu ditutup.", ["Peta", "Bank", "Kalender", "Ojek"])}
      ${col("fun", "Hiburan pilihan", "Dinikmati dengan sengaja, ada batasnya.", ["Film", "Musik", "Satu gim"])}
      ${col("trap", "Jebakan tanpa dasar", "Tidak pernah selesai, selalu ada yang berikutnya.", ["Video pendek", "Beranda medsos", "Belanja live"])}
    </div>
    <div class="callout">Tidak perlu menghapus semuanya. Cukup pindahkan <b>jebakan</b> sejauh mungkin dari jempolmu.</div>`,
  );
}

/** Gambar 4: layar utama sebelum dan sesudah. */
function homeScreen() {
  const icon = (c, t = "") =>
    `<span class="ic" style="background:${c}">${t ? `<em>${t}</em>` : ""}</span>`;
  const busy = [
    "#c0392b",
    "#e07a1f",
    "#f4ac13",
    "#c0392b",
    "#7a2a20",
    "#e07a1f",
    "#3c9631",
    "#c0392b",
    "#f4ac13",
    "#e07a1f",
    "#7a2a20",
    "#c0392b",
    "#3c9631",
    "#f4ac13",
    "#e07a1f",
    "#c0392b",
  ]
    .map((c, i) => icon(c, [0, 3, 7, 11, 15].includes(i) ? "9+" : ""))
    .join("");
  const calm = ["#1d7a34", "#3c9631", "#7fbf6a", "#1d7a34"].map((c) => icon(c)).join("");
  return card(
    "Layar utama: sebelum dan sesudah",
    `<div class="phones">
      <div class="phone"><div class="pt">Sebelum</div><div class="grid busy">${busy}</div><p>16 aplikasi, 5 titik merah memanggil</p></div>
      <div class="arrow">→</div>
      <div class="phone calm"><div class="pt">Sesudah</div><div class="grid">${calm}</div><div class="quiet">Layar abu-abu · notifikasi senyap</div><p>Hanya alat. Sisanya di folder halaman terakhir</p></div>
    </div>
    <div class="callout">Setiap langkah tambahan, sekecil apa pun, memberi otakmu waktu untuk bertanya: <b>"Aku mau apa?"</b></div>`,
  );
}

/** Gambar 5: zona tanpa layar dalam sehari. */
function zones() {
  const z = [
    ["06.00", "30 menit pertama setelah bangun", "Ponsel tetap di luar kamar"],
    ["12.00", "Makan siang", "Ponsel terbalik atau di tas"],
    ["19.00", "Makan malam bersama", "Tidak ada layar di meja"],
    ["21.30", "Satu jam sebelum tidur", "Isi baterai di luar kamar"],
  ];
  return card(
    "Empat zona tanpa layar",
    `<div class="road">${z
      .map(
        ([t, h, d]) =>
          `<div class="ph"><div class="dot" style="font-size:13px">${t}</div><div><b>${h}</b><p>${d}</p></div></div>`,
      )
      .join("")}</div>
     <div class="callout">Mulai dari <b>satu</b> zona saja. Yang paling berpengaruh bagi kebanyakan orang: kamar tidur.</div>`,
  );
}

/** Gambar 6: peta 30 hari. */
function map30() {
  const w = [
    ["Minggu 1", "Lihat dengan jujur", "Audit waktu layar, catat pemicu, isi tes diri."],
    ["Minggu 2", "Buat ponsel membosankan", "Notifikasi senyap, layar utama berisi alat saja."],
    ["Minggu 3", "Pasang ujung", "Zona tanpa layar, batas waktu aplikasi jebakan."],
    ["Minggu 4", "Isi ruang kosong", "Menu pengganti 5 menit dan 30 menit, tes ulang."],
  ];
  return card(
    "30 hari mengambil kembali perhatianmu",
    `<div class="road">${w
      .map(
        ([d, h, p], i) =>
          `<div class="ph"><div class="dot">${i + 1}</div><div><span class="pd">${d}</span><b>${h}</b><p>${p}</p></div></div>`,
      )
      .join("")}</div>`,
  );
}

export const SCROLL_FIGURES = {
  "satu-tahun": {
    html: yearGrid,
    alt: "Grid 365 hari; 91 hari berwarna merah menunjukkan rata-rata 6 jam layar per hari, ditambah 19 hari kuning untuk 7 jam 12 menit.",
  },
  "lingkaran-scroll": {
    html: loop,
    alt: "Lingkaran empat langkah: pemicu, buka, hadiah acak, tanpa ujung, lalu kembali ke awal.",
  },
  "tiga-golongan": {
    html: threeKinds,
    alt: "Tiga kolom golongan aplikasi: alat, hiburan pilihan, dan jebakan tanpa dasar.",
  },
  "layar-utama": {
    html: homeScreen,
    alt: "Perbandingan layar utama ponsel: sebelum penuh 16 aplikasi dan notifikasi merah, sesudah hanya empat aplikasi alat.",
  },
  "zona-tanpa-layar": {
    html: zones,
    alt: "Empat zona tanpa layar dalam sehari: setelah bangun, makan siang, makan malam, dan sebelum tidur.",
  },
  "peta-30-hari": {
    html: map30,
    alt: "Peta empat minggu: lihat dengan jujur, buat ponsel membosankan, pasang ujung, isi ruang kosong.",
  },
};

export const SCROLL_FIGURE_CSS = `${BASE_CSS}
.year{display:grid;grid-template-columns:repeat(25,1fr);gap:4px;margin-bottom:6px}
.year i{display:block;aspect-ratio:1;border-radius:3px;background:#e9e1cf}
.year i.on{background:#c0392b}.year i.dim{background:#f4ac13}
.year+.legend{margin-top:18px}
.kinds{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.kind{border-radius:18px;padding:16px;background:#fff;border:2px solid #e2d9c6}
.kind b{display:block;font-size:19px;margin-bottom:6px}.kind p{font-size:14px;line-height:1.4;color:#5f5a4c;min-height:58px}
.kind ul{list-style:none;padding:0;margin-top:10px;display:grid;gap:6px}
.kind li{font-size:14px;font-weight:700;padding:7px 10px;border-radius:10px;background:#f3efe4}
.kind.tool{border-color:#1d7a34}.kind.tool b{color:#1d7a34}
.kind.fun{border-color:#f4ac13}.kind.fun b{color:#9a6a00}
.kind.trap{border-color:#c0392b;background:#fdf1ec}.kind.trap b{color:#a5281b}.kind.trap li{background:#f8dcd2}
.phones{display:flex;align-items:center;justify-content:center;gap:18px}
.phone{width:250px;border-radius:30px;background:#1d2a21;padding:16px 14px 14px;color:#fff;text-align:center}
.phone.calm{background:#e4e7e4;color:#1d2a21}
.phone.calm .grid{min-height:150px}
.pt{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px;opacity:.85}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;min-height:236px;align-content:start}
.ic{position:relative;display:block;aspect-ratio:1;border-radius:14px}
.calm .ic{filter:grayscale(1)}
.ic em{position:absolute;top:-6px;right:-6px;font-style:normal;font-size:10px;font-weight:800;background:#ff3b30;color:#fff;border-radius:99px;padding:2px 5px}
.phone p{font-size:13px;margin-top:10px;line-height:1.35;opacity:.9}
.quiet{font-size:12px;font-weight:700;margin:6px 0 64px;opacity:.75}
.arrow{font-size:40px;font-weight:800;color:#1d7a34}
`;
