# US-MVP1.1 — "Asesoría Gratuita" CTA Button

> **Epic:** MVP1 — Quick Wins
> **Sprint:** Sprint 4
> **Priority:** P0 (Feature — High)
> **Size:** XS
> **Owner:** Angi (Dev)
> **Status:** 📂 TODO

---

## User Story

**As a** visitor,
**I want** the "Agendar" navigation button to read "Asesoría Gratuita" and open the Calendly booking link,
**so that** the CTA message matches the value proposition and leads to direct appointment scheduling.

---

## Background

The existing Navbar/Hero "Agendar" button needs to be renamed and wired to the same Calendly booking link used in the email plan's "Agendar" button. This is a UX copy + link alignment fix.

---

## Acceptance Criteria

| # | Criterion | Priority |
|---|-----------|----------|
| AC1 | Button text changes from "Agendar" to **"Asesoría Gratuita"** in ALL its occurrences in Navbar and/or Hero. | Must |
| AC2 | On click, opens the **Calendly booking link** (same URL used in PDF email's "Agendar" button) in a **new tab** (`target="_blank"`, `rel="noopener noreferrer"`). | Must |
| AC3 | Calendly URL is stored in an environment variable or a central constants service — NOT hardcoded inline. | Must |
| AC4 | Button dimensions, border-radius, color, and hover/focus effects remain **unchanged**. | Must |
| AC5 | `aria-label` updated to `"Agenda una Asesoría Gratuita"` for screen reader accessibility. | Must |
| AC6 | Fully responsive: button works and is visually correct on mobile, tablet, and desktop. | Must |

---

## Technical Notes

- **Calendly URL Location:** Check `.env`, `environment.ts`, or the existing email service for the booking link constant.
- **Component(s) to modify:** Likely `features/navbar/` and/or `features/hero/`.
- **No new component needed** — this is in-place copy & link update.

---

## Definition of Done

- [ ] Button text updated in all locations.
- [ ] Calendly URL externalized and working.
- [ ] New tab opens correctly.
- [ ] Accessibility verified (aria-label, keyboard accessible).
- [ ] Responsive verified.
- [ ] Compliance report updated.

---
*— BMAD Master Orchestrator · 2026-03-06*
