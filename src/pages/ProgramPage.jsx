import { Link } from 'react-router-dom';
import { getProgram, PROGRAMS } from '../content/programs';
import { CITIES } from '../content/cities';
import {
  Hero, SandSection, FaqList, GuidelinesCard, RelatedLinks, LeadBand, Container,
} from '../components/Section';
import NotFound from './NotFound';

export default function ProgramPage({ slug }) {
  const p = getProgram(slug);
  if (!p) return <NotFound />;
  const related = p.related
    .map((s) => PROGRAMS.find((x) => x.slug === s))
    .filter(Boolean)
    .map((x) => ({ to: `/loan-programs/${x.slug}`, label: x.name, note: x.description.split('.')[0] + '.' }));

  return (
    <>
      <Hero eyebrow="Loan Programs" h1={p.h1} lead={p.lead} page={`program-${p.slug}`} />

      <SandSection>
        <div className="grid gap-10 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 grid gap-8">
            {p.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-[clamp(1.7rem,3vw,2.2rem)]" style={{ color: '#1A3E61' }}>{s.heading}</h2>
                <div className="mt-3 grid gap-4">
                  {s.body.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            ))}
            <p className="text-[15px]">
              Serving buyers and homeowners in{' '}
              {CITIES.map((c, i) => (
                <span key={c.slug}>
                  <Link to={`/nevada/${c.slug}`} className="link-inline link-inline-dark font-bold">{c.name}</Link>
                  {i < CITIES.length - 2 ? ', ' : i === CITIES.length - 2 ? ', and ' : '.'}
                </span>
              ))}
            </p>
          </div>
          <GuidelinesCard items={p.guidelines} />
        </div>
      </SandSection>

      <section className="surface-deep">
        <Container className="py-14 sm:py-20">
          <h2 className="text-white text-[clamp(1.7rem,3vw,2.3rem)] mb-6">Common questions about {p.name}</h2>
          <FaqList items={p.faq} dark />
        </Container>
      </section>

      <LeadBand page={`program-${p.slug}`} heading={`Talk with Nick about ${p.short === 'Refinance' ? 'refinancing' : `${p.short} options`}`} />

      <section className="surface-deep">
        <Container className="py-14 sm:py-20">
          <RelatedLinks heading="Related loan programs" links={related} />
          <p className="mt-8 text-sm" style={{ color: '#B9C6D4' }}>
            Want to see how the numbers could look? Try the{' '}
            <Link to="/mortgage-calculator" className="link-inline">educational mortgage calculator</Link>. It is an
            estimate only and not a rate quote.
          </p>
        </Container>
      </section>
    </>
  );
}
