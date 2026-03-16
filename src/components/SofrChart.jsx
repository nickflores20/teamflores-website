// FILE: src/components/SofrChart.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

const SOFR_VALUES = [5.30, 5.31, 5.33, 5.30, 5.28, 5.25, 5.20, 5.15, 5.10, 5.08, 5.05, 5.02];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DATA = MONTHS.map((month, i) => ({
  month,
  sofr: SOFR_VALUES[i],
  apr: parseFloat((SOFR_VALUES[i] + 1.5).toFixed(2)),
}));

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        backgroundColor: '#1A3E61',
        border: '1px solid #C6A76F',
        borderRadius: '8px',
        padding: '10px 16px',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      <p style={{ color: '#C6A76F', fontWeight: 700, marginBottom: '6px', fontSize: '0.82rem' }}>
        {label}
      </p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color, fontSize: '0.9rem', marginBottom: '2px' }}>
          {entry.name}: {entry.value.toFixed(2)}%
        </p>
      ))}
    </div>
  );
}

function CustomLegend({ payload }) {
  if (!payload) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '12px' }}>
      {payload.map((entry) => (
        <div key={entry.value} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '3px',
              backgroundColor: entry.color,
              borderRadius: '2px',
              ...(entry.value === 'EquitySelect APR' ? { backgroundImage: `repeating-linear-gradient(to right, ${entry.color} 0, ${entry.color} 5px, transparent 5px, transparent 10px)` } : {}),
            }}
          />
          <span style={{ fontFamily: 'Nunito, sans-serif', color: '#FFFFFF', fontSize: '0.82rem', opacity: 0.85 }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CustomXTick({ x, y, payload }) {
  return (
    <text x={x} y={y + 12} fill="#FFFFFF" opacity={0.7} textAnchor="middle" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px' }}>
      {payload.value}
    </text>
  );
}

function CustomYTick({ x, y, payload }) {
  return (
    <text x={x} y={y} fill="#FFFFFF" opacity={0.7} textAnchor="end" dominantBaseline="middle" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px' }}>
      {payload.value.toFixed(1)}%
    </text>
  );
}

export default function SofrChart() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4"
      style={{ backgroundColor: '#1A3E61' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto"
      >
        {/* Headline */}
        <h2
          className="text-center mb-3"
          style={{
            fontFamily: '"EB Garamond", serif',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          Your Rate. Transparent. Always.
        </h2>
        <p
          className="text-center mb-4"
          style={{
            fontFamily: 'Nunito, sans-serif',
            color: '#FFFFFF',
            opacity: 0.6,
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: '540px',
            margin: '0 auto 2.5rem',
          }}
        >
          The EquitySelect rate is indexed to SOFR — the benchmark rate published by the Federal
          Reserve. Your APR is simply SOFR&nbsp;+&nbsp;1.50%. No surprises, no hidden margins.
        </p>

        {/* Chart wrapper */}
        <div
          style={{
            backgroundColor: '#0F1C2E',
            borderRadius: '1rem',
            padding: '2rem',
          }}
        >
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={DATA} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <ReferenceArea
                y1={5.0}
                y2={9.0}
                fill="rgba(198,167,111,0.07)"
                label={{ value: 'APR Range', fill: 'rgba(198,167,111,0.45)', fontSize: 11, fontFamily: 'Nunito, sans-serif', position: 'insideTopRight' }}
              />
              <XAxis
                dataKey="month"
                tick={<CustomXTick />}
                axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                tickLine={false}
              />
              <YAxis
                domain={[4.5, 7]}
                tick={<CustomYTick />}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Line
                type="monotone"
                dataKey="sofr"
                name="SOFR Rate"
                stroke="#FFFFFF"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: '#FFFFFF', strokeWidth: 0 }}
                isAnimationActive={inView}
                animationBegin={100}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="apr"
                name="EquitySelect APR"
                stroke="#C6A76F"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 5, fill: '#C6A76F', strokeWidth: 0 }}
                isAnimationActive={inView}
                animationBegin={300}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center mt-6"
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '0.72rem',
            color: '#FFFFFF',
            opacity: 0.4,
            maxWidth: '560px',
            margin: '1.5rem auto 0',
            lineHeight: 1.6,
          }}
        >
          Variable APR ranging from 5.00%–9.00% (SOFR + 1.50% margin). Rate subject to change.
          Not a commitment to lend.
        </p>
      </motion.div>
    </section>
  );
}
