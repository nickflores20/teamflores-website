import { Link } from 'react-router-dom';
import { Container } from '../components/Section';

export default function NotFound() {
  return (
    <section className="hero-bg grain-overlay">
      <Container className="relative z-[2] py-24 text-center">
        <h1 className="text-white text-[clamp(2.2rem,5vw,3.6rem)]">Page not found</h1>
        <p className="mt-4" style={{ color: '#D5DEE8' }}>That page may have moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn btn-gold">Home</Link>
          <Link to="/loan-programs/first-time-buyer" className="btn btn-ghost">First-Time Buyers</Link>
          <Link to="/contact" className="btn btn-ghost">Contact</Link>
        </div>
      </Container>
    </section>
  );
}
