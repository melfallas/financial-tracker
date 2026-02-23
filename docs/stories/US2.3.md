# US2.3: PDF Email Delivery

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to receive the PDF in my email.

## Acceptance Criteria
- [ ] Automated email dispatched using an edge function targeting an external email API (e.g. Resend/SendGrid).
- [ ] Email output provides a personalized greeting.
- [ ] Contains a PDF attachment or a direct link.
- [ ] Design branded following Financial Tracker standards.
- [ ] Upon transition a UI success screen reminds the user to check their spam folder.
- [ ] Provide fallback behavior allowing manual client-side download if the automatic email dispatch fails.

## Context
Refers to the `Organisms-Email-Confirmation.md` HTML-Table layout.
The most important part of the delivery system. The goal of the Lead form is met here for the end user.
