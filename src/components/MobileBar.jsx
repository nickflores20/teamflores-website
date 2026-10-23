import { OFFICER } from '../config/site';
import { ctaUrl } from '../lib/cta';

// Sticky call + pre-approval bar, phones only.
export default function MobileBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-3 px-4 pt-3"
      style={{
        background: 'rgba(15,28,46,0.97)',
        borderTop: '1px solid rgba(198,167,111,0.4)',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      <a href={OFFICER.phoneHref} className="btn btn-ghost" aria-label={`Call ${OFFICER.phoneDisplay}`}>Call</a>
      <a href={ctaUrl('getPreApproved', 'mobile-bar')} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
        Get Pre-Approved
      </a>
    </div>
  );
}
