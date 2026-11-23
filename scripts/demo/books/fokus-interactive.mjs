/**
 * Unsur interaktif "Fokus di Era Notifikasi" (D42, D50). Tokoh dan angka kasus adalah ilustrasi.
 */
const freq = (q) => ({
  q,
  options: [
    { label: "Jarang", points: 0 },
    { label: "Kadang", points: 1 },
    { label: "Sering", points: 2 },
    { label: "Hampir selalu", points: 3 },
  ],
});

/** Bab 1 dan Bab 8 (tes ulang, id sama). */
export const PERHATIAN_TERPECAH = {
  id: "perhatian-terpecah",
  mode: "scale",
  label: "Berkas pemeriksaan",
  title: "Seberapa terpecah perhatianmu saat bekerja?",
  intro: "Pikirkan seminggu kerja terakhir. Skor rendah berarti perhatianmu lebih utuh.",
  ends: ["Jarang", "Hampir selalu"],
  questions: [
    freq("Aku membuka chat atau surel di tengah pekerjaan yang belum selesai."),
    freq("Saat notifikasi berbunyi, aku melihatnya dalam satu menit."),
    freq("Aku membuka beberapa tugas sekaligus dan berpindah-pindah di antaranya."),
    freq("Ponsel ada di meja, layar menghadap ke atas, saat aku bekerja."),
    freq("Aku membaca ulang paragraf atau angka karena lupa sudah sampai mana."),
    freq("Di akhir hari aku sibuk sekali, tapi pekerjaan penting tidak bergerak."),
  ],
  results: [
    {
      min: 0,
      max: 5,
      title: "Perhatian yang cukup utuh",
      text: "Kamu sudah punya kebiasaan yang melindungi fokus. Buku ini membantumu menjaganya saat beban kerja naik.",
    },
    {
      min: 6,
      max: 11,
      title: "Sering terpotong",
      text: "Fokusmu bocor di beberapa titik. Mulai dari Bab 3: saring notifikasi, karena itu perubahan terkecil dengan hasil terbesar.",
    },
    {
      min: 12,
      max: 18,
      title: "Perhatian yang tercerai-berai",
      text: "Hampir setiap jam kerjamu terpotong. Ini bukan soal kurang disiplin; lingkunganmu memang dirancang untuk memotong. Baca Bab 2 dan 3 lebih dulu.",
    },
  ],
};

/** Bab 2: mitos multitasking (uji pengetahuan). */
export const MITOS_MULTITASKING = {
  id: "mitos-multitasking",
  mode: "knowledge",
  label: "Detektif fokus",
  title: "Empat anggapan tentang mengerjakan banyak hal sekaligus",
  questions: [
    {
      q: "Orang yang terbiasa multitasking media jadi lebih jago berpindah tugas.",
      options: [
        { label: "Benar", points: 0 },
        { label: "Keliru", points: 0, correct: true },
      ],
      explain:
        "Dalam penelitian Ophir, Nass & Wagner (2009), peserta yang paling sering multitasking media justru lebih lambat dalam tes berpindah tugas dan lebih mudah terganggu hal yang tidak relevan.",
    },
    {
      q: "Setelah pindah tugas, sebagian pikiran masih tertinggal di tugas sebelumnya.",
      options: [
        { label: "Benar", points: 0, correct: true },
        { label: "Keliru", points: 0 },
      ],
      explain:
        "Sophie Leroy (2009) menyebutnya residu perhatian. Makin belum tuntas tugas sebelumnya, makin besar sisa perhatian yang tertinggal di sana.",
    },
    {
      q: "Kalau tidak membuka notifikasinya, bunyi notifikasi tidak berpengaruh pada fokus.",
      options: [
        { label: "Benar", points: 0 },
        { label: "Keliru", points: 0, correct: true },
      ],
      explain:
        "Stothart dkk. (2015) menemukan peserta yang menerima notifikasi, tanpa membukanya, membuat lebih banyak kesalahan dalam tugas yang butuh perhatian.",
    },
    {
      q: "Mendengarkan musik sambil mencuci piring adalah multitasking yang sama beratnya dengan membalas chat sambil menulis laporan.",
      options: [
        { label: "Benar", points: 0 },
        { label: "Keliru", points: 0, correct: true },
      ],
      explain:
        "Kegiatan otomatis yang tidak butuh pikiran bisa berjalan bersama. Yang berat adalah dua tugas yang sama-sama butuh bahasa dan penalaran, seperti chat dan laporan.",
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Banyak mitos yang perlu dibongkar",
      text: "Wajar, budaya kerja sering memuji orang yang terlihat mengerjakan banyak hal sekaligus. Bab ini menjelaskan biayanya.",
    },
    {
      min: 2,
      max: 3,
      title: "Hampir terbongkar semua",
      text: "Kamu sudah curiga multitasking itu mahal. Sekarang lihat di mana biayanya paling terasa di harimu.",
    },
    {
      min: 4,
      max: 4,
      title: "Detektif fokus",
      text: "Kamu paham bahwa yang terjadi sebenarnya adalah berpindah-pindah, bukan mengerjakan bersamaan.",
    },
  ],
};

/** Bab 4: chat atasan di malam hari (skenario). */
export const CHAT_MALAM = {
  id: "chat-malam",
  mode: "scenario",
  label: "21.14, grup tim",
  title: 'Atasan menulis di grup: "Tolong cek data penjualan Q3 ya."',
  intro: "Tidak ada tenggat yang disebut. Kamu sedang makan malam dengan keluarga.",
  questions: [
    {
      q: "Apa yang kamu lakukan?",
      options: [
        {
          label: "Langsung buka laptop dan kerjakan malam itu juga.",
          points: 0,
          feedback:
            "Responsif itu baik, tapi kalau selalu begini, kamu mengajari tim bahwa jam 21.00 adalah jam kerja. Tanyakan dulu tenggatnya.",
        },
        {
          label: 'Balas singkat: "Siap, Pak. Untuk besok pagi cukup, atau perlu malam ini?"',
          points: 2,
          feedback:
            "Kamu menunjukkan perhatian sekaligus memperjelas tenggat. Sebagian besar permintaan malam ternyata cukup diselesaikan besok.",
        },
        {
          label: "Abaikan sampai besok pagi tanpa membalas.",
          points: 1,
          feedback:
            "Menjaga batas itu sehat, tapi tanpa balasan atasan bisa mengira pesannya tidak terbaca. Kalau budaya timmu belum jelas, satu balasan singkat mencegah salah paham.",
        },
        {
          label: "Bisukan grup kantor selamanya.",
          points: 0,
          feedback:
            "Terlalu jauh ke arah sebaliknya. Kesepakatan tim tentang jam respons jauh lebih tahan lama daripada menghilang diam-diam.",
        },
      ],
    },
  ],
  results: [
    { min: 0, max: 0, title: "Batasnya belum jelas", text: "Perjelas tenggat, jangan tebak." },
    { min: 1, max: 1, title: "Batas tanpa kabar", text: "Satu balasan singkat cukup." },
    { min: 2, max: 2, title: "Responsif dan jelas", text: "Tanya tenggat, lalu atur." },
  ],
};

/** Bab 1: survei APJII. */
export const APJII_COUNTER = {
  title: "Hampir semua orang kini selalu terhubung",
  kind: "counter",
  format: "percent",
  items: [{ label: "penduduk Indonesia terhubung internet", value: 79.5, color: "#9c5a1f" }],
  note: "Survei Penetrasi Internet Indonesia 2024, Asosiasi Penyelenggara Jasa Internet Indonesia (APJII).",
};
