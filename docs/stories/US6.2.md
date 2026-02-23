# US6.2: i18n Polish & Bilingual Content

**Epic:** Epic 6 (Engagement, Retention & Final Polish)
**Priority:** P0 (MVP)

## Description
**As a global user,** I want all text in English and Spanish.

## Acceptance Criteria
- [ ] Perform full extraction of all hard-coded strings to external localized files (`en.json`, `es.json`).
- [ ] Reconfigure Angular global layout to dynamically inject translations.
- [ ] Ensure formatting APIs (i.e. `CurrencyPipe` / `DatePipe`) are wrapped logically reflecting the chosen locale data dynamically.
- [ ] Provide test coverage simulating language overflows on the spanish translation text avoiding UI breakage.
- [ ] Store/Save the selected configuration into localized/browser persistent storage retaining state over sessions.

## Context
See `Organisms-I18n-Currency-Fit.md` ensuring conversions, currency signs and dates reflect properly the language context (example `CRC` decimals context logic).
