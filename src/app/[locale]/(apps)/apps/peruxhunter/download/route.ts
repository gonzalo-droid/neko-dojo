import type { NextRequest } from "next/server";
import { getApp } from "@/content/apps";
import { getLocale } from "@/lib/locale";
import { storeRedirect } from "@/lib/store-redirect";

// The link the app shares: /apps/peruxhunter/download (and /en/...).
export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  return storeRedirect(request, getApp("peruxhunter"), await getLocale(params));
}
