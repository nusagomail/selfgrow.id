/**
 * Rumus Tool Builder (BLUEPRINT bagian 5, Tingkat 1 no-code).
 *
 * Pemilik menulis rumus mirip spreadsheet di Studio, misalnya:
 *   pendapatan - pengeluaran
 *   round(tabungan / pendapatan * 100, 1)
 *   if(skor >= 70, "Bagus", "Perlu perbaikan")
 *
 * Rumus di-parse (tokenizer + recursive descent, TANPA eval/new Function) menjadi pohon JSON Logic,
 * lalu dievaluasi oleh evaluator dengan daftar operator tertutup dan batas langkah. Evaluasi
 * hanya terjadi di server; pohon logika tidak pernah dikirim ke klien (D8).
 */

export type Logic = number | string | boolean | null | { var: string } | { [op: string]: Logic[] };

export class FormulaError extends Error {
  constructor(
    message: string,
    public position?: number,
  ) {
    super(message);
  }
}

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------

type Token =
  | { t: "num"; v: number; p: number }
  | { t: "str"; v: string; p: number }
  | { t: "id"; v: string; p: number }
  | { t: "op"; v: string; p: number }
  | { t: "eof"; p: number };

const MAX_FORMULA_LENGTH = 1000;
const OPERATORS = [
  "<=",
  ">=",
  "==",
  "!=",
  "&&",
  "||",
  "+",
  "-",
  "*",
  "/",
  "%",
  "<",
  ">",
  "!",
  "(",
  ")",
  ",",
];

function tokenize(src: string): Token[] {
  if (src.length > MAX_FORMULA_LENGTH) throw new FormulaError("Rumus terlalu panjang");
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i] as string;
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      const m = /^(\d+(\.\d+)?|\.\d+)/.exec(src.slice(i));
      if (!m) throw new FormulaError("Angka tidak valid", i);
      out.push({ t: "num", v: Number(m[0]), p: i });
      i += m[0].length;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      let s = "";
      while (j < src.length && src[j] !== ch) {
        if (src[j] === "\\" && j + 1 < src.length) j++;
        s += src[j];
        j++;
      }
      if (j >= src.length) throw new FormulaError("Teks belum ditutup tanda kutip", i);
      out.push({ t: "str", v: s, p: i });
      i = j + 1;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i)) as RegExpExecArray;
      out.push({ t: "id", v: m[0], p: i });
      i += m[0].length;
      continue;
    }
    const op = OPERATORS.find((o) => src.startsWith(o, i));
    if (!op) throw new FormulaError(`Karakter tidak dikenal: ${ch}`, i);
    out.push({ t: "op", v: op, p: i });
    i += op.length;
  }
  out.push({ t: "eof", p: src.length });
  return out;
}

// ---------------------------------------------------------------------------
// Parser (recursive descent)
// ---------------------------------------------------------------------------

/** Fungsi yang boleh dipakai di rumus: nama -> [operator JSON Logic, jumlah argumen min, maks]. */
export const FORMULA_FUNCTIONS: Record<string, [string, number, number]> = {
  if: ["if", 3, 3],
  min: ["min", 1, 20],
  max: ["max", 1, 20],
  round: ["round", 1, 2],
  floor: ["floor", 1, 1],
  ceil: ["ceil", 1, 1],
  abs: ["abs", 1, 1],
  concat: ["cat", 1, 20],
  and: ["and", 2, 20],
  or: ["or", 2, 20],
  not: ["!", 1, 1],
};

const KEYWORDS: Record<string, Logic> = { true: true, false: false, null: null };

const MAX_PARSE_DEPTH = 40;

export function parseFormula(src: string): { logic: Logic; vars: string[] } {
  const tokens = tokenize(src);
  let pos = 0;
  let depth = 0;
  const vars = new Set<string>();

  const peek = () => tokens[pos] as Token;
  const next = () => tokens[pos++] as Token;
  const isOp = (v: string) => {
    const t = peek();
    return t.t === "op" && t.v === v;
  };
  const expect = (v: string) => {
    const t = next();
    if (t.t !== "op" || t.v !== v) throw new FormulaError(`Diharapkan "${v}"`, t.p);
  };
  const enter = () => {
    if (++depth > MAX_PARSE_DEPTH) throw new FormulaError("Rumus terlalu bertingkat");
  };

  const binary = (ops: Record<string, string>, nextLevel: () => Logic) => (): Logic => {
    let left = nextLevel();
    for (;;) {
      const t = peek();
      if (t.t !== "op" || !Object.hasOwn(ops, t.v)) return left;
      next();
      left = { [ops[t.v] as string]: [left, nextLevel()] };
    }
  };

  const primary = (): Logic => {
    enter();
    try {
      const t = next();
      if (t.t === "num") return Number.isFinite(t.v) ? t.v : null;
      if (t.t === "str") return t.v;
      if (t.t === "op" && t.v === "(") {
        const e = orExpr();
        expect(")");
        return e;
      }
      if (t.t === "op" && t.v === "-") return { "*": [-1, primary()] };
      if (t.t === "op" && t.v === "!") return { "!": [primary()] };
      if (t.t === "id") {
        if (Object.hasOwn(KEYWORDS, t.v)) return KEYWORDS[t.v] as Logic;
        if (isOp("(")) {
          const name = t.v.toLowerCase();
          const fn = Object.hasOwn(FORMULA_FUNCTIONS, name) ? FORMULA_FUNCTIONS[name] : undefined;
          if (!fn) throw new FormulaError(`Fungsi tidak dikenal: ${t.v}`, t.p);
          next();
          const args: Logic[] = [];
          if (!isOp(")")) {
            args.push(orExpr());
            while (isOp(",")) {
              next();
              args.push(orExpr());
            }
          }
          expect(")");
          const [op, min, max] = fn;
          if (args.length < min || args.length > max) {
            throw new FormulaError(`Jumlah argumen ${t.v} salah`, t.p);
          }
          return { [op]: args };
        }
        vars.add(t.v);
        return { var: t.v };
      }
      throw new FormulaError("Rumus tidak lengkap", t.p);
    } finally {
      depth--;
    }
  };

  const mul = binary({ "*": "*", "/": "/", "%": "%" }, primary);
  const add = binary({ "+": "+", "-": "-" }, mul);
  const cmp = binary({ "<": "<", "<=": "<=", ">": ">", ">=": ">=" }, add);
  const eq = binary({ "==": "==", "!=": "!=" }, cmp);
  const andExpr = binary({ "&&": "and" }, eq);
  const orExpr = binary({ "||": "or" }, andExpr);

  const logic = orExpr();
  if (peek().t !== "eof") throw new FormulaError("Ada sisa teks yang tidak dipahami", peek().p);
  return { logic, vars: [...vars] };
}

// ---------------------------------------------------------------------------
// Evaluator (daftar operator tertutup, batas langkah)
// ---------------------------------------------------------------------------

export type Value = number | string | boolean | null;

const MAX_STEPS = 10_000;

const num = (v: Value): number | null => {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v))) return Number(v);
  return null;
};
const truthy = (v: Value) => !(v === null || v === false || v === 0 || v === "");
const finite = (n: number) => (Number.isFinite(n) ? n : null);

export function evaluate(logic: Logic, data: Record<string, Value>): Value {
  let steps = 0;
  const ev = (node: Logic): Value => {
    if (++steps > MAX_STEPS) throw new FormulaError("Perhitungan terlalu panjang");
    if (node === null || typeof node !== "object") return node;
    const keys = Object.keys(node);
    if (keys.length !== 1) throw new FormulaError("Logika tidak valid");
    const op = keys[0] as string;
    const raw = (node as Record<string, unknown>)[op];
    if (op === "var") {
      const name = String(raw);
      return Object.hasOwn(data, name) ? (data[name] as Value) : null;
    }
    const args = raw as Logic[];
    if (!Array.isArray(args)) throw new FormulaError("Logika tidak valid");

    switch (op) {
      case "if":
        return truthy(ev(args[0] as Logic)) ? ev(args[1] as Logic) : ev(args[2] as Logic);
      case "and": {
        let last: Value = true;
        for (const a of args) {
          last = ev(a);
          if (!truthy(last)) return last;
        }
        return last;
      }
      case "or": {
        let last: Value = false;
        for (const a of args) {
          last = ev(a);
          if (truthy(last)) return last;
        }
        return last;
      }
    }

    const vals = args.map(ev);
    const nums = vals.map(num);
    const [a, b] = nums;
    switch (op) {
      case "+":
        return a === null || b === null ? null : finite((a as number) + (b as number));
      case "-":
        return a === null || b === null ? null : finite((a as number) - (b as number));
      case "*":
        return a === null || b === null ? null : finite((a as number) * (b as number));
      case "/":
        return a === null || b === null || b === 0 ? null : finite((a as number) / (b as number));
      case "%":
        return a === null || b === null || b === 0 ? null : finite((a as number) % (b as number));
      case "<":
      case "<=":
      case ">":
      case ">=": {
        if (a === null || b === null) return false;
        const x = a as number;
        const y = b as number;
        return op === "<" ? x < y : op === "<=" ? x <= y : op === ">" ? x > y : x >= y;
      }
      case "==":
        return vals[0] === vals[1] || (a !== null && a === b);
      case "!=":
        return !(vals[0] === vals[1] || (a !== null && a === b));
      case "!":
        return !truthy(vals[0] ?? null);
      case "min":
      case "max": {
        if (nums.some((n) => n === null)) return null;
        return op === "min" ? Math.min(...(nums as number[])) : Math.max(...(nums as number[]));
      }
      case "round": {
        if (a === null) return null;
        const d = Math.max(0, Math.min(6, Math.trunc(b ?? 0)));
        const f = 10 ** d;
        return finite(Math.round((a as number) * f) / f);
      }
      case "floor":
        return a === null ? null : finite(Math.floor(a as number));
      case "ceil":
        return a === null ? null : finite(Math.ceil(a as number));
      case "abs":
        return a === null ? null : finite(Math.abs(a as number));
      case "cat":
        return vals
          .map((v) => (v === null ? "" : String(v)))
          .join("")
          .slice(0, 5000);
      default:
        throw new FormulaError(`Operator tidak diizinkan: ${op}`);
    }
  };
  return ev(logic);
}
