// Fullscreen loading screen shown on first visit.
// Shows the logo gold cutout on pure black, then slides up to reveal the homepage.
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroLoadingScreen() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('tf-loaded');
  });

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('tf-loaded', '1');
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hero-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.img
            src="/brand_assets/logo-glow.png"
            alt="Team Flores"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'min(460px, 80vw)',
              height: 'auto',
              mixBlendMode: 'screen',
              filter: 'drop-shadow(0 0 32px rgba(198,167,111,0.5)) drop-shadow(0 0 64px rgba(198,167,111,0.25))',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
