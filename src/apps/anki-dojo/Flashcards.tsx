"use client";

import { useState } from "react";
import type { AnkiContent } from "./content";

/** Concept demo: a stack of study cards. Flips only when the visitor asks for it. */
export default function Flashcards({ c, mockLabel }: { c: AnkiContent; mockLabel: string }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = c.cards[index];

  return (
    <figure className="flex flex-col items-center">
      <div className="relative h-[300px] w-[240px] sm:h-[340px] sm:w-[270px]">
        {/* The two cards behind are the rest of the deck. */}
        <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-3 rotate-[5deg] rounded-2xl border border-line bg-surface" />
        <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-1.5 rotate-[2.5deg] rounded-2xl border border-line bg-surface" />
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={c.flip}
          aria-pressed={flipped}
          className="absolute inset-0 rounded-2xl [perspective:1000px]"
        >
          <span
            className="relative block h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]"
            style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
          >
            <span className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-line bg-surface [backface-visibility:hidden]">
              <span lang="ja" className="font-display text-7xl font-bold text-ink">{card.front}</span>
              <span className="mt-4 text-sm text-muted">{card.reading}</span>
            </span>
            <span className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-ink px-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="font-display text-3xl font-bold text-canvas">{card.back}</span>
              {/* Hanko-style stamp */}
              <span aria-hidden="true" className="mt-6 flex h-12 w-12 items-center justify-center rounded-md border-2 border-accent font-display text-lg font-bold text-accent">
                覚
              </span>
            </span>
          </span>
        </button>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            setFlipped(false);
            setIndex((i) => (i + 1) % c.cards.length);
          }}
          className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent"
        >
          {c.next}
        </button>
        <span className="text-xs text-muted" aria-live="polite">{index + 1} / {c.cards.length}</span>
      </div>
      <figcaption className="mt-3 text-xs text-muted">{mockLabel} · {c.flip}</figcaption>
    </figure>
  );
}
