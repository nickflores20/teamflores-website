// FILE: src/pages/About.jsx
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function SectionReveal({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

function StaggerReveal({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// SVG icons for specializations
const SpecIcons = {
  va: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L5 8v8c0 6.6 4.6 12.8 11 14.7C22.4 28.8 27 22.6 27 16V8L16 3z" stroke="#C6A76F" strokeWidth="1.75" strokeLinejoin="round" fill="rgba(198,167,111,0.1)" />
      <path d="M11 16l3.5 3.5L21 13" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cashout: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="#C6A76F" strokeWidth="1.75" fill="rgba(198,167,111,0.08)" />
      <line x1="16" y1="8" x2="16" y2="24" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 11.5c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5-1.8 2.8-4 2.8-4 1.2-4 3.5 1.8 3.7 4 3.7 4-1.5 4-3.7" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" fill="none" />
    </svg>
  ),
  house: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M5 15L16 5l11 10v13H21v-7H11v7H5V15z" stroke="#C6A76F" strokeWidth="1.75" strokeLinejoin="round" fill="rgba(198,167,111,0.08)" />
    </svg>
  ),
  sun: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="6" stroke="#C6A76F" strokeWidth="1.75" fill="rgba(198,167,111,0.1)" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.8 7.8l2.1 2.1M22.1 22.1l2.1 2.1M7.8 24.2l2.1-2.1M22.1 9.9l2.1-2.1" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
  key: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="13" r="7" stroke="#C6A76F" strokeWidth="1.75" fill="rgba(198,167,111,0.08)" />
      <path d="M17 17l9 9M22 22l-2.5 2.5M19 25l-2 2" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="13" r="2.5" fill="#C6A76F" fillOpacity="0.4" />
    </svg>
  ),
  building: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="10" width="20" height="18" rx="2" stroke="#C6A76F" strokeWidth="1.75" fill="rgba(198,167,111,0.08)" />
      <path d="M11 28V10M21 28V10M6 18h20M6 24h20" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M11 6h10v4H11z" stroke="#C6A76F" strokeWidth="1.75" fill="rgba(198,167,111,0.1)" />
    </svg>
  ),
  chart: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polyline points="5,24 11,15 17,19 27,9" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="21,9 27,9 27,15" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="5" y1="28" x2="27" y2="28" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
  star: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4l3 6 7 1-5 5 1.2 7L16 20l-6.2 3.2L11 16 6 11l7-1z" stroke="#C6A76F" strokeWidth="1.75" strokeLinejoin="round" fill="rgba(198,167,111,0.1)" />
    </svg>
  ),
};

const SPECIALIZATIONS = [
  { title: "VA Loans", description: "Zero down, no PMI — maximizing benefits for those who served.", icon: "va" },
  { title: "Cash Out Refinance", description: "Unlock your equity for renovations, debt payoff, or investments.", icon: "cashout" },
  { title: "Home Purchase", description: "Guiding buyers from preapproval to closing in every market.", icon: "house" },
  { title: "Vacation Homes", description: "Second home financing with competitive rates and flexible terms.", icon: "sun" },
  { title: "First Time Buyers", description: "Patient guidance and program expertise for new homeowners.", icon: "key" },
  { title: "New Builds", description: "Construction loans and builder financing with smooth processes.", icon: "building" },
  { title: "Credit Rebuilds", description: "Strategic planning to improve scores and unlock better rates.", icon: "chart" },
  { title: "Reverse Mortgage", description: "Helping seniors leverage home equity to enhance retirement income.", icon: "star" },
];

const TESTIMONIALS = [
  {
    quote: "I recently completed a refinance with Sunnyhill Financial and I cannot say enough great things about Nick Flores and his team. From the very beginning Nick was incredibly professional, knowledgeable, and honest. He took the time to explain every option and always made sure we understood every step of the process.",
    name: "Anthony Tran",
    location: "Henderson NV",
    date: "October 2025",
    loan: "Refinance",
    stars: 5,
  },
  {
    quote: "It was a pleasure to do business with Nick. He is a consummate professional and really cares about his clients. He was there every step of the way from our pre-approval to the day our loan closed. Nick took the time to explain each step thoroughly and I would recommend him to anyone.",
    name: "Myra Sarmiento",
    location: "Corona CA",
    date: "October 2014",
    loan: "Purchase",
    stars: 5,
  },
  {
    quote: "Nick Flores refinanced two of my home loans. One was in a very complex situation. My wife and I had gone through one bank, a mortgage broker, and an attorney — all advised us to foreclose. Nick took the challenge and closed both loans successfully. Absolutely incredible.",
    name: "R. Milay",
    location: "Hayward CA",
    date: "January 2015",
    loan: "Refinance",
    stars: 5,
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Nick Flores | 5 Star Mortgage Expert Las Vegas | NMLS #422150';
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* HERO — Dark Navy */}
      <section
        className="pt-32 pb-20 px-6 text-center relative overflow-hidden"
        style={{ background: "#0F1C2E" }}
      >
        {/* Radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(198,167,111,0.1) 0%, transparent 65%), radial-gradient(ellipse 80% 30% at 50% 100%, rgba(26,62,97,0.6) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
          {/* Nick photo — circular with gold glow + floating */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative inline-block"
            >
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: "280px",
                  height: "280px",
                  boxShadow:
                    "0 0 0 4px rgba(198,167,111,0.6), 0 0 0 8px rgba(198,167,111,0.2), 0 0 48px rgba(198,167,111,0.3), 0 0 80px rgba(198,167,111,0.12)",
                }}
              >
                <img
                  src="/brand_assets/nick.jpg"
                  alt="Nicholas Flores"
                  className="w-full h-full object-cover"
                  loading="eager"
                  width={280}
                  height={280}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(2.8rem, 6vw, 3.75rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "0.6rem",
              }}
            >
              Nicholas Flores
            </h1>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: "#C6A76F",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                marginBottom: "0.3rem",
              }}
            >
              Outside Sales Division Director
            </p>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: "rgba(198,167,111,0.75)",
                fontSize: "0.95rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              Sunnyhill Financial
            </p>

            {/* Language badges */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: "2rem" }}>
              {["English", "Español"].map(lang => (
                <span key={lang} style={{
                  background: "rgba(198,167,111,0.12)",
                  border: "1px solid rgba(198,167,111,0.4)",
                  borderRadius: 100,
                  padding: "4px 14px",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#C6A76F",
                }}>
                  {lang}
                </span>
              ))}
            </div>

            {/* Quote */}
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                color: "#C6A76F",
                fontStyle: "italic",
                lineHeight: 1.5,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              "You can't have a positive life with a negative mind."
            </p>
          </motion.div>
        </div>
      </section>

      {/* BIO SECTION — Sand */}
      <section style={{ background: "#F0E6D2" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            {/* Navy-on-cream logo — centered above bio */}
            <div className="flex justify-center mb-14">
              <img
                src="/brand_assets/logo-navy-transparent.png"
                alt="Team Flores"
                loading="lazy"
                width={320}
                height={120}
                style={{
                  width: 'min(320px, 80vw)',
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 16px rgba(26,62,97,0.12))',
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: photo */}
              <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    width: "min(400px, 100%)",
                    border: "2px solid rgba(198,167,111,0.45)",
                    boxShadow: "0 8px 40px rgba(26,62,97,0.15), 0 2px 8px rgba(198,167,111,0.1)",
                  }}
                >
                  <img
                    src="/brand_assets/nick.jpg"
                    alt="Nicholas Flores"
                    className="w-full object-cover"
                    loading="lazy"
                    width={400}
                    height={500}
                    style={{ aspectRatio: "4/5", display: "block" }}
                  />
                </div>
              </div>

              {/* Right: bio */}
              <div className="order-1 md:order-2">
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.78rem",
                    color: "#C6A76F",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  About Nick
                </p>
                <h2
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    color: "#1A3E61",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    marginBottom: "1.5rem",
                  }}
                >
                  15+ Years of Turning "No" Into "Let's Find a Way"
                </h2>
                <div style={{ color: "#1A3E61", lineHeight: 1.8, opacity: 0.85 }} className="space-y-4 text-base">
                  <p>
                    Nicholas Flores is committed to providing his clients the highest level of service for home loans along with some of the most competitive interest rates available in all of the states he holds a license in. Nick's goal is to create lasting relationships with each of his clients so that he may continue providing excellent service for many years to come.
                  </p>
                  <p>
                    With over 15 years of experience in the mortgage industry, Nick has helped thousands of clients achieve their dream of homeownership. His specialty lies in finding creative solutions for clients who have been turned down elsewhere — whether that's through the EquitySelect HELOC program, VA loan benefits, or credit rebuild strategies.
                  </p>
                  <p>
                    As Division Director at Sunnyhill Financial, Nick leads a team committed to transparency, speed, and client-first service. When you work with Nick, you're not just getting a mortgage — you're getting a financial partner for life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* SPECIALIZATIONS — Navy */}
      <section style={{ background: "#1A3E61" }} className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(198,167,111,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionReveal className="text-center mb-14">
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.18,
                marginBottom: "0.6rem",
              }}
            >
              Areas of Specialization
            </h2>
            <p style={{ color: "rgba(240,230,210,0.65)", maxWidth: "480px", margin: "0 auto" }}>
              Decades of expertise across every major mortgage product and client situation.
            </p>
          </SectionReveal>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPECIALIZATIONS.map((spec) => (
              <motion.div
                key={spec.title}
                variants={cardVariant}
                className="rounded-2xl p-5 flex flex-col gap-3 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(198,167,111,0.2)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(198,167,111,0.65)",
                  boxShadow: "0 0 28px rgba(198,167,111,0.12), 0 2px 8px rgba(198,167,111,0.08)",
                  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div>{SpecIcons[spec.icon]}</div>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "1.15rem",
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                  }}
                >
                  {spec.title}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", color: "rgba(240,230,210,0.6)", lineHeight: 1.6 }}>
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CREDENTIALS — Navy */}
      <section style={{ background: "#0F1C2E" }} className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <SectionReveal className="text-center mb-12">
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Credentials &amp; Expertise
            </h2>
            <p style={{ color: "rgba(240,230,210,0.6)", fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem" }}>
              Verified facts about Nick and his practice
            </p>
          </SectionReveal>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "⭐", label: "5.0 Stars", sub: "22 Zillow Verified Reviews" },
              { icon: "🗺", label: "Licensed in 8+ States", sub: "Nationwide lending" },
              { icon: "🪪", label: "NMLS #422150", sub: "Verified license number" },
              { icon: "🏢", label: "Division Director", sub: "Sunnyhill Financial" },
              { icon: "💬", label: "Bilingual", sub: "English & Spanish" },
              { icon: "🏠", label: "Specializations", sub: "First Time Buyers, Refinance, VA Loans, HELOC" },
              { icon: "📍", label: "Serving Las Vegas NV", sub: "And beyond, 8+ states" },
              { icon: "🤝", label: "10+ Years", sub: "Of client relationships" },
            ].map((cred) => (
              <motion.div
                key={cred.label}
                variants={cardVariant}
                className="rounded-2xl p-5 flex flex-col gap-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(198,167,111,0.2)",
                  transition: "border-color 0.3s ease",
                }}
                whileHover={{ borderColor: "rgba(198,167,111,0.55)", transition: { duration: 0.25 } }}
              >
                <span style={{ fontSize: "1.4rem" }}>{cred.icon}</span>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#C6A76F", fontWeight: 600, lineHeight: 1.2 }}>
                  {cred.label}
                </p>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "rgba(240,230,210,0.55)", lineHeight: 1.5 }}>
                  {cred.sub}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* LICENSE INFO — Sand */}
      <section style={{ background: "#F0E6D2" }} className="py-14 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(198,167,111,0.18) 0%, rgba(198,167,111,0.06) 100%)",
                border: "2px solid rgba(198,167,111,0.5)",
                boxShadow: "0 4px 32px rgba(198,167,111,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.75rem",
                  color: "#C6A76F",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                License Information
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {[
                  "NMLS #422150",
                  "AZ #LO-2013475",
                  "NV #23814",
                  "FL #LO58864",
                  "CA-DBO #422150",
                  "Company NMLS #1708856",
                  "Sunnyhill Financial Inc.",
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "0.85rem",
                      color: "#1A3E61",
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* CONTACT SECTION — Navy */}
      <section style={{ background: "#1A3E61" }} className="py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(198,167,111,0.09) 0%, transparent 65%)",
          }}
        />
        <SectionReveal className="relative z-10 max-w-2xl mx-auto">
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.18,
              marginBottom: "1.5rem",
            }}
          >
            Ready to Work With Nick?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="tel:7024976370"
              className="flex items-center gap-2 justify-center"
              style={{ textDecoration: "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5.6 2C5.2 2 4.8 2.2 4.5 2.5L3 4c-1 1-1 3 .5 5.5S7.5 14 9.5 15.5s4.5 1.5 5.5.5l1.5-1.5c.6-.6.6-1.5 0-2.1l-2-2c-.6-.6-1.5-.6-2.1 0L11.7 11c-1-.5-2-1.5-2.7-2.7l.6-.7c.6-.6.6-1.5 0-2.1l-2-2C7.3 3.2 7 3 6.6 3L5.6 2z" stroke="#C6A76F" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              </svg>
              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#C6A76F",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                (702) 497-6370
              </span>
            </a>
            <a
              href="mailto:Nick@sunnyhillfinancial.com"
              className="flex items-center gap-2 justify-center"
              style={{ textDecoration: "none" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="#C6A76F" strokeWidth="1.5" fill="none" />
                <path d="M2 7l8 5.5L18 7" stroke="#C6A76F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#C6A76F",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Nick@sunnyhillfinancial.com
              </span>
            </a>
          </div>

          <Link to="/apply">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-5 rounded-full font-bold text-base"
              style={{
                background: "#C6A76F",
                color: "#0F1C2E",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1rem",
                boxShadow: "0 4px 28px rgba(198,167,111,0.4), 0 1px 6px rgba(198,167,111,0.2)",
              }}
            >
              Apply Now
            </motion.button>
          </Link>
        </SectionReveal>
      </section>

      {/* TESTIMONIALS — Sand */}
      <section style={{ background: "#F0E6D2" }} className="py-20 px-6 md:px-12">
        <SectionReveal>
          <div className="max-w-5xl mx-auto">
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 2.6rem)",
                color: "#1A3E61",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "2.5rem",
                textAlign: "center",
              }}
            >
              What Nick's Clients Say
            </h2>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  className="rounded-2xl p-7 flex flex-col gap-4"
                  style={{
                    background: "#0F1C2E",
                    boxShadow: "0 2px 16px rgba(15,28,46,0.12), 0 1px 4px rgba(15,28,46,0.08)",
                    border: "1px solid rgba(198,167,111,0.2)",
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <svg key={s} width="18" height="18" viewBox="0 0 20 20" fill="#C6A76F">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Quote */}
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#FFFFFF", fontStyle: "italic", lineHeight: 1.7, flex: 1 }}>
                    "{t.quote}"
                  </p>
                  {/* Name + details */}
                  <div>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem", color: "#C6A76F", fontWeight: 700, marginBottom: 3 }}>
                      {t.name}
                    </p>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
                      {t.location} · {t.date}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      <span style={{ background: "rgba(198,167,111,0.15)", border: "1px solid rgba(198,167,111,0.35)", borderRadius: 100, padding: "2px 10px", fontSize: 11, fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#C6A76F" }}>
                        {t.loan}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)", borderRadius: 100, padding: "2px 10px", fontSize: 11, fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#22c55e" }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="6" fill="rgba(34,197,94,0.2)" /><path d="M3.5 6.2L5.1 7.8L8.5 4.2" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        Zillow Verified
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </SectionReveal>
      </section>

      {/* COMPLIANCE */}
      <section style={{ background: "#0F1C2E" }} className="py-10 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <p
            style={{
              color: "rgba(240,230,210,0.38)",
              fontSize: "0.69rem",
              lineHeight: 1.8,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Nicholas Flores | NMLS #422150 | AZ #LO-2013475 | NV #23814 | FL #LO58864 | CA-DBO #422150 | Sunnyhill Financial Inc. | Company NMLS #1708856. This is not a commitment to lend. All loans subject to credit approval. Equal Housing Opportunity.
          </p>
        </div>
      </section>

    </div>
  );
}
