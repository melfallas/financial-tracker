# User Story 1.2: Global Design System

## 📋 Description

**As a UX expert,** I want to define the core CSS variables and design tokens for Deep Blue, Cloud Gray, and Emerald Green so that the entire modern Angular application maintains a high-end, premium visual consistency. This foundational design system will feed into all subsequent UI components, ensuring the adherence to the 80/15/5 color utilization rule.

## 🎯 Full Functionality Details

Implement a global design system using Tailwind CSS (v4) and native CSS variables that supports:
- **Primary Color (80%):** Deep Blue (`#1A3C6E`) for deep, professional backgrounds and core structure.
- **Secondary Color (15%):** Cloud Gray (`#ECEFF1`) for cards, surfaces, and readable text areas.
- **Accent Color (5%):** Emerald Green (`#00C853`) strictly reserved for primary call-to-action buttons, success states, and key highlights.
- **Typography:** 'Inter' (or another modern geometric sans-serif like 'Outfit' or 'Roboto') set as the default application font to enforce a clean, premium aesthetic.
- **Micro-interactions:** Base utility classes or variables for smooth transitions and hover states to make the interface feel responsive and dynamic.
- **Glassmorphism:** Reusable utility classes for frosted glass effects on premium overlays and floating elements.

## ✅ Acceptance Criteria & Completion Steps

- [ ] Tailwind v4 configuration (`tailwind.config.js` or equivalent v4 config) is strictly updated or configured to include the exact 80/15/5 color tokens.
- [ ] Root CSS variables (`--color-primary-navy`, `--color-secondary-gray`, `--color-accent-emerald`) are defined in the main styles file.
- [ ] Global typography is globally applied to the `body` tag, overriding browser defaults.
- [ ] At least one baseline CSS class for glassmorphism (e.g., `.glass-panel`) is defined.
- [ ] No generic/default browser styles remain for `body`, `h1`-`h6`, or `p` tags.

## 🛠️ Files to be Modified (Architecture & Best Practices)

- `src/styles.scss` (or `src/styles.css`): Update with `@theme` variables, root CSS properties, and global resets. Ensure we are following standard Angular global styling practices.
- `tailwind.config.ts` (or equivalent file, if using v3/v4 config wrapper): Define theme extensions, colors, and font families.
- `src/index.html`: Import the chosen Google Font ('Inter', 'Roboto', or 'Outfit') in the `<head>` section securely.

## 🧪 Documentation & Testing (TDD Plan)

1. **Unit/Integration Tests Setup:**
   - **CSS Variable Check:** Write a UI test asserting that the computed style `--color-primary-navy` exists on the root element.
   - **Typography Check:** Verify that the `body` element's computed `font-family` includes the custom font.
2. **Accessibility (a11y) & Contrast Rules:** 
   - Ensure tests use axe-core to verify WCAG AA compliance.
   - Verify Emerald Green text/buttons maintain a minimum contrast ratio of 4.5:1 against respective backgrounds.

## 🚀 Non-Functional Requirements

- **Performance:** Font loading must use `display: swap` to prevent Flash of Invisible Text (FOIT) and ensure fast Largest Contentful Paint (LCP).
- **Accessibility:** All global colors must support WCAG AA standard contrast ratios.
- **Maintainability:** Avoid hardcoding hex values in component stylesheets. Developers MUST use the defined CSS variables or Tailwind utility classes.
