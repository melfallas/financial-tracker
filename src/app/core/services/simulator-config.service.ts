import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SimulatorDefaults } from '../interfaces/simulator-defaults.interface';

@Injectable({
  providedIn: 'root'
})
export class SimulatorConfigService {
  private http = inject(HttpClient);
  private configSignal = signal<SimulatorDefaults | null>(null);

  readonly config = this.configSignal.asReadonly();

  async loadConfig(): Promise<void> {
    try {
      const data = await lastValueFrom(
        this.http.get<SimulatorDefaults>('assets/config/simulator-defaults.json')
      );
      this.configSignal.set(data);
    } catch (error) {
      console.error('Error loading simulator defaults:', error);
    }
  }

  /**
   * Helper to get a config value by flattened key or path.
   * Maps flattened keys to the defined nested structure.
   */
  get(key: string, defaultValue: any = null): any {
    const data = this.configSignal();
    if (!data) return defaultValue;

    // Mapping for flattened keys (as used in state service)
    switch (key) {
      case 'initial_capital': return data.general.initial_capital ?? defaultValue;
      case 'monthly_contributions': return data.general.monthly_contributions ?? defaultValue;
      case 'annual_return': return data.general.annual_return ?? defaultValue;
      case 'annual_inflation': return data.general.annual_inflation ?? defaultValue;
      case 'term_in_years': return data.general.term_in_years ?? defaultValue;
      case 'critical_inflation': return data.wealth_gap_chart.critical_inflation ?? defaultValue;
      case 'retirement_age': return data.retirement_simulator.retirement_age ?? defaultValue;
      case 'current_age': return data.retirement_simulator.current_age ?? defaultValue;
      case 'monthly_expenses': return data.retirement_simulator.monthly_expenses ?? defaultValue;
      default: return defaultValue;
    }
  }
}
