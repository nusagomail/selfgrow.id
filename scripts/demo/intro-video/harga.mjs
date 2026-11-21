/**
 * Video pengantar "Hitung Harga Jual yang Untung" (D41, D43). Buku kerja usaha kecil, jadi
 * adegan utamanya struk: nota HPP risol Dina tercetak baris demi baris, lalu cap "RUGI".
 * Tema kertas kraft dan oranye, sama dengan infografis bukunya.
 */
export const HARGA_INTRO = {
  slug: "hitung-harga-jual-yang-untung",
  music: { mood: "semangat", bpm: 104 },
  theme: {
    dark: "radial-gradient(110% 90% at 85% 0%, #a65a24 0%, #5a2f14 55%, #2e1a0e 100%)",
    night: "radial-gradient(120% 100% at 20% 0%, #4a3322 0%, #2a1d14 60%, #170f09 100%)",
    paper: "radial-gradient(100% 80% at 50% 0%, #fbf3e4, #e9d3ad)",
    accent: "#ffb347",
    accentInk: "#2e1a0e",
    primary: "#c2410c",
  },
  captions: true,
  scenes: [
    {
      type: "question",
      text: "Laku keras… kok uangnya nggak ada?",
      sub: "Pertanyaan yang sama dari jutaan pelaku usaha kecil.",
      say: "Laku keras, tapi kok uangnya nggak ada? Kalau kamu pernah bertanya begitu, kamu tidak sendirian.",
    },
    {
      type: "receipt",
      kicker: "Dapur Dina, Bekasi",
      title: "Dijual Rp3.000. Modalnya ternyata Rp3.250.",
      sub: "Selama tiga bulan, Dina hanya menghitung bahan baku.",
      header: "NOTA HPP",
      headerSub: "Risol mayo · 1 batch 50 pcs",
      lines: [
        ["Bahan baku", "95.000"],
        ["Tenaga Dina 3 jam", "45.000", true],
        ["Gas, ongkir", "10.000", true],
        ["Mika + label", "12.500", true],
      ],
      total: ["HPP / pcs", "Rp3.250"],
      stamp: "RUGI Rp250",
      say: "Dina menjual risol tiga ribu rupiah. Dia hanya menghitung bahan. Begitu tenaganya, gas, dan kemasan ikut dihitung, modal satu risol ternyata tiga ribu dua ratus lima puluh. Setiap risol yang laku, justru rugi.",
    },
    {
      type: "cover",
      kicker: "Buku kerja usaha kecil",
      title: "Hitung Harga Jual yang Untung",
      subtitle: "Dari HPP sampai berani naik harga, langkah demi langkah",
      meta: ["6 bab", "2 kalkulator", "Lembar kerja"],
      say: "Hitung Harga Jual yang Untung. Buku kerja untuk menghitung harga, bukan menebaknya.",
    },
    {
      type: "stages",
      bg: "paper",
      title: "Lima langkah, satu produk",
      items: [
        ["Hitung HPP", "Bab 2"],
        ["Biaya yang suka lupa", "Bab 3"],
        ["Margin & harga jual", "Bab 4"],
        ["Titik impas", "Bab 5"],
        ["Berani naik harga", "Bab 6"],
      ],
      say: "Lima langkah. Hitung HPP, temukan biaya yang suka lupa, tentukan margin, cari titik impas, lalu berani naik harga.",
    },
    {
      type: "bigNumber",
      kicker: "Hasil bulan pertama Dina",
      value: "Rp450 ribu",
      label:
        "untung bersih, setelah harga naik ke Rp4.500, meski penjualan turun dari 40 ke 26 risol sehari",
      note: "Contoh ilustrasi di dalam buku",
      say: "Harga Dina naik jadi empat ribu lima ratus. Penjualannya turun, tapi untuk pertama kalinya usahanya untung, sekitar empat ratus lima puluh ribu di bulan pertama.",
    },
    {
      type: "features",
      title: "Di dalamnya ada",
      items: [
        ["🧮", "Kalkulator harga jual dari HPP dan margin"],
        ["📈", "Kalkulator titik impas: berapa yang harus terjual"],
        ["🧾", "Lembar kerja untuk produkmu sendiri"],
        ["💬", "Contoh pesan kenaikan harga ke pelanggan"],
      ],
      say: "Di dalamnya ada kalkulator harga jual, kalkulator titik impas, lembar kerja, dan contoh pesan untuk mengabari pelanggan saat harga naik.",
    },
    {
      type: "cta",
      bg: "dark",
      lead: "Harga jual itu dihitung, bukan ditebak.",
      button: "Mulai dari Bab 1, gratis",
      say: "Harga jual itu dihitung, bukan ditebak. Mulai dari bab pertama, gratis.",
    },
  ],
};
