# 🎨 Detailed UX/UI Frontend Specification
> **Financial Tracker** · **Role:** Sally (UX/UI Expert) · **Framework:** BMAD v4 · **Date:** 2026-02-22

---

## 1. UX/UI Scope & Business Alignment
The design scope for Financial Tracker is to create an **"Educational Conversion Engine"**. Aligning with John's (PM) vision, the design must guide users from casual curiosity to a state of "loss aversion" via undeniable data visualization, culminating in lead capture (PDF download) and consultation booking. The interface will avoid looking like a generic utility app; instead, it will project institutional trust (like a premium bank) mixed with fintech agility.

---

## 2. User Personas & Journeys

### 2.1 Primary Persona: The "Unaware Saver"
- **Demographics:** 28-45 years old, LATAM-based, middle-to-high income.
- **Pain Points:** Keeps money in local savings accounts or CDs, unaware of the silent erosion caused by inflation and currency devaluation. Overwhelmed by complex investment dashboards.
- **Goals:** Wants a simple way to protect their wealth and visually understand if they are on track for retirement.

### 2.2 The Narrative Scroll (Critical Path to Lead Gen)
1. **The Hook:** Arrives at the Landing Page. Hero section immediately promises "Financial Freedom" and offers a "Schedule a Call" CTA.
2. **The Shock:** Scrolls down to see the *Cost of Waiting* and *Currency Comparison* widgets. Realizes their local money is losing value.
3. **The Proof:** Interacts with the *Wealth Gap (Compound Interest)* and *Retirement* simulators. Visually sees the red "erosion" area expanding when adjusting inflation.
4. **The Action (Lead Gen):** Motivated by loss aversion, clicks to get their "Personalized Wealth Protection Plan" PDF or books a consultation.

---

## 3. Information Architecture (IA)
The application follows a **Single Page "Narrative Scroll"** hierarchy to avoid cognitive overload.

1. **Global Header:** Navbar (PrimeNG `Menubar`) with Deep Blue styling, Logo, ES/EN toggle, Currency, and CTA.
2. **Hero Section:** Value proposition + Direct Call to Action.
3. **Engagement Widgets:** Cost of Waiting Banner, Freedom Countdown.
4. **Market Context:** Currency Comparator, Fear & Greed Index.
5. **Interactive Core (The Simulators):** Compound Interest (Wealth Gap) and Retirement Simulators.
6. **Conversion Zone:** Embedded Lead Capture Form (for PDF) and Booking integration.
7. **Retention & Footer:** Wishlist Board and Footer.

---

## 4. Visual Design System (The 80/15/5 Rule)
Leveraging Tailwind CSS v4 design tokens and `tailwindcss-primeui` for strict application.

- **80% (Trust/Base - Institutional Feel):**
  - **Deep Blue (`#1A3C6E`):** Hero backgrounds, Navbar, Primary headings (H1, H2), ghost button borders.
  - **Cloud Gray (`#ECEFF1`):** Main app background, Card surfaces.
- **15% (Guidance/Reading/Interactive):**
  - **Charcoal (`#37474F`):** Body text, subheadings.
  - **Teal Bright (`#009688`):** UI interactive highlights, icons, slider tracks (unfilled).
- **5% (Conversion - The Hook):**
  - **Emerald Green (`#00C853`):** STRICTLY for primary CTAs, success feedback, and nominal wealth growth lines.
- **Alerts (Minimal Usage):**
  - **Soft Red (`#D32F2F`):** Inflation loss, debt, Wealth Gap shading, validation errors.
  - **Warm Orange (`#F57C00`):** Subtle alert states.
  - **Golden Amber (`#FFC107`):** Neutral/Warning metrics.

**Typography:** Inter (`font-sans`), ensuring absolute legibility.

---

## 5. Interaction Design Principles & Micro-Interactions

- **Perceived Responsiveness:** All financial calculations update instantly (under 16ms, 60FPS) using Angular Signals. No network loading spinners for chart updates.
- **Micro-Interactions (The Wealth Gap):** When a user drags the "Annual Inflation" slider, the red shaded area on the Chart.js canvas smoothly expands or contracts in real-time, accompanied by a fast-counting numeric animation on the "Total Wealth Erosion" label.
- **Feedback Rules:** 
  - Emerald Green checkmarks for success states.
  - Soft Red borders with subtle shaking animation for form validation errors.
  - Hover states on Emerald CTAs elevate the button (`shadow-lg`) and increase brightness by 10%.
- **Loading States:** Skeleton Loaders (`animate-pulse`) mirroring the exact shape of incoming data (e.g., currency rates) to prevent Cumulative Layout Shift (CLS).

---

## 6. PrimeNG Component Mapping
Exactly which PrimeNG component powers each area, styled via `tailwindcss-primeui` overriding default themes with our tokens:

| Section / Feature | PrimeNG Component | Tailwind Customization |
| :--- | :--- | :--- |
| **Navbar** | `Menubar` | Override background to Deep Blue or transparent. |
| **Calculators (Inputs)** | `Slider`, `InputNumber` | Slider handle/track colored via Teal/Emerald/Red tokens. |
| **Layout / Widgets** | `Card` | `bg-cloud-gray`, `rounded-fintech` (1.5rem), custom premium shadow. |
| **Lead Form** | `InputText`, `Checkbox`, `Button` | Emerald Green button, clean borders, Charcoal text. |
| **Fear & Greed Index** | `Knob` | Semicircle mode, custom color value ranges (Red -> Amber -> Green). |
| **CDP vs Market** | `DataTable` | Striped/clean look, Deep Blue headers. |
| **Wishlist Board** | `DataView` | Grid layout for feature cards with upvote counters. |

---

## 7. Feature-Specific Design Specifications

### 7.1 Hero Section & Navigation
- **Navbar:** Sticky behavior. Deep Blue background (`#1A3C6E`) on scroll, transparent on Hero top.
- **Hero Title:** H1 in Deep Blue. Key phrases in Emerald Green (`#00C853`).
- **Main CTA:** Emerald Green button with "Schedule a Call" text. High elevation shadow.

### 7.2 Contact Forms (Lead Gen & Booking)
- **Lead Capture Card (PDF):** A prominent card within the Narrative Scroll. 
  - Fields: `First Name`, `Last Name`, `Email`.
  - Checkbox: GDPR consent mandatory.
  - Button: "Send my Personalized Report" (Emerald Green).
  - Success Feedback: Card background fades to light Teal, displays "PDF Sent to [Email]!" with a green checkmark.
- **Booking Flow (2-Step):** 
  - Step 1: Capture Name/Email/Phone (using same form components).
  - Step 2: Overlay/Modal displaying external widget (Calendly/Google Calendar) with a pre-filled name/email.
  - Exit: Closing the modal brings the user back to the "Success/Thank You" screen.

### 7.3 Calculators & Simulators
- **Compound Interest (Wealth Gap):**
  - Inputs (Sliders on left): Initial Capital, Monthly Savings, Expected Return (%), Inflation (%).
  - Chart (Right): Real-time Chart.js line graph.
  - Summary: Text in Charcoal showing "Your money in 20 years: $X nominal vs. $Y real."
- **Retirement Simulator:**
  - Additional Inputs: "Target Retirement Age," "Desired Monthly Income in Today's Dollars."
  - Output: A Golden Amber (`#FFC107`) marker on the chart when "Real Value" meets "Desired Income."

### 7.4 Interactive Tools
- **Cost of Waiting Banner:** 
  - A horizontal ticker or banner.
  - "Every second you wait, you lose [Animated Counter in Soft Red] dollars."
  - "Since you opened this page, the market grew [Percentage in Emerald Green]."
- **Currency Comparison Card:** 
  - Flag icons (PrimeIcons/PrimeUI). 
  - Big number display of local currency vs USD exchange rate.
  - Subtle trend line (mini-chart) showing devaluation over 1 year.

### 7.5 PDF Generation & Email Design
- **PDF Layout:**
  - Institutional Header: "Financial Tracker - Personalized Projection."
  - Branding: Deep Blue accents. 
  - Content: High-resolution image of the user's customized Wealth Gap chart.
  - Logic Table: Clean PrimeNG-styled table showing year-by-year nominal vs real values.
- **Email Template:**
  - Responsive HTML (Table-based for compatibility).
  - Header: Logo in Deep Blue.
  - Body: "Hello [Name], here is your Financial Protection Plan."
  - Button: "Download PDF" in Emerald Green.
  - Subtext: "Didn't receive it? Check your spam folder or reply to this email."

---

## 8. Data Visualization Standards (Chart.js via `ng2-charts`)
The **"Wealth Gap"** chart is the emotional core of the app:
- **Type:** Dual-line area chart (`type: 'line'`).
- **Nominal Growth Series:** Solid Emerald Green (`#00C853`) line, filled below with `<10% opacity green`.
- **Real Purchasing Power Series:** Dashed Deep Blue (`#1A3C6E`) line. 
- **The Gap (Loss):** The visual area *between* the Nominal and Real lines must be shaded in semi-transparent Soft Red (`rgba(211, 47, 47, 0.15)`).
- **Interactivity:** Tooltips display exact monetary loss per year. `chart.update('quiet')` used to prevent disruptive redraw animations during slider drag.

---

## 9. Mobile First & Responsive Patterns
Financial Tracker is built for thumb-driven interaction.
- **Mobile (`< 768px`):** 
  - Layout: `flex-col`, stacked full-width cards. `p-4` padding.
  - Interactions: Sliders must have minimum `44x44px` touch targets.
  - Hidden elements: Complex data tables collapse to stacked list views or horizontal scrolling.
  - Navbar: Collapses to a hamburger menu except for the Logo and a floating minimal CTA.
- **Tablet/Desktop (`md` and `lg`):**
  - Layout: Switches to side-by-side. Calculators (`md:grid-cols-2`) place inputs on the left, Chart on the right.
  - Max-width containers (`max-w-7xl`) keep content centered on ultra-wide screens.

---

## 10. Accessibility Guidelines (WCAG AA)
- **Contrast Ratios:** Deep Blue (`#1A3C6E`) against Cloud Gray guarantees a `> 4.5:1` contrast for primary text. Emerald Green buttons will use white text.
- **Focus Management:** Obvious focus rings (`focus:ring-2 focus:ring-teal-bright focus:outline-none`) on all inputs and buttons.
- **Screen Readers:** All icon-only buttons (like social links) require `aria-label`. Chart canvases require `aria-description` providing a text summary of the current gap.

---

## 11. Non-Functional UX/UI Requirements
- **Progressive Loading:** Defer loading `jspdf` and heavy Chart.js modules (`@defer(on viewport)`) until the user scrolls them into view, ensuring an initial LCP < 2.5s.
- **Debounced Analytics:** For the "Wealth Gap Engagement" KPI (FR19), slider interactions are debounced. The UI will not block the main thread to send analytics; events are gathered in an array and flushed during idle time or visibility change.

---

## 12. BMAD Prioritization (Impact vs. Technical Ease)
Collaboration with Winston (Architect) to sequence the UX:

| Feature | UX/Biz Impact | Tech Ease | Priority |
| :--- | :--- | :--- | :--- |
| **Lead Capture & PDF Generation UI** | **Transformational (P0)** | Medium | **1** |
| **Compound & Retirement Simulators** | **Transformational (P0)** | High (Signals) | **2** |
| **Hero & Navigation** | High (P1) | Very High | **3** |
| **Cost of Waiting & Currency Cards** | High (P1) | Medium API | **4** |
| **Fear & Greed / CDP Table / Wishlist** | Medium (P2) | High | **5** |

---

## 13. Storybook Story Inventory
Before integrating into the main app pages, the following isolated stories MUST be created and validated in Storybook:

### 🧩 Atoms (Base Elements)
- **Colors & Typography:** Visual showcase of the 80/15/5 palette and Inter font scale.
- **Buttons (4 variants):** Primary (Emerald), Secondary (Teal), Ghost (Navy), Floating CTA (Emerald with drop shadow).
- **Forms:** `InputText` with validation states, `Checkbox` for GDPR.

### 🧬 Molecules (Composite Controls)
- **Calculators:** `Slider` + synced numeric display (Currency, Percentage).
- **KPI Cards:** Skeleton state, Loaded state, Error offline state.

### 🍱 Organisms (Features)
- **Navbar:** Desktop expanded, Mobile collapsed hamburger.
- **Wealth Gap Chart:** Empty state, Projected state with massive inflation gap.
- **Fear & Greed Index:** PrimeNG `Knob` states (Extreme Fear, Neutral, Greed).
- **Lead Capture Card:** Fresh state, validation errors triggered, disabled loading state (Generating PDF), Success state.
- **Booking Flow Modal:** Container for external calendar + Step 1 inputs.
- **Email Preview:** Responsive layout shell for confirmation emails.
