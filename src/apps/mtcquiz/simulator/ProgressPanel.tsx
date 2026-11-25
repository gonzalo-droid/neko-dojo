"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { getCategory } from "@/lib/mtc";
import { simulatorContent } from "../simulator-content";
import { clearProgress, rawItem, subscribe } from "../simulator-store";

type Props = { locale: Locale };

// Snapshots must be stable strings for useSyncExternalStore; parsed below.
const snap = () => `${rawItem("history") ?? "[]"}|${rawItem("mistakes") ?? "{}"}`;

/** Attempts and mistakes saved in this browser. Renders nothing on the server. */
export default function ProgressPanel({ locale }: Props) {
  const c = simulatorContent[locale].progress;
  const modes = simulatorContent[locale].setup.modes;
  const raw = useSyncExternalStore(subscribe, snap, () => null);
  if (raw === null) return null;
  const [h, m] = raw.split("|");
  let history: { cat: string; mode: keyof typeof modes; total: number; correct: number; passed: boolean | null; at: number }[] = [];
  let mistakes: Record<string, number[]> = {};
  try {
    history = JSON.parse(h);
    mistakes = JSON.parse(m);
  } catch {}

  const mistakeTotal = Object.values(mistakes).reduce((s, ids) => s + ids.length, 0);
  if (history.length === 0 && mistakeTotal === 0) return <p className="text-muted">{c.empty}</p>;

  const graded = history.filter((a) => a.passed !== null);
  const best = history.reduce((b, a) => Math.max(b, a.total ? a.correct / a.total : 0), 0);
  const fmt = new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: c.attempts, value: String(history.length) },
          { label: c.best, value: `${Math.round(best * 100)} %` },
          { label: c.passed, value: `${graded.filter((a) => a.passed).length}/${graded.length}` },
          { label: c.mistakes, value: String(mistakeTotal) },
        ].map((s) => (
          <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-surface p-4">
            <dt className="order-2 text-sm text-muted">{s.label}</dt>
            <dd className="order-1 font-display text-3xl font-bold tabular-nums text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>

      {history.length > 0 && (
        <>
          <h3 className="mt-8 font-semibold text-ink">{c.recent}</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {history.slice(0, 5).map((a) => (
              <li key={a.at} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 text-sm">
                <span className="font-semibold text-ink">
                  {getCategory(a.cat)?.code} · {modes[a.mode]?.title}
                </span>
                <span className="tabular-nums text-muted">{fmt.format(a.at)}</span>
                <span className={`font-semibold tabular-nums ${a.passed === false ? "text-danger" : a.passed ? "text-ok" : "text-ink"}`}>
                  {a.correct}/{a.total}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{c.local}</p>
        <button
          type="button"
          onClick={() => window.confirm(c.resetConfirm) && clearProgress()}
          className="min-h-11 self-start rounded-lg border border-line px-4 text-sm font-semibold text-ink hover:border-danger hover:text-danger"
        >
          {c.reset}
        </button>
      </div>
    </div>
  );
}
