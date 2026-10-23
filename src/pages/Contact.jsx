import { OFFICER, COMPANY, SCHEDULING_URL, UNVERIFIED, isVerified } from '../config/site';
import { Hero, SandSection, Container } from '../components/Section';
import LeadForm from '../components/LeadForm';
import CtaButtons from '../components/CtaButtons';

export default function Contact() {
  const showScheduling = isVerified(SCHEDULING_URL);
  return (
    <>
      <Hero
        eyebrow="Contact"
        h1="Contact Nick Flores Sr."
        lead={`Call ${OFFICER.name} directly or send a short message. You can also check pricing or start an application with ${COMPANY.name}.`}
        page="contact"
      />

      <SandSection>
        <div className="grid gap-10 lg:grid-cols-5 items-start">
          <div className="lg:col-span-2 grid gap-6">
            <div className="card">
              <h2 className="font-garamond text-[1.7rem]" style={{ color: '#1A3E61' }}>Direct line</h2>
              <p className="mt-2">
                <a href={OFFICER.phoneHref} className="font-extrabold text-[1.4rem] link-inline link-inline-dark">{OFFICER.phoneDisplay}</a>
              </p>
              <p className="text-sm mt-2" style={{ color: '#355577' }}>
                {OFFICER.name}, {OFFICER.title}, {COMPANY.name}. NMLS #{OFFICER.nmls}.
              </p>
              {showScheduling && (
                <p className="mt-4">
                  <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-ghost-dark">Schedule a call</a>
                </p>
              )}
              {isVerified(UNVERIFIED.email) && (
                <p className="mt-3 text-sm"><a href={`mailto:${UNVERIFIED.email}`} className="link-inline link-inline-dark">{UNVERIFIED.email}</a></p>
              )}
            </div>
            <div className="card">
              <h2 className="font-garamond text-[1.7rem]" style={{ color: '#1A3E61' }}>Ready to move now?</h2>
              <p className="text-sm mt-2 mb-4" style={{ color: '#355577' }}>
                These links open a secure site. Submitting a pre-approval request is not a commitment to lend.
              </p>
              <CtaButtons page="contact" dark={false} />
            </div>
          </div>
          <div className="lg:col-span-3">
            <LeadForm page="contact" heading="Send a message" id="contact-form" />
          </div>
        </div>
      </SandSection>

      <section className="surface-deep">
        <Container className="py-12">
          <p style={{ color: '#D5DEE8' }}>
            Serving Las Vegas, Henderson, Reno, and Sparks, Nevada. This website does not list a branch address.
          </p>
        </Container>
      </section>
    </>
  );
}
