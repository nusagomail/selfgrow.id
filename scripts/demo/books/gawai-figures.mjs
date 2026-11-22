/**
 * Infografis "Anak dan Gawai". Identitas visual: papan tempel di kulkas keluarga. Latar kertas
 * krem bertekstur titik, kartu-kartu seperti stiker tebal bergaris tepi putih dan bayangan
 * pendek, sudut membulat besar, tulisan tangan anak (SgHand) untuk judul kecil, warna krayon
 * (merah, oranye, kuning, hijau, biru). Metafora: aturan layar yang ditempel di kulkas, dibuat
 * bersama, dan dibaca semua orang, termasuk orang tua.
 */

const C = {
  paper: "#fff8ec",
  dot: "rgba(120,90,60,.12)",
  ink: "#2d2a32",
  red: "#ef6f6c",
  orange: "#f4a259",
  yellow: "#f6c85f",
  green: "#5bb37f",
  blue: "#5b8def",
  mute: "#756c66",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">Papan kulkas · Anak dan Gawai</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Takaran layar menurut usia. */
function ages() {
  const r = [
    [
      "Di bawah 2 tahun",
      "Sebaiknya tanpa layar, kecuali video call dengan keluarga.",
      C.red,
      "AAP",
    ],
    [
      "2–4 tahun",
      "Paling lama 1 jam sehari, lebih sedikit lebih baik, dan sebaiknya ditemani.",
      C.orange,
      "WHO 2019",
    ],
    [
      "5 tahun ke atas",
      "Tidak ada angka tunggal. Pastikan dulu tidur, gerak 60 menit, sekolah, dan waktu keluarga terpenuhi; layar mengisi sisanya.",
      C.green,
      "WHO, AAP",
    ],
  ];
  return card(
    "Berapa lama yang wajar?",
    `<div class="ag">${r
      .map(
        ([a, b, c, s]) =>
          `<div class="agi" style="--c:${c}"><b>${a}</b><p>${b}</p><small>${s}</small></div>`,
      )
      .join("")}</div>`,
    "Untuk anak usia sekolah, pertanyaannya bergeser dari “berapa lama” menjadi “apa yang tergeser”.",
  );
}

/** 2. Lampu lalu lintas layar. */
function lights() {
  const z = [
    [
      C.red,
      "Merah: tanpa layar",
      ["Meja makan", "Kamar tidur", "1 jam sebelum tidur", "Saat mengerjakan PR"],
    ],
    [
      C.yellow,
      "Kuning: boleh, dengan syarat",
      ["Setelah PR dan mandi", "Pakai pengatur waktu", "Di ruang keluarga"],
    ],
    [
      C.green,
      "Hijau: silakan",
      ["Video call nenek", "Nonton film bersama", "Mencari jawaban PR bersama orang tua"],
    ],
  ];
  return card(
    "Lampu lalu lintas layar",
    `<div class="tl"><div class="pole">${z.map(([c]) => `<span style="background:${c}"></span>`).join("")}</div>
      <div class="zones">${z
        .map(
          ([c, t, items]) =>
            `<div class="zone" style="border-color:${c}"><h4>${t}</h4><ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul></div>`,
        )
        .join("")}</div></div>`,
    "Contoh keluarga Bu Rina. Zona merah dijaga oleh tempat dan waktu, bukan oleh omelan.",
  );
}

/** 3. Aba-aba sebelum selesai. */
function transition() {
  const s = [
    ["10 menit lagi", "Beri tahu sambil menatap anak, bukan dari dapur."],
    ["2 menit lagi", "“Selesaikan level ini atau episode ini, ya.”"],
    ["Selesai", "Gawai diletakkan di keranjang oleh anak sendiri."],
    ["Lalu…", "Langsung ada kegiatan berikutnya: mandi, makan, main di luar."],
  ];
  return card(
    "Aba-aba sebelum layar selesai",
    `<div class="tr">${s
      .map(
        ([a, b], i) =>
          `<div class="tri"><span class="num">${i + 1}</span><b>${a}</b><p>${b}</p></div>${i < s.length - 1 ? '<span class="arr">→</span>' : ""}`,
      )
      .join("")}</div>`,
    "Berpindah dari layar ke kegiatan lain sulit bagi anak. Aba-aba membuat akhirnya bisa ditebak.",
  );
}

/** 4. Ponsel di tangan orang tua. */
function parents() {
  return card(
    "Layar di tangan kita sendiri",
    `<div class="pp">
      <div class="ppi bad"><h4>Ponsel di tangan saat anak bercerita</h4><p>Anak mencari perhatian dengan cara lain: merengek, berulah, atau berhenti bercerita.</p></div>
      <div class="ppi good"><h4>Keranjang ponsel keluarga</h4><p>Pukul 18.00–20.00 semua ponsel, termasuk milik ayah dan ibu, istirahat di satu keranjang.</p></div>
    </div>`,
    "Orang tua yang lebih sering terdistraksi gawai saat bersama anak melaporkan lebih banyak masalah perilaku anak (McDaniel & Radesky, 2018). Hubungannya dua arah, bukan sekadar sebab-akibat.",
  );
}

/** 5. Tanda perlu bantuan. */
function warning() {
  const t = [
    "Tidur anak berkurang jelas karena gawai, berminggu-minggu",
    "Marah sampai memukul atau merusak barang setiap kali gawai diambil",
    "Nilai turun dan tidak mau lagi bermain dengan teman",
    "Berbohong atau mencuri waktu bermain secara diam-diam terus-menerus",
    "Kamu sudah mencoba aturan yang konsisten selama sebulan tanpa perubahan",
  ];
  return card(
    "Kapan perlu bantuan profesional",
    `<div class="wn">${t.map((x) => `<p><span>!</span>${x}</p>`).join("")}</div>`,
    "Konsultasikan dengan dokter anak atau psikolog anak. Meminta bantuan bukan tanda gagal sebagai orang tua.",
  );
}

export const GAWAI_FIGURES = {
  "takaran-usia": {
    html: ages,
    alt: "Takaran layar menurut usia: di bawah 2 tahun sebaiknya tanpa layar kecuali video call, 2 sampai 4 tahun paling lama 1 jam sehari, 5 tahun ke atas tidak ada angka tunggal.",
  },
  "lampu-layar": {
    html: lights,
    alt: "Lampu lalu lintas layar: merah tanpa layar (meja makan, kamar tidur, sejam sebelum tidur, saat PR), kuning dengan syarat, hijau silakan.",
  },
  "aba-aba-selesai": {
    html: transition,
    alt: "Empat langkah aba-aba sebelum layar selesai: 10 menit lagi, 2 menit lagi, selesai dan gawai ke keranjang, lalu kegiatan berikutnya.",
  },
  "ponsel-orang-tua": {
    html: parents,
    alt: "Perbandingan ponsel di tangan orang tua saat anak bercerita dengan keranjang ponsel keluarga di jam tertentu.",
  },
  "tanda-bantuan": {
    html: warning,
    alt: "Lima tanda urusan gawai anak perlu dibicarakan dengan dokter anak atau psikolog anak.",
  },
};

export const GAWAI_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:28px;color:${C.ink};background:${C.paper};
  background-image:radial-gradient(${C.dot} 1.5px,transparent 1.6px);background-size:18px 18px;border:6px solid #fff;box-shadow:0 0 0 2px #eadfcd}
.in{padding:28px 32px 26px}
.tag{font-family:SgHand,cursive;font-size:22px;color:${C.blue}}
h2{font-size:32px;font-weight:800;line-height:1.15;margin:2px 0 18px}
.foot{margin-top:16px;font-size:15px;line-height:1.45;color:${C.mute}}
.ag{display:grid;gap:12px}
.agi{background:#fff;border-radius:20px;padding:14px 18px;border:3px solid var(--c);box-shadow:4px 4px 0 var(--c)}
.agi b{font-family:SgHand,cursive;font-size:28px;color:var(--c)}
.agi p{font-size:16px;line-height:1.45}
.agi small{font-size:12px;color:${C.mute}}
.tl{display:grid;grid-template-columns:70px 1fr;gap:16px;align-items:stretch}
.pole{background:${C.ink};border-radius:22px;display:flex;flex-direction:column;justify-content:space-around;align-items:center;padding:10px 0}
.pole span{width:44px;height:44px;border-radius:50%;box-shadow:inset 0 -4px 0 rgba(0,0,0,.2)}
.zones{display:grid;gap:10px}
.zone{background:#fff;border-radius:18px;padding:12px 16px;border:3px solid}
.zone h4{font-size:17px}
.zone ul{display:flex;flex-wrap:wrap;gap:6px;list-style:none;padding:0;margin-top:6px}
.zone li{background:${C.paper};border-radius:99px;padding:4px 10px;font-size:14px}
.tr{display:flex;align-items:center;gap:6px}
.tri{flex:1;background:#fff;border-radius:18px;padding:12px;border:3px solid ${C.blue};min-height:170px}
.tri .num{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:${C.yellow};font-weight:800}
.tri b{display:block;font-family:SgHand,cursive;font-size:26px;margin-top:4px}
.tri p{font-size:14px;line-height:1.4}
.arr{font-size:22px;color:${C.mute}}
.pp{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ppi{background:#fff;border-radius:20px;padding:16px;border:3px solid}
.ppi.bad{border-color:${C.red};box-shadow:4px 4px 0 ${C.red}}
.ppi.good{border-color:${C.green};box-shadow:4px 4px 0 ${C.green}}
.ppi h4{font-size:17px}
.ppi p{font-size:15px;line-height:1.45;margin-top:6px}
.wn{background:#fff;border-radius:20px;padding:8px 18px;border:3px solid ${C.orange}}
.wn p{display:flex;gap:12px;align-items:center;font-size:16px;padding:9px 0;border-bottom:2px dashed #f1e4cf}
.wn p:last-child{border-bottom:0}
.wn span{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:${C.orange};color:#fff;font-weight:800}
`;
