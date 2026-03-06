# 🚫 Architectural Rule: No Inline Templates or Styles — ZERO TOLERANCE

## Status: ENFORCED | Priority: BLOCKER

---

## Rule Definition

**Every Angular component in this project MUST use external file references for both its template and its styles. Inline code inside the `@Component` decorator metadata is categorically forbidden.**

This rule applies **without exception** to:

- `src/app/features/**` — Feature components
- `src/app/shared/**` — Shared/reusable components
- `src/app/core/**` — Core layer components

---

## Trigger Condition

This rule is automatically activated when:

- A **new component** is being created (new feature, user story, requirement)
- Any **existing component** is being modified
- A **code review** or refactoring is requested

---

## What is Prohibited ❌

Using `template:` or `styles:` (or `styleUrls:`) directly inside `@Component`:

```typescript
// ❌ FORBIDDEN — This code will be rejected
@Component({
  selector: 'app-example',
  template: `<div>Hello</div>`, // ← FORBIDDEN
  styles: `
    div {
      color: red;
    }
  `, // ← FORBIDDEN
})
export class Example {}
```

---

## What is Required ✅

Every component MUST have three dedicated files and use `templateUrl` + `styleUrl`:

```typescript
// ✅ CORRECT — Required pattern
@Component({
  selector: 'app-example',
  templateUrl: './example.html', // ← REQUIRED
  styleUrl: './example.css', // ← REQUIRED
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example {}
```

**Required file structure for every component:**

```
feature-name/
└── component-name/
    ├── component-name.ts        ← Logic & Metadata (templateUrl + styleUrl only)
    ├── component-name.html      ← ALL template code goes here
    ├── component-name.css       ← ALL styles go here
    └── component-name.spec.ts   ← Unit Tests
```

---

## Automated Action for the Development Agent

### Before Starting Any New Feature:

1. **Read and confirm** awareness of this rule before generating any component.
2. **Generate the four-file structure** (`.ts`, `.html`, `.css`, `.spec.ts`) for every component.
3. **Never** put HTML or CSS code inside the `.ts` file.

### Pre-flight Check Before Modification:

1. Scan the component file being modified for `template:` or `styles:` keys.
2. If found, **STOP** and refactor to external files BEFORE proceeding with the requested change.
3. Report the violation in the compliance report.

### On Code Review / Refactoring Request:

1. Run a full scan across `src/app/**/*.ts` for any occurrence of `template:` or `styles:` inside `@Component`.
2. For each violation found:
   - Extract the inline HTML to a new `.html` file.
   - Extract the inline CSS to a new `.css` file.
   - Replace `template:` with `templateUrl: './filename.html'`.
   - Replace `styles:` with `styleUrl: './filename.css'`.
3. Update the compliance report.

---

## Enforcement Protocol

| Scenario                                | Action                                 |
| --------------------------------------- | -------------------------------------- |
| New component with inline template      | **BLOCK** — Refactor before proceeding |
| Existing component with inline template | **BLOCK** — Refactor before proceeding |
| PR/Review with inline template          | **REJECT** — Requires correction       |
| Requested feature with inline code      | **STOP** — Inform user, then refactor  |

---

## Rationale

- **Separation of Concerns:** Template, styles, and logic belong in separate files.
- **Tooling:** IDEs and linters work better with dedicated files (autocomplete, syntax highlighting, Emmet).
- **Scannability:** The LIFT principle requires that any developer can quickly locate and identify code.
- **Maintainability:** Large templates inside TS files reduce readability and increase merge conflicts.
- **Consistency:** Uniform structure across all components reduces cognitive load.

---

_Rule enforced by: Architect Role — Financial Tracker Project_
_Last updated: 2026-02-24_
