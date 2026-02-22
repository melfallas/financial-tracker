# User Story 3.1: Personalized Lead Form

## 📋 Description

**As a stakeholder,** I want to capture the user's First Name, Last Name, and Email before providing a report so that I can follow up with high-intent leads.

## ✅ Acceptance Criteria

- [ ] Responsive form with separate fields for FirstName, LastName, and Email.
- [ ] Validation: Required fields, valid email format.
- [ ] Submit button uses **Emerald Green** (#00C853).
- [ ] Data persists to `LocalStorage` (Phase 1).

## 🧪 TDD Plan (Tests First)

1. **Validation Test:** Submit empty form -> Expect error messages.
2. **Email Format Test:** Input "invalid-email" -> Expect validation error.
3. **Submission Test:** Mock valid input -> Expect `LeadService.saveLead` to be called and success signal to trigger.
4. **Persistence Test:** Verify data is present in `localStorage` after submission.

## 🛠️ Implementation Notes

- Component: `src/app/features/lead-form/lead-form.ts`.
- Use Reactive Forms.
- Use `Repository Pattern` via `ILeadRepository` to allow easy migration to Supabase.
