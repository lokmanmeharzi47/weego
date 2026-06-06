import next from "eslint-config-next/core-web-vitals";

/**
 * Configuration ESLint « flat » (ESLint 9 / Next.js 16).
 * Remplace l'ancien `.eslintrc` + `next lint` (supprimé dans Next 16).
 * Lancer avec : `npm run lint`.
 */
const config = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
];

export default config;
