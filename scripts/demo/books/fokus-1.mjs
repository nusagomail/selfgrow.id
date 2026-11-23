/**
 * "Fokus di Era Notifikasi", 8 bab. Bentuk: berkas kasus. Setiap bab membuka satu berkas
 * (keluhan, temuan, resep) dari pekerja yang berbeda, seperti catatan klinik fokus. Sudut pembeda:
 * gangguan digital di tempat kerja (notifikasi, grup kantor, berpindah tugas), bukan kecanduan
 * ponsel pribadi ("Lepas dari Scroll Tanpa Ujung") dan bukan merancang blok kerja mendalam
 * ("Kerja Dalam, Hasil Nyata"). Tokoh adalah kisah gabungan; angka kasus adalah ilustrasi.
 */
import {
  APJII_COUNTER,
  CHAT_MALAM,
  MITOS_MULTITASKING,
  PERHATIAN_TERPECAH,
} from "./fokus-interactive.mjs";

/** Kepala berkas kasus: nomor, nama, keluhan. */
const berkas = (no, siapa, keluhan) => ["quote", keluhan, `Berkas ${no} · ${siapa}`];

export const FOKUS_1 = [
  {
    title: "Kepala yang Penuh Tapi Kerja yang Kosong",
    blocks: [
      berkas(
        "01",
        "Fajar, 28, staf operasional gudang di Cikarang",
        "Jam 5 sore aku capek sekali, seperti habis lari. Tapi kalau ditanya hari ini menyelesaikan apa, aku bingung jawabnya. Laporan stok yang seharusnya dua jam, sudah tiga hari belum beres.",
      ),
      "Fajar mencatat semua yang memotong kerjanya selama satu hari, dari jam 8 sampai jam 5. Setiap kali ada notifikasi, panggilan, atau dia sendiri membuka aplikasi lain, dia memberi satu garis di kertas.",
      "Di akhir hari ada **97 garis**. Rata-rata hampir setiap lima menit perhatiannya berpindah. Tidak satu pun dari gangguan itu terasa besar. Bersama-sama, mereka menghabiskan harinya.",
      ["img", "peta-interupsi", "Peta interupsi satu hari kerja Fajar."],
      ["h", "Temuan: bukan kamu yang lemah"],
      "Selama bertahun-tahun, Gloria Mark, peneliti perhatian di University of California, Irvine, mengamati pekerja kantor dengan perangkat pencatat di komputer mereka. Dalam bukunya Attention Span (2023), ia melaporkan bahwa rata-rata perhatian pada satu layar sebelum berpindah kini hanya sekitar **47 detik**.",
      "Angka itu bukan tanda generasi kita malas. Hampir setiap aplikasi di ponsel dan laptop kita dirancang supaya diperhatikan: titik merah, bunyi, getar, angka di pojok ikon. Perhatianmu adalah barang yang diperebutkan.",
      ["chart", APJII_COUNTER],
      "Selalu terhubung berarti selalu bisa dihubungi. Untuk banyak pekerja, itu juga berarti selalu bisa dipotong.",
      ["h", "Pemeriksaan awal"],
      ["quiz", PERHATIAN_TERPECAH],
      ["h", "Resep minggu ini"],
      [
        "exercise",
        [
          "Pilih satu hari kerja. Siapkan kertas kecil di samping laptop.",
          "Setiap kali perhatianmu berpindah (notifikasi, panggilan, atau kamu sendiri membuka aplikasi lain), beri satu garis.",
          "Di sebelah garis, tulis satu huruf: N (notifikasi), O (orang), atau S (diri sendiri).",
          "Di akhir hari, hitung. Huruf mana yang paling banyak?",
        ],
        "Hitung gangguanmu sendiri:",
      ],
      "Simpan hasilnya. Bab-bab berikutnya membahas setiap jenis gangguan itu satu per satu.",
    ],
  },
  {
    title: "Mitos Si Jago Multitasking",
    blocks: [
      berkas(
        "02",
        "Mira, 31, admin keuangan di Semarang",
        "Di kantor aku dikenal paling cepat. Sambil input faktur, aku balas chat vendor, angkat telepon, cek surel. Tapi belakangan salah input makin sering, dan atasan mulai menegur.",
      ),
      "Mira merasa dirinya jago mengerjakan banyak hal sekaligus. Dan memang, dia mengerjakan banyak hal. Yang tidak ia sadari: otaknya tidak benar-benar mengerjakannya **bersamaan**. Otaknya berpindah, bolak-balik, sangat cepat.",
      ["h", "Temuan: setiap pindah ada ongkosnya"],
      "Setiap kali kita pindah dari satu tugas ke tugas lain, otak perlu memuat ulang aturan tugas baru: sedang di mana, harus apa, angka apa yang sedang dipegang. Proses ini cepat, tapi tidak gratis. Makin sering pindah, makin banyak waktu dan tenaga hilang di peralihan.",
      [
        "fact",
        "Saat seseorang pindah dari tugas yang belum selesai, sebagian perhatiannya masih tertinggal di tugas itu. Kinerja di tugas berikutnya pun menurun. Peneliti menyebutnya residu perhatian (attention residue).",
        "Sophie Leroy (2009), Organizational Behavior and Human Decision Processes",
      ],
      ["img", "biaya-pindah", "Ongkos berpindah tugas dibanding menyelesaikan satu per satu."],
      "Faktur Mira salah bukan karena dia ceroboh. Setiap kali telepon berdering di tengah satu faktur, sebagian kepalanya masih memikirkan telepon itu saat ia kembali mengetik angka.",
      ["quiz", MITOS_MULTITASKING],
      ["h", "Resep"],
      [
        "ul",
        [
          '**Tutup dulu, baru pindah.** Sebelum beralih, selesaikan satu unit kecil (satu faktur, satu paragraf), atau tulis satu baris catatan "berhenti di sini, selanjutnya…". Catatan ini mengurangi residu karena kepalamu tidak perlu menyimpannya.',
          "**Kelompokkan pekerjaan sejenis.** Mira sekarang membalas chat vendor di tiga waktu tetap (10.00, 13.30, 16.00), bukan setiap kali masuk.",
          "**Pisahkan kerja teliti dari kerja cepat.** Input angka di jam yang paling sepi gangguan; balas pesan di jam yang memang ramai.",
        ],
      ],
      "Dua minggu kemudian, kesalahan input Mira turun drastis. Yang lebih mengejutkan baginya: pekerjaannya selesai lebih cepat, padahal ia merasa bekerja lebih lambat.",
    ],
  },
  {
    title: "Saringan Notifikasi",
    blocks: [
      berkas(
        "03",
        "Hendra, 35, supervisor penjualan di Medan",
        "Ponselku bergetar mungkin dua ratus kali sehari. Promo aplikasi belanja, berita, grup alumni, grup keluarga, grup kantor, aplikasi ojek. Aku takut mematikannya karena takut ketinggalan yang penting.",
      ),
      "Ketakutan Hendra masuk akal: sebagian kecil notifikasinya memang penting. Masalahnya, yang penting dan yang tidak penting datang dengan bunyi yang sama. Akibatnya, semuanya diperlakukan seperti mendesak.",
      [
        "fact",
        "Dalam sebuah eksperimen, peserta yang menerima notifikasi telepon atau pesan saat mengerjakan tugas perhatian membuat lebih banyak kesalahan, walaupun mereka tidak menyentuh ponselnya sama sekali.",
        "Stothart, Mitchum & Yehnert (2015), Journal of Experimental Psychology: Human Perception and Performance",
      ],
      ["h", "Temuan: saring dengan tiga lapis"],
      "Daripada mematikan semua atau membiarkan semua, saring notifikasi berdasarkan **siapa yang mengirim**:",
      ["img", "saringan-tiga-lapis", "Tiga lapis saringan notifikasi."],
      [
        "table",
        [
          ["Lapis", "Contoh", "Pengaturan"],
          ["Manusia penting", "Atasan langsung, keluarga inti, klien aktif", "Boleh berbunyi"],
          [
            "Manusia lain",
            "Grup kantor besar, grup alumni, rekan di luar tim",
            "Tanpa bunyi; dicek di jam tertentu",
          ],
          ["Mesin", "Promo, berita, media sosial, game, aplikasi belanja", "Matikan sama sekali"],
        ],
      ],
      [
        "exercise",
        [
          "Buka pengaturan notifikasi di ponselmu. Urutkan aplikasi berdasarkan jumlah notifikasi minggu ini (sebagian besar ponsel punya menu ini).",
          "Untuk setiap aplikasi di lapis mesin, matikan notifikasinya. Kamu tetap bisa membukanya kapan pun mau.",
          "Untuk grup di lapis manusia lain, nyalakan mode senyap.",
          "Atur daftar kontak prioritas (fitur Fokus, Jangan Ganggu, atau Mode Kerja) yang tetap boleh berbunyi.",
          "Lakukan hal yang sama di laptop: matikan pop-up surel dan aplikasi chat kalau tidak dibutuhkan.",
        ],
        "Saringan dalam dua puluh menit:",
      ],
      [
        "tip",
        "Matikan juga angka merah (badge) di ikon aplikasi. Angka itu tidak berbunyi, tapi setiap kali membuka ponsel, matamu tertarik ke sana.",
      ],
      'Hendra mengerjakan saringan ini di hari Minggu. Senin sore, ponselnya bergetar 23 kali, bukan dua ratus. "Yang penting tetap sampai," katanya. "Bedanya, aku tidak lagi kaget setiap lima menit."',
    ],
  },
  {
    title: "Grup Kantor yang Tidak Pernah Tidur",
    blocks: [
      berkas(
        "04",
        "Laras, 26, staf pemasaran di Jakarta",
        "Timku punya lima grup WhatsApp. Atasan sering kirim pesan jam sembilan malam. Kalau aku tidak balas cepat, rasanya aku dianggap tidak peduli. Tapi kalau aku balas, malamku hilang.",
      ),
      "Grup chat kantor adalah gangguan yang paling sulit disaring, karena isinya sungguh pekerjaan dan pengirimnya sungguh manusia. Masalahnya bukan pada grupnya, tapi pada **aturan yang tidak pernah dibicarakan**: seberapa cepat harus membalas, dan jam berapa.",
      "Tanpa kesepakatan, setiap orang menebak. Dan tebakan paling aman bagi karyawan biasanya: balas secepat mungkin, kapan pun. Lama-lama seluruh tim hidup dalam mode siaga.",
      ["h", "Temuan: perjelas, jangan tebak"],
      ["quiz", CHAT_MALAM],
      ["h", "Resep untuk dirimu sendiri"],
      [
        "ul",
        [
          "**Jam cek.** Buka grup kantor di jam-jam tertentu, misalnya setiap 60 atau 90 menit, bukan setiap ada pesan.",
          '**Tanyakan tenggat.** "Untuk kapan?" adalah dua kata yang menyelamatkan banyak malam.',
          "**Pindahkan yang panjang.** Diskusi yang lebih dari lima balasan lebih cepat selesai lewat panggilan lima menit atau satu dokumen bersama.",
        ],
      ],
      ["h", "Resep untuk timmu"],
      "Kalau kamu punya sedikit pengaruh di tim, usulkan kesepakatan sederhana. Tidak perlu aturan tebal; cukup tiga kalimat yang disepakati bersama:",
      [
        "table",
        [
          ["Kalau…", "Gunakan…", "Waktu respons wajar"],
          ["Darurat (sistem mati, klien marah)", "Telepon langsung", "Segera"],
          ["Butuh hari ini", "Chat pribadi, sebut tenggat", "Dalam beberapa jam kerja"],
          ["Informasi atau diskusi", "Grup atau surel", "Hari kerja berikutnya"],
        ],
      ],
      'Laras mengusulkan tabel ini di rapat mingguan. Atasannya ternyata tidak sadar pesannya jam 21.00 dianggap harus dijawab. "Saya kirim malam karena baru ingat," katanya. "Bukan karena harus dikerjakan malam itu."',
      [
        "info",
        "Kalau di tempat kerjamu pesan di luar jam kerja sering berarti lembur, kamu berhak tahu aturannya. Ketentuan waktu kerja dan upah lembur diatur dalam peraturan ketenagakerjaan dan perjanjian kerja. Tanyakan ke HR bila tidak jelas.",
      ],
    ],
  },
  {
    title: "Ponsel di Atas Meja",
    blocks: [
      berkas(
        "05",
        "Rizki, 24, programmer junior di Yogyakarta",
        "Notifikasi sudah kumatikan semua. Tapi aku tetap membuka ponsel tiap beberapa menit. Bukan karena ada yang masuk. Tanganku seperti bergerak sendiri.",
      ),
      "Rizki sudah menyaring notifikasi, dan itu langkah besar. Tapi ponselnya masih tergeletak di samping papan ketik, layar menghadap ke atas. Ponsel yang terlihat adalah undangan yang terus menyala, walaupun ia tidak berbunyi.",
      ["h", "Temuan: jarak lebih kuat daripada niat"],
      [
        "fact",
        "Dalam satu penelitian, peserta yang ponselnya diletakkan di ruangan lain menunjukkan kapasitas kognitif yang lebih baik dibanding yang ponselnya di meja, walaupun ponsel dalam keadaan senyap. Penelitian lanjutan oleh peneliti lain tidak selalu menemukan efek sebesar itu, jadi anggap ini petunjuk, bukan hukum pasti.",
        "Ward, Duke, Gneezy & Bos (2017), Journal of the Association for Consumer Research",
      ],
      "Terlepas dari besar kecilnya efek, satu hal jelas dari pengalaman sehari-hari: menahan diri butuh tenaga. Daripada menahan diri ratusan kali sehari, lebih mudah membuat ponsel sedikit lebih jauh.",
      [
        "ol",
        [
          "**Balik layarnya** saat bekerja. Langkah terkecil, tapi mengurangi godaan visual.",
          "**Masukkan ke tas atau laci** saat mengerjakan tugas yang butuh pikiran penuh.",
          "**Pindahkan aplikasi yang paling sering dibuka** dari layar depan ke folder di halaman terakhir.",
          "**Pakai mode fokus terjadwal** di jam-jam kerja inti, supaya kamu tidak perlu mengingat menyalakannya.",
        ],
      ],
      [
        "tool",
        "kalkulator-waktu-layar",
        "Berapa jam layarmu sebenarnya?",
        "Masukkan angka dari menu Waktu Layar atau Kesehatan Digital di ponselmu.",
      ],
      "Rizki memilih langkah kedua: ponsel di tas, di bawah meja, selama dua blok pagi. Hari pertama terasa gelisah. Hari keempat, ia baru sadar sudah jam 11 dan belum sekali pun mencari ponselnya.",
      [
        "reflect",
        [
          "Di mana ponselmu sekarang, saat kamu membaca kalimat ini?",
          "Langkah mana dari empat langkah di atas yang paling mungkin kamu jalankan besok?",
        ],
      ],
    ],
  },
  {
    title: "Ruang yang Ramai, Rumah yang Riuh",
    blocks: [
      berkas(
        "06",
        "Dewi, 33, penulis konten yang bekerja dari rumah di Depok",
        "Di rumah tidak ada atasan yang lewat, tapi ada anak minta camilan, kurir mengetuk pintu, tetangga renovasi, dan cucian yang memanggil. Kadang aku malah rindu kantor.",
      ),
      'Gangguan tidak hanya datang dari layar. Kantor terbuka punya rekan yang mampir "sebentar". Rumah punya keluarga, tamu, dan pekerjaan rumah yang selalu kelihatan. Prinsipnya sama dengan notifikasi: **kamu tidak bisa menghapus semua gangguan, tapi kamu bisa memberi tanda kapan boleh mengganggu.**',
      ["h", "Temuan: tanda yang terlihat"],
      [
        "table",
        [
          ["Tempat", 'Tanda "sedang fokus"', 'Tanda "boleh diajak bicara"'],
          [
            "Kantor terbuka",
            'Penyuara telinga terpasang, status "Fokus sampai 11.00"',
            "Penyuara dilepas, status tersedia",
          ],
          [
            "Rumah",
            "Pintu kamar tertutup, kertas di pintu bertuliskan jam selesai",
            "Pintu terbuka",
          ],
          [
            "Kafe atau ruang bersama",
            "Duduk menghadap dinding, laptop dengan satu jendela",
            "Duduk menghadap orang",
          ],
        ],
      ],
      'Kuncinya adalah **jam selesai**. "Jangan ganggu" tanpa batas waktu terdengar seperti penolakan. "Fokus sampai jam 11, setelah itu Ibu temani main" terdengar seperti janji. Anak-anak dan rekan kerja jauh lebih mudah menunggu kalau tahu sampai kapan.',
      ["img", "kartu-pintu", "Kartu pintu: jam fokus dengan jam selesai yang jelas."],
      ["h", "Untuk yang tidak bisa menutup pintu"],
      "Tidak semua orang punya kamar sendiri. Kalau rumahmu kecil atau ramai, cari celah waktu, bukan celah ruang: satu jam sebelum anak bangun, saat anak tidur siang, atau di jam-jam ketika rumah paling sepi. Satu jam yang benar-benar utuh sering lebih berguna daripada tiga jam yang terpotong-potong.",
      [
        "tip",
        "Simpan pekerjaan rumah yang menggoda (cucian, piring) untuk jeda di antara dua blok fokus. Dengan begitu, ia menjadi istirahat yang berguna, bukan gangguan di tengah kerja.",
      ],
    ],
  },
  {
    title: "Gangguan yang Datang dari Dalam",
    blocks: [
      berkas(
        "07",
        "Bima, 29, analis data di Surabaya",
        "Notifikasi sudah mati, ponsel di laci, ruangan sepi. Tapi di tengah menulis kueri, aku tiba-tiba ingat harus bayar listrik, lalu ingin cek harga tiket mudik, lalu penasaran hasil pertandingan tadi malam.",
      ),
      "Ingat huruf **S** di latihan Bab 1? Bagi banyak orang, gangguan terbanyak justru datang dari diri sendiri. Begitu tugas terasa sulit atau membosankan, otak mencari pintu keluar yang lebih menyenangkan.",
      "Ini bukan tanda kamu tidak bisa fokus. Ini cara otak menghindari rasa tidak nyaman. Yang perlu dilatih bukan menekan pikiran itu, tapi **menangkapnya tanpa mengikutinya**.",
      ["h", "Temuan: tempat parkir pikiran"],
      'Bima menaruh satu kertas di samping laptop dengan judul "Parkir". Setiap kali muncul pikiran yang tidak berhubungan dengan tugas (bayar listrik, cek tiket, balas pesan teman), ia menulisnya dalam tiga kata, lalu kembali bekerja. Di jam istirahat, ia mengerjakan isi daftar parkir sekaligus.',
      [
        "ul",
        [
          "Pikiran itu tidak hilang, jadi kepala tidak perlu terus mengingatkan.",
          "Kamu tidak perlu memutuskan sekarang apakah itu penting.",
          'Di akhir hari, daftar parkir sering menunjukkan bahwa sebagian besar "hal mendesak" bisa menunggu.',
        ],
      ],
      ["h", "Saat dorongan datang: tunggu sepuluh tarikan napas"],
      "Kalau dorongan untuk membuka hal lain muncul, jangan langsung melawan atau menuruti. Tarik napas pelan sepuluh kali sambil tetap melihat pekerjaanmu. Seringkali dorongan itu melemah sendiri, seperti ombak yang naik lalu turun.",
      [
        "info",
        "Kalau kesulitan fokus terasa jauh lebih berat daripada orang di sekitarmu, sudah berlangsung sejak kecil, dan mengganggu sekolah, kerja, serta hubungan, tidak ada salahnya berkonsultasi dengan psikolog atau psikiater. Beberapa kondisi, seperti ADHD pada orang dewasa, bisa dibantu dengan penanganan yang tepat.",
      ],
      [
        "reflect",
        [
          'Pikiran apa yang paling sering "menculikmu" dari pekerjaan?',
          "Tugas jenis apa yang paling sering membuatmu mencari pintu keluar?",
        ],
      ],
    ],
  },
  {
    title: "Resep Fokusmu Sendiri",
    blocks: [
      berkas(
        "08",
        "kamu",
        "Aku sudah membaca tujuh berkas. Sekarang bagaimana menyusun semuanya untuk hari kerjaku sendiri?",
      ),
      "Setiap berkas di buku ini membahas satu sumber gangguan. Hari kerjamu kemungkinan punya beberapa sekaligus. Jangan mencoba mengubah semuanya minggu ini. Pilih dua yang paling besar dari hitungan garis di Bab 1, lalu mulai dari sana.",
      ["img", "resep-fokus", "Lembar resep fokus pribadi."],
      [
        "table",
        [
          ["Sumber gangguan terbesarku", "Resep", "Mulai kapan"],
          ["Notifikasi (N)", "Saringan tiga lapis, matikan angka merah", ""],
          ["Orang dan grup (O)", "Jam cek, tanya tenggat, kesepakatan tim", ""],
          ["Diri sendiri (S)", "Kertas parkir, sepuluh tarikan napas", ""],
          ["Ponsel yang terlihat", "Balik layar, masuk tas, mode fokus terjadwal", ""],
          ["Ruang yang ramai", "Tanda fokus dengan jam selesai", ""],
        ],
      ],
      [
        "exercise",
        [
          "Pilih dua baris dari tabel di atas.",
          "Jalankan selama lima hari kerja.",
          "Di hari kelima, ulangi hitungan garis dari Bab 1 dan bandingkan.",
          "Kalau sudah berjalan, tambah satu baris lagi minggu berikutnya.",
        ],
        "Dua minggu pertama:",
      ],
      "Kalau minggumu sering terasa penuh sebelum dimulai, lembar rencana mingguan di bawah ini membantu menentukan kapan blok fokus diletakkan, sebelum kalender diisi orang lain.",
      [
        "template",
        "lembar-rencana-mingguan",
        "Lembar Rencana Mingguan",
        "Tandai dua sampai tiga blok fokus di minggu depan, sebelum rapat dan permintaan lain berdatangan.",
      ],
      ["h", "Pemeriksaan ulang"],
      ["quiz", PERHATIAN_TERPECAH],
      [
        "summary",
        [
          "Gangguan kecil yang sering lebih merusak daripada gangguan besar yang jarang.",
          "Berpindah tugas selalu ada ongkosnya; selesaikan satu unit dulu, atau tulis titik berhenti.",
          "Saring notifikasi berdasarkan pengirim: manusia penting, manusia lain, mesin.",
          "Perjelas aturan grup kantor, beri jarak pada ponsel, dan parkir pikiran yang datang dari dalam.",
        ],
      ],
      ["h", "Bacaan lebih lanjut"],
      [
        "ul",
        [
          "Gloria Mark, Attention Span (2023).",
          'Sophie Leroy, "Why is it so hard to do my work?", Organizational Behavior and Human Decision Processes (2009).',
          'Ophir, Nass & Wagner, "Cognitive control in media multitaskers", PNAS (2009).',
          'Stothart, Mitchum & Yehnert, "The attentional cost of receiving a cell phone notification" (2015).',
        ],
      ],
    ],
  },
];
