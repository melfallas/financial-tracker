# 🎨 Design Agreements: Financial Tracker

## 1. Brand Identity & Naming

- **Official Name:** `Financial Tracker`.
- **Logotype:** _Inter Bold_ typeface in `Deep Blue`.
- **Tone & Voice:** Professional, institutional, modern, and minimalist. High-trust fintech aesthetic.

## 2. Color System (The 80/15/5 Rule)

This system establishes a visual hierarchy to minimize cognitive load and maximize lead conversion.

| Layer                  | Usage                    | Hex Code                  | Tailwind v4 Variable |
| ---------------------- | ------------------------ | ------------------------- | -------------------- |
| **80% Base (Trust)**   | Backgrounds & Main Text  | `#1A3C6E` (Deep Blue)     | `--color-primary`    |
| **80% Base (Surface)** | Card Backgrounds         | `#ECEFF1` (Cloud Gray)    | `--color-surface`    |
| **15% Action**         | General UI & Success     | `#009688` (Teal Bright)   | `--color-action`     |
| **5% Conversion**      | **Call to Action (CTA)** | `#00C853` (Emerald Green) | `--color-cta`        |

## 3. Typography

- **Primary Font:** _Inter_ (Sans-serif).
- **Weight Scale:**
- `Bold (700)`: Headings and Brand Name.
- `Medium (500)`: Slider Labels and Navigation links.
- `Regular (400)`: Body text, Tooltips, and Helper text.

- **Alignment:** Left-aligned for body text; centered for success messages/mobile views.

## 4. Components & Behavior (BMad UX)

### A. Base: The "Wealth Gap" Chart

- **Nominal Line:** Solid, `Emerald Green`, 3px stroke width.
- **Real Line:** Solid, `Cloud Gray` (or medium gray), with a downward gradient area.
- **The Gap Area:** A subtle `Soft Red (#D32F2F)` fill/shading when inflation exceeds the investment yield to visualize "Purchasing Power Loss."

### B. Modals: Lead Capture Funnel

- **Friction Reduction:** Strictly limited to 3 fields (First Name, Last Name, Email).
- **Submit Button:** `Emerald Green` with an elevation effect (hover shadow) to signify "Growth & Completion."
- **Success State:** A green checkmark animation followed by an automatic redirect/download after 3 seconds.

### C. Assets: Micro-interactions

- **Sliders:** Slider thumbs must have a touch target of at least 44px for mobile accessibility.
- **Real-time Feedback:** Numbers and chart points must update instantly as the user interacts with sliders (powered by Angular Signals).

## 5. Mobile-First & Responsiveness

- **Mobile (< 768px):** Vertical single-column layout. Input controls (sliders) are placed above the chart so the user’s thumb doesn't obstruct the visual feedback.
- **Desktop (>= 768px):** Split-view layout. Controls on the left, high-fidelity chart on the right.

---

## 🛠️ Design Tokens (Tailwind v4 Configuration)

Winston (Architect) must implement these tokens within the **Assets** layer:

```css
@theme {
  --color-primary: #1a237e;
  --color-surface: #eceff1;
  --color-action: #009688;
  --color-cta: #00c853;
  --color-error: #d32f2f;

  --font-sans: 'Inter', system-ui, sans-serif;
}
```
