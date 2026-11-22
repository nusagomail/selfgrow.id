/**
 * Unsur interaktif "Kurangi Gula Tanpa Menderita" (D42). Kuisnya berbentuk jejak harian: pembaca
 * menelusuri hari kemarin, bukan menilai diri. Angka "hari contoh" adalah ilustrasi yang sama
 * dengan infografis dan video (68 g → 26 g).
 */
const pick = (q, options) => ({ q, options });

export const JEJAK_GULA = {
  id: "jejak-gula-kemarin",
  mode: "score",
  label: "Ingat-ingat kemarin",
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
      text: "Ini bukan soal kurang disiplin; lidahmu hanya terbiasa. Mulailah dari minuman (Bab 6) dan turunkan bertahap (Bab 6).",
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

const isGula = (yes) => [
  { label: "Gula", points: 0, correct: yes },
  { label: "Bukan gula", points: 0, correct: !yes },
];

/** Bab 3: kenali gula dari namanya di komposisi (D50, uji pengetahuan). */
export const NAMA_GULA = {
  id: "nama-gula",
  mode: "knowledge",
  label: "Detektif komposisi",
  title: "Yang mana gula?",
  intro: "Nama-nama ini diambil dari daftar komposisi kemasan sungguhan.",
  questions: [
    {
      q: "Dekstrosa",
      options: isGula(true),
      explain:
        "Dekstrosa adalah nama lain glukosa. Biasanya ditulis di tengah daftar supaya tidak terlihat dominan.",
    },
    {
      q: "Lesitin kedelai",
      options: isGula(false),
      explain: "Lesitin adalah pengemulsi, supaya minyak dan air menyatu. Bukan pemanis.",
    },
    {
      q: "Sari buah pekat",
      options: isGula(true),
      explain:
        'Sari buah yang dipekatkan pada dasarnya gula dari buah. Produk "tanpa gula tambahan" bisa tetap manis karena bahan ini.',
    },
    {
      q: "Madu",
      options: isGula(true),
      explain:
        "Madu dan gula aren tetap gula bagi tubuh. Mineralnya sedikit lebih banyak, tapi tidak mengubah hitungan gramnya.",
    },
    {
      q: "Garam",
      options: isGula(false),
      explain:
        "Garam bukan gula, walaupun produk manis juga sering memakainya untuk menguatkan rasa.",
    },
    {
      q: "Maltosa",
      options: isGula(true),
      explain:
        'Akhiran "-osa" hampir selalu menandakan gula: sukrosa, glukosa, fruktosa, maltosa, laktosa.',
    },
  ],
  results: [
    {
      min: 0,
      max: 3,
      title: "Gula masih bisa bersembunyi",
      text: "Simpan gambar nama-nama gula di atas, dan cocokkan saat membaca kemasan berikutnya.",
    },
    {
      min: 4,
      max: 5,
      title: "Hampir tidak bisa dikelabui",
      text: 'Ingat satu petunjuk: akhiran "-osa" dan kata "sirup" hampir selalu berarti gula.',
    },
    {
      min: 6,
      max: 6,
      title: "Detektif komposisi",
      text: "Kamu sudah bisa membaca bagian belakang kemasan. Coba pada camilan yang kamu anggap paling sehat.",
    },
  ],
};
