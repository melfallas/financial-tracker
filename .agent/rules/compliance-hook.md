---
trigger: always_on
---

## Automated Rule Hook: Compliance Reporting

### Trigger Condition

- **When:** Any modification affecting >20 lines of code or creating new files in `src/app/`.
- **Target Files:** `src/**/*.ts`, `src/**/*.html`.

### Automated Action

Before concluding the task, the agent must update or generate a file at `.agent/compliance-report.md`. This report must verify the following checkpoints based on the Angular 21 standard:

1. **Standalone Validation:** Are all new components standalone? (Yes/No)
2. **Signal Adoption:** Are `input()`, `output()`, and `model()` functions used instead of decorators? (Yes/No)
3. **Control Flow:** Is the `@if/@for` syntax used exclusively? (Yes/No)
4. **Architecture Alignment:** Does the file location match the Core/Shared/Feature layer definition? (Yes/No)
5. **Template Separation — BLOCKER:** Do ALL components (without exception) use `templateUrl` and `styleUrl` referencing external `.html` and `.css` files? (Yes/No) — **Any "No" here is a BLOCKER that must be resolved before the task is considered complete.**
6. **Zero Inline Templates/Styles — BLOCKER:** Are there zero occurrences of `template:` or `styles:` inline properties inside any `@Component` decorator across the entire `src/app/` directory? (Yes/No) — **Any "No" is a BLOCKER. Scan with: `grep -rn "template:\|styles:" src/app --include="*.ts"`**
7. **Selector Prefix `ft-` — BLOCKER:** Do ALL component selectors use the `ft-` prefix? (Yes/No)
8. **Language Standards — BLOCKER:** Is all documentation (`.md`), source code, and comments written in **English**? (Yes/No) — **Any Spanish in these files is a BLOCKER. UI text in `.html` may remain in Spanish.**


### Report Template

## The agent will append the following structure to the report:

**DateTime:** [Current Date in format "YYYY-MM-DDTHH:mm:ss"]
**Task:** [Brief description of the change]
**Status:** [PASSED / FAILED / WARNING]
**Violations:** [List any deviation from the standards or "None"]
**Files Detected:** [List of source code files with detected violations or "None"]
**Refactor Suggestions:** [Specific code snippets to fix violations]

---
