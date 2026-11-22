/**
 * Unsur interaktif "Dana Darurat dari Nol" (D42). Tokoh: Bagas, 24, staf administrasi dengan
 * gaji Rp5,2 juta dan pengeluaran wajib Rp3,5 juta (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Tidak", points: 0 },
  ],
});

export const SIAP_DARURAT = {
  id: "siap-darurat",
  mode: "score",
  label: "Cek bantalan",
  title: "Kalau besok ada kejadian mendadak…",
  intro: "Bayangkan besok motor rusak, kamu sakit seminggu, atau kontrak kerja tidak diperpanjang.",
  questions: [
    yn("Aku bisa membayar biaya mendadak Rp1 juta tanpa berutang atau meminjam."),
    yn("Uang untuk keadaan darurat disimpan terpisah dari rekening belanja sehari-hari."),
    yn("Aku tahu berapa pengeluaran wajibku per bulan."),
    yn("Aku bisa bertahan satu bulan tanpa penghasilan."),
    yn("Ada setoran otomatis untuk tabungan setiap gajian."),
    yn(
      "Dalam setahun terakhir, aku tidak memakai paylater atau pinjaman untuk kebutuhan mendadak.",
    ),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Belum ada bantalan",
      text: "Kejadian kecil pun bisa memaksamu berutang. Bab 4 membantumu mengumpulkan Rp1 juta pertama.",
    },
    {
      min: 3,
      max: 4,
      title: "Bantalan tipis",
      text: "Fondasinya ada. Pisahkan rekeningnya (Bab 6) dan naik ke tangga berikutnya.",
    },
    {
      min: 5,
      max: 6,
      title: "Bantalan yang kokoh",
      text: "Kamu sudah siap untuk banyak kejadian. Bab 7 membahas cara menjaga dan mengisi ulangnya.",
    },
  ],
};

export const LITERASI_COUNTER = {
  title: "Melek keuangan belum sama dengan punya bantalan",
  kind: "counter",
  format: "percent",
  items: [
    { label: "indeks literasi keuangan penduduk Indonesia", value: 66.46, color: "#1f4e79" },
    {
      label: "indeks inklusi keuangan (sudah memakai produk keuangan)",
      value: 80.51,
      color: "#3f8f6b",
    },
  ],
  note: "Survei Nasional Literasi dan Inklusi Keuangan (SNLIK) 2025, OJK dan BPS.",
};

/** Bab 6: tempat menyimpan bantalan (D50, uji pengetahuan). */
export const TEMPAT_BANTALAN = {
  id: "tempat-bantalan",
  mode: "knowledge",
  label: "Cocok atau tidak?",
  title: "Di mana dana darurat sebaiknya disimpan?",
  intro: "Ingat tiga syaratnya: aman, mudah diambil, tidak tercampur uang belanja.",
  questions: [
    {
      q: "Rekening tabungan di bank berbeda, tanpa kartu di dompet",
      options: [
        { label: "Cocok", points: 0, correct: true },
        { label: "Kurang cocok", points: 0 },
      ],
      explain:
        "Aman (dijamin LPS selama memenuhi syarat), bisa diambil kapan saja, dan ada satu langkah jeda sebelum terpakai.",
    },
    {
      q: "Rekening yang sama dengan kartu debit harian",
      options: [
        { label: "Cocok", points: 0 },
        { label: "Kurang cocok", points: 0, correct: true },
      ],
      explain: "Terlalu mudah terpakai sedikit-sedikit untuk ongkir dan jajan tanpa terasa.",
    },
    {
      q: "Saham atau kripto",
      options: [
        { label: "Cocok", points: 0 },
        { label: "Kurang cocok", points: 0, correct: true },
      ],
      explain:
        "Nilainya bisa sedang turun tepat saat kamu harus mencairkannya. Simpan untuk tujuan jangka panjang, setelah bantalan cukup.",
    },
    {
      q: "Uang tunai di dalam lemari",
      options: [
        { label: "Cocok", points: 0 },
        { label: "Kurang cocok", points: 0, correct: true },
      ],
      explain:
        "Mudah diambil, tapi tidak aman dari hilang atau terpakai, dan tidak dijamin siapa pun. Sedikit tunai untuk keadaan mendesak boleh, bukan seluruh bantalan.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Bantalan di tempat yang rawan",
      text: "Pindahkan sebagian dulu ke rekening terpisah minggu ini. Sisanya menyusul.",
    },
    {
      min: 3,
      max: 4,
      title: "Tempatnya sudah tepat",
      text: "Sekarang tinggal mengisinya rutin. Transfer otomatis di hari gajian adalah teman terbaikmu.",
    },
  ],
};
