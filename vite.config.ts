import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png:  { quality: 75 },
      jpeg: { quality: 75 },
      jpg:  { quality: 75 },
      webp: { quality: 80 },
    }),
  ],
  build: {
    // raise the warning threshold — images are handled by the optimizer
    chunkSizeWarningLimit: 600,
  },
})
