import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development the API runs separately (npm run dev:server).
    proxy: { '/api': 'http://localhost:3001' },
  },
})
