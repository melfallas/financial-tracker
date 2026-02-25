# 🏷️ Architectural Rule: Component Selector Prefix `ft-` — ZERO TOLERANCE

## Status: ENFORCED | Priority: BLOCKER

---

## Rule Definition

**Every Angular component selector in this project MUST use the `ft-` prefix (for "Financial Tracker"). The Angular default prefix `app-` and any other prefix are categorically forbidden.**

This rule applies **without exception** to:

- `src/app/app.ts` — Root component
- `src/app/features/**` — Feature components
- `src/app/shared/**` — Shared/reusable components
- `src/app/core/**` — Core layer components

---

## Trigger Condition

This rule is automatically activated when:

- A **new component** is being created (new feature, user story, requirement)
- Any **existing component** is being modified
- A **code review** or refactoring is requested
- The `angular.json` `prefix` field is reviewed

---

## What is Prohibited ❌

Using `app-` or any other prefix besides `ft-`:

```typescript
// ❌ FORBIDDEN — Will be rejected
@Component({
  selector: 'app-home-page', // ← FORBIDDEN
})
export class HomePage {}

// ❌ ALSO FORBIDDEN
@Component({
  selector: 'home-page', // ← FORBIDDEN (no prefix)
})
export class HomePage {}
```

---

## What is Required ✅

Every component selector MUST start with `ft-`:

```typescript
// ✅ CORRECT — Required pattern
@Component({
  selector: 'ft-home-page', // ← REQUIRED: ft- prefix
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
```

**Naming Pattern:**

| Component       | Required Selector |
| --------------- | ----------------- |
| `app.ts` (root) | `ft-root`         |
| `home-page.ts`  | `ft-home-page`    |
| `navbar.ts`     | `ft-navbar`       |
| `hero.ts`       | `ft-hero`         |
| `button.ts`     | `ft-button`       |
| `[name].ts`     | `ft-[name]`       |

---

## Automated Action for the Development Agent

### Before Starting Any New Feature:

1. **Read and confirm** awareness of this rule before generating any component.
2. **Always generate selectors** with the `ft-` prefix.
3. **Never** use `app-`, default Angular prefix, or no prefix.

### Pre-flight Check Before Modification:

1. Scan the component file for its `selector:` property.
2. If it does NOT start with `ft-`, **STOP** and fix the selector first.
3. Update all HTML usages of the old tag name (e.g., `<app-button>` → `<ft-button>`).
4. Update `index.html` if `ft-root` is the affected selector.
5. Report the fix in the compliance report.

### On Code Review / Refactoring Request:

1. Run: `grep -rn "selector: 'app-" src/app --include="*.ts"`
2. For each violation:
   - Change `selector: 'app-[name]'` → `selector: 'ft-[name]'`
   - Update all HTML templates that reference `<app-[name]>` → `<ft-[name]>`
   - Update `index.html` if the root selector changed
3. Update the compliance report.

---

## angular.json Configuration

The `prefix` field in `angular.json` MUST be set to `ft` to enforce this at the Angular CLI level:

```json
{
  "projects": {
    "financial-tracker": {
      "prefix": "ft"
    }
  }
}
```

---

## Enforcement Protocol

| Scenario                                | Action                            |
| --------------------------------------- | --------------------------------- |
| New component with `app-` selector      | **BLOCK** — Fix before proceeding |
| Existing component with `app-` selector | **BLOCK** — Fix before proceeding |
| PR/Review with `app-` selector          | **REJECT** — Requires correction  |
| HTML using `<app-*>` tag                | **FIX** — Update to `<ft-*>`      |

---

## Rationale

- **Brand Identity:** The `ft-` prefix makes the project components immediately identifiable as Financial Tracker components.
- **Namespace Safety:** Prevents collision with third-party component libraries that may use `app-`.
- **Consistency:** Uniform prefix across all components reduces cognitive load and improves code discoverability.
- **Angular CLI Standard:** The `prefix` field in `angular.json` is explicitly designed for this purpose.

---

_Rule enforced by: Architect Role — Financial Tracker Project_  
_Last updated: 2026-02-24_
