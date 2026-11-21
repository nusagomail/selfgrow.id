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
