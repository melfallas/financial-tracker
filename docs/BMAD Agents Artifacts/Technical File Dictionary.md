# Technical File Dictionary

Compiled the **Technical File Dictionary**. This contains the "Source Code Core"—the essential files required to establish the project's foundation, logic, and visual identity according to the high standards we've defined.

---

## 📘 Technical File Dictionary: Core Implementation

### 1. Global Styles & Design Tokens

**File:** `src/styles.css`
_Purpose: Establishes Sally's 80/15/5 design system using Tailwind v4._

```css
@theme {
  /* 80% - Foundational Trust */
  --color-deep-blue: #1A3C6E;
  --color-cloud-gray: #eceff1;
  --color-charcoal: #37474f;

  /* 15% - Success & Interaction */
  --color-emerald-green: #00c853;
  --color-teal-bright: #009688;
  --color-soft-red: #d32f2f;

  /* 5% - Conversion CTA */
  --color-cta-orange: #f57c00;
  --color-golden-amber: #ffb300;

  /* Typography & Effects */
  --font-sans: 'Inter', system-ui, sans-serif;
  --shadow-premium: 0 10px 30px -10px rgba(26, 35, 126, 0.2);
  --radius-card: 1.5rem;
}

@layer base {
  body {
    @apply bg-cloud-gray text-charcoal font-sans antialiased;
  }
}
```

### 2. The Math Engine (Wealth Gap)

**File:** `src/app/shared/utils/finance-math.ts`
_Purpose: Pure functions for calculation, decoupled from the UI._

```typescript
export interface ProjectionEntry {
  year: number;
  nominalBalance: number;
  realValue: number; // Adjusted for inflation
}

/**
 * Calculates growth adjusted for purchasing power loss.
 * Logic: RealValue = Nominal / (1 + inflation)^year
 */
export const calculateWealthGap = (
  initial: number,
  monthly: number,
  annualRate: number,
  inflation: number,
  years: number,
): ProjectionEntry[] => {
  const result: ProjectionEntry[] = [];
  let currentNominal = initial;
  const monthlyRate = annualRate / 100 / 12;

  for (let y = 1; y <= years; y++) {
    // Monthly compounding
    for (let m = 1; m <= 12; m++) {
      currentNominal += currentNominal * monthlyRate + monthly;
    }

    // Inflation adjustment
    const inflationFactor = Math.pow(1 + inflation / 100, y);
    const currentReal = currentNominal / inflationFactor;

    result.push({
      year: y,
      nominalBalance: Math.round(currentNominal),
      realValue: Math.round(currentReal),
    });
  }
  return result;
};
```

### 3. Localization Dictionaries

**Files:** `src/assets/i18n/es.json` & `en.json`
_Purpose: Multi-language support for global scaling._

**es.json (Default):**

```json
{
  "HERO": {
    "TITLE": "Multiplica tu capital con inteligencia",
    "SUBTITLE": "Calcula el crecimiento real ajustado a la inflación de tu país."
  },
  "CALC": {
    "NOMINAL": "Saldo Nominal",
    "REAL": "Poder de Compra Real",
    "GAP": "Brecha de Inflación"
  },
  "CTA": {
    "DOWNLOAD": "Descargar Reporte PDF"
  }
}
```

### 4. Infrastructure Contracts (Repository Pattern)

**File:** `src/app/core/interfaces/i-lead-repository.ts`
_Purpose: Future-proofing for Supabase migration._

```typescript
import { Observable } from 'rxjs';
import { Lead } from '../../shared/types';

export interface ILeadRepository {
  /** Saves lead data to LocalStorage (MVP) or Supabase (Phase 2) */
  saveLead(lead: Lead): Observable<boolean>;

  /** Retrieves leads for dashboard analytics */
  getLeads(): Observable<Lead[]>;
}
```

### 5. Reactive State (The Signal Service)

**File:** `src/app/core/services/currency.service.ts`
_Purpose: Global source of truth for Currency and FX Rates._

```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  // Global Signals
  public selectedCurrency = signal<string>('USD');
  public fxRate = signal<number>(1.0); // Exchange rate vs USD
  public localInflation = signal<number>(3.4); // Current country inflation

  // Formatted display signal
  public currencyLabel = computed(() => `Currency: ${this.selectedCurrency()}`);

  updateCurrency(code: string, rate: number, inflation: number) {
    this.selectedCurrency.set(code);
    this.fxRate.set(rate);
    this.localInflation.set(inflation);
  }
}
```

---

### 📦 Summary of Assets for Export:

1. **UI/UX:** Use `styles.css` to initialize the visual layer.
2. **Logic:** Use `finance-math.ts` to power the chart component.
3. **State:** Use `currency.service.ts` to sync the Navbar and the Dashboard.
4. **Persistence:** Implement the `ILeadRepository` to handle user data.
