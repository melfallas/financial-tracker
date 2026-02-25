import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  effect,
  ElementRef,
  viewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, Filler } from 'chart.js';
import { WealthGapService } from './wealth-gap.service';
import { WealthGapInput } from '@shared/types';

// Register Chart.js Filler plugin for fill between datasets
Chart.register(Filler);

@Component({
  selector: 'ft-wealth-gap-chart',
  imports: [BaseChartDirective, DecimalPipe],
  templateUrl: './wealth-gap-chart.html',
  styleUrl: './wealth-gap-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WealthGapChart implements OnInit, OnDestroy {
  private readonly wealthGapService = inject(WealthGapService);

  // Expose service signals/computed to the template
  readonly inputs = this.wealthGapService.inputs;
  readonly totalErosion = this.wealthGapService.totalErosion;
  readonly isHighInflation = this.wealthGapService.isHighInflation;

  // Count-up animation for total erosion
  readonly displayedErosion = signal<number>(0);

  // Chart visibility (IntersectionObserver)
  readonly chartVisible = signal<boolean>(false);

  // Chart data (reactive to signal updates)
  readonly chartData = computed<ChartData<'line'>>(() => ({
    labels: this.wealthGapService.chartLabels(),
    datasets: [
      {
        label: 'Valor Nominal (Crecimiento)',
        data: this.wealthGapService.nominalDataset(),
        borderColor: '#00C853',
        backgroundColor: 'rgba(0, 200, 83, 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5,
        pointBackgroundColor: '#00C853',
      },
      {
        label: 'Poder Adquisitivo Real',
        data: this.wealthGapService.realDataset(),
        borderColor: '#1A3C6E',
        backgroundColor: 'rgba(26, 60, 110, 0.05)',
        fill: false,
        tension: 0.4,
        borderDash: [6, 4],
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2.5,
        pointBackgroundColor: '#1A3C6E',
      },
    ],
  }));

  readonly chartOptions = computed<ChartConfiguration<'line'>['options']>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: this.chartVisible() ? 1000 : 0,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#374151',
          font: { family: 'Inter, sans-serif', size: 13 },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          afterBody: (items) => {
            if (items.length < 2) return [];
            const nominal = items[0].raw as number;
            const real = items[1].raw as number;
            const erosion = nominal - real;
            return [`Erosión: -$${erosion.toLocaleString('es-CR', { maximumFractionDigits: 0 })}`];
          },
          label: (ctx) => {
            const value = ctx.raw as number;
            return `  ${ctx.dataset.label}: $${value.toLocaleString('es-CR', { maximumFractionDigits: 0 })}`;
          },
        },
        backgroundColor: '#1A3C6E',
        titleColor: '#fff',
        bodyColor: '#E5E7EB',
        padding: 14,
        cornerRadius: 10,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: {
          color: '#6B7280',
          font: { family: 'Inter, sans-serif', size: 11 },
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: {
          color: '#6B7280',
          font: { family: 'Inter, sans-serif', size: 11 },
          callback: (value) =>
            `$${Number(value).toLocaleString('es-CR', { maximumFractionDigits: 0 })}`,
        },
      },
    },
  }));

  // Slider config
  readonly sliders: Array<{
    key: keyof WealthGapInput;
    label: string;
    min: number;
    max: number;
    step: number;
    prefix?: string;
    suffix?: string;
  }> = [
    { key: 'initialCapital', label: 'Capital Inicial', min: 0, max: 100000, step: 500, prefix: '$' },
    { key: 'monthlyContribution', label: 'Aporte Mensual', min: 0, max: 5000, step: 50, prefix: '$' },
    { key: 'annualReturnRate', label: 'Retorno Anual', min: 1, max: 25, step: 0.5, suffix: '%' },
    { key: 'annualInflationRate', label: 'Inflación Anual', min: 1, max: 20, step: 0.5, suffix: '%' },
    { key: 'years', label: 'Años', min: 5, max: 40, step: 1, suffix: ' años' },
  ];

  private intersectionObserver?: IntersectionObserver;
  private countUpInterval?: ReturnType<typeof setInterval>;
  private readonly sectionRef = viewChild<ElementRef>('chartSection');

  constructor() {
    // React to totalErosion changes — trigger count-up animation
    effect(() => {
      const target = this.totalErosion();
      this.runCountUp(target);
    });
  }

  ngOnInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    if (this.countUpInterval) clearInterval(this.countUpInterval);
  }

  updateSlider(key: keyof WealthGapInput, value: number): void {
    this.wealthGapService.updateInput(key, value);
  }

  private initIntersectionObserver(): void {
    const section = this.sectionRef();
    if (!section) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.chartVisible.set(true);
          this.intersectionObserver?.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    this.intersectionObserver.observe(section.nativeElement);
  }

  private runCountUp(target: number): void {
    if (this.countUpInterval) clearInterval(this.countUpInterval);
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    this.countUpInterval = setInterval(() => {
      step++;
      current = step >= steps ? target : Math.min(current + increment, target);
      this.displayedErosion.set(Math.round(current));
      if (step >= steps) clearInterval(this.countUpInterval);
    }, duration / steps);
  }
}
