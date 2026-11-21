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
];
