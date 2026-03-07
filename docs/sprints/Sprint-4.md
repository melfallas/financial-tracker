# Sprint 4: MVP#1 — Features & Fixes

> **Date:** 2026-03-06
> **Status:** 🔄 ACTIVE — SPRINT 4
> **Epic:** [Epic 7: MVP#1 Closure](../epics/epic-7.md)
> **Goal:** Ship the first deployable MVP by implementing 5 new features and resolving all known blocking bugs.

---

## Goals

1. Add the missing UX features needed for a complete conversion funnel (Navbar nav, Footer, Review Call section, CTA updates, Discover button).
2. Fix all known bugs in Retirement Simulator, Wealth Gap Chart, and Cost of Waiting Banner.
3. Establish a configurable defaults service architecture (extensible to API in MVP#2).
4. Resolve the Chart.js render error and GitHub Pages 404 deployment issue.

---

## User Stories

### P0 — Features

| ID | Story | Priority | Size | Owner | Status |
|:---|:------|:---------|:-----|:------|:-------|
| **US-MVP1.9** (sub2+3) | [GitHub Pages Fix + Chart.js Fix](../stories/US-MVP1.9.md) | P0 | XS | Angi (Dev) | 📂 TODO |
| **US-MVP1.7** (sub3+5) | [WGC Defaults Service + Chart.js](../stories/US-MVP1.7.md) | P0 | S | Angi (Dev) | 📂 TODO |
| **US-MVP1.6** (sub2) | [Retirement Sim — Savings Sync Fix](../stories/US-MVP1.6.md) | P0 | S | Angi (Dev) | 📂 TODO |
| **US-MVP1.8** | [Cost of Waiting Fixes](../stories/US-MVP1.8.md) | P0 | S | Angi (Dev) | 📂 TODO |
| **US-MVP1.7** (sub1+2+4) | [WGC Layout + Sliders + Track Fill](../stories/US-MVP1.7.md) | P0 | M | Angi (Dev) | 📂 TODO |
| **US-MVP1.6** (sub1+3+4) | [Retirement Sim — Age + Scroll](../stories/US-MVP1.6.md) | P0 | S | Angi (Dev) | 📂 TODO |
| **US-MVP1.9** (sub1) | [Button Style Fix](../stories/US-MVP1.9.md) | P0 | XS | Angi (Dev) | 📂 TODO |
| **US-MVP1.1** | ["Asesoría Gratuita" CTA Button](../stories/US-MVP1.1.md) | P0 | XS | Angi (Dev) | 📂 TODO |
| **US-MVP1.2** | [WGC "Descubre como Evitarlo" Button](../stories/US-MVP1.2.md) | P0 | S | Angi (Dev) | 📂 TODO |
| **US-MVP1.4** | [Footer Component](../stories/US-MVP1.4.md) | P0 | S | Angi (Dev) | 📂 TODO |
| **US-MVP1.3** | [Review Call Section](../stories/US-MVP1.3.md) | P0 | M | Angi (Dev) | 📂 TODO |
| **US-MVP1.5** | [Navbar Section Navigation](../stories/US-MVP1.5.md) | P0 | M | Angi (Dev) | 📂 TODO |

---

## Implementation Order (Golden Path — Sprint 4)

> Dependencies-first ordering to minimize blockers:

1. `US-MVP1.9` (Chart.js fix + GitHub Pages) — unblocks chart renders and deploy
2. `US-MVP1.7 Sub3` (Defaults Service JSON + Service architecture) — infrastructure first
3. `US-MVP1.6 Sub2` (Savings sync bug) — shared state correctness
4. `US-MVP1.8` (CoW input fixes + layout stability)
5. `US-MVP1.7 Sub1+2+4` (Layout + sliders + track fill)
6. `US-MVP1.6 Sub1+3+4` (Age validation + scroll behaviors)
7. `US-MVP1.9 Sub1` (Button style fix)
8. `US-MVP1.1` (CTA rename + Calendly link)
9. `US-MVP1.2` (Discover button on WGC)
10. `US-MVP1.4` (Footer)
11. `US-MVP1.3` (Review Call Section)
12. `US-MVP1.5` (Navbar navigation)

---

## Definition of Done (DoD)

- [ ] All 9 stories accepted by PO.
- [ ] No Chart.js console errors on app load.
- [ ] App deploys correctly to GitHub Pages.
- [ ] Slider track fills on load and on programmatic changes.
- [ ] All fixes verified with unit tests.
- [ ] All components use `templateUrl`/`styleUrl` (no inline templates).
- [ ] Compliance report updated.
- [ ] All components verified responsive (mobile/tablet/desktop/large/XL).

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Savings sync bug requires deep state audit | Isolate signal flow in a shared service; add unit test to confirm before closing |
| Slider track fill may conflict with PrimeNG's internal rendering | Use `afterRender` or `effect` to apply CSS after PrimeNG renders the DOM |
| GitHub Pages 404 may require repository settings change | Check GitHub Pages source branch setting + deployment workflow |
| Review Call section design may need UX validation | Get quick UX sign-off on Deep Blue card design before implementing |

---
*— Scrum Master (SM) · Financial Tracker · BMAD v4 · 2026-03-06*
