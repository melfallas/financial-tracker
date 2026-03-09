import { Component, ChangeDetectionStrategy, signal, computed, inject, effect, untracked, viewChild, output, ElementRef, input } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { WealthGapService } from '../wealth-gap-chart/wealth-gap.service';
import { SimulatorsStateService } from '../../core/services/simulators-state.service';
import { calculateRetirement } from '@shared/utils';
import { RetirementInput, RetirementResult, Lead, EmailStatus } from '@shared/types';
import { LeadForm } from '../lead-form/lead-form';
import { ScrollService } from '../../core/services/scroll.service';



@Component({
  selector: 'ft-retirement-simulator',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BaseChartDirective, LeadForm],
  templateUrl: './retirement-simulator.html',
  styleUrl: './retirement-simulator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetirementSimulator {
  private stateService = inject(SimulatorsStateService);
  private fb = inject(FormBuilder);
  private readonly chartDirective = viewChild(BaseChartDirective);
  private readonly scrollService = inject(ScrollService);

  onPlanRequested = output<{ lead: Lead }>();

  getChartImage(): string {
    return this.chartDirective()?.chart?.toBase64Image() || '';
  }

  // Stepper state
  currentStep = signal<'step1' | 'step2' | 'results'>('step1');

  // Local validation errors
  errors = signal<Record<string, string>>({});

  // Derived retirement results
  retirementResults = computed<RetirementResult>(() => {
    const input: RetirementInput = {
      currentAge: this.stateService.currentAge() ?? 0,
      retirementAge: this.stateService.retirementAge() ?? 0,
      currentSavings: this.stateService.initialCapital() ?? 0,
      monthlyContribution: this.stateService.monthlyContribution() ?? 0,
      expectedReturn: this.stateService.annualReturn() ?? 0,
      inflationRate: this.stateService.annualInflation() ?? 0,
      targetMonthlyExpense: this.stateService.targetMonthlyExpense() ?? 0
    };
    return calculateRetirement(input);
  });

  // Chart data (Reactive to results)
  readonly chartData = computed<ChartData<'line'>>(() => {
    const results = this.retirementResults();
    const labels = results.projections.map(p => `Edad ${p.age}`);
    const balanceData = results.projections.map(p => p.realValue);
    const expenseData = results.projections.map(() => (this.stateService.targetMonthlyExpense() ?? 0) * 12);

    return {
      labels,
      datasets: [
        {
          label: 'Balance Real (Hoy)',
          data: balanceData,
          borderColor: '#10B981', // Emerald
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 3,
        },
        {
          label: 'Meta de Gastos (F.F.)',
          data: expenseData,
          borderColor: '#FF5252', // Soft Red (Accessibility compliant)
          borderDash: [5, 5],
          pointRadius: 0,
          borderWidth: 2,
          fill: false,
        }
      ]
    };
  });

  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    scales: {
      x: { grid: { display: false }, ticks: { maxTicksLimit: 8 } },
      y: {
        ticks: {
          callback: (val) => `$${Number(val).toLocaleString()}`
        }
      }
    },
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: $${Number(context.raw).toLocaleString()}`
        }
      }
    }
  };

  // Animation values for Odometer effect
  animatedFreedomAge = signal<number | null>(null);
  animatedRunOutAge = signal<number | null>(null);

  // Lead Capture state
  showCaptureForm = signal<boolean>(false);
  isPlanDownloaded = signal<boolean>(false);
  capturedLead = signal<Lead | null>(null);
  showAgeErrorModal = signal<boolean>(false);

  isUnreachable = computed(() => {
    const inflation = this.stateService.annualInflation() ?? 0;
    const returnRate = this.stateService.annualReturn() ?? 0;
    return inflation >= returnRate;
  });

  private readonly ageInput = viewChild<ElementRef<HTMLInputElement>>('ageInput');
  private readonly expenseInput = viewChild<ElementRef<HTMLInputElement>>('expenseInput');

  emailStatus = input<EmailStatus>('idle');
  private hasStartedProcess = signal<boolean>(false);

  buttonLabel = computed(() => {
    const status = this.emailStatus();
    if (status === 'sending') return 'Enviando Plan';
    if (status === 'failed') return 'Error en Envío';
    if (status === 'sent') return 'Plan Enviado';
    if (this.showCaptureForm()) return 'Completa los Datos';
    return 'Obtener mi Plan';
  });

  isDownloading = computed(() => this.hasStartedProcess() || this.emailStatus() !== 'idle');
  private isFirstLoad = signal<boolean>(true);

  constructor() {
    // const results = this.retirementResults();
    // console.log("Retirement Results: ", results);
    // Effect to handle navigation from navbar/other components
    effect(() => {
      const active = this.scrollService.activeSection();
      if (active === 'retirement-simulator' && this.isFirstLoad()) {
        untracked(() => {
          this.isFirstLoad.set(false);
          // The reactive signal change will trigger the focus effect below
        });
      }
    });

    // // Effect to handle input focus on step change
    // effect(() => {
    //   const step = this.currentStep();
    //   const ageEl = this.ageInput();
    //   const expEl = this.expenseInput();
    //   const firstLoad = this.isFirstLoad();

    //   // Focusing Step 1 if navigated or returning to step
    //   if (step === 'step1') {
    //     if (!firstLoad && ageEl) {
    //       // 200ms allows smooth scroll to finish so the caret/cursor remains stable and visible
    //       setTimeout(() => {
    //         const el = ageEl.nativeElement;
    //         el.focus();
    //         el.select();
    //       }, 200);
    //     }
    //   } else if (step === 'step2' && expEl) {
    //     setTimeout(() => {
    //       const el = expEl.nativeElement;
    //       el.focus();
    //       el.select();
    //     }, 200);
    //   }
    // });

    // Effect to trigger confetti on results step
    effect(() => {
      if (this.currentStep() === 'results' && !this.isUnreachable()) {
        this.triggerConfetti();
      }
    });

    // Effect to sync and animate result values
    effect(() => {
      const results = this.retirementResults();
      untracked(() => {
        if (results.freedomAge !== null) {
          this.animateValue('freedomAge', results.freedomAge, 1200);
        } else {
          this.animatedFreedomAge.set(null);
        }

        if (results.runOutAge !== null) {
          this.animateValue('runOutAge', results.runOutAge, 800);
        } else {
          this.animatedRunOutAge.set(null);
        }
      });
    });
  }

  // Getters for shared state to use in template
  get currentAge() { return this.stateService.currentAge(); }
  get retirementAge() { return this.stateService.retirementAge(); }
  get targetMonthlyExpense() { return this.stateService.targetMonthlyExpense(); }
  get initialCapital() { return this.stateService.initialCapital(); }
  get monthlyContribution() { return this.stateService.monthlyContribution(); }
  get annualReturn() { return this.stateService.annualReturn(); }
  get annualInflation() { return this.stateService.annualInflation(); }

  // Update methods
  updateCurrentAge(val: any) {
    this.stateService.updateCurrentAge(val);
    if (this.errors()['currentAge']) this.validateStep1();
  }
  updateInitialCapital(val: any) {
    this.stateService.updateInitialCapital(val);
    if (this.errors()['initialCapital']) this.validateStep1();
  }
  updateMonthlyContribution(val: any) {
    this.stateService.updateMonthlyContribution(val);
  }
  updateTargetMonthlyExpense(val: any) {
    this.stateService.updateTargetMonthlyExpense(val);
    if (this.errors()['targetMonthlyExpense']) this.validateStep2();
  }
  updateAnnualInflation(val: any) {
    this.stateService.updateAnnualInflation(val);
    if (this.errors()['annualInflation']) this.validateStep2();
  }
  updateRetirementAge(val: any) {
    this.stateService.updateRetirementAge(val);
    if (this.errors()['retirementAge']) this.validateStep2();
  }
  updateAnnualReturn(val: any) {
    this.stateService.updateAnnualReturn(val);
    if (this.errors()['annualReturn']) this.validateStep2();
  }

  // UI Navigation
  nextStep() {
    if (this.currentStep() === 'step1') {
      const age = this.stateService.currentAge();
      if (!age) {
        // this.showAgeErrorModal.set(true);
        // return;
      }
      if (this.validateStep1()) {
        this.currentStep.set('step2');
        this.scrollService.scrollToNavbarSection('retirement-simulator');
      }
    } else if (this.currentStep() === 'step2') {
      if (this.validateStep2()) {
        this.currentStep.set('results');
        // this.scrollService.scrollToNavbarSection('retirement-simulator');
        setTimeout(() => this.scrollService.scrollToSection('retirement-simulator'), 100);
      }
    }
  }

  private validateStep1(): boolean {
    const newErrors: Record<string, string> = {};
    const age = this.stateService.currentAge();
    const capital = this.stateService.initialCapital();
    const minAge = 5;
    const maxAge = 100;

    // if (age === null || age === 0) newErrors['currentAge'] = 'Por favor ingresa tu edad actual.';
    if (age === null) newErrors['currentAge'] = 'Por favor ingresa tu edad actual';
    // else if (age < minAge || age > maxAge) newErrors['currentAge'] = 'Edad no válida.';
    else if (age < minAge) newErrors['currentAge'] = `La edad mínima es ${minAge} años`;
    else if (age > maxAge) newErrors['currentAge'] = `La edad máxima es ${maxAge} años`;

    if (capital === null || capital <= 0) newErrors['initialCapital'] = 'El capital inicial debe ser mayor a 0';

    this.errors.update(prev => ({ ...prev, ...newErrors }));
    // Remove fixed errors
    if (!newErrors['currentAge']) this.removeError('currentAge');
    if (!newErrors['initialCapital']) this.removeError('initialCapital');

    return Object.keys(newErrors).length === 0;
  }

  private validateStep2(): boolean {
    const newErrors: Record<string, string> = {};
    const expense = this.stateService.targetMonthlyExpense();
    const inflation = this.stateService.annualInflation();
    const retAge = this.stateService.retirementAge();
    const returnRate = this.stateService.annualReturn();
    const curAge = this.stateService.currentAge() ?? 0;

    if (expense === null || expense <= 0) newErrors['targetMonthlyExpense'] = 'Por favor ingresa tus gastos mensuales';
    if (inflation === null || inflation <= 0) newErrors['annualInflation'] = 'La inflación debe ser mayor a 0';
    if (returnRate === null || returnRate <= 0) newErrors['annualReturn'] = 'El retorno debe ser mayor a 0';
    if (retAge === null || retAge <= 0) newErrors['retirementAge'] = 'La edad de jubilación debe ser mayor a 0';
    else if (retAge <= curAge) newErrors['retirementAge'] = 'La edad de jubilación debe ser mayor a tu edad actual';

    this.errors.update(prev => ({ ...prev, ...newErrors }));
    // Remove fixed errors
    ['targetMonthlyExpense', 'annualInflation', 'annualReturn', 'retirementAge'].forEach(k => {
      if (!newErrors[k]) this.removeError(k);
    });

    return Object.keys(newErrors).length === 0;
  }

  private removeError(key: string) {
    this.errors.update(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  }

  prevStep() {
    if (this.currentStep() === 'step2') {
      this.currentStep.set('step1');
    } else if (this.currentStep() === 'results') {
      this.currentStep.set('step2');
    }
    this.scrollService.scrollToNavbarSection('retirement-simulator');
  }

  goToStep(step: 'step1' | 'step2' | 'results') {
    if (step === 'results' && !this.validateStep2()) return;
    if (step === 'step2' && !this.validateStep1()) return;
    this.currentStep.set(step);
    // Explicitly scroll to the top of the section to avoid "jumping" to the next section or footer
    // this.scrollService.scrollToNavbarSection('retirement-simulator');
    setTimeout(() => this.scrollService.scrollToNavbarSection('retirement-simulator'), 100);
  }

  private animateValue(type: 'freedomAge' | 'runOutAge', end: number, duration: number) {
    const start = type === 'freedomAge' ? (this.animatedFreedomAge() ?? 0) : (this.animatedRunOutAge() ?? 0);
    const setFn = type === 'freedomAge' ? this.animatedFreedomAge : this.animatedRunOutAge;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.round(start + (end - start) * easeProgress);
      setFn.set(currentVal);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  private async triggerConfetti() {
    try {
      // Lazy load canvas-confetti
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#1A3C6E', '#FFFFFF'],
      });
    } catch (e) {
      console.warn('Confetti could not be loaded', e);
    }
  }

  // Capture Interaction
  initiateDownload() {
    this.hasStartedProcess.set(true);
    const lead = this.capturedLead();
    if (lead) {
      // Already have the lead, just emit the event to trigger PDF/Email
      this.onPlanRequested.emit({ lead });
    } else {
      // First time, show the form
      this.showCaptureForm.set(true);
      // Smooth scroll to the lead capture form anchor
      setTimeout(() => this.scrollService.scrollToSection('lead-capture-section'), 100);
    }
  }

  onLeadCaptured(lead: Lead) {
    // Here we trigger the PDF download (US2.2) and move to next state
    this.capturedLead.set(lead);
    this.isPlanDownloaded.set(true);
    this.showCaptureForm.set(false);
    this.onPlanRequested.emit({ lead });
  }
}
