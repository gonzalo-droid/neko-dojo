"use client";

import { useEffect, useRef, useState } from "react";

// Pixel figures on an 11x11 grid, as [col,row] cells.
const N = 11;
const all: [number, number][] = [];
for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) all.push([c, r]);
const fromArt = (rows: string[]) =>
  rows.flatMap((row, r) => [...row].flatMap((ch, c): [number, number][] => (ch === "#" ? [[c, r]] : [])));

const shapes: Record<string, [number, number][]> = {
  // The studio cat (CatMark), with its eyes cut out.
  cat: all.filter(([c, r]) => {
    const ear = r === 0 ? c === 0 || c === 10 : r === 1 ? c <= 1 || c >= 9 : r === 2 ? c <= 2 || c >= 8 : true;
    return ear && !(r === 6 && [3, 4, 6, 7].includes(c));
  }),
  phone: all.filter(([c, r]) => {
    if (c < 2 || c > 8) return false;
    const frame = r === 0 || r === 10 || c === 2 || c === 8;
    const screen = r >= 1 && r <= 8 && c >= 3 && c <= 7;
    return frame || screen || (r === 9 && c === 5);
  }),
  // A four-point sparkle, the usual mark for AI, with a small one beside it.
  spark: fromArt([
    ".....#...#.",
    ".....#..###",
    "....###..#.",
    "....###....",
    "..#######..",
    "###########",
    "..#######..",
    "....###....",
    "....###....",
    ".....#.....",
    ".....#.....",
  ]),
  // An infinity loop: building, shipping and improving.
  cycle: fromArt([
    "...........",
    "...........",
    ".###...###.",
    "#####.#####",
    "##..###..##",
    "##...#...##",
    "##..###..##",
    "#####.#####",
    ".###...###.",
    "...........",
    "...........",
  ]),
};

// Each app's own accent, so the first figure is literally the six apps.
const APPS = ["#6D4AE0", "#3949AB", "#1A3A6B", "#7A1D12", "#B5361F", "#FF6B3D"];
const ORDER = ["apps", "cat", "phone", "spark", "cycle"];
const HOLD = 1700, MORPH = 950, SPREAD = 350, SEG = HOLD + MORPH + SPREAD, TOTAL = SEG * ORDER.length;
const COUNT = shapes.cat.length, PER = Math.ceil(COUNT / APPS.length);
const PAUSE = "M4 3h3v10H4zM9 3h3v10H9z", PLAY = "M5 3l8 5-8 5z";

/**
 * Hero art: one block per pixel, coloured by the apps, that keep rebuilding
 * the apps, the studio cat, a phone, the AI sparkle and an infinity loop.
 * Loops for 15 s, so it has a pause button (WCAG 2.2.2); reduced motion shows the cat still.
 */
export default function BlockLoop({ label, pauseLabel, playLabel }: { label: string; pauseLabel: string; playLabel: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<SVGSVGElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const stage = stageRef.current!, layer = blocksRef.current!, linksSvg = linksRef.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let anims: Animation[] = [], offscreen = false;

    const sync = () => anims.forEach((a) => (pausedRef.current || offscreen || document.hidden ? a.pause() : a.play()));
    syncRef.current = sync;

    function build() {
      const keep = anims[0]?.currentTime ?? 0;
      anims.forEach((a) => a.cancel());
      anims = [];
      layer.replaceChildren();
      linksSvg.replaceChildren();
      // Colours come from the theme, so the art follows light and dark.
      const css = getComputedStyle(stage);
      const accent = css.getPropertyValue("--app-accent").trim(), canvas = css.getPropertyValue("--app-canvas").trim();
      const ink = css.getPropertyValue("--app-ink").trim(), gold = css.getPropertyValue("--app-accent2").trim();
      const violet = [accent, `color-mix(in srgb, ${accent} 82%, ${canvas})`];
      const colour = (fig: string, c: number, r: number) => {
        if (fig === "phone") return c >= 3 && c <= 7 && r >= 1 && r <= 8 ? APPS[(c + r) % APPS.length] : ink;
        if (fig === "spark" && c >= 8 && r <= 2) return gold;
        return violet[(c + r) % 3 === 0 ? 1 : 0];
      };

      const W = stage.clientWidth, H = stage.clientHeight;
      const cell = Math.floor(W / 15), size = cell - 3, ox = (W - 11 * cell) / 2, oy = (H - 11 * cell) / 2;
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.38, mini = Math.max(6, Math.floor(cell * 0.42));
      const centres = APPS.map((_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
      });
      const at = (x: number, y: number, s: number) => `translate(${x}px,${y}px) scale(${s})`;
      // Where block i sits, its colour and opacity in each figure.
      const state = (fig: string, i: number) => {
        if (fig === "apps") {
          const app = Math.min(APPS.length - 1, Math.floor(i / PER)), k = i % PER, [x, y] = centres[app];
          return { transform: at(x - 2 * mini + (k % 4) * mini, y - 2 * mini + Math.floor(k / 4) * mini, mini / size), backgroundColor: APPS[app], opacity: 1 };
        }
        const cells = shapes[fig], [c, r] = cells[i % cells.length], shown = i < cells.length;
        return { transform: at(ox + c * cell, oy + r * cell, shown ? 1 : 0.3), backgroundColor: colour(fig, c, r), opacity: shown ? 1 : 0 };
      };
      const block = () => {
        const el = document.createElement("span");
        el.className = "absolute left-0 top-0 rounded-[3px]";
        el.style.width = el.style.height = `${size}px`;
        el.style.transformOrigin = "0 0";
        layer.appendChild(el);
        return el;
      };

      if (reduced) {
        for (let i = 0; i < COUNT; i++) Object.assign(block().style, state("cat", i));
        return;
      }
      for (let i = 0; i < COUNT; i++) {
        const el = block();
        // Blocks near the middle move first, so each figure grows from its centre.
        const [c, r] = shapes.cat[i], lag = Math.min(1, Math.hypot(c - 5, r - 5) / 7.1) * SPREAD;
        const frames: Keyframe[] = [{ offset: 0, ...state("apps", i) }];
        ORDER.forEach((from, k) => {
          const to = ORDER[(k + 1) % ORDER.length], t = k * SEG + HOLD + lag;
          frames.push({ offset: t / TOTAL, ...state(from, i), easing: "cubic-bezier(.65,0,.25,1)" });
          frames.push({ offset: (t + MORPH) / TOTAL, ...state(to, i) });
        });
        frames.push({ offset: 1, ...state("apps", i) });
        anims.push(el.animate(frames, { duration: TOTAL, iterations: Infinity }));
      }
      // The links draw in while the apps sit in their clusters, then fade as the blocks leave.
      const pairs = centres.map((p, i) => [p, centres[(i + 1) % centres.length]]).concat(centres.map((p) => [p, [cx, cy]]));
      pairs.forEach(([a, b], i) => {
        const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l.setAttribute("x1", String(a[0]));
        l.setAttribute("y1", String(a[1]));
        l.setAttribute("x2", String(b[0]));
        l.setAttribute("y2", String(b[1]));
        const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        l.style.strokeDasharray = String(len);
        linksSvg.appendChild(l);
        const d0 = (150 + i * 40) / TOTAL, d1 = (650 + i * 40) / TOTAL, f0 = HOLD / TOTAL, f1 = (HOLD + 500) / TOTAL;
        anims.push(
          l.animate(
            [
              { offset: 0, strokeDashoffset: len, opacity: 1 },
              { offset: d0, strokeDashoffset: len, opacity: 1 },
              { offset: d1, strokeDashoffset: 0, opacity: 1 },
              { offset: f0, strokeDashoffset: 0, opacity: 1 },
              { offset: f1, strokeDashoffset: 0, opacity: 0 },
              { offset: 1, strokeDashoffset: 0, opacity: 0 },
            ],
            { duration: TOTAL, iterations: Infinity, easing: "ease-out" },
          ),
        );
      });
      anims.forEach((a) => (a.currentTime = keep));
      sync();
    }

    build();
    // Runs only while on screen and the tab is visible.
    const io = new IntersectionObserver(([e]) => {
      offscreen = !e.isIntersecting;
      sync();
    });
    io.observe(stage);
    document.addEventListener("visibilitychange", sync);
    let w = stage.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(stage.clientWidth - w) > 20) {
        w = stage.clientWidth;
        build();
      }
    });
    ro.observe(stage);
    // Rebuild with the new colours when the visitor switches light/dark.
    const mo = new MutationObserver(build);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", sync);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  const toggle = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    syncRef.current();
  };

  return (
    <div className="relative">
      {/* The button stays outside role="img", whose children screen readers skip. */}
      <div ref={stageRef} role="img" aria-label={label} className="relative aspect-[1/0.9] w-full">
        <svg ref={linksRef} aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible stroke-accent/35 [stroke-linecap:round] [stroke-width:1.5]" />
        <div ref={blocksRef} className="absolute inset-0" />
      </div>
      {/* Reduced motion rests on the still cat, so there is nothing to pause. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? playLabel : pauseLabel}
        className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-canvas text-muted transition-colors hover:border-accent hover:text-ink motion-reduce:hidden max-md:-right-14"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
          <path d={paused ? PLAY : PAUSE} fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
