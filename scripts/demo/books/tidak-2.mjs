/**
 * "Berani Bilang Tidak" bab 5–7. Tokoh ilustrasi; sebagian bab dibuka dengan pertanyaan atau
 * percakapan, bukan narasi, supaya irama tiap bab berbeda.
 */
import { POLA_IYA } from "./tidak-interactive.mjs";

export const TIDAK_2 = [
  {
    title: "Menolak Atasan Tanpa Kehilangan Muka",
    blocks: [
      'Pertanyaan pertama yang hampir selalu muncul: "Tapi ini atasan. Masa ditolak?"',
      "Pertanyaan yang wajar. Atasan memegang penilaian kinerja, kenaikan gaji, bahkan masa depan kariermu. Menolaknya terasa seperti berjalan di atas es tipis. Tapi coba lihat dari sisi atasan: yang paling dia butuhkan bukan karyawan yang mengiyakan segalanya, melainkan karyawan yang **pekerjaannya beres** dan **bisa diandalkan kata-katanya**.",
      "Karyawan yang mengiyakan semua tugas lalu mengerjakannya setengah-setengah justru lebih merepotkan daripada karyawan yang jujur soal kapasitasnya.",
      ["h", 'Ubah "tidak" menjadi pilihan'],
      "Dengan atasan, cara paling aman bukan menolak mentah-mentah, melainkan **mengembalikan keputusan prioritas kepadanya**. Kalimat andalannya:",
      ["quote", '"Kalau saya ambil ini, mana yang boleh saya tunda?"'],
      "Kalimat ini tidak terdengar seperti penolakan. Ia terdengar seperti orang yang serius mengelola pekerjaannya. Dan sering kali, atasan baru sadar bahwa bebanmu sudah penuh.",
      ["img", "chat-sari", "Pesan yang sama, dua jawaban."],
      "Sari mencoba cara ini di bulan berikutnya. Ketika Bu Wati kembali meminta lembur Sabtu, dia tidak mengarang alasan. Dia menolak dengan jelas dan menawarkan solusi yang konkret: Senin pagi, laporan di meja jam sebelas. Bu Wati menerimanya tanpa banyak tanya.",
      "Yang mengejutkan Sari bukan jawaban atasannya, tapi perasaannya sendiri. Dia tidak merasa bersalah. Dia merasa seperti orang dewasa yang mengurus pekerjaannya.",
      ["h", "Tiga situasi kantor yang paling sering"],
      [
        "table",
        [
          ["Situasi", "Kalimat yang bisa dicoba"],
          [
            "Tugas tambahan saat beban penuh",
            '"Saya bisa ambil ini. Supaya kualitasnya terjaga, laporan X saya geser ke Kamis, tidak apa-apa, Pak?"',
          ],
          [
            "Diminta lembur mendadak",
            '"Hari ini saya tidak bisa lembur. Besok pagi ini prioritas pertama saya."',
          ],
          [
            "Rekan melempar pekerjaannya",
            '"Itu di luar bagianku. Aku bisa tunjukkan caranya sekali, setelah itu kamu yang pegang, ya."',
          ],
        ],
      ],
      [
        "warn",
        "Ada pekerjaan yang memang tidak bisa ditolak: tugas utama sesuai kontrak, keadaan darurat, atau perintah yang wajar. Asertif bukan berarti menolak kewajiban. Untuk hal-hal itu, yang bisa kamu bicarakan adalah tenggat waktu dan sumber dayanya.",
      ],
      [
        "exercise",
        [
          "Tulis daftar semua tugas yang kamu pegang minggu ini, urutkan dari yang paling penting.",
          'Saat permintaan baru datang, tunjukkan daftar itu dan tanyakan: "Ini masuk urutan ke berapa?"',
          "Catat reaksi atasanmu. Biasanya jauh lebih tenang dari yang kamu bayangkan.",
        ],
        "Untuk minggu ini:",
      ],
    ],
  },
  {
    title: "Keluarga, Teman, dan Rasa Sungkan",
    blocks: [
      "Menolak atasan itu sulit. Menolak keluarga dan sahabat sering terasa lebih sulit lagi, karena yang dipertaruhkan bukan karier, melainkan rasa sayang.",
      'Dalam budaya kita yang erat dengan keluarga besar, ada banyak "aturan tak tertulis": anak sulung harus menanggung adik-adiknya, yang sudah bekerja harus membantu yang belum, yang tinggal di kota harus menampung saudara dari kampung. Aturan-aturan ini lahir dari niat baik. Tapi tanpa batas, niat baik bisa berubah menjadi beban yang tidak ada habisnya.',
      [
        "quote",
        "Kamu bisa menyayangi seseorang dan tetap tidak memenuhi permintaannya. Keduanya bisa benar sekaligus.",
      ],
      ["h", "Pakai bagan ini sebelum menjawab"],
      "Saat permintaan datang dari orang yang dekat, perasaan sering mengambil alih sebelum pikiran sempat bekerja. Bagan di bawah membantumu berhenti sejenak dan bertanya dengan jujur.",
      ["img", "bagan-keputusan", "Haruskah aku bilang iya?"],
      "Pertanyaan pertama adalah yang paling penting: **kalau tidak ada yang akan kecewa, apakah aku mau melakukannya?** Pertanyaan ini memisahkan keinginan tulus dari rasa takut mengecewakan.",
      ["h", "Bayu dan rapat keluarga"],
      'Bayu memutuskan untuk berhenti menjadi "ATM keluarga" tanpa berhenti menjadi kakak yang peduli. Dia tidak menyampaikannya lewat grup WhatsApp keluarga, tempat pesan mudah disalahpahami. Dia menelepon adik-adiknya satu per satu, lalu mengajak bicara langsung saat pulang Lebaran.',
      "**Bayu:** Kakak sayang kalian, dan Kakak tetap mau bantu. Tapi Kakak juga sedang menabung untuk rumah. Mulai bulan ini, Kakak sisihkan satu juta setiap bulan untuk keperluan keluarga. Kalau sudah habis, kita cari jalan lain sama-sama.",
      'Hening sebentar. Lalu adik bungsunya bilang, "Kak, maaf ya selama ini. Kami nggak tahu Kakak lagi nabung."',
      "Tidak semua percakapan akan semulus ini. Ada keluarga yang tersinggung, ada teman yang menjauh. Tapi Bayu menemukan bahwa batas yang disampaikan dengan sayang jauh lebih sering diterima daripada yang dia takutkan.",
      ["h", "Soal meminjamkan uang"],
      "Uang adalah permintaan yang paling sulit ditolak dan paling sering merusak hubungan. Beberapa pegangan yang bisa membantu:",
      [
        "ul",
        [
          '**Punya prinsip yang sama untuk semua orang.** "Aku nggak minjemin uang ke teman" lebih mudah diterima daripada keputusan yang berubah-ubah per orang.',
          "**Kalau ingin membantu, beri saja**, sejumlah yang rela tidak kembali. Lebih ringan bagi hatimu dan bagi pertemanannya.",
          "**Bantuan tidak harus uang.** Info pekerjaan, koneksi, atau sekadar menemani mencari solusi sering lebih berarti.",
        ],
      ],
      [
        "reflect",
        [
          "Aturan tak tertulis apa yang berlaku di keluargamu? Mana yang masih kamu setujui, mana yang sudah terasa berat?",
          "Kalau kamu menyampaikan batasmu dengan sayang, siapa satu orang yang paling ingin kamu ajak bicara lebih dulu?",
        ],
      ],
    ],
  },
  {
    title: "Setelah Kamu Bilang Tidak",
    blocks: [
      "Kamu sudah mengucapkannya. Kalimatnya jelas, nadanya ramah. Lalu muncul tiga kemungkinan reaksi, dan kamu perlu siap untuk ketiganya.",
      ["h", "1. Mereka menerima"],
      "Ini yang paling sering terjadi, dan yang paling jarang kita bayangkan. Penelitian tentang menolak ajakan yang kita bahas di Bab 1 menunjukkan bahwa orang yang meminta biasanya jauh lebih santai menanggapi penolakan daripada yang kita kira. Kalau ini terjadi, ucapkan terima kasih dan lanjutkan hidupmu. Tidak perlu minta maaf lagi.",
      ["h", "2. Mereka menawar"],
      '"Sebentar aja kok." "Masa sih nggak bisa?" "Sekali ini aja, please." Di sinilah banyak orang goyah. Teknik paling sederhana untuk momen ini disebut **piringan rusak**: ulangi inti kalimatmu dengan tenang, tanpa menambah alasan baru.',
      "**Teman:** Ayolah, sekali ini aja.",
      "**Kamu:** Aku paham, tapi jawabanku tetap sama.",
      "**Teman:** Kamu kok gitu sih sekarang?",
      "**Kamu:** Aku tetap temanmu. Untuk yang ini, jawabanku tetap tidak.",
      "Biasanya, setelah dua atau tiga kali, percakapan beralih sendiri. Kuncinya ada pada nada: tenang, tidak membela diri, tidak menyerang.",
      ["h", "3. Mereka kecewa atau marah"],
      'Kadang orang benar-benar kecewa. Itu boleh. Kekecewaan mereka adalah perasaan mereka, bukan tanda bahwa keputusanmu salah. Kamu bisa berempati tanpa menarik kembali keputusanmu: "Aku ngerti kamu kecewa. Maaf aku nggak bisa bantu kali ini."',
      "Kalau seseorang terus-menerus marah setiap kali kamu menyebut batasmu, itu informasi penting tentang hubungan tersebut, dan mungkin perlu dibicarakan lebih serius.",
      [
        "warn",
        "Jika penolakan dibalas dengan ancaman, intimidasi, atau kekerasan dalam bentuk apa pun, itu bukan lagi soal komunikasi. Utamakan keselamatanmu dan cari bantuan dari orang yang kamu percaya atau layanan pengaduan resmi.",
      ],
      ["h", "Rasa bersalah akan datang. Biarkan lewat."],
      "Di minggu-minggu pertama, rasa bersalah hampir pasti muncul setelah menolak, bahkan ketika penolakanmu sangat wajar. Itu bukan tanda kamu salah. Itu tanda kamu sedang melakukan sesuatu yang baru.",
      "Sari punya cara sederhana: setiap kali rasa bersalah datang, dia membaca ulang kartu kecil yang dia simpan di dompet. Tulisannya: Menolak permintaan bukan menolak orangnya.",
      ["img", "kartu-kalimat", "Kartu kalimat, simpan di saku."],
      ["h", "Tes ulang"],
      "Sudah sampai di bab terakhir. Coba isi lagi tes dari Bab 1, dan lihat apakah polanya mulai berubah.",
      ["quiz", POLA_IYA],
      ["h", "Tiga bulan kemudian"],
      'Sari tidak lagi lembur setiap Sabtu. Dia masih membantu rekan-rekannya, tapi sekarang dia memilih kapan. Bu Wati malah mempercayakan proyek baru kepadanya, karena "Sari kalau bilang selesai Senin, pasti selesai Senin."',
      "Bayu berhasil menabung untuk uang muka rumah. Adik-adiknya mulai mencari jalan sendiri dulu sebelum menelepon kakaknya.",
      "Rina dan teman SMA-nya masih berteman. Utangnya belum lunas, tapi tidak bertambah, dan untuk pertama kalinya dalam dua tahun, Rina tidak menghindar saat temannya menelepon.",
      [
        "quote",
        '"Tidak" yang jujur adalah salah satu bentuk hormat. Pada orang lain, dan pada dirimu sendiri.',
      ],
      [
        "summary",
        [
          "Tiga kemungkinan reaksi: menerima (paling sering), menawar (ulangi dengan tenang), atau kecewa (berempati tanpa menarik kembali keputusan).",
          "Rasa bersalah di awal adalah tanda kamu sedang belajar, bukan tanda kamu salah.",
          "Menolak permintaan bukan menolak orangnya.",
        ],
      ],
    ],
  },
];
