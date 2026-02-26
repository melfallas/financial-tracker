import { Component, ChangeDetectionStrategy, signal, computed, inject, effect, untracked } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, Filler } from 'chart.js';
import { WealthGapService } from '../wealth-gap-chart/wealth-gap.service';
import { calculateRetirement } from '@shared/utils';
import { RetirementInput, RetirementResult } from '@shared/types';

// Register Chart.js Filler plugin
Chart.register(Filler);

@Component({
    selector: 'ft-retirement-simulator',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CurrencyPipe, DecimalPipe, BaseChartDirective],
    templateUrl: './retirement-simulator.html',
    styleUrl: './retirement-simulator.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetirementSimulator {
    private wealthGapService = inject(WealthGapService);
    private fb = inject(FormBuilder);

    // Stepper state
    currentStep = signal<'step1' | 'step2' | 'results'>('step1');

    // Inputs managed as individual signals, synced with global service
    currentAge = signal<number>(30);
    retirementAge = signal<number>(65);
    targetMonthlyExpense = signal<number>(2000);

    // Derived retirement results
    retirementResults = computed<RetirementResult>(() => {
        const globalInputs = this.wealthGapService.inputs();
        const input: RetirementInput = {
            currentAge: this.currentAge(),
            retirementAge: this.retirementAge(),
            currentSavings: globalInputs.initialCapital,
            monthlyContribution: globalInputs.monthlyContribution,
            expectedReturn: globalInputs.annualReturnRate,
            inflationRate: globalInputs.annualInflationRate,
            targetMonthlyExpense: this.targetMonthlyExpense()
        };
        return calculateRetirement(input);
    });

    // Chart data (Reactive to results)
    readonly chartData = computed<ChartData<'line'>>(() => {
        const results = this.retirementResults();
        const labels = results.projections.map(p => `Edad ${p.age}`);
        const balanceData = results.projections.map(p => p.realValue);
        const expenseData = results.projections.map(() => this.targetMonthlyExpense() * 12);

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

    isUnreachable = computed(() => {
        const inputs = this.wealthGapService.inputs();
        return inputs.annualInflationRate >= inputs.annualReturnRate;
    });

    constructor() {
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

    // UI Navigation
    nextStep() {
        if (this.currentStep() === 'step1') {
            this.currentStep.set('step2');
        } else if (this.currentStep() === 'step2') {
            this.currentStep.set('results');
        }
    }

    prevStep() {
        if (this.currentStep() === 'step2') {
            this.currentStep.set('step1');
        } else if (this.currentStep() === 'results') {
            this.currentStep.set('step2');
        }
    }

    goToStep(step: 'step1' | 'step2' | 'results') {
        this.currentStep.set(step);
    }

    // Access to global service for template binding
    get globalInputs() {
        return this.wealthGapService.inputs();
    }

    updateGlobalInput<K extends keyof ReturnType<typeof this.wealthGapService.inputs>>(key: K, value: any) {
        this.wealthGapService.updateInput(key, value);
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
}
