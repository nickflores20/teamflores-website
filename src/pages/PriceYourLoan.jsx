// FILE: src/pages/PriceYourLoan.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MortgageCalculator from '../components/MortgageCalculator';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export default function PriceYourLoan() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

        .pyl-btn-gold {
          display: inline-block;
          background: #C6A76F;
          color: #0F1C2E;
          font-family: Nunito, sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.03em;
          padding: 15px 40px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 8px 28px rgba(198,167,111,0.28), 0 2px 8px rgba(198,167,111,0.12);
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .pyl-btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(198,167,111,0.42), 0 4px 12px rgba(198,167,111,0.18);
        }
        .pyl-btn-gold:active {
          transform: translateY(0px);
          box-shadow: 0 4px 14px rgba(198,167,111,0.22);
        }
        .pyl-btn-gold:focus-visible {
          outline: 3px solid #C6A76F;
          outline-offset: 3px;
        }

        .pyl-btn-outline {
          display: inline-block;
          background: transparent;
          color: #C6A76F;
          font-family: Nunito, sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.03em;
          padding: 13px 38px;
          border-radius: 10px;
          border: 2px solid #C6A76F;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .pyl-btn-outline:hover {
          background: rgba(198,167,111,0.1);
          transform: translateY(-2px);
        }
        .pyl-btn-outline:active {
          transform: translateY(0px);
          background: rgba(198,167,111,0.06);
        }
        .pyl-btn-outline:focus-visible {
          outline: 3px solid #C6A76F;
          outline-offset: 3px;
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          background: '#1A3E61',
          paddingTop: 'calc(80px + 88px)',
          paddingBottom: 88,
          paddingLeft: 24,
          paddingRight: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Layered depth gradients */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 80% 60% at 10% 10%, rgba(198,167,111,0.07) 0%, transparent 65%), radial-gradient(ellipse 55% 55% at 90% 85%, rgba(15,28,46,0.55) 0%, transparent 70%)',
          }}
        />

        <motion.div
          style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Gold badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(198,167,111,0.12)',
                border: '1px solid rgba(198,167,111,0.42)',
                color: '#C6A76F',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 18px',
                borderRadius: 100,
              }}
            >
              Powered by real mortgage math
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'EB Garamond, serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 20,
              margin: '0 0 20px 0',
            }}
          >
            Price Your Loan
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#D1D5DB',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Get accurate monthly payment estimates with our built-in mortgage calculator. No email required.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CALCULATOR SECTION ── */}
      <motion.section
        style={{ background: '#F0E6D2' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <MortgageCalculator />
        </motion.div>
      </motion.section>

      {/* ── CTA SECTION ── */}
      <motion.section
        style={{
          background: '#1A3E61',
          padding: '96px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        {/* Subtle radial depth */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(198,167,111,0.055) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            maxWidth: 620,
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'EB Garamond, serif',
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Ready to Get Your Actual Rate?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 17,
              color: '#D1D5DB',
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            The calculator gives you estimates. Nick will give you real numbers — with no obligation.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to="/apply" className="pyl-btn-gold">
              Get a Free Quote From Nick
            </Link>
            <a href="tel:7024976370" className="pyl-btn-outline">
              Call Nick: (702) 497-6370
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ── DISCLAIMER ── */}
      <motion.section
        style={{
          background: '#0F1C2E',
          padding: '48px 24px',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 11,
            color: '#6B7280',
            lineHeight: 1.85,
            textAlign: 'center',
            maxWidth: 820,
            margin: '0 auto',
          }}
        >
          This calculator is for educational purposes only. Results are estimates and are not a guarantee of loan terms.
          Actual rates, payments, and qualification amounts will depend on creditworthiness, property type,
          loan-to-value ratio, and other factors. Not a commitment to lend. Variable APR ranging from 5.00%–9.00%
          (SOFR + 1.50% margin). Rate subject to change. Minimum FICO 650 required. Not all applicants will qualify.
          NMLS #422150 | AZ #LO-2013475 | NV #23814 | FL #LO58864 | CA-DBO #422150 | Company NMLS #1708856
          Sunnyhill Financial Inc.
        </p>
      </motion.section>
    </>
  );
}
