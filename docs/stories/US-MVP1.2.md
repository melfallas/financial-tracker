# US-MVP1.2 — Wealth Gap "Descubre como Evitarlo ↓" Button

> **Epic:** MVP1 — Quick Wins
> **Sprint:** Sprint 4
> **Priority:** P0 (Feature — High)
> **Size:** S
> **Owner:** Angi (Dev)
> **Status:** 📂 TODO

---

## User Story

**As a** user viewing the Wealth Gap Chart,
**I want** a "Descubre como Evitarlo ↓" call-to-action button below the chart,
**so that** I am naturally guided toward the Cost of Waiting section to understand the next step.

---

## Background

After the user sees the visual impact of the Wealth Gap, a clear CTA button helps convert curiosity into action by scrolling them to the urgency-reinforcing Cost of Waiting Banner.

---

## Acceptance Criteria

| # | Criterion | Priority |
|---|-----------|----------|
| AC1 | New button with text **"Descubre como Evitarlo ↓"** placed **below the chart area** in the Wealth Gap section. | Must |
| AC2 | Visual design **identical** to "Detén la Pérdida" button: Emerald Green (`#00C853`), same border-radius, font-weight, box-shadow, and hover/focus transition effects. | Must |
| AC3 | Button width: **80% of the main chart grid width**, centered horizontally with respect to the chart column. On mobile (< 768px): can be 100% width. | Must |
| AC4 | On click: viewport **smooth-scrolls and centers** on the Cost of Waiting Banner section (`#cost-of-waiting`). Uses `scrollIntoView({ behavior: 'smooth', block: 'center' })`. | Must |
| AC5 | `aria-label="Descubre cómo evitar la brecha de riqueza"` for screen reader accessibility. | Must |
| AC6 | Fully responsive: correct layout on mobile (< 768px), tablet, desktop. | Must |

---

## Technical Notes

- **File:** Modify `features/wealth-gap-chart/` component template.
- **Scroll Target:** The Cost of Waiting section must have `id="cost-of-waiting"` on its root element (coordinate with US-MVP1.5).
- **Scroll Logic:** Can be implemented via a shared `ScrollService` in `core/services/` or direct `ElementRef`/`document.getElementById` call.
- **Button Style:** Reuse the same CSS class as "Detén la Pérdida" button — do not duplicate styles.

---

## Definition of Done

- [ ] Button visible below chart with correct style.
- [ ] 80% width of chart grid, centered.
- [ ] Smooth scroll to Cost of Waiting section on click.
- [ ] Accessible (aria-label, keyboard navigable).
- [ ] Responsive verified (mobile/tablet/desktop).
- [ ] Compliance report updated.

---
*— BMAD Master Orchestrator · 2026-03-06*
