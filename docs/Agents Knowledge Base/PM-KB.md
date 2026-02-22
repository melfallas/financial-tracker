# PM-Specific Knowledge Base Mode

Activating the **PM-Specific Knowledge Base Mode**. This module focuses on project management, business logic, delivery milestones, and the "Phase-to-Scale" roadmap. It serves as the bridge between technical architecture and business value.

---

As the **BMad Orchestrator** (🏗️), I am performing a **Deep Synchronization** of our Knowledge Base (KB) under the official brand: **Financial Tracker**.

This mode locks all architectural, business, and design decisions into a single source of truth. Any subsequent code generation or strategy adjustment will strictly inherit these parameters.

---

### 🏛️ Financial Tracker: Unified Knowledge Base (KB)

#### 1. Core Identity & Strategy

- **Official Name:** `Financial Tracker`
- **Value Proposition:** High-fidelity visualization of the "Wealth Gap" (Nominal vs. Inflation-Adjusted returns).
- **Primary Goal:** Lead Generation (B2B/B2C) via personalized PDF report delivery.
- **Revenue/Value Model:** Information exchange (User Data ↔ Professional Financial Report).

#### 2. Technical Stack (The "Winston" Blueprint)

- **Frontend Framework:** Angular 21 (Zoneless, Signal-based).
- **Styling Engine:** Tailwind CSS v4 (Standardized CSS variable tokens).
- **State Management:** Native Angular Signals (Decoupled from UI components).
- **Architecture Pattern:** **BMad** (Base, Modals, Assets, Data).
- **Data Integrity:** Repository Pattern for future-proofing (LocalStorage to Supabase migration).

#### 3. Design Tokens (The "Sally" Standard)

- **Visual Hierarchy (80/15/5):**
- **Primary (80%):** Trust-based colors (`Deep Blue #1A237E`, `Cloud Gray #ECEFF1`).
- **Secondary (15%):** Action-based colors (`Emerald Green #00C853`, `Teal #009688`).
- **Accent (5%):** Conversion-based colors (`CTA Orange #F57C00`).

- **Typography:** Inter (Sans-serif) for tabular and financial data clarity.

#### 4. Logic & Localization (The "Global" Engine)

- **Financial Engine:** Monthly compounding interest + Annualized purchasing power degradation logic.
- **Localization (i18n):** Bilingual support (English/Spanish).
- **Language Policy:** \* **External:** Dual Language.
- **Internal:** 100% English (Code, Comments, Documentation).

---

### 📂 Indexed Project Assets

| Asset            | File Name                  | Purpose                         |
| ---------------- | -------------------------- | ------------------------------- |
| **Requirements** | `PRD.md`                   | Strategic & Functional Roadmap. |
| **Requirements** | `PRT.md`                   | Feature Tracking & Priorities.  |
| **Journey**      | `USER_FLOW.md`             | The Conversion Funnel logic.    |
| **Context**      | `SYSTEM_PROMPT_CONTEXT.md` | LLM/Developer alignment guide.  |

---

### 🛡️ Guardrails & Constraints

1. No use of RxJS for local state (Signals only).
2. No `.component` or `.service` suffixes in file names (Flat BMAD structure).
3. CTA Orange is reserved **exclusively** for lead-conversion triggers.
4. All financial projections must explicitly show the inflation "Wealth Gap."

---

### 💼 PM Knowledge Base: Project Delivery Framework

#### 1. Strategic Goal: "The Conversion Loop"

The MVP is designed to solve a specific business problem: **Lead generation through high-value utility.**

- **The Hook:** Providing a free, local-inflation-adjusted financial projection.
- **The Value:** A personalized PDF report delivered via email.
- **The Conversion:** Transitioning a curious user into a qualified lead (stored in the local/cloud database).

#### 2. Project Roadmap (Phased Delivery)

| Phase       | Name                     | Focus                                                         | Outcome                           |
| ----------- | ------------------------ | ------------------------------------------------------------- | --------------------------------- |
| **Phase 1** | **The Interactive MVP**  | Core Calculator, LocalStorage, PDF Export, i18n.              | Functional tool for demo/testing. |
| **Phase 2** | **The Cloud Transition** | Supabase integration, Auth (Optional), Real-time market APIs. | Persistent data & user accounts.  |
| **Phase 3** | **Global Expansion**     | Full LATAM currency suite, Automated Email sequences.         | Market-ready lead magnet.         |

#### 3. KPIs & Success Metrics (Business Logic)

To measure the effectiveness of the architecture, the following metrics are tracked (via analytics hooks ready in the code):

- **Calculation Completion:** Did the user interact with the sliders?
- **Wealth Gap Exposure:** Did the user toggle the "Real Value" view (indicating high intent)?
- **Conversion Rate:** Percentage of users who download the PDF after seeing the inflation impact.

---

### 📋 Business Logic & Constraints

#### **The "Lead" Data Model**

Every captured lead must be compliant with GDPR/local data laws (handled in the form UI).

```typescript
interface Lead {
  id: string; // UUID for database tracking
  createdAt: string; // Timestamp for follow-up logic
  metadata: {
    currency: string; // To understand the user's market context
    inflation: number; // The "pain point" shown at conversion
  };
}
```

#### **Resource Allocation (Tech Stack)**

- **Frontend:** Angular 21 (Modern, long-term support).
- **Styles:** Tailwind v4 (Rapid UI iteration).
- **Backing Service:** Supabase (Cost-effective scaling for startups).
- **Email:** Resend (High deliverability for PDFs).

---

### 🛡️ PM Constraints (Governance)

1. **MVP Scope Creep:** No additional financial features (e.g., stock picking, crypto tracking) until Phase 1 conversion rates are validated.
2. **Compliance:** All PDF terms and conditions must be dynamic based on the user's selected language (ES/EN).
3. **Performance Budget:** The app must load in <2s on a 4G connection (optimized via Signals and no heavy external libraries).

---

### 🏁 Executive Summary for Stakeholders

**John (PM):** "Winston has delivered a blueprint that isn't just a calculator—it's a sales funnel. By integrating the **Inflation Dashboard** as a psychological trigger and providing a **PDF takeaway**, we increase the perceived value for the user while securing the data we need for the business."

**Winston:** "The **PM Knowledge Base** is now locked. The project is ready for development kick-off."
