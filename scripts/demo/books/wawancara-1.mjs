/**
 * "Lolos Wawancara Kerja", 8 bab. Bentuk: naskah wawancara. Setiap bab memuat potongan
 * transkrip wawancara Yoga (24, lulusan teknik industri, melamar staf supply chain), dalam versi
 * mentah lalu versi matang, sehingga pembaca melihat perbedaannya kalimat demi kalimat. Berbeda
 * dari "CV yang Dilirik Rekruter" (dokumen lamaran) dan "Berani Nego Gaji" (setelah tawaran).
 * Perusahaan, tokoh, dan angka adalah ilustrasi.
 */
import {
  KELEMAHAN,
  LOWONGAN_PALSU,
  SIAP_WAWANCARA,
  TPT_COUNTER,
} from "./wawancara-interactive.mjs";

const P = (t) => `**Pewawancara:** ${t}`;
const Y = (t) => `**Yoga:** ${t}`;

export const WAWANCARA_1 = [
  {
    title: "Wawancara Itu Bukan Ujian Hafalan",
    blocks: [
      'Wawancara pertama Yoga berlangsung 25 menit di sebuah perusahaan distribusi makanan di Cibitung. Ia pulang dengan perasaan lega, karena tidak ada pertanyaan yang membuatnya diam. Seminggu kemudian datang surel singkat: "Terima kasih atas minat Anda. Saat ini kami memutuskan melanjutkan dengan kandidat lain."',
      "Dia membaca ulang catatannya. Inilah satu potongan yang ia ingat hampir kata per kata:",
      ["h3", "Transkrip, versi mentah"],
      P("Coba ceritakan pengalamanmu yang berhubungan dengan supply chain."),
      Y(
        "Saya lulusan teknik industri, Pak. Di kuliah kami belajar manajemen persediaan, perencanaan produksi, dan logistik. Saya juga aktif di organisasi. Saya orangnya pekerja keras dan cepat belajar.",
      ),
      'Tidak ada yang salah di jawaban itu. Tapi juga tidak ada yang bisa diingat. Pewawancara hari itu mungkin bertemu delapan lulusan teknik industri, dan hampir semuanya "pekerja keras dan cepat belajar".',
      ["chart", TPT_COUNTER],
      ["h", "Apa yang sebenarnya dicari"],
      "Hampir semua pertanyaan wawancara, dalam bentuk apa pun, sedang mencari jawaban untuk tiga hal:",
      [
        "ol",
        [
          "**Bisa.** Apakah kamu mampu mengerjakan pekerjaan ini? Buktinya apa?",
          "**Mau.** Apakah kamu benar-benar ingin pekerjaan ini, bukan sekadar pekerjaan apa saja?",
          "**Cocok.** Apakah kamu akan bekerja baik dengan tim dan cara kerja di sini?",
        ],
      ],
      'Jawaban Yoga hanya menyentuh "bisa", dan itu pun tanpa bukti. Kalimat "saya pekerja keras" adalah klaim. Pewawancara mencari **cerita** yang membuat klaim itu terasa benar.',
      [
        "fact",
        "Tinjauan besar atas penelitian seleksi karyawan menemukan bahwa wawancara terstruktur, dengan pertanyaan yang sama untuk semua kandidat dan dinilai dengan kriteria yang jelas, termasuk alat paling baik untuk memperkirakan kinerja kerja.",
        "Sackett, Zhang, Berry & Lievens (2022), Journal of Applied Psychology",
      ],
      "Artinya, semakin banyak perusahaan yang menyiapkan pertanyaan baku dan menilai jawabanmu dengan daftar. Kabar baiknya: pertanyaan baku bisa dipersiapkan. Buku ini menunjukkan caranya, lewat wawancara-wawancara Yoga berikutnya.",
      ["h", "Seberapa siap kamu?"],
      ["quiz", SIAP_WAWANCARA],
    ],
  },
  {
    title: '"Ceritakan Tentang Dirimu"',
    blocks: [
      "Pertanyaan ini muncul di hampir setiap wawancara, biasanya di menit pertama. Banyak kandidat menganggapnya pemanasan, lalu menjawab dengan menceritakan ulang CV dari SD sampai kuliah. Padahal ini kesempatan emas: satu menit tanpa interupsi untuk mengarahkan seluruh wawancara.",
      ["h3", "Versi mentah"],
      P("Silakan perkenalkan diri dulu."),
      Y(
        "Nama saya Yoga Pratama, umur 24 tahun, asal Purwokerto. Saya lulus dari teknik industri tahun lalu dengan IPK 3,41. Hobi saya main futsal dan membaca. Saya anak kedua dari tiga bersaudara…",
      ),
      "Sudah tiga puluh detik, dan pewawancara belum tahu satu pun alasan untuk memilih Yoga.",
      ["h", "Rumus satu menit: kini, dulu, nanti"],
      ["img", "rumus-satu-menit", "Kerangka jawaban satu menit."],
      [
        "ul",
        [
          "**Kini (15 detik):** siapa kamu secara profesional saat ini, dalam satu kalimat.",
          "**Dulu (30 detik):** satu atau dua pengalaman yang paling berhubungan dengan posisi ini, lengkap dengan hasilnya.",
          "**Nanti (15 detik):** kenapa posisi ini langkah yang tepat berikutnya bagimu.",
        ],
      ],
      ["h3", "Versi matang"],
      P("Silakan perkenalkan diri dulu."),
      Y(
        "Saya lulusan teknik industri yang paling senang dengan masalah persediaan: kenapa barang menumpuk di satu tempat tapi kosong di tempat lain. Waktu magang tiga bulan di gudang distributor minuman, saya membantu menyusun ulang tata letak rak berdasarkan kecepatan keluar barang, dan waktu pengambilan barang per pesanan turun sekitar seperlima. Saya melamar ke sini karena perusahaan ini mengelola banyak gudang regional, dan saya ingin belajar perencanaan persediaan di skala yang lebih besar.",
      ),
      "Jawaban itu sekitar satu menit bila diucapkan dengan tenang. Pewawancara sekarang punya tiga pegangan untuk pertanyaan berikutnya: minat pada persediaan, pengalaman tata letak rak, dan alasan memilih perusahaan ini.",
      [
        "tip",
        "Jangan menghafal kata per kata. Hafalkan tiga poinnya saja (kini, dulu, nanti), lalu latih dengan suara keras sampai terasa wajar. Jawaban yang dihafal mati terdengar seperti membaca, dan mudah buyar kalau gugup.",
      ],
      [
        "exercise",
        [
          'Tulis satu kalimat "kini" tentang dirimu, tanpa menyebut umur atau asal daerah.',
          "Pilih satu pengalaman paling relevan dengan lowongan yang kamu incar, dan tulis hasilnya dengan angka bila bisa.",
          'Tulis satu kalimat "nanti" yang menyebut sesuatu yang spesifik tentang perusahaan atau posisinya.',
          "Rekam dirimu menjawab dengan ponsel. Dengarkan, potong yang bertele-tele, rekam lagi.",
        ],
        "Susun jawaban satu menitmu:",
      ],
    ],
  },
  {
    title: "Bank Cerita: Metode STAR",
    blocks: [
      'Banyak pertanyaan wawancara berbentuk "Ceritakan saat kamu…": saat menghadapi konflik, saat gagal, saat bekerja di bawah tekanan, saat memimpin. Ini disebut pertanyaan perilaku, karena perilaku di masa lalu dianggap petunjuk perilaku di masa depan.',
      ["h3", "Versi mentah"],
      P("Ceritakan saat kamu menghadapi masalah dalam kerja tim."),
      Y(
        "Pernah, Pak, waktu tugas besar kuliah. Ada anggota yang tidak aktif. Tapi akhirnya kami bisa menyelesaikannya dengan baik karena kami saling mendukung.",
      ),
      "Yang hilang dari jawaban ini: apa sebenarnya masalahnya, apa yang Yoga **lakukan**, dan apa hasilnya. Pewawancara tidak bisa menilai apa pun.",
      ["h", "Empat bagian cerita"],
      ["img", "anatomi-star", "Anatomi cerita STAR."],
      [
        "table",
        [
          ["Bagian", "Isi", "Porsi"],
          ["Situasi", "Konteks singkat: kapan, di mana, apa yang terjadi", "Sedikit"],
          ["Tugas", "Apa tanggung jawabmu di situasi itu", "Sedikit"],
          ["Aksi", "Apa yang KAMU lakukan, langkah demi langkah", "Paling banyak"],
          [
            "Hasil",
            "Apa yang berubah, sebaiknya dengan angka, dan apa yang kamu pelajari",
            "Cukup",
          ],
        ],
      ],
      ["h3", "Versi matang"],
      P("Ceritakan saat kamu menghadapi masalah dalam kerja tim."),
      Y(
        "Di semester enam, kelompok kami berlima harus merancang ulang jalur produksi sebuah UMKM roti untuk tugas akhir mata kuliah. Dua minggu sebelum tenggat, satu anggota belum mengirim bagian perhitungannya dan tidak membalas pesan. Saya ketua kelompok, jadi saya yang harus memastikan tugas selesai. Saya menemuinya langsung di kos, dan ternyata dia sedang kerja paruh waktu untuk membayar kuliah. Kami membagi ulang tugas: dia mengerjakan bagian gambar yang bisa dicicil malam hari, dan saya mengambil perhitungannya. Saya juga membuat jadwal cek singkat dua kali seminggu. Tugas selesai dua hari sebelum tenggat dan mendapat nilai A. Pelajaran saya: sebelum menilai orang malas, cari tahu dulu apa yang sedang terjadi.",
      ),
      'Perhatikan bahwa bagian **aksi** paling panjang, dan memakai kata "saya", bukan "kami". Pewawancara ingin tahu peranmu sendiri.',
      ["h", "Bangun banknya sebelum wawancara"],
      "Kamu tidak perlu cerita berbeda untuk setiap pertanyaan. Lima sampai tujuh cerita yang kuat bisa dipakai untuk puluhan pertanyaan, karena satu cerita bisa menunjukkan beberapa hal sekaligus: kerja sama, inisiatif, dan menyelesaikan masalah.",
      [
        "tool",
        "tugas-jadi-pencapaian",
        "Ubah pengalaman jadi pencapaian",
        'Tool ini awalnya untuk CV, tapi kalimat hasilnya juga bisa menjadi bagian "hasil" di cerita STAR-mu.',
      ],
      [
        "exercise",
        [
          "Tulis lima pengalaman: dari kerja, magang, organisasi, proyek kuliah, atau usaha kecil.",
          "Untuk setiap pengalaman, isi empat bagian STAR dalam poin-poin singkat.",
          "Tandai setiap cerita dengan kemampuan yang ditunjukkannya: kerja tim, memimpin, gagal lalu bangkit, tekanan waktu, inisiatif.",
          "Pastikan setiap kemampuan punya minimal satu cerita.",
        ],
        "Bank ceritamu:",
      ],
    ],
  },
  {
    title: "Pertanyaan yang Terasa Seperti Jebakan",
    blocks: [
      "Beberapa pertanyaan membuat banyak kandidat tegang: kelemahan, alasan keluar dari pekerjaan sebelumnya, jeda panjang di CV, dan gaji. Pertanyaan ini sebenarnya bukan jebakan. Pewawancara ingin melihat dua hal: apakah kamu jujur, dan apakah kamu bisa membicarakan hal yang tidak nyaman dengan tenang.",
      ["h", "Kelemahan"],
      ["quiz", KELEMAHAN],
      'Polanya: **kelemahan nyata → dampaknya → apa yang sudah kamu lakukan**. Pilih kelemahan yang tidak menjadi inti pekerjaan. Untuk posisi analis data, "kurang teliti dengan angka" adalah pilihan yang berbahaya; "gugup saat presentasi di depan banyak orang" lebih aman, asal ada cerita perbaikannya.',
      ["h", "Kenapa keluar dari pekerjaan sebelumnya?"],
      "Jangan menjelekkan perusahaan atau atasan lama, walaupun alasannya benar. Pewawancara akan membayangkan kamu membicarakan perusahaan mereka dengan cara yang sama suatu hari nanti. Fokus pada apa yang kamu cari, bukan apa yang kamu hindari.",
      [
        "table",
        [
          ["Kurang tepat", "Lebih tepat"],
          [
            '"Atasan saya tidak menghargai karyawan."',
            '"Saya mencari tempat dengan kesempatan belajar yang lebih terstruktur."',
          ],
          [
            '"Gajinya kecil."',
            '"Saya ingin tanggung jawab yang lebih besar, dan posisi ini memberikannya."',
          ],
          [
            '"Kontrak saya tidak diperpanjang." (lalu diam)',
            '"Kontrak proyek saya selesai. Dari proyek itu saya belajar…, dan saya ingin melanjutkannya di sini."',
          ],
        ],
      ],
      ["h", "Jeda di CV"],
      "Enam bulan menganggur, merawat orang tua, mengulang tes CPNS, atau usaha yang gagal. Jeda bukan aib. Jelaskan singkat, jujur, dan tutup dengan apa yang kamu lakukan atau pelajari selama itu.",
      [
        "quote",
        "Saya sempat delapan bulan membantu usaha katering keluarga setelah ayah sakit. Saya belajar mengatur stok bahan dan jadwal pengiriman untuk 200 porsi sehari. Sekarang usahanya sudah dipegang adik, dan saya siap kembali ke bidang logistik.",
        "Contoh jawaban jeda CV",
      ],
      ["h", "Berapa gaji yang kamu harapkan?"],
      "Jawab dengan kisaran yang sudah kamu riset, bukan angka yang ditebak di tempat. Cari tahu dari lowongan sejenis, teman di bidang yang sama, atau laporan gaji industri. Kalau belum siap, boleh bertanya dulu tentang lingkup tanggung jawab dan tunjangannya. Pembahasan lengkap tentang angka dan cara menawar ada di buku Berani Nego Gaji.",
      [
        "reflect",
        [
          "Pertanyaan mana yang paling kamu takutkan? Kenapa?",
          "Apa satu hal tentang riwayatmu yang selama ini kamu sembunyikan, padahal bisa diceritakan dengan jujur dan tenang?",
        ],
      ],
    ],
  },
  {
    title: "Riset Tiga Puluh Menit",
    blocks: [
      "Wawancara kedua Yoga di perusahaan e-commerce. Di tengah sesi, pewawancara bertanya:",
      P("Menurutmu, apa tantangan terbesar gudang kami saat musim belanja akhir tahun?"),
      "Yoga sempat panik, lalu teringat apa yang ia baca semalam: perusahaan itu baru membuka gudang di Surabaya dan menjanjikan pengiriman sehari di Jawa Timur.",
      Y(
        "Saya membaca bahwa gudang Surabaya baru buka tahun ini. Kalau janji pengiriman sehari tetap dipegang saat pesanan naik berkali lipat, mungkin tantangannya ada di ramalan stok untuk gudang yang belum punya data musim ramai tahun lalu. Apakah betul begitu?",
      ),
      "Pewawancara tersenyum, lalu menghabiskan lima menit menjelaskan masalah itu. Percakapan berubah dari tanya-jawab menjadi diskusi. Riset tiga puluh menit semalam membuat Yoga terdengar seperti calon rekan kerja, bukan sekadar pelamar.",
      ["h", "Tiga puluh menit, lima pertanyaan"],
      [
        "table",
        [
          ["Pertanyaan riset", "Cari di"],
          ["Apa yang mereka jual, dan siapa pelanggannya?", 'Situs resmi, halaman "Tentang kami"'],
          ["Apa berita terbaru tentang mereka?", "Berita daring 6–12 bulan terakhir, siaran pers"],
          [
            "Apa yang dibicarakan karyawan tentang tempat ini?",
            "LinkedIn karyawan, ulasan tempat kerja",
          ],
          ["Apa tugas utama posisi ini sehari-hari?", "Iklan lowongan, dibaca kalimat per kalimat"],
          ["Siapa yang mungkin mewawancaraiku?", "Nama di undangan, profil LinkedIn-nya"],
        ],
      ],
      [
        "tip",
        "Dari iklan lowongan, garis bawahi tiga kemampuan yang paling sering disebut. Siapkan satu cerita STAR untuk masing-masing. Itulah tiga hal yang hampir pasti ditanyakan.",
      ],
      ["img", "peta-riset", "Peta riset tiga puluh menit sebelum wawancara."],
      "Satu peringatan: jangan pamerkan semua hasil risetmu. Pakai secukupnya, saat relevan, seperti Yoga. Tujuannya menunjukkan kamu peduli, bukan menguji pengetahuan pewawancara tentang perusahaannya sendiri.",
    ],
  },
  {
    title: "Wawancara Daring dan Tes Tambahan",
    blocks: [
      "Wawancara ketiga Yoga berlangsung lewat panggilan video, jam 10 pagi, dari kamar kosnya. Lima menit sebelum mulai, jaringan internet kos melambat. Ia beralih ke data ponsel, dan masuk tepat waktu dengan napas masih terengah.",
      "Wawancara daring kini umum, terutama untuk tahap awal. Prinsipnya sama dengan wawancara tatap muka, tapi ada hal-hal teknis yang bisa menggagalkanmu sebelum kamu sempat bicara.",
      ["h", "Daftar periksa sehari sebelumnya"],
      [
        "ul",
        [
          "**Uji tautan dan aplikasinya** sehari sebelumnya, di perangkat yang akan kamu pakai.",
          "**Siapkan cadangan internet**, misalnya paket data ponsel yang cukup untuk satu jam panggilan video.",
          "**Kamera setinggi mata**, cahaya dari depan (menghadap jendela), latar yang rapi dan tidak ramai.",
          "**Suara jelas**: penyuara telinga dengan mikrofon, ruangan yang paling sepi, dan pesan ke teman sekamar atau keluarga.",
          "**Masuk 5 menit lebih awal**, dengan notifikasi lain dimatikan.",
        ],
      ],
      [
        "tip",
        "Tempel catatan kecil berisi tiga poin jawaban pembuka dan nama pewawancara di dekat kamera. Lihat sekilas boleh. Membaca naskah panjang dari layar akan terlihat jelas dari gerak matamu.",
      ],
      ["h", "Tes yang sering menyertai wawancara"],
      [
        "table",
        [
          ["Tes", "Yang dinilai", "Cara bersiap"],
          [
            "Psikotes",
            "Penalaran, ketelitian, kepribadian",
            'Tidur cukup, kerjakan dengan jujur; tidak perlu "memoles" kepribadian',
          ],
          [
            "Diskusi kelompok (FGD)",
            "Cara berpendapat dan bekerja sama",
            "Bicara jelas, beri ruang orang lain, bantu kelompok menyimpulkan",
          ],
          [
            "Studi kasus",
            "Cara berpikir, bukan jawaban sempurna",
            "Ucapkan langkah berpikirmu dengan suara keras",
          ],
          [
            "Tes keterampilan",
            "Kemampuan teknis (Excel, menulis, desain)",
            "Latihan dengan soal sejenis, dan baca instruksinya pelan-pelan",
          ],
        ],
      ],
      "Yoga mendapat studi kasus singkat: menentukan titik pesan ulang untuk satu jenis barang dengan data permintaan tiga bulan. Ia tidak yakin angkanya benar, jadi ia menjelaskan setiap langkahnya. Belakangan pewawancara bercerita bahwa itulah yang membuat Yoga lolos ke tahap berikutnya: bukan angkanya, tapi caranya berpikir.",
    ],
  },
  {
    title: "Pertanyaan Tidak Pantas dan Lowongan Palsu",
    blocks: [
      "Tidak semua wawancara berjalan adil. Dua hal perlu kamu siapkan: pertanyaan yang tidak berhubungan dengan pekerjaan, dan tawaran yang ternyata penipuan.",
      ["h", "Saat pertanyaannya terlalu pribadi"],
      "Pertanyaan tentang rencana menikah, rencana punya anak, agama, atau suku tidak berhubungan dengan kemampuan bekerja. Undang-Undang Ketenagakerjaan menyatakan setiap tenaga kerja berhak memperoleh kesempatan yang sama untuk mendapatkan pekerjaan tanpa diskriminasi.",
      "Dalam praktiknya, kamu tetap perlu memilih cara menjawab yang menjaga dirimu dan peluangmu. Beberapa pilihan:",
      [
        "ul",
        [
          '**Arahkan ke yang relevan:** "Apa pun rencana pribadi saya, saya bisa memastikan komitmen penuh untuk posisi ini. Kalau boleh tahu, apakah ada kekhawatiran tertentu tentang ketersediaan saya?"',
          "**Jawab singkat lalu kembali ke pekerjaan,** kalau kamu merasa nyaman menjawabnya.",
          "**Catat dan pertimbangkan.** Cara perusahaan bertanya saat wawancara sering menjadi gambaran cara mereka memperlakukan karyawan.",
        ],
      ],
      ["h", "Lowongan palsu"],
      'Penipuan berkedok lowongan kerja sering mengincar pencari kerja yang sedang berharap. Polanya hampir selalu sama: kabar lolos yang terlalu cepat, lalu permintaan uang untuk tiket, hotel, seragam, pelatihan, atau "jaminan".',
      ["quiz", LOWONGAN_PALSU],
      [
        "warn",
        "Proses rekrutmen yang sah tidak memungut biaya dari pelamar. Jangan mentransfer uang, mengirim foto KTP dan swafoto dengan KTP, memberikan kode OTP, atau memasang aplikasi dari tautan yang tidak jelas. Cocokkan undangan dengan situs dan akun resmi perusahaan, dan laporkan penipuan ke platform tempat lowongan itu diiklankan.",
      ],
      [
        "reflect",
        [
          "Kalau ditanya hal pribadi yang membuatmu tidak nyaman, kalimat apa yang ingin kamu siapkan?",
          "Siapa teman yang sedang mencari kerja dan perlu tahu tanda-tanda lowongan palsu?",
        ],
      ],
    ],
  },
  {
    title: "Giliranmu Bertanya, dan Setelah Pintu Tertutup",
    blocks: [
      "Hampir setiap wawancara ditutup dengan kalimat yang sama:",
      P("Ada yang ingin ditanyakan?"),
      ["h3", "Versi mentah"],
      Y("Tidak ada, Pak. Sudah cukup jelas."),
      'Jawaban ini sopan, tapi menutup kesempatan terakhir untuk menunjukkan minat. "Tidak ada pertanyaan" sering terdengar seperti "tidak terlalu peduli".',
      ["h3", "Versi matang"],
      Y(
        "Ada dua, Pak. Pertama, seperti apa tiga bulan pertama yang dianggap berhasil untuk posisi ini? Kedua, tantangan apa yang paling sering dihadapi tim gudang saat ini?",
      ),
      ["h", "Pertanyaan yang baik untuk diajukan"],
      [
        "ul",
        [
          "Seperti apa hari kerja biasa di posisi ini?",
          "Seperti apa keberhasilan dalam tiga atau enam bulan pertama?",
          "Bagaimana tim ini bekerja sama dengan tim lain?",
          "Apa tantangan terbesar tim saat ini?",
          "Bagaimana kelanjutan proses seleksinya, dan kapan saya bisa mendapat kabar?",
        ],
      ],
      [
        "tip",
        "Hindari bertanya tentang cuti, jam pulang, atau bonus di wawancara pertama, kecuali pewawancara membukanya. Pertanyaan itu sah, tapi lebih tepat diajukan setelah ada tawaran.",
      ],
      ["h", "Setelah wawancara"],
      "Dalam 24 jam, kirim pesan terima kasih singkat lewat surel atau kanal yang dipakai perekrut. Tiga sampai empat kalimat cukup: terima kasih atas waktunya, satu hal spesifik dari percakapan yang kamu ingat, dan minatmu yang tetap.",
      [
        "quote",
        "Terima kasih atas waktu Bapak hari ini. Saya senang mendengar rencana pembukaan gudang Surabaya dan tantangan ramalan stoknya. Saya makin yakin ingin berkontribusi di tim perencanaan. Saya menunggu kabar berikutnya.",
        "Contoh pesan Yoga",
      ],
      "Lalu, lanjutkan melamar ke tempat lain. Jangan menunggu satu jawaban sambil berhenti mencari.",
      ["h", "Kalau jawabannya tidak"],
      "Yoga ditolak dua kali sebelum diterima di wawancara ketiga. Setiap penolakan menyakitkan, tapi juga membawa bahan latihan. Setelah setiap wawancara, ia menulis tiga hal: pertanyaan yang sulit, jawaban yang ingin ia ubah, dan satu hal yang berjalan baik. Kalau memungkinkan, ia juga bertanya sopan kepada perekrut tentang masukan untuk perbaikan.",
      ["h", "Ukur lagi"],
      "Kerjakan lagi cek dari Bab 1 sebelum wawancara berikutnya.",
      ["quiz", SIAP_WAWANCARA],
      "CV yang kuat membuka pintu wawancara. Kalau CV-mu belum ramah sistem pelacak lamaran, template di bawah ini bisa membantu.",
      [
        "template",
        "cv-ramah-ats",
        "CV Ramah ATS Satu Kolom",
        "Isi dengan pengalaman dari bank cerita STAR-mu, lalu unduh sebagai dokumen Word.",
      ],
      [
        "summary",
        [
          "Setiap pertanyaan sedang mencari tahu: bisa, mau, dan cocok.",
          "Siapkan jawaban satu menit (kini, dulu, nanti) dan lima sampai tujuh cerita STAR.",
          "Pertanyaan sulit dijawab dengan jujur, tenang, dan diakhiri perbaikan atau pelajaran.",
          "Riset tiga puluh menit, siapkan pertanyaan, kirim terima kasih, dan terus melamar.",
        ],
      ],
    ],
  },
];
