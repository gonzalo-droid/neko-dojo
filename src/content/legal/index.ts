import type { Locale } from "@/i18n/config";
import type { AppSlug } from "@/content/apps";
import { animequoteLegal } from "./animequote";
import { draftDoc } from "./drafts";
import type { LegalDoc } from "./types";

export type { LegalDoc, Block } from "./types";

export function getLegalDoc(slug: AppSlug, kind: "privacy" | "terms", locale: Locale): LegalDoc {
  if (slug === "animequote") return animequoteLegal[kind][locale];
  return draftDoc(slug, kind, locale);
}
