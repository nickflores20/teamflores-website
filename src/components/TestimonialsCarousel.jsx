// FILE: src/components/TestimonialsCarousel.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    text: "Nicholas broke it down step by step in layman's terms. He was there every step of the way from pre-approval to closing. His attention to detail sets him apart — he is the epitome of client service.",
    name: 'Verified Client',
  },
  {
    text: 'Absolutely would recommend without hesitation. All three transactions went smoothly and on time.',
    name: 'Bradley W.',
  },
  {
    text: 'One of the smoothest mortgage transactions ever.',
    name: 'Ken E.',
  },
  {
    text: 'Very impressed with the service. Will surely refer to my friends.',
    name: 'Praveen A.',
  },
];

function StarRow() {
  return (
    <div className="flex gap-1 justify-center mb-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <motion.path
            d="M10 1.5L12.39 6.91L18.18 7.64L13.93 11.77L15.06 17.55L10 14.77L4.94 17.55L6.07 11.77L1.82 7.64L7.61 6.91L10 1.5Z"
            fill="#C6A76F"
            animate={{
              filter: [
                'drop-shadow(0 0 0px rgba(198,167,111,0))',
                'drop-shadow(0 0 6px rgba(198,167,111,0.9))',
                'drop-shadow(0 0 0px rgba(198,167,111,0))',
              ],
            }}
            transition={{
              delay: i * 0.1 + 0.5,
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      ))}
    </div>
  );
}

const SLIDE_VARIANTS = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
  }),
};

export default function TestimonialsCarousel() {
  const [[index, dir], setPage] = useState([0, 1]);
  const isPaused = useRef(false);

  const paginate = useCallback(
    (newDir) => {
      setPage(([prev]) => {
        const next = (prev + newDir + TESTIMONIALS.length) % TESTIMONIALS.length;
        return [next, newDir];
      });
    },
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused.current) paginate(1);
    }, 5000);
    return () => clearInterval(id);
  }, [paginate]);

  const testimonial = TESTIMONIALS[index];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#1A3E61' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto"
      >
        {/* Headline */}
        <h2
          className="text-center mb-12"
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          What Clients Say
        </h2>

        {/* Card */}
        <div
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          style={{ position: 'relative', minHeight: '280px' }}
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
              style={{
                backgroundColor: '#0F1C2E',
                border: '1px solid rgba(198,167,111,0.2)',
                borderRadius: '1rem',
                padding: 'clamp(2rem, 5vw, 3rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Gold quotation mark */}
              <svg
                width="56"
                height="42"
                viewBox="0 0 56 42"
                fill="none"
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.75rem',
                  opacity: 0.18,
                }}
              >
                <path
                  d="M0 42V25.2C0 11.2 8.4 3.36 25.2 0L27.72 4.2C19.88 5.88 15.4 10.36 14.28 17.64H22.68V42H0ZM33.32 42V25.2C33.32 11.2 41.72 3.36 58.52 0L61.04 4.2C53.2 5.88 48.72 10.36 47.6 17.64H56V42H33.32Z"
                  fill="#C6A76F"
                />
              </svg>

              <StarRow key={index} />

              <p
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.75,
                  textAlign: 'center',
                  marginBottom: '1.75rem',
                }}
              >
                "{testimonial.text}"
              </p>

              <p
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#C6A76F',
                  textAlign: 'center',
                  letterSpacing: '0.06em',
                }}
              >
                — {testimonial.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === index ? '24px' : '10px',
                height: '10px',
                borderRadius: '9999px',
                backgroundColor: i === index ? '#C6A76F' : 'transparent',
                border: `2px solid ${i === index ? '#C6A76F' : 'rgba(198,167,111,0.45)'}`,
                padding: '17px 6px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'width 0.25s, background-color 0.25s',
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
