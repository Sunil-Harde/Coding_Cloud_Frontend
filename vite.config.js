import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // ✅ Removed 'tailwindcss()' from here
  server: {
    proxy: {
      '/api': {
        target: 'https://codingcloud.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
      '/media': {
        target: 'https://codingcloud.pythonanywhere.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})