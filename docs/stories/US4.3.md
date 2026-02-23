# US4.3: Currency Comparison & Market Status Widgets

**Epic:** Epic 4 (Market Intelligence & Awareness Widgets)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to see real-time market data (Currency devaluation, Fear & Greed indices, and Asset prices) to understand my current financial context and build credibility for the platform.

## Acceptance Criteria
- [ ] Implement the **Market Dashboard Band** (§Organisms-Market-Intelligence-Widgets):
    - Background: Deep Blue (#1A3C6E).
    - Sub-section 1: **Currency Devaluation Chart** (Chart.js + ExchangeRate-API).
    - Sub-section 2: **Fear & Greed Gauges** (Stock Market Sentiment & Crypto Sentiment).
    - Sub-section 3: **Market Data Cards** (S&P 500, Nasdaq, Gold, Bitcoin).
- [ ] **Interaction Physics:**
    - **Shock Number:** Count-up animation (2rem, Soft Red) for devaluation % loss.
    - **Gauge Sweep:** 1.2s needle sweep on first render with Pulse effect for extreme states.
    - **KPI Cards:** Glass morphism cards with hover lift interaction.
- [ ] **Data Management:**
    - 1-hour client-side cache for currency and sentiment.
    - 15-minute cache for market prices.
    - Offline fallback: Display "[ CACHED DATA ]" badge or offline state indicators.
- [ ] Storybook stories for `loading`, `error`, `offline`, and `Extreme Fear` CTA states.

## Technical Details

### Component Location
`src/app/features/market-dashboard/`.

### APIs
- **Currency:** `ExchangeRate-API`.
- **Crypto Sentiment:** `Alternative.me` (Free API).
- **Market Prices:** `Finnhub` or `CoinGecko` for Bitcoin.
- **Stock Sentiment:** Proxy or mock if CNN FGI API is unavailable (refer to Winston's note in §12 Architecture).

### Steps to Complete:
1. Create `MarketDashboard` container and sub-components.
2. Develop `MarketDataService` with caching logic.
3. Integrate `Chart.js` for the Devaluation chart (Soft Red line vs. Teal dashed USD baseline).
4. Build the custom Gauge component (semicircular SVG/Canvas with needle logic).
5. Create the horizontal scrollable card row for mobile.
6. Trigger the "Extreme Fear" CTA based on the Stock Sentiment signal (< 25).

## Non-Functional Requirements
- **LCP-Safe:** Use `@defer (on viewport)` to prevent the dashboard from blocking the critical Hero render.
- **Performance:** Gauge and chart animations must be hardware-accelerated.
- **Reliability:** Handle API rate limits gracefully with fallback mock data.
