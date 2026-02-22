# 📄 Product Requirements Document (PRD): Fin-Tracker Global MVP

## 1. 🎯 Project Vision

**Fin-Tracker Global** is a high-end, mobile-first financial tool designed to provide instant value by visualizing the "Wealth Gap" caused by inflation. It serves as a lead generation engine for financial services, converting curiosity into data through a personalized PDF report.

## 👥 2. Target Audience

- **Primary:** Global retail investors seeking to understand real purchasing power.
- **Secondary:** LATAM users dealing with high-inflation (ARS, MXN, CRC).
- **Stakeholders:** Financial advisors capturing high-intent leads.

## 🛠️ 3. Functional Requirements

### 🏢 Core Feature: The Wealth Gap Simulator

- Interactive compound interest calculator with inflation adjustment.
- Visual chart comparing Nominal Balance vs. Real Purchasing Power.
- Real-time reactivity via sliders (Investment Amount, Contributions, Time).

### 🌍 Multi-Currency & Market Context

- Integration with real-time exchange rates.
- **Inflation Dashboard:** Severity indicators (Stable vs. Critical) based on selected currency.

### 📥 Lead Capture & Value Exchange

- High-conversion form (First Name, Last Name, Email).
- **PDF Export:** Personalized "Investor Terms" summary download.

## 🎨 4. Design & Experience (UX/UI)

- **Methodology:** Mobile-First, Responsive, Institutional Feel.
- **80/15/5 Rule:** Base (80%), Action (15%), CTA (5% - Emerald Green).

## 📐 5. Technical Specifications

- **Stack:** Angular 21, Tailwind v4, Chart.js.
- **Testing Logic:** Mandatory **TDD (Red-Green-Refactor)** for all features.
- **Quality Standard:** Minimum **80% code coverage** for all logic.

## 🗺️ 6. Implementation Roadmap

1. **Milestone 1:** Technical Scaffold, TDD Setup & Wealth Gap Engine.
2. **Milestone 2:** Interactive Widgets & Market Dashboard.
3. **Milestone 3:** Lead Capture Form & PDF Export.
4. **Milestone 4:** Multi-currency Integration & Final Polish.

---

## 🛡️ Non-Functional Requirements & Governance

- **Code Language:** English (Source & Comments).
- **Naming Policy:** Clean Flat naming (No `.component` suffix).
- **TDD Hook:** Every implementation must pass unit tests before coding the component logic.
- **Accessibility:** WCAG AA Compliance.
- **Validation:** Every User Story must pass the **PO Checklist**.
