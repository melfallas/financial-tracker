# US-MVP1.3 — Nueva Sección "Agenda tu Llamada de Revisión"

> **Epic:** MVP1 — Key Features
> **Sprint:** Sprint 4
> **Priority:** P0 (Feature — High)
> **Size:** M
> **Owner:** Angi (Dev) + UX review (Sally)
> **Status:** 📂 TODO

---

## User Story

**As a** lead who has reviewed my financial plan,
**I want** to see a compelling section that motivates me to schedule a review call with the Financial Tracker team,
**so that** I take the next actionable step toward improving my financial position.

---

## Background

After downloading the financial plan and receiving the email, the user needs a powerful CTA section that closes the funnel loop. This section replaces the need for a full booking screen (US5.2 — deferred to MVP#2) by linking directly to Calendly. Design is inspired by the email's "EL SIGUIENTE PASO: UNA ESTRATEGIA OFENSIVA" and "Agenda tu llamada estratégica ahora" sections.

---

## Acceptance Criteria

| # | Criterion | Priority |
|---|-----------|----------|
| AC1 | Section placement: **after the Lead Form / PDF download area** and **before the Footer**. | Must |
| AC2 | Section root element has `id="agenda-llamada"` for smooth-scroll targeting from Navbar. | Must |
| AC3 | **Heading (H2):** "¡Has dado el primer paso!" — styled in white (if on dark background) or Deep Blue on light. | Must |
| AC4 | **Body text:** "Ahora necesitas definir tu línea de tiempo y revisar tu plan financiero junto a nuestro equipo. No tienes que resolverlo solo. Agenda una llamada gratuita y te ayudamos a trazar el plan de acción que tu situación requiere." | Must |
| AC5 | **CTA Button:** "Revisa tu Plan con Nosotros" — opens **same Calendly booking link** from US-MVP1.1 in a new tab. | Must |
| AC6 | Button style **identical** to "Detén la Pérdida" / "Asesoría Gratuita" (Emerald Green `#00C853`). | Must |
| AC7 | **Visual design:** Premium card/banner aesthetic. Recommended: Deep Blue (`#1A3C6E`) or gradient background, white text, Emerald Green accent. Inspired by the PDF email's offensive strategy CTA. Shadow and border-radius using design tokens (`--shadow-premium`, `--radius-card`). | Must |
| AC8 | New standalone component `ft-review-call-section` in `features/review-call/` with `templateUrl` and `styleUrl`. | Must |
| AC9 | Fully responsive: content stacks vertically on mobile. Button is full-width or 80% on mobile. | Must |
| AC10 | Accessibility: `<section>` semantic tag, `aria-labelledby` pointing to H2, CTA button with `aria-label`. WCAG AA contrast. | Must |

---

## Technical Notes

- **Component:** `ft-review-call-section`
- **Files:** `features/review-call/review-call-section.ts`, `.html`, `.css`, `.spec.ts`
- **Calendly URL:** Same as US-MVP1.1 — from environment/constants service.
- **Placement:** Register in `home/` page template after lead-form widget and before `ft-footer`.
- **Icon/Visual Element:** Consider using a calendar or rocket SVG icon from the existing icon library.
- **Funnel trigger:** US-MVP1.6 Sub-Issue 4 will scroll to this section after PDF download + email confirmation.

---

## Design Inspiration

Refer to the PDF email template for the following sections as design reference:
- `"EL SIGUIENTE PASO: UNA ESTRATEGIA OFENSIVA"` — deep blue card with bold headline
- `"Agenda tu llamada estratégica ahora"` — emerald CTA on contrasting panel

---

## Definition of Done

- [ ] Component created with correct file structure.
- [ ] Section ID `agenda-llamada` present.
- [ ] H2, body text, and CTA button render correctly.
- [ ] Calendly link opens in new tab.
- [ ] Premium visual design matching email inspiration.
- [ ] Responsive verified (mobile/tablet/desktop).
- [ ] Accessibility verified (semantic tags, ARIA, contrast).
- [ ] Compliance report updated.

---
*— BMAD Master Orchestrator · 2026-03-06*
