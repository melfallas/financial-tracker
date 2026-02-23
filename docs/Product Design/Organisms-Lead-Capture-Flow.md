# 🧩 Organism Detail: Lead Capture Flow (US2.1 / US2.4)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22
> **Status:** Detailed Spec Ready for Development

---

## 🎯 Purpose
The **Lead Capture Flow** is the primary conversion mechanism of the application. It consists of the `Lead Capture Card` organism (M10) and its seamless transition into the `Success Card` (Upsell). 

The goal is to capture user data with minimal friction, securely deliver the promised PDF value via email (forcing email confirmation to improve deliverability), and immediately offer a secondary conversion (Upsell: Booking a 1-to-1 session) without losing the emotional context of the page.

---

## 📐 Blueprint (Wireframe - State Transition)

**State 1: Capture (Form)**
```text
┌──────────────────────────────────────────────────────────┐
│ [Title] Obtén tu reporte gratis                          │
│                                                          │
│ [Thumbnail/Icon: Document Graphic]                       │
│ Descubre cómo salvar tus $142,500 de la inflación.       │
│                                                          │
│ [M1: Nombre]      [M1: Apellido]                         │
│ [M1: Correo Electrónico]                                 │
│                                                          │
│ [A6: Consentimiento GDPR]                                │
│                                                          │
│ [A3.1: Enviar mi Reporte Personalizado (Emerald CTA)]    │
└──────────────────────────────────────────────────────────┘
```
↓ *In-Place Transformation + Soft Focus Trick* ↓

**State 2: Success & Upsell (Post-Submission)**
```text
┌──────────────────────────────────────────────────────────┐
│                      [ M8: ✅ ]                           │
│                ¡Reporte Generado!                        │
│                                                          │
│ Hemos enviado el PDF a tu correo electrónico.            │
│ Por favor revisa tu bandeja principal y la de SPAM.      │
│                                                          │
│ ──────────────────────────────────────────────────────── │
│ Si quieres aprender más sobre el contenido del documento │
│ y sacar el máximo provecho de tu perfil de inversión,    │
│ agenda una llamada con nosotros:                         │
│                                                          │
│ [A3.1: Agenda tu Revisión Ahora (Emerald CTA)]           │
└──────────────────────────────────────────────────────────┘
```

---

## 🕹️ Interaction Physics & UX Rules

### 1. The "Bait" (Contextual Value)
The form must reaffirm the value exchange. Alongside the inputs, there should be a subtle, elegant visual (like an icon of a premium A4 document) and dynamic text referencing the specific gap calculation (e.g., *"Descubre cómo salvar tus $X..."*).

### 2. Loading State (Feedback)
While the form is submitting (simulating PDF generation/backend processing):
- The `A3.1` Emerald CTA becomes disabled (`opacity: 0.85`).
- The text changes to *"Generando PDF..."* accompanied by a simple loading spinner.
- This creates a sense of the system doing "heavy lifting", increasing the perceived value of the report.

### 3. The Transformation: In-Place Expansion
Upon a successful `200 OK` response:
- The input fields and initial CTA disappear (fast `200ms` fade-out).
- The card smoothly resizes (CSS height/width transition) to accommodate the new Success content.
- The `M8 SuccessMessage` atom orchestrates the drawing of the green checkmark SVG.

### 4. The "Soft Focus Trick" (Focus Retention)
Instead of navigating the user to a separate `/thank-you` route, we keep them on the Narrative Scroll but isolate their attention:
- When the card transitions to the Success State, a backdrop filter (`backdrop-filter: blur(4px)`) is activated on the environment *behind* the card.
- This blurs the Chart and the rest of the page, forcefully drawing the eye to the new Upsell CTA inside the card, while reassuring the user they haven't lost their place.

### 5. Email Marketing Enforcer (No Direct Download)
- The Success card explicitly instructs the user to check their email (and SPAM folder).
- **Rule:** There is NO "Download PDF here" fallback link. The user *must* retrieve the document from their inbox, ensuring they whitelist the sender address for future email marketing drip campaigns.

### 6. Error Handling (M1 Shake)
If the backend returns an error (e.g., email already exists, network failure):
- The specific `M1` FormField (e.g., Email field) performs a subtle horizontal CSS `shake` animation.
- An inline `Soft Red` error message appears below the field.
- The layout is not disrupted; it recovers gracefully.

---

## 📊 Analytics & Tracking Strategy (Alternative 3)

Because we are doing an "In-Place" transformation rather than changing URLs, conventional Page Views will not track the display of the second CTA. 

We will implement an intrinsic database tracking mechanism. Following the project's Repository Pattern (Phase 1: Storage / Phase 2: Supabase), this logic must be decoupled behind interfaces.

### Interaction Tracking Fields
When a Lead is persisted, the entity (`LeadData`) must support tracking these state views:
1. `saw_booking_cta` (boolean): Set to `true` exactly when the Success Card is successfully rendered.
2. `clicked_booking_cta` (boolean): Set to `true` when the user clicks the "Agenda tu Revisión Ahora" button.

### Implementation Pattern (Phase 1 vs 2)
1. **Phase 1 (Browser Storage):** Tracking updates are saved in `localStorage/IndexedDB` via the `IInteractionRepository`.
2. **Phase 2 (Supabase):** Tracking hooks directly update the `leads` table record in PostgreSQL without blocking the UI thread.
3. **Decoupling:** The UI component simply calls an abstract method (e.g., `interactionService.markBookingCtaSeen(leadId)`); the component must not know if it is saving to LocalStorage or Supabase.

---

## 📡 Angular Component Contract (Signals)

```typescript
// Define UI States
type CaptureState = 'idle' | 'submitting' | 'success' | 'error';

// Form Data Signals
firstName = signal<string>('');
lastName  = signal<string>('');
email     = signal<string>('');
gdprConsent = signal<boolean>(false);

// State Management
currentState = signal<CaptureState>('idle');
errorMessage = signal<string | null>(null);

// Abstracted Tracking Integration (Injectable Service)
// interactionSvc.trackCtaViewed(leadId)
// interactionSvc.trackCtaClicked(leadId)
```

---
*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-22*
