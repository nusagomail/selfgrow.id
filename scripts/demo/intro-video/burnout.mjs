/**
 * Video pengantar "Burnout Bukan Lemah" (D46). Konsep: langit senja dan satu baterai besar.
 * Baterai Nadia terkuras Senin 80% sampai Jumat 8%, tiga retakan muncul untuk tiga tanda burnout
 * WHO, lalu empat jenis pemulihan dicolokkan dan mengisinya kembali. Template: burnout.html.
 * Isi ada di Bab 1, 2, dan 4.
 */
export const BURNOUT_INTRO = {
  slug: "burnout-bukan-lemah",
  template: "burnout.html",
  music: { mood: "tenang", bpm: 72 },
  captions: true,
  scenes: [
    {
      type: "week",
      say: "Senin masih delapan puluh persen. Jumat tinggal delapan. Dan akhir pekan tidak pernah cukup untuk mengisinya kembali.",
    },
    {
      type: "who",
      say: "WHO menyebut burnout sebagai fenomena pekerjaan, dengan tiga tanda: lelah berkepanjangan, menjauh dari pekerjaan, dan merasa tidak lagi mampu.",
    },
    {
      type: "recover",
      say: "Pemulihan bukan sekadar tidur. Ada empat cara: lepas dari urusan kerja, rileks, belajar hal baru, dan memegang kendali atas waktumu sendiri.",
    },
    {
      type: "end",
      say: "Burnout Bukan Lemah. Baca bab pertama, gratis.",
    },
  ],
};
