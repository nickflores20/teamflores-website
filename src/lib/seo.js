import {
  ALLOW_INDEXING, SITE_URL, BRAND_NAME, OFFICER, COMPANY, SERVICE_CITIES,
} from '../config/site';

export const canonicalFor = (path) => `${SITE_URL}${path === '/' ? '/' : path}`;

export const robotsContent = (route) =>
  ALLOW_INDEXING && !route.noindexAlways ? 'index, follow' : 'noindex, nofollow';

const areaServed = () =>
  SERVICE_CITIES.map((c) => ({
    '@type': 'City',
    name: `${c.name}, NV`,
    containedInPlace: { '@type': 'State', name: 'Nevada' },
  }));

// Person + FinancialService. No street address, email, or company NMLS until confirmed.
export function buildSchema(route) {
  const orgId = `${SITE_URL}/#financialservice`;
  const personId = `${SITE_URL}/#person`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialService',
        '@id': orgId,
        name: BRAND_NAME,
        url: `${SITE_URL}/`,
        telephone: OFFICER.phoneE164,
        description:
          'Mortgage loan officer services for home buyers and homeowners in Las Vegas, Henderson, Reno, and Sparks, Nevada.',
        areaServed: areaServed(),
        employee: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: OFFICER.name,
        jobTitle: OFFICER.title,
        telephone: OFFICER.phoneE164,
        url: `${SITE_URL}/about`,
        image: `${SITE_URL}${OFFICER.photo}`,
        identifier: { '@type': 'PropertyValue', propertyID: 'NMLS', value: OFFICER.nmls },
        worksFor: { '@type': 'Organization', name: COMPANY.name },
        affiliation: { '@id': orgId },
        areaServed: areaServed(),
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalFor(route.path)}#webpage`,
        url: canonicalFor(route.path),
        name: route.title,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: BRAND_NAME, url: `${SITE_URL}/` },
        about: { '@id': orgId },
      },
    ],
  };
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function buildHeadTags(route) {
  const canonical = canonicalFor(route.path);
  const ld = JSON.stringify(buildSchema(route)).replace(/</g, '\u003c');
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="robots" content="${robotsContent(route)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta name="author" content="${esc(OFFICER.name)}" />`,
    `<script type="application/ld+json" id="ld-json">${ld}</script>`,
  ].join('\n    ');
}
