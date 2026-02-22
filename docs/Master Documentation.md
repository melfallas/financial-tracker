# 📘 Master Documentation: Fin-Tracker Global MVP

## 1. 🎯 Project Vision & Strategy

**Fin-Tracker Global** is a high-value lead generation engine designed for the fintech sector. It bridges the gap between complex financial data and user-friendly visual projections, specifically targeting the impact of **Inflation vs. Compound Interest** in volatile markets (LATAM/Global).

### Key Business Objectives:

- **Conversion:** Capture qualified leads by offering a personalized PDF investment report.
- **Education:** Visualize the "Wealth Gap"—the difference between nominal growth and real purchasing power.
- **Scalability:** A bilingual, multi-currency architecture ready for global deployment.

---

## 🎨 2. Design System (Sally’s UX Standards)

The interface follows the **80/15/5 Rule** to project institutional trust with modern "Fintech" agility.

### Color Architecture (Tailwind v4):

| Layer             | Usage                                      | Hex Code                                      |
| ----------------- | ------------------------------------------ | --------------------------------------------- |
| **80% Base**      | Backgrounds, Primary Text, Headers         | `#1A237E` (Deep Blue), `#ECEFF1` (Cloud Gray) |
| **15% Action**    | Success indicators, growth charts, sliders | `#00C853` (Emerald), `#009688` (Teal)         |
| **5% Conversion** | **Call to Action (CTA)**, PDF Buttons      | `#F57C00` (Orange)                            |

### UX Principles:

- **Mobile-First:** All features must be fully functional on mobile devices before desktop optimization.
- **Psychology of Urgency:** Use `Soft Red (#D32F2F)` borders when inflation exceeds 10% to trigger user interest in investment.
- **Skeleton Loading:** All data-heavy charts must display pulse-animated placeholders during calculation.

---

## 🏗️ 3. Technical Architecture (Winston’s Blueprint)

The project is built on **Angular 21** using a reactive, signal-based approach to ensure maximum performance.

### Tech Stack:

- **Frontend:** Angular 21 (Signals, No Zone.js).
- **Styling:** Tailwind CSS v4.
- **State:** Local Signals (Currency, FX Rates, Inflation).
- **Persistence:** Repository Pattern (Initial: `LocalStorage` | Phase 2: `Supabase`).
- **Email:** Resend / SendGrid Integration.

### Directory Structure (BMAD Methodology):

```text
src/app/
├── core/                # Global Singletons & Repository Interfaces
├── infrastructure/      # External service implementations (Supabase/Email)
├── shared/              # Pure math utils (Wealth Gap) and Dumbs
└── features/            # Smart Components (LeadForm, Calc, MarketDash)

```

---

## 📈 4. Core Logic: The Wealth Gap Engine

The calculation logic is decoupled from the UI to ensure accuracy and testability.

**Formula:**

**Logic Implementation:**

- **Nominal Growth:** Monthly compounding interest.
- **Real Growth:** Discounting the nominal balance against the local inflation rate of the selected currency (USD, EUR, ARS, MXN, etc.).

---

## 🗺️ 5. Implementation Roadmap

### Phase 1: Interactive MVP (Current)

- [ ] Framework Setup (Angular 21 + Tailwind v4).
- [ ] Multi-currency & i18n Logic.
- [ ] Compound Interest Calculator with "Wealth Gap" Chart.
- [ ] Local Lead Capture & PDF Trigger.

### Phase 2: Cloud Scaling

- [ ] Supabase Integration (PostgreSQL Table for Leads).
- [ ] Real-time Inflation APIs.
- [ ] Automated Email Delivery (Resend API).

---

## 🛡️ 6. Governance & Compliance

- **Code Quality:** Strictly English for variables, comments, and commits.
- **Data Privacy:** Minimal data collection for the MVP; GDPR-ready lead forms.
- **Performance:** < 2s load time on 4G networks via asset optimization.

---

**Winston:** "This Master Document is the 'Source of Truth' for your project. With this Markdown, your Notion or Wiki is ready to guide any developer or stakeholder through the build process."
