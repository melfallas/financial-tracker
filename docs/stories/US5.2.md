# US5.2: Booking Screen & Calendar Integration

**Epic:** Epic 5 (Consultation Booking & Scheduling)
**Priority:** P0 (MVP)

## Description
**As a user,** I want a seamless booking experience that recognizes my identity and guides me through choosing a consultation time without leaving the page.

## Acceptance Criteria
- [ ] Implement the **Booking Modal Overlay** (§Organisms-Booking-Screen):
    - Component: PrimeNG `Dialog` with `max-width: 800px`.
    - Backdrop: Deep Blue (#1A3C6E) with `8px` blur.
- [ ] **State 1: Initial Qualification** (If no Lead exists): Capture Name/Email first.
- [ ] **State 2: Calendar Selection:**
    - Embed **Calendly Inline Widget**.
    - **Magic Pre-fill:** Auto-populate Name/Email from the session Lead.
    - **Brand Masking:** Inject `primary_color=009688` and `text_color=37474F` via URL params.
- [ ] **State 3: "Homework" Success Screen:**
    - Replaces iframe upon successful booking (Detect via `postMessage`).
    - Show 3-step preparation guide.
- [ ] Storybook stories for all 3 modal states.

## Technical Details

### Component Location
`src/app/features/booking/booking-modal.ts`.

### Persistence Hook
- Save lead as `source: 'booking'` if entered directly here.
- Append `appointment_date` to the Lead record upon successful `postMessage` event.

### Steps to Complete:
1. Create `p-dialog` container in a global `app.component` or as a service-driven modal.
2. Implement `window.postMessage` listener for `calendly.event_scheduled`.
3. Construct the dynamic Calendly URL with pre-fill and brand params.
4. Build the "Homework" card list (State 3).
5. Integrate the "Cambiar" link (State 2) to allow editing pre-filled data.

## Non-Functional Requirements
- **Psychology:** The preparation guide is critical for reducing "ghosting" (no-shows).
- **Security:** Sanitize the iframe URL and validate the `postMessage` origin.
- **Privacy:** Calendly data is external; only the confirmation event is tracked locally.
