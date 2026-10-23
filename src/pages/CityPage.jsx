import { Link } from 'react-router-dom';
import { getCity, CITIES } from '../content/cities';
import { getProgram } from '../content/programs';
import {
  Hero, SandSection, FaqList, RelatedLinks, LeadBand, Container,
} from '../components/Section';
import NotFound from './NotFound';

export default function CityPage({ slug }) {
  const c = getCity(slug);
  if (!c) return <NotFound />;
  const programs = c.featuredPrograms
    .map((f) => ({ f, p: getProgram(f.slug) }))
    .filter((x) => x.p)
    .map(({ f, p }) => ({ to: `/loan-programs/${p.slug}`, label: p.name, note: f.note }));
  const nearby = c.nearby.map((s) => CITIES.find((x) => x.slug === s)).filter(Boolean);

  return (
    <>
      <Hero eyebrow={`${c.name}, Nevada · ${c.county}`} h1={c.h1} lead={c.lead} page={`city-${c.slug}`} />

      <SandSection>
        <div className="grid gap-10 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 grid gap-8">
            {c.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-[clamp(1.7rem,3vw,2.2rem)]" style={{ color: '#1A3E61' }}>{s.heading}</h2>
                <div className="mt-3 grid gap-4">
                  {s.body.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
            ))}
          </div>
          <aside className="card" aria-label={`${c.name} areas`}>
            <h2 className="font-garamond text-[1.6rem]" style={{ color: '#1A3E61' }}>Areas we often hear about</h2>
            <p className="text-[14px] mt-1 mb-4" style={{ color: '#355577' }}>
              These are general area names, not a complete list or an endorsement of any neighborhood.
            </p>
            <ul className="grid gap-2">
              {c.neighborhoods.map((n) => (
                <li key={n} className="flex gap-3"><span aria-hidden="true" style={{ color: '#C6A76F', fontWeight: 800 }}>•</span>{n}</li>
              ))}
            </ul>
          </aside>
        </div>
      </SandSection>

      <section className="surface-deep">
        <Container className="py-14 sm:py-20">
          <RelatedLinks heading={`Loan programs to explore in ${c.name}`} links={programs} />
        </Container>
      </section>

      <LeadBand page={`city-${c.slug}`} heading={`Talk with Nick about a ${c.name} home loan`} />

      <section className="surface-sand">
        <Container className="py-14 sm:py-20">
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] mb-6" style={{ color: '#1A3E61' }}>{c.name} home loan questions</h2>
          <FaqList items={c.faq} />
          <p className="mt-8 text-[15px]">
            Also serving{' '}
            {nearby.map((n, i) => (
              <span key={n.slug}>
                <Link to={`/nevada/${n.slug}`} className="link-inline link-inline-dark font-bold">{n.name}, NV</Link>
                {i < nearby.length - 2 ? ', ' : i === nearby.length - 2 ? ', and ' : '.'}
              </span>
            ))}
          </p>
        </Container>
      </section>
    </>
  );
}
