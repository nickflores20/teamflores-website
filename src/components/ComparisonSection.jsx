// FILE: src/components/ComparisonSection.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const TABS = ['MARY', 'DAN'];

const DATA = {
  MARY: {
    age: 74,
    home: 650000,
    balance: 250000,
    heloc: { qualified: 33000, payment: 260 },
    equity: { qualified: 200000, payment: 260, badge: '506% More Equity Unlocked' },
  },
  DAN: {
    age: 68,
    home: 500000,
    balance: 300000,
    heloc: { qualified: 100000, payment: 768 },
    equity: { qualified: 225000, payment: 294, badge: '125% More Equity Unlocked' },
  },
};

function CountUp({ target, inView, prefix = '$', duration = 1.4 }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    prefix + Math.round(v).toLocaleString()
  );
  const [display, setDisplay] = useState(prefix + '0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = rounded.on('change', setDisplay);
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target]);

  return <span>{display}</span>;
}

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState('MARY');
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const d = DATA[activeTab];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4"
      style={{ backgroundColor: '#F0E6D2' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        {/* Headline */}
        <h2
          className="text-center mb-3"
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 600,
            color: '#1A3E61',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          Two Approvals. Only One Made Sense.
        </h2>
        <p
          className="text-center mb-10"
          style={{
            fontFamily: 'Nunito, sans-serif',
            color: '#1A3E61',
            opacity: 0.7,
            fontSize: '1rem',
          }}
        >
          Real client scenarios. Real numbers.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
                padding: '10px 32px',
                borderRadius: '9999px',
                border: `2px solid #C6A76F`,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                backgroundColor: activeTab === tab ? '#C6A76F' : 'transparent',
                color: activeTab === tab ? '#0F1C2E' : '#1A3E61',
                outline: 'none',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Profile line */}
            <p
              className="text-center mb-6"
              style={{
                fontFamily: 'Nunito, sans-serif',
                color: '#1A3E61',
                fontSize: '0.9rem',
                opacity: 0.75,
              }}
            >
              Age {d.age} &nbsp;|&nbsp; Home Value:{' '}
              <strong>${d.home.toLocaleString()}</strong> &nbsp;|&nbsp; Balance:{' '}
              <strong>${d.balance.toLocaleString()}</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traditional HELOC Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1A3E61',
                  borderRadius: '1rem',
                  padding: '2rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    color: '#1A3E61',
                    opacity: 0.6,
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  Traditional Bank HELOC
                </p>
                <div className="space-y-4 mt-4">
                  <div>
                    <p
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '0.8rem',
                        color: '#1A3E61',
                        opacity: 0.65,
                        marginBottom: '2px',
                      }}
                    >
                      Qualified Amount
                    </p>
                    <p
                      style={{
                        fontFamily: '"EB Garamond", serif',
                        fontSize: '2.4rem',
                        fontWeight: 700,
                        color: '#1A3E61',
                        lineHeight: 1.1,
                      }}
                    >
                      <CountUp target={d.heloc.qualified} inView={inView} />
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '0.8rem',
                        color: '#1A3E61',
                        opacity: 0.65,
                        marginBottom: '2px',
                      }}
                    >
                      Monthly Payment
                    </p>
                    <p
                      style={{
                        fontFamily: '"EB Garamond", serif',
                        fontSize: '1.6rem',
                        fontWeight: 600,
                        color: '#1A3E61',
                      }}
                    >
                      <CountUp target={d.heloc.payment} inView={inView} duration={1.1} />
                      /mo
                    </p>
                  </div>
                </div>
              </div>

              {/* EquitySelect Card */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 0px 0px rgba(198,167,111,0)',
                    '0 0 28px 6px rgba(198,167,111,0.45)',
                    '0 0 0px 0px rgba(198,167,111,0)',
                  ],
                }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  backgroundColor: '#1A3E61',
                  borderRadius: '1rem',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: '#C6A76F',
                    color: '#0F1C2E',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                  }}
                >
                  {d.equity.badge}
                </div>

                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    color: '#C6A76F',
                    opacity: 0.85,
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  EquitySelect Loan
                </p>
                <div className="space-y-4 mt-4">
                  <div>
                    <p
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '0.8rem',
                        color: '#C6A76F',
                        opacity: 0.7,
                        marginBottom: '2px',
                      }}
                    >
                      Qualified Amount
                    </p>
                    <p
                      style={{
                        fontFamily: '"EB Garamond", serif',
                        fontSize: '2.4rem',
                        fontWeight: 700,
                        color: '#C6A76F',
                        lineHeight: 1.1,
                      }}
                    >
                      <CountUp target={d.equity.qualified} inView={inView} />
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '0.8rem',
                        color: '#C6A76F',
                        opacity: 0.7,
                        marginBottom: '2px',
                      }}
                    >
                      Capped Payment
                    </p>
                    <p
                      style={{
                        fontFamily: '"EB Garamond", serif',
                        fontSize: '1.6rem',
                        fontWeight: 600,
                        color: '#C6A76F',
                      }}
                    >
                      <CountUp target={d.equity.payment} inView={inView} duration={1.1} />
                      /mo
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Disclaimer */}
            <p
              className="text-center mt-8"
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '0.72rem',
                color: '#1A3E61',
                opacity: 0.55,
                maxWidth: '600px',
                margin: '2rem auto 0',
                lineHeight: 1.6,
              }}
            >
              Variable APR ranging from 5.00%–9.00% (SOFR + 1.50% margin). Rate subject to change.
              Not a commitment to lend.
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
