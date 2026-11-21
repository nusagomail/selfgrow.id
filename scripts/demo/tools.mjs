/**
 * Tool DEMO yang ditanam di ebook "Lepas dari Jerat Paylater" (D42). Gratis untuk semua user
 * login, rumus dihitung di server (D8). Konfigurasi divalidasi toolConfigSchema saat dipakai.
 */
export const DEMO_TOOLS = [
  {
    slug: "kalkulator-harga-cicilan",
    topic: "top_utang-pinjol-paylater",
    title: "Kalkulator Harga Sebenarnya Cicilan",
    summary: "Hitung total yang benar-benar kamu bayar saat membeli dengan cicilan.",
    config: {
      version: 1,
      intro: "Masukkan harga barang, biaya per bulan, dan lama cicilan.",
      submitLabel: "Hitung harga sebenarnya",
      inputs: [
        {
          key: "harga",
          label: "Harga barang",
          type: "number",
          required: true,
          min: 0,
          unit: "Rp",
          placeholder: "1200000",
        },
        {
          key: "biaya",
          label: "Biaya layanan per bulan",
          type: "number",
          required: true,
          min: 0,
          max: 20,
          step: 0.1,
          unit: "%",
          placeholder: "2,6",
        },
        {
          key: "tenor",
          label: "Lama cicilan",
          type: "number",
          required: true,
          min: 1,
          max: 60,
          unit: "bulan",
          placeholder: "12",
        },
      ],
      computed: [
        {
          key: "tambahan",
          label: "Biaya tambahan",
          formula: "round(harga * biaya / 100 * tenor)",
          format: "currency_idr",
          show: true,
        },
        {
          key: "total",
          label: "Total yang kamu bayar",
          formula: "harga + tambahan",
          format: "currency_idr",
          show: true,
        },
        {
          key: "cicilan",
          label: "Cicilan per bulan",
          formula: "round(total / tenor)",
          format: "currency_idr",
          show: true,
        },
        {
          key: "persen",
          label: "Lebih mahal dari harga",
          formula: "round(tambahan / harga * 100, 1)",
          format: "percent",
          show: true,
        },
      ],
      recommendations: [
        {
          when: "persen >= 20",
          text: "Barang ini jadi {{persen}} lebih mahal. Kalau bisa menabung dulu {{tenor}} bulan, kamu menghemat {{tambahan}}.",
          variant: "warning",
        },
        {
          when: "and(persen > 0, persen < 20)",
          text: "Tambahan biayanya {{tambahan}}. Pastikan cicilan ini sudah masuk anggaran bulananmu.",
          variant: "info",
        },
        {
          when: "persen <= 0",
          text: "Tanpa biaya tambahan. Tetap catat cicilannya di anggaran supaya tidak menumpuk.",
          variant: "tip",
        },
      ],
    },
  },
  {
    slug: "kalkulator-rasio-cicilan",
    topic: "top_utang-pinjol-paylater",
    title: "Kalkulator Rasio Cicilan",
    summary: "Cek berapa persen gajimu yang sudah dipesan untuk cicilan.",
    config: {
      version: 1,
      intro: "Jumlahkan semua cicilan bulan ini, lalu bandingkan dengan gaji bersihmu.",
      submitLabel: "Cek zonaku",
      inputs: [
        {
          key: "gaji",
          label: "Gaji bersih per bulan",
          type: "number",
          required: true,
          min: 1,
          unit: "Rp",
          placeholder: "5800000",
        },
        {
          key: "cicilan",
          label: "Total cicilan per bulan",
          type: "number",
          required: true,
          min: 0,
          unit: "Rp",
          placeholder: "1588200",
        },
      ],
      computed: [
        {
          key: "rasio",
          label: "Rasio cicilan",
          formula: "round(cicilan / gaji * 100, 1)",
          format: "percent",
          show: true,
        },
        {
          key: "sisa",
          label: "Sisa gaji setelah cicilan",
          formula: "gaji - cicilan",
          format: "currency_idr",
          show: true,
        },
      ],
      recommendations: [
        {
          when: "rasio < 10",
          text: "Zona aman. Pertahankan, dan jangan menambah cicilan konsumtif baru.",
          variant: "tip",
        },
        {
          when: "and(rasio >= 10, rasio < 20)",
          text: "Zona waspada. Jangan menambah cicilan sampai ada yang lunas.",
          variant: "info",
        },
        {
          when: "and(rasio >= 20, rasio < 30)",
          text: "Zona berat. Fokuskan uang ekstra untuk pelunasan (Bab 6 dan 7).",
          variant: "warning",
        },
        {
          when: "rasio >= 30",
          text: "Zona bahaya. Hentikan utang baru dan pertimbangkan negosiasi dengan pemberi pinjaman (Bab 8).",
          variant: "warning",
        },
      ],
    },
  },
  {
    slug: "kalkulator-waktu-layar",
    topic: "top_berhenti-kebiasaan-buruk",
    title: "Kalkulator Waktu Layar",
    summary: "Lihat berapa hari dan tahun hidupmu yang dihabiskan di depan layar.",
    config: {
      version: 1,
      intro: "Buka pengaturan waktu layar di ponselmu, lalu masukkan rata-rata harianmu.",
      submitLabel: "Hitung waktuku",
      inputs: [
        {
          key: "jam",
          label: "Waktu layar per hari",
          type: "number",
          required: true,
          min: 0,
          max: 24,
          unit: "jam",
          placeholder: "7",
        },
        {
          key: "menit",
          label: "Ditambah",
          type: "number",
          required: true,
          min: 0,
          max: 59,
          unit: "menit",
          placeholder: "0",
        },
        {
          key: "usia",
          label: "Usiamu sekarang",
          type: "number",
          required: true,
          min: 10,
          max: 79,
          unit: "tahun",
          placeholder: "29",
        },
      ],
      computed: [
        {
          key: "perhari",
          label: "Waktu layar per hari (jam)",
          formula: "round(jam + menit / 60, 1)",
          format: "number",
          show: false,
        },
        {
          key: "hari",
          label: "Hari penuh di layar setiap tahun",
          formula: "round(perhari * 365 / 24)",
          format: "number",
          show: true,
        },
        {
          key: "tahun",
          label: "Tahun di layar sampai usia 80",
          formula: "round(perhari * 365 * (80 - usia) / 8760, 1)",
          format: "number",
          show: true,
        },
        {
          key: "hemat",
          label: "Hari yang kembali per tahun bila berkurang 1 jam sehari",
          formula: "round(365 / 24)",
          format: "number",
          show: true,
        },
      ],
      recommendations: [
        {
          when: "perhari >= 5",
          text: "Sekitar {{hari}} hari setahun. Mulai dari audit di Bab 4: kamu tidak perlu memangkas semuanya, cukup bagian yang tidak kamu pilih.",
          variant: "warning",
        },
        {
          when: "and(perhari >= 3, perhari < 5)",
          text: "Masih di sekitar rata-rata, tapi tetap {{hari}} hari setahun. Pilih satu zona tanpa layar dari Bab 6.",
          variant: "info",
        },
        {
          when: "perhari < 3",
          text: "Waktu layarmu sudah cukup terkendali. Jaga dengan pagar di Bab 5 dan 6.",
          variant: "tip",
        },
      ],
    },
  },
  {
    slug: "perakit-kalimat-menolak",
    topic: "top_komunikasi-asertif",
    title: "Perakit Kalimat Menolak",
    summary: "Susun kalimat penolakan yang jelas dan sopan sesuai situasimu.",
    config: {
      version: 1,
      intro: "Pilih kepada siapa kamu menolak, tulis permintaannya, lalu pilih gaya bicaramu.",
      submitLabel: "Susun kalimatku",
      inputs: [
        {
          key: "siapa",
          label: "Kamu menolak siapa?",
          type: "select",
          required: true,
          options: [
            { value: "atasan", label: "Atasan" },
            { value: "rekan", label: "Rekan kerja" },
            { value: "keluarga", label: "Keluarga" },
            { value: "teman", label: "Teman" },
          ],
        },
        {
          key: "permintaan",
          label: "Permintaannya apa?",
          type: "text",
          required: true,
          placeholder: "lembur hari Sabtu",
          help: "Tulis singkat, tanpa kata 'minta'. Contoh: pinjam uang Rp2 juta",
        },
        {
          key: "tawaran",
          label: "Mau menawarkan sesuatu?",
          type: "select",
          required: true,
          options: [
            { value: "tidak", label: "Tidak, cukup menolak" },
            { value: "lain", label: "Waktu lain" },
            { value: "kecil", label: "Bantuan yang lebih kecil" },
            { value: "orang", label: "Orang lain yang bisa membantu" },
          ],
        },
        {
          key: "gaya",
          label: "Gaya bicaramu",
          type: "select",
          required: true,
          options: [
            { value: "lembut", label: "Lembut" },
            { value: "tegas", label: "Tegas" },
          ],
        },
      ],
      computed: [
        {
          key: "formal",
          label: "Formal",
          formula: 'siapa == "atasan"',
          format: "text",
          show: false,
        },
        {
          key: "pembuka",
          label: "Pembuka",
          formula:
            'if(gaya == "lembut", if(formal, "Terima kasih sudah mempercayakan ini ke saya.", "Makasih sudah kepikiran aku, ya."), if(formal, "Saya sudah mempertimbangkannya.", "Aku sudah pikirkan baik-baik."))',
          format: "text",
          show: false,
        },
        {
          key: "inti",
          label: "Inti",
          formula:
            'concat("Untuk ", permintaan, ", ", if(formal, "saya tidak mengambilnya kali ini.", if(gaya == "lembut", "aku nggak ambil dulu kali ini.", "jawabanku tidak.")))',
          format: "text",
          show: false,
        },
        {
          key: "alternatif",
          label: "Alternatif",
          formula:
            'if(tawaran == "lain", if(formal, " Kalau bisa menunggu, saya siap membantu di waktu lain minggu ini.", " Kalau lain waktu, aku bisa."), if(tawaran == "kecil", if(formal, " Saya bisa membantu bagian kecilnya, kalau itu meringankan.", " Aku bisa bantu sedikit, tapi nggak semuanya."), if(tawaran == "orang", if(formal, " Mungkin ada rekan lain yang lebih longgar; saya bisa bantu carikan.", " Mungkin ada yang lebih bisa, nanti aku bantu tanyakan."), "")))',
          format: "text",
          show: false,
        },
        {
          key: "kalimat",
          label: "Kalimatmu",
          formula: 'concat(pembuka, " ", inti, alternatif)',
          format: "text",
          show: true,
        },
      ],
      recommendations: [
        {
          when: 'gaya == "lembut"',
          text: "Ucapkan sekali, lalu berhenti. Tidak perlu menambah alasan panjang: semakin banyak alasan, semakin banyak celah untuk ditawar.",
          variant: "tip",
        },
        {
          when: 'gaya == "tegas"',
          text: "Tegas bukan berarti dingin. Jaga nada suara tetap ramah, dan kalau ditanya ulang, ulangi kalimat yang sama dengan tenang (Bab 7).",
          variant: "info",
        },
        {
          when: 'siapa == "keluarga"',
          text: "Dengan keluarga, sampaikan secara langsung atau lewat telepon, bukan lewat grup. Penolakan yang didengar suaranya terasa lebih hangat.",
          variant: "tip",
        },
      ],
    },
  },
  {
    slug: "pemilah-kekhawatiran",
    topic: "top_overthinking",
    title: "Pemilah Kekhawatiran",
    summary: "Pilah satu kekhawatiran: perlu ditindak, dijadwalkan, atau dilepaskan.",
    config: {
      version: 1,
      intro: "Tulis satu hal yang sedang berputar di kepalamu, lalu jawab tiga pertanyaan singkat.",
      submitLabel: "Pilah",
      inputs: [
        {
          key: "hal",
          label: "Apa yang kamu khawatirkan?",
          type: "text",
          required: true,
          placeholder: "presentasi hari Kamis",
        },
        {
          key: "kendali",
          label: "Bisakah kamu melakukan sesuatu tentang ini?",
          type: "select",
          required: true,
          options: [
            { value: "ya", label: "Ya, ada yang bisa kulakukan" },
            { value: "sebagian", label: "Sebagian saja" },
            { value: "tidak", label: "Tidak, di luar kendaliku" },
          ],
        },
        {
          key: "kapan",
          label: "Kapan hal ini terjadi?",
          type: "select",
          required: true,
          options: [
            { value: "sekarang", label: "Hari ini atau besok" },
            { value: "nanti", label: "Minggu ini atau lebih jauh" },
            { value: "mungkin", label: "Belum tentu terjadi" },
          ],
        },
      ],
      computed: [
        {
          key: "langkah",
          label: "Langkahmu",
          formula:
            'if(kendali == "tidak", concat("Kekhawatiran tentang ", hal, " ada di luar kendalimu. Tulis di jurnal, akui rasanya, lalu kembalikan perhatian ke napas atau ke hal kecil di depanmu (Bab 5)."), if(kapan == "sekarang", concat("Untuk ", hal, ": pilih satu langkah terkecil yang bisa kamu lakukan dalam 10 menit, lalu kerjakan sekarang atau tulis jamnya."), if(kapan == "nanti", concat("Untuk ", hal, ": tulis rencananya di kertas, lalu simpan untuk waktu khawatirmu besok (Bab 4). Malam ini tidak perlu diselesaikan."), concat("Untuk ", hal, ": ini masih “bagaimana kalau”. Tulis kemungkinan terburuk, terbaik, dan yang paling mungkin. Biasanya yang paling mungkin jauh lebih ringan."))))',
          format: "text",
          show: true,
        },
      ],
      recommendations: [
        {
          when: 'kendali == "sebagian"',
          text: "Pisahkan bagian yang bisa kamu kendalikan dari yang tidak. Kerjakan bagian pertama, relakan bagian kedua.",
          variant: "info",
        },
        {
          when: 'kapan == "mungkin"',
          text: "Dalam satu penelitian, lebih dari 90% kekhawatiran orang dengan kecemasan berlebih ternyata tidak terjadi.",
          variant: "tip",
        },
      ],
    },
  },
];
