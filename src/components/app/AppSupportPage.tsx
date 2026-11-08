import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { AppEntry } from "@/content/apps";
import { CONTACT_EMAIL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { isFormsConnected } from "@/lib/forms/provider";
import FaqList from "@/components/shared/FaqList";
import ContactForm from "@/components/forms/ContactForm";
import AppChrome from "./AppChrome";

export function supportMetadata(app: AppEntry, locale: Locale): Metadata {
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/apps/${app.slug}/support`,
    title: t.support.appSupportTitle(app.name),
    description: t.support.appSupportDescription(app.name),
  });
}

export default function AppSupportPage({ app, locale }: { app: AppEntry; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <AppChrome app={app} locale={locale}>
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">{t.support.appSupportTitle(app.name)}</h1>
        <div className="mt-14 grid gap-14 md:grid-cols-2">
          <div className="space-y-14">
            <section>
              <h2 className="font-display text-2xl font-bold text-ink">{t.common.faq}</h2>
              <div className="mt-6"><FaqList items={app.support.faq[locale]} /></div>
            </section>
            {/* Stable anchor: store listings can point to /support#delete-data */}
            <section id="delete-data" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold text-ink">{t.support.deletionTitle}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">
                {app.support.dataDeletion[locale].map((step) => <li key={step} className="leading-relaxed">{step}</li>)}
              </ul>
            </section>
          </div>
          <section id="contact" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-ink">{t.support.contactTitle}</h2>
            <p className="mt-3 text-muted">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4">{CONTACT_EMAIL}</a>
            </p>
            <div className="mt-6">
              <ContactForm t={t.forms} locale={locale} connected={isFormsConnected()} app={app.slug} />
            </div>
          </section>
        </div>
      </div>
    </AppChrome>
  );
}
