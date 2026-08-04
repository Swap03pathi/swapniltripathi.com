import { defineConfig } from 'vitest/config';

/**
 * The engine and client-logic tests live beside the code they cover (in the
 * site tree), but vitest is installed here — the worker workspace owns the
 * game's dev tooling so the site's dependency tree stays lean for the
 * Cloudflare Pages build.
 */
export default defineConfig({
  test: {
    root: '../..',
    include: ['src/game/**/__tests__/**/*.test.ts'],
  },
});
