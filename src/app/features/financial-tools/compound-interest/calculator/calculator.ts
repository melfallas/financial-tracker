import { Component, signal, computed, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '@shared/components/navbar/navbar';
import { MenuItem } from '@shared/components/navbar/navbar.model';

interface CalculationResult {
  year: number;
  totalSavings: number;
  totalContributions: number;
  interestEarned: number;
}

@Component({
  selector: 'app-compound-interest-calculator',
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculator {
  protected readonly menuItems = signal<MenuItem[]>([
    { title: 'Inicio', link: '/', isInternal: true },
    { title: 'Documentación', link: '/doc', isInternal: true },
    { title: 'Calculadora de interés compuesto', link: '/financial-tools/compound-interest', isInternal: true },
    { title: 'Acerca de', link: '/about', isInternal: true },
  ]);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    initialInvestment: [1000, [Validators.required, Validators.min(0)]],
    monthlyContribution: [100, [Validators.required, Validators.min(0)]],
    years: [10, [Validators.required, Validators.min(1), Validators.max(50)]],
    interestRate: [7, [Validators.required, Validators.min(0), Validators.max(100)]],
    varianceRange: [0, [Validators.min(0), Validators.max(20)]],
    compoundFrequency: ['12', [Validators.required]], // 1: Annual, 4: Quarterly, 12: Monthly, 365: Daily
  });

  protected readonly results = signal<CalculationResult[]>([]);
  protected readonly showTable = signal(false);

  protected readonly finalSavings = computed(() => {
    const res = this.results();
    return res.length > 0 ? res[res.length - 1].totalSavings : 0;
  });

  protected readonly finalSavingsHigh = computed(() => {
    const val = this.form.getRawValue();
    const rate = (Number(val.interestRate) + Number(val.varianceRange)) / 100;
    return this.calculateFV(Number(val.initialInvestment), Number(val.monthlyContribution), Number(val.years), rate, Number(val.compoundFrequency));
  });

  protected readonly finalSavingsLow = computed(() => {
    const val = this.form.getRawValue();
    const rate = Math.max(0, (Number(val.interestRate) - Number(val.varianceRange)) / 100);
    return this.calculateFV(Number(val.initialInvestment), Number(val.monthlyContribution), Number(val.years), rate, Number(val.compoundFrequency));
  });

  protected readonly totalContributions = computed(() => {
    const res = this.results();
    return res.length > 0 ? res[res.length - 1].totalContributions : 0;
  });

  protected readonly totalInterest = computed(() => {
    return this.finalSavings() - this.totalContributions();
  });

  constructor() {
    // Re-calculate when form changes
    effect(() => {
      this.calculate();
    });

    // Handle initial calculation
    this.calculate();
  }

  protected calculate(): void {
    if (this.form.invalid) return;

    const val = this.form.getRawValue();
    const P = Number(val.initialInvestment);
    const PMT = Number(val.monthlyContribution);
    const years = Number(val.years);
    const r = Number(val.interestRate) / 100;
    const n = Number(val.compoundFrequency);

    const yearlyResults: CalculationResult[] = [];
    
    // Monthly calculation loop for better accuracy
    let currentBalance = P;
    let currentContributions = P;
    
    // Add year 0
    yearlyResults.push({
      year: 0,
      totalSavings: P,
      totalContributions: P,
      interestEarned: 0
    });

    for (let t = 1; t <= years; t++) {
      // Calculate month by month for each year
      for (let m = 1; m <= 12; m++) {
        // Simple monthly contribution addition
        currentContributions += PMT;
        
        // Compound interest logic
        // Formula: A = P(1 + r/n)^(n*t/12)
        // Here we do it stepwise:
        // If n=12, we compound every month
        // If n=1, we compound every 12 months (at the end of the year)
        
        // Stepwise interest calculation:
        // Every month we add interest if compounding frequency allows
        // E.g. if monthly (n=12), factor = r/12
        // E.g. if annual (n=1), we add r once a year
        
        // To be consistent with Investor.gov, we'll use a more direct chunked calculation
        currentBalance += PMT; // Add contribution first
      }
      
      // At the end of the year, applying the formula for the year to get the accurate result
      // But stepwise is better for tracking. Let's use the formula for Year t:
      // A = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n)) * (1 + r/n)
      // Actually PMT is monthly, but formula often uses PMT at compounding frequency.
      // Let's use the standard accurate finance formula for monthly deposits and n-frequency compounding:
      
      const ratePerPeriod = r / n;
      const totalPeriods = n * t;
      const depositsPerPeriod = (PMT * 12) / n;
      
      const futureValuePrincipal = P * Math.pow(1 + ratePerPeriod, totalPeriods);
      const futureValueSeries = depositsPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
      
      // If interest is added at end of period
      const totalSavings = futureValuePrincipal + futureValueSeries;
      const totalContributionsForYear = P + (PMT * 12 * t);
      
      yearlyResults.push({
        year: t,
        totalSavings: totalSavings,
        totalContributions: totalContributionsForYear,
        interestEarned: totalSavings - totalContributionsForYear
      });
    }

    this.results.set(yearlyResults);
  }

  private calculateFV(P: number, PMT: number, t: number, r: number, n: number): number {
    const ratePerPeriod = r / n;
    const totalPeriods = n * t;
    const depositsPerPeriod = (PMT * 12) / n;
    
    const futureValuePrincipal = P * Math.pow(1 + ratePerPeriod, totalPeriods);
    const futureValueSeries = depositsPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
    
    return futureValuePrincipal + futureValueSeries;
  }

  protected toggleTable(): void {
    this.showTable.update(v => !v);
  }

  protected reset(): void {
    this.form.reset({
      initialInvestment: 1000,
      monthlyContribution: 100,
      years: 10,
      interestRate: 7,
      varianceRange: 0,
      compoundFrequency: '12'
    });
    this.calculate();
  }

  // Helper for Chart SVG
  protected readonly chartPoints = computed(() => {
    const res = this.results();
    if (res.length === 0) return '';
    
    const maxVal = Math.max(...res.map(r => r.totalSavings));
    const width = 1000;
    const height = 400;
    
    return res.map((r, i) => {
      const x = (i / (res.length - 1)) * width;
      const y = height - (r.totalSavings / maxVal) * height;
      return `${x},${y}`;
    }).join(' ');
  });

  protected readonly contributionPoints = computed(() => {
    const res = this.results();
    if (res.length === 0) return '';
    
    const maxVal = Math.max(...res.map(r => r.totalSavings));
    const width = 1000;
    const height = 400;
    
    return res.map((r, i) => {
      const x = (i / (res.length - 1)) * width;
      const y = height - (r.totalContributions / maxVal) * height;
      return `${x},${y}`;
    }).join(' ');
  });
}
