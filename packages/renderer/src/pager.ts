/**
 * Mesin halaman ebook (D37): isi bab ditata dalam kolom CSS selebar layar, lalu dibalik per
 * halaman dengan efek kertas (lembar berputar pada tulang buku, mengikuti jari saat digeser).
 * Tanpa React dan tanpa dependency, dipakai reader di `app` dan pratinjau bab gratis di `site`.
 * Hanya mengatur gaya, transform, dan salinan DOM (cloneNode); tidak pernah menulis HTML.
 */

export type PagerLayout = {
  /** Kolom per layar: 1 di HP, 2 (buku terbuka) di layar lebar. */
  cols: number;
  /** Margin kiri-kanan tiap halaman (px). */
  pad: number;
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
const TURN_MS = 620;
/** Lembar yang sudah terbuka melewati batas ini saat jari dilepas akan diselesaikan. */
const COMMIT_AT = 0.22;
const INTERACTIVE = "a,button,input,select,textarea,summary,label,[role=button]";

export function layoutFor(width: number, spreadMinWidth = 900): PagerLayout {
  const w = Math.max(1, width);
  const cols = w >= spreadMinWidth ? 2 : 1;
  const pad = w < 480 ? 22 : w < spreadMinWidth ? 36 : 44;
  const step = w / cols;
  return { cols, pad, colWidth: Math.max(1, step - 2 * pad), step };
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
  /** Kolom (slot layar) tempat engsel lembar: lembar menempati slot ini saat sudut 0. */
  leafSlot: number;
  /** Halaman di muka & punggung lembar (null = kertas kosong). */
  front: number;
  back: number | null;
  /** Slot yang ditahan menampilkan halaman lama selama lembar berputar. */
  pin: { slot: number; page: number } | null;
  /** Kapan alur teks di bawah lembar pindah ke layar tujuan. */
  flowJumps: "start" | "end";
};

/**
 * Rencana membalik satu lembar dari layar `screen` ke arah `dir`. Murni (tanpa DOM) supaya
 * mudah diuji. Sudut lembar: maju 0 → -180 derajat, mundur -180 → 0 derajat.
 */
export function planTurn(screen: number, dir: 1 | -1, cols: number): TurnPlan {
  const target = screen + dir;
  const leafSlot = cols - 1;
  if (cols === 1) {
    return dir === 1
      ? { leafSlot, front: screen, back: null, pin: null, flowJumps: "start" }
      : { leafSlot, front: target, back: null, pin: null, flowJumps: "end" };
  }
  return dir === 1
    ? {
        // Halaman kanan berputar ke kiri; halaman kiri lama ditahan sampai tertutup.
        leafSlot,
        front: screen * 2 + 1,
        back: target * 2,
        pin: { slot: 0, page: screen * 2 },
        flowJumps: "start",
      }
    : {
        // Halaman kiri berputar kembali ke kanan; halaman kanan lama ditahan.
        leafSlot,
        front: target * 2 + 1,
        back: screen * 2,
        pin: { slot: 1, page: screen * 2 + 1 },
        flowJumps: "start",
      };
}

/**
 * Sudut lembar (derajat) untuk kemajuan 0..1. Kemajuan dipetakan ke posisi tepi kertas
 * (bukan sudut) supaya tepi lembar bergerak rata mengikuti jari, seperti kertas sungguhan.
 */
export function leafAngle(dir: 1 | -1, progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  const edge = dir === 1 ? 1 - 2 * p : 2 * p - 1;
  return -(Math.acos(Math.min(1, Math.max(-1, edge))) * 180) / Math.PI;
}

const easeOut = (t: number) => 1 - (1 - t) ** 3;

type Turn = {
  dir: 1 | -1;
  target: number;
  plan: TurnPlan;
  progress: number;
  leaf: HTMLElement;
  frontShade: HTMLElement;
  backShade: HTMLElement;
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
    s.padding = `0 ${layout.pad}px`;
    s.columnCount = String(layout.cols);
    s.columnGap = `${layout.pad * 2}px`;
    s.columnFill = "auto";
    viewport.style.perspective = `${Math.round(Math.max(1400, layout.step * 3.2))}px`;
    viewport.classList.add("is-paged");
    viewport.classList.toggle("is-spread", layout.cols > 1);
    if (!marker) return;
    // Selisih dua rect tidak terpengaruh transform yang sedang berlaku.
    const offset = marker.getBoundingClientRect().left - flow.getBoundingClientRect().left;
    pages = pagesFor(offset, layout);
  };

  // --- Lembar kertas --------------------------------------------------------------------------

  /** Salinan isi bab yang hanya menampilkan satu halaman (untuk muka lembar / halaman tertahan). */
  const pageLayer = (page: number | null, className: string) => {
    const el = document.createElement("div");
    el.className = className;
    el.setAttribute("aria-hidden", "true");
    if (page !== null && page < pages) {
      const copy = flow.cloneNode(true) as HTMLElement;
      copy.inert = true;
      copy.style.transform = `translate3d(${-page * layout.step}px,0,0)`;
      el.append(copy);
    }
    return el;
  };

  const slotStyle = (el: HTMLElement, slot: number) => {
    el.style.left = `${slot * layout.step}px`;
    el.style.width = `${layout.step}px`;
  };

  const render = (t: Turn) => {
    const angle = leafAngle(t.dir, t.progress);
    const lift = Math.sin((Math.abs(angle) * Math.PI) / 180);
    t.leaf.style.transform = `rotateY(${angle}deg)`;
    t.leaf.style.boxShadow = `0 0 ${Math.round(30 * lift)}px rgb(0 0 0 / ${(0.28 * lift).toFixed(3)})`;
    t.frontShade.style.opacity = (0.9 * lift).toFixed(3);
    t.backShade.style.opacity = (0.7 * lift).toFixed(3);
    t.cast.style.opacity = (0.8 * lift).toFixed(3);
  };

  const startTurn = (dir: 1 | -1): Turn | null => {
    const target = current + dir;
    if (target < 0 || target >= screens()) return null;
    const plan = planTurn(current, dir, layout.cols);

    const leaf = document.createElement("div");
    leaf.className = "book-leaf";
    slotStyle(leaf, plan.leafSlot);
    const front = pageLayer(plan.front, "book-face");
    const back = pageLayer(plan.back, "book-face book-face-back");
    const frontShade = document.createElement("div");
    frontShade.className = "book-shade";
    const backShade = document.createElement("div");
    backShade.className = "book-shade book-shade-back";
    front.append(frontShade);
    back.append(backShade);
    leaf.append(front, back);

    // Bayangan lembar yang jatuh di halaman bawahnya.
    const cast = document.createElement("div");
    cast.className = "book-cast";
    slotStyle(cast, plan.leafSlot);

    const layers: HTMLElement[] = [];
    if (plan.pin) {
      const pin = pageLayer(plan.pin.page, "book-pin");
      slotStyle(pin, plan.pin.slot);
      layers.push(pin);
    }
    layers.push(cast, leaf);
    viewport.append(...layers);
    if (plan.flowJumps === "start") showScreen(target);

    const t: Turn = {
      dir,
      target,
      plan,
      progress: 0,
      leaf,
      frontShade,
      backShade,
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
    const duration = Math.max(120, TURN_MS * Math.abs(goal - from));
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
    // Tepi kertas mengikuti jari. Di HP tepi bergerak sedikit lebih cepat dari jari supaya
    // satu geseran pendek cukup untuk membalik.
    const span = layout.step * (layout.cols === 1 ? 1 : 1.5);
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
