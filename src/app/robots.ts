import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/** Only production is indexed. Vercel previews and local builds stay out of search. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/apps/animequote/admin", "/en/apps/animequote/admin"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
