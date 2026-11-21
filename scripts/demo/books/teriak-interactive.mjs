/**
 * Unsur interaktif "Mengasuh Tanpa Teriak" (D42). Kuisnya memetakan pemicu orang tua, bukan
 * menilai anak. Tokoh: Bu Laras dengan Dimas (6) dan Kirana (3), ilustrasi.
 */
const often = (q) => ({
  q,
  options: [
    { label: "Jarang", points: 0 },
    { label: "Kadang", points: 1 },
    { label: "Sering", points: 2 },
  ],
});

export const PEMICU_TERIAK = {
  id: "pemicu-teriak",
  title: "Kapan suaraku paling mudah naik?",
  intro: "Pikirkan dua minggu terakhir. Tidak ada jawaban yang salah; ini peta, bukan rapor.",
  questions: [
    often("Saat pagi terburu-buru sebelum berangkat sekolah atau kerja."),
    often("Saat aku lapar atau kurang tidur."),
    often("Saat anak tidak mendengar setelah diminta berkali-kali."),
    often("Saat kakak dan adik bertengkar."),
    often("Saat aku sedang memikirkan urusan kerja atau uang."),
    often("Saat anak menangis atau tantrum di tempat umum."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Termometer yang cukup stabil",
      text: "Kamu jarang sampai ke titik meledak. Bab 4 membantumu punya kalimat yang tetap tenang di saat sulit.",
    },
    {
      min: 5,
      max: 8,
      title: "Ada jam-jam rawan",
      text: "Pemicunya bisa ditebak. Lingkari dua yang paling sering, lalu pakai Bab 2 dan Bab 5 untuk mencegahnya.",
    },
    {
      min: 9,
      max: 12,
      title: "Termometer sering di zona merah",
      text: "Ini tanda kamu sedang menanggung banyak hal, bukan tanda kamu orang tua yang buruk. Mulai dari merawat dirimu (Bab 2) dan latihan jeda (Bab 3).",
    },
  ],
};
