# US-MVP1.4 — Footer Component

> **Epic:** MVP1 — Layout & Structure
> **Sprint:** Sprint 4
> **Priority:** P0 (Feature — High)
> **Size:** S
> **Owner:** Angi (Dev)
> **Status:** ✅ DONE

---

## User Story

**As a** visitor,
**I want** to see a professional footer with a legal disclaimer and a dynamic copyright year,
**so that** the site feels complete, trustworthy, and legally compliant.

---

## Background

The current app lacks a footer. FR17 in the PRD defines the footer as: legal links, brand logo, and social media links on a Cool Gray background. For MVP#1, we implement a minimal elegant version covering copyright and legal disclaimer with a dynamic year.

---

## Acceptance Criteria

| #    | Criterion                                                                                                                                                                                                   | Priority |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| AC1  | New `ft-footer` component in `shared/components/footer/` OR `features/footer/`.                                                                                                                             | Must     |
| AC2  | **Copyright line:** `© {currentYear} Financial Tracker.` — year computed dynamically (not hardcoded). Use Angular's `DatePipe` or inject a `Date`-providing service; avoid direct `new Date()` in template. | Must     |
| AC3  | **Legal disclaimer:** "La información proporcionada es solo con fines educativos y no constituye asesoramiento financiero."                                                                                 | Must     |
| AC4  | **Background:** Deep Blue (`#1A3C6E`) with white text. _(Design decision — pending PM confirmation; alternative: Cool Gray `#ECEFF1` with Charcoal text per PRD FR17)._                                     | Should   |
| AC5  | **Layout Desktop (≥ 768px):** Two-column — Financial Tracker brand/logo left, copyright + disclaimer right (or centered bottom).                                                                            | Should   |
| AC6  | **Layout Mobile (< 768px):** Single-column, centered.                                                                                                                                                       | Must     |
| AC7  | **Separator:** Subtle top border or shadow separating footer from content above.                                                                                                                            | Should   |
| AC8  | Semantic `<footer>` HTML element.                                                                                                                                                                           | Must     |
| AC9  | Text contrast ≥ 4.5:1 (WCAG AA) for all footer text.                                                                                                                                                        | Must     |
| AC10 | Component uses `templateUrl` and `styleUrl` — no inline templates or styles.                                                                                                                                | Must     |

---

## Technical Notes

- **Current year:** Use a `computed` signal or a `currentYear` getter in the component class that reads from a date service — avoid `new Date().getFullYear()` directly in template (per AGENTS.md template rules).
- **Placement:** Registered as last element in `home/` page template after `ft-review-call-section`.
- **Optional for MVP:** Social media links and Privacy Policy link can be empty/placeholder anchors.

---

## Definition of Done

- [x] Component created with external template + stylesheet.
- [x] Dynamic year renders correctly.
- [x] Legal disclaimer text present.
- [x] Styling matches approved design (Deep Blue background preferred).
- [x] Responsive verified (mobile/desktop).
- [x] Accessibility verified (semantic footer, contrast).
- [x] Compliance report updated.

---

_— BMAD Master Orchestrator · 2026-03-06_
