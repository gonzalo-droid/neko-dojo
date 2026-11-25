"use client";

import { useSyncExternalStore } from "react";
import { localizePath, type Locale } from "@/i18n/config";
import { MTC_BASE, getCategory } from "@/lib/mtc";
import { simulatorContent } from "../simulator-content";
import { clearProgress, rawItem, readSession, saveSession, subscribe } from "../simulator-store";

type Props = { locale: Locale };

// Snapshots must be stable strings for useSyncExternalStore; parsed below.
const snap = () => `${rawItem("history") ?? "[]"}|${rawItem("mistakes") ?? "{}"}|${rawItem("session") ?? ""}`;

/**
 * Returning visitors only: an unfinished exam and the results saved in this browser, as a short
 * band under the hero. Renders nothing on the server or for a first visit.
 */
export default function ProgressPanel({ locale }: Props) {
  const c = simulatorContent[locale].progress;
  const setup = simulatorContent[locale].setup;
  const modes = setup.modes;
  const raw = useSyncExternalStore(subscribe, snap, () => null);
  if (raw === null) return null;
  const [h, m, s] = raw.split("|");
  let history: { cat: string; mode: keyof typeof modes; total: number; correct: number; passed: boolean | null; at: number }[] = [];
  let mistakes: Record<string, number[]> = {};
  try {
    history = JSON.parse(h);
    mistakes = JSON.parse(m);
  } catch {}
  const pending = s ? readSession() : null;
  const unfinished = pending && !pending.finishedAt ? pending : null;

  const mistakeTotal = Object.values(mistakes).reduce((sum, ids) => sum + ids.length, 0);
  if (!unfinished && history.length === 0 && mistakeTotal === 0) return null;

  const graded = history.filter((a) => a.passed !== null);
  const best = history.reduce((b, a) => Math.max(b, a.total ? a.correct / a.total : 0), 0);
  const fmt = new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const examPath = localizePath(locale, `${MTC_BASE}/examen`);

  return (
    <section aria-labelledby="progress-title" className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 id="progress-title" className="font-display text-2xl font-bold text-ink">
          {c.title}
        </h2>

        {unfinished && (
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border-2 border-accent bg-canvas p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-ink">
              {setup.pending(getCategory(unfinished.cat)?.code ?? "", unfinished.answers.filter((a) => a !== null).length, unfinished.ids.length)}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={examPath} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent hover:opacity-90">
                {setup.resume}
              </a>
              <button type="button" onClick={() => saveSession(null)} className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold text-ink hover:border-accent">
                {setup.discard}
              </button>
            </div>
          </div>
        )}

        {history.length + mistakeTotal > 0 && (
          <>
            <dl className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: c.attempts, value: String(history.length) },
                { label: c.best, value: `${Math.round(best * 100)} %` },
                { label: c.passed, value: `${graded.filter((a) => a.passed).length}/${graded.length}` },
                { label: c.mistakes, value: String(mistakeTotal) },
              ].map((x) => (
                <div key={x.label} className="flex flex-col rounded-xl border border-line bg-canvas p-2.5 sm:rounded-2xl sm:p-4">
                  <dt className="order-2 text-xs leading-tight text-muted sm:text-sm">{x.label}</dt>
                  <dd className="order-1 font-display text-xl font-bold tabular-nums text-ink sm:text-3xl">{x.value}</dd>
                </div>
              ))}
            </dl>

            {/* The detail is folded so the band stays short; the setup comes right after. */}
            <details className="mt-4">
              <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-accent underline underline-offset-4">{c.recent}</summary>
              {history.length > 0 && (
                <ul className="mt-2 divide-y divide-line border-y border-line">
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
              )}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">{c.local}</p>
                <button
                  type="button"
                  onClick={() => window.confirm(c.resetConfirm) && clearProgress()}
                  className="min-h-11 self-start rounded-lg border border-line px-4 text-sm font-semibold text-ink hover:border-danger hover:text-danger"
                >
                  {c.reset}
                </button>
              </div>
            </details>
          </>
        )}
      </div>
    </section>
  );
}
