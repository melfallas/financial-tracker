# User Story 3.2: PDF Report Generation

## 📋 Description

**As a user,** I want to download a professional summary of my financial projection so that I can review it later and share it with advisors.

## ✅ Acceptance Criteria

- [ ] Immediate download trigger after successful form submission.
- [ ] PDF contains the user's name and the specific "Wealth Gap" figures.
- [ ] Inclusion of a summary chart or table of Nominal vs Real results.
- [ ] Mobile-compliant download flow.

## 🧪 TDD Plan (Tests First)

1. **Download Trigger Test:** Spy on `window.URL.createObjectURL` -> Expect it to be called with a blob after success.
2. **Data Mapping Test:** Verify the data passed to the `PdfService` matches the current projection state.
3. **Success State Test:** Verify the UI displays "Your PDF is ready" after generation.

## 🛠️ Implementation Notes

- Service: `src/app/core/services/pdf.service.ts`.
- Use `jspdf` and `jspdf-autotable`.
- Personalized filename: `FinTracker_Report_{LastName}.pdf`.
