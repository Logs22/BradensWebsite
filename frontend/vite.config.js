import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set root base path for custom domain bradenblackburnphotography.com
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 3001,
  }
})