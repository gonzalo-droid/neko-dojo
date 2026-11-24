import type { Metadata } from "next";
import AdminApp from "@/apps/animequote/admin/AdminApp";

// Internal panel: hidden, no links from the public site, never indexed.
export const metadata: Metadata = {
  title: "Admin · AnimeQuote",
  robots: { index: false, follow: false },
};

export default function AnimeQuoteAdminPage() {
  return <AdminApp />;
}
