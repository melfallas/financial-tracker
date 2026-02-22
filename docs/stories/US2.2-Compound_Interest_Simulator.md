# User Story 2.2: Compound Interest Simulator (The Wealth Gap Chart)

## 📋 Description

**As an investor,** I want to interact with sliders (Amount, Rate, Years, and Inflation) to visualize in real-time how my investment grows nominally and how inflation erodes its purchasing power, displayed as two lines on a chart with the "Wealth Gap" area highlighted between them.

## 🎯 Problem Statement

Users lack a tangible, interactive way to **feel** the impact of compound interest versus inflation over time. Static numbers are abstract; a dynamic chart with live sliders makes the "Wealth Gap" concept intuitive and actionable. This feature consumes the pure math engine built in **US 1.3** and renders its output through an interactive Angular component backed by Chart.js.

## 📦 Dependencies

- **US 1.3 (Wealth Gap Engine):** This story depends on the `computeWealthGap()` function and the `WealthGapInput`, `WealthGapResult`, and `YearEntry` interfaces exported from `@shared/utils/finance-math.ts`.
- **US 1.2 (Design System):** Chart colors and typography must adhere to the global design tokens (Deep Blue, Cloud Gray, Emerald Green) and the 80/15/5 color rule.
- **Chart.js:** External library for rendering the line/area chart. Must be installed via `pnpm add chart.js`.

## ✅ Acceptance Criteria

- [ ] **AC-1:** Interactive sliders for **Initial Investment**, **Annual Interest Rate**, **Annual Inflation Rate**, and **Investment Period (Years)** are rendered with accessible labels.
- [ ] **AC-2:** Mobile-First layout: controls stack vertically on viewports ≤ 768px and shift to a side panel on desktop (> 768px).
- [ ] **AC-3:** Chart displays two lines: **Nominal Balance** (Emerald Green `#00C853`) and **Real Value** (Cloud Gray `#ECEFF1` or `#90A4AE`).
- [ ] **AC-4:** The area between the two lines is shaded with a semi-transparent fill to visually represent the "Wealth Gap."
- [ ] **AC-5:** Chart and summary values update reactively on every slider change with no perceptible lag (target: < 16ms / 60 FPS).
- [ ] **AC-6:** A summary panel displays: `Final Nominal Value`, `Final Real Value`, and `Total Wealth Gap` formatted with the active currency.
- [ ] **AC-7:** All interactive elements (sliders, chart) are keyboard-navigable and screen-reader accessible (WCAG AA).
- [ ] **AC-8:** The component is lazy-loaded via the Angular router at the path `/simulator`.
- [ ] **AC-9:** Unit test coverage ≥ 80% for the component and any feature-specific service.

## 🎛️ Input Fields (Slider Configuration)

| Field                  | Signal Name          | Type     | Min     | Max        | Step   | Default  | Unit |
| ---------------------- | -------------------- | -------- | ------- | ---------- | ------ | -------- | ---- |
| Initial Investment     | `initialInvestment`  | `number` | 0       | 1,000,000  | 1,000  | 10,000   | $    |
| Annual Interest Rate   | `annualInterestRate`  | `number` | 0       | 30         | 0.5    | 8        | %    |
| Annual Inflation Rate  | `annualInflationRate` | `number` | 0       | 50         | 0.5    | 4        | %    |
| Investment Period       | `years`              | `number` | 1       | 50         | 1      | 20       | yrs  |

> **Note:** `monthlyContribution` from the `WealthGapInput` interface should default to `0` for the initial version. It can be exposed as a future enhancement slider.

## 🛠️ Technical Details

### Key Interfaces (consumed from US 1.3)

```typescript
// Already defined in @shared/utils/finance-math.ts
import { WealthGapInput, WealthGapResult, YearEntry } from '@shared/utils/finance-math';
```

### Component Signal Architecture

```typescript
// Component signals (local state)
initialInvestment = signal(10_000);
annualInterestRate = signal(8);
annualInflationRate = signal(4);
years = signal(20);

// Derived computed signal — recomputes reactively on any slider change
projection = computed<WealthGapResult>(() => {
  const input: WealthGapInput = {
    initialInvestment: this.initialInvestment(),
    monthlyContribution: 0,
    annualInterestRate: this.annualInterestRate(),
    annualInflationRate: this.annualInflationRate(),
    years: this.years(),
  };
  return computeWealthGap(input);
});
```

### Chart.js Configuration

- **Type:** `line`
- **Datasets:**
  - Dataset 1 — *Nominal Balance*: `borderColor: '#00C853'`, `backgroundColor: 'rgba(0, 200, 83, 0.1)'`, `fill: false`
  - Dataset 2 — *Real Value*: `borderColor: '#90A4AE'`, `backgroundColor: 'rgba(144, 164, 174, 0.1)'`, `fill: '-1'` (fill between datasets to create the "gap" area)
- **Labels (X-axis):** Year numbers from `yearlyBreakdown[].year`
- **Y-axis:** Currency-formatted values
- **Responsive:** `true`
- **Maintain Aspect Ratio:** `false`
- **Animation:** `duration: 0` (disable animation for 60FPS slider interaction)
- **Plugins:** Tooltip enabled with currency formatting

### Files to be Created/Modified

| File Path                                                                 | Action   | Description                                                                              |
| ------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `src/app/features/compound-interest/compound-interest.ts`                 | **Create** | Smart component (container). Holds signals, slider bindings, and computed `projection`.   |
| `src/app/features/compound-interest/compound-interest.html`               | **Create** | Template with sliders, chart canvas, and summary panel.                                   |
| `src/app/features/compound-interest/compound-interest.scss`               | **Create** | Scoped styles: mobile-first flex layout, slider styling, chart container.                 |
| `src/app/features/compound-interest/compound-interest.spec.ts`            | **Create** | Unit tests using `@testing-library/angular` for slider interactions and signal reactivity. |
| `src/app/features/compound-interest/compound-interest-chart.service.ts`   | **Create** | Feature-specific service to encapsulate Chart.js initialization, update, and destroy.      |
| `src/app/features/compound-interest/compound-interest-chart.service.spec.ts` | **Create** | Unit tests for the chart service (data mapping, config generation).                       |
| `src/app/features/compound-interest/compound-interest.model.ts`            | **Create** | Feature-specific types/interfaces (e.g., `ChartDataset`, `SliderConfig`) if needed.       |
| `src/app/app.routes.ts`                                                    | **Modify** | Add lazy-loaded route: `{ path: 'simulator', loadComponent: () => ... }`.                 |

### Component Folder Structure (per AGENTS.md conventions)

```text
src/app/features/
└── compound-interest/
    ├── compound-interest.ts                        # Smart component
    ├── compound-interest.html                      # Template
    ├── compound-interest.scss                      # Styles
    ├── compound-interest.spec.ts                   # Unit tests
    ├── compound-interest-chart.service.ts           # Chart.js wrapper service
    ├── compound-interest-chart.service.spec.ts      # Service tests
    └── compound-interest.model.ts                   # Feature-specific models
```

## 📐 Steps to Complete

### Phase 1: TDD Setup (Red Phase)

1. Create `compound-interest.spec.ts` with failing tests:
   - **Test 1 (Signal Response):** Render component → change `initialInvestment` signal to `50,000` → assert `projection()` recalculates with updated `finalNominalValue`.
   - **Test 2 (Chart Data Mapping):** Assert that `projection().yearlyBreakdown` produces an array with `years()` entries, each containing valid `nominalValue` and `realValue`.
   - **Test 3 (Default Values):** Assert default signal values match the specification table above.
   - **Test 4 (Slider Rendering):** Assert that 4 range inputs are rendered with correct `min`, `max`, `step`, and `aria-label` attributes.

2. Create `compound-interest-chart.service.spec.ts` with failing tests:
   - **Test 5 (Config Generation):** Given a `WealthGapResult`, assert the service returns a valid Chart.js config with 2 datasets.
   - **Test 6 (Dataset Colors):** Assert dataset 1 uses `#00C853` and dataset 2 uses `#90A4AE`.
   - **Test 7 (Destroy):** Assert calling `destroy()` cleans up the Chart.js instance.

### Phase 2: Implementation (Green Phase)

3. Implement `compound-interest-chart.service.ts` to satisfy tests 5–7.
4. Implement `compound-interest.ts` component with signals and `computed()` projection.
5. Create `compound-interest.html` template with:
   - A `<section>` for sliders with `<label>` + `<input type="range">` per field.
   - A `<canvas>` element for Chart.js rendering.
   - A `<section>` for the summary panel showing formatted values.
6. Create `compound-interest.scss` with mobile-first responsive layout.
7. Update `app.routes.ts` with the lazy-loaded route.

### Phase 3: Polish & Refactor

8. Verify all tests pass → refactor for clarity, extract duplicated logic.
9. Run accessibility audit (axe-core) → fix any violations.
10. Test responsive layout at 375px, 768px, and 1440px viewports.
11. Verify 60FPS performance by profiling slider interactions in Chrome DevTools.

## 🧪 TDD Plan (Detailed Test Cases)

### Component Tests (`compound-interest.spec.ts`)

| #  | Test Name                                            | Input                                  | Expected Outcome                                                                   |
| -- | ---------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| T1 | should render with default slider values             | Component init                         | `initialInvestment() === 10000`, `annualInterestRate() === 8`, `years() === 20`     |
| T2 | should update projection when initialInvestment changes | Set `initialInvestment` to `50,000`    | `projection().finalNominalValue` > 50,000 (due to compound growth)                  |
| T3 | should return correct number of yearly entries       | `years = 10`                           | `projection().yearlyBreakdown.length === 10`                                        |
| T4 | should render 4 slider inputs                        | Component init                         | `screen.getAllByRole('slider').length === 4`                                        |
| T5 | should have accessible labels on all sliders         | Component init                         | Each slider has a matching `aria-label` or associated `<label>`                     |
| T6 | should show summary values formatted as currency     | Default values                         | Summary panel contains `$` symbol and formatted numbers                             |
| T7 | should produce 0 gap when inflation is 0%            | `annualInflationRate = 0`              | `projection().totalGap === 0`                                                       |
| T8 | should produce positive gap when inflation > 0       | Default values (inflation = 4%)        | `projection().totalGap > 0`                                                         |

### Service Tests (`compound-interest-chart.service.spec.ts`)

| #  | Test Name                                          | Input                                    | Expected Outcome                                       |
| -- | -------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------ |
| T9 | should generate Chart.js config with 2 datasets    | Valid `WealthGapResult`                  | Config object has `data.datasets.length === 2`          |
| T10| should use Emerald Green for nominal dataset       | Valid config                             | `datasets[0].borderColor === '#00C853'`                 |
| T11| should use Gray for real value dataset             | Valid config                             | `datasets[1].borderColor === '#90A4AE'`                 |
| T12| should map year labels from yearlyBreakdown        | Breakdown with 5 entries                 | `data.labels === [1, 2, 3, 4, 5]`                      |
| T13| should set animation duration to 0                 | Any config                               | `options.animation.duration === 0`                      |
| T14| should destroy chart instance on cleanup           | Active chart                             | Chart instance is `null` after `destroy()`              |

## ♿ Accessibility Requirements (WCAG AA)

- **Sliders:** Each `<input type="range">` must have an associated `<label>` element using `for`/`id` binding, plus `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext` (with formatted current value).
- **Chart:** Include an `aria-label` on the `<canvas>` element describing the chart purpose (e.g., `"Line chart showing nominal balance vs real value over time"`). Provide an `aria-live="polite"` region for the summary panel so screen readers announce updates.
- **Keyboard Navigation:** All sliders must be operable via Arrow keys. Focus order must follow the logical layout: sliders → summary → chart.
- **Color Contrast:** Ensure chart line colors meet minimum 3:1 contrast against the chart background (per WCAG 1.4.11 Non-text Contrast).
- **Focus Indicators:** Visible focus rings on all interactive elements following the design system tokens.

## 🚀 Non-Functional Requirements

- **Performance:**
  - Slider-to-chart update latency must be < 16ms (60 FPS target).
  - Disable Chart.js animations (`animation.duration: 0`) to ensure instant visual feedback.
  - Computation for a 50-year projection must execute in < 1ms (guaranteed by the pure engine in US 1.3).
- **Responsiveness:**
  - Breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop).
  - Chart must use `responsive: true` and `maintainAspectRatio: false` settings.
  - Controls must not overflow on a 375px-wide viewport.
- **Bundle Size:**
  - Chart.js should be tree-shaken. Only import: `Chart`, `LineController`, `LineElement`, `PointElement`, `LinearScale`, `CategoryScale`, `Filler`, `Tooltip`.
- **Security:**
  - All slider inputs must be validated: no negative values, no values outside defined min/max ranges.
  - No user data is sent to any external endpoint in this feature.
- **Maintainability:**
  - All color values in the chart must reference CSS variables or constants from the design system — no hardcoded hex values in the component.
  - The chart service must be self-contained and testable in isolation.
