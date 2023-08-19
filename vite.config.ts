import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@app": path.resolve(__dirname, 'src/app'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@widgets": path.resolve(__dirname, 'src/widgets'),
      "@entites": path.resolve(__dirname, 'src/entites'),
      "@features": path.resolve(__dirname, 'src/features'),
      "@shared": path.resolve(__dirname, 'src/shared'),
      "@assets": path.resolve(__dirname, 'src/assets')
    }
  }
}) 
