/**
 * Infografis "Berani Bilang Tidak". Identitas visual sendiri (bukan gaya kartu krem buku lain):
 * kertas bertitik, garis tebal dengan bayangan geser seperti stiker, judul serif, catatan tulisan
 * tangan, warna koral–ungu–toska. Jenis gambarnya juga khas buku percakapan: chat, spektrum,
 * gunung es, bagan keputusan, anatomi kalimat, kartu kalimat.
 */

const C = { coral: "#e4572e", plum: "#5b2a4e", teal: "#1f8a85", ink: "#2b1b2e", sun: "#ffd166" };

const card = (title, body, hand = "") => `
<div class="card">
  <div class="tag">Berani Bilang Tidak</div>
  <h2><span>${title}</span></h2>
  ${body}
  ${hand ? `<p class="hand">${hand}</p>` : ""}
</div>`;

/** 1. Gunung es: yang terlihat hanya "iya". */
function iceberg() {
  const below = [
    "Takut dianggap sombong",
    "Ingin selalu disukai",
    "Rasa bersalah sejak kecil",
    "Takut hubungan rusak",
    '"Nggak enakan"',
  ];
  return card(
    'Yang terlihat cuma "iya"',
    `<div class="berg">
      <svg viewBox="0 0 640 420">
        <rect x="0" y="120" width="640" height="300" fill="#d9f0ee"/>
        <path d="M250 120 L300 40 L345 70 L390 120 Z" fill="#fff" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M250 120 L390 120 L470 220 L430 340 L320 400 L190 340 L150 230 Z" fill="#a9d8d4" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
        <line x1="0" y1="120" x2="640" y2="120" stroke="${C.teal}" stroke-width="4" stroke-dasharray="10 8"/>
      </svg>
      <div class="above">"Iya, boleh kok."</div>
      <ul class="below">${below.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>`,
    "di bawah permukaan, alasannya hampir selalu soal rasa takut",
  );
}

/** 2. Spektrum pasif–asertif–agresif. */
function spectrum() {
  const pts = [
    ["Pasif", C.plum, '"Eh... iya deh, nggak apa-apa."', "Kebutuhanmu hilang"],
    ["Asertif", C.teal, '"Aku nggak bisa Sabtu ini. Senin aku bantu, ya."', "Dua-duanya dihormati"],
    ["Agresif", C.coral, '"Kamu tuh selalu nyuruh-nyuruh aku!"', "Hubungannya yang rusak"],
  ];
  return card(
    "Bukan cuma dua pilihan",
    `<div class="spec">
      <div class="bar"><i style="left:16%"></i><i style="left:50%" class="mid"></i><i style="left:84%"></i></div>
      <div class="pts">${pts
        .map(
          ([n, c, s, r]) =>
            `<div class="pt"><b style="color:${c}">${n}</b><div class="bub" style="border-color:${c}">${s}</div><small>${r}</small></div>`,
        )
        .join("")}</div>
    </div>`,
    "asertif = jujur soal batasmu, tanpa menyerang orangnya",
  );
}

/** 3. Chat sebelum dan sesudah (Sari dan atasannya). */
function chat() {
  const msg = (who, t) => `<div class="m ${who}">${t}</div>`;
  const before = [
    msg("them", "Sar, Sabtu bisa masuk ya? Laporan cabang belum beres."),
    msg("me", "Iya Bu, bisa 🙏"),
    msg(
      "me",
      "Eh tapi sebenernya Sabtu saya ada acara keluarga sih Bu, tapi nggak apa-apa kok, nanti saya atur, maaf ya Bu",
    ),
    msg("them", "Oke makasih Sar 👍"),
  ];
  const after = [
    msg("them", "Sar, Sabtu bisa masuk ya? Laporan cabang belum beres."),
    msg(
      "me",
      "Sabtu ini saya tidak bisa, Bu. Senin pagi saya prioritaskan laporan cabang, jam 11 sudah di meja Ibu.",
    ),
    msg("them", "Oh oke, Senin jam 11 ya. Makasih Sar."),
  ];
  return card(
    "Pesan yang sama, dua jawaban",
    `<div class="chats">
      <div class="phone"><div class="ph">Dulu</div>${before.join("")}</div>
      <div class="phone ok"><div class="ph">Sekarang</div>${after.join("")}</div>
    </div>`,
    "alasan panjang bukan sopan santun, itu celah untuk ditawar",
  );
}

/** 4. Anatomi kalimat menolak. */
function anatomy() {
  const parts = [
    ["Makasih sudah kepikiran aku,", C.teal, "Hargai"],
    ["tapi aku nggak ambil", C.coral, "Tolak dengan jelas"],
    ["Sabtu ini.", C.plum, "Batasi"],
    ["Minggu depan aku bisa bantu satu jam.", "#c98a00", "Tawarkan (kalau mau)"],
  ];
  return card(
    "Anatomi kalimat menolak",
    `<p class="sent">${parts
      .map(
        ([t, c]) =>
          `<span style="box-shadow:inset 0 -14px 0 ${c}33;border-bottom:4px solid ${c}">${t}</span>`,
      )
      .join(" ")}</p>
     <div class="legend">${parts
       .map(([, c, l], i) => `<div><b style="background:${c}">${i + 1}</b>${l}</div>`)
       .join("")}</div>
     <div class="nope"><b>Tidak perlu:</b> permintaan maaf berulang · alasan tiga paragraf · janji yang tidak bisa kamu tepati</div>`,
    "bagian keempat boleh dilewati, tiga yang pertama jangan",
  );
}

/** 5. Bagan keputusan. */
function flow() {
  const q = (t) => `<div class="q">${t}</div>`;
  const yes = (t) => `<div class="a yes">${t}</div>`;
  const no = (t) => `<div class="a no">${t}</div>`;
  return card(
    "Haruskah aku bilang iya?",
    `<div class="flow">
      ${q("Kalau tidak ada yang akan kecewa, apakah aku mau melakukannya?")}
      <div class="row"><div class="col">${yes("Mau")}${q("Apakah waktu & tenagaku cukup tanpa mengorbankan hal penting?")}<div class="row">${yes("Cukup → <b>Iya, dengan senang hati</b>")}${no("Tidak → <b>Iya sebagian</b> atau waktu lain")}</div></div>
      <div class="col">${no("Tidak mau")}${q("Apakah ini kewajibanku (tugas utama, janji, darurat keluarga)?")}<div class="row">${yes("Ya → <b>Lakukan</b>, lalu bicarakan bebannya")}${no("Bukan → <b>Tidak</b>, dengan sopan")}</div></div></div>
    </div>`,
  );
}

/** 6. Kartu kalimat siap pakai. */
function phraseCards() {
  const cards = [
    ["Saat diminta mendadak", "Aku perlu cek jadwal dulu, nanti sore kukabari."],
    ["Saat ditawar ulang", "Aku paham, tapi jawabanku tetap sama."],
    ["Saat dipinjami uang", "Aku nggak meminjamkan uang ke teman. Bukan soal kamu."],
    ["Saat diundang", "Makasih sudah ngajak! Kali ini aku absen dulu, ya."],
    ["Saat beban kerja penuh", "Kalau saya ambil ini, mana yang boleh saya tunda?"],
    ["Saat merasa bersalah", "Menolak permintaan bukan menolak orangnya."],
  ];
  const rot = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.2];
  return card(
    "Kartu kalimat, simpan di saku",
    `<div class="cards">${cards
      .map(
        ([h, t], i) =>
          `<div class="pc" style="transform:rotate(${rot[i]}deg)"><small>${h}</small><p>"${t}"</p></div>`,
      )
      .join("")}</div>`,
    "screenshot halaman ini, buka saat perlu",
  );
}

export const TIDAK_FIGURES = {
  "gunung-es": {
    html: iceberg,
    alt: 'Gunung es: di atas permukaan hanya kalimat "Iya, boleh kok", di bawahnya rasa takut dianggap sombong, ingin disukai, rasa bersalah, takut hubungan rusak, dan nggak enakan.',
  },
  spektrum: {
    html: spectrum,
    alt: "Spektrum tiga gaya: pasif, asertif di tengah, dan agresif, masing-masing dengan contoh kalimat dan akibatnya.",
  },
  "chat-sari": {
    html: chat,
    alt: "Dua percakapan chat Sari dan atasannya: dulu Sari mengiyakan dengan alasan panjang, sekarang Sari menolak singkat dan menawarkan Senin pagi.",
  },
  "anatomi-kalimat": {
    html: anatomy,
    alt: "Kalimat menolak dibagi empat bagian berwarna: hargai, tolak dengan jelas, batasi, dan tawarkan.",
  },
  "bagan-keputusan": {
    html: flow,
    alt: "Bagan keputusan haruskah aku bilang iya, bercabang berdasarkan apakah aku mau, apakah waktunya cukup, dan apakah ini kewajiban.",
  },
  "kartu-kalimat": {
    html: phraseCards,
    alt: "Enam kartu kalimat siap pakai untuk situasi mendadak, ditawar ulang, dipinjami uang, diundang, beban kerja penuh, dan merasa bersalah.",
  },
};

export const TIDAK_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;padding:36px 36px 30px;color:${C.ink};border:4px solid ${C.ink};border-radius:22px;box-shadow:10px 10px 0 ${C.ink};
  background:#fff8f1 radial-gradient(circle, #ecd9c9 1.4px, transparent 1.6px) 0 0/18px 18px;margin:0 12px 12px 0}
.tag{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;background:${C.coral};color:#fff;padding:5px 10px;border-radius:8px;transform:rotate(-2deg)}
h2{font-family:SgSerif,serif;font-weight:400;font-size:38px;line-height:1.1;margin:14px 0 22px}
h2 span{background:linear-gradient(transparent 62%, ${C.sun} 62%, ${C.sun} 90%, transparent 90%)}
.hand{font-family:SgHand,cursive;font-size:27px;color:${C.plum};margin-top:18px;transform:rotate(-1deg)}
.berg{position:relative;height:420px}.berg svg{position:absolute;inset:0;width:640px;height:420px}
.above{position:absolute;left:400px;top:26px;font-family:SgHand,cursive;font-size:30px;color:${C.ink};background:#fff;border:3px solid ${C.ink};border-radius:16px;padding:4px 14px}
.below{position:absolute;left:210px;top:150px;list-style:none;padding:0;display:grid;gap:8px}
.below li{font-weight:800;font-size:16px;background:#fff;border:2px solid ${C.ink};border-radius:10px;padding:5px 10px;width:max-content}
.below li:nth-child(even){margin-left:40px}
.spec .bar{position:relative;height:16px;border-radius:99px;margin:10px 30px 26px;background:linear-gradient(90deg, ${C.plum}, ${C.teal} 50%, ${C.coral})}
.spec .bar i{position:absolute;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:#fff;border:4px solid ${C.ink}}
.spec .bar i.mid{width:36px;height:36px;margin:-18px 0 0 -18px;background:${C.sun}}
.pts{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.pt{text-align:center}.pt b{font-size:22px;display:block;margin-bottom:8px}
.bub{position:relative;background:#fff;border:3px solid;border-radius:16px;padding:12px;font-size:15px;font-weight:600;line-height:1.35;min-height:92px;display:flex;align-items:center;justify-content:center}
.pt small{display:block;margin-top:10px;font-size:14px;font-weight:700;color:#6b5a6e}
.chats{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.phone{background:#efe7f3;border:3px solid ${C.ink};border-radius:24px;padding:14px 12px;display:flex;flex-direction:column;gap:8px}
.phone.ok{background:#e1f3f1}
.ph{font-family:SgHand,cursive;font-size:26px;text-align:center;color:${C.plum}}.phone.ok .ph{color:${C.teal}}
.m{max-width:88%;padding:8px 11px;border-radius:14px;font-size:14px;line-height:1.35;border:2px solid ${C.ink}}
.m.them{background:#fff;align-self:flex-start;border-bottom-left-radius:4px}
.m.me{background:#ffe2d6;align-self:flex-end;border-bottom-right-radius:4px}
.phone.ok .m.me{background:#bfe8e4}
.sent{font-size:27px;line-height:1.9;font-weight:700}
.sent span{padding:0 2px}
.legend{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;margin-top:20px;font-weight:700;font-size:16px}
.legend div{display:flex;align-items:center;gap:10px}
.legend b{width:30px;height:30px;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid ${C.ink}}
.nope{margin-top:20px;background:#fff;border:3px dashed ${C.coral};border-radius:14px;padding:12px 14px;font-size:15px}
.flow{display:flex;flex-direction:column;gap:12px;align-items:stretch}
.flow .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.flow .col{display:flex;flex-direction:column;gap:10px}
.q{background:#fff;border:3px solid ${C.ink};border-radius:14px;padding:11px 13px;font-weight:700;font-size:15px;line-height:1.35;text-align:center}
.a{border-radius:12px;padding:9px 11px;font-size:14px;line-height:1.35;text-align:center;border:2px solid ${C.ink}}
.a.yes{background:#bfe8e4}.a.no{background:#ffd9cc}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:18px 16px;padding:6px}
.pc{background:#fff;border:3px solid ${C.ink};border-radius:12px;padding:14px 14px 12px;box-shadow:5px 5px 0 ${C.plum}}
.pc:nth-child(3n+2){box-shadow:5px 5px 0 ${C.teal}}.pc:nth-child(3n){box-shadow:5px 5px 0 ${C.coral}}
.pc small{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#8a7a8c}
.pc p{font-family:SgHand,cursive;font-size:26px;line-height:1.15;margin-top:6px}
`;
