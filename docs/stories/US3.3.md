# US3.3: CDP vs. Market Comparator

**Epic:** Epic 3 (Financial Simulators & Interactive Tools)
**Priority:** P1 (High)

## Description
**As a user,** I want to compare the returns of a "safe" Bank CDP vs. the broader Stock Market to understand the opportunity cost of low-interest savings.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Unit tests for Side-by-Side comparison math and Signal reactivity.
- [ ] Implement two **KPI Cards** (§Organisms-CDP-Comparator):
    - **Card 1 (The Bank):** Cloud Gray/Charcoal theme. Shows yield based on a configurable Bank Rate.
    - **Card 2 (The Market):** Deep Blue/Emerald Green theme. Shows yield based on Market Average.
- [ ] **Interaction Physics:**
    - Bank Rate Slider (`0%` to `15%`) triggers real-time Count-Up animations (300ms) on both cards.
    - Horizontal display on Desktop; Vertical "VS" stack on Mobile.
- [ ] **Institutional Shaming:** Display "The Cost of Inaction" (The Gap) with Soft Red warning icons if the difference is significant.
- [ ] **Data Sync:** Inherit `initialCapital`, `expectedReturn`, and `timeHorizon` from the parent page Signals. Fallback to `APP_UI_CONFIG` if not available.

## Technical Details

### Component Location
`src/app/features/cdp-vs-market/cdp-comparator.ts`

### Math Hooks
- **Bank Yield:** `P * (1 + r_cdp)^t`.
- **Market Yield:** `P * (1 + r_market)^t`.
- **The Gap:** `marketYield - bankYield`.

### Steps to Complete:
1. Create the card-based UI with PrimeNG `Card` or Tailwind flexbox.
2. Inject `APP_UI_CONFIG` for default rates.
3. Bind the local `userCdpRate` signal to a slider.
4. Implement computed signals for yields and the gap.
5. Setup the count-up animation for text changes.
6. Verify responsive layout for the "VS" stack.

## Non-Functional Requirements
- **Impact:** The comparison must be "inescapable" — making it clear that staying in a bank CDP is a mathematical loss.
- **Performance:** Sub-millisecond reactivity on slider drag.
