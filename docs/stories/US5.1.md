# US5.1: Floating CTA Button

**Epic:** Epic 5 (Consultation Booking & Scheduling)
**Priority:** P0 (MVP)

## Description
**As a user,** I want a persistent, high-visibility button to schedule my consultation at any point during my discovery journey.

## Acceptance Criteria
- [ ] Implement an **Emerald Green (#00C853)** pill-shaped floating action button (FAB).
- [ ] **Positioning:** Fixed at bottom-right of the viewport (`right: 2rem`, `bottom: 2rem`).
- [ ] **Visual Spec:**
    - Icon: Calendar or Phone icon from Lucide/PrimeIcons.
    - Shadow: `shadow-premium` (Deep Blue tinted shadow).
    - Label: "Schedule Consultation" (Desktop only, Icon only on Mobile).
- [ ] **Interaction Physics:**
    - Hover: Scale up (1.05x).
    - Drag/Scroll: Stays fixed. Hide temporarily if user is in an active form (optional logic).
- [ ] **Accessibility:** Explicit `aria-label="Schedule a consultation"`. High contrast white-on-green.
- [ ] Storybook story for `Desktop (Icon+Text)` and `Mobile (Icon only)` states.

## Technical Details

### Component Location
`src/app/features/floating-cta/floating-cta.ts`.

### Steps to Complete:
1. Create the standalone component.
2. Use Tailwind `fixed bottom-8 right-8` classes.
3. Integrate with the `BookingModal` service to trigger `open()`.
4. Add responsive hide/show logic for the text label.
5. Apply the premium shadow and hover transitions.

## Non-Functional Requirements
- **Z-Index:** Ensure it sits above all other organisms (e.g., `z-50`).
- **Visibility:** Implement a "Delayed Appear" — button fades in only after the user has scrolled 20% of the page (to allow the Hero to breathe).
