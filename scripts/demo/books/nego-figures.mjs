/**
 * Infografis "Berani Nego Gaji". Identitas visual: papan catur. Negosiasi digambarkan sebagai
 * langkah-langkah yang direncanakan, bukan adu keberanian. Latar arang, petak gading-arang,
 * aksen emas, judul serif (SgSerif), bidak catur Unicode sebagai penanda langkah.
 */

const C = {
  coal: "#1d1b18",
  ivory: "#f6f1e4",
  gold: "#c8a24a",
  muted: "#a79f8d",
  red: "#c4553d",
  green: "#5e8f62",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="checker"></div><div class="in">
  <div class="tag">Papan langkah · Berani Nego Gaji</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Lima langkah sebagai lima bidak. */
function moves() {
  const m = [
    ["♟", "Riset angka", "Rentang pasar dari 3 sumber"],
    ["♞", "Tentukan rentang", "Target, dan batas terendahmu"],
    ["♝", "Kumpulkan bukti", "Hasil kerja yang bisa diukur"],
    ["♜", "Sebut angka, lalu diam", "Rentang yang batas bawahnya targetmu"],
    ["♛", "Tawar paketnya", "Bukan hanya gaji pokok"],
  ];
  return card(
    "Lima langkah, bukan satu keberanian",
    `<div class="moves">${m
      .map(
        ([p, t, d], i) => `<div class="mv ${i % 2 ? "dk" : "lt"}">
        <span class="pc">${p}</span><span class="no">${i + 1}</span><b>${t}</b><small>${d}</small></div>`,
      )
      .join("")}</div>`,
    "Orang yang terlihat berani biasanya hanya lebih siap.",
  );
}

/** 2. Rentang pasar, tawaran, dan rentang yang diajukan. */
function range() {
  const x = (v) => ((v - 7) / 5) * 100;
  const bar = (cls, a, b) =>
    `<div class="bar ${cls}" style="left:${x(a)}%;width:${x(b) - x(a)}%"></div>`;
  const pin = (cls, v, t) => `<div class="pin ${cls}" style="left:${x(v)}%">${t}</div>`;
  const lane = (label, inner) =>
    `<div class="lane"><em>${label}</em><div class="track">${inner}</div></div>`;
  return card(
    "Di mana posisi tawaranmu?",
    `<div class="rg">
      <div class="lane axisl"><em></em><div class="track axis">${[7, 8, 9, 10, 11, 12].map((v) => `<span style="left:${x(v)}%">${v} jt</span>`).join("")}</div></div>
      ${lane("Rentang pasar", bar("market", 9, 11))}
      ${lane("Rentang yang Raka ajukan", bar("ask", 9.5, 11))}
      ${lane("Batas terendah Raka", pin("walk", 9, "9 jt"))}
      ${lane("Tawaran pertama", pin("offer", 8, "8 jt"))}
    </div>`,
    "Ajukan rentang, dan pastikan batas bawahnya adalah angka yang benar-benar kamu inginkan.",
  );
}

/** 3. Kalimat bukti: kerja → angka → dampak. */
function proof() {
  const rows = [
    ["Kerja", "Mengelola iklan media sosial untuk peluncuran produk baru"],
    ["Angka", "Biaya per pendaftar turun dari Rp42.000 ke Rp27.000 dalam 3 bulan"],
    ["Dampak", "Anggaran yang sama menghasilkan 55% lebih banyak pendaftar"],
  ];
  return card(
    "Bukti yang bisa diucapkan",
    `<div class="pf">${rows
      .map(
        ([k, v], i) =>
          `<div class="pfr"><span class="k">${k}</span><span class="v">${v}</span>${i < 2 ? '<span class="ar">↓</span>' : ""}</div>`,
      )
      .join("")}</div>`,
    "Tanpa angka, prestasi terdengar seperti pendapat. Dengan angka, ia menjadi fakta.",
  );
}

/** 4. Jawaban HR dan langkah balasan. */
function replies() {
  const r = [
    [
      "“Anggaran kami sudah mentok.”",
      "Tanyakan bagian lain paket: tunjangan, bonus, atau tanggal tinjauan gaji yang lebih cepat.",
    ],
    [
      "“Angka itu di atas rentang kami.”",
      "Tanyakan rentang mereka, lalu jelaskan buktimu sekali lagi dengan tenang.",
    ],
    ["“Kami pertimbangkan dulu.”", "Tanyakan kapan kabar akan datang, dan siapa yang memutuskan."],
    [
      "“Bisa jawab sekarang?”",
      "Minta waktu sehari untuk membaca tawaran tertulis. Itu permintaan yang wajar.",
    ],
  ];
  return card(
    "Kalau HR menjawab…",
    `<div class="rp">${r
      .map(
        ([a, b]) =>
          `<div class="rpr"><div class="hr">${a}</div><div class="mv2"><span>♞</span>${b}</div></div>`,
      )
      .join("")}</div>`,
  );
}

/** 5. Paket di luar gaji pokok. */
function pkg() {
  const items = [
    ["Tunjangan", "transport, makan, komunikasi"],
    ["Bonus", "bonus tanda tangan atau target"],
    ["Waktu", "hari kerja dari rumah, jam fleksibel"],
    ["Cuti", "tambahan hari cuti"],
    ["Belajar", "anggaran pelatihan, sertifikasi"],
    ["Tinjauan", "evaluasi gaji setelah 6 bulan"],
    ["Jabatan", "judul peran yang lebih tepat"],
    ["Mulai", "tanggal mulai kerja"],
  ];
  return card(
    "Yang bisa ditawar selain gaji",
    `<div class="pk">${items.map(([k, v], i) => `<div class="pki ${(Math.floor(i / 4) + i) % 2 ? "dk" : "lt"}"><b>${k}</b><span>${v}</span></div>`).join("")}</div>`,
    "Kalau gaji pokok benar-benar mentok, bidak lain masih bisa bergerak.",
  );
}

export const NEGO_FIGURES = {
  "lima-langkah": {
    html: moves,
    alt: "Lima bidak catur untuk lima langkah negosiasi: riset angka, tentukan rentang, kumpulkan bukti, sebut angka lalu diam, tawar paket.",
  },
  "rentang-pasar": {
    html: range,
    alt: "Garis gaji 7 sampai 12 juta: rentang pasar 9–11 juta, rentang yang Raka ajukan 9,5–11 juta, batas terendah 9 juta, tawaran pertama 8 juta.",
  },
  "bukti-hasil": {
    html: proof,
    alt: "Kalimat bukti tiga bagian: kerja, angka (biaya per pendaftar turun dari Rp42.000 ke Rp27.000), dan dampak (55% lebih banyak pendaftar).",
  },
  "jawaban-hr": {
    html: replies,
    alt: "Empat jawaban HR yang umum dan langkah balasannya, misalnya menanyakan bagian lain paket saat anggaran mentok.",
  },
  "paket-lain": {
    html: pkg,
    alt: "Delapan hal yang bisa dinegosiasikan selain gaji pokok: tunjangan, bonus, kerja dari rumah, cuti, pelatihan, tinjauan gaji, jabatan, tanggal mulai.",
  },
};

export const NEGO_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;border-radius:10px;overflow:hidden;color:${C.ivory};background:${C.coal}}
.checker{position:absolute;right:0;top:0;width:180px;height:90px;opacity:.12;
  background:conic-gradient(${C.ivory} 25%, transparent 0 50%, ${C.ivory} 0 75%, transparent 0) 0 0/30px 30px}
.in{position:relative;padding:32px 34px 28px}
.tag{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:${C.gold};font-weight:700}
h2{font-family:SgSerif,serif;font-weight:400;font-size:40px;line-height:1.08;margin:8px 0 22px}
.foot{margin-top:20px;font-family:SgSerif,serif;font-size:21px;color:${C.gold};line-height:1.35}
.moves{display:grid;grid-template-columns:repeat(5,1fr)}
.mv{position:relative;aspect-ratio:1/1.35;padding:12px 10px;display:flex;flex-direction:column;gap:4px}
.mv.lt{background:${C.ivory};color:${C.coal}}
.mv.dk{background:#3a352d;color:${C.ivory}}
.mv .pc{font-size:52px;line-height:1}
.mv .no{position:absolute;top:8px;right:10px;font-family:SgSerif,serif;font-size:22px;color:${C.gold}}
.mv b{font-size:16px;line-height:1.2;margin-top:auto}
.mv small{font-size:12px;line-height:1.3;opacity:.8}
.rg{padding:6px 0}
.lane{display:flex;align-items:center;height:54px;border-bottom:1px dashed #3a352d}
.lane em{width:190px;flex-shrink:0;font-style:normal;font-size:15px;font-weight:600}
.track{position:relative;flex:1;height:100%;margin-right:24px}
.axisl{height:30px;border-bottom:2px solid ${C.muted}}
.axis span{position:absolute;top:6px;transform:translateX(-50%);white-space:nowrap;font-size:13px;color:${C.muted};font-weight:700}
.bar{position:absolute;top:16px;height:22px;border-radius:4px}
.bar.market{background:repeating-linear-gradient(45deg,${C.muted} 0 6px,#6d6656 6px 12px)}
.bar.ask{background:${C.gold}}
.pin{position:absolute;top:13px;transform:translateX(-50%);padding:4px 10px;border-radius:4px;font-weight:800;font-size:14px}
.pin.walk{background:${C.green};color:#fff}
.pin.offer{background:${C.red};color:#fff}
.pf{display:grid;gap:12px}
.pfr{position:relative;display:grid;grid-template-columns:110px 1fr;background:${C.ivory};color:${C.coal};border-radius:6px;overflow:visible}
.pfr .k{background:${C.gold};color:${C.coal};font-family:SgSerif,serif;font-size:22px;display:flex;align-items:center;justify-content:center;border-radius:6px 0 0 6px}
.pfr .v{padding:14px 16px;font-size:17px;font-weight:600;line-height:1.35}
.pfr .ar{position:absolute;left:46px;bottom:-17px;color:${C.gold};font-size:20px;font-weight:800;z-index:2}
.rp{display:grid;gap:12px}
.rpr{display:grid;grid-template-columns:230px 1fr;gap:12px;align-items:stretch}
.hr{background:${C.ivory};color:${C.coal};border-radius:14px 14px 14px 4px;padding:12px 14px;font-family:SgSerif,serif;font-size:19px;line-height:1.25;display:flex;align-items:center}
.mv2{background:#2c2822;border:1px solid #4a4438;border-radius:6px;padding:10px 14px;font-size:15px;line-height:1.4;display:flex;gap:10px;align-items:center}
.mv2 span{font-size:28px;color:${C.gold}}
.pk{display:grid;grid-template-columns:repeat(4,1fr)}
.pki{padding:16px 14px;min-height:118px;display:flex;flex-direction:column;gap:6px}
.pki.lt{background:${C.ivory};color:${C.coal}}
.pki.dk{background:#3a352d;color:${C.ivory}}
.pki b{font-family:SgSerif,serif;font-weight:400;font-size:24px}
.pki span{font-size:14px;line-height:1.35}
`;
