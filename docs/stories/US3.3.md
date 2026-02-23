# US3.3: CDP vs. Market Comparator

**Epic:** Epic 3 (Financial Simulators & Interactive Tools)
**Priority:** P1 (High)

## Description
**As a user,** I want to compare local bank CDP returns vs. S&P 500.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Unit Tests for comparison mathematics and edge cases (currency exchange logic if applicable).
- [ ] Display side-by-side comparison using a PrimeNG `DataTable` component.
- [ ] Calculate the net difference indicating `Emerald Green` for a gain or `Soft Red` for a loss.
- [ ] Maintain currency-aware rates context, fetching appropriate local vs foreign values.
- [ ] Required: Documented Storybook story covering variations (extreme losses vs parity).

## Context
Refers to `Organisms-CDP-Comparator.md` where side-by-side logical justification occurs highlighting the cost of waiting/loss when keeping money in traditional bank CDPs vs investing.
