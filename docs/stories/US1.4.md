# US1.4: The Wealth Gap Engine (TDD Flow)

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As an investor,** I want an accurate calculation of my capital's future value adjusted for inflation to visualize the "Wealth Erosion" gap.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Unit tests written FIRST in `src/app/shared/utils/finance-math.spec.ts`.
- [ ] Implement `calculateWealthGap()` in `src/app/shared/utils/finance-math.ts`.
- [ ] Implement `calculateRetirement()` in the same utility.
- [ ] Inputs must support: `Initial Capital`, `Monthly Contribution`, `Return %`, `Inflation %`, `Years`.
- [ ] Output must be an array of `ProjectionEntry` objects containing `year`, `nominalBalance`, `realValue`, and `gap`.
- [ ] **100% Code Coverage** for this file.
- [ ] No framework dependencies (pure TypeScript).

## Technical Details

### Calculation Logic:
- **Nominal FV:** `initial * (1 + monthly_rate)^months + PMT contributions`.
- **Real FV:** `nominal_fv / (1 + annual_inflation_rate)^years`.
- **The Gap:** `nominal_fv - real_fv`.

### Data Structures (`src/app/shared/types/index.ts`):
```typescript
export interface ProjectionEntry {
  year: number;
  nominalBalance: number;
  realValue: number;
  gap: number;
}
```

### Steps to Complete:
1. Create `src/app/shared/types/index.ts` and define `ProjectionEntry`.
2. Create `src/app/shared/utils/finance-math.spec.ts`.
3. Write test cases for 5, 10, 20 years with compound interest.
4. Implement `calculateWealthGap` to pass tests.
5. Implement `calculateRetirement` logic (identifying the "Freedom Date" where real value meets target expenses).
6. Run coverage report and ensure 100%.

## Non-Functional Requirements
- **Precision:** Use high-precision decimals (or `Math.round` only at display level).
- **Performance:** Calculations must be sub-millisecond to support 60FPS slider updates.
