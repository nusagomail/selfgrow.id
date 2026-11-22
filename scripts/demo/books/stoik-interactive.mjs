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
  mode: "scale",
  label: "Cek energi",
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
      text: "Kamu sudah cukup pandai memilih medan. Bab 4 sampai 6 membantu menjaganya di hari-hari sulit.",
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

const kendali = (correct) =>
  ["Dalam kendaliku", "Bisa kupengaruhi", "Di luar kendaliku"].map((label) => ({
    label,
    points: 0,
    correct: label === correct,
  }));

/** Bab 2: memilah ke tiga lingkaran (D50, uji pengetahuan). */
export const PILAH_KENDALI = {
  id: "pilah-kendali",
  mode: "knowledge",
  label: "Pemilahan satu menit",
  title: "Pesan atasan pukul sembilan malam. Masuk lingkaran mana?",
  questions: [
    {
      q: "Suasana hati atasan besok pagi",
      options: kendali("Di luar kendaliku"),
      explain: "Isi pikiran dan perasaan orang lain tidak pernah sepenuhnya kita pegang.",
    },
    {
      q: "Menyiapkan data dengan rapi malam ini",
      options: kendali("Dalam kendaliku"),
      explain: "Ini pekerjaanmu sendiri, dan bisa dikerjakan sekarang.",
    },
    {
      q: "Cara rapat besok berjalan",
      options: kendali("Bisa kupengaruhi"),
      explain: "Kamu ikut menentukan lewat persiapan dan sikapmu, tapi tidak sendirian.",
    },
    {
      q: "Angka penjualan bulan ini yang sudah terjadi",
      options: kendali("Di luar kendaliku"),
      explain:
        "Sudah terjadi. Yang tersisa adalah bagaimana kamu menjelaskan dan menindaklanjutinya.",
    },
    {
      q: "Memilih bersikap tenang dan terbuka saat rapat",
      options: kendali("Dalam kendaliku"),
      explain:
        "Epiktetos menyebut ini wilayah yang sepenuhnya milik kita: penilaian dan sikap kita sendiri.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Lingkarannya masih tercampur",
      text: "Ini latihan seumur hidup bagi para Stoik juga. Pakai gambar tiga lingkaran setiap kali kamu gelisah minggu ini.",
    },
    {
      min: 3,
      max: 4,
      title: "Hampir terpilah",
      text: 'Perhatikan bedanya "bisa dipengaruhi" dan "dalam kendali": tetapkan target pada usahamu, bukan hasilnya.',
    },
    {
      min: 5,
      max: 5,
      title: "Pemilah yang jernih",
      text: "Kekhawatiran yang tadinya kabur sekarang menjadi daftar pekerjaan pendek. Sisanya boleh diletakkan.",
    },
  ],
};
