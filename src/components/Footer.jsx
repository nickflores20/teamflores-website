import { Link } from 'react-router-dom';
import {
  OFFICER, COMPANY, LICENSED_STATES, LICENSED_STATES_VERIFIED,
  FOOTER_DISCLOSURE, EHO_STATEMENT,
} from '../config/site';
import { PROGRAMS } from '../content/programs';
import { CITIES } from '../content/cities';
import Verify from './Verify';

const EqualHousingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true" className="inline-block mr-1.5 align-text-bottom">
    <path d="M12 2.5 2 11h2.5v9.5h15V11H22L12 2.5Zm-5 9h10v1.8H7V11.5Zm0 3.4h10v1.8H7v-1.8Z" />
  </svg>
);

const heading = { color: '#E6CF9D' };

export default function Footer() {
  return (
    <footer className="section-navy relative" style={{ borderTop: '1px solid rgba(198,167,111,0.3)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-garamond text-[1.7rem]" style={{ color: '#C6A76F', lineHeight: 1.1 }}>{OFFICER.name}</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{OFFICER.title}, {COMPANY.name}</p>
            <p className="text-sm" style={{ color: '#F0E6D2' }}>NMLS #{OFFICER.nmls}</p>
            <p className="text-sm mt-2" style={{ color: '#F0E6D2' }}>
              {COMPANY.name} NMLS #: <Verify>company NMLS #</Verify>
            </p>
            <a href={OFFICER.phoneHref} className="foot-link inline-block mt-3 font-extrabold text-white" style={{ fontSize: 16 }}>
              {OFFICER.phoneDisplay}
            </a>
          </div>

          <nav aria-label="Loan programs">
            <p className="text-[14px] uppercase tracking-[0.1em] mb-3" style={heading}>Loan Programs</p>
            <ul className="space-y-0">
              {PROGRAMS.map((p) => (
                <li key={p.slug}><Link className="foot-link" to={`/loan-programs/${p.slug}`}>{p.name}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Nevada locations">
            <p className="text-[14px] uppercase tracking-[0.1em] mb-3" style={heading}>Nevada Locations</p>
            <ul className="space-y-0">
              {CITIES.map((c) => (
                <li key={c.slug}><Link className="foot-link" to={`/nevada/${c.slug}`}>{c.name}, NV</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <p className="text-[14px] uppercase tracking-[0.1em] mb-3" style={heading}>Resources</p>
            <ul className="space-y-0">
              <li><Link className="foot-link" to="/about">About Nick</Link></li>
              <li><Link className="foot-link" to="/contact">Contact</Link></li>
              <li><Link className="foot-link" to="/mortgage-calculator">Mortgage Calculator</Link></li>
              <li><Link className="foot-link" to="/privacy-disclosures">Privacy and Disclosures</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 space-y-3" style={{ borderTop: '1px solid rgba(198,167,111,0.2)' }}>
          <p className="text-sm" style={{ color: '#F0E6D2' }}>
            Licensed in: {LICENSED_STATES.join(', ')}
            {!LICENSED_STATES_VERIFIED && <> <Verify>confirm licensed states with SunnyHill Financial</Verify></>}
          </p>
          <p className="text-sm font-bold" style={{ color: '#C6A76F' }}>
            <EqualHousingIcon />
            {EHO_STATEMENT}
          </p>
          <p className="text-sm font-bold text-white">{FOOTER_DISCLOSURE}</p>
          <p className="text-sm" style={{ color: 'rgba(240,230,210,0.9)' }}>
            Information on this site is general and educational. It is not legal, tax, or financial advice, and it is not an
            offer or commitment to lend. Loan programs, availability, and guidelines are subject to change. Consumer
            information:{' '}
            <a className="link-inline" href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer">
              NMLS Consumer Access
            </a>.
          </p>
          <p className="text-sm" style={{ color: 'rgba(240,230,210,0.8)' }}>
            © 2026 {OFFICER.name} | {COMPANY.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
