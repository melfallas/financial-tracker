import { describe, it, expect } from 'vitest';
import { calculateWealthGap, calculateRetirement } from './finance-math';
import { WealthGapInput, RetirementInput, RetirementProjectionEntry } from '../types';

describe('FinanceMath Utils', () => {
    describe('calculateWealthGap', () => {
        it('should calculate future value correctly with simple interest (0 inflation)', () => {
            const input: WealthGapInput = {
                initialCapital: 1000,
                monthlyContribution: 0,
                annualReturnRate: 10, // 10%
                annualInflationRate: 0,
                years: 1,
            };

            const result = calculateWealthGap(input);
            const lastEntry = result[result.length - 1];

            // 1000 * (1.1) = 1100 approx (depending on monthly compounding)
            // With monthly compounding: 1000 * (1 + 0.1/12)^12 = 1104.71
            expect(lastEntry.nominalBalance).toBeCloseTo(1104.71, 1);
            expect(lastEntry.realValue).toBeCloseTo(1104.71, 1);
            expect(lastEntry.gap).toBe(0);
        });

        it('should calculate wealth gap correctly with inflation', () => {
            const input: WealthGapInput = {
                initialCapital: 10000,
                monthlyContribution: 500,
                annualReturnRate: 8,
                annualInflationRate: 3,
                years: 10,
            };

            const result = calculateWealthGap(input);
            expect(result.length).toBe(11); // Year 0 to Year 10

            const lastEntry = result[10];
            // Nominal balance should be much higher than real value
            expect(lastEntry.nominalBalance).toBeGreaterThan(lastEntry.realValue);
            expect(lastEntry.gap).toBeCloseTo(lastEntry.nominalBalance - lastEntry.realValue, 2);
        });

        it('should handle zero initial capital and only monthly contributions', () => {
            const input: WealthGapInput = {
                initialCapital: 0,
                monthlyContribution: 1000,
                annualReturnRate: 6,
                annualInflationRate: 2,
                years: 5,
            };

            const result = calculateWealthGap(input);
            expect(result[0].nominalBalance).toBe(0);
            expect(result[5].nominalBalance).toBeGreaterThan(60000); // 1000 * 12 * 5 = 60000 + interest
        });
    });

    describe('calculateRetirement', () => {
        it('should calculate freedom date when savings meet target expenses', () => {
            const input: RetirementInput = {
                currentAge: 30,
                retirementAge: 65,
                currentSavings: 50000,
                monthlyContribution: 2000,
                expectedReturn: 8,
                inflationRate: 3,
                targetMonthlyExpense: 4000,
            };

            const result = calculateRetirement(input);

            expect(result.freedomYear).toBeDefined();
            expect(result.freedomAge).toBeGreaterThan(30);
            expect(result.projections.length).toBeGreaterThan(0);

            const freedomEntry = result.projections.find((p: RetirementProjectionEntry) => p.age === result.freedomAge);
            expect(freedomEntry).toBeDefined();
            // At freedom age, real value * 0.04 (4% rule) should roughly cover expenses
            // Or by reaching the target expense line
        });

        it('should return null freedom date if inflation >= return', () => {
            const input: RetirementInput = {
                currentAge: 30,
                retirementAge: 65,
                currentSavings: 10000,
                monthlyContribution: 100,
                expectedReturn: 3,
                inflationRate: 3,
                targetMonthlyExpense: 5000,
            };

            const result = calculateRetirement(input);
            expect(result.freedomYear).toBeNull();
        });

        it('should calculate runOutAge when savings are depleted in retirement', () => {
            const input: RetirementInput = {
                currentAge: 60,
                retirementAge: 65,
                currentSavings: 100000,
                monthlyContribution: 0,
                expectedReturn: 2, // Low return
                inflationRate: 5,  // High inflation
                targetMonthlyExpense: 5000, // High expense
            };

            const result = calculateRetirement(input);
            expect(result.runOutAge).toBeDefined();
            expect(result.runOutAge).toBeGreaterThanOrEqual(65);
        });

        it('should handle money running out before retirement', () => {
            const input: RetirementInput = {
                currentAge: 30,
                retirementAge: 65,
                currentSavings: 100,
                monthlyContribution: -1000, // Forcing depletion
                expectedReturn: 0,
                inflationRate: 0,
                targetMonthlyExpense: 1000,
            };

            const result = calculateRetirement(input);
            expect(result.runOutAge).toBeNull();
            expect(result.projections.length).toBeLessThan(35); // Should break at first year
        });
    });
});
