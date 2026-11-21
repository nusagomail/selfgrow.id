/**
 * Unsur interaktif "Stoik untuk Hidup Sehari-hari" (D42). Kuis memetakan ke mana energi
 * pikiran pergi selama seminggu terakhir.
 */
const scale = (q) => ({
  q,
  options: [
    { label: "Jarang", points: 0 },
    { label: "Kadang", points: 1 },
    { label: "Sering", points: 2 },
  ],
});

export const ENERGI_STOIK = {
  id: "energi-stoik",
  title: "Ke mana energi pikiranmu pergi?",
  intro:
    "Ingat tujuh hari terakhir. Skor tinggi berarti banyak energi terpakai untuk hal di luar kendalimu.",
  questions: [
    scale("Aku kesal berlarut-larut karena macet, cuaca, atau antrean."),
    scale("Aku memikirkan ulang pendapat orang lain tentangku."),
    scale("Aku membandingkan hidupku dengan unggahan orang di media sosial."),
    scale("Aku cemas tentang hal yang belum terjadi dan mungkin tidak terjadi."),
    scale("Aku menyesali keputusan lama yang sudah tidak bisa diubah."),
    scale("Aku marah pada berita atau komentar orang yang tidak kukenal."),
  ],
  results: [
    {
      min: 0,
      max: 3,
      title: "Energi yang terjaga",
      text: "Kamu sudah cukup pandai memilih medan. Bab 4 dan 5 membantu menjaganya di hari-hari sulit.",
    },
    {
      min: 4,
      max: 7,
      title: "Energi yang bocor",
      text: "Sebagian energimu mengalir ke hal di luar kendali. Latihan pemilahan di Bab 2 adalah titik awal yang tepat.",
    },
    {
      min: 8,
      max: 12,
      title: "Energi yang terkuras",
      text: "Wajar kalau kamu sering merasa lelah tanpa alasan jelas. Mulai pelan-pelan dari Bab 2, satu kekhawatiran setiap hari.",
    },
  ],
};
