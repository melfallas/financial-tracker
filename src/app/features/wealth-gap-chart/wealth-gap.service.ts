import { Injectable, computed, inject } from '@angular/core';
import { WealthGapInput, ProjectionEntry } from '@shared/types';
import { calculateWealthGap } from '@shared/utils';
import { SimulatorConfigService } from '../../core/services/simulator-config.service';
import { SimulatorsStateService } from '../../core/services/simulators-state.service';

@Injectable({ providedIn: 'root' })
export class WealthGapService {
  private configService = inject(SimulatorConfigService);
  private stateService = inject(SimulatorsStateService);
  private defaults = this.configService.config();

  // Combine state from shared service into the format needed by calculateWealthGap
  readonly inputs = computed<WealthGapInput>(() => ({
    initialCapital: this.stateService.initialCapital(),
    monthlyContribution: this.stateService.monthlyContribution(),
    annualReturnRate: this.stateService.annualReturn(),
    annualInflationRate: this.stateService.annualInflation(),
    years: this.stateService.years(),
  }));

  readonly projections = computed<ProjectionEntry[]>(() =>
    calculateWealthGap(this.inputs())
  );

  readonly totalErosion = computed<number>(() => {
    const data = this.projections();
    return data[data.length - 1]?.gap ?? 0;
  });

  readonly isHighInflation = computed<boolean>(
    () => this.inputs().annualInflationRate > (this.defaults?.wealth_gap_chart.critical_inflation ?? 8)
  );

  readonly criticalInflationRate = computed<number>(
    () => this.defaults?.wealth_gap_chart.critical_inflation ?? 8
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
    switch (key) {
      case 'initialCapital': this.stateService.updateInitialCapital(value); break;
      case 'monthlyContribution': this.stateService.updateMonthlyContribution(value); break;
      case 'annualReturnRate': this.stateService.updateAnnualReturn(value); break;
      case 'annualInflationRate': this.stateService.updateAnnualInflation(value); break;
      case 'years': this.stateService.updateYears(value); break;
    }
  }
}
