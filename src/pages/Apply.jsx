// FILE: src/pages/Apply.jsx
import { motion } from 'framer-motion';
import LeadForm from '../components/LeadForm';

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

function TrustBadge({ label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(198,167,111,0.08)',
        border: '1px solid rgba(198,167,111,0.28)',
        borderRadius: 100,
        padding: '8px 18px',
      }}
    >
      {/* Gold checkmark */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <circle cx="7" cy="7" r="7" fill="rgba(198,167,111,0.18)" />
        <path
          d="M4 7.2L6.1 9.3L10 5"
          stroke="#C6A76F"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          color: '#C6A76F',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Apply() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

        .apply-contact-link {
          text-decoration: none;
          transition: opacity 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .apply-contact-link:hover {
          opacity: 0.78;
        }
        .apply-contact-link:active {
          opacity: 0.6;
        }
        .apply-contact-link:focus-visible {
          outline: 3px solid #C6A76F;
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>

      <div
        style={{
          background: '#0F1C2E',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── HERO ── */}
        <section
          style={{
            paddingTop: 'calc(80px + 72px)',
            paddingBottom: 56,
            paddingLeft: 24,
            paddingRight: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Layered radial gradients */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 65% 55% at 20% 5%, rgba(198,167,111,0.06) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 80% 95%, rgba(26,62,97,0.35) 0%, transparent 70%)',
            }}
          />

          <motion.div
            style={{
              maxWidth: 680,
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Small gold badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(198,167,111,0.1)',
                  border: '1px solid rgba(198,167,111,0.38)',
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
                Takes about 2 minutes
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: 'EB Garamond, serif',
                fontSize: 'clamp(34px, 6vw, 64px)',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: '0 0 20px 0',
              }}
            >
              Find Out What You Qualify For
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
                margin: '0 auto 36px',
              }}
            >
              No commitment. No hard credit pull. Just answers from Nick — usually within the hour.
            </motion.p>

            {/* Trust badges row */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                justifyContent: 'center',
              }}
            >
              <TrustBadge label="No hard credit inquiry" />
              <TrustBadge label="100% confidential" />
              <TrustBadge label="Nick reviews personally" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── LEAD FORM (full width) ── */}
        <div style={{ flex: 1 }}>
          <LeadForm />
        </div>

        {/* ── CONTACT FALLBACK ── */}
        <motion.section
          style={{
            background: '#0F1C2E',
            padding: '72px 24px',
            borderTop: '1px solid rgba(198,167,111,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          {/* Subtle depth */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(26,62,97,0.3) 0%, transparent 70%)',
            }}
          />

          <div
            style={{
              maxWidth: 480,
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: 15,
                color: 'rgba(240,230,210,0.6)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Prefer to talk directly?
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
              <a
                href="tel:7024976370"
                className="apply-contact-link"
                style={{
                  fontFamily: 'EB Garamond, serif',
                  fontSize: 'clamp(28px, 5vw, 44px)',
                  fontWeight: 600,
                  color: '#C6A76F',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  display: 'block',
                }}
              >
                (702) 497-6370
              </a>
            </motion.div>

            <motion.div variants={fadeUp}>
              <a
                href="mailto:Nick@sunnyhillfinancial.com"
                className="apply-contact-link"
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#C6A76F',
                  display: 'block',
                }}
              >
                Nick@sunnyhillfinancial.com
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* ── COMPLIANCE FOOTER ── */}
        <motion.div
          style={{
            background: '#0F1C2E',
            padding: '24px 24px 40px',
            borderTop: '1px solid rgba(198,167,111,0.07)',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 10,
              color: '#6B7280',
              lineHeight: 1.85,
              textAlign: 'center',
              maxWidth: 780,
              margin: '0 auto',
            }}
          >
            By submitting this form you agree to be contacted by Nicholas Flores, NMLS #422150, regarding your mortgage
            inquiry. Message and data rates may apply. Variable APR ranging from 5.00%–9.00%. Not a commitment to lend.
            Minimum FICO 650. Company NMLS #1708856 Sunnyhill Financial Inc. Equal Housing Opportunity.
          </p>
        </motion.div>
      </div>
    </>
  );
}
