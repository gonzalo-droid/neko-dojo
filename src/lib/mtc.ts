import type { Locale } from "@/i18n/config";

/**
 * MTC theory test simulator: categories, exam rules and question types.
 * The question banks live in public/apps/mtcquiz/simulador/data/<slug>.json and come from the
 * MTCQuiz app via `npm run sync:mtc` (scripts/sync-mtc.mjs). Don't edit them by hand.
 */

export type MtcQuestion = {
  id: number;
  section: string | null;
  topic: string | null;
  q: string;
  /** As published, with their own "a)" … "d)" letters. */
  options: string[];
  /** Index into options. */
  answer: number;
  /** Legal basis ("fundamento"), when the bank has one. */
  basis: string | null;
  /** File names in IMG_BASE. */
  images: string[];
};

export type CategorySlug = "a-i" | "a-iia" | "a-iib" | "a-iiia" | "a-iiib" | "a-iiic" | "b-iia" | "b-iib" | "b-iic";

export type MtcCategory = {
  slug: CategorySlug;
  /** Name used on the license and by most guides. */
  code: string;
  /** How the official simulator (sierdgtt.mtc.gob.pe) labels it. */
  officialCode: string;
  licenseClass: "A" | "B";
  /** Short, reference-only summary of what the license is for. */
  vehicles: Record<Locale, string>;
};

export const MTC_CATEGORIES: MtcCategory[] = [
  { slug: "a-i", code: "A-I", officialCode: "A-I", licenseClass: "A", vehicles: { es: "Autos y camionetas de uso particular.", en: "Private cars and pickups." } },
  { slug: "a-iia", code: "A-IIa", officialCode: "AII-A", licenseClass: "A", vehicles: { es: "Taxis, ambulancias y transporte de personas en autos y camionetas.", en: "Taxis, ambulances and passenger transport in cars and vans." } },
  { slug: "a-iib", code: "A-IIb", officialCode: "AII-B", licenseClass: "A", vehicles: { es: "Microbuses, minibuses y camiones medianos.", en: "Minibuses and medium trucks." } },
  { slug: "a-iiia", code: "A-IIIa", officialCode: "AIII-A", licenseClass: "A", vehicles: { es: "Ómnibus de transporte de pasajeros.", en: "Passenger buses." } },
  { slug: "a-iiib", code: "A-IIIb", officialCode: "AIII-B", licenseClass: "A", vehicles: { es: "Camiones y vehículos de carga pesada.", en: "Trucks and heavy cargo vehicles." } },
  { slug: "a-iiic", code: "A-IIIc", officialCode: "AIII-C", licenseClass: "A", vehicles: { es: "Todos los vehículos de la clase A, incluidos buses y camiones pesados.", en: "Every class A vehicle, including buses and heavy trucks." } },
  { slug: "b-iia", code: "B-IIa", officialCode: "BII-A", licenseClass: "B", vehicles: { es: "Bicimotos.", en: "Mopeds." } },
  { slug: "b-iib", code: "B-IIb", officialCode: "BII-B", licenseClass: "B", vehicles: { es: "Motocicletas, también con sidecar.", en: "Motorcycles, including with a sidecar." } },
  { slug: "b-iic", code: "B-IIc", officialCode: "BII-C", licenseClass: "B", vehicles: { es: "Mototaxis y vehículos de tres ruedas.", en: "Motorcycle taxis and three-wheelers." } },
];

/**
 * The real test, as the official simulator states it (checked on VERIFIED).
 * One source says 36 to pass; the official simulator says 35, so 35 it is.
 */
export const MTC_EXAM = {
  questions: 40,
  minutes: 40,
  pass: 35,
  verified: "2026-11-25",
  source: "https://sierdgtt.mtc.gob.pe/",
} as const;

/** Pass mark for any length, at the official ratio (35/40 = 87.5 %). */
export function passMark(total: number): number {
  return Math.ceil((total * MTC_EXAM.pass) / MTC_EXAM.questions);
}

export const MTC_BASE = "/apps/mtcquiz/simulador";
export const DATA_BASE = `${MTC_BASE}/data`;
export const IMG_BASE = `${MTC_BASE}/img`;
export const PDF_BASE = `${MTC_BASE}/pdf`;

export const pdfPath = (slug: CategorySlug) => `${PDF_BASE}/balotario-mtc-${slug}.pdf`;
/** The app's vehicle picture for a category (704×384 webp, transparent). */
export const CAT_IMAGE = { width: 704, height: 384 } as const;
export const catImage = (slug: CategorySlug) => `${MTC_BASE}/cat/${slug}.webp`;

export function getCategory(slug: string): MtcCategory | undefined {
  return MTC_CATEGORIES.find((c) => c.slug === slug);
}

/** "A" from "a) Texto", so the UI can show the letter apart from the text. */
export function splitOption(option: string): { letter: string; text: string } {
  const m = option.match(/^([a-z])\)\s*([\s\S]*)$/i);
  return m ? { letter: m[1].toLowerCase(), text: m[2] } : { letter: "", text: option };
}
