import { Link } from 'react-router-dom';
import { OFFICER, COMPANY, LICENSED_STATES, LICENSED_STATES_VERIFIED } from '../config/site';
import { Hero, SandSection, LeadBand } from '../components/Section';
import Verify from '../components/Verify';

export default function About() {
  return (
    <>
      <Hero
        eyebrow="About"
        h1="About Nick Flores Sr."
        lead={`${OFFICER.title} at ${COMPANY.name}, serving home buyers and homeowners in Las Vegas, Henderson, Reno, and Sparks, Nevada.`}
        page="about"
      />

      <SandSection>
        <div className="grid gap-10 md:grid-cols-3 items-start">
          <div className="flex justify-center md:justify-start">
            <img
              src={OFFICER.photo}
              alt={`${OFFICER.name}, ${OFFICER.title} at ${COMPANY.name}`}
              width="336"
              height="424"
              className="rounded-2xl"
              style={{ width: 'min(300px, 100%)', boxShadow: '0 2px 6px rgba(26,62,97,0.15), 0 24px 50px -18px rgba(26,62,97,0.45)' }}
            />
          </div>
          <div className="md:col-span-2 grid gap-5">
            <h2 className="text-[clamp(1.8rem,3vw,2.4rem)]" style={{ color: '#1A3E61' }}>Who you will be working with</h2>
            <p>
              {OFFICER.name} is a {OFFICER.title} at {COMPANY.name}. His NMLS number is {OFFICER.nmls}. You can look up
              his license information at{' '}
              <a className="link-inline link-inline-dark font-bold" href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer">
                NMLS Consumer Access
              </a>.
            </p>
            <p>
              <Verify>add Nick&apos;s approved bio, background, and years of experience</Verify>
            </p>

            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] mt-4" style={{ color: '#1A3E61' }}>What you can expect</h2>
            <ul className="grid gap-3">
              <li className="flex gap-3"><span aria-hidden="true" style={{ color: '#8a6c2f', fontWeight: 800 }}>•</span>Plain-English explanations of the programs that may fit you.</li>
              <li className="flex gap-3"><span aria-hidden="true" style={{ color: '#8a6c2f', fontWeight: 800 }}>•</span>Side-by-side comparisons using your own numbers.</li>
              <li className="flex gap-3"><span aria-hidden="true" style={{ color: '#8a6c2f', fontWeight: 800 }}>•</span>A clear list of the documents you will need.</li>
            </ul>

            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] mt-4" style={{ color: '#1A3E61' }}>Licensing</h2>
            <p>
              Licensed states: {LICENSED_STATES.join(', ')}.
              {!LICENSED_STATES_VERIFIED && <> <Verify>confirm licensed states with SunnyHill Financial</Verify></>}
              {' '}Nevada loan programs are available as described on each{' '}
              <Link to="/loan-programs/first-time-buyer" className="link-inline link-inline-dark font-bold">loan program page</Link>.
            </p>
            <p>
              <Link to="/contact" className="btn btn-gold">Contact Nick</Link>
            </p>
          </div>
        </div>
      </SandSection>

      <LeadBand page="about" heading="Have a question for Nick?" />
    </>
  );
}
