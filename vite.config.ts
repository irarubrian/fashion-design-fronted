import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fashion-design-backend-0jh8.onrender.com/0',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
