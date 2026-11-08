import StudioShell from "@/components/studio/StudioShell";
import { getLocale } from "@/lib/locale";

export default async function StudioLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await getLocale(params);
  return <StudioShell locale={locale}>{children}</StudioShell>;
}
