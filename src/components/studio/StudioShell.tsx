import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { spaceGrotesk } from "@/lib/fonts/space-grotesk";
import { zenKaku } from "@/lib/fonts/zen-kaku";
import { outfitPreview, playfairPreview, soraPreview } from "@/lib/fonts/previews";
import JsonLd from "@/components/shared/JsonLd";
import { studioGraph } from "@/lib/structured-data";
import StudioHeader from "./StudioHeader";
import StudioFooter from "./StudioFooter";

// App display fonts are loaded here only so the catalog cards can preview each identity
// (not preloaded: see previews.ts). Space Grotesk is the studio's own display face.
const fontVars = [spaceGrotesk, playfairPreview, outfitPreview, zenKaku, soraPreview].map((f) => f.variable).join(" ");

export default function StudioShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  return (
    <div className={`theme-studio ${fontVars} min-h-screen bg-canvas font-body text-ink`}>
      <JsonLd data={studioGraph(locale)} />
      <a href="#main" className="skip-link">{t.a11y.skip}</a>
      <StudioHeader locale={locale} t={t} />
      <main id="main">{children}</main>
      <StudioFooter locale={locale} t={t} />
    </div>
  );
}
