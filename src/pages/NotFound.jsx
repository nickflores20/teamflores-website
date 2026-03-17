// FILE: src/pages/NotFound.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | Team Flores';
  }, []);

  return (
    <div style={{
      background: '#0F1C2E',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(198,167,111,0.07) 0%, transparent 65%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, maxWidth: 520 }}
      >
        {/* Logo text */}
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          color: '#C6A76F',
          letterSpacing: '-0.01em',
          marginBottom: '2rem',
          fontWeight: 600,
        }}>
          Team Flores
        </p>

        {/* 404 */}
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(5rem, 15vw, 9rem)',
          color: 'rgba(198,167,111,0.18)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          letterSpacing: '-0.05em',
        }}>
          404
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}>
          Page Not Found
        </h1>

        {/* Subtext */}
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '1rem',
          color: 'rgba(240,230,210,0.6)',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          Looks like this page got lost. Let Nick help you find your way home.
        </p>

        {/* CTA button */}
        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#C6A76F',
            color: '#0F1C2E',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: '1rem',
            padding: '14px 36px',
            borderRadius: 50,
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(198,167,111,0.4)',
            transition: 'background 0.2s ease, transform 0.15s ease',
            marginBottom: '1.5rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#d4b87a'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#C6A76F'; e.currentTarget.style.transform = 'none'; }}
        >
          Go Back Home
        </Link>

        {/* Phone */}
        <p style={{ marginTop: '1rem' }}>
          <a
            href="tel:7024976370"
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#C6A76F',
              textDecoration: 'none',
            }}
          >
            (702) 497-6370
          </a>
        </p>
      </motion.div>
    </div>
  );
}
