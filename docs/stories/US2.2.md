# US2.2: PDF Report Generation

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to download a personalized PDF summary of my financial projection.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Unit tests for PDF generation logic (pure functions where possible).
- [ ] Dependencies: `jspdf` + `jspdf-autotable` loaded via `@defer` block.
- [ ] PDF Design Layout: Branded header (Deep Blue `#1A3C6E`), user name, date, Wealth Gap summary, and a data table.
- [ ] Document generation occurs seamlessly.
- [ ] Auto-download the PDF upon generation.
- [ ] Minimum 80% coverage on generation utility functions.

## Context
This is the physical asset delivered as the "Lead Magnet". A beautifully formatted chart displaying the math computed by `finance-math.ts`. 

## Technical Considerations
Avoid impacting LCP times. PDF generation packages must be loaded deferred when practically possible so they don't harm the first impression loading speeds (refer to `Organisms-PDF-Report.md`).

