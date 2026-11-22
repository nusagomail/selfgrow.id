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
      text: "Kamu sudah cukup rapi. Bab 6 membantumu menjaga ritmenya saat gaji naik.",
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
