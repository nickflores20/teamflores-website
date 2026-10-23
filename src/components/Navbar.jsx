import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OFFICER, BRAND_NAME } from '../config/site';
import { PROGRAMS } from '../content/programs';
import { CITIES } from '../content/cities';
import { ctaUrl } from '../lib/cta';

function Dropdown({ label, items }) {
  return (
    <div className="relative group">
      <button type="button" className="nav-link flex items-center gap-1" aria-haspopup="true">
        {label}
        <span aria-hidden="true" className="text-[14px]">▾</span>
      </button>
      <div className="absolute left-0 top-full pt-2 min-w-[250px] hidden group-hover:block group-focus-within:block">
        <ul
          className="rounded-xl py-2"
          style={{
            background: '#0F1C2E',
            border: '1px solid rgba(198,167,111,0.3)',
            boxShadow: '0 20px 50px -12px rgba(0,0,0,0.6), 0 0 30px -10px rgba(198,167,111,0.25)',
          }}
        >
          {items.map((it) => (
            <li key={it.to}>
              <Link to={it.to} className="nav-link flex w-full px-4" style={{ fontWeight: 600 }}>
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const programs = PROGRAMS.map((p) => ({ to: `/loan-programs/${p.slug}`, label: p.name }));
  const cities = CITIES.map((c) => ({ to: `/nevada/${c.slug}`, label: `${c.name}, NV` }));
  const close = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(26,62,97,0.97)',
        borderBottom: '1px solid rgba(198,167,111,0.3)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20" aria-label="Main">
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 min-h-[48px]" aria-label={`${BRAND_NAME} home`} onClick={close}>
          <img src="/brand_assets/logo-icon-transparent.png" alt="" width="52" height="42" style={{ height: 42, width: 'auto' }} />
          <span className="leading-tight">
            <span className="block font-garamond text-white text-[1.15rem] sm:text-[1.3rem]" style={{ fontWeight: 600 }}>
              SunnyHill Financial
            </span>
            <span className="block text-[14px] tracking-[0.06em] uppercase" style={{ color: '#E6CF9D' }}>
              Nick Flores Sr.
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <Dropdown label="Loan Programs" items={programs} />
          <Dropdown label="Locations" items={cities} />
          <Link to="/mortgage-calculator" className="nav-link">Calculator</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          <a href={OFFICER.phoneHref} className="hidden xl:inline-flex nav-link">{OFFICER.phoneDisplay}</a>
          <a
            href={ctaUrl('getPreApproved', 'nav')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold hidden lg:inline-flex"
          >
            Get Pre-Approved
          </a>
          <button
            type="button"
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg"
            style={{ color: '#C6A76F', border: '1px solid rgba(198,167,111,0.4)' }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden max-h-[80vh] overflow-y-auto px-5 pb-6 pt-2"
          style={{ background: 'rgba(15,28,46,0.98)', borderTop: '1px solid rgba(198,167,111,0.25)' }}
        >
          <p className="text-[14px] uppercase tracking-[0.1em] mt-3 mb-1" style={{ color: '#E6CF9D' }}>Loan Programs</p>
          <ul>{programs.map((it) => <li key={it.to}><Link to={it.to} onClick={close} className="nav-link w-full">{it.label}</Link></li>)}</ul>
          <p className="text-[14px] uppercase tracking-[0.1em] mt-4 mb-1" style={{ color: '#E6CF9D' }}>Locations</p>
          <ul>{cities.map((it) => <li key={it.to}><Link to={it.to} onClick={close} className="nav-link w-full">{it.label}</Link></li>)}</ul>
          <div className="mt-4 flex flex-col">
            <Link to="/mortgage-calculator" onClick={close} className="nav-link">Calculator</Link>
            <Link to="/about" onClick={close} className="nav-link">About</Link>
            <Link to="/contact" onClick={close} className="nav-link">Contact</Link>
            <a href={OFFICER.phoneHref} className="nav-link">Call {OFFICER.phoneDisplay}</a>
          </div>
          <a href={ctaUrl('getPreApproved', 'nav-mobile')} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full mt-4">
            Get Pre-Approved
          </a>
        </div>
      )}
    </header>
  );
}
