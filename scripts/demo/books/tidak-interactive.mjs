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
