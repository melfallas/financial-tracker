# US-MVP1.6 — Retirement Simulator Fixes

> **Epic:** MVP1 — Bug Fixes
> **Sprint:** Sprint 4
> **Priority:** P1 (Fix — Medium)
> **Size:** M
> **Owner:** Angi (Dev)
> **Status:** ✅ DONE

---

## User Story

**As a** user of the Retirement Simulator,
**I want** the age input to be properly validated, my savings to sync correctly across all widgets, and the viewport to scroll to the right section after key actions,
**so that** my calculations are accurate and the experience flows naturally.

---

## Background

Four distinct bugs have been identified in the Retirement Simulator that affect data accuracy and UX flow.

---

## Acceptance Criteria

### Sub-Issue 1: Age Input Validation with Inline Error

| #     | Criterion                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC1.1 | `Tu Edad Actual` input starts **empty** with `placeholder="Digita tu edad"`. No pre-filled default age.                                                                   |
| AC1.2 | When the user clicks "Siguiente Paso" with the age input empty, an **inline error message** "Por favor ingresa tu edad actual" is displayed (no navigation to next step). |
| AC1.3 | Age must be between 5 and 100. If < 5, show inline error: "La edad mínima es 5 años".                                                                                     |
| AC1.4 | If age > 100, show inline error: "La edad máxima es 100 años".                                                                                                            |

### Sub-Issue 2: Liquid Savings ↔ Capital Initial Sync Bug

| #     | Criterion                                                                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC2.1 | The `Ahorros Líquidos` value from the Retirement Simulator propagates **1:1 (no division)** to `Capital Inicial` in the Wealth Gap Chart.                           |
| AC2.2 | The `Ahorros Líquidos` value propagates **1:1** to `Si tienes` in the Cost of Waiting Banner.                                                                       |
| AC2.3 | Root cause is identified and patched: suspected numeric parse/format issue (e.g., locale comma separator being treated as decimal).                                 |
| AC2.4 | Unit test added: `simulatorService.setLiquidSavings(4000)` → `wealthGapService.capitalInicial()` equals `4000` AND `costOfWaitingService.siTienes()` equals `4000`. |

### Sub-Issue 3: Scroll to "Obtener Plan" Area on Step 3

| #     | Criterion                                                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC3.1 | When the user clicks "Obtener mi Plan" button (entering results step 3), the viewport **smooth-scrolls to and centers** the "Guarda tu Plan Estratégico" / "Obtener Plan" section. |
| AC3.2 | Scroll must work regardless of the user's current scroll position.                                                                                                                 |
| AC3.3 | Uses `scrollIntoView({ behavior: 'smooth', block: 'center' })` via a shared `ScrollService`.                                                                                       |

### Sub-Issue 4: Scroll to "Agenda tu Llamada" After Download + Email

| #     | Criterion                                                                                                                                                                         |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC4.1 | After **both** PDF download AND email confirmation are successful, the **"Agenda tu Llamada de Revisión"** section (`#agenda-llamada`) is smooth-scrolled into view and centered. |
| AC4.2 | This creates the natural conversion funnel: Plan Generated → Downloaded → Email Sent → Schedule a Call.                                                                           |
| AC4.3 | If only one of download or email completes (error case), the scroll does NOT fire — only when both succeed.                                                                       |

---

## Technical Notes

- **State sync:** Use a shared Angular Signal in a central `SimulatorStateService` (or existing `WealthGapService`) to propagate `Ahorros Líquidos` to all consumers.
- **Numeric bug:** Check for `parseFloat(value.toString().replace(',', ''))` or similar locale-safe parsing.
- **Scroll Service:** Centralize in `core/services/scroll.service.ts` for reuse across US-MVP1.2, US-MVP1.5, US-MVP1.6.

---

## Definition of Done

- [x] Age input starts empty with correct placeholder.
- [x] Inline error displays on empty or invalid age submit.
- [x] Savings sync verified with unit test.
- [x] Scroll to Obtener Plan on step 3.
- [x] Scroll to Agenda section after download+email success.
- [x] Compliance report updated.

---

_— BMAD Master Orchestrator · 2026-03-06_
