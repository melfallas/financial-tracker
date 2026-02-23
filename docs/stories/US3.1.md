# US3.1: Wealth Gap Chart (Organism)

**Epic:** Epic 3 (Financial Simulators & Interactive Tools)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to visualize the divergence between my nominal wealth and my real purchasing power through an interactive chart that responds fluidly to my inputs.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Unit tests for Signal-based reactivity and dataset mapping written first.
- [ ] Use `ng2-charts` (Chart.js) to render a **dual-line area chart**.
- [ ] **Visual Specs (§Organisms-Wealth-Gap-Chart):**
    - **Nominal Growth:** Emerald Green (#00C853) smooth curve.
    - **Real Purchasing Power:** Deep Blue (#1A3C6E) dashed line.
    - **The Gap (Loss):** Soft Red (#D32F2F) shaded area (Fill between datasets).
- [ ] **Interaction Physics:**
    - **Elasticity:** 150ms smooth transition when dragging sliders.
    - **Entry Sweep:** 1.0s left-to-right draw animation upon viewport intersection.
    - **Focused Tooltip:** Only display the negative "Erosion: -$X" value on hover.
    - **Critical Alert:** Subtle visual "pulse" on the Red area if inflation > 8%.
- [ ] Summary Card (M6) with odometer-style count-up for the "Total Erosion" amount (1.5s duration).
- [ ] Fully documented Storybook stories with mobile and desktop viewport validation.

## Technical Details

### Component Location
`src/app/features/wealth-gap-chart/wealth-gap-chart.ts`

### Chart Configuration
- `tension: 0.4` for smooth curves.
- `responsive: true`, `maintainAspectRatio: false`.
- Custom tooltip callback for "Erosion" isolation.
- Use `ViewChild` for base64 export (US2.2).

### Steps to Complete:
1. Create component structure.
2. Bind input signals to the `finance-math.ts` utility.
3. Configure `ChartConfiguration` object with brand colors.
4. Integrate `IntersectionObserver` or scroll-reveal logic for the entry animation.
5. Create the count-up logic for the summary molecule.
6. implement the 8% inflation pulse effect via Chart.js animation update.

## Non-Functional Requirements
- **Performance:** Maintain 60FPS during slider interactions.
- **Accessibility:** Ensure high contrast and support keyboard focus for tooltips if possible.
