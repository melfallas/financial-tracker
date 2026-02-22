# 📋 Project Backlog: Financial Tracker

> **Version:** 2.0.0 · **Last Updated:** 2026-02-22
> **Source:** PRD v2.0.0 · Architecture v2.0.0

---

## 🚀 Epic 1: Core Foundations & Technical Scaffold

**Goal:** Establish the Angular 21 environment, Tailwind v4 design system with PrimeNG integration (`tailwindcss-primeui`), Storybook configuration, Chart.js + ng2-charts setup, and the foundational "Wealth Gap" mathematical engine following strict TDD.

### User Stories:

1. **US1.1: Project Initialization (Architectural Scaffold)**
   - **As a developer,** I want to set up an Angular 21 project with Tailwind v4, PrimeNG, Chart.js, and the Core/Shared/Features/Infrastructure directory structure.
   - **Acceptance Criteria:**
     - Angular 21+ initialized with `pnpm`.
     - Tailwind CSS v4 configured with `@theme` design tokens (80/15/5 system, Deep Blue `#1A3C6E`).
     - PrimeNG installed with `tailwindcss-primeui` theme integration.
     - Chart.js and `ng2-charts` installed and configured.
     - Storybook installed and configured for Angular standalone components.
     - Core/Shared/Features/Infrastructure directory structure created.
     - No `.component` suffix in filenames or class names.
     - `tsconfig.json` aliases configured (`@shared/*`, `@core/*`, `@features/*`, `@env/*`).
     - GitHub Actions CI workflow created (build + test).
     - `404.html` created for SPA routing on GitHub Pages.
   - **Implementation Rule:** Follow AGENTS.md coding standards strictly.

2. **US1.2: Global Design System (Tokens, Variables & PrimeNG Theme)**
   - **As a UX expert,** I want to define the core CSS variables, PrimeNG theme customization, and typography system.
   - **Acceptance Criteria:**
     - All design tokens defined in `src/styles.css` `@theme` block.
     - PrimeNG themed via `tailwindcss-primeui` (Deep Blue=primary, Emerald Green=success/CTA, Soft Red=danger).
     - Inter font loaded and configured globally.
     - Base layer styles for body, headings, and form elements.
     - Utility classes: `.btn-primary` (Emerald Green), `.btn-secondary` (Deep Blue), `.card-fintech`.
     - Storybook story for design system showcase (colors, typography, buttons).
   - **TDD:** Test that design tokens render correctly.

3. **US1.3: Storybook Setup & Component Documentation**
   - **As a developer,** I want Storybook configured for Angular 21 standalone components with PrimeNG and Tailwind.
   - **Acceptance Criteria:**
     - `.storybook/` folder configured at project root.
     - PrimeNG and Tailwind CSS properly loaded in Storybook preview.
     - Mobile and desktop viewport presets configured.
     - At least one example story demonstrating a shared component.

4. **US1.4: The Wealth Gap Engine (TDD Flow)**
   - **As an investor,** I want an accurate calculation of my capital's future value adjusted for inflation.
   - **Acceptance Criteria:**
     - **TDD:** Unit tests written FIRST for `calculateWealthGap()` in `shared/utils/finance-math.ts`.
     - Pure function: inputs (Initial Capital, Monthly Contribution, Return %, Inflation %, Years).
     - Output: Array of `ProjectionEntry` objects with `year`, `nominalBalance`, `realValue`, `gap`.
     - **Coverage:** 100% for this utility.
     - No Angular dependencies — pure TypeScript.

5. **US1.5: Repository Pattern & Local Persistence**
   - **As a developer,** I want an abstracted persistence layer using the Repository Pattern.
   - **Acceptance Criteria:**
     - `ILeadRepository` interface in `core/interfaces/` with `saveLead()` and `getLeads()`.
     - `Lead` interface in `shared/types/` with `id`, `firstName`, `lastName`, `email`, `createdAt`, `source`, `engagement_stats`.
     - `LocalLeadRepository` in `infrastructure/` using the storage technology determined during Architecture phase (LocalStorage or IndexedDB — see Architecture §7.2).
     - DI provider configured in `app.config.ts` for easy Supabase swap.
     - **TDD:** Tests for save and retrieve operations.

---

## 📈 Epic 2: Lead Capture, PDF Generation & Email Delivery

**Goal:** Deliver the complete lead capture funnel — form validation, local persistence, client-side PDF report generation, and automated email delivery. **This is the highest business-value delivery.**

### User Stories:

1. **US2.1: Lead Capture Form Component**
   - **As a stakeholder,** I want to capture First Name, Last Name, and Email through a professional form.
   - **Acceptance Criteria:**
     - **TDD:** Tests for form validation (required fields, email format) written first.
     - PrimeNG `InputText` and `Button` components styled via Tailwind.
     - Real-time validation: Soft Red (`#D32F2F`) for errors, Teal Bright (`#009688`) for valid state.
     - Privacy consent checkbox (GDPR).
     - Submit button in Emerald Green (`#00C853`) with loading spinner.
     - Storybook stories (default, validation errors, loading, success).

2. **US2.2: PDF Report Generation**
   - **As a user,** I want to download a personalized PDF summary of my financial projection.
   - **Acceptance Criteria:**
     - **TDD:** Unit tests for PDF generation logic.
     - `jspdf` + `jspdf-autotable` loaded via `@defer` block.
     - PDF: branded header (Deep Blue `#1A3C6E`), user name, date, Wealth Gap summary, data table.
     - Auto-downloaded upon generation.
     - **Coverage:** ≥ 80%.

3. **US2.3: PDF Email Delivery**
   - **As a user,** I want to receive the PDF in my email.
   - **Acceptance Criteria:**
     - Automated email via Supabase Edge Function (Resend/SendGrid).
     - Personalized greeting, PDF attachment/link, Financial Tracker branding.
     - Success screen with spam-folder guidance.
     - Fallback: client-side download if email fails.

4. **US2.4: Lead Form Success Screen**
   - **As a user,** I want clear confirmation that my PDF has been sent.
   - **Acceptance Criteria:**
     - Animated Emerald Green checkmark.
     - "PDF sent! Check your inbox (and spam folder)."
     - Button transitions to disabled Charcoal state.

---

## 🧮 Epic 3: Financial Simulators & Interactive Tools

**Goal:** Build the interactive financial tools that provide the "logical evidence" layer of the conversion funnel.

### User Stories:

1. **US3.1: Compound Interest Calculator (Wealth Gap Chart)**
   - **As a user,** I want to interact with sliders to visualize investment growth vs. inflation erosion.
   - **Acceptance Criteria:**
     - **TDD:** Tests for Signal-based reactivity and chart data binding.
     - PrimeNG `Slider` + Chart.js (`ng2-charts`) dual-line area chart.
     - Emerald Green (Nominal) vs. Soft Red shaded area (Wealth Gap).
     - Real-time updates at 60FPS via Signal `effect()`.
     - Storybook stories (mobile + desktop).

2. **US3.2: Retirement Simulator (Nest Egg)** ⭐ _High Priority_
   - **As a user,** I want to simulate my retirement savings adjusted for inflation.
   - **Acceptance Criteria:**
     - **TDD:** Tests for retirement projection logic.
     - Inputs: Current Age, Retirement Age, Current Savings, Monthly Contribution, Return %, Inflation %.
     - Chart: projected nest egg with inflation-adjusted purchasing power.
     - "Financial Freedom Date" prominently displayed.
     - PrimeNG `InputNumber` + `Slider`.
     - Storybook stories (mobile viewport).

3. **US3.3: CDP vs. Market Comparator**
   - **As a user,** I want to compare local bank CDP returns vs. S&P 500.
   - **Acceptance Criteria:**
     - **TDD:** Tests for comparison logic.
     - PrimeNG `DataTable` side-by-side comparison.
     - Net difference in Emerald Green (gain) or Soft Red (loss).
     - Currency-aware rates.
     - Storybook story.

---

## 🌐 Epic 4: Market Intelligence & Awareness Widgets

**Goal:** Implement the "hook" layer — emotionally compelling widgets that generate urgency and need.

### User Stories:

1. **US4.1: Hero Section & Navbar**
   - **As a visitor,** I want to immediately understand what Financial Tracker offers.
   - **Acceptance Criteria:**
     - PrimeNG `Menubar` for navigation. "Financial Tracker" logo (Deep Blue + Emerald Green).
     - Hero: H1 Deep Blue, "Libertad Financiera" in Emerald Green. CTA in Emerald Green.
     - Matches `Header&HeroClearOutput.png` design.
     - Mobile-responsive.
     - Storybook stories.

2. **US4.2: Cost of Waiting Banner & Financial Freedom Countdown**
   - **As a user,** I want to see how much I lose by waiting to invest.
   - **Acceptance Criteria:**
     - Cost of Waiting: Soft Red (loss) vs. Emerald Green (gain) projection.
     - Countdown: years/months of "financial life" remaining.
     - Both update via Angular Signals.
     - Storybook stories.

3. **US4.3: Currency Comparison & Market Status Widgets**
   - **As a user,** I want to see local currency performance and market sentiment.
   - **Acceptance Criteria:**
     - Chart.js line chart: local currency vs. USD (ExchangeRate-API, 1hr cache).
     - Fear & Greed Index: PrimeNG `Knob` or gauge (Soft Red → Amber → Emerald Green).
     - Market data cards (PrimeNG `Card`): S&P 500, Bitcoin with trend arrows.
     - Offline fallback with "Offline Data" warning.
     - Storybook stories.

---

## 📅 Epic 5: Consultation Booking & Scheduling

**Goal:** Enable the final conversion step — scheduling a consultation with a financial advisor, with full email automation. ⭐ _Critical for lead conversion._

### User Stories:

1. **US5.1: Floating CTA Button**
   - **As a user,** I want a persistent button to schedule a consultation.
   - **Acceptance Criteria:**
     - Emerald Green pill button, fixed bottom-right.
     - Calendar/phone icon, drop shadow.
     - `aria-label="Schedule a consultation"`.
     - Storybook story.

2. **US5.2: Booking Screen & Calendar Integration**
   - **As a user,** I want to provide my info and select a consultation time.
   - **Acceptance Criteria:**
     - Step 1: PrimeNG form (First Name, Last Name, Email).
     - Step 2: Embedded Calendly/Google Calendar widget.
     - Lead saved with `source: 'booking'`.
     - Confirmation email triggered.

3. **US5.3: Booking Email Automation**
   - **As a stakeholder,** I want automated emails for booking and reminders.
   - **Acceptance Criteria:**
     - Confirmation email to user (date, time, meeting prep tips).
     - Notification email to advisor with lead details.
     - Reminder email 24hr before consultation.

---

## 🎯 Epic 6: Engagement, Retention & Final Polish

**Goal:** Complete the product with community engagement, i18n polish, Storybook audit, accessibility compliance, and performance optimization.

### User Stories:

1. **US6.1: Wishlist Board**
   - **As a user,** I want to vote on future features.
   - **Acceptance Criteria:**
     - PrimeNG `DataView` or card grid.
     - Upvote mechanism with local persistence.
     - Sorted by vote count.
     - Storybook story.

2. **US6.2: i18n Polish & Bilingual Content**
   - **As a global user,** I want all text in English and Spanish.
   - **Acceptance Criteria:**
     - All UI strings externalized (`en.json`, `es.json`).
     - `CurrencyPipe`/`DatePipe` adapt to locale.
     - Spanish text overflow handled gracefully.
     - Language preference persisted.

3. **US6.3: Accessibility Audit & Storybook Compliance**
   - **As a product owner,** I want all components to pass WCAG AA and be documented.
   - **Acceptance Criteria:**
     - All components have Storybook stories (mobile/desktop).
     - AXE accessibility checks pass.
     - Keyboard navigation tested.
     - Color contrast verified.
     - Coverage ≥ 80%.

4. **US6.4: Performance Optimization & Production Build**
   - **As a developer,** I want the production build optimized for GitHub Pages.
   - **Acceptance Criteria:**
     - SSG prerendering for all routes.
     - Heavy libraries deferred (`@defer`).
     - LCP < 2.5s verified.
     - SEO metadata service.
     - GitHub Actions pipeline verified.

---

## 🧪 Quality Gate (Mandatory for ALL Stories)

- **TDD Pattern:** Every new feature MUST follow: 1. Fail Test → 2. Pass Code → 3. Refactor.
- **Coverage Check:** No story is "Done" until coverage is **≥ 80%**.
- **Storybook Audit:** Every visual component must be visible in Storybook across mobile viewports.
- **Accessibility:** All components must pass AXE checks.
- **PO Sign-off:** Validation against `PO_Checklist.md`.
