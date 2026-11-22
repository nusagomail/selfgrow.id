/**
 * Unsur interaktif "Dari Rebahan ke Lari 5K" (D42). Kuisnya adalah cek keamanan sebelum mulai,
 * bukan penilaian kebugaran: satu jawaban "ya" berarti konsultasi dulu dengan tenaga kesehatan.
 * Tokoh: Rio, 34, pekerja kantoran yang hampir tidak pernah berolahraga (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Tidak", points: 0 },
    { label: "Ya", points: 1 },
  ],
});

export const CEK_AMAN = {
  id: "cek-aman-lari",
  mode: "score",
  label: "Sebelum mulai",
  title: "Cek keamanan sebelum mulai",
  intro: "Jawab jujur. Ini bukan tes kebugaran, tapi tanda kapan perlu bertanya ke dokter dulu.",
  questions: [
    yn("Dokter pernah mengatakan kamu punya masalah jantung atau tekanan darah tinggi."),
    yn("Kamu pernah merasa nyeri dada saat beraktivitas atau saat istirahat."),
    yn("Kamu pernah pusing hebat sampai hampir pingsan dalam setahun terakhir."),
    yn("Kamu punya masalah sendi, tulang, atau cedera yang bisa memburuk karena berlari."),
    yn("Kamu sedang hamil atau baru melahirkan."),
    yn("Kamu sedang minum obat rutin untuk penyakit kronis."),
  ],
  results: [
    {
      min: 0,
      max: 0,
      title: "Aman untuk mulai pelan-pelan",
      text: "Mulailah dari Minggu 1. Hentikan latihan dan periksakan diri kalau muncul nyeri dada, sesak berat, atau pusing.",
    },
    {
      min: 1,
      max: 6,
      title: "Konsultasi dulu",
      text: "Bicarakan rencana latihanmu dengan dokter sebelum mulai. Banyak orang dengan kondisi ini tetap bisa berlari, dengan penyesuaian yang tepat.",
    },
  ],
};

/** Bab 2: tes bicara (D50, uji pengetahuan). */
export const ZONA_BICARA = {
  id: "zona-bicara",
  mode: "knowledge",
  label: "Tes bicara",
  title: "Zona mana yang pas untuk pemula?",
  questions: [
    {
      q: "Saat berlari, kamu masih bisa mengucapkan kalimat lengkap walau napas terasa berat.",
      options: [
        { label: "Pas, pertahankan", points: 0, correct: true },
        { label: "Terlalu pelan, percepat", points: 0 },
        { label: "Terlalu cepat, pelankan", points: 0 },
      ],
      explain:
        'Ini zona yang dituju. Terasa "terlalu lambat" justru tanda kamu melakukannya dengan benar.',
    },
    {
      q: "Kamu hanya bisa mengucapkan satu-dua kata di antara tarikan napas.",
      options: [
        { label: "Pas, pertahankan", points: 0 },
        { label: "Terlalu pelan, percepat", points: 0 },
        { label: "Terlalu cepat, pelankan", points: 0, correct: true },
      ],
      explain:
        "Pelankan sampai kalimat lengkap bisa keluar lagi. Kecepatan datang belakangan, setelah kebiasaan.",
    },
    {
      q: "Kamu bisa bernyanyi dengan lancar sambil berlari.",
      options: [
        { label: "Pas, pertahankan", points: 0 },
        { label: "Terlalu pelan, percepat", points: 0, correct: true },
        { label: "Terlalu cepat, pelankan", points: 0 },
      ],
      explain:
        "Kalau masih bisa bernyanyi, tubuhmu belum cukup tertantang. Naikkan sedikit tempomu.",
    },
  ],
  results: [
    {
      min: 0,
      max: 1,
      title: "Masih menebak kecepatan",
      text: "Lihat lagi gambar tiga zona. Satu alat ukur sudah cukup: kalimat lengkap.",
    },
    {
      min: 2,
      max: 3,
      title: "Kamu tahu zonamu",
      text: "Bawa tes ini ke setiap sesi. Tidak perlu jam pintar dulu.",
    },
  ],
};
