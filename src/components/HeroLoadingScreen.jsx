// Fullscreen loading screen shown on first visit.
// Shows the glowing logo centered on black, fades out after 1.5s.
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroLoadingScreen() {
  const [visible, setVisible] = useState(() => {
    // Only show once per session
    return !sessionStorage.getItem('tf-loaded');
  });

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('tf-loaded', '1');
    }, 1500);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hero-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'min(520px, 85vw)',
              height: 'auto',
              filter: 'drop-shadow(0 0 40px rgba(198,167,111,0.6)) drop-shadow(0 0 80px rgba(198,167,111,0.3))',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
