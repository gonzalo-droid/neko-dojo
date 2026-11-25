import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { downloadCopy, getApp, isIndexable, readyFaq } from "@/content/apps";
import { mobileApplication } from "@/lib/structured-data";
import JsonLd from "@/components/shared/JsonLd";
import { classes, HOTLINE, peruxhunterContent, SHOT, SOURCE_URL } from "@/apps/peruxhunter/content";
import AppChrome from "@/components/app/AppChrome";
import StoreButtons from "@/components/app/StoreButtons";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";

const app = getApp("peruxhunter");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = peruxhunterContent[locale];
  return pageMetadata({ locale, path: "/apps/peruxhunter", title: c.meta.title, description: c.meta.description, siteName: "Cazadores Perú", noindex: !isIndexable(app) });
}

/**
 * On the dark header band the shared components (store buttons, badges) read the ink/canvas
 * tokens, so they are swapped here: paper-on-ink, like the app's own header.
 */
const onHeader = { "--app-ink": "#efe4cc", "--app-canvas": "#16181b", "--app-muted": "#b9b5ad", "--app-line": "#2e3136", "--app-accent": "#efe4cc", "--app-warn": "#fbbf24" } as CSSProperties;

function Phone({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-[var(--ph-ink)] bg-[var(--ph-ink)] shadow-xl shadow-black/20 ${className}`}>
      <Image src={src} alt={alt} {...SHOT} sizes={sizes} priority={priority} className="h-auto w-full" />
    </div>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

/** The one red in the identity: only for calling the hotline. */
function CallButton({ label, lead }: { label: string; lead?: string }) {
  return (
    <a
      href={HOTLINE.href}
      className="inline-flex min-h-12 items-center gap-3 rounded-2xl bg-[var(--ph-action)] px-5 py-3 text-[var(--ph-on-action)] transition-opacity hover:opacity-90"
    >
      <PhoneIcon className="h-6 w-6 shrink-0" />
      {lead ? (
        <span className="flex flex-col">
          <span className="text-sm font-semibold leading-tight">{lead}</span>
          <span className="ph-cond text-2xl leading-tight sm:text-3xl">{label}</span>
        </span>
      ) : (
        <span className="font-bold">{label}</span>
      )}
    </a>
  );
}

function ClassBadge({ code, stars, bg, fg }: { code: string; stars: number; bg: string; fg: string }) {
  return (
    <span aria-hidden="true" className="inline-flex min-w-24 items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold" style={{ background: bg, color: fg }}>
      {code}
      <span className="tracking-tight">{"★".repeat(stars)}</span>
    </span>
  );
}

/** Small mono label above section titles (the app's "overline" rótulos). */
function Overline({ children, className = "text-muted" }: { children: React.ReactNode; className?: string }) {
  return <p className={`ph-mono text-xs font-semibold uppercase tracking-[0.12em] ${className}`}>{children}</p>;
}

function Check() {
  return (
    <span aria-hidden="true" className="mt-2 block h-2.5 w-2.5 shrink-0 rotate-45 bg-[var(--ph-poster-red)] dark:bg-[var(--ph-paper)]" />
  );
}

export default async function PeruXHunterPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = peruxhunterContent[locale];
  const downloadText = downloadCopy(app, locale);
  const faq = readyFaq(app.support.faq[locale]);
  const appLd = mobileApplication(app, locale);

  return (
    <AppChrome app={app} locale={locale} nav={c.nav}>
      {appLd && <JsonLd data={appLd} />}

      {/* Hero, on the app's dark header */}
      <section className="bg-[var(--ph-header)] text-[#efe4cc]" style={onHeader}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.3fr_1fr] md:pb-20 md:pt-16">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Overline className="text-[var(--ph-on-header-muted)]">{c.eyebrow}</Overline>
              <StatusBadge status={app.status} label={t.status[app.status]} className="text-[var(--ph-on-header-muted)]" />
            </div>
            <h1 className="ph-cond mt-5 text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-7xl">
              <span className="block text-white">{c.heroTitle[0]}</span>
              <span className="mt-2 block text-[var(--ph-reward)]">{c.heroTitle[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#efe4cc]/90">{c.heroBody}</p>
            <div className="mt-8">
              <CallButton label={HOTLINE.label} lead={c.hotlineLead} />
            </div>
            <div className="mt-6">
              <StoreButtons stores={app.stores} t={t.common} showPending />
            </div>
            <p className="mt-8 max-w-xl border-l-4 border-[var(--ph-reward)] pl-4 text-sm leading-relaxed text-[var(--ph-on-header-muted)]">{c.disclaimer}</p>
          </div>
          <figure className="mx-auto w-full max-w-[17rem] md:max-w-[19rem]">
            <Phone src={c.heroShot.src} alt={c.heroShot.alt} sizes="(min-width: 768px) 19rem, 17rem" priority />
            <figcaption className="mt-4 text-center text-xs leading-relaxed text-[var(--ph-on-header-muted)]">{c.shotNote}</figcaption>
          </figure>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="scroll-mt-20 border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{c.steps.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted">{c.steps.lead}</p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {c.steps.items.map((s, i) => {
              const last = i === c.steps.items.length - 1;
              return (
                <li key={s.title} className={`flex flex-col rounded-2xl border p-6 ${last ? "border-[var(--ph-action)] bg-canvas" : "border-line bg-canvas"}`}>
                  <span aria-hidden="true" className={`ph-cond text-6xl leading-none ${last ? "text-[var(--ph-action)]" : "text-accent"}`}>{i + 1}</span>
                  <h3 className="ph-cond mt-4 text-2xl text-ink">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                  {last && (
                    <div className="mt-6">
                      <CallButton label={c.steps.call} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Features: the poster and its classes */}
      <section id="funciones" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr]">
          <div className="mx-auto w-full max-w-[16rem] md:max-w-[18rem]">
            <Phone src={c.poster.shot.src} alt={c.poster.shot.alt} sizes="(min-width: 768px) 18rem, 16rem" />
          </div>
          <div>
            <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{c.poster.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{c.poster.lead}</p>
            {/* Paper card: same look in both themes, as the poster in the app */}
            <div className="mt-8 rounded-2xl border border-[var(--ph-paper-line)] bg-[var(--ph-paper)] p-6 text-[var(--ph-on-paper)]">
              <h3 className="ph-cond text-2xl">{c.poster.classesTitle}</h3>
              <ul className="mt-4 space-y-3">
                {classes.map((k) => (
                  <li key={k.code} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <ClassBadge {...k} />
                    <span className="font-semibold">
                      <span className="sr-only">{locale === "es" ? `Clase ${k.code}: ` : `Class ${k.code}: `}</span>
                      {k[locale]}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-[var(--ph-on-paper-muted)]">{c.poster.classesBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{c.search.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{c.search.lead}</p>
            <ul className="mt-8 space-y-4">
              {c.search.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-ink"><Check />{p}</li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[16rem] md:max-w-[18rem]">
            <Phone src={c.search.shot.src} alt={c.search.shot.alt} sizes="(min-width: 768px) 18rem, 16rem" />
          </div>
        </div>
      </section>

      {/* The record */}
      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr]">
          <div className="mx-auto w-full max-w-[16rem] md:max-w-[18rem]">
            <Phone src={c.detail.shot.src} alt={c.detail.shot.alt} sizes="(min-width: 768px) 18rem, 16rem" />
          </div>
          <div>
            <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{c.detail.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{c.detail.lead}</p>
            <ul className="mt-8 space-y-4">
              {c.detail.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-ink"><Check />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* More features */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{c.features.title}</h2>
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {c.features.items.map((f) => (
                <li key={f.key} className="border-t-2 border-accent pt-4">
                  <h3 className="ph-cond text-2xl text-ink">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-md lg:max-w-none">
              <Phone src={c.features.savedShot.src} alt={c.features.savedShot.alt} sizes="(min-width: 1024px) 13rem, 45vw" />
              <Phone src={c.features.settingsShot.src} alt={c.features.settingsShot.alt} sizes="(min-width: 1024px) 13rem, 45vw" className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Special regime, on the poster red (same in both themes) */}
      <section className="bg-[var(--ph-poster-red)] text-[var(--ph-on-poster-red)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.3fr_1fr]">
          <div>
            <Overline className="text-[var(--ph-on-poster-red)]/80">{c.regime.eyebrow}</Overline>
            <h2 className="ph-cond mt-3 text-4xl leading-[0.95] sm:text-5xl">{c.regime.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ph-on-poster-red)]/90">{c.regime.lead}</p>
            <ul className="mt-8 space-y-4">
              {c.regime.points.map((p) => (
                <li key={p.title} className="border-l-4 border-[var(--ph-reward)] pl-4">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="mt-0.5 leading-relaxed text-[var(--ph-on-poster-red)]/90">{p.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-[var(--ph-on-poster-red)]/80">{c.regime.note}</p>
          </div>
          <div className="mx-auto w-full max-w-[16rem] md:max-w-[18rem]">
            <Phone src={c.regime.shot.src} alt={c.regime.shot.alt} sizes="(min-width: 768px) 18rem, 16rem" />
          </div>
        </div>
      </section>

      {/* Safety, on the dark "Si lo reconoces" block */}
      <section id="seguridad" className="scroll-mt-20 bg-[var(--ph-header)] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="ph-cond text-4xl leading-[0.95] sm:text-5xl">{c.safety.title}</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-[var(--ph-on-header-muted)]">{c.safety.lead}</p>
            <ol className="mt-8 space-y-3 text-lg">
              {c.safety.rules.map((r, i) => (
                <li key={r} className="flex gap-4">
                  <span aria-hidden="true" className="ph-cond w-6 text-2xl leading-7 text-[var(--ph-reward)]">{i + 1}</span>
                  <span className="leading-7">{r}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8" style={onHeader}>
              <CallButton label={HOTLINE.label} lead={c.hotlineLead} />
            </div>
          </div>
          <ul className="grid content-start gap-4">
            {c.safety.facts.map((f) => (
              <li key={f.title} className="rounded-2xl border border-white/15 bg-[var(--ph-header-field)] p-6">
                <h3 className="ph-cond text-2xl text-[var(--ph-reward)]">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--ph-on-header-muted)]">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About the project and how to help */}
      <section id="proyecto" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{c.about.title}</h2>
          <blockquote className="mt-8 border-l-4 border-accent pl-5">
            <p className="ph-cond text-3xl leading-tight text-accent sm:text-4xl">{c.about.motto}</p>
          </blockquote>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {c.about.blocks.map((b) => (
              <div key={b.title}>
                <h3 className="text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="ph-cond text-2xl text-ink">{c.about.supportTitle}</h3>
              <ul className="mt-4 space-y-4">
                {c.about.support.map((s) => (
                  <li key={s.title}>
                    <p className="font-bold text-ink">{s.title}</p>
                    <p className="mt-0.5 leading-relaxed text-muted">{s.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">{c.about.supportNote}</p>
            </div>
            <div className="rounded-2xl bg-[var(--ph-header)] p-6 text-white" style={onHeader}>
              <h3 className="ph-cond text-2xl">{downloadText.title}</h3>
              <p className="mt-2 text-[var(--ph-on-header-muted)]">{downloadText.body}</p>
              <div className="mt-5">
                <StoreButtons stores={app.stores} t={t.common} showPending />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section id="faq" className="scroll-mt-20 border-t border-line bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <h2 className="ph-cond text-4xl text-ink sm:text-5xl">{t.common.faq}</h2>
            <div className="mt-8"><FaqList items={faq} /></div>
          </div>
        </section>
      )}

      {/* Unofficial notice, right above the shared footer (support, privacy, terms) */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-2xl border border-[var(--ph-paper-line)] bg-[var(--ph-paper)] p-6 text-[var(--ph-on-paper)] sm:p-8">
            <h2 className="ph-cond text-3xl">{c.notice.title}</h2>
            <p className="mt-2 max-w-3xl leading-relaxed">{c.notice.body}</p>
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-[var(--ph-poster-red)] underline decoration-2 underline-offset-4 hover:no-underline"
            >
              {c.notice.source}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </AppChrome>
  );
}
