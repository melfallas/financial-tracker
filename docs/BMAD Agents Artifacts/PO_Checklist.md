# ✅ Product Owner (PO) Checklist: Fin-Tracker Global MVP

This checklist serves as the final validation gate for the Product Owner to ensure that the development aligns with the **Spec-Driven Development (SDD)** standards and the **BMAD** methodology.

## 1. 🏗️ Architecture & Standards (Winston’s Audit)

- [ ] **Clean Naming Policy:** Are all components named without the `.component` suffix? (e.g., `lead-form-store.ts` vs `lead-form-store.component.ts`).
- [ ] **Standalone Integrity:** Are all UI components strictly `standalone: true`?
- [ ] **Signal Adoption:** Is the UI state managed 100% via Angular `Signals`? (No legacy `BehaviorSubject` for UI state).
- [ ] **Tech Stack Compliance:** Using Angular 21, Tailwind v4, and ExchangeRate-API?
- [ ] **Code Language:** Is all source code, comments, and commit messages strictly in **English**?

## 2. 🎨 UI/UX & Brand (Sally’s Audit)

- [ ] **80/15/5 Rule:** Is the color distribution correct?
  - 80% (Base): Deep Blue (#1A3C6E) and Cloud Gray (#ECEFF1).
  - 15% (Action): Teal Bright (#009688).
  - 5% (Conversion/CTA): **Emerald Green (#00C853)**.
- [ ] **Mobile-First Design:** Has the component been validated using the iPhone 14 / Pixel 7 viewports in Storybook?
- [ ] **The Wealth Gap Logic:** Does the chart clearly show the distance between Nominal and Real value?
- [ ] **Feedback States:** Are success messages in Emerald Green and high-inflation alerts in Soft Red?
- [ ] **Micro-animations:** Do buttons and interactive elements have subtle hover/click transitions?

## 3. 📉 Product & Content (John’s Audit)

- [ ] **Multi-Currency Support:** Can the user select USD, EUR, and at least 3 LATAM currencies (ARS, MXN, CRC)?
- [ ] **Lead Capture Fields:** Does the form collect First Name, Last Name, and Email separately?
- [ ] **Lead Persistence:** Are leads saved to LocalStorage (Phase 1)?
- [ ] **Value Delivery:** Does the PDF download successfully and clearly state the "Wealth Gap"?
- [ ] **Language Consistency:** Is the UI bilingual? Does language switching work without page reload?

## 4. 🧪 Quality & Portability (Scrum Master Audit)

- [ ] **Storybook Coverage:** Does every feature have a `.stories.ts` file with at least 3 states (Default, Mobile, Error/Loading)?
- [ ] **Accessibility:** Does the component pass the AXE accessibility check in the browser?
- [ ] **Lighthouse Performance:** Score > 90 on Mobile (Performance section)?
- [ ] **Documentation:** Is the `Backlog.md` and `Architecture.md` updated to reflect the current state?

---

**PO Final Verdict:**

- [ ] **APPROVED** (Ready for Deployment)
- [ ] **REJECTED** (Needs correction as per violations listed below)

**Notes:**

---

---
