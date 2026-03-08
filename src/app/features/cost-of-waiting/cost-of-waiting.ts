import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    effect,
    ElementRef,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    computed
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { SimulatorsStateService } from '../../core/services/simulators-state.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
    selector: 'ft-cost-of-waiting',
    imports: [FormsModule, CurrencyPipe],
    templateUrl: './cost-of-waiting.html',
    styleUrl: './cost-of-waiting.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostOfWaiting implements AfterViewInit, OnDestroy {
    private stateService = inject(SimulatorsStateService);
    protected scrollService = inject(ScrollService);

    // Bind to shared state
    get displaySavings() { return this.stateService.initialCapital(); }
    get displayYears() { return this.stateService.years(); }
    get displayInflation() { return this.stateService.annualInflation(); }

    // Business Logic: Compound inflation loss
    estimatedLoss = computed(() => {
        const savings = this.stateService.initialCapital() ?? 0;
        const annualRate = this.stateService.annualInflation() ?? 0;
        const years = this.stateService.years() ?? 0;
        const monthlyRate = annualRate / 100 / 12;
        const totalMonths = years * 12;

        const realValue = savings / Math.pow(1 + monthlyRate, totalMonths);
        return savings - realValue;
    });

    animatedLoss = signal<number>(0);
    animatedRemaining = computed(() => (this.stateService.initialCapital() ?? 0) - this.animatedLoss());
    private animationFrameId?: number;
    private observer?: IntersectionObserver;

    @ViewChild('bannerSection') bannerSection?: ElementRef<HTMLElement>;

    constructor() {
        // Effect to trigger animation whenever the estimated loss changes
        effect(() => {
            const targetLoss = this.estimatedLoss();
            this.animateValue(this.animatedLoss(), targetLoss, 1200);
        });
    }

    updateSavings(val: any) {
        this.stateService.updateInitialCapital(val === '' || val === null ? null : +val);
    }

    updateYears(val: any) {
        this.stateService.updateYears(val === '' || val === null ? null : +val);
    }

    updateInflation(val: any) {
        this.stateService.updateAnnualInflation(val === '' || val === null ? null : +val);
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

    scrollToSimulator() {
        this.scrollService.scrollToSection('retirement-simulator');
    }
}
