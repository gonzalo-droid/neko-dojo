import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isIndexable, isPlaceholder, readyFaq, type AppEntry } from "@/content/apps";
import { CONTACT_EMAIL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { isFormsConnected } from "@/lib/forms/provider";
import FaqList from "@/components/shared/FaqList";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import AppChrome from "./AppChrome";

export function supportMetadata(app: AppEntry, locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/apps/${app.slug}/support`,
    title: t.support.appSupportTitle(app.name),
    description: t.support.appSupportDescription(app.name),
    noindex: !isIndexable(app),
  });
}

export default function AppSupportPage({ app, locale }: { app: AppEntry; locale: Locale }) {
  const t = getDictionary(locale);
  const faq = readyFaq(app.support.faq[locale]);
  const steps = app.support.dataDeletion[locale].filter((s) => !isPlaceholder(s));
  const subject = encodeURIComponent(t.support.emailSubject(app.name));
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}`;

  return (
    <AppChrome app={app} locale={locale}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <Breadcrumbs
          locale={locale}
          label={t.breadcrumbs.label}
          crumbs={[
            { name: "Nekodojo", path: "/" },
            { name: app.name, path: `/apps/${app.slug}` },
            { name: t.common.support, path: `/apps/${app.slug}/support` },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">{t.support.appSupportTitle(app.name)}</h1>

        {/* Stable anchor: store listings point to /support#delete-data, so it comes first. */}
        <section id="delete-data" className="mt-10 scroll-mt-24 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-ink">{t.support.deletionTitle}</h2>
          {steps.length > 0 ? (
            <ol className="mt-5 space-y-3">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4 leading-relaxed text-muted">
                  <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-on-accent">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          ) : app.status === "available" ? (
            <p className="mt-4 leading-relaxed text-muted">
              {t.support.deletionContact}{" "}
              <a href={mailto} className="font-semibold text-accent underline underline-offset-4">{CONTACT_EMAIL}</a>
            </p>
          ) : (
            <p className="mt-4 leading-relaxed text-muted">{t.support.deletionUnreleased}</p>
          )}
        </section>

        <div className={`mt-14 grid gap-14 ${faq.length ? "md:grid-cols-2" : ""}`}>
          {faq.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-ink">{t.common.faq}</h2>
              <div className="mt-6"><FaqList items={faq} /></div>
            </section>
          )}
          <section id="contact" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-ink">{t.support.contactTitle}</h2>
            <p className="mt-3">
              <a href={mailto} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:opacity-90">
                {t.support.writeEmail}
              </a>
              <span className="ml-3 select-all text-sm text-muted">{CONTACT_EMAIL}</span>
            </p>
            <div className="mt-8">
              <ContactForm t={t.forms} locale={locale} connected={isFormsConnected()} app={app.slug} />
            </div>
          </section>
        </div>
      </div>
    </AppChrome>
  );
}
