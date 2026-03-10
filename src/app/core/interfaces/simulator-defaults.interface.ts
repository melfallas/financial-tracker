export interface SimulatorDefaults {
  version: string;
  general: {
    initial_capital: number;
    monthly_contributions: number;
    annual_return: number;
    annual_inflation: number;
    term_in_years: number;
  };
  wealth_gap_chart: {
    critical_inflation: number;
  };
  cost_of_waiting: {
    low_loss_rate: number;
    moderate_loss_rate: number;
    critical_loss_rate: number;
  };
  retirement_simulator: {
    monthly_expenses: number | null;
    current_age: number | null;
    retirement_age: number;
  };
}
