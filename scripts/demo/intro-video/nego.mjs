/**
 * Video pengantar "Berani Nego Gaji" (D46). Konsep: papan catur dan jam catur sepanjang video.
 * Jam menghitung sepuluh detik Raka menerima tawaran, batang emas menunjukkan harga diam
 * (≈ Rp76 juta dalam lima tahun), bidak bergerak untuk lima langkah, jam berganti menjadi
 * hitungan "diam" setelah kalimat nego, lalu hasil akhir jatuh di papan. Template: nego.html.
 * Semua angka ada di buku (Bab 1–5).
 */
export const NEGO_INTRO = {
  slug: "berani-nego-gaji",
  template: "nego.html",
  music: { mood: "semangat", bpm: 96 },
  captions: true,
  scenes: [
    {
      type: "hook",
      say: "Sepuluh detik. Itu waktu yang Raka butuhkan untuk menerima tawaran gaji pertamanya, tanpa bertanya.",
    },
    {
      type: "cost",
      say: "Selisih satu juta sebulan terdengar kecil. Tapi dibayar tiga belas kali setahun, dan ikut naik setiap tahun. Dalam lima tahun, sekitar tujuh puluh enam juta.",
    },
    {
      type: "moves",
      say: "Negosiasi bukan soal berani. Ini lima langkah: riset angka, tentukan rentang, siapkan bukti, sebut angka, lalu tawar paketnya.",
    },
    {
      type: "line",
      say: "Kalimatnya sederhana. Sebut rentang, dengan batas bawah yang memang kamu inginkan. Lalu diam. Biarkan hening bekerja.",
    },
    {
      type: "result",
      say: "Setahun kemudian, Raka mencoba lagi. Delapan juta menjadi sembilan setengah, ditambah anggaran sertifikasi dan tinjauan gaji enam bulan.",
    },
    {
      type: "end",
      say: "Berani Nego Gaji. Mulai dari bab pertama, gratis.",
    },
  ],
};
