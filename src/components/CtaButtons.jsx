import { CTAS } from '../config/site';
import { ctaUrl } from '../lib/cta';

// The three Sonar CTAs. Get Pre-Approved is the one dominant gold button; the other two are
// quieter text links. `page` feeds utm_term so each page's clicks can be attributed.
export default function CtaButtons({ page = 'home', dark = true, className = '' }) {
  const link = dark ? 'btn-text' : 'btn-text btn-text-dark';
  const items = [
    { key: 'getPreApproved', cls: 'btn btn-gold' },
    { key: 'checkPricing', cls: link },
    { key: 'startApplication', cls: link },
  ];
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {items.map(({ key, cls }) => (
        <a key={key} href={ctaUrl(key, page)} target="_blank" rel="noopener noreferrer" className={cls}>
          {CTAS[key].label}
        </a>
      ))}
    </div>
  );
}
