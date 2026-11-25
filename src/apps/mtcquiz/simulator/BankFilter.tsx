"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { useHeaderOffset } from "./useHeaderOffset";

type Props = { topics: string[]; total: number; listId: string; labels: { search: string; placeholder: string; topic: string; allTopics: string; showing: string; noResults: string } };

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/**
 * Search and topic filter over the server-rendered list: it only hides items, so every
 * question stays in the HTML for search engines and the page ships no extra data.
 */
export default function BankFilter({ topics, total, listId, labels }: Props) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [shown, setShown] = useState(total);
  const top = useHeaderOffset();
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function apply(nextQuery: string, nextTopic: string) {
    setQuery(nextQuery);
    setTopic(nextTopic);
    const q = norm(nextQuery.trim());
    let n = 0;
    document.querySelectorAll<HTMLElement>(`#${listId} > [data-topic]`).forEach((el) => {
      const ok = (!nextTopic || el.dataset.topic === nextTopic) && (!q || norm(el.textContent ?? "").includes(q));
      el.hidden = !ok;
      if (ok) n++;
    });
    setShown(n);
    // GA4's standard search event, once the visitor stops typing: shows what people look for.
    const term = nextQuery.trim();
    if (term === query.trim()) return;
    clearTimeout(searchTimer.current);
    if (term.length >= 3) searchTimer.current = setTimeout(() => track("search", { search_term: term, results: n }), 1500);
  }

  return (
    <div style={{ top }} className="sticky z-20 -mx-4 border-b border-line bg-canvas/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <label className="block">
          <span className="sr-only">{labels.search}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => apply(e.target.value, topic)}
            placeholder={labels.placeholder}
            className="min-h-11 w-full rounded-lg border border-line bg-surface px-4 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="sr-only">{labels.topic}</span>
          <select value={topic} onChange={(e) => apply(query, e.target.value)} className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-ink focus:border-accent focus:outline-none">
            <option value="">{labels.allTopics}</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="mt-2 text-sm text-muted">
        {shown === 0 ? labels.noResults : labels.showing.replace("{shown}", String(shown)).replace("{total}", String(total))}
      </p>
    </div>
  );
}
