// FILE: src/components/MortgageCalculator.jsx
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// ─── Helpers ────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const fmtFull = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function addMonths(year, month, n) {
  let m = month + n;
  let y = year + Math.floor((m - 1) / 12);
  m = ((m - 1) % 12) + 1;
  return { year: y, month: m };
}

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#0F1C2E',
      border: '1px solid #C6A76F',
      borderRadius: 8,
      padding: '12px 16px',
      fontFamily: 'Nunito, sans-serif',
      fontSize: 13,
      color: '#fff',
      minWidth: 200,
    }}>
      <p style={{ color: '#C6A76F', fontWeight: 700, marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 2 }}>
          <span style={{ color: p.color || '#fff' }}>{p.name}</span>
          <span style={{ fontWeight: 600 }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Ripple Button ───────────────────────────────────────────────────────────

function RippleButton({ onClick, children, className = '', style = {} }) {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const handleClick = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.45)',
            transform: 'translate(-50%,-50%) scale(0)',
            animation: 'ripple-burst 0.7s ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
      {children}
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MortgageCalculator() {
  // ── Inputs ──
  const [loanType, setLoanType] = useState('purchase');
  const [purchasePrice, setPurchasePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [termYears, setTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(6.875);
  const [propertyTax, setPropertyTax] = useState(4800);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [propertyInsurance, setPropertyInsurance] = useState(1200);
  const [startMonth, setStartMonth] = useState(new Date().getMonth() + 1);
  const [startYear, setStartYear] = useState(new Date().getFullYear());

  // ── UI State ──
  const [tableView, setTableView] = useState('yearly');
  const [showAllRows, setShowAllRows] = useState(false);
  const [calculated, setCalculated] = useState(true);

  // ── Derived ──
  const loanAmount = Math.max(0, purchasePrice - downPayment);
  const downPct = purchasePrice > 0 ? ((downPayment / purchasePrice) * 100).toFixed(1) : '0.0';
  const r = interestRate / 12 / 100;
  const n = termYears * 12;

  const monthlyPI = useMemo(() => {
    if (r === 0) return loanAmount / n;
    return loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, r, n]);

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = propertyInsurance / 12;
  const monthlyPMI = (pmiRate / 100 * loanAmount) / 12;

  // PMI drops when LTV <= 80%
  const pmiDropMonth = useMemo(() => {
    if (downPayment / purchasePrice >= 0.2) return null;
    const threshold = purchasePrice * 0.8;
    let bal = loanAmount;
    for (let i = 1; i <= n; i++) {
      const interest = bal * r;
      const principal = monthlyPI - interest;
      bal -= principal;
      if (bal <= threshold) return i;
    }
    return null;
  }, [loanAmount, purchasePrice, downPayment, r, n, monthlyPI]);

  const pmiDropDate = useMemo(() => {
    if (!pmiDropMonth) return null;
    const d = addMonths(startYear, startMonth, pmiDropMonth);
    return `${MONTHS[d.month - 1]} ${d.year}`;
  }, [pmiDropMonth, startMonth, startYear]);

  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + (pmiDropMonth ? monthlyPMI : 0);

  // ── Amortization schedule ──
  const schedule = useMemo(() => {
    const rows = [];
    let bal = loanAmount;
    for (let i = 1; i <= n; i++) {
      const interest = bal * r;
      const principal = monthlyPI - interest;
      const pmi = pmiDropMonth && i <= pmiDropMonth ? monthlyPMI : 0;
      const taxIns = monthlyTax + monthlyInsurance;
      const total = principal + interest + taxIns + pmi;
      bal = Math.max(0, bal - principal);
      const d = addMonths(startYear, startMonth, i - 1);
      rows.push({ month: i, year: Math.ceil(i / 12), principal, interest, pmi, taxIns, total, balance: bal, mLabel: `${MONTHS[d.month - 1]} ${d.year}` });
    }
    return rows;
  }, [loanAmount, r, n, monthlyPI, monthlyTax, monthlyInsurance, monthlyPMI, pmiDropMonth, startMonth, startYear]);

  // Yearly aggregation
  const yearlyData = useMemo(() => {
    const map = {};
    schedule.forEach((row) => {
      if (!map[row.year]) map[row.year] = { year: row.year, principal: 0, interest: 0, taxInsPmi: 0, balance: 0 };
      map[row.year].principal += row.principal;
      map[row.year].interest += row.interest;
      map[row.year].taxInsPmi += row.taxIns + row.pmi;
      map[row.year].balance = row.balance;
    });
    return Object.values(map);
  }, [schedule]);

  // Chart data (show key years)
  const chartData = useMemo(() => {
    const keyYears = new Set([1, 5, 10, 15, 20, 25, 30]);
    return yearlyData
      .filter((d) => keyYears.has(d.year) && d.year <= termYears)
      .map((d) => ({
        name: `Year ${d.year}`,
        Principal: Math.round(d.principal),
        Interest: Math.round(d.interest),
        'Tax+Ins+PMI': Math.round(d.taxInsPmi),
        Balance: Math.round(d.balance),
      }));
  }, [yearlyData, termYears]);

  // Table rows
  const tableRows = useMemo(() => {
    if (tableView === 'yearly') return yearlyData;
    return schedule;
  }, [tableView, yearlyData, schedule]);

  const visibleRows = showAllRows ? tableRows : tableRows.slice(0, 20);

  const totalPaid = schedule.reduce((s, r) => s + r.total, 0);
  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
  const payoffDate = schedule.length ? schedule[schedule.length - 1].mLabel : '';

  const inputStyle = {
    fontFamily: 'Nunito, sans-serif',
    background: '#fff',
    border: '1.5px solid #C6A76F',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 15,
    color: '#0F1C2E',
    width: '100%',
    outline: 'none',
  };

  const prefixWrapper = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const prefix = {
    position: 'absolute',
    left: 12,
    color: '#C6A76F',
    fontFamily: 'Nunito, sans-serif',
    fontWeight: 700,
    fontSize: 15,
    pointerEvents: 'none',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
        @keyframes ripple-burst {
          to { transform: translate(-50%,-50%) scale(30); opacity: 0; }
        }
        .calc-input:focus { border-color: #1A3E61 !important; box-shadow: 0 0 0 3px rgba(26,62,97,0.15); }
        .calc-tab-active { background: #C6A76F !important; color: #0F1C2E !important; }
        .calc-row-even { background: #F0E6D2; }
        .calc-row-odd { background: #fff; }
        .amort-expand { overflow: hidden; }
      `}</style>

      <section style={{ background: '#F0E6D2', padding: '80px 20px', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Headline */}
          <h2 style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(28px,4vw,48px)', color: '#1A3E61', textAlign: 'center', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: 8 }}>
            Calculate Your Monthly Payment
          </h2>
          <p style={{ textAlign: 'center', color: '#1A3E61', opacity: 0.7, fontFamily: 'Nunito, sans-serif', marginBottom: 48, fontSize: 16 }}>
            Get an accurate estimate of your total monthly mortgage cost.
          </p>

          {/* Toggle Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, gap: 0 }}>
            {['purchase', 'refinance'].map((t) => (
              <button
                key={t}
                onClick={() => setLoanType(t)}
                className={loanType === t ? 'calc-tab-active' : ''}
                style={{
                  padding: '10px 32px',
                  border: '2px solid #C6A76F',
                  background: loanType === t ? '#C6A76F' : 'transparent',
                  color: loanType === t ? '#0F1C2E' : '#1A3E61',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  borderRadius: t === 'purchase' ? '8px 0 0 8px' : '0 8px 8px 0',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {t === 'purchase' ? 'Purchase' : 'Refinance'}
              </button>
            ))}
          </div>

          {/* Input Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24, marginBottom: 40 }}>

            {/* Purchase Price */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {loanType === 'refinance' ? 'Home Value' : 'Purchase Price'}
              </label>
              <div style={prefixWrapper}>
                <span style={prefix}>$</span>
                <input
                  type="number"
                  className="calc-input"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  style={{ ...inputStyle, paddingLeft: 28 }}
                />
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {loanType === 'refinance' ? 'Current Balance' : 'Down Payment'}
                <span style={{ marginLeft: 8, fontWeight: 400, color: '#C6A76F', fontSize: 13, textTransform: 'none' }}>({downPct}%)</span>
              </label>
              <div style={prefixWrapper}>
                <span style={prefix}>$</span>
                <input
                  type="number"
                  className="calc-input"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  style={{ ...inputStyle, paddingLeft: 28 }}
                />
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Loan Term</label>
              <select
                className="calc-input"
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                style={{ ...inputStyle }}
              >
                {[10, 15, 20, 30].map((y) => (
                  <option key={y} value={y}>{y}-Year Fixed</option>
                ))}
              </select>
            </div>

            {/* Interest Rate */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interest Rate</label>
              <div style={prefixWrapper}>
                <input
                  type="number"
                  className="calc-input"
                  value={interestRate}
                  step={0.125}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ ...inputStyle, paddingRight: 28 }}
                />
                <span style={{ ...prefix, left: 'auto', right: 12 }}>%</span>
              </div>
            </div>

            {/* Property Tax */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Property Tax / yr</label>
              <div style={prefixWrapper}>
                <span style={prefix}>$</span>
                <input
                  type="number"
                  className="calc-input"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Number(e.target.value))}
                  style={{ ...inputStyle, paddingLeft: 28 }}
                />
              </div>
            </div>

            {/* PMI */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PMI Rate</label>
              <div style={prefixWrapper}>
                <input
                  type="number"
                  className="calc-input"
                  value={pmiRate}
                  step={0.1}
                  onChange={(e) => setPmiRate(Number(e.target.value))}
                  style={{ ...inputStyle, paddingRight: 28 }}
                />
                <span style={{ ...prefix, left: 'auto', right: 12 }}>%</span>
              </div>
            </div>

            {/* Property Insurance */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Property Insurance / yr</label>
              <div style={prefixWrapper}>
                <span style={prefix}>$</span>
                <input
                  type="number"
                  className="calc-input"
                  value={propertyInsurance}
                  onChange={(e) => setPropertyInsurance(Number(e.target.value))}
                  style={{ ...inputStyle, paddingLeft: 28 }}
                />
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 700, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Start Date</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <select
                  className="calc-input"
                  value={startMonth}
                  onChange={(e) => setStartMonth(Number(e.target.value))}
                  style={{ ...inputStyle, flex: 1 }}
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="calc-input"
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  style={{ ...inputStyle, width: 90, flex: '0 0 90px' }}
                />
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <RippleButton
              onClick={() => setCalculated(true)}
              style={{
                background: '#C6A76F',
                color: '#0F1C2E',
                border: 'none',
                borderRadius: 10,
                padding: '14px 56px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: 17,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                boxShadow: '0 8px 24px rgba(198,167,111,0.35)',
              }}
            >
              Calculate
            </RippleButton>
          </div>

          {/* Results */}
          <AnimatePresence>
            {calculated && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Main Payment Card */}
                <div style={{
                  background: '#1A3E61',
                  borderRadius: 20,
                  padding: '40px 32px',
                  textAlign: 'center',
                  marginBottom: 32,
                  boxShadow: '0 20px 60px rgba(15,28,46,0.4), 0 4px 12px rgba(198,167,111,0.12)',
                }}>
                  <p style={{ fontFamily: 'Nunito, sans-serif', color: '#C6A76F', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, fontWeight: 700 }}>
                    Estimated Monthly Payment
                  </p>
                  <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(48px,7vw,80px)', color: '#C6A76F', fontWeight: 600, lineHeight: 1, margin: '0 0 8px' }}>
                    {fmtFull(totalMonthly)}
                  </p>
                  {pmiDropDate && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ fontFamily: 'Nunito, sans-serif', color: '#F0E6D2', fontSize: 14, marginTop: 12, opacity: 0.85 }}
                    >
                      PMI drops off approximately <strong style={{ color: '#C6A76F' }}>{pmiDropDate}</strong> — saving you {fmtFull(monthlyPMI)}/mo
                    </motion.p>
                  )}
                </div>

                {/* 4 Stat Boxes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
                  {[
                    { label: 'Loan Amount', value: fmt(loanAmount) },
                    { label: `Total Over ${n} Payments`, value: fmt(totalPaid) },
                    { label: 'Total Interest', value: fmt(totalInterest) },
                    { label: 'Pay-off Date', value: payoffDate },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background: '#fff',
                        borderRadius: 14,
                        padding: '24px 20px',
                        textAlign: 'center',
                        border: '1.5px solid rgba(198,167,111,0.25)',
                        boxShadow: '0 4px 16px rgba(26,62,97,0.07)',
                      }}
                    >
                      <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#1A3E61', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontWeight: 700, opacity: 0.75 }}>{stat.label}</p>
                      <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 28, color: '#1A3E61', fontWeight: 600, lineHeight: 1 }}>{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Chart */}
                <div style={{ background: '#1A3E61', borderRadius: 20, padding: '32px 16px 16px', marginBottom: 40, boxShadow: '0 12px 40px rgba(15,28,46,0.3)' }}>
                  <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#C6A76F', fontSize: 24, fontWeight: 600, textAlign: 'center', marginBottom: 24, letterSpacing: '-0.02em' }}>
                    Amortization Overview
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={chartData} margin={{ top: 8, right: 60, left: 20, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="name" tick={{ fill: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.2)' }} tickLine={false} />
                      <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#F0E6D2', fontFamily: 'Nunito, sans-serif', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: '#C6A76F', fontFamily: 'Nunito, sans-serif', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontFamily: 'Nunito, sans-serif', color: '#F0E6D2', fontSize: 13, paddingTop: 16 }} />
                      <Bar yAxisId="left" dataKey="Principal" stackId="a" fill="#C6A76F" radius={[0, 0, 0, 0]} />
                      <Bar yAxisId="left" dataKey="Interest" stackId="a" fill="#1A3E61" stroke="#2A5A8A" strokeWidth={1} />
                      <Bar yAxisId="left" dataKey="Tax+Ins+PMI" stackId="a" fill="#C8B99A" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="Balance" stroke="#fff" strokeWidth={2.5} dot={{ fill: '#C6A76F', strokeWidth: 2, r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Amortization Table */}
                <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1.5px solid rgba(198,167,111,0.2)', boxShadow: '0 4px 20px rgba(26,62,97,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: '#F0E6D2', flexWrap: 'wrap', gap: 12 }}>
                    <h3 style={{ fontFamily: 'EB Garamond, serif', color: '#1A3E61', fontSize: 22, fontWeight: 600, margin: 0 }}>Amortization Schedule</h3>
                    <div style={{ display: 'flex', gap: 0 }}>
                      {['yearly', 'monthly'].map((v) => (
                        <button
                          key={v}
                          onClick={() => { setTableView(v); setShowAllRows(false); }}
                          style={{
                            padding: '7px 22px',
                            border: '2px solid #C6A76F',
                            background: tableView === v ? '#C6A76F' : 'transparent',
                            color: tableView === v ? '#0F1C2E' : '#1A3E61',
                            fontFamily: 'Nunito, sans-serif',
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer',
                            borderRadius: v === 'yearly' ? '7px 0 0 7px' : '0 7px 7px 0',
                            transition: 'background 0.2s, color 0.2s',
                          }}
                        >
                          {v === 'yearly' ? 'Yearly' : 'Monthly'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Nunito, sans-serif', fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: '#1A3E61' }}>
                          {[tableView === 'yearly' ? 'Year' : 'Month', 'Principal', 'Interest', 'Tax+Ins+PMI', 'Total Paid', 'Balance'].map((h) => (
                            <th key={h} style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence initial={false}>
                          {visibleRows.map((row, i) => (
                            <motion.tr
                              key={tableView === 'yearly' ? row.year : row.month}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{ background: i % 2 === 0 ? '#fff' : '#F0E6D2' }}
                            >
                              <td style={{ padding: '10px 16px', textAlign: 'right', color: '#1A3E61', fontWeight: 700 }}>
                                {tableView === 'yearly' ? `Year ${row.year}` : row.mLabel}
                              </td>
                              <td style={{ padding: '10px 16px', textAlign: 'right', color: '#2A5A2A' }}>{fmt(row.principal)}</td>
                              <td style={{ padding: '10px 16px', textAlign: 'right', color: '#8B2A2A' }}>{fmt(row.interest)}</td>
                              <td style={{ padding: '10px 16px', textAlign: 'right', color: '#5A4A2A' }}>{fmt(tableView === 'yearly' ? (row.taxInsPmi || 0) : ((row.taxIns || 0) + (row.pmi || 0)))}</td>
                              <td style={{ padding: '10px 16px', textAlign: 'right', color: '#1A3E61' }}>{fmt(tableView === 'yearly' ? ((row.principal || 0) + (row.interest || 0) + (row.taxInsPmi || 0)) : (row.total || 0))}</td>
                              <td style={{ padding: '10px 16px', textAlign: 'right', color: '#1A3E61', fontWeight: 600 }}>{fmt(row.balance)}</td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>

                      {/* Totals Row */}
                      <tfoot>
                        <tr style={{ background: '#1A3E61' }}>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 800, fontFamily: 'EB Garamond, serif', fontSize: 16 }}>Total</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 700 }}>{fmt(schedule.reduce((s, r) => s + r.principal, 0))}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 700 }}>{fmt(totalInterest)}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 700 }}>{fmt(schedule.reduce((s, r) => s + r.taxIns + r.pmi, 0))}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 700 }}>{fmt(totalPaid)}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: '#C6A76F', fontWeight: 700 }}>—</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Show All / Collapse */}
                  {tableRows.length > 20 && (
                    <div style={{ padding: '16px', textAlign: 'center', background: '#F0E6D2' }}>
                      <button
                        onClick={() => setShowAllRows((v) => !v)}
                        style={{
                          background: 'transparent',
                          border: '2px solid #C6A76F',
                          color: '#1A3E61',
                          borderRadius: 8,
                          padding: '8px 28px',
                          fontFamily: 'Nunito, sans-serif',
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                      >
                        {showAllRows ? 'Show Less' : `Show All ${tableRows.length} Rows`}
                      </button>
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#1A3E61', opacity: 0.55, textAlign: 'center', marginTop: 32, lineHeight: 1.7, maxWidth: 700, margin: '32px auto 0' }}>
            *This calculator provides estimates for informational purposes only. Actual loan terms, rates, and payments will vary based on creditworthiness, property type, lender guidelines, and market conditions. Contact a licensed mortgage professional for personalized advice. Sunny Hill Financial, NMLS #1708856.
          </p>
        </div>
      </section>
    </>
  );
}
