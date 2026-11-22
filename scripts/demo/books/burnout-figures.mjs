/**
 * Infografis "Burnout Bukan Lemah". Identitas visual: langit senja. Gradasi persik ke lavender,
 * kartu membulat lembut, judul serif miring (SgSerif), aksen bara oranye untuk yang terkuras dan
 * hijau sage untuk pemulihan. Tenang, tidak menghakimi, tidak bergaya kantor.
 */

const C = {
  ink: "#3a2f3f",
  ember: "#e0703b",
  ash: "#9d8f9f",
  sage: "#6f9a7c",
  peach: "#ffd9c2",
  lav: "#e5dcf3",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">Catatan senja · Burnout Bukan Lemah</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Tiga tanda burnout menurut WHO. */
function signs() {
  const s = [
    ["Terkuras", "Energi habis, dan tidur atau libur tidak lagi memulihkan.", "🪫"],
    ["Menjauh", "Sinis, mati rasa, atau ingin menjaga jarak dari pekerjaan.", "🌫️"],
    ["Tidak berdaya", "Merasa hasil kerja tidak berarti atau kemampuan menurun.", "🥀"],
  ];
  return card(
    "Tiga tanda, bukan satu",
    `<div class="sg">${s.map(([t, d, e]) => `<div class="sgi"><span class="em">${e}</span><h4>${t}</h4><p>${d}</p></div>`).join("")}</div>`,
    "WHO (ICD-11): burnout adalah fenomena pekerjaan akibat stres kerja kronis yang tidak terkelola, bukan kelemahan pribadi.",
  );
}

/** 2. Minggu Nadia: baterai yang terus turun. */
function week() {
  const d = [
    ["Sen", 80],
    ["Sel", 62],
    ["Rab", 45],
    ["Kam", 25],
    ["Jum", 8],
    ["Sab", 20],
    ["Min", 34],
  ];
  return card(
    "Minggu yang tidak pernah terisi penuh",
    `<div class="wk">${d
      .map(
        ([n, v]) =>
          `<div class="bat"><div class="cap"></div><div class="cell"><div class="fill" style="height:${v}%;background:${v < 30 ? C.ember : C.sage}"></div></div><b>${n}</b><small>${v}%</small></div>`,
      )
      .join("")}</div>`,
    "Akhir pekan hanya mengisi sedikit. Senin berikutnya dimulai dari angka yang lebih rendah.",
  );
}

/** 3. Empat jenis pemulihan. */
function recovery() {
  const r = [
    [
      "Lepas",
      "Tidak memikirkan dan tidak membuka urusan kerja.",
      "Matikan notifikasi kerja setelah jam 19.00",
    ],
    [
      "Rileks",
      "Kegiatan yang menenangkan badan dan pikiran.",
      "Jalan sore, mandi air hangat, musik",
    ],
    [
      "Belajar",
      "Hal baru yang menantang tapi bukan pekerjaan.",
      "Masak resep baru, alat musik, olahraga",
    ],
    [
      "Kendali",
      "Memutuskan sendiri cara memakai waktu luang.",
      "Hari Minggu tanpa jadwal dari orang lain",
    ],
  ];
  return card(
    "Empat jenis pemulihan",
    `<div class="rc">${r.map(([t, d, e]) => `<div class="rci"><h4>${t}</h4><p>${d}</p><em>${e}</em></div>`).join("")}</div>`,
    "Tidur itu penting, tapi bukan satu-satunya cara mengisi ulang.",
  );
}

/** 4. Kendali dan beban: apa yang bisa diubah. */
function levers() {
  const l = [
    ["Beban", "Berapa banyak yang harus dikerjakan", "Minta prioritas tertulis dari atasan"],
    ["Kendali", "Seberapa bebas menentukan caranya", "Usulkan satu blok kerja tanpa rapat"],
    ["Penghargaan", "Apakah usaha terlihat dan dihargai", "Catat dan sampaikan hasil kerja"],
    ["Rekan", "Dukungan dari orang di sekitar", "Satu orang yang bisa diajak bicara jujur"],
    ["Keadilan", "Apakah aturan berlaku sama", "Tanyakan kriteria pembagian tugas"],
    [
      "Nilai",
      "Apakah pekerjaan sejalan dengan yang kamu anggap penting",
      "Temukan satu bagian kerja yang bermakna",
    ],
  ];
  return card(
    "Burnout tumbuh di lingkungan, bukan hanya di dalam diri",
    `<div class="lv">${l.map(([t, d, a]) => `<div class="lvi"><b>${t}</b><span>${d}</span><em>${a}</em></div>`).join("")}</div>`,
    "Enam area yang sering diteliti sebagai sumber burnout. Pilih satu yang paling bisa kamu ubah.",
  );
}

/** 5. Rencana pulih 14 hari. */
function plan() {
  const p = [
    ["Hari 1–3", "Kurangi yang menguras: jam berhenti kerja yang jelas, notifikasi mati."],
    ["Hari 4–7", "Tambahkan satu pemulihan harian: 20 menit tanpa layar."],
    ["Hari 8–10", "Bicarakan beban kerja dengan atasan, dengan data."],
    ["Hari 11–14", "Rencanakan cuti, sekecil apa pun, dan lindungi tanggalnya."],
  ];
  return card(
    "Dua minggu pertama",
    `<div class="pl">${p.map(([d, t], i) => `<div class="pli"><span class="dot" style="background:${[C.ember, "#e99b6c", "#a8b98f", C.sage][i]}"></span><b>${d}</b><p>${t}</p></div>`).join("")}</div>`,
    "Kalau lelahmu disertai sedih yang dalam, tidak bisa tidur berminggu-minggu, atau pikiran menyakiti diri, segera cari bantuan profesional.",
  );
}

/** 7. Timbangan tuntutan dan bekal (model JD-R). */
function balance() {
  const dem = [
    "Tiket per orang naik 40%",
    "Dua posisi kosong 4 bulan",
    "Target waktu respons dipercepat",
    "Grup kerja aktif sampai malam",
  ];
  const res = [
    "Atasan yang mau mendengar",
    "Rekan yang saling bantu",
    "Kendali atas jadwal",
    "Pengakuan atas hasil kerja",
  ];
  return card(
    "Tuntutan naik, bekal menipis",
    `<div class="bl">
      <div class="bp dem"><h4>Tuntutan</h4>${dem.map((x) => `<p>${x}</p>`).join("")}</div>
      <div class="bbeam"><span></span></div>
      <div class="bp res"><h4>Bekal</h4>${res.map((x, i) => `<p class="${i < 2 ? "" : "gone"}">${x}</p>`).join("")}</div>
    </div>`,
    "Burnout tumbuh ketika tuntutan terus tinggi sementara bekal untuk menghadapinya menipis (model Job Demands–Resources, Bakker & Demerouti, 2007). Coretan menandai bekal yang hilang di tim Nadia.",
  );
}

export const BURNOUT_FIGURES = {
  "tuntutan-bekal": {
    html: balance,
    alt: "Timbangan miring: empat tuntutan kerja yang naik di satu sisi, empat bekal kerja di sisi lain dengan dua yang dicoret karena hilang.",
  },
  "tiga-tanda": {
    html: signs,
    alt: "Tiga tanda burnout menurut WHO: terkuras, menjauh dari pekerjaan, dan merasa tidak berdaya.",
  },
  "baterai-minggu": {
    html: week,
    alt: "Tujuh baterai dari Senin 80% turun ke Jumat 8%, akhir pekan hanya naik ke 20–34%.",
  },
  "empat-pemulihan": {
    html: recovery,
    alt: "Empat jenis pemulihan: lepas dari urusan kerja, rileks, belajar hal baru, dan memegang kendali atas waktu luang.",
  },
  "enam-area": {
    html: levers,
    alt: "Enam area kerja yang memengaruhi burnout: beban, kendali, penghargaan, rekan, keadilan, dan nilai, masing-masing dengan satu langkah.",
  },
  "rencana-14-hari": {
    html: plan,
    alt: "Rencana pemulihan dua minggu dalam empat tahap, dari mengurangi yang menguras sampai merencanakan cuti.",
  },
};

export const BURNOUT_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:26px;color:${C.ink};background:linear-gradient(160deg, ${C.peach} 0%, #f6dfe3 45%, ${C.lav} 100%)}
.in{padding:34px 36px 30px}
.tag{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#a0607a}
h2{font-family:SgSerif,serif;font-weight:400;font-style:italic;font-size:36px;line-height:1.12;margin:8px 0 20px}
.foot{margin-top:16px;font-size:15px;line-height:1.45;color:#5c4f60}
.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.sgi{background:rgba(255,255,255,.7);border-radius:20px;padding:18px 16px}
.em{font-size:34px}
.sgi h4{font-family:SgSerif,serif;font-weight:400;font-size:24px;margin-top:6px}
.sgi p{font-size:15px;line-height:1.4;margin-top:6px}
.wk{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;align-items:end}
.bat{display:flex;flex-direction:column;align-items:center;gap:4px}
.cap{width:22px;height:8px;border-radius:3px 3px 0 0;background:${C.ink}}
.cell{position:relative;width:56px;height:170px;border:4px solid ${C.ink};border-radius:10px;background:rgba(255,255,255,.6);overflow:hidden;display:flex;align-items:flex-end}
.fill{width:100%;border-radius:4px}
.bat b{font-size:16px}
.bat small{font-size:13px;color:#6d5f70}
.rc{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.rci{background:rgba(255,255,255,.72);border-radius:20px;padding:16px 18px;border-left:6px solid ${C.sage}}
.rci h4{font-family:SgSerif,serif;font-weight:400;font-size:26px}
.rci p{font-size:15px;line-height:1.4;margin-top:4px}
.rci em{display:block;font-style:normal;font-size:14px;color:${C.sage};font-weight:700;margin-top:8px}
.lv{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.lvi{background:rgba(255,255,255,.72);border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:3px}
.lvi b{font-family:SgSerif,serif;font-weight:400;font-size:22px}
.lvi span{font-size:14px;line-height:1.35}
.lvi em{font-style:normal;font-size:13px;font-weight:700;color:${C.ember}}
.pl{display:grid;gap:10px}
.pli{display:grid;grid-template-columns:20px 110px 1fr;gap:12px;align-items:center;background:rgba(255,255,255,.72);border-radius:16px;padding:14px 16px}
.dot{width:18px;height:18px;border-radius:50%}
.pli b{font-family:SgSerif,serif;font-weight:400;font-size:20px}
.pli p{font-size:15px;line-height:1.4}
.bl{display:grid;grid-template-columns:1fr 60px 1fr;gap:10px;align-items:end;padding:30px 0 40px}
.bp{background:rgba(255,255,255,.75);border-radius:20px;padding:16px;display:grid;gap:8px}
.bp.dem{transform:translateY(26px);border-top:6px solid ${C.ember}}
.bp.res{transform:translateY(-26px);border-top:6px solid ${C.sage}}
.bp h4{font-family:SgSerif,serif;font-weight:400;font-size:24px}
.bp p{font-size:15px;line-height:1.35}
.bp p.gone{text-decoration:line-through;text-decoration-color:${C.ember};color:${C.ash}}
.bbeam{height:100%;display:flex;align-items:center;justify-content:center}
.bbeam span{display:block;width:8px;height:120px;border-radius:4px;background:${C.ink};opacity:.6}
`;
