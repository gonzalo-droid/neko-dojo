#!/usr/bin/env node
/**
 * Copies the MTC question banks, images and PDFs from the MTCQuiz Android app into this site,
 * so the web simulator and the app always share one source.
 *
 *   node scripts/sync-mtc.mjs [path-to-MTCQuiz-repo]
 *
 * Default repo: $MTC_REPO or /Volumes/Neko/AndroidStudioProjects/MTCQuiz.
 * Output (committed): public/apps/mtcquiz/simulador/{data,img,pdf,cat}/
 * Category pictures are resized to webp with sharp (installed with Next.js).
 * Questions are copied as published, typos included: the real test is graded against them.
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const repo = process.argv[2] ?? process.env.MTC_REPO ?? "/Volumes/Neko/AndroidStudioProjects/MTCQuiz";
const assets = join(repo, "app/src/main/assets");
if (!existsSync(join(assets, "json"))) {
  console.error(`No question banks in ${assets}/json`);
  process.exit(1);
}

const out = "public/apps/mtcquiz/simulador";
for (const dir of ["data", "img", "pdf", "cat"]) {
  rmSync(join(out, dir), { recursive: true, force: true });
  mkdirSync(join(out, dir), { recursive: true });
}

// App file prefix → web slug and the PDF the app ships for it. Keep in sync with src/lib/mtc.ts.
const categories = [
  ["a1", "a-i", "CLASE_A_I"],
  ["a2a", "a-iia", "CLASE_A_IIA"],
  ["a2b", "a-iib", "CLASE_A_IIB"],
  ["a3a", "a-iiia", "CLASE_A_IIIA"],
  ["a3b", "a-iiib", "CLASE_A_IIIB"],
  ["a3c", "a-iiic", "CLASE_A_IIIC"],
  ["b2a", "b-iia", "CLASE_B_IIA"],
  ["b2b", "b-iib", "CLASE_B_IIB"],
  ["b2c", "b-iic", "CLASE_B_IIC"],
];

// The same picture is shipped once per category: name files by content so each is stored once.
const imageName = new Map();
function image(name) {
  if (imageName.has(name)) return imageName.get(name);
  const src = join(assets, "images", `${name}.webp`);
  if (!existsSync(src)) throw new Error(`Missing image ${name}.webp`);
  const hash = createHash("sha1").update(readFileSync(src)).digest("hex").slice(0, 12);
  const file = `${hash}.webp`;
  if (!existsSync(join(out, "img", file))) copyFileSync(src, join(out, "img", file));
  imageName.set(name, file);
  return file;
}

let total = 0;
for (const [prefix, slug, pdf] of categories) {
  const raw = JSON.parse(readFileSync(join(assets, "json", `${prefix}_questions.json`), "utf8")).data;
  const questions = raw.map((q) => {
    const letter = q.answer.trim().toLowerCase();
    const answer = q.options.findIndex((o) => o.trim().toLowerCase().startsWith(`${letter})`));
    if (answer < 0) throw new Error(`${prefix} #${q.id}: answer "${q.answer}" matches no option`);
    return {
      id: q.id,
      section: q.section ?? null,
      topic: q.topic ?? null,
      q: q.title.trim(),
      options: q.options.map((o) => o.trim()),
      answer,
      basis: q.fundamento?.trim() || null,
      images: (q.imagens ?? []).map(image),
    };
  });
  writeFileSync(join(out, "data", `${slug}.json`), JSON.stringify({ slug, questions }));
  copyFileSync(join(assets, "pdf", `${pdf}.pdf`), join(out, "pdf", `balotario-mtc-${slug}.pdf`));
  // The app's category card (a 1408×768 vehicle on transparency), at 2× the web's largest use.
  await sharp(join(assets, "anim", `${prefix}_card.png`)).resize({ width: 704 }).webp({ quality: 80, alphaQuality: 90 }).toFile(join(out, "cat", `${slug}.webp`));
  total += questions.length;
  console.log(`${slug}: ${questions.length} questions`);
}
console.log(`${total} questions, ${readdirSync(join(out, "img")).length} unique images, ${categories.length} PDFs → ${out}`);
