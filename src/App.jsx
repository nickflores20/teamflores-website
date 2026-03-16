// FILE: src/App.jsx
import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LeadForm from './components/LeadForm';
import { FormModalContext } from './context/FormModalContext';

const Home = lazy(() => import('./pages/Home'));
const LoanTypes = lazy(() => import('./pages/LoanTypes'));
const States = lazy(() => import('./pages/States'));
const LearningCenter = lazy(() => import('./pages/LearningCenter'));
const About = lazy(() => import('./pages/About'));
const PriceYourLoan = lazy(() => import('./pages/PriceYourLoan'));
const Apply = lazy(() => import('./pages/Apply'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Always force top on route change, even if URL has a hash
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

const LoadingFallback = () => (
  <div className="fixed inset-0 bg-[#1A3E61] flex items-center justify-center z-[9999]">
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-[#C6A76F]/30 border-t-[#C6A76F]"
        style={{ animation: 'spin 0.8s linear infinite' }}
      />
      <span className="text-[#C6A76F] font-nunito text-sm tracking-widest uppercase">Loading…</span>
    </div>
  </div>
);

export default function App() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <FormModalContext.Provider value={{ openModal, closeModal }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0F1C2E; }
        ::-webkit-scrollbar-thumb { background: #C6A76F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #d4b87a; }

        .sidebar-cta-btn {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          letter-spacing: 0.08em;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .sidebar-cta-btn:hover {
          background: #d4b87a !important;
          box-shadow: -4px 0 24px rgba(198,167,111,0.5) !important;
        }
        .sidebar-cta-btn:active {
          background: #b8965c !important;
        }
        .mobile-cta-btn {
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .mobile-cta-btn:hover {
          background: #d4b87a !important;
        }
        .mobile-cta-btn:active {
          transform: scale(0.97) !important;
        }
      `}</style>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/loan-types" element={<PageWrapper><LoanTypes /></PageWrapper>} />
              <Route path="/states" element={<PageWrapper><States /></PageWrapper>} />
              <Route path="/learning-center" element={<PageWrapper><LearningCenter /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/price-your-loan" element={<PageWrapper><PriceYourLoan /></PageWrapper>} />
              <Route path="/apply" element={<PageWrapper><Apply /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />

      {/* ── Mobile floating CTA (bottom, visible on lg:hidden) ── */}
      {!modalOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: 16,
            right: 72,
            zIndex: 40,
            display: 'flex',
          }}
          className="lg:hidden"
        >
          <button
            onClick={openModal}
            className="mobile-cta-btn"
            style={{
              width: '100%',
              background: '#C6A76F',
              border: 'none',
              borderRadius: 50,
              padding: '15px 24px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 15,
              color: '#0F1C2E',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              boxShadow: '0 4px 20px rgba(198,167,111,0.45), 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Get My Free Quote
          </button>
        </motion.div>
      )}

      {/* Desktop sidebar wrapper (proper lg: display) */}
      {!modalOpen && (
        <div className="hidden lg:block">
          <motion.button
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={openModal}
            className="sidebar-cta-btn"
            style={{
              position: 'fixed',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%) rotate(180deg)',
              zIndex: 40,
              background: '#C6A76F',
              border: 'none',
              borderRadius: '8px 0 0 8px',
              padding: '18px 12px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 13,
              color: '#0F1C2E',
              cursor: 'pointer',
              boxShadow: '-4px 0 18px rgba(198,167,111,0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            Get Free Quote
          </motion.button>
        </div>
      )}

      {/* ── Form Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="form-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9990,
              overflowY: 'auto',
              background: '#0F1C2E',
            }}
          >
            {/* Close (X) button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              onClick={closeModal}
              aria-label="Close form"
              style={{
                position: 'fixed',
                top: 16,
                right: 16,
                zIndex: 9999,
                background: 'rgba(198,167,111,0.15)',
                border: '1.5px solid rgba(198,167,111,0.4)',
                borderRadius: '50%',
                width: 44,
                height: 44,
                color: '#C6A76F',
                fontSize: 22,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Nunito, sans-serif',
                lineHeight: 1,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198,167,111,0.28)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198,167,111,0.15)'}
            >
              ×
            </motion.button>
            <LeadForm />
          </motion.div>
        )}
      </AnimatePresence>
    </FormModalContext.Provider>
  );
}
