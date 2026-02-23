# US1.4: The Wealth Gap Engine (TDD Flow)

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As an investor,** I want an accurate calculation of my capital's future value adjusted for inflation.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Unit tests written FIRST for `calculateWealthGap()` in `shared/utils/finance-math.ts`.
- [ ] Pure function implementation: Inputs (`Initial Capital`, `Monthly Contribution`, `Return %`, `Inflation %`, `Years`).
- [ ] Output type definition: Array of `ProjectionEntry` objects with properties: `year`, `nominalBalance`, `realValue`, `gap`.
- [ ] Calculation: Target calculation accuracy must support compound interest and nominal vs. real evaluation over given terms.
- [ ] Coverage must be exactly 100% for this entire mathematical utility. No Angular dependencies inside this specific utility.

## Business Notes & Context (The Hook)
This mathematical framework provides the source-of-truth numbers that generate the "reality check" in all widgets. It is paramount that it calculates the loss of purchasing power over time (as represented in `realValue` and the `gap`), highlighting the "cost of waiting" vs investing safely.

## Technical Strategy
`calculateWealthGap()` must be a completely pure TypeScript function with no side effects and no framework-dependent code so it can be robustly tested with inputs returning exactly verifiable outputs.
