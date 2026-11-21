/**
 * "Dana Darurat dari Nol", 6 bab. Bentuk: satu tokoh, Bagas (24, staf administrasi, gaji
 * Rp5,2 juta, pengeluaran wajib Rp3,5 juta), diikuti lewat buku tabungannya. Angka adalah
 * ilustrasi. Edukasi keuangan umum, bukan rekomendasi produk tertentu.
 */
import { LITERASI_COUNTER, SIAP_DARURAT } from "./darurat-interactive.mjs";

export const DARURAT_1 = [
  {
    title: "Rp2,8 Juta yang Datang Tanpa Permisi",
    blocks: [
      "Rabu pagi, motor Bagas mogok di tengah jalan. Kata montir: kampas kopling habis dan ada kerusakan di gearbox. Biayanya Rp2,8 juta.",
      "Saldo rekening Bagas saat itu Rp640 ribu, dan gajian masih dua minggu lagi. Tanpa motor, dia tidak bisa ke kantor. Jadi dia melakukan hal yang dilakukan banyak orang: membayar dengan paylater tiga bulan.",
      "Tiga bulan berikutnya, sebagian gajinya habis untuk cicilan servis motor, ditambah bunga dan biaya. Bulan keempat, giliran ponselnya yang rusak.",
      ["h", "Masalahnya bukan motornya"],
      "Kendaraan rusak, sakit, kehilangan pekerjaan. Kejadian seperti ini tidak bisa ditebak kapan datangnya, tapi hampir pasti datang. Yang bisa disiapkan adalah **bantalannya**: uang yang disisihkan khusus untuk kejadian yang tidak direncanakan. Itulah dana darurat.",
      "Tanpa bantalan, setiap kejadian kecil berubah menjadi utang, dan utang memakan gaji bulan berikutnya, sehingga semakin sulit menabung. Lingkaran ini bisa berputar bertahun-tahun.",
      ["chart", LITERASI_COUNTER],
      "Sebagian besar dari kita sudah memakai produk keuangan dan cukup memahaminya. Tapi tahu tidak sama dengan punya. Buku ini membahas cara membangun bantalan itu dari nol, bahkan mulai dari Rp10.000 sehari.",
      ["h", "Seberapa siap kamu?"],
      ["quiz", SIAP_DARURAT],
    ],
  },
  {
    title: "Berapa Sebenarnya yang Kamu Butuhkan",
    blocks: [
      "Pertanyaan pertama Bagas: berapa jumlah dana darurat yang ideal? Jawabannya tidak dihitung dari gaji, tapi dari **pengeluaran wajib**: biaya yang tetap harus dibayar walaupun penghasilanmu tiba-tiba berhenti.",
      [
        "table",
        [
          ["Pengeluaran wajib Bagas", "Per bulan"],
          ["Sewa kamar kos", "Rp1.300.000"],
          ["Makan", "Rp1.200.000"],
          ["Transport dan bensin", "Rp400.000"],
          ["Pulsa, listrik, air", "Rp250.000"],
          ["Kiriman untuk orang tua", "Rp350.000"],
          ["Total", "Rp3.500.000"],
        ],
      ],
      "Langganan streaming, nongkrong, dan belanja daring tidak dihitung, karena bisa dihentikan sementara saat keadaan darurat.",
      ["h", "Berapa bulan?"],
      "Para perencana keuangan umumnya menganjurkan dana darurat sebesar **tiga sampai enam bulan pengeluaran wajib**, dan lebih banyak lagi bagi yang menanggung keluarga atau berpenghasilan tidak tetap. Bagas lajang dengan gaji tetap, jadi targetnya tiga bulan: Rp10,5 juta.",
      ["tool", "target-dana-darurat"],
      [
        "tip",
        "Angka target yang besar bisa membuat orang menyerah sebelum mulai. Karena itu, target dibagi menjadi tiga tangga. Kamu hanya perlu fokus pada tangga yang sedang kamu naiki.",
      ],
      ["img", "tiga-tangga", "Tiga tangga dana darurat Bagas."],
    ],
  },
  {
    title: "Rp10.000 Sehari: Mulai dari yang Sangat Kecil",
    blocks: [
      "Bagas tidak punya sisa uang besar setiap bulan. Jadi dia mulai dari angka yang hampir tidak terasa: **Rp10.000 sehari**, kira-kira harga satu gelas es teh dan gorengan. Dalam sebulan, Rp300.000.",
      "Yang membuat cara ini berhasil bukan besarnya angka, tapi dua kebiasaan:",
      [
        "ol",
        [
          "**Otomatis di hari gajian.** Bagas mengatur pemindahan otomatis Rp300.000 ke rekening dana darurat setiap tanggal 1, sebelum uang sempat dipakai.",
          "**Uang kaget disisihkan sebagian.** Saat THR dan bonus datang, separuhnya langsung masuk dana darurat. Sisanya boleh dinikmati tanpa rasa bersalah.",
        ],
      ],
      ["img", "buku-tabungan", "Lima bulan pertama di buku tabungan Bagas."],
      'Di bulan ketiga, layar ponsel Bagas pecah. Biayanya Rp650.000. Untuk pertama kalinya, dia membayar sesuatu yang mendadak tanpa paylater. Rasanya, kata Bagas, "seperti punya teman yang selalu siap membantu".',
      ["tool", "kapan-tercapai"],
      [
        "info",
        'Setiap kali gajimu naik, naikkan juga setoran dana daruratmu, walau hanya Rp50.000. Setoran yang naik pelan-pelan jauh lebih mudah dijalankan daripada menunggu sampai "ada sisa".',
      ],
    ],
  },
  {
    title: "Tempat yang Tepat untuk Bantalan",
    blocks: [
      "Dana darurat punya tiga syarat: **aman**, **mudah diambil saat dibutuhkan**, dan **tidak tercampur dengan uang belanja**. Keuntungan besar bukan tujuannya.",
      ["img", "tempat-simpan", "Pilihan tempat menyimpan dana darurat."],
      ["h", "Kenapa terpisah?"],
      "Uang di rekening yang sama dengan kartu debit sehari-harimu akan terpakai tanpa terasa: sedikit untuk ongkir, sedikit untuk jajan. Rekening terpisah, sebaiknya di bank yang berbeda dan tanpa kartu di dompet, membuat ada satu langkah kecil yang harus dilewati sebelum uangnya terpakai.",
      [
        "fact",
        "Lembaga Penjamin Simpanan (LPS) menjamin simpanan nasabah di bank sampai Rp2 miliar per nasabah per bank, selama memenuhi syarat: tercatat dalam pembukuan bank, bunganya tidak melebihi tingkat bunga penjaminan LPS, dan nasabah tidak melakukan tindakan yang merugikan bank.",
        "Lembaga Penjamin Simpanan (lps.go.id)",
      ],
      [
        "warn",
        "Saham, kripto, atau emas untuk diperdagangkan tidak cocok untuk dana darurat. Nilainya bisa sedang turun tepat di saat kamu harus mencairkannya. Simpan investasi untuk tujuan jangka panjang, setelah bantalanmu cukup.",
      ],
    ],
  },
  {
    title: "Kapan Boleh Dipakai, dan Cara Mengisinya Lagi",
    blocks: [
      'Dana darurat yang terkumpul justru menimbulkan godaan baru. Diskon besar, tiket konser, ponsel model terbaru. "Toh uangnya ada," pikir Bagas suatu malam.',
      ["img", "darurat-bukan", "Darurat atau hanya mendesak."],
      'Tiga pertanyaan sederhana membantu memutuskan: Apakah kejadian ini tidak terduga? Apakah harus dibayar sekarang? Apakah benar-benar perlu, bukan sekadar ingin? Kalau ketiganya "ya", pakailah tanpa rasa bersalah. Itulah gunanya.',
      ["h", "Setelah dipakai"],
      ["img", "isi-ulang", "Empat langkah mengisi ulang."],
      [
        "reflect",
        [
          "Kejadian mendadak apa yang paling mungkin terjadi padamu dalam setahun ke depan?",
          "Kalau itu terjadi besok, dari mana uangnya akan datang?",
        ],
      ],
    ],
  },
  {
    title: "Bantalan yang Membuatmu Berani",
    blocks: [
      "Dua tahun kemudian, dana darurat Bagas mencapai Rp10,5 juta. Yang berubah bukan hanya saldonya.",
      "Saat kantornya melakukan restrukturisasi dan menawarkan pindah ke divisi yang tidak dia sukai, Bagas bisa berpikir jernih. Dia tahu dia bisa bertahan tiga bulan sambil mencari pekerjaan lain. Akhirnya dia memilih bertahan, tapi karena pilihannya sendiri, bukan karena takut.",
      "Dana darurat tidak membuatmu kaya. Dana darurat membuatmu **punya pilihan**.",
      ["h", "Setelah tangga ketiga"],
      [
        "ul",
        [
          "Pertahankan setoran, tapi alihkan ke tujuan berikutnya: melunasi utang, dana pendidikan, atau investasi jangka panjang.",
          "Tinjau target setiap tahun. Pengeluaran wajib bisa naik karena menikah, punya anak, atau pindah kota.",
          "Ajak pasangan atau keluarga membicarakannya. Dana darurat keluarga perlu disepakati bersama.",
        ],
      ],
      [
        "summary",
        [
          "Dana darurat dihitung dari pengeluaran wajib, umumnya 3–6 bulan, lebih banyak bila menanggung keluarga atau penghasilan tidak tetap.",
          "Bagi target menjadi tiga tangga: Rp1 juta, satu bulan pengeluaran, lalu target penuh.",
          "Mulai dari yang kecil dan otomatis di hari gajian. Sisihkan sebagian uang kaget.",
          "Simpan terpisah, aman, dan mudah diambil. Bukan di instrumen yang nilainya naik-turun tajam.",
          "Pakai hanya untuk yang tidak terduga, perlu sekarang, dan benar-benar perlu. Lalu isi ulang.",
        ],
      ],
      ["h", "Cek lagi kesiapanmu"],
      'Kerjakan kuis di Bab 1 setiap tiga bulan. Setiap jawaban "ya" yang bertambah adalah satu lapis bantalan baru.',
    ],
  },
];
