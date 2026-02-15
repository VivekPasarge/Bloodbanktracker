// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,              // the port you open in browser
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // leave rewrite commented out if backend expects /api prefix
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
