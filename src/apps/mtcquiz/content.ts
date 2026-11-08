import type { Locale } from "@/i18n/config";

/*
 * PROVISIONAL CONTENT. MTCQuiz is published, but its real features, screenshots
 * and store links are not confirmed yet. Replace every block marked provisional.
 */
const es = {
  meta: {
    title: "MTCQuiz — Prepárate para el examen de la licencia de conducir",
    description: "Cuestionarios para practicar el examen de conocimientos de la licencia de conducir en Perú. App independiente, no afiliada al MTC.",
  },
  nav: [
    { href: "#practica", label: "Cómo practicar" },
    { href: "#faq", label: "Preguntas" },
  ],
  heroBody: "Practica con cuestionarios para el examen de conocimientos de la licencia de conducir en Perú, a tu ritmo y desde el celular.",
  disclaimer: "App independiente. No está afiliada al Ministerio de Transportes y Comunicaciones (MTC) ni a ninguna entidad del Estado.",
  mock: {
    label: "Pregunta 12 de 40",
    question: "¿Qué indica una señal de forma octogonal y color rojo?",
    options: ["Ceda el paso", "Pare", "Prohibido estacionar"],
    correct: 1,
    feedback: "Correcto",
  },
  practice: {
    title: "Cómo se practica",
    steps: [
      { title: "Elige un tema", body: "Señales, reglas de tránsito o primeros auxilios: practica lo que más te cuesta." },
      { title: "Responde a tu ritmo", body: "Cada pregunta te muestra al instante si acertaste." },
      { title: "Repasa tus errores", body: "Vuelve a las preguntas que fallaste hasta dominarlas." },
    ],
  },
  sourceTitle: "Sobre las preguntas",
  sourceBody: "[Pendiente: indicar la fuente pública del banco de preguntas y cuándo se actualizó por última vez.]",
  downloadTitle: "Descárgala",
};

export type MtcContent = typeof es;

const en: MtcContent = {
  meta: {
    title: "MTCQuiz — Get ready for Peru's driver's license test",
    description: "Quizzes to practice Peru's driver's license knowledge test. Independent app, not affiliated with the MTC.",
  },
  nav: [
    { href: "#practica", label: "How to practice" },
    { href: "#faq", label: "FAQ" },
  ],
  heroBody: "Practice with quizzes for Peru's driver's license knowledge test, at your own pace, on your phone.",
  disclaimer: "Independent app. Not affiliated with Peru's Ministry of Transport and Communications (MTC) or any government body.",
  mock: {
    label: "Question 12 of 40",
    question: "What does a red, eight-sided sign mean?",
    options: ["Yield", "Stop", "No parking"],
    correct: 1,
    feedback: "Correct",
  },
  practice: {
    title: "How practice works",
    steps: [
      { title: "Pick a topic", body: "Signs, traffic rules or first aid: practice what you find hardest." },
      { title: "Answer at your pace", body: "Each question shows right away whether you got it." },
      { title: "Review your mistakes", body: "Go back to the questions you missed until you've got them." },
    ],
  },
  sourceTitle: "About the questions",
  sourceBody: "[Pending: state the public source of the question bank and when it was last updated.]",
  downloadTitle: "Get the app",
};

export const mtcContent: Record<Locale, MtcContent> = { es, en };
