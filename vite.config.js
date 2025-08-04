import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer', // 👈 allows browser-compatible use of Buffer
    },
  },
  define: {
    'process.env': {}, // 👈 required for some polyfills
  },
});
