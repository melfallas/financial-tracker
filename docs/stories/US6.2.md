# US6.2: i18n Polish & Bilingual Content

**Epic:** Epic 6 (Engagement, Retention & Final Polish)
**Priority:** P0 (MVP)

## Description
**As a global user,** I want all text and numerical formatting to adapt seamlessly to my language (EN/ES) and currency (USD/CRC/MXN) to ensure the platform feels like a local tool.

## Acceptance Criteria
- [ ] **Language:** 100% of static strings externalized to `assets/i18n/en.json` and `assets/i18n/es.json`.
- [ ] **Currency Logic (§Organisms-I18n-Currency-Fit):**
    - High-scale currencies (CRC, COP, JPY) hide decimals and round to nearest integer.
    - Low-scale currencies (USD, EUR) show 2 decimal places.
    - Market assets (BTC, S&P 500) show primary value in USD and secondary conversion in the selected currency.
- [ ] **Data Preservation:** Changing currency updates labels but **preserves** user-entered numbers.
- [ ] **Local Context:** Provide a "Currency Changed" toast notification when the selector is used.
- [ ] **PDF Consistency:** The export engine (US2.2) must use the same formatting and language as the UI.

## Technical Details

### Component Location
`src/app/core/services/currency-service.ts` and `src/app/shared/pipes/financial-format.pipe.ts`.

### Translation Workflow
1. Use `@ngx-translate/core` or Angular's built-in `i18n`.
2. Map all chart labels, PDF strings, and form errors.
3. Verify that pluralization (e.g., "1 Year" vs "5 Years") is handled correctly in both languages.

### Steps to Complete:
1. Initialize the `CurrencyService` with `selectedCurrency` and `exchangeRate` signals.
2. Implement the `FinancialFormatPipe` based on High/Low scale logic.
3. Extract all strings from components and move them to JSON files.
4. Implement the dual-currency display for Market Cards.
5. Create a language switcher in the Navbar.

## Non-Functional Requirements
- **Fluidity:** Language and currency changes must occur without a page reload (Signals based).
- **SEO:** Metadata (Title, Description) must also be translated.
