import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base keeps asset URLs valid on both root and subpath hosting.
  base: '/BradensWebsite/',
  server: {
    host: '127.0.0.1',
    port: 3001,
  }
})