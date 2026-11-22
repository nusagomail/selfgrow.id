/**
 * "Dana Darurat dari Nol", 9 bab (diperdalam: penghasilan tidak tetap, utang dulu atau bantalan dulu, jaring pengaman BPJS dan JKP). Bentuk: satu tokoh, Bagas (24, staf administrasi, gaji
 * Rp5,2 juta, pengeluaran wajib Rp3,5 juta), diikuti lewat buku tabungannya. Angka adalah
 * ilustrasi. Edukasi keuangan umum, bukan rekomendasi produk tertentu.
 */
import { LITERASI_COUNTER, SIAP_DARURAT, TEMPAT_BANTALAN } from "./darurat-interactive.mjs";

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
    title: "Kalau Penghasilanmu Naik-Turun",
    blocks: [
      'Wulan, sepupu Bagas, berjualan kue lewat media sosial. Bulan Ramadan, pendapatan bersihnya bisa Rp9 juta. Bulan sepi, kadang hanya Rp2,5 juta. "Aturan tiga sampai enam bulan itu buat orang bergaji tetap," katanya. "Aku bahkan tidak tahu berapa satu bulanku."',
      "Wulan benar bahwa caranya perlu berbeda. Pedagang, pekerja lepas, pengemudi ojek daring, dan pekerja kontrak menghadapi dua risiko sekaligus: kejadian mendadak, dan bulan yang sepi. Bantalannya perlu menahan keduanya.",
      ["h", "Hitung dari bulan tersepi, bukan rata-rata"],
      [
        "ol",
        [
          "Lihat catatan penghasilan bersih 12 bulan terakhir. Kalau belum ada catatan, perkirakan dari riwayat transfer di rekening.",
          "Hitung pengeluaran wajib per bulan, seperti Bagas di Bab 2.",
          "Target dana darurat: **6 sampai 12 bulan pengeluaran wajib**, karena bulan sepi bisa datang beruntun.",
        ],
      ],
      ["h", "Sisihkan per pemasukan, bukan per bulan"],
      "Tanpa tanggal gajian, transfer otomatis tanggal 1 tidak cocok. Wulan memakai aturan yang lebih sederhana: **setiap uang masuk, 10% langsung dipindah** ke rekening dana darurat sebelum dipakai untuk bahan baku atau belanja rumah.",
      [
        "table",
        [
          ["Bulan", "Pendapatan bersih", "Disisihkan 10%"],
          ["Maret (Ramadan)", "Rp9.000.000", "Rp900.000"],
          ["April", "Rp4.200.000", "Rp420.000"],
          ["Mei", "Rp2.600.000", "Rp260.000"],
          ["Juni", "Rp3.100.000", "Rp310.000"],
        ],
      ],
      "Bulan ramai otomatis menyumbang lebih banyak. Bulan sepi tetap menyumbang, walau sedikit, sehingga kebiasaannya tidak putus.",
      [
        "tip",
        "Pisahkan juga uang usaha dan uang pribadi. Kalau modal bahan baku tercampur dengan dana darurat, keduanya sama-sama sulit dijaga.",
      ],
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
    title: "Utang Dulu atau Bantalan Dulu?",
    blocks: [
      "Setelah tangga pertama tercapai, Bagas masih punya sisa cicilan servis motor di aplikasi pinjaman daring. Dia bingung: lunasi dulu, atau terus menabung?",
      "Pertanyaan ini sering membuat orang terjebak di tengah: menabung sambil terus membayar bunga yang lebih besar daripada bunga tabungan, atau melunasi utang tanpa sisa sama sekali, lalu berutang lagi saat ada kejadian kecil.",
      ["img", "urutan-prioritas", "Utang dulu atau bantalan dulu?"],
      ["h", "Kenapa bantalan mini didahulukan"],
      "Tanpa bantalan sama sekali, setiap ban bocor atau obat mendadak berubah menjadi utang baru. Bantalan mini Rp1 juta memutus kebiasaan itu, walau belum cukup untuk kejadian besar.",
      ["h", "Kenapa utang mahal berikutnya"],
      [
        "fact",
        "OJK menetapkan batas maksimum manfaat ekonomi (bunga dan biaya) pinjaman daring konsumtif sebesar 0,3% per hari untuk tenor di bawah enam bulan, dan 0,2% per hari untuk tenor lebih panjang, berlaku sejak 2025.",
        "Otoritas Jasa Keuangan, siaran pers SP-214/GKPB/OJK/XII/2024",
      ],
      'Batas 0,3% per hari kedengarannya kecil, padahal setara sekitar 9% per bulan. Bunga tabungan di bank umumnya hanya beberapa persen setahun. Selama utang semahal itu masih ada, setiap rupiah yang dipakai melunasinya "menghasilkan" jauh lebih banyak daripada rupiah yang ditabung.',
      ["h", "Setelah lunas"],
      'Jangan menurunkan setoran. Uang yang tadinya untuk cicilan langsung dialihkan ke tangga kedua dana darurat. Bagas tidak merasakan bedanya di dompet, karena uang itu memang sudah biasa "pergi" setiap bulan.',
      [
        "info",
        'Kalau kamu sedang terlilit beberapa paylater atau pinjaman daring sekaligus, buku "Lepas dari Jerat Paylater" membahas cara memetakan dan melunasinya dengan urutan yang jelas.',
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
      ["quiz", TEMPAT_BANTALAN],
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
    title: "Jaring Pengaman Selain Tabungan",
    blocks: [
      "Dana darurat bukan satu-satunya pelindung. Ada beberapa jaring pengaman yang sering terlupa, padahal bisa membuat target dana darurat lebih realistis.",
      ["h", "Jaminan kesehatan"],
      "Biaya rumah sakit adalah salah satu kejadian mendadak yang paling cepat menghabiskan tabungan. Kepesertaan aktif di Jaminan Kesehatan Nasional (BPJS Kesehatan) melindungi dari sebagian besar biaya itu. Pastikan iuranmu tidak menunggak, karena kepesertaan yang tidak aktif bisa membuat layanan tertunda tepat saat dibutuhkan.",
      ["h", "Kalau terkena PHK"],
      [
        "fact",
        "Pekerja yang terkena PHK dan terdaftar dalam program Jaminan Kehilangan Pekerjaan (JKP) BPJS Ketenagakerjaan bisa menerima manfaat uang tunai sebesar 60% upah selama paling lama enam bulan, dengan batas upah yang dihitung Rp5 juta per bulan, selama syarat kepesertaannya terpenuhi.",
        "PP No. 6 Tahun 2025 tentang Perubahan atas PP No. 37 Tahun 2021",
      ],
      "Cek di aplikasi BPJS Ketenagakerjaan apakah kamu sudah terdaftar dan iurannya dibayar. Manfaat ini tidak menggantikan dana darurat, tapi bisa memperpanjang berapa lama bantalanmu bertahan.",
      ["h", "Asuransi: secukupnya, bukan sebanyaknya"],
      [
        "ul",
        [
          "Asuransi jiwa berjangka masuk akal kalau ada orang yang bergantung pada penghasilanmu.",
          "Asuransi kendaraan mungkin berguna kalau kendaraan adalah alat kerja utamamu.",
          "Hindari membeli produk gabungan asuransi dan investasi hanya karena ditawarkan; pahami dulu biaya dan manfaatnya.",
        ],
      ],
      [
        "exercise",
        [
          "Cek status kepesertaan BPJS Kesehatan dan BPJS Ketenagakerjaanmu minggu ini.",
          "Tulis jaring pengaman yang sudah kamu punya, dan kejadian yang belum terlindungi.",
          "Pakai daftar itu untuk menentukan apakah targetmu perlu 3, 6, atau 12 bulan.",
        ],
        "Lembar kerja: peta jaring pengaman",
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
