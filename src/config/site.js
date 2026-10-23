// Single source of truth for facts, placeholders and launch flags.
// Anything wrapped in [[VERIFY ...]] is NOT confirmed. Do not publish it until
// SunnyHill Financial confirms it. See TODO_FOR_HUMAN.md.

const env = import.meta.env || {};

// ── Launch flags ────────────────────────────────────────────────────────────
// Draft banner is ON unless VITE_DRAFT_BANNER=false at build time.
export const DRAFT_BANNER = env.VITE_DRAFT_BANNER !== 'false';
// Site is noindex unless VITE_ALLOW_INDEXING=true at build time.
export const ALLOW_INDEXING = env.VITE_ALLOW_INDEXING === 'true';

// ── Confirmed facts ─────────────────────────────────────────────────────────
export const OFFICER = {
  name: 'Nick Flores Sr.',
  title: 'Division Director',
  nmls: '422150',
  phoneDisplay: '702-497-6370',
  phoneHref: 'tel:+17024976370',
  phoneE164: '+17024976370',
  photo: '/brand_assets/nick.jpg',
};

export const COMPANY = { name: 'SunnyHill Financial' };

export const BRAND_NAME = 'SunnyHill Financial - Nick Flores Sr.';

// ── Unconfirmed: placeholders (kept out of all public output) ───────────────
export const UNVERIFIED = {
  companyNmls: '[[VERIFY: SunnyHill Financial company NMLS #]]',
  email: '[[VERIFY: contact email]]',
  streetAddress: '[[VERIFY: street address, do not publish unless confirmed]]',
  // Previously on the old site; held here until SunnyHill confirms them.
  legacyCompanyNmls: '[[VERIFY: 1708856 appeared on the old site]]',
  legacyEmail: '[[VERIFY: nick@sunnyhillfinancial.com appeared on the old site]]',
  legacyAddress: '[[VERIFY: 871 Coronado Center Drive appeared on the old site]]',
};

// Licensed states: one source of truth. Flip the flag after SunnyHill confirms.
export const LICENSED_STATES = ['NV', 'AZ', 'CA', 'FL', 'TX', 'WA', 'OR'];
export const LICENSED_STATES_VERIFIED = false;

export const isVerified = (value) => !String(value || '').includes('[[VERIFY');

// ── Domain ──────────────────────────────────────────────────────────────────
export const PLACEHOLDER_SITE_URL = 'https://PLACEHOLDER-DOMAIN.example';
export const SITE_URL = (env.VITE_SITE_URL || PLACEHOLDER_SITE_URL).replace(/\/$/, '');

// ── Third-party links (placeholders, [[VERIFY]]) ────────────────────────────
// Sonar URLs are unknown. Override with env vars at build time.
export const SONAR_URLS = {
  checkPricing: env.VITE_SONAR_CHECK_PRICING_URL || 'https://sonar-placeholder.example/check-pricing', // [[VERIFY]]
  startApplication: env.VITE_SONAR_START_APPLICATION_URL || 'https://sonar-placeholder.example/start-application', // [[VERIFY]]
  getPreApproved: env.VITE_SONAR_PRE_APPROVAL_URL || 'https://sonar-placeholder.example/get-pre-approved', // [[VERIFY]]
};

// Scheduling and review links are hidden until confirmed (see isVerified()).
export const SCHEDULING_URL = env.VITE_SCHEDULING_URL || '[[VERIFY: scheduling link]]';
export const REVIEWS_URL = env.VITE_REVIEWS_URL || '[[VERIFY: reviews link, do not use until approved]]';

export const UTM = {
  source: 'website',
  medium: 'cta',
  campaign: 'nv-lead-gen',
};

export const CTAS = {
  checkPricing: { key: 'checkPricing', label: 'Check Pricing', utmContent: 'check-pricing' },
  startApplication: { key: 'startApplication', label: 'Start Application', utmContent: 'start-application' },
  getPreApproved: { key: 'getPreApproved', label: 'Get Pre-Approved', utmContent: 'get-pre-approved' },
};

export const SERVICE_CITIES = [
  { name: 'Las Vegas', slug: 'las-vegas', county: 'Clark County' },
  { name: 'Henderson', slug: 'henderson', county: 'Clark County' },
  { name: 'Reno', slug: 'reno', county: 'Washoe County' },
  { name: 'Sparks', slug: 'sparks', county: 'Washoe County' },
];

export const FOOTER_DISCLOSURE = 'Not a commitment to lend. Subject to underwriting approval.';
export const EHO_STATEMENT = 'Equal Housing Opportunity';
export const DRAFT_BANNER_TEXT = 'DRAFT, pending company compliance approval';
