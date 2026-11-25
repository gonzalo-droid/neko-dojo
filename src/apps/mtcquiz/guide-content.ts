import type { Locale } from "@/i18n/config";
import { MTC_EXAM } from "@/lib/mtc";

/**
 * Guide to the MTC traffic rules test (/apps/mtcquiz/simulador/guia). Every fact comes from the
 * gob.pe pages in GUIDE_SOURCES, read on GUIDE_CHECKED; the "how to prepare" part is our advice
 * and says so. Fees and requirements change: check the sources again before editing the numbers.
 */
export const GUIDE_CHECKED = "2026-11-25";
export const GUIDE_SOURCES = [
  { url: "https://www.gob.pe/135-obtener-licencia-de-conducir-brevete-por-primera-vez", updated: "2023-09-12" },
  { url: "https://www.gob.pe/196-obtener-licencia-de-conducir-brevete-por-primera-vez-rendir-examen-de-reglas-de-transito-para-obtener-licencia-de-conducir-brevete", updated: "2023-09-12" },
  { url: "https://www.gob.pe/136-obtener-licencia-de-conducir-brevete-por-primera-vez-condiciones", updated: "2024-01-14" },
] as const;
/** Touring y Automóvil Club del Perú (Lima), new license: one fee for the rules and the driving test. */
const LIMA_FEE = "S/ 67.32";
const ATTEMPTS = 2;

const { questions: N, minutes: M, pass: P } = MTC_EXAM;

type Item = { title: string; body: string };

const es = {
  meta: {
    title: "Examen de reglas de tránsito MTC 2026: cómo es, costo y cómo aprobar",
    description: `Guía del examen teórico del brevete: ${N} preguntas, ${M} minutos, ${P} correctas para aprobar, ${ATTEMPTS} intentos, dónde se rinde y cuánto cuesta en Lima. Con simulador gratis.`,
  },
  breadcrumb: "Guía del examen",
  h1: "Examen de reglas de tránsito del MTC: cómo es y cómo aprobarlo",
  lead: "Lo que necesitas saber antes de rendir el examen teórico del brevete, con los datos oficiales de gob.pe y un simulador para practicar.",
  facts: [
    { value: String(N), label: "preguntas" },
    { value: `${M} min`, label: "como máximo" },
    { value: `${P}/${N}`, label: "para aprobar" },
    { value: String(ATTEMPTS), label: "intentos" },
  ],
  startCta: "Hacer un simulacro A-I",
  otherCta: "Elegir otra licencia",
  what: {
    title: "Qué es y qué evalúa",
    body: "Es el examen teórico que rindes para sacar tu licencia de conducir. Evalúa tus conocimientos sobre reglas de tránsito, infracciones y sanciones, conducción eficiente y seguros contra accidentes, entre otros temas. Las preguntas salen del balotario oficial de tu categoría.",
    bankLink: "Ver el balotario de cada categoría",
  },
  steps: {
    title: "Los pasos para sacar tu brevete",
    items: [
      { title: "Examen médico", body: "Va primero: sin el examen médico aprobado no puedes rendir el examen de reglas." },
      { title: "Examen de reglas de tránsito", body: `${N} preguntas para marcar en ${M} minutos como máximo. Necesitas ${P} correctas.` },
      { title: "Examen práctico de manejo", body: "Con el examen de reglas aprobado, pasas al examen de manejo." },
    ] as Item[],
    note: "Para manejar autos, todos empiezan por la licencia A-I. Después puedes pedir una categoría profesional si cumples los requisitos.",
  },
  how: {
    title: "Cómo rendir el examen de reglas",
    items: [
      { title: "Saca una cita", body: "En Lima se rinde en el Touring y Automóvil Club del Perú: inscríbete en su web o por su central telefónica. En regiones, en el Centro de Evaluación de tu localidad, a cargo de la Dirección Regional de Transporte Terrestre." },
      { title: "Paga el derecho de examen", body: `En Lima, el Touring cobra un pago único de ${LIMA_FEE} por el examen de reglas y el de manejo (trámite nuevo). Puedes pagar en sus oficinas o en Scotiabank, Interbank o BIF. En regiones, el costo lo fija cada centro de evaluación.` },
      { title: "Lleva tu documento", body: "DNI, carné de extranjería, CPP u otro documento de identidad, original y vigente." },
      { title: "Rinde el examen", body: `Tienes ${M} minutos para ${N} preguntas. Si dudas en una, puedes pasar a la siguiente. El resultado se registra solo en el sistema del MTC.` },
      { title: "Si desapruebas", body: `Tienes derecho a ${ATTEMPTS} intentos en el proceso. El segundo también se programa con cita.` },
    ] as Item[],
  },
  requirements: {
    title: "Quién puede rendirlo",
    items: [
      "Tener 18 años o más.",
      "Desde los 16 años pueden sacar la A-I quienes estén casados o tengan un título oficial para ejercer una profesión u oficio, con plena capacidad civil.",
      "No estar privado de conducir por resolución judicial.",
      "Haber aprobado el examen médico.",
    ],
  },
  prepare: {
    title: "Cómo prepararte",
    lead: "Esto ya no es del trámite oficial: es el orden que te recomendamos para llegar seguro.",
    items: [
      { title: "Lee el balotario de tu categoría", body: "Cada pregunta con su respuesta y su fundamento. Usa el buscador para repasar un tema, como semáforos o alcohol." },
      { title: "Practica sin reloj", body: "En el modo práctica ves al instante si acertaste y por qué." },
      { title: "Haz simulacros como el real", body: `${N} preguntas y ${M} minutos, viendo tus respuestas solo al final. Sigue hasta pasar de ${P} varias veces.` },
      { title: "Repasa tus errores", body: "El simulador guarda las preguntas que fallas para que las practiques aparte." },
    ] as Item[],
  },
  faqTitle: "Preguntas frecuentes del examen",
  faq: [
    { q: "¿Cuántas preguntas tiene el examen de reglas del MTC?", a: `${N} preguntas para marcar, en un máximo de ${M} minutos.` },
    { q: "¿Cuántas preguntas debo acertar para aprobar?", a: `Al menos ${P} de ${N}.` },
    { q: "¿Qué pasa si desapruebo?", a: `Tienes derecho a ${ATTEMPTS} intentos en el proceso. El segundo también se programa con cita.` },
    { q: "¿Cuánto cuesta el examen en Lima?", a: `En el Touring, ${LIMA_FEE} por trámite nuevo: un pago único que cubre el examen de reglas y el de manejo. En regiones depende del centro de evaluación.` },
    { q: "¿Puedo rendir el examen de reglas sin el examen médico?", a: "No. Primero debes aprobar el examen médico." },
  ],
  sources: {
    title: "Fuentes",
    body: (checked: string) =>
      `Datos de las páginas del trámite en gob.pe del Ministerio de Transportes y Comunicaciones, revisadas el ${checked}. Los costos y requisitos pueden cambiar: confírmalos en gob.pe antes de tu trámite.`,
    updated: (date: string) => `último cambio: ${date}`,
    labels: ["Obtener licencia de conducir por primera vez", "Rendir examen de reglas de tránsito", "Condiciones"],
  },
  hubLink: "Cómo es el examen",
};

export type GuideContent = typeof es;

const en: GuideContent = {
  meta: {
    title: "Peru MTC traffic rules test 2026: format, fee and how to pass",
    description: `Guide to Peru's written driving test: ${N} questions, ${M} minutes, ${P} right answers to pass, ${ATTEMPTS} attempts, where to take it and what it costs in Lima. With a free simulator.`,
  },
  breadcrumb: "Test guide",
  h1: "Peru's MTC traffic rules test: what it is and how to pass",
  lead: "What you need to know before the written test for a Peruvian driver's license, with the official facts from gob.pe and a simulator to practice.",
  facts: [
    { value: String(N), label: "questions" },
    { value: `${M} min`, label: "at most" },
    { value: `${P}/${N}`, label: "to pass" },
    { value: String(ATTEMPTS), label: "attempts" },
  ],
  startCta: "Take an A-I practice exam",
  otherCta: "Pick another license",
  what: {
    title: "What it is and what it covers",
    body: "It's the written test you take to get a driver's license in Peru. It covers traffic rules, offences and penalties, efficient driving and accident insurance, among other topics. The questions come from the official question bank for your license category. The test is in Spanish.",
    bankLink: "See the question bank for each category",
  },
  steps: {
    title: "The steps to get your license",
    items: [
      { title: "Medical exam", body: "It comes first: you can't take the rules test without passing the medical exam." },
      { title: "Traffic rules test", body: `${N} multiple-choice questions in at most ${M} minutes. You need ${P} right.` },
      { title: "Driving test", body: "Once you pass the rules test, you move on to the driving test." },
    ],
    note: "To drive cars, everyone starts with the A-I license. Later you can apply for a professional category if you meet its requirements.",
  },
  how: {
    title: "How to take the rules test",
    items: [
      { title: "Book an appointment", body: "In Lima it's taken at the Touring y Automóvil Club del Perú: sign up on its website or by phone. In the regions, at your local Evaluation Center, run by the regional land transport office." },
      { title: "Pay the fee", body: `In Lima, the Touring charges a single ${LIMA_FEE} fee for the rules test and the driving test (new license). Pay at its offices or at Scotiabank, Interbank or BIF. In the regions, each evaluation center sets its own fee.` },
      { title: "Bring your ID", body: "Your DNI, foreign resident card (carné de extranjería), CPP or another ID, original and valid." },
      { title: "Take the test", body: `You have ${M} minutes for ${N} questions. If you're unsure about one, you can move on to the next. The result is recorded in the MTC system automatically.` },
      { title: "If you fail", body: `You get ${ATTEMPTS} attempts in the process. The second one also needs an appointment.` },
    ],
  },
  requirements: {
    title: "Who can take it",
    items: [
      "Be 18 or older.",
      "From age 16, people who are married or hold an official title to practice a profession or trade, with full civil capacity, can get the A-I.",
      "Not be barred from driving by a court order.",
      "Have passed the medical exam.",
    ],
  },
  prepare: {
    title: "How to prepare",
    lead: "This part isn't from the official procedure: it's the order we suggest to get there with confidence.",
    items: [
      { title: "Read your category's question bank", body: "Every question with its answer and legal basis. Use the search to review a topic, like traffic lights or alcohol." },
      { title: "Practice without a clock", body: "In practice mode you see right away whether you got it and why." },
      { title: "Take exams like the real one", body: `${N} questions and ${M} minutes, seeing your answers only at the end. Keep going until you score over ${P} several times.` },
      { title: "Review your mistakes", body: "The simulator keeps the questions you miss so you can practice them on their own." },
    ],
  },
  faqTitle: "Test FAQ",
  faq: [
    { q: "How many questions are on the MTC rules test?", a: `${N} multiple-choice questions, in at most ${M} minutes.` },
    { q: "How many do I need to get right to pass?", a: `At least ${P} out of ${N}.` },
    { q: "What happens if I fail?", a: `You get ${ATTEMPTS} attempts in the process. The second one also needs an appointment.` },
    { q: "How much does the test cost in Lima?", a: `At the Touring, ${LIMA_FEE} for a new license: a single fee that covers the rules test and the driving test. In the regions it depends on the evaluation center.` },
    { q: "Can I take the rules test without the medical exam?", a: "No. You need to pass the medical exam first." },
  ],
  sources: {
    title: "Sources",
    body: (checked: string) =>
      `Facts from the Ministry of Transport and Communications procedure pages on gob.pe, checked on ${checked}. Fees and requirements can change: confirm them on gob.pe before you apply.`,
    updated: (date: string) => `last updated: ${date}`,
    labels: ["Getting a driver's license for the first time", "Taking the traffic rules test", "Conditions"],
  },
  hubLink: "How the test works",
};

export const guideContent: Record<Locale, GuideContent> = { es, en };
