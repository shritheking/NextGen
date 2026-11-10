import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-client-portal',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/client' || req.url === '/client/') {
            req.url = '/client.html';
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/client' || req.url === '/client/') {
            req.url = '/client.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3005,
    host: true
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
    cors: true
  }
});
