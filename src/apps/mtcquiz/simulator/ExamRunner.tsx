"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { localizePath, type Locale } from "@/i18n/config";
import { track } from "@/lib/analytics";
import { CAT_IMAGE, DATA_BASE, IMG_BASE, catImage, MTC_BASE, MTC_EXAM, getCategory, passMark, splitOption, type CategorySlug, type MtcQuestion } from "@/lib/mtc";
import { simulatorContent, type SimulatorContent } from "../simulator-content";
import { useHeaderOffset } from "./useHeaderOffset";
import { pushAttempt, readMistakes, readSession, saveSession, shuffle, updateMistakes, type Mode, type Session } from "../simulator-store";

type C = Pick<SimulatorContent, "exam" | "result" | "setup">;
type Props = {
  locale: Locale;
  /** Server-rendered app promotion, shown with the result. */
  appCta: React.ReactNode;
};

type Phase = "loading" | "error" | "missing" | "running" | "done";
const MODES: Mode[] = ["exam", "practice", "custom", "mistakes"];
const isPractice = (m: Mode) => m === "practice" || m === "mistakes";

async function fetchBank(cat: CategorySlug): Promise<Map<number, MtcQuestion>> {
  const res = await fetch(`${DATA_BASE}/${cat}.json`);
  if (!res.ok) throw new Error(String(res.status));
  const { questions } = (await res.json()) as { questions: MtcQuestion[] };
  return new Map(questions.map((q) => [q.id, q]));
}

/** Builds a new session from the URL (?cat=&modo=&n=&min=), or resumes the saved one. */
function newSession(params: URLSearchParams, bank: Map<number, MtcQuestion>): Session | null {
  const cat = params.get("cat") as CategorySlug;
  const mode = (MODES.includes(params.get("modo") as Mode) ? params.get("modo") : "exam") as Mode;
  const n = Math.min(Math.max(Number(params.get("n")) || 20, 5), 100);
  const min = Number(params.get("min")) || null;
  let ids: number[];
  if (mode === "mistakes") ids = shuffle((readMistakes()[cat] ?? []).filter((id) => bank.has(id)));
  else ids = shuffle([...bank.keys()]).slice(0, mode === "exam" ? MTC_EXAM.questions : n);
  if (ids.length === 0) return null;
  return {
    v: 1,
    cat,
    mode,
    ids,
    answers: ids.map(() => null),
    checked: ids.map(() => false),
    current: 0,
    startedAt: Date.now(),
    minutes: mode === "exam" ? MTC_EXAM.minutes : mode === "custom" ? min : null,
  };
}

export default function ExamRunner({ locale, appCta }: Props) {
  // Imported here, not passed as props: the copy has functions, which can't cross to the client.
  const c: C = simulatorContent[locale];
  const params = useSearchParams();
  const [phase, setPhase] = useState<Phase>("loading");
  const [bank, setBank] = useState<Map<number, MtcQuestion> | null>(null);
  const [s, setS] = useState<Session | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [attempt, setAttempt] = useState(0);
  const hub = localizePath(locale, MTC_BASE);
  const examPath = localizePath(locale, `${MTC_BASE}/examen`);

  // Load: a URL with ?cat starts a new exam; a bare URL resumes the saved one.
  useEffect(() => {
    let cancelled = false;
    const wanted = params.get("cat");
    const saved = readSession();
    const cat = (wanted && getCategory(wanted) ? wanted : saved?.cat) as CategorySlug | undefined;
    if (!cat) {
      Promise.resolve().then(() => !cancelled && setPhase("missing"));
      return;
    }
    fetchBank(cat)
      .then((b) => {
        if (cancelled) return;
        setBank(b);
        let session = saved;
        if (wanted) {
          session = newSession(params, b);
          if (!session) return setPhase("missing");
          saveSession(session);
          track("sim_start", { category: session.cat, mode: session.mode, questions: session.ids.length });
          // Drop the query so a reload resumes this exam instead of drawing a new one.
          window.history.replaceState(null, "", examPath);
        }
        if (!session) return setPhase("missing");
        setS(session);
        setPhase(session.finishedAt ? "done" : "running");
      })
      .catch(() => !cancelled && setPhase("error"));
    return () => {
      cancelled = true;
    };
    // Runs once per load attempt; params are read at that moment on purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const update = useCallback((next: Session) => {
    setS(next);
    saveSession(next);
  }, []);

  const finish = useCallback(
    (from: Session) => {
      if (!bank || from.finishedAt) return;
      const done = { ...from, finishedAt: Date.now() };
      const qs = done.ids.map((id) => bank.get(id)!);
      const right = qs.filter((q, i) => done.answers[i] === q.answer).map((q) => q.id);
      // Unanswered questions count as mistakes in a timed exam; in practice only real misses do.
      const wrong = qs.filter((q, i) => done.answers[i] !== q.answer && (done.answers[i] !== null || !isPractice(done.mode))).map((q) => q.id);
      const total = qs.length;
      const passed = isPractice(done.mode) ? null : right.length >= passMark(total);
      updateMistakes(done.cat, wrong, right);
      pushAttempt({ cat: done.cat, mode: done.mode, total, correct: right.length, passed, at: done.finishedAt, seconds: Math.round((done.finishedAt - done.startedAt) / 1000) });
      track("sim_finish", { category: done.cat, mode: done.mode, questions: total, correct: right.length, passed: passed ?? "practice" });
      update(done);
      setPhase("done");
      window.scrollTo({ top: 0 });
    },
    [bank, update],
  );

  // Clock: ticks every second while a timed exam runs, and ends it at zero.
  const deadline = s?.minutes ? s.startedAt + s.minutes * 60_000 : null;
  const latest = useRef({ s, finish });
  useEffect(() => {
    latest.current = { s, finish };
  });
  useEffect(() => {
    if (phase !== "running" || !deadline) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= deadline && latest.current.s) latest.current.finish(latest.current.s);
    }, 1000);
    return () => clearInterval(id);
  }, [phase, deadline]);

  if (phase === "loading") return <Centered>{c.exam.loading}</Centered>;
  if (phase === "error")
    return (
      <Centered>
        <p>{c.exam.loadError}</p>
        <button type="button" onClick={() => (setPhase("loading"), setAttempt((a) => a + 1))} className="mt-4 min-h-11 rounded-lg bg-accent px-5 font-semibold text-on-accent">
          {c.exam.retry}
        </button>
      </Centered>
    );
  if (phase === "missing" || !s || !bank)
    return (
      <Centered>
        <p>{c.exam.missing}</p>
        <Link href={hub} className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-accent px-5 font-semibold text-on-accent">{c.exam.backToSetup}</Link>
      </Centered>
    );

  const questions = s.ids.map((id) => bank.get(id)!);
  if (phase === "done") return <Result locale={locale} c={c} s={s} questions={questions} appCta={appCta} />;
  return <Runner c={c} s={s} questions={questions} update={update} finish={finish} remaining={deadline ? Math.max(0, deadline - now) : null} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center text-lg text-muted">{children}</div>;
}

function Clock({ ms, label }: { ms: number; label: string }) {
  const total = Math.ceil(ms / 1000);
  const low = total <= 300;
  return (
    <span role="timer" aria-label={label} className={`rounded-lg px-3 py-1.5 font-display text-lg font-bold tabular-nums ${low ? "bg-danger text-white" : "bg-surface text-ink ring-1 ring-line"}`}>
      {String(Math.floor(total / 60)).padStart(2, "0")}:{String(total % 60).padStart(2, "0")}
    </span>
  );
}

function Images({ files, alt }: { files: string[]; alt: (i: number) => string }) {
  if (!files.length) return null;
  return (
    <div className={`mt-5 grid gap-3 ${files.length > 1 ? "grid-cols-3 sm:grid-cols-4" : ""}`}>
      {files.map((f, i) => (
        // Small official images, already webp: a plain img keeps their natural size.
        // eslint-disable-next-line @next/next/no-img-element
        <img key={f} src={`${IMG_BASE}/${f}`} alt={alt(i + 1)} loading="lazy" className={`${files.length > 1 ? "max-h-28 sm:max-h-36" : "max-h-60"} w-auto max-w-full rounded-lg border border-line bg-white object-contain p-2`} />
      ))}
    </div>
  );
}

function Runner({
  c,
  s,
  questions,
  update,
  finish,
  remaining,
}: {
  c: C;
  s: Session;
  questions: MtcQuestion[];
  update: (s: Session) => void;
  finish: (s: Session) => void;
  remaining: number | null;
}) {
  const i = s.current;
  const q = questions[i];
  const practice = isPractice(s.mode);
  const chosen = s.answers[i];
  const checked = practice && s.checked[i];
  const answeredCount = s.answers.filter((a) => a !== null).length;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const top = useHeaderOffset();

  const go = useCallback((to: number) => update({ ...s, current: Math.min(Math.max(to, 0), questions.length - 1) }), [s, update, questions.length]);
  const choose = useCallback(
    (opt: number) => {
      if (checked) return;
      const answers = [...s.answers];
      answers[i] = opt;
      const checkedNext = [...s.checked];
      // Practice reveals right away: one tap answers and shows the feedback.
      if (practice) checkedNext[i] = true;
      update({ ...s, answers, checked: checkedNext });
    },
    [checked, s, i, practice, update],
  );
  const askFinish = useCallback(() => {
    if (window.confirm(c.exam.confirmFinish(questions.length - answeredCount))) finish(s);
  }, [c.exam, questions.length, answeredCount, finish, s]);

  // Move focus to the new question so screen readers and keyboard users follow along
  // (not on the first one: the page has just loaded and focus starts at the top).
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
      const k = e.key.toLowerCase();
      const idx = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k);
      if (idx >= 0 && idx < q.options.length) return choose(idx);
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, go, i, q.options.length]);

  // Practice: the verdict appears below the options; bring it into view on small screens.
  useEffect(() => {
    if (checked) feedbackRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [checked, i]);

  const last = i === questions.length - 1;
  const correctLetter = splitOption(q.options[q.answer]).letter;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      {/* Sticky status: where you are, time left and the way out. */}
      <div style={{ top }} className="sticky z-30 -mx-4 border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink">
            {getCategory(s.cat)?.code} · {c.exam.question(i + 1, questions.length)}
          </p>
          <div className="flex items-center gap-2">
            {remaining !== null && <Clock ms={remaining} label={c.exam.timeLeft} />}
            <button type="button" onClick={askFinish} className="min-h-11 rounded-lg border border-line bg-surface px-3 text-sm font-semibold text-ink hover:border-accent">
              {c.exam.finish}
            </button>
          </div>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
        </div>
      </div>

      <article className="mt-6 rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-8">
        {q.topic && <p className="text-xs font-semibold uppercase tracking-wide text-accent">{q.topic}</p>}
        <h1
          ref={headingRef}
          tabIndex={-1}
          // Focus lands here only to announce the new question; it isn't a control, so no ring.
          style={{ outline: "none" }}
          className="mt-2 whitespace-pre-line font-display text-xl font-bold leading-snug text-ink sm:text-2xl"
        >
          {q.q}
        </h1>
        <Images files={q.images} alt={c.exam.imageAlt} />

        <div role="radiogroup" aria-labelledby={undefined} aria-label={q.q} className="mt-6 space-y-3">
          {q.options.map((o, k) => {
            const { letter, text } = splitOption(o);
            const picked = chosen === k;
            const isRight = k === q.answer;
            let tone = picked ? "border-accent bg-accent/10" : "border-line hover:border-accent/60";
            if (checked && isRight) tone = "border-ok bg-ok/10";
            else if (checked && picked) tone = "border-danger bg-danger/10";
            return (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={picked}
                disabled={checked}
                onClick={() => choose(k)}
                className={`flex min-h-14 w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-colors disabled:cursor-default ${tone}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold uppercase ${
                    checked && isRight ? "bg-ok text-white" : checked && picked ? "bg-danger text-white" : picked ? "bg-accent text-on-accent" : "bg-canvas text-ink ring-1 ring-line"
                  }`}
                >
                  {checked && isRight ? "✓" : checked && picked ? "✕" : letter || k + 1}
                </span>
                <span className="pt-0.5 leading-snug text-ink">{text}</span>
              </button>
            );
          })}
        </div>

        {checked && (
          <div ref={feedbackRef} role="status" className={`mt-5 scroll-mb-24 rounded-2xl p-4 ${chosen === q.answer ? "bg-ok/10" : "bg-danger/10"}`}>
            <p className={`font-bold ${chosen === q.answer ? "text-ok" : "text-danger"}`}>
              {chosen === q.answer ? c.exam.correct : `${c.exam.wrong} ${correctLetter})`}
            </p>
            {q.basis && (
              <p className="mt-1 text-sm text-ink">
                <span className="font-semibold">{c.exam.basis}:</span> {q.basis}
              </p>
            )}
          </div>
        )}
      </article>

      {/* Always reachable: long questions with images push the buttons below the fold. */}
      <div className="sticky bottom-0 z-30 -mx-4 mt-6 flex items-center justify-between gap-3 border-t border-line bg-canvas/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:-mx-6 sm:px-6">
        <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className="min-h-12 rounded-xl border border-line bg-surface px-5 font-semibold text-ink hover:border-accent disabled:opacity-40">
          ← {c.exam.prev}
        </button>
        {last ? (
          <button type="button" onClick={askFinish} className="min-h-12 rounded-xl bg-accent px-6 font-bold text-on-accent hover:opacity-90">
            {c.exam.finish}
          </button>
        ) : (
          <button type="button" onClick={() => go(i + 1)} className="min-h-12 rounded-xl bg-accent px-6 font-bold text-on-accent hover:opacity-90">
            {c.exam.next} →
          </button>
        )}
      </div>

      <details className="mt-8 rounded-2xl border border-line bg-surface p-4">
        <summary className="cursor-pointer font-semibold text-ink">{c.exam.navigator}</summary>
        <ol className="mt-4 grid grid-cols-8 gap-2 sm:grid-cols-10">
          {questions.map((qq, k) => {
            const a = s.answers[k];
            const state = a === null ? c.exam.unanswered : c.exam.answered;
            const tone =
              practice && s.checked[k]
                ? a === qq.answer
                  ? "bg-ok text-white"
                  : "bg-danger text-white"
                : a !== null
                  ? "bg-accent text-on-accent"
                  : "bg-canvas text-ink ring-1 ring-line";
            return (
              <li key={qq.id}>
                <button
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`${c.exam.question(k + 1, questions.length)}, ${state}`}
                  aria-current={k === i ? "step" : undefined}
                  className={`flex h-9 w-full items-center justify-center rounded-lg text-sm font-semibold tabular-nums ${tone} ${k === i ? "outline outline-2 outline-offset-2 outline-accent" : ""}`}
                >
                  {k + 1}
                </button>
              </li>
            );
          })}
        </ol>
      </details>
      <p className="mt-4 hidden text-sm text-muted sm:block">{c.exam.keyboard}</p>
    </div>
  );
}

type Filter = "all" | "wrong" | "blank";

function Result({ locale, c, s, questions, appCta }: { locale: Locale; c: C; s: Session; questions: MtcQuestion[]; appCta: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>(s.answers.some((a, k) => a !== questions[k].answer) ? "wrong" : "all");
  const [copied, setCopied] = useState(false);
  const code = getCategory(s.cat)?.code ?? "";
  const total = questions.length;
  const correct = questions.filter((q, k) => s.answers[k] === q.answer).length;
  const practice = isPractice(s.mode);
  const need = passMark(total);
  const passed = !practice && correct >= need;
  // Capped at the limit: an exam closed by the clock after a break still took "all the time".
  const elapsed = Math.round(((s.finishedAt ?? s.startedAt) - s.startedAt) / 1000);
  const secs = s.minutes ? Math.min(elapsed, s.minutes * 60) : elapsed;
  const mistakesLeft = useMemo(() => (readMistakes()[s.cat] ?? []).length, [s.cat]);
  const hub = localizePath(locale, MTC_BASE);
  const examPath = localizePath(locale, `${MTC_BASE}/examen`);
  const shareUrl = `${typeof window === "undefined" ? "" : window.location.origin}${hub}`;
  const shareText = c.result.shareText(code, correct, total, passed);

  const shown = questions
    .map((q, k) => ({ q, k, a: s.answers[k] }))
    .filter(({ q, a }) => (filter === "all" ? true : filter === "wrong" ? a !== null && a !== q.answer : a === null));

  function again(mode: Mode) {
    const p = new URLSearchParams({ cat: s.cat, modo: mode });
    if (mode === "practice" || mode === "custom") p.set("n", String(total));
    if (mode === "custom" && s.minutes) p.set("min", String(s.minutes));
    // A full load: this page is already mounted, and a new draw must start from scratch.
    window.location.assign(`${examPath}?${p}`);
  }

  async function share() {
    track("sim_share", { category: s.cat, correct, questions: total });
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
    } catch {}
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6">
      <section aria-labelledby="result-title" className="rounded-3xl border border-line bg-surface p-6 text-center shadow-sm sm:p-10">
        <Image src={catImage(s.cat)} alt="" {...CAT_IMAGE} sizes="12rem" priority className="mx-auto mb-2 h-auto w-48" />
        <h1 id="result-title" className="text-sm font-semibold uppercase tracking-wide text-muted">
          {c.result.title} · {code} · {c.setup.modes[s.mode].title}
        </h1>
        <p className="mt-4 font-display text-6xl font-bold tabular-nums text-ink sm:text-7xl">
          {correct}
          <span className="text-muted">/{total}</span>
        </p>
        {practice ? (
          <p className="mt-3 text-muted">{c.result.practiceNote}</p>
        ) : (
          <>
            <p className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-lg font-bold ${passed ? "bg-ok/15 text-ok" : "bg-danger/10 text-danger"}`}>
              {passed ? c.result.passed : c.result.failed}
            </p>
            <p className="mt-3 text-sm text-muted">{c.result.needed(need, total)}</p>
          </>
        )}
        <p className="mt-1 text-sm text-muted">{c.result.time(Math.floor(secs / 60), secs % 60)}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => again(s.mode === "mistakes" ? "practice" : s.mode)} className="min-h-12 rounded-xl bg-accent px-5 font-bold text-on-accent hover:opacity-90">
            {c.result.again}
          </button>
          {mistakesLeft > 0 && (
            <button type="button" onClick={() => again("mistakes")} className="min-h-12 rounded-xl border-2 border-accent px-5 font-bold text-accent hover:bg-accent/10">
              {c.result.practiceMistakes(mistakesLeft)}
            </button>
          )}
          <button type="button" onClick={share} className="min-h-12 rounded-xl border border-line px-5 font-semibold text-ink hover:border-accent">
            {copied ? c.result.copied : c.result.share}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("sim_share", { category: s.cat, correct, questions: total, via: "whatsapp" })}
            className="inline-flex min-h-12 items-center rounded-xl border border-line px-5 font-semibold text-ink hover:border-accent"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <div className="mt-8">{appCta}</div>

      <section aria-labelledby="review-title" className="mt-12">
        <h2 id="review-title" className="font-display text-2xl font-bold text-ink">{c.result.review}</h2>
        <div role="group" aria-label={c.result.review} className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(c.result.filters) as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${filter === f ? "border-accent bg-accent text-on-accent" : "border-line text-ink hover:border-accent"}`}
            >
              {c.result.filters[f]}
            </button>
          ))}
        </div>
        <ol className="mt-6 space-y-4">
          {shown.map(({ q, k, a }) => {
            const ok = a === q.answer;
            return (
              <li key={q.id} className={`rounded-2xl border-l-4 bg-surface p-5 ring-1 ring-line ${ok ? "border-l-ok" : "border-l-danger"}`}>
                <p className="text-xs font-semibold text-muted">
                  {c.exam.question(k + 1, total)} {q.topic && `· ${q.topic}`}
                </p>
                <p className="mt-1 whitespace-pre-line font-semibold text-ink">{q.q}</p>
                <Images files={q.images} alt={c.exam.imageAlt} />
                <dl className="mt-3 space-y-1 text-sm">
                  {!ok && (
                    <div>
                      <dt className="inline font-semibold text-danger">{c.result.yourAnswer}: </dt>
                      <dd className="inline text-ink">{a === null ? c.result.noAnswer : q.options[a]}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="inline font-semibold text-ok">{c.result.correctAnswer}: </dt>
                    <dd className="inline text-ink">{q.options[q.answer]}</dd>
                  </div>
                  {q.basis && (
                    <div>
                      <dt className="inline font-semibold text-muted">{c.exam.basis}: </dt>
                      <dd className="inline text-muted">{q.basis}</dd>
                    </div>
                  )}
                </dl>
              </li>
            );
          })}
          {shown.length === 0 && <li className="text-muted">{c.result.nothing}</li>}
        </ol>
        <Link href={hub} className="mt-8 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">
          ← {c.exam.backToSetup}
        </Link>
      </section>
    </div>
  );
}
