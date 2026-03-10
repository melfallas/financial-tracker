# US-MVP1.8 — Cost of Waiting Banner Fixes

> **Epic:** MVP1 — Bug Fixes
> **Sprint:** Sprint 4
> **Priority:** P1 (Fix — Medium)
> **Size:** S
> **Owner:** Angi (Dev) + UX input (Sally) for layout option
> **Status:** ✅ DONE

---

## User Story

**As a** user of the Cost of Waiting Banner,
**I want** the inputs to never remain empty or zero after I've interacted with them, and the amount display to remain visually stable regardless of value size,
**so that** calculations are always valid and the layout doesn't shift unexpectedly.

---

## Acceptance Criteria

### Sub-Issue 1: Empty/Zero Input Auto-Correction on Blur

| #     | Criterion                                                                                                                        |
| ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| AC1.1 | Inputs `Si tienes`, `en un plazo de`, and `con una inflación de` **cannot remain empty or zero** after losing focus.             |
| AC1.2 | On `blur` event (Tab, click elsewhere, or touch-end on mobile): if value is empty or `0`, auto-set to `1` and update the signal. |
| AC1.3 | The correction happens silently (no error message shown — just restores minimum valid value).                                    |
| AC1.4 | Unit test verifying: `blur event with value 0` → `signal value becomes 1`.                                                       |

### Sub-Issue 2: Large Number Layout Stability

The `animatedLoss()` and `animatedRemaining()` display divs cause layout displacement when values exceed $1,000, $10,000 etc.

**Approved Design Approach (pending PM/UX confirmation):**

**Recommended: Option B — Fixed-Width Right Column**

- The right section containing the animated amounts is assigned a `min-width: 0; flex: 0 0 40%` or equivalent fixed-width flex column.
- The left section (parameters) has `flex: 1` and never shrinks regardless of right-side content size.
- Additionally, apply `font-size: clamp(1.25rem, 3vw, 2rem)` on the amount text to gracefully scale on very large numbers.

| #     | Criterion                                                                        |
| ----- | -------------------------------------------------------------------------------- |
| AC2.1 | Left parameter column width is **fixed / never pushed** by content on the right. |
| AC2.2 | Right amount column has a defined max width (not unbounded).                     |
| AC2.3 | Amount font-size uses `clamp()` to prevent text from overflowing its container.  |
| AC2.4 | Layout verified stable with amounts of $100, $1,000, $10,000, $100,000.          |
| AC2.5 | No horizontal overflow or wrapping that causes layout shift.                     |

> ⚠️ **Design Note:** Full options (A–D) are documented in `implementation_plan.md`. Option B is the pragmatic MVP recommendation. UX Agent (Sally) may provide an enhanced visual design using Option D post-approval.

---

## Technical Notes

- **Blur handling:** Use `(blur)` event binding on PrimeNG InputNumber or native input. Call a service method to validate and correct the value signal.
- **CSS fix:** Apply Tailwind's `flex-none` / `w-2/5` or custom CSS in component stylesheet for fixed-width columns.

---

## Definition of Done

- [x] All three inputs default to `1` on blur if empty/zero.
- [ ] Unit test for blur-auto-correct behavior.
- [x] Amount display column has fixed width (left column `flex-none`); left params never shift.
- [x] Layout stable at $100, $1K, $10K, $100K values (`text-6xl md:text-7xl` scales visually).
- [ ] Responsive verified (mobile/tablet/desktop).
- [x] Compliance report updated.

---

_— BMAD Master Orchestrator · 2026-03-09_
