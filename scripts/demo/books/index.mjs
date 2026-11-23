/** Ebook demo yang ditulis lengkap (slug → bab + infografis). Sisanya di katalog berisi kosong. */

import { BURNOUT_1 } from "./burnout-1.mjs";
import { BURNOUT_FIGURES } from "./burnout-figures.mjs";
import { CV_1 } from "./cv-1.mjs";
import { CV_FIGURES } from "./cv-figures.mjs";
import { DARURAT_1 } from "./darurat-1.mjs";
import { DARURAT_FIGURES } from "./darurat-figures.mjs";
import { FOKUS_1 } from "./fokus-1.mjs";
import { FOKUS_FIGURES } from "./fokus-figures.mjs";
import { GAJIAN_1 } from "./gajian-1.mjs";
import { GAJIAN_FIGURES } from "./gajian-figures.mjs";
import { GAWAI_1 } from "./gawai-1.mjs";
import { GAWAI_FIGURES } from "./gawai-figures.mjs";
import { GULA_1 } from "./gula-1.mjs";
import { GULA_FIGURES } from "./gula-figures.mjs";
import { HARGA_1 } from "./harga-1.mjs";
import { HARGA_FIGURES } from "./harga-figures.mjs";
import { LARI_1 } from "./lari-1.mjs";
import { LARI_FIGURES } from "./lari-figures.mjs";
import { MENABUNG_1 } from "./menabung-1.mjs";
import { MENABUNG_FIGURES } from "./menabung-figures.mjs";
import { MINGGU_1 } from "./minggu-1.mjs";
import { MINGGU_FIGURES } from "./minggu-figures.mjs";
import { NEGO_1 } from "./nego-1.mjs";
import { NEGO_FIGURES } from "./nego-figures.mjs";
import { OVERTHINKING_1 } from "./overthinking-1.mjs";
import { OVERTHINKING_FIGURES } from "./overthinking-figures.mjs";
import { PAGI_1 } from "./pagi-1.mjs";
import { PAGI_FIGURES } from "./pagi-figures.mjs";
import { PANGGUNG_1 } from "./panggung-1.mjs";
import { PANGGUNG_FIGURES } from "./panggung-figures.mjs";
import { PAYLATER_1 } from "./paylater-1.mjs";
import { PAYLATER_2 } from "./paylater-2.mjs";
import { PAYLATER_3 } from "./paylater-3.mjs";
import { FIGURES } from "./paylater-figures.mjs";
import { SCROLL_1 } from "./scroll-1.mjs";
import { SCROLL_2 } from "./scroll-2.mjs";
import { SCROLL_FIGURES } from "./scroll-figures.mjs";
import { STOIK_1 } from "./stoik-1.mjs";
import { STOIK_FIGURES } from "./stoik-figures.mjs";
import { TERIAK_1 } from "./teriak-1.mjs";
import { TERIAK_FIGURES } from "./teriak-figures.mjs";
import { TERTINGGAL_1 } from "./tertinggal-1.mjs";
import { TERTINGGAL_FIGURES } from "./tertinggal-figures.mjs";
import { TIDAK_1 } from "./tidak-1.mjs";
import { TIDAK_2 } from "./tidak-2.mjs";
import { TIDAK_FIGURES } from "./tidak-figures.mjs";
import { TUNDA_1 } from "./tunda-1.mjs";
import { TUNDA_FIGURES } from "./tunda-figures.mjs";
import { VALIDASI_1 } from "./validasi-1.mjs";
import { VALIDASI_FIGURES } from "./validasi-figures.mjs";
import { WAWANCARA_1 } from "./wawancara-1.mjs";
import { WAWANCARA_FIGURES } from "./wawancara-figures.mjs";

/** Isi lengkap per slug, dengan tema baca per buku (D51) yang mengikuti identitas infografisnya. */
export const FULL_BOOKS = {
  "lepas-dari-jerat-paylater": {
    theme: {
      accent: "#b4521d",
      second: "#2f6f9e",
      heading: "condensed",
      callout: "card",
      ornament: "line",
      paper: "plain",
    },
    chapters: [...PAYLATER_1, ...PAYLATER_2, ...PAYLATER_3],
    figures: FIGURES,
  },
  "lepas-dari-scroll-tanpa-ujung": {
    theme: {
      accent: "#3b5bdb",
      second: "#d9480f",
      heading: "sans",
      callout: "bar",
      ornament: "dots",
      paper: "grid",
    },
    chapters: [...SCROLL_1, ...SCROLL_2],
    figures: SCROLL_FIGURES,
  },
  "berani-bilang-tidak": {
    theme: {
      accent: "#d1492a",
      second: "#1f8a85",
      heading: "serif",
      callout: "card",
      ornament: "star",
      paper: "dots",
    },
    chapters: [...TIDAK_1, ...TIDAK_2],
    figures: TIDAK_FIGURES,
  },
  "keluar-dari-lingkaran-overthinking": {
    theme: {
      accent: "#4b4fa8",
      second: "#7c6fc4",
      heading: "serif",
      callout: "soft",
      ornament: "star",
      paper: "plain",
    },
    chapters: OVERTHINKING_1,
    figures: OVERTHINKING_FIGURES,
  },
  "hitung-harga-jual-yang-untung": {
    theme: {
      accent: "#c2571a",
      second: "#2f7d4f",
      heading: "mono",
      callout: "tape",
      ornament: "dots",
      paper: "lined",
    },
    chapters: HARGA_1,
    figures: HARGA_FIGURES,
  },
  "kurangi-gula-tanpa-menderita": {
    theme: {
      accent: "#0f766e",
      second: "#e4572e",
      heading: "condensed",
      callout: "outline",
      ornament: "line",
      paper: "grid",
    },
    chapters: GULA_1,
    figures: GULA_FIGURES,
  },
  "berani-nego-gaji": {
    theme: {
      accent: "#9a7a2c",
      second: "#5e8f62",
      heading: "serif",
      callout: "bar",
      ornament: "line",
      paper: "plain",
    },
    chapters: NEGO_1,
    figures: NEGO_FIGURES,
  },
  "mengasuh-tanpa-teriak": {
    theme: {
      accent: "#e2553a",
      second: "#3d8fb5",
      heading: "hand",
      callout: "tape",
      ornament: "wave",
      paper: "plain",
    },
    chapters: TERIAK_1,
    figures: TERIAK_FIGURES,
  },
  "seminggu-dalam-satu-jam": {
    theme: {
      accent: "#6c5bb3",
      second: "#b08a1e",
      heading: "serif",
      callout: "tape",
      ornament: "dots",
      paper: "dots",
    },
    chapters: MINGGU_1,
    figures: MINGGU_FIGURES,
  },
  "stoik-untuk-hidup-sehari-hari": {
    theme: {
      accent: "#8f5f2c",
      second: "#5f6f52",
      heading: "serif",
      callout: "bar",
      ornament: "none",
      paper: "plain",
    },
    chapters: STOIK_1,
    figures: STOIK_FIGURES,
  },
  "dana-darurat-dari-nol": {
    theme: {
      accent: "#1f4e79",
      second: "#3f8f6b",
      heading: "mono",
      callout: "outline",
      ornament: "line",
      paper: "lined",
    },
    chapters: DARURAT_1,
    figures: DARURAT_FIGURES,
  },
  "burnout-bukan-lemah": {
    theme: {
      accent: "#d0602f",
      second: "#5f8c6c",
      heading: "serif",
      callout: "soft",
      ornament: "wave",
      paper: "plain",
    },
    chapters: BURNOUT_1,
    figures: BURNOUT_FIGURES,
  },
  "dari-rebahan-ke-lari-5k": {
    theme: {
      accent: "#c4492f",
      second: "#2f6fa8",
      heading: "condensed",
      callout: "card",
      ornament: "dots",
      paper: "plain",
    },
    chapters: LARI_1,
    figures: LARI_FIGURES,
  },
  "cv-yang-dilirik-rekruter": {
    theme: {
      accent: "#d23b2f",
      second: "#2f7d4f",
      heading: "sans",
      callout: "outline",
      ornament: "none",
      paper: "lined",
    },
    chapters: CV_1,
    figures: CV_FIGURES,
  },
  "berhenti-menunda-mulai-hari-ini": {
    theme: {
      accent: "#12827a",
      second: "#c2457f",
      heading: "mono",
      callout: "bar",
      ornament: "dots",
      paper: "plain",
    },
    chapters: TUNDA_1,
    figures: TUNDA_FIGURES,
  },
  "gajian-kok-cepat-habis": {
    theme: {
      accent: "#2b6cb0",
      second: "#c26a2b",
      heading: "mono",
      callout: "outline",
      ornament: "wave",
      paper: "grid",
    },
    chapters: GAJIAN_1,
    figures: GAJIAN_FIGURES,
  },
  "bicara-di-depan-umum-tanpa-gemetar": {
    theme: {
      accent: "#8c1d2c",
      second: "#b07d12",
      heading: "serif",
      callout: "card",
      ornament: "star",
      paper: "plain",
    },
    chapters: PANGGUNG_1,
    figures: PANGGUNG_FIGURES,
  },
  "anak-dan-gawai": {
    theme: {
      accent: "#e0574f",
      second: "#3f72d6",
      heading: "hand",
      callout: "card",
      ornament: "dots",
      paper: "dots",
    },
    chapters: GAWAI_1,
    figures: GAWAI_FIGURES,
  },
  "umur-25-dan-merasa-tertinggal": {
    theme: {
      accent: "#b9643c",
      second: "#5c7a5a",
      heading: "serif",
      callout: "outline",
      ornament: "wave",
      paper: "plain",
    },
    chapters: TERTINGGAL_1,
    figures: TERTINGGAL_FIGURES,
  },
  "validasi-ide-sebelum-modal-habis": {
    theme: {
      accent: "#3f7d64",
      second: "#c0392b",
      heading: "mono",
      callout: "tape",
      ornament: "line",
      paper: "grid",
    },
    chapters: VALIDASI_1,
    figures: VALIDASI_FIGURES,
  },
  "seni-menabung-tanpa-tersiksa": {
    theme: {
      accent: "#0e7c86",
      second: "#d2691e",
      heading: "condensed",
      callout: "soft",
      ornament: "wave",
      paper: "dots",
    },
    chapters: MENABUNG_1,
    figures: MENABUNG_FIGURES,
  },
  "pagi-yang-menang": {
    theme: {
      accent: "#c8641a",
      second: "#3d6fb6",
      heading: "hand",
      callout: "outline",
      ornament: "star",
      paper: "lined",
    },
    chapters: PAGI_1,
    figures: PAGI_FIGURES,
  },
  "fokus-di-era-notifikasi": {
    theme: {
      accent: "#9c5a1f",
      second: "#2f6f9e",
      heading: "sans",
      callout: "tape",
      ornament: "line",
      paper: "grid",
    },
    chapters: FOKUS_1,
    figures: FOKUS_FIGURES,
  },
  "lolos-wawancara-kerja": {
    theme: {
      accent: "#b3261e",
      second: "#2b6777",
      heading: "mono",
      callout: "card",
      ornament: "star",
      paper: "plain",
    },
    chapters: WAWANCARA_1,
    figures: WAWANCARA_FIGURES,
  },
};
