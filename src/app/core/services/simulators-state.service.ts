import { Injectable, inject, signal } from '@angular/core';
import { SimulatorConfigService } from './simulator-config.service';

@Injectable({
  providedIn: 'root'
})
export class SimulatorsStateService {
  private configService = inject(SimulatorConfigService);

  // Shared state signals initialized from the config service.
  // We use the .get() method helper for safer access to nested properties.
  readonly initialCapital = signal<number>(this.configService.get('initial_capital', 1000));
  readonly monthlyContribution = signal<number>(this.configService.get('monthly_contributions', 0));
  readonly annualReturn = signal<number>(this.configService.get('annual_return', 15));
  readonly annualInflation = signal<number>(this.configService.get('annual_inflation', 6));
  readonly years = signal<number>(this.configService.get('term_in_years', 20));

  // Retirement specific signals
  readonly currentAge = signal<number | null>(this.configService.get('current_age', null));
  readonly retirementAge = signal<number>(this.configService.get('retirement_age', 65));
  readonly targetMonthlyExpense = signal<number | null>(this.configService.get('monthly_expenses', null));

  // Update methods
  updateInitialCapital(val: number) { this.initialCapital.set(val); }
  updateMonthlyContribution(val: number) { this.monthlyContribution.set(val); }
  updateAnnualReturn(val: number) { this.annualReturn.set(val); }
  updateAnnualInflation(val: number) { this.annualInflation.set(val); }
  updateYears(val: number) { this.years.set(val); }
  updateCurrentAge(val: number | null) { this.currentAge.set(val); }
  updateRetirementAge(val: number) { this.retirementAge.set(val); }
  updateTargetMonthlyExpense(val: number | null) { this.targetMonthlyExpense.set(val); }
}
