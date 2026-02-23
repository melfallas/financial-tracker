# 🧩 Organism Detail: Booking Screen & Calendar Integration (US5.2)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development · **Context:** Final Conversion Step

---

## 🎯 Purpose & Emotional Narrative

The **Booking Screen** is the apex of the conversion funnel. After building urgency through the Narrative Scroll (Wealth Gap, Retirement Simulator, Market Widgets) and capturing the lead via the PDF Magnet, this component transitions the user from digital exploration to human interaction.

> **UX Philosophy:** The scheduling process must feel like a seamless, premium concierge service, not an iframe afterthought. We achieve this by keeping the user in context (via an elegant Modal Overlay), pre-filling their data to eliminate friction, and finishing with a "Homework" screen that builds commitment and reduces no-show rates.

---

## 🗂️ Component Architecture & Flow

The booking flow consists of three distinct visual states managed within a PrimeNG `Dialog` (Modal):

1. **State 1: The Transition (Optional)** — If the user clicks the floating CTA before filling the Lead Form, they must provide Name/Email first. If they come *from* the Lead Form success step, we pre-fill and jump to State 2.
2. **State 2: Calendar Selection (The Embed)** — A branded Calendly widget overlay where the user selects their date and time.
3. **State 3: The "Homework" Success Screen** — Replaces the calendar with a tailored confirmation message and pre-call homework to increase psychological commitment.

---

## 📐 Blueprint: The Modal Overlay (Container)

**Visual Spec:**
- PrimeNG `p-dialog` configured as a full-screen modal on mobile and a large centered card (`max-width: 800px`, `border-radius: 1.5rem`) on desktop.
- `Deep Blue (#1A3C6E)` overlay backdrop with `backdrop-filter: blur(8px)` to heavily blur the underlying dashboard, forcing 100% focus.
- The dialog has no external borders. Close button (`X`) is positioned top-right, styled in `Charcoal` or `Cloud Gray`.

---

## 📅 State 2: Calendar Selection (The "Disguised" Embed)

**Visual Spec:**
- A Calendly Inline Embed (`iframe`) taking up the majority of the modal height (`min-height: 650px`).
- **Brand Masking:** The iframe URL parameters MUST be injected to match our Financial Tracker design system tokens:
  - `primary_color=009688` (Teal Bright — for Calendly's active states/buttons to match our secondary action color, preventing clashes with our Emerald Green Primary CTAs).
  - `text_color=37474F` (Charcoal).
  - `background_color=ffffff` (White).
- **The Magic Pre-fill:** Above the calendar, a subtle persistent header shows the current active lead.

### 📐 Blueprint (Wireframe)
```text
┌────────────────────────────────────────────────────────────────────────┐
│                                                                    [X] │
│   [Avatar Icon] Agendando para:                                        │
│   John Doe (john.doe@example.com) • [Cambiar]                          │
│  ────────────────────────────────────────────────────────────────────  │
│                                                                        │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                                                               │    │
│   │                        [ Calendly iframe ]                    │    │
│   │                                                               │    │
│   │                      [ Select Date & Time ]                   │    │
│   │                 (Buttons styled with Teal Bright)             │    │
│   │                                                               │    │
│   │     "Data pre-filled below for review before confirming"      │    │
│   │                                                               │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 🕹️ Behavior & Micro-interactions
- **Magic Pre-fill Logic:** The Angular component reads the `ILeadRepository` to check if a Lead exists in the current session. If `Lead.email` exists, it applies Calendly's pre-fill URL parameters (`&name=John%20Doe&email=john.doe@example.com`).
- **Review, Not Auto-Submit:** As requested, the pre-fill parameters ensure the user *sees* their data already populated in the final Calendly confirmation step, allowing them to review or edit before manually clicking Calendly's final "Confirm" button.

> ⚠️ **Technical Note (Winston):** To detect when the booking is actually completed inside the iframe (to trigger State 3), we must listen to Calendly's JavaScript `window.postMessage` events (specifically `calendly.event_scheduled`). Do not rely on page redirects.

---

## 🎉 State 3: The "Homework" Success Screen

**Visual Spec:**
- The iframe smoothly fades out (`fade-out 300ms`) and the Success Screen fades in.
- Large animated checkmark (emerald green, drawing itself).
- Typography shifts back to our native Inter font.
- Three numbered "Homework" cards arranged vertically.

### 📐 Blueprint (Wireframe)
```text
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                                  [ ✔️ ]                                │
│                   (Animated Emerald checkmark)                         │
│                                                                        │
│                  Cita Confirmada con Éxito.                            │
│           Revisa tu correo para el enlace de la reunión.              │
│                                                                        │
│  ────────────────────────────────────────────────────────────────────  │
│   PREPARACIÓN PARA TU REUNIÓN (3 min)                                  │
│   Para aprovechar al máximo nuestros 30 minutos, por favor piensa en:  │
│                                                                        │
│   [ 1 ]  ¿Cuál es tu mayor frustración financiera de los últimos años? │
│                                                                        │
│   [ 2 ]  ¿Qué número (ingreso/ahorro) significaría "libertad" para ti? │
│                                                                        │
│   [ 3 ]  ¿Qué te ha impedido invertir de forma recurrente hasta hoy?   │
│                                                                        │
│                                                                        │
│                      [ Volver al Dashboard ]                           │
│                   (Ghost Button, Charcoal text)                        │
└────────────────────────────────────────────────────────────────────────┘
```

### ✨ Figma Visual Spec
- **Checkmark:** `width: 64px`, `height: 64px`, `color: var(--color-emerald-green)`.
- **Homework Section Title:** `font-size: 0.85rem`, `font-weight: 700`, `letter-spacing: 0.05em`, `color: var(--color-deep-blue)`.
- **Homework Cards:** `background: var(--color-cloud-gray)`, `border-radius: 0.5rem`, `padding: 1rem 1.5rem`, `display: flex`. Number indicator in `Deep Blue`.
- **Closing Button:** A simple ghost button. Click closes the modal and removes the background blur.

### 🕹️ Emotional Psychology (Why "Homework"?)
By asking the user to prepare answers to three profound questions, we shift their mindset from "I scheduled a free chat" to "I am preparing for a valuable consultation." This significantly lowers no-show rates (ghosting) and primes them for a deeper conversation with the advisor.

---

## 📡 Angular Component Contract (Signals)

```typescript
// src/app/features/booking/booking-modal.ts

type BookingState = 'initial_form' | 'calendar_embed' | 'success_homework';

// --- Overlay State ---
isOpen = signal<boolean>(false);
currentState = signal<BookingState>('calendar_embed');

// --- Pre-fill Data (From ILeadRepository) ---
leadName = signal<string>('');
leadEmail = signal<string>('');

// --- Computed iframe URL ---
calendlyUrl = computed(() => {
  const base = 'https://calendly.com/YOUR_ACCOUNT/30min';
  const brandParams = `?primary_color=009688&text_color=37474F&background_color=ffffff`;
  
  if (this.leadEmail()) {
    // Add Magic Pre-fill (User still must review and click submit inside Calendly)
    return `${base}${brandParams}&name=${encodeURIComponent(this.leadName())}&email=${encodeURIComponent(this.leadEmail())}`;
  }
  return `${base}${brandParams}`;
});

// --- Event Listeners ---
// HostListener for window messaging to catch 'calendly.event_scheduled'
// When captured -> this.currentState.set('success_homework');
```

---

## 🌐 i18n & Content Notes
- The "Homework" questions must be carefully translated in `en.json/es.json` to maintain the consultative, empathetic tone.
- Calendly's native language can also be forced via URL parameters (e.g., `&locale=es`) based on the Angular app's current locale state.

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
