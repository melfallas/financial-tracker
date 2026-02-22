# 📘 Technical Architecture: Fin-Tracker Global MVP

## 1. 🏗️ High-Level Methodology: Spec-Driven Development (SDD)

**Fin-Tracker Global** follows the **Spec-Driven Development (SDD)** lifecycle within the BMAD framework. Every feature must be defined in the specification (PRD/Backlog) and validated in **Storybook** before being integrated into the main application logic.

### SDD Workflow:

1. **Definition:** Define the feature and its acceptance criteria in `Backlog.md`.
2. **Scaffold:** Create the standalone component and service shell (English only).
3. **Island Dev (Storybook):** Develop the UI and logic in isolation using Storybook.
4. **Integration:** Connect to the routing system and persistence layer.
5. **PO Audit:** Validate using the `PO_Checklist.md`.

---

## 2. 🧠 Frontend Architecture (Angular 21)

- **State Management:** Granular reactivity using **Angular Signals**. `computed()` signals handle all financial conversions (USD -> Local).
- **Zoneless:** Optimized for performance without `Zone.js` overhead.
- **Naming Convention:** **Flat & Clean**. Suffixes like `.component.ts` or `.component.html` are strictly forbidden.
  - _Example:_ `hero-realtime.ts`, `hero-realtime.html`, `hero-realtime.stories.ts`.
- **Dependency Injection:** Modern `inject()` usage for all services.

---

## 🎨 3. Design System & Design Tokens (Tailwind v4)

We implement the **80/15/5 Rule** directly into the Tailwind v4 engine (`src/styles.css`).

### Design Tokens:

- **80% (Base - Trust):**
  - Deep Blue (`#1A3C6E`): Stability and brand identity.
  - Cloud Gray (`#ECEFF1`): Surface and background.
- **15% (Action - Guidance):**
  - Teal Bright (`#009688`): Innovation, interactive icons, and secondary buttons.
- **5% (Conversion - Growth):**
  - **Emerald Green (`#00C853`)**: Reserved strictly for Primary CTAs and "Success" feedback.

### Responsive Strategy:

- **Mobile-First:** All flex containers are `flex-col` by default.
- **Breakpoint Logic:** Use `md:` for tablet/desktop side-by-side transitions.

---

## 📈 4. The Wealth Gap Engine (Financial Logic)

The core logic is encapsulated in `src/app/shared/utils/finance-math.ts` to ensure mathematical purity.

### Core Calculation:

- **Nominal FV:** `initial * (1 + monthly_rate)^months`
- **Real FV:** `nominal_fv / (1 + periodic_inflation_rate)^periods`
- **The Gap:** `nominal_fv - real_fv` (The "Wealth Erosion" story).

---

## 🔧 5. Data & Persistence Layer

- **Repository Pattern:** `ILeadRepository` interface abstracts the storage mechanism.
- **Phase 1 (MVP):** `LocalStorageService` for local-only lead persistence.
- **Phase 2 (Scalability):** `SupabaseService` (PostgreSQL) for cloud storage and RLS (Row Level Security).
- **External APIs:**
  - **ExchangeRate-API:** For real-time currency conversion (USD/EUR/LATAM).
  - **Resend/SendGrid:** (Phase 2) For personalized PDF delivery.

---

## 🛡️ 6. Engineering Constraints (Non-Negotiable)

1. **Language:** UI supports ES/EN; **Source Code & Comments** are 100% English.
2. **Testing:** All features must include a Storybook story for Viewport (Mobile/Desktop) validation.
3. **Performance:** < 1.5s visual load time on mobile networks.
4. **Naming:** Class names must match filenames without suffixes (e.g., class `LeadFormStore` in `lead-form-store.ts`).
