// FILE: src/pages/Home.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

import ComparisonSection from '../components/ComparisonSection';
import EquityChart from '../components/EquityChart';
import SofrChart from '../components/SofrChart';
import SavingsCalculator from '../components/SavingsCalculator';
import MortgageCalculator from '../components/MortgageCalculator';
import LoanTypeBadges from '../components/LoanTypeBadges';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import USMap from '../components/USMap';
import LeadForm from '../components/LeadForm';

// ─── CountUp component ────────────────────────────────────────────────────────
function CountUp({ target, duration = 1500, suffix = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    const startTimeout = setTimeout(() => {
      const steps = 60;
      const increment = target / steps;
      const interval = duration / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, interval);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [inView, target, duration, delay]);

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

// ─── Floating Particles ───────────────────────────────────────────────────────

// ─── Why Sunnyhill cards data ─────────────────────────────────────────────────
const WHY_CARDS = [
  {
    title: 'Nick Makes It Simple',
    body: 'Complex mortgage products explained in plain language. No confusion, no surprises — Nick walks you through every step.',
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
  },
  {
    title: '100% Transparency',
    body: "You'll know exactly where you stand before moving forward. Nick gives you the full picture — no hidden fees, no surprises.",
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: 'Speed',
    body: "Nick closes loans faster than the industry average. Your timeline matters, and he treats it that way.",
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
    body: "Nick gives you side-by-side comparisons so you can see exactly which product makes the most sense for your situation.",
    icon: (
      <svg className="w-10 h-10 text-[#C6A76F]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'First Time Buyer Specialist',
    body: "Guided support from first call to closing. Nick has personally helped hundreds of first-time buyers get into their homes.",
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

// ─── Hero Parallax Background ─────────────────────────────────────────────────
function HeroParallaxBg() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Parallax: direct DOM mutation (no React re-render, no jank)
  useEffect(() => {
    const onScroll = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hero-bg-image {
          object-position: center center;
        }
        @media (max-width: 767px) {
          .hero-bg-image { object-position: 60% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-bg-image { animation: none !important; }
        }
      `}</style>

      {/* Parallax wrapper — translateY driven directly by scroll */}
      <div
        ref={wrapperRef}
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '115%',
          willChange: 'transform',
        }}
      >
        <img
          ref={imgRef}
          src="/assets/hero-home.png"
          alt=""
          loading="eager"
          width={1920}
          height={1280}
          className="hero-bg-image"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s ease',
            animation: loaded ? 'kenburns 8s ease-out forwards' : 'none',
            transformOrigin: 'center center',
            display: 'block',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,21,32,0.75) 0%, rgba(10,21,32,0.85) 100%)',
      }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    document.title = 'Nick Flores Sr. | Mortgage Division Director | Sunnyhill Financial | NMLS #422150';
  }, []);

  // Particles
  const particlesRef = useRef(null);
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = '';
    const count = 20;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const size = Math.random() * 3 + 3;
      const duration = Math.random() * 8 + 12;
      const delay = Math.random() * 12;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      el.style.cssText = `
        position: absolute;
        display: block;
        width: ${size}px;
        height: ${size}px;
        background: #D4B87A;
        border-radius: 50%;
        left: ${startX}%;
        top: ${startY}%;
        opacity: 0;
        box-shadow: 0 0 4px #C6A76F;
        animation: floatUp ${duration}s ${delay}s infinite linear;
        pointer-events: none;
        will-change: transform, opacity;
      `;
      container.appendChild(el);
    }
    return () => { if (container) container.innerHTML = ''; };
  }, []);

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

        {/* Hero background photo with parallax */}
        <HeroParallaxBg />

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

        <div
          ref={particlesRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">

          {/* LEFT — 55% */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6 text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-nunito font-bold text-[#C6A76F] text-lg"
            >
              Nick Flores Sr. — Division Director, Sunnyhill Financial
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-garamond text-[36px] md:text-[48px] lg:text-[52px] text-white leading-[1.15] tracking-[-0.03em]"
            >
              Get the Right Mortgage.<br />From Someone Who Actually Answers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-nunito text-gray-300 text-lg leading-[1.7] max-w-xl mx-auto lg:mx-0"
            >
              I've helped homebuyers and homeowners across 7 states get competitive rates and close on time.
              Whether you're purchasing your first home or refinancing an existing loan — I handle it personally,
              from application to close.
            </motion.p>

            {/* Credentials bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-x-4 gap-y-1 justify-center lg:justify-start"
            >
              {[
                '📋 NMLS #422150',
                '📞 702-497-6370',
                '✅ Licensed in NV, AZ, CA, FL, TX, WA, OR',
              ].map(cred => (
                <span
                  key={cred}
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    color: 'rgba(240,230,210,0.85)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cred}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              {/* Primary CTA */}
              <a
                href="https://sunnyhillfinancial.pos.yoursonar.com/?originator=nick@sunnyhillfinancial.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-nunito font-bold text-base text-[#0F1C2E] bg-[#C6A76F] hover:bg-[#d4b87a] active:scale-[0.98] rounded-full px-8 py-4 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
                style={{
                  boxShadow: '0 0 28px rgba(198,167,111,0.45), 0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                Get Pre-Approved Now
              </a>

              {/* CALENDLY: Currently configured but may need to be re-enabled by Nick Sr. if double-booking issue between personal and Sunnyhill calendars is resolved */}
              {/* Secondary CTA */}
              <a
                href="https://calendly.com/floresnick"
                target="_blank"
                rel="noopener noreferrer"
                className="font-nunito font-bold text-base text-[#C6A76F] border-2 border-[#C6A76F] hover:bg-[#C6A76F] hover:text-[#0F1C2E] rounded-full px-8 py-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
              >
                Schedule a Call
              </a>
            </motion.div>
          </div>

          {/* RIGHT — 45% */}
          <div className="w-full lg:w-[45%] flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              {/* PHOTO: Replace this placeholder with Nick Sr.'s headshot. Recommended: professional headshot, 400x400px minimum, JPG or PNG */}
              <div
                style={{
                  width: 'clamp(200px, 30vw, 320px)',
                  height: 'clamp(200px, 30vw, 320px)',
                  borderRadius: '50%',
                  border: '3px solid #C6A76F',
                  background: '#F0E6D2',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 0 40px rgba(198,167,111,0.35), 0 16px 48px rgba(0,0,0,0.4)',
                }}
                aria-label="Nick Flores Sr. — photo coming soon"
              >
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                  <circle cx="28" cy="20" r="11" fill="#1A3E61" opacity="0.5" />
                  <ellipse cx="28" cy="44" rx="18" ry="10" fill="#1A3E61" opacity="0.35" />
                </svg>
                <span style={{ fontFamily: 'Nunito, sans-serif', color: '#1A3E61', fontWeight: 700, fontSize: '1rem', textAlign: 'center' }}>
                  Nick Flores Sr.
                </span>
                <span style={{ fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontSize: '0.8rem', textAlign: 'center' }}>
                  Photo Coming Soon
                </span>
              </div>

              {/* Below photo */}
              <div className="text-center flex flex-col items-center gap-1">
                <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.85)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Division Director | Sunnyhill Financial
                </p>
                <div className="flex gap-0.5" aria-label="5 stars">
                  {[0,1,2,3,4].map(i => (
                    <span key={i} style={{ color: '#C6A76F', fontSize: '1.1rem' }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.7)', fontSize: '0.78rem' }}>
                  Serving NV • AZ • CA • FL • TX • WA • OR
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(198,167,111,0.8))' }}
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
          SECTION 1B: LICENSED STATES
      ══════════════════════════════════════════ */}
      <section className="bg-[#F0E6D2] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-10"
          >
            <h2 className="font-garamond text-4xl sm:text-5xl text-[#1A3E61] tracking-[-0.02em]">
              Licensed To Serve You In 7 States
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { abbr: 'NV', name: 'Nevada', desc: 'Henderson, Las Vegas & statewide' },
              { abbr: 'AZ', name: 'Arizona', desc: 'Phoenix, Scottsdale & statewide' },
              { abbr: 'CA', name: 'California', desc: 'Los Angeles, San Diego & statewide' },
              { abbr: 'FL', name: 'Florida', desc: 'Miami, Orlando & statewide' },
              { abbr: 'TX', name: 'Texas', desc: 'Houston, Dallas & statewide' },
              { abbr: 'WA', name: 'Washington', desc: 'Seattle & statewide' },
              { abbr: 'OR', name: 'Oregon', desc: 'Portland & statewide' },
            ].map((state) => (
              <motion.div
                key={state.abbr}
                variants={scrollFadeUp}
                className="bg-white rounded-2xl p-5 text-center"
                style={{
                  border: '1px solid rgba(26,62,97,0.15)',
                  boxShadow: '0 2px 12px rgba(26,62,97,0.07)',
                }}
              >
                <p className="font-garamond text-4xl font-bold text-[#C6A76F] leading-none mb-1">
                  {state.abbr}
                </p>
                <p className="font-nunito font-bold text-[#1A3E61] text-base mb-1">
                  {state.name}
                </p>
                <p className="font-nunito text-gray-500 text-xs leading-[1.5]">
                  {state.desc}
                </p>
              </motion.div>
            ))}
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
                7 States
              </p>
              <p className="font-nunito text-[#C6A76F] text-sm mt-1">Licensed & Ready to Help</p>
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
                <CountUp target={15} suffix="+" duration={1500} delay={300} /> Years
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
              Why Clients Choose Nick Flores
            </h2>
            <p className="font-nunito text-[#1A3E61]/70 text-lg">
              Nick does things differently.
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
                  loading="lazy"
                  width={400}
                  height={500}
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
                Nick Flores Sr.
              </h2>

              <p className="font-nunito text-[#C6A76F] font-semibold text-lg">
                Division Director | Sunnyhill Financial
              </p>

              <p className="font-nunito text-[#1A3E61]/80 text-base leading-[1.7] max-w-xl mx-auto lg:mx-0">
                Nick Flores Sr. is committed to providing every client the highest level of personal service
                along with some of the most competitive rates available across all 7 states he holds a license in.
                Nick's goal is to create lasting relationships — handling every loan personally, from application to close.
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
              Get Your Free Rate Quote
            </h2>
            <p className="font-nunito text-gray-300 text-lg leading-[1.7] mb-4">
              Fill out the form below and Nick will personally review your scenario and reach out within the hour.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
              {['🔒 Secure & Confidential', '⚡ Response Within 1 Hour', '✅ No Obligation'].map(t => (
                <span key={t} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: 'rgba(198,167,111,0.85)' }}>{t}</span>
              ))}
            </div>
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

      {/* ══════════════════════════════════════════
          SECTION 14: TODAY'S RATES
      ══════════════════════════════════════════ */}
      {/* RATES: Embedded from Sonar — https://sunnyhillfinancial.pos.yoursonar.com/rates. If cross-origin error occurs, switch to fallback button linking to this URL */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-10"
          >
            <h2 className="font-garamond text-4xl sm:text-5xl text-[#1A3E61] tracking-[-0.02em] mb-3">
              Today's Live Mortgage Rates
            </h2>
            <p className="font-nunito text-gray-500 text-lg">
              Real-time rates updated daily. Powered by Sunnyhill Financial.
            </p>
          </motion.div>

          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.15 }}
          >
            <iframe
              src="https://sunnyhillfinancial.pos.yoursonar.com/rates"
              width="100%"
              height="700"
              frameBorder="0"
              title="Live Mortgage Rates — Nick Flores Sr."
              style={{ borderRadius: 12, boxShadow: '0 4px 24px rgba(26,62,97,0.10)', display: 'block' }}
            />
            {/* Fallback: if the iframe above fails due to cross-origin restrictions, replace it with the card below */}
            {/*
            <div style={{ background: '#1A3E61', borderRadius: 16, padding: '3rem 2rem', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
              <h3 style={{ fontFamily: "'EB Garamond', serif", color: '#FFFFFF', fontSize: '1.8rem', marginBottom: '0.75rem' }}>View Today's Live Rates</h3>
              <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.8)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                See real-time mortgage rates for purchase and refinance scenarios in your state.
              </p>
              <a
                href="https://sunnyhillfinancial.pos.yoursonar.com/rates"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#C6A76F', color: '#0F1C2E', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '0.95rem', padding: '14px 32px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}
              >
                View Live Rates
              </a>
            </div>
            */}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 15: PRE-APPROVAL CTA
      ══════════════════════════════════════════ */}
      <section className="bg-[#1A3E61] py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="font-garamond text-4xl sm:text-5xl text-white tracking-[-0.02em]">
              Ready to Get Started?
            </h2>
            <p className="font-nunito text-[#F0E6D2] text-lg leading-[1.7] max-w-xl">
              Start your pre-approval in minutes. Secure, simple, and no obligation. Nick reviews every application personally.
            </p>
            <a
              href="https://sunnyhillfinancial.pos.yoursonar.com/?originator=nick@sunnyhillfinancial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito font-bold text-lg text-[#0F1C2E] bg-[#C6A76F] hover:bg-[#d4b87a] active:bg-[#b8965c] rounded-full px-10 py-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A76F]"
              style={{ boxShadow: '0 0 28px rgba(198,167,111,0.45), 0 4px 20px rgba(0,0,0,0.3)' }}
            >
              Begin Pre-Approval →
            </a>
            <p className="font-nunito text-white/60 text-sm">
              NMLS #422150 | 702-497-6370 | nick@sunnyhillfinancial.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 16: WHY NICK
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="text-center mb-14"
          >
            <h2 className="font-garamond text-4xl sm:text-5xl text-[#1A3E61] tracking-[-0.02em]">
              Why Clients Choose Nick Flores
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '🏆',
                title: '7 Licensed States',
                body: "Whether you're buying in Nevada or refinancing in Texas, Nick is licensed and ready to help.",
              },
              {
                icon: '⚡',
                title: 'Fast Personal Response',
                body: "This is Nick's direct line — not a call center. Expect a real response within the hour.",
              },
              {
                icon: '📋',
                title: 'Application to Close',
                body: "Nick's team handles every step — processing, underwriting, and closing — so nothing falls through.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={scrollFadeUp}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl"
                style={{
                  border: '2px solid rgba(26,62,97,0.1)',
                  boxShadow: '0 4px 24px rgba(26,62,97,0.07)',
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{card.icon}</span>
                <h3 className="font-nunito font-bold text-[#1A3E61] text-xl">{card.title}</h3>
                <p className="font-nunito text-gray-600 text-sm leading-[1.7]">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
