import type { Locale } from "@/i18n/config";
import { CONTACT_EMAIL, SITE_URL } from "@/content/site";
import type { LegalDoc } from "./types";

/*
 * Cazadores Perú documents. This site is the original: the app opens these pages from
 * AppConfig.PRIVACY_POLICY_URL / TERMS_URL. Spanish is the original; English is a reference translation.
 *
 * Every practice here was checked against the app's code (HunterXPeru, 2026-11-18):
 * - No accounts, no own backend, no analytics or crash reporting, no Firebase SDK.
 * - Local storage: Room (saved posters "favorites", weekly list with thumbnails, search/detail/catalog
 *   caches with a 7-day TTL) and DataStore (onboarding_done, theme_mode).
 * - Network: the weekly list and photos from Firebase Storage over plain HTTPS (sync/sync_requisitoriados.py
 *   publishes it and deletes people who are no longer listed), the Mininter API as fallback,
 *   Google Mobile Ads (banners on Home, Search, My posters and each record; never on report or onboarding)
 *   with UMP and ATT, and these pages in a WebView. User-Agent "CazadoresPeru/<version> (<platform>)".
 * - Report: tel: 0-800-40-007 / 1818, or mailto: denuncias@mininter.gob.pe drafted on the phone.
 * - Share: poster image built on the device and handed to the system share sheet; on iOS,
 *   NSPhotoLibraryAddUsageDescription only for saving it to Photos.
 * - Android permissions from the release APK (aapt dump permissions).
 * 2026-11-19, next build (changes given by the owner, NOT re-checked against the app code): the "hide ads"
 * option (ads_hidden) no longer exists; banners also at the bottom of each record; a rewarded ad before sharing
 * a poster (no ad if none is available or there is no UMP consent); recompensas.pe opens in a WebView from Settings.
 * If the app changes any of this, update this file and the dates in src/content/apps.ts.
 */

const GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const GOOGLE_PARTNERS = "https://policies.google.com/technologies/partner-sites";
const SOURCE = "https://recompensas.pe";
const SITE = SITE_URL.replace(/^https?:\/\//, "");

const contactEs = {
  list: [`Correo electrónico: ${CONTACT_EMAIL}`, "Responsable: Nekodojo", "Aplicación: Cazadores Perú (Android e iOS)"],
};
const contactEn = {
  list: [`Email: ${CONTACT_EMAIL}`, "Controller: Nekodojo", "App: Cazadores Perú (Android and iOS)"],
};

const privacyEs: LegalDoc = {
  intro: [
    "Esta política explica qué datos trata Cazadores Perú, una app de Nekodojo que muestra a las personas buscadas por el Programa de Recompensas del Ministerio del Interior. En resumen: la app no tiene cuentas ni servidor propio, no envía ni guarda tus reportes, guarda tus carteles solo en tu teléfono y muestra anuncios de Google AdMob, que sí pueden recopilar datos de tu dispositivo según tu consentimiento.",
  ],
  sections: [
    {
      heading: "1. Responsable",
      blocks: [
        `El responsable de esta app es Nekodojo, un estudio independiente de apps con sede en Perú. Para cualquier consulta sobre privacidad o para ejercer tus derechos, escribe a ${CONTACT_EMAIL}.`,
        "Cazadores Perú no está afiliada al Ministerio del Interior (Mininter) ni a la Policía Nacional del Perú (PNP).",
      ],
    },
    {
      heading: "2. Lo que no recopilamos",
      blocks: [
        {
          list: [
            "No pedimos registro, nombre, correo, número de teléfono ni documento de identidad.",
            "No tenemos un servidor propio: lo que buscas, guardas o reportas no se envía a Nekodojo.",
            "No usamos herramientas de analítica ni de reportes de errores.",
            "No pedimos acceso a tu ubicación, cámara, micrófono ni contactos, y la app no lee tu galería.",
          ],
        },
      ],
    },
    {
      heading: "3. Reportes y llamadas",
      blocks: [
        "Cuando reportas un avistamiento, la app no actúa como intermediaria:",
        {
          list: [
            "Llamar: la app abre el marcador de tu teléfono con la línea gratuita 0-800-40-007 o con el 1818. La llamada va directo a esas líneas; la app no la graba ni registra.",
            "Por escrito: la app arma un correo dirigido a denuncias@mininter.gob.pe con el lugar, la fecha y los detalles que escribas, y lo abre en tu app de correo. Tú decides si lo envías. La app no envía ni guarda ese texto.",
          ],
        },
        "Lo que entregues a esas líneas o a ese correo lo trata el Ministerio del Interior según sus propias normas, no Nekodojo.",
      ],
    },
    {
      heading: "4. Datos guardados en tu teléfono",
      blocks: [
        "Para que la app funcione, incluso sin conexión, guarda en el almacenamiento local de tu dispositivo:",
        {
          list: [
            "Los carteles que guardas en Mis carteles.",
            "La lista semanal de personas buscadas con sus fotos en miniatura, y copias temporales de búsquedas y fichas consultadas, que se renuevan a los 7 días.",
            "Tus preferencias: el tema (sistema, claro u oscuro) y si ya viste la introducción.",
          ],
        },
        "Estos datos no salen de tu teléfono y nosotros no podemos verlos. Puedes quitar un cartel desde Mis carteles, y borrar todo lo demás borrando los datos de la app en los ajustes del sistema o desinstalándola.",
      ],
    },
    {
      heading: "5. Datos de las personas buscadas",
      blocks: [
        `La app muestra nombres, fotos, delitos imputados, ubicación de referencia y montos de recompensa que el Ministerio del Interior publica en la web del Programa de Recompensas (${SOURCE}). Son datos que el Estado difunde para que la ciudadanía pueda reconocer y reportar a estas personas, y la app los muestra con esa misma finalidad.`,
        "Una vez por semana copiamos esa lista pública a un almacenamiento en la nube (Firebase Storage, de Google), de donde la descarga la app. Quien deja de figurar en la web oficial deja de aparecer en la app tras la siguiente actualización; un cartel que guardaste en tu teléfono puede seguir ahí hasta que lo quites.",
        `Si los datos de una persona son incorrectos, la corrección corresponde al Ministerio del Interior. Si figuras en la lista o representas a alguien que figura y tienes una consulta sobre cómo los muestra la app, escríbenos a ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "6. Publicidad (Google AdMob)",
      blocks: [
        "Cazadores Perú es gratuita y se financia con anuncios de Google AdMob, un servicio de Google LLC. La app muestra banners en Inicio, en la lista de Buscar, en Mis carteles y al final de la ficha de cada persona. Antes de compartir un cartel puede mostrarte un anuncio bonificado de pantalla completa, solo si aceptas verlo. Nunca muestra anuncios en la pantalla de reporte ni en la introducción, ni anuncios que aparezcan sin que los pidas al abrir o cerrar pantallas. Si más adelante usa otros formatos de AdMob, esta política se actualizará.",
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
      heading: "7. Tu consentimiento para los anuncios",
      blocks: [
        {
          list: [
            "Formulario de consentimiento de Google: cuando la normativa de tu región lo exige (por ejemplo, en el Espacio Económico Europeo o el Reino Unido), la app muestra el formulario de Google antes de cargar anuncios. Puedes cambiar tu decisión en Ajustes → Preferencias de anuncios.",
            "App Tracking Transparency (iPhone): la app te pregunta si permites el rastreo. Si no lo permites, la app no accede al IDFA y los anuncios no se personalizan con él. Puedes cambiarlo en Ajustes → Privacidad y seguridad → Rastreo.",
            "Android: puedes restablecer o eliminar tu ID de publicidad en Ajustes → Privacidad → Anuncios (o Ajustes → Google → Anuncios, según tu teléfono).",
          ],
        },
        "Si no das tu consentimiento, la app sigue funcionando completa; los anuncios pueden no mostrarse o ser no personalizados.",
      ],
    },
    {
      heading: "8. Conexiones a internet",
      blocks: [
        "La app se conecta solo a estos servicios, siempre de forma cifrada (HTTPS):",
        {
          list: [
            "Firebase Storage (Google): para descargar la lista semanal y las fotos.",
            "La API pública del Programa de Recompensas del Ministerio del Interior: como respaldo, si la lista semanal no está disponible.",
            "Google AdMob: para los anuncios (secciones 6 y 7).",
            `${SITE}: para mostrar estas páginas legales dentro de la app.`,
          ],
        },
        "En esas conexiones la app solo envía lo necesario para pedir los datos (por ejemplo, el nombre que buscas cuando se usa la API de respaldo) y se identifica con su nombre y versión. Como cualquier servicio en internet, esos proveedores pueden registrar datos técnicos de la conexión, como la dirección IP, por seguridad y para su funcionamiento. Este sitio no usa publicidad, y solo usa Google Analytics si lo aceptas en su aviso de cookies.",
        "Si abres “Fuente de datos: recompensas.pe” desde Ajustes, la web oficial del Programa de Recompensas se carga dentro de la app. Ese sitio, del Ministerio del Interior, recibe los mismos datos técnicos que si lo abrieras en tu navegador (por ejemplo, la dirección IP) y los trata según sus propias condiciones. Los enlaces a otros sitios se abren en tu navegador.",
      ],
    },
    {
      heading: "9. Compartir carteles",
      blocks: [
        "Cuando compartes un cartel, la app crea la imagen en tu teléfono y la entrega al menú de compartir del sistema; tú eliges con quién y por dónde. En iPhone, si eliges guardar la imagen en Fotos, el sistema te pide permiso para agregarla; la app no lee tu galería. Nekodojo no recibe lo que compartes.",
        "Antes de compartir, la app te avisa que verás un anuncio corto de Google AdMob y te deja cancelar. Al terminar el anuncio se abre el menú de compartir. Si no hay un anuncio disponible, o no diste tu consentimiento para los anuncios, el cartel se comparte sin anuncio. Ese anuncio está sujeto a lo descrito en la sección 6.",
      ],
    },
    {
      heading: "10. Permisos del dispositivo",
      blocks: [
        "En Android, la app declara estos permisos, todos relacionados con la conexión y los anuncios:",
        {
          list: [
            "INTERNET y ACCESS_NETWORK_STATE: descargar la lista, las fotos, los anuncios, las páginas legales y la web oficial recompensas.pe, y saber si hay conexión.",
            "AD_ID y los permisos de AdServices (ID de publicidad, atribución y temas): los usa el SDK de Google Mobile Ads para los anuncios, sujeto a tu consentimiento y a los ajustes de tu teléfono.",
            "WAKE_LOCK y FOREGROUND_SERVICE: los agregan las bibliotecas de Google para su funcionamiento interno; la app no los usa para nada más.",
          ],
        },
        "En iPhone, la app solicita el permiso de rastreo (App Tracking Transparency, sección 7) y, solo si decides guardar un cartel en Fotos, el permiso para agregar imágenes a tu galería.",
      ],
    },
    {
      heading: "11. Finalidad y base legal",
      blocks: [
        "Tratamos los datos de esta política para que la app funcione (mostrar la lista pública, guardar tus carteles y preferencias en tu teléfono) y para financiarla con publicidad. La base legal es, según el caso, la prestación del servicio que pides al usar la app, el carácter público de los datos que difunde el Estado y tu consentimiento para los anuncios y el rastreo, conforme a la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, y su reglamento.",
      ],
    },
    {
      heading: "12. Transferencias internacionales",
      blocks: [
        "Google puede tratar los datos de los anuncios, y alojar la lista semanal, en servidores ubicados fuera del Perú, incluidos los Estados Unidos, con las garantías que describe su política de privacidad.",
      ],
    },
    {
      heading: "13. Conservación",
      blocks: [
        "Los datos locales se conservan en tu teléfono hasta que los borres o desinstales la app; las copias temporales de búsquedas y fichas se renuevan a los 7 días. Los plazos de conservación de los datos de anuncios los fija Google en su política.",
      ],
    },
    {
      heading: "14. Tus derechos",
      blocks: [
        "Según la Ley N.° 29733 tienes derecho de acceso, rectificación, cancelación y oposición. Como Nekodojo no guarda datos tuyos en servidores, la forma más directa de ejercerlos sobre los datos locales es borrarlos desde la app o desde los ajustes del teléfono. Para los datos de anuncios, puedes gestionarlos con los controles de la sección 7 o con las herramientas de Google.",
        `Si tienes dudas o quieres presentar una solicitud, escríbenos a ${CONTACT_EMAIL} y te responderemos en los plazos de la ley. También puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.`,
      ],
    },
    {
      heading: "15. Menores de edad",
      blocks: [
        "La app muestra información sobre delitos graves y no está dirigida a niños. No recopilamos a sabiendas datos de menores. Si eres padre, madre o tutor y tienes una consulta, escríbenos.",
      ],
    },
    {
      heading: "16. Seguridad",
      blocks: [
        "Los datos locales quedan protegidos por las medidas de seguridad de tu sistema operativo. Las conexiones de la app se hacen cifradas (HTTPS).",
      ],
    },
    {
      heading: "17. Cambios en esta política",
      blocks: [
        "Si cambia lo que hace la app con los datos (por ejemplo, nuevos formatos de anuncios o nuevos servicios), actualizaremos esta página y su fecha antes de que el cambio llegue a la app.",
      ],
    },
    {
      heading: "18. Contacto",
      blocks: ["Para cualquier consulta sobre esta política o sobre tus datos:", contactEs],
    },
  ],
};

const privacyEn: LegalDoc = {
  intro: [
    "This policy explains what data Cazadores Perú handles. It's a Nekodojo app that shows the people wanted by the Rewards Program of Peru's Ministry of the Interior. In short: the app has no accounts and no server of its own, doesn't send or store your reports, keeps your posters only on your phone, and shows Google AdMob ads, which may collect data from your device depending on your consent.",
  ],
  sections: [
    {
      heading: "1. Controller",
      blocks: [
        `This app is run by Nekodojo, an independent app studio based in Peru. For any privacy question, or to exercise your rights, write to ${CONTACT_EMAIL}.`,
        "Cazadores Perú isn't affiliated with Peru's Ministry of the Interior (Mininter) or the Peruvian National Police (PNP).",
      ],
    },
    {
      heading: "2. What we don't collect",
      blocks: [
        {
          list: [
            "We don't ask you to sign up, and we don't ask for your name, email, phone number or ID.",
            "We have no server of our own: what you search, save or report is never sent to Nekodojo.",
            "We don't use analytics or crash-reporting tools.",
            "We don't ask for access to your location, camera, microphone or contacts, and the app doesn't read your photo library.",
          ],
        },
      ],
    },
    {
      heading: "3. Reports and calls",
      blocks: [
        "When you report a sighting, the app doesn't act as a go-between:",
        {
          list: [
            "Call: the app opens your phone's dialer with the free 0-800-40-007 hotline or 1818. The call goes straight to those lines; the app doesn't record or log it.",
            "In writing: the app drafts an email to denuncias@mininter.gob.pe with the place, date and details you type, and opens it in your email app. You decide whether to send it. The app doesn't send or store that text.",
          ],
        },
        "Whatever you give those lines or that address is handled by the Ministry of the Interior under its own rules, not by Nekodojo.",
      ],
    },
    {
      heading: "4. Data stored on your phone",
      blocks: [
        "To work, even offline, the app stores the following in your device's local storage:",
        {
          list: [
            "The posters you save in My posters.",
            "The weekly list of wanted people with their thumbnail photos, and temporary copies of searches and records you opened, which are refreshed after 7 days.",
            "Your preferences: the theme (system, light or dark) and whether you've seen the introduction.",
          ],
        },
        "This data never leaves your phone and we can't see it. You can remove a poster from My posters, and delete everything else by clearing the app's data in your system settings or uninstalling it.",
      ],
    },
    {
      heading: "5. Data about the wanted people",
      blocks: [
        `The app shows names, photos, alleged crimes, reference location and reward amounts that the Ministry of the Interior publishes on the Rewards Program website (${SOURCE}). The State makes this data public so people can recognize and report these individuals, and the app shows it for that same purpose.`,
        "Once a week we copy that public list to cloud storage (Firebase Storage, by Google), where the app downloads it from. Anyone who is no longer on the official website stops appearing in the app after the next update; a poster you saved on your phone may stay there until you remove it.",
        `If someone's data is wrong, correcting it is up to the Ministry of the Interior. If you are on the list, or represent someone who is, and have a question about how the app shows it, write to ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "6. Advertising (Google AdMob)",
      blocks: [
        "Cazadores Perú is free and funded by Google AdMob ads, a service of Google LLC. The app shows banners on Home, in the Search list, in My posters and at the bottom of each person's record. Before you share a poster it may show you a full-screen rewarded ad, only if you agree to watch it. It never shows ads on the report screen or in the introduction, nor ads that appear, without you asking for them, when you open or close screens. If it later uses other AdMob formats, this policy will be updated.",
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
      heading: "7. Your consent for ads",
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
      heading: "8. Internet connections",
      blocks: [
        "The app connects only to these services, always encrypted (HTTPS):",
        {
          list: [
            "Firebase Storage (Google): to download the weekly list and the photos.",
            "The public API of the Interior Ministry's Rewards Program: as a fallback, if the weekly list isn't available.",
            "Google AdMob: for ads (sections 6 and 7).",
            `${SITE}: to show these legal pages inside the app.`,
          ],
        },
        "Over those connections the app only sends what it needs to request the data (for example, the name you search for when the fallback API is used) and identifies itself with its name and version. Like any internet service, those providers may log technical connection data, such as the IP address, for security and to keep running. This site uses no advertising, and only uses Google Analytics if you accept it in its cookie notice.",
        "If you open “Data source: recompensas.pe” from Settings, the official website of the Rewards Program loads inside the app. That site, run by the Ministry of the Interior, receives the same technical data as if you opened it in your browser (for example, the IP address) and handles it under its own terms. Links to other sites open in your browser.",
      ],
    },
    {
      heading: "9. Sharing posters",
      blocks: [
        "When you share a poster, the app builds the image on your phone and hands it to the system share menu; you choose who gets it and how. On iPhone, if you choose to save the image to Photos, the system asks your permission to add it; the app doesn't read your photo library. Nekodojo doesn't receive what you share.",
        "Before you share, the app tells you that you will see a short Google AdMob ad and lets you cancel. When the ad ends, the share menu opens. If no ad is available, or you did not give your consent for ads, the poster is shared without an ad. That ad is subject to what section 6 describes.",
      ],
    },
    {
      heading: "10. Device permissions",
      blocks: [
        "On Android, the app declares these permissions, all related to the connection and ads:",
        {
          list: [
            "INTERNET and ACCESS_NETWORK_STATE: download the list, photos, ads, legal pages and the official recompensas.pe website, and check whether there's a connection.",
            "AD_ID and the AdServices permissions (advertising ID, attribution and topics): used by the Google Mobile Ads SDK for ads, subject to your consent and your phone's settings.",
            "WAKE_LOCK and FOREGROUND_SERVICE: added by Google's libraries for their internal operation; the app doesn't use them for anything else.",
          ],
        },
        "On iPhone, the app asks for tracking permission (App Tracking Transparency, section 7) and, only if you decide to save a poster to Photos, permission to add images to your library.",
      ],
    },
    {
      heading: "11. Purpose and legal basis",
      blocks: [
        "We handle the data in this policy to make the app work (showing the public list, keeping your posters and preferences on your phone) and to fund it with ads. The legal basis is, as applicable, providing the service you request by using the app, the public nature of the data the State publishes, and your consent for ads and tracking, under Law No. 29733, Peru's Personal Data Protection Law, and its regulations.",
      ],
    },
    {
      heading: "12. International transfers",
      blocks: [
        "Google may process ad data, and host the weekly list, on servers outside Peru, including the United States, with the safeguards described in its privacy policy.",
      ],
    },
    {
      heading: "13. Retention",
      blocks: [
        "Local data stays on your phone until you delete it or uninstall the app; temporary copies of searches and records are refreshed after 7 days. Google sets the retention periods for ad data in its policy.",
      ],
    },
    {
      heading: "14. Your rights",
      blocks: [
        "Under Law No. 29733 you have the rights of access, rectification, cancellation and objection. Since Nekodojo keeps none of your data on servers, the most direct way to exercise them over local data is to delete it from the app or your phone's settings. For ad data, use the controls in section 7 or Google's tools.",
        `If you have questions or want to make a request, write to ${CONTACT_EMAIL} and we'll reply within the legal deadlines. You can also contact the National Authority for Personal Data Protection of Peru's Ministry of Justice and Human Rights.`,
      ],
    },
    {
      heading: "15. Children",
      blocks: [
        "The app shows information about serious crimes and isn't aimed at children. We don't knowingly collect data from minors. If you're a parent or guardian and have a question, write to us.",
      ],
    },
    {
      heading: "16. Security",
      blocks: ["Local data is protected by your operating system's security measures. The app's connections are encrypted (HTTPS)."],
    },
    {
      heading: "17. Changes to this policy",
      blocks: [
        "If what the app does with data changes (for example, new ad formats or new services), we'll update this page and its date before the change reaches the app.",
      ],
    },
    {
      heading: "18. Contact",
      blocks: ["For any question about this policy or your data:", contactEn],
    },
  ],
};

const termsEs: LegalDoc = {
  intro: [
    "Estos términos regulan el uso de Cazadores Perú, una app de Nekodojo que muestra a las personas buscadas por el Programa de Recompensas del Ministerio del Interior. Al descargarla o usarla, los aceptas. Si no estás de acuerdo, no la uses.",
  ],
  sections: [
    {
      heading: "1. Qué es la app",
      blocks: [
        "Cazadores Perú es una app gratuita para Android e iOS que ordena en carteles la información pública del Programa de Recompensas: quiénes son las personas buscadas, qué delitos se les imputan y cuánto ofrece el Estado por información. Permite buscar y filtrar, ver la ficha de cada persona, guardar carteles, compartirlos como imagen y reportar un avistamiento llamando a las líneas oficiales o preparando un correo. Funciona sin cuenta.",
      ],
    },
    {
      heading: "2. No es una app oficial",
      blocks: [
        "Cazadores Perú es independiente. No está afiliada, patrocinada ni aprobada por el Ministerio del Interior, la Policía Nacional del Perú ni ninguna entidad del Estado peruano, y no forma parte del Programa de Recompensas.",
        `Los datos vienen de la web pública del Programa (${SOURCE}), se actualizan una vez por semana y pueden cambiar sin aviso o contener errores de origen. Antes de actuar, verifica siempre en la fuente oficial. Las clases S, A, B y C son un sello propio de la app según el monto de la recompensa, no una calificación oficial, y el resumen del régimen especial (D. S. N.° 097-2025-PCM) es solo una guía: lo que vale es la norma.`,
      ],
    },
    {
      heading: "3. Tu seguridad primero",
      blocks: [
        "La app sirve para reconocer y avisar, nunca para enfrentarse. Si crees reconocer a una persona buscada:",
        {
          list: [
            "No te acerques, no la sigas, no la confrontes ni intentes detenerla.",
            "Anota el lugar, la hora y cómo estaba vestida.",
            "Llama a la línea gratuita desde un lugar seguro.",
          ],
        },
        "La captura le corresponde a la Policía. Nekodojo no responde por los daños que resulten de no seguir estas indicaciones.",
      ],
    },
    {
      heading: "4. Reportes y recompensas",
      blocks: [
        "La app no recibe, envía ni guarda reportes: solo abre tu marcador o tu app de correo. El reporte lo haces tú ante las autoridades.",
        "La recompensa la otorga el Estado, según sus normas y después de validar la información. Nekodojo no interviene en ese proceso y no puede garantizar que un reporte dé lugar a una recompensa, ni su monto ni sus plazos.",
        "Reporta solo lo que de verdad viste. Dar información falsa a las autoridades a sabiendas puede tener consecuencias legales.",
      ],
    },
    {
      heading: "5. Uso permitido",
      blocks: [
        "Te damos una licencia personal, gratuita, no exclusiva e intransferible para usar la app en tus dispositivos. No está permitido:",
        {
          list: [
            "Usar la información de la app para acosar, amenazar, exponer o hacer justicia por mano propia contra cualquier persona, ni para discriminarla.",
            "Alterar los carteles o difundirlos con datos falsos, burlas o fines distintos a ayudar a ubicar a las personas buscadas.",
            "Presentar la app, sus carteles o tus mensajes como si fueran oficiales del Estado.",
            "Copiar, extraer masivamente o revender los contenidos de la app.",
            "Descompilar, modificar o hacer ingeniería inversa de la app, salvo lo que la ley permita expresamente.",
            "Interferir con los anuncios de forma fraudulenta (por ejemplo, generar clics o impresiones falsas).",
            "Usar la app para cualquier fin ilícito.",
          ],
        },
        "Cuando compartes un cartel, eres responsable de cómo y con quién lo compartes.",
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
      blocks: ["El uso de los datos se rige por la política de privacidad de Cazadores Perú, que forma parte de estos términos."],
    },
    {
      heading: "8. Propiedad intelectual",
      blocks: [
        "La app, su diseño, su código y su marca pertenecen a Nekodojo. Los datos, fotos y documentos del Programa de Recompensas pertenecen al Estado peruano, y las demás marcas que se mencionen pertenecen a sus respectivos titulares.",
      ],
    },
    {
      heading: "9. Disponibilidad y cambios",
      blocks: [
        "Podemos actualizar, cambiar o dejar de ofrecer la app o algunas de sus funciones en cualquier momento. La app depende de la información que publica el Ministerio del Interior: si esa fuente cambia o deja de estar disponible, la app puede mostrar datos desactualizados o dejar de mostrarlos. La app se ofrece “tal cual” y “según disponibilidad”, sin garantías de que esté libre de errores o interrupciones.",
      ],
    },
    {
      heading: "10. Limitación de responsabilidad",
      blocks: [
        "En la medida en que la ley lo permita, Nekodojo no responde por daños indirectos, por errores o desactualizaciones de los datos oficiales, ni por las decisiones o acciones que tomes a partir del contenido de la app. Nada de esto limita los derechos que te reconoce el Código de Protección y Defensa del Consumidor del Perú.",
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
    "These terms govern the use of Cazadores Perú, a Nekodojo app that shows the people wanted by the Rewards Program of Peru's Ministry of the Interior. By downloading or using it, you accept them. If you don't agree, don't use it.",
  ],
  sections: [
    {
      heading: "1. What the app is",
      blocks: [
        "Cazadores Perú is a free app for Android and iOS that organizes the Rewards Program's public information into posters: who the wanted people are, the crimes they're charged with and how much the State offers for information. It lets you search and filter, view each person's record, save posters, share them as images and report a sighting by calling the official lines or drafting an email. It works without an account.",
      ],
    },
    {
      heading: "2. It's not an official app",
      blocks: [
        "Cazadores Perú is independent. It isn't affiliated with, sponsored or approved by the Ministry of the Interior, the Peruvian National Police or any Peruvian government body, and it isn't part of the Rewards Program.",
        `The data comes from the Program's public website (${SOURCE}), is updated once a week and may change without notice or contain errors at the source. Before acting, always check the official source. The S, A, B and C classes are the app's own badge based on the reward amount, not an official rating, and the summary of the special regime (Supreme Decree 097-2025-PCM) is only a guide: the decree is what counts.`,
      ],
    },
    {
      heading: "3. Your safety first",
      blocks: [
        "The app is for recognizing and reporting, never for confronting anyone. If you think you recognize a wanted person:",
        {
          list: [
            "Don't approach, follow or confront them, or try to stop them.",
            "Note the place, time and what they were wearing.",
            "Call the free hotline from a safe place.",
          ],
        },
        "Making the arrest is the police's job. Nekodojo isn't liable for harm resulting from not following these guidelines.",
      ],
    },
    {
      heading: "4. Reports and rewards",
      blocks: [
        "The app doesn't receive, send or store reports: it only opens your dialer or your email app. You make the report to the authorities.",
        "The reward is granted by the State, under its rules and after validating the information. Nekodojo takes no part in that process and can't guarantee that a report leads to a reward, or its amount or timing.",
        "Only report what you actually saw. Knowingly giving false information to the authorities may have legal consequences.",
      ],
    },
    {
      heading: "5. Permitted use",
      blocks: [
        "We give you a personal, free, non-exclusive and non-transferable license to use the app on your devices. You may not:",
        {
          list: [
            "Use the app's information to harass, threaten, expose or take the law into your own hands against anyone, or to discriminate against them.",
            "Alter the posters or spread them with false data, mockery or any purpose other than helping locate the wanted people.",
            "Present the app, its posters or your messages as official State material.",
            "Copy, bulk-extract or resell the app's content.",
            "Decompile, modify or reverse engineer the app, except where the law expressly allows it.",
            "Interfere with the ads fraudulently (for example, by generating fake clicks or impressions).",
            "Use the app for any unlawful purpose.",
          ],
        },
        "When you share a poster, you're responsible for how and with whom you share it.",
      ],
    },
    {
      heading: "6. Price and advertising",
      blocks: [
        "The app is free and shows Google AdMob ads, which may come from third parties. We don't endorse the advertised products or services, and anything you buy through an ad is between you and the advertiser. How ad data is handled is explained in the privacy policy.",
      ],
    },
    {
      heading: "7. Privacy",
      blocks: ["The use of data is governed by the Cazadores Perú privacy policy, which is part of these terms."],
    },
    {
      heading: "8. Intellectual property",
      blocks: [
        "The app, its design, its code and its brand belong to Nekodojo. The Rewards Program's data, photos and documents belong to the Peruvian State, and any other brands mentioned belong to their respective owners.",
      ],
    },
    {
      heading: "9. Availability and changes",
      blocks: [
        "We may update, change or stop offering the app or some of its features at any time. The app depends on the information the Ministry of the Interior publishes: if that source changes or becomes unavailable, the app may show outdated data or stop showing it. The app is provided “as is” and “as available”, with no guarantee that it's free of errors or interruptions.",
      ],
    },
    {
      heading: "10. Limitation of liability",
      blocks: [
        "To the extent the law allows, Nekodojo isn't liable for indirect damages, for errors or outdated official data, or for decisions or actions you take based on the app's content. None of this limits your rights under Peru's Consumer Protection and Defense Code.",
      ],
    },
    {
      heading: "11. Changes to these terms",
      blocks: [
        "If we change these terms, we'll publish the new version on this page with its date. If you keep using the app after the change, you're taken to accept the new version.",
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

export const peruxhunterLegal: Record<"privacy" | "terms", Record<Locale, LegalDoc>> = {
  privacy: { es: privacyEs, en: privacyEn },
  terms: { es: termsEs, en: termsEn },
};
