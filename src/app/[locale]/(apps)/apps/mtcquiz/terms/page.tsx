import type { Metadata } from "next";
import { getApp } from "@/content/apps";
import { getLocale, type LocaleParams } from "@/lib/locale";
import LegalPage, { legalMetadata } from "@/components/app/LegalPage";

const app = getApp("mtcquiz");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  return legalMetadata(app, "terms", await getLocale(params));
}

export default async function Page({ params }: LocaleParams) {
  return <LegalPage app={app} kind="terms" locale={await getLocale(params)} />;
}
