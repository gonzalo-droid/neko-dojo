import { sora } from "@/lib/fonts/sora";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-goals ${sora.variable} min-h-screen bg-canvas font-body text-ink`}>{children}</div>;
}
