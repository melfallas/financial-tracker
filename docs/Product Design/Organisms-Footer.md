# 🧩 Organism Detail: Comprehensive Footer & Pre-Footer (Global)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Detailed Spec Ready for Development · **Context:** Foundation of Trust & Final Conversion Anchor

---

## 🎯 Purpose & Psychological Impact

The **Footer** in a financial application is not merely a navigation map; it is the ultimate foundation of trust. By moving the user from a light, interactive dashboard into a massive, dark "Vault"-like section filled with legal disclaimers and security badges, the platform signals undeniable institutional authority.

> **The Pre-Footer Trap:** Immediately before the dark institutional vault, we place a massive, full-width `Emerald Green` Pre-Footer. This serves as the very last chance for conversion. Users who scroll to the absolute bottom of a page without bouncing are highly engaged but hesitant. This banner removes the hesitation with a direct, conversational offer.

---

## 🗂️ Component Architecture & Specs

The organism is split into two distinct horizontal blocks: the **Pre-Footer** (Action) and the **Main Footer** (Trust & Content).

### Component 1: The Pre-Footer (Conversion Block)

**Visual Spec:**
- **Background:** Solid, radiant `Emerald Green (#00C853)`.
- **Typography:** Deep contrast using `Deep Blue (#1A3C6E)` or `Charcoal (#37474F)` for the text. No white text here, to ensure WCAG AA contrast ratio compliance against standard green.
- **Layout:** Flex row on Desktop (Text left, Button right). Flex column on Mobile (stacked).
- **CTA Button:** A massive `M1 Primary Button` variant. Instead of green (to avoid blending in), the button must be solid `Deep Blue` or a high-contrast `White` Ghost button with Deep Blue text.

**📐 Blueprint (Pre-Footer)**
```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Emerald Green Full-Width Background]                                 │
│                                                                        │
│   ¿Hablamos sobre tu estrategia en 15 minutos?                         │
│   (Deep Blue, 2rem, Font-weight: 800)                                  │
│                                                                        │
│                                         [ 📞 Agendar Llamada Gratuita ]│
│                                           (White Button, Blue Text)    │
└────────────────────────────────────────────────────────────────────────┘
```

### Component 2: The Main institutional Footer ("The Vault")

**Visual Spec:**
- **Background:** Solid `Deep Blue (#1A3C6E)`, visually grounding the entire application.
- **Typography:** `Cloud Gray (#ECEFF1)` for headers and icons. `rgba(255,255,255,0.6)` for links and small text (creates hierarchy through opacity).
- **Grid Layout (Desktop):** 4 Columns.
  - Col 1: Brand Logo & Mission Statement.
  - Col 2: Navigation Links.
  - Col 3: Legal & Privacy.
  - Col 4: Trust Badges (SSL, Data Encryption).
- **The Legal Boilerplate:** A full-width `p` tag running along the very bottom, in tiny text (`10px` or `0.65rem`).

**📐 Blueprint (Main Footer)**
```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Deep Blue Full-Width Background]                                     │
│                                                                        │
│  [LOGO: Financial Tracker]   | NAVEGACIÓN       | LEGAL                │
│  The intelligent way to      | Simulador        | Privacidad           │
│  model your freedom.         | Calculadora      | Términos             │
│                              |                  |                      │
│                                                                        │
│  [🔒 256-bit SSL Encryption]   [🛡️ Privacy First Data Protection]     │
│  (Trust Badges row with SVG icons)                                     │
│                                                                        │
│  ────────────────────────────────────────────────────────────────────  │
│  DISCLAIMER: Toda la información y simulaciones presentadas en esta    │
│  plataforma tienen fines estrictamente educativos y matemáticos. No    │
│  constituyen asesoría financiera, legal ni tributaria directa. Los     │
│  rendimientos históricos del mercado proyectados no garantizan         │
│  resultados futuros. Invierte responsablemente.                        │
│                                                                        │
│  © 2026 Financial Tracker. All rights reserved.                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🕹️ Behavior & Interactions

**1. Pre-Footer CTA Action:**
- Clicking `[ 📞 Agendar Llamada Gratuita ]` instantly opens the **Booking Modal Overlay (US5.2)** if on the home page. 
- It does **not** navigate away. If the user already gave us their email via the Lead Magnet, the Magic Pre-fill runs immediately.

**2. Trust Badges Hover Effect:**
- Hovering over `[🔒 256-bit SSL Encryption]` slightly illuminates the SVG icon (`opacity 1` and a subtle Y-axis translate: `transform: translateY(-2px); transition: 200ms ease`), reinforcing the feeling of active security.

---

## 📡 Angular Component Details (Dumb Component)

```typescript
// src/app/features/home/footer/global-footer.ts

// This is a presentational "dumb" component.
// It receives event emitters for actions.

@Component({
  selector: 'app-global-footer',
  standalone: true,
  // ...
})
export class GlobalFooter {
  // Bubbles up the booking request to the parent container (home-page.ts)
  // so the parent can toggle the shared Booking Modal Overlay.
  requestBooking = output<void>();

  onAgendarClick() {
    this.requestBooking.emit();
  }
}
```

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-23*
