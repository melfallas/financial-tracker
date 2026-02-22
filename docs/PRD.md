# Financial Tracker — Product Requirements Document (PRD)

> **BMAD v4 Standard** · Status: Final · Version: 2.0.0
> **Stack:** Angular 21+ · Tailwind CSS v4 · PrimeNG · Chart.js · Supabase
> **Infrastructure:** GitHub Pages (SSG) · GitHub Actions CI/CD

---

## 1. Goals and Background Context

### 1.1 Goals

- **Lead Generation:** Convert curious users into qualified financial leads through a persuasive, data-driven experience that captures Name, Last Name, and Email.
- **Education & Awareness:** Visualize the "Wealth Gap" — the divergence between nominal compound interest growth and real purchasing power eroded by inflation — to trigger a "loss aversion" response.
- **Consultancy Conversion:** Enable professional appointment scheduling via a qualified lead flow (CTA → Form → Calendar → Confirmation Email).
- **Value Exchange:** Deliver a personalized "Investor Terms" PDF report as a lead magnet in exchange for user contact data.
- **Multi-Currency Localization:** Automatically detect user's local currency and compare it against USD to highlight devaluation in LATAM markets.
- **Bilingual Experience:** Provide full English/Spanish support to serve global and LATAM audiences.

### 1.2 Background Context

Financial illiteracy regarding inflation is a global phenomenon. While compound interest is often called the "eighth wonder of the world," inflation is its silent assassin. Many users in LATAM do not perceive how much money they lose due to inflation and the devaluation of their local currencies against the USD. The complexity of international markets generates analysis paralysis, leaving potential investors frozen.

**Financial Tracker** is positioned not as a utility, but as an **Educational Conversion Engine** — a persuasive experience that uses real-time data and logical tools to demonstrate the opportunity cost of not investing in stable markets like the US. Its success is measured by its ability to provoke a "loss aversion" response in the user, prompting them to seek professional financial advice — captured as a lead. The product bridges the gap between using a free tool and paying for advice through strategic "hooks" and immediate benefits like the Investment Terms PDF.

### 1.3 Change Log

| Date       | Version | Description                                                                 | Author       |
| ---------- | ------- | --------------------------------------------------------------------------- | ------------ |
| 2026-02-22 | 2.0.0   | Complete PRD rewrite. Consolidated all BMAD agent agreements, design docs, and architecture decisions. Added PrimeNG, Chart.js, Storybook to stack. Corrected Deep Blue to #1A3C6E. CTA standardized to Emerald Green. Repriorized MVP scope. | John (PM)    |
| 2026-01-15 | 1.0.0   | Initial PRD draft from BMAD Orchestrator planning session.                  | John (PM)    |

---

## 2. Requirements

### 2.1 Functional Requirements

- **FR01: Wealth Gap Engine** — Calculate monthly compounding interest growth adjusted by annual inflation, producing a dual-line projection (Nominal vs. Real purchasing power) that visually exposes the "Wealth Gap." Pure math logic decoupled from UI in `shared/utils/finance-math.ts`.
- **FR02: Compound Interest Calculator** — Interactive calculator with slider controls (Initial Capital, Monthly Contribution, Expected Return %, Annual Inflation %, Time Horizon) that updates the Wealth Gap chart in real-time via Angular Signals.
- **FR03: Retirement Simulator (Nest Egg)** — Dedicated simulator that projects retirement savings considering inflation-adjusted purchasing power, showing users when they will achieve financial independence. _Priority: High — strong emotional trigger for lead conversion._
- **FR04: Lead Capture Form (PDF Lead Magnet)** — Multi-field form (First Name, Last Name, Email) with privacy consent checkbox. Upon submission: saves lead to persistence layer, triggers client-side PDF generation of the personalized "Investor Terms" report, and sends the PDF via automated email (Resend/SendGrid). Includes spam-folder guidance in the success screen.
- **FR05: CTA Flotante (Schedule Consultation)** — Persistent floating button (Emerald Green `#00C853`) visible across all sections. On click, navigates to a Booking screen that: (1) captures First Name, Last Name, Email; (2) displays external calendar widget (Calendly/Google Calendar); (3) triggers confirmation and reminder emails upon booking.
- **FR06: PDF Report Generation** — Client-side PDF generation using `jspdf` + `jspdf-autotable`. Report includes: personalized header with user name, date, executive summary of Wealth Gap, projection data table, and Financial Tracker branding in Deep Blue (`#1A3C6E`).
- **FR07: Multi-Currency Detection & Comparison** — Automatic detection of user's country via browser locale/IP to infer local currency. Manual override available. Supports USD, EUR, ARS, MXN, CRC and other LATAM currencies. Direct comparison with USD to highlight devaluation.
- **FR08: Currency Comparison Widget** — Dynamic chart showing local currency devaluation vs. USD in real-time, powered by ExchangeRate-API data.
- **FR09: Hero Section (The Hook)** — Landing section with Deep Blue (`#1A3C6E`) heading, Emerald Green (`#00C853`) highlight text ("Libertad Financiera"), compelling subtext in Charcoal (`#37474F`), and primary CTA button in Emerald Green. Follows the approved `Header&HeroClearOutput.png` design.
- **FR10: Cost of Waiting Banner** — Interactive banner showing real-time financial loss from inflation vs. S&P 500 historical performance, reinforcing the urgency to act.
- **FR11: Financial Freedom Countdown** — Dynamic widget showing years of "financial life" remaining based on user's current savings rate vs. projected expenses, adjusted for inflation.
- **FR12: Fear & Greed Index Widget** — Visual gauge (semicircular speedometer) displaying current market sentiment from CNN's Fear & Greed Index, using color-coded states: Soft Red (Extreme Fear) → Golden Amber (Neutral) → Emerald Green (Extreme Greed).
- **FR13: CDP vs. Market Comparator** — Side-by-side table comparing returns from local bank CDPs (Certificates of Deposit) vs. S&P 500 / US market investment, quantifying the opportunity cost.
- **FR14: Wishlist Board** — Interactive feature voting board where users can upvote desired future features, serving as a retention mechanism and community engagement tool.
- **FR15: Bilingual Toggle (i18n)** — Seamless language switching between English and Spanish. Default language inferred from browser locale. Persistent preference via localStorage.
- **FR16: Navbar** — Logo ("Financial Tracker" in Deep Blue + Emerald Green), i18n toggle (ES/EN), currency selector (Auto-detect/Manual), and "Schedule a Call" button in Deep Blue.
- **FR17: Footer** — Legal links (Privacy Policy, Terms of Service), brand logo, and social media links in Cool Gray (`#ECEFF1`) background with Charcoal (`#37474F`) text.
- **FR18: Email Automation** — Automated email delivery for: (a) PDF Lead Magnet upon form submission; (b) Booking confirmation upon appointment scheduling; (c) Reminder emails before scheduled consultations. Integration via Resend or SendGrid Edge Functions.
- **FR19: Interaction Analytics & Engagement Tracking** — Capture and persist user interaction metrics (widget engagement times, slider interactions, session durations) to measure KPIs like Wealth Gap Engagement. Uses an `IInteractionRepository` interface following the same Repository Pattern used for leads, enabling local-first storage (LocalStorage/IndexedDB) in Phase 1 and migration to Supabase `interaction_logs` table in Phase 2. Data includes: `session_id`, `widget_id`, `interaction_type`, `duration_ms`, `timestamp`. When a user converts to a Lead, their accumulated engagement stats are anchored to their lead record via an `engagement_stats` JSONB field. A debounce buffer strategy prevents network saturation — events are batched and flushed on idle (5s inactivity), section change, or CTA click. _Priority: Low — last implementation priority; the product can launch without this._

### 2.2 Non-Functional Requirements

- **NFR01: Code Language** — All source code, comments, variables, commit messages, and technical documentation must be written in 100% English. User-facing UI is bilingual (ES/EN).
- **NFR02: Naming Convention** — Component classes and files must NOT use the `.component` suffix (e.g., class `HeroRealtime` in file `hero-realtime.ts`). Services, Pipes, Guards, and Directives retain their conventional suffixes (e.g., `currency.service.ts`, `currency-local.pipe.ts`).
- **NFR03: TDD Mandatory** — All new features must follow Test-Driven Development (Red → Green → Refactor). Unit tests written with `@testing-library/angular` BEFORE implementation code.
- **NFR04: Code Coverage** — Minimum **80% code coverage** for all components, services, and utility logic. Mathematical engine (`finance-math.ts`) requires **100% coverage**.
- **NFR05: Accessibility (WCAG AA)** — Full compliance with WCAG AA standards. All interactive elements must be keyboard-navigable with visible focus states. ARIA labels for icon-only buttons. Slider touch targets ≥ 44px for mobile accessibility.
- **NFR06: Performance** — LCP (Largest Contentful Paint) < 2.5 seconds. Initial JS bundle < 150KB (gzipped). All financial calculations performed client-side for instant reactivity.
- **NFR07: Security — Frontend** — Angular native XSS sanitization (`DomSanitizer`). Strict Content Security Policy (CSP) in `index.html` meta-tags. No hardcoded API keys in source code.
- **NFR08: Security — API Keys** — API keys injected at build-time via GitHub Secrets. ExchangeRate-API configured with HTTP Referrer restriction (Domain Whitelisting) to `*.github.io`. Keys never committed to repository.
- **NFR09: Security — Database** — Supabase Row Level Security (RLS) enabled on all tables. `INSERT`-only policy for public lead capture. `SELECT` restricted to authenticated admin users. `SERVICE_ROLE_KEY` never included in frontend code.
- **NFR10: Security — Data Privacy** — GDPR/LPPD compliant. Explicit opt-in consent checkboxes for email communications. Data isolation between PDF lead flow and scheduling flow.
- **NFR11: Deployment** — Static Site Generation (SSG/Prerendering) via Angular build. GitHub Actions CI/CD pipeline deploying to GitHub Pages (`gh-pages` branch). `404.html` configured for SPA deep-link routing.
- **NFR12: API Caching** — Client-side caching for currency exchange data (minimum 1-hour TTL) to reduce API costs and improve performance.
- **NFR13: Offline Resilience** — When third-party APIs (exchange rates, market data) fail, display last cached data with a visible "Offline Data" warning indicator.
- **NFR14: Storybook Documentation** — Every visual component must have Storybook stories covering: default state, mobile viewport, interactive states (hover, focus, error, success), and accessibility checks.

---

## 3. User Interface Design Goals

### 3.1 Overall UX Vision

Financial Tracker delivers a **"Narrative Scroll"** experience — a psychologically-crafted journey that guides users from curiosity (market data and the "shock" of devaluation) through logic (calculators and simulators) to action (lead capture and consultation booking). The interface must feel like a **premium fintech institution**, not a casual app. Every visual decision follows the **80/15/5 color rule** to balance trust, growth, and conversion signals.

The approved visual direction is the **"Clear" aesthetic** (see `Header&HeroClearOutput.png`): luminous backgrounds that reduce financial anxiety, paired with Deep Blue authority and Emerald Green prosperity signals.

### 3.2 Key Interaction Paradigms

- **Signal-Driven Reactivity:** All sliders, currency changes, and language toggles update the entire UI instantly via Angular Signals without page reloads.
- **Scroll-Based Storytelling:** Users discover financial insights progressively as they scroll, reducing cognitive overload compared to a dense dashboard.
- **Micro-Interactions:** 400ms CSS transitions on currency changes, smooth number count animations, hover elevation effects on CTA buttons, and pulse animations on the Wealth Gap chart area.
- **Skeleton Loading:** All data-fetching widgets display pulse-animated skeleton placeholders that mirror the final shape of the content to avoid layout shift (CLS).
- **Two-Step Conversion Flows:** Both lead capture (F04) and booking (F05) use a clean card-based form, not invasive modals, with immediate success feedback.

### 3.3 Core Screens and Views

1. **Landing Page (Home)** — Hero Section → Cost of Waiting → Financial Freedom Countdown → Currency Comparison → Market Status (Fear & Greed) → Compound Interest Calculator → Retirement Simulator → CDP vs. Market Comparator → Lead Magnet Banner → Wishlist Board → Footer
2. **Booking Screen** — Lead qualification form (Name/LastName/Email) → Calendar widget integration (Calendly/Google Calendar) → Success confirmation
3. **PDF Success Screen** — Download confirmation → Email guidance (check spam) → Back to tools

### 3.4 Accessibility: WCAG AA

- Semantic HTML5 tags (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`)
- Keyboard navigation for all interactive elements (Tab/Enter/Escape)
- Visible focus indicators on all focusable elements
- `aria-label` for icon-only buttons and interactive elements
- Color contrast ratios meeting AA minimums
- Touch targets ≥ 44px for mobile sliders and buttons

### 3.5 Branding & Design System

**Official Name:** Financial Tracker (no deviations)

**The 80/15/5 Color Rule:**

| Layer                  | Usage                              | Colors                                                             |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| **80% Base (Trust)**   | Backgrounds, headers, structure    | Deep Blue `#1A3C6E`, Cool Gray `#ECEFF1`                           |
| **15% Action (Guide)** | Body text, icons, interactive UI   | Charcoal `#37474F`, Teal Bright `#009688`                          |
| **5% Conversion (CTA)**| Primary CTAs, success feedback     | **Emerald Green `#00C853`** (all conversion actions)               |
| Alerts (Minimal)       | Warnings, risks, inflation alerts  | Golden Amber `#FFC107`, Warm Orange `#F57C00`, Soft Red `#D32F2F`  |

**Typography:** Inter (Sans-serif) — Bold (700) for headings & brand, Medium (500) for labels & navigation, Regular (400) for body text.

**Iconography:** Outline/linear style in Teal Bright (`#009688`). SVG inline for scalability. Hover transitions from Teal to Emerald Green.

**Design Tokens (Tailwind v4):**

```css
@theme {
  --color-deep-blue: #1A3C6E;
  --color-emerald-green: #00C853;
  --color-golden-amber: #FFC107;
  --color-teal-bright: #009688;
  --color-warm-orange: #F57C00;
  --color-soft-red: #D32F2F;
  --color-cloud-gray: #ECEFF1;
  --color-charcoal: #37474F;
  --font-inter: "Inter", sans-serif;
  --radius-card: 1.5rem;
  --shadow-premium: 0 10px 30px -10px rgba(26, 60, 110, 0.2);
}
```

### 3.6 Target Device and Platforms: Web Responsive

- **Mobile (< 768px):** Single-column vertical layout. Input controls above charts. Sticky bottom CTA. PrimeNG components configured for touch-optimized mobile rendering.
- **Tablet (768px – 1024px):** Two-column adaptive layout.
- **Desktop (≥ 1024px):** Split-view layouts. Controls on the left, high-fidelity charts on the right. Full PrimeNG data tables and interactive components.

---

## 4. Technical Assumptions

### 4.1 Repository Structure: Monorepo

Single Angular project repository hosted on GitHub. All frontend code, design tokens, i18n assets, tests, and Storybook stories in one repository.

### 4.2 Service Architecture

**Frontend-First Static Application** with Backend-as-a-Service:

- **Frontend:** Angular 21+ (Zoneless, Signal-based reactivity). Standalone Components exclusively — no NgModules.
- **UI Components:** PrimeNG for complex UI components (data tables, forms, menus, dialogs, calendars) styled via Tailwind CSS v4 integration using `tailwindcss-primeui` for theme customization and dark/light mode compatibility.
- **Data Visualization:** Chart.js for dynamic financial charts (Wealth Gap, projections, Fear & Greed gauge), integrated via `ng2-charts` Angular wrapper.
- **Styling Engine:** Tailwind CSS v4 with CSS variable design tokens. Tailwind serves as the master styling layer, personalizing PrimeNG component appearance and Chart.js container layouts.
- **State Management:** Angular Signals (`signal()`, `computed()`, `effect()`) for all reactive state. No RxJS for local component state — reserved for async HTTP flows only.
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions) for lead persistence, email automation, and booking management.
- **Currency API:** ExchangeRate-API (Domain-restricted, free tier: 1,500 req/month).
- **PDF Generation:** Client-side via `jspdf` + `jspdf-autotable`.
- **Email Service:** Resend or SendGrid (via Supabase Edge Functions) for PDF delivery and booking confirmations.
- **Hosting:** GitHub Pages (static SSG).
- **CI/CD:** GitHub Actions pipeline (build → test → deploy to `gh-pages`).

### 4.3 Testing Requirements

- **Unit Testing:** `@testing-library/angular` with TDD (Red-Green-Refactor) — mandatory for all features.
- **Code Coverage:** Minimum 80% global. 100% for financial math engine.
- **Component Documentation:** Storybook for isolated component development, visual regression testing, and responsive viewport validation.
- **E2E Testing:** Playwright for critical user journeys (lead capture → PDF download, booking flow).
- **PO Validation:** Every User Story must pass the `PO_Checklist.md` before being marked as Done.

### 4.4 Additional Technical Assumptions

- All internal math computed in USD; converted to local currency for display only.
- Angular `@angular/localize` for i18n with `CurrencyPipe` adapting to detected locale.
- **Persistence Strategy (Repository Pattern):** All data persistence is abstracted via interfaces (`ILeadRepository`, `IInteractionRepository`) that decouple feature logic from storage technology. Phase 1 uses local browser storage (LocalStorage or IndexedDB — _to be determined during Architecture phase via pattern/use-case discovery_) + JSON files for read-only mock data. Phase 2 switches to Supabase via a simple Dependency Injection provider swap in `app.config.ts`. No feature code modification is needed when switching storage backends.
- **LocalStorage vs. IndexedDB Decision:** Deferred to the Architecture phase. The Architect must evaluate the trade-offs (data size limits, query capabilities, structured data needs, async vs sync API) for each repository's use cases (leads, interactions, user preferences) and recommend the appropriate technology per repository — potentially a hybrid approach where simpler key-value data uses LocalStorage and structured/larger datasets use IndexedDB.
- PrimeNG theme customization via `tailwindcss-primeui` preset to ensure all PrimeNG components inherit the Financial Tracker design tokens (Deep Blue, Emerald Green, etc.).
- Chart.js instances updated via Signal `effect()` with `update('quiet')` mode for 60FPS slider reactivity.
- `jspdf` and `html2canvas` lazy-loaded via Angular `@defer` blocks to avoid impacting initial bundle size.
- API keys injected into `environment.prod.ts` at build-time via GitHub Actions secrets — never in source control.

---

## 5. Epic List

### Epic 1: Core Foundations & Technical Scaffold
Establish the Angular 21 environment, Tailwind v4 design system with PrimeNG integration, Storybook configuration, and the foundational "Wealth Gap" mathematical engine following strict TDD.

### Epic 2: Lead Capture, PDF Generation & Email Delivery
Implement the complete lead capture funnel: form validation, local persistence, client-side PDF report generation, and automated email delivery of the Investor Terms PDF — the core revenue-generating flow.

### Epic 3: Financial Simulators & Interactive Tools
Build the Compound Interest Calculator, Retirement Simulator, and CDP vs. Market Comparator with real-time Signal-driven reactivity and Chart.js visualizations.

### Epic 4: Market Intelligence & Awareness Widgets
Implement the Hero section, Cost of Waiting Banner, Financial Freedom Countdown, Currency Comparison, and Fear & Greed Index — the "hook" layer that generates urgency and need.

### Epic 5: Consultation Booking & Scheduling
Build the floating CTA, booking screen with lead qualification form, external calendar integration (Calendly/Google Calendar), and booking confirmation/reminder email automation.

### Epic 6: Engagement, Retention & Final Polish
Implement the Wishlist Board, Inflation Dashboard severity alerts, i18n polish, Storybook audit, accessibility compliance, and performance optimization.

---

## 6. Epic Details

### Epic 1: Core Foundations & Technical Scaffold

**Goal:** Deliver a fully configured development environment with Angular 21+, Tailwind v4 design tokens, PrimeNG component library integration, Storybook setup, TDD infrastructure, and the mathematical core of the Wealth Gap engine — the backbone upon which all features are built.

#### Story 1.1: Project Initialization & Architecture Scaffold

As a **developer**,
I want to set up an Angular 21 project with the Core/Shared/Features/Infrastructure directory structure, Tailwind v4, and PrimeNG,
so that all team members have a consistent, standards-compliant starting point.

**Acceptance Criteria:**
1. Angular 21+ project initialized with `pnpm` as package manager.
2. Directory structure follows `Core/Shared/Features/Infrastructure` pattern as defined in AGENTS.md.
3. No `.component` suffix in any component filename or class name.
4. Tailwind CSS v4 installed and configured with `@theme` design tokens matching the 80/15/5 color system.
5. PrimeNG installed with `tailwindcss-primeui` integration for theme customization.
6. Chart.js and `ng2-charts` installed and configured.
7. `tsconfig.json` aliases configured (`@shared/*`, `@core/*`, `@features/*`, `@env/*`).
8. GitHub Actions CI workflow created (build + test).
9. Initial `404.html` created for SPA routing on GitHub Pages.

#### Story 1.2: Global Design System (Tokens, Variables & PrimeNG Theme)

As a **UX expert**,
I want to define the core CSS variables, PrimeNG theme customization, and typography system,
so that every component renders with the Financial Tracker brand identity from day one.

**Acceptance Criteria:**
1. All design tokens defined in `src/styles.css` within `@theme` block: Deep Blue (`#1A3C6E`), Emerald Green (`#00C853`), Teal Bright (`#009688`), Charcoal (`#37474F`), Cool Gray (`#ECEFF1`), Golden Amber (`#FFC107`), Warm Orange (`#F57C00`), Soft Red (`#D32F2F`).
2. Inter font loaded from Google Fonts and configured as `--font-inter`.
3. PrimeNG theme customized via `tailwindcss-primeui` to use Financial Tracker tokens (Deep Blue for primary, Emerald Green for success/CTA, Soft Red for danger).
4. Base layer styles applied to `body`, headings, and form elements.
5. Utility component classes created: `.btn-primary` (Emerald Green), `.btn-secondary` (Deep Blue), `.card-fintech`.
6. Storybook story created for the design system showcase (color palette, typography, button variants).

#### Story 1.3: Storybook Setup & Component Documentation Infrastructure

As a **developer**,
I want Storybook configured for Angular 21 standalone components,
so that I can develop, test, and document components in isolation.

**Acceptance Criteria:**
1. Storybook installed and configured for Angular 21 standalone components.
2. `.storybook/` folder created at project root with proper Angular configuration.
3. PrimeNG and Tailwind CSS properly loaded in Storybook preview.
4. At least one example story created demonstrating a shared component.
5. Mobile and desktop viewport presets configured.

#### Story 1.4: The Wealth Gap Engine (TDD Flow)

As an **investor**,
I want an accurate calculation of my capital's future value adjusted for inflation,
so that I can understand the true cost of doing nothing with my savings.

**Acceptance Criteria:**
1. **TDD:** Unit tests written FIRST for `calculateWealthGap()` in `shared/utils/finance-math.ts`.
2. Tests run and FAIL before implementation.
3. Pure function implemented with inputs: Initial Capital, Monthly Contribution, Annual Return %, Annual Inflation %, Time Horizon (years).
4. Output: Array of yearly `ProjectionEntry` objects with `year`, `nominalBalance`, `realValue`, and `gap` properties.
5. **Coverage:** 100% for this utility.
6. No Angular dependencies — pure TypeScript functions only.

#### Story 1.5: Repository Pattern & Local Persistence

As a **developer**,
I want an abstracted persistence layer using the Repository Pattern,
so that I can switch from LocalStorage to Supabase without modifying any feature code.

**Acceptance Criteria:**
1. `ILeadRepository` interface defined in `core/interfaces/` with `saveLead()` and `getLeads()` methods.
2. `Lead` interface defined in `shared/types/` with fields: `id`, `firstName`, `lastName`, `email`, `createdAt`, `source`.
3. `LocalStorageLeadRepository` implemented in `infrastructure/` fulfilling the interface.
4. Provider registration configured in `app.config.ts` for easy DI swap.
5. **TDD:** Tests for save and retrieve operations pass.

---

### Epic 2: Lead Capture, PDF Generation & Email Delivery

**Goal:** Deliver the complete lead capture funnel — the primary revenue-generating flow. Users provide their information, receive a personalized PDF investment report, and their data is stored for follow-up. This epic is the highest business-value delivery.

#### Story 2.1: Lead Capture Form Component

As a **stakeholder**,
I want to capture the user's First Name, Last Name, and Email through a professional form,
so that I can build a qualified lead database.

**Acceptance Criteria:**
1. **TDD:** Tests for form validation (required fields, email format) written and failing FIRST.
2. Reactive form with PrimeNG `InputText` and `Button` components styled via Tailwind.
3. Real-time validation: invalid email shows Soft Red (`#D32F2F`) border; valid state shows Teal Bright (`#009688`).
4. Privacy consent checkbox with link to Privacy Policy (GDPR compliant).
5. Submit button in Emerald Green (`#00C853`) with loading spinner state.
6. Data saved to `ILeadRepository` upon submission.
7. Storybook stories for: default, validation errors, loading, and success states.

#### Story 2.2: PDF Report Generation

As a **user**,
I want to download a professional personalized PDF summary of my financial projection,
so that I have a tangible takeaway that reinforces the value of investing.

**Acceptance Criteria:**
1. **TDD:** Unit tests for PDF generation logic (mocking Blob/jsPDF).
2. PDF includes: branded header (Deep Blue), personalized greeting (user name), date, executive summary of Wealth Gap, projection data table, and Financial Tracker branding.
3. `jspdf` + `jspdf-autotable` loaded via `@defer` block (lazy loading).
4. PDF auto-downloaded upon generation completion.
5. **Coverage:** ≥ 80% for PDF service.

#### Story 2.3: PDF Email Delivery

As a **user**,
I want to receive the PDF report in my email,
so that I can access it later and share it with my family.

**Acceptance Criteria:**
1. Upon lead form submission, an automated email is triggered via Supabase Edge Function (Resend/SendGrid).
2. Email includes: personalized greeting, PDF attachment or download link, and Financial Tracker branding.
3. Success screen displays email delivery confirmation with spam-folder guidance.
4. Error handling: if email fails, PDF is still downloaded client-side with a warning message.

#### Story 2.4: Lead Form Success Screen

As a **user**,
I want clear confirmation that my PDF has been sent and downloaded,
so that I feel confident the process worked.

**Acceptance Criteria:**
1. Success screen shows animated Emerald Green checkmark.
2. Message: "PDF sent! Check your inbox (and spam folder)."
3. Submit button transitions to disabled Charcoal state with check icon to prevent duplicate submissions.
4. Smooth CSS transition from form to success state.

---

### Epic 3: Financial Simulators & Interactive Tools

**Goal:** Build the interactive financial tools that provide the "logical evidence" layer of the conversion funnel — turning curiosity into conviction through personalized calculations and comparisons.

#### Story 3.1: Compound Interest Calculator (Wealth Gap Chart)

As a **user**,
I want to interact with sliders to visualize my investment growth vs. inflation erosion,
so that I understand the real cost of not investing.

**Acceptance Criteria:**
1. **TDD:** Unit tests for Signal-based reactivity and chart data binding.
2. PrimeNG `Slider` components for: Initial Capital, Monthly Contribution, Expected Return %, Inflation %, Time Horizon.
3. Chart.js (via `ng2-charts`) dual-line area chart: Emerald Green (Nominal) vs. Soft Red shaded area (Real Value / Wealth Gap).
4. Chart updates in real-time as sliders move (60FPS via Signal `effect()` with `update('quiet')`).
5. Total Wealth Erosion displayed prominently in Deep Blue badge.
6. Storybook stories for mobile and desktop viewports.

#### Story 3.2: Retirement Simulator (Nest Egg)

As a **user**,
I want to simulate my retirement savings trajectory adjusted for inflation,
so that I know if I'm on track for financial independence.

**Acceptance Criteria:**
1. **TDD:** Tests for retirement projection logic.
2. Inputs: Current Age, Target Retirement Age, Current Savings, Monthly Contribution, Expected Return %, Inflation %.
3. Output: Chart showing projected nest egg over time with inflation-adjusted purchasing power.
4. "Financial Freedom Date" prominently displayed — the year when savings sustain lifestyle.
5. PrimeNG `InputNumber` for precise values, `Slider` for quick exploration.
6. Storybook stories with mobile viewport.

#### Story 3.3: CDP vs. Market Comparator

As a **user**,
I want to compare what my money earns in a local bank CDP vs. the S&P 500,
so that I can see the opportunity cost of keeping money in traditional savings.

**Acceptance Criteria:**
1. **TDD:** Tests for comparison calculation logic.
2. PrimeNG `DataTable` showing side-by-side comparison: Local CDP Rate vs. S&P 500 Historical Average.
3. Net difference highlighted in Emerald Green (gain) or Soft Red (loss).
4. Currency-aware: adjusts rates based on selected local currency.
5. Storybook story for responsive layout.

---

### Epic 4: Market Intelligence & Awareness Widgets

**Goal:** Implement the "hook" layer — the emotionally compelling widgets that generate urgency and need, driving users toward the calculators and ultimately the conversion flow.

#### Story 4.1: Hero Section & Navbar

As a **visitor**,
I want to immediately understand what Financial Tracker offers and feel compelled to explore,
so that I don't bounce from the landing page.

**Acceptance Criteria:**
1. Navbar: "Financial Tracker" logo (Inter Bold, Deep Blue + Emerald Green), PrimeNG `Menubar` for navigation, i18n toggle, currency selector, "Schedule a Call" button (Deep Blue).
2. Hero Section: H1 in Deep Blue with "Libertad Financiera" highlighted in Emerald Green. Subtext in Charcoal. Primary CTA button "Comenzar mi Diagnóstico Gratis" in Emerald Green.
3. Hero image: growth/prosperity visual (plant growing from coins or similar).
4. Layout matches approved `Header&HeroClearOutput.png` design.
5. Mobile-responsive: single-column stack on mobile, split view on desktop.
6. Storybook stories for mobile and desktop.

#### Story 4.2: Cost of Waiting Banner & Financial Freedom Countdown

As a **user**,
I want to see how much I lose financially by waiting to invest,
so that I feel motivated to take action now.

**Acceptance Criteria:**
1. Cost of Waiting: Interactive banner showing projected loss (Soft Red) vs. projected gain (Emerald Green) over time.
2. Financial Freedom Countdown: Dynamic widget showing years/months of "financial life" remaining based on user's quick inputs (monthly savings, monthly expenses).
3. Both widgets update via Angular Signals when user adjusts any input.
4. Storybook stories.

#### Story 4.3: Currency Comparison & Market Status Widgets

As a **user**,
I want to see how my local currency is performing against the USD and understand market sentiment,
so that I have context for making investment decisions.

**Acceptance Criteria:**
1. Currency Comparison: Chart.js line chart showing local currency devaluation trend vs. USD. Data sourced from ExchangeRate-API with 1-hour client-side cache.
2. Fear & Greed Index: PrimeNG `Knob` or custom semicircular gauge with color states (Soft Red → Golden Amber → Emerald Green).
3. Market data cards (S&P 500, Bitcoin) using PrimeNG `Card` components with trend arrows.
4. Offline fallback: display cached data with "Offline Data" warning badge.
5. Storybook stories for all states.

---

### Epic 5: Consultation Booking & Scheduling

**Goal:** Enable the final conversion step — transitioning a convinced user into a scheduled consultation with a financial advisor, with full email automation for confirmations and reminders.

#### Story 5.1: Floating CTA Button

As a **user**,
I want a persistent, accessible button to schedule a consultation,
so that I can take action at any point during my exploration.

**Acceptance Criteria:**
1. Floating "pill" button (Emerald Green `#00C853`, 30px border-radius) fixed at bottom-right.
2. Calendar/phone icon in white.
3. Drop shadow for elevation effect.
4. Click navigates to Booking screen.
5. Accessible: `aria-label="Schedule a consultation"`.
6. Storybook story.

#### Story 5.2: Booking Screen & Calendar Integration

As a **user**,
I want to provide my information and select a consultation time,
so that I can speak with a professional financial advisor.

**Acceptance Criteria:**
1. Step 1: Lead qualification form (First Name, Last Name, Email) using PrimeNG form components.
2. Step 2: After form validation, display embedded Calendly/Google Calendar widget for time selection.
3. Lead data saved to persistence layer with `source: 'booking'`.
4. Confirmation email triggered upon successful booking via Supabase Edge Function.
5. Success screen with booking details (date, time, meeting link instructions).

#### Story 5.3: Booking Email Automation

As a **stakeholder**,
I want automated emails sent upon booking and before the consultation,
so that both the user and advisor are prepared.

**Acceptance Criteria:**
1. Confirmation email sent to user upon booking (includes date, time, preparation tips).
2. Notification email sent to financial advisor with lead details.
3. Reminder email sent to user 24 hours before consultation.
4. Error handling: log failures for manual follow-up.

---

### Epic 6: Engagement, Retention & Final Polish

**Goal:** Complete the product with community engagement features, i18n polish, comprehensive Storybook documentation, accessibility audit, and performance optimization to ensure a premium, production-ready experience.

#### Story 6.1: Wishlist Board

As a **user**,
I want to vote on potential future features,
so that I feel invested in the product's evolution and stay engaged.

**Acceptance Criteria:**
1. PrimeNG `DataView` or custom card grid showing feature ideas.
2. Upvote mechanism with local persistence.
3. Sorted by vote count (descending).
4. Storybook story.

#### Story 6.2: i18n Polish & Bilingual Content

As a **global user**,
I want all interface text, tooltips, and email templates available in both English and Spanish,
so that I can use the product in my preferred language.

**Acceptance Criteria:**
1. All UI strings externalized to i18n JSON files (`en.json`, `es.json`).
2. `CurrencyPipe` and `DatePipe` adapt to selected locale.
3. Spanish text overflow handled gracefully (20-25% longer than English).
4. Language preference persisted in localStorage.

#### Story 6.3: Accessibility Audit & Storybook Compliance

As a **product owner**,
I want all components to pass WCAG AA checks and be documented in Storybook,
so that the product is inclusive and maintainable.

**Acceptance Criteria:**
1. All components have Storybook stories covering mobile/desktop viewports.
2. AXE accessibility checks pass for all stories.
3. Keyboard navigation tested for all interactive flows.
4. Color contrast verified for all text/background combinations.
5. Overall code coverage ≥ 80%.

#### Story 6.4: Performance Optimization & Production Build

As a **developer**,
I want the production build optimized for GitHub Pages deployment,
so that the site loads fast and ranks well in search engines.

**Acceptance Criteria:**
1. SSG prerendering configured for all routes.
2. `jspdf` and heavy libraries loaded via `@defer` blocks.
3. LCP < 2.5 seconds verified.
4. SEO metadata service implemented with dynamic titles and descriptions.
5. GitHub Actions pipeline verified: build → test → deploy to `gh-pages`.

#### Story 6.5: Interaction Analytics & Engagement Tracking _(Lowest Priority)_

As a **product owner**,
I want to capture and store user interaction metrics (time spent on calculators, slider usage, session patterns),
so that I can measure KPIs like Wealth Gap Engagement and provide advisors with lead quality context.

**Acceptance Criteria:**
1. **TDD:** Tests for analytics capture, debounce buffer, and repository persistence.
2. `IInteractionRepository` interface defined in `core/interfaces/` with `logInteraction()` and `getSessionMetrics()` methods.
3. `InteractionEvent` type defined in `shared/types/`: `session_id`, `widget_id`, `interaction_type`, `value`, `duration_ms`, `timestamp`.
4. Local implementation (`LocalInteractionRepository`) in `infrastructure/` using the storage technology chosen during Architecture phase (LocalStorage or IndexedDB).
5. Debounce analytics buffer: events buffered in memory, flushed on 5s idle, section change, CTA click, or `visibilitychange` event.
6. When a user converts to Lead (FR04/FR05), accumulated session engagement stats are attached to the lead record via an `engagement_stats` field.
7. **Phase 2 (Future):** `SupabaseInteractionRepository` with `interaction_logs` table (`session_id`, `widget_id`, `interaction_type`, `value`, `duration_ms`, `timestamp`).
8. **Coverage:** ≥ 80% for analytics service and repository.

---

## 7. Risks and Mitigations

| Risk                                   | Probability | Impact | Mitigation                                                                                     |
| -------------------------------------- | ----------- | ------ | ---------------------------------------------------------------------------------------------- |
| **Static hosting limitations**         | Medium      | High   | SSG prerendering; `404.html` for SPA routing; no SSR dependency.                               |
| **API key exposure in static bundle**  | High        | Medium | Domain whitelisting on API providers; build-time injection via GitHub Secrets; minification.    |
| **Third-party API downtime**           | Medium      | Medium | Client-side caching (1hr); "Offline Data" fallback with last-known values.                     |
| **PrimeNG + Tailwind conflict**        | Low         | Medium | Use `tailwindcss-primeui` preset for controlled integration; override only via design tokens.   |
| **MVP scope creep**                    | Medium      | High   | Strict epic sequencing; PO checklist validation per story; no crypto/stock features until post-MVP. |
| **Email deliverability (spam)**        | Medium      | High   | Use verified sender domain (Resend/SendGrid); SPF/DKIM configuration; spam-folder guidance in UI. |
| **LATAM currency API coverage**        | Low         | Medium | ExchangeRate-API supports major LATAM currencies; fallback to manual input if unavailable.      |

---

## 8. Success Metrics (KPIs)

| KPI                                    | Target                    | Measurement                                               |
| -------------------------------------- | ------------------------- | ---------------------------------------------------------- |
| **PDF Download Conversion Rate**       | ≥ 15%                     | Users who download PDF / Total unique visitors             |
| **Booking Conversion Rate**            | ≥ 5%                      | Users who schedule consultation / Total unique visitors    |
| **Wealth Gap Engagement**              | > 45 seconds average      | FR19: Interaction logs via `IInteractionRepository`. Average `duration_ms` for `widget_id='compound_calc'` across all sessions. |
| **Email Delivery Rate**                | ≥ 95%                     | Successfully delivered / Total emails sent                 |
| **Performance (LCP)**                  | < 2.5 seconds             | Lighthouse audit                                           |
| **Code Coverage**                      | ≥ 80%                     | Angular CLI `ng test --code-coverage`                      |
| **Accessibility Score**                | 100% AXE checks pass      | AXE browser extension + Storybook a11y addon              |

---

## 9. Next Steps

### 9.1 UX Expert Prompt

> As Sally (UX Expert), review this PRD and create the detailed Frontend Specification for Financial Tracker. Focus on: PrimeNG component selection for each feature, responsive breakpoint behaviors, micro-interaction specifications, and Storybook story requirements. Use the approved `Header&HeroClearOutput.png` as the visual baseline.

### 9.2 Architect Prompt

> As Winston (Architect), review this PRD and create the Architecture Document for Financial Tracker. Define: the Core/Shared/Features/Infrastructure directory structure with file-level detail, PrimeNG + Tailwind v4 + Chart.js integration strategy, Angular Signal state architecture, Repository Pattern implementation with DI swap mechanism, Supabase schema design (leads, appointments), GitHub Actions pipeline configuration, and Storybook integration. Ensure all technical decisions align with the AGENTS.md coding standards.
