import type { Metadata } from "next";
import { getApp } from "@/content/apps";
import { getLocale, type LocaleParams } from "@/lib/locale";
import AppSupportPage, { supportMetadata } from "@/components/app/AppSupportPage";

const app = getApp("mtcquiz");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return supportMetadata(app, await getLocale(params));
}

export default async function Page({ params }: LocaleParams) {
  return <AppSupportPage app={app} locale={await getLocale(params)} />;
}
