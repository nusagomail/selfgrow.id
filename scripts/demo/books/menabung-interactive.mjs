/**
 * Unsur interaktif "Seni Menabung Tanpa Tersiksa" (D42, D50). Angka contoh adalah ilustrasi.
 */
const freq = (q) => ({
  q,
  options: [
    { label: "Tidak pernah", points: 0 },
    { label: "Kadang", points: 1 },
    { label: "Sering", points: 2 },
  ],
});

/** Bab 1 dan Bab 8 (tes ulang, id sama): seberapa otomatis cara menabungmu. */
export const GAYA_MENABUNG = {
  id: "gaya-menabung",
  mode: "scale",
  label: "Cek pipa",
  title: "Tabunganmu mengalir sendiri, atau harus dipompa?",
  intro:
    "Pikirkan tiga bulan terakhir. Skor tinggi berarti tabunganmu lebih banyak bergantung pada sistem daripada kemauan.",
  ends: ["Tidak pernah", "Sering"],
  questions: [
    freq(
      "Uang untuk tabungan pindah ke rekening lain di hari gajian, sebelum aku belanja apa pun.",
    ),
    freq("Pindahnya otomatis, tanpa aku harus ingat atau membuka aplikasi."),
    freq('Setiap tabunganku punya nama tujuan yang jelas, bukan sekadar "tabungan".'),
    freq("Rekening tabungan tidak terhubung dengan kartu yang kupakai sehari-hari."),
    freq("Saat ada uang kaget (THR, bonus, cashback besar), sebagian langsung kusisihkan."),
    freq("Saat penghasilanku naik, setoran tabunganku ikut naik."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Masih dipompa dengan tangan",
      text: "Tabunganmu bergantung pada sisa dan semangat di akhir bulan. Itu bukan kesalahanmu; caranya yang melelahkan. Mulai dari Bab 2: satu transfer otomatis di hari gajian.",
    },
    {
      min: 5,
      max: 8,
      title: "Pipanya sudah ada, tapi masih bocor",
      text: "Sebagian sudah berjalan sendiri. Cari satu bagian yang masih manual, lalu otomatiskan minggu ini. Bab 3 dan Bab 6 paling membantu.",
    },
    {
      min: 9,
      max: 12,
      title: "Mengalir tanpa dipikirkan",
      text: "Sistemmu sudah bekerja. Tugasmu tinggal merawatnya: naikkan setoran pelan-pelan (Bab 5) dan siapkan aturan saat tabungan harus dipakai (Bab 7).",
    },
  ],
};

/** Bab 5: riset Save More Tomorrow. */
export const SMART_BARS = {
  title: "Tingkat tabungan peserta Save More Tomorrow",
  kind: "bars",
  format: "percent",
  items: [
    { label: "Sebelum ikut program", value: 3.5, color: "#9aa8b0" },
    { label: "Setelah sekitar 40 bulan", value: 13.6, color: "#0e7c86" },
  ],
  note: "Thaler & Benartzi (2004), Journal of Political Economy. Peserta setuju setoran pensiunnya naik otomatis setiap kenaikan gaji.",
};

/** Bab 6: uang kaget (D50, skenario). */
export const UANG_KAGET = {
  id: "uang-kaget",
  mode: "scenario",
  label: "THR masuk",
  title: "Notifikasi: THR Rp5.200.000 masuk ke rekeningmu.",
  intro: "Lebaran masih dua minggu lagi. Apa yang kamu lakukan pertama kali?",
  questions: [
    {
      q: "Pilih langkah pertamamu.",
      options: [
        {
          label: "Biarkan dulu di rekening utama, nanti dipikirkan setelah Lebaran.",
          points: 0,
          feedback:
            'Uang yang "dibiarkan dulu" di rekening harian biasanya habis lebih dulu. Bukan karena boros, tapi karena terlihat dan mudah dijangkau.',
        },
        {
          label:
            "Hari itu juga pindahkan sebagian ke tujuan yang sudah bernama, sisanya untuk Lebaran.",
          points: 2,
          feedback:
            "Ini aturan uang kaget: putuskan pembagiannya sekali, di hari uangnya datang, sebelum ada godaan. Sisanya boleh dinikmati tanpa rasa bersalah.",
        },
        {
          label: "Simpan semuanya, Lebaran pakai uang seadanya saja.",
          points: 1,
          feedback:
            "Niatnya kuat, tapi aturan yang terlalu keras jarang bertahan. Kalau Lebaran terasa menyiksa, tahun depan kamu cenderung membalas dengan belanja. Sisakan bagian untuk dinikmati.",
        },
        {
          label: "Langsung belanja kebutuhan Lebaran, sisanya baru ditabung.",
          points: 0,
          feedback:
            '"Sisanya" hampir selalu lebih kecil dari rencana. Balik urutannya: tabungan dulu, belanja dari yang tersisa.',
        },
      ],
    },
  ],
  results: [
    { min: 0, max: 0, title: "Urutannya perlu dibalik", text: "Tabung dulu, nikmati sisanya." },
    {
      min: 1,
      max: 1,
      title: "Terlalu keras pada diri sendiri",
      text: "Beri ruang untuk menikmati.",
    },
    {
      min: 2,
      max: 2,
      title: "Aturan uang kaget",
      text: "Putuskan sekali, di hari uangnya datang.",
    },
  ],
};

/** Bab 7: tabungan boleh dipakai atau tidak (D50, uji pengetahuan). */
export const BOLEH_DIPAKAI = {
  id: "boleh-dipakai",
  mode: "knowledge",
  label: "Pakai atau tahan?",
  title: "Tabungan laptop sudah Rp4 juta dari target Rp7 juta. Boleh diambil untuk…",
  intro:
    "Ingat aturannya: tabungan bertujuan dipakai untuk tujuannya, dana darurat untuk yang darurat.",
  questions: [
    {
      q: "Laptop lama mati total, padahal kamu kerja lepas dari laptop itu.",
      options: [
        { label: "Boleh", points: 0, correct: true },
        { label: "Tahan dulu", points: 0 },
      ],
      explain:
        "Ini memang tujuan tabungannya, hanya datang lebih cepat. Pakai, beli yang sesuai dana yang ada, lalu lanjutkan setoran untuk tujuan berikutnya.",
    },
    {
      q: "Diskon ponsel baru 30%, hanya sampai tengah malam.",
      options: [
        { label: "Boleh", points: 0 },
        { label: "Tahan dulu", points: 0, correct: true },
      ],
      explain:
        'Diskon yang membuatmu memakai uang untuk tujuan lain tetap bukan penghematan. Batas waktu "hanya hari ini" justru dirancang agar kamu tidak sempat berpikir.',
    },
    {
      q: "Ibumu harus dirawat dan dana daruratmu belum cukup.",
      options: [
        { label: "Boleh", points: 0, correct: true },
        { label: "Tahan dulu", points: 0 },
      ],
      explain:
        "Keadaan darurat mengalahkan tujuan lain. Memakai tabungan jauh lebih baik daripada berutang dengan bunga tinggi. Catat jumlahnya, dan isi lagi setelah keadaan tenang.",
    },
    {
      q: "Teman kantor mengajak liburan dadakan akhir pekan ini.",
      options: [
        { label: "Boleh", points: 0 },
        { label: "Tahan dulu", points: 0, correct: true },
      ],
      explain:
        'Liburan itu baik, tapi pantas punya tabungannya sendiri. Kalau sering terjadi, buat tujuan baru bernama "Jalan-jalan" dan isi sedikit setiap bulan.',
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Batasnya masih kabur",
      text: 'Tulis satu kalimat aturan untuk tiap tujuan, misalnya "Tabungan laptop hanya untuk alat kerja". Kalimat yang ditulis lebih mudah ditaati.',
    },
    {
      min: 3,
      max: 4,
      title: "Kamu tahu kapan harus menahan",
      text: "Batas antara tujuan, darurat, dan keinginan sesaat sudah jelas bagimu. Itu yang membuat tabungan bertahan.",
    },
  ],
};
