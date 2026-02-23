# US2.1: Lead Capture Form Component

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description
**As a stakeholder,** I want to capture First Name, Last Name, and Email through a professional form.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Tests for form validation (required fields, email format) written first before implementing.
- [ ] UI Component setup: PrimeNG `InputText` and `Button` components correctly styled via Tailwind CSS overrides (`tailwindcss-primeui`).
- [ ] Real-time Validation styling:
    - Error state: Soft Red (`#D32F2F`) boundaries.
    - Valid state: Teal Bright (`#009688`)
- [ ] Privacy consent checkbox is visible and functioning (GDPR compliance).
- [ ] Submission Button rendered in specific Emerald Green (`#00C853`) utilizing a loading spinner.
- [ ] Full coverage Storybook stories demonstrating states:
    - Default
    - Validation errors triggered
    - Loading
    - Success

## UX / UI Design Notes
Form input validation errors must provide clear messaging avoiding frustrating users during this crucial conversion flow. Use `Organisms-Lead-Capture-Flow.md`.

## Architecture Hook
Component must use the `ILeadRepository` to safely persist this data via IndexedDB for the MVP.
