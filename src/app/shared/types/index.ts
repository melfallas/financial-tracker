export interface ProjectionEntry {
    year: number;
    nominalBalance: number;
    realValue: number;
    gap: number;
}

export interface WealthGapInput {
    initialCapital: number;
    monthlyContribution: number;
    annualReturnRate: number;
    annualInflationRate: number;
    years: number;
}

export interface RetirementInput {
    currentAge: number;
    retirementAge: number;
    currentSavings: number;
    monthlyContribution: number;
    expectedReturn: number;
    inflationRate: number;
    targetMonthlyExpense: number; // The amount needed monthly in retirement (in today's money)
}

export interface RetirementResult {
    freedomYear: number | null;
    freedomAge: number | null;
    runOutAge: number | null;
    projections: RetirementProjectionEntry[];
}

export interface RetirementProjectionEntry {
    age: number;
    year: number;
    nominalBalance: number;
    realValue: number;
    isRetired: boolean;
}

export interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    source: 'landing-page' | 'booking';
    engagementStats?: any;
}

export interface InteractionLog {
    id: string;
    session_id: string;
    widget_id: string;
    interaction_type: string;
    value?: number;
    duration_ms: number;
    timestamp: string;
}
