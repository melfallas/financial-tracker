# US1.1: Project Initialization (Architectural Scaffold)

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want to set up an Angular 21 project with Tailwind v4, PrimeNG, Chart.js, and the Core/Shared/Features/Infrastructure directory structure following the clean architecture defined in the project blueprint.

## Acceptance Criteria
- [ ] Angular 21+ initialized with `pnpm` (Zoneless architecture).
- [ ] Tailwind CSS v4 configured in `src/styles.css` using the `@theme` block with 80/15/5 system colors.
- [ ] PrimeNG installed and integrated via `tailwindcss-primeui` preset.
- [ ] Chart.js and `ng2-charts` installed and configured for Signal-based reactivity.
- [ ] Storybook installed and configured for Angular standalone components with viewport presets.
- [ ] Directory structure created under `src/app/` (core, shared, features, infrastructure).
- [ ] Strictly follow **Flat & Clean** naming convention: No `.component` suffix in filenames or class names.
- [ ] `tsconfig.json` aliases configured: `@shared/*`, `@core/*`, `@features/*`, `@env/*`.
- [ ] GitHub Actions CI workflow created for build and test validation.
- [ ] `404.html` created in `public/` for SPA routing on GitHub Pages.

## Technical Details

### Project Configuration
- **Framework:** Angular 21 (Signals first, No Zone.js).
- **Naming:** Filename `home-page.ts` -> Class `HomePage`. NOT `HomePageComponent`.
- **Zoneless Setup:** Ensure `provideExperimentalZonelessChangeDetection()` is used in `app.config.ts`.

### Directory Map to Create:
```text
src/app/
├── core/             # Services (Currency, i18n, SEO), Repository Interfaces, Tokens
├── shared/           # Utils (finance-math), Types, Reusable atoms, Constants
├── features/         # Organisms (Business modules)
└── infrastructure/   # Persistence implementations (Local, Supabase)
```

### Steps to Complete:
1. `pnpm create angular` (select defaults, ensure v21).
2. Configure `app.config.ts` for Zoneless.
3. Install dependencies: `pnpm add tailwindcss @tailwindcss/postcss postcss autoprefixer primeng @primeng/themes tailwindcss-primeui chart.js ng2-charts`.
4. Install dev dependencies: `npx storybook@latest init`.
5. Setup `src/styles.css` with Tailwind v4 `@theme`.
6. Configure `tsconfig.json` paths.
7. Create folder scaffold with `index.ts` barrel files where applicable.
8. Create `.github/workflows/ci.yml`.

## Non-Functional Requirements
- **Performance:** Initial JS bundle < 150KB (gzipped).
- **Accessibility:** Must pass initial AXE checks on the empty container.
- **TDD:** Scaffold must include base test configuration for `@testing-library/angular`.

## Documentation Updates
- Update `PROJECT_INDEX.md` if directories change.
- Verify `AGENTS.md` adherence.
