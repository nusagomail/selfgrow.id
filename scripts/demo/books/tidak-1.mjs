/**
 * "Berani Bilang Tidak" bab 1–4. Tiga tokoh ilustrasi: Sari (admin keuangan, Medan), Bayu (anak
 * sulung, Makassar), Rina (karyawan swasta, Yogyakarta). Struktur bab sengaja tidak seragam.
 */
import { MINGGU_SARI, POLA_IYA, UNDANGAN_COUNTER } from "./tidak-interactive.mjs";

export const TIDAK_1 = [
  {
    title: 'Kenapa "Iya" Keluar Duluan',
    blocks: [
      "**Jumat, 16.52.** Sari sudah memasukkan laptop ke tas ketika pesan itu masuk.",
      "**Bu Wati:** Sar, Sabtu bisa masuk ya? Laporan cabang belum beres.",
      "Sari menatap layar. Sabtu besok keponakannya ulang tahun yang ketujuh, dan dia sudah berjanji datang sejak sebulan lalu. Jempolnya bergerak lebih cepat dari pikirannya.",
      "**Sari:** Iya Bu, bisa 🙏",
      "Tiga detik kemudian, perutnya terasa berat.",
      ["h", "Tiga orang, satu kebiasaan"],
      'Sari berumur 32 tahun, bekerja di bagian keuangan sebuah perusahaan distribusi di Medan. Di kantor, dia dikenal sebagai "orang yang bisa diandalkan". Masalahnya, dia bisa diandalkan oleh semua orang kecuali dirinya sendiri.',
      "Di Makassar, **Bayu** (35) adalah anak sulung dari lima bersaudara. Setiap ada urusan keluarga, mulai dari biaya sekolah keponakan sampai renovasi rumah orang tua, teleponnya yang pertama berdering. Dia tidak pernah menolak. Tabungannya juga tidak pernah bertambah.",
      "Di Yogyakarta, **Rina** (28) punya teman sejak SMA yang sudah tiga kali meminjam uang. Totalnya Rp4,5 juta. Belum ada yang dikembalikan. Setiap kali temannya menghubungi, Rina berharap isinya bukan permintaan lagi, dan setiap kali, isinya permintaan lagi.",
      "Ketiganya bukan orang lemah. Mereka orang baik yang belum belajar satu keterampilan: **mengatakan tidak tanpa merasa jadi orang jahat**.",
      ["h", "Kamu tidak sendirian"],
      ["chart", UNDANGAN_COUNTER],
      [
        "fact",
        "Dalam serangkaian penelitian tentang menolak ajakan, peneliti menemukan bahwa orang yang diajak cenderung membayangkan akibat penolakan jauh lebih buruk daripada yang sebenarnya dirasakan oleh orang yang mengajak. Pengajak umumnya tidak semarah atau sekecewa yang kita takutkan.",
        "Givi & Kirk, Journal of Personality and Social Psychology, 2023",
      ],
      "Baca kalimat itu sekali lagi. Sebagian besar rasa takut kita saat menolak ternyata adalah **ramalan yang terlalu suram**. Orang yang meminta biasanya lebih cepat melupakan penolakan kita daripada kita sendiri.",
      ["h", 'Apa yang tersembunyi di balik "iya"'],
      'Kalau "iya" yang terpaksa itu gunung es, maka kalimatnya hanya puncak yang terlihat. Di bawah permukaan ada hal-hal yang jarang kita akui, bahkan pada diri sendiri.',
      ["img", "gunung-es", 'Yang terlihat hanya "iya".'],
      "Dalam budaya kita, ada satu kata yang mewakili hampir semuanya: **nggak enakan**. Rasa sungkan pada yang lebih tua, pada atasan, pada teman lama. Rasa sungkan ini punya sisi baik: ia menjaga sopan santun dan kerukunan. Tapi kalau dibiarkan mengambil alih semua keputusan, ia membuat kita menanggung beban yang bukan milik kita.",
      [
        "quote",
        "Yang tidak bisa berkata tidak, pada akhirnya akan berkata tidak kepada dirinya sendiri.",
      ],
      ["h", "Ukur dulu kebiasaanmu"],
      'Tes di bawah ini tidak memberi label "baik" atau "buruk". Ia hanya membantumu melihat seberapa sering "iya" keluar sebelum kamu sempat bertanya pada dirimu sendiri.',
      ["quiz", POLA_IYA],
      ["tip", "Skormu tersimpan. Di bab terakhir kamu akan mengisi tes ini lagi."],
      'Kembali ke Sari. Sabtu itu dia masuk kantor, menyelesaikan laporan jam dua siang, lalu tiba di pesta keponakannya tepat saat kue sudah dipotong. Keponakannya bertanya, "Tante kok telat?" Sari tersenyum dan bilang "Maaf ya, ada kerjaan."',
      "Di perjalanan pulang, dia berpikir: kenapa aku selalu begini?",
      "Buku ini adalah jawaban panjang untuk pertanyaan itu.",
    ],
  },
  {
    title: "Pasif, Agresif, Asertif",
    blocks: [
      'Ketika mendengar kata "menolak", banyak orang membayangkan hanya dua pilihan: mengalah, atau marah-marah. Karena tidak ingin marah-marah, mereka memilih mengalah. Terus-menerus.',
      "Padahal ada pilihan ketiga, dan pilihan inilah yang akan kita latih sepanjang buku.",
      ["img", "spektrum", "Bukan cuma dua pilihan."],
      ["h", "Tiga cara menjawab permintaan yang sama"],
      "Bayangkan rekan kerjamu meminta tolong menggantikan jaga stan pameran hari Minggu, padahal kamu sudah ada rencana dengan keluarga. Ini tiga cara menjawabnya:",
      [
        "table",
        [
          ["Gaya", "Kalimatnya", "Yang terjadi kemudian"],
          [
            "Pasif",
            '"Hmm... iya deh, nggak apa-apa."',
            "Kamu jaga stan sambil kesal. Keluargamu kecewa. Rekanmu tidak tahu apa-apa.",
          ],
          [
            "Agresif",
            '"Kamu tuh selalu lempar kerjaan ke aku!"',
            "Kamu tidak jaga stan, tapi hubungan dengan rekanmu retak.",
          ],
          [
            "Asertif",
            '"Minggu ini aku nggak bisa, sudah ada acara keluarga. Coba tanya Dodi, kemarin dia bilang lagi longgar."',
            "Kamu tidak jaga stan, rekanmu tahu harus ke mana, hubungan tetap baik.",
          ],
        ],
      ],
      "Perhatikan bahwa jawaban asertif bukan jawaban di tengah-tengah, seperti setengah mengalah setengah marah. Ia adalah jawaban yang **jujur sekaligus menghormati**. Jujur pada batasmu sendiri, dan menghormati orang yang meminta.",
      ["h", "Pasif bukan berarti baik hati"],
      'Ini bagian yang sulit diterima. Kita sering menganggap sikap pasif sebagai kebaikan: "Aku kan cuma mau membantu." Tapi coba lihat lebih dalam. Saat kamu mengiyakan dengan terpaksa, kamu sebenarnya sedang:',
      [
        "ul",
        [
          "**Tidak jujur** pada orang yang meminta, karena dia mengira kamu senang membantu.",
          "**Menumpuk kesal** yang suatu hari akan meledak di saat yang salah.",
          "**Mengajarkan** orang lain bahwa kebutuhanmu boleh diabaikan.",
        ],
      ],
      'Bayu merasakan yang ketiga dengan sangat jelas. Karena dia tidak pernah menolak, keluarganya berhenti bertanya "Kamu ada uang nggak?" dan mulai bilang "Nanti Bayu yang bayar, ya." Bukan karena mereka jahat. Mereka hanya belajar dari pola yang dia bentuk sendiri.',
      ["quote", "Orang memperlakukan kita sesuai dengan apa yang kita izinkan."],
      ["h", "Latihan peran"],
      "Bacalah percakapan di bawah ini dengan suara pelan, seolah kamu yang mengucapkannya. Rasakan bedanya di dada.",
      "**Adik Bayu:** Kak, uang semester Dika kurang dua juta. Kakak bisa, kan?",
      "**Bayu (pasif):** Eh... iya, nanti Kakak usahakan.",
      "**Bayu (asertif):** Bulan ini Kakak cuma bisa bantu lima ratus ribu, karena Kakak juga lagi nabung buat DP rumah. Sisanya kita cari bareng, ya. Mungkin bisa tanya ke kampus soal cicilan.",
      "Jawaban kedua tidak dingin. Bayu tetap peduli, tetap membantu. Bedanya, dia menyebut batasnya dengan jelas dan tidak menjanjikan sesuatu yang akan membuatnya sesak.",
      [
        "exercise",
        [
          "Ingat satu permintaan minggu ini yang kamu iyakan dengan terpaksa.",
          "Tulis jawaban pasif yang kamu berikan.",
          "Tulis ulang jawaban itu dalam versi asertif: sebutkan batasmu, tanpa menyalahkan orangnya.",
          "Baca keras-keras versi asertifnya tiga kali. Aneh di awal itu normal.",
        ],
        "Coba sekarang, lima menit saja:",
      ],
    ],
  },
  {
    title: 'Harga dari Setiap "Iya"',
    blocks: [
      'Setiap "iya" yang kamu ucapkan ada harganya. Kadang harganya kecil, misalnya lima menit membalas pertanyaan teman. Kadang harganya besar: akhir pekanmu, tabunganmu, waktu tidurmu, kesehatanmu. Masalahnya, harga itu jarang kita hitung, karena dibayar sedikit-sedikit dan tidak ada yang mengirim tagihan.',
      "Sari memutuskan untuk menghitungnya. Selama seminggu, dia mencatat setiap jam yang dia habiskan untuk permintaan orang lain di luar tugas utamanya.",
      ["chart", MINGGU_SARI],
      "Lima belas jam. Hampir dua hari kerja dalam seminggu habis untuk pekerjaan yang bukan miliknya. Pantas saja laporannya sendiri selalu dikerjakan malam hari.",
      ["h", "Mata uang yang tidak terlihat"],
      "Waktu hanyalah satu jenis harga. Ada tiga lagi yang jarang disadari:",
      [
        "ol",
        [
          "**Energi.** Mengerjakan sesuatu yang tidak kamu inginkan jauh lebih melelahkan daripada mengerjakan hal yang sama dengan sukarela.",
          '**Kepercayaan.** Kalau kamu mengiyakan semuanya, "iya"-mu kehilangan nilai. Orang tidak tahu mana yang tulus dan mana yang terpaksa.',
          "**Kehangatan.** Kesal yang dipendam perlahan mengubah rasa sayang menjadi rasa enggan. Rina mulai menghindari teman SMA-nya, bukan karena tidak sayang, tapi karena takut dimintai uang lagi.",
        ],
      ],
      [
        "fact",
        "Dalam penelitian tentang permintaan, orang yang meminta tolong cenderung meremehkan seberapa besar kemungkinan permintaannya dikabulkan. Salah satu alasannya: kita tidak menyadari betapa canggungnya orang lain untuk menolak, sehingga banyak yang setuju hanya untuk menghindari rasa tidak nyaman.",
        "Vanessa Bohns, Cornell University; ringkasan riset di Current Directions in Psychological Science, 2016",
      ],
      "Artinya, orang yang meminta tolong padamu sering tidak tahu bahwa kamu terpaksa. Dari sudut pandangnya, kamu terlihat senang membantu. Diam-diam berharap dia mengerti tidak akan pernah berhasil. Satu-satunya cara dia tahu adalah kalau kamu mengatakannya.",
      ["h", "Iya yang tulus itu berharga"],
      'Bab ini bukan ajakan untuk menolak segalanya. Membantu orang lain adalah salah satu hal paling bermakna dalam hidup. Justru karena itu, "iya" perlu dijaga nilainya.',
      'Bayangkan dua orang teman. Yang pertama selalu bilang iya untuk apa pun. Yang kedua kadang menolak, tapi saat dia bilang iya, dia hadir sepenuh hati. "Iya" dari teman mana yang lebih berarti bagimu?',
      [
        "quote",
        "Setiap kali kamu bilang iya pada sesuatu yang tidak penting, kamu sedang bilang tidak pada sesuatu yang penting.",
      ],
      [
        "reflect",
        [
          "Kalau kamu mencatat seperti Sari, kira-kira berapa jam seminggu yang habis untuk permintaan orang lain?",
          "Siapa orang yang paling sering kamu iyakan dengan terpaksa? Apa yang kamu takutkan kalau menolaknya?",
          'Hal penting apa yang selama ini kalah oleh "iya" yang tidak tulus?',
        ],
      ],
    ],
  },
  {
    title: "Anatomi Kalimat Menolak",
    blocks: [
      "Rina sudah tahu dia ingin menolak. Masalahnya, setiap kali mencoba, kalimat yang keluar malah seperti ini:",
      "**Rina:** Aduh, maaf banget ya, bukannya aku nggak mau bantu, tapi bulan ini aku lagi banyak pengeluaran, motor juga baru servis, terus ibu juga minta kiriman, jadi kayaknya... mungkin bulan depan ya? Tapi nggak janji sih. Maaf ya.",
      "Temannya hanya menangkap dua kata: **bulan depan**. Dan bulan depan, dia datang lagi.",
      ["h", "Semakin panjang alasannya, semakin lemah tolakannya"],
      'Alasan panjang terasa sopan, padahal ia punya dua masalah. Pertama, setiap alasan membuka celah untuk ditawar: "Motornya kan sudah selesai servis?" Kedua, alasan panjang memberi kesan kamu sendiri tidak yakin dengan keputusanmu.',
      [
        "fact",
        'Dalam serangkaian eksperimen tentang cara menolak, peserta yang memakai kalimat "aku tidak (melakukan itu)" lebih berhasil bertahan pada keputusannya dibanding yang berkata "aku tidak bisa". "Tidak bisa" terdengar seperti keadaan yang bisa berubah; "tidak" terdengar seperti prinsip.',
        "Patrick & Hagtvedt, Journal of Consumer Research, 2012",
      ],
      'Coba rasakan bedanya. "Aku nggak bisa minjemin uang bulan ini" mengundang pertanyaan, "Kalau bulan depan?" Sementara "Aku nggak minjemin uang ke teman" menutup percakapan dengan lembut, karena itu soal prinsipmu, bukan soal keadaan.',
      ["h", "Empat bagian kalimat yang kuat"],
      "Kalimat menolak yang baik tidak harus panjang. Ia cukup punya empat bagian, dan bagian terakhir boleh dilewati.",
      ["img", "anatomi-kalimat", "Anatomi kalimat menolak."],
      [
        "ol",
        [
          '**Hargai.** Akui bahwa orang itu sudah memikirkanmu. "Makasih sudah ngajak." "Terima kasih sudah percaya ke saya."',
          '**Tolak dengan jelas.** Pakai kata yang tidak bisa disalahartikan. Hindari "kayaknya", "mungkin", "lihat nanti ya".',
          "**Batasi.** Sebutkan cakupannya: kali ini, bulan ini, atau sebagai prinsip.",
          "**Tawarkan (kalau mau).** Waktu lain, bantuan yang lebih kecil, atau orang lain yang bisa membantu. Hanya kalau kamu memang mau, bukan sebagai penebus rasa bersalah.",
        ],
      ],
      ["h", "Coba rakit kalimatmu sendiri"],
      "Alat di bawah ini menyusun kalimat dengan empat bagian tadi, sesuai dengan siapa yang kamu hadapi dan gaya bicaramu. Anggap sebagai titik awal, lalu ubah dengan bahasamu sendiri.",
      [
        "tool",
        "perakit-kalimat-menolak",
        "Perakit kalimat menolak",
        "Pikirkan satu permintaan yang sedang menunggu jawabanmu.",
      ],
      "Setelah latihan, Rina mengirim pesan ini:",
      "**Rina:** Makasih sudah percaya cerita ke aku. Aku nggak minjemin uang ke teman, supaya pertemanan kita nggak jadi urusan utang. Tapi kalau kamu mau, aku bisa bantu cari info kerja sampingan.",
      'Temannya membalas satu jam kemudian: "Oke, ngerti kok. Info kerjaannya boleh." Tidak ada drama. Rina menatap layar cukup lama, heran sendiri: ternyata sesederhana itu?',
      [
        "tip",
        'Kalau belum siap menjawab, beli waktu: "Aku cek dulu ya, nanti sore kukabari." Jawaban yang dipikirkan hampir selalu lebih baik daripada jawaban spontan karena sungkan.',
      ],
      [
        "summary",
        [
          "Alasan panjang membuka celah untuk ditawar. Cukup satu alasan singkat, atau tanpa alasan sama sekali.",
          '"Aku tidak" terdengar seperti prinsip, "aku tidak bisa" terdengar seperti keadaan yang bisa berubah.',
          "Empat bagian: hargai, tolak dengan jelas, batasi, dan tawarkan kalau mau.",
        ],
      ],
    ],
  },
];
