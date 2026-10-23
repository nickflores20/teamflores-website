import { Link } from 'react-router-dom';
import Verify from './Verify';
import CtaButtons from './CtaButtons';
import LeadForm from './LeadForm';
import { OFFICER } from '../config/site';

export const Container = ({ children, className = '' }) => (
  <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Inline SVG icons (gold), decorative
export const PhoneIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
export const ShieldIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" />
  </svg>
);
const Chevron = () => (
  <svg className="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-[15px]" style={{ color: '#C9D5E2' }}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" style={{ color: '#C6A76F' }}>/</span>}
            {it.to ? (
              <Link to={it.to} className="link-inline" style={{ color: '#E6CF9D' }}>{it.label}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Hero({ eyebrow, h1, lead, page, crumbs, children }) {
  return (
    <section className="hero-bg">
      <Container className="py-10 sm:py-14 lg:py-16">
        {crumbs && <Breadcrumb items={crumbs} />}
        {eyebrow && (
          <p className="text-[14px] font-extrabold uppercase tracking-[0.14em] mb-3" style={{ color: '#E6CF9D' }}>{eyebrow}</p>
        )}
        <h1 className="text-white max-w-3xl">{h1}</h1>
        <p className="mt-4 text-base lg:text-lg max-w-2xl" style={{ color: '#E3EAF2', textWrap: 'pretty' }}>{lead}</p>
        <CtaButtons page={page} className="mt-6" />
        <p className="mt-5 flex items-center gap-2 text-base" style={{ color: '#E3EAF2' }}>
          <PhoneIcon />
          <span>
            Or call {OFFICER.name} directly:{' '}
            <a href={OFFICER.phoneHref} className="link-inline font-bold" style={{ color: '#E6CF9D' }}>{OFFICER.phoneDisplay}</a>
          </span>
        </p>
        {children}
      </Container>
    </section>
  );
}

// Alternating section: tone = 'white' | 'sand'
export function Section({ tone = 'white', children, className = '' }) {
  return (
    <section className={tone === 'sand' ? 'section-sand' : 'section-white'}>
      <Container className={`py-12 sm:py-16 lg:py-20 ${className}`}>{children}</Container>
    </section>
  );
}
export const SandSection = ({ children }) => <Section tone="sand">{children}</Section>;

export function FaqList({ items }) {
  return (
    <div className="grid gap-3 max-w-[720px]">
      {items.map((f) => (
        <details key={f.q} className="faq">
          <summary>
            <span>{f.q}</span>
            <Chevron />
          </summary>
          <div className="faq-body"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  );
}

export function GuidelinesCard({ items, heading = 'Current program guidelines' }) {
  return (
    <aside className="card" aria-label={heading}>
      <h2 className="font-garamond text-[1.6rem]" style={{ color: '#1A3E61' }}>{heading}</h2>
      <p className="text-[15px] mt-2 mb-4" style={{ color: '#355577' }}>
        Guidelines, limits, and eligibility change. We do not publish them here until SunnyHill Financial confirms the
        current details.
      </p>
      <ul className="grid gap-3">
        {items.map((it) => (
          <li key={it}><Verify>{it}</Verify></li>
        ))}
      </ul>
    </aside>
  );
}

export function RelatedLinks({ links, heading }) {
  return (
    <div>
      <h2 className="mb-6" style={{ color: '#1A3E61' }}>{heading}</h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="card-link card h-full">
              <span className="font-garamond text-[1.35rem] block" style={{ color: '#1A3E61' }}>{l.label}</span>
              {l.note && <span className="text-[15px] block mt-2">{l.note}</span>}
              <span className="text-[15px] font-extrabold block mt-3" style={{ color: '#8a6c2f' }}>Learn more →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LeadBand({ page, heading }) {
  return (
    <section className="section-navy">
      <Container className="py-12 sm:py-16 lg:py-20 grid gap-10 lg:grid-cols-5 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-white">{heading || 'Ready to talk through your options?'}</h2>
          <p className="mt-4 text-base lg:text-lg" style={{ color: '#E3EAF2' }}>
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
