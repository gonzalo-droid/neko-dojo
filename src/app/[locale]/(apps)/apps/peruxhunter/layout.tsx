import { archivo } from "@/lib/fonts/archivo";
import { plexMono } from "@/lib/fonts/plex-mono";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-peruxhunter ${archivo.variable} ${plexMono.variable} min-h-screen bg-canvas font-body text-ink`}>{children}</div>;
}
