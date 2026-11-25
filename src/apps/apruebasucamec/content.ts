import type { Locale } from "@/i18n/config";

/*
 * ApruebaSUCAMEC landing copy. Facts (100 questions: 65 multiple choice + 35 true/false,
 * modes, 70 % pass mark, ads only outside the exam simulation, local history) were checked
 * against the app's code in November 2026. Screenshots come from the iOS build 1.0.0 (manual screen left
 * out: it shows a pistol with its brand).
 */

type Shot = { src: string; alt: string };

const shots = {
  home: "/apps/apruebasucamec/home.webp",
  exam: "/apps/apruebasucamec/exam.webp",
  result: "/apps/apruebasucamec/result.webp",
  review: "/apps/apruebasucamec/review.webp",
};

/** License types the app lists on its home screen as a reference. */
export const licenses = [
  { code: "L1", es: "Defensa personal", en: "Personal defense" },
  { code: "L2", es: "Caza", en: "Hunting" },
  { code: "L3", es: "Deporte y tiro", en: "Sport shooting" },
  { code: "L4", es: "Seguridad privada", en: "Private security" },
  { code: "L5", es: "Seguridad personal", en: "Personal security" },
  { code: "L6", es: "Coleccionistas", en: "Collectors" },
];

const es = {
  meta: {
    title: "ApruebaSUCAMEC — Examen SUCAMEC Perú: preguntas y simulacros",
    description:
      "Prepara el examen teórico SUCAMEC: 100 preguntas tipo examen, simulacro de 5 preguntas en 10 minutos y sin internet. App independiente, no afiliada a SUCAMEC.",
  },
  nav: [
    { href: "#modos", label: "Modos de estudio" },
    { href: "#resultados", label: "Resultados" },
    { href: "#funciones", label: "Funciones" },
    { href: "#faq", label: "Preguntas" },
  ],
  eyebrow: "Examen SUCAMEC en Perú",
  heroBody:
    "Practica con preguntas tipo examen, haz el simulacro con tiempo y mide tu avance antes de rendir el examen teórico para tu licencia de uso de armas de fuego. Sin cuenta y sin internet.",
  disclaimer: "App independiente. No está afiliada a la SUCAMEC ni a ninguna entidad del Estado peruano.",
  heroShot: { src: shots.home, alt: "Pantalla de inicio de ApruebaSUCAMEC con los modos de estudio y los tipos de licencia L1 a L6" } as Shot,
  stats: [
    { value: "100", label: "preguntas tipo examen" },
    { value: "10 min", label: "simulacro de 5 preguntas" },
    { value: "70 %", label: "para aprobar" },
    { value: "Offline", label: "estudia sin internet" },
  ],
  modes: {
    title: "Cuatro formas de practicar",
    lead: "Desde repasar todo el banco hasta simular el examen con el reloj en contra.",
    items: [
      { title: "Simular examen SUCAMEC", meta: "5 preguntas · 10 minutos", body: "Preguntas al azar y cronómetro, pensado como el examen real. Aquí no hay anuncios." },
      { title: "Simulacro completo", meta: "100 preguntas · sin límite", body: "Todo el banco en orden y a tu ritmo, para repasar cada tema sin el reloj." },
      { title: "Simulacro personalizado", meta: "De 1 a 100 preguntas", body: "Tú eliges cuántas preguntas quieres responder hoy." },
      { title: "Ver banco completo", meta: "100 preguntas", body: "Todas las preguntas con la respuesta correcta a la vista, para estudiar antes de practicar." },
    ],
    bankNote: "65 de opción múltiple y 35 de verdadero o falso. El simulacro tipo examen y el personalizado las eligen al azar.",
    shot: { src: shots.exam, alt: "Simulacro de examen con el cronómetro en 09:44, pregunta 1 de 5 de verdadero o falso y Verdadero marcado" } as Shot,
  },
  results: {
    title: "Sabes cómo vas en cada intento",
    lead: "Al terminar ves tu porcentaje, tus aciertos y errores, y si aprobaste con el 70 % o más.",
    points: [
      "Revisa pregunta por pregunta tu respuesta junto a la correcta.",
      "Intenta de nuevo o copia tu resultado para compartirlo.",
      "El historial guarda tus intentos en el teléfono, incluso los que dejaste a medias.",
    ],
    resultShot: { src: shots.result, alt: "Resultado final del simulacro: 100 %, aprobado, 5 correctas de 5" } as Shot,
    reviewShot: { src: shots.review, alt: "Revisión del examen: las preguntas 1 y 2 correctas, con la respuesta correcta marcada en verde, y la 3 incorrecta" } as Shot,
  },
  licenses: {
    title: "Los tipos de licencia, a la mano",
    lead: "La app muestra como referencia las seis modalidades de licencia de uso de armas de fuego.",
  },
  features: {
    title: "Además",
    items: [
      { title: "Manual de armas", body: "Una guía de desmontaje de 6 páginas en imágenes, con zoom para ver cada pieza." },
      { title: "Aviso al instante", body: "En la práctica, cada respuesta te dice enseguida si es correcta o incorrecta." },
      { title: "Tamaño de letra", body: "Ajústalo con vista previa y se aplica en toda la app." },
      { title: "Sin cuenta", body: "No te pedimos registro. Tu historial se queda en tu teléfono." },
      { title: "Sin internet", body: "Las preguntas y el manual vienen dentro de la app." },
      { title: "Teléfono y tablet", body: "La misma app en iPhone, iPad y Android, también en tablets." },
    ],
  },
  pricing: {
    title: "Gratis, con anuncios",
    body: "Todo el contenido es gratuito. La app muestra un banner en los modos de práctica y te pide tu consentimiento antes de cargar anuncios cuando corresponde. El simulacro tipo examen no tiene anuncios.",
  },
  // The modes below are the ones the online quiz itself lists (checked 2026-11-23).
  webQuiz: {
    title: "¿También estudias en la computadora? Prueba la versión web",
    body: "La app va en tu teléfono. Desde la computadora puedes practicar con el cuestionario online, gratis y en el navegador:",
    modes: [
      "Simulacro de 5 preguntas al azar, como el examen",
      "Banco completo con las respuestas a la vista",
      "Cuestionario con el número de preguntas que elijas",
    ],
    cta: "Probar el cuestionario web",
    opens: "Se abre en alvaro-barrera.me",
  },
  /** Follows the store line that downloadCopy() builds from apps.ts. */
  downloadPitch: "Practica el examen teórico de SUCAMEC sin internet, donde estés.",
};

export type SucamecContent = typeof es;

const en: SucamecContent = {
  meta: {
    title: "ApruebaSUCAMEC — Peru SUCAMEC test: questions and practice exams",
    description:
      "Prepare for Peru's SUCAMEC written test: 100 exam-style questions, a 5-question simulation in 10 minutes, no internet needed. Not affiliated with SUCAMEC.",
  },
  nav: [
    { href: "#modos", label: "Study modes" },
    { href: "#resultados", label: "Results" },
    { href: "#funciones", label: "Features" },
    { href: "#faq", label: "FAQ" },
  ],
  eyebrow: "Peru SUCAMEC test",
  heroBody:
    "Practice with exam-style questions, take the timed simulation and track your progress before the written test for your firearms license in Peru. No account and no internet needed.",
  disclaimer: "Independent app. Not affiliated with SUCAMEC or any Peruvian government body.",
  heroShot: { src: shots.home, alt: "ApruebaSUCAMEC home screen with the study modes and the L1 to L6 license types" },
  stats: [
    { value: "100", label: "exam-style questions" },
    { value: "10 min", label: "5-question simulation" },
    { value: "70%", label: "to pass" },
    { value: "Offline", label: "study without internet" },
  ],
  modes: {
    title: "Four ways to practice",
    lead: "From reviewing the whole bank to simulating the test against the clock.",
    items: [
      { title: "SUCAMEC exam simulation", meta: "5 questions · 10 minutes", body: "Random questions and a timer, designed like the real test. No ads here." },
      { title: "Full practice exam", meta: "100 questions · no time limit", body: "The whole bank in order and at your own pace, to cover every topic without the clock." },
      { title: "Custom practice exam", meta: "1 to 100 questions", body: "You choose how many questions to answer today." },
      { title: "Full question bank", meta: "100 questions", body: "Every question with the right answer shown, to study before you practice." },
    ],
    bankNote: "65 multiple choice and 35 true or false. The exam simulation and the custom practice pick them at random.",
    shot: { src: shots.exam, alt: "Exam simulation with the timer at 09:44, true-or-false question 1 of 5 and True selected" },
  },
  results: {
    title: "Know where you stand after every attempt",
    lead: "When you finish, you see your score, your right and wrong answers, and whether you passed with 70% or more.",
    points: [
      "Review your answer next to the right one, question by question.",
      "Try again or copy your result to share it.",
      "The history keeps your attempts on your phone, even the ones you left unfinished.",
    ],
    resultShot: { src: shots.result, alt: "Final result of the simulation: 100%, passed, 5 right out of 5" },
    reviewShot: { src: shots.review, alt: "Exam review: questions 1 and 2 right, with the correct answer marked in green, and question 3 wrong" },
  },
  licenses: {
    title: "License types at hand",
    lead: "As a reference, the app lists the six types of firearms license.",
  },
  features: {
    title: "Also included",
    items: [
      { title: "Firearms manual", body: "A 6-page disassembly guide in images, with zoom to see every part." },
      { title: "Instant feedback", body: "In practice mode, each answer tells you right away whether it's right or wrong." },
      { title: "Font size", body: "Adjust it with a live preview and it applies across the whole app." },
      { title: "No account", body: "No sign-up. Your history stays on your phone." },
      { title: "No internet", body: "The questions and the manual come inside the app." },
      { title: "Phone and tablet", body: "The same app on iPhone, iPad and Android, tablets included." },
    ],
  },
  pricing: {
    title: "Free, with ads",
    body: "All the content is free. The app shows a banner in the practice modes and asks for your consent before loading ads where it applies. The exam simulation has no ads.",
  },
  webQuiz: {
    title: "Studying on a computer too? Try the web version",
    body: "The app lives on your phone. From a computer you can practice with the online quiz, free and in your browser (in Spanish):",
    modes: [
      "A 5-question random test, like the real exam",
      "The full question bank with the answers shown",
      "A quiz with as many questions as you choose",
    ],
    cta: "Try the web quiz",
    opens: "Opens alvaro-barrera.me",
  },
  downloadPitch: "Practice for the SUCAMEC written test offline, wherever you are.",
};

export const sucamecContent: Record<Locale, SucamecContent> = { es, en };
