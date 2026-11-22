/**
 * Unsur interaktif "Seminggu dalam Satu Jam" (D42). Tokoh: Tari, 31, koordinator proyek
 * (ilustrasi). Kuis menilai siapa yang mengendalikan minggumu.
 */
const yes = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Tidak", points: 0 },
  ],
});

export const KENDALI_MINGGU = {
  id: "kendali-minggu",
  mode: "score",
  label: "Cek kemudi",
  title: "Minggumu dikendalikan siapa?",
  intro: "Jawab untuk minggu lalu. Skor tinggi berarti minggumu lebih banyak diatur orang lain.",
  questions: [
    yes("Senin pagi aku membuka kotak masuk sebelum tahu apa prioritasku minggu ini."),
    yes("Ada pekerjaan penting yang sudah tertunda lebih dari dua minggu."),
    yes("Kalenderku hanya berisi rapat, bukan waktu untuk pekerjaanku sendiri."),
    yes("Aku sering bekerja di malam hari atau akhir pekan untuk mengejar ketertinggalan."),
    yes("Aku tidak ingat apa tiga pencapaian terbesarku minggu lalu."),
    yes("Daftar tugasku lebih dari 20 butir dan terus bertambah."),
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Kamu yang memegang kemudi",
      text: "Pertahankan. Bab 5 dan 6 membantumu menjaga ritme saat minggu sedang berantakan.",
    },
    {
      min: 2,
      max: 4,
      title: "Kemudi dipegang bergantian",
      text: "Sebagian minggu masih diatur keadaan. Ritual satu jam di Bab 2 sampai 4 akan menggeser keseimbangannya.",
    },
    {
      min: 5,
      max: 6,
      title: "Minggumu diatur orang lain",
      text: "Bukan karena kamu kurang disiplin. Kamu hanya belum punya waktu khusus untuk merencanakan. Mulai dari Bab 2.",
    },
  ],
};

export const MINGGU_BARS = {
  title: "Ke mana 40 jam kerja Tari pergi (sebelum ritual)",
  kind: "bars",
  format: "number",
  items: [
    { label: "Rapat", value: 14, color: "#5b4b8a" },
    { label: "Membalas pesan dan surel", value: 11, color: "#8a7bc0" },
    { label: "Pekerjaan mendadak", value: 8, color: "#c7a23a" },
    { label: "Pekerjaan penting (proyek utama)", value: 7, color: "#2f3e5c" },
  ],
  note: "Jam per minggu, ilustrasi dari catatan waktu Tari selama satu minggu.",
};

/** Bab 6: rencana jika-maka saat rapat mendadak (D50, skenario). */
export const RAPAT_MENDADAK = {
  id: "rapat-mendadak",
  mode: "scenario",
  label: "Rabu, 09.05",
  title: "Klien terbesar minta rapat mendadak, tepat di jam batu besarmu.",
  questions: [
    {
      q: "Apa yang kamu lakukan?",
      options: [
        {
          label: "Terima saja. Batu besarnya dikerjakan nanti kalau sempat.",
          points: 0,
          feedback:
            '"Nanti kalau sempat" jarang datang. Batu besar paling sering kalah oleh hal mendesak yang datang tiba-tiba.',
        },
        {
          label:
            "Jalankan rencana jika–maka: tawarkan slot lain, atau pindahkan batu besar ke slot cadangan Kamis pagi.",
          points: 2,
          feedback:
            "Keputusannya sudah diambil di hari yang tenang. Kamu tinggal menjalankannya, tanpa menimbang ulang di tengah kesibukan.",
        },
        {
          label: "Tolak rapatnya. Rencana adalah rencana.",
          points: 1,
          feedback:
            "Melindungi waktu itu bagus, tapi klien terbesar mungkin memang penting. Rencana yang baik punya jalan keluar, bukan hanya pagar.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Minggu yang dikendalikan kotak masuk",
      text: "Tulis satu rencana jika–maka untuk gangguan yang paling sering datang.",
    },
    {
      min: 2,
      max: 2,
      title: "Rencana yang lentur",
      text: "Batu besar tetap aman karena sudah ada slot cadangan.",
    },
  ],
};
