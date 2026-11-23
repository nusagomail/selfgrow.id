/**
 * Infografis "Lolos Wawancara Kerja". Identitas visual: naskah yang dikoreksi. Kertas putih
 * gading bergaris tepi kiri, teks huruf mesin ketik (SgMono), coretan dan lingkaran spidol merah
 * dengan catatan tulisan tangan (SgHand), seperti naskah latihan yang dibaca ulang pelatih.
 */

const C = {
  page: "#fbf8f1",
  ink: "#26231f",
  mute: "#7d756b",
  red: "#c62f22",
  teal: "#2b6777",
  line: "#e6ddcf",
  margin: "#e9a5a0",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="mg"></div><div class="in">
  <div class="tag">NASKAH LATIHAN · WAWANCARA</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Rumus satu menit. */
function oneMinute() {
  const seg = (label, sec, w, ex, c) =>
    `<div class="seg" style="width:${w}%"><div class="sb" style="background:${c}"><b>${label}</b><span>${sec}</span></div><p>${ex}</p></div>`;
  return card(
    "Jawaban satu menit: kini, dulu, nanti",
    `<div class="segs">
      ${seg("KINI", "± 15 detik", 25, '"Lulusan teknik industri yang paling senang dengan masalah persediaan."', C.teal)}
      ${seg("DULU", "± 30 detik", 50, '"Magang 3 bulan di gudang minuman: tata letak rak baru, waktu ambil barang turun sekitar seperlima."', C.ink)}
      ${seg("NANTI", "± 15 detik", 25, '"Ingin belajar perencanaan stok di jaringan gudang regional."', C.red)}
    </div>
    <div class="note">umur, asal, hobi? <span>coret!</span></div>`,
    "Hafalkan tiga poinnya, bukan kalimatnya.",
  );
}

/** 2. Anatomi STAR. */
function star() {
  const part = (k, t, d, w, hl) =>
    `<div class="st${hl ? " hl" : ""}"><span class="k">${k}</span><div><b>${t}</b><p>${d}</p></div><div class="w"><i style="width:${w}%"></i></div></div>`;
  return card(
    "Anatomi cerita STAR",
    `<div class="stars">
      ${part("S", "Situasi", "Tugas akhir semester 6, kelompok 5 orang, 2 minggu sebelum tenggat.", 15)}
      ${part("T", "Tugas", "Sebagai ketua, memastikan tugas selesai tepat waktu.", 10)}
      ${part("A", "Aksi", "Menemui anggota yang menghilang, membagi ulang tugas, membuat cek singkat 2× seminggu.", 55, true)}
      ${part("R", "Hasil", "Selesai 2 hari lebih awal, nilai A. Pelajaran: cari tahu dulu sebelum menilai.", 20)}
    </div>
    <div class="note r">aksi paling panjang &amp; pakai "saya"</div>`,
    "Panjang batang menunjukkan porsi cerita.",
  );
}

/** 3. Peta riset. */
function research() {
  const rows = [
    ["Apa yang dijual, untuk siapa?", "situs resmi", "8'"],
    ["Berita 6–12 bulan terakhir", "berita daring", "8'"],
    ["Kata karyawannya", "LinkedIn, ulasan", "5'"],
    ["Tugas harian posisi ini", "iklan lowongan", "5'"],
    ["Siapa pewawancaranya", "undangan, LinkedIn", "4'"],
  ];
  return card(
    "Riset tiga puluh menit",
    `<div class="rs">${rows
      .map(
        ([q, s, t], i) =>
          `<div class="rr"><span class="n">${i + 1}.</span><b>${q}</b><small>${s}</small><span class="t">${t}</span></div>`,
      )
      .join("")}</div>
    <div class="note">pakai secukupnya, saat relevan</div>`,
    "Total sekitar 30 menit, malam sebelum wawancara.",
  );
}

export const WAWANCARA_FIGURES = {
  "rumus-satu-menit": {
    html: oneMinute,
    alt: "Batang waktu satu menit dibagi tiga: kini sekitar 15 detik, dulu sekitar 30 detik, nanti sekitar 15 detik, masing-masing dengan contoh kalimat Yoga.",
  },
  "anatomi-star": {
    html: star,
    alt: "Empat bagian cerita STAR (situasi, tugas, aksi, hasil) dengan contoh Yoga; bagian aksi paling panjang.",
  },
  "peta-riset": {
    html: research,
    alt: "Lima pertanyaan riset sebelum wawancara dengan sumber dan perkiraan menitnya, total sekitar tiga puluh menit.",
  },
};

export const WAWANCARA_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;border-radius:8px;color:${C.ink};background:${C.page};
  background-image:repeating-linear-gradient(180deg,transparent 0 33px,${C.line} 33px 34px);box-shadow:0 0 0 1px ${C.line},0 10px 22px -14px rgba(0,0,0,.35)}
.mg{position:absolute;left:52px;top:0;bottom:0;width:2px;background:${C.margin}}
.in{position:relative;padding:28px 34px 26px 76px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.14em;color:${C.mute}}
h2{font-family:SgMono,monospace;font-weight:700;font-size:27px;line-height:1.2;margin:8px 0 22px}
.foot{margin-top:18px;font-size:14px;color:${C.mute};font-family:SgMono,monospace}
.note{font-family:SgHand,cursive;color:${C.red};font-size:28px;margin-top:14px;transform:rotate(-2deg)}
.note span{border:3px solid ${C.red};border-radius:50%;padding:0 12px}
.note.r{text-align:right}
.segs{display:flex;gap:8px}
.seg{display:flex;flex-direction:column;gap:8px}
.sb{color:#fff;border-radius:6px;padding:10px 12px;display:flex;flex-direction:column}
.sb b{font-family:SgMono,monospace;font-size:18px;letter-spacing:.08em}
.sb span{font-size:13px;opacity:.85}
.seg p{font-family:SgMono,monospace;font-size:13px;line-height:1.45;color:${C.ink}}
.stars{display:grid;gap:10px}
.st{display:grid;grid-template-columns:44px 1fr 150px;gap:14px;align-items:center;background:#fff;border:1px solid ${C.line};border-radius:8px;padding:10px 12px}
.st.hl{border:3px solid ${C.red}}
.k{width:44px;height:44px;border-radius:50%;background:${C.ink};color:#fff;font-family:SgMono,monospace;font-weight:700;font-size:20px;display:grid;place-items:center}
.st.hl .k{background:${C.red}}
.st b{font-size:17px}.st p{font-family:SgMono,monospace;font-size:13px;line-height:1.4;color:${C.mute};margin-top:2px}
.w{height:12px;background:#f0e9de;border-radius:6px;overflow:hidden}
.w i{display:block;height:100%;background:${C.teal}}
.st.hl .w i{background:${C.red}}
.rs{display:grid;gap:4px}
.rr{display:grid;grid-template-columns:30px 1fr 170px 40px;align-items:baseline;gap:10px;padding:6px 0;border-bottom:1px dashed ${C.line}}
.n{font-family:SgMono,monospace;color:${C.mute}}
.rr b{font-size:17px}
.rr small{font-family:SgMono,monospace;font-size:13px;color:${C.teal}}
.t{font-family:SgHand,cursive;font-size:26px;color:${C.red};text-align:right}
`;
