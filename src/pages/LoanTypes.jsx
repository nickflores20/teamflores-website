// FILE: src/pages/LoanTypes.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function SectionReveal({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldCheckmark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#C6A76F" fillOpacity="0.15" />
      <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoldCheckmarkDark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#C6A76F" fillOpacity="0.25" />
      <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="#C6A76F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ApplyButton({ light }) {
  return (
    <Link to="/apply">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 px-10 py-4 rounded-full font-bold text-base"
        style={{
          background: "#C6A76F",
          color: "#0F1C2E",
          fontFamily: "'Nunito', sans-serif",
          boxShadow: "0 4px 24px rgba(198,167,111,0.35), 0 1px 4px rgba(198,167,111,0.15)",
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
        }}
      >
        Apply Now
      </motion.button>
    </Link>
  );
}

export default function LoanTypes() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* HERO */}
      <section
        className="pt-40 pb-28 px-6 text-center relative overflow-hidden"
        style={{ background: "#1A3E61" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(198,167,111,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(15,28,46,0.7) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              marginBottom: "1.25rem",
            }}
          >
            Every Loan Type. One Trusted Name.
          </h1>
          <p
            style={{
              color: "rgba(240,230,210,0.82)",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
            }}
          >
            From first-time buyers to seasoned investors, Nick has the loan product — and the expertise — to get you to closing.
          </p>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#C6A76F" fillOpacity="0.18" />
              <path d="M13 17l7 7 7-7" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ── LOAN 1: EquitySelect HELOC — Navy ── */}
      <section style={{ background: "#1A3E61" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
              {/* House icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <rect width="56" height="56" rx="16" fill="#C6A76F" fillOpacity="0.12" />
                <path d="M14 26L28 14L42 26V44H34V34H22V44H14V26Z" stroke="#C6A76F" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
              </svg>
              <div>
                <span
                  className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                  style={{ background: "rgba(198,167,111,0.18)", color: "#C6A76F" }}
                >
                  EquitySelect HELOC — Nick's Specialty
                </span>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.18,
                  }}
                >
                  Unlock Dramatically More Equity Than Your Bank Offers
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mt-6">
              <div>
                <p style={{ color: "rgba(240,230,210,0.85)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  The EquitySelect HELOC is Nick's signature product and the reason homeowners across 20+ states choose to work with him. Unlike a traditional bank HELOC that limits your access to a fraction of your home's equity, the EquitySelect program uses a proprietary calculation that can qualify you for significantly more — even if you've been turned down elsewhere.
                </p>
                <ul className="space-y-3">
                  {[
                    "Variable APR 5.00%–9.00% (SOFR + 1.50% margin)",
                    "Draw up to 80% of your home's value",
                    "Capped monthly payments — pay what you can afford",
                    "No prepayment penalty",
                    "Available for primary residences and second homes",
                    "Minimum FICO 650",
                  ].map((f) => (
                    <li key={f} className="flex gap-3 items-start">
                      <GoldCheckmark />
                      <span style={{ color: "rgba(240,230,210,0.85)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <ApplyButton />
              </div>

              {/* Mary vs Dan comparison */}
              <div>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "1.2rem",
                    color: "#C6A76F",
                    marginBottom: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  See the Difference — Mary's Story
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "rgba(240,230,210,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      Bank HELOC
                    </p>
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "2.4rem", color: "#FFFFFF", lineHeight: 1 }}>
                      $33K
                    </p>
                    <p style={{ color: "rgba(240,230,210,0.45)", fontSize: "0.78rem", marginTop: "0.4rem" }}>
                      Mary was offered
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "rgba(198,167,111,0.1)",
                      border: "2px solid #C6A76F",
                      boxShadow: "0 0 36px rgba(198,167,111,0.18)",
                    }}
                  >
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#C6A76F", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      EquitySelect
                    </p>
                    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "2.4rem", color: "#C6A76F", lineHeight: 1 }}>
                      $200K
                    </p>
                    <p style={{ color: "#C6A76F", fontSize: "0.78rem", marginTop: "0.4rem", opacity: 0.75 }}>
                      Nick delivered
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "rgba(240,230,210,0.35)",
                    marginTop: "1.25rem",
                    lineHeight: 1.65,
                  }}
                >
                  Variable APR ranging from 5.00%-9.00% (SOFR + 1.50% margin). Rate subject to change. Not a commitment to lend.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── LOAN 2: Fixed Rate — Sand ── */}
      <section style={{ background: "#F0E6D2" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
              {/* Lock icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <rect width="56" height="56" rx="16" fill="#C6A76F" fillOpacity="0.15" />
                <rect x="16" y="26" width="24" height="18" rx="3" stroke="#C6A76F" strokeWidth="2.5" fill="none" />
                <path d="M20 26v-6a8 8 0 0116 0v6" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <circle cx="28" cy="35" r="2.5" fill="#C6A76F" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#C6A76F", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.4rem" }}>
                  Fixed Rate Mortgages
                </p>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#1A3E61",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.18,
                  }}
                >
                  Lock in Your Rate. Know Your Payment. Forever.
                </h2>
              </div>
            </div>
            <p style={{ color: "#1A3E61", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "620px", opacity: 0.85 }}>
              A fixed-rate mortgage gives you the security of a payment that never changes, no matter what interest rates do in the market. It's the most popular choice for buyers who plan to stay in their home long-term and want complete predictability in their budget.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { term: "30-Year Fixed", desc: "The most popular choice. Lowest monthly payment, maximize cash flow." },
                { term: "20-Year Fixed", desc: "A middle ground — pay less interest, build equity faster." },
                { term: "15-Year Fixed", desc: "Pay off your home in half the time. Significant interest savings." },
                { term: "10-Year Fixed", desc: "Aggressive payoff for those who can handle higher payments." },
              ].map((item) => (
                <div
                  key={item.term}
                  className="rounded-2xl p-5"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(198,167,111,0.3)",
                    boxShadow: "0 2px 16px rgba(26,62,97,0.07), 0 1px 3px rgba(26,62,97,0.04)",
                  }}
                >
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.25rem", color: "#1A3E61", fontWeight: 600, marginBottom: "0.5rem" }}>
                    {item.term}
                  </p>
                  <p style={{ color: "#1A3E61", fontSize: "0.875rem", lineHeight: 1.65, opacity: 0.72 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <ApplyButton />
          </div>
        </SectionReveal>
      </section>

      {/* ── LOAN 3: Jumbo — Navy ── */}
      <section style={{ background: "#1A3E61" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
              {/* Dollar icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <rect width="56" height="56" rx="16" fill="#C6A76F" fillOpacity="0.12" />
                <line x1="28" y1="14" x2="28" y2="42" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M21 22c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 5-7 5-7 2-7 7 3.1 7 7 7 7-3.1 7-7" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#C6A76F", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.4rem" }}>
                  Jumbo &amp; Non-Conforming Loans
                </p>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.18,
                  }}
                >
                  When Your Home Is Worth More Than Conventional Limits Allow
                </h2>
              </div>
            </div>
            <p style={{ color: "rgba(240,230,210,0.85)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "620px" }}>
              For loan amounts that exceed the conforming loan limit set by Fannie Mae and Freddie Mac, you'll need a jumbo loan. Nick specializes in placing high-value loans across all 20+ states he's licensed in.
            </p>
            <ul className="space-y-3 max-w-lg">
              {[
                "Fixed and ARM options available",
                "Competitive rates for high-value properties",
                "Primary residences, second homes, and investment properties",
                "Streamlined process with direct lender access",
                "Available in all 20+ licensed states",
              ].map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <GoldCheckmark />
                  <span style={{ color: "rgba(240,230,210,0.85)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <ApplyButton />
          </div>
        </SectionReveal>
      </section>

      {/* ── LOAN 4: FHA — Sand ── */}
      <section style={{ background: "#F0E6D2" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
              {/* Shield icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <rect width="56" height="56" rx="16" fill="#C6A76F" fillOpacity="0.15" />
                <path d="M28 13L15 19v11c0 8.3 5.6 16 13 18.4C35.4 46 41 38.3 41 30V19L28 13z" stroke="#C6A76F" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
                <path d="M22 28l4 4 8-8" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#C6A76F", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.4rem" }}>
                  FHA Loans — Federal Housing Administration
                </p>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#1A3E61",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.18,
                  }}
                >
                  More Buyers Qualify With FHA
                </h2>
              </div>
            </div>
            <p style={{ color: "#1A3E61", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "620px", opacity: 0.85 }}>
              Backed by the Federal Housing Administration, FHA loans allow buyers to purchase with as little as 3.5% down and qualify with lower credit scores than conventional loans require. A popular choice for first-time buyers.
            </p>
            <ul className="space-y-3 max-w-lg">
              {[
                "3.5% down payment with 580+ FICO score",
                "10% down payment with 500–579 FICO score",
                "No income limits — available to all qualifying buyers",
                "Gift funds allowed for down payment",
                "Mortgage Insurance Premium (MIP) required — upfront 1.75% + annual premium protects the lender if you default",
              ].map((f) => (
                <li key={f} className="flex gap-3 items-start">
                  <GoldCheckmarkDark />
                  <span style={{ color: "#1A3E61", opacity: 0.85 }}>{f}</span>
                </li>
              ))}
            </ul>
            <ApplyButton />
          </div>
        </SectionReveal>
      </section>

      {/* ── LOAN 5: VA — Dark Navy FEATURED ── */}
      <section style={{ background: "#0F1C2E" }} className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 90% 10%, rgba(198,167,111,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(198,167,111,0.06) 0%, transparent 65%)",
          }}
        />
        <SectionReveal className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
              {/* VA Shield */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <rect width="56" height="56" rx="16" fill="#C6A76F" fillOpacity="0.18" />
                <path d="M28 11L13 18v13c0 9.4 6.4 18.2 15 20.8C36.6 49.2 43 40.4 43 31V18L28 11z" stroke="#C6A76F" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(198,167,111,0.07)" />
                <path d="M20 29l6 6 10-10" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#C6A76F", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.4rem" }}>
                  🇺🇸 VA Loans — Thank You For Your Service
                </p>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.18,
                  }}
                >
                  You've Earned These Benefits. Let's Use Them.
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p style={{ color: "rgba(240,230,210,0.85)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  VA loans are one of the most powerful mortgage products available — and they're exclusively for veterans, active military, and surviving spouses. Nick has helped hundreds of service members use their VA benefits to purchase homes with zero down payment and no private mortgage insurance.
                </p>
                <ul className="space-y-3">
                  {[
                    "0% down payment required",
                    "No PMI — ever",
                    "Competitive interest rates",
                    "No prepayment penalty",
                    "Available for purchase, refinance, and cash-out refi",
                    "Nick's VA loan specialty area",
                  ].map((f) => (
                    <li key={f} className="flex gap-3 items-start">
                      <GoldCheckmark />
                      <span style={{ color: "rgba(240,230,210,0.85)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/apply">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-8 px-10 py-4 rounded-full font-bold text-base"
                    style={{
                      background: "#C6A76F",
                      color: "#0F1C2E",
                      fontFamily: "'Nunito', sans-serif",
                      boxShadow: "0 4px 24px rgba(198,167,111,0.4), 0 1px 4px rgba(198,167,111,0.2)",
                    }}
                  >
                    Thank you for your service. Apply now.
                  </motion.button>
                </Link>
              </div>
              <div className="flex items-center justify-start md:justify-center">
                <div
                  className="rounded-2xl p-8 text-center w-full max-w-xs"
                  style={{
                    background: "rgba(198,167,111,0.07)",
                    border: "2px solid rgba(198,167,111,0.35)",
                    boxShadow: "0 0 48px rgba(198,167,111,0.1)",
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
                    <path d="M24 4L10 10v12c0 9 6 16.5 14 19.2C32 38.5 38 31 38 22V10L24 4z" stroke="#C6A76F" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(198,167,111,0.12)" />
                    <path d="M17 24l5 5 9-9" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: "1.35rem",
                      color: "#C6A76F",
                      fontStyle: "italic",
                      lineHeight: 1.45,
                    }}
                  >
                    "Thank you for your service. Call Nick today."
                  </p>
                  <a href="tel:7024976370" className="block mt-4" style={{ color: "rgba(240,230,210,0.7)", fontSize: "1rem" }}>
                    (702) 497-6370
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── LOAN 6: ARMs — Sand ── */}
      <section style={{ background: "#F0E6D2" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
              {/* Trend icon */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="flex-shrink-0">
                <rect width="56" height="56" rx="16" fill="#C6A76F" fillOpacity="0.15" />
                <polyline points="13,40 22,27 30,33 43,18" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <polyline points="36,18 43,18 43,25" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#C6A76F", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.4rem" }}>
                  Adjustable Rate Mortgages (ARMs)
                </p>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#1A3E61",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.18,
                  }}
                >
                  Lower Start Rate. Smart Strategy for the Right Buyer.
                </h2>
              </div>
            </div>
            <p style={{ color: "#1A3E61", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "620px", opacity: 0.85 }}>
              An adjustable-rate mortgage starts with a fixed rate for an initial period, then adjusts periodically based on a market index. For buyers who plan to sell or refinance before the first adjustment, an ARM can mean significant interest savings.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { type: "10/6 ARM", desc: "Fixed for 10 years, then adjusts every 6 months — ideal for long-term but rate-conscious buyers." },
                { type: "7/6 ARM", desc: "Fixed for 7 years, then adjusts every 6 months — great balance of stability and savings." },
                { type: "5/6 ARM", desc: "Fixed for 5 years, then adjusts every 6 months — best for shorter timelines and strategic buyers." },
              ].map((arm) => (
                <div
                  key={arm.type}
                  className="rounded-2xl p-6"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(198,167,111,0.3)",
                    boxShadow: "0 2px 16px rgba(26,62,97,0.07)",
                  }}
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ background: "rgba(198,167,111,0.15)", color: "#C6A76F" }}
                  >
                    {arm.type}
                  </span>
                  <p style={{ color: "#1A3E61", fontSize: "0.9rem", lineHeight: 1.7, opacity: 0.85 }}>{arm.desc}</p>
                </div>
              ))}
            </div>
            <ApplyButton />
          </div>
        </SectionReveal>
      </section>

      {/* COMPLIANCE DISCLAIMER */}
      <section style={{ background: "#0F1C2E" }} className="py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p
            style={{
              color: "rgba(240,230,210,0.38)",
              fontSize: "0.69rem",
              lineHeight: 1.8,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Nicholas Flores | NMLS #422150 | Sunnyhill Financial Inc. | Company NMLS #1708856 | Licensed in: Alabama #1708856 | Arizona #0951179 | California DRE #02058287 / DFPI #60DBO99712 | Colorado | DC #MLB1708856 | Florida #MLD2608 | Georgia #71319 | Idaho #MBL-2081708856 | Illinois #MB.6850225 | Iowa #2023-0138 | Maryland #1708856 | Michigan #FL0022770/SR0024602 | Minnesota #MN-MO-1708856 | Nevada #5570 | North Carolina #B-190746 | Ohio #RM.804604.000 | Oregon | Pennsylvania #76238 | Tennessee | Texas | Utah #10993905 | Virginia #MC-8002 | Washington #CL-1708856 | Wisconsin.
            <br /><br />
            This is not a commitment to lend. Rates and programs subject to change without notice. All loans subject to credit approval. Equal Housing Opportunity.
          </p>
        </div>
      </section>

    </div>
  );
}
