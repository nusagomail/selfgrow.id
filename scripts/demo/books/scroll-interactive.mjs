/** Unsur interaktif "Lepas dari Scroll Tanpa Ujung" (D42). Tokoh dan angka Dimas adalah ilustrasi. */
const yesNo = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Tidak", points: 0 },
  ],
});

export const SKOR_LAYAR = {
  id: "skor-layar",
  mode: "score",
  label: "Cek layar",
  title: "Seberapa dalam layar menyedotmu?",
  intro: "Pikirkan seminggu terakhir. Jawab apa adanya, bukan yang seharusnya.",
  questions: [
    yesNo("Hal pertama yang kulakukan setelah bangun tidur adalah membuka ponsel."),
    yesNo("Aku sering membuka aplikasi tanpa ingat tadi mau apa."),
    yesNo("Aku pernah tidur lebih larut dari rencana karena scroll."),
    yesNo("Aku membawa ponsel ke kamar mandi hampir setiap kali."),
    yesNo("Aku merasa gelisah kalau ponsel tertinggal atau baterainya habis."),
    yesNo("Aku membuka ponsel saat sedang ngobrol dengan orang di depanku."),
    yesNo("Aku sudah mencoba mengurangi, tapi selalu kembali seperti semula."),
    yesNo("Waktu layarku lebih dari 5 jam sehari (atau aku tidak tahu berapa)."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih kamu yang pegang kendali",
      text: "Ponselmu masih alat, bukan majikan. Bab 5 dan 6 membantumu menjaganya tetap begitu.",
    },
    {
      min: 3,
      max: 5,
      title: "Mulai tersedot",
      text: "Kebiasaannya sudah terbentuk, tapi masih mudah dibelokkan. Mulai dari audit di Bab 4.",
    },
    {
      min: 6,
      max: 8,
      title: "Tenggelam dalam layar",
      text: "Ini bukan soal lemah niat. Ponselmu dirancang untuk ini. Ikuti buku ini pelan-pelan, satu bab satu minggu juga tidak apa-apa.",
    },
  ],
};

export const LAYAR_COUNTER = {
  title: "Waktu layar Dimas per hari",
  kind: "counter",
  format: "number",
  items: [
    { label: "menit pada minggu pertama dia mengecek", value: 432, color: "#c0392b" },
    { label: "hari dalam setahun, kalau dibiarkan", value: 110, color: "#e07a1f" },
  ],
  note: "7 jam 12 menit sehari. Hampir sama dengan satu hari kerja.",
};

export const APLIKASI_BARS = {
  title: "Ke mana 7 jam Dimas pergi",
  kind: "bars",
  format: "number",
  items: [
    { label: "Video pendek (menit)", value: 154, color: "#c0392b" },
    { label: "Instagram", value: 96, color: "#e07a1f" },
    { label: "YouTube", value: 78, color: "#f4ac13" },
    { label: "Chat", value: 61, color: "#3c9631" },
    { label: "Game", value: 43, color: "#7fbf6a" },
  ],
  note: "Dua pertiga waktunya habis di aplikasi yang tidak pernah punya ujung.",
};

export const DIMAS_SETELAH = {
  title: "Waktu layar Dimas, 30 hari kemudian",
  kind: "bars",
  format: "number",
  items: [
    { label: "Minggu 1 (menit/hari)", value: 432, color: "#c0392b" },
    { label: "Minggu 2", value: 318, color: "#e07a1f" },
    { label: "Minggu 3", value: 221, color: "#f4ac13" },
    { label: "Minggu 4", value: 164, color: "#1d7a34" },
  ],
  note: "Tidak nol, dan memang tidak perlu nol. Yang berubah: Dimas yang memilih.",
};

/** Bab 2: cek pemahaman tentang mesin di balik gulir tanpa ujung (D50, uji pengetahuan). */
export const MESIN_SCROLL = {
  id: "mesin-scroll",
  mode: "knowledge",
  label: "Cek pemahaman",
  title: "Sudah kenal mesinnya?",
  intro: "Empat pertanyaan singkat dari bab ini. Jawaban terkunci setelah dipilih.",
  questions: [
    {
      q: 'Kenapa tombol "halaman berikutnya" dulu membantu kita berhenti?',
      options: [
        {
          label: "Karena ada momen untuk memutuskan: lanjut atau sudah cukup",
          points: 0,
          correct: true,
        },
        { label: "Karena halamannya lebih lambat dimuat", points: 0 },
        { label: "Karena isinya lebih membosankan", points: 0 },
      ],
      explain:
        "Tombol itu memaksa satu keputusan kecil. Gulir tanpa ujung menghapus momen berhenti itu.",
    },
    {
      q: "Menarik layar ke bawah untuk memuat ulang beranda paling mirip dengan…",
      options: [
        { label: "Membalik halaman buku", points: 0 },
        { label: "Menarik tuas mesin judi", points: 0, correct: true },
        { label: "Menonton acara TV yang terjadwal", points: 0 },
      ],
      explain:
        "Isinya tidak bisa ditebak, kadang menarik, kadang tidak. Hadiah acak seperti ini justru membuat kita terus mencoba.",
    },
    {
      q: "Menurut pengamatan Gloria Mark (2016–2020), rata-rata orang bertahan di satu layar sebelum berpindah sekitar…",
      options: [
        { label: "10 menit", points: 0 },
        { label: "2,5 menit", points: 0 },
        { label: "47 detik", points: 0, correct: true },
      ],
      explain:
        "Pada 2003 sekitar dua setengah menit. Belakangan tinggal sekitar 47 detik, dan separuh perpindahan dimulai sendiri tanpa ada yang mengganggu.",
    },
    {
      q: "Dua titik lemah lingkaran scroll yang akan kita serang mulai Bab 5 adalah…",
      options: [
        { label: "Isi video dan jumlah teman", points: 0 },
        { label: "Pemicu dan tidak adanya ujung", points: 0, correct: true },
        { label: "Ukuran layar dan baterai", points: 0 },
      ],
      explain: "Ubah pemicunya dan pasang ujung buatanmu sendiri, lingkarannya melemah.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Baca ulang bagian hadiah acak",
      text: "Mesin ini lebih mudah dilawan kalau kamu tahu cara kerjanya. Lihat lagi gambar lingkaran scroll sebelum lanjut.",
    },
    {
      min: 3,
      max: 4,
      title: "Kamu sudah kenal mesinnya",
      text: "Sekarang tinggal mengubah pemicu dan memasang ujung. Itu pekerjaan Bab 5 dan 6.",
    },
  ],
};
