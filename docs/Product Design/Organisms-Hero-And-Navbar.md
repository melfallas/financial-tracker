# 🧩 Organism Detail: Hero Section & Navbar (US4.1)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development · **Context:** Page Load & Initial Hook

---

## 🎯 Purpose & UX Philosophy

The **Hero Section & Navbar** form the first 3 seconds of the user's experience. This organism must immediately establish unquestionable authority (Trust), identify the user's pain point (Inflation/Devaluation), and offer a frictionless path to the solution (The Call to Action).

> **Animation Philosophy (Sally's Recommendation):** Instead of no animation (which can feel cheap) or heavy staggered delays (which hurts LCP performance), we use a single, highly optimized **`fade-in-up`** CSS transform on the entire Hero container (`duration: 600ms, ease-out`). Because CSS transforms are hardware-accelerated, this delivers a "Premium Apple/Stripe" feel without impacting browser rendering times or SEO.

---

## 🗂️ Component 1: The Headroom Navbar (M9 Extension)

**Visual Spec:**
- A fixed header that responds to scroll direction (Headroom style) to save vertical screen real estate, especially critical on mobile.
- **Initial State (Top of page):** `background: transparent`. Logo, text, and buttons are fully visible against the Hero's `Cool Gray` background.
- **Scroll Down (> 50px):** The navbar translates up out of the viewport (`translateY(-100%)`, `transition: 300ms ease`), getting out of the user's way while they read the charts.
- **Scroll Up (Any amount):** The navbar instantly slides back down into the viewport (`translateY(0)`).
- **Sticky State Aesthetics:** When it reappears after scrolling, it takes on a `White (#ffffff)` background with a `shadow-premium` elevation to distinguish it from the content scrolling beneath it.

### 📐 Blueprint (Wireframe)
```text
┌────────────────────────────────────────────────────────────────────────────┐
│  [Logo: Financial Tracker]                 [ES ▾]  [CRC ▾]  [ Agendar ]    │
│  (Deep Blue / Emerald Green)               (Charcoal)    (Ghost btn/Blue)  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖼️ Component 2: The Clean & Split Hero Area

**Visual Spec:**
- **Background:** A luminous, clean `Cool Gray (#ECEFF1)` to pure `White (#FFFFFF)` subtle gradient. This "Clear" aesthetic reduces financial anxiety and contrasts perfectly with the `Deep Blue` typography.
- **Desktop Layout:** Split 50/50. Left column for typography and CTA; Right column for a premium 3D illustration or high-quality vector graphic representing growth (e.g., a plant growing from coins, or an abstract upward chart).
- **Mobile Layout:** Stacked. Typography and CTA first, followed by the graphic taking up the remaining viewport height.

### 📐 Blueprint (Wireframe — Desktop)
```text
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                [Navbar Area (Transparent on initial load)]                 │
│                                                                            │
│   ┌────────────────────────────────┐    ┌────────────────────────────────┐ │
│   │  [H1] Controla la inflación,   │    │                                │ │
│   │       y alcanza tu             │    │    [ Premium Graphic / 3D ]    │ │
│   │       Libertad Financiera      │    │    (Growth, Stability, Trust)  │ │
│   │       (Deep Blue + Emerald)    │    │                                │ │
│   │                                │    │                                │ │
│   │  [p]  Descubre cuánto dinero   │    │                                │ │
│   │       estás perdiendo hoy y    │    │                                │ │
│   │       simula tu retiro ideal.  │    │                                │ │
│   │       (Charcoal, 1.25rem)      │    │                                │ │
│   │                                │    │                                │ │
│   │  [ Comenzar mi Diagnóstico Gratis (↓) ]                              │ │
│   │  (A3.1 Emerald Green Button with Drop Shadow)                        │ │
│   │                                │    │                                │ │
│   └────────────────────────────────┘    └────────────────────────────────┘ │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec & Typography
- **H1 Headline:** `font-size: 3.5rem` (desktop) / `2.5rem` (mobile), `font-weight: 800`, `line-height: 1.1`. Color: `var(--color-deep-blue)`.
- **H1 Highlight:** The words "Libertad Financiera" are wrapped in a `span` with `color: var(--color-emerald-green)`.
- **Subtext (`p`):** `font-size: 1.25rem` (desktop), `font-weight: 400`, `color: var(--color-charcoal)`, `max-width: 480px`.
- **Primary CTA Button:** Giant, highly clickable button. `padding: 1rem 2rem`, `border-radius: 999px`, `font-size: 1.1rem`, `font-weight: 700`, `box-shadow: 0 10px 25px -5px rgba(0, 200, 83, 0.4)`. Uses a small down-arrow `↓` icon.

---

## 🕹️ Behavior & Micro-interactions

**1. The "Fade-In-Up" Entry (LCP Optimized):**
- To achieve the premium feel without punishing load times, a single CSS class covers the Hero content wrapper:
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-hero {
  animation: fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

**2. The CTA "Smooth Scroll" Journey:**
- When the user clicks **"Comenzar mi Diagnóstico Gratis"**, the browser executes a native smooth scroll.
- **Anchor Destination:** It scrolls past the Market Intelligence widgets directly to the **Wealth Gap Calculator (US3.1)**. 
- *UX Context:* Once they interact with the Wealth Gap, they are naturally exposed to the *Cost of Waiting Banner (US4.2)* immediately below it, driving them seamlessly into the Lead Capture flow.

---

## 📡 Angular Component Contract (Signals & Directives)

```typescript
// src/app/features/home/hero/hero-section.ts

// --- Navbar Headroom Directive Logic (Can be a custom directive or HostListener) ---
lastScrollTop = signal<number>(0);
isNavbarVisible = signal<boolean>(true);
isNavbarSticky = signal<boolean>(false); // True when scroll > 50px, applies white bg

@HostListener('window:scroll')
onScroll() {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    this.isNavbarSticky.set(true);
    // Headroom logic: hide when scrolling down, show when scrolling up
    this.isNavbarVisible.set(currentScroll < this.lastScrollTop());
  } else {
    this.isNavbarSticky.set(false);
    this.isNavbarVisible.set(true);
  }
  
  this.lastScrollTop.set(currentScroll);
}

// --- Scroll Action ---
scrollToDiagnostic() {
  document.getElementById('wealth-gap-section')?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}
```

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
