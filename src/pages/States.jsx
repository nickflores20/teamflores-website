// FILE: src/pages/States.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import USMap from "../components/USMap";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const states = [
  { name: "Alabama", license: "#1708856" },
  { name: "Arizona", license: "#0951179" },
  { name: "California", license: "DRE #02058287 / DFPI #60DBO99712" },
  { name: "Colorado", license: "" },
  { name: "Washington DC", license: "#MLB1708856" },
  { name: "Florida", license: "#MLD2608" },
  { name: "Georgia", license: "#71319" },
  { name: "Idaho", license: "#MBL-2081708856" },
  { name: "Illinois", license: "#MB.6850225" },
  { name: "Iowa", license: "#2023-0138" },
  { name: "Maryland", license: "#1708856" },
  { name: "Michigan", license: "#FL0022770 / SR0024602" },
  { name: "Minnesota", license: "#MN-MO-1708856" },
  { name: "Nevada", license: "#5570" },
  { name: "North Carolina", license: "#B-190746" },
  { name: "Ohio", license: "#RM.804604.000" },
  { name: "Oregon", license: "" },
  { name: "Pennsylvania", license: "#76238" },
  { name: "Tennessee", license: "" },
  { name: "Texas", license: "" },
  { name: "Utah", license: "#10993905" },
  { name: "Virginia", license: "#MC-8002" },
  { name: "Washington", license: "#CL-1708856" },
  { name: "Wisconsin", license: "" },
];

function StateCard({ state, index }) {
  return (
    <motion.div
      variants={cardVariant}
      className="rounded-xl p-4 flex flex-col gap-1 group"
      style={{
        background: "#FFFFFF",
        borderTop: "3px solid #C6A76F",
        boxShadow: "0 2px 12px rgba(26,62,97,0.07), 0 1px 3px rgba(26,62,97,0.04)",
        transition: "box-shadow 0.3s ease, transform 0.25s ease",
      }}
      whileHover={{ scale: 1.025, boxShadow: "0 8px 32px rgba(26,62,97,0.13), 0 2px 6px rgba(198,167,111,0.15)" }}
    >
      <p
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "1.1rem",
          color: "#1A3E61",
          fontWeight: 600,
        }}
      >
        {state.name}
      </p>
      {state.license && (
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#C6A76F", fontWeight: 700 }}>
          {state.license}
        </p>
      )}
      <Link
        to="/apply"
        className="mt-2 text-sm font-semibold"
        style={{
          color: "#C6A76F",
          fontFamily: "'Nunito', sans-serif",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        Apply
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="#C6A76F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.div>
  );
}

export default function States() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const partnerRef = useRef(null);
  const partnerInView = useInView(partnerRef, { once: true, margin: "-60px" });

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
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(198,167,111,0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(15,28,46,0.5) 0%, transparent 70%)",
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
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Licensed Across America
          </h1>
          <p
            style={{
              color: "rgba(240,230,210,0.82)",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            Serving homeowners in 24+ states with competitive rates and personalized service.
          </p>
        </motion.div>
      </section>

      {/* US MAP */}
      <section style={{ background: "#0F1C2E" }} className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <USMap showHeader={false} />
        </motion.div>
      </section>

      {/* STATE GRID */}
      <section style={{ background: "#F0E6D2" }} className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#1A3E61",
                letterSpacing: "-0.03em",
                lineHeight: 1.18,
                marginBottom: "0.75rem",
              }}
            >
              Where We Lend
            </h2>
            <p style={{ color: "#1A3E61", opacity: 0.7, maxWidth: "480px", margin: "0 auto" }}>
              Nick holds active mortgage licenses in 24 states. Click any state to start your application.
            </p>
          </motion.div>

          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {states.map((state, index) => (
              <StateCard key={state.name} state={state} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARTNER SECTION */}
      <section style={{ background: "#1A3E61" }} className="py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(198,167,111,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          ref={partnerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={partnerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <rect width="56" height="56" rx="28" fill="#C6A76F" fillOpacity="0.15" />
            <path d="M18 28c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M28 38v4M24 40h8" stroke="#C6A76F" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="28" cy="28" r="3" fill="#C6A76F" />
          </svg>
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.25,
              marginBottom: "1rem",
            }}
          >
            Don't see your state?
          </h2>
          <p style={{ color: "rgba(240,230,210,0.8)", lineHeight: 1.7, marginBottom: "2rem" }}>
            We have great lending partners we can refer you to. Let us connect you with a trusted mortgage professional in your area.
          </p>
          <Link to="/apply">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full font-bold text-base"
              style={{
                background: "#C6A76F",
                color: "#0F1C2E",
                fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 4px 24px rgba(198,167,111,0.35), 0 1px 4px rgba(198,167,111,0.15)",
              }}
            >
              Find A Lending Partner
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* COMPLIANCE */}
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
            Nicholas Flores | NMLS #422150 | Sunnyhill Financial Inc. | Company NMLS #1708856 | Alabama #1708856 | Arizona #0951179 | California DRE #02058287 / DFPI #60DBO99712 | Colorado | DC #MLB1708856 | Florida #MLD2608 | Georgia #71319 | Idaho #MBL-2081708856 | Illinois #MB.6850225 | Iowa #2023-0138 | Maryland #1708856 | Michigan #FL0022770/SR0024602 | Minnesota #MN-MO-1708856 | Nevada #5570 | North Carolina #B-190746 | Ohio #RM.804604.000 | Oregon | Pennsylvania #76238 | Tennessee | Texas | Utah #10993905 | Virginia #MC-8002 | Washington #CL-1708856 | Wisconsin.
            <br /><br />
            This is not a commitment to lend. All loans subject to credit approval. Equal Housing Opportunity.
          </p>
        </div>
      </section>

    </div>
  );
}
