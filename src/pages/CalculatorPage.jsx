import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero, Container } from '../components/Section';
import CtaButtons from '../components/CtaButtons';
import { PROGRAMS } from '../content/programs';

const MortgageCalculator = lazy(() => import('../components/MortgageCalculator'));

// The calculator is client-only so the heavy chart code stays out of the prerendered HTML.
function ClientOnly({ children, fallback }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <Suspense fallback={fallback}>{children}</Suspense> : fallback;
}

export default function CalculatorPage() {
  return (
    <>
      <Hero
        eyebrow="Educational estimate only"
        h1="Mortgage Payment Calculator"
        lead="Explore how price, down payment, and term can change an estimated monthly payment. This is an educational estimate only. It is not a rate quote, an offer, or a commitment to lend."
        page="calculator"
      />

      <section className="section-sand">
        <ClientOnly fallback={<div style={{ minHeight: 480 }} className="px-4 py-16 text-center">Loading calculator...</div>}>
          <MortgageCalculator />
        </ClientOnly>
      </section>

      <section className="section-navy">
        <Container className="py-14">
          <h2 className="text-white">Want numbers based on your situation?</h2>
          <p className="mt-3 max-w-2xl" style={{ color: '#E3EAF2' }}>
            The calculator uses assumptions you enter yourself. Actual terms depend on your loan program, finances, and property, and are subject to underwriting approval.
          </p>
          <CtaButtons page="calculator" className="mt-6" />
          <p className="mt-8 text-base" style={{ color: '#E3EAF2' }}>
            Learn about:{' '}
            {PROGRAMS.map((p, i) => (
              <span key={p.slug}>
                <Link to={`/loan-programs/${p.slug}`} className="link-inline">{p.name}</Link>
                {i < PROGRAMS.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </Container>
      </section>
    </>
  );
}
