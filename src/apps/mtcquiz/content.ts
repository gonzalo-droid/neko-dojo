import type { Locale } from "@/i18n/config";

/*
 * MTCQuiz landing copy. Facts (categories, question counts, features, ads, Premium)
 * come from the app as published on Google Play. Screenshots are from the iOS build,
 * whose interface matches Android.
 */

type Shot = { src: string; alt: string };

const shots = {
  home: "/apps/mtcquiz/home.webp",
  category: "/apps/mtcquiz/category.webp",
  study: "/apps/mtcquiz/study.webp",
  exam: "/apps/mtcquiz/exam.webp",
  examImage: "/apps/mtcquiz/exam-image.webp",
  result: "/apps/mtcquiz/result.webp",
};

/** Real question counts per category, from the official question banks. */
export const categories = {
  a: [
    { code: "A-I", questions: 200 },
    { code: "A-IIa", questions: 224 },
    { code: "A-IIb", questions: 270 },
    { code: "A-IIIa", questions: 272 },
    { code: "A-IIIb", questions: 271 },
    { code: "A-IIIc", questions: 339 },
  ],
  b: [
    { code: "B-IIa", questions: 204 },
    { code: "B-IIb", questions: 204 },
    { code: "B-IIc", questions: 244 },
  ],
};

const es = {
  meta: {
    title: "MTCQuiz — Examen de brevete Perú: balotario del MTC y simulacros",
    description:
      "Practica el balotario oficial del examen de reglas de tránsito del MTC: unas 2.200 preguntas, simulacros cronometrados y sin internet. No afiliada al MTC.",
  },
  nav: [
    { href: "#practica", label: "Cómo practicar" },
    { href: "#categorias", label: "Categorías" },
    { href: "#funciones", label: "Funciones" },
    { href: "#faq", label: "Preguntas" },
  ],
  eyebrow: "Examen Brevete Perú",
  heroBody:
    "Estudia las mismas preguntas del balotario oficial del MTC y haz simulacros cronometrados hasta aprobar. Para sacar o recategorizar tu licencia de conducir.",
  simulator: { nav: "Simulador web", cta: "Prueba gratis el simulador web del examen", hint: "40 preguntas, 40 minutos, sin instalar nada." },
  disclaimer: "App independiente. No está afiliada al Ministerio de Transportes y Comunicaciones (MTC) ni a ninguna entidad del Estado.",
  heroShot: { src: shots.home, alt: "Pantalla de inicio de MTCQuiz con las categorías de licencia A-I, A-IIa, A-IIb y A-IIIa" } as Shot,
  stats: [
    { value: "9", label: "categorías de licencia" },
    { value: "~2.200", label: "preguntas oficiales" },
    { value: "Offline", label: "estudia sin internet" },
    { value: "Gratis", label: "con anuncios" },
  ],
  practice: {
    title: "Cómo se practica",
    lead: "Cuatro pantallas, del primer repaso al día del examen.",
    steps: [
      {
        title: "Elige tu categoría",
        body: "A-I para autos particulares, las A-II y A-III para profesionales, y las B para motos y mototaxis.",
        shot: { src: shots.category, alt: "Detalle de la categoría A-I con los botones Iniciar evaluación, Estudiar y Descargar PDF" },
      },
      {
        title: "Estudia el balotario",
        body: "Recorre todas las preguntas con la respuesta correcta marcada, busca por palabra y sigue tu avance.",
        shot: { src: shots.study, alt: "Modo estudio con preguntas del balotario, la respuesta correcta en verde y un buscador abajo" },
      },
      {
        title: "Haz el simulacro",
        body: "Preguntas al azar y con tiempo, como en el examen real. Tú eliges cuántas preguntas y cuántos minutos.",
        shot: { src: shots.exam, alt: "Simulacro de la categoría A-I con cronómetro, pregunta 1 de 10 y cuatro alternativas" },
      },
      {
        title: "Mira tu resultado",
        body: "Al terminar ves tu porcentaje, las correctas e incorrectas y si aprobaste o no.",
        shot: { src: shots.result, alt: "Resultado del simulacro: 90 %, aprobado, 9 correctas y 1 incorrecta de 10" },
      },
    ],
  },
  categories: {
    title: "Las 9 categorías del examen",
    lead: "Cada categoría tiene su propio balotario. Practicas solo el de la licencia que vas a sacar.",
    classA: "Clase A",
    classAHint: "Autos particulares y conductores profesionales",
    classB: "Clase B",
    classBHint: "Motos y mototaxis",
    colCategory: "Categoría",
    colQuestions: "Preguntas",
  },
  features: {
    title: "Además",
    items: [
      { title: "Historial y estadísticas", body: "Guarda cada intento y muestra cómo mejoran tus resultados." },
      { title: "Repaso de errores", body: "Junta las preguntas que más fallas para practicarlas aparte." },
      { title: "PDF del balotario", body: "Míralo dentro de la app y descárgalo para estudiar donde quieras." },
      { title: "Simulacro a tu medida", body: "Ajusta el número de preguntas y el tiempo del examen." },
      { title: "Racha de estudio", body: "Cuenta los días seguidos que practicas para que no pierdas el ritmo." },
      { title: "Tarifas del trámite", body: "Consulta lo que cuesta el trámite de la licencia antes de ir." },
    ],
  },
  source: {
    title: "Las preguntas del balotario, tal cual",
    body: [
      "Las preguntas, las respuestas y las imágenes vienen de los PDF oficiales que publica el MTC para cada categoría.",
      "No las corregimos ni las reescribimos, ni siquiera sus erratas: el examen real se califica contra ese documento, así que estudias exactamente lo que te van a preguntar.",
    ],
    shot: { src: shots.examImage, alt: "Pregunta del simulacro con un gráfico de carretera tomado del balotario oficial" },
  },
  pricing: {
    title: "Gratis, con anuncios",
    body: "Todo el contenido es gratuito. La app muestra anuncios y te pide tu consentimiento antes de cargarlos. Si prefieres estudiar sin anuncios, Premium los quita; se paga a través de la tienda.",
  },
  downloadTitle: "Empieza a practicar hoy",
};

export type MtcContent = typeof es;

const en: MtcContent = {
  meta: {
    title: "MTCQuiz — Peru driver's license test: MTC questions and exams",
    description:
      "Practice the official question bank of Peru's MTC traffic rules test: about 2,200 questions, timed practice exams, no internet. Not affiliated with the MTC.",
  },
  nav: [
    { href: "#practica", label: "How it works" },
    { href: "#categorias", label: "Categories" },
    { href: "#funciones", label: "Features" },
    { href: "#faq", label: "FAQ" },
  ],
  eyebrow: "Peru driver's license test",
  heroBody:
    "Study the same questions as the MTC's official question bank and take timed practice exams until you pass. For getting or upgrading your driver's license in Peru.",
  simulator: { nav: "Web simulator", cta: "Try the free web practice exam", hint: "40 questions, 40 minutes, nothing to install." },
  disclaimer: "Independent app. Not affiliated with Peru's Ministry of Transport and Communications (MTC) or any government body.",
  heroShot: { src: shots.home, alt: "MTCQuiz home screen listing the A-I, A-IIa, A-IIb and A-IIIa license categories" },
  stats: [
    { value: "9", label: "license categories" },
    { value: "~2,200", label: "official questions" },
    { value: "Offline", label: "study without internet" },
    { value: "Free", label: "with ads" },
  ],
  practice: {
    title: "How it works",
    lead: "Four screens, from your first review to test day.",
    steps: [
      {
        title: "Pick your category",
        body: "A-I for private cars, A-II and A-III for professional drivers, and B for motorcycles and mototaxis.",
        shot: { src: shots.category, alt: "A-I category detail with the Start test, Study and Download PDF buttons" },
      },
      {
        title: "Study the question bank",
        body: "Go through every question with the right answer marked, search by keyword and track your progress.",
        shot: { src: shots.study, alt: "Study mode with question bank items, the right answer in green and a search bar at the bottom" },
      },
      {
        title: "Take the practice exam",
        body: "Random questions against the clock, like the real test. You choose how many questions and how many minutes.",
        shot: { src: shots.exam, alt: "A-I practice exam with a timer, question 1 of 10 and four options" },
      },
      {
        title: "See your result",
        body: "When you finish you get your score, right and wrong answers, and whether you passed.",
        shot: { src: shots.result, alt: "Practice exam result: 90%, passed, 9 right and 1 wrong out of 10" },
      },
    ],
  },
  categories: {
    title: "The 9 test categories",
    lead: "Each category has its own question bank. You only practice the one for the license you're getting.",
    classA: "Class A",
    classAHint: "Private cars and professional drivers",
    classB: "Class B",
    classBHint: "Motorcycles and mototaxis",
    colCategory: "Category",
    colQuestions: "Questions",
  },
  features: {
    title: "Also included",
    items: [
      { title: "History and stats", body: "Saves every attempt and shows how your results improve." },
      { title: "Mistake review", body: "Gathers the questions you miss most so you can practice them on their own." },
      { title: "Question bank PDF", body: "Read it in the app and download it to study wherever you like." },
      { title: "Custom practice exam", body: "Set the number of questions and the time limit." },
      { title: "Study streak", body: "Counts the days in a row you practice so you keep the rhythm." },
      { title: "Procedure fees", body: "Check what the license procedure costs before you go." },
    ],
  },
  source: {
    title: "The question bank, exactly as published",
    body: [
      "Questions, answers and images come from the official PDFs the MTC publishes for each category.",
      "We don't fix or reword them, not even their typos: the real test is graded against that document, so you study exactly what you'll be asked.",
    ],
    shot: { src: shots.examImage, alt: "Practice exam question with a road diagram taken from the official question bank" },
  },
  pricing: {
    title: "Free, with ads",
    body: "All the content is free. The app shows ads and asks for your consent before loading them. If you'd rather study without ads, Premium removes them; it's paid through the store.",
  },
  downloadTitle: "Start practicing today",
};

export const mtcContent: Record<Locale, MtcContent> = { es, en };
