# 📊 Project Requirements Table: Financial Tracker

| ID        | Category | Requirement Name                  | Description                                                                                  | Priority | BMad Layer |
| --------- | -------- | --------------------------------- | -------------------------------------------------------------------------------------------- | -------- | ---------- |
| **FR-01** | Core     | **Compound Interest Engine**      | Calculate monthly compounding growth based on initial capital and monthly contributions.     | P0       | `Data`     |
| **FR-02** | Core     | **Wealth Gap Logic**              | Calculate purchasing power loss by discounting nominal growth against local inflation rates. | P0       | `Data`     |
| **FR-03** | UI/UX    | **80/15/5 Visual Implementation** | Apply Deep Blue (80%), Emerald (15%), and CTA Orange (5%) throughout the UI.                 | P0       | `Base`     |
| **FR-04** | UI/UX    | **Real-time Charting**            | Dynamic line chart showing the visual "gap" between Nominal and Real value.                  | P1       | `Base`     |
| **FR-05** | Lead Gen | **Lead Capture Modal**            | Modal form to collect Name and Email before PDF generation.                                  | P0       | `Modals`   |
| **FR-06** | Lead Gen | **PDF Generation**                | Export a branded "Financial Tracker Report" as a downloadable PDF.                           | P1       | `Assets`   |
| **FR-07** | i18n     | **Bilingual Toggle**              | Seamless switching between English (EN) and Spanish (ES) using Signals.                      | P1       | `Assets`   |
| **TR-01** | Tech     | **Signal-based State**            | All reactive data (Currency, Inflation, Rates) must be handled via Angular Signals.          | P0       | `Data`     |
| **TR-02** | Tech     | **Mobile-First Layout**           | Responsive design optimized for high-performance mobile browsing.                            | P0       | `Base`     |
| **TR-03** | Tech     | **Repository Pattern**            | Abstract data storage to allow switching from LocalStorage to Supabase.                      | P1       | `Data`     |
| **TR-04** | Tech     | **Tailwind v4 Setup**             | Implementation of design tokens via Tailwind v4 CSS variables.                               | P1       | `Assets`   |

---

### 📌 Technical Constraints Table

| Constraint            | Specification                                           |
| --------------------- | ------------------------------------------------------- |
| **Naming Convention** | All branding must display as **"Financial Tracker"**.   |
| **Code Standard**     | Logic, variables, and comments strictly in **English**. |
| **Bundle Size**       | Keep initial JS bundle <150kb (Gzipped).                |
| **Reactivity**        | No `Zone.js` / No `NgRx` (Native Signals only).         |
| **Compliance**        | GDPR/CCPA compliant Lead Capture checkboxes.            |

---

### 🛠️ Execution Status (BMad Sync)

- **[B] Base:** Layout finalized; Tailwind v4 tokens defined.
- **[M] Modals:** Lead capture UX flow defined.
- **[A] Assets:** i18n dictionaries (EN/ES) and Branding finalized.
- **[D] Data:** Mathematical models for Inflation/Interest finalized.
