import type { Metadata } from "next";
import { getApp } from "@/content/apps";
import { subtrackDeletion } from "@/content/legal/subtrack";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import AppChrome from "@/components/app/AppChrome";
import RichText from "@/components/app/RichText";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const app = getApp("subtrack");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = subtrackDeletion[locale];
  return pageMetadata({ locale, path: "/apps/subtrack/delete-account", title: c.title, description: c.description });
}

export default async function Page({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const { title, doc } = subtrackDeletion[locale];
  return (
    <AppChrome app={app} locale={locale}>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <Breadcrumbs
          locale={locale}
          label={t.breadcrumbs.label}
          crumbs={[
            { name: "Nekodojo", path: "/" },
            { name: app.name, path: "/apps/subtrack" },
            { name: title, path: "/apps/subtrack/delete-account" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{title}</h1>
        {doc.intro && <p className="mt-6 leading-relaxed text-muted">{doc.intro[0] as string}</p>}
        <div className="mt-10 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-4">
                {s.blocks.map((b, i) =>
                  typeof b === "string" ? (
                    <p key={i} className="leading-relaxed text-muted"><RichText text={b} /></p>
                  ) : (
                    <ul key={i} className="list-disc space-y-2 pl-5 text-muted marker:text-accent">
                      {b.list.map((item) => <li key={item} className="leading-relaxed"><RichText text={item} /></li>)}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppChrome>
  );
}
