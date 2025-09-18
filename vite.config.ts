import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Supabase Edge Functions in development to avoid CORS
      '/supabase': {
        target: 'https://kfopjhtmuwotcnrdmvjh.supabase.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/supabase/, '/functions/v1'),
      },
    },
  },
})
