# US6.3: Accessibility Audit & Storybook Compliance

**Epic:** Epic 6 (Engagement, Retention & Final Polish)
**Priority:** P0 (MVP)

## Description
**As a product manager,** I want all components to pass WCAG AA standards and be fully documented in Storybook to ensure the platform is inclusive, professional, and maintainable.

## Acceptance Criteria
- [ ] **Accessibility (A11y):**
    - 100% of components pass `AXE-core` automated checks.
    - Focus Management: Visible focus rings on all interactive elements (Teal Bright #009688).
    - ARIA Labels: Guaranteed for all icon-only buttons (Floating CTA, Currency Switcher).
    - Color Contrast: Minimum 4.5:1 ratio for all text (refer to §Atoms-and-Molecules).
- [ ] **Storybook Compliance:**
    - Every Atom, Molecule, and Organism must have a `.stories.ts` file.
    - All logical states (`idle`, `loading`, `error`, `success`) documented as Variants.
    - Accessibility addon active and passing in every story.
- [ ] **Documentation:** `README.md` updated with instructions on how to run Storybook and A11y tests.

## Technical Details

### Tools
- Storybook 8+ with `@storybook/addon-a11y`.
- `cypress-axe` or `playwright-axe` for CI/CD pipeline checks.

### A11y Rules (§Atoms-and-Molecules):
- Deep Blue on Cloud Gray (8.7:1).
- Emerald Green on White (4.6:1).
- Charcoal on Cloud Gray (7.2:1).

### Steps to Complete:
1. Run `npx storybook@latest dev` and review all existing components.
2. Fix any "Needs Review" or "Failed" items in the A11y panel.
3. Ensure `aria-required`, `aria-busy`, and `aria-label` are applied across all forms and CTAs.
4. Implement skip-to-content link for keyboard users.
5. Create a "Global Design System" story showing the full A11y-compliant color palette.

## Non-Functional Requirements
- **Consistency:** If a component doesn't have a story, it is considered "Incomplete."
- **Institutional Quality:** Accessibility is not a feature, but a core architectural requirement.
