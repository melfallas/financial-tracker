# US1.3: Storybook Setup & Component Documentation

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want Storybook configured for Angular 21 standalone components with PrimeNG and Tailwind to enable **Island Development** and visual regression testing.

## Acceptance Criteria
- [ ] `.storybook/` folder configured and optimized.
- [ ] Storybook `preview.ts` configured to load Tailwind CSS and PrimeNG global styles.
- [ ] Viewport presets established: `Mobile (375px)`, `Tablet (768px)`, `Desktop (1280px)`.
- [ ] Accessibility addon (`@storybook/addon-a11y`) configured.
- [ ] Create at least one reusable story for a base atom (e.g., `SharedButton`).

## Technical Details

### Configuration Requirements:
- **Zoneless Support:** Ensure Storybook's Angular provider includes `provideExperimentalZonelessChangeDetection()`.
- **Global Styles:** Ensure `src/styles.css` is imported in `.storybook/preview.ts`.
- **Standalone:** All components in stories must be standalone.

### Steps to Complete:
1. `npx storybook@latest init` (if not done in US1.1).
2. Configure `.storybook/main.ts` for Angular 21.
3. Update `.storybook/preview.ts` with decorators for PrimeNG and Tailwind.
4. Set up viewport parameters in `preview.ts`.
5. Create a `shared/components/button/button.stories.ts` as a reference.

## Non-Functional Requirements
- **Consistency:** Every feature component created from this point forward MUST have a `.stories.ts` file.
- **Accessibility:** Ensure AXE checks are visible in the Storybook panel.
