# US3.2: Retirement Simulator (Nest Egg)

**Epic:** Epic 3 (Financial Simulators & Interactive Tools)
**Priority:** P0 (MVP)

## Description
**As a user,** I want a guided experience (stepper) to simulate my retirement nest egg, understanding exactly when I can achieve financial freedom and the impact of inflation on that date.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Retirement projection logic tested in `finance-math.spec.ts` (US1.4 completion required).
- [ ] Implement a **3-state in-place Stepper** (§Organisms-Retirement-Simulator):
    - **Step 1:** Current Situation (Age, Savings, Monthly contribution).
    - **Step 2:** Your Goal (Retirement age, Expected return, Inflation).
    - **Step 3:** Results (Threat Block, Hope Block, Nest Egg Chart).
- [ ] **Data Sync:** `inflationRate` and `expectedReturn` signals must be **synchronized** with the Wealth Gap Chart via parent Signal ownership.
- [ ] **Interaction Physics:**
    - Odometer-style count-up for "Run Out" age (Soft Red, 800ms).
    - Count-down for "Freedom Date" (Emerald Green, 1.2s).
    - `canvas-confetti` burst on first success render.
    - Chart.js sweep animation (1.0s).
- [ ] **Warning State:** If `inflationRate >= expectedReturn`, show the "Independence Unreachable" Alert Block.
- [ ] **Navigation:** Back button preserves values; Results view includes "Edit" buttons for each section.

## Technical Details

### Component Location
`src/app/features/retirement-simulator/retirement-simulator.ts`

### Signals & State
- `currentStep = signal<'step1' | 'step2' | 'results'>('step1')`.
- All inputs (`currentAge`, `savings`, etc.) as writable signals.
- `freedomDate = computed(...)` using the math utility.

### Steps to Complete:
1. Create the stepper UI using PrimeNG or custom Tailwind layout.
2. Integrate `M2 SliderControl` atoms for all inputs.
3. Hook into the parent `home-page.ts` shared signals for inflation/returns.
4. Implement the "Result Blocks" with transition delays.
5. Setup `canvas-confetti` (lazy-load via `@defer`).
6. Configure the "Nest Egg" chart with dual colors (Emerald Green vs Soft Red expense line).

## Non-Functional Requirements
- **Psychological Impact:** The sequence must build tension (Threat) before relief (Hope).
- **Responsive:** Stepper and Results must be perfectly readable on mobile screens (A4-like card layout).
