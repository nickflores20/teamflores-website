# TODO_FOR_HUMAN

Site is **DRAFT + noindex** by default. Nothing is deployed. Items below block launch.

## Facts to confirm with SunnyHill Financial
- [ ] Company NMLS # (footer + Privacy page show a `[[VERIFY]]` marker). The old site showed #1708856; it is NOT used anywhere until confirmed. Held in `src/config/site.js` (`UNVERIFIED`).
- [ ] Contact email (old site: nick@sunnyhillfinancial.com, unused). Set `UNVERIFIED.email` in `src/config/site.js` to show it on Contact.
- [ ] Street address (old site: 871 Coronado Center Drive). Not published; schema has no address.
- [ ] Licensed states NV, AZ, CA, FL, TX, WA, OR (and license numbers if you want them shown). Then set `LICENSED_STATES_VERIFIED = true`.
- [ ] Nick's approved bio for About (placeholder on page).
- [ ] Brand name "SunnyHill Financial - Nick Flores Sr." approved; "Team Flores" removed everywhere.
- [ ] Calendly and Zillow reviews links: placeholders only (`SCHEDULING_URL`, `REVIEWS_URL`), hidden until real URLs are set. Reviews are not used until approved.

## Program guidelines (each program page has a `[[VERIFY]]` card)
Loan limits, down payment, credit, mortgage insurance/funding fee, DTI, which non-QM/DSCR/refi programs are offered, Nevada down payment assistance. Edit `guidelines` in `src/content/programs.js`.

## Content review
- City page local descriptions (`src/content/cities.js`) are general and unverified. Nick should review them.
- Privacy and Disclosures page is a draft for compliance/legal review. Add link to SunnyHill's official privacy policy.
- Compliance must review all copy, the TCPA consent wording in `src/components/LeadForm.jsx`, and the footer.

## Environment / services (Vercel project settings, never commit)
- [ ] `FUB_API_KEY` (required), optional `FUB_SYSTEM`, `FUB_SYSTEM_KEY`, `FUB_SOURCE`, `ALLOWED_ORIGIN`. Until set, /api/lead returns 503 (no leads sent). Confirm the Follow Up Boss event type/source settings with your FUB admin.
- [ ] Three Sonar URLs: `VITE_SONAR_CHECK_PRICING_URL`, `VITE_SONAR_START_APPLICATION_URL`, `VITE_SONAR_PRE_APPROVAL_URL` (currently `sonar-placeholder.example`). UTM params are appended automatically.
- [ ] Final domain: `VITE_SITE_URL` (currently `PLACEHOLDER-DOMAIN.example`).

## Disable the old Google Apps Script (its URL is in git history and old dist/)
The old form posted to a public Apps Script web app that appends to a Google Sheet. Removing it from the code does not turn it off.
1. Sign in to script.google.com with the account that owns the script.
2. Open the Team Flores Lead Form project, then Deploy > Manage deployments.
3. Archive (or delete) every web app deployment. This kills the /exec URL.
4. Review/delete the Google Sheet it wrote to, since it holds past lead data (credit score ranges, income, bankruptcy answers). Handle per your retention policy.
5. Optionally rotate access to the Sheet. Git history still contains the URL, so only step 3 makes it harmless.

## Launch checklist (only after compliance approval)
1. Resolve every `[[VERIFY]]`. Build fails if indexing is on while any remain.
2. Set `VITE_SITE_URL`, then `VITE_ALLOW_INDEXING=true` and `VITE_DRAFT_BANNER=false`. Robots.txt, sitemap and meta robots flip automatically.
3. Submit sitemap in Search Console.
