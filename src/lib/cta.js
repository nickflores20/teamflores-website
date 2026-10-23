import { SONAR_URLS, UTM, CTAS } from '../config/site';

// Builds a Sonar URL with UTM parameters. `page` is the slug of the page the
// button sits on, so conversions can be attributed per page.
export function ctaUrl(ctaKey, page = 'home') {
  const cta = CTAS[ctaKey];
  const base = SONAR_URLS[ctaKey];
  try {
    const url = new URL(base);
    url.searchParams.set('utm_source', UTM.source);
    url.searchParams.set('utm_medium', UTM.medium);
    url.searchParams.set('utm_campaign', UTM.campaign);
    url.searchParams.set('utm_content', cta.utmContent);
    url.searchParams.set('utm_term', page || 'home');
    return url.toString();
  } catch {
    return base;
  }
}
