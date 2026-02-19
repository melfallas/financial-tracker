---
trigger: always_on
---

## Automated Rule Hook: Compliance Reporting

### Trigger Condition

- **When:** Any modification affecting >2 lines of code or creating new files in `src/app/`.
- **Target Files:** `src/**/*.ts`, `src/**/*.html`.

### Automated Action

Before concluding the task, the agent must update or generate a file at `.agent/compliance-report.md`. This report must verify the following checkpoints based on the Angular 21 standard:

1. **Standalone Validation:** Are all new components standalone? (Yes/No)
2. **Signal Adoption:** Are `input()`, `output()`, and `model()` functions used instead of decorators? (Yes/No)
3. **Control Flow:** Is the `@if/@for` syntax used exclusively? (Yes/No)
4. **Architecture Alignment:** Does the file location match the Core/Shared/Feature layer definition? (Yes/No)
5. **Template Separation:** Are `templateUrl` and `styleUrl` used for components over 10 lines? (Yes/No)

### Report Template

## The agent will append the following structure to the report:

**Date:** [Current Date]
**Task:** [Brief description of the change]
**Status:** [PASSED / FAILED / WARNING]
**Violations:** [List any deviation from the standards or "None"]
**Files Detected:** [List of source code files with detected violations or "None"]
**Refactor Suggestions:** [Specific code snippets to fix violations]

---
