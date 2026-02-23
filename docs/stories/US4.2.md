# US4.2: Cost of Waiting Banner & Financial Freedom Countdown

**Epic:** Epic 4 (Market Intelligence & Awareness Widgets)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to see the immediate impact of inflation on my current savings to build the necessary urgency to take action on my financial strategy.

## Acceptance Criteria
- [ ] Implement the **Cost of Waiting Banner** (§Organisms-Cost-Of-Waiting-Banner):
    - Background: High-contrast Deep Blue (#1A3C6E).
    - Inline Input: Simplistic transparent input for "Current Savings" (Synced with `initialCapital` Signal).
    - **Loss Visualization:** Dramatic Count-Up animation (1.2s) showing the Soft Red (#D32F2F) dollar amount lost to inflation over 12 months.
- [ ] **Interaction Physics:**
    - Real-time recalculation when typing a new savings amount (600ms count-up transition).
    - **Smooth Anchor CTA:** Emerald Green button ("Stop the Loss ↓") scrolls directly to the Lead Capture Form.
- [ ] **Shared State:** Link the input to the same Signal used by the Wealth Gap Calculator. Fallback to `config.defaultSavingsAmount` if empty.
- [ ] **Accessibility:** White-on-DeepBlue contrast (Passes WCAG AA).

## Technical Details

### Component Location
`src/app/features/cost-of-waiting/cost-of-waiting.ts`

### Business Logic
- `estimatedLoss = savings * (inflationRate / 100)`.
- Use the `displaySavings` signal to allow local overrides while syncing back to the global state via `effect`.

### Steps to Complete:
1. Create the full-width banner component.
2. Bind the input field with `ngModel` (signals-based) and currency mask.
3. Hook into the `initialCapital` and `inflationRate` signals from the parent page.
4. Implement the Count-Up animation using GSAP or a simple Angular `interval` loop.
5. Create the IntersectionObserver trigger for the initial scroll reveal.
6. Verify mobile stacked layout vs desktop single-row layout.

## Non-Functional Requirements
- **Impact:** This is the primary emotional "speed bump" before conversion. It must be impossible to ignore.
- **Performance:** Animation must be smooth and not block the UI thread.
- **SEO:** Metadata for the page should include keywords related to the "Cost of Inaction."
