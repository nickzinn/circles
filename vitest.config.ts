/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['examples/*', 'tools/*', 'node_modules/*', 'dist/*'],
    include: ['test/**/*.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    deps: {
    optimizer: {web: {include: ['vitest-canvas-mock']}},
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    poolOptions: { threads: { singleThread: true } },
    coverage: {
      include: ['src/**/*.ts'],
    },
  },
});