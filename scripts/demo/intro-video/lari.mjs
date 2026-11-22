/**
 * Video pengantar "Dari Rebahan ke Lari 5K" (D46). Konsep: lintasan atletik dari atas; satu
 * putaran dibagi bagian lari dan jalan yang berubah minggu demi minggu sampai satu putaran penuh
 * lari di minggu 8, lalu tes bicara. Template: lari.html. Program dan tes ada di Bab 1–2.
 */
export const LARI_INTRO = {
  slug: "dari-rebahan-ke-lari-5k",
  template: "lari.html",
  music: { mood: "semangat", bpm: 112 },
  captions: true,
  scenes: [
    {
      type: "start",
      say: "Dari rebahan ke lari lima kilometer tidak dimulai dengan lari. Dimulai dengan jalan, ditambah satu menit lari.",
    },
    {
      type: "weeks",
      say: "Setiap minggu, porsi lari bertambah sedikit dan jalan berkurang. Delapan minggu kemudian, tiga puluh menit tanpa berhenti.",
    },
    {
      type: "talk",
      say: "Patokannya sederhana: lari dengan kecepatan yang masih bisa dipakai mengobrol.",
    },
    {
      type: "end",
      say: "Dari Rebahan ke Lari 5K. Baca bab pertama, gratis.",
    },
  ],
};
