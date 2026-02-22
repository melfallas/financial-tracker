# 📘 Technical Architecture: Financial Tracker

> **Version:** 2.0.0 · **Architect:** Winston · **Last Updated:** 2026-02-22
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

**Status:** _Deferred to Architecture Phase — Discovery Required._

The Architect must evaluate the following trade-offs per repository use case and recommend the appropriate technology:

| Criteria               | LocalStorage                  | IndexedDB                             |
| ---------------------- | ----------------------------- | ------------------------------------- |
| **API**                | Synchronous, blocking         | Asynchronous, non-blocking            |
| **Data Size**          | ~5-10MB limit                 | Virtually unlimited (browser-managed) |
| **Data Structure**     | Key-value strings only        | Structured objects, indexes, cursors  |
| **Query Capability**   | None (manual JSON parse)      | Index-based queries, ranges           |
| **Best For**           | Simple preferences, small data | Large datasets, structured logs       |

**Recommendation Paths (to be finalized by Architect):**
- **Leads Repository:** LocalStorage may suffice for MVP (small dataset, simple CRUD).
- **Interaction Repository:** IndexedDB likely preferred (high-volume event logs, structured queries for aggregation).
- **User Preferences:** LocalStorage (language, currency — simple key-value).
- **Hybrid Approach:** Use both technologies with the appropriate one per repository. The Repository Pattern interface ensures consumers are unaware of the underlying implementation.

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
- **API Keys:** Injected at build-time via GitHub Secrets into `environment.prod.ts`. Never stored in source code.
- **Domain Whitelisting:** ExchangeRate-API restricted to `*.github.io` via HTTP Referrer.
- **Database (Supabase):** Row Level Security (RLS) on all tables. `INSERT`-only for public forms. `SELECT` restricted to admin.
- **CORS:** Supabase configured to accept only production domain and localhost for development.
- **SERVICE_ROLE_KEY:** Never included in Angular frontend code. Used only in Supabase Edge Functions.

---

## 9. 🚀 Deployment & CI/CD

- **Hosting:** GitHub Pages (static hosting).
- **Build Strategy:** Static Site Generation (SSG / Prerendering) via Angular build.
- **CI/CD Pipeline:** GitHub Actions workflow:
  1. Checkout code.
  2. Install dependencies (`pnpm install`).
  3. Inject API keys from GitHub Secrets.
  4. Run tests (`ng test --watch=false --browsers=ChromeHeadless`).
  5. Build production bundle with SSG (`ng build`).
  6. Deploy to `gh-pages` branch.
- **Routing:** `404.html` redirects to `index.html` for Angular SPA client-side routing.
- **SEO:** Dynamic metadata via `SeoService` using Angular `Title` and `Meta` services.

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
