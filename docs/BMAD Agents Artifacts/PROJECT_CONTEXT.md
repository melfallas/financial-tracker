# Continuity Mega-Prompt

As **Winston (Architect)** (🏗️), I have synthesized our entire architectural journey into a single, high-density **Continuity Mega-Prompt**.

This prompt is designed to be pasted into any AI assistant or given to a lead developer to instantly re-establish the project's "brain," including its constraints, design language, and technical stack.

---

## 🚀 The Fin-Tracker Global MVP: Continuity Mega-Prompt

**Instructions for the AI/Developer:**
"Act as a Senior Full-Stack Architect. You are taking over the development of the **Fin-Tracker Global MVP**. Below is the encapsulated project context. Adhere to these rules strictly."

### 1. Project Essence & Tech Stack

- **Goal:** A high-conversion lead magnet that calculates Compound Interest adjusted for local inflation (The "Wealth Gap").
- **Frontend:** Angular 21+ using **Signals** for state management (No Zone.js, No NgRx).
- **Styling:** **Tailwind CSS v4** using the 80/15/5 color rule.
- **Architecture:** **BMAD** (Base, Modals, Assets, Data) with flat naming (No `.component` suffixes).
- **Backend (Phase 2):** Supabase (PostgreSQL + Auth).
- **Communication:** Resend/SendGrid for automated PDF delivery.

### 2. The "Sally" Design System (80/15/5)

- **Primary (80%):** `--color-deep-blue: #1A3C6E`, `--color-cloud-gray: #ECEFF1`.
- **Accent (15%):** `--color-emerald-green: #00C853` (Success), `--color-teal-bright: #009688` (UI Interactive).
- **CTA (5%):** `--color-emerald-green: #00C853` (All conversion actions and CTAs). Orange (`#F57C00`) for subtle alert indicators only.
- **UX Principles:** Mobile-First, Skeleton Loaders for all data fetching, and high-contrast "Wealth Gap" charts.

### 3. Core Logic & Constraints

- **Wealth Gap Formula:** `RealValue = NominalBalance / (1 + InflationRate)^Years`.
- **Currency/i18n:** System supports USD, EUR, and LATAM (ARS, MXN, CRC, etc.). Multi-language (English/Spanish) is toggled via Signals.
- **Repository Pattern:** Use `ILeadRepository` interface to decouple UI from storage (switchable between `LocalStorage` and `Supabase`).
- **Coding Language:** **All code, comments, and technical docs must be in English.** User-facing UI is bilingual.

### 4. File Tree Snapshot

```text
src/app/
  core/services/      # (currency, translation, supabase)
  infrastructure/     # (local-storage.repo, email.service)
  shared/utils/       # (finance-math.ts -> pure functions)
  features/           # (lead-form, compound-interest, inflation-dashboard)

```

### 5. Current Task Status

- **Completed:** Architectural Design, Design System, Math Engine, i18n Dictionary.
- **Next Step:** Implementation of the `MainLayout` assembling the `Navbar`, `Hero`, and `InvestmentChart`.

---

### 📦 How to use this:

1. **Save this text** in a `.txt` or `.md` file named `PROJECT_CONTEXT.md`.
2. **Start a new session:** Paste the text above and say: _"I am ready to start coding. Based on the context provided, generate the `styles.css` using Tailwind v4 variables."_
3. **Handoff:** If you hire a developer, give them this prompt to ensure they don't break the **80/15/5 rule** or the **Signal-based reactivity**.
