# US1.2: Global Design System (Tokens, Variables & PrimeNG Theme)

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a UX expert,** I want to define the core CSS variables, PrimeNG theme customization, and typography system.

## Acceptance Criteria
- [ ] All design tokens defined in `src/styles.css` `@theme` block.
- [ ] PrimeNG themed via `tailwindcss-primeui` (Deep Blue=primary, Emerald Green=success/CTA, Soft Red=danger).
- [ ] `Inter` font loaded and configured globally.
- [ ] Base layer styles for body, headings, and form elements.
- [ ] Utility classes: `.btn-primary` (Emerald Green), `.btn-secondary` (Deep Blue), `.card-fintech`.
- [ ] Storybook story for design system showcase (colors, typography, buttons).

## Design System Rules
*   **80/15/5 Rule:** Core of the experience
    *   **80% Base Layer:** Deep Blue (`#1A3C6E`) / Cloud Gray (`#ECEFF1`) - For institutional trust & background
    *   **15% Action/Info:** Teal (`#009688`) / Success - Secondary actions and UI
    *   **5% Conversion:** Emerald Green (`#00C853`) - For CTA buttons ONLY.
*   **Danger/Alert:** Soft Red (`#D32F2F`) - only to be used for indicating severe inflation/losses or validation errors.

## Engineering Notes
Targeting `tailwindcss-primeui` styling for `80/15/5` ratio compliance. TDD required for rendering design tokens properly.
