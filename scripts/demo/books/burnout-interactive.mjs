/**
 * Unsur interaktif "Burnout Bukan Lemah" (D42). Tokoh: Nadia, 29, pemimpin tim layanan
 * pelanggan di perusahaan rintisan (ilustrasi). Kuis memetakan pola pemulihan, bukan menilai diri.
 */
const often = (q) => ({
  q,
  options: [
    { label: "Hampir tak pernah", points: 2 },
    { label: "Kadang", points: 1 },
    { label: "Sering", points: 0 },
  ],
});

export const POLA_PULIH = {
  id: "pola-pulih",
  mode: "scale",
  label: "Cek pemulihan",
  title: "Seberapa sering kamu benar-benar pulih?",
  intro: "Pikirkan dua minggu terakhir. Skor tinggi berarti pemulihanmu sudah berjalan.",
  questions: [
    often("Aku membuka pesan atau surel kantor di luar jam kerja."),
    often("Aku makan siang sambil bekerja di depan layar."),
    often("Aku tidur kurang dari enam jam karena pekerjaan atau pikiran tentang pekerjaan."),
    often("Akhir pekan habis untuk mengejar ketertinggalan."),
    often("Aku menunda cuti karena merasa pekerjaan tidak bisa ditinggal."),
    often("Aku merasa bersalah saat beristirahat."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Tangki yang terus bocor",
      text: "Hampir tidak ada waktu yang benar-benar lepas dari kerja. Bab 4 adalah tempat mulai yang paling penting untukmu.",
    },
    {
      min: 5,
      max: 8,
      title: "Pulih sebagian",
      text: "Ada jeda, tapi belum cukup. Pilih satu kebocoran terbesar dan tutup dulu yang itu.",
    },
    {
      min: 9,
      max: 12,
      title: "Pemulihan yang terjaga",
      text: "Kebiasaan pemulihanmu sudah baik. Kalau tetap lelah, lihat beban dan lingkungan kerjamu di Bab 5.",
    },
  ],
};
