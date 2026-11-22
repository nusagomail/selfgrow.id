/**
 * Unsur interaktif "Mengasuh Tanpa Teriak" (D42). Kuisnya memetakan pemicu orang tua, bukan
 * menilai anak. Tokoh: Bu Laras dengan Dimas (6) dan Kirana (3), ilustrasi.
 */
const often = (q) => ({
  q,
  options: [
    { label: "Jarang", points: 0 },
    { label: "Kadang", points: 1 },
    { label: "Sering", points: 2 },
  ],
});

export const PEMICU_TERIAK = {
  id: "pemicu-teriak",
  mode: "scale",
  label: "Peta jam rawan",
  title: "Kapan suaraku paling mudah naik?",
  intro: "Pikirkan dua minggu terakhir. Tidak ada jawaban yang salah; ini peta, bukan rapor.",
  questions: [
    often("Saat pagi terburu-buru sebelum berangkat sekolah atau kerja."),
    often("Saat aku lapar atau kurang tidur."),
    often("Saat anak tidak mendengar setelah diminta berkali-kali."),
    often("Saat kakak dan adik bertengkar."),
    often("Saat aku sedang memikirkan urusan kerja atau uang."),
    often("Saat anak menangis atau tantrum di tempat umum."),
  ],
  results: [
    {
      min: 0,
      max: 4,
      title: "Termometer yang cukup stabil",
      text: "Kamu jarang sampai ke titik meledak. Bab 4 membantumu punya kalimat yang tetap tenang di saat sulit.",
    },
    {
      min: 5,
      max: 8,
      title: "Ada jam-jam rawan",
      text: "Pemicunya bisa ditebak. Lingkari dua yang paling sering, lalu pakai Bab 2 dan Bab 5 untuk mencegahnya.",
    },
    {
      min: 9,
      max: 12,
      title: "Termometer sering di zona merah",
      text: "Ini tanda kamu sedang menanggung banyak hal, bukan tanda kamu orang tua yang buruk. Mulai dari merawat dirimu (Bab 2) dan latihan jeda (Bab 3).",
    },
  ],
};

/** Bab 4: memilih kalimat setelah jeda (D50, skenario). */
export const LEGO_DILEMPAR = {
  id: "lego-dilempar",
  mode: "scenario",
  label: "Pukul 18.30",
  title: "Adik melempar balok ke kakaknya karena menaranya dirobohkan.",
  intro: "Kamu sudah sempat menarik napas. Sekarang, kalimat apa yang keluar?",
  questions: [
    {
      q: "Pilih kalimatmu.",
      options: [
        {
          label: '"Berhenti! Nggak boleh lempar-lempar! Masuk kamar!"',
          points: 0,
          feedback:
            "Batasnya ada, tapi perasaannya dilewati. Anak yang merasa tidak dipahami biasanya makin keras melawan.",
        },
        {
          label:
            '"Kamu kesal karena menaramu dirobohkan. Melempar tidak boleh, bisa melukai. Mau pukul bantal ini, atau cerita ke Ibu?"',
          points: 2,
          feedback:
            "Namai, batasi, beri dua pilihan. Perasaannya diakui, perilakunya dibatasi, dan anak tetap punya sedikit kendali.",
        },
        {
          label: '"Sudah, sudah, nanti Ibu belikan mainan baru, ya."',
          points: 0,
          feedback:
            "Membujuk menghentikan tangis sesaat, tapi anak belajar bahwa melempar membawa hadiah. Batasnya tidak pernah dipasang.",
        },
        {
          label: "Turun setinggi matanya, diam sebentar di dekatnya, lalu bicara pelan.",
          points: 2,
          feedback:
            "Badan yang turun dan diam yang tenang sudah setengah dari kalimatnya. Lanjutkan dengan menamai perasaannya.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Kalimat lama masih keluar lebih dulu",
      text: "Wajar, kalimat itu sudah kita dengar sejak kecil. Tempel tiga bagian kalimat batas di kulkas sampai hafal.",
    },
    {
      min: 2,
      max: 2,
      title: "Tenang dan tegas",
      text: "Kamu memilih jalan ketiga. Kalau anak masih menangis, tugasmu bukan menghentikannya, tapi tetap tenang di dekatnya.",
    },
  ],
};
