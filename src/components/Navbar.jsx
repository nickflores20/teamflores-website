// FILE: src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FormModalContext } from '../context/FormModalContext';

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

function RippleButton({ children, className, onClick, ...props }) {
  const btnRef = useRef(null);

  const handleClick = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-circle';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());

    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <button
      ref={btnRef}
      className={`ripple-btn ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const scrolled = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useContext(FormModalContext);

  const containerVariants = {
    open: { transition: { staggerChildren: 0.05 } },
    closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
    closed: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      animate={{
        backgroundColor: 'rgba(26, 62, 97, 0.96)',
        borderBottomColor: 'rgba(198,167,111,0.3)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        backdropFilter: 'blur(14px)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="logo-shimmer flex-shrink-0"
          onClick={() => setMenuOpen(false)}
          aria-label="Team Flores — Home"
          style={{ display: 'inline-block' }}
        >
            {/* Desktop: icon + text, no background box */}
          <div className="hidden sm:flex items-center gap-2.5">
            <img
              src="/brand_assets/logo-icon-transparent.png"
              alt=""
              aria-hidden="true"
              style={{
                height: '46px',
                width: 'auto',
                filter: 'drop-shadow(0 2px 14px rgba(198,167,111,0.5))',
              }}
            />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}>Team Flores</div>
              <div style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.6rem',
                fontWeight: 400,
                color: 'rgba(198,167,111,0.75)',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>Powered by Sunnyhill Financial</div>
            </div>
          </div>
          {/* Mobile: icon-only */}
          <img
            src="/brand_assets/logo-icon-transparent.png"
            alt="Team Flores"
            className="sm:hidden"
            style={{
              height: '44px',
              width: 'auto',
              filter: 'drop-shadow(0 2px 10px rgba(198,167,111,0.55))',
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <a
            href="https://sunnyhillfinancial.pos.yoursonar.com/rates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-[#C6A76F] transition-colors duration-200 px-2 xl:px-3 py-1 text-sm font-semibold font-nunito tracking-wide whitespace-nowrap"
          >
            Today's Rates
          </a>
          <button
            onClick={openModal}
            className="text-white/90 hover:text-[#C6A76F] transition-colors duration-200 px-2 xl:px-3 py-1 text-sm font-semibold font-nunito tracking-wide whitespace-nowrap"
          >
            Get Pre-Approved
          </button>
          {/* CALENDLY: Currently configured but may need to be re-enabled by Nick Sr. if double-booking issue between personal and Sunnyhill calendars is resolved */}
          <a
            href="https://calendly.com/floresnick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 hover:text-[#C6A76F] transition-colors duration-200 px-2 xl:px-3 py-1 text-sm font-semibold font-nunito tracking-wide whitespace-nowrap"
          >
            Schedule a Call
          </a>
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="https://sunnyhillfinancial.pos.yoursonar.com/?originator=nick@sunnyhillfinancial.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block bg-[#C6A76F] hover:bg-[#d4b87a] active:bg-[#b8965c] text-[#0F1C2E] font-bold font-nunito text-sm px-5 py-2 rounded-full whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
            style={{ boxShadow: '0 0 18px rgba(198,167,111,0.35)' }}
          >
            Apply Now
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A76F] rounded"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block h-0.5 w-6 bg-[#C6A76F] origin-center"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-[#C6A76F] origin-center"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-[#C6A76F] origin-center"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(15, 28, 46, 0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(198,167,111,0.25)' }}
          >
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col py-3"
            >
              <motion.div variants={itemVariants}>
                <a
                  href="https://sunnyhillfinancial.pos.yoursonar.com/rates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-5 py-3 text-white/90 hover:text-[#C6A76F] border-l-2 border-transparent hover:border-[#C6A76F]/50 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-nunito font-semibold text-base">Today's Rates</span>
                </a>
              </motion.div>
              <motion.div variants={itemVariants}>
                <button
                  onClick={() => { setMenuOpen(false); openModal(); }}
                  className="block w-full px-5 py-3 text-left text-white/90 hover:text-[#C6A76F] border-l-2 border-transparent hover:border-[#C6A76F]/50 transition-colors duration-200"
                >
                  <span className="font-nunito font-semibold text-base">Get Pre-Approved</span>
                </button>
              </motion.div>
              <motion.div variants={itemVariants}>
                {/* CALENDLY: Currently configured but may need to be re-enabled by Nick Sr. if double-booking issue between personal and Sunnyhill calendars is resolved */}
                <a
                  href="https://calendly.com/floresnick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-5 py-3 text-white/90 hover:text-[#C6A76F] border-l-2 border-transparent hover:border-[#C6A76F]/50 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-nunito font-semibold text-base">Schedule a Call</span>
                </a>
              </motion.div>
              <motion.div variants={itemVariants} className="px-5 pt-3 pb-2">
                <a
                  href="https://sunnyhillfinancial.pos.yoursonar.com/?originator=nick@sunnyhillfinancial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#C6A76F] hover:bg-[#d4b87a] active:bg-[#b8965c] text-[#0F1C2E] font-bold font-nunito text-base py-3 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
                  style={{ boxShadow: '0 0 22px rgba(198,167,111,0.4)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Apply Now
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
