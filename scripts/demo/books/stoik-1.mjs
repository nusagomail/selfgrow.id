/**
 * "Stoik untuk Hidup Sehari-hari", 9 bab (diperdalam: amarah, empat kebajikan, kehilangan). Bentuk: tanpa tokoh tetap; setiap bab dibuka dengan
 * satu adegan sehari-hari di kota Indonesia (macet, grup kantor, harga naik), lalu satu gagasan
 * Stoik dan satu latihan. Kutipan Epiktetos, Seneca, dan Marcus Aurelius diterjemahkan bebas.
 */
import { ENERGI_STOIK, PILAH_KENDALI } from "./stoik-interactive.mjs";

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
      ["quiz", PILAH_KENDALI],
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
    title: "Saat Amarah Datang Lebih Dulu",
    blocks: [
      "Jalan Gatot Subroto, pukul enam sore. Sebuah mobil memotong jalur tanpa lampu sein. Klakson, umpatan, dan dada yang mendadak panas. Sepuluh menit kemudian, mobilnya sudah tidak terlihat, tapi kesalnya masih ikut sampai rumah, dan anak yang menyambut di pintu mendapat jawaban ketus.",
      "Dari semua emosi, amarah adalah yang paling banyak dibahas Seneca. Dia menulis satu buku utuh tentangnya, karena dia melihat bagaimana amarah merusak orang-orang di sekitar kaisar, dan dirinya sendiri.",
      ["quote", "Obat terbaik untuk amarah adalah menunda.", "Seneca, Tentang Amarah"],
      ["h", "Kenapa menunda berhasil"],
      "Amarah datang cepat, dan di detik-detik pertama ia meyakinkan kita bahwa reaksi saat itu juga adalah satu-satunya yang masuk akal. Menunda tidak berarti menekan amarah. Menunda memberi waktu bagi penilaian, yang kamu latih di bab sebelumnya, untuk ikut bicara.",
      [
        "ol",
        [
          "**Sadari tandanya di tubuh:** rahang mengeras, napas pendek, wajah panas.",
          "**Tunda satu tindakan:** jangan membalas pesan, jangan membunyikan klakson kedua, jangan bicara dulu. Hitung sepuluh napas.",
          '**Tanyakan penilaiannya:** kalimat apa yang sedang kuucapkan pada diriku? "Dia sengaja meremehkanku"? Apakah ada penjelasan lain?',
          "**Pilih tindakan:** setelah tenang, apakah masih perlu berbuat sesuatu? Kalau ya, lakukan dengan kepala dingin.",
        ],
      ],
      ["h", "Di grup keluarga"],
      "Tidak semua amarah datang dari jalan raya. Pesan berantai yang keliru, komentar tentang pilihan hidup, atau perdebatan di grup keluarga bisa memanaskan malam. Aturan Seneca tetap sama: jangan menulis balasan saat dada masih panas. Simpan sebagai draf, baca lagi besok pagi.",
      [
        "info",
        "Para pendiri terapi kognitif modern menyebut gagasan Stoik sebagai salah satu inspirasi mereka. Albert Ellis, misalnya, sering mengutip Epiktetos: kita terganggu bukan oleh kejadian, tetapi oleh pandangan kita tentangnya.",
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
    title: "Empat Kebajikan sebagai Kompas",
    blocks: [
      'Lingkaran kendali menjawab pertanyaan "apa yang bisa kulakukan?". Tapi ada pertanyaan berikutnya yang sama penting: dari semua yang bisa kulakukan, mana yang **sebaiknya** kulakukan?',
      "Para Stoik menjawabnya dengan empat kebajikan. Bagi mereka, inilah satu-satunya hal yang benar-benar baik. Jabatan, uang, dan pujian bisa datang dan pergi; cara kita bertindak selalu milik kita.",
      ["img", "empat-kebajikan", "Empat kebajikan."],
      ["h", "Memakai kompasnya"],
      "Saat bingung harus bersikap bagaimana, ajukan empat pertanyaan singkat. Tidak semuanya relevan setiap saat, tapi biasanya satu atau dua langsung terasa paling tepat.",
      [
        "table",
        [
          ["Kebajikan", "Pertanyaannya"],
          [
            "Kebijaksanaan",
            "Apa yang sebenarnya terjadi, dan apa yang paling masuk akal dilakukan?",
          ],
          ["Keberanian", "Apa yang benar walau tidak nyaman?"],
          ["Keadilan", "Apa yang pantas bagi orang lain yang terlibat?"],
          ["Pengendalian diri", "Berapa ukuran yang pas, tidak berlebihan dan tidak kekurangan?"],
        ],
      ],
      "Contoh: atasan meminta kamu memoles angka laporan supaya terlihat lebih baik. Kebijaksanaan bertanya apa akibatnya bulan depan. Keberanian bertanya apakah kamu bisa menolak dengan sopan. Keadilan bertanya siapa yang dirugikan kalau angkanya dipoles. Jawabannya tidak selalu mudah, tapi arahnya jadi jelas.",
      [
        "reflect",
        [
          "Kebajikan mana yang paling mudah bagimu, dan mana yang paling sering kamu lewatkan?",
          "Ingat satu keputusan minggu lalu. Kebajikan mana yang ikut bicara, dan mana yang diam?",
        ],
      ],
    ],
  },
  {
    title: "Kehilangan, dan Hal-Hal yang Hanya Dipinjamkan",
    blocks: [
      "Bab ini berbeda dari yang lain. Tidak ada latihan cepat untuk dikerjakan di tengah macet. Bab ini tentang kehilangan: orang tua yang meninggal, pekerjaan yang hilang, hubungan yang berakhir.",
      "Seneca menulis beberapa surat penghiburan kepada orang yang berduka, termasuk kepada ibunya sendiri ketika dia diasingkan. Dia tidak pernah menyuruh mereka berhenti bersedih. Dia menulis bahwa kesedihan itu wajar, dan bahwa yang perlu dijaga adalah agar duka tidak tumbuh menjadi sesuatu yang lebih besar daripada dukanya sendiri.",
      ["quote", "Kehilangan tidak lain adalah perubahan.", "Marcus Aurelius, Renungan"],
      ["h", "Yang dipinjamkan, bukan dimiliki"],
      "Epiktetos menyarankan latihan yang terdengar keras tapi sebenarnya lembut: mengingat bahwa orang-orang dan hal-hal yang kita sayangi dipinjamkan kepada kita untuk sementara. Tujuannya bukan menjauh dari mereka, tapi menghargai mereka **sekarang**, selagi masih ada.",
      [
        "ul",
        [
          "Telepon orang tua bukan karena ada keperluan, tapi karena mereka masih bisa ditelepon.",
          "Makan malam bersama tanpa ponsel, karena makan malam seperti ini tidak akan selalu ada.",
          "Ucapkan terima kasih pada rekan kerja hari ini, bukan saat perpisahannya nanti.",
        ],
      ],
      [
        "warn",
        "Duka yang dalam dan berkepanjangan, misalnya sampai sulit menjalani hari selama berbulan-bulan, layak didampingi psikolog atau konselor. Filsafat bisa menemani, tapi tidak menggantikan pertolongan.",
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
