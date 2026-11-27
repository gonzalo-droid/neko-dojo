import type { NextRequest } from "next/server";
import { getApp } from "@/content/apps";
import { getLocale } from "@/lib/locale";
import { storeRedirect } from "@/lib/store-redirect";

// The link SubTrack shares from Settings → Share the app: /apps/subtrack/download (and /en/...).
export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  return storeRedirect(request, getApp("subtrack"), await getLocale(params));
}
