# US4.3: Currency Comparison & Market Status Widgets

**Epic:** Epic 4 (Market Intelligence & Awareness Widgets)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to see local currency performance and market sentiment.

## Acceptance Criteria
- [ ] Implement Chart.js line chart showing a local currency vs USD history using `ExchangeRate-API`.
- [ ] Incorporate 1-hour cache logic for rate fetching.
- [ ] Render the "Fear & Greed Index" utilizing PrimeNG `Knob` or a simple gauge displaying ranges starting at Soft Red up to Amber then Emerald Green.
- [ ] Display Market data cards via PrimeNG `Card` holding S&P 500 and Bitcoin valuation indices with up/down arrows colored conditionally.
- [ ] If network connection fails, display "Offline Data" warnings.
- [ ] Provide full Storybook stories representing active and fallback offline states.

## Context
Refers to `Organisms-Market-Intelligence-Widgets.md`. Serves an emotional purpose - highlighting market realities via up-to-date data APIs and establishing authority.
