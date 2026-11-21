/**
 * Unsur interaktif "Kurangi Gula Tanpa Menderita" (D42). Kuisnya berbentuk jejak harian: pembaca
 * menelusuri hari kemarin, bukan menilai diri. Angka "hari contoh" adalah ilustrasi yang sama
 * dengan infografis dan video (68 g → 26 g).
 */
const pick = (q, options) => ({ q, options });

export const JEJAK_GULA = {
  id: "jejak-gula-kemarin",
  title: "Jejak gula kemarin",
  intro:
    "Ingat-ingat hari kemarin saja, bukan hari terbaikmu. Skor tinggi = banyak gula yang bersembunyi.",
  questions: [
    pick("Berapa gelas minuman manis (teh, kopi susu, jus kemasan, soda) yang kamu minum?", [
      { label: "Tidak ada", points: 0 },
      { label: "1 gelas", points: 1 },
      { label: "2 gelas", points: 2 },
      { label: "3 gelas atau lebih", points: 3 },
    ]),
    pick("Teh atau kopi buatan sendiri, berapa sendok gula per gelas?", [
      { label: "Tanpa gula", points: 0 },
      { label: "Setengah sampai 1 sendok", points: 1 },
      { label: "2 sendok", points: 2 },
      { label: "3 sendok atau lebih", points: 3 },
    ]),
    pick("Camilan manis (kue, biskuit, roti manis, permen)?", [
      { label: "Tidak ada", points: 0 },
      { label: "Sekali", points: 1 },
      { label: "Dua kali atau lebih", points: 2 },
    ]),
    pick("Saat membeli makanan atau minuman kemasan, apakah kamu membaca labelnya?", [
      { label: "Selalu", points: 0 },
      { label: "Kadang-kadang", points: 1 },
      { label: "Hampir tidak pernah", points: 2 },
    ]),
    pick("Lauk bersaus manis (kecap, saus sambal botolan, saus tiram, bumbu teriyaki)?", [
      { label: "Tidak ada", points: 0 },
      { label: "Sekali", points: 1 },
      { label: "Dua kali atau lebih", points: 2 },
    ]),
  ],
  results: [
    {
      min: 0,
      max: 3,
      title: "Hari yang cukup ringan",
      text: "Gula kemarin kemungkinan sudah terkendali. Bab 3 membantumu menemukan gula yang tetap lolos lewat nama lain.",
    },
    {
      min: 4,
      max: 7,
      title: "Gula yang tidak terasa",
      text: "Tidak ada yang berlebihan satu per satu, tapi jumlahnya menumpuk. Bab 4 menunjukkan cara menghitung satu hari penuh.",
    },
    {
      min: 8,
      max: 12,
      title: "Lidah yang sudah terbiasa manis",
      text: "Ini bukan soal kurang disiplin; lidahmu hanya terbiasa. Mulailah dari minuman (Bab 5) dan turunkan bertahap (Bab 6).",
    },
  ],
};

export const GULA_COUNTER = {
  title: "Manis yang jadi kebiasaan",
  kind: "counter",
  format: "percent",
  items: [
    {
      label: "penduduk usia 3 tahun ke atas minum minuman manis lebih dari sekali sehari",
      value: 47.5,
      color: "#e4572e",
    },
    {
      label: "orang dewasa dengan diabetes yang belum tahu dirinya diabetes",
      value: 73.2,
      color: "#0f766e",
    },
  ],
  note: "Survei Kesehatan Indonesia 2023 (Kemenkes); IDF Diabetes Atlas edisi ke-11 (2025), data Indonesia.",
};

export const HARI_GULA_BARS = {
  title: "Satu hari contoh: dari mana 68 gram gula datang",
  kind: "bars",
  format: "number",
  items: [
    { label: "Es kopi susu gula aren", value: 28, color: "#e4572e" },
    { label: "Susu cokelat kemasan (2 sajian)", value: 24, color: "#f28f6b" },
    { label: "Teh manis pagi (2 sdt)", value: 8, color: "#0f766e" },
    { label: "Kue sore", value: 8, color: "#5fb3a5" },
  ],
  note: "Gram gula, ilustrasi. Batas harian Kemenkes 50 g; anjuran ketat WHO sekitar 25 g.",
};
