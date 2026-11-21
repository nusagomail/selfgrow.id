/**
 * Infografis "Mengasuh Tanpa Teriak". Identitas visual: kolase kertas warna di pintu kulkas.
 * Bentuk bulat potongan kertas pastel (koral, kuning mentega, biru langit, hijau daun) di atas
 * krem, tepi sedikit bergelombang, bayangan kertas, catatan tulisan tangan (SgHand) seperti
 * ditempel orang tua. Hangat dan ramah anak; tanpa angka statistik.
 */

const C = {
  cream: "#fff7ec",
  ink: "#3b2f2f",
  coral: "#ff7a59",
  butter: "#ffd166",
  sky: "#8ecae6",
  leaf: "#95c47a",
};

const card = (title, body, note = "") => `
<div class="card"><div class="in">
  <div class="magnet"></div>
  <div class="tag">Pintu kulkas · Mengasuh Tanpa Teriak</div>
  <h2>${title}</h2>
  ${body}
  ${note ? `<p class="note">${note}</p>` : ""}
</div></div>`;

/** 1. Termometer emosi orang tua: tiga zona. */
function thermo() {
  const zones = [
    [
      "Merah",
      C.coral,
      "Suara naik, kata-kata keluar sebelum dipikir",
      "Berhenti. Jauhkan diri sebentar kalau anak aman.",
    ],
    [
      "Kuning",
      C.butter,
      "Rahang mengeras, napas pendek, tangan mengepal",
      "Ini saatnya jeda 10 detik.",
    ],
    ["Hijau", C.leaf, "Masih bisa berpikir dan memilih kata", "Pakai kalimat batas."],
  ];
  return card(
    "Termometer di dalam badan",
    `<div class="th">
      <div class="tube"><div class="bulb"></div>${zones.map(([, c], i) => `<div class="seg" style="background:${c};top:${i * 33}%"></div>`).join("")}</div>
      <div class="zs">${zones
        .map(
          ([n, c, s, a]) =>
            `<div class="z"><span class="zn" style="background:${c}">${n}</span><div><p class="zs1">${s}</p><p class="za">${a}</p></div></div>`,
        )
        .join("")}</div>
    </div>`,
    "semakin cepat kamu sadar di kuning, semakin jarang sampai merah",
  );
}

/** 2. Jeda 10 detik: empat potongan kertas. */
function pause() {
  const s = [
    ["1", "Berhenti bicara", "Tutup mulut, buka telapak tangan.", C.coral],
    ["2", "Napas panjang", "Hembuskan lebih lama dari menarik.", C.sky],
    ["3", "Kalimat diri", "“Dia sedang kesulitan, bukan menyulitkan.”", C.butter],
    ["4", "Turunkan badan", "Jongkok setinggi mata anak.", C.leaf],
  ];
  return card(
    "Jeda 10 detik",
    `<div class="ps">${s.map(([n, t, d, c], i) => `<div class="pc" style="background:${c};transform:rotate(${[-2, 1.5, -1, 2][i]}deg)"><b>${n}</b><h4>${t}</h4><p>${d}</p></div>`).join("")}</div>`,
    "sepuluh detik terasa lama, tapi jauh lebih singkat dari menyesal semalaman",
  );
}

/** 3. Kalimat batas tiga bagian. */
function limit() {
  const parts = [
    ["Namai perasaan", "“Kamu kesal ya, karena menaranya roboh.”", C.sky],
    ["Pasang batas", "“Boleh kesal, tapi tidak boleh melempar balok.”", C.coral],
    ["Beri dua pilihan", "“Kamu mau tarik napas bareng Ibu atau peluk dulu?”", C.leaf],
  ];
  return card(
    "Kalimat batas, tiga potong",
    `<div class="lm">${parts.map(([k, v, c]) => `<div class="lmr"><span class="lk" style="background:${c}">${k}</span><span class="lv">${v}</span></div>`).join("")}</div>`,
    "perasaan selalu boleh; perilaku yang punya batas",
  );
}

/** 4. Jadwal pagi bergambar untuk anak. */
function morning() {
  const s = [
    ["🛏️", "Bangun", "06.00"],
    ["🪥", "Sikat gigi", "06.10"],
    ["👕", "Pakai baju", "06.20"],
    ["🍚", "Sarapan", "06.30"],
    ["🎒", "Pakai sepatu", "06.50"],
  ];
  return card(
    "Jadwal pagi yang bisa dibaca anak",
    `<div class="mn">${s.map(([e, t, j], i) => `<div class="mi" style="background:${[C.sky, C.butter, C.coral, C.leaf, C.sky][i]}"><span class="me">${e}</span><b>${t}</b><small>${j}</small><span class="ck">☐</span></div>`).join("")}</div>`,
    "gambar yang menyuruh, bukan suara Ibu",
  );
}

/** 5. Saat terlanjur teriak: memperbaiki hubungan. */
function repair() {
  const s = [
    ["Tenangkan diri dulu", "Minta maaf saat suaramu sudah kembali normal."],
    ["Akui perbuatanmu", "“Tadi Ibu berteriak. Itu tidak baik, dan itu bukan salahmu.”"],
    ["Ulang dengan benar", "Sampaikan lagi batasnya dengan suara rendah."],
    ["Peluk kalau dia mau", "Tanyakan dulu; hormati jika belum mau."],
  ];
  return card(
    "Kalau sudah terlanjur",
    `<div class="rp">${s.map(([t, d], i) => `<div class="rpi"><span class="rn">${i + 1}</span><div><h4>${t}</h4><p>${d}</p></div></div>`).join("")}</div>`,
    "anak belajar memperbaiki kesalahan dari melihat orang tuanya melakukannya",
  );
}

export const TERIAK_FIGURES = {
  termometer: {
    html: thermo,
    alt: "Termometer emosi tiga zona: hijau masih bisa memilih kata, kuning rahang mengeras dan saatnya jeda, merah suara naik dan saatnya berhenti.",
  },
  "jeda-10-detik": {
    html: pause,
    alt: "Empat langkah jeda 10 detik: berhenti bicara, napas panjang, kalimat diri, turunkan badan setinggi mata anak.",
  },
  "kalimat-batas": {
    html: limit,
    alt: "Kalimat batas tiga bagian: namai perasaan, pasang batas, beri dua pilihan, dengan contoh menara balok yang roboh.",
  },
  "jadwal-pagi": {
    html: morning,
    alt: "Jadwal pagi bergambar untuk anak: bangun, sikat gigi, pakai baju, sarapan, pakai sepatu, dengan kotak centang.",
  },
  perbaikan: {
    html: repair,
    alt: "Empat langkah setelah terlanjur berteriak: tenangkan diri, akui perbuatan, ulang batas dengan benar, peluk kalau anak mau.",
  },
};

export const TERIAK_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:28px;color:${C.ink};background:${C.cream};
  background-image:radial-gradient(circle at 92% 10%, ${C.butter}55 0 70px, transparent 71px),radial-gradient(circle at 4% 96%, ${C.sky}55 0 90px, transparent 91px)}
.in{position:relative;padding:36px 36px 30px}
.magnet{position:absolute;top:14px;left:50%;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:${C.coral};box-shadow:0 3px 0 #c95a3e}
.tag{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:800;color:#a0614f}
h2{font-size:36px;line-height:1.1;font-weight:800;letter-spacing:-.01em;margin:6px 0 22px}
.note{font-family:SgHand,cursive;font-size:29px;color:#c95a3e;margin-top:18px;transform:rotate(-1deg)}
.th{display:grid;grid-template-columns:90px 1fr;gap:24px;align-items:stretch}
.tube{position:relative;width:46px;margin:0 auto;border-radius:23px;background:#fff;box-shadow:inset 0 0 0 4px ${C.ink};overflow:hidden;min-height:330px}
.seg{position:absolute;left:8px;right:8px;height:31%;border-radius:12px}
.bulb{position:absolute;bottom:-6px;left:50%;width:64px;height:64px;margin-left:-32px;border-radius:50%;background:${C.leaf};box-shadow:0 0 0 4px ${C.ink}}
.zs{display:grid;gap:14px}
.z{display:grid;grid-template-columns:92px 1fr;gap:14px;align-items:center;background:#fff;border-radius:18px;padding:14px;box-shadow:0 6px 0 rgba(59,47,47,.08)}
.zn{display:flex;align-items:center;justify-content:center;height:52px;border-radius:14px;font-weight:800;font-size:18px}
.zs1{font-size:16px;font-weight:700;line-height:1.35}
.za{font-size:15px;line-height:1.35;margin-top:4px;color:#7a5a52}
.ps{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.pc{border-radius:22px 26px 20px 28px;padding:18px 18px 20px;box-shadow:0 8px 0 rgba(59,47,47,.12)}
.pc b{display:inline-flex;width:38px;height:38px;border-radius:50%;background:#fff;align-items:center;justify-content:center;font-size:18px}
.pc h4{font-size:22px;margin-top:10px}
.pc p{font-size:16px;line-height:1.4;margin-top:4px}
.lm{display:grid;gap:14px}
.lmr{display:grid;grid-template-columns:180px 1fr;gap:0;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 6px 0 rgba(59,47,47,.08)}
.lk{display:flex;align-items:center;justify-content:center;text-align:center;font-weight:800;font-size:17px;padding:12px}
.lv{padding:16px 18px;font-size:19px;font-weight:600;line-height:1.35}
.mn{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.mi{position:relative;border-radius:20px;padding:16px 8px 14px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;box-shadow:0 6px 0 rgba(59,47,47,.12)}
.me{font-size:40px}
.mi b{font-size:16px;line-height:1.2}
.mi small{font-size:13px;font-weight:700;opacity:.8}
.ck{font-size:26px;margin-top:4px}
.rp{display:grid;gap:12px}
.rpi{display:flex;gap:14px;align-items:flex-start;background:#fff;border-radius:18px;padding:14px 16px;box-shadow:0 6px 0 rgba(59,47,47,.08)}
.rn{flex-shrink:0;width:40px;height:40px;border-radius:50%;background:${C.butter};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px}
.rpi h4{font-size:19px}
.rpi p{font-size:16px;line-height:1.4;margin-top:2px}
`;
