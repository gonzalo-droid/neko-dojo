import type { Locale } from "@/i18n/config";
import type { LegalDoc } from "./types";

/*
 * Copy of the documents in force at animequote.app (April 2026).
 * Spanish is the original text; English is a reference translation.
 * If you edit the original at animequote.app, update this file too.
 */

const privacyEs: LegalDoc = {
  sections: [
    {
      heading: "1. Información general",
      blocks: [
        "Frases Anime (“la Aplicación”) es desarrollada por NekoDojo. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos la información cuando usas nuestra aplicación para Android.",
        "Al usar Frases Anime, aceptas las prácticas descritas en esta política. Si tienes alguna duda, puedes contactarnos en contacto@gondroid.dev.",
      ],
    },
    {
      heading: "2. Información que recopilamos",
      blocks: [],
    },
    {
      heading: "2.1 Firebase (frases remotas)",
      blocks: [
        "Utilizamos Firebase de Google para gestionar y actualizar el catálogo de frases de forma remota. Firebase puede recopilar datos técnicos anónimos como el identificador de instalación de la app, la versión del sistema operativo y el modelo del dispositivo, con el único fin de entregar el contenido correctamente.",
        "No recopilamos información personal identificable a través de Firebase. Los datos se procesan conforme a la Política de Privacidad de Google (https://policies.google.com/privacy).",
      ],
    },
    {
      heading: "2.2 Google AdMob (anuncios)",
      blocks: [
        "La aplicación muestra anuncios a través de Google AdMob. AdMob puede usar identificadores de publicidad (como el Android Advertising ID) para mostrar anuncios personalizados basados en tus intereses.",
        "Puedes optar por no recibir anuncios personalizados a través de la configuración de tu dispositivo Android en: Ajustes → Google → Anuncios → Inhabilitar personalización de anuncios.",
        "AdMob opera bajo la Política de Privacidad de Google (https://policies.google.com/privacy).",
      ],
    },
    {
      heading: "2.3 Datos locales (Room / SQLite)",
      blocks: [
        "Las frases que marques como favoritas se almacenan exclusivamente en tu dispositivo mediante la base de datos local Room (SQLite). Estos datos nunca se transmiten a servidores externos ni son accesibles por terceros.",
      ],
    },
    {
      heading: "3. Permisos solicitados",
      blocks: [
        "Frases Anime solicita los siguientes permisos en Android:",
        {
          list: [
            "POST_NOTIFICATIONS: necesario para enviar notificaciones diarias con frases motivacionales. Solo se usa si activas las notificaciones en la configuración de la app.",
            "RECEIVE_BOOT_COMPLETED: necesario para restaurar las alarmas de notificación después de que el dispositivo se reinicie, garantizando que recibas tus frases en el horario configurado.",
          ],
        },
        "No solicitamos acceso a la cámara, micrófono, contactos, ubicación ni ningún otro dato sensible.",
      ],
    },
    {
      heading: "4. Uso de la información",
      blocks: [
        "La información recopilada se usa exclusivamente para:",
        {
          list: [
            "Mostrar y actualizar el catálogo de frases del universo anime.",
            "Personalizar y mostrar anuncios a través de AdMob.",
            "Enviar notificaciones de frases en el horario configurado por el usuario.",
            "Mantener la lista de frases favoritas del usuario de forma local.",
          ],
        },
      ],
    },
    {
      heading: "5. Compartición de datos con terceros",
      blocks: [
        "No vendemos, alquilamos ni compartimos datos personales con terceros con fines comerciales. Los únicos servicios de terceros integrados son:",
        { list: ["Google Firebase — gestión de contenido remoto", "Google AdMob — publicidad"] },
        "Ambos servicios son operados por Google LLC y están sujetos a sus propias políticas de privacidad.",
      ],
    },
    {
      heading: "6. Seguridad",
      blocks: [
        "Implementamos medidas técnicas razonables para proteger la información almacenada en el dispositivo. Sin embargo, ningún método de almacenamiento electrónico es 100% seguro. Los datos de favoritos almacenados localmente están protegidos por los mecanismos de seguridad del propio sistema Android.",
      ],
    },
    {
      heading: "7. Privacidad de menores",
      blocks: [
        "Frases Anime no está dirigida a menores de 13 años. No recopilamos intencionalmente información personal de menores de 13 años. Si descubrimos que hemos recopilado datos de un menor, los eliminaremos de inmediato.",
      ],
    },
    {
      heading: "8. Cambios en esta política",
      blocks: [
        "Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva versión en esta página con la fecha de actualización. Te recomendamos revisar esta política periódicamente.",
      ],
    },
    {
      heading: "9. Contacto",
      blocks: [
        "Si tienes preguntas, comentarios o solicitudes sobre esta Política de Privacidad, puedes contactarnos: NekoDojo, desarrollador de Frases Anime — contacto@gondroid.dev.",
      ],
    },
  ],
};

const privacyEn: LegalDoc = {
  sections: [
    {
      heading: "1. General information",
      blocks: [
        "Frases Anime (“the App”) is developed by NekoDojo. This Privacy Policy describes how we collect, use and protect information when you use our Android app.",
        "By using Frases Anime, you accept the practices described in this policy. If you have any questions, contact us at contacto@gondroid.dev.",
      ],
    },
    { heading: "2. Information we collect", blocks: [] },
    {
      heading: "2.1 Firebase (remote quotes)",
      blocks: [
        "We use Google's Firebase to manage and update the quote catalog remotely. Firebase may collect anonymous technical data such as the app installation ID, the operating system version and the device model, solely to deliver the content correctly.",
        "We don't collect personally identifiable information through Firebase. Data is processed under Google's Privacy Policy (https://policies.google.com/privacy).",
      ],
    },
    {
      heading: "2.2 Google AdMob (ads)",
      blocks: [
        "The App shows ads through Google AdMob. AdMob may use advertising identifiers (such as the Android Advertising ID) to show personalized ads based on your interests.",
        "You can opt out of personalized ads in your Android device settings: Settings → Google → Ads → Opt out of ads personalization.",
        "AdMob operates under Google's Privacy Policy (https://policies.google.com/privacy).",
      ],
    },
    {
      heading: "2.3 Local data (Room / SQLite)",
      blocks: [
        "Quotes you mark as favorites are stored only on your device, in the local Room (SQLite) database. This data is never sent to external servers and isn't accessible to third parties.",
      ],
    },
    {
      heading: "3. Permissions requested",
      blocks: [
        "Frases Anime requests the following Android permissions:",
        {
          list: [
            "POST_NOTIFICATIONS: needed to send daily notifications with motivational quotes. Only used if you turn notifications on in the app settings.",
            "RECEIVE_BOOT_COMPLETED: needed to restore notification alarms after the device restarts, so you get your quotes at the scheduled times.",
          ],
        },
        "We don't request access to the camera, microphone, contacts, location or any other sensitive data.",
      ],
    },
    {
      heading: "4. Use of information",
      blocks: [
        "The information collected is used only to:",
        {
          list: [
            "Show and update the anime quote catalog.",
            "Personalize and show ads through AdMob.",
            "Send quote notifications at the times set by the user.",
            "Keep the user's list of favorite quotes locally.",
          ],
        },
      ],
    },
    {
      heading: "5. Sharing data with third parties",
      blocks: [
        "We don't sell, rent or share personal data with third parties for commercial purposes. The only third-party services integrated are:",
        { list: ["Google Firebase — remote content management", "Google AdMob — advertising"] },
        "Both services are operated by Google LLC and are subject to their own privacy policies.",
      ],
    },
    {
      heading: "6. Security",
      blocks: [
        "We apply reasonable technical measures to protect information stored on the device. However, no electronic storage method is 100% secure. Favorites stored locally are protected by the Android system's own security mechanisms.",
      ],
    },
    {
      heading: "7. Children's privacy",
      blocks: [
        "Frases Anime isn't directed at children under 13. We don't knowingly collect personal information from children under 13. If we learn we have collected data from a child, we will delete it immediately.",
      ],
    },
    {
      heading: "8. Changes to this policy",
      blocks: [
        "We may update this Privacy Policy from time to time. We'll announce significant changes by publishing the new version on this page with its update date. We recommend reviewing this policy periodically.",
      ],
    },
    {
      heading: "9. Contact",
      blocks: [
        "If you have questions, comments or requests about this Privacy Policy, contact us: NekoDojo, developer of Frases Anime — contacto@gondroid.dev.",
      ],
    },
  ],
};

const termsEs: LegalDoc = {
  sections: [
    {
      heading: "1. Aceptación de los términos",
      blocks: [
        "Al descargar, instalar o usar Frases Anime (“la Aplicación”), desarrollada por NekoDojo, aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no uses la Aplicación.",
        "Estos términos se aplican a todas las versiones de la Aplicación disponibles en Google Play y App Store.",
      ],
    },
    {
      heading: "2. Descripción del servicio",
      blocks: [
        "Frases Anime es una aplicación gratuita que ofrece una colección de frases y citas del universo anime. Las funcionalidades principales incluyen:",
        {
          list: [
            "Exploración de frases organizadas por personaje y serie.",
            "Guardado de frases favoritas de forma local en el dispositivo.",
            "Notificaciones diarias con frases motivacionales (opcional).",
            "Compartir frases en redes sociales.",
          ],
        },
        "La Aplicación es gratuita y se financia mediante publicidad a través de Google AdMob.",
      ],
    },
    {
      heading: "3. Uso aceptable",
      blocks: [
        "Al usar Frases Anime, te comprometes a no realizar ninguna de las siguientes acciones:",
        {
          list: [
            "Usar la Aplicación con fines ilegales o no autorizados.",
            "Intentar descompilar, hacer ingeniería inversa o extraer el código fuente de la Aplicación.",
            "Interferir con el funcionamiento normal de la Aplicación o sus servidores.",
            "Usar herramientas automatizadas para acceder o extraer contenido de la Aplicación.",
          ],
        },
      ],
    },
    {
      heading: "4. Propiedad intelectual",
      blocks: [
        "El diseño, código fuente, gráficos e interfaz de la Aplicación son propiedad de NekoDojo y están protegidos por las leyes de propiedad intelectual aplicables.",
        "Las frases y citas incluidas en la Aplicación pertenecen a sus respectivos autores, creadores y titulares de derechos. Frases Anime no reclama propiedad sobre el contenido original de las series o personajes anime.",
        "Esta aplicación no está afiliada, patrocinada ni respaldada por ningún estudio de animación o licenciante de anime.",
      ],
    },
    {
      heading: "5. Publicidad",
      blocks: [
        "La Aplicación incluye anuncios proporcionados por Google AdMob. Al usar la Aplicación, aceptas que se muestren anuncios durante su uso. La experiencia publicitaria está sujeta a las políticas de Google AdMob.",
        "NekoDojo no es responsable del contenido de los anuncios mostrados por terceros a través de AdMob.",
      ],
    },
    {
      heading: "6. Exoneración de garantías",
      blocks: [
        "La Aplicación se proporciona “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas o implícitas. No garantizamos que la Aplicación esté libre de errores, sea ininterrumpida o cumpla con tus requisitos específicos.",
        "El contenido del catálogo de frases puede actualizarse o modificarse en cualquier momento sin previo aviso.",
      ],
    },
    {
      heading: "7. Limitación de responsabilidad",
      blocks: [
        "En la medida permitida por la ley aplicable, NekoDojo no será responsable de ningún daño indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de usar la Aplicación, incluyendo la pérdida de datos almacenados localmente en el dispositivo.",
      ],
    },
    {
      heading: "8. Suspensión o modificación del servicio",
      blocks: [
        "NekoDojo se reserva el derecho de suspender, modificar o descontinuar la Aplicación o cualquiera de sus funcionalidades en cualquier momento, con o sin previo aviso, sin que ello genere responsabilidad alguna frente al usuario.",
      ],
    },
    {
      heading: "9. Cambios en estos términos",
      blocks: [
        "Podemos actualizar estos Términos y Condiciones ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva versión en esta página con la fecha de actualización. El uso continuado de la Aplicación tras la publicación de los nuevos términos implica la aceptación de los mismos.",
      ],
    },
    {
      heading: "10. Contacto",
      blocks: [
        "Si tienes preguntas, comentarios o solicitudes sobre estos Términos y Condiciones, puedes contactarnos: NekoDojo, desarrollador de Frases Anime — contacto@gondroid.dev.",
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  sections: [
    {
      heading: "1. Acceptance of the terms",
      blocks: [
        "By downloading, installing or using Frases Anime (“the App”), developed by NekoDojo, you agree to be bound by these Terms and Conditions. If you don't agree with any part of these terms, please don't use the App.",
        "These terms apply to every version of the App available on Google Play and the App Store.",
      ],
    },
    {
      heading: "2. Description of the service",
      blocks: [
        "Frases Anime is a free app offering a collection of quotes from the anime universe. Its main features include:",
        {
          list: [
            "Browsing quotes organized by character and series.",
            "Saving favorite quotes locally on the device.",
            "Daily notifications with motivational quotes (optional).",
            "Sharing quotes on social media.",
          ],
        },
        "The App is free and funded by advertising through Google AdMob.",
      ],
    },
    {
      heading: "3. Acceptable use",
      blocks: [
        "By using Frases Anime, you agree not to:",
        {
          list: [
            "Use the App for illegal or unauthorized purposes.",
            "Attempt to decompile, reverse engineer or extract the App's source code.",
            "Interfere with the normal operation of the App or its servers.",
            "Use automated tools to access or extract content from the App.",
          ],
        },
      ],
    },
    {
      heading: "4. Intellectual property",
      blocks: [
        "The App's design, source code, graphics and interface are owned by NekoDojo and protected by applicable intellectual property laws.",
        "The quotes included in the App belong to their respective authors, creators and rights holders. Frases Anime claims no ownership of the original content of anime series or characters.",
        "This app isn't affiliated with, sponsored or endorsed by any animation studio or anime licensor.",
      ],
    },
    {
      heading: "5. Advertising",
      blocks: [
        "The App includes ads provided by Google AdMob. By using the App, you agree that ads are shown while you use it. The ad experience is subject to Google AdMob's policies.",
        "NekoDojo isn't responsible for the content of ads shown by third parties through AdMob.",
      ],
    },
    {
      heading: "6. Disclaimer of warranties",
      blocks: [
        "The App is provided “as is” and “as available”, without warranties of any kind, express or implied. We don't guarantee that the App is error-free, uninterrupted or meets your specific requirements.",
        "The quote catalog may be updated or changed at any time without notice.",
      ],
    },
    {
      heading: "7. Limitation of liability",
      blocks: [
        "To the extent permitted by applicable law, NekoDojo won't be liable for any indirect, incidental, special or consequential damages arising from the use of, or inability to use, the App, including loss of data stored locally on the device.",
      ],
    },
    {
      heading: "8. Suspension or changes to the service",
      blocks: [
        "NekoDojo reserves the right to suspend, change or discontinue the App or any of its features at any time, with or without notice, without any liability to the user.",
      ],
    },
    {
      heading: "9. Changes to these terms",
      blocks: [
        "We may update these Terms and Conditions from time to time. We'll announce significant changes by publishing the new version on this page with its update date. Continuing to use the App after new terms are published means you accept them.",
      ],
    },
    {
      heading: "10. Contact",
      blocks: [
        "If you have questions, comments or requests about these Terms and Conditions, contact us: NekoDojo, developer of Frases Anime — contacto@gondroid.dev.",
      ],
    },
  ],
};

export const animequoteLegal: Record<"privacy" | "terms", Record<Locale, LegalDoc>> = {
  privacy: { es: privacyEs, en: privacyEn },
  terms: { es: termsEs, en: termsEn },
};
