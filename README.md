<!-- ![Financial Tracker](financial-tracker-banner.png) -->

# Financial Tracker: Your Investment Advisor

<!-- [![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://melfallas.github.io/financial-tracker/) -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)

> ## 🚨 **v1 STABLE - NO NEW FEATURES** 🚨
> This is the **stable, production-ready v1 version** of Financial Tracker.
It will receive **critical patches only** - no new features will be added.

---

## 💬 Overview

**Financial Tracker** is a comprehensive web application designed to empower users to take control of their financial future. Built with modern Angular standards following the **Spec-Driven Development (SDD) + TDD** methodology, it provides powerful tools for wealth projection, inflation analysis, and retirement planning. The entire UI is a **single-page narrative scroll**, guiding the user from diagnosis to conversion.

## 📖 Table of Contents

- [Overview](#-overview)
- [Project Status](#-project-status)
- [Key Features](#-key-features)
- [Technical Stack](#-technical-stack)
- [Architecture Overview](#-architecture-overview)
- [Quick Start](#-quick-start)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Project Documents](#-project-documents)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Project Status

- **Version**: 1.0.0 (Stable)
- **Status**: Production Ready — MVP#1 Complete (Sprint 4 ✅)
- **Last Updated**: 2026-03-09
- **Next Sprint (MVP#2)**: 🧊 Frozen — Post-MVP#1 Launch

### Sprint Progress Summary

| Sprint   | Stories Completed | Status         | Notes                              |
|----------|-------------------|----------------|------------------------------------|
| Sprint 1 | 5/5               | ✅ DONE         | Foundations, design tokens, math engine |
| Sprint 2 | 4/4               | ✅ DONE         | Core simulators, Chart.js          |
| Sprint 3 | 4/7               | ✅ PARTIAL      | Full funnel; US5.x deferred        |
| Sprint 4 | 11/11             | ✅ COMPLETE     | MVP#1 features & bug fixes         |
| Sprint 5 | 0 (Frozen)        | 🧊 MVP#2       | Post-launch backlog                |

## 🚀 Key Features

- **Wealth Gap Analysis**: Visualize the erosion of your purchasing power due to inflation using a dual-line Chart.js compound interest chart.
- **Retirement Simulator**: A 3-step stepper that calculates the user's "Freedom Date" and Nest Egg target with a themed Threat/Hope narrative.
- **Cost of Waiting Banner**: Urgency micro-hook that quantifies the real daily cost of keeping savings idle.
- **Lead Capture Funnel**: In-place conversion form that triggers PDF generation and email delivery.
- **PDF Report Generation**: Professional, brand-aligned PDF reports generated client-side via `jsPDF` + `jspdf-autotable`, including chart snapshots and a booking QR code.
- **Email Delivery**: Automated email dispatch via Supabase Edge Function (Resend internally), with a 5-second timeout fallback for local PDF download.
- **Review Call Section**: A dedicated scheduling section with a direct Calendly link (MVP#1 booking replacement).
- **Modern UI**: Responsive design with PrimeNG components and Tailwind CSS v4 using the **80/15/5 Design Rule**.
- **Multi-Language**: Bilingual support (ES/EN) via Angular signals and `LanguageService`.
- **QA Hook**: `window.ftDownloadReport()` available in dev mode to test PDF generation without the full funnel.

## 🛠️ Technical Stack

- **Framework**: Angular 21+ (Standalone Components, Zoneless)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4 + PrimeNG (via `tailwindcss-primeui` preset)
- **State Management**: Angular Signals (`signal()`, `computed()`, `effect()`)
- **Visualization**: Chart.js + ng2-charts
- **PDF Generation**: jsPDF + jspdf-autotable (lazy-loaded via `@defer`)
- **Email Service**: Supabase Edge Function (delegates to Resend)
- **Environment Variables**: `@ngx-env/builder` + `import.meta.env.NG_APP_*`
- **Testing**: Vitest (Unit Testing) + @testing-library/angular, Playwright (E2E)
- **Persistence**: LocalStorage (Leads, Preferences, API Cache) + IndexedDB (Interaction Logs)

## 🏛️ Architecture Overview

Financial Tracker follows **Spec-Driven Development (SDD) + TDD** (Red→Green→Refactor).

### Design System (80/15/5 Rule)

| Role | Color | Token | Preview | Usage |
|------|-------|-------|-------|-------|
| 80% Trust | Deep Blue | `#1A3C6E`| <div style="width:40px;height:20px;background-color:#1A3C6E;margin:0 auto;"></div> | Headers, brand identity, primary text |
| 80% Trust | Cloud Gray | `#ECEFF1` | <div style="width:40px;height:20px;background-color:#ECEFF1;margin:0 auto; border:1px solid #ccc;"></div> | Surfaces, section backgrounds |
| 15% Action | Charcoal | `#37474F` | <div style="width:40px;height:20px;background-color:#37474F;margin:0 auto;"></div> | Body     text, paragraphs |
| 15% Action | Teal Bright | `#009688` | <div style="width:40px;height:20px;background-color:#009688;margin:0 auto;"></div> | Icons, slider progress |
| 5% Conversion | Emerald Green | `#00C853` | <div style="width:40px;height:20px;background-color:#00C853;margin:0 auto;"></div> | **All CTAs** — strictly conversion only |
| Alert | Soft Red | `#D32F2F` | <div style="width:40px;height:20px;background-color:#D32F2F;margin:0 auto;"></div> | Error states, inflation risk indicators |

### Signal Architecture (Cross-Component Shared State)

The `home-page.ts` acts as the **page-level Signal owner** for all shared simulator state:

```text
home-page.ts (Owner)
├── initialCapital        → WealthGapChart, CostOfWaiting
├── monthlyContribution   → WealthGapChart, RetirementSimulator
├── expectedReturn        → WealthGapChart, RetirementSimulator
├── inflationRate         → WealthGapChart, RetirementSimulator, CostOfWaiting
└── timeHorizon           → WealthGapChart
```

### Engineering Rules (Non-Negotiable)
1. **TDD Mandatory** — All features start with a failing `.spec.ts` test.
2. **Standalone Only** — No NgModules. `standalone: true` is NOT set explicitly (Angular 21+ default).
3. **Signals for Local State** — RxJS is reserved for HTTP/async streams only.
4. **No NgModules** — Use `inject()`, `input()`, `output()` functions exclusively.
5. **Bundle Target** — LCP < 2.5s. Initial JS < 150KB gzipped. Heavy libs via `@defer`.
6. **Language** — Source code & comments 100% in English. UI text in ES/EN.

### Deferred Loading Strategy

| Component | Strategy | Trigger |
|-----------|----------|---------|
| Hero + Navbar | Eager | Immediate |
| WealthGapChart, RetirementSim, CostOfWaiting, Footer | `@defer (on viewport)` | Scroll into view |
| Booking Modal | `@defer (on interaction)` | CTA click |
| `jspdf` + `jspdf-autotable` | `@defer (on interaction)` | PDF generation |

### External APIs (Free Tier)

| API | Service | Auth |
|-----|---------|------|
| ExchangeRate-API | Currency Exchange (1hr TTL) | `NG_APP_`key |
| Alternative.me | Crypto Fear & Greed (unlimited) | None |
| CoinGecko | Bitcoin Price (15min TTL) | None |
| Finnhub | S&P 500, Nasdaq (15min TTL) | `NG_APP_` key |
| FreeGoldAPI | Gold Price (1hr TTL) | None |

## ⚡ Quick Start

### 📋 Prerequisites

- ✅ Node.js 20.x or higher
- ✅ pnpm 10.x or higher
- ✅ Angular 21.x or higher

### 📥 Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:melfallas/financial-tracker.git
   cd financial-tracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables — create a `.env` file at the root:
   ```bash
   NG_APP_EMAIL_SENDING_FUNCTION_URL=https://your-supabase-url/functions/v1/send-email
   NG_APP_EMAIL_SENDING_FUNCTION_KEY=your-supabase-anon-key
   NG_APP_CALENDLY_BASE_URL=https://calendly.com/your-account/30min
   NG_APP_STAGE=development
   ```

## 🏁 Getting Started

### 💻 Development

Start the development server:

```bash
pnpm start
```

Build the application:

```bash
pnpm build
```

### 🧪 Testing

Run unit tests:

```bash
pnpm test
```

Run e2e tests:

```bash
pnpm test:e2e
```

### 🔧 QA Testing Hook

For QA verification of the PDF generation without the full lead form funnel, open the browser console on `localhost:4200` and call:

```javascript
window.ftDownloadReport()
```

This hook is only active in non-production environments (per US2.2 AC).

### 🏗️ Architecture

- **Standalone Components**: All components are standalone.
- **Signals**: State management uses Angular Signals.
- **Tailwind CSS v4**: Styling with design tokens.
- **PrimeNG**: UI components styled via `tailwindcss-primeui`.
- **Chart.js**: Charts rendered using ng2-charts wrapper.
- **GitHub Actions**: CI/CD for automated testing and deployment.
- **GitHub Pages**: Hosting for the application.

## 📂 Project Structure
- `src/app/core/`: Singleton services, interfaces, tokens, constants.
  - `services/`: `pdf-report.service.ts`, `email.service.ts`, `language.service.ts`, `simulator-config.service.ts`, etc.
  - `constants/`: `booking.ts` (centralized Calendly URL), more.
  - `interfaces/`: `i-email-provider.ts`, `i-lead-repository.ts`.
- `src/app/features/`: Feature organisms (standalone components).
  - `home/`, `hero/`, `navbar/`, `footer/`, `wealth-gap-chart/`, `retirement-simulator/`, `cost-of-waiting/`, `lead-form/`, `review-call/`.
- `src/app/shared/`: Global reusable types, utils, and components.
  - `utils/finance-math.ts` — Pure financial math engine (100% test coverage).
  - `types/index.ts` — `Lead`, `EmailStatus`, `ProjectionEntry`, etc.
- `src/app/infrastructure/`: Repository pattern implementations (LocalStorage/IndexedDB).
- `public/assets/config/`: `simulator-defaults.json` — Runtime config for simulators (initial capital, inflation, return rates, etc.).

Whole project structure documentation:
- ✅ [Project Folder Structure](docs/Architecture.md#4--directory-structure-coresharedfeaturesinfrastructure)

## 📝 Project Documents

### 📂 General Documents

- [Project Knowledge Index](docs/PROJECT_INDEX.md)

### 📋 Release Documents

- [Change Log](docs/CHANGELOG.md)
- [Release Notes](docs/RELEASE_NOTES.md)

###  Design Documents
- [PRD](docs/PRD.md)
- [User Flow](docs/BMAD%20Agents%20Artifacts/User%20Flow.md)
- [System Context](docs/BMAD%20Agents%20Artifacts/System%20Context.md)
- [Technical File Dictionary](docs/BMAD%20Agents%20Artifacts/Technical%20File%20Dictionary.md)
- [Project Specifications](docs/BMAD%20Agents%20Artifacts/Project%20Specifications%20-%20Medium.md)


###  UX/UI Documents
- [UX/UI Knowledge Base](docs/BMAD%20Agents%20Artifacts/UX.md)
- [Design Guidelines](docs/Product%20Design/Design%20Docs/EN/01.%20UI%20Design%20Guidelines.md)
- [Color Pallete](docs/Product%20Design/Design%20Docs/EN/02.%20Color%20Pallete.md)
- [Frontend Specification](docs/Product%20Design/Frontend%20Specification.md)
- [Atoms & Molecules](docs/Product%20Design/Atoms-and-Molecules.md)
- [Organisms — Wealth Gap Chart](docs/Product%20Design/Organisms-Wealth-Gap-Chart.md)
- [Organisms — Retirement Simulator](docs/Product%20Design/Organisms-Retirement-Simulator.md)
- [Organisms — PDF Report](docs/Product%20Design/Organisms-PDF-Report.md)
- [Organisms — Lead Capture Flow](docs/Product%20Design/Organisms-Lead-Capture-Flow.md)
- [Organisms — Email Confirmation](docs/Product%20Design/Organisms-Email-Confirmation.md)
- [Organisms — Footer](docs/Product%20Design/Organisms-Footer.md)
- [Organisms — Booking Screen](docs/Product%20Design/Organisms-Booking-Screen.md)

### 🏗️ Architecture Documents

- [Architecture](docs/Architecture.md)
- [Signal Flow](docs/Architecture-Signal-Flow.md)
- [Data Schema](docs/Architecture-Data-Schema.md)
- [Testing Strategy](docs/TESTING_STRATEGY.md)
- [Language Standards](docs/LANGUAGE_STANDARDS.md)

### 🎯 Sprint & Planning Documents

- [Backlog](docs/Backlog.md)
- [PO Checklist](docs/PO_Checklist.md)
- [Sprint Report](docs/SprintReport.md)
- [Dependency Analysis](docs/Dependency-Analysis.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License.
