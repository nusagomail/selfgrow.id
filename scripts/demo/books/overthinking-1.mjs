/**
 * "Keluar dari Lingkaran Overthinking", 6 bab. Ditulis seperti surat yang menemani pembaca di satu
 * malam yang panjang: setiap bab dibuka dengan jam berbeda. Tanpa tokoh utama; sesekali suara
 * pembaca (komposit, ilustrasi). Bukan pengganti bantuan profesional.
 */
import { KHAWATIR_COUNTER, PUTARAN_PIKIRAN } from "./overthinking-interactive.mjs";

export const OVERTHINKING_1 = [
  {
    title: "Pukul 23.40: Kamu Belum Tidur",
    blocks: [
      "Lampu kamar sudah mati sejak setengah jam lalu. Badanmu lelah, matamu berat. Tapi kepalamu masih terang benderang.",
      "Kamu memutar ulang rapat tadi siang. Kalimat yang kamu ucapkan ke atasan. Ekspresi wajahnya. Apakah dia tersinggung? Apakah tadi kamu terlalu banyak bicara? Lalu pikiranmu melompat ke minggu depan: presentasi, tagihan, kabar ibu yang belum menelepon. Lalu kembali lagi ke rapat tadi.",
      "Kalau kamu sedang membaca ini di jam seperti itu, aku ingin bilang satu hal dulu: **kamu tidak sendirian, dan kamu tidak rusak.**",
      ["h", "Apa sebenarnya overthinking itu"],
      'Overthinking bukan sekadar "banyak berpikir". Orang yang banyak berpikir bisa memecahkan masalah, menulis rencana, atau menemukan ide. Overthinking berbeda: pikirannya berputar di tempat yang sama, tidak sampai ke mana-mana, dan membuatmu makin lelah.',
      "Biasanya ia datang dalam dua bentuk:",
      [
        "ul",
        [
          '**Memutar ulang masa lalu.** "Kenapa tadi aku bilang begitu?" "Seharusnya aku..."',
          '**Membayangkan masa depan yang buruk.** "Bagaimana kalau aku gagal?" "Pasti nanti..."',
        ],
      ],
      "Keduanya punya kesamaan: keduanya terjadi di kepala, bukan di dunia nyata. Dan keduanya paling sering muncul saat dunia nyata sedang sepi, seperti malam hari menjelang tidur.",
      ["img", "spiral-pikiran", "Lingkaran yang menyala di malam hari."],
      ["h", "Kenapa malam terasa paling berat"],
      "Di siang hari, perhatianmu terbagi ke banyak hal: pekerjaan, jalanan, orang-orang. Di malam hari, saat semua itu berhenti, pikiran yang tertunda seolah antre masuk. Tidak ada lagi yang mengalihkan. Ditambah lagi, saat lelah, kita cenderung melihat segala sesuatu lebih gelap dari kenyataannya.",
      [
        "quote",
        "Pikiran di jam dua pagi bukan pikiran yang paling jujur. Itu pikiran yang paling lelah.",
      ],
      "Ini penting untuk diingat: apa yang terasa sangat menakutkan pukul satu pagi sering terasa jauh lebih kecil saat kamu sarapan keesokan harinya. Masalahnya mungkin sama. Yang berbeda adalah kondisi otakmu saat memikirkannya.",
      ["h", "Berhenti sebentar, lihat polanya"],
      "Sebelum mencoba apa pun, coba kenali dulu seberapa sering lingkaran ini menyala dalam hidupmu. Pilih jawaban yang paling jujur.",
      ["quiz", PUTARAN_PIKIRAN],
      'Apa pun skormu, buku ini tidak akan memintamu "berhenti berpikir". Itu mustahil, dan mencobanya justru sering membuat pikiran makin kencang. Yang akan kita pelajari adalah cara lain: memberi pikiran tempat, waktu, dan batas.',
      [
        "reflect",
        ["Pikiran apa yang paling sering mengetuk kepalamu menjelang tidur akhir-akhir ini?"],
      ],
    ],
  },
  {
    title: "Pukul 00.15: Kenapa Pikiran Tidak Mau Diam",
    blocks: [
      "Coba lakukan ini sekarang: jangan memikirkan beruang putih. Apa pun yang terjadi dalam 30 detik ke depan, jangan sampai beruang putih muncul di kepalamu.",
      "Bagaimana? Hampir pasti, beruang putih itu muncul berkali-kali.",
      'Percobaan sederhana ini terkenal di dunia psikologi karena menunjukkan sesuatu yang penting: **semakin keras kita berusaha menekan sebuah pikiran, semakin sering pikiran itu kembali.** Otak kita harus terus "memeriksa" apakah pikiran itu muncul, dan pemeriksaan itu justru memanggilnya.',
      'Jadi kalau selama ini kamu berbaring sambil berkata pada diri sendiri "udah, jangan dipikirin", dan itu tidak berhasil, itu bukan karena kamu lemah. Caranya memang tidak bekerja untuk siapa pun.',
      ["h", "Pikiran merasa sedang membantu"],
      'Ada alasan lain kenapa overthinking sulit berhenti: sebagian diri kita percaya bahwa memikirkan sesuatu terus-menerus adalah cara melindungi diri. "Kalau aku memikirkan semua kemungkinan buruk, aku tidak akan kaget." "Kalau aku memutar ulang kesalahanku, aku tidak akan mengulanginya."',
      "Kedengarannya masuk akal. Tapi coba tanyakan dengan jujur: setelah memikirkan rapat tadi untuk ke-17 kalinya, apakah kamu menemukan sesuatu yang baru? Atau kamu hanya merasa makin cemas?",
      [
        "info",
        "Memikirkan masalah itu berguna kalau menghasilkan keputusan atau langkah. Kalau sudah berputar lebih dari beberapa menit tanpa langkah baru, itu tanda pikiranmu sedang berputar, bukan memecahkan.",
      ],
      ["h", "Apakah yang kita takutkan benar-benar terjadi?"],
      "Para peneliti pernah mengajak sekelompok orang yang sering cemas berlebihan untuk mencatat setiap kekhawatiran mereka selama beberapa minggu, lalu memeriksa kemudian: mana yang benar-benar terjadi?",
      ["chart", KHAWATIR_COUNTER],
      [
        "fact",
        "Dalam penelitian tersebut, sekitar 91% kekhawatiran yang dicatat peserta tidak terjadi. Dari yang terjadi, banyak yang hasilnya lebih baik dari yang dibayangkan.",
        "LaFreniere & Newman, Behavior Therapy, 2019",
      ],
      "Bukan berarti kekhawatiranmu tidak penting. Tapi angka ini memberi alasan untuk sedikit lebih curiga pada suara di kepala yang selalu meramalkan hal terburuk. Suara itu sering salah.",
      [
        "quote",
        "Aku sudah melewati banyak sekali masalah dalam hidupku, dan sebagian besar tidak pernah terjadi.",
        "Ungkapan yang sering dikaitkan dengan Mark Twain",
      ],
      [
        "exercise",
        [
          "Besok, catat satu kekhawatiran yang muncul, lengkap dengan tanggalnya.",
          "Tulis juga apa yang kamu takutkan akan terjadi.",
          "Dua minggu kemudian, buka lagi catatan itu. Apakah benar terjadi? Seberat yang kamu bayangkan?",
        ],
        "Mulai catatan kecil:",
      ],
    ],
  },
  {
    title: "Pukul 01.14: Menulis Supaya Bisa Melepas",
    blocks: [
      "Ada perbedaan besar antara pikiran yang berputar di kepala dan pikiran yang tertulis di kertas. Di kepala, pikiran terasa besar, kabur, dan saling bertumpuk. Di kertas, ia punya bentuk, punya batas, dan bisa dilihat dari luar.",
      '"Dulu aku kira menulis itu buat orang yang suka nulis," cerita seorang pembaca. "Ternyata buatku menulis itu kayak mengeluarkan barang dari tas yang kepenuhan. Setelah ditaruh di meja, kelihatan sebenarnya isinya nggak sebanyak itu."',
      ["h", "Daftar untuk besok, bukan ulasan hari ini"],
      [
        "fact",
        "Dalam sebuah penelitian tidur, peserta yang menulis daftar tugas untuk hari-hari berikutnya selama lima menit sebelum tidur tertidur rata-rata sekitar sembilan menit lebih cepat dibanding peserta yang menulis tentang hal yang sudah mereka selesaikan. Semakin spesifik daftarnya, semakin cepat mereka tertidur.",
        "Scullin dkk., Journal of Experimental Psychology: General, 2018",
      ],
      'Kenapa bisa begitu? Salah satu dugaannya: saat ditulis, otak tidak perlu lagi "memegang" tugas-tugas itu sepanjang malam supaya tidak lupa. Kertas sudah memegangnya untukmu.',
      [
        "tip",
        'Taruh buku catatan kecil dan pulpen di samping tempat tidur. Saat pikiran soal besok muncul, tulis satu baris, lalu katakan pada dirimu: "Sudah dicatat. Besok pagi kuurus."',
      ],
      ["h", "Jurnal pikiran: memeriksa suara di kepala"],
      'Untuk pikiran yang lebih berat, seperti "dia pasti marah padaku" atau "aku pasti gagal", ada cara menulis yang sedikit lebih terarah. Bayangkan kamu adalah teman yang mendengarkan dengan tenang, lalu ajukan beberapa pertanyaan.',
      ["img", "jurnal-pikiran", "Satu halaman jurnal pikiran."],
      [
        "ol",
        [
          "**Situasi.** Apa yang sebenarnya terjadi? Tulis faktanya saja, seperti kamera merekam.",
          "**Pikiran otomatis.** Apa yang langsung muncul di kepalamu?",
          "**Bukti yang mendukung.** Apa yang membuat pikiran itu terasa benar?",
          "**Bukti sebaliknya.** Apa yang tidak sesuai dengan pikiran itu?",
          "**Pikiran yang lebih seimbang.** Kalau sahabatmu ada di posisimu, apa yang akan kamu katakan padanya?",
        ],
      ],
      "Tujuannya bukan memaksa diri berpikir positif. Tujuannya melihat gambaran yang lebih utuh. Sering kali pikiran pertama kita hanya melihat satu sisi.",
      [
        "reflect",
        [
          "Kalau sahabatmu menceritakan kekhawatiran yang sama denganmu malam ini, apa yang akan kamu katakan padanya?",
        ],
      ],
    ],
  },
  {
    title: "Pukul 02.30: Memberi Kekhawatiran Jam Kunjungan",
    blocks: [
      'Bayangkan kekhawatiran sebagai tamu yang suka datang tanpa memberi kabar. Pagi, siang, tengah malam, saat kamu sedang makan, saat kamu sedang bekerja. Kamu tidak bisa melarangnya datang sama sekali. Tapi kamu bisa bilang: "Silakan datang, tapi jam kunjungannya pukul tujuh malam."',
      "Inilah ide di balik teknik yang disebut **waktu khawatir**.",
      ["img", "waktu-khawatir", "Waktu khawatir: 15 menit, tempat yang sama."],
      ["h", "Cara melakukannya"],
      [
        "ol",
        [
          "**Pilih 15 menit yang sama setiap hari.** Misalnya pukul 19.30. Jangan terlalu dekat dengan jam tidur.",
          '**Saat khawatir datang di luar jam itu**, tulis satu baris di catatan, lalu katakan pada dirimu: "Nanti jam setengah delapan."',
          "**Kembalikan perhatian** ke apa yang sedang kamu lakukan.",
          "**Di waktu khawatir**, buka catatanmu dan pikirkan semuanya dengan sengaja. Boleh pakai pohon kekhawatiran di bawah.",
          "**Setelah 15 menit, berhenti.** Kalau masih ada yang belum selesai, simpan untuk besok.",
        ],
      ],
      [
        "fact",
        "Teknik menunda kekhawatiran ke waktu tertentu sudah diteliti sejak 1980-an. Dalam salah satu studi terhadap 171 remaja, kelompok yang memakai teknik ini mengalami periode khawatir yang lebih singkat dan keluhan fisik yang lebih sedikit dibanding kelompok pembanding. Hasilnya tidak selalu sama pada setiap kelompok, tapi teknik ini mudah dan aman untuk dicoba.",
        "Borkovec dkk., 1983; Brosschot & van der Doef, 2006",
      ],
      "Yang sering mengejutkan orang: saat waktu khawatir tiba, banyak kekhawatiran yang tadi siang terasa mendesak ternyata sudah tidak terasa penting lagi.",
      ["h", "Pohon kekhawatiran"],
      "Di waktu khawatirmu, pakai pertanyaan sederhana ini untuk setiap kekhawatiran:",
      ["img", "pohon-kekhawatiran", "Pohon kekhawatiran."],
      "Atau, kalau ingin lebih cepat, coba alat di bawah. Tulis satu kekhawatiranmu, jawab dua pertanyaan, dan lihat langkah yang disarankan.",
      [
        "tool",
        "pemilah-kekhawatiran",
        "Pemilah kekhawatiran",
        "Satu kekhawatiran saja dulu. Yang paling sering mengetuk malam ini.",
      ],
      ["h", "Tiga lingkaran"],
      "Satu lagi alat untuk dipakai di waktu khawatir: pisahkan apa yang bisa kamu kendalikan, apa yang hanya bisa kamu pengaruhi, dan apa yang benar-benar di luar kendalimu.",
      ["img", "lingkar-kendali", "Tiga lingkaran."],
      "Overthinking sering menghabiskan tenaga di lingkaran terluar: keputusan orang lain, masa lalu, hal-hal yang belum terjadi. Padahal tenaga itu jauh lebih berguna di lingkaran paling dalam.",
    ],
  },
  {
    title: "Pukul 03.05: Kembali ke Tubuh",
    blocks: [
      "Kadang kamu sudah mencoba menulis, sudah mencoba memilah, tapi pikiran tetap berlari. Saat itu, cara terbaik bukan berpikir lebih keras, melainkan **keluar sebentar dari kepala dan kembali ke tubuh.**",
      "Pikiran bisa melayang ke masa lalu dan masa depan. Tubuh hanya bisa ada di saat ini. Itulah kenapa memperhatikan tubuh adalah salah satu jalan tercepat untuk berhenti berputar.",
      ["h", "Napas kotak"],
      ["img", "napas-kotak", "Napas kotak."],
      "Teknik ini sederhana dan bisa dilakukan di mana saja, bahkan sambil berbaring:",
      [
        "ol",
        [
          "Tarik napas lewat hidung sambil menghitung pelan sampai empat.",
          "Tahan sampai hitungan empat.",
          "Hembuskan pelan lewat mulut sampai hitungan empat.",
          "Tahan lagi sampai hitungan empat.",
          "Ulangi empat putaran.",
        ],
      ],
      [
        "tip",
        "Kalau menahan napas terasa tidak nyaman, lewati saja bagian menahan. Cukup tarik napas empat hitungan, hembuskan enam hitungan. Hembusan yang lebih panjang dari tarikan membantu tubuh merasa lebih tenang.",
      ],
      ["h", "Lima, empat, tiga, dua, satu"],
      "Saat pikiran terasa sangat kencang, coba teknik membumi ini. Sebutkan dalam hati:",
      [
        "ul",
        [
          "**5** hal yang bisa kamu lihat",
          "**4** hal yang bisa kamu sentuh",
          "**3** suara yang bisa kamu dengar",
          "**2** aroma yang bisa kamu cium",
          "**1** rasa di mulutmu",
        ],
      ],
      'Kedengarannya sepele. Tapi untuk menjawabnya, perhatianmu harus pindah dari "bagaimana kalau" ke "apa yang ada sekarang". Dan di saat ini, biasanya, kamu aman.',
      [
        "quote",
        "Kamu tidak harus menghentikan ombak. Kamu bisa belajar berselancar.",
        "Jon Kabat-Zinn",
      ],
      ["h", "Kalau tetap tidak bisa tidur"],
      "Kalau sudah lebih dari sekitar 20 menit berbaring dan pikiranmu masih ramai, tidak apa-apa untuk bangun sebentar. Pindah ke kursi, nyalakan lampu redup, lakukan sesuatu yang tenang dan membosankan, seperti melipat baju atau membaca buku kertas. Kembali ke tempat tidur saat mulai mengantuk. Ini membantu tubuhmu tidak mengaitkan kasur dengan pikiran yang berputar.",
    ],
  },
  {
    title: "Pukul 05.20: Fajar, dan Seterusnya",
    blocks: [
      "Di luar, langit mulai berubah warna. Azan subuh terdengar dari kejauhan. Malam yang panjang hampir selesai.",
      "Kalau kamu membaca buku ini dari awal, kamu sudah punya beberapa alat: menulis untuk melepas, waktu khawatir untuk memberi batas, pohon kekhawatiran dan tiga lingkaran untuk memilah, serta napas dan tubuh untuk kembali ke saat ini. Tidak perlu memakai semuanya. Pilih satu atau dua yang terasa paling cocok, lalu latih pelan-pelan.",
      ["h", "Rutinitas kecil sebelum tidur"],
      "Berikut satu contoh yang bisa kamu sesuaikan sendiri:",
      [
        "table",
        [
          ["Waktu", "Yang dilakukan"],
          ["19.30", "Waktu khawatir 15 menit, lalu tutup catatannya"],
          ["21.30", "Ponsel diisi daya di luar kamar"],
          ["21.45", "Tulis daftar untuk besok, sespesifik mungkin"],
          ["22.00", "Lampu redup, napas kotak empat putaran"],
          [
            "Kalau terbangun",
            "Catat satu baris, kembali ke napas; lebih dari 20 menit, bangun sebentar",
          ],
        ],
      ],
      ["h", "Cek lagi lingkaranmu"],
      "Coba isi lagi tes dari bab pertama. Lakukan setelah beberapa minggu mencoba alat-alat di buku ini, dan bandingkan hasilnya.",
      ["quiz", PUTARAN_PIKIRAN],
      ["h", "Saat perlu bantuan lebih"],
      "Buku ini bisa menemanimu, tapi tidak bisa menggantikan bantuan profesional. Bicaralah dengan psikolog, psikiater, atau dokter kalau:",
      [
        "ul",
        [
          "Pikiran yang berputar membuatmu sulit bekerja, belajar, atau mengurus diri selama lebih dari dua minggu.",
          "Kamu hampir setiap malam sulit tidur dan merasa sangat lelah di siang hari.",
          "Kecemasan datang bersama dada berdebar, sesak, atau rasa panik yang kuat.",
          "Muncul pikiran untuk menyakiti diri sendiri atau merasa hidup tidak ada artinya.",
        ],
      ],
      [
        "warn",
        "Kalau kamu sedang berada dalam masa yang sangat berat atau memiliki pikiran untuk menyakiti diri, kamu tidak harus menghadapinya sendirian. Hubungi layanan Healing119 dari Kementerian Kesehatan di 119 ekstensi 8, atau datangi IGD rumah sakit terdekat. Bicara juga dengan satu orang yang kamu percaya, malam ini juga.",
      ],
      ["h", "Untukmu yang membaca sampai sini"],
      "Pikiran yang berputar bukan tanda kamu lemah. Sering kali itu tanda kamu peduli: pada pekerjaanmu, pada orang-orang di sekitarmu, pada hidupmu sendiri. Kamu hanya perlu belajar memberi kepedulian itu tempat yang lebih baik daripada jam satu pagi.",
      "Pelan-pelan saja. Malam-malam yang tenang akan datang lebih sering.",
      [
        "quote",
        "Tidak semua yang kamu pikirkan itu benar. Tidak semua yang kamu rasakan itu permanen.",
      ],
    ],
  },
];
