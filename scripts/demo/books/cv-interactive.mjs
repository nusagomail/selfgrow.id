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
      text: "Fondasinya ada. Perkuat kalimat pencapaian (Bab 3) dan kata kunci (Bab 4).",
    },
    {
      min: 5,
      max: 6,
      title: "Siap dikirim",
      text: "CV-mu sudah rapi. Bab 5 membantumu menyesuaikannya untuk setiap lowongan.",
    },
  ],
};
