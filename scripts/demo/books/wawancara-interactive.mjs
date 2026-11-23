/**
 * Unsur interaktif "Lolos Wawancara Kerja" (D42, D50). Tokoh: Yoga, 24, lulusan teknik industri
 * yang melamar posisi staf supply chain (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Sudah", points: 1 },
    { label: "Belum", points: 0 },
  ],
});

/** Bab 1 dan Bab 8 (tes ulang, id sama). */
export const SIAP_WAWANCARA = {
  id: "siap-wawancara",
  mode: "score",
  label: "Sebelum masuk ruangan",
  title: "Seberapa siap kamu untuk wawancara berikutnya?",
  intro: "Bayangkan ada panggilan wawancara untuk posisi yang kamu inginkan, tiga hari lagi.",
  questions: [
    yn('Aku punya jawaban "ceritakan tentang dirimu" yang selesai dalam sekitar satu menit.'),
    yn("Aku punya minimal tiga cerita pengalaman nyata yang lengkap dengan hasilnya."),
    yn("Aku tahu apa yang dikerjakan perusahaan itu dan siapa pelanggannya."),
    yn("Aku bisa menjelaskan kelemahanku dengan jujur tanpa merusak peluangku."),
    yn("Aku sudah berlatih menjawab dengan suara keras, bukan hanya di kepala."),
    yn("Aku punya dua atau tiga pertanyaan untuk pewawancara."),
    yn("Aku tahu kisaran gaji yang wajar untuk posisi ini."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih mengandalkan improvisasi",
      text: "Improvisasi di bawah tekanan jarang menghasilkan jawaban terbaikmu. Mulai dari Bab 2 dan Bab 3: satu jawaban pembuka dan tiga cerita.",
    },
    {
      min: 3,
      max: 5,
      title: "Fondasinya ada",
      text: "Kamu sudah menyiapkan sebagian. Lengkapi yang masih kosong, lalu berlatih dengan suara keras minimal dua kali.",
    },
    {
      min: 6,
      max: 7,
      title: "Siap masuk ruangan",
      text: "Persiapanmu matang. Sisanya adalah tetap menjadi dirimu sendiri dan mendengarkan pertanyaannya baik-baik.",
    },
  ],
};

/** Bab 4: pertanyaan kelemahan (skenario). */
export const KELEMAHAN = {
  id: "kelemahan",
  mode: "scenario",
  label: "Pertanyaan ke-6",
  title: '"Apa kelemahan terbesarmu?"',
  intro: "Pewawancara menunggu sambil memegang pulpen. Jawaban mana yang kamu pilih?",
  questions: [
    {
      q: "Pilih jawabanmu.",
      options: [
        {
          label: '"Saya perfeksionis, Pak. Terlalu teliti."',
          points: 0,
          feedback:
            "Jawaban ini sudah terlalu sering didengar dan terdengar seperti menghindar. Pewawancara jadi tidak tahu apa-apa tentang kamu.",
        },
        {
          label:
            '"Dulu saya sulit menolak permintaan, jadi pekerjaan utama sering tertunda. Sekarang saya menulis prioritas setiap pagi dan memberi tahu kapan saya bisa membantu."',
          points: 2,
          feedback:
            "Kelemahan nyata, dampaknya jelas, dan ada langkah konkret yang sudah dijalankan. Ini menunjukkan kamu mengenal dirimu dan mau berkembang.",
        },
        {
          label: '"Saya tidak punya kelemahan yang berarti."',
          points: 0,
          feedback:
            "Semua orang punya kelemahan. Jawaban ini membuatmu terdengar kurang sadar diri, atau tidak jujur.",
        },
        {
          label: '"Saya sering terlambat dan kurang teliti dalam angka."',
          points: 1,
          feedback:
            "Jujur, dan itu bagus. Tapi tanpa cerita perbaikan, dan untuk posisi yang mengurus angka, jawaban ini menimbulkan kekhawatiran. Pilih kelemahan yang tidak menjadi inti pekerjaan, lalu ceritakan perbaikannya.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 0,
      title: "Menghindar",
      text: "Pilih kelemahan nyata dan ceritakan perbaikannya.",
    },
    { min: 1, max: 1, title: "Jujur tapi belum utuh", text: "Tambahkan langkah perbaikannya." },
    { min: 2, max: 2, title: "Jujur dan bertumbuh", text: "Kelemahan, dampak, perbaikan." },
  ],
};

/** Bab 7: tanda lowongan palsu (uji pengetahuan). */
export const LOWONGAN_PALSU = {
  id: "lowongan-palsu",
  mode: "knowledge",
  label: "Asli atau palsu?",
  title: "Kamu menerima panggilan wawancara lewat WhatsApp…",
  intro: "Tandai mana yang wajar dan mana yang patut dicurigai.",
  questions: [
    {
      q: 'Kamu diminta transfer Rp750.000 untuk biaya tiket pesawat dan hotel tes, "nanti diganti".',
      options: [
        { label: "Wajar", points: 0 },
        { label: "Curigai", points: 0, correct: true },
      ],
      explain:
        "Perusahaan yang sah tidak meminta pelamar membayar biaya apa pun untuk proses rekrutmen. Ini pola penipuan yang paling umum.",
    },
    {
      q: "Undangan dikirim dari surel berdomain perusahaan, menyebut posisi yang kamu lamar dan nama pewawancara.",
      options: [
        { label: "Wajar", points: 0, correct: true },
        { label: "Curigai", points: 0 },
      ],
      explain:
        "Ciri undangan yang wajar. Tetap cocokkan dengan situs resmi atau akun resmi perusahaan bila ragu.",
    },
    {
      q: 'Kamu "lolos" padahal tidak pernah melamar ke perusahaan itu, dan diminta mengunduh aplikasi khusus.',
      options: [
        { label: "Wajar", points: 0 },
        { label: "Curigai", points: 0, correct: true },
      ],
      explain:
        "Panggilan dari lamaran yang tidak pernah kamu kirim, ditambah permintaan memasang aplikasi, adalah tanda bahaya. Aplikasi itu bisa mencuri data di ponselmu.",
    },
    {
      q: "Pewawancara meminta kamu mengerjakan studi kasus singkat dalam 45 menit saat wawancara.",
      options: [
        { label: "Wajar", points: 0, correct: true },
        { label: "Curigai", points: 0 },
      ],
      explain:
        'Studi kasus singkat adalah bagian umum dari wawancara. Yang patut dicurigai adalah "tugas uji coba" berhari-hari tanpa bayaran yang hasilnya dipakai untuk pekerjaan nyata.',
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Hati-hati",
      text: "Beberapa tanda bahaya belum kamu kenali. Ingat aturan utamanya: lamaran kerja yang sah tidak pernah meminta uang.",
    },
    {
      min: 3,
      max: 4,
      title: "Waspada dan tetap terbuka",
      text: "Kamu bisa membedakan proses rekrutmen yang wajar dari jebakan. Bagikan tanda-tanda ini ke teman yang sedang mencari kerja.",
    },
  ],
};

/** Bab 1: data pengangguran terbuka. */
export const TPT_COUNTER = {
  title: "Persaingan mencari kerja memang ketat",
  kind: "counter",
  format: "number",
  items: [
    {
      label: "juta orang menganggur terbuka (Agustus 2024, dibulatkan)",
      value: 7.5,
      color: "#b3261e",
    },
  ],
  note: "Badan Pusat Statistik, Keadaan Ketenagakerjaan Indonesia Agustus 2024 (7,47 juta orang; tingkat pengangguran terbuka 4,91%).",
};
