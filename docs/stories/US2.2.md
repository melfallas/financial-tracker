# US2.2: PDF Report Generation

**Epic:** Epic 2 (Lead Capture, PDF Generation & Email Delivery)
**Priority:** P0 (MVP)

## Description
**As a user,** I want to download a personalized, premium PDF summary of my financial projection that serves as a tangible roadmap for my investment journey.

## Acceptance Criteria
- [ ] **TDD Mandatory:** Logic tests for PDF content assembly (assembling strings, detecting high-scale currency rounding) written first.
- [ ] Uses `jspdf` and `jspdf-autotable` loaded via **Angular `@defer` block** to minimize initial bundle size.
- [ ] **Implementation Physics:**
    - Capture Chart.js instances via `ViewChild` and convert to Base64 using `toBase64Image()`.
    - Page 1: Deep Blue Header (#1A3C6E), Lead Name, Date, Wealth Gap Chart, Retirement Chart, Summary Tables.
    - Page 2: Conversion Anchor with a dynamic QR Code pointing to the Booking URL (pre-filled with the user's email).
- [ ] Multi-language support: Content must switch between EN/ES based on the active session locale.
- [ ] Unit tests for the generation service ensuring all data fields are mapped correctly.

## Technical Details

### Dependencies
- `jspdf`, `jspdf-autotable`, `angularx-qrcode`.

### PDF Structure (§Organisms-PDF-Report):
- **Header:** Full-width Deep Blue block (top 15%).
- **Section 1 (Problem):** "The Silent Threat" with Soft Red (#D32F2F) highlight box.
- **Section 2 (Hope):** "Your Freedom Blueprint" with Emerald Green (#00C853) highlight box.
- **QR Code Payload:** `https://[domain].com?email=[email]&utm_source=pdf_report`.

### Steps to Complete:
1. Install `jspdf`, `jspdf-autotable`, and `angularx-qrcode`.
2. Create `PdfReportService` in `src/app/core/services/`.
3. Implement `generateReport(lead: Lead, projection: ProjectionEntry[]): void`.
4. Create the PDF layout using `doc.rect()`, `doc.text()`, and `doc.addImage()`.
5. Integrate with the Home Page's chart instances to grab snapshots.
6. Localize all PDF strings in a dedicated `pdf-labels.ts` file or via `en.json/es.json`.
7. Add a loading state to the download trigger.

## Non-Functional Requirements
- **Performance:** Generation must be non-blocking where possible.
- **Consistency:** PDF must match brand colors (Deep Blue, Emerald Green, Soft Red) exactly.
- **Privacy:** Document generated locally; data remains in browser memory until saved.
