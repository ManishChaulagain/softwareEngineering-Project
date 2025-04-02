import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  },
  // 🔥 THIS IS THE KEY PART FOR VERCE/SPAs
  build: {
    outDir: 'dist'
  },
  // 👇 Enable history fallback
  preview: {
    port: 4173,
    strictPort: true
  },
  // 👇 Most important
  base: '/',
  publicDir: 'public'
});
