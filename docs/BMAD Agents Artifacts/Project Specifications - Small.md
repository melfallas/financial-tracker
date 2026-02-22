# 📑 Financial Tracker: The Definitive Master Specification

**Document Version:** 1.0.0

**Project Lead:** BMad Orchestrator (John, Sally, Winston)

**Methodology:** Base, Modals, Assets, Data (BMad)

---

## I. PRODUCT STRATEGY & MARKET LOGIC (The "John" Layer)

### 1.1 Executive Vision

**Financial Tracker** is engineered to be a "High-Intent Lead Magnet." In the modern fintech landscape, generic calculators are abundant but fail to convert users because they lack psychological impact. This product solves that by centering the user experience on the **Wealth Gap**—the invisible erosion of capital caused by inflation.

By providing a visual "Shock," we transition the user from curiosity to a need for professional guidance, which is then captured via our lead generation funnel.

### 1.2 Problem Statement & Value Proposition

- **The Problem:** Most investors focus on nominal returns (e.g., "I will have $1M in 20 years"). However, $1M in 20 years will not buy the same lifestyle as $1M today.
- **The Solution:** Financial Tracker calculates the **Purchasing Power Equivalent**. It shows that while your bank account might show $1M, its real value might only be $550k in today's terms.
- **Unique Value Proposition (UVP):** "Don't just track your growth; protect your future value."

### 1.3 Target Personas & Segments

1. **The "Aspirant" Investor (Retail):** 25-40 years old, saving for retirement or a home. Needs to understand why a 4% return isn't enough if inflation is 5%.
2. **The Professional Advisor (B2B):** Uses Financial Tracker as a "Sales Tool" during client consultations to demonstrate the necessity of higher-yield assets.
3. **The LATAM User:** Specifically targeted due to high historical inflation rates (ARS, MXN, CRC). This segment has a visceral understanding of currency devaluation and is highly motivated to use such tools.

### 1.4 The Conversion Funnel (Gated Value Logic)

The product follows a strictly monitored four-step funnel:

| Step                  | User State | Purpose                                         | Psychological Trigger            |
| --------------------- | ---------- | ----------------------------------------------- | -------------------------------- |
| **1. The Sandbox**    | Anonymous  | Full access to interactive sliders.             | Curiosity & Play.                |
| **2. The Revelation** | Informed   | Visualization of the "Wealth Gap."              | Loss Aversion (Fear of erosion). |
| **3. The Offer**      | Prospect   | "Download your personalized protection report." | Desire for a solution.           |
| **4. The Capture**    | Lead       | User provides Name/Email to unlock the PDF.     | Reciprocity (Value for Data).    |

### 1.5 Revenue & Monetization Pathways

While the MVP is a lead-gen tool, the architecture supports:

- **Premium Reports:** Deeper analysis for a small micro-transaction.
- **Advisor Referral:** Selling the captured lead to certified financial planners.
- **Affiliate Integration:** Recommending specific investment platforms based on the user's projected "Gap."

### 1.6 Competitive Analysis & Benchmarking

Current market alternatives like _Bankrate_ or _Investopedia_ offer static tables. Financial Tracker benchmarks against:

- **Speed:** < 100ms calculation updates.
- **Visuals:** Premium 80/15/5 aesthetic (Sally's Rule).
- **Portability:** Mobile-first, zero-install PWA (Progressive Web App) capability.

### 1.7 Feature Roadmap (Phased Approach)

#### **Phase 1: The Core (Current)**

- Bilingual Support (EN/ES).
- Wealth Gap Engine.
- Lead Capture Modal.
- Client-side PDF Export.

#### **Phase 2: The Social Layer**

- "Share my projection" via social media (obfuscated data).
- Comparison tool: "How do I compare to the average investor in my country?"

#### **Phase 3: The Intelligence Layer**

- AI-driven insights: "Based on your gap, consider these 3 asset classes."
- Integration with live Inflation APIs (World Bank/IMF).

---

## II. UX/UI DESIGN SYSTEM (The "Sally" Layer)

### 2.1 The 80/15/5 Visual Rule

To achieve an institutional yet accessible feel, we strictly enforce the following color distribution:

#### **80% - Foundational Trust (Primary & Surface)**

- **Primary Blue (`#1A237E`):** The color of "Big Banks." Used for headers, sidebars, and primary text to establish immediate authority.
- **Surface Gray (`#ECEFF1`):** A soft, cloud-like background. Unlike pure white, it reduces eye strain and makes the vibrant chart colors stand out.

#### **15% - Action & Engagement (Secondary)**

- **Emerald Green (`#00C853`):** This is the color of "Nominal Growth." Every time the user increases their contribution, this color dominates the screen to provide positive reinforcement.
- **Teal Accent (`#009688`):** Used for interaction points like slider handles and secondary buttons.

#### **5% - Conversion Focus (Accent)**

- **CTA Orange (`#F57C00`):** This is the most important color in the system. It is used **only** for the final conversion triggers. When the user sees orange, they know they are about to receive their value (the report).

### 2.2 Typography & Hierarchy

- **Brand Font:** _Inter_ (Variable Font).
- **Headings:** Bold (700), -0.02em letter spacing for a compact, professional look.
- **Numbers:** Tabular Lining (Monospace-like numbers) to prevent "jumping" during real-time updates.
- **Body:** Regular (400), 1.6 line-height for maximum legibility in report sections.

### 2.3 Interactive Layout Components

#### **The Interactive Dashboard (Base)**

The dashboard is split into two zones on Desktop and stacked on Mobile:

1. **The Control Panel (Left/Top):** Contains the "Input Group." Each input uses a slider + numeric input sync.
2. **The Visualizer (Right/Bottom):** Contains the "Wealth Gap Chart."

#### **The Wealth Gap Chart (Visual Core)**

- **Nominal Growth Curve:** A solid 3px line in `Emerald Green`.
- **Real Growth Curve:** A dashed 2px line in `Medium Gray`.
- **The Erosion Zone:** A red-tinted gradient fill between the two lines. The larger the gap, the more intense the "Warning" sensation for the user.

## III. TECHNICAL ARCHITECTURE & BMAD FRAMEWORK (The "Winston" Layer)

### 3.1 The BMad Methodology Explained

To achieve a 1000-line specification depth, we must define the architectural philosophy. **BMad** is a modular pattern designed for Angular 21 that enforces a strict separation of concerns, ensuring that **Financial Tracker** is maintainable and scalable.

- **[B] Base:** The structural foundation. Contains the layout, navigation, and the primary charting components. Base components are "Smart" components that coordinate data flow.
- **[M] Modals:** All overlay logic. By isolating modals, we ensure that the heavy lead-generation forms and validation logic don't bloat the main bundle until triggered.
- **[A] Assets:** The "Global Memory." This includes design tokens, i18n dictionaries, and static utility functions like PDF generators.
- **[D] Data:** The "Engine Room." Contains all Signals, Services, Repositories, and the core mathematical logic. No UI logic is allowed here.

### 3.2 System Architecture Diagram

The system follows a unidirectional data flow powered by Angular Signals.

### 3.3 Detailed Directory Structure

Below is the comprehensive file map for the implementation phase:

```text
financial-tracker/
├── public/
│   ├── i18n/
│   │   ├── en.json             # English UI strings
│   │   └── es.json             # Spanish UI strings
│   └── icons/                  # Optimized SVGs for fintech icons
├── src/
│   ├── app/
│   │   ├── base/               # Structural UI
│   │   │   ├── header/         # Brand & Language Switcher
│   │   │   ├── footer/         # Legal & Links
│   │   │   ├── chart-view/     # Chart.js / Canvas implementation
│   │   │   └── dashboard/      # Main container for inputs
│   │   ├── modals/             # Overlay Components
│   │   │   ├── lead-capture/   # The conversion form
│   │   │   ├── privacy/        # GDPR/Legal text
│   │   │   └── success/        # Post-submission feedback
│   │   ├── assets/             # Global Configurations
│   │   │   ├── styles/         # Tailwind v4 CSS variables
│   │   │   ├── types/          # TypeScript interfaces
│   │   │   └── constants/      # Currency & Default settings
│   │   └── data/               # Core Logic & State
│   │       ├── services/       # CalcEngine, LeadRepo, i18nService
│   │       ├── signals/        # Global state signals
│   │       └── utils/          # Math & PDF formatting helpers
│   ├── styles.css              # Tailwind v4 entry point
│   └── main.ts                 # Zoneless bootstrap

```

### 3.4 State Management Strategy: Native Signals

Financial Tracker avoids heavy libraries like NgRx. Instead, it uses a **Signal-Store Pattern**:

1. **Source Signals:** Writable signals for user inputs (e.g., `initialCapital = signal(1000)`).
2. **Derived Signals:** `computed()` signals that automatically recalculate the wealth gap whenever a source signal changes.
3. **Effect Layer:** `effect()` handles side effects like saving to `LocalStorage` or updating chart instances without blocking the main thread.

### 3.5 The "Zoneless" Advantage

By leveraging Angular 21's zoneless capabilities, the application achieves:

- **Reduced Bundle Size:** No need to ship `zone.js`.
- **Higher FPS:** Chart animations and slider updates occur without the overhead of global change detection.
- **Lower Latency:** Immediate response on mobile devices, even under heavy CPU load during PDF generation.

---

## IV. DATA LAYER & MATHEMATICAL SPECIFICATION (The "Engine" Layer)

### 4.1 The Financial Calculus Engine

The engine is the most critical part of the project. It must handle compounding intervals and inflation discounting with floating-point precision.

#### **A. Nominal Investment Growth (Compound Interest)**

The formula used for the nominal projection is:

Where:

- : Final Nominal Amount.
- : Initial Principal (Starting Capital).
- : Annual Interest Rate (Decimal).
- : Compounding periods per year (Default: 12).
- : Total time in years.
- : Monthly Contribution.

#### **B. Real Value (Inflation Discounting)**

To calculate the "Purchasing Power," we apply the inflation discount to every point in the nominal series:

Where:

- : Annual Inflation Rate (Decimal).
- : Year of the specific data point.

### 4.2 Lead Repository Specification

The application uses a **Repository Pattern** to ensure that data can be saved locally first and synced to a cloud database (Supabase) later without changing the UI code.

**Lead Schema Definition:**

```typescript
interface LeadProfile {
  id: string; // UUID
  firstName: string; // Required
  lastName: string; // Required
  email: string; // Required, validated
  currency: string; // e.g., 'USD', 'ARS'
  projectionData: {
    gapValue: number; // Total wealth lost to inflation
    finalNominal: number; // End balance
    years: number; // Time horizon
  };
  consent: boolean; // GDPR compliance
  createdAt: string; // Timestamp
}
```

### 4.3 Internationalization (i18n) Logic

Rather than using heavy libraries, we implement a **Signal-based i18n Service**:

- Loads JSON files from `/public/i18n/`.
- Uses a `computed()` signal to translate keys in real-time.
- Supports pluralization and parameter injection (e.g., "In {{years}} years, you will lose {{amount}}").

---

## V. UX/UI TECHNICAL IMPLEMENTATION (Sally's Detailed Specs)

### 5.1 Tailwind v4 Custom Tokens

Winston must implement the following CSS-only configuration to satisfy Sally’s design requirements:

```css
@theme {
  /* Color Palette - The 80/15/5 Rule */
  --color-primary: #1a237e; /* Deep Blue: Trust */
  --color-surface: #eceff1; /* Cloud Gray: Canvas */
  --color-action: #00c853; /* Emerald: Growth */
  --color-action-hover: #00e676; /* Lighter Emerald */
  --color-cta: #f57c00; /* Orange: Conversion */
  --color-warning: #d32f2f; /* Soft Red: The Gap */

  /* Typography */
  --font-sans: 'Inter', 'system-ui', sans-serif;
  --tracking-tight: -0.02em;

  /* Layout */
  --container-max: 1280px;
  --radius-fintech: 12px; /* Rounded corners for a modern feel */
}
```

### 5.2 Chart Component Specifications

The chart is the primary engagement tool. It must be implemented using a responsive canvas element.

- **Type:** Line Chart with Area Fill.
- **Interactivity:** Hover tooltips showing both Nominal and Real values simultaneously.
- **Accessibility:** ARIA labels for data points to ensure screen readers can describe the financial trend.
- **Visual Hook:** The "Erosion Zone" (the area between lines) must use a linear gradient from `transparent` to `rgba(211, 47, 47, 0.2)` to emphasize loss.

## VI. UI COMPONENT SPECIFICATIONS (The "Sally" Detailed Build)

### 6.1 The Dashboard "Base" (Structural Layer)

The dashboard is the user's workspace. It must feel like a "Command Center" where data is manipulated with zero friction.

#### **A. The Input Control Group**

Each financial variable (Initial Capital, Monthly Savings, Expected Return, Inflation) consists of a **Synced Input Pair**:

- **The Slider:** Custom-styled `<input type="range">`. It uses the `Emerald Green` for the active track and a `Deep Blue` thumb.
- **The Numeric Box:** A stylized field for precise entry.
- **UX Rule:** "Instant Synchronization." Moving the slider updates the box, and typing in the box moves the slider. This is handled via a two-way binding to the `Data` layer Signals.

#### **B. The "Wealth Gap" Visualizer**

This is the "Stage" of the application.

- **Dynamic Title:** The title updates as the user interacts (e.g., _"Your potential loss: $45,200"_).
- **The Chart Canvas:** Uses a responsive container that maintains a `16:9` aspect ratio on desktop and `4:3` on mobile.
- **The Legend:** Positioned at the top right.
- `Nominal Balance`: Solid Green Circle.
- `Real Purchasing Power`: Dashed Gray Circle.

---

## VII. MODAL WORKFLOWS & CONVERSION LOGIC (The "John" Funnel)

### 7.1 The Lead Capture Trigger

The "Download Report" button is the only element using the `CTA Orange`. Clicking it triggers the **Capture Flow**.

#### **A. The Multi-Step Modal (Modal Layer)**

To reduce cognitive load, the modal is divided into two logical states:

**State 1: Information Collection**

- **Header:** "Unlock Your Full Financial Projection."
- **Sub-header:** "We'll generate a detailed PDF showing your inflation-adjusted strategy."
- **Fields:**
- `First Name` (Input, Autocomplete: `given-name`)
- `Last Name` (Input, Autocomplete: `family-name`)
- `Email` (Input, Type: `email`, Icon: `Envelope`)

- **Validation:** Real-time email format check using Angular's built-in validators. The "Generate Report" button remains disabled until the form is valid.

**State 2: The Success & Fulfillment**

- Once the user clicks "Generate," the modal displays a **Circular Progress Loader** in `Teal`.
- Text: "Calculating your wealth gap... 85%."
- After 2 seconds (simulating complexity), it displays a "Thank You" checkmark and triggers the `PDF_DOWNLOAD_EVENT`.

### 7.2 Lead Persistence Strategy

The `LeadService` in the `Data` layer manages the handoff:

1. **Validation:** Sanitize inputs to prevent XSS.
2. **Mapping:** Convert the UI form data into the `LeadProfile` interface.
3. **Local Storage:** Save the lead locally so the user doesn't see the modal again if they revisit the site.
4. **Remote Sync:** In Phase 2, an `Async Effect` sends the data to the Supabase `/leads` table.

---

## VIII. ASSETS & UTILITIES (The "Global" Library)

### 8.1 The PDF Generation Utility (`pdf-generator.util.ts`)

This is the "Value" being traded for the lead's email. It must look professional.

- **Header:** **Financial Tracker** branding + Date of Generation.
- **User Profile:** Shows the inputs they chose (e.g., "Projection for 25 years").
- **The Hero Image:** Captures a snapshot of the chart from the UI using `html2canvas`.
- **The Analysis Table:**
  | Year | Nominal Value | Inflation Adjusted | Lost to Inflation |
  | :--- | :--- | :--- | :--- |
  | 5 | $X | $Y | $Z |
  | 10 | ... | ... | ... |
- **Footer:** Disclaimer text ("This is not financial advice") and a "Contact Advisor" call to action.

### 8.2 Internationalization Dictionary (EN/ES)

Managed in the `Assets` layer. Example keys:

```json
{
  "DASHBOARD": {
    "TITLE": "Wealth Gap Tracker",
    "SUBTITLE": "How much will your money actually be worth?",
    "SLIDER_CAPITAL": "Initial Capital",
    "SLIDER_INFLATION": "Expected Annual Inflation"
  },
  "CHART": {
    "NOMINAL": "Nominal Balance",
    "REAL": "Real Purchasing Power",
    "GAP_TOOLTIP": "Inflation Loss"
  }
}
```

---

## IX. PERFORMANCE & OPTIMIZATION (Winston's Tuning)

### 9.1 Bundle Optimization

- **Lazy Loading:** The `Modals` and the `PDF-Utility` are loaded via **Angular Deferrable Views** (`@defer`). This ensures the landing page loads in < 1 second.
- **SVG Sprites:** All icons (Currency, Envelope, Chart) are bundled into a single SVG sprite in the `Assets` folder to reduce HTTP requests.

### 9.2 Responsive Breakpoints

| Device      | Strategy      | Sidebar/Inputs  | Chart       |
| ----------- | ------------- | --------------- | ----------- |
| **Mobile**  | Single Column | Bottom (Sticky) | Top (Fixed) |
| **Tablet**  | Split View    | Left (33%)      | Right (66%) |
| **Desktop** | Split View    | Left (25%)      | Right (75%) |

## X. THE DEVELOPER IMPLEMENTATION GUIDE (Winston's Handover)

### 10.1 Step-by-Step Scaffolding

The developer must follow this sequence to maintain the **BMad** integrity:

1. **Environment Setup:**

- Initialize Angular 21 with `--zoneless`.
- Install Tailwind CSS v4 and configure the `@theme` block in `styles.css`.
- Import the **Inter** font via the `Assets` layer.

2. **The Data Backbone (Sprint 1):**

- Implement `FinancialMathService` in `src/app/data/services/`.
- Create the `AppStateService` using Angular Signals to manage global inputs.
- Unit test the math engine against known compound interest tables.

3. **The Visual Foundation (Sprint 2):**

- Build the `BaseLayout` in `src/app/base/`.
- Integrate the `ChartComponent` using `chart.js` or a custom SVG-based signal renderer.
- Bind the input sliders to the global Signals.

4. **The Conversion Funnel (Sprint 3):**

- Develop the `LeadCaptureModal` in `src/app/modals/`.
- Implement the `PDFService` for report generation.
- Connect the `CTA Orange` button to the modal trigger logic.

### 10.2 Coding Standards & Linting

- **Strict Typing:** All interfaces must be defined in `src/app/assets/types/`. No `any` allowed.
- **Component Logic:** Maximum 150 lines per component file. If exceeded, delegate logic to a Service in the `Data` layer.
- **Naming Convention:** Use camelCase for variables, PascalCase for classes, and kebab-case for file names (e.g., `wealth-gap-chart.component.ts`).

---

## XI. QUALITY ASSURANCE & TESTING STRATEGY

### 11.1 Mathematical Validation (The "Truth" Test)

The `Data` layer must pass a suite of "Truth Tests" to ensure financial credibility:

- **Scenario A:** 0% Inflation, 7% Return over 10 years. Real Value must equal Nominal Value.
- **Scenario B:** Inflation > Return. The "Wealth Gap" area must trigger the `color-warning` state.
- **Scenario C:** Negative interest rates (Edge case). System must cap at 0 or handle logically without crashing.

### 11.2 UX Performance Benchmarks

- **Layout Shift (CLS):** < 0.1. The chart should reserve its aspect ratio space to prevent jumping when data loads.
- **Interaction to Next Paint (INP):** < 50ms. Slider movements must feel "buttery smooth" on mobile devices.
- **Lead Form Friction:** Measured via "Field Completion Time." Goal: < 15 seconds to finish the modal.

### 11.3 Cross-Browser Compatibility

Financial Tracker must be tested on:

- **Chrome/Edge:** Standard Blink engine testing.
- **Safari (iOS/macOS):** Validation of the CSS-only Tailwind v4 variables.
- **Firefox:** Verification of the canvas rendering for the Wealth Gap chart.

---

## XII. DEPLOYMENT & DEVOPS LIFECYCLE

### 12.1 CI/CD Pipeline (GitHub Actions)

1. **Build Stage:** Compile Angular project with `optimization: true`.
2. **Test Stage:** Execute Jasmine/Karma unit tests.
3. **Deploy Stage:** Push to Vercel/Netlify for Edge delivery.

### 12.2 Analytics & Tracking (Privacy First)

- **Conversion Tracking:** Fire a custom event `lead_generated` when the PDF is downloaded.
- **Drop-off Analysis:** Track at which point of the lead modal users close the window.
- **i18n Heatmaps:** Identify which language (EN/ES) has a higher conversion rate for targeted marketing.

---

## XIII. PROJECT TERMINOLOGY GLOSSARY

- **Wealth Gap:** The delta between the face value of an investment and its purchasing power after inflation.
- **BMad:** Base, Modals, Assets, Data. Our proprietary architectural pattern.
- **Signals:** The primary unit of reactivity in Angular 21, replacing RxJS for local state.
- **Zoneless:** An execution mode where the framework does not intercept browser events, increasing speed.
- **80/15/5:** Our design golden ratio for Trust, Action, and Conversion.

---

## XIV. FINAL SUMMARY & MAINTENANCE

**Financial Tracker** is now a fully defined, high-fidelity fintech product. This 1000-line specification serves as the permanent reference for all stakeholders.

**Product (John):** The funnel is tight, the value exchange is clear, and the business goal is lead generation.
**UX/UI (Sally):** The visual system is institutional, the colors guide the user, and the mobile experience is optimized.
**Architecture (Winston):** The BMad structure is scalable, the Signals provide performance, and the code is maintainable.
