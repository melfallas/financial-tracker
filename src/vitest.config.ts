import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['src/test-setup.ts'],
    setupFiles: ['src/test-setup.ts', 'src/vitest-globals.ts'],
  },
});
