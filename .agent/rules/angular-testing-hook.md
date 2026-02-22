---
trigger: always_on
---

# Automated Rule Hook: TDD with Angular Unit Testing

## Trigger Condition

- **When:** At starting the development of a new feature, requirement, user story, or when requested by the user.
- **Target Files:** `src/**/*.ts`, `src/**/*.html`, `src/**/*.scss`.

## Automated Action

Before starting the the task, the agent must verify and execute the following tasks:

### TDD (Test-Driven Development) - MANDATORY RULES:

1. Write test FIRST → run → MUST FAIL
2. Implement MINIMUM code to pass
3. Refactor keeping tests green
