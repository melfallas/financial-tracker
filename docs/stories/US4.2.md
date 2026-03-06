# US4.2: Cost of Waiting Banner & Financial Freedom Countdown

**Epic:** Epic 4 (Market Intelligence & Awareness Widgets)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to see the immediate impact of inflation on my current savings over a customizable period to build the necessary urgency to take action on my financial strategy.

## Acceptance Criteria
- [ ] **Banner Visuals:**
    - Background: High-contrast Deep Blue (#1A3C6E).
    - **Loss Visualization:** Dramatic Count-Up animation (1.2s).
    - **Accessibility Fix:** Use a high-contrast Red (e.g., #FF5252 or lighter) for the loss amount to ensure WCAG AA compliance against the Deep Blue background.
- [ ] **Interactive Inputs (In Order):**
    1. **Current Savings:** Numeric input (Synced with `initialCapital` Signal).
    2. **Time Horizon (Years):** Numeric input (Synced with `years` Signal).
    3. **Inflation Rate (%):** Numeric input (Synced with `annualInflationRate` Signal).
- [ ] **Logic & Sync:**
    - The **Inflation Rate** input must auto-fill from the `WealthGapService` value (or its default).
    - **Dynamic Legend:**
        - If years = 1: Display "en 12 meses".
        - If years > 1: Display "en [X] años".
- [ ] **Interaction Physics:**
    - Real-time recalculation when typing (600ms count-up transition).
    - **Smooth Anchor CTA:** Emerald Green button ("Detén la Pérdida ↓") scrolls directly to the Lead Capture Form.
- [ ] **Language:** UI text in the HTML template must be in **Spanish**. Documentation and code must be in **English**.

## Technical Details

### Component Location
`src/app/features/cost-of-waiting/cost-of-waiting.ts`

### Business Logic
- `estimatedLoss = savings * (Math.pow(1 + (inflationRate / 100), years) - 1)`.
- Use the `displaySavings`, `displayYears`, and `displayInflation` signals to allow local overrides while syncing back to the global state.

### Steps to Complete:
1. Update the component template with the three inputs in the specified order.
2. Implement the compound inflation loss formula.
3. Add the conditional logic for the "12 meses" vs "X años" legend.
4. Improve color contrast for the red text to meet WCAG AA standards.
5. Ensure all UI strings are in Spanish.
6. Verify synchronization with `WealthGapService` signals.

## Non-Functional Requirements
- **Impact:** Primary emotional trigger for conversion.
- **Performance:** Smooth animations (GSAP or RequestAnimationFrame).
- **Accessibility:** Minimum contrast ratio of 4.5:1 for all text.
