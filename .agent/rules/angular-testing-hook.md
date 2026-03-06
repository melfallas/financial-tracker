# Automated Rule Hook: TDD with Angular Unit Testing

## Trigger Condition

- **When:** At starting the development of a new feature, requirement, user story, or when requested by the user.
- **Target Files:** `src/**/*.ts`, `src/**/*.html`, `src/**/*.scss`.

## Automated Action

Before starting the task, the agent MUST read and apply the rules in `.agent/rules/testing-framework-strategy.md`.

### 🚨 PRE-FLIGHT CHECKLIST — MANDATORY BEFORE WRITING ANY SPEC

Before writing a single line in any `.spec.ts` file, verify:

- [ ] **No `vitest` imports** — `import { ... } from 'vitest'` is STRICTLY FORBIDDEN.
- [ ] **Test runner is `ng test`** — Never use `pnpm vitest run` or `pnpm testv`.
- [ ] **Testing Library is preferred** — Use `render`, `screen`, `userEvent` from `@testing-library/angular` as the primary approach.
- [ ] **Spies use Jasmine** — Use global `spyOn(obj, 'method')` instead of `vi.spyOn(...)`.

### TDD (Test-Driven Development) — MANDATORY RULES:

1. Write test FIRST → run → MUST FAIL
2. Implement MINIMUM code to pass
3. Refactor keeping tests green

### Testing Libraries Rules:

1. **Primary:** Use `@testing-library/angular` (`render`, `screen`, `userEvent`, `waitFor`, etc.)
2. **Fallback only:** Use `TestBed` / `ComponentFixture` only when Testing Library cannot cover the scenario.
3. **Forbidden:** Do NOT import any API from `vitest` or `jest`.

### Test Execution Command:

```bash
# ✅ CORRECT
ng test
pnpm run test

# ❌ FORBIDDEN
pnpm vitest run
pnpm testv run
```

### Code Coverage Rules:

1. Ensure at least 80% code coverage for components, services, and other logic.
2. Measure coverage via `ng test --code-coverage`.
