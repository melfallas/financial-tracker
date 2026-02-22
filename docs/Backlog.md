# 📋 Project Backlog: Financial Tracker Global MVP

## 🚀 Epic 1: core Foundations & Technical Scaffold

**Goal:** Establish the Angular 21 environment, Tailwind v4 design system, and the "Wealth Gap" mathematical engine following strict TDD.

### User Stories:

1. **US1.1: Project Initialization (Architectural Scaffold)**
   - **As a developer,** I want to set up an Angular 21 project with Tailwind v4 and the BMAD directory structure.
   - **Acceptance Criteria:**
     - Angular 21 installed.
     - Tailwind v4 configured with 80/15/5 tokens.
     - No `.component` suffix in filenames.
   - **Implementation Rule:** Define Core/Shared/Feature directory structure first.

2. **US1.2: Global Design System (Tokens & Variables)**
   - **As a UX expert,** I want to define the core CSS variables for Deep Blue, Cloud Gray, and Emerald Green.
   - **Acceptance Criteria:**
     - Design tokens integrated into Tailwind v4.
     - Typography (Inter) configured globally.

3. **US1.3: The Wealth Gap Engine (TDD Flow)**
   - **As an investor,** I want an accurate calculation of my capital's future value adjusted for inflation.
   - **Acceptance Criteria:**
     - Decoupled utility for Future Value.
     - **TDD:** Write unit tests for compounding logic BEFORE implementation.
     - **Coverage:** 100% for this utility.

---

## 📈 Epic 2: Real-time Widgets & Interactivity

**Goal:** Implement the interactive calculators and market status indicators using Angular Signals and TDD.

### User Stories:

1. **US2.1: Multi-Currency & i18n Logic**
   - **As a global user,** I want to switch between USD, EUR, and LATAM currencies.
   - **Acceptance Criteria:**
     - Support for USD, EUR, ARS, MXN, CRC.
     - **TDD:** Tests for currency conversion and symbol formatting must pass before UI integration.

2. **US2.2: Compound Interest Simulator (The Wealth Gap Chart)**
   - **As a user,** I want to interact with sliders to visualize my investment growth.
   - **Acceptance Criteria:**
     - **TDD:** Unit tests for Signal-based reactivity.
     - Visual chart showing Nominal vs Real value.
     - Storybook stories for mobile/desktop.

3. **US2.3: Inflation Dashboard (The Alert System)**
   - **As a user,** I want to see a severity indicator for my currency's inflation.
   - **Acceptance Criteria:**
     - **TDD:** Test severity calculation logic (Stable/Warning/Critical).

---

## 🛡️ Epic 3: Lead Capture & Value Delivery

**Goal:** Convert visitors into leads following TDD for form validation and persistence.

### User Stories:

1. **US3.1: Personalized Lead Form**
   - **As a stakeholder,** I want to capture the user's First Name, Last Name, and Email.
   - **Acceptance Criteria:**
     - **TDD:** Tests for form validation (required fields, email format) must pass first.
     - LocalStorage persistence.

2. **US3.2: PDF Report Generation**
   - **As a user,** I want to download a professional summary.
   - **Acceptance Criteria:**
     - **TDD:** Verify PDF generation logic with unit tests (mocking Blob).

---

## 🧪 Epic 4: Quality Assurance & Documentation

**Goal:** Final audit and 80% coverage compliance.

### Implementation Rules (Mandatory):

- **TDD Pattern:** Every new feature MUST follow: 1. Fail Test -> 2. Pass Code -> 3. Refactor.
- **Coverage Check:** No story is "Done" until coverage is **>= 80%**.
- **Storybook Audit:** Every component must be visible in Storybook across mobile viewports.
- **PO Sign-off:** Validation against the `PO_Checklist.md`.
