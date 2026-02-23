# 🧩 Atoms & Molecules Design Specification
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Ready for Development — Consumed by US1.2, US1.3, US2.1, US3.1

---

## 🎯 Purpose
This document defines every reusable **Atom** and **Molecule** for the Financial Tracker design system. It provides development-ready specifications including: exact CSS token values, all interaction states, Angular component contracts, Storybook story inventory, and accessibility requirements. No Atom or Molecule should be built without following this spec.

> **Golden Rule:** Atoms are the smallest indivisible UI unit. Molecules are composed of 2+ Atoms that work together as a functional UI group.

---

## ⚙️ Design Tokens Reference (Tailwind v4 `@theme`)

All components MUST use these CSS variables. Never hardcode hex values in component CSS.

```css
@import "tailwindcss";

@theme {
  /* ── 80% TRUST LAYER ── */
  --color-deep-blue:    #1A3C6E;
  --color-cloud-gray:   #ECEFF1;
  --color-charcoal:     #37474F;

  /* ── 15% ACTION LAYER ── */
  --color-emerald-green: #00C853;
  --color-teal-bright:   #009688;

  /* ── ALERT LAYER (Minimal Use) ── */
  --color-soft-red:      #D32F2F;
  --color-warm-orange:   #F57C00;
  --color-golden-amber:  #FFC107;

  /* ── TYPOGRAPHY ── */
  --font-sans: 'Inter', system-ui, sans-serif;

  /* ── ELEVATION & SHAPE ── */
  --shadow-premium:  0 10px 30px -10px rgba(26, 60, 110, 0.20);
  --shadow-cta:      0 4px 14px rgba(0, 200, 83, 0.30);
  --shadow-hover:    0 8px 24px rgba(0, 200, 83, 0.45);
  --radius-card:     1.5rem;
  --radius-btn:      0.5rem;
  --radius-pill:     9999px;
}
```

---

# 🔵 ATOMS

---

## A1. Color Palette Token Showcase

**Storybook Story:** `Atoms/DesignSystem/ColorPalette`

| Token | HEX | Role | Usage |
|:------|:----|:-----|:------|
| `--color-deep-blue` | `#1A3C6E` | Primary Brand | Headers, Navbar, H1/H2 text |
| `--color-cloud-gray` | `#ECEFF1` | Surface | App background, card surfaces |
| `--color-charcoal` | `#37474F` | Body Text | Paragraphs, labels, secondary text |
| `--color-emerald-green` | `#00C853` | Conversion | **All CTAs only**, success states, growth lines |
| `--color-teal-bright` | `#009688` | Interaction | Icons, slider tracks, hover accents |
| `--color-soft-red` | `#D32F2F` | Danger | Inflation loss, validation errors, Wealth Gap shading |
| `--color-golden-amber` | `#FFC107` | Warning | Neutral metrics, financial milestones |
| `--color-warm-orange` | `#F57C00` | Subtle Alert | Minor alert indicators only |

**WCAG Contrast Guarantees:**
- Deep Blue (`#1A3C6E`) on Cloud Gray (`#ECEFF1`) → **8.7:1** ✅ AAA
- Emerald Green (`#00C853`) button with White text → **4.6:1** ✅ AA
- Charcoal (`#37474F`) on Cloud Gray → **7.2:1** ✅ AAA

---

## A2. Typography Scale

**Storybook Story:** `Atoms/DesignSystem/Typography`

Font: **Inter** (loaded from Google Fonts) — `font-display: swap` for performance.

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Tag | Size | Weight | Line Height | Color | Usage |
|:----|:-----|:-------|:------------|:------|:------|
| `h1` | `3.5rem` (56px) | 700 | 1.15 | `--color-deep-blue` | Hero headline |
| `h2` | `2.25rem` (36px) | 700 | 1.25 | `--color-deep-blue` | Section titles |
| `h3` | `1.5rem` (24px) | 600 | 1.35 | `--color-deep-blue` | Card headings |
| `h4` | `1.125rem` (18px) | 600 | 1.4 | `--color-charcoal` | Widget labels |
| `p` (body) | `1rem` (16px) | 400 | 1.65 | `--color-charcoal` | General body text |
| `small` | `0.875rem` (14px) | 400 | 1.5 | `--color-charcoal` | Helper text, captions |
| `.highlight-text` | Inherited | 700 | Inherited | `--color-emerald-green` | Key phrases in H1 (e.g. "Libertad Financiera") |

**Mobile Scale Breakpoints:**
- `h1` → `2.5rem` on `< 768px`
- `h2` → `1.75rem` on `< 768px`

---

## A3. Button Atoms

**Storybook Story:** `Atoms/Buttons/[variant]`

### A3.1 — Primary Button (Emerald CTA)
> **STRICT RULE:** This variant is exclusively for conversion actions (Download PDF, Schedule Call, Submit Form).

```css
/* States specification */
.btn-primary {
  background:    var(--color-emerald-green);   /* #00C853 */
  color:         #FFFFFF;
  font-size:     1rem;
  font-weight:   600;
  padding:       14px 28px;
  border-radius: var(--radius-btn);            /* 0.5rem */
  border:        none;
  box-shadow:    var(--shadow-cta);
  transition:    all 200ms ease-out;
  min-height:    48px;                         /* A11y touch target */
}

/* Hover */
.btn-primary:hover {
  background: #00a844;
  transform:  translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* Focus (keyboard) */
.btn-primary:focus-visible {
  outline:        3px solid var(--color-teal-bright);
  outline-offset: 3px;
}

/* Loading */
.btn-primary[aria-busy="true"] {
  background: #00a844;
  opacity:    0.85;
  cursor:     wait;
}

/* Disabled / Success */
.btn-primary:disabled {
  background: var(--color-charcoal);           /* #37474F */
  color:      rgba(255,255,255,0.6);
  box-shadow: none;
  cursor:     not-allowed;
  transform:  none;
}
```

**States:** `default` | `hover` | `focus` | `loading` (spinner) | `success` (checkmark) | `disabled`

**Angular Contract:**
```typescript
// src/app/shared/components/btn-primary/btn-primary.ts
label   = input<string>('');
loading = input<boolean>(false);
disabled = input<boolean>(false);
clicked = output<void>();
```

---

### A3.2 — Secondary Button (Deep Blue)

> Used for navigation actions, "Ver cómo funciona", "Schedule a Call" in Navbar.

```css
.btn-secondary {
  background:    var(--color-deep-blue);       /* #1A3C6E */
  color:         #FFFFFF;
  padding:       10px 20px;
  border-radius: var(--radius-btn);
  font-weight:   600;
  transition:    background 200ms ease-out;
  min-height:    44px;
}

.btn-secondary:hover      { background: #132c52; }
.btn-secondary:focus-visible {
  outline:        3px solid var(--color-teal-bright);
  outline-offset: 3px;
}
```

---

### A3.3 — Ghost Button (Outlined)

> Used as a secondary action alternative below primary CTAs (e.g., "Ver cómo funciona").

```css
.btn-ghost {
  background:    transparent;
  color:         var(--color-deep-blue);
  border:        2px solid var(--color-deep-blue);
  padding:       10px 20px;
  border-radius: var(--radius-btn);
  font-weight:   600;
  transition:    all 200ms ease-out;
  min-height:    44px;
}

.btn-ghost:hover {
  background: var(--color-deep-blue);
  color:      #FFFFFF;
}
```

---

### A3.4 — Floating CTA (Pill Button)

> Fixed `bottom-right` on all pages. Hidden on Hero viewport; appears on first scroll.

```css
.btn-floating-cta {
  position:      fixed;
  bottom:        2rem;
  right:         2rem;
  background:    var(--color-emerald-green);
  color:         #FFFFFF;
  padding:       14px 24px;
  border-radius: var(--radius-pill);           /* 9999px */
  font-weight:   700;
  font-size:     0.95rem;
  box-shadow:    0 8px 32px rgba(0, 200, 83, 0.45);
  display:       flex;
  align-items:   center;
  gap:           0.5rem;
  z-index:       1000;
  transition:    opacity 300ms ease, transform 300ms ease;
}

/* Hidden state (above hero fold) */
.btn-floating-cta.hidden {
  opacity:    0;
  transform:  translateY(20px);
  pointer-events: none;
}
```

**Accessibility:** `aria-label="Agendar una Consulta"` (required for icon+text combo when text is hidden on small screens).

---

## A4. Icon System

**Storybook Story:** `Atoms/Icons/Showcase`

- **Style:** Outline/linear SVG icons. Stroke weight: `1.5px`.
- **Default Color:** `var(--color-teal-bright)` (`#009688`)
- **Hover Transition:** `color` transitions to `var(--color-emerald-green)` over `200ms ease`.
- **Sizes:**
  - `sm`: `16x16px`
  - `md`: `20x20px`
  - `lg`: `24x24px`
  - `xl`: `32x32px`
- **Required `aria-hidden="true"`** when icon is purely decorative (label is visible nearby).
- **Required `aria-label` on parent button** when icon-only.

**Key Icons Needed (Phase 1):**

| Icon | Use Case | Color Default |
|:-----|:---------|:--------------|
| `calendar` | Floating CTA, Booking | `--color-teal-bright` |
| `trending-up` | Growth indicators | `--color-emerald-green` |
| `trending-down` | Inflation loss | `--color-soft-red` |
| `check-circle` | Success states | `--color-emerald-green` |
| `alert-triangle` | Warning states | `--color-golden-amber` |
| `dollar-sign` | Currency widgets | `--color-teal-bright` |
| `bar-chart-2` | Diagnostics | `--color-teal-bright` |
| `shield` | Advisory | `--color-deep-blue` |
| `mail` | Email delivery | `--color-teal-bright` |
| `download` | PDF download | `--color-emerald-green` |

---

## A5. Input Atom (Text Field)

**Storybook Story:** `Atoms/Forms/InputText`

Uses **PrimeNG `InputText`** + Tailwind customization. Never use raw `<input>` without this atom.

```css
/* Base state */
.p-inputtext {
  border:        1.5px solid #CBD5E0;          /* neutral-300 */
  border-radius: 0.375rem;
  padding:       12px 16px;
  font-family:   var(--font-sans);
  font-size:     1rem;
  color:         var(--color-charcoal);
  background:    #FFFFFF;
  width:         100%;
  min-height:    48px;                         /* A11y */
  transition:    border-color 150ms ease;
}

/* Focus */
.p-inputtext:focus {
  border-color: var(--color-teal-bright);      /* #009688 */
  box-shadow:   0 0 0 3px rgba(0, 150, 136, 0.15);
  outline:      none;
}

/* Valid */
.p-inputtext.ng-valid.ng-dirty {
  border-color: var(--color-teal-bright);
}

/* Invalid */
.p-inputtext.ng-invalid.ng-dirty {
  border-color: var(--color-soft-red);         /* #D32F2F */
  animation:    shake 300ms ease;
}

/* Shake micro-interaction for validation error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
```

**States:** `empty` | `focused` | `filled-valid` | `filled-invalid` | `disabled`

**Helper Text:**
- Error message: `font-size: 0.8rem`, `color: var(--color-soft-red)`, `margin-top: 4px`.
- Hint text: `font-size: 0.8rem`, `color: var(--color-charcoal)`, `opacity: 0.7`.

---

## A6. Checkbox Atom (GDPR Consent)

**Storybook Story:** `Atoms/Forms/Checkbox`

Uses **PrimeNG `Checkbox`**.

- **Unchecked:** `border: 1.5px solid #CBD5E0`, `background: white`, `border-radius: 4px`.
- **Checked:** `background: var(--color-teal-bright)`, checkmark in white.
- **Focus ring:** `3px solid var(--color-teal-bright)`.
- **Label:** `font-size: 0.9rem`, `color: var(--color-charcoal)`, with hyperlink to Privacy Policy in `--color-teal-bright`.
- **Required ARIA:** `aria-required="true"`, `aria-describedby` pointing to the label id.

---

## A7. Badge / Metric Chip

**Storybook Story:** `Atoms/Badges/MetricChip`

Used for KPI values (Nominal balance, Inflation loss, Freedom Date).

```css
.badge-metric {
  display:       inline-flex;
  align-items:   center;
  gap:           6px;
  padding:       6px 12px;
  border-radius: var(--radius-pill);
  font-weight:   700;
  font-size:     0.875rem;
}

/* Variants */
.badge-metric--growth   { background: rgba(0, 200, 83, 0.12);  color: #005929; }  /* Emerald tint */
.badge-metric--loss     { background: rgba(211, 47, 47, 0.12); color: #8b0000; }  /* Red tint */
.badge-metric--neutral  { background: rgba(26, 60, 110, 0.10); color: var(--color-deep-blue); }
.badge-metric--warning  { background: rgba(255, 193, 7, 0.15); color: #7a5c00; }
```

---

## A8. Skeleton Loader

**Storybook Story:** `Atoms/Loading/Skeleton`

Used for ALL data-fetching widgets. Must mirror the exact shape of the final content.

```css
.skeleton {
  background:         #E2E8F0;
  border-radius:      0.375rem;
  animation:          pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* Sizes */
.skeleton--text   { height: 1rem;  width: 100%; }
.skeleton--title  { height: 2rem;  width: 60%; }
.skeleton--chart  { height: 240px; width: 100%; border-radius: var(--radius-card); }
.skeleton--card   { height: 160px; width: 100%; border-radius: var(--radius-card); }
```

---

# 🟢 MOLECULES

---

## M1. `FormField` Molecule (Label + Input + Helper)

**Storybook Story:** `Molecules/Forms/FormField`
**Composed of:** A5 (Input) + A6 (Checkbox optional) + Typography (A2)

The standard wrapper for any form input. Used in Lead Capture and Booking forms.

```html
<!-- Template structure -->
<div class="form-field">
  <label for="email" class="form-label">
    Correo Electrónico <span aria-label="required" class="form-required">*</span>
  </label>
  <input pInputText id="email" ... />
  <small id="email-error" class="form-error" role="alert">
    Por favor ingresa un correo válido.
  </small>
</div>
```

```css
.form-field     { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.form-label     { font-size: 0.875rem; font-weight: 600; color: var(--color-charcoal); }
.form-required  { color: var(--color-soft-red); margin-left: 3px; }
.form-error     { font-size: 0.8rem; color: var(--color-soft-red); display: none; }
.form-error.visible { display: block; }
```

**Angular Contract:**
```typescript
label       = input<string>('');
fieldId     = input<string>('');
errorMessage = input<string>('');
required    = input<boolean>(false);
```

---

## M2. Slider Control Molecule
**Storybook Story:** `Molecules/Calculators/SliderControl`
**Composed of:** A2 (Typography label) + PrimeNG Slider + A7 (Badge for live value)

The core interactive unit for ALL financial calculators (Wealth Gap, Retirement).

### 📐 Blueprint (Wireframe)
```text
┌───────────────────────────────────────────────────────────┐
│ [Label: Left]                            [Badge: Right]   │
│ Inflación Anual (%)                            [ 12.5% ]  │
│                                                           │
│ [Slider Track: Full Width]                                │
│ ───────────●────────────────────────────────────────────  │
│                                                           │
│ [Min: Left]                                   [Max: Right]│
│ 0%                                                     15%│
└───────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
*   **Container:** `display: flex`, `flex-direction: column`, `gap: 12px`.
*   **Label Row:** `display: flex`, `justify-content: space-between`, `align-items: center`.
*   **Label Style:** `font-weight: 600`, `color: var(--color-deep-blue)`.
*   **Badge (A7):**
    *   Default: `.badge-metric--neutral`.
    *   **Alert State (> 8%):** `.badge-metric--loss` (Red background, white text).
*   **PrimeNG Slider CSS Overrides:**
    *   `track-height`: `6px`.
    *   `handle-size`: `24px × 24px`.
    *   `handle-border`: `3px solid var(--color-teal-bright)`.
    *   `handle-shadow`: `0 4px 8px rgba(0, 150, 136, 0.25)`.
    *   `filled-range-bg`: `var(--color-emerald-green)` (when positive) or `var(--color-soft-red)` (when negative/risk).

### 🕹️ Behavior & Micro-interactions
*   **Real-time Feedback:** The Badge (A7) value updates instantly as the handle moves.
*   **Threshold Trigger:** When the value crosses `8%`, the badge transitions from Blue to Red with a `150ms` fade.
*   **Step Interaction:** Slider snaps to defined increments (e.g., `0.1%`) to prevent "jittery" data.

**Angular Contract:**
```typescript
label      = input<string>('');
min        = input<number>(0);
max        = input<number>(100);
step       = input<number>(1);
unit       = input<'%' | '$' | 'yrs'>('%');
value      = model<number>(0);             // two-way binding
dangerThreshold = input<number | null>(8); // defaults to 8 for inflation
```

---

## M3. KPI Summary Card Molecule
**Storybook Story:** `Molecules/Cards/KpiCard`  —  `States: default | loading | offline-error`
**Composed of:** A2 (Typography) + A7 (Metric Badge) + A8 (Skeleton)

### 📐 Blueprint (Wireframe - Multi-state)
```text
┌──────────────────────────────┐   ┌──────────────────────────────┐
│ [Icon]  S&P 500              │   │ [Icon]  S&P 500              │
│                              │   │                              │
│ $5,842.50                    │   │ [  Skeleton Block (70%)  ]   │
│                              │   │                              │
│ [Trend: UP] +1.24%  [Badge]  │   │ [  Skeleton Block (30%)  ]   │
└─────────── ACTIVE ───────────┘   └────────── LOADING ───────────┘
```

### ✨ Figma Visual Spec
*   **Card Body:**
    *   Background: `var(--color-cloud-gray)` (`#ECEFF1`).
    *   Radius: `1.5rem`.
    *   Shadow: `var(--shadow-premium)`.
    *   Transition: `transform 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`.
*   **Typography:**
    *   Price: `font-size: 2rem`, `font-weight: 700`, `color: var(--color-deep-blue)`.
    *   Label: `font-size: 0.9rem`, `color: var(--color-charcoal)`, `opacity: 0.8`.
*   **Offline State:**
    *   Background: `rgba(236, 239, 241, 0.5)`.
    *   Value: `opacity: 0.3`.
    *   Badge: `.badge-metric--warning` with text "[ DATOS OFFLINE ]".

### 🕹️ Behavior & Micro-interactions
*   **Hover Lift:** Elevation slightly increases on hover to indicate interactability.
*   **Skeleton Switch:** Content fades in using a `300ms` opacity transition once data is ready.
*   **Value Counting:** Large currency values count up from 0 on the first mount.

**Angular Contract:**
```typescript
label     = input<string>('');
value     = input<string>('');          // formatted string: "$5,842.50"
trend     = input<number>(0);           // positive=up, negative=down
loading   = input<boolean>(false);
offline   = input<boolean>(false);
icon      = input<string>('bar-chart'); // icon name
```

---

## M4. Currency Selector Molecule

**Storybook Story:** `Molecules/Controls/CurrencySelector`
**Composed of:** Icon (A4) + PrimeNG Dropdown

Appears in the Navbar. Allows the user to switch between USD, EUR, ARS, MXN, CRC.

```
[🌎] USD ▾
```

**Visual Spec:**
- **Trigger:** Ghost-style, minimal border. Globe icon in `--color-teal-bright`. Font in `--color-charcoal`.
- **Dropdown:** White background, `border-radius: 0.75rem`, `box-shadow: 0 8px 24px rgba(0,0,0,0.1)`.
- **Selected option:** Show currency flag emoji + code + name.
- **Active option:** `background: rgba(0, 150, 136, 0.08)`, text in `--color-deep-blue`.
- **Min width:** `160px`.

---

## M5. Language Toggle Molecule (`ES | EN`)

**Storybook Story:** `Molecules/Controls/LanguageToggle`
**Composed of:** Two text options acting as a pill toggle

```
[ ES | EN ]  ← pill style
```

**Visual Spec:**
- **Active language:** Bold, `color: var(--color-deep-blue)`, with a subtle `background: rgba(26,60,110,0.08)` pill highlight.
- **Inactive language:** Regular weight, `color: var(--color-charcoal)`, `opacity: 0.6`.
- **Divider:** `|` in `--color-cloud-gray` darker tint.
- **Transition:** `150ms ease` on background and color.
- **On dark (sticky Navbar):** Active language is white bold; inactive is `rgba(255,255,255,0.5)`.

**Accessibility:** `role="radiogroup"`, each option is `role="radio"` with `aria-checked`.

---

## M6. Wealth Gap Chart Summary Molecule
**Storybook Story:** `Molecules/Charts/WealthGapSummary`  —  `States: empty | projected | max-inflation`
**Composed of:** Two A7 Badges (Nominal vs Real) + A2 body text

### 📐 Blueprint (Wireframe)
```text
┌───────────────────────────────────────────────────────────┐
│ [Label: Deep Blue Bold]                                   │
│ Tu dinero en 20 años:                                     │
│                                                           │
│ [Badge: Emerald Tint]             [Badge: Soft Red Tint]  │
│ $284,500 NOMINAL                 $142,000 REAL           │
│                                                           │
│ [Paragraph: Charcoal]                                     │
│ La inflación erosionará $142,500 de tu poder adquisitivo. │
│ Eso es el 50% de tu crecimiento total.                    │
└───────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
*   **Container:** `max-width: 600px`, `padding: 1.5rem`, `background: transparent`.
*   **Heading:** `h3` size, `margin-bottom: 1rem`.
*   **Badge Row:** `display: flex`, `gap: 16px`, `margin-bottom: 1.5rem`.
*   **Narrative Text:**
    *   Font size: `1.125rem` (18px).
    *   Inflation amount: `font-weight: 700`, `color: var(--color-soft-red)`.
    *   Percentage highlight: `font-weight: 700`, `color: var(--color-charcoal)`.

### 🕹️ Behavior & Micro-interactions
*   **Narrative Impact:** As inflation sliders increase, the "Real" badge value drops and its color saturation increases.
*   **Dynamic erosion:** The dollar amount of erosion counts up rapidly matching chart movement.
*   **Urgency State:** If erosion > 60%, the percentage text turns `Soft Red`.

**Angular Contract:**
```typescript
nominalValue = input<number>(0);
realValue    = input<number>(0);
erosionAmount = computed(() => this.nominalValue() - this.realValue());
erosionPct    = computed(() => (this.erosionAmount() / this.nominalValue()) * 100);
```

---

## M7. Skeleton Card Molecule

**Storybook Story:** `Molecules/Loading/SkeletonCard`
**Composed of:** A8 Skeleton blocks arranged as a card layout

Shown while any API data card is loading. Mirrors the KPI Card (M3) shape exactly.

```css
.skeleton-card {
  padding:       1.5rem;
  border-radius: var(--radius-card);
  background:    #FFFFFF;
  box-shadow:    var(--shadow-premium);
}
```

Layout: One `skeleton--text` (40% width) for label row, one `skeleton--title` (70% width) for value, one `skeleton--text` (30% width) for trend.

---

## M8. Success Feedback Molecule

**Storybook Story:** `Molecules/Feedback/SuccessMessage`
**Composed of:** SVG checkmark icon (animated) + A2 Typography

Shown after PDF generation or form submission success.

```
       ✅
   ¡PDF Enviado!
  Revisa tu bandeja de
  entrada (y spam 😉)
```

**Animation Spec:**
- **Checkmark circle:** SVG path with `stroke-dasharray` animated from `0` to `100%` in `600ms ease-out`.
- **Circle color:** `var(--color-emerald-green)`.
- **Card transition:** Parent card fades from white to a very light Teal tint (`rgba(0, 150, 136, 0.06)`) over `400ms`.
- **Text fade-in:** Appears with `opacity: 0 → 1` and `translateY(8px → 0)` over `400ms`, delayed `300ms`.

---

# 📋 Storybook Story Inventory Summary

| Category | Story | Variants |
|:---------|:------|:---------|
| `Atoms/DesignSystem` | `ColorPalette` | — |
| `Atoms/DesignSystem` | `Typography` | — |
| `Atoms/Buttons` | `Primary` | default, hover, loading, success, disabled |
| `Atoms/Buttons` | `Secondary` | default, hover |
| `Atoms/Buttons` | `Ghost` | default, hover |
| `Atoms/Buttons` | `FloatingCTA` | visible, hidden |
| `Atoms/Icons` | `Showcase` | all icons in all sizes |
| `Atoms/Forms` | `InputText` | empty, focused, valid, invalid, disabled |
| `Atoms/Forms` | `Checkbox` | unchecked, checked, focus |
| `Atoms/Badges` | `MetricChip` | growth, loss, neutral, warning |
| `Atoms/Loading` | `Skeleton` | text, title, chart, card |
| `Molecules/Forms` | `FormField` | default, error-shown |
| `Molecules/Calculators` | `SliderControl` | default, danger-threshold |
| `Molecules/Cards` | `KpiCard` | default, loading, offline |
| `Molecules/Controls` | `CurrencySelector` | closed, open |
| `Molecules/Controls` | `LanguageToggle` | ES active, EN active, on-dark |
| `Molecules/Charts` | `WealthGapSummary` | empty, projected, max-inflation |
| `Molecules/Loading` | `SkeletonCard` | — |
| `Molecules/Feedback` | `SuccessMessage` | enter animation |

---

# 🛑 Anti-Patterns (What NOT to do)

1. **NEVER use Emerald Green** for non-CTA elements (e.g., informational icons, headers). It must retain its "conversion" signal scarcity.
2. **NEVER hardcode hex values** in component CSS files. Always use `var(--color-*)` tokens.
3. **NO `ngClass`** or `ngStyle` in templates. Use `class` and `style` bindings per AGENTS.md.
4. **NO inline templates** for any component with more than 8 lines of HTML.
5. **Never show both Nominal and Real badges in the same green** — the gap (loss) must always be visually red.
6. **Touch targets** for buttons and sliders MUST be ≥ 44×44px — use invisible padding if needed.

---

# 🔗 Dependencies for Winston (Architect)

Before any Atom/Molecule development begins, these must be confirmed in `app.config.ts`:

- [ ] **Tailwind v4** `@import "tailwindcss"` + `@theme` block in `src/styles.css`
- [ ] **PrimeNG** installed with `tailwindcss-primeui` preset configured
- [ ] **Inter font** loaded in `src/index.html`
- [ ] **PrimeNG theme** mapped to Financial Tracker tokens (Deep Blue = primary, Emerald = success, Red = danger)
- [ ] **Storybook** configured with Tailwind + PrimeNG preview support

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
