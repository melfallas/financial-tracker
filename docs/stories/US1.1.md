# US1.1: Project Initialization (Architectural Scaffold)

**Epic:** Epic 1 (Core Foundations & Technical Scaffold)
**Priority:** P0 (MVP)

## Description
**As a developer,** I want to set up an Angular 21 project with Tailwind v4, PrimeNG, Chart.js, and the Core/Shared/Features/Infrastructure directory structure.

## Acceptance Criteria
- [ ] Angular 21+ initialized with `pnpm`.
- [ ] Tailwind CSS v4 configured with `@theme` design tokens (80/15/5 system, Deep Blue `#1A3C6E`).
- [ ] PrimeNG installed with `tailwindcss-primeui` theme integration.
- [ ] Chart.js and `ng2-charts` installed and configured.
- [ ] Storybook installed and configured for Angular standalone components.
- [ ] Core/Shared/Features/Infrastructure directory structure created.
- [ ] No `.component` suffix in filenames or class names.
- [ ] `tsconfig.json` aliases configured (`@shared/*`, `@core/*`, `@features/*`, `@env/*`).
- [ ] GitHub Actions CI workflow created (build + test).
- [ ] `404.html` created for SPA routing on GitHub Pages.

## Engineering Notes & Context
*   **Architecture Layer:** `Architecture.md` section architecture and `Architecture-Signal-Flow.md`.
*   **Agent rule requirement:** "Follow AGENTS.md coding standards strictly." No standalone: true in decorator as per strict guidelines.
*   **Quality Gate:** Coverage minimum is 80%. TDD is mandatory.
