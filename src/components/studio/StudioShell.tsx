import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { spaceGrotesk } from "@/lib/fonts/space-grotesk";
import { playfair } from "@/lib/fonts/playfair";
import { outfit } from "@/lib/fonts/outfit";
import { zenKaku } from "@/lib/fonts/zen-kaku";
import { sora } from "@/lib/fonts/sora";
import StudioHeader from "./StudioHeader";
import StudioFooter from "./StudioFooter";

// App display fonts are loaded here only so the catalog cards can preview each identity.
const fontVars = [spaceGrotesk, playfair, outfit, zenKaku, sora].map((f) => f.variable).join(" ");

export default function StudioShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  return (
    <div className={`theme-studio ${fontVars} min-h-screen bg-canvas font-body text-ink`}>
      <a href="#main" className="skip-link">{t.a11y.skip}</a>
      <StudioHeader locale={locale} t={t} />
      <main id="main">{children}</main>
      <StudioFooter locale={locale} t={t} />
    </div>
  );
}
