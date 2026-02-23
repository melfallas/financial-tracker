# 🧩 Organism Detail: Market Intelligence Widgets (US4.3)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development · **Primary Market:** Costa Rica (CRC)

---

## 🎯 Purpose
The **Market Intelligence Widgets** form the "Hook Layer" of the Narrative Scroll. Their mission is to immediately establish credibility and urgency by displaying real, live market data the moment the user begins scrolling. All three widget groups (Currency Devaluation, Fear & Greed Index, and Market Data Cards) are grouped together in a single **"Market Dashboard Band"** section, positioned immediately after the Hero section and before the calculators.

> **Emotional Goal:** Make the user feel the *reality* of financial risk before they ever touch a slider on the Wealth Gap Calculator.

---

## 🗂️ Section Layout: The "Market Dashboard Band"

**Visual Spec:**
- The entire section has a `Deep Blue (#1A3C6E)` background to contrast with the white/light-gray Narrative Scroll above and below.
- Section padding: `5rem 2rem` (vertical / horizontal).
- A subtle diagonal or gradient divider separates this section from the Hero section above, creating a visual "entry" into the data world.
- The section flows vertically in three stacked sub-sections, in this order:
  1. **Currency Devaluation Chart** (most important — primary emotional hook)
  2. **Fear & Greed Index Gauges** (context for action urgency)
  3. **Market Data Cards** (S&P 500, RSP, Nasdaq, Gold, Bitcoin)

### 📐 Blueprint (Wireframe — Full Section)
```text
┌──────────────────────────── MARKET DASHBOARD BAND (Deep Blue Background) ──────────────┐
│                                                                                         │
│  [Section Title]  "El Mercado, En Tiempo Real"           [Last Updated: 10:45 AM]       │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  1. CURRENCY DEVALUATION CHART (Full Width)                                     │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  2. FEAR & GREED INDEX (Two Gauges Side-by-Side: Stock Market | Crypto)         │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│  │  3. MARKET DATA CARDS (5-Card Horizontal Row: S&P | RSP | NASDAQ | GOLD | BTC)  │   │
│  └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🪙 Widget 1: Currency Devaluation Chart

**Visual Spec:**
- A prominent monetary loss figure is shown at the top of this widget (e.g., *"El Colón ha perdido **23.4%** de su valor contra el USD en los últimos 12 meses"*). The percentage is rendered in `Soft Red (#D32F2F)` with `font-weight: 700` and `font-size: 2rem` to maximize the emotional "shock number."
- Below the shock number, a Chart.js multi-line chart renders the devaluation trend visually.
- Currency selector uses the Currency Selector Molecule (M4) to let users switch between supported currencies.
- The chart line for loss: `Soft Red (#D32F2F)`. The USD baseline: `Teal Bright (#009688)`.
- Background of the chart: `rgba(255, 255, 255, 0.05)` (subtle glass card on Deep Blue background).

### 📐 Blueprint (Wireframe)
```text
┌────────────────────────────────────────────────────────────────┐
│  Local Currency vs. USD Devaluation                            │
│                                                                │
│  [M4: Currency Selector] → [CRC ▾]  [Period: 12M ▾]           │
│                                                                │
│  El Colón perdió  [ -23.4% ]  vs. USD en los últimos 12 meses │
│                                                                │
│  $700 │\                                                        │
│       │ \___   ← CRC/USD Rate (Red Line)                       │
│  $600 │     \_______/\/\                                       │
│       │                                                        │
│  $500 │──────────────────────── USD baseline (Teal Dashed)    │
│       └──────────────────────────────────────────────────────  │
│        Jan    Mar    Jun    Sep    Dec                          │
└────────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Shock Number:** `font-size: 2.25rem (36px)`, `font-weight: 700`, `color: var(--color-soft-red)`.
- **Shock Label:** `font-size: 1rem`, `color: rgba(255,255,255,0.75)` (on Deep Blue background).
- **Chart Area:** `min-height: 220px`, `border-radius: 1rem`, `padding: 1.5rem`.
- **Loss Line:** `borderColor: '#D32F2F'`, `borderWidth: 3`, `tension: 0.3`.
- **USD Baseline:** `borderColor: '#009688'`, `borderDash: [5, 5]`, `borderWidth: 2`.
- **Fill Under Loss Line:** `backgroundColor: 'rgba(211, 47, 47, 0.12)'`.
- **Time Period Selector:** Pills (`1M | 3M | 6M | 1Y`) in `Teal Bright` on active state.

### 🕹️ Behavior & Micro-interactions
- **Default Currency:** Auto-detected from browser locale. Falls back to `CRC` (Costa Rica) as primary market focus.
- **Supported Currencies (MVP):** CRC, MXN, ARS, BRL, COP, CLP, PEN, GTQ, USD, EUR.
- **Currency Switch:** Switching the M4 Currency Selector triggers a smooth chart re-draw animation (`300ms` transition).
- **Shock Number Update:** When currency changes, the loss percentage counter re-animates with a count-up/count-down effect.
- **Period Pills:** Switching the time period (1M, 3M, 6M, 1Y) re-fetches from the cached ExchangeRate-API data and re-draws the chart.

### 🔌 Data Source & Caching
- **API:** ExchangeRate-API (domain-restricted, free tier).
- **Cache TTL:** 1 hour (client-side). Data is fetched on page load and stored.
- **Offline Fallback:** Display last cached data with an `A7 Badge (.badge-metric--warning)` showing "[ CACHED DATA ]".

---

## 😱 Widget 2: Fear & Greed Index Gauges

**Visual Spec:**
- Two semicircular "speedometer" gauges rendered side-by-side: one for the **Stock Market** (CNN Fear & Greed Index) and one for **Crypto** (Crypto Fear & Greed via feargreedmeter.com or Alternative.me).
- Each gauge uses a color gradient arc from `Soft Red (#D32F2F)` (0 - Extreme Fear) → `Golden Amber (#FFC107)` (50 - Neutral) → `Emerald Green (#00C853)` (100 - Extreme Greed).
- The gauge needle/pointer color: `white`.
- Below each gauge: a large index number (e.g., "**24**") and a label (e.g., "**EXTREME FEAR**") in the corresponding zone color.

### 📐 Blueprint (Wireframe)
```text
┌──────────────────────────────┐  ┌──────────────────────────────┐
│   STOCK MARKET SENTIMENT     │  │   CRYPTO SENTIMENT           │
│                              │  │                              │
│     [Semicircular Gauge]     │  │     [Semicircular Gauge]     │
│       Red → Amber → Green    │  │       Red → Amber → Green    │
│                              │  │                              │
│           [ 24 ]             │  │           [ 68 ]             │
│        EXTREME FEAR          │  │           GREED              │
│                              │  │                              │
│  [S&P 500: -0.8% today]      │  │  [BTC: +1.2% today]          │
└──────────────────────────────┘  └──────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Card Background:** `rgba(255, 255, 255, 0.08)` (glass effect on Deep Blue section).
- **Gauge Arc Width:** `18px stroke`.
- **Gauge Diameter:** `180px` (desktop) / `140px` (mobile).
- **Index Number:** `font-size: 3rem`, `font-weight: 700`, dynamically colored by zone.
- **Zone Label:** `font-size: 0.9rem`, `font-weight: 600`, `letter-spacing: 0.1em`, `text-transform: uppercase`.
- **Zone Color Mapping:**
  - `0-24` → `var(--color-soft-red)` — "EXTREME FEAR"
  - `25-44` → `#E57373` (light red) — "FEAR"
  - `45-55` → `var(--color-golden-amber)` — "NEUTRAL"
  - `56-74` → `#81C784` (light green) — "GREED"
  - `75-100` → `var(--color-emerald-green)` — "EXTREME GREED"

### 🕹️ Behavior & Micro-interactions
- **Entry Animation:** On first scroll-reveal, the gauge needle sweeps from `0` to the current value over `1.2s` with an `easeOutBack` easing, creating a dramatic "price is right" spin effect.
- **Pulse Alert (Extreme State):** When either gauge is in "EXTREME FEAR" (`< 25`) or "EXTREME GREED" (`> 75`), the gauge card emits a single, slow color pulse (`box-shadow` pulses outward in the corresponding color, `800ms`).
- **Extreme Fear CTA:** When the Stock Market gauge is in "EXTREME FEAR" (`< 25`), a contextual message and CTA appear below the two gauges:

```text
┌────────────────────────────────────────────────────────────────────────┐
│  💡 "Historically, periods of Extreme Fear are the best entry points  │
│  for long-term investors."                                             │
│                                                                        │
│             [ Schedule a Free Strategy Call Now → ]                   │
│                   (A3.1 Emerald Green CTA Button)                     │
└────────────────────────────────────────────────────────────────────────┘
```

> ⚠️ **Architect Note (Winston):** Validate API feasibility for both sources:
> - **Stock Fear & Greed:** CNN does not have an official public API. Evaluate `feargreedmeter.com` or `alternative.me/api/` as proxies. Determine if scraping/unofficial endpoints are permissible or if a Supabase Edge Function proxy is needed to avoid CORS/rate-limiting issues.
> - **Crypto Fear & Greed:** `Alternative.me` (`https://api.alternative.me/fng/`) has a documented, free, no-auth JSON API. This is the recommended source for the crypto gauge.
> - **Caching:** All Fear & Greed data must be cached client-side (TTL: 1 hour minimum). Frequency of live updates to be validated during Architecture phase based on agreed performance budget.

---

## 📈 Widget 3: Market Data Cards

**Visual Spec:**
- Five `M3 KpiCard` molecules in a horizontal scrollable row on mobile, or a responsive 5-column grid on desktop.
- Each card shows: Asset icon, Asset name, current price (large), daily change % (with trend arrow), and a `A7 Badge`.
- Cards have a subtle glass morphism effect (`rgba(255,255,255,0.08)` background) consistent with the Deep Blue section.
- Clicking any card navigates to the `CDP vs. Market Comparator` section (anchor scroll or route navigation).

### 📐 Blueprint (Wireframe — Single Card)
```text
┌──────────────────────────────┐
│  [Icon]  S&P 500             │
│                              │  ← M3 KpiCard  
│  $5,842.50                   │
│                              │
│  [▲] +1.24%  [GROWTH Badge]  │
└──────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Card Grid:** `display: grid`, `grid-template-columns: repeat(5, 1fr)`, `gap: 1rem` (desktop).
- **Mobile:** Horizontal scroll container (`overflow-x: auto`, `scroll-snap-type: x mandatory`).
- **On-Click Interaction:** Cards lift slightly on hover (`translateY(-4px)`, `box-shadow` increase) and show a `cursor: pointer` to signal interactivity.
- **Trend Arrow Colors:**
  - Positive: `▲` in `var(--color-emerald-green)`.
  - Negative: `▼` in `var(--color-soft-red)`.
- **Asset List & Icons (MVP):**

| Asset | Ticker/ID | Icon Suggestion | Badge Variant |
|:------|:----------|:----------------|:--------------|
| S&P 500 | SPX | `bar-chart-2` | `--growth` or `--loss` |
| RSP (Equal Weight) | RSP | `trending-up` | `--growth` or `--loss` |
| Nasdaq | IXIC | `trending-up` | `--growth` or `--loss` |
| Gold | XAUUSD | `shield` | `--neutral` or `--warning` |
| Bitcoin | BTC | `dollar-sign` | `--growth` or `--loss` |

### 🕹️ Behavior & Micro-interactions
- **Loading State:** Each card shows `M7 SkeletonCard` while data is being fetched.
- **Offline State:** Each card shows `M3` offline state: value replaced with `--`, badge shows `[ DATOS OFFLINE ]` in `--color-warm-orange`.
- **Click Action:** Smooth anchor scroll to the `CDP vs. Market Comparator` section (US3.3). If already on that section, highlight the comparator with a brief `outline` pulse.
- **Background Refresh:** Data refresh frequency (e.g., every 5 or 15 minutes) to be validated with Winston (Architect) based on API rate limits and performance budget.

> ⚠️ **Architect Note (Winston):** Identify a suitable free-tier API for S&P 500, RSP, Nasdaq, and Gold real-time (or delayed) prices. Options to evaluate: `Yahoo Finance` (unofficial), `Alpha Vantage` (free tier: 5 req/min), `Finnhub` (free tier). Bitcoin price can be sourced from `CoinGecko` free API. Each source must be evaluated for CORS support in a static SPA context.

---

## 📡 Angular Component Contract (Signals)

```typescript
// src/app/features/market-dashboard/market-dashboard.ts

// --- State ---
selectedCurrency = signal<string>('CRC');    // From M4 CurrencySelector
selectedPeriod   = signal<'1M' | '3M' | '6M' | '1Y'>('1Y');
isLoading        = signal<boolean>(true);
isOffline        = signal<boolean>(false);

// --- Computed State ---
devaluationPct = computed(() => {
  // "Shock Number": loss % for selected currency over selected period
});

// --- Fear & Greed ---
stockFearGreed  = signal<number>(50);        // 0-100 from stock API
cryptoFearGreed = signal<number>(50);        // 0-100 from crypto API

showExtremeFearCta = computed(() =>
  this.stockFearGreed() < 25
);

// --- Market Cards ---
marketCards = signal<MarketCardData[]>([]);  // Driven by IMarketDataRepository
```

---

## 🌐 i18n Notes
- The "Shock Number" sentence must be externalized to `en.json`/`es.json` with a placeholder for the currency name, loss percentage, and period (e.g., `"The {currency} lost {pct}% of its value against the USD in the last {period}"`).
- All Fear & Greed zone labels ("EXTREME FEAR", "GREED", etc.) must be externalized for bilingual support.

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
