# 🧩 Organism Detail: CDP vs. Market Comparator (US3.3)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Detailed Spec Ready for Development · **Context:** Logical Proof & Institutional Shaming

---

## 🎯 Purpose & Emotional Narrative

The **CDP vs. Market Comparator** shatters the illusion of "safe" bank returns. While a Certificate of Deposit (CDP) or savings account offers a low, fixed interest rate, the bank routinely reinvests those same funds in the broader market to capture structural gains. 

> **UX Philosophy:** By displaying Side-by-Side KPI Cards, users receive a direct, inescapable visual comparison of how much wealth they are leaving on the table. The interactive slider ensures they can model their exact scenario, while the "Institutional Shaming" copy at the bottom converts their passive acceptance into motivated action.

---

## 🗂️ Component Architecture & Layout Specifications

**Visual Spec:**
- **Layout:** A massive, full-width section with two central Side-by-Side Data Cards.
- **Background:** Crisp `White (#FFFFFF)` to force complete focus on the numbers.
- **Card 1 (The Bank):** Uses `Cloud Gray` and `Charcoal`. Represents the slow, safe, but ultimately losing proposition.
- **Card 2 (The Market):** Uses `Deep Blue` and `Emerald Green`. Represents structural growth.
- **The Gap (The Hook):** A dramatic text block placed directly beneath the cards that calculates the exact dollar amount the bank is "keeping" from the user.

### 📐 Blueprint (Wireframe — Desktop)
```text
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                      [M2 Slider Control]                               │
│            Tasa de Interés de tu Banco: [       5.0% ]                 │
│            ───────────────●───────────────────────────                 │
│                                                                        │
│   ┌────────────────────────────────┐  ┌────────────────────────────────┐ │
│   │ EL BANCO TE PAGA               │  │ EL BANCO GANA EN EL MERCADO    │ │
│   │ (Certificado a Plazo)          │  │ (Ej. S&P 500 ETF)              │ │
│   │                                │  │                                │ │
│   │ Rendimiento a [20] años:       │  │ Rendimiento a [20] años:       │ │
│   │                                │  │                                │ │
│   │          $ 26,532              │  │          $ 86,900              │ │
│   │        (Charcoal text)         │  │     (Emerald Green text)       │ │
│   │                                │  │                                │ │
│   │ Crecimiento: Lento             │  │ Crecimiento: Estructural       │ │
│   └────────────────────────────────┘  └────────────────────────────────┘ │
│                                                                        │
│                                                                        │
│    ⚠️ EL COSTO DE LA INACCIÓN: $ 60,368                                │
│    El banco usó tu dinero para ganar en el mercado y solo te dio una   │
│    fracción del retorno. Rompe el ciclo hoy.                           │
│    (Soft Red warning icon, Deep Blue text)                             │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```
*(On mobile devices, the cards stack vertically with an "VS" badge overlapping between them).*

---

## 🕹️ Behavior & Micro-interactions

**1. Form Controls (The Inputs):**
- **Bank Rate Slider:** Defaults to `5.0%`. Range is `0.0%` to `15.0%`. Sliding it recalculates both the "El Banco Te Paga" card and the final "Costo de la Inacción" gap in real-time (60FPS Signal Reactivity).

**2. Shared State Synchronization (The Magic):**
- **Initial Capital:** The comparison uses the `initialCapital` value already provided by the user in the Wealth Gap section. If none was provided, it falls back to `config.defaultSavingsAmount`.
- **Time Horizon:** The `[20] años` variable is deeply tied to the Retirement timeframe. It uses the page-level `timeHorizon` signal (Target Retirement Age - Current Age). If the user bypassed the simulator, it defaults to a parameterized standard (e.g., `20` years).
- **Market Return:** Uses the page-level `expectedReturn` signal (which defaults to S&P 500 averages, typically `7.0%` or `10.5%` depending on configuration).

**3. Visual Feedback (Card Updates):**
- When the user adjusts the Bank Rate slider, the numbers inside the KPI cards use a **Count-Up Animation** (duration: `300ms`) to transition smoothly between values, preventing jarring text snaps.

---

## 📡 Angular Component Contract (Signals & Architecture)

```typescript
// src/app/features/home/cdp-vs-market/cdp-comparator.ts

// --- External Dependencies ---
// `defaultCdpRate` and `defaultTimeHorizon` are injected via APP_UI_CONFIG

// --- Shared Signals (Inputs from home-page.ts) ---
initialCapital = input.required<Signal<number>>();
expectedReturn = input.required<Signal<number>>();
timeHorizon    = input.required<Signal<number>>(); 

// --- Local Interactive State ---
// Initialize with system config default (e.g., 5.0%)
userCdpRate = signal<number>(this.config.defaultCdpRate);

// --- Compound Interest Logic (Computed) ---
bankYield = computed(() => {
  const p = this.initialCapital() || this.config.defaultSavingsAmount;
  const t = this.timeHorizon() || this.config.defaultTimeHorizon;
  const r = this.userCdpRate() / 100;
  return p * Math.pow(1 + r, t); // Simple annual compounding
});

marketYield = computed(() => {
  const p = this.initialCapital() || this.config.defaultSavingsAmount;
  const t = this.timeHorizon() || this.config.defaultTimeHorizon;
  const r = this.expectedReturn() / 100;
  return p * Math.pow(1 + r, t); 
});

theGapAmount = computed(() => {
  return this.marketYield() - this.bankYield();
});
```

---

## 🌐 i18n & Context Notes
- Ensure the "Institutional Shaming" copy is translated forcefully but professionally in English (*"The bank utilized your capital in the market and returned only a fraction. Break the cycle today."*).
- Currency formatting must respect the globally selected currency using Angular's `CurrencyPipe`.

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-23*
