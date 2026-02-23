# 🏗️ Architectural Detail: Signal Flow & Math Engine (US1.1 / US1.4)
> **Financial Tracker** · **Role:** Winston (Architect) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Technical Specification Ready · **Context:** Data Integrity & Reactive State Management

---

## 🎯 Purpose & Philosophy

To ensure absolute financial consistency across the platform (Dashboard, Modals, PDF Reports), the application utilizes a **Centralized Reactive State** managed via Angular Signals. All components consume pre-calculated data from a single source of truth, preventing "formula drift" and redundant CPU cycles.

> **The 100% Math Rule:** No business logic or financial formulas are allowed inside Angular components. 100% of mathematical operations must reside in **Pure TypeScript functions** to enable isolated, framework-independent unit testing (TDD).

---

## 📐 Data Flow Architecture

### 1. The Global Store (`FinancialStateService`)
The system follows a **Single Source of Truth** pattern. Master signals reside in a singleton service, which is injected wherever data is needed.

**Master Signals (Writeable):**
- `initialCapital: signal<number>`
- `monthlyContribution: signal<number>`
- `expectedReturn: signal<number>`
- `inflationRate: signal<number>`

**Master Computed Signals (Read-only):**
- `wealthGapSeries: computed(() => financeMath.calculateWealthGap(...))`
- `retirementProjection: computed(() => financeMath.projectRetirement(...))`
- `costOfWaitingSummary: computed(() => financeMath.calculateOpportunityCost(...))`

### 2. The Unidirectional Event Cycle
We strictly follow a **Data Down, Actions Up** pattern.

1. **User Interaction:** The user moves a slider in a child component (e.g., `RetirementSimulator`).
2. **Action Emission:** The child emits an `@Output` event (e.g., `inflationChange.emit(newValue)`).
3. **State Update:** The parent container (`home-page.ts`) or the direct service call updates the **Master Signal**.
4. **Reactive Propagation:** All `computed()` signals downstream are instantly recalculated via Angular's push-based reactivity.
5. **View Refresh:** All components (Charts, Cards, Headers) update their view simultaneously with 100% consistent data.

---

## 🧠 The Math Engine (`finance-math.ts`)

Located in `src/app/shared/utils/finance-math.ts`, this file is strictly pure TypeScript. It has no dependencies on Angular or the DOM.

### Core Calculation Signatures
```typescript
/** 
 * Calculates the divergence between nominal growth and inflation-adjusted value.
 * Used by the Wealth Gap Chart and PDF Report.
 */
export function calculateWealthGap(params: WealthGapParams): ProjectionEntry[] {
    // ... pure math logic ...
}

/** 
 * Calculates the required effort for a specific goal (Wishlist items).
 */
export function calculateMonthlyEffort(goal: number, years: number): number {
  return goal / (years * 12);
}
```

---

## 🚀 Performance & Optimization

- **Memoization by Signal:** Because `computed()` signals only re-evaluate when their dependencies change, we avoid re-calculating the entire wealth gap array on every mouse movement. 
- **Change Detection:** All components use `ChangeDetectionStrategy.OnPush`, as they only rely on Signal inputs. This minimizes zone.js overhead and ensures peak performance even with complex charts.
- **TDD Requirement:** 100% of the logic in `finance-math.ts` must be covered by unit tests before any visual component is allowed to consume it.

---

## 🏗️ Blueprint (Class Responsibility Map)

| Layer | Responsibility | Technology |
|:---|:---|:---|
| **Math Engine** | Pure formulas, Interest Compounding, Inflation adjustment. | Pure TS |
| **Global State** | Orchestrating signals, providing master computed data. | Angular Service |
| **Container (`home-page`)** | Coordinating high-level events and DI tokens. | Angular Component |
| **Presentational Components** | Rendering charts and capturing inputs (Sliders). | Angular OnPush |

---

*— Winston, Architect · Financial Tracker · BMAD v4 · 2026-02-23*
