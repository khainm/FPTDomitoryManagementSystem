import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003
  },
  build: {
    outDir: 'dist', // Ensure this is set to 'dist' or the correct output directory
  },
})
