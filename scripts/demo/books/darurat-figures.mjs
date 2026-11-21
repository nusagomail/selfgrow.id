/**
 * Infografis "Dana Darurat dari Nol". Identitas visual: buku tabungan bank. Halaman berpola
 * pengaman (guilloche) hijau pucat, baris transaksi tercetak huruf mesin (SgMono), tinta biru
 * bank, cap stempel biru. Tenang, rapi, dan bisa dipercaya: rasa aman yang ingin dibangun buku ini.
 */

const C = {
  page: "#f5f9f4",
  blue: "#1f4e79",
  green: "#3f8f6b",
  red: "#b5473a",
  line: "#c9d9cf",
  ink: "#1e2a33",
};

const rp = (n) => n.toLocaleString("id-ID");

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="tag">Buku tabungan · Dana Darurat dari Nol</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Tiga tangga dana darurat. */
function stairs() {
  const s = [
    ["1", "Dana darurat mini", "Rp1 juta", "Ban bocor, obat, servis kecil", 34],
    ["2", "Satu bulan pengeluaran", "Rp3,5 juta", "Telat gajian, perbaikan besar", 62],
    ["3", "Target penuh", "Rp10,5 juta", "3–9 bulan pengeluaran wajib", 100],
  ];
  return card(
    "Tiga tangga, bukan satu lompatan",
    `<div class="st">${s
      .map(
        ([n, t, v, d, h]) =>
          `<div class="step" style="height:${120 + h * 1.4}px"><span class="sn">${n}</span><b>${t}</b><em>${v}</em><small>${d}</small></div>`,
      )
      .join("")}</div>`,
    "Contoh Bagas: pengeluaran wajib Rp3,5 juta per bulan, lajang, target 3 bulan.",
  );
}

/** 2. Halaman buku tabungan Bagas. */
function passbook() {
  const rows = [
    ["01-02", "SETORAN OTOMATIS", 300000, 300000],
    ["01-03", "SETORAN OTOMATIS", 300000, 600000],
    ["28-03", "SISIHAN THR 50%", 1000000, 1600000],
    ["01-04", "SETORAN OTOMATIS", 300000, 1900000],
    ["12-04", "TARIK: LAYAR HP", -650000, 1250000],
    ["01-05", "SETORAN OTOMATIS", 300000, 1550000],
  ];
  return card(
    "Lima bulan pertama Bagas",
    `<div class="pb">
      <div class="pbh"><span>TGL</span><span>KETERANGAN</span><span>MUTASI</span><span>SALDO</span></div>
      ${rows
        .map(
          ([d, k, m, s]) =>
            `<div class="pbr${m < 0 ? " out" : ""}"><span>${d}</span><span>${k}</span><span>${m < 0 ? "-" : "+"}${rp(Math.abs(m))}</span><span>${rp(s)}</span></div>`,
        )
        .join("")}
      <div class="stamp">TANPA<br>UTANG</div>
    </div>`,
    "Layar HP pecah dibayar dari dana darurat, bukan paylater. Setelah itu, setoran lanjut seperti biasa.",
  );
}

/** 3. Di mana menyimpan dana darurat. */
function where() {
  const rows = [
    [
      "Tabungan terpisah (bank berbeda)",
      "Mudah diambil, dijamin LPS sesuai syarat",
      "Tangga 1–2",
      "ok",
    ],
    [
      "Deposito tenor pendek",
      "Bunga sedikit lebih tinggi, ada penalti bila dicairkan awal",
      "Sebagian tangga 3",
      "ok",
    ],
    [
      "Reksa dana pasar uang",
      "Risiko rendah, cair 1–2 hari kerja, tidak dijamin LPS",
      "Sebagian tangga 3",
      "ok",
    ],
    [
      "Saham, kripto, emas untuk trading",
      "Nilai bisa turun tepat saat dibutuhkan",
      "Bukan untuk dana darurat",
      "no",
    ],
    [
      "Dompet digital / rekening belanja",
      "Terlalu mudah terpakai tanpa sadar",
      "Bukan untuk dana darurat",
      "no",
    ],
  ];
  return card(
    "Di mana menyimpannya?",
    `<div class="wh">${rows.map(([a, b, c, k]) => `<div class="whr ${k}"><b>${a}</b><span>${b}</span><em>${c}</em></div>`).join("")}</div>`,
    "Syarat dana darurat: aman, mudah diambil, dan tidak tercampur dengan uang belanja.",
  );
}

/** 4. Darurat atau bukan. */
function emergency() {
  const yes = [
    "Sakit atau kecelakaan",
    "Kehilangan pekerjaan",
    "Kendaraan kerja rusak",
    "Perbaikan rumah mendesak",
    "Keluarga inti butuh bantuan mendesak",
  ];
  const no = [
    "Diskon besar akhir bulan",
    "Liburan yang sudah direncanakan",
    "HP baru karena model lama",
    "Hadiah ulang tahun",
    "Investasi yang “sedang naik”",
  ];
  return card(
    "Darurat, atau hanya mendesak?",
    `<div class="em">
      <div class="emc y"><h4>Boleh pakai</h4>${yes.map((x) => `<p>✓ ${x}</p>`).join("")}</div>
      <div class="emc n"><h4>Bukan darurat</h4>${no.map((x) => `<p>✕ ${x}</p>`).join("")}</div>
    </div>`,
    "Tiga pertanyaan: Apakah tidak terduga? Apakah perlu sekarang? Apakah benar-benar perlu?",
  );
}

/** 5. Isi ulang setelah dipakai. */
function refill() {
  const s = [
    ["Catat", "Tulis berapa yang dipakai dan untuk apa."],
    ["Jeda", "Tunda tabungan lain sementara; isi ulang dana darurat lebih dulu."],
    ["Gandakan", "Naikkan setoran sampai saldo kembali ke tangga sebelumnya."],
    ["Lanjut", "Kembali ke setoran biasa dan tangga berikutnya."],
  ];
  return card(
    "Setelah dipakai, isi ulang",
    `<div class="rf">${s.map(([a, b], i) => `<div class="rfi"><span>${i + 1}</span><b>${a}</b><p>${b}</p></div>`).join("")}</div>`,
  );
}

export const DARURAT_FIGURES = {
  "tiga-tangga": {
    html: stairs,
    alt: "Tiga tangga dana darurat Bagas: mini Rp1 juta, satu bulan pengeluaran Rp3,5 juta, target penuh Rp10,5 juta.",
  },
  "buku-tabungan": {
    html: passbook,
    alt: "Halaman buku tabungan Bagas: setoran otomatis Rp300.000 per bulan, sisihan THR Rp1 juta, penarikan Rp650.000 untuk layar HP, saldo Rp1.550.000.",
  },
  "tempat-simpan": {
    html: where,
    alt: "Tabel tempat menyimpan dana darurat: tabungan terpisah, deposito tenor pendek, reksa dana pasar uang cocok; saham, kripto, dan dompet digital tidak.",
  },
  "darurat-bukan": {
    html: emergency,
    alt: "Dua kolom: kejadian yang boleh memakai dana darurat seperti sakit dan kehilangan pekerjaan, dan yang bukan seperti diskon atau liburan.",
  },
  "isi-ulang": {
    html: refill,
    alt: "Empat langkah mengisi ulang dana darurat setelah dipakai: catat, jeda tabungan lain, gandakan setoran, lanjut.",
  },
};

export const DARURAT_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:10px;color:${C.ink};background:${C.page};
  background-image:repeating-radial-gradient(circle at 0 0, transparent 0 14px, rgba(63,143,107,.07) 14px 15px),repeating-radial-gradient(circle at 100% 100%, transparent 0 14px, rgba(31,78,121,.06) 14px 15px);
  border:2px solid ${C.blue}}
.in{padding:30px 34px 28px}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${C.green}}
h2{font-size:32px;font-weight:800;color:${C.blue};line-height:1.15;margin:6px 0 20px}
.foot{margin-top:16px;font-size:15px;line-height:1.45;border-top:1px dashed ${C.blue};padding-top:10px;color:#3d4b55}
.st{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;align-items:end}
.step{background:#fff;border:2px solid ${C.blue};border-radius:8px 8px 0 0;padding:14px;display:flex;flex-direction:column;justify-content:flex-end;gap:4px}
.step:last-child{background:${C.blue};color:#fff}
.sn{font-family:SgMono,monospace;font-size:13px;color:${C.green}}
.step:last-child .sn{color:#bfe3d2}
.step b{font-size:17px}
.step em{font-style:normal;font-family:SgMono,monospace;font-size:24px;font-weight:500}
.step small{font-size:13px;opacity:.85;line-height:1.35}
.pb{position:relative;background:#fff;border:1px solid ${C.line};font-family:SgMono,monospace;font-size:14px}
.pbh,.pbr{display:grid;grid-template-columns:70px 1fr 120px 120px;padding:8px 12px}
.pbh{background:${C.blue};color:#fff;font-size:12px;letter-spacing:.08em}
.pbr{border-bottom:1px solid ${C.line}}
.pbr span:nth-child(3),.pbr span:nth-child(4),.pbh span:nth-child(3),.pbh span:nth-child(4){text-align:right}
.pbr.out{color:${C.red}}
.stamp{position:absolute;right:270px;bottom:24px;transform:rotate(-14deg);border:3px solid ${C.blue};color:${C.blue};border-radius:50%;width:92px;height:92px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:700;font-size:15px;opacity:.75}
.wh{display:grid;gap:8px}
.whr{display:grid;grid-template-columns:210px 1fr 150px;gap:12px;align-items:center;background:#fff;border-left:5px solid ${C.green};padding:10px 12px;font-size:14px;line-height:1.35}
.whr.no{border-left-color:${C.red};background:#fbf3f1}
.whr b{font-size:15px}
.whr em{font-style:normal;font-family:SgMono,monospace;font-size:12px;color:${C.green}}
.whr.no em{color:${C.red}}
.em{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.emc{background:#fff;padding:16px;border-top:5px solid ${C.green}}
.emc.n{border-top-color:${C.red}}
.emc h4{font-size:18px;margin-bottom:8px}
.emc p{font-size:15px;padding:5px 0;border-bottom:1px dashed ${C.line}}
.emc.y p{color:#245c43}.emc.n p{color:${C.red}}
.rf{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.rfi{background:#fff;border:1px solid ${C.line};padding:14px 12px;display:flex;flex-direction:column;gap:6px}
.rfi span{font-family:SgMono,monospace;font-size:26px;color:${C.blue}}
.rfi b{font-size:17px}
.rfi p{font-size:14px;line-height:1.4}
`;
