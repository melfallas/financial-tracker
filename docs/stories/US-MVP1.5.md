# US-MVP1.5 — Navbar Section Navigation

> **Epic:** MVP1 — Navigation & UX Flow
> **Sprint:** Sprint 4
> **Priority:** P0 (Feature — High)
> **Size:** M
> **Owner:** Angi (Dev)
> **Status:** ✅ DONE

---

## User Story

**As a** visitor,
**I want** to click navigation links in the Navbar to jump to specific sections of the page,
**so that** I can quickly navigate to the content most relevant to me without manually scrolling.

---

## Background

The current Navbar has the brand logo and a CTA button but no section navigation. Adding section links improves discoverability and user experience for return visitors and reduces bounce rate.

---

## Acceptance Criteria

| #   | Criterion                                                                                                                                                                                                 | Priority |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| AC1 | Navbar displays the following section links (short, max 2 words, attention-capturing): **"Diagnóstico"**, **"Brecha"**, **"Impacto"**, **"Retiro"**, **"Asesoría"**                                       | Must     |
| AC2 | Clicking each link **smooth-scrolls and centers** the corresponding section in the viewport:                                                                                                              | Must     |
|     | — "Diagnóstico" → `#hero` (Hero Section)                                                                                                                                                                  |          |
|     | — "Brecha" → `#wealth-gap` (Wealth Gap Chart)                                                                                                                                                             |          |
|     | — "Impacto" → `#cost-of-waiting` (Cost of Waiting Banner)                                                                                                                                                 |          |
|     | — "Retiro" → `#retirement-simulator` (Retirement Simulator)                                                                                                                                               |          |
|     | — "Asesoría" → `#review-call` (Review Call Section from US-MVP1.3)                                                                                                                                        |          |
| AC3 | Each target section root element must have the corresponding `id` attribute.                                                                                                                              | Must     |
| AC4 | **Active state:** The nav link corresponding to the section currently visible in viewport is **highlighted** (Emerald Green underline or bold). Implemented using `IntersectionObserver` or scroll event. | Should   |
| AC5 | **Desktop (≥ 768px):** Section links displayed as **horizontal inline list** in the Navbar.                                                                                                               | Must     |
| AC6 | **Mobile (< 768px):** Navbar collapses to a **hamburger menu**. Links stack vertically in a dropdown/side panel.                                                                                          | Must     |
| AC7 | Semantic `<nav>` with `aria-label="Navegación principal"`. Active link has `aria-current="page"`. All links keyboard-navigable (Tab/Enter).                                                               | Must     |
| AC8 | Scroll behavior uses `{ behavior: 'smooth', block: 'center' }`.                                                                                                                                           | Must     |

---

## Technical Notes

- **Scroll Service:** Create or reuse a `ScrollService` in `core/services/` to avoid duplicating scroll logic across components (also used by US-MVP1.2, US-MVP1.6).
- **IntersectionObserver:** Use Angular CDK `ViewportScroller` or native `IntersectionObserver` for active state tracking.
- **Mobile Hamburger:** Implement using Angular signal for open/close state. Accessible: `aria-expanded`, `aria-controls`.
- **Section IDs to add/verify:** `hero`, `wealth-gap`, `cost-of-waiting`, `retirement-simulator`, `review-call`.

---

## Definition of Done

- [x] All 5 nav links present in Navbar.
- [x] Smooth scroll to each section works on click.
- [x] Active section link highlighted on scroll.
- [x] Mobile hamburger menu functional.
- [x] Accessibility verified (nav aria-label, keyboard nav, aria-current).
- [x] All section target IDs present in component templates.
- [x] Compliance report updated.

---

_— BMAD Master Orchestrator · 2026-03-06_
