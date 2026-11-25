import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { MTC_BASE, MTC_EXAM } from "@/lib/mtc";
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
