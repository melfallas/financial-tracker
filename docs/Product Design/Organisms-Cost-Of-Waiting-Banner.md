# 🧩 Organism Detail: Cost of Waiting Banner (US4.2)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development · **Context:** Micro-Hook Urgency Builder

---

## 🎯 Purpose & Emotional Narrative

The **Cost of Waiting Banner** is a high-impact, full-width "speed bump" in the Narrative Scroll. Its purpose is to weaponize the user's inertia. By distilling complex market inflation down to a single, brutal question—*"How much of your savings did you lose this year?"*—it creates an instant spike in urgency, funneling the user directly to the Lead Capture form.

> **UX Philosophy:** The banner must feel like a sudden realization. It uses a dramatic count-up animation upon scrolling into view, followed by a low-friction inline input that recalculates the damage in real-time if the user edits their savings amount.

---

## 🗂️ Component Architecture & Layout

**Visual Spec:**
- A narrow, full-width embedded banner (not sticky). 
- **Positioning:** Placed strategically between the analytical tools (Simulators) and the Lead Capture/Booking Form section to act as a final "push."
- **Background:** High-contrast `Deep Blue (#1A3C6E)` to break the visual flow of light-gray sections.
- **Layout:** Responsive flexbox. On desktop, it's a single elegant row. On mobile, it stacks gracefully.
- The monetary loss is emphasized in `Soft Red (#D32F2F)`.

### 📐 Blueprint (Wireframe — Desktop)
```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│  ¿Cuánto tienes ahorrado?  [ $ 10,000  ]   En los últimos 12 meses perdiste             │
│   (White text)               (M5 Input)    aprox.  [ $ 650 ]  por inflación.            │
│                                                   (Soft Red count-up)                   │
│                                                                                         │
│                                        [ Detener Pérdida ↓ ]                            │
│                                        (A3.1 Emerald Button)                            │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 📐 Blueprint (Wireframe — Mobile Stack)
```text
┌──────────────────────────────────────────────┐
│                                              │
│  ¿Cuánto tienes ahorrado?                    │
│  [ $ 10,000 ]                                │
│                                              │
│  En los últimos 12 meses, perdiste aprox.    │
│  [ $ 650 ]                                   │
│  por inflación.                              │
│                                              │
│  [ Detener Pérdida ↓ ]                       │
│                                              │
└──────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Container Padding:** `3rem 2rem` (vertical / horizontal).
- **Current Savings Input:** A minimalist `M1 FormField` variation. No label, just the input field. `background-color: transparent`, `border-bottom: 2px solid rgba(255,255,255,0.3)`. Text is `white`, `font-size: 1.25rem`, `font-weight: 600`.
- **The "Loss Number":** `font-size: 2rem`, `font-weight: 800`, `color: var(--color-soft-red)`. Contains a subtle text-shadow for emphasis against the Deep Blue background.
- **CTA Button:** `A3.1 Primary Button` in `Emerald Green`, with a subtle down-arrow icon `↓` to indicate a scroll action.

---

## 🕹️ Behavior & Micro-interactions

**1. The Magic Pre-fill & Fallback System:**
- The banner's input is bound to a globally shared Signal (`initialCapital`).
- If the user previously entered their savings in the Wealth Gap Calculator (US3.1) above, this input is **auto-filled** with that exact value.
- If the user bypassed the calculators, the input falls back to a **parameterized system default** (e.g., `$10,000`). This default value must be configurable via an `environment` variable or a configuration token (`APP_UI_CONFIG`) so the business can adjust it without altering the component logic.

**2. The Scroll Reveal Animation:**
- The first time the banner enters the viewport (using `IntersectionObserver` or Angular's `@angular/cdk/observers`), the "Loss Number" triggers a dramatic **Count-Up Animation**.
- It counts from `$0` to the target loss amount over `1.2s` using an `easeOutExpo` easing function.

**3. Inline Editing Reactivity:**
- If the user clicks the input and types a new number (e.g., changing `$10,000` to `$50,000`), the "Loss Number" instantly recalculates.
- Upon recalculation, the count-up animation replays rapidly (`600ms`) from the old value to the new value, enforcing the feeling of a live, intelligent calculator.

**4. The "Smooth Anchor" CTA:**
- Clicking the `[ Detener Pérdida ↓ ]` button triggers a smooth scroll (`behavior: 'smooth'`) directly to the top of the Lead Capture Form (US2.1) section.

---

## 📡 Angular Component Contract (Signals)

```typescript
// src/app/features/engagement/cost-of-waiting-banner.ts

// --- Environment/Config Fallback ---
// Injected via DI token (e.g., inject(APP_CONFIG).defaultSavingsAmount)
readonly defaultSavingsAmount = 10000;

// --- Shared State ---
// Linked to the same signal used by Wealth Gap Calculator
currentSavings = input.required<WritableSignal<number>>();
inflationRate  = input.required<Signal<number>>(); // Driven by US3.1 or global default

// --- Local Component State ---
// The UI binds to this writable signal.
displaySavings = signal<number>(this.currentSavings() || this.defaultSavingsAmount);

// Effect to sync local changes back up to the global state (optional, if desired)
constructor() {
  effect(() => {
     if (this.displaySavings() !== this.currentSavings()) {
         this.currentSavings.set(this.displaySavings());
     }
  });
}

// --- Computed Business Logic ---
estimatedLoss = computed(() => {
  // Simple calculation for the micro-hook: Savings * (Inflation Rate / 100)
  return this.displaySavings() * (this.inflationRate() / 100);
});

// --- Method Hooks ---
onReveal() {
  // Trigger DOM count-up animation of this.estimatedLoss()
}

scrollToLeadCapture() {
  // document.getElementById('lead-capture-section').scrollIntoView({ behavior: 'smooth' })
}
```

---

## 🌐 i18n & Context Notes
- The strings "How much do you have saved?", "In the last 12 months you lost approx.", "to inflation", and "Stop the Loss ↓" must be cleanly externalized in `en.json/es.json`.
- The currency formatting must respect the globally selected currency (from the Market Dashboard M4 Selector), applying the correct symbol and formatting rules via Angular's `CurrencyPipe`.

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
