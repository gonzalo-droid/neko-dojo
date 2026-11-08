import { playfair } from "@/lib/fonts/playfair";

// Dark mode is applied by the script in the root layout <head> (data-aq-theme on <html>).
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`theme-animequote ${playfair.variable} min-h-screen bg-canvas font-body text-ink`}>{children}</div>;
}
