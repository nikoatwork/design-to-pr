import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: __dirname,
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')]
    }
  },
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'client-design-system': path.resolve(__dirname, '../client-design-system'),
    },
  },
})
