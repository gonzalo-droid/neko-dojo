import type { Locale } from "@/i18n/config";

/* PROVISIONAL CONTENT. Goals isn't released: features below are plans. */
const es = {
  meta: {
    title: "Goals — Grandes metas. Pequeños pasos.",
    description: "Goals es una app para registrar tus metas y seguir tu progreso paso a paso. Próximamente.",
  },
  nav: [
    { href: "#previstas", label: "Funciones previstas" },
    { href: "#lista", label: "Lista de espera" },
  ],
  heroBody: "Una app para registrar tus metas, dividirlas en pasos y ver cómo avanzas.",
  mock: {
    goal: "Correr 10 km",
    steps: ["Correr 2 km sin parar", "Correr 4 km", "Correr 6 km", "Correr 8 km", "Correr 10 km"],
    done: 2,
    progress: "2 de 5 pasos",
  },
  planned: [
    { title: "Metas divididas en pasos", body: "Convierte un objetivo grande en pasos que puedes cumplir esta semana." },
    { title: "Progreso a la vista", body: "Mira cuánto avanzaste en cada meta, sin hojas de cálculo." },
    { title: "Recordatorios tranquilos", body: "Avisos cuando tú los quieras, para no perder el ritmo." },
  ],
  waitlistTitle: "Avísame cuando salga",
  waitlistBody: "Goals todavía no está disponible. Deja tu correo y te escribimos en el lanzamiento.",
};

export type GoalsContent = typeof es;

const en: GoalsContent = {
  meta: {
    title: "Goals — Big goals. Small steps.",
    description: "Goals is an app to set your goals and track your progress step by step. Coming soon.",
  },
  nav: [
    { href: "#previstas", label: "Planned features" },
    { href: "#lista", label: "Waitlist" },
  ],
  heroBody: "An app to set your goals, break them into steps and see how far you've come.",
  mock: {
    goal: "Run 10 km",
    steps: ["Run 2 km nonstop", "Run 4 km", "Run 6 km", "Run 8 km", "Run 10 km"],
    done: 2,
    progress: "2 of 5 steps",
  },
  planned: [
    { title: "Goals broken into steps", body: "Turn a big goal into steps you can finish this week." },
    { title: "Progress at a glance", body: "See how far you've come on each goal, no spreadsheets." },
    { title: "Calm reminders", body: "Nudges when you want them, so you keep your rhythm." },
  ],
  waitlistTitle: "Tell me when it's out",
  waitlistBody: "Goals isn't available yet. Leave your email and we'll write when it launches.",
};

export const goalsContent: Record<Locale, GoalsContent> = { es, en };
