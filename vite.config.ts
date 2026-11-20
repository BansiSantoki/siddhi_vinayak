import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        "services": resolve(root, 'pages/services/index.html'),
        "visiting-card": resolve(root, 'pages/visiting-card/index.html'),
        "visiting-card-2": resolve(root, 'pages/visiting-card-2/index.html'),
      },
    },
  },
})
