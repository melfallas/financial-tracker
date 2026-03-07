# ✅ Product Owner (PO) Checklist: Fin-Tracker Global MVP

This checklist serves as the final validation gate for the Product Owner to ensure that the development aligns with the **Spec-Driven Development (SDD)** standards and the **BMAD** methodology.

## 1. 🏗️ Architecture & Standards (Winston's Audit)

- [ ] **Clean Naming Policy:** Are all components named without the `.component` suffix?
- [ ] **Standalone Integrity:** Are all UI components strictly `standalone: true`?
- [ ] **Signal Adoption:** Is the UI state managed 100% via Angular `Signals`?
- [ ] **Tech Stack Compliance:** Using Angular 21, Tailwind v4, and ExchangeRate-API?
- [ ] **Code Language:** Is all source code and technical documentation strictly in **English**?

## 2. 🧪 TDD & Quality Gate (Mandatory)

- [ ] **TDD Implementation:** Was the feature developed following the **Red-Green-Refactor** flow?
- [ ] **Code Coverage:** Does the component/service have at least **80% code coverage**?
- [ ] **Unit Tests:** Are all business logic paths covered by `@testing-library/angular` tests?
- [ ] **Storybook Coverage:** Does every feature have stories for Default, Mobile, and Error/Loading states?

## 3. 🎨 UI/UX & Brand (Sally's Audit)

- [ ] **80/15/5 Rule:** Is the color distribution correct? (Deep Blue/Cloud Gray 80%, Teal 15%, emerald Green 5%).
- [ ] **Mobile-First Design:** Has the UI been validated in Storybook for phone viewports?
- [ ] **The Wealth Gap Logic:** Does the chart clearly show the distance between Nominal and Real value?
- [ ] **Feedback States:** Are success messages in Emerald Green and high-inflation alerts in Soft Red?

## 4. 📉 Product & Content (John's Audit)

- [ ] **Multi-Currency Support:** Can the user select USD, EUR, and LATAM currencies?
- [ ] **Lead Capture Fields:** Does the form collect First Name, Last Name, and Email separately?
- [ ] **Value Delivery:** Does the PDF download successfully with personalized data?
- [ ] **Language Consistency:** Is the UI fully bilingual (ES/EN)?

## 5. 📋 Story Tracking & Readiness (Sharding Status)

### Sprints 1–3 (Completed/Partial)

| Story ID  | Description            | Status   | Readiness (RfD) |
| :-------- | :--------------------- | :------- | :-------------- |
| **US1.1** | Project Initialization | 🟢 Done  | **Done**        |
| **US1.2** | Global Design System   | 🟢 Done  | **Done**        |
| **US1.3** | Storybook Setup        | 🟢 Done  | **Done**        |
| **US1.4** | Wealth Gap Engine      | 🟢 Done  | **Done**        |
| **US1.5** | Repository Pattern     | 🟢 Done  | **Done**        |
| **US2.1** | Lead Capture Form      | 🟢 Done  | **Done**        |
| **US2.2** | PDF Report Gen         | 🟢 Done  | **Done**        |
| **US2.3** | PDF Email Delivery     | 🟢 Done  | **Done**        |
| **US2.4** | Success Screen         | 🟢 Done  | **Done**        |
| **US3.1** | Wealth Gap Chart       | 🟢 Done  | **Done**        |
| **US3.2** | Retirement Simulator   | 🟢 Done  | **Done**        |
| **US3.3** | CDP vs Market          | ❄️ MVP#2 | **Frozen**      |
| **US4.1** | Hero & Navbar          | 🟢 Done  | **Done**        |
| **US4.2** | Cost of Waiting        | 🟢 Done  | **Done**        |
| **US4.3** | Market Widgets         | ❄️ MVP#2 | **Frozen**      |
| **US5.1** | Floating CTA           | ❄️ MVP#2 | **Frozen**      |
| **US5.2** | Booking & Calendar     | ❄️ MVP#2 | **Frozen**      |
| **US5.3** | Booking Email          | ❄️ MVP#2 | **Frozen**      |
| **US6.1** | Wishlist Board         | ❄️ MVP#2 | **Frozen**      |
| **US6.2** | i18n Polish            | ❄️ MVP#2 | **Frozen**      |
| **US6.3** | A11y & Storybook       | ❄️ MVP#2 | **Frozen**      |
| **US6.4** | Perf & Production      | ❄️ MVP#2 | **Frozen**      |

### Sprint 4 — MVP#1 New Stories (Active)

| Story ID      | Description                         | Status  | Readiness (RfD) |
| :------------ | :---------------------------------- | :------ | :-------------- |
| **US-MVP1.1** | "Asesoría Gratuita" CTA Button      | 📂 TODO | **Ready**       |
| **US-MVP1.2** | WGC "Descubre como Evitarlo" Button | 📂 TODO | **Ready**       |
| **US-MVP1.3** | Review Call Section                 | 🟢 Done | **Done**        |
| **US-MVP1.4** | Footer Component                    | 🟢 Done | **Done**        |
| **US-MVP1.5** | Navbar Section Navigation           | 🟢 Done | **Done**        |
| **US-MVP1.6** | Retirement Simulator Fixes          | 📂 TODO | **Ready**       |
| **US-MVP1.7** | Wealth Gap Chart Fixes              | 📂 TODO | **Ready**       |
| **US-MVP1.8** | Cost of Waiting Banner Fixes        | 📂 TODO | **Ready**       |
| **US-MVP1.9** | Cross-Cutting Fixes                 | 📂 TODO | **Ready**       |

---

## 6. 🚀 MVP#1 Closure Gate (NEW)

- [ ] GitHub Pages deployment serves app without 404.
- [ ] All Chart.js charts render without console errors.
- [ ] Lead form → PDF download → Email → Review Call section flow works end-to-end.
- [ ] Navbar smooth-scrolls to all 5 sections.
- [ ] Footer displays with dynamic copyright year.
- [ ] "Asesoría Gratuita" button links to Calendly correctly.
- [ ] Slider track fill works on all sliders on load and on change.
- [ ] Savings sync verified: $4000 in simulator → $4000 in WGC Capital Inicial, $4000 in CoW "Si tienes".
- [ ] All new components use `templateUrl`/`styleUrl` (no inline).
- [ ] All new components use `ft-` selector prefix.
- [ ] Responsive validated on mobile, tablet, desktop, large, XL.

---

- [x] **SPRINTS 1–2 APPROVED & DONE**
- [x] **SPRINT 3 PARTIAL (US2.x DONE; US5.x to MVP#2)**
- [x] **Sprint 4 stories enriched and ready for development**

**Notes:**
US5.x (Booking) deferred to MVP#2. US-MVP1.3 (Review Call Section with direct Calendly CTA) provides MVP#1 booking conversion. 7 design decisions pending PM/UX approval — see `implementation_plan.md`.

---
