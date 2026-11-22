/**
 * Unsur interaktif "CV yang Dilirik Rekruter" (D42). Tokoh: Sekar, 25, staf pemasaran digital
 * yang sudah mengirim 40 lamaran tanpa panggilan (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Belum", points: 0 },
  ],
});

export const CEK_CV = {
  id: "cek-cv-7-detik",
  mode: "score",
  label: "Cek 7 detik",
  title: "Apakah CV-mu lolos tujuh detik?",
  intro: "Buka CV-mu sekarang dan jawab sambil melihatnya.",
  questions: [
    yn("Nama, posisi yang dilamar, dan kontak terlihat jelas di bagian paling atas."),
    yn("Setiap baris pengalaman diawali kata kerja dan memuat angka atau hasil."),
    yn("CV memakai satu kolom, tanpa tabel atau gambar yang memuat teks penting."),
    yn("Kata kunci dari lowongan muncul di ringkasan dan pengalaman kerja."),
    yn("Panjang CV satu halaman (atau dua halaman bila pengalaman lebih dari lima tahun)."),
    yn("Nama berkasnya jelas, misalnya CV_Sekar-Ayu_Digital-Marketing.pdf."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Belum terlihat",
      text: "Rekruter kemungkinan berhenti sebelum melihat kemampuanmu. Mulai dari Bab 2 dan 3.",
    },
    {
      min: 3,
      max: 4,
      title: "Hampir",
      text: "Fondasinya ada. Perkuat kalimat pencapaian (Bab 3) dan kata kunci (Bab 5).",
    },
    {
      min: 5,
      max: 6,
      title: "Siap dikirim",
      text: "CV-mu sudah rapi. Bab 6 membantumu menyesuaikannya untuk setiap lowongan.",
    },
  ],
};

const ats = (aman) => [
  { label: "Aman", points: 0, correct: aman },
  { label: "Berisiko", points: 0, correct: !aman },
];

/** Bab 5: format yang terbaca mesin (D50, uji pengetahuan). */
export const LOLOS_MESIN = {
  id: "lolos-mesin",
  mode: "knowledge",
  label: "Aman atau berisiko?",
  title: "Format CV mana yang terbaca sistem pelacak lamaran?",
  questions: [
    {
      q: 'Satu kolom, judul bagian standar seperti "Pengalaman" dan "Pendidikan"',
      options: ats(true),
      explain:
        "Mesin membaca dari atas ke bawah. Judul standar membantunya menaruh isi di tempat yang benar.",
    },
    {
      q: "Tata letak dua kolom dengan kotak-kotak berwarna",
      options: ats(false),
      explain: "Urutan teks bisa terbaca acak. Isi kolom kanan bisa tercampur dengan kolom kiri.",
    },
    {
      q: "Keahlian ditulis di dalam gambar atau ikon",
      options: ats(false),
      explain: "Teks di dalam gambar tidak terbaca sebagai teks. Kata kuncimu hilang.",
    },
    {
      q: "Kata kunci dari lowongan dipakai apa adanya, bila memang kamu kuasai",
      options: ats(true),
      explain:
        "Cocokkan istilahnya persis. Tapi jangan menulis keterampilan yang tidak kamu miliki.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "CV-mu mungkin tidak terbaca utuh",
      text: "Simpan versi satu kolom tanpa gambar untuk dikirim lewat situs lowongan.",
    },
    {
      min: 3,
      max: 4,
      title: "Ramah mesin, enak dibaca manusia",
      text: "Langkah berikutnya: cocokkan kata kunci dengan tool di bawah.",
    },
  ],
};
