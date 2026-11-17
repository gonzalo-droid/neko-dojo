import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { about, platformLabel } from "@/content/about";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/content/site";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: `${t.about.title} — Nekodojo`, description: t.about.description });
}

export default async function About({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale).about;

  return (
    <div className="tatami">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {/* Perfil */}
        <section className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <Image
            src="/about/gonzalo.webp"
            alt={t.photoAlt}
            width={200}
            height={200}
            priority
            className="h-40 w-40 rounded-2xl object-cover ring-1 ring-line md:h-52 md:w-52"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.eyebrow}</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">{t.name}</h1>
            <p className="mt-2 font-display text-xl text-muted">{t.role}</p>
            {about.bio.map((p) => (
              <p key={p.es} className="mt-6 max-w-3xl leading-relaxed text-ink">{p[locale]}</p>
            ))}
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{about.personal[locale]}</p>
          </div>
        </section>

        {/* Experiencia */}
        <section className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">{t.experienceTitle}</h2>
              <p className="mt-2 text-muted">{about.experienceLead[locale]}</p>
            </div>
            <a
              href={about.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent"
            >
              {t.cv}
            </a>
          </div>
          <ol className="mt-10 space-y-8 border-l border-accent/40 pl-6">
            {about.experience.map((job) => (
              <li key={job.company.es} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                <p className="text-sm text-muted">{job.period[locale]}</p>
                <h3 className="mt-1 font-display text-xl font-bold">
                  {job.role[locale]} · <span className="text-accent">{job.company[locale]}</span>
                </h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted">{job.desc[locale]}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Proyectos */}
        <section id="projects" className="mt-24 scroll-mt-24">
          <h2 className="font-display text-3xl font-bold tracking-tight">{t.projectsTitle}</h2>
          <p className="mt-2 text-muted">{t.projectsLead}</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {about.projects.map((p) => (
              <li key={p.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-shadow focus-within:ring-2 focus-within:ring-accent hover:ring-accent">
                  <Image src={p.image} alt="" width={600} height={400} className="aspect-[3/2] w-full object-cover" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-bold">
                      <Link
                        href={localizePath(locale, `/about/projects/${p.slug}`)}
                        className="outline-none after:absolute after:inset-0 after:content-['']"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    {p.client && (
                      <p className="mt-1 text-sm text-muted">
                        {t.client}: {p.client}
                      </p>
                    )}
                    <p className="mt-3 leading-snug text-ink">{p.summary[locale]}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.platforms}>
                      {p.platforms.map((pl) => (
                        <li key={pl} className="rounded-full px-2.5 py-0.5 text-xs text-muted ring-1 ring-line">
                          {platformLabel[pl] ?? pl}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-5 text-sm font-semibold text-accent" aria-hidden>
                      {t.seeCase} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Servicios */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-bold tracking-tight">{t.servicesTitle}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {about.services.map((s) => (
              <div key={s.title.es} className="border-t border-accent/40 pt-6">
                <h3 className="font-display text-xl font-bold">{s.title[locale]}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.desc[locale]}</p>
                <ul className="mt-4 space-y-1 text-sm text-ink">
                  {s.items.map((i) => (
                    <li key={i.es}>· {i[locale]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="mt-24 rounded-2xl bg-surface p-8 ring-1 ring-line md:p-12">
          <h2 className="font-display text-3xl font-bold tracking-tight">{t.contactTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.contactLead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-5 py-2.5 font-semibold text-on-accent">
              {t.contactCta} · WhatsApp
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
