import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mpa from 'vite-plugin-mpa'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './public',
  plugins: [react(), mpa()],
  build: {
    assetsDir: 'static/assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
