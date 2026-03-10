---
trigger: always_on
description: README.md Auto-Update Rule — Triggered on significant .md or src changes
---

# Rule: README Auto-Update on Significant File Changes

## Activation Trigger

This rule activates when **any of the following conditions** are met:

- A `.md` file inside `docs/` is **created or significantly modified** (> 10 lines changed).
- A `.ts`, `.html`, or `.css` file inside `src/app/` is **created or significantly modified** as part of a new feature or architectural change.
- A new **feature folder** is added under `src/app/features/`.
- A new **service, interface, or constant** is added under `src/app/core/`.

## What to Update

When this rule is activated, the agent **MUST**:

1. **Read the current `README.md`** to understand its existing structure.
2. **Identify the delta** — what changed and what new important information exists.
3. **Update only the relevant sections** of `README.md` without breaking the existing structure:
   - Update the **Project Status** table if sprint or story status changed.
   - Update the **Key Features** section if a new feature was added or an existing one was changed.
   - Update the **Architecture Overview** section if new services, constants, patterns, or external APIs were introduced.
   - Update the **Project Structure** section if new folders or files were added to `core/`, `features/`, `shared/`, or `public/`.
   - Update the **Project Documents** section if new `.md` files were added to `docs/`.
   - Update the **Getting Started** section if new environment variables, commands, or QA hooks were introduced.

## What NOT to Do

- **Do NOT rewrite the entire README.md** — only apply the delta.
- **Do NOT add sections** unless a clearly distinct new topic requires it.
- **Do NOT remove existing sections** unless they are explicitly made obsolete.
- **Do NOT modify UI text in `.html` templates** — this rule applies only to `README.md`.
- **Do NOT run this rule** for trivial changes like whitespace fixes, typo corrections, or comment-only changes.

## Scope

- **Source of truth for changes:** `docs/**/*.md` and `src/app/**/*.{ts,html,css}`.
- **Target file:** `README.md` (root of the repository).

## Example Scenarios That Trigger This Rule

| Change | README Section Affected |
|--------|------------------------|
| New service added in `src/app/core/services/` | Project Structure > `core/services/` list |
| New feature component in `src/app/features/` | Key Features, Project Structure |
| New user story `.md` added to `docs/stories/` | Project Documents > Sprint & Planning |
| New external API integrated | Architecture Overview > External APIs table |
| New environment variable required | Getting Started > .env configuration |
| Sprint status updated in `docs/SprintReport.md` | Project Status > Sprint Progress table |
| New UX/UI organism spec added to `docs/Product Design/` | Project Documents > UX/UI Documents |

## Compliance

After updating the README, verify:
- [ ] All level 2 (`##`) headings are reflected in the **Table of Contents**.
- [ ] No broken links to doc files were introduced.
- [ ] All changes are written in **English**.
- [ ] The document remains scannable and does not exceed useful length.