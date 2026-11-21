/**
 * Infografis "Hitung Harga Jual yang Untung". Identitas visual: meja kerja warung. Kertas kraft,
 * nota dan struk berhuruf mesin ketik (SgMono), label harga berlubang tali, cap stempel, angka
 * tulisan tangan. Gaya buku kerja yang praktis, beda dari empat buku lain.
 */

const C = {
  kraft: "#d9b98c",
  paper: "#fffdf6",
  ink: "#2b2118",
  rust: "#c2571a",
  green: "#2f7d4f",
  brown: "#7a4a1d",
};
const rp = (n) => `Rp${Math.round(n).toLocaleString("id-ID")}`;

const card = (title, body, hand = "") => `
<div class="card"><div class="in">
  <div class="tape"></div>
  <div class="tag">Buku kerja · Hitung Harga Jual yang Untung</div>
  <h2>${title}</h2>
  ${body}
  ${hand ? `<p class="hand">${hand}</p>` : ""}
</div></div>`;

/** 1. Nota HPP satu batch. */
function receipt() {
  const items = [
    ["Kulit risol 50 lbr", 30000],
    ["Mayones 1 kg", 28000],
    ["Telur 1 kg", 27000],
    ["Sosis & keju", 10000],
    ["Tenaga Dina 3 jam", 45000],
    ["Gas, minyak, ongkir", 10000],
    ["Mika + label 50 pcs", 12500],
  ];
  const total = items.reduce((a, [, v]) => a + v, 0);
  return card(
    "Nota HPP: satu batch risol",
    `<div class="rc-wrap"><div class="receipt">
      <div class="rh">DAPUR DINA<br><small>Risol Mayo · Batch 50 pcs</small></div>
      <div class="dash"></div>
      ${items.map(([k, v]) => `<div class="rl"><span>${k}</span><span>${v.toLocaleString("id-ID")}</span></div>`).join("")}
      <div class="dash"></div>
      <div class="rl big"><span>TOTAL</span><span>${total.toLocaleString("id-ID")}</span></div>
      <div class="rl big"><span>÷ 50 pcs</span><span>${(total / 50).toLocaleString("id-ID")}</span></div>
      <div class="dash"></div>
      <div class="rf">HPP / PCS ${rp(total / 50)}</div>
      <div class="zig"></div>
    </div>
    <div class="side">
      <div class="stamp">RUGI<br><small>kalau dijual Rp3.000</small></div>
      <p class="note">Dulu Dina hanya menghitung bahan: <b>Rp1.900</b> per risol. Merasa untung Rp1.100. Ternyata rugi <b>Rp250</b> per risol.</p>
    </div></div>`,
    "tenagamu sendiri juga biaya, bukan gratis",
  );
}

/** 2. Biaya yang suka lupa: halaman buku tulis dengan centang. */
function forgotten() {
  const rows = [
    ["Upah tenagamu sendiri", "Hitung per jam, minimal setara UMR daerahmu"],
    ["Gas, listrik, air", "Bagi tagihan bulanan dengan jumlah produksi"],
    ["Kemasan & label", "Mika, plastik, stiker, karet, tisu"],
    ["Produk gagal / tidak laku", "Sisihkan 5–10% dari batch"],
    ["Ongkir belanja bahan", "Bensin atau ojek ke pasar juga biaya"],
    ["Potongan aplikasi", "Biaya admin marketplace & ojek online"],
    ["Diskon & promo", "Harga coret tetap memotong untungmu"],
  ];
  return card(
    "Tujuh biaya yang suka lupa dihitung",
    `<div class="nb">${rows
      .map(
        ([a, b], i) =>
          `<div class="nr"><span class="box"></span><div><b>${a}</b><span>${b}</span></div>${i === 0 || i === 3 ? '<span class="bang">sering lupa!</span>' : ""}</div>`,
      )
      .join("")}</div>`,
    "dua yang paling sering lupa: tenaga sendiri dan produk gagal",
  );
}

/** 3. Markup vs margin. */
function markupMargin() {
  const bar = (label, parts) =>
    `<div class="mm"><div class="ml">${label}</div><div class="mb">${parts
      .map(([w, c, t]) => `<div style="flex:${w};background:${c}">${t}</div>`)
      .join("")}</div></div>`;
  return card(
    "Markup dan margin itu beda",
    `${bar("Harga Rp4.500", [
      [3250, "#a0785a", "HPP Rp3.250"],
      [1250, C.green, "Untung Rp1.250"],
    ])}
    <div class="fcards">
      <div class="fc"><small>MARKUP · dibanding HPP</small><b>1.250 ÷ 3.250 = 38%</b></div>
      <div class="fc"><small>MARGIN · dibanding harga jual</small><b>1.250 ÷ 4.500 = 28%</b></div>
    </div>
    <div class="callout">Kalau ingin margin 25%, jangan sekadar tambah 25% dari HPP. Rumusnya: <b>HPP ÷ (1 − 25%)</b>.</div>`,
    "untung yang sama, dua cara membaca",
  );
}

/** 4. Grafik titik impas. */
function breakEven() {
  const W = 620;
  const H = 300;
  const x = (n) => 50 + (n / 600) * (W - 70);
  const y = (v) => H - 30 - (v / 2800000) * (H - 60);
  const cost = (n) => 400000 + 3250 * n;
  const rev = (n) => 4500 * n;
  const line = (f) => [0, 600].map((n) => `${x(n)},${y(f(n))}`).join(" ");
  return card(
    "Titik impas: kapan mulai untung",
    `<svg class="be" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      <line x1="50" y1="${H - 30}" x2="${W - 20}" y2="${H - 30}" stroke="${C.ink}" stroke-width="2"/>
      <line x1="50" y1="20" x2="50" y2="${H - 30}" stroke="${C.ink}" stroke-width="2"/>
      <polygon points="${x(320)},${y(rev(320))} ${x(600)},${y(rev(600))} ${x(600)},${y(cost(600))}" fill="${C.green}" opacity=".18"/>
      <polygon points="${x(0)},${y(0)} ${x(320)},${y(rev(320))} ${x(0)},${y(cost(0))}" fill="${C.rust}" opacity=".15"/>
      <polyline points="${line(cost)}" stroke="${C.rust}" stroke-width="4" fill="none"/>
      <polyline points="${line(rev)}" stroke="${C.green}" stroke-width="4" fill="none"/>
      <circle cx="${x(320)}" cy="${y(rev(320))}" r="9" fill="${C.ink}"/>
      <text x="${x(320) + 14}" y="${y(rev(320)) + 30}" class="t">320 risol / bulan</text>
      <text x="${x(400)}" y="${y(rev(400)) - 16}" class="t g">Pendapatan</text>
      <text x="${x(470)}" y="${y(cost(470)) + 26}" class="t r">Total biaya</text>
      <text x="${x(100)}" y="${y(cost(100)) - 12}" class="t r">rugi</text>
      <text x="${x(545)}" y="${(y(rev(570)) + y(cost(570))) / 2 + 5}" class="t g">untung</text>
      <text x="${W - 120}" y="${H - 8}" class="ax">risol terjual →</text>
    </svg>`,
    "biaya tetap Rp400.000/bulan ÷ sisa Rp1.250 per risol = 320 risol",
  );
}

/** 5. Tangga harga paket. */
function ladder() {
  const steps = [
    ["Satuan", "Rp4.500", "1 risol", "#e9d5b7"],
    ["Paket Hemat", "Rp20.000", "5 risol · hemat Rp2.500", "#e39b4a"],
    ["Paket Arisan", "Rp85.000", "20 risol + saus · dus", C.rust],
  ];
  return card(
    "Tangga harga: beri pilihan, bukan diskon",
    `<div class="ladder">${steps
      .map(
        ([n, p, d, c], i) =>
          `<div class="step" style="height:${150 + i * 60}px;background:${c}"><small>${n}</small><b>${p}</b><span>${d}</span></div>`,
      )
      .join("")}</div>`,
    "kebanyakan orang memilih yang tengah",
  );
}

/** 6. Label harga dibedah. */
function priceTag() {
  return card(
    "Di balik label Rp4.500",
    `<div class="tagwrap">
      <div class="pricetag"><i class="hole"></i><small>RISOL MAYO</small><b>Rp4.500</b></div>
      <ul class="parts">
        <li><i style="background:#c2571a"></i><b>Rp1.900</b> bahan baku</li>
        <li><i style="background:#e39b4a"></i><b>Rp900</b> tenaga Dina</li>
        <li><i style="background:#a0785a"></i><b>Rp250</b> kemasan</li>
        <li><i style="background:#c9a27e"></i><b>Rp200</b> gas, listrik, ongkir</li>
        <li class="u"><i style="background:${C.green}"></i><b>Rp1.250</b> untung (untuk modal & tabungan usaha)</li>
      </ul>
    </div>`,
    "harga jual bukan angka ajaib, ia punya isi",
  );
}

export const HARGA_FIGURES = {
  "nota-hpp": {
    html: receipt,
    alt: "Nota HPP satu batch 50 risol: bahan, tenaga, gas, kemasan, total Rp162.500, HPP per risol Rp3.250; cap RUGI kalau dijual Rp3.000.",
  },
  "biaya-terlupa": {
    html: forgotten,
    alt: "Halaman buku tulis berisi tujuh biaya yang sering lupa dihitung, seperti upah tenaga sendiri dan produk gagal.",
  },
  "markup-margin": {
    html: markupMargin,
    alt: "Batang harga Rp4.500 terbagi HPP Rp3.250 dan untung Rp1.250; markup 38% dari HPP, margin 28% dari harga jual.",
  },
  "titik-impas": {
    html: breakEven,
    alt: "Grafik garis pendapatan dan total biaya yang berpotongan di 320 risol per bulan; sebelum titik itu rugi, sesudahnya untung.",
  },
  "tangga-harga": {
    html: ladder,
    alt: "Tiga anak tangga harga: satuan Rp4.500, paket hemat lima risol Rp20.000, paket arisan dua puluh risol Rp85.000.",
  },
  "label-harga": {
    html: priceTag,
    alt: "Label harga Rp4.500 dengan rincian isi: bahan Rp1.900, tenaga Rp900, kemasan Rp250, gas dan ongkir Rp200, untung Rp1.250.",
  },
};

export const HARGA_FIGURE_CSS = `
*{box-sizing:border-box;margin:0}
body{font-family:Jakarta,sans-serif;background:transparent;width:720px}
.card{width:720px;border-radius:14px;color:${C.ink};
  background:${C.kraft} repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 2px, transparent 2px 7px);
  box-shadow:inset 0 0 0 2px rgba(0,0,0,.06)}
.in{position:relative;padding:40px 38px 32px}
.tape{position:absolute;top:-6px;left:50%;width:120px;height:26px;margin-left:-60px;background:rgba(255,255,240,.55);transform:rotate(-2deg)}
.tag{font-family:SgMono,monospace;font-size:12px;letter-spacing:.06em;color:${C.brown};text-transform:uppercase}
h2{font-size:32px;line-height:1.15;letter-spacing:-.01em;margin:8px 0 22px;font-weight:800}
.hand{font-family:SgHand,cursive;font-size:28px;color:${C.rust};margin-top:18px;transform:rotate(-1deg)}
.rc-wrap{display:grid;grid-template-columns:330px 1fr;gap:26px;align-items:start}
.receipt{background:${C.paper};font-family:SgMono,monospace;font-size:14px;padding:20px 18px 26px;box-shadow:0 10px 22px rgba(43,33,24,.2);transform:rotate(-1.2deg);position:relative}
.rh{text-align:center;font-weight:500;font-size:16px;letter-spacing:.1em}.rh small{font-size:11px;letter-spacing:0}
.dash{border-top:2px dashed #b9a88c;margin:10px 0}
.rl{display:flex;justify-content:space-between;gap:10px;line-height:1.7}.rl.big{font-size:16px}
.rf{text-align:center;font-size:17px;padding:6px 0;background:#f3ead8}
.zig{position:absolute;left:0;right:0;bottom:-10px;height:12px;background:linear-gradient(135deg, ${C.paper} 6px, transparent 0) 0 0/12px 12px, linear-gradient(225deg, ${C.paper} 6px, transparent 0) 0 0/12px 12px}
.side{display:flex;flex-direction:column;gap:18px;padding-top:10px}
.stamp{align-self:flex-start;border:5px double ${C.rust};color:${C.rust};font-family:SgMono,monospace;font-size:34px;font-weight:500;padding:8px 18px;transform:rotate(-8deg);text-align:center;line-height:1;opacity:.9}
.stamp small{font-size:12px;letter-spacing:0}
.note{font-size:17px;line-height:1.5;background:rgba(255,255,255,.45);border-radius:10px;padding:12px 14px}
.nb{background:${C.paper};border-radius:6px;padding:10px 18px 10px 54px;position:relative;
  background-image:repeating-linear-gradient(transparent 0 55px, #cfdbe8 55px 56px);box-shadow:0 8px 18px rgba(43,33,24,.15)}
.nb::before{content:"";position:absolute;left:38px;top:0;bottom:0;width:2px;background:#e8a5a5}
.nr{display:flex;gap:14px;align-items:center;min-height:56px}
.nr b{display:block;font-size:17px}.nr span{font-size:14px;color:#6b5a48}
.nr>div{flex:1}
.box{flex-shrink:0;width:22px;height:22px;margin-left:-44px;border:2.5px solid ${C.ink};border-radius:4px;background:#fff}
.bang{font-family:SgHand,cursive;font-size:30px;color:${C.rust};transform:rotate(-4deg);white-space:nowrap}
.mm{display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:center;margin-bottom:20px}
.ml{font-weight:800;font-size:17px}
.mb{display:flex;height:64px;border-radius:10px;overflow:hidden;border:2px solid ${C.ink}}
.mb>div{display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px}
.fcards{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fc{background:${C.paper};border-radius:10px;padding:14px 16px;box-shadow:0 6px 14px rgba(43,33,24,.12)}
.fc small{font-family:SgMono,monospace;font-size:12px;color:${C.brown}}.fc b{display:block;font-family:SgMono,monospace;font-size:21px;margin-top:6px}
.callout{margin-top:18px;background:rgba(255,253,246,.7);border-left:5px solid ${C.rust};padding:12px 14px;font-size:16px;line-height:1.5;border-radius:6px}
.be{background:${C.paper};border-radius:10px;display:block}
.be .t{font-family:SgMono,monospace;font-size:14px;fill:${C.ink}}.be .t.g{fill:${C.green}}.be .t.r{fill:${C.rust}}
.be .ax{font-size:13px;fill:#6b5a48}
.ladder{display:flex;align-items:flex-end;gap:14px;height:300px}
.step{flex:1;border-radius:12px 12px 0 0;padding:16px 14px;display:flex;flex-direction:column;gap:4px;color:${C.ink};border:2px solid ${C.ink};border-bottom:0}
.step:nth-child(3){color:#fff}
.step small{font-family:SgMono,monospace;font-size:13px;text-transform:uppercase}.step b{font-size:28px}.step span{font-size:14px;line-height:1.35}
.tagwrap{display:grid;grid-template-columns:240px 1fr;gap:28px;align-items:center}
.pricetag{position:relative;background:${C.paper};height:300px;border-radius:14px;clip-path:polygon(50% 0, 100% 16%, 100% 100%, 0 100%, 0 16%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;box-shadow:0 10px 20px rgba(43,33,24,.2)}
.hole{position:absolute;top:44px;left:50%;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:${C.kraft};box-shadow:inset 0 2px 4px rgba(0,0,0,.25)}
.pricetag small{font-family:SgMono,monospace;font-size:14px;letter-spacing:.1em;margin-top:40px}
.pricetag b{font-family:SgMono,monospace;font-size:44px}
.parts{list-style:none;padding:0;display:grid;gap:12px;font-size:17px}
.parts i{display:inline-block;width:14px;height:14px;border-radius:3px;margin-right:10px;vertical-align:-1px}
.parts b{font-family:SgMono,monospace;margin-right:6px}
.parts li.u{background:rgba(47,125,79,.15);border-radius:8px;padding:6px 8px;margin-left:-8px}
`;
