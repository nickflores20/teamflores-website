# DEMO_NOTES: SunnyHill Financial - Nick Flores Sr. (restructure branch)

Safe to show. Nothing is deployed, nothing is indexed, and no lead leaves the machine in demo mode.

## Run the demo
```
npm run demo        # builds, then serves http://localhost:3000 with DEMO_MODE=1
```
Plain `npm run build && npm run preview` also works, but the form then returns an error (no Follow Up Boss key), which is intentional: leads are never silently dropped.

## (a) What works live
- All 17 pages: Home, 4 city pages, 8 loan program pages, About, Contact, Privacy and Disclosures, Mortgage Calculator (plus a 404 and a "Link coming soon" page).
- Navigation, breadcrumbs, FAQ accordions, mobile menu, sticky Call / Get Pre-Approved bar on phones.
- Lead form: full validation, honeypot, consent checkbox, SSN-like text is rejected. In demo mode it shows "Demo mode. Nothing was sent."
- Calculator: working payment math, chart and amortization table (educational estimate only).
- SEO plumbing: per-page title, description, canonical, one H1, Person + FinancialService schema with the 4 cities, sitemap.xml, robots.txt. Site is `noindex` and robots is `Disallow: /`.
- DRAFT banner ("DRAFT, pending company compliance approval") on every page.
- Redirects from old URLs (/states, /learning-center, /loan-types, /price-your-loan, /apply).

## (b) What is fake or placeholder
- **Domain:** canonical URLs and sitemap use `PLACEHOLDER-DOMAIN.example`.
- **Sonar buttons (Check Pricing, Start Application, Get Pre-Approved):** go to an internal "Link coming soon" page (with UTM parameters kept in the URL). No real Sonar link exists yet.
- **Lead form:** in demo mode nothing is sent. Without DEMO_MODE and without `FUB_API_KEY` it returns an error. Follow Up Boss is not connected.
- **Every `[[VERIFY]]` / "Pending confirmation" box:** company NMLS, licensed states, program guidelines (limits, down payment, credit, insurance), Nick's bio, privacy-policy link.
- **Hidden until real:** Calendly scheduling, Zillow/reviews, email, street address. None appear on the site.
- **Calculator inputs:** the pre-filled price, down payment and 6% rate are example assumptions, not a quote.
- **City page details:** neighborhood and local notes are general and unreviewed.
- **Privacy and Disclosures page:** a draft for compliance/legal review.

## (c) 5-minute walkthrough for Nick Sr.
1. **Home (1 min):** hero and the three CTAs, the loan program cards, the four markets, the footer disclosures. Point out the draft banner.
2. **A city page, e.g. Las Vegas (1 min):** breadcrumb, local content, loan programs to explore, FAQ accordions. Ask him to correct anything that is wrong locally.
3. **A loan page, e.g. VA Loans (1 min):** plain-English education, the "Pending confirmation" guideline boxes (no rules or limits are published until confirmed), FAQ.
4. **The form (1 min):** submit a test lead. Show the "Demo mode. Nothing was sent." message. Try typing an SSN in the note to show it is blocked. Click a CTA to show the "Link coming soon" page.
5. **Mobile view (1 min):** resize the browser to phone width (or open on a phone on the same network). Show the menu, the sticky Call / Get Pre-Approved bar, and the form.

## (d) What we need from Nick Sr. / SunnyHill Financial
- [ ] Company NMLS number
- [ ] Contact email to show publicly
- [ ] Confirmed licensed states (and license numbers if they should be shown): NV, AZ, CA, FL, TX, WA, OR
- [ ] Approved bio (background, years of experience)
- [ ] Calendly link (if it should be used)
- [ ] Zillow / review links (only if compliance approves)
- [ ] Sonar URLs: Check Pricing, Start Application, Get Pre-Approved
- [ ] Final domain
- [ ] Follow Up Boss API key (and any system key) for the real form
- [ ] Compliance sign-off, then flip `VITE_DRAFT_BANNER=false` and `VITE_ALLOW_INDEXING=true`

See `TODO_FOR_HUMAN.md` for the full launch checklist, including how to shut down the old Google Apps Script.
