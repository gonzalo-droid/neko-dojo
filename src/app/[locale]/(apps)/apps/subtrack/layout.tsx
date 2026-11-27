import Consent from "@/components/shared/Consent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="theme-subtrack min-h-screen bg-canvas font-body text-ink">{children}<Consent /></div>;
}
