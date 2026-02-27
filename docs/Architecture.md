# 📘 Technical Architecture: Financial Tracker

> **Version:** 2.1.0 · **Architect:** Winston · **Last Updated:** 2026-02-22
> **Stack:** Angular 21+ · Tailwind CSS v4 · PrimeNG · Chart.js · Supabase

---

## 1. 🏗️ Methodology: Spec-Driven Development (SDD) & TDD

**Financial Tracker** follows the **Spec-Driven Development (SDD)** lifecycle coupled with **Test-Driven Development (TDD)**.

### SDD + TDD Workflow:

1. **Definition:** Define the feature and its acceptance criteria in `Backlog.md`.
2. **Red Phase (Test First):** Write the `.spec.ts` unit test using `@testing-library/angular`. Run the test and confirm it **fails**.
3. **Green Phase (Minimum Code):** Create the standalone component/service and implement the minimum logic to pass the test.
4. **Refactor Phase:** Optimize the code for structure and organization while keeping tests green.
5. **Quality Gate:** Verify at least **80% code coverage** before completion.
6. **Island Dev (Storybook):** Develop visual states and responsive behavior in isolation using Storybook stories.
7. **PO Audit:** Final validation via `PO_Checklist.md`.

---

## 2. 🧠 Frontend Architecture (Angular 21)

- **State Management:** Granular reactivity using **Angular Signals**. `computed()` signals handle all financial conversions. No RxJS for local component state — reserved for async HTTP flows only.
- **Zoneless:** Optimized for performance without `Zone.js` overhead.
- **Naming Convention:** **Flat & Clean**. Suffixes like `.component.ts` are strictly forbidden.
  - _Example:_ `hero-realtime.ts`, `hero-realtime.html`, `hero-realtime.spec.ts`, `hero-realtime.stories.ts`.
- **Dependency Injection:** Modern `inject()` usage for all services.
- **Currency & i18n Logic:** Global reactivity for currency switching via `CurrencyService`. High-scale currencies (e.g., CRC) automatically trigger **zero-decimal rounding** and dual-pricing (USD + Local) for market assets.
- **Standalone Components:** All components are standalone. No NgModules. `standalone: true` is the default in Angular 21+ — do NOT set it explicitly.

---

## 3. 🎨 Design System & Design Tokens (Tailwind v4 + PrimeNG)

We implement the **80/15/5 Rule** directly into the Tailwind v4 engine and propagate it to PrimeNG via `tailwindcss-primeui`.

### Design Tokens:

- **80% (Base — Trust):**
  - Deep Blue (`#1A3C6E`): Stability, brand identity, headers, primary text.
  - Cloud Gray (`#ECEFF1`): Surface, background, section separation.
- **15% (Action — Guidance):**
  - Charcoal (`#37474F`): Body text, paragraph content.
  - Teal Bright (`#009688`): Innovation, interactive icons, slider progress.
- **5% (Conversion — Growth):**
  - **Emerald Green (`#00C853`)**: Reserved strictly for Primary CTAs (all conversion actions), success feedback, and growth indicators.
- **Alerts (Minimal Usage):**
  - Golden Amber (`#FFC107`): Warning states in inflation dashboards.
  - Warm Orange (`#F57C00`): Subtle alert indicators only — NOT for CTAs.
  - Soft Red (`#D32F2F`): Error states, inflation risk indicators.

### Tailwind v4 Configuration (`src/styles.css`):

```css
@import "tailwindcss";

@theme {
  /* 80% - Foundational Trust */
  --color-deep-blue: #1A3C6E;
  --color-cloud-gray: #ECEFF1;
  --color-charcoal: #37474F;

  /* 15% - Success & Interaction */
  --color-emerald-green: #00C853;
  --color-teal-bright: #009688;

  /* Alerts (Minimal) */
  --color-soft-red: #D32F2F;
  --color-warm-orange: #F57C00;
  --color-golden-amber: #FFC107;

  /* Typography & Effects */
  --font-sans: 'Inter', system-ui, sans-serif;
  --shadow-premium: 0 10px 30px -10px rgba(26, 60, 110, 0.2);
  --radius-card: 1.5rem;
}

@layer base {
  body {
    @apply bg-cloud-gray text-charcoal font-sans antialiased;
  }
}
```

### PrimeNG Integration Strategy:

- **Package:** `tailwindcss-primeui` preset bridges PrimeNG theming with Tailwind design tokens.
- **Theme Mapping:** PrimeNG `primary` → Deep Blue (`#1A3C6E`), `success` → Emerald Green (`#00C853`), `danger` → Soft Red (`#D32F2F`), `surface` → Cloud Gray (`#ECEFF1`).
- **Dark/Light Mode:** `tailwindcss-primeui` enables automatic dark mode compatibility with our token system.
- **Component Usage:** PrimeNG components (InputText, Slider, Button, DataTable, Menubar, Card, Knob, Dialog) inherit Financial Tracker tokens automatically.
- **Override Method:** Use Tailwind utility classes to customize PrimeNG component appearance. Never use `::ng-deep`.

### Chart.js Integration:

- **Wrapper:** `ng2-charts` Angular wrapper for declarative chart binding.
- **Color Mapping:** Charts use the same design tokens — Emerald Green for growth, Soft Red for loss, Deep Blue for primary data series.
- **Performance:** Chart instances updated via Angular Signal `effect()` using `update('quiet')` mode for 60FPS slider reactivity.
- **Lazy Loading:** `jspdf` and other heavy chart dependencies loaded via Angular `@defer` blocks to protect initial bundle size.

---

## 4. 📂 Directory Structure (Core/Shared/Features/Infrastructure)

```text
src/
├── app/
│   ├── core/                          # 🧠 SINGLETONS & GLOBAL LOGIC
│   │   ├── services/
│   │   │   ├── currency.service.ts    # Global FX rates & currency detection
│   │   │   ├── i18n.service.ts        # Language management via Signals
│   │   │   └── seo.service.ts         # Dynamic meta tags for SEO
│   │   └── interfaces/
│   │       ├── i-lead-repository.ts        # Lead persistence contract
│   │       └── i-interaction-repository.ts # Analytics persistence contract (FR19)
│   │
│   ├── shared/                        # 🌍 GLOBAL REUSABLE SCOPE
│   │   ├── types/
│   │   │   └── index.ts              # Lead, InteractionEvent, MarketData, ProjectionEntry
│   │   ├── utils/
│   │   │   └── finance-math.ts       # Wealth Gap engine (pure functions)
│   │   ├── constants/
│   │   │   └── business-rules.ts     # Rate limits, default values
│   │   ├── components/               # Reusable UI atoms (buttons, inputs)
│   │   │   └── index.ts
│   │   └── assets/
│   │       └── mock-market-data.json # Read-only mock data for Phase 1
│   │
│   ├── features/                      # 🚀 BUSINESS FEATURES (Organisms)
│   │   ├── hero-realtime/
│   │   │   ├── hero-realtime.ts
│   │   │   ├── hero-realtime.html
│   │   │   ├── hero-realtime.css
│   │   │   ├── hero-realtime.spec.ts
│   │   │   └── hero-realtime.stories.ts
│   │   ├── compound-interest/
│   │   ├── retirement-simulator/
│   │   ├── market-status/
│   │   ├── currency-comparison/
│   │   ├── cdp-vs-market/
│   │   ├── lead-form-store/
│   │   ├── booking-calendar/
│   │   ├── floating-cta/
│   │   ├── lead-magnet-banner/
│   │   ├── wishlist-board/
│   │   ├── interaction-analytics/     # FR19: Engagement tracking (lowest priority)
│   │   ├── navbar/
│   │   └── footer/
│   │
│   ├── infrastructure/                # 🔧 PERSISTENCE (SWITCHABLE)
│   │   ├── local-lead.repository.ts       # Phase 1: Lead storage (LocalStorage/IndexedDB — TBD)
│   │   ├── local-interaction.repository.ts # Phase 1: Analytics storage (LocalStorage/IndexedDB — TBD)
│   │   ├── supabase-lead.repository.ts    # Phase 2: Supabase (ready)
│   │   ├── supabase-interaction.repository.ts # Phase 2: Supabase (ready)
│   │   └── infra.ts                       # Main export & DI providers
│   │
│   ├── app.routes.ts                  # Route definitions with lazy loading
│   └── app.config.ts                  # App providers & DI configuration
│
├── assets/
│   ├── i18n/
│   │   ├── en.json                   # English translations
│   │   └── es.json                   # Spanish translations
│   └── images/                       # Static assets
│
├── environments/
│   ├── environment.ts                # Dev environment (no API keys)
│   └── environment.prod.ts           # Prod (keys injected by GitHub Actions)
│
├── styles.css                        # Global Tailwind v4 + PrimeNG theme
└── index.html                        # CSP meta-tags, Google Fonts
```

---

## 5. 🧪 Quality & Testing Standards (Mandatory)

Engineering excellence is enforced through strict testing protocols:

- **TDD Requirement:** All new features must start with a failing test (Red-Green-Refactor).
- **Testing Library:** `@testing-library/angular` for unit tests.
- **E2E Testing:** Playwright for critical user journeys (lead capture → PDF download, booking flow).
- **Coverage Gate:** **≥ 80%** total coverage for components, services, and utilities. Mathematical engine requires **100% coverage**.
- **Storybook:** Every feature component must include isolated stories for mobile/desktop validation, interactive states (hover, focus, error, success), and accessibility checks (AXE addon).
- **Accessibility:** All components must pass AXE checks and WCAG AA compliance.
- **PO Sign-off:** Validation against `PO_Checklist.md` before any story is marked as Done.

---

## 6. 📈 The Wealth Gap Engine (Financial Logic)

Pure math logic in `src/app/shared/utils/finance-math.ts`.

- **Nominal FV:** `initial * (1 + monthly_rate)^months + PMT contributions`
- **Real FV:** `nominal_fv / (1 + annual_inflation_rate)^years`
- **The Gap:** `nominal_fv - real_fv` (The "Wealth Erosion" story)

All calculations performed in USD internally; converted to local currency for display only using the `CurrencyService` signal.

---

## 7. 🔧 Data & Persistence Layer

### 7.1 Persistence Strategy (Repository Pattern)

All data persistence is abstracted via interfaces that decouple feature logic from storage technology. This enables a **local-first MVP** that can seamlessly migrate to Supabase without modifying any feature code.

- **Phase 1 (MVP):** Local browser storage (LocalStorage or IndexedDB — see §7.2) + JSON files for read-only mock data.
- **Phase 2 (Cloud):** Supabase (PostgreSQL + RLS) via a simple DI provider swap in `app.config.ts`.

### Repository Interfaces:

| Interface                 | Purpose                            | Phase 1 Implementation          | Phase 2 Implementation          |
| ------------------------- | ---------------------------------- | ------------------------------- | ------------------------------- |
| `ILeadRepository`         | Lead data (forms, bookings)        | `LocalLeadRepository`           | `SupabaseLeadRepository`        |
| `IInteractionRepository`  | Analytics & engagement metrics     | `LocalInteractionRepository`    | `SupabaseInteractionRepository` |

### 7.2 Architectural Decision: LocalStorage vs. IndexedDB

**Status:** ✅ **RESOLVED — Hybrid Approach Confirmed.**

After evaluating the data volume, query complexity, and performance characteristics of each repository use case, the team has decided on a **Hybrid Approach**: use both LocalStorage and IndexedDB, selecting the best-fit technology per repository.

| Criteria               | LocalStorage                  | IndexedDB                             |
| ---------------------- | ----------------------------- | ------------------------------------- |
| **API**                | Synchronous, blocking         | Asynchronous, non-blocking            |
| **Data Size**          | ~5-10MB limit                 | Virtually unlimited (browser-managed) |
| **Data Structure**     | Key-value strings only        | Structured objects, indexes, cursors  |
| **Query Capability**   | None (manual JSON parse)      | Index-based queries, ranges           |
| **Best For**           | Simple preferences, small data | Large datasets, structured logs       |

**Final Decision per Repository:**

| Repository | Technology | Rationale |
|:-----------|:-----------|:----------|
| **`ILeadRepository`** | **LocalStorage** | Few records (tens, not thousands). Simple CRUD. JSON stringify/parse is acceptable for this volume. |
| **`IInteractionRepository`** | **IndexedDB** | High-volume event logs (hundreds per session). Requires structured queries for aggregation (`duration_ms` sums, `widget_id` filters). Async API prevents UI thread blocking during batch writes. |
| **User Preferences** (language, currency) | **LocalStorage** | Simple key-value pairs. Synchronous read is desirable for instant UI hydration on page load. |
| **API Cache** (exchange rates, market data) | **LocalStorage** | Cached JSON responses with TTL timestamps. Small payloads (~2-5KB). Synchronous read avoids async overhead for cache-hit checks. |

**Implementation Notes:**
- IndexedDB access should be wrapped via a lightweight abstraction (e.g., `idb` library or native `IDBDatabase` wrapper) to simplify the async API.
- The Repository Pattern interface ensures all consumers remain agnostic of the underlying storage technology. Swapping to Supabase in Phase 2 requires only a provider change in `app.config.ts`.

### 7.3 Data Model

**`leads` table (Supabase Phase 2 / Local Phase 1):**

| Field              | Type      | Description                                    |
| ------------------ | --------- | ---------------------------------------------- |
| `id`               | UUID      | Primary key                                    |
| `first_name`       | string    | Lead first name                                |
| `last_name`        | string    | Lead last name                                 |
| `email`            | string    | Lead email address                             |
| `created_at`       | timestamp | Record creation time                           |
| `source`           | enum      | `'landing-page'` \| `'booking'`                |
| `engagement_stats` | JSONB     | Accumulated interaction metrics from FR19      |

**`appointments` table (Supabase Phase 2 / Local Phase 1):**

| Field               | Type      | Description                                   |
| -------------------- | --------- | --------------------------------------------- |
| `id`                | UUID      | Primary key                                    |
| `lead_id`           | UUID      | FK to leads table                              |
| `appointment_date`  | timestamp | Scheduled consultation date/time               |
| `status`            | enum      | `'pending'` \| `'confirmed'` \| `'completed'` |

**`interaction_logs` table (Supabase Phase 2 / Local Phase 1):**

| Field               | Type      | Description                                   |
| -------------------- | --------- | --------------------------------------------- |
| `id`                | UUID      | Primary key                                    |
| `session_id`        | string    | Browser session identifier                     |
| `widget_id`         | string    | Feature identifier (e.g., `'compound_calc'`)   |
| `interaction_type`  | string    | Event type (e.g., `'slider_move'`, `'focus'`)  |
| `value`             | number    | Optional: the value the user set               |
| `duration_ms`       | number    | Time spent in this interaction                 |
| `timestamp`         | timestamp | Event time                                     |

---

## 8. 🔒 Security Architecture

- **Frontend:** Angular native XSS sanitization via `DomSanitizer`. Strict CSP in `index.html`.
- **API Keys & Secrets:** Managed via `.env` file + `@ngx-env/builder`. Variables prefixed with `NG_APP_` are automatically injected at build-time and accessed in TypeScript via `import.meta.env.NG_APP_VARIABLE_NAME`. The `.env` file is git-ignored; production values are injected via GitHub Secrets.
- **Type Safety:** A dedicated `src/environments/env.d.ts` augments the `ImportMeta` interface to provide full TypeScript IntelliSense for all `NG_APP_*` variables.
- **Domain Whitelisting:** ExchangeRate-API restricted to `*.github.io` via HTTP Referrer.
- **Database (Supabase):** Row Level Security (RLS) on all tables. `INSERT`-only for public forms. `SELECT` restricted to admin.
- **CORS:** Supabase configured to accept only production domain and localhost for development.
- **SERVICE_ROLE_KEY:** Never included in Angular frontend code. Used only in Supabase Edge Functions.

---

## 9. 🚀 Deployment & CI/CD

- **Hosting:** GitHub Pages (static hosting).
- **Build System:** `@ngx-env/builder` (replaces the default `@angular/build:application` builder) to enable `.env` file support and `import.meta.env` injection.
- **Build Strategy:** Static Site Generation (SSG / Prerendering) via Angular build.
- **CI/CD Pipeline:** GitHub Actions workflow:
  1. Checkout code.
  2. Install dependencies (`pnpm install`).
  3. Write `NG_APP_*` secrets from GitHub Repository Secrets into a `.env` file at build time.
  4. Run tests (`ng test --watch=false --browsers=ChromeHeadless`).
  5. Build production bundle (`ng build`).
  6. Deploy to `gh-pages` branch.
- **Routing:** `404.html` redirects to `index.html` for Angular SPA client-side routing.
- **SEO:** Dynamic metadata via `SeoService` using Angular `Title` and `Meta` services.

### Environment Variables (`@ngx-env/builder`)

All runtime configuration is managed through environment variables. The `.env` file must be created locally and is **never committed to git**.

```bash
# .env (local only — git-ignored)
NG_APP_EMAIL_SENDING_KEY=re_xxxxxxxxxxxxxxxxxxxxx
NG_APP_EMAIL_SENDING_DOMAIN=onboarding@resend.dev
NG_APP_CALENDLY_BASE_URL=https://calendly.com/your-account/30min
NG_APP_STAGE=development
```

**Access pattern in Angular services/components:**
```typescript
// Fully type-safe via src/environments/env.d.ts
const apiKey = import.meta.env.NG_APP_EMAIL_SENDING_KEY;
const senderDomain = import.meta.env.NG_APP_EMAIL_SENDING_DOMAIN;
const calendlyUrl = import.meta.env.NG_APP_CALENDLY_BASE_URL;
```

**Type definitions** live in `src/environments/env.d.ts` (augments the global `ImportMeta` interface).

---

## 10. 🛡️ Engineering Constraints (Non-Negotiable)

1. **Language:** UI is bilingual (ES/EN); **Source Code & Comments** are 100% English.
2. **Testing:** TDD is mandatory for all new features.
3. **Naming:** Class names must match filenames without `.component` suffix (e.g., `LeadFormStore` in `lead-form-store.ts`).
4. **Performance:** LCP < 2.5s. Initial JS bundle < 150KB (gzipped).
5. **Project Name:** Strictly **"Financial Tracker"** — no deviations.
6. **CTA Color:** All CTAs use **Emerald Green `#00C853`** exclusively. Orange is for subtle alert indicators only.
7. **Reactivity:** Signals only for local state; RxJS reserved for HTTP/async streams.
8. **PrimeNG Theming:** All PrimeNG components must be styled through `tailwindcss-primeui` and Financial Tracker design tokens — never via custom SCSS overrides.

---

## 11. 🧠 Shared Signal Architecture (Cross-Organism State)

The UX specification defines several interactive values that are **shared across multiple organisms** on the same page. These are managed as **page-level Signals** owned by the parent `home-page.ts` component and passed down to child organisms via `input()` bindings.

### Signal Ownership Map

```text
home-page.ts (Page-Level Signal Owner)
├── initialCapital: WritableSignal<number>       → Wealth Gap Calculator, Cost of Waiting Banner
├── monthlyContribution: WritableSignal<number>  → Wealth Gap Calculator, Retirement Simulator
├── expectedReturn: WritableSignal<number>       → Wealth Gap Calculator, Retirement Simulator
├── inflationRate: WritableSignal<number>        → Wealth Gap Calculator, Retirement Simulator, Cost of Waiting Banner
├── timeHorizon: WritableSignal<number>          → Wealth Gap Calculator
└── selectedCurrency: WritableSignal<string>     → Market Dashboard, Currency Devaluation, all CurrencyPipe instances
```

### Rules:
1. **Single Source of Truth:** Each shared value has exactly ONE `WritableSignal` owner (always `home-page.ts`).
2. **Child Access:** Child organisms receive shared signals via `input.required<WritableSignal<T>>()`. They can read AND write to these signals.
3. **Bidirectional Sync:** When the Retirement Simulator changes `inflationRate`, the Wealth Gap Chart updates automatically (and vice versa), because both point to the same Signal reference.
4. **Unlinked Organisms:** Organisms that do NOT share state (e.g., Fear & Greed Index, Booking Modal) manage their own local signals internally.
5. **No RxJS for Shared UI State:** Shared state must use Signals exclusively. RxJS is reserved for HTTP streams and async operations.

### Example Wiring (home-page.ts):

```typescript
// src/app/features/home/home-page/home-page.ts

// Page-level shared signals
inflationRate       = signal<number>(6.5);
initialCapital      = signal<number>(10000);
monthlyContribution = signal<number>(500);
expectedReturn      = signal<number>(7.0);
selectedCurrency    = signal<string>('CRC');
```

```html
<!-- home-page.html -->
<app-wealth-gap-chart
  [inflationRate]="inflationRate"
  [initialCapital]="initialCapital"
  [expectedReturn]="expectedReturn" />

<app-cost-of-waiting-banner
  [currentSavings]="initialCapital"
  [inflationRate]="inflationRate" />

<app-retirement-simulator
  [inflationRate]="inflationRate"
  [expectedReturn]="expectedReturn" />
```

---

## 12. 🌐 External API Integration Layer

All external API calls are managed through Angular services in `core/services/`. Each service implements client-side caching, offline fallback, and domain-restricted API key injection.

### API Registry (Free Tier — All Confirmed)

| API | Provider | Free Tier Limits | CORS | Auth | Service |
|:----|:---------|:-----------------|:-----|:-----|:--------|
| **Currency Exchange** | [ExchangeRate-API](https://www.exchangerate-api.com/) | 1,500 req/month | ✅ | API Key (URL param) | `currency.service.ts` |
| **Crypto Fear & Greed** | [Alternative.me](https://alternative.me/crypto/fear-and-greed-index/#api) | Unlimited (free forever) | ✅ | None | `market-sentiment.service.ts` |
| **Stock Fear & Greed** | [RapidAPI — CNN FGI](https://rapidapi.com/) | 500 req/month (free) | ✅ (via RapidAPI proxy) | API Key (header) | `market-sentiment.service.ts` |
| **Bitcoin Price** | [CoinGecko](https://www.coingecko.com/en/api) | 10-30 req/min | ✅ | None (demo) | `market-data.service.ts` |
| **S&P 500, RSP, Nasdaq** | [Finnhub](https://finnhub.io/) | 60 req/min | ✅ | API Key (URL param) | `market-data.service.ts` |
| **Gold Price** | [FreeGoldAPI](https://freegoldapi.com/) | Unlimited | ✅ | None | `market-data.service.ts` |

### Caching Strategy

```typescript
// Generic cache pattern used by all API services
interface CachedResponse<T> {
  data: T;
  timestamp: number;  // Date.now() at fetch time
  ttlMs: number;      // Time-to-live in milliseconds
}
```

| Data Source | Cache TTL | Storage | Rationale |
|:------------|:----------|:--------|:----------|
| Currency Exchange Rates | **1 hour** | LocalStorage | PRD requirement. Rates change slowly. |
| Fear & Greed Index | **1 hour** | LocalStorage | Index updates once daily. |
| Stock/Crypto Prices | **15 minutes** | LocalStorage | Balance between freshness and rate limits. |
| Gold Price | **1 hour** | LocalStorage | Updates daily. |

### Offline Fallback Protocol

1. On API call failure (network error, 4xx/5xx), check LocalStorage for cached data.
2. If cached data exists (regardless of TTL expiry), display it with a visible `[CACHED DATA]` warning badge (A7 variant `--warning`).
3. If no cached data exists, display the `M3 KpiCard` in offline state: value replaced with `--`, badge shows `[OFFLINE]`.
4. Retry on next user interaction or after 60 seconds (whichever comes first).

### API Key Injection

- All API keys and secrets use the `@ngx-env/builder` pattern: variables defined in `.env` (git-ignored), accessed via `import.meta.env.NG_APP_*`, and injected by the builder at compile time.
- In CI/CD, GitHub Actions writes secrets from Repository Secrets into a `.env` file before the build step.
- ExchangeRate-API is additionally protected via HTTP Referrer domain whitelisting (`*.github.io`).
- `environment.ts` / `environment.prod.ts` files are **deprecated** in favor of the `.env` + `@ngx-env/builder` pattern and are git-ignored.

> ⚠️ **Risk (RapidAPI for CNN FGI):** The RapidAPI free tier for CNN Fear & Greed is limited to 500 req/month. If the product exceeds this, consider downgrading to a single gauge (Crypto only via Alternative.me, which is unlimited) or implementing a Supabase Edge Function as a caching proxy in Phase 2.

---

## 13. ⚙️ Application Configuration Tokens (DI)

Business-configurable values that may change without code modifications are injected via Angular Dependency Injection tokens.

```typescript
// src/app/core/tokens/app-config.token.ts
import { InjectionToken } from '@angular/core';

export interface AppUiConfig {
  /** Default savings amount for Cost of Waiting Banner when no user input exists */
  defaultSavingsAmount: number;

  /** Calendly scheduling URL */
  calendlyBaseUrl: string;

  /** Default currency code when auto-detection fails */
  defaultCurrencyCode: string;

  /** Default inflation rate for calculators */
  defaultInflationRate: number;

  /** Default expected return rate for calculators */
  defaultExpectedReturn: number;

  /** Default Bank CDP rate for the CDP vs Market Comparator (US3.3) */
  defaultCdpRate: number;

  /** Default Time Horizon in years for comparisons when no user age is provided */
  defaultTimeHorizon: number;

  /** S&P 500 historical average annual return (for Cost of Waiting calculations) */
  sp500HistoricalReturn: number;

  /** Cache TTL overrides (in milliseconds) */
  cacheTtl: {
    currencyExchange: number;
    fearGreedIndex: number;
    marketPrices: number;
  };
}

export const APP_UI_CONFIG = new InjectionToken<AppUiConfig>('APP_UI_CONFIG');
```

```typescript
// src/app/app.config.ts (Provider Registration)
import { APP_UI_CONFIG, AppUiConfig } from '@core/tokens/app-config.token';

const uiConfig: AppUiConfig = {
  defaultSavingsAmount: 10_000,
  calendlyBaseUrl: 'https://calendly.com/YOUR_ACCOUNT/30min',
  defaultCurrencyCode: 'CRC',
  defaultInflationRate: 6.5,
  defaultExpectedReturn: 7.0,
  defaultCdpRate: 5.0,
  defaultTimeHorizon: 20,
  sp500HistoricalReturn: 10.5,
  cacheTtl: {
    currencyExchange: 3_600_000,  // 1 hour
    fearGreedIndex: 3_600_000,    // 1 hour
    marketPrices: 900_000,        // 15 minutes
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    { provide: APP_UI_CONFIG, useValue: uiConfig },
  ],
};
```

---

## 14. 🗺️ Routing & Lazy Loading Map

Financial Tracker is a **single-page scroll application** (Narrative Scroll). All primary content lives on the Home route. The Booking screen is a modal overlay, not a separate route.

### Route Definitions

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page/home-page').then(m => m.HomePage),
    title: 'Financial Tracker — Discover Your Wealth Gap',
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/legal/privacy-policy').then(m => m.PrivacyPolicy),
    title: 'Privacy Policy — Financial Tracker',
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/terms-of-service').then(m => m.TermsOfService),
    title: 'Terms of Service — Financial Tracker',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

### Deferred Loading Strategy (`@defer`)

Heavy libraries and below-the-fold organisms are deferred to protect the initial bundle size (target: < 150KB gzipped).

| Component / Library | Load Strategy | Trigger |
|:--------------------|:-------------|:--------|
| Hero Section + Navbar | **Eager** (above the fold) | Immediate |
| Market Dashboard Band | `@defer (on viewport)` | When section scrolls into view |
| Wealth Gap Calculator | `@defer (on viewport)` | When section scrolls into view |
| Cost of Waiting Banner | `@defer (on viewport)` | When section scrolls into view |
| Retirement Simulator | `@defer (on viewport)` | When section scrolls into view |
| Lead Capture Form | `@defer (on viewport)` | When section scrolls into view |
| CDP vs. Market Comparator | `@defer (on viewport)` | When section scrolls into view |
| Wishlist Board | `@defer (on viewport)` | When section scrolls into view |
| Footer | `@defer (on viewport)` | When section scrolls into view |
| Booking Modal | `@defer (on interaction)` | When Floating CTA or Booking link is clicked |
| `jspdf` + `jspdf-autotable` | `@defer (on interaction)` | When PDF generation is triggered |
| `canvas-confetti` | `@defer (on interaction)` | When Retirement Simulator results render |
| Floating CTA Button | **Eager** (always visible) | Immediate |

---

## 15. 📅 Third-Party Embed Strategy (Calendly)

The Booking Screen (US5.2) uses a **Calendly Inline Embed** displayed inside a PrimeNG `Dialog` modal overlay.

### Integration Architecture

```text
┌─ Angular App ───────────────────────────────────────────┐
│                                                         │
│  BookingModal Component                                 │
│  ├── PrimeNG Dialog (p-dialog)                          │
│  │   ├── Pre-fill Header (Lead name/email from repo)    │
│  │   ├── Calendly iframe (Inline Embed)                 │
│  │   │   ├── URL params: primary_color, text_color      │
│  │   │   ├── URL params: name, email (pre-fill)         │
│  │   │   └── URL param: locale (es/en)                  │
│  │   └── Success "Homework" Screen (post-booking)       │
│  │                                                      │
│  └── Event Listener: window.addEventListener(           │
│        'message', calendlyEventHandler)                  │
│        → Listens for 'calendly.event_scheduled'         │
│        → Triggers state transition to Homework screen   │
└─────────────────────────────────────────────────────────┘
```

### Calendly URL Construction

```typescript
// Built by the BookingModal component using APP_UI_CONFIG
const calendlyUrl = `${config.calendlyBaseUrl}
  ?primary_color=009688
  &text_color=37474F
  &background_color=ffffff
  &locale=${currentLocale}
  &name=${encodeURIComponent(lead.firstName + ' ' + lead.lastName)}
  &email=${encodeURIComponent(lead.email)}`;
```

### Security Considerations
- The iframe `src` must be sanitized via Angular's `DomSanitizer.bypassSecurityTrustResourceUrl()`.
- CSP in `index.html` must whitelist `https://calendly.com` in `frame-src` directive.
- The `postMessage` event handler must validate `event.origin === 'https://calendly.com'` before processing any messages.

### Pre-fill Behavior
- Pre-fill parameters are **display-only** in Calendly's confirmation step. The user sees their data already populated but must manually click Calendly's "Confirm" button to complete the booking. No auto-submission occurs.

---

## 16. 📧 Email Service Architecture (US2.3)

The email delivery system uses a **Provider Adapter Pattern** to enable transparent switching between email service providers.

### Interfaces

```typescript
// src/app/core/interfaces/i-email-provider.ts
export interface EmailPayload {
  to: string;
  leadFirstName: string;
  leadFullName: string;
  pdfBase64: string;
  pdfFilename: string;
  bookingUrl: string;
  lang: 'ES' | 'EN';
  htmlBody: string; // Pre-built HTML from EmailService
}

export abstract class IEmailProvider {
  abstract send(payload: EmailPayload): Promise<EmailResult>;
}
```

### Provider Implementations

| Class | Provider | Status |
|:------|:---------|:-------|
| `ResendEmailAdapter` | [Resend](https://resend.com) | ✅ Phase 1 (Active) |
| `SendGridEmailAdapter` | SendGrid | 🔲 Phase 2 (Stub ready) |

### Environment Variables Required

Managed via `@ngx-env/builder` to inject `.env` variables into `import.meta.env`.

| Variable | Purpose |
|:---------|:--------|
| `NG_APP_EMAIL_SENDING_KEY` | Resend API Key |
| `NG_APP_EMAIL_SENDING_DOMAIN` | Verified sender email address |
| `NG_APP_CALENDLY_BASE_URL` | Calendly pre-fill booking URL |

### PDF Delivery Strategy

- The PDF is generated client-side as a Base64 string (from `PdfReportService`).
- The Base64 string is passed as an **email attachment** via the Resend API `attachments` field.
- The email is dispatched **asynchronously** — the success screen is shown immediately after triggering the download locally.
- Dispatch status is tracked via internal component signals (`emailStatus`) to provide UI feedback.

---

## 17. 🛡️ Environment & Security (ngx-env)

To comply with BMAD security standards and avoid leaking repo-specific secrets, we use `@ngx-env/builder`.

### Configuration
- **Loader:** Variables are extracted from `.env` (gitignored) and `.env.example`.
- **Prefix:** All variables must start with `NG_APP_` to be detected by the builder.
- **Access:** Typescript uses `import.meta.env.NG_APP_VARIABLE_NAME`.
- **Typing:** Global types are defined in `src/environments/env.definition.ts`.

---

*— Winston, Architect · Financial Tracker · BMAD v4 · v2.3.0 · 2026-02-27 (Updated: ngx-env integration, verified Email Architecture)*
