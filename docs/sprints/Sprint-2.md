# Sprint 2: The Visual Hook & Financial Evidence

## Goals

Transform the technical foundations into a compelling visual experience. This sprint focuses on the "Above the fold" landing experience and the core interactive simulators that prove the financial value proposition to the user.

## User Stories

| ID        | Story                                         | Priority | Size   | Owner      | Status  |
| :-------- | :-------------------------------------------- | :------- | :----- | :--------- | :------ |
| **US4.1** | [Hero Section & Navbar](../stories/US4.1.md)  | P0       | Medium | Angi (Dev) | 🟢 DONE |
| **US3.1** | [Wealth Gap Chart](../stories/US3.1.md)       | P0       | Medium | Angi (Dev) | 🟢 DONE |
| **US3.2** | [Retirement Simulator](../stories/US3.2.md)   | P0       | Medium | Angi (Dev) | 🟢 DONE |
| **US4.3** | [Market Status Widgets](../stories/US4.3.md)  | P1       | Small  | Angi (Dev) | 📂 TODO |
| **US4.2** | [Cost of Waiting Banner](../stories/US4.2.md) | P1       | Medium | Angi (Dev) | 🟢 DONE |

## Definition of Done (DoD)

- [ ] Components use Angular 21 Signals for reactivity.
- [ ] Charts implemented with Chart.js (+ ng2-charts if applicable).
- [ ] Responsive design verified (Mobile/Tablet/Desktop).
- [ ] Interactive elements covered by unit tests (Vitest).
- [ ] Stories created in Storybook for all new organisms.
- [ ] Design adheres to the Premium Aesthetic (Emerald/Deep Blue).

## Technical Strategy

1. **Visual Foundation:** Implement the Navbar and Hero section (US4.1) to establish the layout.
2. **Reactive Simulation:** Integrate the Math Engine (US1.4) with the Wealth Gap Chart (US3.1) using Signals.
3. **Complexity Layer:** Add the Retirement Simulator (US3.2) sharing state with the chart.
4. **Emotional Urgency:** Implement Market Widgets (US4.3) and the Cost of Waiting Banner (US4.2) as derived data views.

## Risks & Mitigations

- **Chart Performance:** Chart.js rendering on mobile. _Mitigation: Throttle input updates and use `OnPush` strategy._
- **Complex UI State:** Multiple sliders affecting the same chart. _Mitigation: Centralize state in a specialized `SimulatorService` using Signals._
