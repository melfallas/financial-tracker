# US2.3: PDF Email Delivery

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to receive the personalized financial PDF in my email with clear next steps and an immediate option to book a consultation.

## Acceptance Criteria
- [ ] Automated HTML email dispatched upon lead capture using an external API (Resend, SendGrid, or Supabase Edge Functions).
- [ ] Email follows physical layout (§Organisms-Email-Confirmation):
    - Table-based HTML (Email-client compatible).
    - Deep Blue Header (#1A3C6E).
    - Personalized greeting with the lead's name.
    - **Secure PDF Link** (pointing to a signed URL or local download route).
    - **Primary CTA:** Emerald Green button (#00C853) for Calendly booking.
- [ ] Tracking: Append UTM parameters to the booking link.
- [ ] Support fallback: If automated dispatch fails, the UI must provide a "Download Locally" button after a timeout.

## Technical Details

### Email Infrastructure
- **Service:** Resend (recommended for developer experience) or SendGrid.
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
1. Setup a free account on Resend/SendGrid and get an API Key.
2. Create an Email Template (HTML Table) in `src/app/core/templates/email-confirmation.html`.
3. Create `EmailService` in `src/app/core/services/`.
4. Implement `sendLeadEmail(lead: Lead, pdfBase64: string): Promise<void>`.
5. Integrate with `LeadForm` submission logic.
6. Configure error handling and retry logic.

## Non-Functional Requirements
- **Deliverability:** Valid SPF/DKIM records required for the sending domain.
- **Micro-Copy:** "Mark from Financial Tracker" as the sender alias (establishing relationship).
- **Performance:** Email request must be async; don't wait for server response to show the success screen in the UI.
