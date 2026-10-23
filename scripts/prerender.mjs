// Build-time prerender. Runs after `vite build` (client) and `vite build --ssr`.
// Writes dist/<route>/index.html for every route, plus 404.html, sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const {
  render, ROUTES, NOT_FOUND_ROUTE, buildHeadTags, ALLOW_INDEXING, SITE_URL, PLACEHOLDER_SITE_URL,
} = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--head-tags-->')) {
  throw new Error('dist/index.html is missing the prerender placeholders.');
}

const write = (file, contents) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
};

const problems = [];

function build(route, renderUrl, outFile) {
  const html = template
    .replace('<!--head-tags-->', buildHeadTags(route))
    .replace('<!--app-html-->', render(renderUrl));
  // Guard: every page needs exactly one H1.
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${route.path}: expected 1 <h1>, found ${h1s}`);
  if (ALLOW_INDEXING && html.includes('[[VERIFY')) problems.push(`${route.path}: unresolved [[VERIFY]] placeholders`);
  write(outFile, html);
}

for (const route of ROUTES) {
  const out = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path, 'index.html');
  build(route, route.path, out);
}
build(NOT_FOUND_ROUTE, '/__not-found__', path.join(dist, '404.html'));

// Launch guard: never go indexable with placeholder domain or unresolved placeholders.
if (ALLOW_INDEXING && SITE_URL === PLACEHOLDER_SITE_URL) problems.push('VITE_ALLOW_INDEXING=true but VITE_SITE_URL is still the placeholder.');
if (problems.length) {
  console.error('\nPrerender failed:\n - ' + problems.join('\n - '));
  process.exit(1);
}

// sitemap.xml (generated for every build; robots.txt only advertises it once indexing is on)
const lastmod = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n');
write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

write(
  path.join(dist, 'robots.txt'),
  ALLOW_INDEXING
    ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : '# DRAFT: site is not approved for indexing.\nUser-agent: *\nDisallow: /\n'
);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log(`Prerendered ${ROUTES.length} pages + 404.html. Indexing: ${ALLOW_INDEXING ? 'ON' : 'OFF (noindex)'}.`);
