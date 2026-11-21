/**
 * Video pengantar "Stoik untuk Hidup Sehari-hari" (D46). Konsep: lempeng batu dengan tiga
 * lingkaran kendali. Kekhawatiran jatuh sebagai kerikil berlabel, lalu dipilah ke cincinnya;
 * contoh penilaian (macet) diubah. Template: stoik.html. Isi ada di Bab 2–3.
 */
export const STOIK_INTRO = {
  slug: "stoik-untuk-hidup-sehari-hari",
  template: "stoik.html",
  music: { mood: "tenang", bpm: 76 },
  captions: true,
  scenes: [
    {
      type: "hook",
      say: "Macet, atasan yang marah, harga yang naik. Kebanyakan energi kita habis untuk hal yang tidak bisa kita ubah.",
    },
    {
      type: "question",
      say: "Dua ribu tahun lalu, Epiktetos memberi satu pertanyaan sederhana: ini dalam kendaliku, atau tidak?",
    },
    {
      type: "sort",
      say: "Yang di luar kendali, lepaskan. Yang di dalam kendali, seperti sikap, kata, dan usaha, kerjakan sepenuh hati.",
    },
    {
      type: "judge",
      say: "Bukan kejadiannya yang membuat kita gelisah, tapi penilaian kita tentangnya. Dan penilaian bisa dilatih.",
    },
    {
      type: "end",
      say: "Stoik untuk Hidup Sehari-hari. Baca bab pertama, gratis.",
    },
  ],
};
