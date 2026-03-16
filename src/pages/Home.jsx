// FILE: src/pages/Home.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

import ComparisonSection from '../components/ComparisonSection';
import EquityChart from '../components/EquityChart';
import SofrChart from '../components/SofrChart';
import SavingsCalculator from '../components/SavingsCalculator';
import MortgageCalculator from '../components/MortgageCalculator';
import LoanTypeBadges from '../components/LoanTypeBadges';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import USMap from '../components/USMap';
import LeadForm from '../components/LeadForm';

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed = 50) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const tick = () => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    const id = setTimeout(tick, speed);
    return () => clearTimeout(id);
  }, [text, speed]);
  return { displayed, done };
}

// ─── CountUp component ────────────────────────────────────────────────────────
function CountUp({ target, duration = 1500, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ─── Shimmer Stars ────────────────────────────────────────────────────────────
function ShimmerStars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className="flex gap-1 justify-center" aria-label="5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.svg
          key={i}
          initial={{ color: '#ffffff40', scale: 0.8 }}
          animate={inView ? { color: '#C6A76F', scale: 1 } : {}}
          transition={{ delay: i * 0.18, duration: 0.35, ease: 'easeOut' }}
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

// ─── Ripple button ────────────────────────────────────────────────────────────
function RippleButton({ children, to, className, style }) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    setTimeout(() => navigate(to), 100);
  }, [navigate, to]);

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            background: 'rgba(255,255,255,0.35)',
            animation: 'ripple-expand 0.7s ease-out forwards',
          }}
        />
      ))}
    </button>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${10 + Math.random() * 80}%`,
  delay: Math.random() * 5,
  size: 3 + Math.random() * 4,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: '#C6A76F',
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Why Sunnyhill cards data ─────────────────────────────────────────────────
const WHY_CARDS = [
  {
    title: 'We Make It Simple',
    body: 'Complex mortgage products explained in plain language. No confusion, no surprises.',
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
  {
    title: '100% Transparency',
    body: "You'll know exactly where you stand before moving forward. No hidden fees.",
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Speed',
    body: 'We close loans faster than the industry average. Your timeline matters to us.',
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Clear Communication',
    body: 'Nick answers calls and emails personally. Always know where your loan stands.',
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'You Get Options',
    body: 'Side-by-side comparisons so you see exactly which product makes the most sense.',
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'First Time Buyer Specialists',
    body: "Guided support from first call to closing. We've helped hundreds of first-time buyers.",
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

// ─── Scroll variants ──────────────────────────────────────────────────────────
const scrollFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const { displayed, done } = useTypewriter(
    "Your Home Has More Value Than Your Bank Is Telling You",
    50
  );

  // Hero overlay fade
  const [overlayGone, setOverlayGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOverlayGone(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full">
      {/* Ripple keyframe injected once */}
      <style>{`
        @keyframes ripple-expand {
          to { transform: scale(18); opacity: 0; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F1C2E] pt-20">

        {/* Entry overlay */}
        <AnimatePresence>
          {!overlayGone && (
            <motion.div
              className="absolute inset-0 z-40 bg-[#1A3E61]"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Background radial layers */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(198,167,111,0.13) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(26,62,97,0.8) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(198,167,111,0.07) 0%, transparent 60%)' }}
          />
        </div>

        <FloatingParticles />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">

          {/* LEFT — 55% */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-garamond text-[36px] md:text-[48px] lg:text-[56px] text-white leading-[1.1] tracking-[-0.03em] min-h-[1.1em]"
              aria-label="Your Home Has More Value Than Your Bank Is Telling You"
            >
              {displayed}
              {!done && (
                <motion.span
                  className="inline-block w-[3px] h-[0.85em] bg-[#C6A76F] ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                />
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-nunito text-gray-300 text-lg leading-[1.7] max-w-xl mx-auto lg:mx-0"
            >
              Nick Flores helps homeowners across 20+ states unlock equity their bank never told them
              about — with some of the most competitive rates available.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-garamond italic text-[#C6A76F] text-xl lg:text-2xl"
            >
              "You can't have a positive life with a negative mind."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              {/* Primary CTA with ripple */}
              <RippleButton
                to="/apply"
                className="font-nunito font-bold text-base text-[#0F1C2E] bg-[#C6A76F] hover:bg-[#d4b87a] active:scale-[0.98] rounded-full px-8 py-4 transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F] cursor-pointer"
                style={{
                  boxShadow: '0 0 28px rgba(198,167,111,0.45), 0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                See How Much You Qualify For
              </RippleButton>

              {/* Secondary CTA */}
              <Link
                to="/price-your-loan"
                className="font-nunito font-bold text-base text-white border-2 border-[#C6A76F] hover:bg-[#C6A76F] hover:text-[#0F1C2E] rounded-full px-8 py-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
              >
                View Today's Rates
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — 45% */}
          <div className="w-full lg:w-[45%] flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <img
                  src="/brand_assets/nick.jpg"
                  alt="Nicholas Flores — Division Director, Sunnyhill Financial"
                  className="rounded-full object-cover object-top"
                  style={{
                    width: 'clamp(180px, 30vw, 300px)',
                    height: 'clamp(180px, 30vw, 300px)',
                    boxShadow: `
                      0 0 0 4px #C6A76F,
                      0 0 20px rgba(198,167,111,0.5),
                      0 0 50px rgba(198,167,111,0.3),
                      0 0 90px rgba(198,167,111,0.15),
                      0 16px 48px rgba(0,0,0,0.5)
                    `,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-7 h-7 text-[#C6A76F]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2: CREDIBILITY BAR
      ══════════════════════════════════════════ */}
      <section className="bg-[#1A3E61] py-12 border-y border-[#C6A76F]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 items-center">

            {/* Stat 1: 20+ States */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="text-center lg:border-r lg:border-[#C6A76F]/30 lg:pr-6"
            >
              <p className="font-garamond text-white text-[24px] leading-tight">
                <CountUp target={20} suffix="+" duration={1500} /> States
              </p>
              <p className="font-nunito text-[#C6A76F] text-sm mt-1">Licensed Nationwide</p>
            </motion.div>

            {/* Stat 2: NMLS */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 }}
              className="text-center lg:border-r lg:border-[#C6A76F]/30 lg:px-6"
            >
              <p className="font-garamond text-white text-[24px] leading-tight">NMLS #422150</p>
              <p className="font-nunito text-[#C6A76F] text-sm mt-1">License Number</p>
            </motion.div>

            {/* Stat 3: Stars */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 }}
              className="text-center col-span-2 lg:col-span-1 lg:border-r lg:border-[#C6A76F]/30 lg:px-6"
            >
              <ShimmerStars />
              <p className="font-nunito text-[#C6A76F] text-sm mt-1">Google &amp; Bankrate</p>
            </motion.div>

            {/* Stat 4: Experience */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3 }}
              className="text-center lg:border-r lg:border-[#C6A76F]/30 lg:px-6"
            >
              <p className="font-garamond text-white text-[24px] leading-tight">
                <CountUp target={15} suffix="+" duration={1500} /> Years
              </p>
              <p className="font-nunito text-[#C6A76F] text-sm mt-1">Experience</p>
            </motion.div>

            {/* Stat 5: Fast close */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.4 }}
              className="text-center lg:pl-6"
            >
              <p className="font-garamond text-white text-[24px] leading-tight">Faster Close</p>
              <p className="font-nunito text-[#C6A76F] text-sm mt-1">Than Industry Average</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3: COMPARISON SECTION
      ══════════════════════════════════════════ */}
      <ComparisonSection />

      {/* ══════════════════════════════════════════
          SECTION 4: EQUITY GAP CHART
      ══════════════════════════════════════════ */}
      <EquityChart />

      {/* ══════════════════════════════════════════
          SECTION 5: MORTGAGE CALCULATOR
      ══════════════════════════════════════════ */}
      <MortgageCalculator />

      {/* ══════════════════════════════════════════
          SECTION 6: SOFR RATE CHART
      ══════════════════════════════════════════ */}
      <SofrChart />

      {/* ══════════════════════════════════════════
          SECTION 7: SAVINGS CALCULATOR
      ══════════════════════════════════════════ */}
      <SavingsCalculator />

      {/* ══════════════════════════════════════════
          SECTION 8: LOAN TYPE BADGES
      ══════════════════════════════════════════ */}
      <LoanTypeBadges />

      {/* ══════════════════════════════════════════
          SECTION 9: WHY SUNNYHILL
      ══════════════════════════════════════════ */}
      <section className="bg-[#F0E6D2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <h2 className="font-garamond text-4xl sm:text-5xl text-[#1A3E61] tracking-[-0.02em] mb-3">
              Why Homeowners Choose Sunnyhill
            </h2>
            <p className="font-nunito text-[#1A3E61]/70 text-lg">
              We do things differently.
            </p>
          </motion.div>

          {/* 3×2 card grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {WHY_CARDS.map((card) => (
              <motion.div
                key={card.title}
                variants={scrollFadeUp}
                className="group bg-white rounded-2xl p-6 cursor-default"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(26,62,97,0.12)',
                  border: '2px solid transparent',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C6A76F';
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(198,167,111,0.25), 0 2px 12px rgba(26,62,97,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,62,97,0.12)';
                }}
              >
                {/* Cream-icon watermark — top-right transparent navy version */}
                <img
                  src="/brand_assets/logo-cream-icon.png"
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 80,
                    height: 'auto',
                    opacity: 0.07,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-garamond text-2xl text-[#1A3E61] mb-2">{card.title}</h3>
                <p className="font-nunito text-gray-600 text-sm leading-[1.7]">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 10: TESTIMONIALS
      ══════════════════════════════════════════ */}
      <TestimonialsCarousel />

      {/* ══════════════════════════════════════════
          SECTION 11: US MAP
      ══════════════════════════════════════════ */}
      <USMap />

      {/* ══════════════════════════════════════════
          SECTION 12: ABOUT NICK PREVIEW
      ══════════════════════════════════════════ */}
      <section className="bg-[#F0E6D2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Image left */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="w-full lg:w-auto flex-shrink-0 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/brand_assets/nick.jpg"
                  alt="Nicholas Flores, Division Director at Sunnyhill Financial"
                  className="rounded-2xl object-cover object-top w-full"
                  style={{
                    width: 'clamp(260px, 35vw, 400px)',
                    height: 'auto',
                    aspectRatio: '4/5',
                    border: '4px solid #C6A76F',
                    boxShadow: '0 8px 40px rgba(198,167,111,0.4), 0 4px 16px rgba(15,28,46,0.25)',
                    maxWidth: '400px',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Text right */}
            <motion.div
              variants={scrollFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-5 text-center lg:text-left"
            >
              <h2 className="font-garamond text-5xl text-[#0F1C2E] tracking-[-0.02em]">
                Nicholas Flores
              </h2>

              <p className="font-nunito text-[#C6A76F] font-semibold text-lg">
                Division Director | Sunnyhill Financial
              </p>

              <p className="font-nunito text-[#1A3E61]/80 text-base leading-[1.7] max-w-xl mx-auto lg:mx-0">
                Nicholas Flores is committed to providing his clients the highest level of service for
                home loans along with some of the most competitive interest rates available in all of
                the states he holds a license in. Nick's goal is to create lasting relationships with
                each of his clients so that he may continue providing excellent service for many years
                to come.
              </p>

              <p className="font-garamond italic text-[#C6A76F] text-xl lg:text-2xl">
                "You can't have a positive life with a negative mind."
              </p>

              <p className="font-nunito text-[#C6A76F] text-sm">
                NMLS #422150 | AZ #LO-2013475 | NV #23814 | FL #LO58864 | CA-DBO #422150
              </p>

              <div>
                <Link
                  to="/about"
                  className="inline-block font-nunito font-bold text-base text-[#0F1C2E] bg-[#C6A76F] hover:bg-[#d4b87a] active:bg-[#b8965c] rounded-full px-8 py-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
                  style={{
                    boxShadow: '0 0 20px rgba(198,167,111,0.35), 0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  Learn More About Nick
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 13: LEAD FORM FUNNEL
      ══════════════════════════════════════════ */}
      <section className="bg-[#0F1C2E] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(198,167,111,0.09) 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h2 className="font-garamond text-4xl sm:text-5xl text-white tracking-[-0.02em] mb-4">
              Find Out What You Qualify For
            </h2>
            <p className="font-nunito text-gray-300 text-lg leading-[1.7]">
              Takes about 2 minutes. No commitment required.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={scrollFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <LeadForm />
        </motion.div>
      </section>

    </div>
  );
}
