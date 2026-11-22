/** Ebook demo yang ditulis lengkap (slug → bab + infografis). Sisanya di katalog berisi kosong. */

import { BURNOUT_1 } from "./burnout-1.mjs";
import { BURNOUT_FIGURES } from "./burnout-figures.mjs";
import { CV_1 } from "./cv-1.mjs";
import { CV_FIGURES } from "./cv-figures.mjs";
import { DARURAT_1 } from "./darurat-1.mjs";
import { DARURAT_FIGURES } from "./darurat-figures.mjs";
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
import { MINGGU_1 } from "./minggu-1.mjs";
import { MINGGU_FIGURES } from "./minggu-figures.mjs";
import { NEGO_1 } from "./nego-1.mjs";
import { NEGO_FIGURES } from "./nego-figures.mjs";
import { OVERTHINKING_1 } from "./overthinking-1.mjs";
import { OVERTHINKING_FIGURES } from "./overthinking-figures.mjs";
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

export const FULL_BOOKS = {
  "lepas-dari-jerat-paylater": {
    chapters: [...PAYLATER_1, ...PAYLATER_2, ...PAYLATER_3],
    figures: FIGURES,
  },
  "lepas-dari-scroll-tanpa-ujung": {
    chapters: [...SCROLL_1, ...SCROLL_2],
    figures: SCROLL_FIGURES,
  },
  "berani-bilang-tidak": {
    chapters: [...TIDAK_1, ...TIDAK_2],
    figures: TIDAK_FIGURES,
  },
  "keluar-dari-lingkaran-overthinking": {
    chapters: OVERTHINKING_1,
    figures: OVERTHINKING_FIGURES,
  },
  "hitung-harga-jual-yang-untung": {
    chapters: HARGA_1,
    figures: HARGA_FIGURES,
  },
  "kurangi-gula-tanpa-menderita": {
    chapters: GULA_1,
    figures: GULA_FIGURES,
  },
  "berani-nego-gaji": {
    chapters: NEGO_1,
    figures: NEGO_FIGURES,
  },
  "mengasuh-tanpa-teriak": {
    chapters: TERIAK_1,
    figures: TERIAK_FIGURES,
  },
  "seminggu-dalam-satu-jam": {
    chapters: MINGGU_1,
    figures: MINGGU_FIGURES,
  },
  "stoik-untuk-hidup-sehari-hari": {
    chapters: STOIK_1,
    figures: STOIK_FIGURES,
  },
  "dana-darurat-dari-nol": {
    chapters: DARURAT_1,
    figures: DARURAT_FIGURES,
  },
  "burnout-bukan-lemah": {
    chapters: BURNOUT_1,
    figures: BURNOUT_FIGURES,
  },
  "dari-rebahan-ke-lari-5k": {
    chapters: LARI_1,
    figures: LARI_FIGURES,
  },
  "cv-yang-dilirik-rekruter": {
    chapters: CV_1,
    figures: CV_FIGURES,
  },
  "berhenti-menunda-mulai-hari-ini": {
    chapters: TUNDA_1,
    figures: TUNDA_FIGURES,
  },
  "gajian-kok-cepat-habis": {
    chapters: GAJIAN_1,
    figures: GAJIAN_FIGURES,
  },
  "bicara-di-depan-umum-tanpa-gemetar": {
    chapters: PANGGUNG_1,
    figures: PANGGUNG_FIGURES,
  },
  "anak-dan-gawai": {
    chapters: GAWAI_1,
    figures: GAWAI_FIGURES,
  },
  "umur-25-dan-merasa-tertinggal": {
    chapters: TERTINGGAL_1,
    figures: TERTINGGAL_FIGURES,
  },
  "validasi-ide-sebelum-modal-habis": {
    chapters: VALIDASI_1,
    figures: VALIDASI_FIGURES,
  },
};
