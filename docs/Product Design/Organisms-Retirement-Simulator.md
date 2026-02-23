# 🧩 Organism Detail: Retirement Simulator — "Nest Egg" (US3.2)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development · **Linked to:** US3.1 (Wealth Gap Chart)

---

## 🎯 Purpose & Emotional Narrative

The **Retirement Simulator** is the "Hope & Threat" tool of the Narrative Scroll. While the Wealth Gap Chart demonstrates the *silent destruction* of inflation on a single investment, this simulator makes the impact **personal and temporal**: it answers the question *"When will I run out of money?"* — and then shows the user exactly how much better their future looks if they act now.

> **Primary Narrative (The Threat First):** Lead with the painful projection. Show the user the exact year their retirement savings are depleted under their current trajectory. Then, as they engage with the inputs, reveal how optimizing their contributions changes that outcome. Convert anxiety into agency.

---

## 🗂️ Component Structure: 3-State Stepper

The Retirement Simulator is organized as a **3-state in-place Stepper** (not a separate route). No page navigation occurs. All transitions happen within the same card component.

```
State 1 → [Step 1: Current Situation] → State 2 → [Step 2: Your Goal] → State 3 → [Results]
```

**Stepper Navigation Rule:**
- Values are **always preserved** when navigating between steps. No data is ever cleared on back-navigation.
- From the Results view, editing is triggered via `[✏️]` buttons on the compact summary cards (one per step), which return the user directly to that specific step with all values intact.

---

## 📐 Blueprint: Stepper Navigator

**Visual Spec:**
- The stepper indicator sits at the top of the card, using three numbered circles connected by a progress line.
- Active step: filled `Deep Blue` circle with white number.
- Completed step: `Emerald Green` circle with a white checkmark `✓`.
- Inactive step: `Cloud Gray` circle with `Charcoal` number.
- The progress connector line fills from left to right in `Emerald Green` as steps are completed.

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [1 ✓]────────────[2 ✓]────────────[3 ●]                    │
│  Tu Situación     Tu Meta          Tu Proyección            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Step Circle:** `width: 36px`, `height: 36px`, `border-radius: 50%`.
- **Connector Line:** `height: 2px`, `background: var(--color-cloud-gray)`. Filled portion: `var(--color-emerald-green)`.
- **Step Labels:** `font-size: 0.75rem`, `font-weight: 600`, `color: var(--color-charcoal)`.

---

## 🪜 Step 1: Tu Situación Actual (Current Situation)

**Visual Spec:**
- Three `M2 SliderControl` molecules stacked vertically inside the card.
- A subtle `h4` section header: *"Tell us about your current finances"* in `Deep Blue`.
- Each slider has a live value badge (A7) on the right of its label row.
- The card has a white background with `shadow-premium` elevation.

### 📐 Blueprint (Wireframe)
```text
┌──────────────────────────────────────────────────────────────┐
│ Step 1 of 2: Your Current Situation                          │
│                                                              │
│ [M2 Slider] Current Age              [       34 yrs ]        │
│ ────────────────────●────────────────────────────────────    │
│  18                                                       75 │
│                                                              │
│ [M2 Slider] Current Savings          [    $25,000 USD ]      │
│ ─────●───────────────────────────────────────────────────    │
│  $0                                               $2,000,000 │
│                                                              │
│ [M2 Slider] Monthly Contribution     [      $500 USD ]       │
│ ─────●───────────────────────────────────────────────────    │
│  $0                                                  $10,000 │
│                                                              │
│                          [ Continue → ]                      │
└──────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Card Padding:** `2rem`.
- **Sliders:** Use `M2 SliderControl` spec. `unit` = `'yrs'` for age, `'$'` for monetary values.
- **Continue Button:** `A3.2 Secondary Button` (Deep Blue). Changes to Emerald Green `A3.1` only upon the final CTA.
- **Minimum touch target for all sliders:** `44px`.

### 🕹️ Behavior & Micro-interactions
- **Age Slider:** Range `18–75`. Step = `1 year`.
- **Current Savings:** Range `$0–$2,000,000`. Step = `$500`. Value formatted with currency pipe.
- **Monthly Contribution:** Range `$0–$10,000`. Step = `$50`.
- **Validation:** The "Continue" button is only enabled if `currentAge < retirementAge` (cross-validated with Step 2 data if already entered).

---

## 🪜 Step 2: Tu Meta (Your Goal)

**Visual Spec:**
- Three inputs: Target Retirement Age (slider), Expected Annual Return % (slider, pre-filled from Wealth Gap), and Annual Inflation % (slider, **shared and synchronized** with the Wealth Gap Calculator slider above on the page).
- The `Inflation %` slider has a subtle pill label `[ Linked to Calculator ]` in `Teal Bright` to communicate the data sync to the user.
- A `Deep Blue` info note below: *"Expected return and inflation estimates are pre-filled based on your Wealth Gap Calculator settings. You can adjust them independently here."*

### 📐 Blueprint (Wireframe)
```text
┌──────────────────────────────────────────────────────────────┐
│ Step 2 of 2: Your Retirement Goal                            │
│                                                              │
│ [M2 Slider] Target Retirement Age    [       65 yrs ]        │
│ ──────────────────────────●──────────────────────────────    │
│  35                                                       85 │
│                                                              │
│ [M2 Slider] Expected Annual Return   [        7.0% ]         │
│ ──────────────────────●──────────────────────────────────    │
│  1%                                                      25% │
│                                                              │
│ [M2 Slider] Annual Inflation Rate    [        6.5% ]         │
│ ─────────────────────●───────────────────────────────────    │
│  0%                      [ Linked to Calculator ]        15% │
│                                                              │
│                                                              │
│  ℹ️  Pre-filled from your Wealth Gap Calculator settings.    │
│                                                              │
│   [ ← Back ]                     [ See My Projection → ]    │
└──────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **"Linked" Pill:** `background: rgba(0, 150, 136, 0.15)`, `color: var(--color-teal-bright)`, `font-size: 0.7rem`, `border-radius: 9999px`, `padding: 2px 8px`.
- **Info Note:** `font-size: 0.8rem`, `color: var(--color-charcoal)`, `opacity: 0.75`, with a small `ℹ️` icon.
- **Back Button:** Ghost-style `A3.3`.
- **"See My Projection" Button:** `A3.1` Emerald Green (this is the final step trigger).

### 🕹️ Behavior & Micro-interactions
- **Linked Signal:** `inflationRate` is a shared `signal()` in the parent page component, consumed by both this step and the Wealth Gap Chart. Changing it here updates the Wealth Gap chart live (and vice versa), creating a powerful "everything is connected" feeling.
- **Danger Threshold:** If `inflationRate > expectedReturn`, the "See My Projection" button becomes a warning state: an amber border and helper text: *"⚠️ Your inflation rate exceeds your expected return. This will result in a net loss."*

---

## 🪜 Step 3: Results — La Proyección

This is the most emotionally charged state of the simulator. It must be visually stunning and psychologically impactful.

### 📐 Blueprint (Wireframe — Full Results Layout)
```text
┌──────────────────────────────────────────────────────────────────┐
│  [ EDIT ] Tu Situación: Age 34 · $25K · $500/mo                  │  ← Compact Summary + Edit
│  [ EDIT ] Tu Meta: Retire at 65 · 7% Return · 6.5% Inflation     │  ← Compact Summary + Edit
│  ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  [⚠️  THREAT BLOCK]                                              │
│  At your current pace, your savings will be                      │
│  depleted by age                                                 │
│                        [ 78 ]                                    │
│              (Soft Red, large, counter animation)                │
│                                                                  │
│  ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  [✅  HOPE BLOCK — The Financial Freedom Date]                    │
│  With your planned contributions, you could achieve              │
│  Financial Freedom in:                                           │
│                                                                  │
│         [ 31 Years · 4 Months ]   ← Emerald Green, large        │
│             🏁 Year: 2057                                        │
│                  [confetti burst on first render]                │
│                                                                  │
│  ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  [CHART: Nest Egg Growth vs. Retirement Expenses]                │
│   $2M |    /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾[🏁 Freedom Point]             │
│       |   /                                                      │
│   $1M |  /  ·  ·  ·  ·  ·  ·  ·  ·  [4% Rule Line]             │
│       | /        ↓ Expense Line (Soft Red)                       │
│    $0 |/________________________________________                 │
│        Y0   Y10   Y20   Y30   Y40                                │
│                                                                  │
│  ─────────────────────────────────────────────────────────────── │
│                                                                  │
│   Want to optimize your retirement plan?                         │
│   [ Agenda tu Revisión para tu Plan de Retiro → ]                │
│             (A3.1 Emerald Green Primary CTA)                     │
└──────────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec

**Compact Edit Summary Cards:**
- Thin pill-shaped cards above the results.
- `background: var(--color-cloud-gray)`.
- `font-size: 0.8rem`, key values in `font-weight: 700`.
- `[✏️ Edit]` link on the right, `color: var(--color-teal-bright)`.

**Threat Block (The "Run Out" Age):**
- Label: `font-size: 1rem`, `color: var(--color-charcoal)`.
- Age Number: `font-size: 4.5rem`, `font-weight: 700`, `color: var(--color-soft-red)`.
- Container: subtle `Soft Red` tint background `rgba(211, 47, 47, 0.05)`, `border-left: 4px solid var(--color-soft-red)`.

**Hope Block (The Freedom Date Counter):**
- Label: `font-size: 1rem`, `color: var(--color-charcoal)`.
- Counter: `font-size: 3rem`, `font-weight: 700`, `color: var(--color-emerald-green)`.
- Year: `font-size: 1.25rem`, `color: var(--color-deep-blue)`.
- Container: subtle `Emerald Green` tint background `rgba(0, 200, 83, 0.05)`, `border-left: 4px solid var(--color-emerald-green)`.

**The Nest Egg Chart:**
- **Nest Egg Growth Line:** `borderColor: var(--color-emerald-green)`, `borderWidth: 3`, `fill: true`, `backgroundColor: rgba(0, 200, 83, 0.08)`.
- **Projected Expense Line:** `borderColor: var(--color-soft-red)`, `borderDash: [6, 4]`, `borderWidth: 2`.
- **4% Rule Reference Line:** Horizontal dashed line in `Golden Amber (#FFC107)` with a label `"4% Rule: $X / year"`.
- **Freedom Point Marker:** A vertical annotation line at the freedom year in `Emerald Green` with a small `🏁` label.

### 🕹️ Behavior & Micro-interactions

**Entry Animation:**
- When the Results state first renders (after "See My Projection" is clicked):
  1. The Threat Block fades in first. The "Run Out Age" number counts UP from 0 to the value in `800ms` (a Soft Red odometer effect creating alarm).
  2. `500ms` pause.
  3. The Hope Block fades in. The Freedom Date counter counts DOWN (from a large number to the actual value) in `1.2s` (creating a sense of things improving).
  4. A `confetti` / starburst micro-animation plays for `600ms` around the Freedom Date display.
  5. The chart sweeps in left-to-right in `1.0s`.

**Real-Time Reactivity:**
- If the user edits a value via the `[✏️ Edit]` buttons, the simulator automatically triggers a transition back to that step with values preserved.
- Upon returning to Results (e.g., via "See My Projection" again), all blocks re-animate from scratch so the user feels the delta.

**Warning State (Mathematically Unachievable):**
- If `inflationRate` ≥ `expectedReturn`, the Freedom Date cannot be calculated.
- Replace the Hope Block with an Alert Block:

```text
┌────────────────────────────────────────────────────────────────┐
│  ⚠️  Financial Independence Unreachable                        │
│                                                                │
│  With an inflation rate exceeding your expected return,        │
│  your savings will lose real value over time. A strategy       │
│  change is essential.                                          │
│                                                                │
│  [ Agenda tu Revisión — Hablemos de Estrategia → ]            │
│       (A3.1 Emerald CTA — urgency increases here)              │
└────────────────────────────────────────────────────────────────┘
```
- Alert Block: `border-left: 4px solid var(--color-warm-orange)`, `background: rgba(245, 124, 0, 0.05)`.

---

## 📡 Angular Component Contract (Signals)

```typescript
// src/app/features/simulators/retirement-simulator.ts

type SimulatorStep = 'step1' | 'step2' | 'results';

// --- Navigation ---
currentStep = signal<SimulatorStep>('step1');

// --- Step 1 Inputs (Persistent) ---
currentAge          = signal<number>(34);
currentSavings      = signal<number>(25000);
monthlyContribution = signal<number>(500);

// --- Step 2 Inputs (Persistent, Linked to Wealth Gap) ---
retirementAge   = signal<number>(65);
expectedReturn  = signal<number>(7.0);
// NOTE: inflationRate is injected from the SHARED page-level signal
// to maintain synchronization with the Wealth Gap Calculator.
inflationRate = input.required<WritableSignal<number>>();

// --- Computed Results ---
freedomDate = computed(() => {
  // Uses finance-math.ts utility to project nest egg growth
  // Returns: { freedomYear: number, freedomAge: number, runOutAge: number } | null
});

isImpossible = computed(() =>
  this.inflationRate()() >= this.expectedReturn()
);

showConfetti = signal<boolean>(false);
```

---

## 🔗 Dependencies & Shared State

| Dependency | Source | Notes |
|:-----------|:-------|:------|
| `inflationRate` signal | Parent `home-page.ts` | Shared with `WealthGapChart`. Changing it here updates the chart above. |
| `calculateRetirement()` | `shared/utils/finance-math.ts` | TDD: 100% coverage required. |
| `confetti` animation | CSS keyframes / lightweight JS lib | Evaluate `canvas-confetti` (3KB gzipped). |
| `M2 SliderControl` | `shared/components/slider-control` | Used for all 5 parameter inputs. |

---

## 🌐 i18n Notes
- "Financial Freedom in X years and Y months" must be externalized with interpolation tokens.
- "Run out of money by age X" must also be externalized.
- All step titles and button labels must be in `en.json` / `es.json`.

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
