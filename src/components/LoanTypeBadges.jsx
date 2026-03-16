// FILE: src/components/LoanTypeBadges.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOANS = [
  {
    title: 'VA Loans',
    description: 'Benefits for veterans and active military. 0% down, no PMI, competitive rates.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L3 8V14C3 19.55 7.84 24.74 14 26C20.16 24.74 25 19.55 25 14V8L14 2Z" stroke="#C6A76F" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M10 14L13 17L18 11" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Cash Out Refi',
    description: "Tap your home's equity. Consolidate debt or fund home improvements.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#C6A76F" strokeWidth="1.8" fill="none"/>
        <path d="M14 8V14L17.5 17.5" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 11H18" stroke="#C6A76F" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'Home Purchase',
    description: 'Find your perfect rate for your new home purchase. Fixed and ARM options.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 13L14 4L24 13V24H18V18H10V24H4V13Z" stroke="#C6A76F" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'First Time Buyers',
    description: 'Specialized programs, down payment assistance, and guided support.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" stroke="#C6A76F" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'New Builds',
    description: 'Construction-to-permanent financing and new build purchase loans.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="14" width="20" height="10" rx="1" stroke="#C6A76F" strokeWidth="1.8" fill="none"/>
        <path d="M4 14L14 5L24 14" stroke="#C6A76F" strokeWidth="1.8" strokeLinejoin="round"/>
        <rect x="11" y="18" width="6" height="6" stroke="#C6A76F" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Vacation Homes',
    description: 'Second home and investment property financing across 20+ states.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="11" r="5" stroke="#C6A76F" strokeWidth="1.8" fill="none"/>
        <path d="M14 16C9.03 16 5 18.24 5 21V24H23V21C23 18.24 18.97 16 14 16Z" stroke="#C6A76F" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Credit Rebuilds',
    description: 'Specialized programs for scores as low as 580. Nick helps you qualify.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 14C5 9.03 9.03 5 14 5" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M23 14C23 18.97 18.97 23 14 23" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 5L23 5L23 10" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 23L5 23L5 18" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14L13 17L18 11" stroke="#C6A76F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Reverse Mortgage',
    description: 'For homeowners 62+. Access equity without monthly mortgage payments.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#C6A76F" strokeWidth="1.8" fill="none"/>
        <path d="M10 14H18M15 11L18 14L15 17" stroke="#C6A76F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'EquitySelect HELOC',
    description: "Nick's specialty. Unlock dramatically more equity than a bank HELOC.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" stroke="#C6A76F" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z" fill="rgba(198,167,111,0.12)"/>
      </svg>
    ),
  },
];

function LoanCard({ loan, index }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          delay: index * 0.08,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{
          border: '1px solid #C6A76F',
          borderRadius: '1rem',
          padding: '1.5rem',
          cursor: 'pointer',
          outline: 'none',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: hovered ? '#C6A76F' : 'transparent',
          transition: 'background-color 0.2s',
        }}
      >
        <div style={{ marginBottom: '0.75rem' }}>
          {/* Re-color SVG on hover via CSS filter trick */}
          <div
            style={{
              filter: hovered ? 'brightness(0) saturate(100%)' : 'none',
              display: 'inline-block',
            }}
          >
            {loan.icon}
          </div>
        </div>
        <h3
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: hovered ? '#0F1C2E' : '#FFFFFF',
            marginBottom: '0.5rem',
            lineHeight: 1.2,
            transition: 'color 0.2s',
          }}
        >
          {loan.title}
        </h3>
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '0.82rem',
            color: hovered ? '#1A3E61' : '#D1D5DB',
            lineHeight: 1.6,
            transition: 'color 0.2s',
          }}
        >
          {loan.description}
        </p>

        {/* Learn more cue */}
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: hovered ? '#1A3E61' : '#C6A76F',
            marginTop: '1rem',
            letterSpacing: '0.06em',
            opacity: 0.75,
            transition: 'color 0.2s',
          }}
        >
          Learn more →
        </p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15,28,46,0.75)',
                zIndex: 50,
                cursor: 'pointer',
              }}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#0F1C2E',
                border: '1px solid #C6A76F',
                borderRadius: '1rem',
                padding: '2.5rem',
                maxWidth: '480px',
                width: 'calc(100% - 2rem)',
                zIndex: 51,
              }}
            >
              <div style={{ marginBottom: '1rem' }}>{loan.icon}</div>
              <h3
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '0.75rem',
                }}
              >
                {loan.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '0.95rem',
                  color: '#D1D5DB',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                {loan.description}
              </p>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  backgroundColor: '#C6A76F',
                  color: '#0F1C2E',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function LoanTypeBadges() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#1A3E61' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        {/* Headline */}
        <h2
          className="text-center mb-3"
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          Every Loan Type. One Trusted Name.
        </h2>
        <p
          className="text-center mb-12"
          style={{
            fontFamily: 'Nunito, sans-serif',
            color: '#FFFFFF',
            opacity: 0.55,
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          From first-time buyers to seasoned investors — Nick covers every scenario.
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
            gap: '1.25rem',
          }}
        >
          {LOANS.map((loan, i) => (
            <LoanCard key={loan.title} loan={loan} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
