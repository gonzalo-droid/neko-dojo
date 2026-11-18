import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { about, getProject, platformLabel } from "@/content/about";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/content/site";
import type { StoreLink } from "@/content/apps";
import StoreButtons from "@/components/app/StoreButtons";
import { storeFromUrl } from "@/components/shared/StoreIcon";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => about.projects.map((p) => ({ locale, slug: p.slug })));
}

async function load(params: Params["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  return { locale, project };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, project } = await load(params);
  const t = getDictionary(locale).about;
  return pageMetadata({
    locale,
    path: `/about/projects/${project.slug}`,
    title: `${project.title} — ${t.caseEyebrow} · Nekodojo`,
    description: project.summary[locale],
    image: { url: project.image, alt: project.title },
  });
}

export default async function ProjectCase({ params }: Params) {
  const { locale, project } = await load(params);
  const dict = getDictionary(locale);
  const t = dict.about;
  const c = project.case[locale];
  // Store links get the same badges as the app pages; the rest (web, GitHub) stay text links.
  const storeLinks: StoreLink[] = [];
  const otherLinks: typeof project.links = [];
  for (const l of project.links) {
    const store = storeFromUrl(l.url);
    if (store) storeLinks.push({ store, url: l.url });
    else otherLinks.push(l);
  }
  const platforms = project.platforms.map((p) => platformLabel[p] ?? p);

  const index = about.projects.findIndex((p) => p.slug === project.slug);
  const prev = about.projects[index - 1];
  const next = about.projects[index + 1];
  const caseHref = (slug: string) => localizePath(locale, `/about/projects/${slug}`);

  const sections = [
    [t.caseContext, c.context],
    [t.caseProblem, c.problem],
    [t.caseSolution, c.solution],
  ] as const;

  return (
    <div className="tatami">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <Link href={`${localizePath(locale, "/about")}#projects`} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-accent">
          ← {t.backToProjects}
        </Link>

        {/* Cabecera */}
        <header className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {t.caseEyebrow} · {platforms.join(" + ")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{project.summary[locale]}</p>
            {project.client && (
              <p className="mt-3 text-sm text-muted">
                {t.client}: {project.client}
              </p>
            )}
          </div>
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            priority
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="aspect-[3/2] w-full max-w-[600px] rounded-2xl bg-surface object-cover ring-1 ring-line"
          />
        </header>

        {/* Caso + ficha */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <aside className="h-fit rounded-2xl bg-surface p-6 ring-1 ring-line lg:sticky lg:top-24 lg:order-2">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-muted">{t.platforms}</dt>
                <dd className="mt-1 font-semibold text-ink">{platforms.join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-muted">{t.builtWith}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li key={tech} className="rounded-full px-2.5 py-0.5 text-xs text-ink ring-1 ring-line">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-muted">{t.links}</dt>
                <dd className="mt-1">
                  {project.links.length === 0 ? (
                    <span className="text-muted">{t.privateProject}</span>
                  ) : (
                    <div className="space-y-2">
                      {storeLinks.length > 0 && <StoreButtons stores={storeLinks} t={dict.common} size="sm" />}
                      {otherLinks.length > 0 && (
                        <ul className="space-y-1">
                          {otherLinks.map((l) => (
                            <li key={l.url}>
                              <a
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
                              >
                                {l.label} ↗
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </aside>

          <article className="max-w-prose lg:order-1">
            {sections.map(([label, paras]) => (
              <section key={label} className="mb-10 last:mb-0">
                <h2 className="font-display text-2xl font-bold tracking-tight">{label}</h2>
                {paras.map((para) => (
                  <p key={para} className="mt-3 leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>

        {/* Navegación entre casos */}
        <nav aria-label={t.projectsTitle} className="mt-16 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
          {prev ? (
            <Link href={caseHref(prev.slug)} className="group flex min-h-11 flex-col rounded-xl p-3 -m-3 hover:bg-surface">
              <span className="text-xs text-muted">← {t.prevCase}</span>
              <span className="font-display font-bold group-hover:text-accent">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={caseHref(next.slug)}
              className="group flex min-h-11 flex-col rounded-xl p-3 -m-3 hover:bg-surface sm:items-end sm:text-right"
            >
              <span className="text-xs text-muted">{t.nextCase} →</span>
              <span className="font-display font-bold group-hover:text-accent">{next.title}</span>
            </Link>
          )}
        </nav>

        {/* Contacto */}
        <section className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface p-6 ring-1 ring-line md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">{t.caseCtaTitle}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-5 py-2.5 font-semibold text-on-accent">
              {t.contactCta} · WhatsApp
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
