/**
 * Infografis "Fokus di Era Notifikasi". Identitas visual: map berkas kasus. Map manila dengan
 * tab, lembar kertas putih di dalamnya, stempel merah miring, label huruf mesin (SgMono), dan
 * penanda biru seperti pulpen pemeriksa. Gagasannya: setiap gangguan diperiksa seperti kasus.
 */

const C = {
  folder: "#e7cf9f",
  folderDark: "#c9a868",
  sheet: "#fffdf7",
  ink: "#2a2622",
  mute: "#7c7064",
  brown: "#9c5a1f",
  blue: "#2f6f9e",
  red: "#b3261e",
  grey: "#cfc6b8",
};

const card = (no, title, body, foot = "") => `
<div class="card"><div class="tab">BERKAS ${no}</div><div class="sheet">
  <div class="stamp">DIPERIKSA</div>
  <div class="tag">KLINIK FOKUS · ${no}</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Peta interupsi satu hari (ilustrasi). */
function interruptMap() {
  // Pola tetap (ilustrasi): N = notifikasi, O = orang, S = diri sendiri.
  const pat =
    "NSNONSNNSONSNNNSOSNSNNONSSNONNSNSONNSNSNONSNNSOSNNSNONNSSNONSNSNNOSNSNNSONNSNSONNSSNONSNNSONSNNSN";
  const col = { N: C.blue, O: C.brown, S: C.red };
  const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];
  const dots = pat
    .slice(0, 97)
    .split("")
    .map((k, i) => {
      const x = 40 + (i / 97) * 600;
      const y = 60 + ((i * 37) % 5) * 22;
      return `<circle cx="${x}" cy="${y}" r="6" fill="${col[k]}"/>`;
    })
    .join("");
  return card(
    "01",
    "97 kali perhatian berpindah dalam sehari",
    `<svg viewBox="0 0 680 210" width="652" height="201">
      <rect x="20" y="30" width="640" height="140" rx="10" fill="#f4efe4"/>
      ${dots}
      ${hours.map((h, i) => `<text x="${40 + i * 66.6}" y="196" class="ax">${h}.00</text>`).join("")}
    </svg>
    <div class="legend"><span><i style="background:${C.blue}"></i>Notifikasi</span><span><i style="background:${C.brown}"></i>Orang</span><span><i style="background:${C.red}"></i>Diri sendiri</span></div>`,
    "Catatan garis Fajar dari jam 08.00 sampai 17.00. Pola ilustrasi.",
  );
}

/** 2. Biaya pindah. */
function switchCost() {
  const row = (label, blocks, note) => `
  <div class="sw"><b>${label}</b><div class="bar">${blocks
    .map(([w, c, t]) => `<span style="width:${w}%;background:${c}">${t}</span>`)
    .join("")}</div><small>${note}</small></div>`;
  return card(
    "02",
    "Bolak-balik terasa cepat, padahal lebih lama",
    `${row(
      "Satu per satu",
      [
        [45, C.blue, "Faktur"],
        [40, C.brown, "Chat vendor"],
      ],
      "selesai di 85% waktu",
    )}${row(
      "Bolak-balik",
      [
        [14, C.blue, "F"],
        [5, C.grey, ""],
        [12, C.brown, "C"],
        [5, C.grey, ""],
        [14, C.blue, "F"],
        [5, C.grey, ""],
        [12, C.brown, "C"],
        [5, C.grey, ""],
        [14, C.blue, "F"],
        [5, C.grey, ""],
        [9, C.brown, "C"],
      ],
      "selesai di 100% waktu",
    )}<div class="legend"><span><i style="background:${C.grey}"></i>waktu memuat ulang (residu perhatian)</span></div>`,
    'Ilustrasi. Setiap perpindahan menyisakan jeda kecil untuk mengingat "tadi sampai mana".',
  );
}

/** 3. Saringan tiga lapis. */
function filter() {
  const layer = (t, d, act, c, w) =>
    `<div class="ly" style="width:${w}%;border-color:${c}"><b style="color:${c}">${t}</b><small>${d}</small><span style="background:${c}">${act}</span></div>`;
  return card(
    "03",
    "Saring berdasarkan pengirim",
    `<div class="fl">
      ${layer("Mesin", "promo, berita, media sosial, game", "MATIKAN", C.red, 100)}
      ${layer("Manusia lain", "grup besar, alumni, rekan di luar tim", "SENYAP · CEK TERJADWAL", C.brown, 82)}
      ${layer("Manusia penting", "atasan langsung, keluarga inti, klien aktif", "BOLEH BERBUNYI", C.blue, 64)}
    </div>`,
    "Yang lolos sampai bawah hanya sedikit, dan memang itulah tujuannya.",
  );
}

/** 4. Kartu pintu. */
function doorCard() {
  return card(
    "06",
    "Tanda fokus selalu punya jam selesai",
    `<div class="doors">
      <div class="door bad"><div class="dh">✕ Kurang jelas</div><div class="sign">JANGAN<br>GANGGU</div><p>Terdengar seperti penolakan. Tidak tahu sampai kapan.</p></div>
      <div class="door good"><div class="dh">✓ Lebih jelas</div><div class="sign sm">Ibu sedang kerja<br><big>sampai 11.00</big><br>Setelah itu kita main</div><p>Ada batas waktu, ada janji setelahnya.</p></div>
    </div>`,
  );
}

/** 5. Lembar resep. */
function prescription() {
  const rx = [
    ["N", "Notifikasi", "Saringan 3 lapis · matikan angka merah", C.blue],
    ["O", "Orang & grup", "Jam cek · tanya tenggat · kesepakatan tim", C.brown],
    ["S", "Diri sendiri", "Kertas parkir · 10 tarikan napas", C.red],
    ["P", "Ponsel terlihat", "Balik layar · masuk tas · mode fokus", C.ink],
  ];
  return card(
    "08",
    "Resep fokus: pilih dua dulu",
    `<div class="rx">${rx
      .map(
        ([k, t, d, c]) =>
          `<div class="rxi"><span class="k" style="border-color:${c};color:${c}">${k}</span><div><b>${t}</b><small>${d}</small></div><span class="box"></span></div>`,
      )
      .join("")}</div>`,
    "Centang dua baris, jalankan lima hari kerja, lalu hitung garis lagi.",
  );
}

export const FOKUS_FIGURES = {
  "peta-interupsi": {
    html: interruptMap,
    alt: "Peta titik berwarna dari jam 08.00 sampai 17.00 yang menunjukkan 97 perpindahan perhatian: notifikasi, orang, dan diri sendiri.",
  },
  "biaya-pindah": {
    html: switchCost,
    alt: "Dua batang waktu: mengerjakan faktur lalu chat satu per satu lebih singkat daripada bolak-balik, karena setiap perpindahan menyisakan jeda memuat ulang.",
  },
  "saringan-tiga-lapis": {
    html: filter,
    alt: "Saringan tiga lapis notifikasi: mesin dimatikan, manusia lain disenyapkan dan dicek terjadwal, manusia penting boleh berbunyi.",
  },
  "kartu-pintu": {
    html: doorCard,
    alt: "Dua tanda di pintu: 'Jangan ganggu' tanpa batas waktu dibanding 'Ibu sedang kerja sampai 11.00, setelah itu kita main'.",
  },
  "resep-fokus": {
    html: prescription,
    alt: "Lembar resep fokus dengan empat baris: notifikasi, orang dan grup, diri sendiri, ponsel terlihat, masing-masing dengan resepnya dan kotak centang.",
  },
};

export const FOKUS_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{position:relative;width:720px;padding:34px 16px 16px;background:${C.folder};border-radius:6px 16px 16px 16px;box-shadow:inset 0 -6px 0 ${C.folderDark}}
.tab{position:absolute;top:0;left:0;background:${C.folder};padding:8px 22px 4px;border-radius:12px 12px 0 0;transform:translateY(-26px);font-family:SgMono,monospace;font-size:13px;letter-spacing:.12em;color:${C.brown}}
.sheet{position:relative;background:${C.sheet};border-radius:6px;padding:28px 30px 24px;box-shadow:0 2px 0 ${C.grey}}
.stamp{position:absolute;right:26px;top:22px;transform:rotate(-8deg);border:3px solid ${C.red};color:${C.red};font-family:SgMono,monospace;font-weight:700;font-size:14px;letter-spacing:.18em;padding:4px 10px;border-radius:4px;opacity:.85}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.12em;color:${C.mute}}
h2{font-size:30px;font-weight:800;line-height:1.15;margin:8px 0 18px;max-width:520px;color:${C.ink}}
.foot{margin-top:16px;font-size:14px;line-height:1.45;color:${C.mute};font-family:SgMono,monospace}
.ax{font-family:SgMono,monospace;font-size:12px;fill:${C.mute}}
.legend{display:flex;gap:18px;flex-wrap:wrap;margin-top:10px;font-size:14px;color:${C.mute}}
.legend i{display:inline-block;width:12px;height:12px;border-radius:50%;margin-right:6px;vertical-align:-1px}
.sw{display:grid;gap:6px;margin-bottom:16px}
.sw b{font-size:17px}
.sw small{font-family:SgMono,monospace;font-size:13px;color:${C.mute}}
.bar{display:flex;height:42px;border-radius:8px;overflow:hidden;background:#f1ebe0}
.bar span{display:grid;place-items:center;color:#fff;font-weight:700;font-size:14px}
.fl{display:grid;gap:10px;justify-items:center}
.ly{border:3px solid;border-radius:0 0 26px 26px;padding:12px 16px;display:grid;gap:4px;text-align:center;background:#fff}
.ly b{font-size:20px}.ly small{font-size:14px;color:${C.mute}}
.ly span{justify-self:center;color:#fff;font-family:SgMono,monospace;font-size:13px;font-weight:700;letter-spacing:.06em;border-radius:6px;padding:4px 10px;margin-top:4px}
.doors{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.door{border-radius:10px;padding:14px;display:grid;gap:10px;background:#f4efe4}
.dh{font-weight:800;font-size:16px}
.door.bad .dh{color:${C.red}}.door.good .dh{color:${C.blue}}
.sign{background:#fff;border:3px solid ${C.ink};border-radius:8px;padding:22px 10px;text-align:center;font-weight:800;font-size:26px;line-height:1.15;min-height:150px;display:grid;place-items:center}
.sign.sm{font-size:18px;font-weight:700}
.sign big{font-size:30px;color:${C.blue};font-weight:800}
.door p{font-size:14px;line-height:1.4;color:${C.mute}}
.rx{display:grid;gap:10px}
.rxi{display:flex;align-items:center;gap:14px;border-bottom:1px dashed ${C.grey};padding:8px 0}
.k{flex:none;width:44px;height:44px;border:3px solid;border-radius:50%;display:grid;place-items:center;font-family:SgMono,monospace;font-weight:700;font-size:20px}
.rxi div{flex:1}.rxi b{font-size:18px;display:block}.rxi small{font-size:14px;color:${C.mute}}
.box{flex:none;width:28px;height:28px;border:3px solid ${C.ink};border-radius:4px}
`;
