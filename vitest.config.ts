import {fileURLToPath, URL} from 'url'

import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'src/scripts'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/scripts/**',
        'src/payload-types.ts',
        'src/**/*.d.ts',
      ],
      thresholds: {
        'src/lib/**': {lines: 37, statements: 37, functions: 35, branches: 35},
        'src/context/**': {lines: 60, statements: 60, functions: 60, branches: 60},
        'src/fields/**': {lines: 60, statements: 60, functions: 60, branches: 60},
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
