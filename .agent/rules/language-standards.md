# Language Standards - English Documentation & Source Code

## Context
To ensure international collaboration and maintainability, the architect has established a strict language rule for the project.

## Mandatory Rules

1. **Documentation:** All Markdown files (`.md`), including user stories, documentation, and architecture records, must be written in **English**.
2. **Source Code:** All variable names, function names, class names, and any other identifiers in TS/JS files must be in **English**.
3. **Comments:** All code comments and JSDoc annotations must be in **English**.
4. **Tooling & Logs:** Commit messages, PR descriptions, and terminal logs should be in **English**.

## Exceptions

1. **UI Content:** Text content within HTML templates (`.html`) or language resource files that are intended for the end-user may be in **Spanish** for the current development phase.
2. **Specific Domain Terms:** If a domain-specific term in Spanish is required and lacks a clear English equivalent, it may be used but must be documented in English.

## Implementation Standard
Any agent starting a new task must first scan for and correct any language violations in the relevant files before submitting their work.

## Violation Check
- Check `.md` files for non-English content.
- Check `.ts` files for non-English variable names or comments.
- Update the `compliance-report.md` with language validation results.
