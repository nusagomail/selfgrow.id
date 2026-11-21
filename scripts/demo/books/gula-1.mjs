/**
 * "Kurangi Gula Tanpa Menderita", 6 bab. Bentuk: tanpa tokoh tetap; pembaca diajak menjadi
 * "pemeriksa" yang membuka berkas: label, daftar komposisi, satu hari penuh, dan lidahnya sendiri.
 * Hari contoh (68 g → 26 g) dipakai juga di infografis dan video. Edukasi umum, bukan nasihat
 * medis; penyandang diabetes mengikuti arahan tenaga kesehatan.
 */
import { GULA_COUNTER, HARI_GULA_BARS, JEJAK_GULA } from "./gula-interactive.mjs";

export const GULA_1 = [
  {
    title: "Bukan Kurang Disiplin, Gulanya yang Bersembunyi",
    blocks: [
      "Coba tebak: berapa sendok gula yang kamu makan kemarin?",
      "Kebanyakan orang menjawab dengan menghitung gula yang mereka tuang sendiri. Dua sendok di teh pagi, mungkin satu lagi di kopi. Tiga sendok, rasanya wajar.",
      "Masalahnya, gula yang kita tuang sendiri biasanya hanya sebagian kecil. Sisanya datang diam-diam: dari es kopi susu yang dibeli sepulang rapat, susu cokelat kemasan di laci kantor, roti manis, kecap di lauk, saus sambal botolan. Tidak ada satu pun yang terasa berlebihan. Tapi semuanya ikut terhitung.",
      ["h", "Manis yang sudah jadi kebiasaan bersama"],
      ["chart", GULA_COUNTER],
      "Angka pertama menunjukkan betapa biasanya minuman manis di keseharian kita. Angka kedua lebih mengkhawatirkan: sebagian besar orang dewasa dengan diabetes di Indonesia tidak tahu bahwa dirinya diabetes. Gula darah tinggi sering tidak terasa apa-apa sampai bertahun-tahun kemudian.",
      [
        "fact",
        "Indonesia diperkirakan memiliki 20,4 juta orang dewasa (20–79 tahun) dengan diabetes, terbanyak kelima di dunia.",
        "IDF Diabetes Atlas edisi ke-11 (2025), data tahun 2024",
      ],
      ["h", "Buku ini tidak menyuruhmu berhenti makan manis"],
      "Berhenti total biasanya bertahan tiga hari, lalu kembali dua kali lipat. Buku ini mengambil jalan lain: **mengenali, menghitung, menukar, dan melatih lidah**. Pelan-pelan, tanpa merasa dihukum.",
      'Di setiap bab kamu akan membuka satu "berkas": label kemasan, daftar komposisi, satu hari penuh, dan terakhir lidahmu sendiri. Siapkan satu kemasan minuman atau camilan yang ada di rumah. Kita akan memakainya di Bab 2.',
      ["h", "Mulai dari jejak kemarin"],
      ["quiz", JEJAK_GULA],
      [
        "warn",
        "Buku ini adalah edukasi umum. Kalau kamu sudah didiagnosis diabetes, sedang hamil, atau minum obat penurun gula darah, ikuti arahan dokter atau ahli gizimu dan diskusikan perubahan pola makan dengan mereka.",
      ],
    ],
  },
  {
    title: "Berkas 1: Membaca Label dalam 10 Detik",
    blocks: [
      "Ambil kemasan yang sudah kamu siapkan. Balik ke bagian belakang dan cari kotak bertuliskan **Informasi Nilai Gizi**. Sebagian besar makanan dan minuman kemasan di Indonesia wajib mencantumkannya.",
      "Kotak itu terlihat penuh angka, tapi untuk urusan gula kamu hanya perlu tiga baris.",
      ["img", "anatomi-label", "Tiga baris yang perlu dibaca."],
      ["h", "Jebakan takaran saji"],
      "Angka gizi di label berlaku untuk **satu takaran saji**, bukan untuk satu kemasan. Botol susu cokelat 400 ml dengan takaran saji 200 ml berarti isinya dua sajian. Label menulis gula 12 g, tapi kalau kamu menghabiskan sebotol, yang masuk adalah 24 g.",
      "Jebakan ini paling sering terjadi pada minuman botol, keripik, dan biskuit dalam satu bungkus besar, karena kita jarang berhenti di tengah kemasan.",
      ["h", "Ubah gram menjadi sendok teh"],
      "Angka gram sulit dibayangkan. Sendok teh lebih mudah. Satu sendok teh gula pasir kira-kira 4 gram, jadi:",
      ["quote", "Gula (gram) ÷ 4 = sendok teh gula"],
      "24 g ÷ 4 = 6 sendok teh. Bayangkan menuang enam sendok gula ke segelas susu. Kebanyakan orang tidak akan melakukannya, tapi meminumnya dari botol terasa biasa saja.",
      ["tool", "penerjemah-label-gula"],
      [
        "tip",
        'Baris "Gula" di label mencakup gula alami seperti laktosa pada susu dan fruktosa pada buah. Untuk susu murni dan buah utuh, angkanya tidak perlu dikhawatirkan seperti gula tambahan. Yang perlu diwaspadai adalah minuman dan camilan yang manisnya berasal dari gula yang ditambahkan.',
      ],
      [
        "exercise",
        [
          "Ambil tiga kemasan dari dapur atau laci kantormu.",
          "Untuk masing-masing, catat takaran saji, jumlah sajian per kemasan, dan gula per sajian.",
          "Hitung gula untuk satu kemasan penuh dan ubah jadi sendok teh dengan kalkulator di atas.",
          "Urutkan dari yang paling manis. Apakah urutannya sesuai tebakanmu?",
        ],
        "Lembar kerja: tiga kemasan",
      ],
    ],
  },
  {
    title: "Berkas 2: Gula dengan Seribu Nama",
    blocks: [
      'Tidak semua kemasan punya tabel gizi yang lengkap, dan tidak semua gula ditulis sebagai "gula". Di sinilah berkas kedua dibuka: **daftar komposisi**.',
      ["img", "nama-lain-gula", "Nama-nama lain gula di label."],
      ["h", "Aturan urutan"],
      "Komposisi ditulis berurutan dari bahan yang paling banyak ke yang paling sedikit. Jadi kalau gula ada di urutan pertama atau kedua, gula adalah salah satu bahan utama produk itu, apa pun yang tertulis di bagian depan kemasan.",
      "Beberapa produk memecah gulanya menjadi tiga atau empat jenis: gula, sirup glukosa, dekstrosa, maltosa. Masing-masing berada di urutan tengah, sehingga tidak ada yang terlihat dominan. Kalau dijumlahkan, gula bisa menjadi bahan terbanyak.",
      ["h", '"Sehat" di depan, manis di belakang'],
      "Kata seperti *gula aren*, *madu*, *alami*, atau *tanpa gula pasir* di bagian depan kemasan terdengar lebih baik. Bagi tubuh, gula aren dan madu tetap gula. Kandungan mineralnya sedikit lebih banyak, tapi tidak cukup untuk mengubah hitungan gramnya.",
      [
        "table",
        [
          ["Tulisan di depan", "Yang perlu dicek di belakang"],
          ['"Pakai gula aren asli"', "Gram gula per sajian tetap dihitung sama"],
          ['"Tanpa gula tambahan"', "Boleh jadi tetap manis dari sari buah pekat"],
          ['"Rendah lemak"', "Sering ditambah gula supaya tetap enak"],
          ['"Granola sehat" / "sereal gandum"', "Lihat urutan gula di komposisi"],
          ['"Yoghurt buah"', "Bandingkan dengan yoghurt tawar merek yang sama"],
        ],
      ],
      [
        "exercise",
        [
          'Pilih satu camilan yang kamu anggap "sehat".',
          "Baca komposisinya dan tandai semua nama gula dari gambar di atas.",
          "Catat di urutan ke berapa gula pertama muncul, dan ada berapa jenis gula.",
        ],
      ],
      [
        "summary",
        [
          "Komposisi diurutkan dari bahan terbanyak.",
          "Gula bisa bersembunyi dengan banyak nama dan dipecah menjadi beberapa jenis.",
          "Gula aren dan madu tetap gula; hitung gramnya.",
        ],
      ],
    ],
  },
  {
    title: "Berkas 3: Satu Hari Penuh",
    blocks: [
      "Satu kemasan saja jarang membuat kita melewati batas. Yang membuat kita melewati batas adalah satu hari penuh.",
      ["h", "Berapa batasnya?"],
      ["img", "batas-harian", "Batas harian dalam kubus gula."],
      "Kementerian Kesehatan menganjurkan konsumsi gula tidak lebih dari **50 gram per orang per hari**, kira-kira 4 sendok makan atau 12,5 sendok teh. WHO memberi anjuran yang lebih ketat: gula bebas di bawah 10% kebutuhan energi, dan idealnya di bawah 5%, sekitar 25 gram.",
      [
        "fact",
        "Batas konsumsi gula 50 g per orang per hari ditetapkan dalam pedoman pencantuman informasi gula, garam, dan lemak dari Kementerian Kesehatan. WHO (2015) menganjurkan gula bebas di bawah 10% total energi, dengan manfaat tambahan bila di bawah 5%.",
        "Permenkes No. 30 Tahun 2013 jo. No. 63 Tahun 2015; WHO Guideline: Sugars intake for adults and children (2015)",
      ],
      ["h", "Hari contoh"],
      "Ini satu hari yang sangat biasa bagi pekerja kota. Tidak ada kue ulang tahun, tidak ada martabak. Hanya minuman dan satu camilan.",
      ["img", "hari-gula", "Satu hari contoh: 68 gram."],
      ["chart", HARI_GULA_BARS],
      "Lihat batang terpanjang. Dua minuman menyumbang lebih dari tiga perempat gula hari itu. Ini pola yang sering muncul: **minuman adalah tempat gula paling mudah bersembunyi**, karena gula cair tidak membuat kenyang dan cepat habis.",
      ["h", "Hitung harimu sendiri"],
      [
        "exercise",
        [
          "Tulis semua yang kamu makan dan minum kemarin, terutama yang manis.",
          "Beri angka gram: dari label, atau perkiraan 4 g untuk setiap sendok teh gula yang kamu tuang.",
          "Jumlahkan, lalu bandingkan dengan 50 g dan 25 g.",
          "Lingkari dua sumber terbesar. Itulah yang akan kita tukar di bab berikutnya.",
        ],
        "Lembar kerja: satu hari penuh",
      ],
      [
        "reflect",
        [
          "Dari mana sebagian besar gulamu datang: minuman, camilan, atau masakan?",
          "Di jam berapa kamu paling sering membeli sesuatu yang manis, dan kenapa?",
        ],
      ],
    ],
  },
  {
    title: "Tukar, Bukan Berhenti",
    blocks: [
      "Godaan setelah melihat angka 68 gram adalah berjanji: mulai besok tidak ada lagi kopi susu. Janji itu biasanya gagal di hari ketiga, karena yang diminta terlalu besar.",
      "Cara yang lebih awet adalah **menukar**: mempertahankan kebiasaan yang kamu sukai, tapi mengganti versinya.",
      ["img", "tukar-pilihan", "Empat penukaran kecil, 68 g menjadi 26 g."],
      "Hari contoh turun dari 68 g ke 26 g, mendekati anjuran ketat WHO, tanpa berhenti ngopi dan tanpa membuang kue sore. Hanya dua hal yang benar-benar berubah: susu cokelat sebotol diganti, dan gula di kopi dipotong setengah.",
      ["h", "Kalimat yang bisa dipakai saat memesan"],
      [
        "ul",
        [
          '"Gulanya setengah, ya." Hampir semua kedai kopi dan penjual es teh bisa melakukannya.',
          '"Sirupnya dipisah." Kamu yang menentukan berapa yang dituang.',
          '"Ukuran kecil saja." Gula turun sepertiga tanpa mengubah rasa.',
          '"Es teh tawar, gula cair sedikit di samping."',
        ],
      ],
      ["h", "Penukaran lain yang sering berhasil"],
      [
        "table",
        [
          ["Kebiasaan", "Tukar dengan"],
          ["Teh manis kemasan", "Teh tawar dingin + irisan lemon"],
          ["Minuman soda", "Air soda tanpa gula + perasan jeruk"],
          ["Yoghurt rasa buah", "Yoghurt tawar + potongan buah segar"],
          ["Sereal manis", "Oat + pisang"],
          ["Jus buah kemasan", "Buah utuh (seratnya ikut)"],
          ["Camilan manis di laci kantor", "Kacang panggang atau buah"],
        ],
      ],
      [
        "tip",
        "Mulailah dari satu penukaran saja, yang paling besar gramnya. Kalau itu sudah terasa biasa setelah dua minggu, baru tambah penukaran kedua.",
      ],
      [
        "info",
        "Pemanis buatan dan pemanis tanpa kalori boleh dipakai sebagai jembatan, tapi tidak melatih lidah untuk menyukai rasa yang kurang manis. Untuk jangka panjang, tujuan kita adalah lidah yang tidak menuntut manis, bukan sekadar mengganti sumber manisnya.",
      ],
    ],
  },
  {
    title: "Melatih Lidah, Menghadapi Ngidam",
    blocks: [
      "Kabar baiknya: lidah bisa beradaptasi. Kabar yang perlu diketahui: adaptasi itu butuh waktu dan perlu dijaga.",
      [
        "fact",
        "Dalam uji coba kecil, orang dewasa yang mengurangi gula sederhana selama tiga bulan menilai puding yang sama sekitar 40% lebih manis dibandingkan kelompok yang tidak mengubah pola makan. Tingkat manis yang mereka sukai tidak berubah, dan ketika mereka kembali makan seperti biasa, kepekaannya ikut kembali.",
        "Wise dkk., American Journal of Clinical Nutrition, 2016",
      ],
      "Artinya, mengurangi gula membuat lidah lebih peka sehingga sedikit manis sudah terasa cukup. Tapi ini bukan perubahan sekali jadi. Kebiasaan baru perlu dijaga, bukan hanya dicoba sebulan.",
      ["h", "Tangga lidah"],
      "Turunkan gula sedikit demi sedikit, seperempat setiap minggu, supaya perubahan rasanya hampir tidak terasa.",
      ["img", "tangga-lidah", "Turun seperempat setiap minggu."],
      ["tool", "tangga-turun-gula"],
      ["h", "Saat ngidam datang"],
      "Ngidam manis paling sering datang di jam yang bisa ditebak: sore hari saat energi turun, setelah makan siang yang terlalu sedikit, atau saat stres. Beberapa hal yang membantu:",
      [
        "ol",
        [
          "**Makan siang yang cukup protein dan serat.** Lapar di jam tiga sore sering berasal dari makan siang yang terlalu ringan.",
          "**Minum air dulu, lalu tunggu sepuluh menit.** Kadang yang terasa ngidam sebenarnya haus atau bosan.",
          "**Siapkan pilihan yang sudah disepakati.** Buah, kacang, atau satu potong kecil cokelat hitam di laci, bukan sebungkus besar biskuit.",
          "**Nikmati dengan sadar.** Kalau memilih makan kue, makan pelan-pelan dan duduk. Kue yang dinikmati jarang berakhir dengan kue kedua.",
        ],
      ],
      ["h", "Hari yang tidak sempurna"],
      'Kondangan, ulang tahun teman kantor, Lebaran. Hari seperti ini akan selalu ada, dan bukan kegagalan. Satu hari yang manis tidak menghapus empat minggu tangga lidah. Yang menghapusnya adalah berpikir "sudah terlanjur", lalu berhenti sama sekali.',
      [
        "tip",
        'Gunakan aturan satu hari: setelah hari yang manis, kembali ke kebiasaan pada makan berikutnya, bukan "mulai Senin".',
      ],
      ["h", "Kenali angka tubuhmu"],
      "Karena gula darah tinggi sering tidak bergejala, pemeriksaan gula darah sesekali adalah cara paling jujur untuk mengetahui kondisimu. Pemeriksaan bisa dilakukan di puskesmas, klinik, atau laboratorium. Kalau ada keluarga dekat dengan diabetes, berat badan berlebih, atau kamu jarang bergerak, bicarakan dengan tenaga kesehatan seberapa sering kamu perlu diperiksa.",
      [
        "summary",
        [
          "Baca tiga baris label: takaran saji, jumlah sajian, gula. Gula ÷ 4 = sendok teh.",
          "Gula punya banyak nama; komposisi diurutkan dari yang terbanyak.",
          "Batas Kemenkes 50 g sehari, anjuran ketat WHO 25 g. Minuman biasanya sumber terbesar.",
          "Tukar, jangan berhenti. Mulai dari satu sumber terbesar.",
          "Turunkan seperempat setiap minggu. Lidah beradaptasi, asal kebiasaannya dijaga.",
        ],
      ],
      ["h", "Ulangi jejakmu"],
      "Setelah empat minggu menjalankan tangga lidah, kerjakan lagi kuis jejak kemarin di Bab 1. Bandingkan skornya.",
    ],
  },
];
