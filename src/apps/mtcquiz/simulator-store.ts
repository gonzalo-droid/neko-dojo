"use client";

import type { CategorySlug } from "@/lib/mtc";

/**
 * The simulator's state lives only in this browser (localStorage): the exam in progress,
 * past attempts and the mistakes to review. Every access is guarded, because storage can be
 * blocked or full; the simulator still works for the current page without it.
 */

export type Mode = "exam" | "practice" | "custom" | "mistakes";

export type Session = {
  v: 1;
  cat: CategorySlug;
  mode: Mode;
  /** Question ids in the order they are asked. */
  ids: number[];
  /** Chosen option index per question, null while unanswered. */
  answers: (number | null)[];
  /** Practice modes: questions already checked (feedback shown). */
  checked: boolean[];
  current: number;
  startedAt: number;
  /** Time limit in minutes; null = no clock. */
  minutes: number | null;
  finishedAt?: number;
};

export type Attempt = { cat: CategorySlug; mode: Mode; total: number; correct: number; passed: boolean | null; at: number; seconds: number };

const SESSION = "mtc-sim-session";
const HISTORY = "mtc-sim-history";
const MISTAKES = "mtc-sim-mistakes";
const CHANGE = "mtc-sim-change";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  window.dispatchEvent(new Event(CHANGE));
}

/** Raw stored string, stable between renders (useSyncExternalStore snapshots must be). */
export function rawItem(key: "session" | "history" | "mistakes"): string | null {
  try {
    return localStorage.getItem({ session: SESSION, history: HISTORY, mistakes: MISTAKES }[key]);
  } catch {
    return null;
  }
}

export const readSession = () => {
  const s = read<Session | null>(SESSION, null);
  return s?.v === 1 ? s : null;
};
export const saveSession = (s: Session | null) => write(SESSION, s);

export const readHistory = () => read<Attempt[]>(HISTORY, []);
/** Newest first, capped so storage never grows without limit. */
export const pushAttempt = (a: Attempt) => write(HISTORY, [a, ...readHistory()].slice(0, 50));

export const readMistakes = () => read<Partial<Record<CategorySlug, number[]>>>(MISTAKES, {});
/** Wrong answers join the list; right answers leave it. */
export function updateMistakes(cat: CategorySlug, wrong: number[], right: number[]) {
  const all = readMistakes();
  const set = new Set(all[cat] ?? []);
  wrong.forEach((id) => set.add(id));
  right.forEach((id) => set.delete(id));
  write(MISTAKES, { ...all, [cat]: [...set] });
}

export function clearProgress() {
  write(HISTORY, null);
  write(MISTAKES, null);
}

/** For useSyncExternalStore: fires on changes from this tab and from other tabs. */
export function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Fisher–Yates on a copy. */
export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
