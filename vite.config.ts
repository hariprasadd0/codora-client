import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { configDefaults } from 'vitest/config'
import type { UserConfig } from 'vite'

// https://vite.dev/config/
const config: UserConfig = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

export default config