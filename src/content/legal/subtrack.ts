import type { Locale } from "@/i18n/config";
import { CONTACT_EMAIL } from "@/content/site";
import type { LegalDoc } from "./types";

/*
 * SubTrack documents (Nekodojo). This site is the original; Spanish is the original, English a reference translation.
 * Written from the practices given by the owner on 2026-11-26 (NOT re-checked against the app code, and the app
 * isn't published yet). If the app changes any of this, update this file and the dates in src/content/apps.ts.
 */

const GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const FIREBASE_PRIVACY = "https://firebase.google.com/support/privacy";

const contactEs = { list: [`Correo electrónico: ${CONTACT_EMAIL}`, "Responsable: Nekodojo", "Aplicación: SubTrack (Android)"] };
const contactEn = { list: [`Email: ${CONTACT_EMAIL}`, "Controller: Nekodojo", "App: SubTrack (Android)"] };

const privacyEs: LegalDoc = {
  intro: [
    "Esta política explica qué datos trata SubTrack, una app de Nekodojo para gestionar suscripciones personales y compartidas y coordinar su cobro por WhatsApp. En resumen: inicias sesión con tu cuenta de Google, tus datos se guardan en tu dispositivo y en tu propia cuenta en la nube, la app no procesa pagos y no tiene anuncios, analítica ni reporte de fallos de terceros.",
  ],
  sections: [
    {
      heading: "1. Responsable",
      blocks: [
        `El responsable de esta app es Nekodojo, un estudio independiente de apps con sede en Perú. Para cualquier consulta sobre privacidad o para ejercer tus derechos, escribe a ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "2. Datos que tratamos",
      blocks: [
        "Cuenta. Inicias sesión con tu cuenta de Google mediante Firebase Authentication. Se guardan tu nombre, tu correo, la URL de tu foto de perfil y un identificador de usuario.",
        "Datos que tú ingresas:",
        {
          list: [
            "Suscripciones: servicio, monto y día de cobro.",
            "Miembros de las suscripciones compartidas: el nombre y el número de teléfono que tú escribes.",
            "Registros de pago, es decir, quién te pagó y cuándo.",
            "Plantillas de mensaje.",
            "Tus alias de pago: número de teléfono de Yape o Plin, banco y número de cuenta interbancario (CCI).",
          ],
        },
        "Notificaciones. Si das el permiso, la app lo usa solo para recordatorios locales en tu dispositivo. Todavía no hay un servidor que envíe notificaciones push.",
        "No usamos anuncios, analítica ni herramientas de reporte de fallos, y no pedimos acceso a tu ubicación, cámara, micrófono ni lista de contactos.",
      ],
    },
    {
      heading: "3. Para qué los usamos",
      blocks: [
        "Usamos estos datos solo para que la app funcione: identificarte, mostrarte tus suscripciones y quién te debe, recordarte los cobros y armar los mensajes y las exportaciones que tú pides. No vendemos tus datos ni los usamos para publicidad.",
      ],
    },
    {
      heading: "4. Dónde se guardan",
      blocks: [
        "Tus datos se guardan en una base de datos local en tu dispositivo y se sincronizan con Google Cloud Firestore, en la región southamerica-west1 (Santiago, Chile), dentro de tu propia cuenta. Solo esa cuenta puede leerlos. Para el acceso se usa Firebase Authentication.",
        "Firebase y Google Cloud son servicios de Google LLC, que los trata según sus propias políticas:",
        { list: [GOOGLE_PRIVACY, FIREBASE_PRIVACY] },
        "La copia de seguridad en la nube de Android está desactivada para los datos locales de la app: tus datos de cuenta viven en Firestore.",
      ],
    },
    {
      heading: "5. WhatsApp y exportación",
      blocks: [
        "SubTrack no envía mensajes por ti. Solo abre WhatsApp con un mensaje ya redactado; tú decides si lo envías. Nada de esto pasa por Nekodojo.",
        "La exportación a CSV se genera en tu dispositivo y se comparte únicamente donde tú elijas.",
      ],
    },
    {
      heading: "6. Datos de los miembros (terceros)",
      blocks: [
        "Los nombres y teléfonos de tus miembros son datos personales de otras personas que tú ingresas. Debes contar con su consentimiento para registrarlos. SubTrack los usa solo para mostrarte tus suscripciones compartidas y para abrir chats de WhatsApp con ellos cuando tú lo pides. No les escribimos ni los contactamos.",
      ],
    },
    {
      heading: "7. Conservación y eliminación",
      blocks: [
        "Guardamos tus datos mientras tengas tu cuenta. Cerrar sesión no borra tus datos en la nube.",
        "En la app, ve a Ajustes → Eliminar cuenta: se borran de inmediato tu cuenta de Firebase, todos los datos de esa cuenta en Firestore y los datos locales del dispositivo.",
        `Si no tienes la app, escribe a ${CONTACT_EMAIL} pidiendo la eliminación; la completamos en un máximo de 30 días. Más detalle en la página de eliminación de cuenta de SubTrack.`,
      ],
    },
    {
      heading: "8. Tus derechos",
      blocks: [
        `Según la Ley N.° 29733 tienes derecho de acceso, rectificación, cancelación y oposición. Puedes ver y corregir tus datos desde la app, eliminarlos desde Ajustes → Eliminar cuenta o escribir a ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "9. Menores de edad",
      blocks: ["SubTrack no está dirigida a menores de 13 años y no recopilamos a sabiendas datos de menores de esa edad. Si eres padre, madre o tutor y tienes una consulta, escríbenos."],
    },
    {
      heading: "10. Cambios",
      blocks: ["Si cambiamos esta política, publicaremos la nueva versión aquí con su fecha de actualización."],
    },
    { heading: "11. Contacto", blocks: ["Para consultas sobre esta política:", contactEs] },
  ],
};

const privacyEn: LegalDoc = {
  intro: [
    "This policy explains what data SubTrack handles. SubTrack is a Nekodojo app to track personal and shared subscriptions and coordinate collecting each person's share over WhatsApp. In short: you sign in with your Google account, your data is kept on your device and in your own cloud account, the app does not process payments, and it has no ads, no analytics and no third-party crash reporting.",
  ],
  sections: [
    {
      heading: "1. Controller",
      blocks: [
        `The controller of this app is Nekodojo, an independent app studio based in Peru. For any privacy question or to exercise your rights, write to ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "2. Data we handle",
      blocks: [
        "Account. You sign in with your Google account through Firebase Authentication. Your name, email, profile photo URL and a user ID are stored.",
        "Data you enter:",
        {
          list: [
            "Subscriptions: service, amount and billing day.",
            "Members of shared subscriptions: the name and phone number you type in.",
            "Payment records, meaning who paid you and when.",
            "Message templates.",
            "Your payment aliases: Yape or Plin phone number, bank and interbank account number (CCI).",
          ],
        },
        "Notifications. If you grant the permission, the app uses it only for local reminders on your device. There is no server sending push notifications yet.",
        "We use no ads, no analytics and no crash-reporting tools, and we don't ask for access to your location, camera, microphone or contact list.",
      ],
    },
    {
      heading: "3. What we use it for",
      blocks: [
        "We use this data only to make the app work: to identify you, show your subscriptions and who owes you, remind you of charges and build the messages and exports you ask for. We don't sell your data or use it for advertising.",
      ],
    },
    {
      heading: "4. Where it is stored",
      blocks: [
        "Your data is stored in a local database on your device and synced to Google Cloud Firestore, in the southamerica-west1 region (Santiago, Chile), under your own account. Only that account can read it. Firebase Authentication handles sign-in.",
        "Firebase and Google Cloud are services of Google LLC, which handles them under its own policies:",
        { list: [GOOGLE_PRIVACY, FIREBASE_PRIVACY] },
        "Android cloud backup is disabled for the app's local data: your account data lives in Firestore.",
      ],
    },
    {
      heading: "5. WhatsApp and export",
      blocks: [
        "SubTrack doesn't send messages for you. It only opens WhatsApp with a pre-written message, and you decide whether to send it. None of this goes through Nekodojo.",
        "The CSV export is generated on your device and shared only where you choose.",
      ],
    },
    {
      heading: "6. Members' data (third parties)",
      blocks: [
        "The names and phone numbers of your members are other people's personal data that you enter. You must have their consent to record them. SubTrack uses them only to show you your shared subscriptions and to open WhatsApp chats with them when you ask. We don't write to them or contact them.",
      ],
    },
    {
      heading: "7. Retention and deletion",
      blocks: [
        "We keep your data while you have your account. Signing out does not delete your cloud data.",
        "In the app, go to Settings → Delete account (Ajustes → Eliminar cuenta): your Firebase account, all that account's data in Firestore and the local data on the device are deleted immediately.",
        `If you don't have the app, write to ${CONTACT_EMAIL} asking for deletion; we complete it within 30 days. More detail on SubTrack's account deletion page.`,
      ],
    },
    {
      heading: "8. Your rights",
      blocks: [
        `Under Law No. 29733 you have the rights of access, rectification, cancellation and objection. You can view and correct your data in the app, delete it from Settings → Delete account, or write to ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "9. Children",
      blocks: ["SubTrack is not directed to children under 13 and we don't knowingly collect data from children that age. If you are a parent or guardian and have a question, write to us."],
    },
    {
      heading: "10. Changes",
      blocks: ["If we change this policy, we'll publish the new version here with its update date."],
    },
    { heading: "11. Contact", blocks: ["For questions about this policy:", contactEn] },
  ],
};

const termsEs: LegalDoc = {
  intro: ["Estos términos regulan el uso de SubTrack, una app de Nekodojo. Al usarla, los aceptas."],
  sections: [
    {
      heading: "1. Qué es SubTrack",
      blocks: [
        "SubTrack te ayuda a llevar tus suscripciones personales y compartidas (por ejemplo, de servicios de streaming o música) y a coordinar con otras personas cuánto debe cada una. Es una herramienta de organización.",
      ],
    },
    {
      heading: "2. No procesamos pagos",
      blocks: [
        "SubTrack no procesa, recibe ni guarda dinero. Solo ayuda a coordinar quién debe qué. Los pagos se hacen fuera de la app, directamente entre tú y tus miembros, y son responsabilidad de ustedes. Nekodojo no interviene en esos pagos ni en las disputas que surjan.",
      ],
    },
    {
      heading: "3. Tu cuenta",
      blocks: [
        "Inicias sesión con tu cuenta de Google. Eres responsable de la actividad de tu cuenta y de la veracidad de los datos que ingresas. Puedes eliminar tu cuenta cuando quieras desde Ajustes → Eliminar cuenta.",
      ],
    },
    {
      heading: "4. Datos de otras personas y WhatsApp",
      blocks: [
        "Si registras nombres y teléfonos de otras personas, declaras que tienes su consentimiento. Usa los mensajes de cobro con respeto y conforme a la ley; no los uses para acosar ni para enviar mensajes no deseados. SubTrack solo abre WhatsApp con un texto redactado; el envío y su contenido son tuyos.",
      ],
    },
    {
      heading: "5. Uso aceptable",
      blocks: ["No uses la app para actividades ilegales, para vulnerar derechos de terceros ni para intentar acceder a datos de otras cuentas."],
    },
    {
      heading: "6. Marcas de terceros",
      blocks: ["Los nombres de servicios (por ejemplo, Netflix o Spotify) pertenecen a sus titulares. SubTrack es independiente y no está afiliada a ellos."],
    },
    {
      heading: "7. Propiedad intelectual",
      blocks: ["La app, su diseño y su código son de Nekodojo. Tus datos siguen siendo tuyos."],
    },
    {
      heading: "8. Garantías y responsabilidad",
      blocks: [
        "La app se ofrece «tal cual». Haremos lo posible por que funcione bien, pero no garantizamos que no tenga interrupciones o errores. Revisa siempre tus montos y fechas. En la medida que la ley lo permita, Nekodojo no responde por pérdidas derivadas del uso de la app ni por pagos entre usuarios.",
      ],
    },
    {
      heading: "9. Cambios",
      blocks: ["Podemos actualizar estos términos. La versión vigente es la publicada aquí, con su fecha de actualización."],
    },
    { heading: "10. Ley aplicable", blocks: ["Estos términos se rigen por las leyes de la República del Perú."] },
    { heading: "11. Contacto", blocks: ["Para consultas sobre estos términos:", contactEs] },
  ],
};

const termsEn: LegalDoc = {
  intro: ["These terms govern the use of SubTrack, a Nekodojo app. By using it, you accept them."],
  sections: [
    {
      heading: "1. What SubTrack is",
      blocks: [
        "SubTrack helps you keep track of your personal and shared subscriptions (for example, streaming or music services) and coordinate with other people how much each one owes. It is an organizing tool.",
      ],
    },
    {
      heading: "2. We don't process payments",
      blocks: [
        "SubTrack doesn't process, receive or hold money. It only helps coordinate who owes what. Payments happen outside the app, directly between you and your members, and are your responsibility. Nekodojo takes no part in those payments or in any dispute that arises.",
      ],
    },
    {
      heading: "3. Your account",
      blocks: [
        "You sign in with your Google account. You are responsible for your account's activity and for the accuracy of the data you enter. You can delete your account at any time from Settings → Delete account.",
      ],
    },
    {
      heading: "4. Other people's data and WhatsApp",
      blocks: [
        "If you record other people's names and phone numbers, you declare that you have their consent. Use the collection messages respectfully and lawfully; don't use them to harass or to send unwanted messages. SubTrack only opens WhatsApp with a drafted text; sending it and its content are up to you.",
      ],
    },
    {
      heading: "5. Acceptable use",
      blocks: ["Don't use the app for illegal activities, to infringe third parties' rights or to try to access other accounts' data."],
    },
    {
      heading: "6. Third-party names",
      blocks: ["Service names (for example, Netflix or Spotify) belong to their owners. SubTrack is independent and isn't affiliated with them."],
    },
    {
      heading: "7. Intellectual property",
      blocks: ["The app, its design and its code belong to Nekodojo. Your data remains yours."],
    },
    {
      heading: "8. Warranties and liability",
      blocks: [
        "The app is provided \"as is\". We'll do our best to keep it working well, but we don't guarantee it will be free of interruptions or errors. Always check your amounts and dates. To the extent the law allows, Nekodojo isn't liable for losses arising from using the app or for payments between users.",
      ],
    },
    {
      heading: "9. Changes",
      blocks: ["We may update these terms. The current version is the one published here, with its update date."],
    },
    { heading: "10. Governing law", blocks: ["These terms are governed by the laws of the Republic of Peru."] },
    { heading: "11. Contact", blocks: ["For questions about these terms:", contactEn] },
  ],
};

export const subtrackLegal: Record<"privacy" | "terms", Record<Locale, LegalDoc>> = {
  privacy: { es: privacyEs, en: privacyEn },
  terms: { es: termsEs, en: termsEn },
};

/** Account deletion page (linked from Google Play's Data safety form). */
export const subtrackDeletion: Record<Locale, { title: string; description: string; doc: LegalDoc }> = {
  es: {
    title: "Eliminar tu cuenta de SubTrack",
    description: "Cómo eliminar tu cuenta de SubTrack y los datos asociados, con o sin la app.",
    doc: {
      intro: ["Puedes eliminar tu cuenta de SubTrack y todos los datos asociados en cualquier momento, de dos maneras."],
      sections: [
        {
          heading: "Desde la app (inmediato)",
          blocks: [
            { list: ["Abre SubTrack e inicia sesión.", "Ve a Ajustes → Eliminar cuenta.", "Confirma la eliminación."] },
            "Se borran de inmediato tu cuenta de Firebase Authentication, todos los datos de tu cuenta en Google Cloud Firestore y los datos locales del dispositivo.",
          ],
        },
        {
          heading: "Sin la app (hasta 30 días)",
          blocks: [
            `Si ya no tienes la app o no puedes iniciar sesión, escribe a ${CONTACT_EMAIL} desde el correo de tu cuenta de Google pidiendo la eliminación. La completamos en un máximo de 30 días.`,
          ],
        },
        {
          heading: "Qué se elimina",
          blocks: [
            {
              list: [
                "Tu cuenta: nombre, correo, URL de la foto de perfil e identificador de usuario.",
                "Tus suscripciones, los miembros (nombres y teléfonos), los registros de pago y las plantillas de mensaje.",
                "Tus alias de pago: Yape o Plin, banco y CCI.",
                "Los datos locales guardados en el dispositivo.",
              ],
            },
          ],
        },
        {
          heading: "Cerrar sesión no es eliminar",
          blocks: ["Si solo cierras sesión, tus datos en la nube se conservan. Para borrarlos, elimina la cuenta como se explica arriba."],
        },
      ],
    },
  },
  en: {
    title: "Delete your SubTrack account",
    description: "How to delete your SubTrack account and its data, with or without the app.",
    doc: {
      intro: ["You can delete your SubTrack account and all its data at any time, in two ways."],
      sections: [
        {
          heading: "From the app (immediate)",
          blocks: [
            { list: ["Open SubTrack and sign in.", "Go to Settings → Delete account (Ajustes → Eliminar cuenta).", "Confirm the deletion."] },
            "Your Firebase Authentication account, all your account's data in Google Cloud Firestore and the local data on the device are deleted immediately.",
          ],
        },
        {
          heading: "Without the app (up to 30 days)",
          blocks: [
            `If you no longer have the app or can't sign in, write to ${CONTACT_EMAIL} from your Google account's email asking for deletion. We complete it within 30 days.`,
          ],
        },
        {
          heading: "What is deleted",
          blocks: [
            {
              list: [
                "Your account: name, email, profile photo URL and user ID.",
                "Your subscriptions, members (names and phone numbers), payment records and message templates.",
                "Your payment aliases: Yape or Plin, bank and CCI.",
                "The local data stored on the device.",
              ],
            },
          ],
        },
        {
          heading: "Signing out is not deleting",
          blocks: ["If you only sign out, your cloud data is kept. To delete it, delete the account as explained above."],
        },
      ],
    },
  },
};
