# 📘 Technical Architecture: Fin-Tracker Global MVP

## 1. 🏗️ High-Level Methodology: Spec-Driven Development (SDD) & TDD

**Fin-Tracker Global** follows the **Spec-Driven Development (SDD)** lifecycle coupled with **Test-Driven Development (TDD)**.

### SDD + TDD Workflow:

1. **Definition:** Define the feature and its acceptance criteria in `Backlog.md`.
2. **Red Phase (Test First):** Write the `.spec.ts` unit test using `@testing-library/angular`. Run the test and confirm it **fails**.
3. **Green Phase (Minimum Code):** Create the standalone component/service and implement the minimum logic to pass the test.
4. **Refactor Phase:** Optimize the code for structure and organization while keeping tests green.
5. **Quality Gate:** Verify at least **80% code coverage** before completion.
6. **Island Dev (Storybook):** Develop visual states and responsive behavior in isolation.
7. **PO Audit:** Final validation via `PO_Checklist.md`.

---

## 2. 🧠 Frontend Architecture (Angular 21)

- **State Management:** Granular reactivity using **Angular Signals**. `computed()` signals handle all financial conversions.
- **Zoneless:** Optimized for performance without `Zone.js` overhead.
- **Naming Convention:** **Flat & Clean**. Suffixes like `.component.ts` are strictly forbidden.
  - _Example:_ `hero-realtime.ts`, `hero-realtime.html`, `hero-realtime.stories.ts`.
- **Dependency Injection:** Modern `inject()` usage for all services.

---

## 🎨 3. Design System & Design Tokens (Tailwind v4)

We implement the **80/15/5 Rule** directly into the Tailwind v4 engine.

### Design Tokens:

- **80% (Base - Trust):**
  - Deep Blue (`#1A3C6E`): Stability and brand identity.
  - Cloud Gray (`#ECEFF1`): Surface and background.
- **15% (Action - Guidance):**
  - Teal Bright (`#009688`): Innovation, interactive icons.
- **5% (Conversion - Growth):**
  - **Emerald Green (`#00C853`)**: Reserved strictly for Primary CTAs and "Success" feedback.

---

## 🧪 4. Quality & Testing Standards (Mandatory)

Engineering excellence is enforced through strict testing protocols:

- **TDD Requirement:** All new features must start with a failing test (Red-Green-Refactor).
- **Tooling:** `@testing-library/angular` for unit tests, Playwright for E2E.
- **Coverage Gate:** **> 80%** total coverage for components, services, and utilities.
- **Storybook:** Every feature must include isolated stories for mobile/desktop validation.

---

## 📈 5. The Wealth Gap Engine (Financial Logic)

Pure math logic in `src/app/shared/utils/finance-math.ts`.

- **Nominal FV:** `initial * (1 + monthly_rate)^months`
- **Real FV:** `nominal_fv / (1 + periodic_inflation_rate)^periods`
- **The Gap:** `nominal_fv - real_fv` (The "Wealth Erosion" story).

---

## 🔧 6. Data & Persistence Layer

- **Repository Pattern:** `ILeadRepository` abstracts storage.
- **Phase 1:** `LocalStorageService`.
- **Phase 2:** `SupabaseService` with RLS.

---

## 🛡️ 7. Engineering Constraints (Non-Negotiable)

1. **Language:** UI (ES/EN); **Source Code & Comments** (100% English).
2. **Testing:** TDD is mandatory for all new features.
3. **Naming:** Class names must match filenames without suffixes (e.g., `LeadFormStore` in `lead-form-store.ts`).
4. **Performance:** < 1.5s visual load time on mobile networks.
