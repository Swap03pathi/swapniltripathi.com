import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssgOptions: {
    dirStyle: 'nested', // emits /experience/index.html → clean /experience URLs on Cloudflare Pages
    formatting: 'none', // 'prettify' causes hydration failures per vite-react-ssg docs
    script: 'defer',
    // Inline above-the-fold CSS; 'media' swaps the full stylesheet to a
    // non-render-blocking load (media="print" until it finishes downloading).
    beastiesOptions: { preload: 'media' },
  },
});
