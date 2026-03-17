// FILE: src/components/ContactSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactSection() {
  return (
    <section
      style={{
        background: '#0F1C2E',
        borderTop: '1px solid rgba(198,167,111,0.15)',
        borderBottom: '1px solid rgba(198,167,111,0.1)',
        padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(198,167,111,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        {/* Headline */}
        <h2 style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
        }}>
          Ready to Get Started?
        </h2>

        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '1rem',
          color: 'rgba(240,230,210,0.65)',
          marginBottom: '2rem',
        }}>
          Reach Nick directly:
        </p>

        {/* Contact row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <a
            href="tel:7024976370"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '1.15rem',
              color: '#C6A76F', textDecoration: 'none',
              transition: 'opacity 0.18s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.78'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5.6 2C5.2 2 4.8 2.2 4.5 2.5L3 4c-1 1-1 3 .5 5.5S7.5 14 9.5 15.5s4.5 1.5 5.5.5l1.5-1.5c.6-.6.6-1.5 0-2.1l-2-2c-.6-.6-1.5-.6-2.1 0L11.7 11c-1-.5-2-1.5-2.7-2.7l.6-.7c.6-.6.6-1.5 0-2.1l-2-2C7.3 3.2 7 3 6.6 3L5.6 2z" stroke="#C6A76F" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            </svg>
            (702) 497-6370
          </a>
          <a
            href="mailto:Nick@sunnyhillfinancial.com"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '1rem',
              color: '#C6A76F', textDecoration: 'none',
              transition: 'opacity 0.18s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.78'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="#C6A76F" strokeWidth="1.5" fill="none" />
              <path d="M2 7l8 5.5L18 7" stroke="#C6A76F" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Nick@sunnyhillfinancial.com
          </a>
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <a
            href="tel:7024976370"
            style={{
              display: 'inline-block',
              background: '#C6A76F', color: '#0F1C2E',
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.9rem',
              padding: '12px 28px', borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(198,167,111,0.4)',
              transition: 'background 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d4b87a'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C6A76F'; e.currentTarget.style.transform = 'none'; }}
          >
            Call Now
          </a>
          <a
            href="mailto:Nick@sunnyhillfinancial.com"
            style={{
              display: 'inline-block',
              background: '#1A3E61', color: '#C6A76F',
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '0.9rem',
              padding: '12px 28px', borderRadius: 50, textDecoration: 'none',
              border: '1.5px solid rgba(198,167,111,0.4)',
              transition: 'background 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,62,97,0.8)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1A3E61'; e.currentTarget.style.transform = 'none'; }}
          >
            Send Email
          </a>
        </div>

        {/* Office + hours */}
        <p style={{
          fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.4)', lineHeight: 1.7,
        }}>
          Office: Henderson NV &nbsp;·&nbsp; Monday–Friday 9am–6pm PST
        </p>
      </motion.div>
    </section>
  );
}
