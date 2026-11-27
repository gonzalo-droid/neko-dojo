import type { Locale } from "@/i18n/config";
import type { LegalDoc } from "./types";

/*
 * Copy of the documents in force at gonzalo-lozg.me/apps-docs/mtcquiz
 * (privacy: 16 November 2026; terms: 11 August 2026).
 * Spanish is the original text; English is a reference translation.
 * The original's data table is kept as a list. If you edit the original, update this file too.
 */

const GOOGLE_PRIVACY = "https://policies.google.com/privacy";
const FIREBASE_PRIVACY = "https://firebase.google.com/support/privacy";

const factsEs = {
  list: [
    "Nombre de la app: MTCQuiz",
    "Responsable: NekoDojo",
    "Paquete Android: com.gondroid.mtcquiz",
    "Bundle ID iOS: com.gonzadev.mtcquiz",
    "Contacto: nekodojo.apps@gmail.com",
    "Jurisdicción: Perú",
  ],
};

const factsEn = {
  list: [
    "App name: MTCQuiz",
    "Controller: NekoDojo",
    "Android package: com.gondroid.mtcquiz",
    "iOS bundle ID: com.gonzadev.mtcquiz",
    "Contact: nekodojo.apps@gmail.com",
    "Jurisdiction: Peru",
  ],
};

const contactEs = {
  list: [
    "Correo electrónico: nekodojo.apps@gmail.com",
    "Responsable: NekoDojo",
    "Aplicación: MTCQuiz — com.gondroid.mtcquiz (Android) / com.gonzadev.mtcquiz (iOS)",
  ],
};

const contactEn = {
  list: [
    "Email: nekodojo.apps@gmail.com",
    "Controller: NekoDojo",
    "App: MTCQuiz — com.gondroid.mtcquiz (Android) / com.gonzadev.mtcquiz (iOS)",
  ],
};

const privacyEs: LegalDoc = {
  intro: [factsEs],
  sections: [
    {
      heading: "1. Introducción",
      blocks: [
        "Esta Política de Privacidad describe cómo NekoDojo (“nosotros”, “nuestro”) recopila, utiliza y protege la información relacionada con el uso de MTCQuiz, una aplicación móvil de carácter educativo diseñada para ayudar a postulantes a la licencia de conducir en Perú a prepararse para el examen de manejo del Ministerio de Transportes y Comunicaciones (MTC).",
        "Al descargar, instalar o utilizar MTCQuiz, aceptas las prácticas descritas en este documento. Si no estás de acuerdo con alguna parte de esta política, te recomendamos no utilizar la aplicación.",
      ],
    },
    {
      heading: "2. Responsable del tratamiento",
      blocks: [
        "El responsable del tratamiento de los datos descritos en esta política es NekoDojo, desarrollador de MTCQuiz. Para cualquier consulta relacionada con privacidad, protección de datos o el ejercicio de tus derechos, puedes escribir a nekodojo.apps@gmail.com.",
      ],
    },
    {
      heading: "3. Datos que recopilamos",
      blocks: [
        "MTCQuiz recopila distintos tipos de información según la fuente y el servicio involucrado. A continuación se detalla cada uno de forma precisa:",
      ],
    },
    {
      heading: "3.1 Inicio de sesión con Google (actualmente no en uso)",
      blocks: [
        "El inicio de sesión con Google está actualmente deshabilitado en la interfaz de la aplicación: MTCQuiz funciona en modo de acceso libre y no requiere crear una cuenta para usar sus funciones principales. Sin embargo, el componente de autenticación (Firebase Auth con Google Sign-In vía Credential Manager) permanece incluido en el paquete de la app para uso futuro, por lo que lo documentamos aquí de forma transparente.",
        "Si en el futuro esta función se habilita y decides iniciar sesión con tu cuenta de Google, la app almacenaría localmente en tu dispositivo (DataStore en Android / UserDefaults en iOS) tu nombre (displayName) y tu foto de perfil (photoUrl). Esta información no se envía a servidores propios de NekoDojo.",
      ],
    },
    {
      heading: "3.2 Datos de uso y analítica (Firebase Analytics)",
      blocks: [
        "Utilizamos Firebase Analytics para comprender cómo se usa la aplicación. Esto incluye eventos como las pantallas visitadas y el embudo de compra de la suscripción (por ejemplo, visualización de la pantalla de suscripción y clic en el botón de suscribirse). Estos eventos se envían a los servidores de Google/Firebase.",
      ],
    },
    {
      heading: "3.3 Reportes de errores (Firebase Crashlytics)",
      blocks: [
        "Utilizamos Firebase Crashlytics para detectar y diagnosticar errores técnicos. Este servicio recopila reportes de fallos (crashes) e información técnica del dispositivo (modelo, sistema operativo, estado de la app en el momento del error), enviados a los servidores de Google/Firebase, con el único fin de mejorar la estabilidad de la app.",
      ],
    },
    {
      heading: "3.4 Contenido remoto (Firebase Realtime Database)",
      blocks: [
        "MTCQuiz utiliza Firebase Realtime Database exclusivamente para descargar el contenido del examen (preguntas, categorías y respuestas del balotario oficial). Este servicio funciona en modo de solo lectura: no se sube ningún dato del usuario a esta base de datos.",
      ],
    },
    {
      heading: "3.5 Publicidad (Google AdMob)",
      blocks: [
        "La versión gratuita de MTCQuiz muestra anuncios (banner e intersticiales) a través de Google AdMob. Para ello, AdMob puede recopilar el identificador de publicidad de tu dispositivo (Advertising ID / IDFA) y otros datos técnicos necesarios para mostrar anuncios. Consulta la sección 6 para más detalles sobre publicidad.",
      ],
    },
    {
      heading: "3.6 Compras y suscripciones",
      blocks: [
        "Si adquieres la suscripción Premium, la compra es procesada directamente por Google Play Billing (Android) o App Store (iOS), según corresponda a tu dispositivo. MTCQuiz no accede ni almacena datos de pago (números de tarjeta, cuentas bancarias, etc.); esa información es gestionada íntegramente por la tienda de aplicaciones correspondiente conforme a su propia política de privacidad.",
      ],
    },
    {
      heading: "3.7 Resultados de tus evaluaciones (solo local)",
      blocks: [
        "Cuando completas un simulacro de examen, MTCQuiz guarda tu puntaje, las respuestas dadas por pregunta y la fecha de la evaluación. Estos datos se almacenan únicamente en tu dispositivo (Room en Android / SwiftData en iOS) y nunca se suben a un servidor.",
      ],
    },
    {
      heading: "3.8 Racha de estudio",
      blocks: [
        "La app lleva un contador local de tu racha de días de estudio y la fecha del último día que estudiaste, almacenado localmente (DataStore en Android / UserDefaults en iOS), sin sincronización con ningún servidor.",
      ],
    },
    {
      heading: "3.9 Aplicación para iPhone (iOS)",
      blocks: [
        "La versión para iPhone es más limitada en lo que recopila que la de Android:",
        {
          list: [
            "No usa Firebase: ni Analytics, ni Crashlytics, ni Realtime Database, ni inicio de sesión. Las preguntas vienen incluidas dentro de la app.",
            "No tiene compras dentro de la app en su versión actual.",
            "El único servicio de terceros es Google AdMob (banners, intersticiales y un anuncio con recompensa opcional para descargar el PDF del balotario). Según la declaración de privacidad del propio SDK de Google, puede recopilar el identificador de publicidad (IDFA), datos de interacción y de publicidad, la ubicación aproximada derivada de la dirección IP y datos de diagnóstico.",
            "Antes de cargar anuncios, la app muestra el formulario de consentimiento de Google cuando aplica y la solicitud de App Tracking Transparency de Apple. Si no das permiso de rastreo, la app no accede al IDFA y AdMob muestra anuncios no personalizados.",
          ],
        },
      ],
    },
    {
      heading: "Resumen de datos",
      blocks: [
        "Dato — origen — dónde se almacena:",
        {
          list: [
            "Nombre y foto de perfil (Google) — Firebase Auth / Google Sign-In (no en uso actualmente) — local.",
            "Eventos de uso y funnel de compra — Firebase Analytics — Google/Firebase.",
            "Reportes de errores e info del dispositivo — Firebase Crashlytics — Google/Firebase.",
            "Preguntas y categorías del examen — Firebase Realtime Database — solo lectura, sin subir datos.",
            "Advertising ID — Google AdMob — Google AdMob.",
            "Recibos de compra — Google Play Billing / App Store — Google / Apple.",
            "Puntaje, respuestas y fecha del simulacro — uso de la app — local (Room / SwiftData).",
            "Racha y fecha de último estudio — uso de la app — local (DataStore / UserDefaults).",
          ],
        },
      ],
    },
    {
      heading: "4. Finalidad del tratamiento",
      blocks: [
        "Utilizamos los datos descritos anteriormente para los siguientes fines:",
        {
          list: [
            "Ofrecer el contenido de preguntas y categorías del examen de manejo del MTC.",
            "Guardar tu progreso, puntajes y racha de estudio directamente en tu dispositivo.",
            "Diagnosticar y corregir errores técnicos para mejorar la estabilidad de la app.",
            "Entender el uso general de la aplicación y el rendimiento del embudo de suscripción, de forma agregada y no identificable individualmente por nosotros.",
            "Mostrar publicidad dentro de la versión gratuita a través de Google AdMob.",
            "Procesar suscripciones Premium a través de la tienda de aplicaciones correspondiente.",
          ],
        },
      ],
    },
    {
      heading: "5. Base legal",
      blocks: [
        "El tratamiento de datos personales se realiza conforme a lo previsto en la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, y su reglamento. La base legal para el tratamiento es, según el caso, la ejecución del servicio solicitado (mostrar contenido del examen, procesar suscripciones), el interés legítimo de mantener y mejorar la aplicación (analítica y reportes de errores), y el consentimiento cuando corresponda (por ejemplo, permisos del dispositivo). MTCQuiz no declara cumplimiento con normativas de otras jurisdicciones como el GDPR europeo o la CCPA de California.",
      ],
    },
    {
      heading: "6. Servicios de terceros",
      blocks: [
        "MTCQuiz utiliza los siguientes servicios de terceros, cada uno con su propia política de privacidad:",
        {
          list: [
            `Firebase Auth / Google Sign-In (Google LLC) — autenticación opcional, actualmente no habilitada en la interfaz. Política: ${FIREBASE_PRIVACY}`,
            `Firebase Analytics (Google LLC) — analítica de uso de la app. Política: ${FIREBASE_PRIVACY}`,
            `Firebase Crashlytics (Google LLC) — reportes de errores y estabilidad. Política: ${FIREBASE_PRIVACY}`,
            `Firebase Realtime Database (Google LLC) — entrega del contenido del examen. Política: ${FIREBASE_PRIVACY}`,
            `Google AdMob (Google LLC) — publicidad dentro de la app. Política: ${GOOGLE_PRIVACY}`,
            "Google Play Billing (Android) / App Store (iOS) — procesamiento de suscripciones y pagos, gestionado por Google o Apple según tu plataforma.",
          ],
        },
      ],
    },
    {
      heading: "7. Publicidad y Advertising ID",
      blocks: [
        "En la versión gratuita, MTCQuiz muestra anuncios banner e intersticiales a través de Google AdMob. Para seleccionar y medir anuncios, AdMob puede utilizar el identificador de publicidad de tu dispositivo (Advertising ID en Android / IDFA en iOS). Puedes restablecer o limitar este identificador desde los ajustes de privacidad de tu dispositivo (Ajustes → Google → Anuncios en Android, o Ajustes → Privacidad y seguridad → Publicidad de Apple en iOS). No tenemos acceso directo a los datos que AdMob recopila para personalizar anuncios. En iPhone, además, puedes aceptar o rechazar el rastreo cuando la app lo solicita, y cambiar esa decisión en Ajustes → Privacidad y seguridad → Rastreo.",
      ],
    },
    {
      heading: "8. Permisos del dispositivo",
      blocks: [
        "En Android, MTCQuiz solicita los siguientes permisos:",
        {
          list: [
            "INTERNET: necesario para descargar el contenido del examen, mostrar anuncios y sincronizar analítica/reportes de errores.",
            "WRITE_EXTERNAL_STORAGE: se utiliza únicamente para exportar o guardar en tu dispositivo el PDF del balotario de preguntas cuando lo solicitas.",
          ],
        },
      ],
    },
    {
      heading: "9. Almacenamiento y seguridad de datos locales",
      blocks: [
        "Tus resultados de evaluación, racha de estudio y (si en el futuro se habilita) tu información de perfil de Google se almacenan exclusivamente en tu dispositivo mediante mecanismos estándar de la plataforma (Room y DataStore en Android; SwiftData y UserDefaults en iOS). Estos datos están protegidos por las medidas de seguridad propias del sistema operativo y se eliminan automáticamente si desinstalas la aplicación. Las comunicaciones con Firebase se realizan mediante conexiones cifradas (HTTPS/TLS).",
      ],
    },
    {
      heading: "10. Derechos del usuario (Ley N.° 29733)",
      blocks: [
        "Conforme a la Ley N.° 29733 de Protección de Datos Personales del Perú, tienes derecho a:",
        {
          list: [
            "Acceso: solicitar información sobre los datos que tratamos relacionados contigo.",
            "Rectificación: solicitar la corrección de datos inexactos o incompletos.",
            "Cancelación: solicitar la eliminación de tus datos cuando corresponda.",
            "Oposición: oponerte al tratamiento de tus datos en determinadas circunstancias.",
          ],
        },
        "Puedes ejercer cualquiera de estos derechos escribiendo a nekodojo.apps@gmail.com. Responderemos tu solicitud en un plazo razonable conforme a la normativa aplicable. Ten en cuenta que la mayoría de tus datos (resultados, racha, preferencias) ya están bajo tu control directo: puedes eliminarlos en cualquier momento borrando los datos de la app o desinstalándola.",
      ],
    },
    {
      heading: "11. Menores de edad",
      blocks: [
        "MTCQuiz es una aplicación de contenido educativo general dirigida a postulantes a la licencia de conducir en Perú. No declaramos una edad mínima específica de uso ni la aplicación implementa verificación de edad en el código. Si eres padre, madre o tutor y consideras que un menor a tu cargo ha utilizado la aplicación y deseas más información o la eliminación de datos asociados, contáctanos a través del correo indicado en la sección de contacto.",
      ],
    },
    {
      heading: "12. Cambios a esta política",
      blocks: [
        "Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en la aplicación, en los servicios de terceros que utilizamos o en la normativa aplicable. La fecha de la última actualización se muestra siempre en la parte superior de esta página. Te recomendamos revisar este documento periódicamente.",
      ],
    },
    {
      heading: "13. Contacto",
      blocks: ["Si tienes preguntas, dudas o deseas ejercer alguno de tus derechos sobre tus datos personales, puedes contactarnos:", contactEs],
    },
  ],
};

const privacyEn: LegalDoc = {
  intro: [factsEn],
  sections: [
    {
      heading: "1. Introduction",
      blocks: [
        "This Privacy Policy describes how NekoDojo (“we”, “our”) collects, uses and protects information related to the use of MTCQuiz, an educational mobile app designed to help driver's license applicants in Peru prepare for the driving test of the Ministry of Transport and Communications (MTC).",
        "By downloading, installing or using MTCQuiz, you accept the practices described in this document. If you disagree with any part of this policy, we recommend that you don't use the app.",
      ],
    },
    {
      heading: "2. Data controller",
      blocks: [
        "The controller of the data described in this policy is NekoDojo, developer of MTCQuiz. For any question about privacy, data protection or exercising your rights, write to nekodojo.apps@gmail.com.",
      ],
    },
    {
      heading: "3. Data we collect",
      blocks: ["MTCQuiz collects different types of information depending on the source and the service involved. Each one is detailed below:"],
    },
    {
      heading: "3.1 Google sign-in (not currently in use)",
      blocks: [
        "Google sign-in is currently disabled in the app's interface: MTCQuiz works in open-access mode and doesn't require an account to use its main features. However, the authentication component (Firebase Auth with Google Sign-In via Credential Manager) remains in the app package for future use, so we document it here for transparency.",
        "If this feature is enabled in the future and you choose to sign in with your Google account, the app would store your name (displayName) and profile photo (photoUrl) locally on your device (DataStore on Android / UserDefaults on iOS). This information isn't sent to NekoDojo's own servers.",
      ],
    },
    {
      heading: "3.2 Usage data and analytics (Firebase Analytics)",
      blocks: [
        "We use Firebase Analytics to understand how the app is used. This includes events such as screens visited and the subscription purchase funnel (for example, viewing the subscription screen and tapping the subscribe button). These events are sent to Google/Firebase servers.",
      ],
    },
    {
      heading: "3.3 Crash reports (Firebase Crashlytics)",
      blocks: [
        "We use Firebase Crashlytics to detect and diagnose technical errors. This service collects crash reports and technical device information (model, operating system, app state at the time of the error), sent to Google/Firebase servers, solely to improve the app's stability.",
      ],
    },
    {
      heading: "3.4 Remote content (Firebase Realtime Database)",
      blocks: [
        "MTCQuiz uses Firebase Realtime Database only to download the test content (questions, categories and answers from the official question bank). This service works in read-only mode: no user data is uploaded to this database.",
      ],
    },
    {
      heading: "3.5 Advertising (Google AdMob)",
      blocks: [
        "The free version of MTCQuiz shows ads (banner and interstitial) through Google AdMob. To do so, AdMob may collect your device's advertising identifier (Advertising ID / IDFA) and other technical data needed to show ads. See section 6 for more details about advertising.",
      ],
    },
    {
      heading: "3.6 Purchases and subscriptions",
      blocks: [
        "If you buy the Premium subscription, the purchase is processed directly by Google Play Billing (Android) or the App Store (iOS), depending on your device. MTCQuiz doesn't access or store payment data (card numbers, bank accounts, etc.); that information is handled entirely by the relevant app store under its own privacy policy.",
      ],
    },
    {
      heading: "3.7 Your test results (local only)",
      blocks: [
        "When you complete a practice test, MTCQuiz saves your score, the answers given for each question and the date of the test. This data is stored only on your device (Room on Android / SwiftData on iOS) and is never uploaded to a server.",
      ],
    },
    {
      heading: "3.8 Study streak",
      blocks: [
        "The app keeps a local count of your study-day streak and the date of the last day you studied, stored locally (DataStore on Android / UserDefaults on iOS), with no syncing to any server.",
      ],
    },
    {
      heading: "3.9 iPhone app (iOS)",
      blocks: [
        "The iPhone version collects less than the Android one:",
        {
          list: [
            "It doesn't use Firebase: no Analytics, Crashlytics, Realtime Database or sign-in. The questions are included inside the app.",
            "It has no in-app purchases in its current version.",
            "The only third-party service is Google AdMob (banners, interstitials and an optional rewarded ad to download the question bank PDF). According to the privacy declaration of Google's own SDK, it may collect the advertising identifier (IDFA), interaction and advertising data, approximate location derived from the IP address, and diagnostic data.",
            "Before loading ads, the app shows Google's consent form where applicable and Apple's App Tracking Transparency request. If you don't allow tracking, the app doesn't access the IDFA and AdMob shows non-personalized ads.",
          ],
        },
      ],
    },
    {
      heading: "Data summary",
      blocks: [
        "Data — source — where it's stored:",
        {
          list: [
            "Name and profile photo (Google) — Firebase Auth / Google Sign-In (not currently in use) — local.",
            "Usage events and purchase funnel — Firebase Analytics — Google/Firebase.",
            "Crash reports and device info — Firebase Crashlytics — Google/Firebase.",
            "Test questions and categories — Firebase Realtime Database — read-only, no data uploaded.",
            "Advertising ID — Google AdMob — Google AdMob.",
            "Purchase receipts — Google Play Billing / App Store — Google / Apple.",
            "Practice test score, answers and date — app usage — local (Room / SwiftData).",
            "Streak and last study date — app usage — local (DataStore / UserDefaults).",
          ],
        },
      ],
    },
    {
      heading: "4. Purpose of processing",
      blocks: [
        "We use the data described above for the following purposes:",
        {
          list: [
            "Provide the questions and categories of the MTC driving test.",
            "Save your progress, scores and study streak directly on your device.",
            "Diagnose and fix technical errors to improve the app's stability.",
            "Understand general app usage and how the subscription funnel performs, in aggregate and not individually identifiable by us.",
            "Show ads in the free version through Google AdMob.",
            "Process Premium subscriptions through the relevant app store.",
          ],
        },
      ],
    },
    {
      heading: "5. Legal basis",
      blocks: [
        "Personal data is processed in accordance with Law No. 29733, Peru's Personal Data Protection Law, and its regulations. The legal basis is, as applicable, performing the requested service (showing test content, processing subscriptions), the legitimate interest in maintaining and improving the app (analytics and crash reports), and consent where appropriate (for example, device permissions). MTCQuiz doesn't claim compliance with regulations of other jurisdictions such as the European GDPR or California's CCPA.",
      ],
    },
    {
      heading: "6. Third-party services",
      blocks: [
        "MTCQuiz uses the following third-party services, each with its own privacy policy:",
        {
          list: [
            `Firebase Auth / Google Sign-In (Google LLC) — optional authentication, not currently enabled in the interface. Policy: ${FIREBASE_PRIVACY}`,
            `Firebase Analytics (Google LLC) — app usage analytics. Policy: ${FIREBASE_PRIVACY}`,
            `Firebase Crashlytics (Google LLC) — crash reports and stability. Policy: ${FIREBASE_PRIVACY}`,
            `Firebase Realtime Database (Google LLC) — delivery of the test content. Policy: ${FIREBASE_PRIVACY}`,
            `Google AdMob (Google LLC) — in-app advertising. Policy: ${GOOGLE_PRIVACY}`,
            "Google Play Billing (Android) / App Store (iOS) — subscription and payment processing, handled by Google or Apple depending on your platform.",
          ],
        },
      ],
    },
    {
      heading: "7. Advertising and Advertising ID",
      blocks: [
        "In the free version, MTCQuiz shows banner and interstitial ads through Google AdMob. To select and measure ads, AdMob may use your device's advertising identifier (Advertising ID on Android / IDFA on iOS). You can reset or limit this identifier in your device's privacy settings (Settings → Google → Ads on Android, or Settings → Privacy & Security → Apple Advertising on iOS). We don't have direct access to the data AdMob collects to personalize ads. On iPhone, you can also accept or decline tracking when the app asks, and change that choice in Settings → Privacy & Security → Tracking.",
      ],
    },
    {
      heading: "8. Device permissions",
      blocks: [
        "On Android, MTCQuiz requests the following permissions:",
        {
          list: [
            "INTERNET: needed to download the test content, show ads and sync analytics/crash reports.",
            "WRITE_EXTERNAL_STORAGE: used only to export or save the question bank PDF to your device when you ask for it.",
          ],
        },
      ],
    },
    {
      heading: "9. Local data storage and security",
      blocks: [
        "Your test results, study streak and (if enabled in the future) your Google profile information are stored only on your device using standard platform mechanisms (Room and DataStore on Android; SwiftData and UserDefaults on iOS). This data is protected by the operating system's own security measures and is deleted automatically if you uninstall the app. Communication with Firebase uses encrypted connections (HTTPS/TLS).",
      ],
    },
    {
      heading: "10. Your rights (Law No. 29733)",
      blocks: [
        "Under Peru's Personal Data Protection Law No. 29733, you have the right to:",
        {
          list: [
            "Access: ask for information about the data we process about you.",
            "Rectification: ask for inaccurate or incomplete data to be corrected.",
            "Cancellation: ask for your data to be deleted where appropriate.",
            "Objection: object to the processing of your data in certain circumstances.",
          ],
        },
        "You can exercise any of these rights by writing to nekodojo.apps@gmail.com. We'll answer your request within a reasonable time under the applicable rules. Keep in mind that most of your data (results, streak, preferences) is already under your direct control: you can delete it at any time by clearing the app's data or uninstalling it.",
      ],
    },
    {
      heading: "11. Minors",
      blocks: [
        "MTCQuiz is a general educational app aimed at driver's license applicants in Peru. We don't state a specific minimum age of use, and the app doesn't implement age verification in its code. If you're a parent or guardian and believe a minor in your care has used the app and you want more information or the deletion of associated data, contact us at the email given in the contact section.",
      ],
    },
    {
      heading: "12. Changes to this policy",
      blocks: [
        "We may update this Privacy Policy from time to time to reflect changes in the app, in the third-party services we use or in the applicable rules. The date of the last update is always shown at the top of this page. We recommend reviewing this document periodically.",
      ],
    },
    {
      heading: "13. Contact",
      blocks: ["If you have questions or want to exercise any of your rights over your personal data, contact us:", contactEn],
    },
  ],
};

const termsEs: LegalDoc = {
  intro: [factsEs],
  sections: [
    {
      heading: "1. Aceptación de los términos",
      blocks: [
        "Estos Términos y Condiciones (“Términos”) regulan el acceso y uso de MTCQuiz, aplicación móvil desarrollada por NekoDojo (“nosotros”, “la app”), disponible para Android e iOS. Al descargar, instalar o usar MTCQuiz, aceptas quedar vinculado por estos Términos. Si no estás de acuerdo, no debes utilizar la aplicación.",
      ],
    },
    {
      heading: "2. Descripción del servicio",
      blocks: [
        "MTCQuiz es una aplicación educativa de práctica que ofrece simulacros de examen, bancos de preguntas y material de estudio orientado a personas que se preparan para rendir el examen de manejo del Ministerio de Transportes y Comunicaciones (MTC) en Perú. La app está disponible para Android (versión mínima: Android 8.0 / SDK 26) e iOS (versión mínima: iOS 17).",
        "MTCQuiz es una herramienta de práctica y estudio independiente. No es una aplicación oficial del MTC ni de ninguna entidad gubernamental peruana, y no garantiza que apruebes el examen oficial. El contenido se ofrece con fines educativos y de preparación.",
      ],
    },
    {
      heading: "3. Licencia de uso",
      blocks: [
        "Sujeto al cumplimiento de estos Términos, te otorgamos una licencia limitada, no exclusiva, no transferible y revocable para descargar, instalar y usar MTCQuiz en dispositivos de tu propiedad o bajo tu control, exclusivamente para tu uso personal y no comercial. Esta licencia no te otorga ningún derecho de propiedad sobre la aplicación ni sobre su contenido.",
      ],
    },
    {
      heading: "4. Cuentas de usuario",
      blocks: [
        "MTCQuiz puede usarse sin necesidad de crear una cuenta. La aplicación incluye un componente de inicio de sesión opcional mediante Google (Firebase Auth con Google Sign-In), pero esta función está actualmente deshabilitada en la interfaz y la app opera en modo de acceso libre. Si esta función se habilita en el futuro, tu uso de ella estará sujeto a los términos de la cuenta de Google que utilices, además de estos Términos. Puedes consultar el detalle del tratamiento de esta información en nuestra Política de Privacidad.",
      ],
    },
    {
      heading: "5. Suscripciones y pagos",
      blocks: [
        "MTCQuiz utiliza un modelo freemium: la versión gratuita incluye acceso al contenido de práctica con anuncios (banner e intersticiales, mostrados a través de Google AdMob). La suscripción Premium elimina la publicidad dentro de la aplicación.",
        {
          list: [
            "La suscripción Premium se ofrece en planes mensual y anual. El precio exacto se muestra dinámicamente dentro de la tienda de aplicaciones correspondiente a tu dispositivo en el momento de la compra.",
            "Las suscripciones se procesan y facturan a través de Google Play (Android) o App Store (iOS), según corresponda a tu dispositivo. MTCQuiz no procesa ni almacena datos de pago directamente.",
            "Las suscripciones se renuevan automáticamente al final de cada período, salvo que las canceles antes de la fecha de renovación.",
            "Puedes cancelar tu suscripción en cualquier momento desde los ajustes de tu cuenta en Google Play (Android) o en los ajustes de suscripciones de App Store (iOS). La cancelación evita cargos futuros, pero no genera reembolsos automáticos por el período ya iniciado, salvo que la política de la tienda correspondiente indique lo contrario.",
            "Los reembolsos, disputas de cobro y demás gestiones de facturación se rigen por las políticas propias de Google Play o de App Store, según la plataforma utilizada.",
          ],
        },
      ],
    },
    {
      heading: "6. Propiedad intelectual",
      blocks: [
        "Todo el contenido de MTCQuiz —incluyendo, sin limitación, el diseño, la marca “MTCQuiz”, los textos, la estructura de las preguntas, gráficos, íconos y el código de la aplicación— es propiedad de NekoDojo o de sus licenciantes, y está protegido por las leyes de propiedad intelectual aplicables. Queda prohibida la reproducción, distribución, modificación o explotación comercial del contenido de la app sin autorización previa por escrito, salvo el uso personal permitido por la licencia otorgada en la sección 3.",
      ],
    },
    {
      heading: "7. Uso aceptable",
      blocks: [
        "Al utilizar MTCQuiz, te comprometes a no:",
        {
          list: [
            "Realizar ingeniería inversa, descompilar o desensamblar la aplicación, salvo en la medida permitida por la ley aplicable.",
            "Copiar, redistribuir o revender el contenido del banco de preguntas o cualquier material de la app sin autorización.",
            "Utilizar la aplicación con fines fraudulentos, ilegales o que puedan dañar a terceros.",
            "Interferir con el funcionamiento normal de la app, sus servidores o los servicios de terceros que utiliza (Firebase, AdMob, tiendas de aplicaciones).",
            "Intentar eludir, manipular o falsificar el sistema de suscripciones o de publicidad.",
          ],
        },
      ],
    },
    {
      heading: "8. Limitación de responsabilidad y exención de garantías",
      blocks: [
        "MTCQuiz se ofrece “tal cual” y “según disponibilidad”, con fines exclusivamente educativos y de preparación. No garantizamos que el contenido esté libre de errores, que refleje con exactitud el examen oficial vigente del MTC, ni que su uso resulte en la aprobación del examen oficial. El resultado de tu examen depende de múltiples factores fuera de nuestro control.",
        "En la máxima medida permitida por la ley aplicable, NekoDojo no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de la aplicación, incluyendo —sin limitación— la reprobación del examen oficial, pérdida de datos locales por desinstalación, o interrupciones del servicio ocasionadas por terceros (Firebase, AdMob, Google Play, App Store).",
      ],
    },
    {
      heading: "9. Publicidad de terceros",
      blocks: [
        "La versión gratuita de MTCQuiz muestra anuncios proporcionados por Google AdMob. No somos responsables del contenido de los anuncios de terceros ni de los sitios web o aplicaciones a los que estos puedan redirigir. El uso de tus datos con fines publicitarios se describe en nuestra Política de Privacidad.",
      ],
    },
    {
      heading: "10. Terminación del servicio",
      blocks: [
        "Podemos suspender o discontinuar MTCQuiz, en todo o en parte, en cualquier momento y sin previo aviso, por motivos técnicos, legales o de negocio. También podemos restringir tu acceso a la app si incumples estos Términos. Puedes dejar de usar la aplicación en cualquier momento desinstalándola de tu dispositivo; los datos almacenados localmente se eliminarán junto con la app.",
      ],
    },
    {
      heading: "11. Ley aplicable y jurisdicción",
      blocks: [
        "Estos Términos se rigen por las leyes de la República del Perú. Cualquier controversia derivada de la interpretación o ejecución de estos Términos será sometida a los tribunales competentes del Perú, salvo que la normativa aplicable disponga lo contrario.",
      ],
    },
    {
      heading: "12. Modificaciones a los términos",
      blocks: [
        "Podemos actualizar estos Términos y Condiciones ocasionalmente para reflejar cambios en la aplicación, en los servicios de terceros que utilizamos o en la normativa aplicable. La fecha de la última actualización se muestra siempre en la parte superior de esta página. El uso continuado de MTCQuiz después de una actualización implica la aceptación de los nuevos Términos.",
      ],
    },
    {
      heading: "13. Contacto",
      blocks: ["Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos:", contactEs],
    },
  ],
};

const termsEn: LegalDoc = {
  intro: [factsEn],
  sections: [
    {
      heading: "1. Acceptance of the terms",
      blocks: [
        "These Terms and Conditions (“Terms”) govern access to and use of MTCQuiz, a mobile app developed by NekoDojo (“we”, “the app”), available for Android and iOS. By downloading, installing or using MTCQuiz, you agree to be bound by these Terms. If you don't agree, you must not use the app.",
      ],
    },
    {
      heading: "2. Description of the service",
      blocks: [
        "MTCQuiz is an educational practice app that offers practice tests, question banks and study material for people preparing to take the driving test of Peru's Ministry of Transport and Communications (MTC). The app is available for Android (minimum version: Android 8.0 / SDK 26) and iOS (minimum version: iOS 17).",
        "MTCQuiz is an independent practice and study tool. It isn't an official app of the MTC or of any Peruvian government body, and it doesn't guarantee that you'll pass the official test. The content is offered for educational and preparation purposes.",
      ],
    },
    {
      heading: "3. License to use",
      blocks: [
        "Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable and revocable license to download, install and use MTCQuiz on devices you own or control, solely for your personal, non-commercial use. This license doesn't give you any ownership rights over the app or its content.",
      ],
    },
    {
      heading: "4. User accounts",
      blocks: [
        "MTCQuiz can be used without creating an account. The app includes an optional Google sign-in component (Firebase Auth with Google Sign-In), but this feature is currently disabled in the interface and the app runs in open-access mode. If this feature is enabled in the future, your use of it will be subject to the terms of the Google account you use, in addition to these Terms. You can find details on how this information is handled in our Privacy Policy.",
      ],
    },
    {
      heading: "5. Subscriptions and payments",
      blocks: [
        "MTCQuiz uses a freemium model: the free version includes access to the practice content with ads (banner and interstitial, shown through Google AdMob). The Premium subscription removes ads inside the app.",
        {
          list: [
            "The Premium subscription is offered in monthly and annual plans. The exact price is shown dynamically in your device's app store at the time of purchase.",
            "Subscriptions are processed and billed through Google Play (Android) or the App Store (iOS), depending on your device. MTCQuiz doesn't process or store payment data directly.",
            "Subscriptions renew automatically at the end of each period unless you cancel them before the renewal date.",
            "You can cancel your subscription at any time from your Google Play account settings (Android) or the App Store subscription settings (iOS). Cancelling prevents future charges but doesn't trigger automatic refunds for the period already started, unless the relevant store's policy says otherwise.",
            "Refunds, billing disputes and other billing matters are governed by the policies of Google Play or the App Store, depending on the platform used.",
          ],
        },
      ],
    },
    {
      heading: "6. Intellectual property",
      blocks: [
        "All MTCQuiz content —including, without limitation, the design, the “MTCQuiz” brand, the texts, the structure of the questions, graphics, icons and the app's code— is owned by NekoDojo or its licensors and is protected by the applicable intellectual property laws. Reproduction, distribution, modification or commercial exploitation of the app's content without prior written authorization is prohibited, except for the personal use allowed by the license granted in section 3.",
      ],
    },
    {
      heading: "7. Acceptable use",
      blocks: [
        "When using MTCQuiz, you agree not to:",
        {
          list: [
            "Reverse engineer, decompile or disassemble the app, except to the extent allowed by applicable law.",
            "Copy, redistribute or resell the question bank content or any app material without authorization.",
            "Use the app for fraudulent or illegal purposes or in ways that may harm others.",
            "Interfere with the normal operation of the app, its servers or the third-party services it uses (Firebase, AdMob, app stores).",
            "Try to bypass, manipulate or falsify the subscription or advertising system.",
          ],
        },
      ],
    },
    {
      heading: "8. Limitation of liability and disclaimer of warranties",
      blocks: [
        "MTCQuiz is provided “as is” and “as available”, solely for educational and preparation purposes. We don't guarantee that the content is error-free, that it accurately reflects the MTC's current official test, or that using it will result in passing the official test. Your test result depends on many factors outside our control.",
        "To the maximum extent permitted by applicable law, NekoDojo won't be liable for indirect, incidental, special or consequential damages arising from the use of or inability to use the app, including —without limitation— failing the official test, loss of local data on uninstall, or service interruptions caused by third parties (Firebase, AdMob, Google Play, App Store).",
      ],
    },
    {
      heading: "9. Third-party advertising",
      blocks: [
        "The free version of MTCQuiz shows ads provided by Google AdMob. We aren't responsible for the content of third-party ads or for the websites or apps they may redirect to. The use of your data for advertising purposes is described in our Privacy Policy.",
      ],
    },
    {
      heading: "10. Termination of the service",
      blocks: [
        "We may suspend or discontinue MTCQuiz, in whole or in part, at any time and without notice, for technical, legal or business reasons. We may also restrict your access to the app if you breach these Terms. You can stop using the app at any time by uninstalling it from your device; locally stored data will be deleted along with the app.",
      ],
    },
    {
      heading: "11. Governing law and jurisdiction",
      blocks: [
        "These Terms are governed by the laws of the Republic of Peru. Any dispute arising from the interpretation or performance of these Terms will be submitted to the competent courts of Peru, unless the applicable rules provide otherwise.",
      ],
    },
    {
      heading: "12. Changes to the terms",
      blocks: [
        "We may update these Terms and Conditions from time to time to reflect changes in the app, in the third-party services we use or in the applicable rules. The date of the last update is always shown at the top of this page. Continued use of MTCQuiz after an update means you accept the new Terms.",
      ],
    },
    {
      heading: "13. Contact",
      blocks: ["If you have questions about these Terms and Conditions, contact us:", contactEn],
    },
  ],
};

export const mtcquizLegal: Record<"privacy" | "terms", Record<Locale, LegalDoc>> = {
  privacy: { es: privacyEs, en: privacyEn },
  terms: { es: termsEs, en: termsEn },
};
