# User Story 2.3: Inflation Dashboard

## 📋 Description

**As a user,** I want to see a "severity" indicator for my currency's inflation so that I understand the urgency of investing my savings.

## ✅ Acceptance Criteria

- [ ] Widget displays current annual inflation for the selected currency.
- [ ] Severity badges: Stable (<4%), Warning (4-10%), Critical (>10%).
- [ ] Visual "Wealth Leak" indicator (progress bar or similar).

## 🧪 TDD Plan (Tests First)

1. **Severity Logic Test:** Input 2% -> Expect 'stable'. Input 7% -> Expect 'warning'. Input 200% (ARS) -> Expect 'critical'.
2. **Color Change Test:** Ensure the CSS class applied matches the severity (e.g., `text-soft-red` for critical).
3. **Data Fetching Test:** Verify service provides data for the current `selectedCurrency`.

## 🛠️ Implementation Notes

- Component: `src/app/features/market-status/inflation-dashboard.ts`.
- Use a mock `INFLATION_DATA` constant for MVP.
- Leverage the `CurrencyService` signal to drive the widget state.
