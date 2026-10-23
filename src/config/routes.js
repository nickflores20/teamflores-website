import { BRAND_NAME } from './site';
import { PROGRAMS } from '../content/programs';
import { CITIES } from '../content/cities';

// Route table: single source for the router, prerender, sitemap and SEO tags.
const withBrand = (t) => `${t} | ${BRAND_NAME}`;

export const ROUTES = [
  {
    path: '/',
    kind: 'home',
    title: `Nevada Mortgage Loan Officer | ${BRAND_NAME}`,
    description:
      'Nick Flores Sr. of SunnyHill Financial helps buyers and homeowners in Las Vegas, Henderson, Reno, and Sparks, Nevada explore VA, FHA, conventional, jumbo, non-QM, DSCR, and refinance loans.',
  },
  ...CITIES.map((c) => ({
    path: `/nevada/${c.slug}`,
    kind: 'city',
    slug: c.slug,
    title: withBrand(c.title),
    description: c.description,
  })),
  ...PROGRAMS.map((p) => ({
    path: `/loan-programs/${p.slug}`,
    kind: 'program',
    slug: p.slug,
    title: withBrand(p.title),
    description: p.description,
  })),
  {
    path: '/mortgage-calculator',
    kind: 'calculator',
    title: withBrand('Mortgage Payment Calculator (Educational Estimate)'),
    description:
      'An educational mortgage payment estimator for Nevada buyers and homeowners. Estimates only, not a rate quote or commitment to lend.',
  },
  {
    path: '/about',
    kind: 'about',
    title: withBrand('About Nick Flores Sr.'),
    description:
      'Meet Nick Flores Sr., Division Director at SunnyHill Financial (NMLS #422150), serving home buyers and homeowners in Las Vegas, Henderson, Reno, and Sparks.',
  },
  {
    path: '/contact',
    kind: 'contact',
    title: withBrand('Contact Nick Flores Sr.'),
    description:
      'Contact Nick Flores Sr. at SunnyHill Financial by phone at 702-497-6370 or send a short message to talk about your Nevada home loan goals.',
  },
  {
    path: '/privacy-disclosures',
    kind: 'legal',
    title: withBrand('Privacy and Disclosures'),
    description:
      'Privacy practices and important disclosures for the SunnyHill Financial - Nick Flores Sr. website, including licensing and equal housing information.',
  },
];

export const NOT_FOUND_ROUTE = {
  path: '/404',
  kind: 'notfound',
  title: withBrand('Page Not Found'),
  description: 'The page you were looking for could not be found.',
  noindexAlways: true,
};

// Old routes from the previous site. Redirected (301 on Vercel, <Navigate> in the SPA).
export const REDIRECTS = [
  { from: '/states', to: '/nevada/las-vegas' },
  { from: '/learning-center', to: '/loan-programs/first-time-buyer' },
  { from: '/loan-types', to: '/' },
  { from: '/price-your-loan', to: '/mortgage-calculator' },
  { from: '/apply', to: '/contact' },
];

export const findRoute = (pathname) => {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return ROUTES.find((r) => r.path === clean) || NOT_FOUND_ROUTE;
};
