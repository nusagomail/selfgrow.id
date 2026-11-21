/** Unsur interaktif "Lepas dari Jerat Paylater" (D42): kuis yang dipakai di Bab 1 dan Bab 10. */
const yesNo = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Tidak", points: 0 },
  ],
});

export const SKOR_JERAT = {
  id: "skor-jerat",
  title: "Seberapa dalam kamu terjerat?",
  intro: "Jawab jujur. Tidak ada yang melihat jawabanmu selain kamu sendiri.",
  questions: [
    yesNo("Aku punya lebih dari dua cicilan paylater yang aktif sekarang."),
    yesNo("Aku pernah memakai paylater untuk makan atau kebutuhan harian."),
    yesNo("Aku tidak tahu persis total cicilanku bulan ini tanpa membuka aplikasi."),
    yesNo("Aku pernah telat bayar dan kena denda dalam enam bulan terakhir."),
    yesNo("Aku pernah membayar satu utang dengan utang lain."),
    yesNo("Lebih dari 20% gajiku habis untuk cicilan."),
    yesNo("Aku merasa cemas setiap kali ada notifikasi tagihan."),
    yesNo("Aku menyembunyikan cicilanku dari pasangan atau keluarga."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Zona aman",
      text: "Kamu belum terjerat. Buku ini membantumu membangun pagar sebelum terlambat.",
    },
    {
      min: 3,
      max: 5,
      title: "Jalur licin",
      text: "Kamu mulai tergelincir. Jalankan langkah Bab 4 minggu ini juga.",
    },
    {
      min: 6,
      max: 8,
      title: "Di dalam lingkaran",
      text: "Kamu sudah terjerat, tapi ada jalan keluar, dan kamu sudah memulainya dengan membaca halaman ini.",
    },
  ],
};

export const CICILAN_COUNTER = {
  title: "Cicilan Nadia per bulan",
  kind: "counter",
  format: "rupiah",
  items: [
    { label: "Januari: satu headset", value: 131200, color: "#1d7a34" },
    { label: "September: tujuh cicilan", value: 1588200, color: "#c0392b" },
  ],
  note: "Tidak ada satu pun keputusan yang terasa besar.",
};

export const HEMAT_BARS = {
  title: "Uang yang ditemukan Nadia setiap bulan",
  kind: "bars",
  format: "rupiah",
  items: [
    { label: "Pesan antar", value: 300000, color: "#1d7a34" },
    { label: "Ojek ke halte", value: 230000, color: "#3c9631" },
    { label: "Nongkrong", value: 90000, color: "#7fbf6a" },
    { label: "Langganan", value: 80000, color: "#a8d49a" },
  ],
  note: "Total Rp700.000 per bulan, tanpa gaji tambahan.",
};
