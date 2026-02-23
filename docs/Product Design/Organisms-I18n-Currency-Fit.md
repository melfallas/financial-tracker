# 🧩 Organism Detail: i18n & Currency Local Fit (US6.2)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) & Winston (Architect) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Detailed Spec Ready for Development · **Context:** Localization & Financial Accuracy

---

## 🎯 Purpose & UX Philosophy

Financial perception is deeply tied to the user's local currency. A tool that only speaks "USD" feels distant to a user in Costa Rica or Europe. The **Local Fit** organism ensures that while the underlying financial math remains robust, the visual presentation adapts seamlessly to the user's context without causing accidental data corruption.

> **UX Philosophy:** We prioritize **clarity over automation**. When a user switches currencies, we change the *system of measurement* (labels and formatting) but preserve their input numbers to avoid unexpected jumps in their data. We also acknowledge the global nature of markets by maintaining USD as the primary reference for international assets (BTC, S&P 500) while providing local conversions as helpful secondary data.

---

## 🗂️ Component Architecture: The Global Switch

### 1. The Context Reset Behavior (Signal Logic)
When the user changes the currency via the `M4 Currency Selector` (Global Signal `selectedCurrency`):
- **Label Update:** All monetary symbols ($, ₡, €) update instantly across all organisms.
- **Value Preservation:** Numeric inputs (Initial Capital, Monthly Contribution) remain **identical**. 
  - *Example:* If I have `10,000` in the input and click "CRC", I now have `₡10,000`. The user is responsible for adjusting the magnitude.
- **Visual Feedback:** A subtle "toast" or notification appears: *"Currency changed to CRC. Please review your savings and contribution values."*

### 2. Dual-Currency Display (Market Widgets)
For universal assets (S&P 500, Nasdaq, Bitcoin, Gold):
- **Primary Value:** Always displayed in **USD** (the global transaction standard) in a large, bold font.
- **Secondary Value:** If the `selectedCurrency` is NOT 'USD', a subtle conversion label appears below or beside the primary number.

**📐 Blueprint (Market Card)**
```text
┌─────────────────────────────────┐
│  BITCOIN (BTC)                  │
│                                 │
│  $ 64,520                       │
│  (Large, Deep Blue)             │
│                                 │
│  ≈ ₡ 33,227,800                 │
│  (Small, Charcoal, subtle)      │
└─────────────────────────────────┘
```

---

## 📐 Formatting Rules (The "Fit" Logic)

The system applies different formatting rules based on the scale of the currency to reduce visual noise.

| Currency Scale | Formatting Rule | Example (USD) | Example (CRC) |
|:---------------|:----------------|:--------------|:--------------|
| **Low Scale** (e.g., USD, EUR, GBP) | Show 2 decimal places | `$ 1,250.50` | -- |
| **High Scale** (e.g., CRC, JPY, CLP) | **Hide decimals**, round to nearest integer. | -- | `₡ 643,760` |

### ✨ Figma Visual Spec
- **Rounding Logic:** Use a custom Angular Pipe (`FinancialCurrencyPipe`) that consumes the `selectedCurrency` signal to determine `minimumFractionDigits`.
- **Secondary Conversion Font:** `font-size: 0.75rem`, `font-weight: 500`, `opacity: 0.7`.

---

## 🕹️ PDF Export Integration (US2.4)

The PDF generation engine must align 100% with the user's current visual state on the dashboard.

- **Dynamic Parameter:** The `PdfExportService.generate()` method takes `currentCurrency` as a mandatory argument.
- **Formatting Match:** The PDF uses the same "High Scale" rounding rules defined above. If a user downloads the report while viewing CRC, the PDF is generated entirely in CRC, including all data tables and chart labels.
- **Multi-Currency Warning:** If a PDF is generated in a non-USD currency, it must include a small footnote: *"Market asset values converted from USD based on the exchange rate of [Date]."*

---

## 📡 Angular Architecture (Winston's Spec)

```typescript
// src/app/core/services/currency.service.ts

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  // Current currency selection (Global Signal)
  selectedCurrency = signal<string>('USD');

  // Multiplier from USD to Selected
  exchangeRate = signal<number>(1.0); 

  // Computed: Should we show decimals?
  showDecimals = computed(() => {
    const highScaleCurrencies = ['CRC', 'JPY', 'CLP', 'COP', 'PYG'];
    return !highScaleCurrencies.includes(this.selectedCurrency());
  });

  formatValue(value: number): string {
    const locale = this.selectedCurrency() === 'CRC' ? 'es-CR' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.selectedCurrency(),
      minimumFractionDigits: this.showDecimals() ? 2 : 0,
      maximumFractionDigits: this.showDecimals() ? 2 : 0,
    }).format(value);
  }
}
```

### Integration in Feature Components
```html
<!-- market-card.html -->
<div class="primary-price">{{ marketData.usdPrice | currency:'USD' }}</div>

@if (currencyService.selectedCurrency() !== 'USD') {
  <div class="secondary-conversion">
    ≈ {{ marketData.usdPrice * currencyService.exchangeRate() | financialFormat }}
  </div>
}
```

---

*— Sally & Winston · Financial Tracker · BMAD v4 · 2026-02-23*
