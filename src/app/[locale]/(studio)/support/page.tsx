import Link from "next/link";
import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps } from "@/content/apps";
import { CONTACT_EMAIL } from "@/content/site";
import { isFormsConnected } from "@/lib/forms/provider";
import AppIcon from "@/components/shared/AppIcon";
import FaqList from "@/components/shared/FaqList";
import ContactForm from "@/components/forms/ContactForm";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/support", title: `${t.support.title} — Nekodojo`, description: t.support.description });
}

export default async function Support({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{t.support.title}</h1>
      <p className="mt-4 text-lg text-muted">{t.support.lead}</p>

      <h2 className="mt-14 font-display text-2xl font-bold">{t.support.byApp}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map((app) => (
          <li key={app.slug}>
            <Link
              href={localizePath(locale, `/apps/${app.slug}/support`)}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-accent"
            >
              <AppIcon app={app} size={36} />
              <span className="font-semibold">{app.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid gap-14 md:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-bold">{t.support.general}</h2>
          <div className="mt-6"><FaqList items={t.support.generalFaq} /></div>
        </section>
        <section id="contact" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold">{t.support.contactTitle}</h2>
          <p className="mt-3 text-muted">
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-4">{CONTACT_EMAIL}</a>
          </p>
          <div className="mt-6">
            <ContactForm
              t={t.forms}
              locale={locale}
              connected={isFormsConnected()}
              options={[{ value: "general", label: t.forms.appGeneral }, ...apps.map((a) => ({ value: a.slug, label: a.name }))]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
