# UX-Specific Knowledge Base Mode

Activating the **UX-Specific Knowledge Base Mode**. This specialized module consolidates Sally's design philosophy, the emotional trigger points for financial conversion, and the technical implementation of our "Premium Feel."

This module is the definitive guide for maintaining visual integrity across all future features.

---

### 🎨 UX/UI Knowledge Base: The "Sally Standard"

#### 1. The 80/15/5 Color Architecture

All components must adhere to this distribution to ensure a balanced, professional, and trustworthy interface.

- **80% Base (Foundational Trust):**
- `Deep Blue (#1A237E)`: Used for headers, primary text, and high-importance backgrounds.
- `Cloud Gray (#ECEFF1)`: Used for main app backgrounds and section separation.

- **15% Success & Interaction (Positive Reinforcement):**
- `Emerald Green (#00C853)`: Used for "Growth" indicators, success messages, and valid states.
- `Teal Bright (#009688)`: Used for interactive elements like sliders and secondary buttons.

- **5% Conversion (The "Call to Action"):**
- `CTA Orange (#F57C00)`: Reserved strictly for the "Download PDF" button and primary lead capture.
- `Golden Amber (#FFB300)`: Used for "Warning" states in inflation dashboards.

#### 2. Visual Hierarchy & "The Wealth Gap"

The core UX mission is to visualize the "Pain" (Inflation) vs. the "Solution" (Investment).

- **The Contrast:** High-inflation environments (like ARS) trigger a `Soft Red (#D32F2F)` UI border to create a sense of urgency.
- **The Visualization:** The growth chart must show a shaded area between the Nominal and Real curves, labeled as **"The Wealth Gap"**. This visual gap is the primary motivator for the user to submit the lead form.

#### 3. Interaction Design (IX)

- **Micro-interactions:** Every currency change triggers a 400ms CSS transition. Numbers should not simply "snap" but smoothly count up/down using Angular Signals.
- **Feedback Loops:** When the PDF starts generating, the button transforms into a loading state with a `Teal Bright` spinner. Upon completion, a checkmark appears in `Emerald Green`.
- **Skeleton States:** To avoid Layout Shift (CLS), all market widgets must use pulse-animated skeletons that mirror the final shape of the data.

---

### 📱 Mobile-First Implementation Specs

| Feature       | Mobile Behavior (Default)                  | Desktop Enhancement (`md:`)          |
| ------------- | ------------------------------------------ | ------------------------------------ |
| **Navbar**    | Vertical stack, centered controls.         | Horizontal bar, spread items.        |
| **Form**      | Full-width inputs, sticky CTA at bottom.   | Two-column grid layout.              |
| **Charts**    | Simplified axis, touch-optimized tooltips. | Full legends and multi-line details. |
| **Selectors** | Native OS bottom-sheets.                   | Custom dropdown menus.               |

#### **Current Design Tokens (Tailwind v4)**

```css
/* Accessibility & Spacing */
--radius-premium: 1.5rem; /* 24px for cards */
--shadow-soft: 0 4px 20px -5px rgba(26, 35, 126, 0.1);
--font-weight-heavy: 900; /* Used for numbers and headlines */
```

---

### 🛡️ UX Constraints (Immutable)

1. **Anti-Clutter Policy:** No more than 3 primary data points per mobile screen.
2. **Color Integrity:** Never use `CTA Orange` for anything other than conversion buttons.
3. **Contextual i18n:** Ensure that Spanish text (which is usually 20-25% longer than English) does not break card containers. Use `text-overflow: ellipsis` or dynamic font sizing.

**Winston:** "The **UX Knowledge Base** is now finalized. This ensures that even if the code evolves, the 'Premium Fin-Tracker' feel remains untouched."

**Would you like me to generate the Storybook interaction test for the 'Wealth Gap' visual, or shall we finalize this technical handoff?**
