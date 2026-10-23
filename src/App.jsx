import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DraftBanner from './components/DraftBanner';
import MobileBar from './components/MobileBar';
import { TalkBand } from './components/Section';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import CityPage from './pages/CityPage';
import ProgramPage from './pages/ProgramPage';
import CalculatorPage from './pages/CalculatorPage';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';
import { COMING_SOON_ROUTE } from './config/routes';
import { ROUTES, REDIRECTS, findRoute } from './config/routes';
import { buildSchema, canonicalFor, robotsContent } from './lib/seo';

// Keeps <head> correct on client-side navigation. The prerender script writes the
// same tags into the static HTML for crawlers.
function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const route = findRoute(pathname);
    document.title = route.title;
    const setMeta = (selector, create, value) => {
      let el = document.head.querySelector(selector);
      if (!el) { el = create(); document.head.appendChild(el); }
      return el;
    };
    setMeta('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' })).content = route.description;
    setMeta('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' })).content = robotsContent(route);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).href = canonicalFor(route.path);
    const ld = setMeta('script#ld-json', () => Object.assign(document.createElement('script'), { type: 'application/ld+json', id: 'ld-json' }));
    ld.textContent = JSON.stringify(buildSchema(route));
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const elementFor = (r) => {
  switch (r.kind) {
    case 'home': return <Home />;
    case 'city': return <CityPage slug={r.slug} />;
    case 'program': return <ProgramPage slug={r.slug} />;
    case 'calculator': return <CalculatorPage />;
    case 'about': return <About />;
    case 'contact': return <Contact />;
    case 'legal': return <Legal />;
    default: return <NotFound />;
  }
};

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <DraftBanner />
      <RouteMeta />
      <Navbar />
      <main id="main">
        <Routes>
          {ROUTES.map((r) => <Route key={r.path} path={r.path} element={elementFor(r)} />)}
          {REDIRECTS.map((r) => <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />)}
          <Route path={COMING_SOON_ROUTE.path} element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <TalkBand />
      <Footer />
      <MobileBar />
    </>
  );
}
