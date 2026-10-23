import { useState } from 'react';
import { OFFICER, COMPANY } from '../config/site';

const GOALS = [
  'Buy a home',
  'Refinance my home',
  'Buy an investment property',
  'Not sure yet',
];

const CONSENT_TEXT =
  `I agree that ${OFFICER.name} of ${COMPANY.name} may contact me by phone, text, or email about my inquiry, ` +
  'including with automated technology. Consent is not a condition of any purchase or loan. Message and data rates may apply.';

const SSN_LIKE = /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/;

export default function LeadForm({ page = 'home', heading = 'Talk with Nick', id = 'lead-form' }) {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [demo, setDemo] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.consent = form.elements.consent.checked;

    const next = {};
    if (!data.name || data.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^\+?[\d\s().-]{10,}$/.test(data.phone || '')) next.phone = 'Please enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) next.email = 'Please enter a valid email address.';
    if (!data.location || data.location.trim().length < 2) next.location = 'Please enter a ZIP code or city.';
    if (!data.goal) next.goal = 'Please choose a goal.';
    if (SSN_LIKE.test(`${data.note} ${data.location}`)) next.note = 'Please do not include a Social Security number or other sensitive numbers.';
    if (!data.consent) next.consent = 'Please check the box to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    setMessage('');
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
      if (params.get(k)) utm[k] = params.get(k);
    });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          page,
          pageUrl: window.location.href.split('#')[0],
          utm,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setDemo(Boolean(json.demo));
      setStatus('done');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(
        `${err.message || 'Something went wrong.'} You can also call ${OFFICER.name} directly at ${OFFICER.phoneDisplay}.`
      );
    }
  };

  const err = (k) => (errors[k] ? <p id={`${id}-${k}-err`} role="alert" className="text-[14px] mt-1" style={{ color: '#9b2c2c' }}>{errors[k]}</p> : null);
  const inv = (k) => ({ 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined });

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="card"
      style={{ padding: 'clamp(20px, 4vw, 32px)' }}
    >
      <h2 id={`${id}-title`} className="font-garamond text-[1.9rem]" style={{ color: '#1A3E61' }}>{heading}</h2>
      <p className="text-[15px] mt-2 mb-5" style={{ color: '#355577' }}>
        Send a short message and Nick will follow up. Please do not include your Social Security number, credit card
        numbers, or other sensitive details. This is not a loan application.
      </p>

      {status === 'done' ? (
        <div role="status" className="rounded-xl p-5" style={{ background: '#F0E6D2', color: '#0F1C2E' }}>
          {demo ? (
            <p className="font-extrabold">Demo mode. Nothing was sent.</p>
          ) : (
            <>
              <p className="font-extrabold">Thanks, your message was sent.</p>
              <p className="text-[15px] mt-1">
                {OFFICER.name} will follow up. This message is not a loan application or a commitment to lend.
              </p>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          {/* Honeypot: real people never see or fill this */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <div>
            <label className="field-label" htmlFor={`${id}-name`}>Full name</label>
            <input id={`${id}-name`} name="name" type="text" autoComplete="name" className="field" {...inv('name')} />
            {err('name')}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor={`${id}-phone`}>Phone</label>
              <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" {...inv('phone')} />
              {err('phone')}
            </div>
            <div>
              <label className="field-label" htmlFor={`${id}-email`}>Email</label>
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" className="field" {...inv('email')} />
              {err('email')}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor={`${id}-location`}>ZIP code or city</label>
              <input id={`${id}-location`} name="location" type="text" autoComplete="postal-code" className="field" {...inv('location')} />
              {err('location')}
            </div>
            <div>
              <label className="field-label" htmlFor={`${id}-goal`}>Your goal</label>
              <select id={`${id}-goal`} name="goal" defaultValue="" className="field" {...inv('goal')}>
                <option value="" disabled>Select one</option>
                {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {err('goal')}
            </div>
          </div>
          <div>
            <label className="field-label" htmlFor={`${id}-note`}>Anything else? (optional)</label>
            <textarea id={`${id}-note`} name="note" rows={3} maxLength={1000} className="field" {...inv('note')} />
            {err('note')}
          </div>
          <div>
            <label className="flex gap-3 items-start text-[14px] leading-relaxed cursor-pointer" style={{ color: '#26405c' }}>
              <input type="checkbox" name="consent" className="mt-1 w-6 h-6 flex-shrink-0" style={{ accentColor: '#1A3E61' }} {...inv('consent')} />
              <span>{CONSENT_TEXT}</span>
            </label>
            {err('consent')}
          </div>

          {status === 'error' && (
            <p role="alert" className="text-[14px] font-bold" style={{ color: '#9b2c2c' }}>{message}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn btn-gold justify-self-start"
            style={{ opacity: status === 'sending' ? 0.7 : 1 }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </section>
  );
}
