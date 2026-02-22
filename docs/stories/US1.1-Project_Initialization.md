# User Story 1.1: Project Initialization

## 📋 Description

**As a developer,** I want to set up an Angular 21 project with Tailwind v4 and the BMAD directory structure so that I can start building with clean, scalable patterns.

## ✅ Acceptance Criteria

- [ ] Angular 21+ project initialized.
- [ ] Tailwind CSS v4 configured with custom design tokens (Deep Blue, Emerald Green).
- [ ] Directory structure follows the BMAD core (Core, Shared, Features).
- [ ] Components do NOT use the `.component` suffix in filenames.
- [ ] Strict TypeScript mode and OnPush change detection set as default.

## 🧪 TDD Plan (Tests First)

1. **Directory Structure Test:** Script or check to ensure `src/app/core`, `src/app/shared`, and `src/app/features` exist.
2. **Naming Convention Check:** Ensure no files in `src/app` contain `.component`.
3. **Environment Test:** Verify Angular version and Tailwind v4 presence in `package.json`.

## 🛠️ Implementation Notes

- Use `ng new` with standalone defaults.
- Install `@tailwindcss/vite` (or the appropriate v4 plugin).
- Configure `tsconfig.json` mappings for `@core/*`, `@shared/*`, etc.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in component templates/base.
