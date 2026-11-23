/**
 * Unsur interaktif "Pagi yang Menang" (D42, D50). Tokoh: Sari, 27, staf layanan nasabah,
 * berangkat naik KRL dari Bekasi pukul 06.15 (ilustrasi).
 */
const yn = (q) => ({
  q,
  options: [
    { label: "Ya", points: 1 },
    { label: "Tidak", points: 0 },
  ],
});

/** Bab 1 dan Bab 8 (tes ulang, id sama). */
export const CEK_PAGI = {
  id: "cek-pagi",
  mode: "score",
  label: "Pagi tadi",
  title: "Pagimu menang atau kalah?",
  intro:
    'Jawab untuk pagi-pagi hari kerja dalam seminggu terakhir. Jawab "Ya" kalau itu terjadi hampir setiap pagi.',
  questions: [
    yn("Aku bangun di jam yang kurang lebih sama, tanpa menekan tunda alarm berkali-kali."),
    yn("Hal pertama yang kulihat setelah bangun bukan ponsel."),
    yn("Aku sempat minum dan makan sesuatu sebelum berangkat."),
    yn("Aku tahu satu hal terpenting yang harus selesai hari itu sebelum mulai kerja."),
    yn("Aku tidak perlu mencari barang (kunci, kartu, charger) dengan panik."),
    yn("Aku berangkat tanpa harus berlari mengejar waktu."),
    yn("Ada setidaknya lima menit pagi yang terasa milikku sendiri."),
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Pagi yang dikejar",
      text: "Pagimu lebih sering mengejarmu daripada sebaliknya. Itu bukan soal malas. Mulai dari Bab 2: pagi yang menang dimulai dari malam sebelumnya.",
    },
    {
      min: 3,
      max: 5,
      title: "Separuh menang",
      text: "Beberapa bagian sudah berjalan. Pilih satu yang paling sering bolong, lalu pasang jangkarnya (Bab 4).",
    },
    {
      min: 6,
      max: 7,
      title: "Pagi yang kamu pimpin",
      text: "Pagimu sudah punya irama. Bab 6 dan 7 membantumu menjaganya saat hari tidak berjalan sesuai rencana.",
    },
  ],
};

/** Bab 2: mitos tentang bangun pagi (uji pengetahuan). */
export const MITOS_PAGI = {
  id: "mitos-pagi",
  mode: "knowledge",
  label: "Mitos atau fakta?",
  title: "Lima anggapan tentang pagi",
  questions: [
    {
      q: "Orang sukses semuanya bangun jam 4 pagi.",
      options: [
        { label: "Fakta", points: 0 },
        { label: "Mitos", points: 0, correct: true },
      ],
      explain:
        "Jam bangun yang cocok berbeda-beda, salah satunya dipengaruhi kronotipe (kecenderungan tubuh untuk tidur dan bangun lebih awal atau lebih lambat). Yang lebih penting adalah tidur cukup dan jam yang konsisten.",
    },
    {
      q: "Orang dewasa umumnya butuh tidur 7 sampai 9 jam semalam.",
      options: [
        { label: "Fakta", points: 0, correct: true },
        { label: "Mitos", points: 0 },
      ],
      explain:
        "Ini rekomendasi National Sleep Foundation (2015) untuk usia 18–64 tahun. Bangun jam 4 tanpa tidur jam 9 malam berarti memotong tidur, bukan menambah waktu.",
    },
    {
      q: "Rasa berat dan linglung setelah bangun berarti tidurmu kurang.",
      options: [
        { label: "Selalu begitu", points: 0 },
        { label: "Belum tentu", points: 0, correct: true },
      ],
      explain:
        "Itu disebut inersia tidur, masa peralihan dari tidur ke bangun penuh. Biasanya mereda dalam belasan sampai sekitar tiga puluh menit, walau bisa lebih berat bila tidurmu memang kurang.",
    },
    {
      q: "Membalas pesan kerja di kasur membuat pagi lebih produktif.",
      options: [
        { label: "Fakta", points: 0 },
        { label: "Mitos", points: 0, correct: true },
      ],
      explain:
        "Kamu memulai hari dengan menjawab urusan orang lain sebelum sempat memutuskan urusanmu sendiri. Kecuali pekerjaanmu memang menuntut, beri jeda dulu.",
    },
    {
      q: "Cahaya pagi membantu jam biologis tubuh tetap teratur.",
      options: [
        { label: "Fakta", points: 0, correct: true },
        { label: "Mitos", points: 0 },
      ],
      explain:
        "Cahaya adalah penanda waktu terkuat bagi jam biologis. Terkena cahaya terang di pagi hari membantu tubuh lebih mudah mengantuk di malam hari.",
    },
  ],
  results: [
    {
      min: 0,
      max: 2,
      title: "Banyak anggapan yang perlu diluruskan",
      text: "Wajar, karena mitos tentang bangun pagi sangat ramai di media sosial. Bab ini membahas yang benar-benar berpengaruh.",
    },
    {
      min: 3,
      max: 4,
      title: "Sebagian besar sudah tepat",
      text: "Kamu sudah bisa memilah tren dari yang didukung bukti. Lanjutkan ke hitung mundur jam tidurmu.",
    },
    {
      min: 5,
      max: 5,
      title: "Kamu tidak mudah termakan tren",
      text: "Pagi yang menang memang bukan soal jam bangun. Sekarang tinggal menerapkannya.",
    },
  ],
};

/** Bab 6: terlambat bangun (skenario). */
export const TELAT_BANGUN = {
  id: "telat-bangun",
  mode: "scenario",
  label: "05.40, bukan 05.00",
  title: "Kamu terbangun 40 menit lebih lambat dari biasanya.",
  intro: "KRL tetap berangkat 06.15. Apa yang kamu lakukan dengan rutinitasmu?",
  questions: [
    {
      q: "Pilih langkahmu.",
      options: [
        {
          label: "Lewati semuanya. Pagi ini sudah gagal, besok mulai lagi.",
          points: 0,
          feedback:
            'Pola "semua atau tidak sama sekali" yang paling sering mematikan rutinitas. Satu pagi yang berantakan tidak harus menjadi pagi kosong.',
        },
        {
          label:
            "Jalankan versi lima menit: minum, buka jendela, satu prioritas di catatan, lalu berangkat.",
          points: 2,
          feedback:
            "Inilah gunanya versi minimal. Rantainya tidak putus, dan kamu tetap berangkat dengan tahu apa yang terpenting hari ini.",
        },
        {
          label: "Paksakan rutinitas lengkap, walau harus naik ojek supaya tidak telat.",
          points: 1,
          feedback:
            "Semangatnya bagus, tapi kalau rutinitas membuatmu stres dan keluar ongkos, lama-lama kamu membencinya. Rutinitas harus melayani pagimu, bukan sebaliknya.",
        },
        {
          label: "Cek ponsel dulu sebentar untuk melihat apakah ada pesan penting.",
          points: 0,
          feedback:
            '"Sebentar" di pagi yang terburu-buru hampir selalu menjadi sepuluh menit. Kalau memang perlu, cek setelah duduk di kereta.',
        },
      ],
    },
  ],
  results: [
    { min: 0, max: 0, title: "Rantainya putus", text: "Siapkan versi lima menit sekarang juga." },
    { min: 1, max: 1, title: "Terlalu dipaksakan", text: "Rutinitas boleh menyusut." },
    { min: 2, max: 2, title: "Versi minimal", text: "Rantainya tetap utuh." },
  ],
};

/** Bab 7: kurva Lally dkk. */
export const LALLY_COUNTER = {
  title: "Rata-rata waktu sampai kebiasaan terasa otomatis",
  kind: "counter",
  format: "number",
  items: [
    { label: "hari (median), dengan rentang 18 sampai 254 hari", value: 66, color: "#e07a1f" },
  ],
  note: "Lally dkk. (2010), European Journal of Social Psychology. Melewatkan satu kesempatan tidak berpengaruh berarti pada proses pembentukan kebiasaan.",
};
