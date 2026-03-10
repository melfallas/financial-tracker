import { Injectable, inject, signal } from '@angular/core';
import { SimulatorConfigService } from './simulator-config.service';

@Injectable({
  providedIn: 'root'
})
export class SimulatorsStateService {
  private configService = inject(SimulatorConfigService);

  // Shared state signals initialized from the config service.
  // We use the .get() method helper for safer access to nested properties.
  readonly initialCapital = signal<number | null>(this.configService.get('initial_capital', 1000));
  readonly monthlyContribution = signal<number | null>(this.configService.get('monthly_contributions', 0));
  readonly annualReturn = signal<number | null>(this.configService.get('annual_return', 15));
  readonly annualInflation = signal<number | null>(this.configService.get('annual_inflation', 6));
  readonly years = signal<number | null>(this.configService.get('term_in_years', 20));

  readonly targetMonthlyExpense = signal<number | null>(this.configService.get('monthly_expenses', null));

  // Retirement specific signals
  readonly currentAge = signal<number | null>(this.configService.get('current_age', null));
  readonly retirementAge = signal<number | null>(this.configService.get('retirement_age', 65));

  /**
   * Safely parses a value into a number or null.
   * Handles strings with commas (thousands separators) and empty strings.
   */
  private parseSafeNumber(val: any): number | null {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return isNaN(val) ? null : val;
    
    // Remove commas (thousands separator common in some locales)
    const sanitized = val.toString().replace(/,/g, '');
    const parsed = parseFloat(sanitized);
    
    return isNaN(parsed) ? null : parsed;
  }

  // Update methods
  updateInitialCapital(val: any) { this.initialCapital.set(this.parseSafeNumber(val)); }
  updateMonthlyContribution(val: any) { this.monthlyContribution.set(this.parseSafeNumber(val)); }
  updateAnnualReturn(val: any) { this.annualReturn.set(this.parseSafeNumber(val)); }
  updateAnnualInflation(val: any) { this.annualInflation.set(this.parseSafeNumber(val)); }
  updateYears(val: any) { this.years.set(this.parseSafeNumber(val)); }
  updateCurrentAge(val: any) { this.currentAge.set(this.parseSafeNumber(val)); }
  updateRetirementAge(val: any) { this.retirementAge.set(this.parseSafeNumber(val)); }
  updateTargetMonthlyExpense(val: any) { this.targetMonthlyExpense.set(this.parseSafeNumber(val)); }
}
