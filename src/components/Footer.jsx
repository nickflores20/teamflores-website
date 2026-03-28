// FILE: src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function RevealSection({ children, className, delay = 0 }) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const EqualHousingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 inline-block mr-1.5 align-text-bottom"
    aria-hidden="true"
  >
    <path d="M10.707 2.293a1 1 0 0 1 1.414 0l9 9A1 1 0 0 1 20 13h-1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7H4a1 1 0 0 1-.707-1.707l9-9ZM9 21h2v-4h2v4h2v-6H9v6Zm-2 0v-7h10v7h1v-8.586l-8-8-8 8V21h5Z" />
    <path d="M8 10h8v1.5H8V10Zm0 2.5h8V14H8v-1.5Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A3E61] pt-16 pb-6 relative overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A76F]/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top row: Name/Title/NMLS | Phone/Email/Address */}
        <RevealSection>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Left: Nick's identity */}
            <div className="flex flex-col gap-1.5">
              <p style={{ fontFamily: "'EB Garamond', serif", color: '#C6A76F', fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Nick Flores Sr.
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
                Division Director | Sunnyhill Financial
              </p>
              <p style={{ fontFamily: "'Nunito', sans-serif", color: '#F0E6D2', fontSize: '0.8rem' }}>
                NMLS #422150
              </p>
            </div>

            {/* Right: Contact + Address */}
            <div className="flex flex-col gap-1.5 sm:items-end">
              <a
                href="tel:7024976370"
                className="font-nunito text-white text-base font-semibold hover:text-[#C6A76F] transition-colors duration-200"
              >
                702-497-6370
              </a>
              <a
                href="mailto:nick@sunnyhillfinancial.com"
                className="font-nunito text-white text-sm hover:text-[#C6A76F] transition-colors duration-200 break-all"
              >
                nick@sunnyhillfinancial.com
              </a>
              <p style={{ fontFamily: "'Nunito', sans-serif", color: '#F0E6D2', fontSize: '0.78rem', lineHeight: 1.6 }} className="sm:text-right">
                871 Coronado Center Drive Suite 200<br />
                Henderson, NV 89052
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Divider */}
        <RevealSection delay={0.05}>
          <div className="h-px bg-gradient-to-r from-transparent via-[#C6A76F]/30 to-transparent" />
        </RevealSection>

        {/* Licensed states + Corp NMLS */}
        <RevealSection delay={0.07} className="text-center">
          <p className="font-nunito text-[#F0E6D2] text-sm mb-1">
            Licensed in: <span className="text-[#C6A76F] font-semibold">NV | AZ | CA | FL | TX | WA | OR</span>
          </p>
          <p className="font-nunito text-[#F0E6D2]/70 text-xs">
            Sunnyhill Financial | CORP NMLS ID#1708856
          </p>
        </RevealSection>

        {/* Quick links */}
        <RevealSection delay={0.09} className="text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="https://sunnyhillfinancial.pos.yoursonar.com/?originator=nick@sunnyhillfinancial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito text-[#C6A76F] text-sm font-semibold hover:text-[#d4b87a] hover:underline underline-offset-2 transition-colors duration-200"
            >
              Get Pre-Approved
            </a>
            <a
              href="https://sunnyhillfinancial.pos.yoursonar.com/rates"
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito text-[#C6A76F] text-sm font-semibold hover:text-[#d4b87a] hover:underline underline-offset-2 transition-colors duration-200"
            >
              Today's Rates
            </a>
            {/* CALENDLY: Currently configured but may need to be re-enabled by Nick Sr. if double-booking issue between personal and Sunnyhill calendars is resolved */}
            <a
              href="https://calendly.com/floresnick"
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito text-[#C6A76F] text-sm font-semibold hover:text-[#d4b87a] hover:underline underline-offset-2 transition-colors duration-200"
            >
              Schedule a Call
            </a>
            <a
              href="https://sunnyhillfinancial.pos.yoursonar.com/?originator=nick@sunnyhillfinancial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito text-[#C6A76F] text-sm font-semibold hover:text-[#d4b87a] hover:underline underline-offset-2 transition-colors duration-200"
            >
              Apply Now
            </a>
          </div>
        </RevealSection>

        {/* Divider */}
        <div className="h-px bg-[#C6A76F]/15" />

        {/* Equal Housing + NMLS Consumer Access */}
        <RevealSection delay={0.12} className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1.5 text-[#C6A76F] font-nunito text-xs font-semibold">
            <EqualHousingIcon />
            Equal Housing Lender
          </div>
          <span className="text-white/30 text-xs hidden sm:inline">|</span>
          <a
            href="https://www.nmlsconsumeraccess.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C6A76F] font-nunito text-xs hover:text-[#d4b87a] underline underline-offset-2 transition-colors duration-200"
          >
            NMLS Consumer Access: www.nmlsconsumeraccess.org
          </a>
        </RevealSection>

        {/* Copyright + disclosure */}
        <RevealSection delay={0.14} className="text-center space-y-2">
          <p className="text-white/60 font-nunito text-xs">
            © 2026 Nick Flores Sr. | Sunnyhill Financial. All rights reserved.
          </p>
          <p className="text-gray-400 font-nunito text-[10px] leading-relaxed max-w-4xl mx-auto">
            The information contained in this communication is confidential and intended only for the use of the individual named above.
            NMLS Consumer Access: www.nmlsconsumeraccess.org
          </p>
        </RevealSection>

      </div>
    </footer>
  );
}
