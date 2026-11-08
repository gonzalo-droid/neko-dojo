import type { Locale } from "@/i18n/config";
import type { LegalDoc } from "./types";

/*
 * Outlines only. They must not describe practices nobody has confirmed.
 * Replace each [Pendiente]/[Pending] with the app's real practices, then move
 * the app to legal.mode = "live" in src/content/apps.ts.
 */

const P = (es: string, en: string) => ({ es: `[Pendiente: ${es}]`, en: `[Pending: ${en}]` });

const privacyOutline: [{ es: string; en: string }, { es: string; en: string }][] = [
  [{ es: "1. Quién es responsable", en: "1. Who is responsible" }, P("razón social o nombre del responsable y forma de contacto.", "legal name of the controller and how to reach them.")],
  [{ es: "2. Datos que se recopilan", en: "2. Data collected" }, P("lista exacta de datos que la app recopila, si recopila alguno.", "exact list of data the app collects, if any.")],
  [{ es: "3. Para qué se usan", en: "3. How it's used" }, P("finalidad de cada dato.", "purpose of each data point.")],
  [{ es: "4. Servicios de terceros", en: "4. Third-party services" }, P("SDKs o servicios integrados (analítica, anuncios, IA, almacenamiento) y sus políticas.", "integrated SDKs or services (analytics, ads, AI, storage) and their policies.")],
  [{ es: "5. Conservación y eliminación", en: "5. Retention and deletion" }, P("cuánto tiempo se guardan los datos y cómo pedir su eliminación.", "how long data is kept and how to request deletion.")],
  [{ es: "6. Derechos del usuario", en: "6. Your rights" }, P("derechos aplicables (por ejemplo, Ley 29733 de Perú) y cómo ejercerlos.", "applicable rights (for example, Peru's Law 29733) and how to exercise them.")],
  [{ es: "7. Menores de edad", en: "7. Children" }, P("edad mínima y tratamiento de datos de menores.", "minimum age and handling of children's data.")],
  [{ es: "8. Cambios y contacto", en: "8. Changes and contact" }, P("cómo se avisarán los cambios y correo de contacto.", "how changes will be announced and contact email.")],
];

const termsOutline: typeof privacyOutline = [
  [{ es: "1. Aceptación", en: "1. Acceptance" }, P("alcance de los términos y plataformas donde aplica.", "scope of the terms and platforms where they apply.")],
  [{ es: "2. Descripción del servicio", en: "2. Description of the service" }, P("qué ofrece la app, solo funciones confirmadas.", "what the app offers, confirmed features only.")],
  [{ es: "3. Cuentas y uso aceptable", en: "3. Accounts and acceptable use" }, P("si hay cuentas, reglas de uso.", "whether there are accounts, usage rules.")],
  [{ es: "4. Pagos y suscripciones", en: "4. Payments and subscriptions" }, P("si existen compras, precios y reembolsos.", "whether there are purchases, prices and refunds.")],
  [{ es: "5. Propiedad intelectual", en: "5. Intellectual property" }, P("titularidad del contenido y de la app.", "ownership of content and the app.")],
  [{ es: "6. Garantías y responsabilidad", en: "6. Warranties and liability" }, P("exoneraciones y límites aplicables.", "applicable disclaimers and limits.")],
  [{ es: "7. Cambios, ley aplicable y contacto", en: "7. Changes, governing law and contact" }, P("ley aplicable, cambios y contacto.", "governing law, changes and contact.")],
];

function build(outline: typeof privacyOutline, locale: Locale, extra?: string): LegalDoc {
  return {
    intro: extra ? [extra] : undefined,
    sections: outline.map(([heading, body]) => ({ heading: heading[locale], blocks: [body[locale]] })),
  };
}

const mtcNote = {
  es: "MTCQuiz es una app independiente y no está afiliada al Ministerio de Transportes y Comunicaciones del Perú.",
  en: "MTCQuiz is an independent app and isn't affiliated with Peru's Ministry of Transport and Communications.",
};

export function draftDoc(slug: string, kind: "privacy" | "terms", locale: Locale): LegalDoc {
  const extra = slug === "mtcquiz" ? mtcNote[locale] : undefined;
  return build(kind === "privacy" ? privacyOutline : termsOutline, locale, extra);
}
