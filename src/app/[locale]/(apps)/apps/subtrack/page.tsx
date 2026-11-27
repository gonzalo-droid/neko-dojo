import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp, readyFaq } from "@/content/apps";
import { INSTAGRAM_URL } from "@/content/site";
import { isFormsConnected } from "@/lib/forms/provider";
import AppChrome from "@/components/app/AppChrome";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";
import WaitlistForm from "@/components/forms/WaitlistForm";

const app = getApp("subtrack");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  return pageMetadata({
    locale,
    path: "/apps/subtrack",
    title: `SubTrack — ${app.tagline[locale]}`,
    description: `${app.summary[locale]} ${locale === "es" ? "Próximamente." : "Coming soon."}`,
    siteName: "SubTrack",
  });
}

export default async function SubTrackPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const es = locale === "es";
  return (
    <AppChrome app={app} locale={locale} nav={[{ href: "#lista", label: es ? "Lista de espera" : "Waitlist" }]}>
      <section className="mx-auto max-w-3xl px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <StatusBadge status={app.status} label={t.status[app.status]} className="text-ink" />
        <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-7xl">{app.tagline[locale]}</h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{app.summary[locale]}</p>
        <a href="#lista" className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent hover:opacity-90">
          {t.forms.joinWaitlist}
        </a>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-3xl gap-16 px-4 py-20 sm:px-6">
          <div id="lista" className="scroll-mt-20">
            <h2 className="font-display text-3xl font-bold text-ink">{es ? "Avísame cuando salga" : "Tell me when it's out"}</h2>
            <p className="mt-3 text-muted">
              {es ? "SubTrack todavía no está disponible. Deja tu correo y te escribimos en el lanzamiento." : "SubTrack isn't available yet. Leave your email and we'll write when it launches."}
            </p>
            <div className="mt-8"><WaitlistForm t={t.forms} locale={locale} connected={isFormsConnected()} app={app.slug} fallbackUrl={INSTAGRAM_URL} compact /></div>
          </div>
          <div id="faq" className="scroll-mt-20">
            <h2 className="font-display text-3xl font-bold text-ink">{t.common.faq}</h2>
            <div className="mt-5"><FaqList items={readyFaq(app.support.faq[locale])} /></div>
          </div>
        </div>
      </section>
    </AppChrome>
  );
}
