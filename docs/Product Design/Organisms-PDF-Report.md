# 🧩 Organism Detail: PDF Diagnostic Report (US2.4)
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-23
> **Status:** Detailed Spec Ready for Development · **Context:** Lead Magnet Deliverable

---

## 🎯 Purpose & Emotional Narrative

The **PDF Diagnostic Report** is the tangible artifact that bridges the gap between a fleeting digital interaction and a lasting physical/shareable commitment. 

> **UX Philosophy:** It must look like an official, premium executive summary from a private wealth management firm. By capturing both the "Threat" (Wealth Gap) and the "Hope" (Retirement Projection), it creates a standalone narrative that can be shared with a spouse or business partner. The final page acts as a massive offline-to-online conversion hook.

---

## 🗂️ Component Architecture & Layout Specifications

**Canvas Setup:**
- **Format:** A4 or US Letter (Portrait `210x297mm`).
- **Rendering Engine:** Generated client-side using `jspdf` and `jspdf-autotable`, parsing raw data signals and converting Angular Chart.js `<canvas>` elements to base64 images via `.toBase64Image()`.
- **Typography:** Requires embedding the `Inter` font or using built-in sans-serif equivalents (`Helvetica`) to maintain brand consistency within the PDF engine.

### Page 1: The Executive Summary (The Problem & The Blueprint)

**Visual Spec:**
- **The Premium Header:** A solid, full-width `Deep Blue (#1A3C6E)` rectangular block taking up the top 15% of the page. Contains the "Financial Tracker" logo (left, white) and the Report Date / Lead Name (right, white).
- **Body Background:** Pure White (`#FFFFFF`) for maximum contrast and clean printing.
- **Section 1: The Silent Threat (Wealth Gap):**
  - A prominent `Soft Red` highlight box stating the total projected loss to inflation.
  - The exported Chart.js image from the Wealth Gap component (Nominal vs Real curves).
  - A 3-column data table summarizing: `Initial Capital`, `Expected Return`, `Inflation Impact`.
- **Section 2: The Freedom Projection (Retirement Simulator):**
  - A prominent `Emerald Green` highlight containing the user's "Financial Freedom Date" or Age.
  - The exported Chart.js image showing the "Nest Egg" vs. "4% Rule" withdrawal rate.
  - A clean data table showing projections and required monthly contributions.

### 📐 Blueprint (Wireframe — Page 1)
```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Deep Blue Header Block: 100% width, 35mm height]                     │
│  [Logo (White)]                        Financial Diagnostic Report     │
│                                        Prepared for: [ John Doe ]      │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  1. THE INFLATION THREAT (Your current trajectory)                     │
│  ────────────────────────────────────────────────────────────────────  │
│  [ Soft Red Box ] "If inflation holds at 6.5%, you lose $10,500/yr"    │
│                                                                        │
│  [ Wealth Gap Chart Image Exporter ]                                   │
│  (Displays the diverging lines between Nominal and Real value)         │
│                                                                        │
│                                                                        │
│  2. YOUR FREEDOM BLUEPRINT (The path forward)                          │
│  ────────────────────────────────────────────────────────────────────  │
│  [ Emerald Box ] "Financial Independence Achievable at Age 58"         │
│                                                                        │
│  [ Retirement Simulator Chart Image Exporter ]                         │
│  (Displays compounding growth hitting the 4% Rule target line)         │
│                                                                        │
│                                                                        │
│  [ Footer: Page 1 of 2 ]                      [ Confidencial / 2026 ]  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧲 Page 2: The Conversion Anchor (Maximum CTA)

**Visual Spec:**
- The second page shifts from an analytical aesthetic to a direct-response marketing layout.
- A massive layout block dominating the page to prevent the user from treating the document as "finished reading."
- **QR Code:** High-resolution QR code generated dynamically using a library like `qrcode.js` or `angularx-qrcode`. The payload URL directs to `https://[our-domain].com/booking?email=[lead-email]&lead_id=[uuid]`.
- **Main CTA Text:** Aggressive, large typography in `Charcoal` and `Emerald Green`.

### 📐 Blueprint (Wireframe — Page 2)
```text
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                                                                        │
│                      NO DEJES ESTO EN PAPEL                            │
│                                                                        │
│                                                                        │
│  Tienes un mapa claro. Ahora necesitas la estrategia para ejecutarlo.  │
│                                                                        │
│                                [ QR ]                                  │
│                                [CODE]                                  │
│                                [ HERE]                                 │
│                                                                        │
│           Escanea este código con la cámara de tu teléfono             │
│                      para agendar tu cita.                             │
│                                                                        │
│           [ Alcanza tu Libertad Financiera. Agenda Ahora ]             │
│          (Massive Emerald Green Button simulation graphic)             │
│                                                                        │
│                                                                        │
│                        O haz clic en este enlace:                      │
│                https://financialtracker.com/booking/123                │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🕹️ Technical & Micro-interaction Requirements (Client-Side Generation)

**1. Chart Export Sequence (Critical Dependency):**
- The `jspdf` library cannot render HTML `<canvas>` elements directly unless they are converted to Base64 strings.
- **Workflow:** When the user clicks "Download PDF", the Angular component must query the `ViewChild` of the Chart.js instances, invoke `chart.toBase64Image()`, and pass those Data URIs to the PDF generator service.

**2. Asynchronous Generation (`@defer`):**
- The PDF generation process (loading `jspdf`, grabbing snapshots, rendering) takes hundreds of milliseconds and blocks the main thread.
- During this generation phase, the UI must show a spinning inline indicator on the "Download" button to prevent duplicate clicks.

**3. The QR Code Payload:**
- The QR Code URL must carry UTM parameters and the Lead's Email via query strings (e.g., `?utm_source=pdf_report&email=john.doe@example.com`).
- This allows the web application's Booking landing page to automatically trigger the "Magic Pre-fill" (US5.2) logic when the user scans the code with their physical phone.

---

## 🌐 i18n & Context Notes
- Because `jspdf` hard-codes text coordinates, text wrapping must be calculated manually using `pdf.splitTextToSize()`.
- Ensure all static strings ("Prepared for", "The Inflation Threat", "Confidential") are localized correctly before painting the PDF canvas.

---

*— Sally, UX/UI Expert · Financial Tracker · BMAD v4 · 2026-02-23*
