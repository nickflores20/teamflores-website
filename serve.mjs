// Serves the Vite built dist/ folder at http://localhost:3000
// Run: node serve.mjs
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const DIST = path.join(__dirname, 'dist');
const BRAND = path.join(__dirname, 'brand_assets');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Serve brand_assets directly from project root
  if (urlPath.startsWith('/brand_assets/')) {
    const assetPath = path.join(BRAND, urlPath.replace('/brand_assets/', ''));
    const ext = path.extname(assetPath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    fs.readFile(assetPath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
    return;
  }

  // Try to serve from dist/
  let filePath = path.join(DIST, urlPath);
  const ext = path.extname(filePath).toLowerCase();

  // SPA fallback: no extension → serve index.html
  if (!ext || !MIME[ext]) {
    filePath = path.join(DIST, 'index.html');
  }

  const contentType = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Final fallback to index.html for SPA routing
      fs.readFile(path.join(DIST, 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
