// FILE: src/components/LeadForm.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 17;

const CARD_OPTIONS = {
  1: [
    { id: 'purchase',        label: 'Home Purchase',     icon: '🏠' },
    { id: 'refinance',       label: 'Refinance',         icon: '🔄' },
    { id: 'va',              label: 'VA Loan',           icon: '🎖️' },
    { id: 'heloc',           label: 'HELOC/Equity',      icon: '💰' },
    { id: 'new_build',       label: 'New Build',         icon: '🏗️' },
    { id: 'first_time',      label: 'First Time Buyer',  icon: '🔑' },
    { id: 'reverse',         label: 'Reverse Mortgage',  icon: '🔃' },
    { id: 'not_sure',        label: 'Not Sure',          icon: '🤔' },
  ],
  2: [
    { id: 'yes_served',  label: 'Yes — I served',    icon: '🎖️' },
    { id: 'no_skip_va',  label: 'No — skip VA',      icon: '➡️' },
  ],
  3: [
    { id: 'single_family',   label: 'Single Family',      icon: '🏡' },
    { id: 'condo',           label: 'Condo/Townhouse',    icon: '🏢' },
    { id: 'multi_family',    label: 'Multi Family',       icon: '🏘️' },
    { id: 'investment',      label: 'Investment',         icon: '📈' },
    { id: 'vacation',        label: 'Vacation Home',      icon: '🌴' },
  ],
  4: [
    { id: '720plus',         label: '720+ Excellent',    icon: '⭐' },
    { id: '680_719',         label: '680-719 Good',      icon: '👍' },
    { id: '640_679',         label: '640-679 Fair',      icon: '👌' },
    { id: 'below_640',       label: 'Below 640',         icon: '⚠️' },
    { id: 'not_sure',        label: 'Not Sure',          icon: '🤷' },
  ],
  5: [
    { id: 'yes_first',   label: 'Yes — First Time',   icon: '🎉' },
    { id: 'no_owned',    label: 'No — Owned Before',  icon: '🏠' },
  ],
  6: [
    { id: 'just_looking',    label: 'Just starting to look',   icon: '👀' },
    { id: 'found_home',      label: 'Found a home I like',     icon: '❤️' },
    { id: 'accepted_offer',  label: 'Have accepted offer',     icon: '✅' },
    { id: 'need_to_sell',    label: 'Need to sell first',      icon: '🏷️' },
    { id: 'refinancing',     label: 'Refinancing current home',icon: '🔄' },
  ],
  7: [
    { id: 'primary',     label: 'Primary Residence',    icon: '🏠' },
    { id: 'vacation2',   label: 'Vacation/Second Home', icon: '🌊' },
    { id: 'investment2', label: 'Investment/Rental',    icon: '💼' },
  ],
  9: [
    { id: 'lt3',         label: 'Less than 3%',    icon: '💵' },
    { id: '3_5',         label: '3-5%',            icon: '💵' },
    { id: '5_10',        label: '5-10%',           icon: '💵' },
    { id: '10_20',       label: '10-20%',          icon: '💵' },
    { id: '20plus',      label: '20%+',            icon: '💪' },
    { id: 'va_zero',     label: 'VA/Zero Down',    icon: '🎖️' },
  ],
  10: [
    { id: 'fixed',       label: 'Fixed — same payment every month',  icon: '🔒' },
    { id: 'arm',         label: 'Adjustable — lower start rate',     icon: '📊' },
    { id: 'not_sure',    label: 'Not Sure — show me both',           icon: '🤔' },
  ],
  11: [
    { id: 'lt50k',   label: 'Under $50K',   icon: '💰' },
    { id: '50_75k',  label: '$50-75K',      icon: '💰' },
    { id: '75_100k', label: '$75-100K',     icon: '💰' },
    { id: '100_150k',label: '$100-150K',    icon: '💰' },
    { id: '150_200k',label: '$150-200K',    icon: '💰' },
    { id: '200kplus',label: '$200K+',       icon: '💰' },
  ],
  12: [
    { id: 'w2',      label: 'Full Time W2',          icon: '📋' },
    { id: 'self',    label: 'Self Employed/1099',     icon: '💼' },
    { id: 'retired', label: 'Retired',               icon: '🌅' },
    { id: 'military',label: 'Military/VA',            icon: '🎖️' },
    { id: 'other',   label: 'Other',                 icon: '📌' },
  ],
  13: [
    { id: 'no',          label: 'No',                           icon: '✅' },
    { id: 'bankruptcy',  label: 'Yes — Bankruptcy',             icon: '📄' },
    { id: 'foreclosure', label: 'Yes — Short Sale/Foreclosure', icon: '📄' },
  ],
  14: [
    { id: 'w2_returns',   label: 'Yes — W2s/Tax Returns',  icon: '📊' },
    { id: 'bank_stmts',   label: 'Yes — Bank Statements',  icon: '🏦' },
    { id: 'working_on_it',label: 'Working on it',           icon: '⏳' },
    { id: 'not_sure',     label: 'Not Sure',                icon: '🤷' },
  ],
  15: [
    { id: 'yes_have',    label: 'Yes — I have one',        icon: '🤝' },
    { id: 'no_need',     label: 'No — Need one',           icon: '🔍' },
    { id: 'no_dont',     label: "No — Don't need one",     icon: '👋' },
    { id: 'i_am_agent',  label: 'I am the agent',          icon: '🏢' },
  ],
  16: [
    { id: 'google',    label: 'Google',              icon: '🔍' },
    { id: 'social',    label: 'Social Media',        icon: '📱' },
    { id: 'referral',  label: 'Referral',            icon: '👥' },
    { id: 'zillow',    label: 'Zillow/Redfin',       icon: '🏡' },
    { id: 'agent',     label: 'Real Estate Agent',   icon: '🤝' },
    { id: 'other',     label: 'Other',               icon: '✨' },
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
        padding: '18px 14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transition: 'background 0.2s, border-color 0.2s',
        color: selected ? '#0F1C2E' : '#F0E6D2',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 700,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 1.3,
        outline: 'none',
        minHeight: 80,
      }}
    >
      <span style={{ fontSize: 22, lineHeight: 1 }}>{option.icon}</span>
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
      <div style={{ display: 'flex', gap: 12 }}>
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
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.07)',
            border: '2px solid rgba(198,167,111,0.4)',
            borderRadius: 10,
            padding: '14px 18px',
            fontFamily: 'Nunito, sans-serif',
            fontSize: 17,
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          onClick={onNext}
          style={{
            background: '#C6A76F',
            border: 'none',
            borderRadius: 10,
            padding: '0 22px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 800,
            fontSize: 14,
            color: '#0F1C2E',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Next →
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

  const contactFields = [
    { key: 'firstName', label: 'First Name',  type: 'text',  placeholder: 'John'           },
    { key: 'lastName',  label: 'Last Name',   type: 'text',  placeholder: 'Smith'           },
    { key: 'email',     label: 'Email',       type: 'email', placeholder: 'john@email.com'  },
    { key: 'phone',     label: 'Phone',       type: 'tel',   placeholder: '(702) 000-0000'  },
    { key: 'zip',       label: 'Zip Code',    type: 'text',  placeholder: '89101'           },
  ];

  // Determine visible step number for progress (VA step 2 is conditional)
  const isVA = answers[1] === 'va';

  const getEffectiveStep = (s) => {
    if (!isVA && s >= 2) return s - 1;
    return s;
  };

  // Real step count for progress bar
  const displayStep = isVA ? step : (step > 2 ? step - 1 : step);
  const totalDisplay = isVA ? TOTAL_STEPS : TOTAL_STEPS - 1;

  const progress = step > TOTAL_STEPS ? 100 : Math.round((displayStep / totalDisplay) * 100);

  const goNext = useCallback((overrideStep) => {
    setDirection(1);
    const next = overrideStep || step + 1;
    // Skip step 2 if not VA
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

    // Smart logic
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

  const handleSubmit = () => {
    const payload = { ...answers, purchasePrice, contact };
    console.log('Lead Form Submission:', payload);
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

  // ── Render ──

  if (submitted) {
    return (
      <div style={{
        background: '#0F1C2E',
        minHeight: compact ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Nunito, sans-serif',
      }}>
        <Confetti />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 520, position: 'relative', zIndex: 20 }}
        >
          {/* Glowing logo */}
          <motion.img
            src="/brand_assets/logo-glow.png"
            alt="Team Flores"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'min(340px, 80vw)',
              height: 'auto',
              margin: '0 auto 32px',
              display: 'block',
              filter: 'drop-shadow(0 0 32px rgba(198,167,111,0.55)) drop-shadow(0 0 60px rgba(198,167,111,0.25))',
            }}
          />
          {/* Gold Checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ marginBottom: 28 }}
          >
            <svg width="88" height="88" viewBox="0 0 88 88" style={{ margin: '0 auto', display: 'block' }}>
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

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(36px,6vw,56px)', color: '#C6A76F', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16 }}
          >
            You're All Set!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{ fontFamily: 'Nunito, sans-serif', color: '#F0E6D2', fontSize: 18, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}
          >
            Nick will be in touch shortly to review your options and answer any questions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            style={{ marginBottom: 32 }}
          >
            <a href="tel:7024976370" style={{ display: 'block', color: '#C6A76F', fontFamily: 'Nunito, sans-serif', fontSize: 17, fontWeight: 700, textDecoration: 'none', marginBottom: 6 }}>
              (702) 497-6370
            </a>
            <a href="mailto:Nick@sunnyhillfinancial.com" style={{ display: 'block', color: 'rgba(240,230,210,0.7)', fontFamily: 'Nunito, sans-serif', fontSize: 15, textDecoration: 'none' }}>
              Nick@sunnyhillfinancial.com
            </a>
          </motion.div>

          <motion.a
            href="tel:7024976370"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              background: '#C6A76F',
              color: '#0F1C2E',
              borderRadius: 12,
              padding: '16px 48px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 17,
              textDecoration: 'none',
              boxShadow: '0 8px 28px rgba(198,167,111,0.35)',
              letterSpacing: '0.03em',
            }}
          >
            Schedule a Call
          </motion.a>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
        .lead-input:focus { border-color: #C6A76F !important; box-shadow: 0 0 0 3px rgba(198,167,111,0.2); }
        .lead-slider { -webkit-appearance: none; appearance: none; height: 6px; background: transparent; outline: none; }
        .lead-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 26px; height: 26px; border-radius: 50%; background: #C6A76F; cursor: pointer; border: 3px solid #0F1C2E; box-shadow: 0 0 0 2px #C6A76F; }
        .lead-slider::-moz-range-thumb { width: 26px; height: 26px; border-radius: 50%; background: #C6A76F; cursor: pointer; border: 3px solid #0F1C2E; }
      `}</style>

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
          <div style={{ height: 4, background: 'rgba(198,167,111,0.15)' }}>
            <motion.div
              style={{ height: '100%', background: '#C6A76F', borderRadius: '0 2px 2px 0' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#C6A76F', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em' }}>
                Step {step > TOTAL_STEPS ? TOTAL_STEPS : displayStep} / {totalDisplay}
              </span>
            </div>
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
              <p style={{ color: '#F0E6D2', fontSize: 14, lineHeight: 1.6 }}>
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
              <div style={{ background: '#1A3E61', border: '2px solid #C6A76F', borderRadius: 20, padding: '40px 32px', textAlign: 'center', maxWidth: 400 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🇺🇸</div>
                <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Thank you for your service!</h3>
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
              <div style={{ background: '#1A3E61', border: '2px solid #C6A76F', borderRadius: 20, padding: '40px 32px', textAlign: 'center', maxWidth: 420 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💪</div>
                <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 26, fontWeight: 600, marginBottom: 12 }}>You're in the right place.</h3>
                <p style={{ color: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
                  Nick specializes in credit rebuilds and has helped many clients in your situation get approved. Let's keep going!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', position: 'relative', zIndex: 5 }}>
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
                {step <= TOTAL_STEPS && step !== 17 && (
                  <h2 style={{
                    fontFamily: 'EB Garamond, serif',
                    color: '#fff',
                    fontSize: 'clamp(22px,3.5vw,36px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    marginBottom: 32,
                    lineHeight: 1.25,
                  }}>
                    {STEP_QUESTIONS[step]}
                  </h2>
                )}

                {/* ── Steps with Card Options ── */}
                {[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16].includes(step) && CARD_OPTIONS[step] && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cardGridCols(step)}, 1fr)`,
                    gap: 12,
                  }}>
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
                    <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 32 }}>
                      {STEP_QUESTIONS[8]}
                    </h2>
                    <div style={{
                      fontFamily: 'EB Garamond, serif',
                      fontSize: 'clamp(40px,8vw,72px)',
                      color: '#C6A76F',
                      fontWeight: 600,
                      marginBottom: 32,
                      letterSpacing: '-0.02em',
                    }}>
                      {fmt(purchasePrice)}
                    </div>
                    <div style={{ position: 'relative', padding: '0 8px', marginBottom: 40 }}>
                      <div style={{
                        position: 'absolute', top: '50%', left: 8, right: 8, height: 6,
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(240,230,210,0.4)', fontSize: 12, fontFamily: 'Nunito, sans-serif', marginBottom: 32 }}>
                      <span>$100K</span>
                      <span>$1M</span>
                      <span>$2M</span>
                    </div>
                  </div>
                )}

                {/* ── Step 17: Contact Fields ── */}
                {step === 17 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>
                      {STEP_QUESTIONS[17]}
                    </h2>
                    <p style={{ color: 'rgba(240,230,210,0.6)', fontSize: 14, marginBottom: 32 }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', position: 'relative', zIndex: 5, borderTop: '1px solid rgba(198,167,111,0.1)' }}>
            <button
              onClick={goBack}
              disabled={step === 1}
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(198,167,111,0.3)',
                color: step === 1 ? 'rgba(198,167,111,0.2)' : 'rgba(240,230,210,0.7)',
                borderRadius: 9,
                padding: '11px 28px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                cursor: step === 1 ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              ← Back
            </button>

            {/* Skip / Next — only show for non-card steps or step 8/17 */}
            {(step === 8 || (step === 17 && false)) && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => step === 8 ? goNext() : handleContactNext()}
                style={{
                  background: '#C6A76F',
                  border: 'none',
                  color: '#0F1C2E',
                  borderRadius: 9,
                  padding: '11px 36px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(198,167,111,0.3)',
                  letterSpacing: '0.03em',
                }}
              >
                {step === TOTAL_STEPS ? 'Submit' : 'Next →'}
              </motion.button>
            )}

            {step === 8 && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => goNext()}
                style={{
                  background: '#C6A76F',
                  border: 'none',
                  color: '#0F1C2E',
                  borderRadius: 9,
                  padding: '11px 36px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(198,167,111,0.3)',
                  letterSpacing: '0.03em',
                }}
              >
                Next →
              </motion.button>
            )}

            {/* Skip button for optional steps */}
            {[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16].includes(step) && (
              <button
                onClick={() => goNext()}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(198,167,111,0.45)',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: '8px 12px',
                }}
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
