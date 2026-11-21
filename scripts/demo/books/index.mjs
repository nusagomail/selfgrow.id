/** Ebook demo yang ditulis lengkap (slug → bab + infografis). Sisanya di katalog berisi kosong. */
import { PAYLATER_1 } from "./paylater-1.mjs";
import { PAYLATER_2 } from "./paylater-2.mjs";
import { PAYLATER_3 } from "./paylater-3.mjs";
import { FIGURES } from "./paylater-figures.mjs";

export const FULL_BOOKS = {
  "lepas-dari-jerat-paylater": {
    chapters: [...PAYLATER_1, ...PAYLATER_2, ...PAYLATER_3],
    figures: FIGURES,
  },
};
