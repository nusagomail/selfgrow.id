/**
 * "Gajian Kok Cepat Habis?", 6 bab.
 *
 * Rancangan (dipikirkan sebelum menulis):
 * - Pembaca: karyawan 22–35 tahun bergaji tetap, saldo menipis jauh sebelum gajian, merasa
 *   "tidak boros" tapi tidak tahu uangnya ke mana.
 * - Gagasan inti: uang tidak hilang; ia mengalir tanpa diatur. Masalahnya bukan kurang hemat,
 *   tapi tidak ada keputusan sebelum uang dipakai. Buku ini sengaja tidak membahas utang
 *   (lihat "Lepas dari Jerat Paylater") dan tabungan darurat (lihat "Dana Darurat dari Nol"),
 *   tapi arus uang bulanan.
 * - Kerangka: catat 14 hari tanpa menghakimi → tiga kantong di hari gajian (pedoman 50/30/20,
 *   Warren & Tyagi 2005; akuntansi mental, Thaler 1999) → jatah harian → tambal kebocoran kecil
 *   (efek kartu terhadap kesediaan membayar, Prelec & Simester 2001) → tinjauan bulanan.
 * - Bentuk: satu tokoh, Fikri (26, desainer grafis, gaji bersih Rp6,8 juta, gajian tanggal 25).
 *   Setiap bab dibuka dengan tanggal dan saldo, karena yang dirasakan pembaca adalah tanggalnya.
 * - Gambar: instalasi pipa air dan ember; uang sebagai aliran yang diatur, kebocoran sebagai
 *   tetesan. Beda dari buku keuangan lain (krem berangka, buku tabungan).
 * - Interaktif: kuis tanda bocor, grafik 14 hari, kalkulator jatah harian, pencari kebocoran.
 */
import { CATATAN_FIKRI, TANDA_BOCOR } from "./gajian-interactive.mjs";

export const GAJIAN_1 = [
  {
    title: "Tanggal 18, Saldo Rp87.000",
    blocks: [
      "**Tanggal 18. Saldo: Rp87.000.** Gajian masih seminggu lagi.",
      "Fikri menatap aplikasi bank dan mencoba mengingat ke mana Rp6,8 juta pergi. Kos sudah dibayar, cicilan laptop juga, kiriman untuk ibu juga. Dia tidak membeli barang mahal. Tidak ada liburan. Lalu ke mana sisanya?",
      "Minggu terakhir sebelum gajian selalu sama: mi instan, menolak ajakan teman, dan janji pada diri sendiri bahwa bulan depan akan berbeda. Bulan depan biasanya sama saja.",
      ["h", "Bukan soal gaji kecil"],
      "Banyak orang dengan gaji dua kali lipat Fikri mengalami tanggal 18 yang sama. Masalahnya jarang di besar-kecilnya gaji. Masalahnya ada di **aliran**: uang masuk sekaligus, lalu keluar sedikit-sedikit tanpa ada yang mengatur, sampai habis.",
      "Buku ini tidak akan menyuruhmu berhenti minum kopi atau menghapus semua aplikasi belanja. Buku ini membantumu mengatur aliran uang **di hari gajian**, sebelum uang itu sempat dipakai.",
      ["h", "Cek dulu"],
      ["quiz", TANDA_BOCOR],
      [
        "info",
        'Buku ini membahas arus uang bulanan. Kalau kamu sedang terlilit cicilan atau pinjaman daring, mulailah dari buku "Lepas dari Jerat Paylater". Untuk membangun bantalan keuangan, lihat "Dana Darurat dari Nol".',
      ],
    ],
  },
  {
    title: "Catat 14 Hari, Jangan Menghakimi",
    blocks: [
      "**Tanggal 25. Saldo: Rp6.800.000.** Gaji masuk. Kali ini, Fikri tidak langsung belanja. Dia membuat satu catatan di ponselnya: setiap uang yang keluar, sekecil apa pun, ditulis.",
      "Aturannya hanya dua: **catat semuanya**, dan **jangan menghakimi**. Tujuan dua minggu ini bukan berhemat, tapi melihat. Kalau sambil mencatat kamu menahan diri, catatannya tidak akan menunjukkan kebiasaanmu yang sebenarnya.",
      ["h", "Hasil catatan Fikri"],
      ["chart", CATATAN_FIKRI],
      "Fikri kaget. Uang bebasnya untuk sebulan, sekitar Rp2,5 juta setelah kos, cicilan, kiriman, dan tabungan, habis dalam **dua minggu pertama**. Tidak ada satu pengeluaran yang besar; yang besar adalah jumlahnya.",
      ["h", "Kelompokkan jadi tiga"],
      [
        "table",
        [
          ["Kelompok", "Contoh", "Sifatnya"],
          ["Tetap", "Kos, cicilan, kiriman orang tua, internet", "Jumlahnya sama setiap bulan"],
          ["Berubah-ubah", "Makan, bensin, kebutuhan mandi", "Perlu, tapi jumlahnya bisa diatur"],
          [
            "Bocor",
            "Jajan, ongkir, langganan jarang dipakai, biaya admin",
            "Kecil, berulang, dan jarang disadari",
          ],
        ],
      ],
      [
        "exercise",
        [
          "Mulai hari ini, catat setiap pengeluaran selama 14 hari. Pakai catatan ponsel atau aplikasi apa pun.",
          "Jangan mengubah kebiasaanmu selama mencatat.",
          "Di hari ke-15, kelompokkan menjadi tetap, berubah-ubah, dan bocor. Jumlahkan masing-masing.",
        ],
        "Lembar kerja: 14 hari",
      ],
    ],
  },
  {
    title: "Tiga Kantong di Hari Gajian",
    blocks: [
      "**Tanggal 25 berikutnya. Saldo: Rp6.800.000.** Dalam sepuluh menit setelah gaji masuk, uang Fikri sudah tidak lagi di satu tempat.",
      ["img", "aliran-gaji", "Aliran gaji Fikri ke tiga ember."],
      'Pedoman yang banyak dipakai adalah **50/30/20**: sekitar 50% untuk kebutuhan wajib, 30% untuk keinginan, dan 20% untuk tujuan seperti tabungan dan pelunasan utang. Pedoman ini dipopulerkan Elizabeth Warren dan Amelia Warren Tyagi dalam buku "All Your Worth" (2005).',
      "Angkanya pedoman, bukan hukum. Di kota dengan biaya kos tinggi, pos wajib bisa lebih dari 50%. Yang penting adalah urutannya: **wajib dan tujuan dipisahkan lebih dulu**, sisanya baru boleh dibelanjakan.",
      ["img", "kantong-terpisah", "Kenapa kantong terpisah berhasil."],
      [
        "fact",
        'Orang cenderung memperlakukan uang secara berbeda tergantung "label" atau tempatnya, walaupun nilainya sama. Fenomena ini disebut akuntansi mental.',
        "Thaler, Journal of Behavioral Decision Making, 1999",
      ],
      ["h", "Cara Fikri membuat kantong"],
      [
        "ol",
        [
          "**Rekening utama** menerima gaji dan membayar semua tagihan wajib secara otomatis.",
          "**Rekening tujuan** di bank lain, tanpa kartu di dompet. Transfer otomatis Rp1 juta setiap tanggal 25.",
          "**Dompet digital atau rekening belanja** diisi uang bebas. Hanya ini yang dipakai sehari-hari.",
        ],
      ],
      [
        "tip",
        "Kalau 20% untuk tujuan terasa mustahil, mulai dari 5% dan naikkan 1% setiap bulan. Kebiasaan memisahkan lebih penting daripada besar angkanya di awal.",
      ],
    ],
  },
  {
    title: "Jatah Harian: Satu Angka yang Dicek Setiap Pagi",
    blocks: [
      "**Tanggal 27. Saldo kantong bebas: Rp2.334.000.** Fikri tahu persis berapa yang boleh dia pakai hari ini: Rp83.000.",
      "Uang bebas Rp2,5 juta terdengar banyak di hari gajian. Masalahnya, otak tidak pandai membagi angka besar menjadi tiga puluh hari. Karena itu, ubah angka besar itu menjadi satu angka kecil yang bisa dicek setiap pagi: **jatah harian**.",
      ["tool", "jatah-harian"],
      ["h", "Aturan jatah harian"],
      [
        "ul",
        [
          "Sisa jatah hari ini boleh dipakai besok. Kalau hari ini makan di rumah, akhir pekan bisa lebih longgar.",
          "Kalau hari ini lebih, jatah besok berkurang. Tidak perlu panik; cukup hitung ulang.",
          "Hitung ulang setiap Senin dengan sisa uang yang sebenarnya.",
        ],
      ],
      ["img", "saldo-sebulan", "Uang bebas selama sebulan, sebelum dan sesudah."],
      "Dengan jatah harian, Fikri masih minum kopi dan masih nongkrong. Bedanya, dia memilih kapan. Kalau Jumat malam ingin makan di luar, Rabu dan Kamis dia membawa bekal. Keputusan kecil itu yang membuat tanggal 18 tidak lagi menakutkan.",
    ],
  },
  {
    title: "Menambal Kebocoran Kecil",
    blocks: [
      "**Tanggal 5. Saldo kantong bebas: Rp1.650.000.** Fikri membuka daftar langganannya dan menemukan tiga aplikasi yang tidak dia buka sejak dua bulan lalu.",
      "Kebocoran kecil sulit terasa karena setiap tetesnya tidak menyakitkan. Rp25 ribu ongkir, Rp35 ribu kopi, Rp49 ribu langganan. Yang menyakitkan adalah jumlahnya setahun.",
      ["img", "tetes-kecil", "Kebocoran kecil, dihitung setahun."],
      ["tool", "pencari-bocor"],
      ["h", "Kenapa belanja tanpa uang tunai terasa ringan"],
      [
        "fact",
        "Dalam sebuah eksperimen lelang, peserta yang diminta membayar dengan kartu kredit bersedia menawar jauh lebih tinggi dibanding peserta yang membayar tunai untuk barang yang sama.",
        "Prelec & Simester, Marketing Letters, 2001",
      ],
      'Membayar dengan kartu, dompet digital, atau "bayar nanti" terasa lebih ringan karena kita tidak melihat uangnya pergi. Itu bukan berarti harus kembali ke uang tunai, tapi perlu sedikit hambatan.',
      ["h", "Lima tambalan yang mudah"],
      [
        "ol",
        [
          "Hapus kartu yang tersimpan di aplikasi belanja. Mengetik ulang nomor kartu memberi jeda berpikir.",
          "Aturan 24 jam: barang di keranjang belanja ditinggal semalam. Kalau besok masih ingin, baru beli.",
          "Batalkan langganan yang tidak dibuka sebulan terakhir. Langganan ulang selalu bisa.",
          "Gabungkan pesanan antar supaya ongkir dan biaya layanan tidak berkali-kali.",
          "Pakai rekening dengan biaya transfer yang rendah untuk kebutuhan sehari-hari.",
        ],
      ],
    ],
  },
  {
    title: "Bulan Kedua dan Seterusnya",
    blocks: [
      "**Tanggal 24. Saldo kantong bebas: Rp210.000.** Untuk pertama kalinya dalam setahun, Fikri sampai di hari sebelum gajian dengan uang tersisa, dan kantong tujuannya bertambah Rp1 juta.",
      "Sistem ini tidak bertahan karena kemauan yang kuat, tapi karena diulang dengan ringan setiap bulan.",
      ["img", "tinjauan-bulanan", "Tinjauan 15 menit sebelum gajian."],
      ["h", "Saat gaji naik"],
      "Godaan terbesar datang saat gaji naik: kos yang lebih bagus, ponsel baru, makan di luar lebih sering. Pengeluaran yang ikut naik bersama penghasilan membuat gaji yang lebih besar tetap habis di tanggal yang sama.",
      "Aturan Fikri sederhana: **setiap kenaikan gaji, setengahnya masuk kantong tujuan lebih dulu**. Setengah sisanya boleh dinikmati tanpa rasa bersalah.",
      [
        "reflect",
        [
          "Kebocoran mana yang paling sering membuatmu menyesal setelahnya?",
          "Kalau tanggal 24 bulan depan masih ada sisa uang, untuk apa kamu ingin memakainya?",
        ],
      ],
      [
        "summary",
        [
          "Uang tidak hilang; ia mengalir tanpa diatur. Atur alirannya di hari gajian.",
          "Catat 14 hari tanpa menghakimi, lalu kelompokkan jadi tetap, berubah-ubah, dan bocor.",
          "Pisahkan kantong wajib dan tujuan lebih dulu; pedoman 50/30/20 bisa disesuaikan.",
          "Ubah uang bebas menjadi jatah harian dan cek setiap pagi.",
          "Tambal kebocoran kecil dengan sedikit hambatan: hapus kartu tersimpan, aturan 24 jam, batalkan langganan.",
          "Tinjau 15 menit sebelum gajian. Saat gaji naik, setengah kenaikannya ke tujuan.",
        ],
      ],
    ],
  },
];
