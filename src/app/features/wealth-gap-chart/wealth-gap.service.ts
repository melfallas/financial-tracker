import { Injectable, computed, signal } from '@angular/core';
import { WealthGapInput, ProjectionEntry } from '@shared/types';
import { calculateWealthGap } from '@shared/utils';

@Injectable({ providedIn: 'root' })
export class WealthGapService {
  readonly inputs = signal<WealthGapInput>({
    initialCapital: 5000,
    monthlyContribution: 200,
    annualReturnRate: 10,
    annualInflationRate: 6,
    years: 20,
  });

  readonly projections = computed<ProjectionEntry[]>(() =>
    calculateWealthGap(this.inputs())
  );

  readonly totalErosion = computed<number>(() => {
    const data = this.projections();
    return data[data.length - 1]?.gap ?? 0;
  });

  readonly isHighInflation = computed<boolean>(
    () => this.inputs().annualInflationRate > 8
  );

  readonly chartLabels = computed<string[]>(() =>
    this.projections().map((p) => `Año ${p.year}`)
  );

  readonly nominalDataset = computed<number[]>(() =>
    this.projections().map((p) => p.nominalBalance)
  );

  readonly realDataset = computed<number[]>(() =>
    this.projections().map((p) => p.realValue)
  );

  updateInput<K extends keyof WealthGapInput>(key: K, value: WealthGapInput[K]): void {
    this.inputs.update((current) => ({ ...current, [key]: value }));
  }
}
