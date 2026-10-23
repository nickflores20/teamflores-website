import { DRAFT_BANNER, DRAFT_BANNER_TEXT } from '../config/site';

export default function DraftBanner() {
  if (!DRAFT_BANNER) return null;
  return (
    <div
      role="status"
      className="w-full text-center text-[13px] font-extrabold tracking-wide px-4 py-2"
      style={{ background: '#C6A76F', color: '#0F1C2E', borderBottom: '1px solid rgba(15,28,46,0.25)' }}
    >
      {DRAFT_BANNER_TEXT}
    </div>
  );
}
