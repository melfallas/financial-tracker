# 🗂️ Financial Tracker — Project Knowledge Index (BMAD)
> **Master Index** · **Single Source of Truth** · **Version:** 1.0.0
> This document centralizes references to all strategic, architectural, and design artifacts.

---

## 🚀 1. Strategic & Business Layer (John - PM)
*Foundational documents defining the "Why" and "What" of the project.*

- **[PRD.md](./PRD.md)**: Product Requirements Document. Goals, user personas, and core features.
- **[Backlog.md](./Backlog.md)**: User stories, epics, and TDD acceptance criteria.
- **[Dependency-Analysis.md](./Dependency-Analysis.md)**: **Strategic Roadmap** — Mermaid tree, Golden Path sequence, and execution constraints.
- **[PO_Checklist.md](./PO_Checklist.md)**: Quality gate checklist for Product Owner validation.

---

## 🏗️ 2. Architectural Layer (Winston - Architect)
*Technical standards, structure, and data persistence strategies.*

- **[Architecture.md](./Architecture.md)**: Technical architecture, directory structure (Core/Shared/Features), and standards.
- **[Architecture-Data-Schema.md](./Architecture-Data-Schema.md)**: **Technical Spec** for Interaction Logging (US1.5) — IndexedDB schema, Full State Snapshots, and Silent Sync strategy.
- **[Architecture-Signal-Flow.md](./Architecture-Signal-Flow.md)**: **Technical Spec** for Signal Architecture & Math Engine (US1.1/1.4) — Single source of truth, computed signal caching, and framework-independent math.
- **[AGENTS.md](../AGENTS.md)**: Rules, roles (Winston, Sally, Angi), and coding standards source of truth.
- **[PROJECT_CONTEXT.md](./BMAD%20Agents%20Artifacts/PROJECT_CONTEXT.md)**: Continuity Mega-Prompt with the project's essence for fast agent onboarding.

---

## 🎨 3. Product Design & UX Layer (Sally - UX/UI)
*Design system, visual specifications, and interaction physics.*

- **[Frontend Specification.md](./Product%20Design/Frontend%20Specification.md)**: Narrative scroll definition, 80/15/5 rule theory, and component mapping.
- **[Atoms-and-Molecules.md](./Product%20Design/Atoms-and-Molecules.md)**: **Master Design Spec**. Color tokens, typography, and reusable UI building blocks.
- **[Organisms-Hero-And-Navbar.md](./Product%20Design/Organisms-Hero-And-Navbar.md)**: **High-Fidelity Spec** for the First Impression — Clean & Split layout, Headroom scroll navbar, and performance-optimized entry animations.
- **[Organisms-Wealth-Gap-Chart.md](./Product%20Design/Organisms-Wealth-Gap-Chart.md)**: **High-Fidelity Spec** for the emotional core (interactivity, chart physics, and tooltips).
- **[Organisms-Lead-Capture-Flow.md](./Product%20Design/Organisms-Lead-Capture-Flow.md)**: **High-Fidelity Spec** for the conversion flow (In-place transformation and success states).
- **[Organisms-Market-Intelligence-Widgets.md](./Product%20Design/Organisms-Market-Intelligence-Widgets.md)**: **High-Fidelity Spec** for the Market Dashboard Band (Currency Devaluation, Fear & Greed Index, Market Data Cards).
- **[Organisms-Retirement-Simulator.md](./Product%20Design/Organisms-Retirement-Simulator.md)**: **High-Fidelity Spec** for the Retirement Simulator — 3-state persistent stepper, Threat/Hope narrative, Nest Egg chart, and Freedom Date animation.
- **[Organisms-Booking-Screen.md](./Product%20Design/Organisms-Booking-Screen.md)**: **High-Fidelity Spec** for the Final Conversion Step — Modal overlay, Calendly integration with Magic Pre-fill, and Homework Success state.
- **[Organisms-Cost-Of-Waiting-Banner.md](./Product%20Design/Organisms-Cost-Of-Waiting-Banner.md)**: **High-Fidelity Spec** for the urgency-building micro-hook, with scroll-reveal animations and Signal synchronization.
- **[Organisms-CDP-Comparator.md](./Product%20Design/Organisms-CDP-Comparator.md)**: **High-Fidelity Spec** for the logical proof (US3.3), side-by-side KPI comparison of bank rates vs market returns, and institutional shaming logic.
- **[Organisms-PDF-Report.md](./Product%20Design/Organisms-PDF-Report.md)**: **High-Fidelity Spec** for the Lead Magnet deliverable (US2.4) — Layout, Chart.js Base64 export, and the Page 2 QR code conversion anchor.
- **[Organisms-Footer.md](./Product%20Design/Organisms-Footer.md)**: **High-Fidelity Spec** for the Global Footer — Emerald pre-footer CTA, Deep Blue 'Vault' design, Trust Badges, and explicit legal disclaimers.
- **[Organisms-I18n-Currency-Fit.md](./Product%20Design/Organisms-I18n-Currency-Fit.md)**: **Logic & UX Spec** for global currency switching, rounding rules (CRC decimals), and PDF multi-currency integration.
- **[Organisms-Wishlist-Board.md](./Product%20Design/Organisms-Wishlist-Board.md)**: **Gamification Spec** for the emotional goal playground. Emoji-based cards, isolated savings math, and IndexedDB persistence.
- **[Organisms-Email-Confirmation.md](./Product%20Design/Organisms-Email-Confirmation.md)**: **Email UI Spec** for the US2.3 Lead Confirmation. HTML Table layout, Deep Blue institutional branding, and embedded Calendly CTA.

---

## 🛠️ 4. Implementation & Infrastructure
*Configuration and tooling for the project.*

- **[core-config.yaml](../.bmad-core/core-config.yaml)**: BMAD-core tool configuration and essential file loading.
- **[package.json](../package.json)**: Core dependencies (Angular 21, Tailwind v4, PrimeNG).

---

## 🌳 5. Prototype & Assets
- **[Prototype Folder](./Product%20Design/prototype/)**: HTML/CSS/JS Sandbox for initial design validation.
- **[Design Output (PNGs)](./Product%20Design/prototype/designoutput/)**: Reference images for the "Clear" aesthetic.

---
*— Generated by BMAD Team (John, Winston, Sally) · 2026-02-22*
