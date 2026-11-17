import type { Locale } from "@/i18n/config";
import { CONTACT_EMAIL, SITE_URL } from "@/content/site";
import type { LegalDoc } from "./types";

/*
 * ApruebaSUCAMEC documents. This site is the original (the app's Settings → Privacy and
 * legal opens these pages). Spanish is the original text; English is a reference translation.
 *
 * Every practice described here was checked against the app's code (sucamec-app,
 * November 2026): shared_preferences for history and font size, google_mobile_ads with
 * UMP consent and ATT on iOS, a banner in every mode except the exam simulation,
 * webview_flutter for these pages, no Firebase, no accounts, no own server.
 * Android permissions come from the built APK. If the app changes any of this, update
 * this file and the dates in src/content/apps.ts.
 */

const GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const GOOGLE_PARTNERS = "https://policies.google.com/technologies/partner-sites";
const SITE = SITE_URL.replace(/^https?:\/\//, "");

const contactEs = {
  list: [`Correo electrónico: ${CONTACT_EMAIL}`, "Responsable: Nekodojo", "Aplicación: ApruebaSUCAMEC (Android e iOS)"],
};
const contactEn = {
  list: [`Email: ${CONTACT_EMAIL}`, "Controller: Nekodojo", "App: ApruebaSUCAMEC (Android and iOS)"],
};

const privacyEs: LegalDoc = {
  intro: [
    "Esta política explica qué datos trata ApruebaSUCAMEC, una app de Nekodojo para preparar el examen teórico de SUCAMEC en Perú. En resumen: la app no tiene cuentas ni servidor propio, guarda tu historial solo en tu teléfono y muestra anuncios de Google AdMob, que sí pueden recopilar datos de tu dispositivo según tu consentimiento.",
  ],
  sections: [
    {
      heading: "1. Responsable",
      blocks: [
        `El responsable de esta app es Nekodojo, un estudio independiente de apps con sede en Perú. Para cualquier consulta sobre privacidad o para ejercer tus derechos, escribe a ${CONTACT_EMAIL}.`,
        "ApruebaSUCAMEC no está afiliada a la Superintendencia Nacional de Control de Servicios de Seguridad, Armas, Municiones y Explosivos de Uso Civil (SUCAMEC) ni a ninguna entidad del Estado peruano.",
      ],
    },
    {
      heading: "2. Lo que no recopilamos",
      blocks: [
        {
          list: [
            "No pedimos registro, nombre, correo, número de teléfono ni documento de identidad.",
            "No tenemos un servidor propio: tus respuestas y resultados no se envían a Nekodojo.",
            "No usamos herramientas de analítica ni de reportes de errores.",
            "No pedimos acceso a tu ubicación, cámara, micrófono, contactos ni fotos.",
          ],
        },
      ],
    },
    {
      heading: "3. Datos guardados en tu teléfono",
      blocks: [
        "Para que la app funcione, guarda en el almacenamiento local de tu dispositivo (SharedPreferences en Android, UserDefaults en iOS):",
        {
          list: [
            "Tu historial de resultados: fecha, modo de estudio, número de preguntas, aciertos, errores y porcentaje de cada intento, incluidos los que dejaste a medias. Se conservan los últimos 50.",
            "El tamaño de letra que elegiste.",
          ],
        },
        "Estos datos no salen de tu teléfono y nosotros no podemos verlos. Puedes borrar el historial en Configuraciones → Limpiar historial, y todo lo demás borrando los datos de la app o desinstalándola.",
      ],
    },
    {
      heading: "4. Publicidad (Google AdMob)",
      blocks: [
        "ApruebaSUCAMEC es gratuita y se financia con anuncios de Google AdMob, un servicio de Google LLC. Hoy la app muestra un banner en los modos de práctica; en el simulacro tipo examen no hay anuncios. Más adelante podría mostrar otros formatos de AdMob (por ejemplo, intersticiales, con recompensa o nativos); si lo hace, esta política se actualizará.",
        "Para mostrar y medir anuncios, y para prevenir fraude, el SDK de Google Mobile Ads puede recopilar, según la declaración de privacidad del propio Google:",
        {
          list: [
            "El identificador de publicidad del dispositivo (ID de publicidad en Android, IDFA en iOS), solo si lo permites.",
            "La dirección IP y la ubicación aproximada que se deriva de ella.",
            "Datos técnicos del dispositivo y de la app, e interacciones con los anuncios (por ejemplo, impresiones y toques).",
            "Datos de diagnóstico del rendimiento de los anuncios.",
          ],
        },
        `Google trata esos datos como responsable según su propia política: ${GOOGLE_PRIVACY}. Cómo usa Google la información de las apps que usan sus servicios: ${GOOGLE_PARTNERS}. Nekodojo no recibe datos que te identifiquen; solo ve estadísticas agregadas de los anuncios.`,
      ],
    },
    {
      heading: "5. Tu consentimiento para los anuncios",
      blocks: [
        {
          list: [
            "Formulario de consentimiento de Google: cuando la normativa de tu región lo exige (por ejemplo, en el Espacio Económico Europeo o el Reino Unido), la app muestra el formulario de Google antes de cargar anuncios. Puedes cambiar tu decisión en Configuraciones → Preferencias de anuncios.",
            "App Tracking Transparency (iPhone): la app te pregunta si permites el rastreo. Si no lo permites, la app no accede al IDFA y los anuncios no se personalizan con él. Puedes cambiarlo en Ajustes → Privacidad y seguridad → Rastreo.",
            "Android: puedes restablecer o eliminar tu ID de publicidad en Ajustes → Privacidad → Anuncios (o Ajustes → Google → Anuncios, según tu teléfono).",
          ],
        },
        "Si no das tu consentimiento, la app sigue funcionando completa; los anuncios pueden no mostrarse o ser no personalizados.",
      ],
    },
    {
      heading: "6. Páginas legales y conexión a internet",
      blocks: [
        "Las preguntas y el manual vienen dentro de la app, así que estudiar no requiere conexión. La app solo usa internet para los anuncios y para abrir estas páginas legales.",
        `Las páginas de Privacidad y legal se cargan dentro de la app desde ${SITE}. Ese sitio no usa analítica ni publicidad; como cualquier sitio web, su proveedor de alojamiento puede registrar datos técnicos de la conexión (como la dirección IP) por seguridad y para su funcionamiento.`,
      ],
    },
    {
      heading: "7. Permisos del dispositivo",
      blocks: [
        "En Android, la app declara estos permisos, todos relacionados con la conexión y los anuncios:",
        {
          list: [
            "INTERNET y ACCESS_NETWORK_STATE: cargar anuncios y las páginas legales, y saber si hay conexión.",
            "AD_ID y los permisos de AdServices (ID de publicidad, atribución y temas): los usa el SDK de Google Mobile Ads para los anuncios, sujeto a tu consentimiento y a los ajustes de tu teléfono.",
            "WAKE_LOCK y FOREGROUND_SERVICE: los agregan las bibliotecas de Google para su funcionamiento interno; la app no los usa para nada más.",
          ],
        },
        "En iPhone, el único permiso que se solicita es el de rastreo (App Tracking Transparency), explicado en la sección 5.",
      ],
    },
    {
      heading: "8. Finalidad y base legal",
      blocks: [
        "Tratamos los datos de esta política para dos fines: que la app funcione (guardar tu historial y tu tamaño de letra en tu teléfono) y financiarla con publicidad. La base legal es, según el caso, la prestación del servicio que pides al usar la app y tu consentimiento para los anuncios y el rastreo, conforme a la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.",
      ],
    },
    {
      heading: "9. Transferencias internacionales",
      blocks: [
        "Google puede tratar los datos de los anuncios en servidores ubicados fuera del Perú, incluidos los Estados Unidos, con las garantías que describe su política de privacidad.",
      ],
    },
    {
      heading: "10. Conservación",
      blocks: [
        "Los datos locales se conservan en tu teléfono hasta que los borres o desinstales la app; el historial guarda como máximo los últimos 50 resultados. Los plazos de conservación de los datos de anuncios los fija Google en su política.",
      ],
    },
    {
      heading: "11. Tus derechos",
      blocks: [
        "Según la Ley N.° 29733 tienes derecho de acceso, rectificación, cancelación y oposición. Como Nekodojo no guarda datos tuyos en servidores, la forma más directa de ejercerlos sobre los datos locales es borrarlos desde la app o desde los ajustes del teléfono. Para los datos de anuncios, puedes gestionarlos con los controles de la sección 5 o con las herramientas de Google.",
        `Si tienes dudas o quieres presentar una solicitud, escríbenos a ${CONTACT_EMAIL} y te responderemos en los plazos de la ley. También puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.`,
      ],
    },
    {
      heading: "12. Menores de edad",
      blocks: [
        "ApruebaSUCAMEC está pensada para adultos que se preparan para obtener una licencia de uso de armas de fuego, que en Perú exige ser mayor de edad. No está dirigida a menores de 18 años ni recopilamos a sabiendas datos de menores. Si eres padre, madre o tutor y crees que un menor usó la app, escríbenos.",
      ],
    },
    {
      heading: "13. Seguridad",
      blocks: [
        "Los datos locales quedan protegidos por las medidas de seguridad de tu sistema operativo. Las conexiones de la app con Google y con este sitio se hacen cifradas (HTTPS).",
      ],
    },
    {
      heading: "14. Cambios en esta política",
      blocks: [
        "Si cambia lo que hace la app con tus datos (por ejemplo, nuevos formatos de anuncios o nuevos servicios), actualizaremos esta página y su fecha antes de que el cambio llegue a la app.",
      ],
    },
    {
      heading: "15. Contacto",
      blocks: ["Para cualquier consulta sobre esta política o sobre tus datos:", contactEs],
    },
  ],
};

const privacyEn: LegalDoc = {
  intro: [
    "This policy explains what data ApruebaSUCAMEC handles. It's a Nekodojo app for preparing Peru's SUCAMEC written test. In short: the app has no accounts and no server of its own, keeps your history only on your phone, and shows Google AdMob ads, which may collect data from your device depending on your consent.",
  ],
  sections: [
    {
      heading: "1. Controller",
      blocks: [
        `This app is run by Nekodojo, an independent app studio based in Peru. For any privacy question, or to exercise your rights, write to ${CONTACT_EMAIL}.`,
        "ApruebaSUCAMEC isn't affiliated with Peru's National Superintendence for the Control of Security Services, Arms, Ammunition and Explosives for Civilian Use (SUCAMEC) or any Peruvian government body.",
      ],
    },
    {
      heading: "2. What we don't collect",
      blocks: [
        {
          list: [
            "We don't ask you to sign up, and we don't ask for your name, email, phone number or ID.",
            "We have no server of our own: your answers and results are never sent to Nekodojo.",
            "We don't use analytics or crash-reporting tools.",
            "We don't ask for access to your location, camera, microphone, contacts or photos.",
          ],
        },
      ],
    },
    {
      heading: "3. Data stored on your phone",
      blocks: [
        "To work, the app stores the following in your device's local storage (SharedPreferences on Android, UserDefaults on iOS):",
        {
          list: [
            "Your results history: date, study mode, number of questions, right and wrong answers, and score for each attempt, including the ones you left unfinished. The last 50 are kept.",
            "The font size you chose.",
          ],
        },
        "This data never leaves your phone and we can't see it. You can delete the history in Settings → Clear history, and everything else by clearing the app's data or uninstalling it.",
      ],
    },
    {
      heading: "4. Advertising (Google AdMob)",
      blocks: [
        "ApruebaSUCAMEC is free and funded by Google AdMob ads, a service of Google LLC. Today the app shows a banner in the practice modes; there are no ads in the exam simulation. Later on it may show other AdMob formats (for example, interstitial, rewarded or native ads); if it does, this policy will be updated.",
        "To show and measure ads, and to prevent fraud, the Google Mobile Ads SDK may collect, according to Google's own privacy declaration:",
        {
          list: [
            "The device's advertising identifier (Advertising ID on Android, IDFA on iOS), only if you allow it.",
            "The IP address and the approximate location derived from it.",
            "Technical device and app data, and interactions with ads (for example, impressions and taps).",
            "Diagnostic data about ad performance.",
          ],
        },
        `Google handles that data as a controller under its own policy: ${GOOGLE_PRIVACY}. How Google uses information from apps that use its services: ${GOOGLE_PARTNERS}. Nekodojo doesn't receive data that identifies you; it only sees aggregated ad statistics.`,
      ],
    },
    {
      heading: "5. Your consent for ads",
      blocks: [
        {
          list: [
            "Google's consent form: where the rules of your region require it (for example, in the European Economic Area or the United Kingdom), the app shows Google's form before loading ads. You can change your choice in Settings → Ad preferences.",
            "App Tracking Transparency (iPhone): the app asks whether you allow tracking. If you don't, the app doesn't access the IDFA and ads aren't personalized with it. You can change this in Settings → Privacy & Security → Tracking.",
            "Android: you can reset or delete your advertising ID in Settings → Privacy → Ads (or Settings → Google → Ads, depending on your phone).",
          ],
        },
        "If you don't give consent, the app still works in full; ads may not show or may be non-personalized.",
      ],
    },
    {
      heading: "6. Legal pages and internet connection",
      blocks: [
        "The questions and the manual are inside the app, so studying doesn't need a connection. The app only uses the internet for ads and to open these legal pages.",
        `The Privacy and legal pages load inside the app from ${SITE}. That site uses no analytics or advertising; like any website, its hosting provider may log technical connection data (such as the IP address) for security and to keep it running.`,
      ],
    },
    {
      heading: "7. Device permissions",
      blocks: [
        "On Android, the app declares these permissions, all related to the connection and ads:",
        {
          list: [
            "INTERNET and ACCESS_NETWORK_STATE: load ads and the legal pages, and check whether there's a connection.",
            "AD_ID and the AdServices permissions (advertising ID, attribution and topics): used by the Google Mobile Ads SDK for ads, subject to your consent and your phone's settings.",
            "WAKE_LOCK and FOREGROUND_SERVICE: added by Google's libraries for their internal operation; the app doesn't use them for anything else.",
          ],
        },
        "On iPhone, the only permission requested is tracking (App Tracking Transparency), explained in section 5.",
      ],
    },
    {
      heading: "8. Purpose and legal basis",
      blocks: [
        "We handle the data in this policy for two purposes: making the app work (keeping your history and font size on your phone) and funding it with ads. The legal basis is, as applicable, providing the service you request by using the app and your consent for ads and tracking, under Law No. 29733, Peru's Personal Data Protection Law, and its regulations.",
      ],
    },
    {
      heading: "9. International transfers",
      blocks: [
        "Google may process ad data on servers outside Peru, including the United States, with the safeguards described in its privacy policy.",
      ],
    },
    {
      heading: "10. Retention",
      blocks: [
        "Local data stays on your phone until you delete it or uninstall the app; the history keeps at most the last 50 results. Google sets the retention periods for ad data in its policy.",
      ],
    },
    {
      heading: "11. Your rights",
      blocks: [
        "Under Law No. 29733 you have the rights of access, rectification, cancellation and objection. Since Nekodojo keeps none of your data on servers, the most direct way to exercise them over local data is to delete it from the app or your phone's settings. For ad data, use the controls in section 5 or Google's tools.",
        `If you have questions or want to make a request, write to ${CONTACT_EMAIL} and we'll reply within the legal deadlines. You can also contact the National Authority for Personal Data Protection of Peru's Ministry of Justice and Human Rights.`,
      ],
    },
    {
      heading: "12. Children",
      blocks: [
        "ApruebaSUCAMEC is meant for adults preparing for a firearms license, which in Peru requires being of legal age. It isn't aimed at anyone under 18, and we don't knowingly collect data from minors. If you're a parent or guardian and believe a minor used the app, write to us.",
      ],
    },
    {
      heading: "13. Security",
      blocks: [
        "Local data is protected by your operating system's security measures. The app's connections to Google and to this site are encrypted (HTTPS).",
      ],
    },
    {
      heading: "14. Changes to this policy",
      blocks: [
        "If what the app does with your data changes (for example, new ad formats or new services), we'll update this page and its date before the change reaches the app.",
      ],
    },
    {
      heading: "15. Contact",
      blocks: ["For any question about this policy or your data:", contactEn],
    },
  ],
};

const termsEs: LegalDoc = {
  intro: [
    "Estos términos regulan el uso de ApruebaSUCAMEC, una app de Nekodojo para preparar el examen teórico de SUCAMEC en Perú. Al descargarla o usarla, los aceptas. Si no estás de acuerdo, no la uses.",
  ],
  sections: [
    {
      heading: "1. Qué es la app",
      blocks: [
        "ApruebaSUCAMEC es una herramienta de estudio para Android e iOS. Ofrece un banco de preguntas tipo examen, simulacros (con y sin tiempo), un simulacro personalizado, el banco completo con las respuestas visibles, un manual de desmontaje en imágenes, resultados, revisión de respuestas e historial. Funciona sin cuenta y, salvo los anuncios y las páginas legales, sin conexión.",
      ],
    },
    {
      heading: "2. No es una app oficial",
      blocks: [
        "ApruebaSUCAMEC es independiente. No está afiliada, patrocinada ni aprobada por la SUCAMEC ni por ninguna entidad del Estado peruano, y no realiza trámites ni emite licencias. El nombre SUCAMEC se usa solo para indicar el examen al que se orienta la app.",
        "Para requisitos, fechas, costos y el contenido oficial del examen, consulta siempre los canales oficiales de la SUCAMEC.",
      ],
    },
    {
      heading: "3. Finalidad educativa, sin garantía de resultado",
      blocks: [
        "La app es un apoyo para estudiar. Ponemos cuidado en las preguntas y respuestas, pero pueden contener errores o quedar desactualizadas si cambian las normas o el examen. Los resultados de los simulacros, incluido el criterio de aprobado de la app (70 % o más), son una referencia de práctica y no anticipan ni garantizan el resultado del examen real.",
        "Si encuentras un error en una pregunta, escríbenos para revisarla.",
      ],
    },
    {
      heading: "4. Manual de armas y seguridad",
      blocks: [
        "El manual de desmontaje es material de estudio referencial para el examen teórico. No reemplaza la instrucción práctica de un instructor autorizado, el manual del fabricante ni las normas de seguridad. Manipula armas de fuego solo si estás autorizado por ley y siguiendo siempre las normas de seguridad. Nekodojo no se hace responsable del uso que se dé a esa información.",
      ],
    },
    {
      heading: "5. Uso permitido",
      blocks: [
        "Te damos una licencia personal, gratuita, no exclusiva e intransferible para usar la app en tus dispositivos con fines de estudio. No está permitido:",
        {
          list: [
            "Copiar, extraer, vender o redistribuir el banco de preguntas, las imágenes del manual u otros contenidos de la app.",
            "Descompilar, modificar o hacer ingeniería inversa de la app, salvo lo que la ley permita expresamente.",
            "Interferir con los anuncios de forma fraudulenta (por ejemplo, generar clics o impresiones falsas).",
            "Usar la app para cualquier fin ilícito.",
          ],
        },
      ],
    },
    {
      heading: "6. Precio y publicidad",
      blocks: [
        "La app es gratuita y muestra anuncios de Google AdMob, que pueden ser de terceros. No respaldamos los productos o servicios anunciados, y lo que contrates a través de un anuncio es entre tú y el anunciante. El tratamiento de datos de los anuncios se explica en la política de privacidad.",
      ],
    },
    {
      heading: "7. Privacidad",
      blocks: [
        "El uso de tus datos se rige por la política de privacidad de ApruebaSUCAMEC, que forma parte de estos términos.",
      ],
    },
    {
      heading: "8. Propiedad intelectual",
      blocks: [
        "La app, su diseño, su código y su marca pertenecen a Nekodojo. Las normas, documentos oficiales y marcas de terceros que se mencionen pertenecen a sus respectivos titulares.",
      ],
    },
    {
      heading: "9. Disponibilidad y cambios",
      blocks: [
        "Podemos actualizar, cambiar o dejar de ofrecer la app o algunas de sus funciones en cualquier momento. La app se ofrece “tal cual” y “según disponibilidad”, sin garantías de que esté libre de errores o interrupciones.",
      ],
    },
    {
      heading: "10. Limitación de responsabilidad",
      blocks: [
        "En la medida en que la ley lo permita, Nekodojo no responde por daños indirectos ni por decisiones tomadas a partir del contenido de la app, incluido el resultado de tu examen o de tu trámite de licencia. Nada de esto limita los derechos que te reconoce el Código de Protección y Defensa del Consumidor del Perú.",
      ],
    },
    {
      heading: "11. Cambios en estos términos",
      blocks: [
        "Si cambiamos estos términos, publicaremos la nueva versión en esta página con su fecha. Si sigues usando la app después del cambio, se entiende que aceptas la nueva versión.",
      ],
    },
    {
      heading: "12. Ley aplicable",
      blocks: ["Estos términos se rigen por las leyes de la República del Perú."],
    },
    {
      heading: "13. Contacto",
      blocks: ["Para consultas sobre estos términos:", contactEs],
    },
  ],
};

const termsEn: LegalDoc = {
  intro: [
    "These terms govern the use of ApruebaSUCAMEC, a Nekodojo app for preparing Peru's SUCAMEC written test. By downloading or using it, you accept them. If you don't agree, don't use it.",
  ],
  sections: [
    {
      heading: "1. What the app is",
      blocks: [
        "ApruebaSUCAMEC is a study tool for Android and iOS. It offers a bank of exam-style questions, practice exams (timed and untimed), a custom practice exam, the full bank with answers shown, a disassembly manual in images, results, answer review and history. It works without an account and, except for ads and the legal pages, offline.",
      ],
    },
    {
      heading: "2. It's not an official app",
      blocks: [
        "ApruebaSUCAMEC is independent. It isn't affiliated with, sponsored or approved by SUCAMEC or any Peruvian government body, and it doesn't process applications or issue licenses. The name SUCAMEC is used only to indicate the test the app is aimed at.",
        "For requirements, dates, fees and the official content of the test, always check SUCAMEC's official channels.",
      ],
    },
    {
      heading: "3. Educational purpose, no guaranteed outcome",
      blocks: [
        "The app is a study aid. We take care with the questions and answers, but they may contain errors or become outdated if the rules or the test change. Practice exam results, including the app's pass mark (70% or more), are a practice reference and don't predict or guarantee the result of the real test.",
        "If you find an error in a question, write to us so we can review it.",
      ],
    },
    {
      heading: "4. Firearms manual and safety",
      blocks: [
        "The disassembly manual is reference study material for the written test. It doesn't replace hands-on training from an authorized instructor, the manufacturer's manual or safety rules. Only handle firearms if you're legally authorized to, and always follow safety rules. Nekodojo isn't responsible for how that information is used.",
      ],
    },
    {
      heading: "5. Permitted use",
      blocks: [
        "We give you a personal, free, non-exclusive and non-transferable license to use the app on your devices for study. You may not:",
        {
          list: [
            "Copy, extract, sell or redistribute the question bank, the manual's images or other content of the app.",
            "Decompile, modify or reverse engineer the app, except where the law expressly allows it.",
            "Interfere with the ads fraudulently (for example, generating fake clicks or impressions).",
            "Use the app for any unlawful purpose.",
          ],
        },
      ],
    },
    {
      heading: "6. Price and advertising",
      blocks: [
        "The app is free and shows Google AdMob ads, which may come from third parties. We don't endorse the products or services advertised, and anything you buy through an ad is between you and the advertiser. How ad data is handled is explained in the privacy policy.",
      ],
    },
    {
      heading: "7. Privacy",
      blocks: ["The use of your data is governed by the ApruebaSUCAMEC privacy policy, which is part of these terms."],
    },
    {
      heading: "8. Intellectual property",
      blocks: [
        "The app, its design, its code and its brand belong to Nekodojo. Rules, official documents and third-party trademarks mentioned belong to their respective owners.",
      ],
    },
    {
      heading: "9. Availability and changes",
      blocks: [
        "We may update, change or stop offering the app or some of its features at any time. The app is provided “as is” and “as available”, with no guarantee that it will be free of errors or interruptions.",
      ],
    },
    {
      heading: "10. Limitation of liability",
      blocks: [
        "To the extent the law allows, Nekodojo isn't liable for indirect damages or for decisions made based on the app's content, including the result of your test or license application. Nothing here limits your rights under Peru's Consumer Protection and Defense Code.",
      ],
    },
    {
      heading: "11. Changes to these terms",
      blocks: [
        "If we change these terms, we'll publish the new version on this page with its date. If you keep using the app after the change, you're considered to accept the new version.",
      ],
    },
    {
      heading: "12. Governing law",
      blocks: ["These terms are governed by the laws of the Republic of Peru."],
    },
    {
      heading: "13. Contact",
      blocks: ["For questions about these terms:", contactEn],
    },
  ],
};

export const apruebasucamecLegal: Record<"privacy" | "terms", Record<Locale, LegalDoc>> = {
  privacy: { es: privacyEs, en: privacyEn },
  terms: { es: termsEs, en: termsEn },
};
