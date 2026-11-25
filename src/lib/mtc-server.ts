// Server only: reads files from disk at build time.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA_BASE, type CategorySlug, type MtcQuestion } from "./mtc";

const cache = new Map<CategorySlug, MtcQuestion[]>();

/** A category's question bank, read from the synced JSON at build time. */
export function loadQuestions(slug: CategorySlug): MtcQuestion[] {
  if (!cache.has(slug)) {
    const file = join(process.cwd(), "public", DATA_BASE, `${slug}.json`);
    cache.set(slug, (JSON.parse(readFileSync(file, "utf8")) as { questions: MtcQuestion[] }).questions);
  }
  return cache.get(slug)!;
}

/** Topics in the order they first appear in the bank. */
export function topicsOf(questions: MtcQuestion[]): string[] {
  return [...new Set(questions.map((q) => q.topic).filter((t): t is string => !!t))];
}
