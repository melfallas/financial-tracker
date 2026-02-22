# 📄 Product Requirements Document (PRD): Financial Tracker Global MVP

## 1. Project Overview

**Project Name:** Financial Tracker Global MVP

**Version:** 1.0.0

**Status:** Architecture Complete / Ready for Development

**Target Markets:** LATAM & Global (Bilingual: ES/EN)

### 1.1 Executive Summary

A high-conversion financial utility designed to capture leads by visualizing the "Wealth Gap"—the difference between nominal investment growth and inflation-adjusted real value. The MVP focuses on local market realities in LATAM while maintaining a premium global design standard.

---

## 2. Target Audience & User Stories

### 2.1 Persona: The Cautious Investor

Users in high-inflation environments (e.g., Argentina, Mexico) who need to understand how much their money is _actually_ growing after factoring in purchasing power loss.

### 2.2 User Stories

- **As a user,** I want to input my savings and interest rate so I can see my future balance.
- **As a user,** I want to select my local currency so the app applies current local inflation rates.
- **As a user,** I want to receive a PDF summary so I can review my financial plan offline.
- **As a stakeholder,** I want to capture the user's name and email before they download the report.

---

## 3. Functional Requirements

### 3.1 Financial Engine (The Wealth Gap)

- **Compound Interest:** Monthly compounding logic.
- **Inflation Adjustment:** Real-time-ready logic to discount nominal totals based on annual inflation percentages.
- **Currency Support:** USD, EUR, and top LATAM currencies (ARS, MXN, CRC, COP, BRL).

### 3.2 Lead Capture System

- **Form Validation:** Capture First Name, Last Name, and Email.
- **Consent:** Checkbox for data privacy and newsletter opt-in.
- **Persistence:** Save lead data to `LocalStorage` (Phase 1) and `Supabase` (Phase 2).

### 3.3 Reporting & Automation

- **PDF Generation:** Client-side generation of a 1-page summary.
- **Email Trigger:** Automated "Welcome" email sent upon form submission (Integration: Resend).

---

## 4. Technical Specifications

### 4.1 Tech Stack

- **Framework:** Angular 21 (Signal-based state management).
- **Styling:** Tailwind CSS v4 (80/15/5 Design Rule).
- **Charts:** Chart.js or D3.js for "Wealth Gap" visualization.
- **PDF Engine:** `jspdf` or `pdf-lib`.

### 4.2 Architecture (BMAD Pattern)

- **Base:** Core layouts and global styles.
- **Modals:** Pop-ups for lead capture and alerts.
- **Assets:** i18n JSON files and design tokens.
- **Data:** Services for currency rates and repository interfaces.

---

## 5. UI/UX Requirements (Sally’s Standard)

### 5.1 Visual Identity

- **Color Palette:** \* 80% Base: Deep Blue (`#1A237E`) & Cloud Gray (`#ECEFF1`).
- 15% Interaction: Emerald Green (#00C853).
- 5% CTA: Emerald Green (#00C853) - Focused on growth contrast.

- **Design Pattern:** Mobile-First, high-contrast text, and generous white space.

### 5.2 Responsive Breakpoints

- **Mobile (default):** Stacked vertical layout, sticky CTA.
- **Tablet/Desktop (`md:`):** Side-by-side view (Input sliders on the left, Chart on the right).

---

## 6. Implementation Roadmap

### Phase 1: Interactive MVP (Current)

- [ ] Framework scaffolding and Tailwind v4 setup.
- [ ] i18n implementation (ES/EN).
- [ ] Wealth Gap logic and Charting component.
- [ ] Local lead capture and PDF export.

### Phase 2: Scale & Automate

- [ ] Supabase backend integration.
- [ ] Dynamic inflation API connection.
- [ ] Email automation via Resend.

---

## 7. Constraints & Compliance

- **Performance:** Must score >90 on Lighthouse Mobile.
- **Language:** Code and comments strictly in English.
- **Privacy:** Data collection must be transparent and opt-in based.
