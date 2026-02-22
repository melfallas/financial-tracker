# User Story 1.2: Global Design System

## 📋 Description

**As a UX expert,** I want to define the core CSS variables for Deep Blue, Cloud Gray, and Emerald Green so that the entire app maintains high-end visual consistency.

## ✅ Acceptance Criteria

- [ ] Tailwind v4 configuration includes the 80/15/5 color tokens.
- [ ] Root CSS variables defined for Deep Blue (#1A3C6E), Cloud Gray (#ECEFF1), and Emerald Green (#00C853).
- [ ] Global typography set to 'Inter' or similar high-end sans-serif.

## 🧪 TDD Plan (Tests First)

1. **CSS Variable Check:** Test that `--color-primary-navy` or similar exists in the computed styles of the root element.
2. **Typography Check:** Verify that the `body` font-family is correctly applied.
3. **Color Contrast Check:** (If using automated tools) Verify that Emerald Green buttons have sufficient contrast against backgrounds.

## 🛠️ Implementation Notes

- Update `src/styles.css` with Tailwind `@theme` variables.
- Ensure the 5% Emerald Green is exclusively used for primary actions.
- Use glassmorphism classes where appropriate for a "premium" feel.
