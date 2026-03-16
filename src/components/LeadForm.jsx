// FILE: src/components/LeadForm.jsx
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 18;

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwzNnNPtDSthbM9_qz_h7aaDjwLjlOsFJhy4SWdTNgGHcVttjOuZAwHle8JRyu5hsGaHA/exec';

const STORAGE_KEY = 'teamflores_leadform';

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ─── Card Options ─────────────────────────────────────────────────────────────

const CARD_OPTIONS = {
  2: [
    { id: 'purchase',    label: 'Home Purchase'    },
    { id: 'refinance',   label: 'Home Refinance'   },
    { id: 'va',          label: 'VA Loan'          },
    { id: 'heloc',       label: 'HELOC / Equity'   },
    { id: 'new_build',   label: 'New Build'        },
    { id: 'conv_hybrid', label: 'Conv Hybrid'      },
    { id: 'reverse',     label: 'Reverse Mortgage' },
    { id: 'not_sure',    label: 'Not Sure'         },
  ],
  3: [
    { id: 'yes', label: 'Yes' },
    { id: 'no',  label: 'No'  },
  ],
  4: [
    { id: 'single_family', label: 'Single Family Home'  },
    { id: 'condo',         label: 'Condominium'         },
    { id: 'townhome',      label: 'Townhome'            },
    { id: 'multi_family',  label: 'Multi-Family Home'   },
    { id: 'investment',    label: 'Investment Property' },
    { id: 'vacation',      label: 'Vacation Home'       },
  ],
  5: [
    { id: 'excellent', label: 'Excellent 740+' },
    { id: 'good',      label: 'Good 700–739'   },
    { id: 'average',   label: 'Average 660–699'},
    { id: 'fair',      label: 'Fair 600–659'   },
    { id: 'poor',      label: 'Poor Below 600' },
  ],
  6: [
    { id: 'yes', label: 'Yes' },
    { id: 'no',  label: 'No'  },
  ],
  7: [
    { id: 'signed_agreement',  label: 'Signed a Purchase Agreement'    },
    { id: 'offer_pending',     label: 'Offer Pending / Found Property' },
    { id: 'buying_2_6_months', label: 'Buying in 2–6 Months'          },
    { id: 'researching',       label: 'Researching Options'            },
  ],
  8: [
    { id: 'primary',   label: 'Primary Home'    },
    { id: 'secondary', label: 'Secondary Home'  },
    { id: 'rental',    label: 'Rental Property' },
  ],
  9: [
    { id: 'under_100k', label: 'Under $100,000'         },
    { id: '100_150k',   label: '$100,001 to $150,000'   },
    { id: '150_200k',   label: '$150,001 to $200,000'   },
    { id: '200_250k',   label: '$200,001 to $250,000'   },
    { id: '250_300k',   label: '$250,001 to $300,000'   },
    { id: '300_350k',   label: '$300,001 to $350,000'   },
    { id: '350_400k',   label: '$350,001 to $400,000'   },
    { id: '400_450k',   label: '$400,001 to $450,000'   },
    { id: '450_500k',   label: '$450,001 to $500,000'   },
    { id: '500_600k',   label: '$500,001 to $600,000'   },
    { id: '600_700k',   label: '$600,001 to $700,000'   },
    { id: '700_800k',   label: '$700,001 to $800,000'   },
    { id: '800k_1m',    label: '$800,001 to $1,000,000' },
    { id: 'over_1m',    label: 'Over $1,000,000'        },
  ],
  10: [
    { id: 'va_zero',  label: '0% Down (VA / Zero Down)' },
    { id: '3pct',     label: '3% Down'                  },
    { id: '3_5pct',   label: '3.5% Down'                },
    { id: '5pct',     label: '5% Down'                  },
    { id: '10pct',    label: '10% Down'                 },
    { id: '15pct',    label: '15% Down'                 },
    { id: '20pct',    label: '20% Down'                 },
    { id: '20plus',   label: '20%+ Down'                },
  ],
  11: [
    { id: 'fixed',     label: 'Fixed'     },
    { id: 'adjustable',label: 'Adjustable'},
    { id: 'not_sure',  label: 'Not Sure'  },
  ],
  12: [
    { id: 'under_25k', label: 'Under $25,000'         },
    { id: '25_50k',    label: '$25,001 to $50,000'    },
    { id: '50_75k',    label: '$50,001 to $75,000'    },
    { id: '75_100k',   label: '$75,001 to $100,000'   },
    { id: '100_125k',  label: '$100,001 to $125,000'  },
    { id: '125_150k',  label: '$125,001 to $150,000'  },
    { id: '150_200k',  label: '$150,001 to $200,000'  },
    { id: 'over_200k', label: 'Over $200,000'         },
  ],
  13: [
    { id: 'employed',      label: 'Employed'      },
    { id: 'not_employed',  label: 'Not Employed'  },
    { id: 'self_employed', label: 'Self Employed' },
    { id: 'military',      label: 'Military'      },
    { id: 'other',         label: 'Other'         },
  ],
  14: [
    { id: 'yes', label: 'Yes' },
    { id: 'no',  label: 'No'  },
  ],
  15: [
    { id: 'yes', label: 'Yes' },
    { id: 'no',  label: 'No'  },
  ],
  16: [
    { id: 'yes', label: 'Yes' },
    { id: 'no',  label: 'No'  },
  ],
  17: [
    { id: 'bankrate',      label: 'Bankrate'                       },
    { id: 'zillow',        label: 'Zillow'                         },
    { id: 'other_website', label: 'Other Website'                  },
    { id: 'realtor_ref',   label: 'Realtor Referral'               },
    { id: 'past_client',   label: 'Sunnyhill Past Client Referral' },
    { id: 'google',        label: 'Google'                         },
    { id: 'social',        label: 'Social Media'                   },
    { id: 'other',         label: 'Other'                          },
  ],
};

// ─── Step Questions ───────────────────────────────────────────────────────────

const STEP_QUESTIONS = {
  1:  'What is your zip code?',
  2:  'What type of loan do you need?',
  3:  'Are you looking for a VA loan?',
  4:  'Great! What type of property are you purchasing?',
  5:  'Estimate your credit score.',
  6:  'Is this your first property purchase?',
  7:  'What is your current property purchase situation?',
  8:  'How will this property be used?',
  9:  'What is the purchase price of the new property?',
  10: 'What is your estimated down payment?',
  11: 'What kind of rate do you prefer?',
  12: 'What is your gross annual household income?',
  13: 'What is your employment status?',
  14: 'Bankruptcy, short sale, or foreclosure in the last 3 years?',
  15: 'Can you show proof of income?',
  16: 'Are you working with a real estate agent?',
  17: 'How did you hear about us?',
  18: "Last step — let's get your info!",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
      <p style={{ fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontSize: 16, fontWeight: 600, letterSpacing: '0.04em' }}>
        Submitting your information...
      </p>
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function Confetti() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const startAnim = useCallback((node) => {
    if (!node) return;
    canvasRef.current = node;
    const canvas = node;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ['#C6A76F', '#1A3E61', '#F0E6D2', '#fff', '#C6A76F', '#C6A76F'];
    const particles = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 6;
      return {
        x: canvas.width / 2, y: canvas.height / 2,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360, rotationSpeed: (Math.random() - 0.5) * 6,
        alpha: 1, isRect: Math.random() > 0.4,
      };
    });

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        if (frame > 30) p.alpha -= 0.012;
        if (p.alpha <= 0) return;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        if (p.isRect) { ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2); }
        else { ctx.beginPath(); ctx.arc(0, 0, p.size/2, 0, Math.PI*2); ctx.fill(); }
        ctx.restore();
      });
      if (particles.some((p) => p.alpha > 0)) animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <canvas ref={startAnim} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }} />
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
        borderRadius: 12, padding: '16px 12px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s, border-color 0.2s',
        color: selected ? '#0F1C2E' : '#F0E6D2',
        fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15,
        textAlign: 'center', lineHeight: 1.3, outline: 'none', minHeight: 64, width: '100%',
      }}
    >
      <span>{option.label}</span>
    </motion.button>
  );
}

// ─── Contact Field ────────────────────────────────────────────────────────────

function ContactField({ label, type, value, onChange, onNext, placeholder }) {
  const inputRef = useRef(null);
  // Focus on mount without scrolling the page
  const setRef = useCallback((node) => {
    inputRef.current = node;
    if (node) node.focus({ preventScroll: true });
  }, []);

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
          ref={setRef}
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
            flex: '1 1 200px', minWidth: 0,
            background: 'rgba(255,255,255,0.07)',
            border: '2px solid rgba(198,167,111,0.4)',
            borderRadius: 10, padding: '14px 18px',
            fontFamily: 'Nunito, sans-serif', fontSize: 16, color: '#fff', outline: 'none',
          }}
        />
        <button
          onClick={onNext}
          style={{
            flex: '0 0 auto', background: '#C6A76F', border: 'none', borderRadius: 10,
            padding: '0 22px', fontFamily: 'Nunito, sans-serif', fontWeight: 800,
            fontSize: 16, color: '#0F1C2E', cursor: 'pointer', whiteSpace: 'nowrap', minHeight: 52,
          }}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}

// ─── Navbar Logo (reused on thank-you screen) ─────────────────────────────────

function NavbarLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
      <img
        src="/brand_assets/logo-icon-transparent.png"
        alt="Team Flores"
        style={{
          height: 64, width: 'auto',
          filter: 'drop-shadow(0 2px 20px rgba(198,167,111,0.55)) drop-shadow(0 0 40px rgba(198,167,111,0.3))',
        }}
      />
      <div style={{ lineHeight: 1.2, textAlign: 'left' }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '1.7rem', fontWeight: 600,
          color: '#FFFFFF', letterSpacing: '0.01em', whiteSpace: 'nowrap',
        }}>
          Team Flores
        </div>
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.65rem', fontWeight: 400,
          color: 'rgba(198,167,111,0.75)',
          letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
          Division Director · Sunnyhill Financial
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LeadForm({ compact = false }) {
  const savedRef = useRef(loadSaved());
  const saved = savedRef.current;
  const zipInputRef = useRef(null);

  const [step, setStep] = useState(saved?.step ?? 1);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState(saved?.answers ?? {});
  const [showHeloc, setShowHeloc] = useState(false);
  const [showVaMsg, setShowVaMsg] = useState(false);
  const [showCreditMsg, setShowCreditMsg] = useState(false);
  const [contactSubStep, setContactSubStep] = useState(saved?.contactSubStep ?? 0);
  const [contact, setContact] = useState(saved?.contact ?? { firstName: '', lastName: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Persist to localStorage on every state change
  const persistState = useCallback((newStep, newAnswers, newSubStep, newContact) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step: newStep, answers: newAnswers, contactSubStep: newSubStep, contact: newContact,
      }));
    } catch {}
  }, []);

  const contactFields = [
    { key: 'firstName', label: 'First Name',    type: 'text',  placeholder: 'John'           },
    { key: 'lastName',  label: 'Last Name',     type: 'text',  placeholder: 'Smith'          },
    { key: 'email',     label: 'Primary Email', type: 'email', placeholder: 'john@email.com' },
    { key: 'phone',     label: 'Primary Phone', type: 'tel',   placeholder: '(702) 000-0000' },
  ];

  const isVA = answers[2] === 'va';
  const displayStep = isVA ? step : (step > 3 ? step - 1 : step);
  const totalDisplay = isVA ? TOTAL_STEPS : TOTAL_STEPS - 1;
  const progress = step > TOTAL_STEPS ? 100 : Math.round((displayStep / totalDisplay) * 100);

  const goNext = useCallback((overrideStep) => {
    setDirection(1);
    const next = overrideStep || step + 1;
    const nextStep = (next === 3 && !isVA) ? 4 : Math.min(next, TOTAL_STEPS + 1);
    setStep(nextStep);
    persistState(nextStep, answers, contactSubStep, contact);
  }, [step, isVA, answers, contactSubStep, contact, persistState]);

  const goBack = useCallback(() => {
    setDirection(-1);
    if (step === 18 && contactSubStep > 0) {
      const newSub = contactSubStep - 1;
      setContactSubStep(newSub);
      persistState(step, answers, newSub, contact);
      return;
    }
    const prev = step - 1;
    const prevStep = (prev === 3 && !isVA) ? 2 : Math.max(1, prev);
    setStep(prevStep);
    persistState(prevStep, answers, contactSubStep, contact);
  }, [step, isVA, contactSubStep, answers, contact, persistState]);

  const handleCardSelect = (stepNum, value) => {
    const newAnswers = { ...answers, [stepNum]: value };
    setAnswers(newAnswers);
    persistState(step, newAnswers, contactSubStep, contact);

    if (stepNum === 2) {
      if (value === 'heloc') setShowHeloc(true);
      if (value === 'va') setShowVaMsg(true);
    }
    if (stepNum === 5 && value === 'poor') {
      setShowCreditMsg(true);
      setTimeout(() => { setShowCreditMsg(false); goNext(); }, 3500);
      return;
    }
    if (stepNum === 2 && value === 'va') {
      setTimeout(() => { setShowVaMsg(false); goNext(); }, 2500);
      return;
    }
    setTimeout(() => goNext(), 300);
  };

  const handleContactNext = () => {
    if (contactSubStep < contactFields.length - 1) {
      const newSub = contactSubStep + 1;
      setContactSubStep(newSub);
      persistState(step, answers, newSub, contact);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const now = new Date();
    const payload = {
      rebelPathLead: 'No',
      rebelPathURL: 'N/A',
      date: now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { timeZoneName: 'short' }),
      browser: navigator.userAgent,
      submittedAt: now.toISOString(),
      zipCode:          answers[1]  || '',
      loanType:         answers[2]  || '',
      vaLoan:           answers[3]  || '',
      propertyType:     answers[4]  || '',
      creditScore:      answers[5]  || '',
      firstPurchase:    answers[6]  || '',
      purchaseSituation:answers[7]  || '',
      propertyUse:      answers[8]  || '',
      purchasePrice:    answers[9]  || '',
      downPayment:      answers[10] || '',
      rateType:         answers[11] || '',
      annualIncome:     answers[12] || '',
      employmentStatus: answers[13] || '',
      bankruptcy:       answers[14] || '',
      proofOfIncome:    answers[15] || '',
      realEstateAgent:  answers[16] || '',
      howDidYouHear:    answers[17] || '',
      firstName: contact.firstName,
      lastName:  contact.lastName,
      email:     contact.email,
      phone:     contact.phone,
    };

    try {
      await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', SHEET_URL);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = resolve; xhr.onerror = resolve; xhr.ontimeout = resolve;
        xhr.timeout = 10000;
        xhr.send(new URLSearchParams({ data: JSON.stringify(payload) }).toString());
      });
    } catch(e) { console.log('Submit error:', e); }

    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };
  const slideTransition = { duration: 0.38, ease: [0.16, 1, 0.3, 1] };

  const cardGridCols = (stepNum) => {
    const map = { 2:4, 3:2, 4:3, 5:3, 6:2, 7:2, 8:3, 9:2, 10:4, 11:3, 12:2, 13:3, 14:2, 15:2, 16:2, 17:2 };
    return map[stepNum] || 2;
  };

  // ── Card steps list (all except 1 = zip and 18 = contact) ──
  const cardSteps = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

  // ──────────────────────────────────────────────────────────────────────────
  // Thank You Screen
  // ──────────────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div style={{
        background: '#0F1C2E', minHeight: compact ? 'auto' : '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 40px)', position: 'relative', overflow: 'hidden',
        fontFamily: 'Nunito, sans-serif',
      }}>
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 540, width: '100%', position: 'relative', zIndex: 20 }}
        >
          {/* Navbar logo — same as top-left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <NavbarLogo />
          </motion.div>

          {/* Animated checkmark */}
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
                stroke="#C6A76F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.55, duration: 0.55, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(28px, 6vw, 48px)', color: '#C6A76F', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.2 }}
          >
            Thank you, {contact.firstName || 'there'}!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{ fontFamily: 'Nunito, sans-serif', color: '#F0E6D2', fontSize: 17, lineHeight: 1.7, marginBottom: 8, opacity: 0.9 }}
          >
            Nick will personally review your information and be in touch shortly.
          </motion.p>

          {contact.email && (
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.65)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}
            >
              A confirmation email is on its way to <strong style={{ color: 'rgba(198,167,111,0.8)' }}>{contact.email}</strong>.
            </motion.p>
          )}

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ height: 1, background: 'linear-gradient(to right, transparent, #C6A76F, transparent)', marginBottom: 24 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            style={{ marginBottom: 28 }}
          >
            <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(198,167,111,0.6)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Reach Nick directly
            </p>
            <a href="tel:7024976370" style={{ display: 'block', color: '#C6A76F', fontFamily: 'Nunito, sans-serif', fontSize: 18, fontWeight: 700, textDecoration: 'none', marginBottom: 6 }}>
              (702) 497-6370
            </a>
            <a href="mailto:Nick@sunnyhillfinancial.com" style={{ display: 'block', color: 'rgba(240,230,210,0.65)', fontFamily: 'Nunito, sans-serif', fontSize: 15, textDecoration: 'none' }}>
              Nick@sunnyhillfinancial.com
            </a>
          </motion.div>

          <motion.a
            href="tel:7024976370"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'block', background: '#C6A76F', color: '#0F1C2E', borderRadius: 12, padding: '16px 32px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 17, textDecoration: 'none', boxShadow: '0 8px 28px rgba(198,167,111,0.35)', letterSpacing: '0.03em', marginBottom: 32 }}
          >
            Schedule a Call with Nick
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', color: '#C6A76F', fontSize: 'clamp(16px, 3vw, 20px)', lineHeight: 1.5, marginBottom: 20, opacity: 0.85 }}
          >
            "You can't have a positive life with a negative mind."
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.4 }}>
            <p style={{ fontFamily: 'EB Garamond, serif', color: 'rgba(240,230,210,0.8)', fontSize: 16, fontWeight: 600, marginBottom: 2 }}>Nicholas Flores</p>
            <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(198,167,111,0.55)', fontSize: 12, letterSpacing: '0.04em' }}>Division Director | Sunnyhill Financial</p>
            <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(198,167,111,0.45)', fontSize: 11, marginTop: 4, letterSpacing: '0.04em' }}>NMLS #422150 | Equal Housing Opportunity</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Form
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');

        .lead-input:focus { border-color: #C6A76F !important; box-shadow: 0 0 0 3px rgba(198,167,111,0.2); }

        .lead-zip-input {
          background: rgba(255,255,255,0.07);
          border: 2.5px solid rgba(198,167,111,0.4);
          border-radius: 16px;
          padding: 20px 24px;
          font-family: Nunito, sans-serif;
          font-size: clamp(28px, 6vw, 48px);
          font-weight: 700;
          color: #fff;
          text-align: center;
          letter-spacing: 0.18em;
          outline: none;
          width: 100%;
          max-width: 280px;
          display: block;
          margin: 0 auto 24px;
          transition: border-color 0.2s;
        }
        .lead-zip-input::placeholder {
          color: rgba(240,230,210,0.25);
          letter-spacing: 0.1em;
          font-size: clamp(16px, 3vw, 22px);
          font-weight: 400;
        }
        .lead-zip-input:focus {
          border-color: #C6A76F !important;
          box-shadow: 0 0 0 4px rgba(198,167,111,0.15);
        }

        .lead-card-grid { display: grid; gap: 12px; }
        @media (max-width: 520px) {
          .lead-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        .contact-field-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .contact-input { min-width: 0; flex: 1 1 200px; }

        .lead-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 16px; gap: 10px;
          border-top: 1px solid rgba(198,167,111,0.1);
          position: relative; z-index: 5;
        }
        .lead-nav-back {
          background: transparent;
          border: 1.5px solid rgba(198,167,111,0.3);
          border-radius: 9px; padding: 14px 28px;
          font-family: Nunito, sans-serif; font-weight: 700; font-size: 16px;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
          min-height: 52px; white-space: nowrap;
        }
        .lead-nav-skip {
          background: transparent; border: none;
          color: rgba(198,167,111,0.45);
          font-family: Nunito, sans-serif; font-size: 14px;
          cursor: pointer; padding: 10px 12px; min-height: 44px;
        }
        @media (max-width: 480px) {
          .lead-nav { flex-direction: column; gap: 8px; }
          .lead-nav-back, .lead-nav-skip { width: 100%; text-align: center; }
        }
      `}</style>

      {submitting && <GoldSpinner />}

      <div style={{
        background: '#0F1C2E', minHeight: compact ? 'auto' : '100vh',
        display: 'flex', flexDirection: 'column',
        fontFamily: 'Nunito, sans-serif', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background gradients */}
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

        {/* HELOC Toast */}
        <AnimatePresence>
          {showHeloc && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#1A3E61', border: '1.5px solid #C6A76F', borderRadius: 12, padding: '16px 24px', zIndex: 100, maxWidth: 500, width: '90%', boxShadow: '0 12px 40px rgba(15,28,46,0.6)' }}
            >
              <button onClick={() => setShowHeloc(false)} style={{ position: 'absolute', top: 10, right: 14, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>×</button>
              <p style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Did you know?</p>
              <p style={{ color: '#F0E6D2', fontSize: 15, lineHeight: 1.6 }}>
                EquitySelect can unlock up to <strong style={{ color: '#C6A76F' }}>506% more equity</strong> than a bank HELOC. Let's find out how much you qualify for.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VA Message */}
        <AnimatePresence>
          {showVaMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,46,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}
            >
              <div style={{ background: '#1A3E61', border: '2px solid #C6A76F', borderRadius: 20, padding: '40px 32px', textAlign: 'center', maxWidth: 400, width: '100%' }}>
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <path d="M26 4L8 12v14c0 10.8 7.7 20.9 18 23.6C36.3 46.9 44 36.8 44 26V12L26 4z" fill="rgba(198,167,111,0.15)" stroke="#C6A76F" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M19 26l5 5 9-10" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 26, fontWeight: 600, marginBottom: 12 }}>Thank you for your service!</h3>
                <p style={{ color: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
                  We are honored to help veterans and active military members achieve homeownership with VA loan benefits.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credit Message */}
        <AnimatePresence>
          {showCreditMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(15,28,46,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}
            >
              <div style={{ background: '#1A3E61', border: '2px solid #C6A76F', borderRadius: 20, padding: '40px 32px', textAlign: 'center', maxWidth: 420, width: '100%' }}>
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <circle cx="26" cy="26" r="24" fill="rgba(198,167,111,0.1)" stroke="#C6A76F" strokeWidth="1.5"/>
                  <path d="M26 14l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" fill="rgba(198,167,111,0.3)" stroke="#C6A76F" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 24, fontWeight: 600, marginBottom: 12 }}>You are in the right place.</h3>
                <p style={{ color: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 15, lineHeight: 1.7, opacity: 0.9 }}>
                  Nick specializes in credit rebuilds and has helped many clients in your situation get approved. Let's keep going!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 4vw, 40px) clamp(12px, 4vw, 20px)', position: 'relative', zIndex: 5 }}>
          <div style={{ width: '100%', maxWidth: 680 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step === 18 ? `18-${contactSubStep}` : step}
                custom={direction}
                variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={slideTransition}
              >
                {/* Question heading — all steps except zip (1) and contact (18) */}
                {step > 1 && step !== 18 && step <= TOTAL_STEPS && (
                  <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 600, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: 28, lineHeight: 1.25 }}>
                    {STEP_QUESTIONS[step]}
                  </h2>
                )}

                {/* ── Step 1: ZIP CODE ── */}
                {step === 1 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.25 }}>
                      Get Your Free Mortgage Quote
                    </h2>
                    <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(240,230,210,0.6)', fontSize: 15, marginBottom: 12 }}>
                      {STEP_QUESTIONS[1]}
                    </p>
                    <input
                      ref={(node) => {
                        zipInputRef.current = node;
                        if (node) node.focus({ preventScroll: true });
                      }}
                      type="text" inputMode="numeric" pattern="[0-9]*" maxLength={5}
                      value={answers[1] || ''}
                      placeholder="Enter your zip code"
                      className="lead-zip-input lead-input"
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 5);
                        const newAnswers = { ...answers, 1: val };
                        setAnswers(newAnswers);
                        persistState(step, newAnswers, contactSubStep, contact);
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter' && (answers[1] || '').length === 5) goNext(); }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => goNext()}
                      disabled={!(answers[1] && answers[1].length === 5)}
                      style={{
                        display: 'block', margin: '0 auto',
                        background: answers[1] && answers[1].length === 5 ? '#C6A76F' : 'rgba(198,167,111,0.25)',
                        border: 'none', borderRadius: 14, padding: '16px 48px',
                        fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 17,
                        color: answers[1] && answers[1].length === 5 ? '#0F1C2E' : 'rgba(198,167,111,0.5)',
                        cursor: answers[1] && answers[1].length === 5 ? 'pointer' : 'not-allowed',
                        letterSpacing: '0.03em',
                        boxShadow: answers[1] && answers[1].length === 5 ? '0 6px 24px rgba(198,167,111,0.35)' : 'none',
                        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                      }}
                    >
                      Get Started →
                    </motion.button>
                  </div>
                )}

                {/* ── Card Steps ── */}
                {cardSteps.includes(step) && CARD_OPTIONS[step] && (
                  <div className="lead-card-grid" style={{ gridTemplateColumns: `repeat(${cardGridCols(step)}, 1fr)` }}>
                    {CARD_OPTIONS[step].map((opt) => (
                      <OptionCard
                        key={opt.id} option={opt}
                        selected={answers[step] === opt.id}
                        onSelect={(val) => handleCardSelect(step, val)}
                      />
                    ))}
                  </div>
                )}

                {/* ── Step 18: Contact Fields ── */}
                {step === 18 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'EB Garamond, serif', color: '#fff', fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8 }}>
                      {STEP_QUESTIONS[18]}
                    </h2>
                    <p style={{ color: 'rgba(240,230,210,0.6)', fontSize: 14, marginBottom: 28 }}>
                      Field {contactSubStep + 1} of {contactFields.length}
                    </p>
                    <ContactField
                      label={contactFields[contactSubStep].label}
                      type={contactFields[contactSubStep].type}
                      placeholder={contactFields[contactSubStep].placeholder}
                      value={contact[contactFields[contactSubStep].key]}
                      onChange={(val) => {
                        const newContact = { ...contact, [contactFields[contactSubStep].key]: val };
                        setContact(newContact);
                        persistState(step, answers, contactSubStep, newContact);
                      }}
                      onNext={handleContactNext}
                    />
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation — shown for steps 2–18, not step 1 */}
        {step > 1 && step <= TOTAL_STEPS && !showVaMsg && !showCreditMsg && (
          <div className="lead-nav">
            <button
              onClick={goBack}
              className="lead-nav-back"
              style={{ color: 'rgba(240,230,210,0.7)', borderColor: 'rgba(198,167,111,0.3)' }}
            >
              Back
            </button>
            {cardSteps.includes(step) && (
              <button onClick={() => goNext()} className="lead-nav-skip">Skip</button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
