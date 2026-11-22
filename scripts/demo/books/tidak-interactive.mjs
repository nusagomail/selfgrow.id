/**
 * Unsur interaktif "Berani Bilang Tidak" (D42). Kuis memakai skala frekuensi (0–3), berbeda dari
 * kuis ya/tidak di buku lain. Tokoh Sari, Bayu, Rina dan angkanya adalah ilustrasi.
 */
const scale = (q) => ({
  q,
  options: [
    { label: "Tidak pernah", points: 0 },
    { label: "Kadang-kadang", points: 1 },
    { label: "Sering", points: 2 },
    { label: "Hampir selalu", points: 3 },
  ],
});

export const POLA_IYA = {
  id: "pola-iya",
  mode: "score",
  label: "Cek kebiasaan",
  title: 'Seberapa sering "iya" keluar duluan?',
  intro: "Pikirkan sebulan terakhir. Pilih yang paling mendekati, bukan yang paling ideal.",
  questions: [
    scale("Aku bilang iya, lalu menyesal beberapa menit kemudian."),
    scale("Aku menyiapkan alasan panjang sebelum menolak sesuatu."),
    scale("Aku merasa bersalah berhari-hari setelah menolak."),
    scale("Aku mengerjakan tugas orang lain sampai pekerjaanku sendiri tertunda."),
    scale("Aku pura-pura sibuk supaya tidak perlu menolak secara langsung."),
    scale("Aku meminjamkan uang yang sebenarnya sedang kubutuhkan."),
    scale("Aku memendam kesal ke orang yang sering minta tolong padaku."),
    scale("Aku takut dianggap sombong atau tidak tahu diri kalau menolak."),
  ],
  results: [
    {
      min: 0,
      max: 6,
      title: "Sudah cukup asertif",
      text: "Kamu bisa menolak tanpa drama. Bab 4 dan 7 membantumu mengasah caranya supaya tetap hangat.",
    },
    {
      min: 7,
      max: 14,
      title: "Kadang terseret",
      text: 'Di situasi tertentu, "iya" keluar sebelum kamu sempat berpikir. Cari tahu situasi mana di Bab 3.',
    },
    {
      min: 15,
      max: 24,
      title: "Penyenang orang",
      text: "Kamu sering mengorbankan dirimu supaya orang lain senang. Itu tanda hati yang baik, tapi kamu juga berhak dijaga. Pelan-pelan saja, mulai dari Bab 2.",
    },
  ],
};

export const UNDANGAN_COUNTER = {
  title: "Pernah menerima ajakan yang sebenarnya tidak ingin dihadiri",
  kind: "counter",
  format: "percent",
  items: [
    { label: "responden, karena khawatir akibatnya kalau menolak", value: 77, color: "#e4572e" },
  ],
  note: "Studi awal Givi & Kirk, Journal of Personality and Social Psychology (2023).",
};

export const MINGGU_SARI = {
  title: "Seminggu Sari: jam untuk permintaan orang lain",
  kind: "bars",
  format: "number",
  items: [
    { label: "Lembur menggantikan rekan (jam)", value: 6, color: "#e4572e" },
    { label: "Mengecek laporan tim lain", value: 4, color: "#f08a4b" },
    { label: "Rapat yang tidak perlu dia hadiri", value: 3, color: "#8e4a7a" },
    { label: "Antar-jemput titipan", value: 2, color: "#5b2a4e" },
  ],
  note: "15 jam seminggu. Hampir dua hari kerja yang bukan pekerjaannya.",
};

const gaya = (correct) =>
  ["Pasif", "Agresif", "Asertif"].map((label) => ({
    label,
    points: 0,
    correct: label === correct,
  }));

/** Bab 2: tebak gaya kalimat (D50, uji pengetahuan). */
export const TEBAK_GAYA = {
  id: "tebak-gaya",
  mode: "knowledge",
  label: "Latihan telinga",
  title: "Pasif, agresif, atau asertif?",
  intro: "Baca setiap kalimat dengan suara pelan, lalu tebak gayanya.",
  questions: [
    {
      q: '"Ya ampun, iya deh, nanti aku kerjain." (padahal sudah lembur tiga hari)',
      options: gaya("Pasif"),
      explain: "Mengiyakan sambil menelan keberatan. Rekanmu tidak tahu kamu sudah kewalahan.",
    },
    {
      q: '"Minggu ini aku nggak bisa ambil tambahan. Kalau mendesak, aku bisa bantu cek drafnya hari Senin."',
      options: gaya("Asertif"),
      explain: "Batasnya jelas, tanpa menyalahkan, dan ada tawaran yang memang sanggup dijalankan.",
    },
    {
      q: '"Kamu kira aku nggak punya kerjaan sendiri?"',
      options: gaya("Agresif"),
      explain: "Penolakannya tersampaikan, tapi lewat serangan. Hubungan yang menanggung biayanya.",
    },
    {
      q: '"Terserah kamu aja deh." (lalu diam seharian)',
      options: gaya("Pasif"),
      explain:
        "Kelihatannya mengalah, tapi kesalnya bocor lewat diam. Ini sering disebut pasif-agresif.",
    },
    {
      q: '"Bulan ini aku belum bisa pinjamkan uang, karena lagi nabung untuk DP. Semoga cepat ketemu jalan keluarnya, ya."',
      options: gaya("Asertif"),
      explain: "Jujur tentang batas dan alasannya, tetap hangat pada orangnya.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Telinga yang masih belajar",
      text: "Wajar. Kita jarang mendengar kalimat asertif di sekitar kita. Baca lagi tabel tiga gaya di atas.",
    },
    {
      min: 3,
      max: 4,
      title: "Hampir peka",
      text: "Kamu sudah bisa membedakan sebagian besar. Perhatikan pasif-agresif: sering menyamar jadi mengalah.",
    },
    {
      min: 5,
      max: 5,
      title: "Telinga yang tajam",
      text: "Kamu bisa mengenali gaya kalimat. Langkah berikutnya: mengucapkannya sendiri (Bab 4).",
    },
  ],
};
