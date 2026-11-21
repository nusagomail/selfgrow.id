/**
 * Video pengantar "Dana Darurat dari Nol" (D46). Konsep: buku tabungan yang terbuka sepanjang
 * video. Halaman 1 mencetak minggu buruk Bagas, halaman 2 mencetak setoran Rp300.000 per bulan
 * dan penarikan layar HP yang dicap "tanpa utang". Template: darurat.html. Angka ada di Bab 1–3.
 */
export const DARURAT_INTRO = {
  slug: "dana-darurat-dari-nol",
  template: "darurat.html",
  music: { mood: "hangat", bpm: 90 },
  captions: true,
  scenes: [
    {
      type: "hook",
      say: "Motor mogok, biaya servis dua koma delapan juta. Saldo Bagas hanya enam ratus ribu. Jadilah cicilan paylater tiga bulan.",
    },
    {
      type: "rule",
      say: "Dana darurat dihitung dari pengeluaran wajib, tiga sampai enam bulan. Untuk Bagas, sepuluh setengah juta. Tapi mulainya cukup satu juta dulu.",
    },
    {
      type: "start",
      say: "Caranya kecil dan otomatis: sepuluh ribu sehari, dipindahkan setiap gajian, ditambah separuh THR.",
    },
    {
      type: "used",
      say: "Bulan ketiga, layar ponselnya pecah. Kali ini dibayar tanpa utang.",
    },
    {
      type: "end",
      say: "Dana Darurat dari Nol. Baca bab pertama, gratis.",
    },
  ],
};
