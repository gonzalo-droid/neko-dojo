import type { Metadata } from "next";
import { getApp } from "@/content/apps";
import { getLocale, type LocaleParams } from "@/lib/locale";
import LegalPage, { legalMetadata } from "@/components/app/LegalPage";

const app = getApp("anki-dojo");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return legalMetadata(app, "privacy", await getLocale(params));
}

export default async function Page({ params }: LocaleParams) {
  return <LegalPage app={app} kind="privacy" locale={await getLocale(params)} />;
}
