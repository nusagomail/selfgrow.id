/**
 * Video pengantar "Kurangi Gula Tanpa Menderita": video pertama yang dirancang khusus (D46).
 * Konsep: satu toples ukur di atas kertas periksa sepanjang video. Kubus gula jatuh mengikuti
 * hari contoh (68 g), label dibaca langsung (ilmu yang dibawa pulang: gula × sajian ÷ 4),
 * lalu kubus keluar saat pilihan ditukar (26 g). Template sendiri: gula.html.
 * Semua angka ada di buku (Bab 2, 4, 5, 6).
 */
export const GULA_INTRO = {
  slug: "kurangi-gula-tanpa-menderita",
  template: "gula.html",
  music: { mood: "hangat", bpm: 92 },
  captions: true,
  scenes: [
    {
      type: "hook",
      say: "Coba tebak. Berapa sendok gula yang kamu makan kemarin? Kebanyakan dari kita hanya menghitung gula yang dituang sendiri.",
    },
    {
      type: "day",
      say: "Teh manis pagi, dua sendok. Es kopi susu gula aren. Susu cokelat sebotol. Kue sore. Tidak ada yang terasa berlebihan. Tapi totalnya enam puluh delapan gram. Tujuh belas sendok teh.",
    },
    {
      type: "label",
      say: "Rahasianya ada di tiga baris label. Takaran saji, jumlah sajian, dan gula. Dua belas gram, kali dua sajian, jadi dua puluh empat gram. Bagi empat: enam sendok teh.",
    },
    {
      type: "limits",
      say: "Kemenkes menganjurkan paling banyak lima puluh gram sehari. WHO, idealnya dua puluh lima.",
    },
    {
      type: "swap",
      say: "Kabar baiknya, kamu tidak perlu berhenti ngopi. Susu cokelat diganti susu tawar. Kopinya, gulanya setengah. Teh cukup satu sendok. Enam puluh delapan gram, jadi dua puluh enam.",
    },
    {
      type: "ladder",
      say: "Lalu turunkan sedikit demi sedikit, seperempat setiap minggu. Lidahmu akan menyesuaikan.",
    },
    {
      type: "end",
      say: "Kurangi Gula Tanpa Menderita. Baca bab pertama, gratis.",
    },
  ],
};
