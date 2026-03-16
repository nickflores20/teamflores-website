// FILE: src/App.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HeroLoadingScreen from './components/HeroLoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const LoanTypes = lazy(() => import('./pages/LoanTypes'));
const States = lazy(() => import('./pages/States'));
const LearningCenter = lazy(() => import('./pages/LearningCenter'));
const About = lazy(() => import('./pages/About'));
const PriceYourLoan = lazy(() => import('./pages/PriceYourLoan'));
const Apply = lazy(() => import('./pages/Apply'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
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

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0F1C2E; }
        ::-webkit-scrollbar-thumb { background: #C6A76F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #d4b87a; }
      `}</style>
      <HeroLoadingScreen />
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
    </>
  );
}
