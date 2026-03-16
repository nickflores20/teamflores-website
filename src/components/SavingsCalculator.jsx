// FILE: src/components/SavingsCalculator.jsx
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SLIDER_STYLES = `
  .calc-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 9999px;
    background: linear-gradient(to right, #1A3E61 var(--pct), rgba(26,62,97,0.25) var(--pct));
    outline: none;
    cursor: pointer;
  }
  .calc-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #C6A76F;
    border: 3px solid #FFFFFF;
    box-shadow: 0 2px 8px rgba(198,167,111,0.5);
    cursor: pointer;
    transition: transform 0.15s;
  }
  .calc-slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
  .calc-slider::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #C6A76F;
    border: 3px solid #FFFFFF;
    box-shadow: 0 2px 8px rgba(198,167,111,0.5);
    cursor: pointer;
  }
`;

function formatCurrency(v) {
  return '$' + Math.max(0, Math.round(v)).toLocaleString();
}

function calcResults(homeValue, mortgageBalance) {
  const helocRaw = Math.min(homeValue * 0.8 - mortgageBalance, homeValue * 0.2);
  const heloc = Math.max(0, Math.min(helocRaw, 100000));
  const helocPayment = heloc * 0.0066;

  const equityRaw = Math.min(homeValue * 0.8 - mortgageBalance * 0.5, homeValue * 0.6);
  const equity = Math.max(0, equityRaw);
  const equityPayment = equity * 0.0025;

  const diff = equity - heloc;

  return { heloc, helocPayment, equity, equityPayment, diff };
}

export default function SavingsCalculator() {
  const [homeValue, setHomeValue] = useState(650000);
  const [mortgageBalance, setMortgageBalance] = useState(250000);

  const { heloc, helocPayment, equity, equityPayment, diff } = calcResults(homeValue, mortgageBalance);

  const homePct = (((homeValue - 200000) / (2000000 - 200000)) * 100).toFixed(1);
  const balancePct = (((mortgageBalance - 0) / (1500000 - 0)) * 100).toFixed(1);

  const handleHomeChange = useCallback((e) => setHomeValue(Number(e.target.value)), []);
  const handleBalanceChange = useCallback((e) => setMortgageBalance(Number(e.target.value)), []);

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#F0E6D2' }}>
      <style>{SLIDER_STYLES}</style>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto"
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
          See How Much More You Could Unlock
        </h2>
        <p
          className="text-center mb-12"
          style={{
            fontFamily: 'Nunito, sans-serif',
            color: '#1A3E61',
            opacity: 0.65,
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          Adjust your home value and mortgage balance to see the difference.
        </p>

        {/* Sliders */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1rem',
            padding: '2rem 2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 24px rgba(26,62,97,0.08)',
          }}
        >
          {/* Home Value Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-1">
              <label
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#1A3E61',
                  letterSpacing: '0.04em',
                }}
              >
                Home Value
              </label>
              <span
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#C6A76F',
                }}
              >
                {formatCurrency(homeValue)}
              </span>
            </div>
            <input
              type="range"
              className="calc-slider"
              min={200000}
              max={2000000}
              step={10000}
              value={homeValue}
              onChange={handleHomeChange}
              style={{ '--pct': `${homePct}%` }}
            />
            <div
              className="flex justify-between mt-1"
              style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.72rem', color: '#1A3E61', opacity: 0.5 }}
            >
              <span>$200K</span>
              <span>$2M</span>
            </div>
          </div>

          {/* Mortgage Balance Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#1A3E61',
                  letterSpacing: '0.04em',
                }}
              >
                Mortgage Balance
              </label>
              <span
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#C6A76F',
                }}
              >
                {formatCurrency(mortgageBalance)}
              </span>
            </div>
            <input
              type="range"
              className="calc-slider"
              min={0}
              max={1500000}
              step={10000}
              value={mortgageBalance}
              onChange={handleBalanceChange}
              style={{ '--pct': `${balancePct}%` }}
            />
            <div
              className="flex justify-between mt-1"
              style={{ fontFamily: 'Nunito, sans-serif', fontSize: '0.72rem', color: '#1A3E61', opacity: 0.5 }}
            >
              <span>$0</span>
              <span>$1.5M</span>
            </div>
          </div>
        </div>

        {/* Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Traditional HELOC */}
          <motion.div
            key={`heloc-${heloc}`}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1A3E61',
              borderRadius: '1rem',
              padding: '1.75rem',
            }}
          >
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: '#1A3E61',
                opacity: 0.55,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Traditional Bank HELOC
            </p>
            <p
              style={{
                fontFamily: '"EB Garamond", serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#1A3E61',
                lineHeight: 1.1,
                marginBottom: '0.25rem',
              }}
            >
              {formatCurrency(heloc)}
            </p>
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '0.8rem',
                color: '#1A3E61',
                opacity: 0.55,
                marginBottom: '1rem',
              }}
            >
              Estimated Qualified Amount
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(26,62,97,0.1)',
                paddingTop: '1rem',
              }}
            >
              <p
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#1A3E61',
                }}
              >
                {formatCurrency(helocPayment)}
                <span style={{ fontSize: '0.85rem', fontFamily: 'Nunito, sans-serif', opacity: 0.6 }}>
                  /mo est.
                </span>
              </p>
            </div>
          </motion.div>

          {/* EquitySelect */}
          <motion.div
            key={`equity-${equity}`}
            animate={{
              boxShadow: [
                '0 0 0px 0px rgba(198,167,111,0)',
                '0 0 28px 6px rgba(198,167,111,0.4)',
                '0 0 0px 0px rgba(198,167,111,0)',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              backgroundColor: '#1A3E61',
              borderRadius: '1rem',
              padding: '1.75rem',
            }}
          >
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: '#C6A76F',
                opacity: 0.8,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              EquitySelect Loan
            </p>
            <p
              style={{
                fontFamily: '"EB Garamond", serif',
                fontSize: '2.2rem',
                fontWeight: 700,
                color: '#C6A76F',
                lineHeight: 1.1,
                marginBottom: '0.25rem',
              }}
            >
              {formatCurrency(equity)}
            </p>
            <p
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '0.8rem',
                color: '#C6A76F',
                opacity: 0.65,
                marginBottom: '1rem',
              }}
            >
              Estimated Qualified Amount
            </p>
            <div
              style={{
                borderTop: '1px solid rgba(198,167,111,0.2)',
                paddingTop: '1rem',
              }}
            >
              <p
                style={{
                  fontFamily: '"EB Garamond", serif',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#C6A76F',
                }}
              >
                {formatCurrency(equityPayment)}
                <span style={{ fontSize: '0.85rem', fontFamily: 'Nunito, sans-serif', opacity: 0.6 }}>
                  /mo est.
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Diff Badge */}
        {diff > 0 && (
          <motion.div
            key={diff}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0px 0px rgba(198,167,111,0)',
                  '0 0 20px 4px rgba(198,167,111,0.45)',
                  '0 0 0px 0px rgba(198,167,111,0)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                backgroundColor: '#C6A76F',
                color: '#0F1C2E',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.03em',
                padding: '10px 24px',
                borderRadius: '9999px',
              }}
            >
              You could unlock {formatCurrency(diff)} more with EquitySelect
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <motion.a
            href="/apply"
            whileHover={{ opacity: 0.88, scale: 1.03 }}
            whileFocus={{ opacity: 0.88, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              display: 'inline-block',
              backgroundColor: '#C6A76F',
              color: '#0F1C2E',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '0.04em',
              padding: '14px 36px',
              borderRadius: '9999px',
              textDecoration: 'none',
              outline: 'none',
              boxShadow: '0 4px 20px rgba(198,167,111,0.35)',
            }}
            onFocus={(e) => (e.currentTarget.style.outline = '2px solid #C6A76F')}
            onBlur={(e) => (e.currentTarget.style.outline = 'none')}
          >
            Get Your Exact Numbers From Nick
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
