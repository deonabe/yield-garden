import { useState, useEffect } from "react";
import { simulateYieldPlan, YieldPlanResult } from "@/lib/apySimulator";
import YieldChart from "./YieldChart";
import TokenSelector, { TokenInput } from "./TokenSelector";

export default function StrategyBuilder() {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [apy, setApy] = useState(0.12);
  const [months, setMonths] = useState(12);
  const [compound, setCompound] = useState(true);
  const [result, setResult] = useState<YieldPlanResult | null>(null);
  const [tokenInput, setTokenInput] = useState<TokenInput>({
    token: "USDC",
    amount: 1000,
  });
  
  useEffect(() => {
    const sim = simulateYieldPlan({
      initialAmount: tokenInput.amount,
      apy,
      months,
      compoundMonthly: compound,
    });
    setResult(sim);
  }, [tokenInput, apy, months, compound]);

  return (
    <section className="max-w-2xl mx-auto mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TokenSelector onChange={setTokenInput} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block font-medium mb-1">APY (%)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={apy * 100}
            onChange={(e) => setApy(Number(e.target.value) / 100)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Duration (months)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center mt-6">
          <input
            id="compound"
            type="checkbox"
            className="mr-2"
            checked={compound}
            onChange={(e) => setCompound(e.target.checked)}
          />
          <label htmlFor="compound" className="font-medium">Compound Monthly</label>
        </div>
      </div>

      {result && (
        <>
          <YieldChart data={result} />
          <div className="text-center text-lg font-medium mt-4">
            📈 Final Value: <span className="text-emerald-600">${result.finalValue.toFixed(2)}</span><br />
            💰 Total Yield: <span className="text-emerald-600">${result.totalYield.toFixed(2)}</span>
          </div>
        </>
      )}
    </section>
  );
}
