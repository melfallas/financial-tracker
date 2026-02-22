# User Story 1.3: The Wealth Gap Engine

## 📋 Description

**As an investor,** I want an accurate calculation of my capital's future value adjusted for inflation so that I can see my real purchasing power.

## ✅ Acceptance Criteria

- [ ] Decoupled utility function `calculateAdvancedProjection` exists in `shared/utils`.
- [ ] Correctly calculates Compound Interest (Nominal Future Value).
- [ ] Correctly calculates Purchasing Power Loss (Real Future Value).
- [ ] 100% Code Coverage for the math utility.

## 🧪 TDD Plan (Tests First)

1. **Nominal Growth Test:** Input $10,000, 10% rate, 0 years -> Expect $10,000.
2. **Compound Interest Test:** Input $1,000, 10% rate, 1 year -> Expect $1,100 (assuming annual compounding for simplicity in test 1).
3. **Inflation Impact Test:** Input $1,000 nominal value, 10% inflation, 1 year -> Expect ~$909 real value.
4. **Combined Test:** Verify Nominal vs Real over 10 years with specific mocked values.

## 🛠️ Implementation Notes

- Use `src/app/shared/utils/finance-math.ts`.
- Formula: `RealValue = NominalValue / (1 + inflationRate)^years`.
- Ensure values are rounded logically (e.g., to the nearest integer for large projections).
