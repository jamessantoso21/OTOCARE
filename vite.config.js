import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    
    chunkSizeWarningLimit: 1000,
  },
})