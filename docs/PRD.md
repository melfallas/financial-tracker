# 📄 Product Requirements Document (PRD): Fin-Tracker Global MVP

## 1. 🎯 Project Vision

**Fin-Tracker Global** is a high-end, mobile-first financial tool designed to provide instant value to investors by visualizing the "Wealth Gap" caused by inflation. It serves as a lead generation engine for financial services, converting curiosity into data through a personalized PDF report.

## 👥 2. Target Audience

- **Primary:** Global retail investors seeking to understand the real value of their savings.
- **Secondary:** LATAM users dealing with high-inflation environments (ARS, MXN, COP, CRC).
- **Stakeholders:** Financial advisors looking to capture high-intent leads.

## 🛠️ 3. Functional Requirements

### 🏢 Core Feature: The Wealth Gap Simulator

- Interactive compound interest calculator with inflation adjustment.
- Visual chart comparing Nominal Balance vs. Real Purchasing Power.
- Real-time reactivity via sliders (Investment Amount, Contributions, Time).

### 🌍 Multi-Currency & Market Context

- Integration with real-time exchange rates (USD/EUR/LATAM).
- **Inflation Dashboard:** Severity indicators (Stable vs. Critical) based on the selected currency's annual inflation rate.

### 📥 Lead Capture & Value Exchange

- High-conversion form (First Name, Last Name, Email).
- **PDF Export:** Immediate download of a personalized "Investor Terms" summary.
- Persistence: LocalStorage (Phase 1) transitioning to Supabase (Phase 2).

## 🎨 4. Design & Experience (UX/UI)

- **Methodology:** Mobile-First, Responsive, Institutional Feel.
- **80/15/5 Rule:**
  - **80% (Base):** Deep Blue & Cloud Gray (Stability).
  - **15% (Action):** Teal Bright (Guidance).
  - **5% (CTA):** **Emerald Green** (Growth & Conversion).
- **Performance:** Instant feedback using Angular Signals (Zoneless).

## 📐 5. Technical Specifications

- **Stack:** Angular 21, Tailwind v4, Chart.js.
- **Persistence:** LocalStorage -> Supabase.
- **Infrastructure:** GitHub Pages (SSG/SPA).
- **Testing:** Storybook-driven isolation testing for all components.

## 🗺️ 6. Implementation Roadmap

1. **Milestone 1:** Technical Scaffold & Wealth Gap Engine.
2. **Milestone 2:** Interactive Widgets & Market Dashboard.
3. **Milestone 3:** Lead Capture Form & PDF Export.
4. **Milestone 4:** Multi-currency Integration & Final Polish.

---

## 🛡️ Non-Functional Requirements & Governance

- **Code Language:** English (Source & Comments).
- **Naming Policy:** Clean Flat naming (No `.component` suffix).
- **Accessibility:** WCAG AA Compliance.
- **Validation:** Every User Story must pass the **PO Checklist**.
