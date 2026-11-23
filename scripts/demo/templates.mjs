/**
 * Template DEMO siap unduh (D53): satu per kategori, masing-masing pendamping satu ebook.
 * Pelanggan mengisi formulir singkat, lalu server membuat DOCX/PDF/XLSX (BLUEPRINT bagian 5).
 * Isi ditulis sebagai dokumen JSON yang sama dengan ebook (lolos ebookDocSchema) dan divalidasi
 * saveTemplateBodySchema + checkTemplate di test.
 *
 * Isi disesuaikan dengan ebooknya: jadwal lari sama dengan "Dari Rebahan ke Lari 5K", rumus harga
 * sama dengan "Hitung Harga Jual yang Untung", zona layar sama dengan "Anak dan Gawai".
 */

// --- Pembangun dokumen kecil -------------------------------------------------

const txt = (t) => {
  // **tebal** seperti di ebook demo.
  const parts = String(t)
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean);
  return parts.map((s) =>
    s.startsWith("**") && s.endsWith("**")
      ? { type: "text", text: s.slice(2, -2), marks: [{ type: "bold" }] }
      : { type: "text", text: s },
  );
};
const p = (t) => (t ? { type: "paragraph", content: txt(t) } : { type: "paragraph" });
const h = (t, level = 2) => ({ type: "heading", attrs: { level }, content: txt(t) });
const list = (items, ordered = false) => ({
  type: ordered ? "orderedList" : "bulletList",
  content: items.map((i) => ({ type: "listItem", content: [p(i)] })),
});
const ul = (items) => list(items);
const ol = (items) => list(items, true);
const box = (variant, ...texts) => ({ type: "callout", attrs: { variant }, content: texts.map(p) });
const hr = { type: "horizontalRule" };
const cell = (type, t) => ({ type, content: [p(t)] });
/** Tabel: baris judul + baris isi. `rows` berupa array teks; "" = sel kosong untuk diisi. */
const table = (head, rows) => ({
  type: "table",
  content: [
    { type: "tableRow", content: head.map((t) => cell("tableHeader", t)) },
    ...rows.map((r) => ({ type: "tableRow", content: r.map((t) => cell("tableCell", t)) })),
  ],
});
const blanks = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(""));
const doc = (...content) => ({ type: "doc", content });
/** Bagian bersyarat: tampil bila isian `key` terisi / bernilai ya. */
const when = (key, ...nodes) => [p(`{{#if ${key}}}`), ...nodes, p("{{/if}}")];

const text = (key, label, extra = {}) => ({ key, label, type: "text", required: true, ...extra });
const opt = (key, label, extra = {}) => text(key, label, { required: false, ...extra });
const num = (key, label, extra = {}) => ({ key, label, type: "number", required: true, ...extra });
const yes = (key, label, extra = {}) => ({
  key,
  label,
  type: "boolean",
  required: false,
  ...extra,
});

// --- Template ----------------------------------------------------------------

export const DEMO_TEMPLATES = [
  {
    slug: "anggaran-bulanan-gajian",
    topic: "top_anggaran-arus-kas",
    tier: "free",
    book: "gajian-kok-cepat-habis",
    title: "Lembar Anggaran Bulanan dari Tanggal Gajian",
    summary:
      "Anggaran satu bulan yang dimulai dari tanggal gajianmu: pos wajib, jatah mingguan, cicilan, dan evaluasi akhir bulan.",
    config: {
      variables: [
        text("nama", "Nama"),
        text("bulan", "Bulan anggaran", { placeholder: "Januari 2027" }),
        num("penghasilan", "Penghasilan bersih sebulan", { unit: "Rp", min: 0 }),
        num("tanggal_gajian", "Tanggal gajian", { min: 1, max: 31 }),
        yes("punya_cicilan", "Saya punya cicilan atau paylater"),
        yes("kirim_keluarga", "Saya rutin mengirim uang ke keluarga"),
      ],
      outputFormats: ["xlsx", "pdf"],
      fileName: "Anggaran {{bulan}} {{nama}}",
    },
    body: doc(
      h("Anggaran {{bulan}}: {{nama}}"),
      p(
        "Penghasilan bersih: **Rp{{penghasilan}}** · Periode: tanggal {{tanggal_gajian}} sampai sehari sebelum gajian berikutnya.",
      ),
      box(
        "tip",
        "Anggaran ini dihitung dari tanggal gajian, bukan tanggal 1. Uang paling cepat habis di minggu pertama setelah gajian, jadi pos wajib dibayar di hari yang sama dengan gajian.",
      ),
      h("1. Bayar di hari gajian", 3),
      p("Pindahkan dulu pos-pos ini sebelum uang dipakai untuk hal lain."),
      table(
        ["Pos", "Rencana (Rp)", "Sudah dibayar?", "Catatan"],
        [
          ["Tabungan dan dana darurat", "", "", "Bayar diri sendiri dulu"],
          ["Sewa, kos, atau KPR", "", "", ""],
          ["Listrik, air, gas", "", "", ""],
          ["Internet dan pulsa", "", "", ""],
          ["Iuran dan asuransi (di luar potongan gaji)", "", "", ""],
          ["Langganan (aplikasi, streaming)", "", "", "Masih dipakai?"],
          ["", "", "", ""],
        ],
      ),
      ...when(
        "kirim_keluarga",
        h("Kiriman untuk keluarga", 3),
        p(
          "Tentukan angkanya di awal dan kirim di hari gajian, supaya tidak terasa sebagai pengeluaran kejutan.",
        ),
        table(["Untuk", "Jumlah (Rp)", "Tanggal kirim"], blanks(3, 3)),
      ),
      ...when(
        "punya_cicilan",
        h("Cicilan dan paylater", 3),
        table(
          ["Pemberi pinjaman", "Cicilan per bulan (Rp)", "Jatuh tempo", "Sisa bulan"],
          blanks(5, 4),
        ),
        box(
          "warning",
          "Jumlahkan semua cicilan lalu bagi dengan penghasilan. Banyak bank memakai batas sekitar 30% saat menilai kemampuan bayar. Di atas itu, hentikan dulu cicilan baru.",
        ),
      ),
      h("2. Jatah mingguan untuk kebutuhan harian", 3),
      p(
        "Sisa uang setelah pos wajib dibagi rata per minggu untuk makan, transportasi, dan belanja harian. Jatah yang tidak habis tidak ikut ke minggu berikutnya: pindahkan ke tabungan.",
      ),
      table(
        ["Minggu", "Jatah (Rp)", "Terpakai (Rp)", "Sisa (Rp)", "Paling boros di"],
        [
          ["Minggu 1", "", "", "", ""],
          ["Minggu 2", "", "", "", ""],
          ["Minggu 3", "", "", "", ""],
          ["Minggu 4", "", "", "", ""],
          ["Sisa hari", "", "", "", ""],
        ],
      ),
      h("3. Pengeluaran di luar rencana", 3),
      table(["Tanggal", "Untuk apa", "Jumlah (Rp)", "Perlu atau ingin?"], blanks(8, 4)),
      h("4. Evaluasi sehari sebelum gajian", 3),
      ol([
        "Berapa yang benar-benar masuk tabungan bulan ini?",
        "Pos mana yang paling melenceng dari rencana, dan kenapa?",
        "Satu langganan atau kebiasaan apa yang bisa dihentikan bulan depan?",
        "Berapa angka jatah mingguan yang lebih realistis untuk bulan depan?",
      ]),
      box(
        "info",
        "Pola 50/30/20 (kebutuhan, keinginan, tabungan) dari Elizabeth Warren (2005) bisa jadi titik awal. Kalau sewa dan transportasi sudah lebih dari separuh penghasilan, mulai dari tabungan 5–10% dulu, lalu naikkan pelan-pelan.",
      ),
    ),
  },

  {
    slug: "pelacak-kebiasaan-30-hari",
    topic: "top_berhenti-kebiasaan-buruk",
    tier: "free",
    book: "lepas-dari-scroll-tanpa-ujung",
    title: "Pelacak Kebiasaan 30 Hari",
    summary:
      'Satu kebiasaan, versi mininya, pemicunya, dan 30 kotak centang dengan aturan "jangan bolong dua kali".',
    config: {
      variables: [
        text("nama", "Nama"),
        text("kebiasaan", "Kebiasaan yang ingin dibangun", {
          placeholder: "Membaca buku sebelum tidur",
        }),
        text("versi_mini", "Versi paling kecilnya (selesai dalam 2 menit)", {
          placeholder: "Membaca satu halaman",
        }),
        text("pemicu", "Dilakukan setelah…", { placeholder: "Setelah menaruh HP di ruang tamu" }),
        opt("pengganti", "Kebiasaan lama yang ingin digantikan", {
          placeholder: "Scroll di kasur",
        }),
        text("mulai", "Tanggal mulai", { placeholder: "1 Februari 2027" }),
      ],
      outputFormats: ["pdf", "xlsx"],
      fileName: "Pelacak 30 Hari {{nama}}",
    },
    body: doc(
      h("30 Hari: {{kebiasaan}}"),
      p("Nama: {{nama}} · Mulai: {{mulai}}"),
      table(
        ["Rencanaku", ""],
        [
          ["Setelah…", "{{pemicu}}"],
          ["Aku akan…", "{{kebiasaan}}"],
          ["Di hari yang berat, minimal…", "{{versi_mini}}"],
        ],
      ),
      ...when(
        "pengganti",
        p(
          "Kebiasaan ini menggantikan: **{{pengganti}}**. Jauhkan pemicu kebiasaan lama, misalnya HP diisi daya di luar kamar.",
        ),
      ),
      box(
        "tip",
        "Aturannya hanya satu: **jangan bolong dua kali berturut-turut.** Bolong sekali itu wajar. Yang membuat kebiasaan putus adalah bolong kedua.",
      ),
      table(
        ["Hari", "Tanggal", "Selesai? (centang)", "Catatan singkat"],
        Array.from({ length: 30 }, (_, i) => [String(i + 1), "", "", ""]),
      ),
      h("Tinjauan mingguan", 3),
      table(
        ["Minggu", "Berapa hari selesai?", "Apa yang membantu?", "Apa yang menghalangi?"],
        [
          ["1", "", "", ""],
          ["2", "", "", ""],
          ["3", "", "", ""],
          ["4", "", "", ""],
        ],
      ),
      box(
        "info",
        "Dalam penelitian Lally dkk. (2010), kebiasaan baru butuh rata-rata 66 hari sampai terasa otomatis, dengan rentang 18 sampai 254 hari. Tiga puluh hari adalah awal yang baik, bukan garis finis. Setelah lembar ini penuh, cetak lembar baru.",
      ),
    ),
  },

  {
    slug: "lembar-rencana-mingguan",
    topic: "top_rencana-harian-mingguan",
    tier: "premium",
    book: "seminggu-dalam-satu-jam",
    title: "Lembar Rencana Mingguan Satu Jam",
    summary:
      "Panduan sesi perencanaan satu jam: tutup minggu lalu, pilih tiga hasil, pasang blok fokus, dan tinjau di hari Jumat.",
    config: {
      variables: [
        text("nama", "Nama"),
        text("minggu", "Minggu", { placeholder: "6–12 Januari 2027" }),
        text("hasil_1", "Hasil terpenting minggu ini"),
        opt("hasil_2", "Hasil kedua"),
        opt("hasil_3", "Hasil ketiga"),
        opt("jam_fokus", "Jam fokus harian", { placeholder: "08.00–10.00" }),
      ],
      outputFormats: ["pdf", "docx", "xlsx"],
      fileName: "Rencana Minggu {{minggu}} {{nama}}",
    },
    body: doc(
      h("Rencana Minggu {{minggu}}"),
      p("{{nama}}"),
      h("Menit 0–15: Tutup minggu lalu", 3),
      ul([
        "Kosongkan kotak masuk: catatan, pesan yang ditandai, kertas di meja.",
        "Pindahkan tugas yang belum selesai ke daftar di bawah, atau hapus kalau sudah tidak penting.",
        "Lihat kalender dua minggu ke depan: janji, tenggat, ulang tahun.",
      ]),
      h("Menit 15–30: Tiga hasil minggu ini", 3),
      p(
        'Hasil adalah sesuatu yang selesai dan bisa ditunjukkan, bukan kegiatan. "Proposal terkirim ke klien" lebih jelas daripada "mengerjakan proposal".',
      ),
      ol(["{{hasil_1}}"]),
      ...when("hasil_2", ol(["{{hasil_2}}"])),
      ...when("hasil_3", ol(["{{hasil_3}}"])),
      h("Menit 30–50: Pasang di kalender", 3),
      ...when(
        "jam_fokus",
        p(
          'Jam fokus harian: **{{jam_fokus}}**. Notifikasi dimatikan, pintu atau status dibuat "jangan diganggu".',
        ),
      ),
      table(
        ["Hari", "Blok fokus untuk hasil nomor…", "Tugas kecil lain", "Selesai?"],
        [
          ["Senin", "", "", ""],
          ["Selasa", "", "", ""],
          ["Rabu", "", "", ""],
          ["Kamis", "", "", ""],
          ["Jumat", "", "", ""],
          ["Sabtu", "", "", ""],
          ["Minggu", "", "", ""],
        ],
      ),
      h("Menunggu orang lain", 3),
      table(["Apa", "Dari siapa", "Ditagih tanggal"], blanks(4, 3)),
      h("Menit 50–60: Pertanyaan untuk Jumat sore", 3),
      ol([
        "Dari tiga hasil, berapa yang selesai?",
        "Blok fokus mana yang paling sering terganggu, dan oleh apa?",
        "Satu hal yang akan kulakukan berbeda minggu depan:",
      ]),
    ),
  },

  {
    slug: "cv-ramah-ats",
    topic: "top_cv-lamaran",
    tier: "free",
    book: "cv-yang-dilirik-rekruter",
    title: "CV Ramah ATS Satu Kolom",
    summary:
      "Kerangka CV satu kolom yang terbaca sistem penyaring lamaran (ATS), lengkap dengan rumus kalimat pengalaman.",
    config: {
      variables: [
        text("nama", "Nama lengkap"),
        text("posisi", "Posisi yang dilamar", { placeholder: "Staf Administrasi Keuangan" }),
        text("kota", "Kota domisili"),
        text("email", "Email"),
        text("telepon", "Nomor HP"),
        opt("linkedin", "Alamat LinkedIn (opsional)"),
        yes("fresh_graduate", "Saya lulusan baru / belum punya pengalaman kerja penuh waktu"),
      ],
      outputFormats: ["docx", "pdf"],
      fileName: "CV {{nama}} {{posisi}}",
    },
    body: doc(
      h("{{nama}}"),
      p("{{posisi}}"),
      p("{{kota}} · {{email}} · {{telepon}}"),
      ...when("linkedin", p("{{linkedin}}")),
      h("Ringkasan", 3),
      p(
        "[Dua sampai tiga kalimat: siapa kamu, keahlian utama yang relevan dengan posisi {{posisi}}, dan satu hasil yang bisa dibanggakan.]",
      ),
      ...when(
        "fresh_graduate",
        h("Pengalaman Organisasi dan Proyek", 3),
        p("**[Nama organisasi / proyek / magang]** · [Peran] · [Bulan Tahun – Bulan Tahun]"),
        ul([
          "[Kata kerja] + [apa yang dikerjakan] + [hasil yang terukur]",
          "[Contoh: Mengoordinasikan 12 relawan untuk acara donor darah, mengumpulkan 140 kantong darah.]",
        ]),
        p("**[Nama organisasi / proyek / magang]** · [Peran] · [Bulan Tahun – Bulan Tahun]"),
        ul(["[Kata kerja] + [apa] + [hasil]"]),
      ),
      h("Pengalaman Kerja", 3),
      p("**[Jabatan]** · [Nama perusahaan], [Kota] · [Bulan Tahun – sekarang]"),
      ul([
        "[Kata kerja] + [apa yang dikerjakan] + [hasil yang terukur]",
        "[Contoh: Merapikan proses rekonsiliasi bank sehingga tutup buku bulanan selesai 3 hari lebih cepat.]",
        "[Satu poin lagi yang memakai kata kunci dari lowongan.]",
      ]),
      p("**[Jabatan]** · [Nama perusahaan], [Kota] · [Bulan Tahun – Bulan Tahun]"),
      ul(["[Kata kerja] + [apa] + [hasil]", "[Kata kerja] + [apa] + [hasil]"]),
      h("Pendidikan", 3),
      p("**[Jenjang, Program studi]** · [Nama kampus/sekolah] · [Tahun lulus] · [IPK bila ≥ 3,00]"),
      h("Keahlian", 3),
      p(
        "[Keahlian teknis yang disebut di lowongan, dipisah koma: misalnya Microsoft Excel (VLOOKUP, pivot), Accurate, pembukuan dasar]",
      ),
      p("Bahasa: [Indonesia (penutur asli), Inggris (aktif / pasif)]"),
      h("Sertifikasi dan Pelatihan", 3),
      ul(["[Nama sertifikasi] · [Penerbit] · [Tahun]"]),
      hr,
      h("Catatan untukmu (hapus bagian ini sebelum dikirim)", 3),
      ul([
        "Ganti semua teks dalam [kurung siku]. Hapus bagian yang tidak relevan.",
        "Biarkan satu kolom, tanpa tabel, foto, ikon, atau grafik: sistem ATS sering gagal membacanya.",
        "Pakai judul bagian yang umum (Pengalaman Kerja, Pendidikan, Keahlian) supaya mudah dikenali.",
        "Salin 5–8 kata kunci dari iklan lowongan dan pakai di poin pengalaman dan keahlian, selama memang benar.",
        "Satu halaman untuk pengalaman di bawah lima tahun. Kirim sebagai PDF kecuali lowongan meminta Word.",
        "Simpan dengan nama file yang jelas, misalnya CV_Nama_Posisi.pdf.",
      ]),
    ),
  },

  {
    slug: "jurnal-pikiran-overthinking",
    topic: "top_overthinking",
    tier: "premium",
    book: "keluar-dari-lingkaran-overthinking",
    title: "Jurnal Pikiran Tujuh Hari",
    summary:
      "Catat pikiran yang berputar, pisahkan yang bisa dikendalikan, dan pindahkan kekhawatiran ke satu jam khawatir.",
    config: {
      variables: [
        text("nama", "Nama"),
        text("mulai", "Mulai tanggal"),
        text("jam_khawatir", "Jam khawatir harian (15 menit)", { placeholder: "19.30" }),
        opt("tempat_khawatir", "Tempat khusus untuk jam khawatir", {
          placeholder: "Kursi teras, bukan kasur",
        }),
      ],
      outputFormats: ["pdf", "docx"],
      fileName: "Jurnal Pikiran {{nama}}",
    },
    body: doc(
      h("Jurnal Pikiran Tujuh Hari"),
      p("{{nama}} · mulai {{mulai}}"),
      box(
        "tip",
        'Saat pikiran mulai berputar di luar jadwal, tulis satu baris di tabel pertama lalu katakan pada dirimu: "Ini kupikirkan pukul {{jam_khawatir}}." Menunda kekhawatiran ke waktu tertentu adalah teknik yang diteliti sejak Borkovec dkk. (1983).',
      ),
      ...when(
        "tempat_khawatir",
        p(
          "Tempat jam khawatir: **{{tempat_khawatir}}**. Jangan di kasur, supaya kasur tetap untuk tidur.",
        ),
      ),
      h("1. Tangkap pikirannya", 3),
      table(
        ["Hari / jam", "Pemicu", "Pikiran yang berputar", "Seberapa cemas (0–10)"],
        blanks(10, 4),
      ),
      h("2. Saat jam khawatir: pilah", 3),
      table(
        [
          "Pikiran",
          "Bisa kukendalikan?",
          "Kalau ya, satu langkah kecil",
          "Kalau tidak, kulepas dengan kalimat",
        ],
        blanks(7, 4),
      ),
      h("3. Uji satu pikiran paling berat minggu ini", 3),
      table(
        ["Pertanyaan", "Jawabanku"],
        [
          ["Apa pikirannya, persis seperti muncul di kepala?", ""],
          ["Bukti yang mendukung", ""],
          ["Bukti yang tidak mendukung", ""],
          ["Apa yang akan kukatakan pada sahabat yang memikirkan hal ini?", ""],
          ["Versi pikiran yang lebih seimbang", ""],
          ["Seberapa cemas sekarang (0–10)?", ""],
        ],
      ),
      h("4. Akhir minggu", 3),
      ul([
        "Dari semua yang dikhawatirkan, berapa yang benar-benar terjadi?",
        "Jam berapa pikiran paling sering datang? Apa yang biasanya sedang kulakukan?",
      ]),
      box(
        "warning",
        "Jurnal ini untuk kekhawatiran sehari-hari. Kalau cemas mengganggu tidur, kerja, atau makan selama lebih dari dua minggu, atau muncul pikiran menyakiti diri, bicarakan dengan psikolog atau dokter. Layanan kesehatan jiwa Kemenkes: telepon 119, tekan 8.",
      ),
    ),
  },

  {
    slug: "jadwal-lari-5k-8-minggu",
    topic: "top_mulai-olahraga",
    tier: "premium",
    book: "dari-rebahan-ke-lari-5k",
    title: "Jadwal Lari 5K Delapan Minggu",
    summary:
      "Kalender 24 sesi lari-jalan dari nol sampai 30 menit tanpa henti, dengan kolom tes bicara dan catatan rasa.",
    config: {
      variables: [
        text("nama", "Nama"),
        {
          key: "hari",
          label: "Hari latihan",
          type: "select",
          required: true,
          options: [
            { value: "sel-kam-sab", label: "Selasa, Kamis, Sabtu" },
            { value: "sen-rab-jum", label: "Senin, Rabu, Jumat" },
            { value: "rab-jum-min", label: "Rabu, Jumat, Minggu" },
          ],
        },
        text("jam", "Jam latihan", { placeholder: "05.30" }),
        text("mulai", "Tanggal mulai"),
        opt("acara", "Acara 5K yang dituju (opsional)"),
      ],
      outputFormats: ["pdf", "xlsx"],
      fileName: "Jadwal Lari 5K {{nama}}",
    },
    body: doc(
      h("Jadwal Lari 5K: {{nama}}"),
      p("Hari latihan: **{{hari}}**, pukul {{jam}} · Mulai {{mulai}}"),
      ...when("acara", p("Target: **{{acara}}**")),
      box(
        "tip",
        "Setiap sesi diawali jalan cepat 5 menit dan diakhiri jalan santai 5 menit. Lari dengan kecepatan yang masih bisa dipakai bicara satu kalimat penuh (tes bicara). Kalau satu minggu terasa terlalu berat, ulangi minggu itu.",
      ),
      table(
        ["Minggu", "Isi setiap sesi", "Sesi 1", "Sesi 2", "Sesi 3"],
        [
          ["1", "8 kali: lari 1 menit, jalan 2 menit", "", "", ""],
          ["2", "6 kali: lari 2 menit, jalan 2 menit", "", "", ""],
          ["3", "5 kali: lari 3 menit, jalan 2 menit", "", "", ""],
          ["4", "4 kali: lari 5 menit, jalan 2 menit", "", "", ""],
          ["5", "3 kali: lari 8 menit, jalan 2 menit", "", "", ""],
          ["6", "2 kali: lari 12 menit, jalan 2 menit", "", "", ""],
          ["7", "Lari 20 menit tanpa berhenti", "", "", ""],
          ["8", "Lari 30 menit, atau 5 kilometer", "", "", ""],
        ],
      ),
      p(
        "Isi kolom sesi dengan tanggal dan centang. Hari di antara sesi adalah hari istirahat atau jalan santai.",
      ),
      h("Catatan rasa", 3),
      table(
        ["Tanggal", "Tes bicara lolos?", "Napas (1–5)", "Kaki (1–5)", "Satu kata tentang sesi ini"],
        blanks(12, 5),
      ),
      box(
        "warning",
        "Hentikan latihan dan periksakan diri kalau muncul nyeri dada, sesak berat, pusing, atau nyeri tajam di satu titik yang makin parah saat berlari. Pegal satu-dua hari setelah latihan itu wajar.",
      ),
    ),
  },

  {
    slug: "kartu-kalimat-menolak",
    topic: "top_komunikasi-asertif",
    tier: "premium",
    book: "berani-bilang-tidak",
    title: "Kartu Kalimat Menolak dengan Sopan",
    summary:
      "Kalimat siap pakai untuk menolak di kantor, di keluarga, ke teman, dan saat dimintai pinjaman uang, plus lembar latihan.",
    config: {
      variables: [
        text("nama", "Nama"),
        opt("batas", "Satu batas yang ingin kujaga", {
          placeholder: "Tidak membalas pesan kerja setelah jam 8 malam",
        }),
        yes("kantor", "Situasi di kantor"),
        yes("keluarga", "Situasi di keluarga"),
        yes("teman", "Situasi dengan teman"),
        yes("pinjam_uang", "Dimintai pinjaman uang"),
      ],
      outputFormats: ["pdf", "docx"],
      fileName: "Kartu Menolak {{nama}}",
    },
    body: doc(
      h("Kartu Kalimat Menolak"),
      p("Milik {{nama}}"),
      ...when("batas", box("reflect", "Batas yang sedang kujaga: **{{batas}}**")),
      h("Rumusnya", 3),
      p(
        "**Terima kasih + tidak + alasan singkat (boleh dilewati) + tawaran lain (kalau memang mau).** Alasan tidak wajib. Semakin panjang alasan, semakin banyak celah untuk ditawar.",
      ),
      ul([
        '"Boleh aku pikirkan dulu? Aku kabari besok pagi." (kalimat penunda: dipakai saat kamu belum yakin)',
        '"Aku nggak bisa, tapi terima kasih sudah ingat aku."',
      ]),
      ...when(
        "kantor",
        h("Di kantor", 3),
        ul([
          '"Minggu ini aku sedang menyelesaikan laporan A dan B. Kalau ini masuk, mana yang boleh kugeser?"',
          '"Aku bisa bantu review 30 menit, tapi belum bisa mengerjakan bagian ini dari awal."',
          '"Pesan ini kubalas besok jam 8 pagi, ya."',
          '"Untuk lembur Sabtu ini aku nggak bisa. Sabtu depan bisa kubantu kalau masih perlu."',
        ]),
      ),
      ...when(
        "keluarga",
        h("Di keluarga", 3),
        ul([
          '"Aku sayang kalian, dan untuk kali ini jawabanku tidak."',
          '"Lebaran ini aku pulang tanggal 2 saja. Aku ingin datang dengan kondisi yang enak, bukan kecapekan."',
          '"Soal kapan menikah, nanti kalau ada kabar aku yang cerita duluan. Sekarang aku mau dengar kabar Tante dulu."',
          '"Aku belum bisa ikut patungan sebanyak itu. Yang bisa kusumbang Rp…"',
        ]),
      ),
      ...when(
        "teman",
        h("Ke teman", 3),
        ul([
          '"Malam ini aku mau di rumah dulu. Ajak aku lagi minggu depan, ya."',
          '"Aku nggak ikut yang ini. Kalau nanti ada makan siang biasa, aku ikut."',
          '"Aku belum bisa jadi tempat cerita malam ini, aku juga lagi capek. Besok siang aku telepon."',
        ]),
      ),
      ...when(
        "pinjam_uang",
        h("Saat dimintai pinjaman uang", 3),
        ul([
          '"Aku nggak bisa meminjamkan uang. Itu aturan yang kupegang untuk siapa pun, bukan karena kamu."',
          '"Pinjaman belum bisa, tapi aku bisa bantu cari info bantuan atau lowongan."',
          '"Uangku sudah teralokasi semua bulan ini. Maaf, aku nggak bisa."',
        ]),
        box(
          "tip",
          "Kalau memutuskan memberi, berikan jumlah yang rela tidak kembali, dan sebut sebagai pemberian, bukan pinjaman.",
        ),
      ),
      h("Lembar latihan", 3),
      p("Catat setiap kali kamu menolak. Rasa bersalah biasanya turun setelah beberapa kali."),
      table(
        [
          "Tanggal",
          "Siapa dan permintaan apa",
          "Kalimat yang kupakai",
          "Rasa bersalah (0–10)",
          "Yang terjadi sesudahnya",
        ],
        blanks(8, 5),
      ),
    ),
  },

  {
    slug: "lembar-hitung-hpp",
    topic: "top_harga-pembukuan",
    tier: "premium",
    book: "hitung-harga-jual-yang-untung",
    title: "Lembar Hitung HPP dan Harga Jual",
    summary:
      "Daftar bahan, kemasan, dan biaya tetap untuk menghitung HPP per produk, harga jual dengan margin, dan harga di aplikasi.",
    config: {
      variables: [
        text("usaha", "Nama usaha"),
        text("produk", "Nama produk", { placeholder: "Risol mayo" }),
        text("satuan", "Satuan jual", { placeholder: "pcs" }),
        num("per_adonan", "Jumlah produk per sekali produksi", { min: 1 }),
        num("margin", "Target margin", { unit: "%", min: 1, max: 90 }),
        yes("aplikasi", "Saya juga jual lewat aplikasi pesan antar"),
      ],
      outputFormats: ["xlsx", "pdf"],
      fileName: "HPP {{produk}} {{usaha}}",
    },
    body: doc(
      h("HPP dan Harga Jual: {{produk}}"),
      p(
        "{{usaha}} · Satu kali produksi = **{{per_adonan}} {{satuan}}** · Target margin **{{margin}}%**",
      ),
      h("A. Bahan baku per sekali produksi", 3),
      p(
        "Hitung biaya bahan yang benar-benar terpakai, bukan harga satu kemasan besar. Contoh: tepung 1 kg Rp14.000, terpakai 250 g, maka biayanya Rp3.500.",
      ),
      table(
        ["Bahan", "Harga beli (Rp)", "Isi kemasan", "Terpakai", "Biaya terpakai (Rp)"],
        blanks(10, 5),
      ),
      p("Total bahan per produksi: Rp…………"),
      h("B. Kemasan dan pelengkap per sekali produksi", 3),
      table(["Barang", "Harga per buah (Rp)", "Jumlah dipakai", "Biaya (Rp)"], blanks(5, 4)),
      h("C. Biaya tetap per bulan", 3),
      p(
        "Biaya yang tetap keluar walau jualan sepi. Bagi dengan perkiraan jumlah {{satuan}} terjual sebulan.",
      ),
      table(
        ["Biaya", "Per bulan (Rp)"],
        [
          ["Sewa tempat / listrik / air", ""],
          ["Gas", ""],
          ["Gaji (termasuk gajimu sendiri)", ""],
          ["Penyusutan alat", ""],
          ["Lainnya", ""],
          ["Perkiraan terjual sebulan ({{satuan}})", ""],
        ],
      ),
      h("D. Hitung", 3),
      table(
        ["Langkah", "Rumus", "Hasil (Rp)"],
        [
          ["1. Biaya variabel per {{satuan}}", "(Total A + Total B) ÷ {{per_adonan}}", ""],
          ["2. Biaya tetap per {{satuan}}", "Total C ÷ perkiraan terjual sebulan", ""],
          ["3. HPP per {{satuan}}", "Langkah 1 + Langkah 2", ""],
          ["4. Harga jual", "HPP ÷ (1 − {{margin}}%)", ""],
          ["5. Harga dibulatkan", "Ke Rp500 atau Rp1.000 terdekat ke atas", ""],
        ],
      ),
      ...when(
        "aplikasi",
        h("E. Harga di aplikasi pesan antar", 3),
        table(
          ["Langkah", "Rumus", "Hasil (Rp)"],
          [
            ["Potongan aplikasi", "Cek di dasbor mitra, misalnya 20%", ""],
            ["Harga di aplikasi", "Harga jual ÷ (1 − potongan)", ""],
          ],
        ),
        p("Contoh: harga jual Rp4.500, potongan 20%: Rp4.500 ÷ 0,8 = Rp5.625, dibulatkan Rp6.000."),
      ),
      box(
        "warning",
        "Margin dan markup berbeda. Menambah 30% di atas HPP (markup) hanya menghasilkan margin sekitar 23%. Itu sebabnya rumus di langkah 4 membagi, bukan mengalikan.",
      ),
    ),
  },

  {
    slug: "kesepakatan-gawai-keluarga",
    topic: "top_anak-gawai",
    tier: "premium",
    book: "anak-dan-gawai",
    title: "Kesepakatan Gawai Keluarga",
    summary:
      "Kesepakatan tertulis yang dibuat bersama anak: zona merah-kuning-hijau, waktu layar, tontonan, dan janji orang tua.",
    config: {
      variables: [
        text("keluarga", "Nama keluarga", { placeholder: "Keluarga Rina" }),
        text("anak", "Nama anak"),
        num("usia", "Usia anak", { min: 2, max: 18, unit: "tahun" }),
        num("menit_sekolah", "Waktu layar hari sekolah", { min: 0, max: 300, unit: "menit" }),
        num("menit_libur", "Waktu layar hari libur", { min: 0, max: 480, unit: "menit" }),
        yes("hp_sendiri", "Anak sudah punya HP sendiri"),
      ],
      outputFormats: ["docx", "pdf"],
      fileName: "Kesepakatan Gawai {{keluarga}}",
    },
    body: doc(
      h("Kesepakatan Gawai {{keluarga}}"),
      p(
        "Dibuat bersama {{anak}} ({{usia}} tahun). Kesepakatan ini ditinjau ulang setiap tiga bulan atau saat ulang tahun.",
      ),
      h("Zona merah: tanpa layar", 3),
      ul([
        "Di kamar tidur, terutama satu jam sebelum tidur. Gawai diisi daya di ruang keluarga.",
        "Di meja makan, untuk semua orang termasuk Ayah dan Ibu.",
        "Saat mengerjakan PR, kecuali memang dibutuhkan untuk tugas.",
      ]),
      h("Zona kuning: boleh dengan aturan", 3),
      table(
        ["", "Hari sekolah", "Hari libur"],
        [
          ["Waktu layar untuk hiburan", "{{menit_sekolah}} menit", "{{menit_libur}} menit"],
          ["Kapan", "Setelah PR dan mandi", "Setelah bantu pekerjaan rumah"],
          ["Di mana", "Ruang keluarga", "Ruang keluarga"],
        ],
      ),
      p(
        "Lima menit sebelum waktu habis, ada aba-aba. Saat waktu habis, gawai dikembalikan ke tempatnya tanpa tawar-menawar.",
      ),
      h("Zona hijau: daftar tontonan dan gim yang sudah dicek", 3),
      table(["Judul", "Dicek oleh", "Tanggal"], blanks(6, 3)),
      ...when(
        "hp_sendiri",
        h("Karena {{anak}} sudah punya HP sendiri", 3),
        ul([
          "Kata sandi diketahui orang tua. Orang tua memeriksa bersama {{anak}}, tidak diam-diam.",
          "Aplikasi baru diunduh setelah dibicarakan bersama.",
          "Tidak membagikan alamat, nama sekolah, atau foto berseragam ke orang yang tidak dikenal.",
          "Kalau ada pesan atau gambar yang membuat tidak nyaman, {{anak}} boleh langsung cerita dan tidak akan dimarahi.",
        ]),
      ),
      h("Janji orang tua", 3),
      ul([
        "Kami juga menaruh HP saat makan dan saat ngobrol dengan {{anak}}.",
        "Kami menjelaskan alasan aturan, bukan hanya melarang.",
        "Kami tidak memakai gawai sebagai hadiah atau hukuman utama.",
      ]),
      h("Kalau kesepakatan dilanggar", 3),
      p("Konsekuensi yang disepakati: ………………………………………………"),
      box(
        "info",
        "Pedoman WHO (2019) untuk balita: tanpa layar sebelum usia 2 tahun dan paling lama 1 jam sehari untuk usia 2–4 tahun. Untuk anak sekolah, yang terpenting adalah batas yang konsisten dan tidak mengganggu tidur, gerak, dan waktu bersama keluarga.",
      ),
      table(
        ["Tanda tangan", "Nama", "Tanggal"],
        [
          ["", "{{anak}}", ""],
          ["", "Ayah / Ibu", ""],
          ["", "Ayah / Ibu", ""],
        ],
      ),
    ),
  },

  {
    slug: "refleksi-mingguan-stoik",
    topic: "top_stoikisme",
    tier: "premium",
    book: "stoik-untuk-hidup-sehari-hari",
    title: "Lembar Refleksi Mingguan ala Stoik",
    summary:
      "Persiapan pagi, pemilahan kendali, dan tinjauan malam tujuh hari, mengikuti latihan Marcus Aurelius dan Seneca.",
    config: {
      variables: [
        text("nama", "Nama"),
        text("minggu", "Minggu", { placeholder: "6–12 Januari 2027" }),
        text("nilai", "Nilai yang ingin kujalani minggu ini", { placeholder: "Sabar" }),
        opt("tantangan", "Situasi sulit yang sudah kuketahui akan datang"),
      ],
      outputFormats: ["pdf", "docx"],
      fileName: "Refleksi Stoik {{nama}} {{minggu}}",
    },
    body: doc(
      h("Refleksi Mingguan: {{minggu}}"),
      p("{{nama}} · Nilai minggu ini: **{{nilai}}**"),
      h("Pagi: bersiap, bukan berharap", 3),
      p(
        "Marcus Aurelius membuka hari dengan mengingatkan diri bahwa ia akan bertemu orang yang menyebalkan, dan memutuskan sejak pagi bagaimana ia akan bersikap (Meditasi 2.1).",
      ),
      ...when(
        "tantangan",
        p(
          "Yang sudah kuketahui akan datang minggu ini: **{{tantangan}}**. Kalau itu terjadi, aku akan…",
        ),
      ),
      table(
        ["Hari", "Hal sulit yang mungkin terjadi hari ini", "Sikap yang kupilih"],
        [
          ["Senin", "", ""],
          ["Selasa", "", ""],
          ["Rabu", "", ""],
          ["Kamis", "", ""],
          ["Jumat", "", ""],
          ["Sabtu", "", ""],
          ["Minggu", "", ""],
        ],
      ),
      h("Siang: pilah kendali", 3),
      table(["Kejadian", "Dalam kendaliku", "Di luar kendaliku", "Yang kulakukan"], blanks(5, 4)),
      h("Malam: tinjauan Seneca", 3),
      p(
        "Seneca menulis bahwa setiap malam ia memeriksa harinya dengan tiga pertanyaan, tanpa menghukum diri (De Ira 3.36).",
      ),
      table(
        [
          "Hari",
          "Apa yang kulakukan dengan baik?",
          "Di mana aku keliru?",
          "Apa yang akan kuperbaiki besok?",
        ],
        [
          ["Senin", "", "", ""],
          ["Selasa", "", "", ""],
          ["Rabu", "", "", ""],
          ["Kamis", "", "", ""],
          ["Jumat", "", "", ""],
          ["Sabtu", "", "", ""],
          ["Minggu", "", "", ""],
        ],
      ),
      h("Akhir minggu", 3),
      ul([
        'Kapan aku paling dekat dengan nilai "{{nilai}}" minggu ini?',
        "Kekhawatiran apa yang ternyata tidak terjadi?",
        "Satu hal yang ingin kulepaskan sebelum minggu depan:",
      ]),
      box(
        "reflect",
        '"Kita lebih sering menderita dalam bayangan daripada dalam kenyataan." (Seneca, Surat 13)',
      ),
    ),
  },
];
