// FILE: src/pages/LearningCenter.jsx
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const CATEGORIES = ["All", "Home Buying", "Loan Programs", "Mortgage Knowledge", "Refinancing"];

// Verified working Unsplash photo IDs (real estate / home / finance topics)
const PHOTO_IDS = [
  "1560518883-ce09059eeffa",   // house keys
  "1570129477492-45c003edd2be", // house exterior
  "1558618666-fcd25c85cd64",   // home living room
  "1600585154526-990dced4db0d", // modern home
  "1523217582562-09d05c370093", // home front
  "1507003211169-0a1dd7228f2d", // person at desk / finance
  "1554224155-8d04cb21cd6c",   // home keys + contract
  "1486325212823-48bb52d6d8f1", // real estate sign
  "1449844908441-3bb37b6e9e72", // couple at home
  "1503387762-592deb58ef4e",   // house with yard
  "1568605114967-8130f3a36994", // suburban street
  "1516156008527-30baec27b54b", // person reviewing docs
  "1434626881859-194d67b2b86f", // laptop + finance
  "1551836022-d5d88e9218df",   // notebook / planning
  "1522708323590-d24dbb6b0267", // home office
  "1580587771525-78b9dba3b914", // modern home exterior
];

const ARTICLES = [
  {
    id: 1,
    title: "Refinancing Your Mortgage",
    category: "Refinancing",
    excerpt: "Is now the right time to refinance? Learn how rate changes, break-even points, and your loan term affect the decision.",
    body: "Refinancing your mortgage can be one of the most impactful financial decisions you make as a homeowner. When interest rates drop, refinancing allows you to replace your current loan with a new one at a lower rate, reducing your monthly payment and the total interest paid over the life of the loan.\n\nThe key metric to evaluate is your break-even point — how many months it takes for your monthly savings to offset the closing costs of the refinance. For example, if your closing costs are $4,000 and you save $200 per month, your break-even point is 20 months.\n\nBeyond rate-and-term refinancing, cash-out refinancing lets you tap into your home's equity for renovations, debt consolidation, or other financial goals. Talk to Nick about whether refinancing makes sense for your situation.",
  },
  {
    id: 2,
    title: "FHA and VA Mortgages: What is the Difference?",
    category: "Loan Programs",
    excerpt: "Two government-backed programs, two very different audiences. Here's how to know which one applies to you.",
    body: "FHA and VA loans are both government-backed mortgage programs designed to make homeownership more accessible, but they serve very different borrowers.\n\nFHA loans are open to any qualifying buyer — first-time or repeat — with a credit score as low as 580 and a down payment of just 3.5%. They require Mortgage Insurance Premium (MIP) for the life of the loan in most cases.\n\nVA loans are exclusively for veterans, active-duty military, and eligible surviving spouses. They offer 0% down payment, no PMI ever, and typically lower interest rates than conventional loans. If you qualify for a VA loan, it is almost always the superior choice.\n\nNick can help you determine which program fits your unique profile and get you preapproved quickly.",
  },
  {
    id: 3,
    title: "How to Get Organized as a First Time Home Buyer",
    category: "Home Buying",
    excerpt: "The paperwork feels overwhelming — but with the right checklist, you'll be ready before you even meet a lender.",
    body: "Buying your first home is exciting, but the documentation requirements can feel like a second job. Getting organized early makes the entire process smoother and faster.\n\nStart by gathering: two years of W-2s and tax returns, 30 days of pay stubs, two months of bank statements for all accounts, a government-issued ID, and any information on existing debts or liabilities.\n\nIf you're self-employed, you'll also need two years of business returns and a year-to-date profit and loss statement.\n\nOnce your documents are in order, Nick can typically issue a preapproval within 24-48 hours, giving you a competitive edge when making an offer on your dream home.",
  },
  {
    id: 4,
    title: "Saving for a Down Payment vs Paying Debt First",
    category: "Home Buying",
    excerpt: "One of the most common financial crossroads for buyers. The answer depends on your interest rates and timeline.",
    body: "Should you aggressively pay down debt before saving for a home, or is it smarter to save for your down payment first? The answer depends on your specific numbers.\n\nIf you have high-interest debt (credit cards at 20%+), paying those down first is almost always the right mathematical move. However, if your debt carries low interest rates (car loans, student loans below 7%), the math may favor building your down payment simultaneously.\n\nYour credit score also plays a role. Paying down revolving credit card balances can significantly boost your FICO score, which directly affects the interest rate you'll qualify for on your mortgage.\n\nNick can run the numbers with you and help you build a 6-12 month plan to optimize both.",
  },
  {
    id: 5,
    title: "Reverse Mortgage — What You Need to Know",
    category: "Loan Programs",
    excerpt: "Designed for homeowners 62 and older, reverse mortgages can supplement retirement income — with important caveats.",
    body: "A reverse mortgage allows homeowners aged 62 or older to convert part of their home equity into cash, with no required monthly mortgage payments. The loan is repaid when the borrower sells the home, moves out permanently, or passes away.\n\nThe most common type is the Home Equity Conversion Mortgage (HECM), insured by the FHA. Borrowers can receive funds as a lump sum, monthly payments, a line of credit, or a combination.\n\nKey considerations: you must continue paying property taxes, homeowner's insurance, and maintain the property. The loan balance grows over time as interest accrues.\n\nA reverse mortgage is not right for everyone, but for some retirees it can be a powerful financial planning tool. Nick can walk you through whether it's appropriate for your situation.",
  },
  {
    id: 6,
    title: "Amortization Schedule Breakdown",
    category: "Mortgage Knowledge",
    excerpt: "Every mortgage payment is part interest, part principal — but the split changes dramatically over time.",
    body: "Amortization is the process by which your loan balance is paid down over time through regular monthly payments. Each payment consists of two components: interest (paid to the lender) and principal (paid toward reducing your balance).\n\nIn the early years of a 30-year mortgage, the majority of each payment goes toward interest. Over time, the balance shifts — in the later years, most of your payment reduces the principal.\n\nFor example, on a $400,000 loan at 7%, your first payment might be roughly $2,661 — with $2,333 going to interest and only $328 reducing your balance. By year 25, the split is roughly reversed.\n\nUnderstanding amortization helps you see the true cost of your loan and make informed decisions about extra payments, refinancing, or loan term selection.",
  },
  {
    id: 7,
    title: "Introduction to Mortgage Terminology",
    category: "Mortgage Knowledge",
    excerpt: "APR, LTV, DTI, escrow — demystifying the alphabet soup of the mortgage world.",
    body: "Mortgages come with a language all their own. Here are the most important terms to understand:\n\n**APR (Annual Percentage Rate):** The true yearly cost of your loan, including interest and fees. Always compare APRs when shopping lenders.\n\n**LTV (Loan-to-Value):** Your loan amount divided by the home's value. A lower LTV means more equity and often better rates.\n\n**DTI (Debt-to-Income):** Your monthly debt payments divided by gross monthly income. Lenders typically want this below 45%.\n\n**Escrow:** An account held by your lender to collect and pay your property taxes and insurance.\n\n**PMI (Private Mortgage Insurance):** Required on conventional loans when your down payment is less than 20%.\n\n**Points:** Fees paid upfront to reduce your interest rate. One point = 1% of the loan amount.",
  },
  {
    id: 8,
    title: "Acceptable Sources for a Down Payment",
    category: "Home Buying",
    excerpt: "Not all money is created equal in a lender's eyes. Here's what sources are acceptable — and which raise red flags.",
    body: "Lenders scrutinize your down payment source carefully. Acceptable funds include personal savings and checking accounts, investment and retirement accounts (with documentation of withdrawal), proceeds from the sale of assets, and gift funds from eligible donors.\n\nWhat raises flags: large deposits without a paper trail, loans taken as down payment (not allowed on most programs), and cash that can't be documented.\n\nFor gift funds, the donor must provide a signed gift letter stating the funds are a gift, not a loan, and you'll need to document the transfer. Eligible donors vary by loan type — typically immediate family members.\n\nNick's team will help you document your funds correctly the first time, avoiding delays at underwriting.",
  },
  {
    id: 9,
    title: "Gift Funds and What You Should Know",
    category: "Mortgage Knowledge",
    excerpt: "A family member wants to help with your down payment. Here's exactly how to do it right.",
    body: "Gift funds from family members are one of the most common ways buyers supplement their down payment savings — and they're fully allowed on most loan programs when handled correctly.\n\nThe requirements: the donor must write and sign a gift letter confirming the funds are a gift (not a loan that must be repaid), stating the donor's name and relationship to you, the amount, and the property address.\n\nYou'll also need a paper trail showing the transfer: bank statements from the donor showing the withdrawal, and your bank statement showing the deposit.\n\nFor FHA loans, gift funds can cover the entire down payment. For conventional loans, if your down payment is less than 20%, some of the funds must come from your own savings. Rules vary by program — ask Nick for specifics.",
  },
  {
    id: 10,
    title: "Why You Should Get Preapproved",
    category: "Home Buying",
    excerpt: "In today's market, a preapproval letter isn't a nice-to-have — it's a requirement for sellers to take you seriously.",
    body: "A mortgage preapproval is a lender's written commitment to lend you a specific amount, based on a verified review of your income, assets, and credit. It's different from a prequalification, which is just an estimate.\n\nWhy it matters: sellers and their agents want to know you can actually close. A preapproval letter shows you're serious and financially qualified, giving your offer credibility in a competitive market.\n\nPreapprovals also help you: know exactly how much you can afford, move quickly when you find the right home, and often negotiate from a position of strength.\n\nNick can typically issue a preapproval within 24-48 hours of receiving your documents. Start the process before you begin your home search.",
  },
  {
    id: 11,
    title: "Mortgage 101: The Basics",
    category: "Mortgage Knowledge",
    excerpt: "New to the world of home loans? Start here. Everything you need to understand before talking to a lender.",
    body: "A mortgage is simply a loan used to purchase real estate, where the property itself serves as collateral. If you stop making payments, the lender has the legal right to foreclose and take the property.\n\nThe key components of any mortgage: the loan amount (principal), the interest rate, the loan term (typically 15 or 30 years), and the monthly payment.\n\nYour monthly payment typically covers four things: Principal, Interest, Taxes, and Insurance — often abbreviated as PITI. The taxes and insurance portions are held in escrow.\n\nThe interest rate you receive depends primarily on your credit score, down payment size, loan type, and prevailing market rates. Shopping multiple lenders can save you tens of thousands over the life of your loan — which is why working with a broker like Nick, who has access to multiple wholesale lenders, is advantageous.",
  },
  {
    id: 12,
    title: "The Mortgage Calculator and How It Will Help You",
    category: "Mortgage Knowledge",
    excerpt: "Run the numbers before you fall in love with a house. Here's what a mortgage calculator tells you — and what it doesn't.",
    body: "A mortgage calculator is an essential tool for any home buyer. At its core, it takes your loan amount, interest rate, and term, and calculates your monthly principal and interest payment.\n\nBut the basic calculation often leaves out important costs: property taxes, homeowner's insurance, HOA fees, and PMI (if applicable). A comprehensive calculator should include all of these for a true picture of your monthly housing expense.\n\nUse a calculator to: compare 15-year vs 30-year scenarios, see how a larger down payment affects your payment, understand the impact of a 0.5% rate difference, and determine how much extra monthly payment you'd need to pay off your loan in fewer years.\n\nNick's team provides a full payment breakdown analysis as part of your preapproval consultation.",
  },
  {
    id: 13,
    title: "Adjustable Rate Mortgages Explained",
    category: "Loan Programs",
    excerpt: "ARMs aren't scary when you understand the structure. Here's a plain-English breakdown of how they work.",
    body: "An adjustable-rate mortgage (ARM) has an interest rate that changes over time, as opposed to a fixed-rate mortgage where your rate never changes.\n\nMost ARMs today are hybrid ARMs, starting with a fixed period before adjusting. A 7/6 ARM is fixed for 7 years, then adjusts every 6 months. A 5/6 ARM is fixed for 5 years, then adjusts every 6 months.\n\nWhen adjustments happen, the new rate is calculated as: the index rate (typically SOFR) + your lender's margin. Periodic and lifetime caps limit how much your rate can rise at each adjustment and over the life of the loan.\n\nARMs make most sense for buyers who plan to sell or refinance before the first adjustment. They offer lower initial rates, which can mean significant savings — especially on larger loan amounts.",
  },
  {
    id: 14,
    title: "Interest-Only Mortgages Explained",
    category: "Loan Programs",
    excerpt: "Lower initial payments, but no equity building. Here's when an interest-only loan is — and isn't — a smart choice.",
    body: "An interest-only mortgage allows you to pay only the interest on your loan for an initial period — typically 5-10 years — after which the loan converts to a fully amortizing payment.\n\nThe appeal: significantly lower payments during the interest-only period. On a $500,000 loan at 7%, a standard payment is about $3,327; an interest-only payment would be about $2,917.\n\nThe tradeoff: you're not building equity during the interest-only period, and when the loan converts, your payments can jump significantly since you're now amortizing the full original balance over a shorter remaining term.\n\nInterest-only loans are generally appropriate for high-income borrowers with variable income (commissions, bonuses), real estate investors, or buyers who plan to sell or refinance before the conversion period. They are not appropriate for buyers who need to build equity or who are on tight budgets.",
  },
  {
    id: 15,
    title: "Credit Scores and Mortgages: What You Need to Know",
    category: "Mortgage Knowledge",
    excerpt: "Your FICO score is the single biggest factor in your mortgage rate. Here's how to understand and improve yours.",
    body: "Your credit score is one of the most important factors in determining your mortgage interest rate and which loan programs you qualify for. Lenders use FICO scores — typically pulling all three bureaus (Experian, Equifax, TransUnion) and using the middle score for qualification.\n\nGeneral guidelines: 760+ qualifies for the best rates on conventional loans. 700-759 is still excellent. 640-699 is acceptable for most programs. 580-639 opens FHA loan access. Below 580, options are very limited.\n\nImproving your score before applying: pay all bills on time (payment history is 35% of your score), reduce credit card balances below 30% of limits (utilization is 30% of score), avoid opening new accounts in the months before applying, and don't close old accounts.\n\nNick has helped many clients build credit strategies 6-12 months before applying, resulting in significantly better rates.",
  },
  {
    id: 16,
    title: "Steps to a Smooth Loan Process",
    category: "Home Buying",
    excerpt: "From application to closing, here's what to expect at each stage — and how to avoid the most common delays.",
    body: "Understanding the mortgage process from start to finish makes the experience far less stressful. Here's the typical timeline:\n\n**Week 1: Application & Preapproval.** Submit your application and documents. Nick issues preapproval within 24-48 hours.\n\n**Weeks 1-4: Home Shopping.** Use your preapproval letter while making offers. Once an offer is accepted, the clock starts.\n\n**Days 1-5: Loan Submission.** Nick submits your complete file to underwriting.\n\n**Days 5-15: Underwriting.** The underwriter reviews your file and may issue conditions — additional documents or clarifications needed.\n\n**Days 15-20: Clear to Close.** All conditions are satisfied. Final loan documents are prepared.\n\n**Day 25-30: Closing.** You sign final documents and receive the keys.\n\nThe most common delays: slow document delivery, large unverified deposits, and appraisal issues. Nick's team communicates proactively to keep your file moving.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ArticleModal({ article, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 md:pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ background: "rgba(15,28,46,0.85)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(15,28,46,0.4), 0 4px 16px rgba(15,28,46,0.2)",
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={`https://images.unsplash.com/photo-${PHOTO_IDS[article.id - 1]}?w=700&h=280&fit=crop`}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(26,62,97,0.6) 0%, transparent 60%)" }}
          />
        </div>
        {/* Content */}
        <div className="p-8">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ background: "rgba(198,167,111,0.15)", color: "#C6A76F" }}
          >
            {article.category}
          </span>
          <h2
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "1.75rem",
              color: "#1A3E61",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              marginBottom: "1.25rem",
            }}
          >
            {article.title}
          </h2>
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: "#1A3E61",
              lineHeight: 1.8,
              opacity: 0.85,
              whiteSpace: "pre-wrap",
              fontSize: "0.95rem",
            }}
          >
            {article.body}
          </div>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(15,28,46,0.65)",
            backdropFilter: "blur(4px)",
          }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

function ArticleCard({ article, index, onOpen }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 2px 16px rgba(26,62,97,0.07), 0 1px 3px rgba(26,62,97,0.04)",
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      onClick={() => onOpen(article)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-${PHOTO_IDS[article.id - 1]}?w=400&h=200&fit=crop`}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.4s ease" }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(15,28,46,0.55) 0%, transparent 55%)" }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "rgba(26,62,97,0.15)" }}
        />
      </div>
      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 self-start"
          style={{ background: "#C6A76F", color: "#0F1C2E" }}
        >
          {article.category}
        </span>
        <h3
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "1.2rem",
            color: "#1A3E61",
            lineHeight: 1.3,
            marginBottom: "0.6rem",
            letterSpacing: "-0.01em",
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.855rem",
            color: "#1A3E61",
            opacity: 0.7,
            lineHeight: 1.65,
            marginBottom: "1rem",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>
        <button
          className="self-start px-5 py-2 rounded-full text-sm font-semibold"
          style={{
            border: "1.5px solid #C6A76F",
            color: "#C6A76F",
            background: "transparent",
            fontFamily: "'Nunito', sans-serif",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#C6A76F"; e.currentTarget.style.color = "#0F1C2E"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C6A76F"; }}
          onClick={(e) => { e.stopPropagation(); onOpen(article); }}
        >
          Read More
        </button>
      </div>
    </motion.div>
  );
}

export default function LearningCenter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchCat = activeCategory === "All" || a.category === activeCategory;
      const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* HERO */}
      <section
        className="pt-40 pb-24 px-6 text-center relative overflow-hidden"
        style={{ background: "#1A3E61" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(198,167,111,0.12) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 90% 80%, rgba(15,28,46,0.5) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h1
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.1rem",
            }}
          >
            The Learning Center
          </h1>
          <p
            style={{
              color: "rgba(240,230,210,0.82)",
              fontSize: "1.125rem",
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about mortgages — in plain English.
          </p>
        </motion.div>
      </section>

      {/* SEARCH + FILTER BAR */}
      <div
        className="sticky top-20 z-30 py-4 px-6 md:px-12"
        style={{
          background: "#F0E6D2",
          boxShadow: "0 4px 24px rgba(26,62,97,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="5.5" stroke="#C6A76F" strokeWidth="1.75" />
              <path d="M11.5 11.5l3.5 3.5" stroke="#C6A76F" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm outline-none"
              style={{
                background: "#1A3E61",
                color: "#FFFFFF",
                border: "1.5px solid transparent",
                fontFamily: "'Nunito', sans-serif",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#C6A76F")}
              onBlur={(e) => (e.target.style.borderColor = "transparent")}
            />
          </div>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: activeCategory === cat ? "#C6A76F" : "transparent",
                  color: activeCategory === cat ? "#0F1C2E" : "#C6A76F",
                  border: "1.5px solid #C6A76F",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <section className="py-16 px-6 md:px-12" style={{ background: "#FDFAF6" }}>
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p style={{ color: "#1A3E61", opacity: 0.5, fontSize: "1.1rem" }}>
                No articles found. Try a different search or category.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={i}
                  onOpen={setSelectedArticle}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ARTICLE MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
