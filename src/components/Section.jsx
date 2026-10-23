import { Link } from 'react-router-dom';
import Verify from './Verify';
import CtaButtons from './CtaButtons';
import LeadForm from './LeadForm';
import {
  OFFICER, LICENSED_STATES, LICENSED_STATES_VERIFIED,
} from '../config/site';
import { ctaUrl } from '../lib/cta';

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
export const PinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PROGRAM_ICONS = {
  'va-loans': 'M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z M9 12l2 2 4-4',
  'fha-loans': 'M3 11l9-8 9 8 M5 10v10h14V10 M10 20v-6h4v6',
  'conventional-loans': 'M7 3h8l4 4v14H7Z M15 3v4h4 M10 12h6 M10 16h6',
  'jumbo-loans': 'M12 3l9 5-9 5-9-5 9-5Z M3 13l9 5 9-5 M3 17.5l9 5 9-5',
  'non-qm-loans': 'M4 7h10 M18 7h2 M4 17h2 M10 17h10 M14 5v4 M6 15v4',
  'dscr-investor-loans': 'M4 20V10 M10 20V4 M16 20v-8 M22 20H2',
  'refinance': 'M21 12a9 9 0 0 1-15.5 6.2 M3 12a9 9 0 0 1 15.5-6.2 M18 2v4h-4 M6 22v-4h4',
  'first-time-buyer': 'M21 2l-9.6 9.6 M15.5 7.5l3 3 M7.5 10.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z',
};

// One program card style used everywhere: gold line icon, title, note, "Learn more" + arrow, hover lift.
export function ProgramCard({ slug, name, note }) {
  const d = PROGRAM_ICONS[slug] || PROGRAM_ICONS['fha-loans'];
  return (
    <Link to={`/loan-programs/${slug}`} className="card-link card h-full">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C6A76F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
      <span className="font-garamond text-[1.35rem] block mt-3" style={{ color: '#1A3E61' }}>{name}</span>
      {note && <span className="text-[15px] block mt-2">{note}</span>}
      <span className="text-[15px] font-extrabold block mt-3" style={{ color: '#8a6c2f' }}>
        Learn more <span className="arrow" aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

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
              <Link to={it.to} className="link-inline inline-flex items-center min-h-[44px]" style={{ color: "#E6CF9D" }}>{it.label}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function HeroPortrait() {
  return (
    <figure className="relative mx-auto lg:mx-0 flex flex-col items-center" style={{ margin: 0 }}>
      {/* soft gold glow behind the photo */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: '-18%',
          background: 'radial-gradient(circle at 50% 45%, rgba(198,167,111,0.42) 0%, rgba(198,167,111,0.14) 42%, transparent 70%)',
        }}
      />
      <img
        src={OFFICER.photo}
        alt={`${OFFICER.name}, ${OFFICER.title}`}
        width="320"
        height="320"
        className="relative rounded-full object-cover w-[200px] h-[200px] lg:w-[320px] lg:h-[320px]"
        style={{
          objectPosition: 'center 18%',
          border: '2px solid #C6A76F',
          padding: 5,
          background: 'rgba(15,28,46,0.9)',
          boxShadow: '0 24px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(198,167,111,0.25)',
        }}
      />
      <figcaption className="relative mt-4 text-center text-[15px]" style={{ color: '#E3EAF2' }}>
        <span className="block font-extrabold text-white">{OFFICER.name}, {OFFICER.title}</span>
        <span className="block" style={{ color: '#E6CF9D' }}>NMLS #{OFFICER.nmls}</span>
      </figcaption>
    </figure>
  );
}

export function Hero({ eyebrow, h1, lead, page, crumbs, photo = false, children }) {
  return (
    <section className="hero-bg overflow-hidden">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className={photo ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 items-center' : ''}>
          <div>
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
          </div>
          {photo && <HeroPortrait />}
        </div>
      </Container>
    </section>
  );
}

// Slim trust strip: only values from site.js
export function TrustStrip() {
  return (
    <div className="section-white" style={{ borderBottom: '1px solid #E4D6BA' }}>
      <Container className="py-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
        <span className="flex items-center gap-2"><ShieldIcon /> <span className="font-bold">NMLS #{OFFICER.nmls}</span></span>
        <span className="flex items-center gap-2">
          <PinIcon />
          <span>
            Licensed in: {LICENSED_STATES.join(', ')}
            {!LICENSED_STATES_VERIFIED && <> <Verify>confirm licensed states with SunnyHill Financial</Verify></>}
          </span>
        </span>
        <a href={OFFICER.phoneHref} className="flex items-center gap-2 font-bold min-h-[44px]" style={{ color: '#1A3E61' }}>
          <PhoneIcon /> {OFFICER.phoneDisplay}
        </a>
      </Container>
    </div>
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
            <ProgramCard slug={l.to.split('/').pop()} name={l.label} note={l.note} />
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

// Dark navy band before the footer. Existing copy only: "Talk with Nick", "Call directly at ...".
export function TalkBand() {
  return (
    <section className="surface-talk" aria-labelledby="talk-band-title" style={{ background: '#0F1C2E' }}>
      <Container className="py-12 sm:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 id="talk-band-title" className="text-white">Talk with Nick</h2>
          <p className="mt-2 text-base lg:text-lg" style={{ color: '#E3EAF2' }}>
            Call directly at{' '}
            <a href={OFFICER.phoneHref} className="link-inline font-bold" style={{ color: '#E6CF9D' }}>{OFFICER.phoneDisplay}</a>.
          </p>
        </div>
        <a href={ctaUrl('getPreApproved', 'talk-band')} target="_blank" rel="noopener noreferrer" className="btn btn-gold self-start md:self-auto">
          Get Pre-Approved
        </a>
      </Container>
    </section>
  );
}
