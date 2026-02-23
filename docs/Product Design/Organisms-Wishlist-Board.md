# 🧩 Organism Detail: Wishlist Board (US6.1)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Detailed Spec Ready for Development · **Context:** Emotional Gamification & Goal Setting

---

## 🎯 Purpose & Emotional Narrative

The **Wishlist Board** is the "Reward" section of the Narrative Scroll. While the previous sections focused on the mathematical and systemic aspects of finance (inflation, retirement, bank gaps), the Wishlist Board anchors these numbers to the user's actual life desires. 

> **UX Philosophy:** It acts as a gamified sandbox. Users drop in their "Dreams" (House, Car, Travel), set a price and a timeframe, and the system instantly tells them the **Monthly Effort** required for that specific goal in isolation. By keeping this independent from the main retirement math, it remains a low-friction, high-dopamine space for exploration.

---

## 🗂️ Component Architecture & Layout

**Visual Spec:**
- **Positioning:** Placed at the very end of the main scroll, just before the Footer, acting as a final "Playground" before the official close.
- **Layout:** A responsive grid of compact, premium cards (`max-width: 320px`).
- **Interaction:** A prominent `[ + Add New Dream ]` card as the first item in the grid, which triggers a clean inline form.

### 📐 Blueprint: The Wish Card (M3 Variant)
```text
┌────────────────────────────────┐
│  [ ✈️ ]  Viaje a Japón         │
│  (Emoji) (Title: Deep Blue)     │
│                                │
│  Meta: $ 5,000                 │
│  Tiempo: 3 Años                │
│                                │
│  ────────────────────────────  │
│  ESFUERZO MENSUAL:             │
│  [ $ 138.80 / mes ]            │
│  (Emerald Green highlight)     │
│                                │
│  [ Progress Bar: 45% ]         │
│  (Teal Bright fill)            │
│                                │
│  [ ✏️ ] [ 🗑️ ]                  │
└────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Card Styling:** `background: #FFFFFF`, `border-radius: 1.25rem`, `border: 1px solid var(--color-cloud-gray)`, `shadow-premium`.
- **Emoji Container:** `width: 48px`, `height: 48px`, `background: var(--color-cloud-gray)`, `border-radius: 50%`, `display: flex`, `font-size: 1.5rem`.
- **Monthly Effort Badge:** `font-weight: 800`, `font-size: 1.15rem`, `color: var(--color-emerald-green)`.
- **Progress Bar:** `height: 6px`, `background: #E0E0E0`, `border-radius: 3px`.

---

## 🕹️ Behavior & Logic

**1. The "Dream" Form (US6.1.3 - Planned):**
When adding or editing a meta, the user provides:
- **Title:** e.g., "Entrada para Casa."
- **Icon Selector:** A simple browser-native emoji picker or predefined financial icons.
- **Goal Amount:** The targeted price (formatted in `selectedCurrency`).
- **Target Years:** A slider from `1` to `30` years.

**2. Isolated Calculation:**
- The card calculates the **Monthly Savings Required** using a simple linear formula:
  `Monthly_Effort = (Goal_Amount / (Years * 12))`
- *Winston's Architect Note:* This calculation is intended to be simple and "isolated." It does not account for interest rates or inflation to keep the gamification fast and understandable. It answers: *"How much do I need to put aside starting today?"*

**3. State Management (Persistence):**
- Dreams are stored in the **`Interaction Repository`** (IndexedDB).
- This ensures that if the user returns to the site, their "Dreams" are still pinned to their local session, promoting a sense of ownership over the plan.

**4. Gamification Feedback:**
- When a new meta is added, a subtle `canvas-confetti` burst (small scale) triggers inside the local card area.
- If a user marks a meta as "Achieved," the card gets a celebratory overlay.

---

## 📡 Angular Component Contract (Signals)

```typescript
// src/app/features/gamification/wishlist-board.ts

interface Wish {
  id: string;
  emoji: string;
  title: string;
  amount: number;
  years: number;
}

// Global store for the board (from IndexedDB)
wishes = signal<Wish[]>([]);

// Derived logic (Calculated per card)
monthlyEffort = computed(() => {
  return this.wish().amount / (this.wish().years * 12);
});

// Methods
addWish(newWish: Wish) {
  this.wishes.update(list => [...list, newWish]);
  // Persistence call to IInteractionRepository
}
```

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-23*
