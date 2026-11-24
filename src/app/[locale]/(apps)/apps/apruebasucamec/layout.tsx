import Consent from "@/components/shared/Consent";
import { poppins } from "@/lib/fonts/poppins";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-apruebasucamec ${poppins.variable} min-h-screen bg-canvas font-body text-ink`}>{children}<Consent /></div>;
}
