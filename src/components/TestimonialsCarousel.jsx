// FILE: src/components/TestimonialsCarousel.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Anthony Tran',
    location: 'Henderson NV',
    date: 'October 2025',
    stars: 5,
    loan: 'Refinance',
    text: "I recently completed a refinance with Sunnyhill Financial and I cannot say enough great things about Nick Flores and his team. From the very beginning Nick was incredibly professional, knowledgeable, and honest. He took the time to explain every option and always made sure we understood every step of the process.",
  },
  {
    name: 'Myra Sarmiento',
    location: 'Corona CA',
    date: 'October 2014',
    stars: 5,
    loan: 'Purchase',
    text: "It was a pleasure to do business with Nick. He is a consummate professional and really cares about his clients. He was there every step of the way from our pre-approval to the day our loan closed. Nick took the time to explain each step thoroughly and I would recommend him to anyone.",
  },
  {
    name: 'R. Milay',
    location: 'Hayward CA',
    date: 'January 2015',
    stars: 5,
    loan: 'Refinance',
    text: "Nick Flores refinanced two of my home loans. One was in a very complex situation. My wife and I had gone through one bank, a mortgage broker, and an attorney — all advised us to foreclose. Nick took the challenge and closed both loans successfully. Absolutely incredible.",
  },
  {
    name: 'Onz F.',
    location: 'San Ramon CA',
    date: 'July 2014',
    stars: 5,
    loan: 'Purchase',
    text: "Nicholas was genuinely friendly throughout the whole process and excited to answer all our questions. He would always respond very quickly with a smile every single time. We felt that Nick was our partner and friend — always giving us his honest opinion.",
  },
  {
    name: 'Kim',
    location: 'Las Vegas NV',
    date: 'April 2015',
    stars: 5,
    loan: 'Refinance',
    text: "Words cannot express how great Nick is. Very knowledgeable and easy to reach when we need questions answered. I know we were just one of many clients but it felt as if Nick gave us all his undivided attention. Cannot recommend him enough.",
  },
];

function FilledStar({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="#C6A76F">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ZillowVerifiedBadge() {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: 'rgba(34,197,94,0.1)',
      border: '1px solid rgba(34,197,94,0.35)',
      borderRadius: 100,
      padding: '3px 10px',
      fontSize: 11,
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      color: '#22c55e',
      whiteSpace: 'nowrap',
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="6" fill="rgba(34,197,94,0.2)" />
        <path d="M3.5 6.2L5.1 7.8L8.5 4.2" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Zillow Verified
    </span>
  );
}

function ReviewCard({ testimonial }) {
  return (
    <div style={{
      background: '#0F1C2E',
      border: '1px solid rgba(198,167,111,0.2)',
      borderRadius: '1rem',
      padding: 'clamp(1.25rem, 3vw, 1.75rem)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gold quotation mark */}
      <svg width="44" height="32" viewBox="0 0 56 42" fill="none" style={{
        position: 'absolute', top: '1rem', left: '1.25rem', opacity: 0.15, pointerEvents: 'none',
      }}>
        <path d="M0 42V25.2C0 11.2 8.4 3.36 25.2 0L27.72 4.2C19.88 5.88 15.4 10.36 14.28 17.64H22.68V42H0ZM33.32 42V25.2C33.32 11.2 41.72 3.36 58.52 0L61.04 4.2C53.2 5.88 48.72 10.36 47.6 17.64H56V42H33.32Z" fill="#C6A76F" />
      </svg>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: testimonial.stars }).map((_, i) => <FilledStar key={i} size={16} />)}
      </div>

      {/* Text */}
      <p style={{
        fontFamily: '"EB Garamond", serif',
        fontStyle: 'italic',
        fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
        color: '#FFFFFF',
        lineHeight: 1.75,
        flex: 1,
      }}>
        "{testimonial.text}"
      </p>

      {/* Name + location + date */}
      <div>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#C6A76F', marginBottom: 3 }}>
          {testimonial.name}
        </p>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>
          {testimonial.location} · {testimonial.date}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {/* Loan type pill */}
          <span style={{
            background: 'rgba(198,167,111,0.15)',
            border: '1px solid rgba(198,167,111,0.35)',
            borderRadius: 100,
            padding: '2px 10px',
            fontSize: 11,
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            color: '#C6A76F',
          }}>
            {testimonial.loan}
          </span>
          <ZillowVerifiedBadge />
        </div>
      </div>
    </div>
  );
}

const SLIDE_VARIANTS = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function TestimonialsCarousel() {
  const [[index, dir], setPage] = useState([0, 1]);
  const isPaused = useRef(false);

  const paginate = useCallback((newDir) => {
    setPage(([prev]) => {
      const next = (prev + newDir + TESTIMONIALS.length) % TESTIMONIALS.length;
      return [next, newDir];
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused.current) paginate(1);
    }, 6000);
    return () => clearInterval(id);
  }, [paginate]);

  // Desktop: show 3 cards starting at index
  const desktopCards = [0, 1, 2].map(i => TESTIMONIALS[(index + i) % TESTIMONIALS.length]);

  return (
    <section style={{ backgroundColor: '#1A3E61', padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          What Clients Say
        </motion.h2>

        {/* Rating summary box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(198,167,111,0.08)',
            border: '1px solid rgba(198,167,111,0.25)',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            maxWidth: 420,
            margin: '0 auto 3rem',
          }}
        >
          <p style={{ fontFamily: '"EB Garamond", serif', fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 600, color: '#C6A76F', lineHeight: 1 }}>
            5.0
          </p>
          <div style={{ display: 'flex', gap: 5 }}>
            {[0,1,2,3,4].map(i => <FilledStar key={i} size={22} />)}
          </div>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#FFFFFF', margin: 0 }}>
            22 Zillow Verified Reviews
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Based on real client transactions
          </p>
          <a
            href="https://www.zillow.com/lender-profile/floresnick/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              fontSize: '0.82rem',
              color: '#C6A76F',
              border: '1.5px solid rgba(198,167,111,0.5)',
              borderRadius: 100,
              padding: '6px 18px',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(198,167,111,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            View All Reviews
          </a>
        </motion.div>

        {/* ── DESKTOP: 3-card layout ── */}
        <div
          className="hidden lg:block"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}
            >
              {desktopCards.map((t, i) => (
                <ReviewCard key={i} testimonial={t} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── MOBILE: 1-card layout ── */}
        <div
          className="lg:hidden"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          style={{ position: 'relative', minHeight: 320 }}
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ReviewCard testimonial={TESTIMONIALS[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls: arrows + dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.75rem' }}>
          {/* Left arrow */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(198,167,111,0.12)',
              border: '1.5px solid rgba(198,167,111,0.4)',
              color: '#C6A76F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(198,167,111,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(198,167,111,0.12)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                aria-label={`Go to review ${i + 1}`}
                style={{
                  width: i === index ? 24 : 10, height: 10, borderRadius: 9999,
                  background: i === index ? '#C6A76F' : 'transparent',
                  border: `2px solid ${i === index ? '#C6A76F' : 'rgba(198,167,111,0.45)'}`,
                  padding: 0, cursor: 'pointer', outline: 'none',
                  transition: 'width 0.25s ease, background 0.25s ease',
                }}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => paginate(1)}
            aria-label="Next review"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(198,167,111,0.12)',
              border: '1.5px solid rgba(198,167,111,0.4)',
              color: '#C6A76F', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(198,167,94,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(198,167,111,0.12)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
