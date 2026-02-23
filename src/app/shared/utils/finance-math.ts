import { ProjectionEntry, WealthGapInput, RetirementInput, RetirementResult, RetirementProjectionEntry } from '../types';

/**
 * Calculates the future value of an investment and the erosion caused by inflation.
 * Uses monthly compounding for both returns and inflation for higher precision.
 */
export function calculateWealthGap(input: WealthGapInput): ProjectionEntry[] {
    const {
        initialCapital,
        monthlyContribution,
        annualReturnRate,
        annualInflationRate,
        years,
    } = input;

    const projections: ProjectionEntry[] = [];
    const monthlyReturnRate = annualReturnRate / 100 / 12;
    const monthlyInflationRate = annualInflationRate / 100 / 12;

    let currentNominalBalance = initialCapital;

    // Year 0 entry
    projections.push({
        year: 0,
        nominalBalance: initialCapital,
        realValue: initialCapital,
        gap: 0,
    });

    for (let year = 1; year <= years; year++) {
        // Calculate 12 months of compounding
        for (let month = 1; month <= 12; month++) {
            currentNominalBalance = currentNominalBalance * (1 + monthlyReturnRate) + monthlyContribution;
        }

        // Real Value = Nominal Balance / (1 + i)^n
        // Using annual inflation for simplicity in the real value formula as per common financial standards,
        // but the nominal balance grew with monthly contributions.
        const realValue = currentNominalBalance / Math.pow(1 + annualInflationRate / 100, year);

        projections.push({
            year,
            nominalBalance: Number(currentNominalBalance.toFixed(2)),
            realValue: Number(realValue.toFixed(2)),
            gap: Number((currentNominalBalance - realValue).toFixed(2)),
        });
    }

    return projections;
}

/**
 * Calculates the retirement projection based on target monthly expenses.
 * Identifies the "Freedom Date" (where real value meets target expenses using 4% rule)
 * and the "Run Out Age" (if expenses exceed savings).
 */
export function calculateRetirement(input: RetirementInput): RetirementResult {
    const {
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        expectedReturn,
        inflationRate,
        targetMonthlyExpense,
    } = input;

    const projections: RetirementProjectionEntry[] = [];
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const annualInflation = inflationRate / 100;

    let currentNominalBalance = currentSavings;
    let freedomYear: number | null = null;
    let freedomAge: number | null = null;
    let runOutAge: number | null = null;

    // Projection until age 100 or until money runs out after retirement
    const maxAge = 100;
    const startYear = new Date().getFullYear();

    for (let age = currentAge; age <= maxAge; age++) {
        const yearCount = age - currentAge;
        const isRetired = age >= retirementAge;

        // Real Value in today's money
        const realValue = currentNominalBalance / Math.pow(1 + annualInflation, yearCount);

        // 4% Rule check for Financial Freedom (while still working or just at retirement)
        // The portfolio is "safe" if 4% of real value >= annual expenses
        if (!freedomAge && realValue * 0.04 >= targetMonthlyExpense * 12) {
            freedomAge = age;
            freedomYear = startYear + yearCount;
        }

        projections.push({
            age,
            year: startYear + yearCount,
            nominalBalance: Number(currentNominalBalance.toFixed(2)),
            realValue: Number(realValue.toFixed(2)),
            isRetired
        });

        // Monthly compounding for the next year
        for (let month = 1; month <= 12; month++) {
            if (!isRetired) {
                currentNominalBalance = currentNominalBalance * (1 + monthlyReturnRate) + monthlyContribution;
            } else {
                // In retirement, we withdraw expenses (adjusted for inflation nominally)
                // nominal_expense = today_expense * (1 + inflation)^year
                const nominalMonthlyExpense = targetMonthlyExpense * Math.pow(1 + annualInflation, yearCount);
                currentNominalBalance = currentNominalBalance * (1 + monthlyReturnRate) - nominalMonthlyExpense;
            }
        }

        if (currentNominalBalance < 0) {
            if (isRetired && !runOutAge) {
                runOutAge = age;
            }
            break;
        }
    }

    return {
        freedomYear,
        freedomAge,
        runOutAge,
        projections
    };
}
