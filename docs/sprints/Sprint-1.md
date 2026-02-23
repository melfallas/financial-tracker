# 🏃 Sprint 1: Foundations & Technical Scaffold
> **Status:** 🟢 ACTIVE · **Dates:** 2026-02-23 to 2026-03-02
> **Goal:** Initialize the Angular 21 project, establish the core design system, and implement the high-precision Math Engine (TDD).

---

## 🎯 Sprint Goal
Establish the technical "Heart" of the Financial Tracker. By the end of this sprint, we will have a functional, styled project structure with a fully tested mathematical engine ready to feed the visual charts.

## 📋 Prioritized User Stories (Backlog)

| ID | Title | Priority | Complexity | Owner | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US1.1** | [Project Initialization](../stories/US1.1.md) | P0 | Medium | Angi (Dev) | 🟢 DONE |
| **US1.2** | [Global Design System](../stories/US1.2.md) | P0 | Medium | Angi (Dev) | 🟢 DONE |
| **US1.3** | [Storybook Setup](../stories/US1.3.md) | P1 | Small | Angi (Dev) | 📂 TODO |
| **US1.4** | [Wealth Gap Engine (TDD)](../stories/US1.4.md) | P0 | High | Angi (Dev) | 🟢 DONE |
| **US1.5** | [Repository Pattern](../stories/US1.5.md) | P0 | Medium | Angi (Dev) | 📂 TODO |

---

## 🛑 Definition of Done (DoD)
A story is considered **DONE** only when:
- [ ] Code follows `AGENTS.md` standards (Signals, No `.component` suffix).
- [ ] Unit tests pass with **>80% coverage** (100% for US1.4).
- [ ] Component is documented in **Storybook** (if applicable).
- [ ] **A11y:** Passes AXE checks (WCAG AA).
- [ ] **PO Review:** Validated against acceptance criteria.

---

## 🛠️ Execution Strategy
1. **Scaffold First:** Complete `US1.1` to unblock all other tasks.
2. **Tokens & Testing:** Parallelize `US1.2` (Styles) and `US1.4` (Math Logic).
3. **Persistence:** Implement `US1.5` once the shared types are stable from `US1.4`.

---
*— John, Product Owner · Financial Tracker · 2026-02-23*
