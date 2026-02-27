# Sprint 3: The Funnel & Goal Conversion

## Goals

Implement the lead capture funnel, generate personalized PDF reports as lead magnets, and establish the consultation booking flow. This sprint bridges the gap between user engagement (from the financial simulators of Sprint 2) and actionable business outcomes.

## User Stories

| ID        | Story                                              | Priority | Size   | Owner      | Status  |
| :-------- | :------------------------------------------------- | :------- | :----- | :--------- | :------ |
| **US2.1** | [Lead Capture Form](../stories/US2.1.md)           | P0       | Medium | Angi (Dev) | 🟢 DONE |
| **US2.2** | [PDF Report Generation](../stories/US2.2.md)       | P0       | Large  | Angi (Dev) | 🟢 DONE |
| **US2.3** | [Email Delivery](../stories/US2.3.md)              | P1       | Small  | Angi (Dev) | 📂 TODO |
| **US5.1** | [Floating CTA](../stories/US5.1.md)                | P0       | Small  | Angi (Dev) | 📂 TODO |
| **US5.2** | [Consultation Booking Screen](../stories/US5.2.md) | P0       | Medium | Angi (Dev) | 📂 TODO |
| **US5.3** | [Booking Automation](../stories/US5.3.md)          | P1       | Small  | Angi (Dev) | 📂 TODO |

## Definition of Done (DoD)

- [ ] Lead data is successfully saved using `LocalLeadRepository` (US1.5).
- [ ] PDF Generation is performed computationally on the client-side and matches the specified design.
- [ ] Floating CTA logic handles scroll events smoothly without hurting performance.
- [ ] Booking flow seamlessly integrates the scheduling component (e.g. Calendly).
- [ ] Automated email logic correctly binds lead data and PDF attachments (Mocks enabled for dev).
- [ ] Components strictly use external Templates and Styles (Angular 21 Standards).

## Technical Strategy

1. **Lead Capture Foundation**: Implement **US2.1** first to ensure we have the fundamental user data required for the reporting phases.
2. **The PDF Engine**: Focus heavily on **US2.2** to extract the state of our Math Engine + Chart states into a readable document format (`jspdf` / `html2canvas`).
3. **Delivery Automation**: Set up the email logic **US2.3** linking the generated PDF to the provided email in US2.1.
4. **Acquisition & Scheduling**: Surface the persistent floating button **US5.1** directing the lead into the Consultation flow in **US5.2** & **US5.3**.

## Risks & Mitigations

- **Heavy Processing for PDF:** Generating a multi-page PDF with charts can block the main UI thread. *Mitigation: Offload complex rendering loops, provide a clear loading state (e.g., "Generando tu Análisis Financiero..."), and rely on `onPush` tracking.*
- **API Dependencies:** Emailing and booking APIs could be a blocker in local environments. *Mitigation: Implement interface-driven Service Adapters to mock these requests without needing real API keys during UI development.*
