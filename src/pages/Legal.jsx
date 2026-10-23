import { Link } from 'react-router-dom';
import {
  OFFICER, COMPANY, LICENSED_STATES, LICENSED_STATES_VERIFIED, FOOTER_DISCLOSURE, EHO_STATEMENT,
} from '../config/site';
import { Hero, SandSection } from '../components/Section';
import Verify from '../components/Verify';

const H = ({ children }) => <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] mt-6" style={{ color: '#1A3E61' }}>{children}</h2>;

export default function Legal() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        h1="Privacy and Disclosures"
        lead="How this website handles your information, and important notices about licensing and loan products."
        page="legal"
      />
      <SandSection>
        <div className="max-w-3xl grid gap-4">
          <p className="text-sm">
            <Verify>this page is a draft and needs review by SunnyHill Financial compliance and legal before launch</Verify>
          </p>

          <H>Privacy</H>
          <p>
            When you submit the contact form, we collect your name, phone number, email address, ZIP code or city,
            your goal, and any optional note you choose to write. We use this information to respond to your inquiry.
            It is sent to {OFFICER.name} and {COMPANY.name} through a customer relationship management (CRM) service.
          </p>
          <p>
            Please do not send Social Security numbers, bank or card numbers, or other sensitive information through this
            website&apos;s form. This form is not a loan application. If you apply for a loan, you will be directed to a
            separate secure application site.
          </p>
          <p>
            If you check the consent box, you agree to be contacted by phone, text, or email about your inquiry. Consent is
            not a condition of any purchase or loan, and you can ask to stop at any time. Message and data rates may apply.
          </p>
          <p>
            This website does not currently use advertising cookies. <Verify>update this section if analytics or tracking tools are added</Verify>
          </p>
          <p>
            Links to external sites, including the secure pricing and application pages, are governed by those
            sites&apos; own privacy policies. <Verify>link to the SunnyHill Financial privacy policy</Verify>
          </p>

          <H>Licensing</H>
          <p>
            {OFFICER.name}, {OFFICER.title}, {COMPANY.name}, NMLS #{OFFICER.nmls}. Company NMLS #: <Verify>company NMLS #</Verify>.
          </p>
          <p>
            Licensed states: {LICENSED_STATES.join(', ')}.
            {!LICENSED_STATES_VERIFIED && <> <Verify>confirm licensed states and license numbers with SunnyHill Financial</Verify></>}
          </p>
          <p>
            Check license information at{' '}
            <a className="link-inline link-inline-dark font-bold" href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer">
              NMLS Consumer Access
            </a>.
          </p>

          <H>Loan disclosures</H>
          <p className="font-bold">{FOOTER_DISCLOSURE}</p>
          <p>
            Information on this website is for general education. It is not an offer, a commitment to lend, or a
            guarantee of approval, rates, terms, or pricing. Loan programs, eligibility, and guidelines are subject to
            change and vary by borrower, property, and location. Contact {OFFICER.name} for current information.
          </p>
          <p>
            The mortgage calculator provides educational estimates only. It is not a rate quote and does not reflect your
            actual loan terms. See the <Link className="link-inline link-inline-dark font-bold" to="/mortgage-calculator">calculator page</Link>.
          </p>

          <H>Equal Housing</H>
          <p>{EHO_STATEMENT}.</p>
        </div>
      </SandSection>
    </>
  );
}
