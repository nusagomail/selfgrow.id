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
