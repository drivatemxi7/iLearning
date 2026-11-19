import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// usePolling makes hot reload work inside Docker / Codespaces volumes.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      watch: { usePolling: true },
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://127.0.0.1:3000',
          changeOrigin: true,
        },
      },
    },
  };
});
