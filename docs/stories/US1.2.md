# US1.2: Global Design System (Tokens, Variables & PrimeNG Theme)

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a UX expert,** I want to define the core CSS variables, PrimeNG theme customization, and typography system to enforce the **80/15/5 Rule** across the platform.

## Acceptance Criteria
- [ ] Define the `@theme` block in `src/styles.css` using CSS variables for the 80/15/5 palette.
- [ ] Configure `tailwindcss-primeui` to map PrimeNG `primary`, `success`, `danger`, and `surface` to the respective design tokens.
- [ ] Global typography set to `Inter`, system-ui, sans-serif.
- [ ] Base styles applied to `body`: `bg-cloud-gray`, `text-charcoal`, `antialiased`.
- [ ] Create global utility classes: `.btn-primary` (Emerald Green), `.btn-secondary` (Deep Blue), `.card-fintech`.
- [ ] Storybook story created in `shared/components/design-system.stories.ts` showing colors and typography.

## Technical Details

### Design Tokens (Tailwind v4 `@theme`):
- **Base (80%):** `--color-deep-blue: #1A3C6E`, `--color-cloud-gray: #ECEFF1`, `--color-charcoal: #37474F`.
- **Action (15%):** `--color-teal-bright: #009688`.
- **Conversion (5%):** `--color-emerald-green: #00C853` (strictly for Primary CTAs).
- **Alerts:** `--color-soft-red: #D32F2F`, `--color-warm-orange: #F57C00`, `--color-golden-amber: #FFC107`.

### Integration Logic
- No `::ng-deep` allowed. Use Tailwind utility classes for overrides.
- PrimeNG components must inherit these tokens automatically via the `tailwindcss-primeui` configuration.

### Steps to Complete:
1. Update `src/styles.css` with the `@theme` and `@layer base` blocks defined in `Architecture.md §3`.
2. Configure `tailwind.config.mjs` (or v4 config) to include the primeui plugin.
3. Import `Inter` font in `index.html` or `@import` in CSS.
4. Verify color contrast ratios for accessibility (WCAG AA).
5. Create a "Design System" component in `shared/components/` just for documentation/Storybook.

## Non-Functional Requirements
- **Performance:** CSS bundle size optimization.
- **Accessibility:** All color combinations must pass AXE color contrast checks.
