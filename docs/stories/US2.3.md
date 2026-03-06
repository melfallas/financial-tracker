# US2.3: PDF Email Delivery

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description

**As a user,** I want to receive the personalized financial PDF in my email with clear next steps and an immediate option to book a consultation.

## Acceptance Criteria

- [x] Automated HTML email dispatched upon lead capture. The implementation must be decoupled via a shared interface to allow transparent portability between providers. Current implementation uses a Supabase Edge Function to handle email delivery via Resend.
- [x] Email follows physical layout (§Organisms-Email-Confirmation):
  - Table-based HTML (Email-client compatible).
  - Deep Blue Header (#1A3C6E).
  - Personalized greeting with the lead's name.
  - **Secure PDF Link** (pointing to a signed URL or local download route).
  - **Primary CTA:** Emerald Green button (#00C853) for Calendly booking.
- [x] Tracking: Append UTM parameters to the booking link.
- [x] UI Feedback: Both the automated dispatch success message ("¡Plan enviado!") and the fallback error UI must be presented to the user as centered modals with an explicit close action. Clicking "Download Locally" on the error fallback must automatically close its modal.

## Technical Details

### Email Infrastructure

- **Architecture Pattern:** Abstract Interface (`IEmailProvider`) to allow portable switching between services. The new standard dictates minimizing logic in Angular adapters and delegating work to Supabase Edge Functions.
- **Initial Service Provider:** Supabase Edge Function (integrates internally with Resend).
- **Workflow:**
  1. Lead submits form (US2.1).
  2. App generates PDF Base64 (US2.2).
  3. App triggers Edge Function/API sending the Lead Data + PDF reference.
  4. Service sends HTML email.

### HTML Spec (§Organisms-Email-Confirmation):

- **Styles:** Inline only. No `flex` or `grid`.
- **Primary Color:** Deep Blue (#1A3C6E).
- **CTA Color:** Emerald Green (#00C853).
- **Fonts:** Fallback to `sans-serif`.

### Steps to Complete:

1. Ensure `NG_APP_EMAIL_SENDING_FUNCTION_URL` and `NG_APP_EMAIL_SENDING_FUNCTION_KEY` are configured in your `.env`.
2. Create an Email Template (HTML Table) in `src/app/core/templates/email-confirmation.html`.
3. Create `SupabaseEmailAdapter` extending `IEmailProvider` in `src/app/core/services/email/`.
4. Implement `send(payload: EmailPayload)` to call the Supabase Edge Function.
5. Integrate with `LeadForm` submission logic and provide `SupabaseEmailAdapter` in `app.config.ts`.
6. Configure error handling and retry logic.

## Non-Functional Requirements

- **Deliverability:** Valid SPF/DKIM records required for the sending domain.
- **Micro-Copy:** "Mark from Financial Tracker" as the sender alias (establishing relationship).
- **Performance:** Email request must be async; don't wait for server response to show the success screen in the UI.
