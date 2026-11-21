/**
 * Video pengantar "Seminggu dalam Satu Jam" (D46). Konsep: halaman planner dengan kalender
 * Senin–Jumat sepanjang video dan jam ritual 60 menit yang terisi per bagian. Minggu kacau
 * tersapu ke catatan, tiga batu besar jatuh ke pagi hari, cadangan 20% muncul. Template:
 * minggu.html. Angka (×1,5; 40 − 12 jam − 20% = 22,4 jam) ada di Bab 3–4.
 */
export const MINGGU_INTRO = {
  slug: "seminggu-dalam-satu-jam",
  template: "minggu.html",
  music: { mood: "tenang", bpm: 90 },
  captions: true,
  scenes: [
    {
      type: "hook",
      say: "Minggu Tari selalu sama. Rapat dadakan, pesan mendesak, dan pekerjaan penting yang terus tergeser ke minggu depan.",
    },
    {
      type: "dump",
      say: "Lalu ia mencoba satu jam setiap Minggu sore. Pertama, kosongkan kepala: tulis semua yang mengganjal.",
    },
    {
      type: "rocks",
      say: "Lalu pilih tiga batu besar, dan pasang di kalender lebih dulu. Sebelum rapat, sebelum pesan masuk.",
    },
    {
      type: "buffer",
      say: "Sisakan sekitar dua puluh persen kosong, karena pekerjaan hampir selalu butuh waktu lebih lama dari dugaan.",
    },
    {
      type: "end",
      say: "Seminggu dalam Satu Jam. Baca bab pertama, gratis.",
    },
  ],
};
