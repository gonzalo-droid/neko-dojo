import Consent from "@/components/shared/Consent";
import { outfit } from "@/lib/fonts/outfit";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-mtcquiz ${outfit.variable} min-h-screen bg-canvas font-body text-ink`}>{children}<Consent /></div>;
}
