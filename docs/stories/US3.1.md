# US3.1: Compound Interest Calculator (Wealth Gap Chart)

**Epic:** Epic 3 (Financial Simulators & Interactive Tools)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to interact with sliders to visualize investment growth vs. inflation erosion.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Tests for Signal-based reactivity and chart data binding must be built before implementation.
- [ ] UI relies on PrimeNG `Slider` components.
- [ ] Graph utilizing Chart.js wrapped in `ng2-charts` implementing a dual-line area chart.
- [ ] Visual indicators: Emerald Green area (Nominal Wealth) vs. Soft Red shaded area (Wealth Gap / Loss to Inflation).
- [ ] Mathematical logic derived directly from pure TypeScript function `calculateWealthGap()` (`finance-math.ts`).
- [ ] Real-time DOM updates responding at 60FPS utilizing Angular Signal `effect()` hooks or computed bindings.
- [ ] Fully mocked and interactive stories registered in Storybook (mobile + desktop configurations).

## Engineering and Design Notes
**Highest Priority Component:** This is the emotional core of the platform ("Organisms-Wealth-Gap-Chart.md"). It visually validates the concept and engages the user directly in a personalized interactive model. Performance is paramount.
