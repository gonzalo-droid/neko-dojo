"use client";

import { useState } from "react";
import Link from "next/link";

export type DirectoryRow = {
  slug: string;
  name: string;
  tagline: string;
  available: boolean;
  status: React.ReactNode;
  icon: React.ReactNode;
  platforms: string;
  links: { href: string; label: string }[];
  href: string;
};

type Labels = { filter: string; all: string; available: string; upcoming: string; platforms: string; empty: string };
type Filter = "all" | "available" | "upcoming";

/** Status filter + one row per app with its platforms and direct links. */
export default function AppDirectory({ rows, labels }: { rows: DirectoryRow[]; labels: Labels }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = rows.filter((r) => filter === "all" || (filter === "available" ? r.available : !r.available));
  const options: { value: Filter; label: string }[] = [
    { value: "all", label: labels.all },
    { value: "available", label: labels.available },
    { value: "upcoming", label: labels.upcoming },
  ];

  return (
    <>
      <div role="group" aria-label={labels.filter} className="mt-10 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={filter === o.value}
            onClick={() => setFilter(o.value)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
              filter === o.value ? "border-accent bg-accent text-on-accent" : "border-line text-muted hover:border-accent hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line" aria-live="polite">
        {shown.map((r) => (
          <li key={r.slug} className="grid gap-4 py-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] md:items-center">
            <div className="flex min-w-0 items-center gap-4">
              {r.icon}
              <div className="min-w-0">
                <Link href={r.href} className="font-display text-xl font-bold text-ink hover:text-accent">{r.name}</Link>
                <p className="text-sm text-muted">{r.tagline}</p>
                <div className="mt-1 text-muted">{r.status}</div>
              </div>
            </div>
            <p className="text-sm text-muted">
              <span className="block text-xs font-semibold uppercase tracking-wide text-ink/70">{labels.platforms}</span>
              {r.platforms}
            </p>
            <ul className="flex flex-wrap gap-2 text-sm md:justify-end">
              {r.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center rounded-md border border-line px-3 hover:border-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {shown.length === 0 && <li className="py-10 text-muted">{labels.empty}</li>}
      </ul>
    </>
  );
}
