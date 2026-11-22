/**
 * Unsur interaktif "Gajian Kok Cepat Habis?" (D42). Tokoh: Fikri, 26, desainer grafis di Bandung,
 * gaji bersih Rp6,8 juta, gajian tanggal 25 (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Tidak", points: 0 },
  ],
});

export const TANDA_BOCOR = {
  id: "tanda-gaji-bocor",
  mode: "score",
  label: "Cek kebocoran",
  title: "Tanda-tanda gajimu bocor",
  intro: "Jawab untuk tiga bulan terakhir.",
  questions: [
    yn("Aku tidak tahu persis berapa pengeluaranku bulan lalu."),
    yn("Seminggu sebelum gajian, saldoku sudah hampir habis."),
    yn("Tabungan hanya diisi kalau ada sisa di akhir bulan."),
    yn("Uang belanja, tabungan, dan tagihan ada di satu rekening yang sama."),
    yn("Aku punya langganan aplikasi yang jarang kupakai."),
    yn("Setiap kali gaji naik, pengeluaranku ikut naik dan tabunganku tetap."),
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Arus yang terkendali",
      text: "Kamu sudah cukup rapi. Bab 7 dan 9 membantumu menjaga ritmenya, termasuk saat gaji naik.",
    },
    {
      min: 2,
      max: 4,
      title: "Ada kebocoran",
      text: "Beberapa pipa bocor. Mulai dari catatan 14 hari (Bab 2) supaya kamu tahu bocornya di mana.",
    },
    {
      min: 5,
      max: 6,
      title: "Arus tanpa keran",
      text: "Gajimu mengalir tanpa rencana. Bab 3 (tiga kantong) dan Bab 4 (jatah harian) akan paling terasa.",
    },
  ],
};

export const CATATAN_FIKRI = {
  title: "14 hari pertama setelah gajian, menurut catatan Fikri",
  kind: "bars",
  format: "rupiah",
  items: [
    { label: "Makan utama", value: 820000, color: "#2b6cb0" },
    { label: "Belanja daring", value: 650000, color: "#e07a3f" },
    { label: "Nongkrong", value: 380000, color: "#e07a3f" },
    { label: "Kopi dan jajan", value: 300000, color: "#e07a3f" },
    { label: "Ongkir dan biaya pesan antar", value: 120000, color: "#e07a3f" },
    { label: "Lain-lain", value: 230000, color: "#7f9cb5" },
  ],
  note: "Ilustrasi. Total Rp2,5 juta dalam dua minggu: seluruh uang bebas sebulan, habis di paruh pertama.",
};

/** Bab 5: hitung cepat kebocoran kecil (D50, uji pengetahuan). */
export const HITUNG_TETES = {
  id: "hitung-tetes",
  mode: "knowledge",
  label: "Hitung cepat",
  title: "Berapa satu tetes kalau dihitung setahun?",
  intro: "Tebak dulu sebelum melihat penjelasannya. Kebanyakan orang menebak terlalu kecil.",
  questions: [
    {
      q: "Kopi Rp30.000, setiap hari kerja (5 hari seminggu). Setahun kira-kira…",
      options: [
        { label: "Rp1,5 juta", points: 0 },
        { label: "Rp3,6 juta", points: 0 },
        { label: "Rp7,8 juta", points: 0, correct: true },
      ],
      explain: "Rp30.000 × 5 hari × 52 minggu = Rp7,8 juta. Lebih dari satu bulan gaji Fikri.",
    },
    {
      q: "Langganan aplikasi Rp49.000 per bulan yang jarang dibuka. Setahun…",
      options: [
        { label: "Rp49 ribu", points: 0 },
        { label: "Rp588 ribu", points: 0, correct: true },
        { label: "Rp1,2 juta", points: 0 },
      ],
      explain: "Rp49.000 × 12 = Rp588.000. Kecil per bulan, karena itulah mudah terlupa.",
    },
    {
      q: "Dalam eksperimen lelang Prelec & Simester, peserta yang membayar dengan kartu kredit…",
      options: [
        { label: "Menawar lebih rendah dari yang membayar tunai", points: 0 },
        { label: "Menawar kurang lebih sama", points: 0 },
        { label: "Menawar jauh lebih tinggi untuk barang yang sama", points: 0, correct: true },
      ],
      explain:
        "Membayar tanpa melihat uangnya pergi terasa lebih ringan. Karena itu, hapus kartu yang tersimpan di aplikasi belanja.",
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Tetesnya terasa lebih kecil dari kenyataannya",
      text: "Itu sebabnya kebocoran kecil sulit dihentikan. Isi Pencari Kebocoran di bawah dengan angkamu sendiri.",
    },
    {
      min: 2,
      max: 3,
      title: "Kamu bisa melihat embernya",
      text: "Pilih satu kebocoran terbesar dan kurangi separuhnya bulan ini.",
    },
  ],
};
