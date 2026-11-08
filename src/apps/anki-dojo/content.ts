import type { Locale } from "@/i18n/config";

/* PROVISIONAL CONTENT. Anki Dojo is in development: features below are plans, not shipped. */
const es = {
  meta: {
    title: "Anki Dojo — Aprende idiomas con tarjetas e IA",
    description: "Anki Dojo es una app en desarrollo para aprender idiomas con tarjetas de estudio e inteligencia artificial.",
  },
  nav: [
    { href: "#previstas", label: "Funciones previstas" },
    { href: "#lista", label: "Lista de espera" },
  ],
  heroBody: "Una app en desarrollo para aprender idiomas con tarjetas de estudio y ayuda de inteligencia artificial.",
  flip: "Toca la tarjeta para darle la vuelta",
  cards: [
    { front: "猫", reading: "neko", back: "gato" },
    { front: "道場", reading: "dōjō", back: "lugar de práctica" },
    { front: "言葉", reading: "kotoba", back: "palabra" },
  ],
  next: "Siguiente tarjeta",
  planned: [
    { title: "Tarjetas que vuelven a tiempo", body: "Repaso espaciado: cada tarjeta reaparece justo antes de que la olvides." },
    { title: "Ejemplos generados con IA", body: "Frases de ejemplo en contexto para cada palabra que estudies." },
    { title: "Mazos para empezar", body: "Colecciones iniciales para no empezar desde cero." },
  ],
  waitlistTitle: "Sé de los primeros en probarla",
  waitlistBody: "Te escribiremos una sola vez, cuando Anki Dojo esté lista.",
  nameNote: "Anki Dojo es un nombre provisional.",
};

export type AnkiContent = typeof es;

const en: AnkiContent = {
  meta: {
    title: "Anki Dojo — Learn languages with flashcards and AI",
    description: "Anki Dojo is an app in development for learning languages with flashcards and artificial intelligence.",
  },
  nav: [
    { href: "#previstas", label: "Planned features" },
    { href: "#lista", label: "Waitlist" },
  ],
  heroBody: "An app in development for learning languages with flashcards and help from artificial intelligence.",
  flip: "Tap the card to flip it",
  cards: [
    { front: "猫", reading: "neko", back: "cat" },
    { front: "道場", reading: "dōjō", back: "place of practice" },
    { front: "言葉", reading: "kotoba", back: "word" },
  ],
  next: "Next card",
  planned: [
    { title: "Cards that come back on time", body: "Spaced repetition: each card returns right before you'd forget it." },
    { title: "AI-generated examples", body: "Example sentences in context for every word you study." },
    { title: "Starter decks", body: "Ready-made collections so you don't start from zero." },
  ],
  waitlistTitle: "Be among the first to try it",
  waitlistBody: "We'll email you once, when Anki Dojo is ready.",
  nameNote: "Anki Dojo is a working name.",
};

export const ankiContent: Record<Locale, AnkiContent> = { es, en };
