// FILE: src/components/LeadForm.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 17;

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwzNnNPtDSthbM9_qz_h7aaDjwLjlOsFJhy4SWdTNgGHcVttjOuZAwHle8JRyu5hsGaHA/exec';

const CARD_OPTIONS = {
  1: [
    { id: 'purchase',        label: 'Home Purchase'       },
    { id: 'refinance',       label: 'Refinance'           },
    { id: 'va',              label: 'VA Loan'             },
    { id: 'heloc',           label: 'HELOC / Equity'      },
    { id: 'new_build',       label: 'New Build'           },
    { id: 'first_time',      label: 'First Time Buyer'    },
    { id: 'reverse',         label: 'Reverse Mortgage'    },
    { id: 'not_sure',        label: 'Not Sure'            },
  ],
  2: [
    { id: 'yes_served',  label: 'Yes — I served'   },
    { id: 'no_skip_va',  label: 'No — Skip VA'     },
  ],
  3: [
    { id: 'single_family',   label: 'Single Family'    },
    { id: 'condo',           label: 'Condo / Townhouse' },
    { id: 'multi_family',    label: 'Multi Family'      },
    { id: 'investment',      label: 'Investment'        },
    { id: 'vacation',        label: 'Vacation Home'     },
  ],
  4: [
    { id: '720plus',         label: '720+  Excellent' },
    { id: '680_719',         label: '680–719  Good'   },
    { id: '640_679',         label: '640–679  Fair'   },
    { id: 'below_640',       label: 'Below 640'       },
    { id: 'not_sure',        label: 'Not Sure'        },
  ],
  5: [
    { id: 'yes_first',   label: 'Yes — First Time'   },
    { id: 'no_owned',    label: 'No — Owned Before'  },
  ],
  6: [
    { id: 'just_looking',    label: 'Just starting to look'    },
    { id: 'found_home',      label: 'Found a home I like'      },
    { id: 'accepted_offer',  label: 'Have accepted offer'      },
    { id: 'need_to_sell',    label: 'Need to sell first'       },
    { id: 'refinancing',     label: 'Refinancing current home' },
  ],
  7: [
    { id: 'primary',     label: 'Primary Residence'    },
    { id: 'vacation2',   label: 'Vacation / Second Home'},
    { id: 'investment2', label: 'Investment / Rental'  },
  ],
  9: [
    { id: 'lt3',         label: 'Less than 3%'  },
    { id: '3_5',         label: '3–5%'          },
    { id: '5_10',        label: '5–10%'         },
    { id: '10_20',       label: '10–20%'        },
    { id: '20plus',      label: '20%+'          },
    { id: 'va_zero',     label: 'VA / Zero Down'},
  ],
  10: [
    { id: 'fixed',       label: 'Fixed — same payment every month'  },
    { id: 'arm',         label: 'Adjustable — lower start rate'     },
    { id: 'not_sure',    label: 'Not Sure — show me both'           },
  ],
  11: [
    { id: 'lt50k',    label: 'Under $50K'  },
    { id: '50_75k',   label: '$50–75K'     },
    { id: '75_100k',  label: '$75–100K'    },
    { id: '100_150k', label: '$100–150K'   },
    { id: '150_200k', label: '$150–200K'   },
    { id: '200kplus', label: '$200K+'      },
  ],
  12: [
    { id: 'w2',      label: 'Full Time W2'       },
    { id: 'self',    label: 'Self Employed / 1099'},
    { id: 'retired', label: 'Retired'             },
    { id: 'military',label: 'Military / VA'       },
    { id: 'other',   label: 'Other'               },
  ],
  13: [
    { id: 'no',          label: 'No'                           },
    { id: 'bankruptcy',  label: 'Yes — Bankruptcy'             },
    { id: 'foreclosure', label: 'Yes — Short Sale / Foreclosure'},
  ],
  14: [
    { id: 'w2_returns',    label: 'Yes — W2s / Tax Returns' },
    { id: 'bank_stmts',    label: 'Yes — Bank Statements'   },
    { id: 'working_on_it', label: 'Working on it'           },
    { id: 'not_sure',      label: 'Not Sure'                },
  ],
  15: [
    { id: 'yes_have',   label: 'Yes — I have one'     },
    { id: 'no_need',    label: 'No — Need one'        },
    { id: 'no_dont',    label: "No — Don't need one"  },
    { id: 'i_am_agent', label: 'I am the agent'       },
  ],
  16: [
    { id: 'google',   label: 'Google'             },
    { id: 'social',   label: 'Social Media'       },
    { id: 'referral', label: 'Referral'           },
    { id: 'zillow',   label: 'Zillow / Redfin'   },
    { id: 'agent',    label: 'Real Estate Agent'  },
    { id: 'other',    label: 'Other'              },
  ],
};

const STEP_QUESTIONS = {
  1:  'What type of loan do you need?',
  2:  'Are you a veteran or active military?',
  3:  'What type of property?',
  4:  'What is your estimated credit score?',
  5:  'Is this your first time buying a home?',
  6:  'What is your current purchase situation?',
  7:  'How will the property be used?',
  8:  'What is your estimated purchase price?',
  9:  'How much are you planning to put down?',
  10: 'What type of rate do you prefer?',
  11: 'What is your gross annual household income?',
  12: 'What is your employment status?',
  13: 'Any bankruptcy or foreclosure in the last 3 years?',
  14: 'Can you show proof of income?',
  15: 'Are you working with a real estate agent?',
  16: 'How did you hear about us?',
  17: "Last step — let's get your info!",
};

const fmt = (v) => {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(2)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
  return `$${v}`;
};

const formatPhone = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
};

// ─── Gold Spinner ──────────────────────────────────────────────────────────────

function GoldSpinner() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,28,46,0.95)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 300, gap: 20,
    }}>
      <style>{`@keyframes lead-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 56, height: 56,
        border: '4px solid rgba(198,167,111,0.2)',
        borderTopColor: '#C6A76F',
        borderRadius: '50%',
        animation: 'lead-spin 0.8s linear infinite',
      }} />
      <p style={{
        fontFamily: 'Nunito, sans-serif',
        color: '#C6A76F',
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}>Submitting your information...</p>
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function Confetti() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#C6A76F', '#1A3E61', '#F0E6D2', '#fff', '#C6A76F', '#C6A76F'];
    const particles = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
        alpha: 1,
        isRect: Math.random() > 0.4,
      };
    });

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        if (frame > 30) p.alpha -= 0.012;
        if (p.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.isRect) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (particles.some((p) => p.alpha > 0)) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
    />
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────

function OptionCard({ option, selected, onSelect }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(option.id)}
      style={{
        background: selected ? '#C6A76F' : 'rgba(26,62,97,0.6)',
        border: `2px solid ${selected ? '#C6A76F' : 'rgba(198,167,111,0.3)'}`,
        borderRadius: 12,
        padding: '16px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        transition: 'background 0.2s, border-color 0.2s',
        color: selected ? '#0F1C2E' : '#F0E6D2',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 700,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 1.3,
        outline: 'none',
        minHeight: 64,
        width: '100%',
      }}
    >
      <span>{option.label}</span>
    </motion.button>
  );
}

// ─── Contact Field ────────────────────────────────────────────────────────────

function ContactField({ label, type, value, onChange, onNext, placeholder }) {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: 440, margin: '0 auto' }}
    >
      <label style={{ display: 'block', fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        {label}
      </label>
      <div className="contact-field-row">
        <input
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const v = type === 'tel' ? formatPhone(e.target.value) : e.target.value;
            onChange(v);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') onNext(); }}
          className="lead-input contact-input"
          style={{
            flex: '1 1 200px',
            minWidth: 0,
            background: 'rgba(255,255,255,0.07)',
            border: '2px solid rgba(198,167,111,0.4)',
            borderRadius: 10,
            padding: '14px 18px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 16,
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          onClick={onNext}
          style={{
            flex: '0 0 auto',
            background: '#C6A76F',
            border: 'none',
            borderRadius: 10,
            padding: '0 22px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 800,
            fontSize: 16,
            color: '#0F1C2E',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            minHeight: 52,
          }}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LeadForm({ compact = false }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [purchasePrice, setPurchasePrice] = useState(450000);
  const [showHeloc, setShowHeloc] = useState(false);
  const [showVaMsg, setShowVaMsg] = useState(false);
  const [showCreditMsg, setShowCreditMsg] = useState(false);
  const [contactSubStep, setContactSubStep] = useState(0);
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '', zip: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const contactFields = [
    { key: 'firstName', label: 'First Name',  type: 'text',  placeholder: 'John'           },
    { key: 'lastName',  label: 'Last Name',   type: 'text',  placeholder: 'Smith'           },
    { key: 'email',     label: 'Email',       type: 'email', placeholder: 'john@email.com'  },
    { key: 'phone',     label: 'Phone',       type: 'tel',   placeholder: '(702) 000-0000'  },
    { key: 'zip',       label: 'Zip Code',    type: 'text',  placeholder: '89101'           },
  ];

  const isVA = answers[1] === 'va';

  const displayStep = isVA ? step : (step > 2 ? step - 1 : step);
  const totalDisplay = isVA ? TOTAL_STEPS : TOTAL_STEPS - 1;

  const progress = step > TOTAL_STEPS ? 100 : Math.round((displayStep / totalDisplay) * 100);

  const goNext = useCallback((overrideStep) => {
    setDirection(1);
    const next = overrideStep || step + 1;
    if (next === 2 && !isVA) {
      setStep(3);
    } else {
      setStep(Math.min(next, TOTAL_STEPS + 1));
    }
  }, [step, isVA]);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (step === 17 && contactSubStep > 0) {
      setContactSubStep((s) => s - 1);
      return;
    }
    const prev = step - 1;
    if (prev === 2 && !isVA) setStep(1);
    else setStep(Math.max(1, prev));
  }, [step, isVA, contactSubStep]);

  const handleCardSelect = (stepNum, value) => {
    setAnswers((prev) => ({ ...prev, [stepNum]: value }));

    if (stepNum === 1) {
      if (value === 'heloc') setShowHeloc(true);
      if (value === 'va') setShowVaMsg(true);
    }
    if (stepNum === 4 && value === 'below_640') {
      setShowCreditMsg(true);
      setTimeout(() => { setShowCreditMsg(false); goNext(); }, 3500);
      return;
    }
    if (stepNum === 1 && value === 'va') {
      setTimeout(() => { setShowVaMsg(false); goNext(); }, 2500);
      return;
    }

    setTimeout(() => goNext(), 300);
  };

  const handleContactNext = () => {
    if (contactSubStep < contactFields.length - 1) {
      setContactSubStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      zipCode: contact.zip,
      loanType: answers[1],
      veteranStatus: answers[2],
      propertyType: answers[3],
      creditScore: answers[4],
      firstTimeBuyer: answers[5],
      purchaseSituation: answers[6],
      propertyUse: answers[7],
      purchasePrice: purchasePrice,
      downPayment: answers[9],
      rateType: answers[10],
      annualIncome: answers[11],
      employmentStatus: answers[12],
      bankruptcyHistory: answers[13],
      proofOfIncome: answers[14],
      realEstateAgent: answers[15],
      howDidYouHear: answers[16],
      browser: navigator.userAgent,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      // no-cors mode swallows the response — treat as success
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const slideTransition = { duration: 0.38, ease: [0.16, 1, 0.3, 1] };

  const cardGridCols = (stepNum) => {
    const opts = CARD_OPTIONS[stepNum];
    if (!opts) return 2;
    if (opts.length <= 2) return 2;
    if (opts.length <= 3) return 3;
    if (opts.length === 5) return 3;
    if (opts.length === 6) return 3;
    return 4;
  };

  // ── Thank You Screen ──

  if (submitted) {
    return (
      <div style={{
        background: '#0F1C2E',
        minHeight: compact ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Nunito, sans-serif',
      }}>
        <Confetti />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: 540,
            width: '100%',
            position: 'relative',
            zIndex: 20,
          }}
        >
          {/* Logo */}
          <motion.img
            src="/brand_assets/logo-glow.png"
            alt="Team Flores"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'min(300px, 75vw)',
              height: 'auto',
              margin: '0 auto 28px',
              display: 'block',
              filter: 'drop-shadow(0 0 32px rgba(198,167,111,0.55)) drop-shadow(0 0 60px rgba(198,167,111,0.25))',
            }}
          />

          {/* Animated Checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ marginBottom: 24 }}
          >
            <svg width="72" height="72" viewBox="0 0 88 88" style={{ margin: '0 auto', display: 'block' }}>
              <circle cx="44" cy="44" r="42" fill="#C6A76F" fillOpacity="0.15" stroke="#C6A76F" strokeWidth="2.5" />
              <motion.path
                d="M 22 44 L 38 60 L 66 28"
                stroke="#C6A76F"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.55, duration: 0.55, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              fontFamily: 'EB Garamond, serif',
              fontSize: 'clamp(28px, 6vw, 48px)',
              color: '#C6A76F',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Thank you, {contact.firstName || 'there'}!
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{
              fontFamily: 'Nunito, sans-serif',
              color: '#F0E6D2',
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 8,
              opacity: 0.9,
            }}
          >
            Nick will personally review your information and be in touch shortly.
          </motion.p>

          {contact.email && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              style={{
                fontFamily: 'Nunito, sans-serif',
                color: 'rgba(240,230,210,0.65)',
                fontSize: 15,
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              You will also receive a confirmation email at <strong style={{ color: 'rgba(198,167,111,0.8)' }}>{contact.email}</strong>.
            </motion.p>
          )}

          {/* Gold Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              height: 1,
              background: 'linear-gradient(to right, transparent, #C6A76F, transparent)',
              marginBottom: 24,
            }}
          />

          {/* Reach Nick */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            style={{ marginBottom: 28 }}
          >
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              color: 'rgba(198,167,111,0.6)',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}>
              Reach Nick directly
            </p>
            <a href="tel:7024976370" style={{ display: 'block', color: '#C6A76F', fontFamily: 'Nunito, sans-serif', fontSize: 18, fontWeight: 700, textDecoration: 'none', marginBottom: 6 }}>
              (702) 497-6370
            </a>
            <a href="mailto:Nick@sunnyhillfinancial.com" style={{ display: 'block', color: 'rgba(240,230,210,0.65)', fontFamily: 'Nunito, sans-serif', fontSize: 15, textDecoration: 'none' }}>
              Nick@sunnyhillfinancial.com
            </a>
          </motion.div>

          {/* Schedule a Call Button */}
          <motion.a
            href="tel:7024976370"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'block',
              background: '#C6A76F',
              color: '#0F1C2E',
              borderRadius: 12,
              padding: '16px 32px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 17,
              textDecoration: 'none',
              boxShadow: '0 8px 28px rgba(198,167,111,0.35)',
              letterSpacing: '0.03em',
              marginBottom: 32,
            }}
          >
            Schedule a Call with Nick
          </motion.a>

          {/* Motto */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            style={{
              fontFamily: 'EB Garamond, serif',
              fontStyle: 'italic',
              color: '#C6A76F',
              fontSize: 'clamp(16px, 3vw, 20px)',
              lineHeight: 1.5,
              marginBottom: 20,
              opacity: 0.85,
            }}
          >
            "You can't have a positive life with a negative mind."
          </motion.p>

          {/* Name / Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.4 }}
          >
            <p style={{ fontFamily: 'EB Garamond, serif', color: 'rgba(240,230,210,0.8)', fontSize: 16, fontWeight: 600, marginBottom: 2 }}>
              Nicholas Flores
            </p>
            <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(198,167,111,0.55)', fontSize: 12, letterSpacing: '0.04em' }}>
              Division Director | Sunnyhill Financial
            </p>
            <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(198,167,111,0.45)', fontSize: 11, marginTop: 4, letterSpacing: '0.04em' }}>
              NMLS #422150 | Equal Housing Opportunity
            </p>
          </motion.div>

        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

        .lead-input:focus { border-color: #C6A76F !important; box-shadow: 0 0 0 3px rgba(198,167,111,0.2); }

        .lead-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: transparent;
          outline: none;
          width: 100%;
          touch-action: none;
        }
        .lead-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #C6A76F;
          cursor: pointer;
          border: 3px solid #0F1C2E;
          box-shadow: 0 0 0 2px #C6A76F;
        }
        .lead-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #C6A76F;
          cursor: pointer;
          border: 3px solid #0F1C2E;
        }

        /* Card grid — 2 cols on mobile */
        .lead-card-grid {
          display: grid;
          gap: 12px;
        }
        @media (max-width: 520px) {
          .lead-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Contact field row — stack on mobile */
        .contact-field-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .contact-input {
          min-width: 0;
          flex: 1 1 200px;
        }

        /* Nav buttons — full width on mobile */
        .lead-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 16px;
          gap: 10px;
          border-top: 1px solid rgba(198,167,111,0.1);
          position: relative;
          z-index: 5;
        }
        .lead-nav-back {
          background: transparent;
          border: 1.5px solid rgba(198,167,111,0.3);
          border-radius: 9px;
          padding: 14px 28px;
          font-family: Nunito, sans-serif;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          min-height: 52px;
          white-space: nowrap;
        }
        .lead-nav-next {
          background: #C6A76F;
          border: none;
          color: #0F1C2E;
          border-radius: 9px;
          padding: 14px 36px;
          font-family: Nunito, sans-serif;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(198,167,111,0.3);
          letter-spacing: 0.03em;
          min-height: 52px;
          white-space: nowrap;
        }
        .lead-nav-skip {
          background: transparent;
          border: none;
          color: rgba(198,167,111,0.45);
          font-family: Nunito, sans-serif;
          font-size: 14px;
          cursor: pointer;
          padding: 10px 12px;
          min-height: 44px;
        }
        @media (max-width: 480px) {
          .lead-nav {
            flex-direction: column;
            gap: 8px;
          }
          .lead-nav-back,
          .lead-nav-next {
            width: 100%;
            text-align: center;
          }
          .lead-nav-skip {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {submitting && <GoldSpinner />}

      <div style={{
        background: '#0F1C2E',
        minHeight: compact ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Background radial gradients */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(198,167,111,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(26,62,97,0.4) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        {/* Progress Bar */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ height: 4, background: 'rgba(198,167,111,0.15)', width: '100%' }}>
            <motion.div
              style={{ height: '100%', background: '#C6A76F', borderRadius: '0 2px 2px 0' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
            <span style={{ color: '#C6A76F', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em' }}>
              Step {step > TOTAL_STEPS ? TOTAL_STEPS : displayStep} / {totalDisplay}
            </span>
            <span style={{ color: 'rgba(198,167,111,0.5)', fontSize: 12 }}>{progress}% complete</span>
          </div>
        </div>

        {/* Toast Messages */}
        <AnimatePresence>
          {showHeloc && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              style={{
                position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
                background: '#1A3E61', border: '1.5px solid #C6A76F', borderRadius: 12,
                padding: '16px 24px', zIndex: 100, maxWidth: 500, width: '90%',
                boxShadow: '0 12px 40px rgba(15,28,46,0.6)',
              }}
            >
              <button onClick={() => setShowHeloc(false)} style={{ position: 'absolute', top: 10, right: 14, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>×</button>
              <p style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                Did you know?
              </p>
              <p style={{ color: '#F0E6D2', fontSize: 15, lineHeight: 1.6 }}>
                EquitySelect can unlock up to <strong style={{ color: '#C6A76F' }}>506% more equity</strong> than a bank HELOC. Let's find out how much you qualify for.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showVaMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(15,28,46,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 200, padding: 24,
              }}
            >
              <div style={{ background: '#1A3E61', border: '2px solid #C6A76F', borderRadius: 20, padding: '40px 32px', textAlign: 'center', maxWidth: 400, width: '100%' }}>
                {/* Shield SVG */}
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <path d="M26 4L8 12v14c0 10.8 7.7 20.9 18 23.6C36.3 46.9 44 36.8 44 26V12L26 4z" fill="rgba(198,167,111,0.15)" stroke="#C6A76F" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M19 26l5 5 9-10" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 26, fontWeight: 600, marginBottom: 12 }}>
                  Thank you for your service!
                </h3>
                <p style={{ color: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
                  We are honored to help veterans and active military members achieve homeownership with VA loan benefits.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCreditMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(15,28,46,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 200, padding: 24,
              }}
            >
              <div style={{ background: '#1A3E61', border: '2px solid #C6A76F', borderRadius: 20, padding: '40px 32px', textAlign: 'center', maxWidth: 420, width: '100%' }}>
                {/* Star SVG */}
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <circle cx="26" cy="26" r="24" fill="rgba(198,167,111,0.1)" stroke="#C6A76F" strokeWidth="1.5"/>
                  <path d="M26 14l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" fill="rgba(198,167,111,0.3)" stroke="#C6A76F" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                  You are in the right place.
                </h3>
                <p style={{ color: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
                  Nick specializes in credit rebuilds and has helped many clients in your situation get approved. Let's keep going!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(24px, 4vw, 40px) clamp(12px, 4vw, 20px)',
          position: 'relative',
          zIndex: 5,
        }}>
          <div style={{ width: '100%', maxWidth: 680 }}>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step === 17 ? `17-${contactSubStep}` : step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
              >
                {/* Step Question */}
                {step <= TOTAL_STEPS && step !== 17 && step !== 8 && (
                  <h2 style={{
                    fontFamily: 'EB Garamond, serif',
                    color: '#fff',
                    fontSize: 'clamp(20px, 4vw, 36px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    marginBottom: 28,
                    lineHeight: 1.25,
                  }}>
                    {STEP_QUESTIONS[step]}
                  </h2>
                )}

                {/* ── Steps with Card Options ── */}
                {[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16].includes(step) && CARD_OPTIONS[step] && (
                  <div
                    className="lead-card-grid"
                    style={{ gridTemplateColumns: `repeat(${cardGridCols(step)}, 1fr)` }}
                  >
                    {CARD_OPTIONS[step].map((opt) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        selected={answers[step] === opt.id}
                        onSelect={(val) => handleCardSelect(step, val)}
                      />
                    ))}
                  </div>
                )}

                {/* ── Step 8: Price Slider ── */}
                {step === 8 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 28 }}>
                      {STEP_QUESTIONS[8]}
                    </h2>
                    <div style={{
                      fontFamily: 'EB Garamond, serif',
                      fontSize: 'clamp(36px, 8vw, 72px)',
                      color: '#C6A76F',
                      fontWeight: 600,
                      marginBottom: 32,
                      letterSpacing: '-0.02em',
                    }}>
                      {fmt(purchasePrice)}
                    </div>
                    <div style={{ position: 'relative', padding: '0 4px', marginBottom: 32 }}>
                      <div style={{
                        position: 'absolute', top: '50%', left: 4, right: 4, height: 6,
                        background: `linear-gradient(to right, #C6A76F ${((purchasePrice - 100000) / 1900000) * 100}%, rgba(198,167,111,0.2) 0%)`,
                        borderRadius: 3,
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }} />
                      <input
                        type="range"
                        className="lead-slider"
                        min={100000}
                        max={2000000}
                        step={5000}
                        value={purchasePrice}
                        onChange={(e) => {
                          setPurchasePrice(Number(e.target.value));
                          setAnswers((prev) => ({ ...prev, 8: Number(e.target.value) }));
                        }}
                        style={{ width: '100%', position: 'relative', zIndex: 2 }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(240,230,210,0.4)', fontSize: 13, fontFamily: 'Nunito, sans-serif', marginBottom: 24 }}>
                      <span>$100K</span>
                      <span>$1M</span>
                      <span>$2M</span>
                    </div>
                  </div>
                )}

                {/* ── Step 17: Contact Fields ── */}
                {step === 17 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>
                      {STEP_QUESTIONS[17]}
                    </h2>
                    <p style={{ color: 'rgba(240,230,210,0.6)', fontSize: 14, marginBottom: 28 }}>
                      Field {contactSubStep + 1} of {contactFields.length}
                    </p>
                    <ContactField
                      label={contactFields[contactSubStep].label}
                      type={contactFields[contactSubStep].type}
                      placeholder={contactFields[contactSubStep].placeholder}
                      value={contact[contactFields[contactSubStep].key]}
                      onChange={(val) => setContact((prev) => ({ ...prev, [contactFields[contactSubStep].key]: val }))}
                      onNext={handleContactNext}
                    />
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Navigation Buttons */}
        {step <= TOTAL_STEPS && !showVaMsg && !showCreditMsg && (
          <div className="lead-nav">
            <button
              onClick={goBack}
              disabled={step === 1}
              className="lead-nav-back"
              style={{
                color: step === 1 ? 'rgba(198,167,111,0.2)' : 'rgba(240,230,210,0.7)',
                borderColor: step === 1 ? 'rgba(198,167,111,0.1)' : 'rgba(198,167,111,0.3)',
                cursor: step === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              Back
            </button>

            {step === 8 && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goNext()}
                className="lead-nav-next"
              >
                Next
              </motion.button>
            )}

            {[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16].includes(step) && (
              <button
                onClick={() => goNext()}
                className="lead-nav-skip"
              >
                Skip
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
