# US6.4: Performance Optimization & Production Build

**Epic:** Epic 6 (Engagement, Retention & Final Polish)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want the application optimized for the highest possible speed and deployable to GitHub Pages with a robust CI/CD pipeline.

## Acceptance Criteria
- [ ] **Core Web Vitals:** 
    - LCP < 2.5s.
    - CLS < 0.1 (ensured by Skeleton Loaders US4.3).
    - INP (Interaction to Next Paint) optimized for 60FPS slider updates.
- [ ] **Tree Shaking & Lazy Loading:**
    - Use `@defer (on viewport)` for all non-critical organisms (Market Dashboard, Booking Modal, Wishlist).
    - PrimeNG and Chart.js modules must be lazy-loaded.
- [ ] **Build Optimization:**
    - Production build using `pnpm build`.
    - Compression (Gzip/Brotli) enabled for all assets.
    - Images use `NgOptimizedImage` and are served in `.webp` format.
- [ ] **Deployment:**
    - GitHub Actions configured for automatic deployment to GitHub Pages.
    - `404.html` fallback created to handle SPA routing.
- [ ] **SEO Polish:** Verified Title tags, Meta descriptions, and OpenGraph images for all translated pages.

## Technical Details

### Optimization Targets (§11 Frontend Specification):
- Initial JS bundle < 150KB (gzipped).
- Instant financial updates (< 16ms) using Signals.

### Steps to Complete:
1. Configure `angular.json` for aggressive optimization.
2. Implement `@defer` blocks in `home-page.html`.
3. Setup `NgOptimizedImage` across the Hero and Widgets.
4. Create `.github/workflows/deploy.yml`.
5. Run a Lighthouse audit and ensure scores are > 90 across all categories.
6. Verify SPA routing on GitHub Pages after deployment.

## Non-Functional Requirements
- **Fluidity:** The Transition from Hero to Calculators must be seamless.
- **Reliability:** Production build must pass all unit and A11y tests before deployment.
