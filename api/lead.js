// POST /api/lead: validates a short lead form and forwards it to Follow Up Boss.
// Runs as a Vercel serverless function (and through the Vite dev/preview plugin).
//
// Environment variables (never commit values):
//   FUB_API_KEY      required. Follow Up Boss API key.
//   FUB_SYSTEM       optional. X-System header (default "SunnyHill-NV-Website").
//   FUB_SYSTEM_KEY   optional. X-System-Key header, if FUB issued one.
//   FUB_SOURCE       optional. Lead source label (default "Website - Nick Flores Sr.").
//   ALLOWED_ORIGIN   optional. If set, requests with a different Origin are rejected.

const GOALS = ['Buy a home', 'Refinance my home', 'Buy an investment property', 'Not sure yet'];
const SSN_LIKE = /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/;
const SENSITIVE_WORDS = /\b(ssn|social security|card number|routing number|account number)\b/i;
const FUB_URL = 'https://api.followupboss.com/v1/events';

// Best-effort per-instance rate limit (serverless instances are not shared).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > MAX_HITS;
}

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 20_000) throw new Error('too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export function validate(input) {
  const name = clean(input.name, 100);
  const email = clean(input.email, 150);
  const phone = clean(input.phone, 30);
  const location = clean(input.location, 80);
  const goal = clean(input.goal, 60);
  const note = String(input.note ?? '').replace(/\r/g, '').trim().slice(0, 1000);

  if (name.length < 2) return { error: 'Please enter your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email address.' };
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return { error: 'Please enter a valid phone number.' };
  if (location.length < 2) return { error: 'Please enter a ZIP code or city.' };
  if (!GOALS.includes(goal)) return { error: 'Please choose a goal.' };
  if (input.consent !== true) return { error: 'Consent is required.' };

  // Never accept SSNs or similar sensitive data.
  if ([name, location, note].some((t) => SSN_LIKE.test(t) || SENSITIVE_WORDS.test(t))) {
    return { error: 'Please do not include Social Security numbers or financial account details.' };
  }
  return { value: { name, email, phone, digits, location, goal, note } };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed && req.headers.origin && req.headers.origin !== allowed) {
    return send(res, 403, { error: 'Forbidden.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return send(res, 429, { error: 'Too many requests. Please try again later.' });

  let input;
  try {
    input = await readBody(req);
  } catch {
    return send(res, 400, { error: 'Invalid request.' });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (input.website) return send(res, 200, { ok: true });

  const { value, error } = validate(input);
  if (error) return send(res, 400, { error });

  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) {
    console.error('lead: FUB_API_KEY is not set');
    return send(res, 503, { error: 'Lead capture is not configured yet.' });
  }

  const [firstName, ...rest] = value.name.split(/\s+/);
  const utm = input.utm && typeof input.utm === 'object' ? input.utm : {};
  const source = process.env.FUB_SOURCE || 'Website - Nick Flores Sr.';
  const message = [
    `Goal: ${value.goal}`,
    `ZIP or city: ${value.location}`,
    value.note ? `Note: ${value.note}` : null,
    'Consent to be contacted: yes',
    `Submitted from: ${clean(input.page, 80) || 'unknown'}`,
  ].filter(Boolean).join('\n');

  const payload = {
    source,
    system: process.env.FUB_SYSTEM || 'SunnyHill-NV-Website',
    type: 'Registration',
    message,
    pageUrl: clean(input.pageUrl, 300),
    person: {
      firstName,
      lastName: rest.join(' ') || undefined,
      emails: [{ value: value.email }],
      phones: [{ value: value.phone }],
      tags: ['Website Lead', value.goal],
    },
    campaign: {
      source: clean(utm.utm_source, 100) || undefined,
      medium: clean(utm.utm_medium, 100) || undefined,
      campaign: clean(utm.utm_campaign, 100) || undefined,
      term: clean(utm.utm_term, 100) || undefined,
      content: clean(utm.utm_content, 100) || undefined,
    },
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    'X-System': payload.system,
  };
  if (process.env.FUB_SYSTEM_KEY) headers['X-System-Key'] = process.env.FUB_SYSTEM_KEY;

  try {
    const r = await fetch(FUB_URL, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!r.ok) {
      // Log status only. Never log the payload (personal data) or the key.
      console.error(`lead: Follow Up Boss responded ${r.status}`);
      return send(res, 502, { error: 'We could not send your message right now.' });
    }
    return send(res, 200, { ok: true });
  } catch {
    console.error('lead: request to Follow Up Boss failed');
    return send(res, 502, { error: 'We could not send your message right now.' });
  }
}
