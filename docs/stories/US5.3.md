# US5.3: Booking Email Automation

**Epic:** Epic 5 (Consultation Booking & Scheduling)
**Priority:** P0 (MVP)

## Description
**As a stakeholder,** I want automated emails sent to users and advisors upon booking to confirm the session and provide preparatory instructions.

## Acceptance Criteria
- [ ] Automated HTML email dispatched upon successful booking (Detect `calendly.event_scheduled`).
- [ ] Email follows physical layout (§Organisms-Email-Confirmation style):
    - Table-based HTML.
    - Deep Blue Header (#1A3C6E).
    - **Header:** "Your Strategy Call is Confirmed! 📅".
    - **Body:** Meeting link, date/time in the user's timezone, and the **3-step Homework** guide.
- [ ] **Advisor Notification:** Dispatch a summary email to the advisor with the lead's projection data (US3.2 results).
- [ ] Calendly integration to handle automated calendar invites (.ics).

## Technical Details

### Email Workflow
1. User completes booking in `BookingModal` (US5.2).
2. Angular app catches `postMessage` event.
3. App calls `EmailService.sendBookingConfirmation(lead, bookingDetails)`.
4. (Optional) Setup Calendly Webhook in a Supabase Edge Function to handle post-booking logic server-side.

### Steps to Complete:
1. Create a "Booking Confirmation" HTML template in `src/app/core/templates/`.
2. Update `EmailService` to support booking notifications.
3. Integrate projection data (wealth gap, retirement year) into the advisor's notification email.
4. Verify email link functionality (Join Meeting button).

## Non-Functional Requirements
- **Professionalism:** The email must look identical in branding to the PDF and the Web Dashboard.
- **Reliability:** If the email API fails, log the event to `IInteractionRepository` for manual follow-up.
