import Link from "next/link";
import type { Metadata } from "next";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate, type AppEntry } from "@/content/apps";
import { getLegalDoc, type Block } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import AppChrome from "./AppChrome";
import RichText from "./RichText";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const slugify = (s: string, i: number) =>
  `s${i + 1}-${s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)}`;

type Kind = "privacy" | "terms";

export function legalMetadata(app: AppEntry, kind: Kind, locale: Locale): Metadata {
  const t = getDictionary(locale);
  const title = kind === "privacy" ? t.legal.privacyTitle(app.name) : t.legal.termsTitle(app.name);
  const live = app.legal.mode === "live";
  return pageMetadata({
    locale,
    path: `/apps/${app.slug}/${kind}`,
    title,
    description: `${title} — Nekodojo`,
    // Drafts are kept out of search; a copied Spanish original is handled by pageMetadata (externalOriginal).
    noindex: !live,
  });
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === "string") return <p className="leading-relaxed text-muted"><RichText text={block} /></p>;
  return (
    <ul className="list-disc space-y-2 pl-5 text-muted marker:text-accent">
      {block.list.map((item) => <li key={item} className="leading-relaxed"><RichText text={item} /></li>)}
    </ul>
  );
}

export default function LegalPage({ app, kind, locale }: { app: AppEntry; kind: Kind; locale: Locale }) {
  const t = getDictionary(locale);
  const doc = getLegalDoc(app.slug, kind, locale);
  const title = kind === "privacy" ? t.legal.privacyTitle(app.name) : t.legal.termsTitle(app.name);
  const legal = app.legal;
  return (
    <AppChrome app={app} locale={locale}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Breadcrumbs
          locale={locale}
          label={t.breadcrumbs.label}
          crumbs={[
            { name: "Nekodojo", path: "/" },
            { name: app.name, path: `/apps/${app.slug}` },
            { name: kind === "privacy" ? t.common.privacy : t.common.terms, path: `/apps/${app.slug}/${kind}` },
          ]}
        />
      <div className="mt-6 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
        {/* Table of contents: sticky on desktop, a collapsible list on phones. */}
        <nav aria-label={t.legal.toc} className="lg:sticky lg:top-24 lg:self-start">
          <details className="rounded-xl border border-line bg-surface p-4 lg:border-0 lg:bg-transparent lg:p-0" open>
            <summary className="cursor-pointer text-sm font-semibold text-ink lg:pointer-events-none lg:list-none">{t.legal.toc}</summary>
            <ol className="mt-3 space-y-1.5 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading, i)}`} className="block py-1 text-muted hover:text-accent">{s.heading}</a>
                </li>
              ))}
            </ol>
          </details>
        </nav>
      <article className="max-w-3xl">
        <Link href={localizePath(locale, `/apps/${app.slug}`)} className="text-sm text-muted hover:text-accent">
          ← {t.legal.backToApp(app.name)}
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{title}</h1>

        {legal.mode === "live" ? (
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p>{t.common.updated}: {formatDate(legal[kind], locale)}</p>
            {legal.publishedAt && <p>{t.legal.liveSource} <RichText text={legal.publishedAt[kind]} /></p>}
            {t.legal.translationNote && <p>{t.legal.translationNote}</p>}
          </div>
        ) : (
          <p role="note" className="mt-6 rounded-lg border-2 border-dashed border-accent2 bg-surface px-4 py-3 text-sm font-medium text-ink">
            {t.legal.draftBanner}
          </p>
        )}

        {doc.intro && <div className="mt-8 space-y-4">{doc.intro.map((b, i) => <BlockView key={i} block={b} />)}</div>}

        <div className="mt-10 space-y-10">
          {doc.sections.map((s, i) => (
            <section key={s.heading} id={slugify(s.heading, i)} className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-4">{s.blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>
            </section>
          ))}
        </div>
      </article>
      </div>
      </div>
    </AppChrome>
  );
}
