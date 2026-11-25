"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { localizePath, type Locale } from "@/i18n/config";
import { CAT_IMAGE, MTC_BASE, MTC_EXAM, catImage, type CategorySlug, type MtcCategory } from "@/lib/mtc";
import { simulatorContent } from "../simulator-content";
import { rawItem, readMistakes, subscribe, type Mode } from "../simulator-store";

const COUNTS = [10, 20, 40, 60] as const;
const MINUTES = [10, 20, 40, 60] as const;

type Props = {
  locale: Locale;
  categories: (Pick<MtcCategory, "slug" | "code" | "officialCode" | "licenseClass"> & { vehicles: string; count: number })[];
};

/** Category + mode picker. Starting only builds the URL; the exam page draws the questions. */
export default function SetupForm({ locale, categories }: Props) {
  // Imported here, not passed as props: the copy has functions, which can't cross to the client.
  const c = simulatorContent[locale].setup;
  const router = useRouter();
  const [cat, setCat] = useState<CategorySlug>("a-i");
  const [mode, setMode] = useState<Mode>("exam");
  const [count, setCount] = useState<number>(20);
  const [minutes, setMinutes] = useState<number | null>(20);
  // Read once the page is in the browser; the server render shows no mistakes.
  const mistakesRaw = useSyncExternalStore(subscribe, () => rawItem("mistakes"), () => null);
  const mistakes = mistakesRaw ? readMistakes() : {};

  const mistakeCount = (slug: CategorySlug) => mistakes[slug]?.length ?? 0;
  const examPath = localizePath(locale, `${MTC_BASE}/examen`);
  const canStart = mode !== "mistakes" || mistakeCount(cat) > 0;

  function start() {
    const p = new URLSearchParams({ cat, modo: mode });
    if (mode === "practice" || mode === "custom") p.set("n", String(count));
    if (mode === "custom" && minutes) p.set("min", String(minutes));
    router.push(`${examPath}?${p}`);
  }

  const chip = (on: boolean) =>
    `min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors ${on ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-ink hover:border-accent"}`;

  return (
    <div className="space-y-10">
      <fieldset>
        <legend className="font-display text-xl font-bold text-ink">{c.category}</legend>
        <p className="mt-1 text-sm text-muted">{c.categoryHint}</p>
        {/* Two columns on phones (picture on top) so the nine licenses fit in about a screen. */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {categories.map((k) => {
            const on = k.slug === cat;
            return (
              <label
                key={k.slug}
                className={`relative flex cursor-pointer flex-col-reverse justify-end gap-2 rounded-2xl border-2 bg-surface p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:p-4 ${on ? "border-accent" : "border-line hover:border-accent/50"}`}
              >
                <input type="radio" name="cat" value={k.slug} checked={on} onChange={() => {
                    setCat(k.slug);
                    if (mode === "mistakes" && mistakeCount(k.slug) === 0) setMode("exam");
                  }} className="sr-only" />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-display text-xl font-bold text-ink sm:text-2xl">{k.code}</span>
                  <span className="mt-1 text-sm leading-snug text-muted">{k.vehicles}</span>
                  <span className="mt-2 text-xs text-muted">
                    {c.questionsCount(k.count)}
                    <span className="hidden sm:inline">
                      {" "}· {c.officialName}: <span className="font-semibold text-ink">{k.officialCode}</span>
                    </span>
                  </span>
                  {mistakeCount(k.slug) > 0 && <span className="mt-1 text-xs font-semibold text-danger">{c.mistakesCount(mistakeCount(k.slug))}</span>}
                </span>
                {/* The same vehicle the app shows for this category; the code beside it names it. */}
                <Image src={catImage(k.slug)} alt="" {...CAT_IMAGE} sizes="7rem" className="h-auto w-24 shrink-0 sm:w-28" />
                {on && (
                  <span aria-hidden="true" className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-on-accent sm:right-3 sm:top-3">
                    ✓
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl font-bold text-ink">{c.mode}</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(Object.keys(c.modes) as Mode[]).map((m) => {
            const on = m === mode;
            const disabled = m === "mistakes" && mistakeCount(cat) === 0;
            return (
              <label
                key={m}
                className={`flex gap-3 rounded-2xl border-2 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                  disabled ? "cursor-not-allowed border-dashed border-line bg-canvas" : `cursor-pointer bg-surface ${on ? "border-accent" : "border-line hover:border-accent/50"}`
                }`}
              >
                <input type="radio" name="mode" value={m} checked={on && !disabled} disabled={disabled} onChange={() => setMode(m)} className="mt-1 h-4 w-4 accent-[var(--app-accent)]" />
                <span>
                  <span className="block font-semibold text-ink">{c.modes[m].title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted">
                    {m === "mistakes" && mistakeCount(cat) === 0 ? c.noMistakes : c.modes[m].body}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        {(mode === "practice" || mode === "custom") && (
          <div className="mt-6 space-y-5">
            <div role="group" aria-label={c.customQuestions}>
              <p className="text-sm font-semibold text-ink">{c.customQuestions}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {COUNTS.map((n) => (
                  <button key={n} type="button" aria-pressed={count === n} onClick={() => setCount(n)} className={chip(count === n)}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            {mode === "custom" && (
              <div role="group" aria-label={c.customMinutes}>
                <p className="text-sm font-semibold text-ink">{c.customMinutes}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MINUTES.map((n) => (
                    <button key={n} type="button" aria-pressed={minutes === n} onClick={() => setMinutes(n)} className={chip(minutes === n)}>
                      {n}
                    </button>
                  ))}
                  <button type="button" aria-pressed={minutes === null} onClick={() => setMinutes(null)} className={chip(minutes === null)}>
                    {c.noLimit}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </fieldset>

      {/* On phones the button follows the reader down the form, so the choice is one tap from starting. */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t border-line bg-canvas/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <button
          type="button"
          onClick={start}
          disabled={!canStart}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-8 text-lg font-bold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {c.start} · {categories.find((k) => k.slug === cat)?.code}
          {mode === "exam" && ` · ${MTC_EXAM.questions}/${MTC_EXAM.minutes} min`}
        </button>
      </div>
    </div>
  );
}
