import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Client build only: vite-react-ssg runs a second SSR build (isSsrBuild=true
      // via its inline `build.ssr`) whose single-entry Node output must not be
      // re-chunked by manualChunks.
      output: isSsrBuild
        ? {}
        : {
            manualChunks(id: string) {
              // Icons otherwise emit as ~20 sub-1KB chunks (one per icon, shared
              // between page chunks), each a separate request. One shared chunk
              // removes that waterfall; only icons actually imported are included.
              if (id.includes('node_modules/lucide-react/')) return 'icons';
            },
          },
    },
  },
  ssgOptions: {
    dirStyle: 'nested', // emits /experience/index.html → clean /experience URLs on Cloudflare Pages
    formatting: 'none', // 'prettify' causes hydration failures per vite-react-ssg docs
    script: 'defer',
    // Inline above-the-fold CSS; 'media' swaps the full stylesheet to a
    // non-render-blocking load (media="print" until it finishes downloading).
    beastiesOptions: { preload: 'media' },
  },
}));
