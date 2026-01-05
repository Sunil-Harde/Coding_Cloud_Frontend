import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy config allows you to use '/api' in your frontend
    // and have it redirected to your PythonAnywhere backend.
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