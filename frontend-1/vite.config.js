import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',

        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    port: 3000,
  },
  plugins: [react()],
});
