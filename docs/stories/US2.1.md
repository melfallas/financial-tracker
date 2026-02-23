# US2.1: Lead Capture Form Component

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description
**As a stakeholder,** I want to capture user data (First Name, Last Name, Email) through a professional transition-based form that triggers the "Value Exchange" (Lead Magnet).

## Acceptance Criteria
- [ ] **TDD Mandatory:** Reactive form validation tests (required, email format, GDPR consent) written FIRST.
- [ ] Component uses PrimeNG `InputText` and `Button` styled via `tailwindcss-primeui`.
- [ ] Implement **Interaction Physics**:
    - **Capture State:** Title, Document Icon, 3 text fields, GDPR checkbox, Emerald CTA.
    - **Submitting State:** Button disabled, content opacity 0.8, text changes to "Generando PDF...", spinner active.
    - **Success State:** Fade-out Step 1, expand card (200ms transition), show Animated Checkmark, success message, and Upsell CTA.
- [ ] In-place "Soft Focus Trick": Apply `backdrop-filter: blur(4px)` to the background upon success to focus eyes on the Booking CTA.
- [ ] Persistence: Save to `ILeadRepository` (LocalStorage) with `source: 'landing-page'`.
- [ ] Storybook stories for all 4 states (`idle`, `submitting`, `success`, `error`).

## Technical Details

### Component Location
`src/app/features/lead-form/lead-form.ts`

### UI/UX Rules fromSally's Spec:
- **Error Handling:** `M1 Shake` animation on 4xx/validation errors. Soft Red messages.
- **Conversion Color:** CTA strictly Emerald Green `#00C853`.
- **Zoneless Signals:** Use `signal()` for `firstName`, `lastName`, `email`, and `currentState`.

### Steps to Complete:
1. Create `lead-form.ts`, `.html`, `.css`, and `.spec.ts`.
2. Implement logic using Angular `ReactiveFormsModule`.
3. Create CSS transitions for the "In-Place Expansion".
4. Integrate with `LeadRepository` (US1.5).
5. Add `backdrop-filter` logic tied to the `success` state Signal.
6. Verify accessibility (A11y) Tab order and ARIA labels.

## Non-Functional Requirements
- **Performance:** Form interactions must be instantaneous.
- **Privacy:** GDPR consent mandatory before submission.
- **Security:** CSRF/XSS protection via Angular defaults.
