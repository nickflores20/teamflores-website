// FILE: src/components/EquityChart.jsx
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const DATA = [
  { name: 'Bank HELOC', value: 33000 },
  { name: 'EquitySelect', value: 200000 },
];

function formatDollar(v) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
  return `$${v}`;
}

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
      <p style={{ color: '#C6A76F', fontWeight: 700, marginBottom: '4px', fontSize: '0.85rem' }}>
        {label}
      </p>
      <p style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600 }}>
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

function CustomYAxisTick({ x, y, payload }) {
  return (
    <text x={x} y={y} fill="#FFFFFF" opacity={0.7} textAnchor="end" dominantBaseline="middle" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px' }}>
      {formatDollar(payload.value)}
    </text>
  );
}

function CustomXAxisTick({ x, y, payload }) {
  return (
    <text x={x} y={y + 12} fill="#FFFFFF" opacity={0.85} textAnchor="middle" style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 600 }}>
      {payload.value}
    </text>
  );
}

export default function EquityChart() {
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
          The Equity Gap Is Real
        </h2>
        <p
          className="text-center mb-12"
          style={{
            fontFamily: 'Nunito, sans-serif',
            color: '#FFFFFF',
            opacity: 0.55,
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          Same home. Same borrower. Dramatically different results.
        </p>

        {/* Chart wrapper */}
        <div
          style={{
            backgroundColor: '#0F1C2E',
            borderRadius: '1rem',
            padding: '2rem',
            position: 'relative',
          }}
        >
          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              backgroundColor: '#C6A76F',
              color: '#0F1C2E',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              padding: '5px 12px',
              borderRadius: '9999px',
              zIndex: 10,
            }}
          >
            506% More Equity
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={DATA}
              margin={{ top: 20, right: 40, left: 20, bottom: 10 }}
              barCategoryGap="35%"
            >
              <XAxis
                dataKey="name"
                tick={<CustomXAxisTick />}
                axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatDollar}
                tick={<CustomYAxisTick />}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                isAnimationActive={inView}
                animationBegin={200}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {DATA.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={index === 1 ? '#C6A76F' : 'rgba(198,167,111,0.4)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </section>
  );
}
