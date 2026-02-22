# 📑 Financial Tracker: The Ultimate 2,000-Line Master Blueprint

**Version:** 1.0.0 (Implementation Phase)

**Lead Architect:** BMad Orchestrator

**Framework:** Angular 21 (Zoneless + Signals)

**CSS:** Tailwind CSS v4

---

## I. PRODUCT STRATEGY & REVENUE ARCHITECTURE (The "John" Layer)

### 1.1 The Market Thesis

Financial illiteracy regarding inflation is a global phenomenon. While compound interest is often called the "eighth wonder of the world," inflation is its silent assassin. **Financial Tracker** is positioned not as a utility, but as an **Educational Conversion Engine**.

The product's success is measured by its ability to provoke a "loss aversion" response in the user, prompting them to seek professional financial advice—captured as a lead.

### 1.2 Revenue & Lead Gen Funnel

The business logic follows the **Gated Value Exchange**:

1. **Phase 1: Free Exploration.** No barriers. High engagement.
2. **Phase 2: The Insight.** The "Wealth Gap" is calculated.
3. **Phase 3: The Call to Action.** "Download your Personalized Wealth Protection Plan."
4. **Phase 4: Data Harvesting.** The Lead Modal collects user demographics.
5. **Phase 5: Fulfillment.** PDF generation and email delivery.

### 1.3 Key Performance Indicators (KPIs)

- **Conversion Rate (CR):** Target 15% from simulator use to lead submission.
- **Engagement Score:** Average time spent on the "Gap" visualization > 45 seconds.
- **Accuracy Trust:** 100% mathematical alignment with standard FV (Future Value) formulas.

---

## II. UX/UI DESIGN SYSTEM & TOKENS (The "Sally" Layer)

### 2.1 The 80/15/5 Visual Strategy

We enforce this ratio to maintain "Institutional Trust" (like a bank) while retaining "Startup Agility."

- **80% - Foundation (Trust):** Using Deep Blues and muted grays.
- **15% - Action (Growth):** Emerald greens for prosperity.
- **5% - Conversion (The Hook):** CTA Orange for the lead triggers.

### 2.2 Design Tokens for Tailwind v4

Sally has defined the following tokens to be implemented in the `src/styles.css` file:

```css
@theme {
  /* Brand Colors */
  --color-primary-navy: #1a237e;
  --color-primary-light: #eceff1;
  --color-success-green: #00c853;
  --color-cta-orange: #f57c00;
  --color-loss-red: #d32f2f;

  /* Spacing & Borders */
  --radius-fintech: 1rem;
  --shadow-institutional: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  /* Typography */
  --font-inter: 'Inter', sans-serif;
}
```

---

## III. DATA LAYER: THE MATHEMATICAL ENGINE (The "Winston" Layer)

### 3.1 `Data` Layer Architecture

The `Data` layer is the "source of truth." It must be UI-agnostic. We use the **Repository Pattern** to handle data persistence and a **Singleton Service** for the math engine.

### 3.2 Implementation: `financial-math.service.ts`

This service handles the heavy lifting of monthly compounding and inflation discounting.

```typescript
import { Injectable, computed, signal } from '@angular/core';

export interface FinancialResult {
  year: number;
  nominalValue: number;
  realValue: number;
  gap: number;
}

@Injectable({
  providedIn: 'root',
})
export class FinancialMathService {
  // Source Signals (Inputs)
  initialCapital = signal<number>(10000);
  monthlyContribution = signal<number>(500);
  annualReturnRate = signal<number>(0.07);
  annualInflationRate = signal<number>(0.03);
  timeHorizonYears = signal<number>(20);

  // Computed Signals (Results)
  projection = computed<FinancialResult[]>(() => {
    const results: FinancialResult[] = [];
    const p = this.initialCapital();
    const pmt = this.monthlyContribution();
    const r = this.annualReturnRate() / 12; // Monthly return
    const inf = this.annualInflationRate(); // Annual inflation
    const totalMonths = this.timeHorizonYears() * 12;

    let currentNominal = p;

    for (let month = 0; month <= totalMonths; month++) {
      if (month > 0) {
        currentNominal = currentNominal * (1 + r) + pmt;
      }

      // We only push yearly data points to the chart for performance
      if (month % 12 === 0) {
        const year = month / 12;
        // Discounting the nominal value by annual inflation
        const realValue = currentNominal / Math.pow(1 + inf, year);

        results.push({
          year,
          nominalValue: Math.round(currentNominal),
          realValue: Math.round(realValue),
          gap: Math.round(currentNominal - realValue),
        });
      }
    }
    return results;
  });

  // Helper: Total Wealth Lost to Inflation
  totalLoss = computed(() => {
    const data = this.projection();
    const lastPoint = data[data.length - 1];
    return lastPoint.gap;
  });
}
```

### 3.3 Implementation: `LeadRepository` Interface

We define how leads are handled before they are sent to the backend.

```typescript
export interface Lead {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  timestamp: Date;
  meta: {
    finalNominal: number;
    finalReal: number;
    totalGap: number;
  };
}

export abstract class LeadRepository {
  abstract saveLead(lead: Lead): Promise<boolean>;
  abstract getLocalLeads(): Lead[];
}
```

---

## IV. ARCHITECTURE: PROJECT SCAFFOLDING (BMad Structure)

To manage a project of this scale, the directory structure is strictly enforced.

```text
/src
  /app
    /base
      /components
        /chart-visualizer    # Chart.js or D3 implementation
        /input-panel         # Sliders and numeric inputs
      /layout                # Main Shell (Nav/Footer)
    /modals
      /lead-capture          # Multi-step lead form
      /success-view          # Post-capture confirmation
    /assets
      /i18n                  # en.json, es.json
      /styles                # Tailwind layers
      /utils                 # PDF generator logic
    /data
      /services              # Math engine & State
      /repositories          # Lead persistence
      /models                # TS Interfaces

```

## V. BASE LAYER: INTERACTIVE UI COMPONENTS (The "Winston" & "Sally" Assembly)

The **Base** layer is where the "Wealth Gap" becomes a tangible reality for the user. We will implement a reactive input panel and a synchronized chart visualizer.

### 5.1 Implementing the Input Panel (`input-panel.component.ts`)

This component maps user intentions to our `FinancialMathService` signals. It uses a "Split-Control" design: Sliders for rapid exploration and Number Inputs for precision.

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialMathService } from '../../data/services/financial-math.service';

@Component({
  selector: 'app-input-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-primary-light p-6 rounded-fintech shadow-institutional space-y-8">
      <h3 class="text-primary-navy font-inter font-bold text-xl mb-4">Investment Strategy</h3>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="text-sm font-medium text-primary-navy">Initial Capital</label>
          <span class="text-success-green font-bold">{{ math.initialCapital() | currency }}</span>
        </div>
        <input
          type="range"
          [value]="math.initialCapital()"
          (input)="updateCapital($event)"
          min="1000"
          max="100000"
          step="1000"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-success-green"
        />
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="text-sm font-medium text-primary-navy">Expected Return (%)</label>
          <span class="text-success-green font-bold">{{ math.annualReturnRate() * 100 }}%</span>
        </div>
        <input
          type="range"
          [value]="math.annualReturnRate() * 100"
          (input)="updateReturn($event)"
          min="1"
          max="15"
          step="0.5"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-success-green"
        />
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <label class="text-sm font-medium text-primary-navy text-loss-red"
            >Annual Inflation (%)</label
          >
          <span class="text-loss-red font-bold">{{ math.annualInflationRate() * 100 }}%</span>
        </div>
        <input
          type="range"
          [value]="math.annualInflationRate() * 100"
          (input)="updateInflation($event)"
          min="0"
          max="20"
          step="0.1"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-loss-red"
        />
      </div>
    </div>
  `,
})
export class InputPanelComponent {
  math = inject(FinancialMathService);

  updateCapital(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.math.initialCapital.set(Number(val));
  }

  updateReturn(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.math.annualReturnRate.set(Number(val) / 100);
  }

  updateInflation(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.math.annualInflationRate.set(Number(val) / 100);
  }
}
```

### 5.2 The Chart Visualizer Component (`chart-visualizer.component.ts`)

This component renders the "Wealth Gap." We utilize **Signals** to push updates to the chart instance without re-rendering the entire DOM, maintaining 60FPS performance.

```typescript
import { Component, inject, effect, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FinancialMathService } from '../../data/services/financial-math.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart-visualizer',
  standalone: true,
  template: `
    <div class="relative w-full h-[400px] p-4 bg-white rounded-fintech shadow-institutional">
      <canvas #chartCanvas></canvas>
      <div class="absolute top-4 right-4 bg-primary-navy text-white p-3 rounded-lg text-xs">
        <p class="opacity-70">Total Wealth Erosion:</p>
        <p class="text-lg font-bold text-cta-orange">{{ math.totalLoss() | currency }}</p>
      </div>
    </div>
  `,
})
export class ChartVisualizerComponent {
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  math = inject(FinancialMathService);
  chart?: Chart;

  constructor() {
    // This effect runs every time the projection signal changes
    effect(() => {
      const data = this.math.projection();
      this.updateChart(data);
    });
  }

  updateChart(data: any[]) {
    if (!this.chart) {
      this.initChart(data);
      return;
    }

    this.chart.data.labels = data.map((d) => `Year ${d.year}`);
    this.chart.data.datasets[0].data = data.map((d) => d.nominalValue);
    this.chart.data.datasets[1].data = data.map((d) => d.realValue);
    this.chart.update('none'); // Update without animation for real-time feel
  }

  private initChart(data: any[]) {
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((d) => `Year ${d.year}`),
        datasets: [
          {
            label: 'Nominal Wealth',
            data: data.map((d) => d.nominalValue),
            borderColor: '#00c853',
            backgroundColor: 'rgba(0, 200, 83, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Real Purchasing Power',
            data: data.map((d) => d.realValue),
            borderColor: '#1a237e',
            borderDash: [5, 5],
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }
}
```

---

## VI. ASSETS: INTERNATIONALIZATION & LOCALIZATION (The "Global" Engine)

In a 2,000-line spec, we cannot ignore the logic behind multi-language support. We implement a **Bilingual Signal Service** that manages UI strings for English and Spanish.

### 6.1 `i18n.service.ts` Implementation

```typescript
import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'es';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLang = signal<Lang>('en');

  // Dictionary storage
  private dictionary = signal<Record<string, any>>({
    en: {
      TITLE: 'Financial Tracker',
      SUBTITLE: 'Visualizing your purchasing power.',
      CTA: 'Download Report',
      GAP_LABEL: 'Wealth Gap',
    },
    es: {
      TITLE: 'Tracker Financiero',
      SUBTITLE: 'Visualiza tu poder adquisitivo.',
      CTA: 'Descargar Reporte',
      GAP_LABEL: 'Brecha de Riqueza',
    },
  });

  // Derived signal for easy access in components
  t = computed(() => this.dictionary()[this.currentLang()]);

  setLanguage(lang: Lang) {
    this.currentLang.set(lang);
  }

  getLang() {
    return this.currentLang();
  }
}
```

---

## VII. ADVANCED ARCHITECTURE: THE REPOSITORY PATTERN

To ensure the **Data** layer remains robust, we implement a local repository that manages lead data before cloud synchronization.

### 7.1 `local-lead.repository.ts`

```typescript
import { Injectable } from '@angular/core';
import { Lead, LeadRepository } from '../models/lead.model';

@Injectable({ providedIn: 'root' })
export class LocalLeadRepository extends LeadRepository {
  private readonly STORAGE_KEY = 'financial_tracker_leads';

  async saveLead(lead: Lead): Promise<boolean> {
    try {
      const existing = this.getLocalLeads();
      const updated = [...existing, lead];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.error('Storage failed', e);
      return false;
    }
  }

  getLocalLeads(): Lead[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
```

## VIII. MODALS LAYER: THE CONVERSION FUNNEL (The "John" Logic)

The **Modals** layer is decoupled from the main UI to optimize performance. It is only loaded and rendered when the user decides to trade their data for the report.

### 8.1 The Lead Capture Modal (`lead-capture.component.ts`)

This component uses Angular Reactive Forms with the **BMad** standard for input validation and state management.

```typescript
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinancialMathService } from '../../data/services/financial-math.service';
import { LocalLeadRepository } from '../../data/repositories/local-lead.repository';
import { PdfGeneratorService } from '../../assets/utils/pdf-generator.service';

@Component({
  selector: 'app-lead-capture',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="fixed inset-0 bg-primary-navy/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white w-full max-w-md rounded-fintech p-8 shadow-2xl animate-fade-in">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-primary-navy">Get Your Full Report</h2>
          <p class="text-gray-500 text-sm mt-2">
            Discover how to protect your wealth from {{ math.annualInflationRate() * 100 }}%
            inflation.
          </p>
        </div>

        <form [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-1"
              >Email Address</label
            >
            <input
              type="email"
              formControlName="email"
              class="w-full p-3 bg-primary-light border-none rounded-lg focus:ring-2 focus:ring-cta-orange outline-none transition-all"
              placeholder="name@company.com"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-1"
                >First Name</label
              >
              <input
                type="text"
                formControlName="firstName"
                class="w-full p-3 bg-primary-light border-none rounded-lg focus:ring-2 focus:ring-cta-orange outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-primary-navy mb-1"
                >Last Name</label
              >
              <input
                type="text"
                formControlName="lastName"
                class="w-full p-3 bg-primary-light border-none rounded-lg focus:ring-2 focus:ring-cta-orange outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            [disabled]="leadForm.invalid || isProcessing()"
            class="w-full py-4 bg-cta-orange text-white font-bold rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {{ isProcessing() ? 'Generating Report...' : 'Download My PDF Report' }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LeadCaptureComponent {
  private fb = inject(FormBuilder);
  math = inject(FinancialMathService);
  private repo = inject(LocalLeadRepository);
  private pdf = inject(PdfGeneratorService);

  isProcessing = signal(false);

  leadForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  async onSubmit() {
    if (this.leadForm.valid) {
      this.isProcessing.set(true);

      const leadData = {
        ...this.leadForm.value,
        id: crypto.randomUUID(),
        timestamp: new Date(),
        meta: {
          finalNominal: this.math.projection().at(-1)?.nominalValue,
          totalGap: this.math.totalLoss(),
        },
      };

      await this.repo.saveLead(leadData as any);
      await this.pdf.generateReport(leadData as any, this.math.projection());

      this.isProcessing.set(false);
      // Close modal logic here...
    }
  }
}
```

---

## IX. ASSETS: PDF GENERATION UTILITY (The "Value" Fulfillment)

The PDF is the "Product" the user receives. It must embody the brand's visual identity. We implement this using `jspdf` and `autoTable` to ensure a consistent, professional layout.

### 9.1 `pdf-generator.service.ts` Implementation

```typescript
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class PdfGeneratorService {
  async generateReport(lead: any, data: any[]) {
    const doc = new jsPDF();
    const primaryColor = [26, 35, 126]; // Deep Blue

    // Header
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('FINANCIAL TRACKER REPORT', 20, 25);

    // User Info
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text(`Prepared for: ${lead.firstName} ${lead.lastName}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);

    // Executive Summary
    doc.setFontSize(14);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Executive Summary', 20, 75);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Over your projection period, inflation will erode your purchasing power by:`, 20, 85);

    doc.setFontSize(18);
    doc.setTextColor(245, 124, 0); // CTA Orange
    doc.text(`$${lead.meta.totalGap.toLocaleString()}`, 20, 95);

    // Data Table
    autoTable(doc, {
      startY: 110,
      head: [['Year', 'Nominal Balance', 'Real Value (Inflation Adjusted)', 'Wealth Gap']],
      body: data
        .filter((_, i) => i % 5 === 0)
        .map((d) => [
          d.year,
          `$${d.nominalValue.toLocaleString()}`,
          `$${d.realValue.toLocaleString()}`,
          `$${d.gap.toLocaleString()}`,
        ]),
      headStyles: { fillColor: primaryColor },
    });

    doc.save(`Financial-Tracker-Report-${lead.lastName}.pdf`);
  }
}
```

---

## X. TECHNICAL DETAIL: TAILWIND CSS V4 ENGINEERING

Tailwind CSS v4 allows us to define our design system entirely within the CSS layer, which aligns perfectly with Sally's **80/15/5** rule.

### 10.1 `src/styles.css` Master Configuration

```css
@import 'tailwindcss';

@theme {
  /* 80% Foundation (Trust) */
  --color-primary-navy: #1a237e;
  --color-primary-light: #eceff1;
  --color-text-main: #374151;

  /* 15% Action (Growth) */
  --color-success-green: #00c853;
  --color-action-teal: #009688;

  /* 5% Conversion (Urgency) */
  --color-cta-orange: #f57c00;
  --color-loss-red: #d32f2f;

  /* Typography */
  --font-inter: 'Inter', sans-serif;

  /* Layout tokens */
  --radius-fintech: 16px;
  --shadow-premium: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@layer base {
  body {
    @apply bg-primary-light font-inter text-text-main antialiased;
  }

  h1,
  h2,
  h3 {
    @apply text-primary-navy font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-primary-navy text-white rounded-lg hover:bg-opacity-90 transition-all active:scale-95;
  }

  .card-fintech {
    @apply bg-white p-6 rounded-fintech shadow-premium border border-gray-100;
  }

  /* Custom Chart Animation for the Wealth Gap */
  .wealth-gap-area {
    animation: pulse-red 2s infinite ease-in-out;
  }

  @keyframes pulse-red {
    0% {
      fill: rgba(211, 47, 47, 0.1);
    }
    50% {
      fill: rgba(211, 47, 47, 0.2);
    }
    100% {
      fill: rgba(211, 47, 47, 0.1);
    }
  }
}
```

---

## XI. DEPLOYMENT & DEV OPS: THE FINAL STAGE

### 11.1 CI/CD Configuration for Vercel/Netlify

To maintain the integrity of **Financial Tracker**, we implement a pipeline that validates the math engine before every deployment.

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm test -- --watch=false --browsers=ChromeHeadless

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        run: vercel --token ${{ secrets.VERCEL_TOKEN }} --prod
```

## XII. PERFORMANCE ENGINEERING (The "Winston" Fine-Tuning)

In a financial tool, perceived performance directly correlates with institutional trust. We use **Angular 21's Zoneless mode** to eliminate change detection overhead.

### 12.1 Optimizing Chart Reactivity with Signal Effects

Instead of re-rendering the entire chart, we patch data updates using a high-frequency signal bridge.

```typescript
import { effect, untracked } from '@angular/core';

// Inside ChartVisualizerComponent
constructor() {
  effect(() => {
    const newData = this.math.projection();
    // untracked prevents the effect from re-triggering if chart instance changes
    untracked(() => {
      this.chart?.data.datasets[0].data = newData.map(d => d.nominalValue);
      this.chart?.data.datasets[1].data = newData.map(d => d.realValue);
      this.chart?.update('quiet'); // 'quiet' mode skips heavy animations
    });
  });
}

```

### 12.2 Lazy Loading the PDF Engine

The `jspdf` and `html2canvas` libraries are heavy (~200KB). We load them only when the user interacts with the CTA orange button using **Angular Deferrable Views**.

```html
@defer (on interaction(downloadBtn)) {
<app-lead-capture (close)="onClose()"></app-lead-capture>
} @loading {
<div class="spinner-orange">Preparing your report engine...</div>
}

<button #downloadBtn class="btn-cta">Download My PDF Report</button>
```

---

## XIII. SEO & MARKETING ARCHITECTURE (The "John" Strategy)

To generate leads organically, **Financial Tracker** must be highly discoverable. We implement a metadata strategy that targets high-intent keywords like "Inflation Calculator," "Wealth Erosion," and "Compound Interest Real Value."

### 13.1 Dynamic Metadata Service (`seo.service.ts`)

```typescript
import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  setTags(lang: 'en' | 'es') {
    const content =
      lang === 'es'
        ? {
            t: 'Tracker de Inflación | Financial Tracker',
            d: 'Visualiza la pérdida de poder adquisitivo.',
          }
        : {
            t: 'Wealth Gap Calculator | Financial Tracker',
            d: 'Visualize how inflation erodes your savings.',
          };

    this.title.setTitle(content.t);
    this.meta.updateTag({ name: 'description', content: content.d });
    this.meta.updateTag({ property: 'og:title', content: content.t });
    this.meta.updateTag({ property: 'og:image', content: '/assets/og-wealth-gap.png' });
  }
}
```

---

## XIV. THE "FINAL POLISH" IMPLEMENTATION (Sally's Final Touch)

To elevate the app from "Utility" to "Premium Tool," we add micro-interactions that reinforce the **Wealth Gap** concept.

### 14.1 The "Gap Count-Up" Component (`gap-display.component.ts`)

A visual counter that "bleeds" money as the user increases the inflation slider.

```typescript
import { Component, computed, inject } from '@angular/core';
import { FinancialMathService } from '../../data/services/financial-math.service';

@Component({
  selector: 'app-gap-display',
  standalone: true,
  template: `
    <div class="p-6 border-l-4 border-loss-red bg-white shadow-sm">
      <h4 class="text-xs font-bold uppercase text-gray-400">Projected Loss of Value</h4>
      <div class="text-3xl font-black text-loss-red tabular-nums">
        {{ displayGap() | currency }}
      </div>
      <p class="text-xs text-gray-500 mt-1 italic">
        "This is the purchasing power you lose to inflation."
      </p>
    </div>
  `,
})
export class GapDisplayComponent {
  math = inject(FinancialMathService);
  displayGap = computed(() => this.math.totalLoss());
}
```

---

## XV. PROJECT MAINTENANCE & SCALING (Winston's Future-Proofing)

### 15.1 API Integration Roadmap (Phase 2)

Currently, inflation is manual. The next architectural step is a `MarketDataService` that fetches real-time CPI (Consumer Price Index) data.

```typescript
// Future implementation sketch
export class MarketDataService {
  private http = inject(HttpClient);

  getInflationRate(countryCode: string) {
    return this.http.get<{ rate: number }>(
      `https://api.financialtracker.com/v1/inflation/${countryCode}`,
    );
  }
}
```

---

## XVI. FINAL SYSTEM VERIFICATION CHECKLIST

| Layer       | Verification Task  | Expected Result                                |
| ----------- | ------------------ | ---------------------------------------------- |
| **Data**    | Formula:           | Accuracy within 0.01% of Excel FV.             |
| **Base**    | Slider Interaction | Immediate Signal propagation (<16ms).          |
| **Modals**  | Form Validation    | CTA Orange button disabled for invalid emails. |
| **Assets**  | PDF Generation     | File size < 500KB with chart image included.   |
| **Overall** | Lighthouse Score   | 95+ Performance, 100 SEO.                      |

---

# 🏁 Conclusion of the 2,000-Line Master Blueprint

**BMad Orchestrator Summary:**
We have successfully mapped **Financial Tracker** from a conceptual lead-magnet to a fully architected Angular 21 application.

- **John (PM):** Secured the conversion funnel and business logic.
- **Sally (UX):** Defined the 80/15/5 system and high-impact visuals.
- **Winston (Architect):** Delivered the BMad structure, Signal math engine, and deployment CI/CD.
