# 🗺️ Project Roadmap: Dependency Analysis & Execution Sequence
> **Financial Tracker** · **Role:** John (PM) · **Framework:** BMAD v4 · **Date:** 2026-03-06
> **Status:** UPDATED FOR MVP#1 · **Source:** Backlog v3.0.0

---

## 🎯 Executive Summary

Updated dependency tree to include the new MVP#1 requirements (Episode 7). The original dependency rules remain in force. New MVP#1 stories are mapped on sub-dependencies from the existing implemented features.

---

## 🌳 Original Dependency Map (Epics 1–6)

```mermaid
graph TD
  %% Base Layer (Epic 1)
  US1_1[US1.1: Project Scaffold] --> US1_2[US1.2: Design Tokens]
  US1_1 --> US1_4[US1.4: Math Engine]
  US1_1 --> US1_5[US1.5: IndexedDB Repo]

  %% Infrastructure Level
  US1_4 --> US3_1[US3.1: Wealth Gap Chart]
  US1_4 --> US3_2[US3.2: Retirement Sim]
  US1_4 --> US2_2[US2.2: PDF Report Gen]
  
  US1_2 --> US3_1
  US1_2 --> US4_1[US4.1: Hero & Navbar]
  US1_2 --> US5_1[US5.1: Floating CTA ❄️]
  
  US1_5 --> US2_1[US2.1: Lead Form]
  US1_5 --> US6_1[US6.1: Wishlist ❄️]

  %% Feature Level
  US3_1 --> US4_2[US4.2: Cost of Waiting]
  US2_1 --> US2_2
  US2_2 --> US2_3[US2.3: Email]
  
  US5_1 --> US5_2[US5.2: Booking ❄️]
  US4_1 --> US5_1

  %% Final Polish (MVP#2)
  US3_1 --> US6_2[US6.2: i18n ❄️]
  US3_2 --> US6_2
  US6_2 --> US6_3[US6.3: A11y ❄️]

  %% Styling
  style US1_1 fill:#1A3C6E,color:#fff,stroke:#fff,stroke-width:2px
  style US1_4 fill:#00C853,color:#fff
```

---

## 🚀 MVP#1 Dependency Map (Epic 7 — New)

```mermaid
graph TD
  %% Critical fixes first (Chart.js must work before other charts)
  ChartFix[US-MVP1.9 Sub3: Chart.js Fix] --> WGCFix7[US-MVP1.7: WGC Fixes]
  GHPagesFix[US-MVP1.9 Sub2: GitHub Pages Fix] --> Deploy[✅ Deploy Unblocked]

  %% Infrastructure for defaults
  DefService[US-MVP1.7 Sub3: Defaults Service] --> WGCFix7

  %% State correctness
  SyncFix[US-MVP1.6 Sub2: Savings Sync] --> SimFix[US-MVP1.6 Other Subs]
  CoWFix[US-MVP1.8: CoW Fixes] --> WGCFix7

  %% WGC fixes
  WGCFix7 --> DiscoverBtn[US-MVP1.2: Descubre Btn]

  %% New sections (depend on CoW and Review anchors)
  SimFix --> ReviewSection[US-MVP1.3: Review Section]
  ReviewSection --> NavLinks[US-MVP1.5: Navbar Links]
  ReviewSection --> FooterComp[US-MVP1.4: Footer]

  %% CTA updates (depend on style fix)
  StyleFix[US-MVP1.9 Sub1: Style Fix] --> CTAFix[US-MVP1.1: CTA Rename]
  CTAFix --> NavLinks

  %% Styling
  style DefService fill:#1A3C6E,color:#fff
  style ChartFix fill:#D32F2F,color:#fff
  style ReviewSection fill:#00C853,color:#fff
```

---

## 🔢 MVP#1 "Golden Path" (Sprint 4 Execution Sequence)

> Zero-blocker order for developer implementation.

### **Phase A: Infrastructure & Critical Fixes (Unblock Everything)**

1. **US-MVP1.9 Sub3** — Chart.js registration fix
2. **US-MVP1.9 Sub2** — GitHub Pages 404 fix
3. **US-MVP1.7 Sub3** — Simulator Defaults Service + JSON config
4. **US-MVP1.6 Sub2** — Savings sync bug (shared state)
5. **US-MVP1.8** — Cost of Waiting input fixes + layout fix

### **Phase B: Charts & Sliders**

6. **US-MVP1.7 Sub1** — WGC compact layout
7. **US-MVP1.7 Sub2** — Slider graduation
8. **US-MVP1.7 Sub4** — Slider track fill

### **Phase C: Simulator UX**

9. **US-MVP1.6 Sub1** — Age validation modal
10. **US-MVP1.6 Sub3** — Scroll to "Obtener Plan" (Step 3)
11. **US-MVP1.6 Sub4** — Scroll to "Agenda" after download+email

### **Phase D: Visual & CTA**

12. **US-MVP1.9 Sub1** — "Comenzar" button style fix
13. **US-MVP1.1** — "Asesoría Gratuita" CTA rename + Calendly
14. **US-MVP1.2** — "Descubre como Evitarlo" button on WGC

### **Phase E: New Sections**

15. **US-MVP1.4** — Footer component
16. **US-MVP1.3** — Review Call section
17. **US-MVP1.5** — Navbar section navigation

---

## 🛑 Constraint Rules (Hard Dependencies)

1. **Core-First Rule (Original):** No UI component can be started if its Math Logic (US1.4) or Design System (US1.2) are not `PASS`.
2. **Charts-First Rule (NEW):** Chart.js registration fix (US-MVP1.9 Sub3) must be applied before any chart-related work.
3. **State-First Rule (NEW):** Savings sync fix (US-MVP1.6 Sub2) must be verified with unit tests before implementing US-MVP1.6 Sub3/4.
4. **Anchor-First Rule (NEW):** Section IDs must be added to target sections before implementing Navbar navigation (US-MVP1.5).
5. **Review Section First:** US-MVP1.3 must be implemented before US-MVP1.5 so the `#agenda-llamada` anchor exists.

---

## 📌 Compliance Checks (PM Gate — Extended for MVP#1)

Before a story is considered ready for construction:
- [ ] Requirements enriched in the US file.
- [ ] Dependency parent stories marked `DONE` or `REVIEW`.
- [ ] Story references section anchor IDs (for navigation stories).
- [ ] Unit test defined for state-sync issues.
- [ ] Responsive breakpoints defined.

---

*— John, PM · Financial Tracker · BMAD v4 · 2026-03-06*
