# US-MVP1.9 — Cross-Cutting Fixes

> **Epic:** MVP1 — Bug Fixes
> **Sprint:** Sprint 4
> **Priority:** P1 (Fix — Medium)
> **Size:** S
> **Owner:** Angi (Dev)
> **Status:** ✅ DONE

---

## User Story

**As a** developer and a user,
**I want** the "Comenzar mi Diagnóstico Gratis" button to match the design system's primary CTA style, the Chart.js charts to render without console errors, and the GitHub Pages deployment to serve the app correctly,
**so that** the product is visually consistent, error-free, and publicly accessible.

---

## Background

Three cross-cutting issues discovered in integration testing:

1. Style inconsistency in the Hero CTA button vs. the design system.
2. Chart.js not registering required scales, causing all charts to fail rendering.
3. GitHub Pages returning 404 for the base app URL.

---

## Acceptance Criteria

### Sub-Issue 1: "Comenzar mi Diagnóstico Gratis" Button Style

| #     | Criterion                                                                                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC1.1 | Button `"Comenzar mi Diagnóstico Gratis"` dimensions remain **unchanged** (width, height, padding).                                                           |
| AC1.2 | Button style updated to **match "Detén la Pérdida"**: Emerald Green (`#00C853`) background, same border-radius, box-shadow, transition effect on hover/focus. |
| AC1.3 | Hover effect: slight brightness increase or shadow elevation (same as "Detén la Pérdida").                                                                    |
| AC1.4 | Uses shared utility CSS class (e.g., `.btn-cta-primary`) — not duplicate inline styles.                                                                       |
| AC1.5 | Accessible: visible focus ring, correct contrast ratio on text.                                                                                               |

### Sub-Issue 2: GitHub Pages 404 Fix

| #     | Criterion                                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| AC2.1 | Fix `GET https://melfallas.github.io/financial-tracker/ 404 (Not Found)`.                                                                  |
| AC2.2 | `angular.json` has `"baseHref": "/financial-tracker/"` in production build options.                                                        |
| AC2.3 | `404.html` file exists in `src/` and is included in the build output, correctly implementing the SPA redirect workaround for GitHub Pages. |
| AC2.4 | GitHub Actions deploy workflow correctly deploys to `gh-pages` branch, including `404.html`.                                               |
| AC2.5 | After fix, `https://melfallas.github.io/financial-tracker/` serves the Angular application correctly.                                      |
| AC2.6 | Deep-link navigation (e.g., `/financial-tracker/#section`) also works correctly.                                                           |

### Sub-Issue 3: Chart.js Scale Registration Error

| #     | Criterion                                                                                                                                                                                                                                                                           |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC3.1 | Fix `ERROR Error: "category" is not a registered scale.`                                                                                                                                                                                                                            |
| AC3.2 | In `app.config.ts` or a dedicated early-loaded `chart-setup.ts`, register all required Chart.js components.                                                                                                                                                                         |
| AC3.3 | Preferred approach: use `provideCharts(withDefaultRegisterables())` from `ng2-charts` (if library version supports it). Alternative: manually call `Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend, Title)`. |
| AC3.4 | All charts in the application (Wealth Gap, retirement projection) render correctly.                                                                                                                                                                                                 |
| AC3.5 | No Chart.js errors appear in `console.error` on app start.                                                                                                                                                                                                                          |

---

## Technical Notes

- **Chart.js fix:** Check `ng2-charts` version in `package.json`. If ≥ v3, `provideCharts(withDefaultRegisterables())` should be the cleanest fix, registered in `app.config.ts` providers.
- **GitHub Pages:** Standard SPA workaround uses `404.html` that copies the URL to a `sessionStorage` key, then `index.html` reads it back and uses `history.replaceState`. Reference: [spa-github-pages](https://github.com/rafgraph/spa-github-pages).
- **Button style:** Define a shared `.btn-cta-primary` class in `styles.css` and apply consistently across all primary CTA buttons.

---

## Definition of Done

- [x] "Comenzar mi Diagnóstico Gratis" has matching Emerald Green style.
- [x] GitHub Pages serves app without 404 on base URL.
- [x] Deep links work on GitHub Pages.
- [x] Chart.js error eliminated from console.
- [x] All charts render correctly.
- [x] Compliance report updated.

---

_— BMAD Master Orchestrator · 2026-03-09_
