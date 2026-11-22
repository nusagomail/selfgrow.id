/**
 * Unsur interaktif "Berani Nego Gaji" (D42). Tokoh: Raka, 27 tahun, analis pemasaran yang
 * mendapat tawaran Rp8 juta untuk pekerjaan barunya (ilustrasi). Selisih Rp1 juta per bulan
 * dipakai di grafik, tool, dan video (≈ Rp76 juta dalam lima tahun).
 */
const yes = (q) => ({
  q,
  options: [
    { label: "Sudah", points: 1 },
    { label: "Belum", points: 0 },
  ],
});

export const SIAP_NEGO = {
  id: "siap-nego",
  mode: "score",
  label: "Cek kesiapan",
  title: "Seberapa siap kamu bernegosiasi?",
  intro: "Jawab untuk tawaran kerja atau kenaikan gaji yang sedang kamu hadapi.",
  questions: [
    yes("Aku tahu rentang gaji pasar untuk peran dan pengalamanku dari minimal tiga sumber."),
    yes("Aku sudah menentukan angka target dan angka terendah yang masih kuterima."),
    yes("Aku punya tiga bukti hasil kerja yang bisa diukur (angka, proyek, penghargaan)."),
    yes('Aku sudah menyiapkan kalimat untuk menjawab "Berapa gaji yang kamu harapkan?"'),
    yes("Aku tahu benefit lain yang bisa dinegosiasikan selain gaji pokok."),
    yes("Aku sudah berlatih mengucapkan angkaku dengan suara keras, minimal sekali."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih menebak",
      text: "Tidak apa-apa, sebagian besar orang masuk ruang negosiasi dalam kondisi ini. Mulailah dari Bab 2: riset angka.",
    },
    {
      min: 3,
      max: 4,
      title: "Setengah siap",
      text: "Fondasinya ada. Lengkapi bukti hasil kerja (Bab 3) dan latih kalimatmu (Bab 4).",
    },
    {
      min: 5,
      max: 6,
      title: "Siap masuk ruangan",
      text: "Persiapanmu matang. Bab 5 membantumu menghadapi jawaban HR yang tidak terduga.",
    },
  ],
};

export const SELISIH_BARS = {
  title: "Selisih Rp1 juta per bulan, lima tahun kemudian",
  kind: "bars",
  format: "rupiah",
  items: [
    { label: "Tahun 1", value: 13000000, color: "#c8a24a" },
    { label: "Tahun 2", value: 14040000, color: "#b8913a" },
    { label: "Tahun 3", value: 15163200, color: "#a8802c" },
    { label: "Tahun 4", value: 16376256, color: "#97701f" },
    { label: "Tahun 5", value: 17686356, color: "#856014" },
  ],
  note: "Ilustrasi: 13 kali gaji setahun (termasuk THR), kenaikan 8% per tahun. Total sekitar Rp76 juta.",
};

/** Bab 5: membalas jawaban HR (D50, skenario). */
export const BALAS_HR = {
  id: "balas-hr",
  mode: "scenario",
  label: "Kalau kamu Raka",
  title: "HR menjawab. Apa balasanmu?",
  intro: "Dua situasi yang hampir pasti terjadi. Pilih balasan yang paling mendekati gayamu.",
  questions: [
    {
      q: "Tawaran tertulis datang: Rp9 juta, di bawah rentang yang kamu sebut (Rp10–11 juta).",
      options: [
        {
          label: '"Baik, saya terima."',
          points: 0,
          feedback:
            "Tawaran balik berarti perusahaan sudah memilihmu. Menerima langsung meninggalkan ruang yang sebenarnya masih terbuka.",
        },
        {
          label:
            '"Terima kasih, saya senang dengan tawarannya. Berdasarkan riset dan cakupan peran ini, saya berharap di Rp10,5 juta. Apakah ada ruang?"',
          points: 2,
          feedback:
            "Hangat, beralasan, dan menyebut satu angka. Setelah itu, diam dan biarkan HR menjawab.",
        },
        {
          label: '"Kalau begitu saya pertimbangkan tawaran lain saja."',
          points: 0,
          feedback:
            "Ancaman yang belum tentu ada bisa membuat pembicaraan berhenti. Kalau memang ada tawaran lain, sebutkan dengan jujur dan tenang.",
        },
      ],
    },
    {
      q: 'HR bilang: "Anggaran posisi ini memang maksimal Rp9,5 juta."',
      options: [
        {
          label:
            '"Kalau gaji pokok sudah mentok, bisakah kita bahas bagian lain paketnya, misalnya anggaran sertifikasi dan tinjauan gaji di bulan keenam?"',
          points: 2,
          feedback: "Ini yang dilakukan Raka. Gaji pokok bukan satu-satunya yang bisa ditawar.",
        },
        {
          label: '"Ya sudah, tidak apa-apa."',
          points: 1,
          feedback:
            "Boleh, kalau angkanya memang masih di atas batas bawahmu. Tapi kamu melewatkan bagian paket lain yang sering lebih mudah diberikan.",
        },
        {
          label: '"Masa perusahaan sebesar ini cuma segitu?"',
          points: 0,
          feedback:
            "Nada menyalahkan membuat HR membela diri, bukan mencari jalan. Bertanyalah tentang pilihan, bukan tentang kesalahan.",
        },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Masih menerima di detik pertama",
      text: "Latih satu kalimat balasan untuk tawaran pertama sampai lancar. Kalimat itu yang paling mahal di seluruh proses.",
    },
    {
      min: 3,
      max: 4,
      title: "Siap menawar dengan hangat",
      text: "Kamu tahu kapan bertahan dan kapan beralih ke bagian paket lain. Ingat: minta semua kesepakatan secara tertulis.",
    },
  ],
};
