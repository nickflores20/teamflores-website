import { Link } from 'react-router-dom';
import Verify from './Verify';
import CtaButtons from './CtaButtons';
import LeadForm from './LeadForm';
import { OFFICER } from '../config/site';

export const Container = ({ children, className = '' }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export function Hero({ eyebrow, h1, lead, page, children }) {
  return (
    <section className="hero-bg grain-overlay">
      <Container className="relative z-[2] py-16 sm:py-24">
        {eyebrow && (
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] mb-4" style={{ color: '#C6A76F' }}>{eyebrow}</p>
        )}
        <h1 className="text-white text-[clamp(2.2rem,5.5vw,4rem)] max-w-3xl">{h1}</h1>
        <p className="mt-5 text-[1.05rem] sm:text-lg max-w-2xl" style={{ color: '#D5DEE8' }}>{lead}</p>
        <CtaButtons page={page} className="mt-8" />
        <p className="mt-4 text-sm" style={{ color: '#B9C6D4' }}>
          Or call {OFFICER.name} directly:{' '}
          <a href={OFFICER.phoneHref} className="link-inline font-bold">{OFFICER.phoneDisplay}</a>
        </p>
        {children}
      </Container>
    </section>
  );
}

// Light content section on sand
export function SandSection({ children, className = '' }) {
  return (
    <section className={`surface-sand ${className}`}>
      <Container className="py-14 sm:py-20">{children}</Container>
    </section>
  );
}

export function FaqList({ items, dark = false }) {
  return (
    <div className="grid gap-4">
      {items.map((f) => (
        <details key={f.q} className={dark ? 'card-dark' : 'card'} style={{ padding: '18px 22px' }}>
          <summary className="cursor-pointer font-extrabold text-[1.02rem] list-none flex justify-between gap-4" style={{ outlineOffset: 4 }}>
            <span>{f.q}</span>
            <span aria-hidden="true" style={{ color: '#C6A76F' }}>+</span>
          </summary>
          <p className="mt-3">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function GuidelinesCard({ items, heading = 'Current program guidelines' }) {
  return (
    <aside className="card" aria-label={heading}>
      <h2 className="font-garamond text-[1.6rem]" style={{ color: '#1A3E61' }}>{heading}</h2>
      <p className="text-[14px] mt-1 mb-4" style={{ color: '#355577' }}>
        Guidelines, limits, and eligibility change. We do not publish them here until SunnyHill Financial confirms the
        current details.
      </p>
      <ul className="grid gap-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 items-start">
            <span aria-hidden="true" style={{ color: '#C6A76F', fontWeight: 800 }}>•</span>
            <span><Verify>{it}</Verify></span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function RelatedLinks({ links, heading }) {
  return (
    <div>
      <h2 className="text-white text-[1.9rem] mb-5">{heading}</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="card-link card-dark h-full">
              <span className="font-garamond text-[1.3rem] text-white block">{l.label}</span>
              {l.note && <span className="text-sm block mt-1" style={{ color: '#C7D3DF' }}>{l.note}</span>}
              <span className="text-sm font-bold block mt-3" style={{ color: '#C6A76F' }}>Learn more →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LeadBand({ page, heading }) {
  return (
    <section className="surface-base">
      <Container className="py-14 sm:py-20 grid gap-10 lg:grid-cols-5 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-white text-[clamp(1.8rem,3.5vw,2.6rem)]">{heading || 'Ready to talk through your options?'}</h2>
          <p className="mt-4" style={{ color: '#D5DEE8' }}>
            Check pricing, start an application, or send a quick message. Nick will respond to help you understand your options.
          </p>
          <CtaButtons page={page} className="mt-6" />
        </div>
        <div className="lg:col-span-3">
          <LeadForm page={page} />
        </div>
      </Container>
    </section>
  );
}
