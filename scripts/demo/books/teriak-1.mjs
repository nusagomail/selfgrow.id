/**
 * "Mengasuh Tanpa Teriak", 6 bab. Bentuk: satu keluarga, Bu Laras dengan Dimas (6) dan
 * Kirana (3), dan satu pagi yang diulang dari sudut berbeda di setiap bab. Nada hangat, tidak
 * menghakimi orang tua. Edukasi umum; kekerasan dalam rumah tangga dan masalah perilaku yang
 * berat perlu bantuan profesional.
 */
import { LEGO_DILEMPAR, PEMICU_TERIAK } from "./teriak-interactive.mjs";

export const TERIAK_1 = [
  {
    title: "Teriakan yang Tidak Pernah Direncanakan",
    blocks: [
      "Pukul 06.42. Dimas masih memakai satu kaus kaki. Kirana menumpahkan susu di meja. Ojek langganan sudah menunggu di depan, dan ponsel Bu Laras berbunyi: rapat jam delapan dimajukan.",
      '"DIMAS! IBU SUDAH BILANG TIGA KALI!"',
      "Rumah langsung hening. Dimas memakai sepatunya dengan cepat, matanya basah. Kirana berhenti menangis karena kaget. Teriakan itu berhasil, kalau ukurannya adalah anak bergerak lebih cepat.",
      "Di dalam ojek, Bu Laras merasa bersalah sepanjang jalan. Dia tidak pernah berencana menjadi ibu yang berteriak. Tidak ada orang tua yang merencanakannya.",
      ["h", "Kenapa teriakan terasa berhasil"],
      'Teriakan menghentikan perilaku saat itu juga, karena anak kaget atau takut. Tapi yang dipelajari anak bukan "aku harus bersiap lebih cepat". Yang dipelajarinya adalah "kalau Ibu sudah berteriak, baru ini serius", dan "orang dewasa berteriak saat kesal".',
      [
        "fact",
        "Akademi Pediatri Amerika menyatakan bahwa strategi disiplin yang menakutkan, termasuk berteriak pada anak atau mempermalukannya, hanya sedikit efektif dalam jangka pendek dan tidak efektif dalam jangka panjang.",
        "American Academy of Pediatrics, Effective Discipline to Raise Healthy Children, Pediatrics, 2018",
      ],
      [
        "fact",
        "Dalam penelitian yang mengikuti remaja usia 13 tahun selama dua tahun, disiplin verbal yang keras dari ayah atau ibu (berteriak, memaki, menghina) berkaitan dengan meningkatnya masalah perilaku dan gejala depresi pada remaja.",
        "Wang & Kenny, Child Development, 2014",
      ],
      ["h", "Buku ini bukan tentang orang tua sempurna"],
      "Kamu akan tetap kesal. Anakmu akan tetap menumpahkan susu, bertengkar dengan saudaranya, dan menolak memakai sepatu di pagi yang paling sibuk. Buku ini tidak menjanjikan rumah tanpa emosi. Buku ini membantumu **menangkap emosi sebelum menjadi teriakan**, punya kalimat lain untuk diucapkan, dan tahu cara memperbaiki keadaan ketika teriakan terlanjur keluar.",
      ["h", "Petakan pemicumu"],
      ["quiz", PEMICU_TERIAK],
    ],
  },
  {
    title: "Termometer di Dalam Badan",
    blocks: [
      "Teriakan jarang datang tiba-tiba. Sebelum suara naik, badan sudah memberi tanda: rahang mengeras, napas pendek, tangan mengepal, pundak naik. Masalahnya, kita jarang memperhatikannya.",
      ["img", "termometer", "Tiga zona termometer emosi."],
      "Coba ingat pagi Bu Laras. Pukul 06.30 dia sudah di kuning: kurang tidur, belum sarapan, kepala penuh urusan kantor. Tumpahan susu bukan penyebab teriakannya. Tumpahan susu hanyalah tetes terakhir.",
      ["h", "Termometer orang tua naik lebih dulu"],
      "Banyak pemicu teriakan ada di diri orang tua, bukan di anak: lapar, kurang tidur, terburu-buru, atau pikiran yang sedang penuh. Kabar baiknya, pemicu jenis ini bisa diperiksa sebelum hari dimulai.",
      ["tool", "termometer-pagi"],
      [
        "tip",
        'Kalau suhumu tinggi, katakan pada anak dengan bahasa sederhana: "Ibu lagi capek pagi ini, jadi Ibu butuh bantuanmu untuk cepat pakai sepatu." Anak lebih mudah bekerja sama dengan orang tua yang jujur daripada yang tiba-tiba meledak.',
      ],
      [
        "exercise",
        [
          "Selama tiga hari, perhatikan tanda badanmu saat mulai kesal. Tulis satu tanda yang paling sering muncul.",
          "Catat jam berapa kamu paling sering sampai di zona kuning.",
          "Pilih satu hal kecil untuk menurunkan suhumu di jam itu: makan sesuatu, tidur 30 menit lebih awal, atau menyiapkan barang malam sebelumnya.",
        ],
        "Lembar kerja: tiga hari mengamati diri",
      ],
    ],
  },
  {
    title: "Jeda 10 Detik",
    blocks: [
      "Di zona kuning, kamu masih punya pilihan. Tapi pilihan itu hanya bertahan beberapa detik. Karena itu, kamu butuh satu kebiasaan yang sudah dilatih sebelumnya: **jeda**.",
      ["img", "jeda-10-detik", "Empat langkah jeda."],
      ["h", "Kenapa harus dilatih saat tenang"],
      "Saat marah, otak cenderung memakai jalan pintas yang paling sering dipakai. Kalau jalan pintasmu selama ini adalah berteriak, itulah yang akan keluar. Jeda harus dilatih berulang kali saat tenang, supaya menjadi jalan pintas yang baru.",
      "Bu Laras berlatih dengan cara sederhana: setiap kali mencuci tangan, dia berhenti, menarik napas, mengembuskannya pelan-pelan, dan mengucapkan kalimat dirinya dalam hati. Dua minggu kemudian, gerakan itu mulai muncul sendiri saat dia kesal.",
      ["h", "Kalimat diri"],
      "Kalimat diri mengubah cara kita melihat anak di detik itu. Pilih satu yang terasa benar bagimu:",
      [
        "ul",
        [
          '"Dia sedang kesulitan, bukan sedang menyulitkan."',
          '"Dia baru enam tahun."',
          '"Ini soal sepatu, bukan soal siapa yang menang."',
          '"Aku orang dewasanya di sini."',
        ],
      ],
      [
        "warn",
        'Kalau kamu sudah di zona merah dan anak dalam keadaan aman, tidak apa-apa berkata "Ibu butuh menenangkan diri dulu sebentar" lalu pindah ke ruangan lain selama satu-dua menit. Itu bukan meninggalkan anak; itu mencontohkan cara menenangkan diri.',
      ],
    ],
  },
  {
    title: "Turun, Namai, Batasi",
    blocks: [
      "Setelah jeda, apa yang diucapkan? Di sinilah kebanyakan orang tua bingung, karena kalimat yang kita warisi hanya dua jenis: membentak atau membujuk.",
      "Ada jalan ketiga yang tenang sekaligus tegas: kalimat batas tiga bagian.",
      ["img", "kalimat-batas", "Tiga bagian kalimat batas."],
      ["h", "Kenapa urutannya penting"],
      [
        "ol",
        [
          "**Namai perasaan dulu.** Anak yang merasa dipahami lebih cepat tenang. Menamai perasaan juga mengajarkan kosakata emosi: kesal, kecewa, takut, capek.",
          "**Lalu pasang batas pada perilaku.** Perasaan tidak pernah salah; yang dibatasi adalah apa yang dilakukan dengan perasaan itu.",
          "**Tutup dengan dua pilihan.** Pilihan memberi anak sedikit kendali, sehingga dia tidak perlu melawan untuk merasa punya kuasa. Pastikan kedua pilihan memang boleh.",
        ],
      ],
      ["tool", "penyusun-kalimat-batas"],
      ["quiz", LEGO_DILEMPAR],
      ["h", "Kalau anak masih menangis"],
      "Kalimat batas bukan tombol untuk menghentikan tangis. Tangis adalah cara anak melepaskan perasaannya. Tugasmu adalah menjaga batasnya tetap berdiri dan tetap tenang di dekatnya, bukan membuat tangisnya berhenti secepat mungkin.",
      [
        "tip",
        "Turunkan badan setinggi mata anak sebelum bicara. Orang dewasa yang menjulang di atas anak terlihat mengancam, bahkan ketika suaranya pelan.",
      ],
    ],
  },
  {
    title: "Mencegah Lebih Mudah daripada Meredakan",
    blocks: [
      "Pagi Bu Laras sebulan kemudian tidak sempurna, tapi berbeda. Seragam disiapkan malam sebelumnya. Di pintu kamar Dimas tertempel jadwal pagi bergambar. Bu Laras sarapan roti lebih dulu, sebelum membangunkan anak-anak.",
      "Teriakan paling banyak terjadi di situasi yang berulang. Situasi yang berulang bisa dirancang ulang.",
      ["img", "jadwal-pagi", "Jadwal pagi bergambar."],
      ["h", "Lima pencegah yang paling sering berhasil"],
      [
        "table",
        [
          ["Pencegah", "Contoh"],
          [
            "Peringatan sebelum berganti kegiatan",
            '"Lima menit lagi mainnya selesai, lalu mandi."',
          ],
          ["Jadwal bergambar", "Anak mencentang sendiri; Ibu cukup menunjuk gambar"],
          ["Persiapan malam sebelumnya", "Seragam, tas, dan bekal sudah siap"],
          ["Pilihan terbatas", '"Mau kaus biru atau merah?" bukan "Mau pakai apa?"'],
          ["Waktu khusus 10 menit", "Bermain berdua tanpa ponsel, anak yang memimpin"],
        ],
      ],
      'Waktu khusus mungkin terdengar tidak berhubungan dengan teriakan. Kenyataannya, anak yang "tangki perhatiannya" penuh lebih jarang mencari perhatian dengan cara yang membuat orang tua meledak.',
      [
        "exercise",
        [
          "Pilih satu situasi yang paling sering berakhir dengan teriakan.",
          "Tulis apa yang biasanya terjadi lima menit sebelumnya.",
          "Pilih satu pencegah dari tabel di atas dan jalankan selama satu minggu.",
        ],
        "Lembar kerja: rancang ulang satu situasi",
      ],
    ],
  },
  {
    title: "Kalau Sudah Terlanjur",
    blocks: [
      "Suatu sore, setelah hari yang panjang, Bu Laras berteriak lagi. Kali ini kepada Kirana, yang mencoret dinding.",
      "Dulu, rasa bersalah itu akan dia bawa diam-diam sampai malam. Kali ini, setelah suaranya kembali tenang, dia duduk di lantai di samping Kirana.",
      [
        "quote",
        "Tadi Ibu berteriak. Itu tidak baik, dan itu bukan salahmu. Ibu sedang capek. Dinding memang bukan untuk dicoret. Ayo kita bersihkan sama-sama, lalu Ibu ambilkan kertas yang besar.",
      ],
      ["img", "perbaikan", "Empat langkah memperbaiki."],
      ["h", "Permintaan maaf bukan tanda lemah"],
      "Sebagian orang tua khawatir meminta maaf membuat mereka kehilangan wibawa. Yang terjadi justru sebaliknya: anak melihat bahwa orang dewasa pun bisa salah, mengakui, dan memperbaiki. Itu pelajaran yang jauh lebih berguna daripada melihat orang dewasa yang selalu merasa benar.",
      "Yang perlu dijaga: minta maaf atas caramu, bukan atas batasnya. Dinding tetap tidak boleh dicoret.",
      [
        "info",
        "Kalau kamu merasa sering kehilangan kendali sampai menyakiti anak secara fisik atau kata-kata, atau merasa lelah dan sedih hampir setiap hari, carilah bantuan profesional seperti psikolog, puskesmas, atau layanan konseling keluarga di daerahmu. Meminta bantuan adalah bagian dari merawat anak.",
      ],
      [
        "summary",
        [
          "Teriakan menghentikan perilaku sesaat, tapi tidak mengajarkan apa yang kita harapkan.",
          "Kenali zona kuning di badanmu, dan periksa suhumu sebelum hari dimulai.",
          "Latih jeda 10 detik saat tenang supaya muncul sendiri saat kesal.",
          "Namai perasaan, pasang batas pada perilaku, beri dua pilihan.",
          "Rancang ulang situasi yang berulang. Kalau terlanjur berteriak, perbaiki.",
        ],
      ],
      ["h", "Petakan ulang"],
      "Setelah sebulan, kerjakan lagi kuis pemicu di Bab 1. Bukan untuk mencari nilai sempurna, tapi untuk melihat jam-jam mana yang sudah lebih tenang.",
    ],
  },
];
