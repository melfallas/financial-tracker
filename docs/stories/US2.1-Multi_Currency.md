# User Story 2.1: Multi-Currency & i18n Logic

## 📋 Description

**As a global user,** I want to switch between USD, EUR, and LATAM currencies so that the data reflects my local financial context.

## ✅ Acceptance Criteria

- [ ] `CurrencyService` manages selected currency using Angular Signals.
- [ ] Supported currencies: USD, EUR, ARS, MXN, CRC, COP, CLP.
- [ ] Financial values in the UI update instantly upon currency change.
- [ ] Correct symbols ($, €, ₡, etc.) and formatting applied.

## 🧪 TDD Plan (Tests First)

1. **Selection Test:** Change signal to 'EUR' -> Expect `selectedCurrency()` to be 'EUR'.
2. **Rate Conversion Test:** Convert $100 -> Expect correct local value based on mock rates.
3. **Symbol Formatting Test:** Verify that 'CRC' returns the '₡' symbol.
4. **i18n Test:** Verify that changing language correctly maps UI labels (e.g., "Balance" -> "Saldo").

## 🛠️ Implementation Notes

- Use `src/app/core/services/currency.service.ts`.
- Integrate `ExchangeRate-API` (or mock for now).
- Use `computed()` signals to map internal USD values to display values.
