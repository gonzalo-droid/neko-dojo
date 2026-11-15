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
import CopyEmail from "@/components/shared/CopyEmail";
import ContactForm from "@/components/forms/ContactForm";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/support", title: t.meta.supportTitle, description: t.support.description });
}

export default async function Support({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const tasks = [
    { id: "by-app", ...t.support.taskApp },
    { id: "delete-data", ...t.support.taskData },
    { id: "contact", ...t.support.taskOther },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{t.support.title}</h1>
      <p className="mt-4 text-lg text-muted">{t.support.lead}</p>

      <h2 className="sr-only">{t.support.tasksTitle}</h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <a
              href={`#${task.id}`}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent"
            >
              <span className="font-display text-xl font-bold text-ink">{task.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{task.body}</span>
              <span aria-hidden="true" className="mt-auto pt-4 text-accent">↓</span>
            </a>
          </li>
        ))}
      </ul>

      <section id="by-app" className="mt-20 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">{t.support.byApp}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link
                href={localizePath(locale, `/apps/${app.slug}/support`)}
                className="flex min-h-16 items-center gap-3 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-accent"
              >
                <AppIcon app={app} size={36} />
                <span className="font-semibold">{app.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="delete-data" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-2xl font-bold">{t.support.deletionTitle}</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link
                href={`${localizePath(locale, `/apps/${app.slug}/support`)}#delete-data`}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm font-semibold hover:border-accent"
              >
                <AppIcon app={app} size={22} />
                {t.support.deleteFor(app.name)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 grid gap-14 md:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-bold">{t.support.general}</h2>
          <div className="mt-6"><FaqList items={t.support.generalFaq} /></div>
        </section>
        <section id="contact" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold">{t.support.contactTitle}</h2>
          <div className="mt-4 flex flex-col gap-4">
            <CopyEmail email={CONTACT_EMAIL} copy={t.support.copy} copied={t.support.copied} />
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 w-fit items-center rounded-lg bg-accent px-5 font-semibold text-on-accent hover:opacity-90">
              {t.support.writeEmail}
            </a>
          </div>
          <div className="mt-8">
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
