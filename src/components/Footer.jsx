// FILE: src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function RevealSection({ children, className, delay = 0 }) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const EqualHousingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 inline-block mr-1.5 align-text-bottom"
    aria-hidden="true"
  >
    <path d="M10.707 2.293a1 1 0 0 1 1.414 0l9 9A1 1 0 0 1 20 13h-1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7H4a1 1 0 0 1-.707-1.707l9-9ZM9 21h2v-4h2v4h2v-6H9v6Zm-2 0v-7h10v7h1v-8.586l-8-8-8 8V21h5Z" />
    <path d="M8 10h8v1.5H8V10Zm0 2.5h8V14H8v-1.5Z" />
  </svg>
);

const col1Links = [
  { label: 'Home', to: '/' },
  { label: 'About Nick', to: '/about' },
  { label: 'Apply Now', to: '/apply' },
];
const col2Links = [
  { label: 'Loan Types', to: '/loan-types' },
  { label: 'Price Your Loan', to: '/price-your-loan' },
  { label: 'Learning Center', to: '/learning-center' },
];
const col3Links = [
  { label: 'States We Lend', to: '/states' },
  { label: 'Get Free Quote', to: '/apply' },
];

const licensedStates = ['AL','AZ','CA','CO','DC','FL','GA','ID','IL','IA','MD','MI','MN','NV','NC','OH','OR','PA','TN','TX','UT','VA','WA','WI'];

const licenseText = `AZ #0951179 | CA DRE #02058287 | CA DFPI #60DBO99712 | CO | DC #MLB1708856 | FL #MLD2608 | GA #1708856 | ID #MBL-2081708856 | IL #MB.6850225 | IA #2023-0138 | MD #1708856 | MI #FL0022770/SR0024602 | MN #MN-MO-1708856 | NV #5570 | NC #B-190746 | OH #RM.804604.000 | OR | PA #76238 | TX | UT #10993905 | VA #MC-8002 | WA #CL-1708856 | Company NMLS #1708856`;

const complianceText = `Variable APR ranging from 5.00%–9.00% (SOFR + 1.50% margin). Rate subject to change. Not a commitment to lend. Minimum FICO 650 required. Not all applicants will qualify. NMLS #422150 | AZ #LO-2013475 | NV #23814 | FL #LO58864 | CA-DBO #422150 | Company NMLS #1708856 Sunnyhill Financial Inc.`;

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A3E61] pt-16 pb-6 relative overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A76F]/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Logo */}
        <RevealSection className="flex justify-center">
          <Link to="/" aria-label="Team Flores home" className="inline-flex flex-col items-center gap-3 group">
            <img
              src="/brand_assets/logo-icon-transparent.png"
              alt="Team Flores"
              style={{
                width: 'min(280px, 70vw)',
                height: 'auto',
                filter: 'drop-shadow(0 0 20px rgba(198,167,111,0.45)) drop-shadow(0 0 6px rgba(198,167,111,0.2))',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'drop-shadow(0 0 32px rgba(198,167,111,0.7)) drop-shadow(0 0 10px rgba(198,167,111,0.35))'}
              onMouseLeave={e => e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(198,167,111,0.45)) drop-shadow(0 0 6px rgba(198,167,111,0.2))'}
            />
            <div className="text-center">
              <p style={{ fontFamily: "'EB Garamond', serif", color: '#C6A76F', fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                Team Flores
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(198,167,111,0.6)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
                Division Director · Sunnyhill Financial
              </p>
            </div>
          </Link>
        </RevealSection>

        {/* Quick links — 3 columns */}
        <RevealSection delay={0.05}>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-x-8 gap-y-2 max-w-lg mx-auto">
            {[col1Links, col2Links, col3Links].map((col, ci) => (
              <ul key={ci} className="space-y-2">
                {col.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[#C6A76F] font-nunito text-base font-semibold hover:text-[#d4b87a] hover:underline underline-offset-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A76F] rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </RevealSection>

        {/* Divider */}
        <RevealSection delay={0.08}>
          <div className="h-px bg-gradient-to-r from-transparent via-[#C6A76F]/30 to-transparent" />
        </RevealSection>

        {/* Licensed States */}
        <RevealSection delay={0.1} className="text-center">
          <p className="text-[#C6A76F] font-nunito text-xs font-semibold tracking-widest uppercase mb-2">
            Licensed in
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {licensedStates.map((state) => (
              <span
                key={state}
                className="text-[#C6A76F] font-nunito text-xs bg-[#C6A76F]/10 border border-[#C6A76F]/25 px-2 py-0.5 rounded"
              >
                {state}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* License numbers */}
        <RevealSection delay={0.12} className="text-center">
          <p className="text-[#C6A76F]/70 font-nunito text-[11px] leading-relaxed max-w-4xl mx-auto">
            {licenseText}
          </p>
        </RevealSection>

        {/* Equal Housing + Addresses + Contact */}
        <RevealSection delay={0.14}>
          <div className="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
            {/* Equal Housing */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="text-[#C6A76F] font-nunito text-sm font-semibold flex items-center">
                <EqualHousingIcon />
                Equal Housing Opportunity
              </div>
            </div>

            {/* Addresses */}
            <div className="space-y-3">
              <div>
                <p className="text-white/80 font-nunito text-xs leading-relaxed">
                  871 Coronado Center Drive Suite 200, Office #230<br />
                  Henderson, NV
                </p>
              </div>
              <div>
                <p className="text-white/80 font-nunito text-xs leading-relaxed">
                  600 California St Suite 12-032<br />
                  San Francisco, CA 94108
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center sm:items-end gap-2">
              <a
                href="tel:7024976370"
                className="text-[#C6A76F] font-nunito text-base font-semibold hover:text-[#d4b87a] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A76F] rounded"
              >
                (702) 497-6370
              </a>
              <a
                href="mailto:Nick@sunnyhillfinancial.com"
                className="text-[#C6A76F] font-nunito text-base hover:text-[#d4b87a] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A76F] rounded break-all"
              >
                Nick@sunnyhillfinancial.com
              </a>
            </div>
          </div>
        </RevealSection>

        {/* Divider */}
        <div className="h-px bg-[#C6A76F]/15" />

        {/* Compliance Disclosure */}
        <RevealSection delay={0.16} className="text-center">
          <p className="text-gray-400 font-nunito text-[10px] leading-relaxed max-w-4xl mx-auto">
            {complianceText}
          </p>
        </RevealSection>

        {/* Copyright */}
        <RevealSection delay={0.18} className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-white/60 font-nunito text-xs text-center sm:text-left">
            © 2026 Team Flores | Sunnyhill Financial
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-[#C6A76F] font-nunito text-xs hover:text-[#d4b87a] underline underline-offset-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A76F] rounded"
            >
              Privacy Policy
            </Link>
            <span className="text-white/30 text-xs">|</span>
            <Link
              to="/terms"
              className="text-[#C6A76F] font-nunito text-xs hover:text-[#d4b87a] underline underline-offset-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A76F] rounded"
            >
              Terms of Use
            </Link>
          </div>
        </RevealSection>

      </div>
    </footer>
  );
}
