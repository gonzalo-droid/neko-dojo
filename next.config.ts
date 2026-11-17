import type { NextConfig } from "next";

/*
 * Old portfolio (gonzalo-lozg.me) → Nekodojo.
 * These only apply to requests whose Host is gonzalo-lozg.me, so they do nothing until
 * that domain is added to this Vercel project. Permanent (308) so search engines move
 * the old pages' ranking here.
 */
const OLD_HOSTS = ["gonzalo-lozg.me", "www.gonzalo-lozg.me"];

const oldArticles: Record<string, string> = {
  "testing-en-android": "android-testing",
  "desarrollo-de-apps-con-kotlin-multiplatform": "kotlin-multiplatform",
  "integracion-de-ia-en-apps-android": "android-ai",
  "arquitectura-mvvm-en-android": "android-mvvm",
  "coroutines-en-android-programacion-asincrona-moderna": "android-coroutines",
  "inyeccion-de-dependencias-en-android-con-hilt": "android-dependency-injection",
  "jetpack-compose-el-futuro-de-la-ui-en-android": "android-jetpack-compose",
};

const portfolioMap: [string, string][] = [
  ["/apps-docs/mtcquiz/politics", "/apps/mtcquiz/privacy"],
  ["/apps-docs/mtcquiz/term", "/apps/mtcquiz/terms"],
  ["/privacy-policy", "/apps/mtcquiz/privacy"], // old AutoTest Licencia (= MTCQuiz) policy
  ["/experience", "/about"],
  ["/project/:slug*", "/about"],
  ["/article", "/blog"],
  ...Object.entries(oldArticles).map(([from, to]) => [`/article/${from}`, `/blog/${to}`] as [string, string]),
  ["/articles", "/blog"],
  ["/", "/about"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return OLD_HOSTS.flatMap((host) =>
      portfolioMap.flatMap(([source, destination]) => [
        { source, destination: `https://nekodojo.app${destination}`, permanent: true, has: [{ type: "host" as const, value: host }] },
        ...(source === "/" || source.includes(":")
          ? []
          : [{ source: `${source}/`, destination: `https://nekodojo.app${destination}`, permanent: true, has: [{ type: "host" as const, value: host }] }]),
      ]),
    );
  },
};

export default nextConfig;
