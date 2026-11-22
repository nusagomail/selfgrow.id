/**
 * Infografis "CV yang Dilirik Rekruter". Identitas visual: lembar A4 di meja rekruter. Kertas
 * putih dengan bayangan tipis, coretan stabilo kuning dan hijau, catatan pena merah tulisan tangan
 * (SgHand), huruf isi Jakarta. Seperti CV yang sedang dikoreksi.
 */

const C = {
  desk: "#e9e4dc",
  ink: "#20232a",
  muted: "#7b818c",
  yellow: "#fff27a",
  green: "#b9f0b1",
  red: "#d23b2f",
  line: "#e3e5ea",
};

const card = (title, body, note = "") => `
<div class="card"><div class="in">
  <div class="tag">Meja rekruter · CV yang Dilirik Rekruter</div>
  <h2>${title}</h2>
  ${body}
  ${note ? `<p class="note">${note}</p>` : ""}
</div></div>`;

const bar = (w, cls = "") => `<span class="ln ${cls}" style="width:${w}%"></span>`;

/** 1. Yang terbaca dalam 7 detik. */
function scan() {
  return card(
    "Yang terbaca dalam 7,4 detik",
    `<div class="sc">
      <div class="a4">
        <div class="hot h1"></div><div class="hot h2"></div><div class="hot h3"></div>
        <b class="nm">SEKAR AYU</b><small>Digital Marketing · Jakarta · 0812-xxxx</small>
        <div class="sec">Ringkasan</div>${bar(92)}${bar(70)}
        <div class="sec">Pengalaman</div><b class="jt">Staf Pemasaran Digital · PT Contoh</b>${bar(88)}${bar(80)}${bar(60, "dim")}
        <b class="jt">Magang Media Sosial · Toko Contoh</b>${bar(84, "dim")}${bar(55, "dim")}
        <div class="sec dim">Pendidikan</div>${bar(70, "dim")}
      </div>
      <ol class="sl"><li><b>Nama dan posisi</b> di bagian atas</li><li><b>Jabatan terakhir</b> dan tempatnya</li><li><b>Dua baris pertama</b> setiap pengalaman</li><li class="dim">Sisanya hanya dibaca kalau tiga hal di atas menarik</li></ol>
    </div>`,
    "rata-rata waktu pandangan pertama rekruter: 7,4 detik (Ladders, 2018)",
  );
}

/** 2. Tugas vs pencapaian. */
function rewrite() {
  const rows = [
    [
      "Bertanggung jawab mengelola media sosial perusahaan",
      "Meningkatkan pengikut Instagram 35% dalam 6 bulan melalui jadwal konten mingguan",
    ],
    [
      "Membantu tim dalam kegiatan promosi",
      "Menyusun 4 kampanye promo yang menghasilkan 1.200 transaksi baru",
    ],
    [
      "Membuat laporan bulanan",
      "Mempercepat laporan bulanan dari 3 hari menjadi 1 hari dengan templat otomatis",
    ],
  ];
  return card(
    "Tugas → pencapaian",
    `<div class="rw">${rows.map(([a, b]) => `<div class="rwr"><p class="old">${a}</p><span class="ar">→</span><p class="new">${b}</p></div>`).join("")}</div>`,
    "kata kerja + apa yang berubah + angka + caranya",
  );
}

/** 3. Format ramah ATS. */
function ats() {
  const ok = [
    "Satu kolom, dibaca dari atas ke bawah",
    "Judul bagian standar: Pengalaman, Pendidikan, Keahlian",
    "Huruf umum, ukuran 10–12",
    "Disimpan sebagai PDF teks (bukan hasil pindai)",
  ];
  const no = [
    "Dua kolom atau tabel untuk isi utama",
    "Teks penting di dalam gambar atau ikon",
    "Grafik batang untuk menilai keahlian",
    "Informasi kontak di bagian header/footer",
  ];
  return card(
    "Ramah sistem pelacak lamaran (ATS)",
    `<div class="at"><div class="atc y"><h4>Aman</h4>${ok.map((x) => `<p>✓ ${x}</p>`).join("")}</div><div class="atc n"><h4>Berisiko tidak terbaca</h4>${no.map((x) => `<p>✕ ${x}</p>`).join("")}</div></div>`,
    "CV yang cantik tapi tidak terbaca mesin bisa tersaring sebelum dilihat manusia",
  );
}

/** 4. Mencocokkan kata kunci. */
function keywords() {
  return card(
    "Lowongan dan CV, berdampingan",
    `<div class="kw">
      <div class="doc"><h4>Lowongan</h4><p>Kami mencari <mark>Digital Marketing</mark> yang berpengalaman dengan <mark>Meta Ads</mark>, <mark class="g">analisis data</mark>, dan <mark>copywriting</mark>. Nilai tambah: <mark class="g">SEO</mark>.</p></div>
      <div class="doc"><h4>CV Sekar</h4><p>Staf <mark>Digital Marketing</mark>. Mengelola anggaran <mark>Meta Ads</mark> Rp20 juta/bulan. Menulis <mark>copywriting</mark> untuk 4 kampanye. <span class="miss">+ tambahkan: analisis data, SEO</span></p></div>
    </div>`,
    "pakai istilah yang sama dengan lowongan, selama memang sesuai pengalamanmu",
  );
}

/** 5. Cek akhir sebelum kirim. */
function checklist() {
  const c = [
    "Nama berkas: CV_Nama_Posisi.pdf",
    "Nomor HP dan surel aktif, sekali lagi dicek",
    "Tidak ada salah ketik (baca terbalik dari bawah)",
    "Posisi yang dilamar tertulis di ringkasan",
    "Tiga pencapaian terkuat ada di sepertiga atas halaman",
    "Dibuka di HP: masih terbaca jelas?",
  ];
  return card(
    "Sebelum menekan kirim",
    `<div class="ck">${c.map((x) => `<p><span>☐</span>${x}</p>`).join("")}</div>`,
  );
}

export const CV_FIGURES = {
  "tujuh-detik": {
    html: scan,
    alt: "Lembar CV dengan area yang paling dilihat rekruter: nama dan posisi, jabatan terakhir, dan dua baris pertama setiap pengalaman. Rata-rata 7,4 detik.",
  },
  "tugas-pencapaian": {
    html: rewrite,
    alt: "Tiga contoh baris CV diubah dari tugas menjadi pencapaian, misalnya mengelola media sosial menjadi meningkatkan pengikut 35% dalam 6 bulan.",
  },
  "ramah-ats": {
    html: ats,
    alt: "Format CV yang aman untuk sistem pelacak lamaran dan yang berisiko tidak terbaca, seperti dua kolom dan teks di dalam gambar.",
  },
  "kata-kunci": {
    html: keywords,
    alt: "Lowongan dan CV berdampingan dengan kata kunci yang cocok distabilo, serta dua kata kunci yang perlu ditambahkan.",
  },
  "cek-sebelum-kirim": {
    html: checklist,
    alt: "Enam hal yang dicek sebelum mengirim CV, dari nama berkas sampai tampilan di HP.",
  },
};

export const CV_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:12px;color:${C.ink};background:${C.desk}}
.in{padding:30px 34px 28px}
.tag{font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:${C.muted}}
h2{font-size:32px;font-weight:800;line-height:1.15;margin:6px 0 18px}
.note{font-family:SgHand,cursive;font-size:27px;color:${C.red};margin-top:14px;transform:rotate(-1deg)}
.sc{display:grid;grid-template-columns:330px 1fr;gap:24px;align-items:center}
.a4{position:relative;background:#fff;padding:20px 22px;box-shadow:0 8px 20px rgba(0,0,0,.12);display:flex;flex-direction:column;gap:6px;min-height:380px}
.hot{position:absolute;left:12px;right:12px;border-radius:12px;background:${C.yellow};opacity:.55}
.h1{top:12px;height:58px}.h2{top:150px;height:24px}.h3{top:176px;height:40px;opacity:.35}
.nm{position:relative;font-size:22px;letter-spacing:.04em}
.a4 small{position:relative;font-size:11px;color:${C.muted}}
.sec{position:relative;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-top:8px;color:${C.muted}}
.jt{position:relative;font-size:12px}
.ln{position:relative;display:block;height:7px;border-radius:4px;background:#c9cdd6}
.dim{opacity:.4}
.sl{display:grid;gap:12px;padding-left:22px}
.sl li{font-size:17px;line-height:1.4}
.sl li.dim{opacity:.55}
.rw{display:grid;gap:12px}
.rwr{display:grid;grid-template-columns:1fr 30px 1.3fr;align-items:center;gap:6px}
.old{background:#fff;padding:12px 14px;font-size:15px;color:${C.muted};text-decoration:line-through;text-decoration-color:${C.red}}
.new{background:#fff;padding:12px 14px;font-size:15px;font-weight:600;background-image:linear-gradient(transparent 0, ${C.green}80 0)}
.ar{text-align:center;font-size:22px;color:${C.red};font-weight:800}
.at{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.atc{background:#fff;padding:16px;border-top:6px solid #2f9e44}
.atc.n{border-top-color:${C.red}}
.atc h4{font-size:18px;margin-bottom:8px}
.atc p{font-size:15px;padding:6px 0;border-bottom:1px dashed ${C.line};line-height:1.35}
.kw{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.doc{background:#fff;padding:16px 18px;box-shadow:0 4px 10px rgba(0,0,0,.08)}
.doc h4{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};margin-bottom:8px}
.doc p{font-size:16px;line-height:1.7}
mark{background:${C.yellow};padding:0 2px}
mark.g{background:${C.green}}
.miss{display:block;font-family:SgHand,cursive;font-size:22px;color:${C.red};margin-top:6px}
.ck{background:#fff;padding:16px 20px;display:grid;gap:4px;box-shadow:0 4px 10px rgba(0,0,0,.08)}
.ck p{font-size:17px;padding:8px 0;border-bottom:1px solid ${C.line};display:flex;gap:10px;align-items:center}
.ck span{font-size:22px;color:${C.red}}
`;
