import { CTAS } from '../config/site';
import { ctaUrl } from '../lib/cta';

// The three Sonar CTAs. `page` feeds utm_term so each page's clicks can be attributed.
export default function CtaButtons({ page = 'home', dark = true, className = '' }) {
  const ghost = `btn btn-ghost${dark ? '' : ' btn-ghost-dark'}`;
  const items = [
    { key: 'getPreApproved', cls: 'btn btn-gold' },
    { key: 'checkPricing', cls: ghost },
    { key: 'startApplication', cls: ghost },
  ];
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map(({ key, cls }) => (
        <a key={key} href={ctaUrl(key, page)} target="_blank" rel="noopener noreferrer" className={cls}>
          {CTAS[key].label}
        </a>
      ))}
    </div>
  );
}
