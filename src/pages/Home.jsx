import { Link } from 'react-router-dom';
import { OFFICER, COMPANY } from '../config/site';
import { PROGRAMS } from '../content/programs';
import { CITIES } from '../content/cities';
import { Hero, Section, LeadBand, ShieldIcon } from '../components/Section';

const STEPS = [
  { n: '1', t: 'Talk it through', d: 'Share your goals and timeline. Nick explains the programs that may fit your situation.' },
  { n: '2', t: 'Check pricing and get pre-approved', d: 'Use the secure links to review options and start a pre-approval. A pre-approval is not a commitment to lend.' },
  { n: '3', t: 'Shop with a plan', d: 'Work with your real estate agent knowing your budget and what documents are needed.' },
  { n: '4', t: 'Underwriting and closing', d: 'Your file goes through underwriting. Final approval depends on your documents and the property.' },
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Las Vegas · Henderson · Reno · Sparks"
        h1="Nevada Mortgage Loan Officer"
        lead={`${OFFICER.name}, ${OFFICER.title} at ${COMPANY.name}, helps home buyers and homeowners across Nevada understand their loan options and take the next step with confidence.`}
        page="home"
      >
        <p className="mt-3 flex items-start gap-2 text-[15px]" style={{ color: '#E3EAF2' }}>
          <span className="mt-[3px] flex-shrink-0"><ShieldIcon /></span>
          <span>NMLS #{OFFICER.nmls}. Pre-approval is not a commitment to lend and is subject to underwriting approval.</span>
        </p>
      </Hero>

      <Section tone="sand">
        <h2 style={{ color: '#1A3E61' }}>Loan programs for Nevada buyers and homeowners</h2>
        <p className="mt-3 max-w-2xl">
          Every borrower is different. Start with the program that sounds closest to your situation, or talk with Nick and compare.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <li key={p.slug}>
              <Link to={`/loan-programs/${p.slug}`} className="card-link card h-full">
                <span className="font-garamond text-[1.35rem] block" style={{ color: '#1A3E61' }}>{p.name}</span>
                <span className="text-[15px] block mt-2">{p.lead.split('. ')[0]}.</span>
                <span className="text-[15px] font-extrabold block mt-3" style={{ color: '#8a6c2f' }}>Learn more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <h2 style={{ color: '#1A3E61' }}>Serving four Nevada markets</h2>
        <p className="mt-3 max-w-2xl">
          Local neighborhoods, property types, and loan considerations differ from city to city.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/nevada/${c.slug}`} className="card-link card h-full">
                <span className="font-garamond text-[1.5rem] block" style={{ color: '#1A3E61' }}>{c.name}, NV</span>
                <span className="text-[15px] block mt-1">{c.county}</span>
                <span className="text-[15px] block mt-2">{c.neighborhoods.slice(0, 3).join(', ')}</span>
                <span className="text-[15px] font-extrabold block mt-3" style={{ color: '#8a6c2f' }}>Explore {c.name} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <h2 style={{ color: '#1A3E61' }}>What to expect</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="card">
              <span className="font-garamond text-[2.2rem]" style={{ color: '#8a6c2f', lineHeight: 1 }}>{s.n}</span>
              <h3 className="text-[1.35rem] mt-2" style={{ color: '#1A3E61' }}>{s.t}</h3>
              <p className="text-[15px] mt-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 md:grid-cols-3 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src={OFFICER.photo}
              alt={`${OFFICER.name}, ${OFFICER.title} at ${COMPANY.name}`}
              width="280"
              height="280"
              className="rounded-full object-cover"
              style={{ width: 'min(280px, 100%)', aspectRatio: '1 / 1', objectPosition: 'center 18%', border: '2px solid #C6A76F', padding: 4, background: '#fff', boxShadow: '0 12px 28px -14px rgba(26,62,97,0.35)' }}
            />
          </div>
          <div className="md:col-span-2">
            <h2 style={{ color: '#1A3E61' }}>Meet Nick Flores Sr.</h2>
            <p className="mt-4">
              {OFFICER.name} is a {OFFICER.title} at {COMPANY.name} (NMLS #{OFFICER.nmls}). He works with home buyers,
              homeowners, and investors in Las Vegas, Henderson, Reno, and Sparks.
            </p>
            <p className="mt-3">
              Call directly at <a className="link-inline link-inline-dark font-bold" href={OFFICER.phoneHref}>{OFFICER.phoneDisplay}</a>.
            </p>
            <p className="mt-5">
              <Link to="/about" className="btn btn-ghost btn-ghost-dark">About Nick</Link>
            </p>
          </div>
        </div>
      </Section>

      <LeadBand page="home" heading="Start the conversation" />
    </>
  );
}
