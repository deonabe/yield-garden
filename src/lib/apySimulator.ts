// src/lib/apySimulator.ts

export interface YieldPlanInput {
    initialAmount: number;      // e.g. 1000 USDC
    apy: number;                // e.g. 0.12 for 12%
    months: number;             // e.g. 12 months
    compoundMonthly?: boolean; // true = compounding monthly, false = simple
  }
  
  export interface YieldPlanResult {
    timeline: { month: number; value: number }[];
    finalValue: number;
    totalYield: number;
  }
  
  /**
   * Simulates a yield plan over time.
   */
  export function simulateYieldPlan(input: YieldPlanInput): YieldPlanResult {
    const { initialAmount, apy, months, compoundMonthly = true } = input;
  
    const monthlyRate = apy / 12;
    let currentValue = initialAmount;
    const timeline = [];
  
    for (let month = 1; month <= months; month++) {
      if (compoundMonthly) {
        currentValue *= (1 + monthlyRate);
      } else {
        currentValue += initialAmount * monthlyRate;
      }
  
      timeline.push({
        month,
        value: parseFloat(currentValue.toFixed(2))
      });
    }
  
    const totalYield = parseFloat((currentValue - initialAmount).toFixed(2));
    const finalValue = parseFloat(currentValue.toFixed(2));
  
    return {
      timeline,
      finalValue,
      totalYield
    };
  }
  