# US3.2: Retirement Simulator (Nest Egg)

**Epic:** Epic 3 (Financial Simulators & Interactive Tools)
**Priority:** P0 (MVP) - ⭐ _High Priority_

## Description
**As a user,** I want to simulate my retirement savings adjusted for inflation.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Tests for retirement projection logic built as decoupled, pure TS calculations before integration.
- [ ] Inputs include: `Current Age`, `Retirement Age`, `Current Savings`, `Monthly Contribution`, `Return %`, and `Inflation %`.
- [ ] Provide chart rendering displaying projected nest egg values with inflation-adjusted purchasing power curves.
- [ ] Compute and display prominently a "Financial Freedom Date".
- [ ] Utilize PrimeNG `InputNumber` and `Slider` components.
- [ ] Storybook integration mandatory with primary focus on mobile viewports.

## Context
Refers to: `Organisms-Retirement-Simulator.md`. Provides a 3-state persistent stepper, the "Threat/Hope" narrative to invoke action, Nest Egg chart, and a celebratory Freedom Date animation.
