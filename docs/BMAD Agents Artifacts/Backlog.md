# 📋 Project Backlog: Financial Tracker Global MVP

## 🚀 Epic 1: core Foundations & Technical Scaffold

**Goal:** Establish the Angular 21 environment, Tailwind v4 design system, and the "Wealth Gap" mathematical engine.

### User Stories:

1. **US1.1: Project Initialization (Architectural Scaffold)**
   - **As a developer,** I want to set up an Angular 21 project with Tailwind v4 and the BMAD directory structure so that I can start building with clean, scalable patterns.
   - **Acceptance Criteria:**
     - Angular 21 installed.
     - Tailwind v4 configured with the 80/15/5 color tokens.
     - BMAD directory structure created.
     - No `.component` suffix in filenames or classes.

2. **US1.2: Global Design System (Tokens & Variables)**
   - **As a UX expert,** I want to define the core CSS variables for Deep Blue, Cloud Gray, and Emerald Green so that the entire app maintains high-end visual consistency.
   - **Acceptance Criteria:**
     - Deep Blue (#1A3C6E) at 80%.
     - Emerald Green (#00C853) at 5% for CTAs.
     - Typography (Inter) configured globally.

3. **US1.3: The Wealth Gap Engine (Pure Math)**
   - **As an investor,** I want an accurate calculation of my capital's future value adjusted for inflation so that I can see my real purchasing power.
   - **Acceptance Criteria:**
     - Decoupled utility for Future Value (Nominal vs Real).
     - Support for monthly compounding.

---

## 📈 Epic 2: Real-time Widgets & Interactivity

**Goal:** Implement the interactive calculators and market status indicators using Angular Signals.

### User Stories:

1. **US2.1: Multi-Currency & i18n Logic**
   - **As a global user,** I want to switch between USD, EUR, and LATAM currencies (ARS, MXN, CRC, etc.) so that the data reflects my local reality.
   - **Acceptance Criteria:**
     - Support for USD, EUR, and top 10 LATAM currencies.
     - Automatic formatting change ($, €, ₡, etc.).
     - ES/EN language switching.

2. **US2.2: Compound Interest Simulator (The Wealth Gap Chart)**
   - **As a user,** I want to interact with sliders to visualize how my investment grows and how inflation erodes it.
   - **Acceptance Criteria:**
     - Visual chart showing Nominal vs Real value.
     - 60FPS interactivity using Angular Signals.
     - Responsive "Mobile-First" layout (Chart top, Controls bottom).

3. **US2.3: Inflation Dashboard (The Alert System)**
   - **As a user,** I want to see a "severity" indicator for my currency's inflation so that I understand the urgency of investing.
   - **Acceptance Criteria:**
     - Indicators for Stable, Warning, and Critical (Soft Red).
     - Visual "leak" indicator for purchasing power loss.

---

## 🛡️ Epic 3: Lead Capture & Value Delivery

**Goal:** Convert visitors into leads by offering a high-value personalized PDF report.

### User Stories:

1. **US3.1: Personalized Lead Form**
   - **As a stakeholder,** I want to capture the user's First Name, Last Name, and Email before providing a report so that I can follow up with them.
   - **Acceptance Criteria:**
     - Separate fields for First and Last name.
     - LocalStorage persistence (Phase 1).
     - Form validation with "Soft Red" error states.

2. **US3.2: PDF Report Generation**
   - **As a user,** I want to download a professional summary of my projection so that I can review it later.
   - **Acceptance Criteria:**
     - Client-side PDF generation.
     - Inclusion of the "Wealth Gap" summary.
     - Personalized with the user's name.

3. **US3.3: Success Feedback & Trust Markers**
   - **As a user,** I want clear confirmation and premium feedback after submitting my data.
   - **Acceptance Criteria:**
     - Success message in Emerald Green.
     - "Download Ready" visual cues.

---

## 🧪 Epic 4: Quality Assurance & Documentation

**Goal:** Ensure 100% adherence to design and technical standards via Storybook and Automated Testing.

### User Stories:

1. **US4.1: Storybook Visual Audit**
   - **As the Product Owner,** I want all components to be documented in Storybook with mobile viewport tests so that I can approve the UI without running the full app.
   - **Acceptance Criteria:**
     - Stories for all Features (Form, Calc, MarketDash).
     - Specific scenarios for High Inflation (ARS) and Success (PDF).

2. **US4.2: Mobile-First Accessibility Audit**
   - **As a user with a mobile device,** I want a "thumb-friendly" interface so that I can use the tool easily on the go.
   - **Acceptance Criteria:**
     - Minimum tap targets of 44px.
     - WCAG AA contrast compliance for all text.

---

## 🛠️ User Story Validation Process (Scrum Master Workflow)

1. **Developer Pre-check:** Code and comments in English? No `.component` suffixes?
2. **UX Expert (Sally) Approval:** Does it match the 80/15/5 rule and the "Clear" output style in Storybook?
3. **Scrum Master (SM) Validation:**
   - Verify that the User Story fulfills the **Acceptance Criteria**.
   - Ensure the "Spec-Driven Development" flow was followed.
   - Check that Mobile-First design is strictly enforced in Storybook.
4. **Product Owner (PO) Sign-off:** Final review based on the **PO Checklist**.
