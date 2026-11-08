import Link from "next/link";
import type { Metadata } from "next";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { AppEntry } from "@/content/apps";
import { getLegalDoc, type Block } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import AppChrome from "./AppChrome";
import RichText from "./RichText";

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
    // The Spanish original stays canonical at its current URL; drafts are kept out of search.
    canonical: app.legal.mode === "live" && locale === "es" ? app.legal.publishedAt[kind] : undefined,
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
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
        <Link href={localizePath(locale, `/apps/${app.slug}`)} className="text-sm text-muted hover:text-accent">
          ← {t.legal.backToApp(app.name)}
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{title}</h1>

        {legal.mode === "live" ? (
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p>{t.common.updated}: {legal.updated[locale]}</p>
            <p>{t.legal.liveSource} <RichText text={legal.publishedAt[kind]} /></p>
            {t.legal.translationNote && <p>{t.legal.translationNote}</p>}
          </div>
        ) : (
          <p role="note" className="mt-6 rounded-lg border-2 border-dashed border-accent2 bg-surface px-4 py-3 text-sm font-medium text-ink">
            {t.legal.draftBanner}
          </p>
        )}

        {doc.intro && <div className="mt-8 space-y-4">{doc.intro.map((b, i) => <BlockView key={i} block={b} />)}</div>}

        <div className="mt-10 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-4">{s.blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>
            </section>
          ))}
        </div>
      </article>
    </AppChrome>
  );
}
