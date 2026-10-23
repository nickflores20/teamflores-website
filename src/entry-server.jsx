import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { ROUTES, NOT_FOUND_ROUTE } from './config/routes';
import { buildHeadTags } from './lib/seo';
import { ALLOW_INDEXING, SITE_URL, PLACEHOLDER_SITE_URL } from './config/site';

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

export { ROUTES, NOT_FOUND_ROUTE, buildHeadTags, ALLOW_INDEXING, SITE_URL, PLACEHOLDER_SITE_URL };
