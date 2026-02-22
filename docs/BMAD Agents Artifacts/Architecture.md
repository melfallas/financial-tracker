# 📘 KB: FIN-TRACKER GLOBAL MVP (English Version)

### 1. Core Architecture (Angular 21 + Signals)

- **State Management:** Strict use of `Signals` for granular reactivity. `RxJS` is reserved solely for asynchronous data streams (HTTP, Supabase).
- **Methodology:** **BMAD** Architecture (Base, Modals, Assets, Data) with flat naming conventions (no `.component` suffix).
- **Dependency Injection:** Services are consumed using the `inject()` function to ensure modern, cleaner code.

### 2. Design System & UX (Sally's Rules)

- **Mobile-First:** Strict responsive design. Layouts are `flex-col` by default, scaling to `md:flex-row`.
- **Color Palette (80/15/5):**
- **80% (Base):** `Deep Blue (#1A237E)`, `Cloud Gray (#ECEFF1)`, `Charcoal (#37474F)`.
- **15% (Success/Feedback):** `Teal Bright (#009688)`.
- **5% (Action/CTA):** `Emerald Green (#00C853)`.

- **Psychology:** **Skeleton Loaders** are used to minimize cognitive load, and **Soft Red** is applied for critical inflation alerts.

### 3. Financial Engine (Inflation-Adjusted)

- **Currency Engine:** Native support for **USD, EUR, and LATAM Currencies** (ARS, MXN, CRC, etc.).
- **Inflation Gap:** Dynamic "Wealth Gap" calculation that subtracts annual inflation impact from nominal compound interest returns.
- **Data Source:** Architectural provision for live market APIs and Supabase persistence.

### 4. Infrastructure & Integration

- **Persistence:** Repository Pattern (`ILeadRepository`). Initial implementation via `LocalStorage`, ready to migrate to **Supabase** (Phase 2).
- **i18n (Localization):** Bilingual system (**Spanish/English**) via JSON translation files. Language selection updates currency formats and UI labels instantly.
- **Automation:** Local PDF generation summarizing the investment projection and automated welcome email logic (Resend/SendGrid).

---

## 🛠️ Technical Implementation Blueprint

### Directory Structure

```text
src/
├── app/
│   ├── core/                  # Singletons & Contracts
│   │   ├── services/          # currency.service.ts, translation.service.ts
│   │   └── interfaces/        # i-lead-repository.ts, i-email.service.ts
│   ├── infrastructure/        # Implementations
│   │   ├── local-lead.repo.ts # Phase 1 Storage
│   │   └── resend-email.ts    # Email logic
│   ├── shared/                # Common Utils
│   │   ├── utils/             # finance-math.ts
│   │   └── types/             # index.ts (Lead, Currency)
│   └── features/              # UI Components (Flat naming)
│       ├── lead-form/         # lead-form (.ts, .html, .stories.ts)
│       ├── calculator/        # compound-interest (.ts, .html)
│       └── market-status/     # inflation-dashboard

```

### Tailwind v4 Configuration (`src/styles.css`)

```css
@theme {
  --color-deep-blue: #1a237e;
  --color-cloud-gray: #eceff1;
  --color-emerald-green: #00c853;
  --color-cta-green: #00c853;

  --font-sans: 'Inter', sans-serif;
}
```

### Core Logic Snippet: The Wealth Gap Engine

```typescript
/**
 * Advanced financial projection.
 * Adjusted for local inflation based on currency selection.
 */
export const calculateProjection = (
  initial: number,
  rate: number,
  inflation: number,
  years: number,
) => {
  const nominal = initial * Math.pow(1 + rate / 100, years);
  const realValue = nominal / Math.pow(1 + inflation / 100, years);
  return { nominal, realValue };
};
```

---

## 🛡️ Stored Project Constraints

1. **Code Policy:** All source code and technical comments must be in **English**.
2. **Conversational Policy:** Spanish for team communication.
3. **UI Policy:** Mobile-First by default.
4. **Brand Integrity:** Adherence to the **80/15/5** color rule.

### 📋 Technical Blueprint Summary (Snapshot)

| Componente      | Lógica Clave                  | UI/UX Feature               |
| --------------- | ----------------------------- | --------------------------- |
| `LeadForm`      | Signal-based Validation       | Success Feedback (Emerald)  |
| `Calculator`    | `calculateAdvancedProjection` | Multi-currency Slider       |
| `MarketStatus`  | `fearGreedValue()` Signal     | Responsive Grid             |
| `InflationDash` | `INFLATION_DATA` Lookup       | High-Volatility Alert (Red) |

---

### 🛡️ Saved Constraints (Memory Bank)

1. **Language:** Conversación en Español / Código y Comentarios en Inglés.
2. **Naming:** No use of `.component.ts` or `.component.html` suffixes.
3. **Units:** All math done in USD internally; converted to local currency for Display Only.
4. **Testing:** Every feature must have a corresponding Storybook story with mobile viewport testing.
