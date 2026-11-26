import type { Locale } from "@/i18n/config";
import type { AppSlug } from "@/content/apps";
import { animequoteLegal } from "./animequote";
import { apruebasucamecLegal } from "./apruebasucamec";
import { draftDoc } from "./drafts";
import { mtcquizLegal } from "./mtcquiz";
import { peruxhunterLegal } from "./peruxhunter";
import { subtrackLegal } from "./subtrack";
import type { LegalDoc } from "./types";

export type { LegalDoc, Block } from "./types";

export function getLegalDoc(slug: AppSlug, kind: "privacy" | "terms", locale: Locale): LegalDoc {
  if (slug === "animequote") return animequoteLegal[kind][locale];
  if (slug === "mtcquiz") return mtcquizLegal[kind][locale];
  if (slug === "apruebasucamec") return apruebasucamecLegal[kind][locale];
  if (slug === "peruxhunter") return peruxhunterLegal[kind][locale];
  if (slug === "subtrack") return subtrackLegal[kind][locale];
  return draftDoc(slug, kind, locale);
}
