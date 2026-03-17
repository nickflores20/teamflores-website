// FILE: src/components/CookieNotice.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'teamflores_cookie_accepted';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9980,
            background: '#1A3E61',
            borderTop: '1px solid rgba(198,167,111,0.25)',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: '0.875rem',
            color: '#FFFFFF',
            lineHeight: 1.5,
            flex: 1,
            minWidth: 240,
            textAlign: 'center',
          }}>
            We use cookies to improve your experience. By continuing you agree to our{' '}
            <a
              href="/privacy"
              style={{ color: '#C6A76F', textDecoration: 'underline' }}
            >
              Privacy Policy
            </a>
            .
          </p>
          <button
            onClick={accept}
            style={{
              background: '#C6A76F',
              color: '#0F1C2E',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: '0.875rem',
              padding: '10px 24px',
              borderRadius: 50,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(198,167,111,0.35)',
              transition: 'background 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#d4b87a'}
            onMouseLeave={e => e.currentTarget.style.background = '#C6A76F'}
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
