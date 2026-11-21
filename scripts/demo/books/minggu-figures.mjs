/**
 * Infografis "Seminggu dalam Satu Jam". Identitas visual: halaman planner bertitik dengan
 * selotip washi. Kertas putih gading berpola titik, tinta biru tua, aksen lavender dan mustard,
 * judul serif (SgSerif), jam dan hari ditulis tangan (SgHand). Seperti buku agenda pribadi.
 */

const C = {
  paper: "#fdfbf6",
  ink: "#2f3e5c",
  lav: "#8a7bc0",
  lavSoft: "#e7e2f6",
  mustard: "#c7a23a",
  mustSoft: "#f6ecc9",
  red: "#c4553d",
};

const card = (title, body, foot = "") => `
<div class="card"><div class="in">
  <div class="washi w1"></div><div class="washi w2"></div>
  <div class="tag">Planner · Seminggu dalam Satu Jam</div>
  <h2>${title}</h2>
  ${body}
  ${foot ? `<p class="foot">${foot}</p>` : ""}
</div></div>`;

/** 1. Ritual 60 menit sebagai jam. */
function ritual() {
  const parts = [
    ["Kosongkan kepala", 15, C.lav],
    ["Tinjau minggu lalu", 10, C.mustard],
    ["Pilih 3 batu besar", 10, C.ink],
    ["Pasang di kalender", 20, "#5b8a72"],
    ["Cek akhir", 5, C.red],
  ];
  let acc = 0;
  const stops = parts
    .map(([, m, c]) => {
      const a = acc;
      acc += m;
      return `${c} ${(a / 60) * 360}deg ${(acc / 60) * 360}deg`;
    })
    .join(",");
  return card(
    "Ritual satu jam, setiap minggu",
    `<div class="rt">
      <div class="clock" style="background:conic-gradient(${stops})"><div class="hole"><b>60</b><span>menit</span></div></div>
      <ol class="rl">${parts.map(([t, m, c], i) => `<li><span class="dot" style="background:${c}"></span><b>${i + 1}. ${t}</b><em>${m} mnt</em></li>`).join("")}</ol>
    </div>`,
    "minggu sore atau senin pagi, di jam yang sama setiap minggu",
  );
}

/** 2. Batu besar, kerikil, pasir. */
function rocks() {
  return card(
    "Batu besar dulu, baru kerikil dan pasir",
    `<div class="rk">
      <div class="jar">
        <div class="sand"></div>
        ${[
          [30, 150, 70],
          [100, 140, 64],
          [62, 86, 66],
        ]
          .map(
            ([x, y, s]) =>
              `<div class="rock" style="left:${x}px;top:${y}px;width:${s}px;height:${s * 0.8}px"></div>`,
          )
          .join("")}
        ${Array.from({ length: 16 }, (_, i) => `<div class="pebble" style="left:${18 + ((i * 37) % 150)}px;top:${60 + ((i * 23) % 120)}px"></div>`).join("")}
      </div>
      <div class="rk-t">
        <div class="rki"><span class="sw" style="background:${C.ink}"></span><div><b>Batu besar</b><p>Tiga pekerjaan yang paling menentukan minggu ini. Dipasang di kalender lebih dulu.</p></div></div>
        <div class="rki"><span class="sw" style="background:${C.lav}"></span><div><b>Kerikil</b><p>Rapat, balasan surel, urusan rutin. Mengisi celah di antara batu besar.</p></div></div>
        <div class="rki"><span class="sw" style="background:${C.mustSoft};border:1px solid ${C.mustard}"></span><div><b>Pasir</b><p>Hal kecil yang bisa dikerjakan kapan saja, atau tidak sama sekali.</p></div></div>
      </div>
    </div>`,
    "kalau pasir masuk duluan, batu besar tidak akan muat",
  );
}

/** 3. Kalender mingguan Tari setelah ritual. */
function calendar() {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum"];
  const blocks = [
    [0, 0, 2, "Batu: laporan klien", "rock"],
    [2, 0, 2, "Batu: rencana Q1", "rock"],
    [3, 3, 2, "Batu: pelatihan tim", "rock"],
    [0, 3, 1, "Rapat tim", "peb"],
    [1, 1, 1, "Rapat klien", "peb"],
    [1, 3, 2, "Surel & pesan", "peb"],
    [2, 4, 1, "Rapat", "peb"],
    [3, 0, 1, "Surel", "peb"],
    [4, 1, 1, "Rapat", "peb"],
    [4, 4, 1, "Cek akhir pekan", "peb"],
    [0, 5, 1, "cadangan", "buf"],
    [1, 6, 1, "cadangan", "buf"],
    [2, 6, 1, "cadangan", "buf"],
    [3, 6, 1, "cadangan", "buf"],
    [4, 2, 2, "cadangan", "buf"],
  ];
  return card(
    "Minggu Tari setelah satu jam",
    `<div class="cal">
      <div class="hrs">${["08", "09", "10", "11", "13", "14", "15"].map((h) => `<span>${h}.00</span>`).join("")}</div>
      ${days
        .map(
          (d, i) =>
            `<div class="col"><div class="dh">${d}</div><div class="cells">${blocks
              .filter((b) => b[0] === i)
              .map(
                ([, s, l, t, k]) =>
                  `<div class="blk ${k}" style="top:${s * 34}px;height:${l * 34 - 4}px">${t}</div>`,
              )
              .join("")}</div></div>`,
        )
        .join("")}
    </div>`,
    "batu besar di pagi hari, saat pikiran paling segar; cadangan tersebar, bukan di akhir minggu",
  );
}

/** 4. Tiga pertanyaan tinjauan. */
function review() {
  const q = [
    ["Apa yang berhasil?", "Tulis tiga hal, sekecil apa pun. Ini bahan untuk mengulanginya."],
    ["Apa yang tidak selesai, dan kenapa?", "Terlalu besar, terganggu, atau memang tidak penting?"],
    ["Apa yang akan kuubah minggu ini?", "Satu perubahan saja. Bukan lima."],
  ];
  return card(
    "Tiga pertanyaan untuk minggu lalu",
    `<div class="rv">${q.map(([a, b], i) => `<div class="rq"><span class="rn">${i + 1}</span><div><h4>${a}</h4><p>${b}</p></div></div>`).join("")}</div>`,
  );
}

/** 5. Rencana jika-maka. */
function ifthen() {
  const r = [
    ["ada rapat dadakan di jam batu besar", "aku tawarkan jam lain hari itu sebelum menerima."],
    [
      "batu besar tidak selesai hari ini",
      "aku pindahkan ke slot cadangan terdekat, bukan ke minggu depan.",
    ],
    ["jam 10 pagi aku masih membalas pesan", "aku tutup aplikasi pesan sampai jam 12."],
  ];
  return card(
    "Rencana jika–maka",
    `<div class="it">${r.map(([a, b]) => `<div class="itr"><div class="if"><span>JIKA</span>${a}</div><div class="then"><span>MAKA</span>${b}</div></div>`).join("")}</div>`,
    "keputusan yang sudah dibuat di hari tenang, dijalankan di hari sibuk",
  );
}

export const MINGGU_FIGURES = {
  "ritual-60": {
    html: ritual,
    alt: "Jam satu jam dibagi lima: kosongkan kepala 15 menit, tinjau minggu lalu 10, pilih 3 batu besar 10, pasang di kalender 20, cek akhir 5.",
  },
  "batu-besar": {
    html: rocks,
    alt: "Toples berisi batu besar, kerikil, dan pasir: batu besar untuk tiga pekerjaan terpenting, kerikil untuk rapat dan surel, pasir untuk hal kecil.",
  },
  "kalender-tari": {
    html: calendar,
    alt: "Kalender Senin–Jumat Tari: tiga batu besar di pagi hari, rapat dan surel mengisi celah, slot cadangan tersebar sepanjang minggu.",
  },
  "tinjauan-mingguan": {
    html: review,
    alt: "Tiga pertanyaan tinjauan: apa yang berhasil, apa yang tidak selesai dan kenapa, apa yang akan diubah minggu ini.",
  },
  "jika-maka": {
    html: ifthen,
    alt: "Tiga rencana jika–maka, misalnya jika ada rapat dadakan di jam batu besar maka tawarkan jam lain sebelum menerima.",
  },
};

export const MINGGU_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:8px;color:${C.ink};background:${C.paper};
  background-image:radial-gradient(#cfc8b8 1.2px, transparent 1.3px);background-size:22px 22px;box-shadow:inset 0 0 0 1px #e6dfd0}
.in{position:relative;padding:40px 36px 30px}
.washi{position:absolute;height:24px;width:130px;opacity:.85}
.w1{top:-4px;left:28px;transform:rotate(-3deg);background:repeating-linear-gradient(45deg,${C.lav} 0 8px,#a698d4 8px 16px)}
.w2{top:-2px;right:34px;width:90px;transform:rotate(4deg);background:repeating-linear-gradient(90deg,${C.mustard} 0 6px,#d8b85a 6px 12px)}
.tag{font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:${C.lav}}
h2{font-family:SgSerif,serif;font-weight:400;font-size:38px;line-height:1.1;margin:8px 0 20px}
.foot{font-family:SgHand,cursive;font-size:27px;color:${C.lav};margin-top:16px;line-height:1.2}
.rt{display:grid;grid-template-columns:260px 1fr;gap:28px;align-items:center}
.clock{width:250px;height:250px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 6px #fff,0 6px 0 6px #e6dfd0}
.hole{width:120px;height:120px;border-radius:50%;background:${C.paper};display:flex;flex-direction:column;align-items:center;justify-content:center}
.hole b{font-family:SgSerif,serif;font-weight:400;font-size:48px;line-height:1}
.hole span{font-size:14px;font-weight:700}
.rl{list-style:none;padding:0;display:grid;gap:12px}
.rl li{display:grid;grid-template-columns:18px 1fr auto;gap:10px;align-items:center;font-size:17px;background:#fff;padding:10px 12px;border-radius:8px;box-shadow:0 1px 0 #e6dfd0}
.rl .dot{width:16px;height:16px;border-radius:50%}
.rl em{font-family:SgHand,cursive;font-style:normal;font-size:22px;color:${C.lav}}
.rk{display:grid;grid-template-columns:230px 1fr;gap:26px;align-items:center}
.jar{position:relative;width:220px;height:250px;border:4px solid ${C.ink};border-top:0;border-radius:0 0 34px 34px;overflow:hidden;background:#fff}
.sand{position:absolute;left:0;right:0;bottom:0;height:60px;background:${C.mustSoft}}
.rock{position:absolute;border-radius:46% 54% 48% 52%;background:${C.ink}}
.pebble{position:absolute;width:16px;height:13px;border-radius:50%;background:${C.lav}}
.rk-t{display:grid;gap:12px}
.rki{display:flex;gap:12px;align-items:flex-start;background:#fff;padding:12px 14px;border-radius:8px;box-shadow:0 1px 0 #e6dfd0}
.sw{flex-shrink:0;width:22px;height:22px;border-radius:50%;margin-top:2px}
.rki b{font-size:18px}
.rki p{font-size:15px;line-height:1.4;margin-top:2px}
.cal{display:grid;grid-template-columns:56px repeat(5,1fr);gap:6px}
.hrs{padding-top:30px}
.hrs span{display:block;height:34px;font-family:SgHand,cursive;font-size:18px;line-height:1;color:${C.lav}}
.col .dh{height:30px;font-family:SgHand,cursive;font-size:24px;text-align:center}
.cells{position:relative;height:${7 * 34}px;background:#fff;border-radius:6px;box-shadow:inset 0 0 0 1px #e6dfd0}
.blk{position:absolute;left:4px;right:4px;border-radius:5px;padding:4px 6px;font-size:11.5px;font-weight:700;line-height:1.2;overflow:hidden}
.blk.rock{background:${C.ink};color:#fff}
.blk.peb{background:${C.lavSoft};color:${C.ink}}
.blk.buf{background:repeating-linear-gradient(45deg,${C.mustSoft} 0 6px,#fff 6px 12px);color:#8a6d1c;border:1px dashed ${C.mustard};font-weight:600}
.rv{display:grid;gap:14px}
.rq{display:flex;gap:14px;align-items:flex-start;background:#fff;padding:16px;border-radius:8px;box-shadow:0 1px 0 #e6dfd0;border-left:5px solid ${C.mustard}}
.rn{font-family:SgSerif,serif;font-size:38px;line-height:1;color:${C.lav}}
.rq h4{font-size:20px}
.rq p{font-size:16px;line-height:1.4;margin-top:4px}
.it{display:grid;gap:12px}
.itr{display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:8px;overflow:hidden;box-shadow:0 1px 0 #e6dfd0}
.if,.then{padding:14px 16px;font-size:16px;line-height:1.4;font-weight:600}
.if{background:${C.lavSoft}}
.then{background:#fff}
.if span,.then span{display:block;font-size:11px;letter-spacing:.14em;font-weight:800;margin-bottom:4px;color:${C.lav}}
.then span{color:${C.mustard}}
`;
