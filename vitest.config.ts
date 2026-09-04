import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Config de tests aislada de vite.config.ts (que carga el plugin de Tailwind y
// fija el puerto del dev server, cosas que no queremos en jsdom).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      // Alcance acotado a los módulos con tests en esta fase. El resto de la
      // app (páginas, hooks de datos, componentes de gráficas) todavía no
      // tiene cobertura: ampliar esta lista según se añadan tests.
      include: [
        'src/lib/utils/validation.ts',
        'src/lib/utils/format.ts',
        'src/lib/csv.ts',
        'src/components/common/Button.tsx',
        'src/store/authStore.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 70,
        statements: 80,
      },
    },
  },
})
