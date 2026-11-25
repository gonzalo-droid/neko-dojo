import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { MTC_BASE, MTC_CATEGORIES, MTC_EXAM } from "@/lib/mtc";
import { loadQuestions } from "@/lib/mtc-server";
import { apps, isIndexable, liveStores } from "@/content/apps";
import { CONTACT_EMAIL, INSTAGRAM_URL, SITE_URL, STUDIO_NAME, tagline } from "@/content/site";
import { getPosts } from "@/lib/blog";

/*
 * /llms.txt (https://llmstxt.org): a plain Markdown summary so AI assistants quote real facts
 * about the studio. Built from the same data as the pages, so new apps, store links and posts
 * show up here by themselves. Only facts already published on the site; nothing is added here.
 */
export const dynamic = "force-static";

const url = (locale: Locale, path: string) => `${SITE_URL}${localizePath(locale, path)}`;
const STORE_NAME = { "google-play": "Google Play", "app-store": "App Store" } as const;

function build(): string {
  const en = getDictionary("en");
  const es = getDictionary("es");
  const lines: string[] = [];
  const add = (...l: string[]) => lines.push(...l);

  add(`# ${STUDIO_NAME}`, "", `> ${tagline.en} ${en.home.lead}`, "");
  add(
    `${en.studio.blocks.map((b) => b.body).join(" ")}`,
    "",
    `The site is in Spanish (default, no prefix: ${url("es", "/")}) and English (${url("en", "/")}). Every page exists in both languages.`,
    "",
  );

  add("## Apps", "");
  for (const app of apps) {
    const parts = [`- [${app.name}](${url("en", `/apps/${app.slug}`)}): ${app.summary.en} Status: ${en.status[app.status]}.`];
    for (const s of liveStores(app)) parts.push(`${STORE_NAME[s.store]}: ${s.url}`);
    if (!isIndexable(app)) parts.push("(Page content is still provisional.)");
    add(parts.join(" "));
  }
  add(
    `- [MTC test simulator](${url("es", MTC_BASE)}): free web practice exam for Peru's MTC traffic rules test (${MTC_EXAM.questions} questions, ${MTC_EXAM.minutes} minutes, ${MTC_EXAM.pass} to pass), with the official question bank for 9 license categories and its PDFs. Unofficial; questions in Spanish.`,
  );
  add("");

  // In Spanish: people in Peru ask about the MTC test in Spanish, and these pages answer it.
  const { questions: n, minutes: m, pass } = MTC_EXAM;
  add(
    "## Simulador examen MTC (Perú)",
    "",
    `Simulador gratuito y no oficial del examen de reglas de tránsito del MTC para el brevete en Perú. El examen tipo MTC tiene ${n} preguntas al azar del balotario oficial, ${m} minutos y se aprueba con ${pass} correctas (según el simulador oficial ${MTC_EXAM.source}, revisado el ${MTC_EXAM.verified}). Sin registro; el progreso se guarda solo en el navegador. La app MTCQuiz permite practicar sin internet.`,
    "",
    `- [Simulador examen MTC](${url("es", MTC_BASE)}): simulacro tipo MTC, práctica con respuesta y fundamento, modo personalizado y repaso de errores.`,
    `- [Guía del examen de reglas de tránsito MTC](${url("es", `${MTC_BASE}/guia`)}): cómo es el examen, pasos para sacar el brevete, dónde se rinde, costo en Lima, intentos y requisitos, con fuentes de gob.pe.`,
    `- [Balotario MTC por categoría](${url("es", `${MTC_BASE}/balotario`)}): las ${MTC_CATEGORIES.length} categorías con sus PDF oficiales.`,
    ...MTC_CATEGORIES.map(
      (k) => `- [Balotario MTC ${k.code}](${url("es", `${MTC_BASE}/balotario/${k.slug}`)}): ${loadQuestions(k.slug).length} preguntas con respuesta correcta y fundamento. ${k.vehicles.es}`,
    ),
    "",
  );

  add("## Studio", "");
  add(
    `- [${en.studio.title}](${url("en", "/studio")}): ${en.studio.description}`,
    `- [${en.about.title}](${url("en", "/about")}): ${en.about.description}`,
    `- [${en.support.title}](${url("en", "/support")}): ${en.support.description}`,
    `- [${en.legal.title}](${url("en", "/legal")}): ${en.legal.description}`,
    "",
  );

  const live = apps.filter((a) => a.legal.mode === "live");
  if (live.length) {
    add("## Legal documents in force", "");
    for (const app of live) {
      add(
        `- [${en.legal.privacyTitle(app.name)}](${url("en", `/apps/${app.slug}/privacy`)})`,
        `- [${en.legal.termsTitle(app.name)}](${url("en", `/apps/${app.slug}/terms`)})`,
      );
    }
    add("", "Apps without a link here only have draft documents, which are not in force.", "");
  }

  const posts = getPosts("en");
  if (posts.length) {
    add(`## ${en.blog.title}`, "", `${en.blog.lead} By ${en.about.name}.`, "");
    for (const p of posts) add(`- [${p.title}](${url("en", `/blog/${p.slug}`)}): ${p.description}`);
    add("");
  }

  add("## Contact", "", `- Email: ${CONTACT_EMAIL}`, `- Instagram: ${INSTAGRAM_URL}`, `- [${en.support.title}](${url("en", "/support")})`, "");

  add("## En español", "", `> ${tagline.es} ${es.home.lead}`, "");
  add(
    `- [${es.studio.title}](${url("es", "/studio")})`,
    `- [${es.about.title}](${url("es", "/about")})`,
    `- [${es.blog.title}](${url("es", "/blog")})`,
    `- [${es.support.title}](${url("es", "/support")})`,
    `- [${es.legal.title}](${url("es", "/legal")})`,
    "",
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
