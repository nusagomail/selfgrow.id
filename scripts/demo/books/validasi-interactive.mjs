/**
 * Unsur interaktif "Validasi Ide Sebelum Modal Habis" (D42). Tokoh: Nadia, 29, staf HR di
 * Makassar dengan tabungan Rp40 juta dan ide katering bekal sehat untuk karyawan (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Belum", points: 0 },
  ],
});

export const SIAP_UJI = {
  id: "siap-uji",
  title: "Seberapa siap idemu diuji?",
  intro: "Jawab jujur untuk ide usaha yang sedang kamu pikirkan.",
  questions: [
    yn('Aku bisa menyebut dengan jelas siapa pembelinya, bukan "semua orang".'),
    yn(
      "Aku sudah bicara dengan minimal sepuluh calon pembeli yang bukan keluarga atau teman dekat.",
    ),
    yn("Aku tahu bagaimana mereka mengatasi masalah ini sekarang, dan berapa yang mereka bayar."),
    yn("Sudah ada orang yang menyerahkan sesuatu: uang muka, nomor WhatsApp, atau waktunya."),
    yn("Aku tahu berapa unit yang harus terjual setiap bulan supaya tidak rugi."),
    yn("Aku sudah menentukan kapan aku akan berhenti kalau ternyata tidak laku."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih ide",
      text: "Idemu belum diuji sama sekali. Tahan dulu semua belanja besar. Mulai dari Bab 2: bicara dengan calon pembeli dengan cara yang benar.",
    },
    {
      min: 3,
      max: 4,
      title: "Mulai ada bukti",
      text: "Kamu sudah punya sebagian bukti. Bab 3 dan 4 membantumu menaikkan bukti itu dari ucapan menjadi pembayaran.",
    },
    {
      min: 5,
      max: 6,
      title: "Siap diuji lebih besar",
      text: "Buktimu sudah cukup kuat. Pakai Bab 5 untuk menghitung titik impas dan mengeluarkan modal secara bertahap.",
    },
  ],
};

export const BUKTI_NADIA = {
  title: 'Dari "mau" sampai benar-benar membayar: hasil uji Nadia',
  kind: "bars",
  format: "number",
  items: [
    { label: 'Bilang "aku pasti mau"', value: 30, color: "#c9d6cf" },
    { label: "Mengisi daftar tunggu", value: 12, color: "#8fb3a2" },
    { label: "Membayar uang muka", value: 5, color: "#3f7d64" },
    { label: "Memesan lagi di minggu kedua", value: 4, color: "#1f4d3d" },
  ],
  note: "Jumlah orang, ilustrasi. Hanya 5 dari 30 yang benar-benar membayar.",
};
