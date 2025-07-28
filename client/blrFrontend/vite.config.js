import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  darkMode: "class",
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // Any request starting with /api will be sent to your backend
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    }}
})
