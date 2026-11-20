/**
 * Mesin halaman ebook (D37): isi bab ditata dalam kolom CSS selebar layar, lalu dibalik per
 * halaman dengan efek kertas terlipat: tepi halaman terangkat dan terlipat ke arah tulang buku
 * mengikuti jari, punggung kertas terlihat, dengan bayangan di garis lipatan.
 * Tanpa React dan tanpa dependency, dipakai reader di `app` dan pratinjau bab gratis di `site`.
 * Hanya mengatur gaya, transform, dan salinan DOM (cloneNode); tidak pernah menulis HTML.
 */

export type PagerLayout = {
  /** Kolom per layar: 1 di HP, 2 (buku terbuka) di layar lebar. */
  cols: number;
  /** Margin kiri-kanan tiap halaman (px). */
  pad: number;
  /** Margin atas-bawah tiap halaman (px), di dalam kertas. */
  vpad: number;
  /** Lebar teks tiap halaman (px). */
  colWidth: number;
  /** Lebar satu halaman (px) = lebar layar / kolom. */
  step: number;
};

export type PagerState = {
  /** Layar ke- (0-based). Di mode dua halaman, satu layar = dua halaman. */
  screen: number;
  screens: number;
  /** Nomor halaman pertama & terakhir yang terlihat (1-based) dan total halaman. */
  first: number;
  last: number;
  pages: number;
  cols: number;
};

export type PagerOptions = {
  /** Posisi awal: layar ke-, "end" (halaman terakhir), atau { fraction } 0..1. */
  startAt?: number | "end" | { fraction: number };
  /** Lebar minimal untuk tampilan dua halaman. */
  spreadMinWidth?: number;
  onChange?: (state: PagerState) => void;
  /** Dipanggil saat membalik melewati halaman pertama / terakhir. */
  onEdge?: (direction: "prev" | "next") => void;
  /** Ketukan di tengah layar (mis. menyembunyikan menu). */
  onTapCenter?: () => void;
  /** Elemen yang mendengar tombol panah. Default: window. */
  keyTarget?: HTMLElement | Window;
};

export type Pager = {
  next: () => void;
  prev: () => void;
  goTo: (screen: number) => void;
  relayout: () => void;
  state: () => PagerState;
  destroy: () => void;
};

const SWIPE_MIN_PX = 40;
const DRAG_START_PX = 8;
const TURN_MS = 680;
/** Lembar yang sudah terbuka melewati batas ini saat jari dilepas akan diselesaikan. */
const COMMIT_AT = 0.22;
const INTERACTIVE = "a,button,input,select,textarea,summary,label,[role=button]";

export function layoutFor(width: number, spreadMinWidth = 900): PagerLayout {
  const w = Math.max(1, width);
  const cols = w >= spreadMinWidth ? 2 : 1;
  const pad = w < 480 ? 22 : w < spreadMinWidth ? 36 : 44;
  const step = w / cols;
  const vpad = w < 480 ? 28 : 44;
  return { cols, pad, vpad, colWidth: Math.max(1, step - 2 * pad), step };
}

/** Jumlah halaman dari posisi penanda akhir (px dari tepi kiri alur teks). */
export function pagesFor(markerOffset: number, layout: PagerLayout): number {
  return Math.max(1, Math.floor(Math.max(0, markerOffset) / layout.step) + 1);
}

export function screensFor(pages: number, cols: number): number {
  return Math.max(1, Math.ceil(pages / Math.max(1, cols)));
}

export function clampScreen(screen: number, screens: number): number {
  if (!Number.isFinite(screen)) return 0;
  return Math.min(Math.max(0, Math.round(screen)), Math.max(0, screens - 1));
}

/** Posisi baca 0..1 (dipakai untuk menyimpan progres dan mempertahankan posisi saat tata ulang). */
export function fractionOf(screen: number, screens: number): number {
  return screens <= 1 ? 0 : Math.min(1, Math.max(0, screen / (screens - 1)));
}

export function screenAtFraction(fraction: number, screens: number): number {
  return clampScreen(Math.min(1, Math.max(0, fraction)) * (screens - 1), screens);
}

export function stateFor(screen: number, pages: number, cols: number): PagerState {
  const screens = screensFor(pages, cols);
  const s = clampScreen(screen, screens);
  const first = s * cols + 1;
  return { screen: s, screens, first, last: Math.min(pages, first + cols - 1), pages, cols };
}

export type TurnPlan = {
  /** Sisi lembar yang terangkat: "right" = tepi kanan terlipat ke kiri (maju), "left" sebaliknya. */
  side: "right" | "left";
  /** Slot layar (kolom) tempat lembar yang dibalik. */
  sheetSlot: number;
  /** Halaman di muka lembar yang dibalik. */
  turning: number;
  /** Punggung lembar: halaman lain (buku terbuka) atau cermin samar muka lembar (HP). */
  back: number | "mirror";
  /** Slot yang ditahan menampilkan halaman lama selama lembar dibalik. */
  pin: { slot: number; page: number } | null;
  /** Layar yang ditampilkan alur teks di bawah lembar selama dibalik. */
  under: "target" | "current";
  /** Mundur di HP = animasi maju yang diputar balik (lembar sebelumnya kembali menutup). */
  reverse: boolean;
};

/** Rencana membalik satu lembar dari layar `screen` ke arah `dir`. Murni, tanpa DOM. */
export function planTurn(screen: number, dir: 1 | -1, cols: number): TurnPlan {
  const target = screen + dir;
  if (cols === 1) {
    return dir === 1
      ? {
          side: "right",
          sheetSlot: 0,
          turning: screen,
          back: "mirror",
          pin: null,
          under: "target",
          reverse: false,
        }
      : {
          side: "right",
          sheetSlot: 0,
          turning: target,
          back: "mirror",
          pin: null,
          under: "current",
          reverse: true,
        };
  }
  return dir === 1
    ? {
        side: "right",
        sheetSlot: 1,
        turning: screen * 2 + 1,
        back: target * 2,
        pin: { slot: 0, page: screen * 2 },
        under: "target",
        reverse: false,
      }
    : {
        side: "left",
        sheetSlot: 0,
        turning: screen * 2,
        back: target * 2 + 1,
        pin: { slot: 1, page: screen * 2 + 1 },
        under: "target",
        reverse: false,
      };
}

export type FoldGeometry = {
  /** Posisi tepi bebas kertas (mengikuti jari). */
  edge: number;
  /** Garis lipatan. */
  fold: number;
  /** Bagian muka lembar yang masih rata [kiri, kanan]. */
  visible: [number, number];
  /** Bagian kertas yang terlipat (punggungnya terlihat) [kiri, kanan]. */
  flap: [number, number];
};

/**
 * Geometri lipatan untuk lembar selebar [left, right] dengan kemajuan q 0..1. Lipatan selalu di
 * tengah antara tepi bebas dan posisi awal tepi itu, seperti kertas yang ditekuk rata.
 */
export function foldGeometry(
  side: "right" | "left",
  left: number,
  right: number,
  q: number,
): FoldGeometry {
  const t = Math.min(1, Math.max(0, q));
  const w = right - left;
  if (side === "right") {
    const edge = right - 2 * w * t;
    const fold = (edge + right) / 2;
    return { edge, fold, visible: [left, fold], flap: [edge, fold] };
  }
  const edge = left + 2 * w * t;
  const fold = (edge + left) / 2;
  return { edge, fold, visible: [fold, right], flap: [fold, edge] };
}

const easeOut = (t: number) => 1 - (1 - t) ** 3;

type Turn = {
  dir: 1 | -1;
  target: number;
  plan: TurnPlan;
  progress: number;
  sheet: HTMLElement;
  flap: HTMLElement;
  flapInner: HTMLElement;
  flapShade: HTMLElement;
  foldShade: HTMLElement;
  cast: HTMLElement;
  layers: HTMLElement[];
  raf: number | null;
  /** Arah animasi yang sedang berjalan (1 = selesaikan, 0 = batalkan). */
  goal: 0 | 1 | null;
};

/**
 * Pasang mode halaman pada `viewport` (pembungkus, overflow tersembunyi) dan `flow` (isi bab).
 * `flow` wajib berisi elemen `.book-marker` di posisi paling akhir isi (boleh di dalam halaman
 * penutup) untuk menghitung jumlah halaman.
 */
export function createPager(
  viewport: HTMLElement,
  flow: HTMLElement,
  options: PagerOptions = {},
): Pager {
  const marker = flow.querySelector<HTMLElement>(".book-marker");
  let layout = layoutFor(viewport.clientWidth, options.spreadMinWidth);
  let pages = 1;
  let current = 0;
  let initialized = false;
  let destroyed = false;
  let turn: Turn | null = null;
  const reducedMotion =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const screens = () => screensFor(pages, layout.cols);
  const state = () => stateFor(current, pages, layout.cols);
  const emit = () => options.onChange?.(state());

  const showScreen = (screen: number) => {
    flow.style.transform = `translate3d(${-screen * layout.step * layout.cols}px,0,0)`;
  };

  const measure = () => {
    layout = layoutFor(viewport.clientWidth, options.spreadMinWidth);
    const s = flow.style;
    s.boxSizing = "border-box";
    s.width = `${layout.step * layout.cols}px`;
    s.height = "100%";
    s.padding = `${layout.vpad}px ${layout.pad}px`;
    s.columnCount = String(layout.cols);
    s.columnGap = `${layout.pad * 2}px`;
    s.columnFill = "auto";
    viewport.classList.add("is-paged");
    viewport.classList.toggle("is-spread", layout.cols > 1);
    if (!marker) return;
    // Selisih dua rect tidak terpengaruh transform yang sedang berlaku.
    const offset = marker.getBoundingClientRect().left - flow.getBoundingClientRect().left;
    pages = pagesFor(offset, layout);
  };

  // --- Kertas terlipat ------------------------------------------------------------------------

  /** Salinan isi bab yang menampilkan satu halaman di [0, lebar halaman] (cloneNode, inert). */
  const pageCopy = (page: number) => {
    const copy = flow.cloneNode(true) as HTMLElement;
    copy.inert = true;
    copy.setAttribute("aria-hidden", "true");
    copy.style.transform = `translate3d(${-page * layout.step}px,0,0)`;
    return copy;
  };
  const box = (className: string, left: number, width: number) => {
    const el = document.createElement("div");
    el.className = className;
    el.setAttribute("aria-hidden", "true");
    el.style.left = `${left}px`;
    el.style.width = `${Math.max(0, width)}px`;
    return el;
  };

  const render = (t: Turn) => {
    const { plan } = t;
    const step = layout.step;
    const left = plan.sheetSlot * step;
    const right = left + step;
    const q = plan.reverse ? 1 - t.progress : t.progress;
    const g = foldGeometry(plan.side, left, right, q);
    const lift = Math.sin(Math.PI * Math.min(1, Math.max(0, q)));

    // Muka lembar: hanya bagian yang masih rata.
    t.sheet.style.clipPath = `inset(0 ${right - g.visible[1]}px 0 ${g.visible[0] - left}px)`;

    // Bagian terlipat: punggung kertas.
    const [fl, fr] = g.flap;
    const fw = Math.max(0, fr - fl);
    t.flap.style.left = `${fl}px`;
    t.flap.style.width = `${fw}px`;
    t.flap.style.visibility = fw < 0.5 ? "hidden" : "visible";
    if (plan.back === "mirror") {
      // Cermin muka lembar terhadap garis lipatan (teks samar tembus kertas).
      t.flapInner.style.left = `${left - fl}px`;
      t.flapInner.style.transformOrigin = `${g.fold - left}px 0`;
      t.flapInner.style.transform = "scaleX(-1)";
    } else {
      // Buku terbuka: punggung lembar adalah halaman berikutnya, menempel di tepi bebas.
      const backLeft = plan.side === "right" ? g.edge : g.edge - step;
      t.flapInner.style.left = `${backLeft - fl}px`;
    }
    t.flapShade.style.opacity = (0.55 + 0.45 * lift).toFixed(3);
    t.flap.style.boxShadow =
      plan.side === "right"
        ? `${(-6 * lift).toFixed(1)}px 0 ${Math.round(18 * lift)}px rgb(0 0 0 / ${(0.22 * lift).toFixed(3)})`
        : `${(6 * lift).toFixed(1)}px 0 ${Math.round(18 * lift)}px rgb(0 0 0 / ${(0.22 * lift).toFixed(3)})`;

    // Bayangan lengkung di muka lembar dekat lipatan, dan bayangan jatuh di halaman bawahnya.
    const shadeW = Math.min(56, Math.max(0, g.visible[1] - g.visible[0]), step * 0.2);
    const castW = Math.min(64, step * 0.25);
    if (plan.side === "right") {
      t.foldShade.style.left = `${g.fold - shadeW}px`;
      t.cast.style.left = `${g.fold}px`;
    } else {
      t.foldShade.style.left = `${g.fold}px`;
      t.cast.style.left = `${g.fold - castW}px`;
    }
    t.foldShade.style.width = `${shadeW}px`;
    t.cast.style.width = `${castW}px`;
    t.foldShade.style.opacity = (0.9 * lift).toFixed(3);
    t.cast.style.opacity = (0.9 * lift).toFixed(3);
  };

  const startTurn = (dir: 1 | -1): Turn | null => {
    const target = current + dir;
    if (target < 0 || target >= screens()) return null;
    const plan = planTurn(current, dir, layout.cols);
    const step = layout.step;
    const left = plan.sheetSlot * step;
    const side = plan.side;

    const layers: HTMLElement[] = [];
    if (plan.pin) {
      const pin = box("book-pin", plan.pin.slot * step, step);
      if (plan.pin.page < pages) pin.append(pageCopy(plan.pin.page));
      layers.push(pin);
    }
    const sheet = box("book-sheet", left, step);
    sheet.append(pageCopy(plan.turning));
    const cast = box(`book-cast book-cast-${side}`, 0, 0);
    const foldShade = box(`book-fold-shade book-fold-shade-${side}`, 0, 0);
    const flap = box(`book-flap book-flap-${side}`, 0, 0);
    const flapInner = box("book-flap-inner", 0, step);
    const backPage = plan.back === "mirror" ? plan.turning : plan.back;
    if (backPage < pages) flapInner.append(pageCopy(backPage));
    if (plan.back === "mirror") flap.classList.add("is-mirror");
    const flapShade = box("book-flap-shade", 0, 0);
    flapShade.style.left = "";
    flapShade.style.width = "";
    flap.append(flapInner, flapShade);
    layers.push(sheet, cast, foldShade, flap);
    viewport.append(...layers);
    showScreen(plan.under === "target" ? target : current);

    const t: Turn = {
      dir,
      target,
      plan,
      progress: 0,
      sheet,
      flap,
      flapInner,
      flapShade,
      foldShade,
      cast,
      layers,
      raf: null,
      goal: null,
    };
    render(t);
    return t;
  };

  const endTurn = (t: Turn, commit: boolean) => {
    if (t.raf !== null) cancelAnimationFrame(t.raf);
    for (const el of t.layers) el.remove();
    if (turn === t) turn = null;
    if (commit) {
      current = t.target;
      showScreen(current);
      emit();
    } else showScreen(current);
  };

  const animate = (t: Turn, goal: 0 | 1) => {
    if (t.raf !== null) cancelAnimationFrame(t.raf);
    t.goal = goal;
    const from = t.progress;
    const duration = Math.max(140, TURN_MS * Math.abs(goal - from));
    const t0 = performance.now();
    const frame = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      t.progress = from + (goal - from) * easeOut(k);
      render(t);
      if (k < 1) t.raf = requestAnimationFrame(frame);
      else {
        t.raf = null;
        endTurn(t, goal === 1);
      }
    };
    t.raf = requestAnimationFrame(frame);
  };

  /** Lembar yang masih berputar langsung diselesaikan (mis. ketukan cepat beruntun). */
  const settle = () => {
    if (turn) endTurn(turn, turn.goal !== 0 && turn.progress > 0);
  };

  // --- Navigasi -------------------------------------------------------------------------------

  const relayout = () => {
    if (destroyed) return;
    settle();
    const before = initialized ? fractionOf(current, screens()) : null;
    measure();
    if (before !== null) current = screenAtFraction(before, screens());
    else {
      const start = options.startAt ?? 0;
      current =
        start === "end"
          ? screens() - 1
          : typeof start === "number"
            ? clampScreen(start, screens())
            : screenAtFraction(start.fraction, screens());
      initialized = true;
    }
    showScreen(current);
    emit();
  };

  const goTo = (screen: number) => {
    settle();
    const target = clampScreen(screen, screens());
    if (target === current) return;
    current = target;
    showScreen(current);
    emit();
  };

  const turnPage = (dir: 1 | -1) => {
    settle();
    const atEdge = dir === 1 ? current >= screens() - 1 : current <= 0;
    if (atEdge) {
      options.onEdge?.(dir === 1 ? "next" : "prev");
      return;
    }
    if (reducedMotion) {
      goTo(current + dir);
      return;
    }
    const t = startTurn(dir);
    if (!t) return;
    turn = t;
    animate(t, 1);
  };
  const next = () => turnPage(1);
  const prev = () => turnPage(-1);

  // --- Sentuhan: lembar mengikuti jari; ketuk tepi kiri/kanan untuk mundur/maju --------------
  let startX = 0;
  let startY = 0;
  let dragging = false;
  let tracking = false;
  let dragDir: 1 | -1 | null = null;

  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    settle();
    tracking = true;
    dragging = false;
    dragDir = null;
    startX = e.clientX;
    startY = e.clientY;
  };
  const onMove = (e: PointerEvent) => {
    if (!tracking || e.pointerType === "mouse") return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) < Math.abs(dy)) return;
      dragging = true;
      dragDir = dx < 0 ? 1 : -1;
      if (!reducedMotion) turn = startTurn(dragDir);
    }
    if (!turn || !dragDir) return;
    // Tepi kertas mengikuti jari, sedikit lebih cepat supaya satu geseran pendek cukup.
    const span = layout.step * 1.2;
    turn.progress = Math.min(1, Math.max(0, (-dragDir * dx) / span));
    render(turn);
  };
  const onUp = (e: PointerEvent) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    if (dragging) {
      dragging = false;
      const t = turn;
      if (t) animate(t, t.progress >= COMMIT_AT ? 1 : 0);
      else if (dragDir && Math.abs(dx) >= SWIPE_MIN_PX) turnPage(dragDir);
      dragDir = null;
      return;
    }
    if (Math.abs(dx) > DRAG_START_PX || Math.abs(e.clientY - startY) > DRAG_START_PX) return;
    if ((e.target as Element | null)?.closest?.(INTERACTIVE)) return;
    const rect = viewport.getBoundingClientRect();
    const x = (e.clientX - rect.left) / Math.max(1, rect.width);
    if (x < 0.3) prev();
    else if (x > 0.7) next();
    else options.onTapCenter?.();
  };
  const onCancel = () => {
    tracking = false;
    dragging = false;
    dragDir = null;
    if (turn) animate(turn, 0);
  };

  const keyTarget = options.keyTarget ?? window;
  const onKey = (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest?.("input,textarea,select,[contenteditable=true]")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    }
  };

  // Gambar yang selesai dimuat dan huruf web dapat mengubah jumlah halaman.
  const onLoad = () => relayout();
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onLoad);

  viewport.addEventListener("pointerdown", onDown);
  viewport.addEventListener("pointermove", onMove);
  viewport.addEventListener("pointerup", onUp);
  viewport.addEventListener("pointercancel", onCancel);
  flow.addEventListener("load", onLoad, true);
  keyTarget.addEventListener("keydown", onKey);
  resize?.observe(viewport);
  relayout();
  void document.fonts?.ready.then(onLoad);

  return {
    next,
    prev,
    goTo,
    relayout,
    state,
    destroy: () => {
      destroyed = true;
      if (turn) endTurn(turn, false);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onCancel);
      flow.removeEventListener("load", onLoad, true);
      keyTarget.removeEventListener("keydown", onKey);
      resize?.disconnect();
    },
  };
}
