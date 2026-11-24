import Consent from "@/components/shared/Consent";
import { cookies } from "next/headers";
import { playfair } from "@/lib/fonts/playfair";

// Dark mode comes from the "aq-theme" cookie, so the server paints it from the first
// frame (no flash, no inline script). Reading cookies here keeps the rest of the site static.
export default async function Layout({ children }: { children: React.ReactNode }) {
  const dark = (await cookies()).get("aq-theme")?.value === "dark";
  return (
    <div
      className={`theme-animequote ${playfair.variable} min-h-screen bg-canvas font-body text-ink`}
      data-aq-theme={dark ? "dark" : undefined}
    >
      {children}
      <Consent />
    </div>
  );
}
