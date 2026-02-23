# US5.3: Booking Email Automation

**Epic:** Epic 5 (Consultation Booking & Scheduling)
**Priority:** P0 (MVP)

## Description
**As a stakeholder,** I want automated emails for booking and reminders.

## Acceptance Criteria
- [ ] Configure Email logic firing:
    - User Confirmation email upon scheduling meeting (delivering date, time and prep-tips).
    - Provider Notification: Sent to actual Financial Tracker advisors informing them of new leads and schedule.
    - Reminder Email triggering 24h prior to the consultation if possible within external integration (i.e Calendly natively or Supabase/Cron).
- [ ] Ensures automated processes trigger via external dispatch APIs accurately (SendGrid/Resend).

## Architecture Hook
Currently managed via edge functions utilizing email delivery integrations. See `docs/Architecture.md` logic over mailing delivery tasks. Re-utilizes technical scaffold from US2.3.
