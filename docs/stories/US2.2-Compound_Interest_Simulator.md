# User Story 2.2: Compound Interest Simulator (The Wealth Gap Chart)

## 📋 Description

**As a user,** I want to interact with sliders to visualize how my investment grows and how inflation erodes it in real-time.

## ✅ Acceptance Criteria

- [ ] Interactive sliders for Amount, Rate, and Years.
- [ ] Mobile-First layout (Vertical orientation for controls).
- [ ] Chart showing two lines: **Nominal Balance** (Green) and **Real Value** (Red/Gray).
- [ ] 60FPS performance using Angular Signals + OnPush.

## 🧪 TDD Plan (Tests First)

1. **Signal Response Test:** Mock a slider change -> Expect the `projection()` computed signal to update.
2. **Chart Data Test:** Verify that the data passed to Chart.js contains two datasets with correct values.
3. **Responsive Test:** (Storybook) Verify the component doesn't overflow on 375px width.

## 🛠️ Implementation Notes

- Component: `src/app/features/compound-interest/compound-interest.ts`.
- Use `Chart.js` for visualization.
- The area between the two lines represents the "Wealth Gap".
- Adhere to the 80/15/5 rule for chart colors.
