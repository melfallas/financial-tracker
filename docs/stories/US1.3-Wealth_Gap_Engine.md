# User Story 1.3: The Wealth Gap Engine (Enriched)

## 📋 Description

**As an investor,** I want a robust and pure mathematical engine that calculates the future value of my capital while simultaneously calculating the erosion caused by inflation. This will allow the application to visualize the "Wealth Gap"—the difference between my nominal savings and my actual purchasing power.

## 🎯 Problem Statement

Financial projections often ignore the "hidden tax" of inflation. Users need a reliable, tested, and decoupled logic that can handle monthly compounding and cumulative inflation to understand the true value of their future wealth.

## ✅ Acceptance Criteria

- [ ] **Pure Utility:** Implement calculations in a pure TypeScript file, decoupled from Angular components.
- [ ] **Compound Interest:** Accurate calculation of Future Value (FV) with support for periodic contributions.
- [ ] **Inflation Adjustment:** Calculation of the "Real" Future Value using the cumulative inflation rate.
- [ ] **Data Granularity:** The engine must return a year-by-year breakdown for chart visualization.
- [ ] **TDD Baseline:** 100% unit test coverage using Vitest.
- [ ] **Precision:** Calculations must use sufficient decimal precision before rounding for final UI display.

## 🛠️ Technical Details

### Key Interfaces:

```typescript
export interface WealthGapInput {
  initialInvestment: number;
  monthlyContribution: number;
  annualInterestRate: number; // as percentage (e.g. 8 for 8%)
  annualInflationRate: number; // as percentage (e.g. 4 for 4%)
  years: number;
}

export interface YearEntry {
  year: number;
  nominalValue: number;
  realValue: number;
  gap: number;
}

export interface WealthGapResult {
  finalNominalValue: number;
  finalRealValue: number;
  totalGap: number;
  yearlyBreakdown: YearEntry[];
}
```

### Files to be Modified/Created:

- `src/app/shared/utils/finance-math.ts`: Implementation of the core function `computeWealthGap`.
- `src/app/shared/utils/finance-math.spec.ts`: Exhaustive TDD suite.

### Steps to Complete:

1. **Red Phase (TDD):** Define tests for base cases (0 years, 0 rate, 0 inflation).
2. **Growth Logic:** Implement nominal growth with monthly contributions and monthly compounding.
3. **Erosion Logic:** Implement purchasing power reduction based on annual inflation.
4. **Data Mapping:** Generate the array of yearly results for Chart.js integration.
5. **Coverage Audit:** Run `vitest --coverage` to ensure every line of math is verified.

## 🧪 Quality & TDD

- **Test Case 1 (Static):** $10,000 at 0% interest and 0% inflation for 10 years -> Expect $10,000 and $0 gap.
- **Test Case 2 (Compound):** $1,000 at 12% interest for 1 year (monthly comp) -> Expect ~$1,126.83.
- **Test Case 3 (Inflation):** $1,000 at 10% inflation for 1 year -> Expect ~$909.09 real value.
- **Boundary Test:** Handle negative rates or extremely high inflation (e.g., hyperinflation scenarios like 200%).

## �️ Non-Functional Requirements

- **Mathematical Purity:** No side effects; given the same inputs, it must return the same outputs.
- **Performance:** Calculation for a 50-year projection must execute in < 1ms.
- **Resilience:** Validate that `years` is a positive integer and financial amounts are not negative.
