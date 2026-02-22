# 📘 Master Documentation: Financial Tracker

## 1. Project Vision & Strategy (John, PM)

**Financial Tracker** is a high-performance lead generation engine designed for the fintech sector. It bridges the gap between complex financial data and user-friendly visual projections, specifically targeting the impact of **Inflation vs. Compound Interest**.

### 🎯 Key Objectives:

- **Conversion:** Capture qualified leads by offering a personalized PDF investment report.
- **Education:** Visualize the "Wealth Gap"—the difference between nominal growth and real purchasing power.
- **Scalability:** A bilingual (EN/ES), multi-currency architecture ready for global deployment.

---

## 🎨 2. Design System (Sally’s Standards)

The interface follows the **80/15/5 Rule** to project institutional trust with modern "Fintech" agility.

### Color Architecture (Tailwind v4):

| Layer             | Usage                      | Hex Code  | CSS Variable      |
| ----------------- | -------------------------- | --------- | ----------------- |
| **80% Base**      | Backgrounds & Primary Text | `#1A3C6E` | `--color-primary` |
| **80% Surface**   | Layout Surfaces            | `#ECEFF1` | `--color-surface` |
| **15% Action**    | Growth charts, Sliders     | `#00C853` | `--color-action`  |
| **5% Conversion** | **Call to Action (CTA)**   | `#00C853` | `--color-cta`     |

### UX Principles:

- **Mobile-First:** Thumb-driven interaction for all sliders.
- **Psychology of Urgency:** Use `Soft Red (#D32F2F)` shading in the chart area to visualize "Purchasing Power Loss."
- **Radical Clarity:** Minimalist UI with high-contrast data visualization.

---

## 🏗️ 3. Technical Architecture (Winston’s Blueprint)

Built on **Angular 21** using a reactive, signal-based approach.

### Tech Stack:

- **Frontend:** Angular 21 (Zoneless, Signals).
- **Styling:** Tailwind CSS v4.
- **Data Persistence:** Repository Pattern (LocalStorage ↔ Supabase).
- **Reporting:** Client-side PDF generation via `jspdf`/`pdf-lib`.

### BMad Directory Structure:

```text
src/app/
├── base/           # Layout, Header, Chart Components
├── modals/         # Lead Capture Form, Success Overlays
├── assets/         # i18n (en.json, es.json), Design Tokens, Icons
└── data/           # Math Engine, Services, Interfaces, Repositories

```

---

## 📈 4. Core Logic: The Wealth Gap Engine

The calculation logic is decoupled from the UI to ensure accuracy and testability.

**Fundamental Formula:**

**Logic Implementation:**

- **Nominal Growth:** Monthly compounding interest.
- **Real Growth:** Discounting the nominal balance against the local inflation rate of the selected currency.

---

## 🗺️ 5. User Flow (Conversion Funnel)

1. **Entry:** User interacts with investment sliders.
2. **Visualization:** Real-time chart shows the "Wealth Gap."
3. **Hook:** User clicks "Download My Full Financial Report" (CTA Orange).
4. **Capture:** A modal requests Name and Email.
5. **Fulfillment:** System saves lead data and triggers a PDF download.

---

## 📋 6. Project Requirements Table (PRT)

| ID        | Requirement               | Priority | BMad Layer |
| --------- | ------------------------- | -------- | ---------- |
| **FR-01** | Wealth Gap Engine         | P0       | `Data`     |
| **FR-02** | Lead Capture Modal        | P0       | `Modals`   |
| **FR-03** | 80/15/5 UI System         | P0       | `Base`     |
| **FR-04** | Bilingual Support (EN/ES) | P1       | `Assets`   |
| **FR-05** | PDF Generation            | P1       | `Assets`   |

---

## 🛡️ 7. Governance & Guardrails

- **Naming:** Strictly **Financial Tracker**.
- **Language:** Internal code and docs in **English**. External UI is **Bilingual**.
- **Reactivity:** Strictly **Angular Signals**. No RxJS for local state.
