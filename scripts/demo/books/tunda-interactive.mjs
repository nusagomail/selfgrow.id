/**
 * Unsur interaktif "Berhenti Menunda Mulai Hari Ini" (D42). Tokoh: Dinda, 22, mahasiswa
 * tingkat akhir yang bab 3 skripsinya tertunda empat bulan (ilustrasi). Kuis menangkap tanda
 * "perbaikan suasana hati" (mood repair), bukan menilai kemalasan.
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Sering", points: 2 },
    { label: "Kadang", points: 1 },
    { label: "Jarang", points: 0 },
  ],
});

export const TANDA_MENGHINDAR = {
  id: "tanda-menghindar",
  mode: "scale",
  label: "Cek pola",
  title: "Apa yang kamu lakukan tepat sebelum menunda?",
  intro: "Ingat saat terakhir kamu membuka tugas lalu menutupnya lagi.",
  questions: [
    yn("Tiba-tiba merasa perlu membereskan meja, kamar, atau berkas di laptop."),
    yn('Membuka ponsel "sebentar" dalam lima menit pertama.'),
    yn("Mencari referensi atau tutorial terus-menerus tanpa mulai menulis atau mengerjakan."),
    yn("Merasa harus menunggu suasana hati yang pas atau waktu luang yang panjang."),
    yn("Membayangkan hasil akhirnya akan dinilai jelek, lalu dadamu terasa berat."),
    yn("Setelah menunda, kamu lega sebentar, lalu merasa bersalah."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Penundaan sesekali",
      text: "Kamu jarang menunda karena perasaan. Alat di Bab 6 (tenggat kecil, jauhkan gangguan) mungkin sudah cukup.",
    },
    {
      min: 5,
      max: 8,
      title: "Menunda untuk menenangkan diri",
      text: "Sebagian penundaanmu adalah cara menghindari rasa tidak nyaman. Bab 2 dan 3 akan sangat membantu.",
    },
    {
      min: 9,
      max: 12,
      title: "Perasaan yang memegang kemudi",
      text: "Tugasnya mungkin tidak sulit; perasaan di sekitarnya yang berat. Mulai dari Bab 1 dan Bab 9, lalu langkah dua menit di Bab 3.",
    },
  ],
};

export const HARI_DINDA = {
  title: "Empat jam di perpustakaan, menurut catatan Dinda",
  kind: "bars",
  format: "number",
  items: [
    { label: 'Scroll ponsel "sebentar"', value: 85, color: "#ff5fa2" },
    { label: "Mencari referensi tanpa menulis", value: 70, color: "#ffb02e" },
    { label: "Merapikan folder dan catatan", value: 40, color: "#2ec4b6" },
    { label: "Makan dan mengobrol", value: 40, color: "#8d99ae" },
    { label: "Menulis skripsi", value: 5, color: "#b5e853" },
  ],
  note: "Menit, ilustrasi. Total 240 menit.",
};

/** Bab 9: pagi setelah menunda seharian (D50, skenario). */
export const PAGI_SETELAHNYA = {
  id: "pagi-setelahnya",
  mode: "scenario",
  label: "Rabu pagi",
  title: "Kemarin kamu menunda seharian. Tidak satu kalimat pun ditulis.",
  questions: [
    {
      q: "Kalimat pertama yang muncul di kepalamu pagi ini…",
      options: [
        {
          label: '"Aku memang pemalas. Percuma."',
          points: 0,
          feedback:
            "Menghukum diri membuat perasaan makin berat, dan perasaan berat itulah yang membuat tugas dihindari lagi.",
        },
        {
          label:
            '"Kemarin aku menghindar karena takut hasilnya jelek. Wajar. Hari ini mulai dua menit."',
          points: 2,
          feedback:
            "Ini memaafkan diri yang dipelajari Wohl dkk. (2010): mahasiswa yang memaafkan diri lebih sedikit menunda di ujian berikutnya.",
        },
        {
          label: '"Hari ini aku harus mengejar semuanya sekaligus, delapan jam penuh."',
          points: 0,
          feedback:
            "Target raksasa sebagai hukuman membuat tugasnya terasa makin menakutkan. Kecilkan langkah pertamanya.",
        },
      ],
    },
    {
      q: "Laptop terbuka. Apa langkah pertamamu?",
      options: [
        {
          label: "Menulis tiga judul subbab, lalu boleh berhenti.",
          points: 2,
          feedback: "Terlalu kecil untuk ditolak. Kalau setelahnya ingin lanjut, lanjutkan.",
        },
        {
          label: "Merapikan folder dulu supaya lebih semangat.",
          points: 0,
          feedback:
            "Ini lingkaran menghindar yang menyamar sebagai persiapan. Rapikan setelah dua menit menulis.",
        },
        {
          label: "Membaca satu jurnal lagi sebelum mulai menulis.",
          points: 1,
          feedback:
            "Bisa berguna, tapi sering jadi cara aman untuk tidak menulis. Tulis dulu, baca kemudian.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Hari yang dimulai dengan menghukum diri",
      text: "Coba ucapkan kalimat memaafkan diri dengan suara, lalu kerjakan langkah dua menit.",
    },
    {
      min: 3,
      max: 4,
      title: "Hari yang dimulai lagi",
      text: "Gagal sehari tidak menghapus kemajuanmu. Yang menentukan adalah apa yang kamu lakukan pagi ini.",
    },
  ],
};
