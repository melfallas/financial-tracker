# User Story 1.1: Project Initialization (Enriched)

## 📋 Description

**As a developer,** I want to set up and verify the Angular 21 environment, Tailwind v4 integration, and the BMAD directory structure (Core, Shared, Features) to ensure a high-end, scalable, and TDD-ready foundation for the Fin-Tracker Global MVP.

## 🎯 Problem Statement

The project needs a robust technical scaffold that strictly adheres to the standalone component architecture and the "Flat & Clean" naming policy (no `.component` suffixes), while leveraging the performance benefits of Angular's zoneless reactivity and Tailwind CSS v4's modern engine.

## ✅ Acceptance Criteria

- [ ] **Framework & Engine:** Project confirmed on Angular 21.1+ and Vite.
- [ ] **Zoneless Reactivity:** `provideExperimentalZonelessChangeDetection()` is active in `app.config.ts`.
- [ ] **Tailwind v4:** Integrated via `@tailwindcss/vite` and active in global styles.
- [ ] **BMAD Directory Structure:**
  - `src/app/core/`: Services, interceptors, and guards.
  - `src/app/shared/`: Reusable components, pipes, and utilities.
  - `src/app/features/`: Feature-specific modules (Home, Calculator, etc.).
- [ ] **Clean Naming Policy:** NO files or class names contain the `.component` suffix.
- [ ] **Path Aliases:** `tsconfig.json` mappings for `@core/*`, `@shared/*`, and `@features/*`.
- [ ] **TDD Baseline:** Vitest configured for code coverage with an 80% mandatory threshold.

## 🛠️ Technical Details

### Files to be Modified/Created:

- `package.json`: Ensure `tailwindcss` and `@tailwindcss/vite` are present.
- `src/app/app.config.ts`: Configure zoneless and routing.
- `tsconfig.json`: Add compiler options for paths.
- `src/styles.css`: Global Tailwind @theme configuration.
- `vite.config.ts`: Integration of Tailwind v4 plugin.

### Endpoints / External Integration:

- N/A for initialization.

### Steps to Complete:

1. **Dependency Audit:** Verify `pnpm list tailwindcss` and install `@tailwindcss/vite` if missing.
2. **Structure Sync:** Rename/Create folders to match `core`, `shared`, `features`.
3. **Configuration:** Add `provideExperimentalZonelessChangeDetection` to `app.config.ts`.
4. **Alas Configuration:** Map directories in `tsconfig.json` for cleaner imports.
5. **Naming Refactor:** Audit and rename any existing files adhering to the suffix-less rule.
6. **Styles Baseline:** Import `tailwindcss` in `src/styles.css` and define the 80/15/5 color variables.

## 🧪 Quality & TDD

- **Structural Test:** Create a script or spec to verify the directory hierarchy.
- **Coverage Check:** Ensure `npm run test` generates a coverage report.
- **Storybook Baseline:** Initialize Storybook or verify it is ready for "Island Development".

## 🛡️ Non-Functional Requirements

- **Performance:** Initial FCP (First Contentful Paint) < 1s on mobile 3G.
- **Security:** Strict CSP headers configuration in the build pipeline.
- **Accessibility:** Global focus-ring styles and ARIA landmarks defined in the base layout.
