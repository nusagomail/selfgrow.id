/**
 * "Stoik untuk Hidup Sehari-hari", 6 bab. Bentuk: tanpa tokoh tetap; setiap bab dibuka dengan
 * satu adegan sehari-hari di kota Indonesia (macet, grup kantor, harga naik), lalu satu gagasan
 * Stoik dan satu latihan. Kutipan Epiktetos, Seneca, dan Marcus Aurelius diterjemahkan bebas.
 */
import { ENERGI_STOIK } from "./stoik-interactive.mjs";

export const STOIK_1 = [
  {
    title: "Filsafat untuk Senin Pagi",
    blocks: [
      "Senin, 07.20. Hujan turun, ojek daring dibatalkan dua kali, dan grup kantor sudah ramai membahas target yang direvisi. Belum jam delapan, tapi rasanya energi hari ini sudah habis separuh.",
      "Dua ribu tahun lalu, seorang mantan budak bernama Epiktetos mengajar murid-muridnya di Yunani dengan satu gagasan yang terdengar sederhana: sebagian besar penderitaan kita datang dari memperjuangkan hal yang bukan milik kita.",
      ["h", "Stoik bukan berarti tanpa perasaan"],
      'Kata "stoik" dalam bahasa sehari-hari sering diartikan dingin atau menahan perasaan. Stoikisme yang sebenarnya justru sebaliknya. Para Stoik tetap merasakan sedih, kecewa, dan marah. Bedanya, mereka berlatih untuk tidak dikendalikan oleh perasaan itu, dan memusatkan tenaga pada hal yang bisa mereka ubah.',
      [
        "info",
        "Tiga tokoh Stoik yang akan sering muncul di buku ini: Epiktetos (guru, dulunya budak), Seneca (penulis dan penasihat), dan Marcus Aurelius (kaisar Romawi yang menulis catatan pribadi untuk dirinya sendiri). Latar mereka sangat berbeda, tapi latihannya sama.",
      ],
      ["h", "Buku ini adalah buku latihan"],
      "Stoikisme tidak berguna kalau hanya dibaca. Setiap bab berisi satu gagasan dan satu latihan sederhana yang bisa kamu coba hari itu juga, di tengah macet, rapat, atau percakapan yang menyebalkan.",
      ["h", "Mulai dari peta"],
      ["quiz", ENERGI_STOIK],
    ],
  },
  {
    title: "Lingkaran Kendali",
    blocks: [
      'Pesan masuk dari atasan pukul sembilan malam: "Besok pagi kita bahas angka bulan ini ya." Tidak ada konteks, tidak ada emoji. Pikiranmu langsung berputar: apakah dia kecewa? Apakah aku akan ditegur?',
      "Epiktetos membuka buku pegangannya dengan kalimat yang bisa menjadi alat ukur untuk momen seperti ini.",
      ["img", "lingkaran-kendali", "Tiga lingkaran kendali."],
      ["h", "Pemilahan dalam satu menit"],
      "Ambil pesan atasan tadi. Apa yang **di luar kendali**? Isi pikirannya, suasana hatinya besok, angka bulan ini yang sudah terjadi. Apa yang **bisa dipengaruhi**? Cara rapat besok berjalan. Apa yang **sepenuhnya dalam kendali**? Menyiapkan data dengan rapi malam ini, tidur cukup, dan memilih bersikap tenang dan terbuka besok pagi.",
      "Setelah dipilah, kekhawatiran yang tadinya kabur berubah menjadi daftar pekerjaan pendek. Sisanya bisa diletakkan.",
      [
        "tip",
        'Untuk hal yang "bisa dipengaruhi", tetapkan target pada usahamu, bukan pada hasilnya. "Aku akan menyiapkan tiga slide yang jelas" ada dalam kendalimu. "Atasan harus puas" tidak.',
      ],
      [
        "exercise",
        [
          "Tulis tiga hal yang sedang membuatmu gelisah.",
          "Untuk masing-masing, pisahkan bagian yang di luar kendali, bisa dipengaruhi, dan dalam kendali.",
          'Pilih satu tindakan dari bagian "dalam kendali" dan kerjakan hari ini.',
        ],
        "Latihan: pilah tiga kegelisahan",
      ],
    ],
  },
  {
    title: "Bukan Kejadiannya, tapi Penilaiannya",
    blocks: [
      "Dua orang terjebak di kemacetan yang sama, satu jam penuh. Yang satu turun dari mobil dengan wajah tegang dan mengomel sepanjang pagi. Yang lain akhirnya sempat mendengarkan podcast yang tertunda seminggu. Kemacetannya sama. Yang berbeda adalah kalimat di kepala mereka.",
      ["img", "penilaian", "Kejadian yang sama, penilaian yang berbeda."],
      "Para Stoik memisahkan tiga hal yang biasanya terasa menyatu: **kejadian**, **penilaian** kita tentang kejadian itu, dan **perasaan** yang muncul dari penilaian tersebut. Kejadiannya sering tidak bisa diubah. Penilaiannya bisa.",
      ["h", "Menangkap penilaian otomatis"],
      'Penilaian otomatis biasanya berbentuk kalimat pendek dan mutlak: "hariku rusak", "dia meremehkanku", "aku selalu gagal". Begitu kamu bisa mendengarnya sebagai kalimat, kamu bisa mempertanyakannya.',
      [
        "ol",
        [
          "Apa yang sebenarnya terjadi, tanpa tafsiran?",
          "Kalimat apa yang kuucapkan pada diri sendiri tentang kejadian itu?",
          "Apakah ada penjelasan lain yang sama masuk akalnya?",
          "Penilaian mana yang lebih membantuku bertindak dengan baik?",
        ],
      ],
      [
        "warn",
        "Mengubah penilaian bukan berarti membohongi diri atau membenarkan perlakuan yang tidak adil. Kalau seseorang memang memperlakukanmu dengan buruk, penilaian yang jernih membantumu menanggapinya dengan tegas, bukan meledak.",
      ],
    ],
  },
  {
    title: "Membayangkan yang Terburuk, dengan Tenang",
    blocks: [
      "Besok kamu presentasi di depan klien terbesar. Malam ini, pikiranmu memutar adegan yang sama berulang kali: slide yang macet, pertanyaan yang tidak bisa dijawab, klien yang menolak.",
      "Seneca punya cara yang terdengar aneh untuk menghadapi kecemasan seperti ini: jangan melawan bayangan buruk itu, tapi **lihat dengan jelas**. Para Stoik menyebutnya praemeditatio malorum, membayangkan kesulitan sebelum ia datang.",
      ["img", "skenario-terburuk", "Empat langkah latihan."],
      "Bedanya dengan cemas biasa: kecemasan berputar tanpa ujung, sementara latihan ini berakhir dengan satu rencana dan satu tindakan. Bayangan yang tadinya kabur menjadi skenario yang bisa dihadapi.",
      ["tool", "latihan-skenario-terburuk"],
      [
        "tip",
        "Lakukan latihan ini di siang hari atau sore, bukan tepat sebelum tidur. Kalau kecemasan muncul di malam hari, tuliskan saja satu kalimat dan janjikan pada dirimu untuk melatihnya besok.",
      ],
      [
        "info",
        "Kalau kecemasan terasa terus-menerus, mengganggu tidur atau pekerjaan selama berminggu-minggu, bicarakan dengan psikolog atau tenaga kesehatan. Latihan Stoik bisa membantu, tapi bukan pengganti bantuan profesional.",
      ],
    ],
  },
  {
    title: "Dua Halaman Sehari",
    blocks: [
      "Marcus Aurelius memimpin kekaisaran terbesar di zamannya. Di tengah perang dan wabah, dia tetap menulis catatan pribadi: pengingat untuk dirinya sendiri tentang cara bersikap. Catatan itu tidak pernah dimaksudkan untuk dibaca orang lain, dan kini kita kenal sebagai Meditations.",
      "Kamu tidak perlu menulis buku. Cukup dua halaman pendek: satu di pagi hari, satu di malam hari, masing-masing lima menit.",
      ["img", "jurnal-pagi-malam", "Tiga pertanyaan pagi, tiga pertanyaan malam."],
      ["h", "Pagi: bersiap, bukan berharap"],
      "Marcus Aurelius mengingatkan dirinya setiap pagi bahwa hari itu dia mungkin akan bertemu orang yang tidak tahu terima kasih, sombong, atau menyebalkan. Tujuannya bukan berpikir negatif, tapi supaya dia tidak kaget dan bisa memilih tanggapannya sendiri.",
      ["h", "Malam: meninjau tanpa menghakimi"],
      "Seneca menceritakan kebiasaannya meninjau hari setiap malam, setelah lampu dimatikan: apa yang sudah baik, apa yang bisa diperbaiki. Nadanya seperti seorang pelatih yang adil, bukan hakim yang kejam.",
      [
        "exercise",
        [
          "Besok pagi, jawab tiga pertanyaan pagi sebelum membuka ponsel.",
          "Besok malam, jawab tiga pertanyaan malam.",
          "Lakukan selama tujuh hari, lalu baca ulang semuanya di hari kedelapan.",
        ],
        "Latihan: tujuh hari, dua halaman",
      ],
    ],
  },
  {
    title: "Stoik Bukan Pasrah",
    blocks: [
      "Salah paham yang paling sering: kalau hanya fokus pada yang bisa dikendalikan, bukankah kita jadi pasrah pada ketidakadilan, harga yang naik, atau kantor yang buruk?",
      "Para Stoik justru orang-orang yang sangat aktif. Seneca menulis dan memberi nasihat politik, Marcus Aurelius memimpin negara, Epiktetos mengajar sampai tua. Mereka memusatkan tenaga pada tindakan, karena tindakan adalah satu-satunya yang benar-benar milik kita, dan mereka percaya kita hidup untuk saling membantu.",
      ["h", "Tiga pertanyaan sebelum bertindak"],
      [
        "ol",
        [
          "Bagian mana dari masalah ini yang ada dalam kendaliku?",
          "Tindakan apa yang paling adil dan berguna, bagi diriku dan orang lain?",
          "Kalau hasilnya tidak sesuai harapan, apakah aku tetap bisa bangga dengan caraku bertindak?",
        ],
      ],
      ["img", "minggu-latihan", "Satu minggu latihan."],
      [
        "summary",
        [
          "Pisahkan yang dalam kendali, yang bisa dipengaruhi, dan yang di luar kendali.",
          "Perasaan kita datang dari penilaian tentang kejadian, dan penilaian bisa dilatih.",
          "Bayangkan kesulitan dengan tenang, lalu siapkan satu langkah.",
          "Dua halaman sehari: bersiap di pagi hari, meninjau di malam hari.",
          "Stoik bukan pasrah: tenagamu dipusatkan pada tindakan yang baik.",
        ],
      ],
      ["h", "Ulangi petanya"],
      "Setelah seminggu latihan, kerjakan lagi kuis di Bab 1. Lihat apakah energi pikiranmu sudah lebih banyak tinggal di lingkaran kendalimu.",
    ],
  },
];
