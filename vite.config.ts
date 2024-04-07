/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (mode === 'playground') {
    return {
      root: './playground',
    }
  } else {
    return {
      plugins: [react()],
      test: {
        environment: 'jsdom',
        alias: {
          '@src': path.resolve(__dirname, 'src'),
        },
        coverage: {
          include: ['src/**'],
          reporter: ['text', 'clover', 'json'],
        },
      },
    }
  }
})
