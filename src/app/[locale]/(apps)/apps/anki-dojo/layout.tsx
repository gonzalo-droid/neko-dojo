import { zenKaku } from "@/lib/fonts/zen-kaku";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-anki-dojo ${zenKaku.variable} min-h-screen bg-canvas font-body text-ink`}>{children}</div>;
}
