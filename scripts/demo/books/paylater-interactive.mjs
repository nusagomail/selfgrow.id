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
  mode: "score",
  label: "Cek jerat",
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

/** Bab 3: momen di halaman pembayaran (D50, skenario). */
export const DI_KASIR = {
  id: "di-kasir",
  mode: "scenario",
  label: "Pukul 22.40",
  title: "Kamu baru pulang lembur. Di keranjang ada sepatu Rp1,2 juta.",
  intro:
    'Saldo tinggal Rp300 ribu, gajian masih sembilan hari lagi. Tombol paling atas berbunyi: "Bayar nanti 3× Rp400 ribu, 0%".',
  questions: [
    {
      q: "Apa yang kamu lakukan?",
      options: [
        {
          label: 'Tekan "bayar nanti". Toh cuma Rp400 ribu sebulan.',
          points: 0,
          feedback:
            'Ini persis momen yang dirancang aplikasinya: kamu lelah, sudah malam, dan angka cicilan ditulis lebih besar daripada totalnya. Rp400 ribu ini akan ikut "mengambang" di luar rekening mana pun di kepalamu.',
        },
        {
          label: "Biarkan di keranjang dan tutup aplikasinya. Lihat lagi besok siang.",
          points: 2,
          feedback:
            "Jeda adalah rem yang hilang di paylater. Besok siang, saat tidak lelah, kamu bisa memutuskan dengan kepala yang lebih jernih. Sering kali keinginannya sudah lewat.",
        },
        {
          label: "Cari kode promo dulu. Kalau dapat diskon, langsung beli.",
          points: 0,
          feedback:
            'Mencari promo terasa seperti berhemat, tapi pertanyaannya bergeser dari "perlu atau tidak" ke "berapa diskonnya". Hitung mundur promo juga sering sengaja memotong waktu berpikirmu.',
        },
        {
          label: "Catat jam dan perasaanmu sekarang, lalu tidur.",
          points: 2,
          feedback:
            "Kamu sedang mengerjakan latihan bab ini: mengenali pemicu. Lelah pukul 22.40 adalah pemicu, bukan alasan untuk berutang.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Pemicunya menang kali ini",
      text: "Tidak apa-apa, ini latihan. Pindahkan aplikasi belanja ke folder terakhir supaya ada satu langkah jeda berikutnya.",
    },
    {
      min: 2,
      max: 2,
      title: "Kamu memberi jeda pada otakmu",
      text: "Jeda kecil itulah yang memutus lingkaran. Lakukan lagi saat godaan berikutnya datang.",
    },
  ],
};
