/**
 * Infografis "Stoik untuk Hidup Sehari-hari". Identitas visual: prasasti batu. Latar batu abu
 * hangat dengan serat halus, huruf kapital serif seperti dipahat (SgSerif, spasi lebar), aksen
 * perunggu, garis tipis seperti pahatan. Kutipan para Stoik diterjemahkan bebas (domain publik).
 */

const C = {
  stone: "#e8e4dc",
  stoneDk: "#cfc8bb",
  ink: "#2e2b27",
  bronze: "#a8743a",
  moss: "#5f6f52",
  fade: "#8f887c",
};

const card = (title, body, quote = "") => `
<div class="card"><div class="in">
  <div class="tag">PRASASTI · STOIK UNTUK HIDUP SEHARI-HARI</div>
  <h2>${title}</h2>
  <div class="rule"></div>
  ${body}
  ${quote ? `<p class="qt">${quote}</p>` : ""}
</div></div>`;

/** 1. Lingkaran kendali. */
function circles() {
  return card(
    "Lingkaran kendali",
    `<div class="lc">
      <div class="rings">
        <div class="r3"><span class="lb lb3">DI LUAR KENDALI</span>
          <div class="r2"><span class="lb lb2">BISA DIPENGARUHI</span>
            <div class="r1"><span class="lb lb1">DALAM KENDALI</span></div>
          </div>
        </div>
      </div>
      <div class="lists">
        <div><h4 class="c1">Dalam kendali</h4><p>Sikap, kata-kata, usaha, pilihan, cara menilai kejadian</p></div>
        <div><h4 class="c2">Bisa dipengaruhi</h4><p>Hasil kerja, kesehatan, hubungan, pendapat atasan</p></div>
        <div><h4 class="c3">Di luar kendali</h4><p>Cuaca, macet, masa lalu, pikiran orang lain, harga</p></div>
      </div>
    </div>`,
    "“Ada hal yang berada dalam kuasa kita, dan ada yang tidak.” — Epiktetos, Enchiridion 1",
  );
}

/** 2. Kejadian → penilaian → perasaan. */
function judgment() {
  const rows = [
    [
      "Macet satu jam",
      "“Hariku rusak.”",
      "Kesal sepanjang pagi",
      "“Satu jam untuk podcast yang tertunda.”",
      "Tenang",
    ],
    [
      "Pesan tidak dibalas",
      "“Dia tidak menghargaiku.”",
      "Tersinggung",
      "“Mungkin dia sedang sibuk.”",
      "Biasa saja",
    ],
  ];
  return card(
    "Bukan kejadiannya, tapi penilaiannya",
    `<div class="jd">
      <div class="jh"><span>KEJADIAN</span><span>PENILAIAN</span><span>PERASAAN</span></div>
      ${rows
        .map(
          ([e, a, fa, b, fb]) => `<div class="jr">
        <div class="ev">${e}</div>
        <div class="pair"><div class="old"><span>${a}</span><em>${fa}</em></div><div class="new"><span>${b}</span><em>${fb}</em></div></div>
      </div>`,
        )
        .join("")}
    </div>`,
    "“Manusia terganggu bukan oleh peristiwa, melainkan oleh pandangan mereka tentang peristiwa itu.” — Epiktetos, Enchiridion 5",
  );
}

/** 3. Pagi dan malam: dua halaman jurnal. */
function journal() {
  return card(
    "Dua halaman sehari",
    `<div class="jn">
      <div class="pg"><h4>PAGI · 5 MENIT</h4><ol><li>Hal sulit apa yang mungkin kutemui hari ini?</li><li>Bagaimana aku ingin menanggapinya?</li><li>Satu hal dalam kendaliku yang akan kukerjakan sepenuh hati.</li></ol></div>
      <div class="pg"><h4>MALAM · 5 MENIT</h4><ol><li>Apa yang kulakukan dengan baik?</li><li>Di mana aku bereaksi berlebihan?</li><li>Apa yang akan kulakukan berbeda besok?</li></ol></div>
    </div>`,
    "Marcus Aurelius menulis catatan pribadinya untuk dirinya sendiri, bukan untuk dibaca orang lain.",
  );
}

/** 4. Latihan skenario terburuk. */
function premed() {
  const s = [
    ["Sebutkan", "Tulis hal yang dikhawatirkan dengan jelas."],
    ["Bayangkan", "Jika terjadi, apa yang sebenarnya akan berubah?"],
    ["Siapkan", "Satu langkah kalau itu terjadi."],
    ["Kembali", "Satu hal dalam kendali hari ini. Lalu lepaskan."],
  ];
  return card(
    "Membayangkan yang terburuk, dengan tenang",
    `<div class="pm">${s.map(([a, b], i) => `<div class="pmi"><span class="num">${["I", "II", "III", "IV"][i]}</span><h4>${a}</h4><p>${b}</p></div>`).join("")}</div>`,
    "Seneca menganjurkan membayangkan kesulitan sebelum datang, supaya ia tidak menemukan kita tanpa persiapan.",
  );
}

/** 5. Tiga disiplin dalam satu minggu. */
function week() {
  const rows = [
    ["Senin", "Pilah tiga kekhawatiran ke lingkaran kendali"],
    ["Selasa", "Tangkap satu penilaian otomatis dan tulis versi lain"],
    ["Rabu", "Latihan skenario terburuk untuk satu hal"],
    ["Kamis", "Satu hari tanpa mengeluh tentang hal di luar kendali"],
    ["Jumat", "Lakukan satu kebaikan kecil tanpa dibicarakan"],
    ["Akhir pekan", "Jurnal malam: apa yang berubah minggu ini?"],
  ];
  return card(
    "Satu minggu latihan",
    `<div class="wk">${rows.map(([d, t]) => `<div class="wr"><b>${d}</b><span>${t}</span></div>`).join("")}</div>`,
  );
}

/** 7. Empat kebajikan sebagai kompas. */
function virtues() {
  const v = [
    [
      "KEBIJAKSANAAN",
      "Melihat keadaan apa adanya dan memilih yang paling baik untuk dilakukan.",
      "Rapat mendadak: tanyakan dulu tujuannya sebelum bereaksi.",
    ],
    [
      "KEBERANIAN",
      "Melakukan yang benar walau takut atau tidak nyaman.",
      "Mengakui kesalahan laporan sebelum ada yang menemukannya.",
    ],
    [
      "KEADILAN",
      "Memperlakukan orang lain dengan pantas dan jujur.",
      "Menyebut nama rekan yang ikut bekerja saat proyek dipuji.",
    ],
    [
      "PENGENDALIAN DIRI",
      "Ukuran yang pas: tidak berlebihan, tidak kekurangan.",
      "Satu jam media sosial, bukan tiga, setelah hari yang berat.",
    ],
  ];
  return card(
    "Empat kebajikan",
    `<div class="vt">${v
      .map(([a, b, c]) => `<div class="vti"><h4>${a}</h4><p>${b}</p><small>${c}</small></div>`)
      .join("")}</div>`,
    "\u201cKebajikan saja sudah cukup untuk hidup yang baik.\u201d Ringkasan ajaran Stoa, diterjemahkan bebas.",
  );
}

export const STOIK_FIGURES = {
  "empat-kebajikan": {
    html: virtues,
    alt: "Empat kebajikan Stoik: kebijaksanaan, keberanian, keadilan, dan pengendalian diri, masing-masing dengan arti dan contoh sehari-hari.",
  },
  "lingkaran-kendali": {
    html: circles,
    alt: "Tiga lingkaran: dalam kendali (sikap, kata, usaha), bisa dipengaruhi (hasil kerja, kesehatan), di luar kendali (cuaca, macet, pikiran orang lain).",
  },
  penilaian: {
    html: judgment,
    alt: "Dua contoh kejadian dengan dua penilaian berbeda: macet satu jam dinilai 'hariku rusak' membuat kesal, dinilai 'waktu untuk podcast' membuat tenang.",
  },
  "jurnal-pagi-malam": {
    html: journal,
    alt: "Dua halaman jurnal lima menit: tiga pertanyaan pagi dan tiga pertanyaan malam.",
  },
  "skenario-terburuk": {
    html: premed,
    alt: "Empat langkah latihan skenario terburuk: sebutkan, bayangkan, siapkan satu langkah, kembali ke yang dalam kendali.",
  },
  "minggu-latihan": {
    html: week,
    alt: "Jadwal latihan stoik satu minggu dari Senin sampai akhir pekan.",
  },
};

export const STOIK_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:4px;color:${C.ink};
  background:radial-gradient(120% 90% at 20% 0%, #f1eee8 0%, ${C.stone} 55%, ${C.stoneDk} 100%);
  box-shadow:inset 0 0 0 1px #bdb5a6, inset 0 0 0 8px ${C.stone}, inset 0 0 0 9px #bdb5a6}
.in{padding:38px 40px 32px}
.tag{font-size:11px;letter-spacing:.28em;color:${C.bronze};font-weight:700}
h2{font-family:SgSerif,serif;font-weight:400;font-size:36px;letter-spacing:.06em;text-transform:uppercase;line-height:1.15;margin-top:10px;text-shadow:0 1px 0 #fff}
.rule{height:2px;background:linear-gradient(90deg,${C.bronze},transparent);margin:14px 0 20px;width:60%}
.qt{font-family:SgSerif,serif;font-style:italic;font-size:19px;line-height:1.45;color:#5a5348;margin-top:20px;border-left:3px solid ${C.bronze};padding-left:14px}
.lc{display:grid;grid-template-columns:300px 1fr;gap:26px;align-items:center}
.rings{width:300px;height:300px}
.r3,.r2,.r1{position:relative;border-radius:50%;display:flex;align-items:center;justify-content:center}
.r3{width:300px;height:300px;background:#d9d3c7;box-shadow:inset 0 0 0 2px #b4ab9b}
.r2{width:206px;height:206px;background:#ece7dd;box-shadow:inset 0 0 0 2px #b4ab9b}
.r1{width:112px;height:112px;background:${C.moss};box-shadow:0 4px 10px rgba(0,0,0,.2)}
.lb{position:absolute;font-size:10px;letter-spacing:.16em;font-weight:800;white-space:nowrap}
.lb3{top:16px;color:${C.fade}}
.lb2{top:14px;color:${C.bronze}}
.lb1{color:#fff;position:static;font-size:10px}
.lists{display:grid;gap:14px}
.lists h4{font-family:SgSerif,serif;font-weight:400;font-size:20px;letter-spacing:.04em}
.lists p{font-size:15px;line-height:1.45;margin-top:2px}
.c1{color:${C.moss}}.c2{color:${C.bronze}}.c3{color:${C.fade}}
.jd{display:grid;gap:12px}
.jh{display:grid;grid-template-columns:150px 1fr 120px;font-size:11px;letter-spacing:.2em;font-weight:800;color:${C.bronze}}
.jr{display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:stretch}
.ev{background:${C.ink};color:${C.stone};font-family:SgSerif,serif;font-size:19px;padding:14px;display:flex;align-items:center}
.pair{display:grid;gap:6px}
.old,.new{display:grid;grid-template-columns:1fr 120px;gap:10px;align-items:center;padding:10px 12px;font-size:16px}
.old{background:#ddd6ca;color:#6d665b;text-decoration:line-through;text-decoration-color:#a59d8f}
.new{background:#f6f3ed;border-left:4px solid ${C.moss}}
.old em,.new em{font-style:normal;font-weight:700;font-size:14px}
.new em{color:${C.moss}}
.jn{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.pg{background:#f6f3ed;padding:18px;box-shadow:0 1px 0 #bdb5a6}
.pg h4{font-size:12px;letter-spacing:.2em;color:${C.bronze};margin-bottom:10px}
.pg ol{padding-left:20px;display:grid;gap:8px}
.pg li{font-family:SgSerif,serif;font-size:18px;line-height:1.35}
.pm{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.pmi{background:#f6f3ed;padding:16px 12px;text-align:center;box-shadow:0 1px 0 #bdb5a6}
.num{font-family:SgSerif,serif;font-size:34px;color:${C.bronze}}
.pmi h4{font-size:13px;letter-spacing:.2em;text-transform:uppercase;margin-top:6px}
.pmi p{font-size:14px;line-height:1.4;margin-top:6px}
.wk{display:grid;gap:8px}
.wr{display:grid;grid-template-columns:140px 1fr;align-items:center;background:#f6f3ed;box-shadow:0 1px 0 #bdb5a6}
.wr b{font-family:SgSerif,serif;font-weight:400;font-size:18px;letter-spacing:.06em;text-transform:uppercase;background:${C.ink};color:${C.stone};padding:12px 14px}
.wr span{font-size:16px;padding:10px 16px}
.vt{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.vti{border-top:2px solid ${C.bronze};padding-top:12px}
.vti h4{font-family:SgSerif,serif;font-weight:400;font-size:20px;letter-spacing:.12em;color:${C.ink}}
.vti p{font-size:15px;line-height:1.45;margin-top:6px}
.vti small{display:block;font-size:13px;color:${C.moss};margin-top:6px;font-style:italic}
`;
