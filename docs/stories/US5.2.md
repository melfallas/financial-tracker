# US5.2: Booking Screen & Calendar Integration

**Epic:** Epic 5 (Consultation Booking & Scheduling)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to provide my info and select a consultation time.

## Acceptance Criteria
- [ ] Create Step 1 layout: A PrimeNG-styled form demanding First Name, Last Name, and Email to qualify the lead.
- [ ] Setup Step 2 behavior: Utilizing an embedded `Calendly` or `Google Calendar` external widget.
- [ ] Form submission captures data as a Lead, storing locally (`Infrastructure Repository`) appending a `source: 'booking'` tag.
- [ ] Invokes an Email dispatcher process (confirmation).
- [ ] Ensures UX/UI design guidelines align with `Organisms-Booking-Screen.md` utilizing a modal overlay interface or split layout.

## Technical Architecture Requirements
This function strictly requires using the repository pattern (saveLead) storing in `IndexedDB` while the actual appointment is managed outside the system via `Calendly/Google`.
