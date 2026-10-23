import { Link, useLocation } from 'react-router-dom';
import { OFFICER, CTAS } from '../config/site';
import { Container } from '../components/Section';

export default function ComingSoon() {
  const { search } = useLocation();
  const cta = Object.values(CTAS).find((c) => c.utmContent === new URLSearchParams(search).get('cta'));
  return (
    <section className="hero-bg">
      <Container className="py-20 text-center">
        <h1 className="text-white">Link coming soon</h1>
        <p className="mt-4 max-w-xl mx-auto text-base lg:text-lg" style={{ color: '#E3EAF2' }}>
          {cta ? `The "${cta.label}" button` : 'This button'} will open a secure page once SunnyHill Financial provides
          the link. For now, call {OFFICER.name} directly or send a message.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a href={OFFICER.phoneHref} className="btn btn-gold">Call {OFFICER.phoneDisplay}</a>
          <Link to="/contact" className="btn btn-ghost">Send a message</Link>
          <Link to="/" className="btn btn-ghost">Home</Link>
        </div>
      </Container>
    </section>
  );
}
