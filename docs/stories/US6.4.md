# US6.4: Performance Optimization & Production Build

**Epic:** Epic 6 (Engagement, Retention & Final Polish)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want the production build optimized for GitHub Pages.

## Acceptance Criteria
- [ ] Execute configuration enabling Static Site Generation (SSG) pre-rendering across the routes.
- [ ] Implement `@defer` logic wrapping heavy chunks preventing render block (e.g. `jspdf`, `Chart.js` if necessary).
- [ ] Attain and record an LCP representing under 2.5s utilizing standard network throttling.
- [ ] SEO implementation mapped with meta-data correctly initialized dynamically or otherwise via a structural Service holding page context.
- [ ] Finalize the GitHub Actions deployment pipeline rendering live deployment successfully targeting Pages environments.

## Final Review
Provides closure over the final deployment procedures securing the App's presence on GH-Pages acting as the final pipeline requirement.
