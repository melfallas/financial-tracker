<!-- ![Financial Tracker](financial-tracker-banner.png) -->

# Financial Tracker: Your Investment Advisor

<!-- [![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://melfallas.github.io/financial-tracker/) -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)

> ## 🚨 **v1 STABLE - NO NEW FEATURES** 🚨
> This is the **stable, production-ready v1 version** of Financial Tracker.
It will receive **critical patches only** - no new features will be added.

---

## 💬 Overview

**Financial Tracker** is a comprehensive web application designed to empower users to take control of their financial future. Built with modern Angular standards, it provides powerful tools for wealth projection, inflation analysis, and retirement planning.

## 📖 Table of Contents

- [Overview](#-overview)
- [Project Status](#-project-status)
- [Key Features](#-key-features)
- [Technical Stack](#-technical-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Project Status

- **Version**: 1.0.0 (Stable)
- **Status**: Production Ready
- **Last Updated**: 2026-03-09
- **Next Update**: TBD

## 🚀 Key Features

- **Wealth Gap Analysis**: Visualize the erosion of your purchasing power due to inflation.
- **Scenario Simulation**: Compare different investment strategies (e.g., "Mattress Effect" vs. Market Returns) side-by-side.
- **Interactive Charts**: Dynamic visualizations powered by Chart.js and ng2-charts.
- **PDF Reporting**: Generate professional, brand-aligned PDF reports of your financial projections.
- **Modern UI**: Clean, responsive design with PrimeNG components and Tailwind CSS.

## 🛠️ Technical Stack

- **Framework**: Angular 21+ (Standalone Components)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 + PrimeNG (via `tailwindcss-primeui` preset)
- **State Management**: Angular Signals
- **Visualization**: Chart.js, ng2-charts
- **Testing**: Vitest (Unit Testing), Playwright (E2E Testing)

## ⚡ Quick Start

### 📋 Prerequisites

- ✅ Node.js 20.x or higher
- ✅ pnpm 10.x or higher

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

### 🏗️ Architecture

- **Standalone Components**: All components are standalone.
- **Signals**: State management uses Angular Signals.
- **Tailwind CSS**: Styling is done with Tailwind CSS.
- **PrimeNG**: UI components are provided by PrimeNG.
- **Chart.js**: Charts are rendered using Chart.js.
- **GitHub Actions**: CI/CD pipelines for automated testing and deployment.
- **GitHub Pages**: Hosting for the application.

## 📂 Project Structure
- `src/app/features`: Contains the standalone components for each feature.
- `src/app/core`: Shared services and core modules.
- `src/assets/docs`: Project documentation and user stories.

Whole project structure documentation: 
- ✅ [Project Folder Structure](docs/ARCHITECTURE.md#4--directory-structure-coresharedfeaturesinfrastructure)

## 📝 Project Documents

### 📂 General Documents

- [Project Knowledge Index](docs/PROJECT_INDEX.md)

### 📋 Release Documents

- [Change Log](docs/CHANGELOG.md)
- [Release Notes](docs/RELEASE_NOTES.md)

### 🎯 Sprint & Planning Documents

- [Backlog](docs/Backlog.md)
- [PO Checklist](docs/PO_Checklist.md)
- [Sprint Report](docs/SprintReport.md)
- [Dependency Analysis](docs/Dependency-Analysis.md)

### 🏗️ Architecture Documents

- [Architecture](docs/ARCHITECTURE.md)
- [Signal Flow](docs/Architecture-Signal-Flow.md)
- [Data Schema](docs/Architecture-Data-Schema.md)
- [Testing Strategy](docs/TESTING_STRATEGY.md)
- [Language Standards](docs/LANGUAGE_STANDARDS.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License.
