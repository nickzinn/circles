/// <reference types="@vitest/browser/providers/playwright" /
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  test: {
    testTimeout: 1_000,
    teardownTimeout: 1_000,
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
})