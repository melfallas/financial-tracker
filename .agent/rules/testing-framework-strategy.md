# Testing Framework Strategy — ADR-001

## 🎯 Architectural Decision

**Status:** ACTIVE  
**Date:** 2026-02-25  
**Decided by:** Project Architect

---

## Decision

**Use `ng test` (Angular CLI / Karma) as the ONLY unit testing runner.** Vitest (`pnpm vitest`) is strictly forbidden as a test runner until an explicit architectural migration is approved and communicated.

---

## Context

The project currently has two test infrastructure setups (`ng test` via Karma and `pnpm vitest`). This dual setup creates inconsistency, increases maintenance overhead, and causes unreliable CI. A strategic decision has been made to:

1. **Phase 1 (Current):** Use exclusively `ng test` to run unit tests.
2. **Phase 2 (Future):** Migrate to Vitest when the Angular ecosystem matures its Vitest integration.

---

## Rules — MANDATORY (Treat as BLOCKERS)

### 🚫 RULE 1 — No Vitest-Specific Imports

All `.spec.ts` files MUST NOT import from `vitest`. The following are **strictly forbidden**:

```typescript
// ❌ FORBIDDEN
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { vi } from 'vitest';
```

Instead: Use the **globals** provided by Karma/Jasmine (`describe`, `it`, `expect`, `beforeEach`, etc.) which are available without imports when running via `ng test`.

### 🚫 RULE 2 — No Vitest-Specific APIs

Replace Vitest-specific APIs with compatible equivalents:

| Vitest                    | Compatible Replacement                        |
| ------------------------- | --------------------------------------------- |
| `vi.spyOn(obj, 'method')` | `spyOn(obj, 'method')` (Jasmine global)       |
| `vi.fn()`                 | `jasmine.createSpy('name')`                   |
| `vi.mock(...)`            | `TestBed` providers with mock implementations |
| `toBeCalledWith(...)`     | `toHaveBeenCalledWith(...)` (Jasmine matcher) |
| `toHaveBeenCalledTimes`   | `toHaveBeenCalledTimes` ✅ (compatible alias) |

### ✅ RULE 3 — Prefer Testing Library Over TestBed

To ensure future-compatibility with Vitest, use `@testing-library/angular` helpers as the **primary testing approach** wherever feasible:

```typescript
// ✅ PREFERRED — Testing Library (portable to Vitest)
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

it('should render button', async () => {
  await render(MyComponent);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

Only fall back to raw `TestBed` / `ComponentFixture` when Testing Library cannot handle the specific scenario (e.g., testing private Angular lifecycle hooks, IntersectionObserver, or Chart.js canvas initialization).

### ✅ RULE 4 — Command to Run Tests

```bash
# ✅ CORRECT — Unit tests
ng test
# or
pnpm run test

# ❌ FORBIDDEN — DO NOT use Vitest runner for unit tests
pnpm vitest run
pnpm testv run
```

---

## Compatibility Guidelines

Write tests compatible with both platforms by following these principles:

1. **No platform-specific imports** — Do not import from `vitest` or `@angular/core/testing` exclusively; use global test functions.
2. **Use Testing Library's `screen`, `render`, `userEvent`** — These are fully compatible across Karma and Vitest.
3. **Avoid `ComponentFixture.nativeElement` direct traversal** — Prefer `screen.getByRole`, `screen.getByTestId`, etc.
4. **Use `jasmine.createSpy` over both `vi.fn()` and `jest.fn()`** — When spies are unavoidable, `jasmine.createSpy` is the current standard.

---

## Trigger Condition

This rule activates **before implementing any new feature, user story, or spec file**. The agent MUST:

1. **Read this document first** before writing any `.spec.ts` file.
2. **Validate** that no `vitest` imports appear in the spec.
3. **Prefer** `@testing-library/angular` over `TestBed`.
4. **Block** any attempt to run `pnpm vitest` as a unit test command.

---

## Current Violations (Corrected 2026-02-25)

| File                                                         | Violation                                       | Fix Applied                             |
| ------------------------------------------------------------ | ----------------------------------------------- | --------------------------------------- |
| `src/app/shared/utils/finance-math.spec.ts`                  | `import { describe, it, expect } from 'vitest'` | Removed — globals are injected by Karma |
| `src/app/features/wealth-gap-chart/wealth-gap-chart.spec.ts` | `import { vi } from 'vitest'` + `vi.spyOn(...)` | Replaced with `spyOn(...)`              |

---

## References

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [@testing-library/angular](https://testing-library.com/docs/angular-testing-library/intro)
- [Karma documentation](https://karma-runner.github.io/)
