# 🧩 Organism Detail: Wealth Gap Chart (US3.1)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development

---

## 🎯 Purpose
The **Wealth Gap Chart** is the emotional core of the application. It acts as an "Educational Conversion Engine" designed to trigger a loss aversion response. By visually demonstrating how inflation silently erodes purchasing power over time (The Wealth Gap), it prepares the user to take action (Lead capture). 

This document details the exact micro-interactions, animation physics, and tooltip behaviors required to maximize this emotional impact, adhering strictly to the "Clear" premium fintech aesthetic.

---

## 📐 Blueprint (Wireframe)

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ [Chart Container: 100% width, min-height 350px]                         │
│                                                                         │
│  $300k |      /  <-- Nominal Growth (Emerald Green Line)                │
│        |     /.*.                                                       │
│  $200k |    /....*.  <-- The Gap (Soft Red Shading)                     │
│        |   /.......*.                                                   │
│  $100k |  /----------*-- <-- Real Purchasing Power (Deep Blue Dashed)   │
│        | /                                                              │
│     $0 |/___________________[Hover Tooltip]___________________________  │
│         Y0    Y5    Y10   Y15   Y20                                     │
│                            │                                            │
│                       ┌──────────────┐                                  │
│                       │ Loss: $45K   │ <-- Tooltip focuses ONLY on pain │
│                       └──────────────┘                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🕹️ Interaction Physics & Animation Rules

To ensure a premium, fluid, and psychologically impactful experience, development must implement the following animation rules inside and around the `Chart.js` canvas:

### 1. The Slider Drag Physics (Smoothed Fluidity)
When the user drags the *Annual Inflation* slider, the reaction of the red shaded area (The Gap) must NOT be instantaneous (`0ms`). 
- **Behavior:** The chart lines and the red shaded area must flow elastically up or down using a mathematical smoothing transition of **`~150ms`**.
- **Impact:** This gives the chart a feeling of "weight" and fluid data processing, reinforcing trust and quality rather than a jarring, instant snap.

### 2. The "Eroded Wealth" Count-Up (Dramatic Tension)
Located in the Summary Molecule (M6) below the chart: *"Inflation will erode **$142,500** of your purchasing power..."*
- **Behavior:** When the slider is released or moved significantly, the dollar amount must roll/count-up (like an odometer). 
- **Timing:** Set the count-up duration to a **medium/dramatic speed of `1.0s - 1.5s`**. 
- **Impact:** The duration is deliberately prolonged. Watching the number relentlessly climb builds psychological tension and emphasizes the severity of the loss.

### 3. Critical Alert State (Visual Pulse)
If the user inputs a highly risky metric (e.g., Annual Inflation > `8%` or `10%`), the chart must demand attention.
- **Behavior:** The `Soft Red` shaded area (`rgba(211, 47, 47, 0.15)`) will emit a **single, subtle visual pulse**. 
- **Implementation:** A quick opacity bump (e.g., from `0.15` to `0.35` and back to `0.15` over `600ms`) to simulate a "warning glow" on the canvas. 

### 4. Focused Tooltip Experience (Amplifying Pain)
When a user hovers or touches a specific data point (e.g., Year 15):
- **Behavior:** The tooltip must **ONLY display the monetary loss ("Pérdida por Inflación: -$X")**. 
- **Rule:** Explicitly hide the gross Nominal Value and the Real Value from the tooltip content. 
- **Impact:** By isolating the loss metric, we strip away the distraction of the "big number" (Nominal) and force the user to confront the exact amount of money they are losing at that specific point in time.

### 5. The "Entry" Animation (Scroll Reveal)
The chart sits below the initial viewport fold. When the user scrolls down and the chart intersects the viewport for the first time:
- **Behavior:** Do NOT render the chart statically. The lines (Nominal and Real) and the Red Gap must **draw themselves from left to right**.
- **Timing:** The sweep animation must take exactly **`1.0s`**.
- **Impact:** Movement captures the human eye. Drawing the gap dynamically immediately draws attention to the divergence between the two lines, framing the entire narrative before the user even touches a slider.

---

## 🛠️ Chart.js Technical Directives (`ng2-charts`)

To realize this design within the Angular ecosystem using `ng2-charts`, the Architect/Developer should note the following configuration requirements:

*   **Colors:**
    *   `Nominal Line`: `borderColor: '#00C853'`, `borderWidth: 3`, `tension: 0.4` (smooth curve).
    *   `Real Line`: `borderColor: '#1A3C6E'`, `borderWidth: 3`, `borderDash: [5, 5]`, `tension: 0.4`.
    *   `The Gap (Fill)`: Use the `fill: { value: <datasetIndex> }` property on the Nominal dataset to fill down to the Real dataset. `backgroundColor: 'rgba(211, 47, 47, 0.15)'`.
*   **Responsiveness:** `maintainAspectRatio: false` must be set so the chart can flex within its container (min-height `350px` on mobile, `450px` on desktop).
*   **Animations Config:**
    *   Use `animation: { duration: 150, easing: 'easeOutQuad' }` for the update loop (Slider Drag Physics).
    *   Use the `animations.x` property to configure the 1-second `left-to-right` entry sweep.
*   **Tooltip Config:** Provide a custom callback in `plugins.tooltip.callbacks.label` to strip out nominal/real values and return only a forcefully formatted string: `"Erosión: -$XX,XXX"`.

---

## 📡 Angular Component Contract (Signals)

```typescript
// Input Signals (Driven by M2 Sliders above it)
initialInvestment = input.required<number>();
monthlyContribution = input.required<number>();
expectedReturn = input.required<number>();
inflationRate = input.required<number>();

// Computed State
chartData = computed(() => {
    // Math logic provided by finance-math.ts utility
    // Outputs the timeline arrays for Nominal and Real series.
});

// ViewChild for Chart.js instance to trigger the single "Pulse" effect manually
// when inflationRate() crosses the danger threshold.
```
