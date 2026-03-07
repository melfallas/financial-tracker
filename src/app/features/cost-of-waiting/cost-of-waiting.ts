import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    effect,
    ElementRef,
    ViewChild,
    AfterViewInit,
    untracked,
    OnDestroy,
    computed
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { WealthGapService } from '../wealth-gap-chart/wealth-gap.service';

@Component({
    selector: 'ft-cost-of-waiting',
    imports: [FormsModule, CurrencyPipe],
    templateUrl: './cost-of-waiting.html',
    styleUrl: './cost-of-waiting.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostOfWaiting implements AfterViewInit, OnDestroy {
    private wealthGapService = inject(WealthGapService);

    // Input signals tied to the WealthGapService
    displaySavings = signal<number>(this.wealthGapService.inputs().initialCapital);
    displayYears = signal<number>(this.wealthGapService.inputs().years);
    displayInflation = signal<number>(this.wealthGapService.inputs().annualInflationRate);

    // Business Logic: Compound inflation loss
    // Principal loss = Principal * ( (1 + annualInflation/100/12)^(years * 12) - 1 )
    estimatedLoss = computed(() => {
        const savings = this.displaySavings();
        const annualRate = this.displayInflation();
        const monthlyRate = annualRate / 100 / 12;
        const totalMonths = this.displayYears() * 12;

        // We calculate the difference between nominal value and real value (erosion)
        // Nominal value doesn't change if keeping in 'standard account' (0% return)
        // Real Value = Savings / (1 + monthlyInflation)^totalMonths
        // Loss = Savings - Real Value
        const realValue = savings / Math.pow(1 + monthlyRate, totalMonths);
        return savings - realValue;
    });

    animatedLoss = signal<number>(0);
    animatedRemaining = computed(() => this.displaySavings() - this.animatedLoss());
    private animationFrameId?: number;
    private observer?: IntersectionObserver;

    @ViewChild('bannerSection') bannerSection?: ElementRef<HTMLElement>;

    constructor() {
        // Effect to sync and animate whenever the estimated loss changes
        effect(
            () => {
                const targetLoss = this.estimatedLoss();
                this.animateValue(this.animatedLoss(), targetLoss, 600);

                // Update global service values if changed locally
                untracked(() => {
                    const currentInputs = this.wealthGapService.inputs();
                    if (this.displaySavings() !== currentInputs.initialCapital) {
                        this.wealthGapService.updateInput('initialCapital', this.displaySavings());
                    }
                    if (this.displayYears() !== currentInputs.years) {
                        this.wealthGapService.updateInput('years', this.displayYears());
                    }
                    if (this.displayInflation() !== currentInputs.annualInflationRate) {
                        this.wealthGapService.updateInput('annualInflationRate', this.displayInflation());
                    }
                });
            },
            { allowSignalWrites: true }
        );

        // Sync from global service back to local signals
        effect(
            () => {
                const globalInputs = this.wealthGapService.inputs();
                untracked(() => {
                    if (globalInputs.initialCapital !== this.displaySavings()) {
                        this.displaySavings.set(globalInputs.initialCapital);
                    }
                    if (globalInputs.years !== this.displayYears()) {
                        this.displayYears.set(globalInputs.years);
                    }
                    if (globalInputs.annualInflationRate !== this.displayInflation()) {
                        this.displayInflation.set(globalInputs.annualInflationRate);
                    }
                });
            },
            { allowSignalWrites: true }
        );
    }

    ngAfterViewInit() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animateValue(0, this.estimatedLoss(), 1200);
                        this.observer?.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (this.bannerSection?.nativeElement) {
            this.observer.observe(this.bannerSection.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.observer?.disconnect();
    }

    private animateValue(start: number, end: number, duration: number) {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = start + (end - start) * easeProgress;
            this.animatedLoss.set(currentVal);
            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(step);
            }
        };
        this.animationFrameId = requestAnimationFrame(step);
    }

    scrollToCapture() {
        const el = document.getElementById('lead-capture-form');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }
}
