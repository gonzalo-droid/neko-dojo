import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { funnelDisplay } from "@/lib/fonts/funnel-display";
import { zenKaku } from "@/lib/fonts/zen-kaku";
import { archivoPreview, outfitPreview, playfairPreview, poppinsPreview, soraPreview } from "@/lib/fonts/previews";
import JsonLd from "@/components/shared/JsonLd";
import { studioGraph } from "@/lib/structured-data";
import StudioHeader from "./StudioHeader";
import StudioFooter from "./StudioFooter";
import Consent from "@/components/shared/Consent";

// App display fonts are loaded here only so the catalog cards can preview each identity
// (not preloaded: see previews.ts). Funnel Display is the studio's own display face.
const fontVars = [funnelDisplay, playfairPreview, outfitPreview, zenKaku, soraPreview, poppinsPreview, archivoPreview].map((f) => f.variable).join(" ");

export default function StudioShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  return (
    <div className={`theme-studio ${fontVars} min-h-screen bg-canvas font-body text-ink`}>
      <JsonLd data={studioGraph(locale)} />
      <StudioHeader locale={locale} t={t} />
      <main id="main">{children}</main>
      <StudioFooter locale={locale} t={t} />
      <Consent />
    </div>
  );
}
