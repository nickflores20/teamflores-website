import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Serves /api/lead from api/lead.js during `vite` and `vite preview` so the form
// can be tested locally. On Vercel, the file runs as a serverless function.
function leadApi(env) {
  const attach = (server) => {
    server.middlewares.use('/api/lead', async (req, res) => {
      // Make .env values visible to the handler locally (never printed).
      for (const k of ['FUB_API_KEY', 'FUB_SYSTEM', 'FUB_SYSTEM_KEY', 'FUB_SOURCE', 'ALLOWED_ORIGIN']) {
        if (env[k] && !process.env[k]) process.env[k] = env[k];
      }
      const { default: handler } = await import(/* @vite-ignore */ `${pathToFileURL(path.resolve('api/lead.js')).href}?t=${Date.now()}`);
      await handler(req, res);
    });
  };
  return {
    name: 'lead-api',
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), leadApi(env)],
    server: { port: 3000, open: false },
    preview: { port: 3000 },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 600,
      rollupOptions: isSsrBuild
        ? {}
        : {
            output: {
              manualChunks: {
                vendor: ['react', 'react-dom', 'react-router-dom'],
              },
            },
          },
    },
    ssr: { noExternal: [] },
  };
});
