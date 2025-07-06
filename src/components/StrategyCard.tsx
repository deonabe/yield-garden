import { useState, useEffect } from "react";
import TokenSelector, { TokenInput } from "./TokenSelector";
import YieldChart from "./YieldChart";
import { simulateYieldPlan, YieldPlanResult } from "@/lib/apySimulator";

interface StrategyCardProps {
  title?: string;
  defaultToken?: string;
  defaultAmount?: number;
  defaultApy?: number;
  defaultMonths?: number;
  defaultCompound?: boolean;
  onResult?: (result: YieldPlanResult) => void;
}

export default function StrategyCard({
  title = "Strategy",
  defaultToken = "USDC",
  defaultAmount = 1000,
  defaultApy = 0.12,
  defaultMonths = 12,
  defaultCompound = true,
  onResult,
}: StrategyCardProps) {
  const [tokenInput, setTokenInput] = useState<TokenInput>({
    token: defaultToken,
    amount: defaultAmount,
  });

  const [apy, setApy] = useState(defaultApy);
  const [months, setMonths] = useState(defaultMonths);
  const [compound, setCompound] = useState(defaultCompound);
  const [result, setResult] = useState<YieldPlanResult | null>(null);

  useEffect(() => {
    const sim = simulateYieldPlan({
      initialAmount: tokenInput.amount,
      apy,
      months,
      compoundMonthly: compound,
    });
    setResult(sim);
    onResult?.(sim);
  }, [tokenInput, apy, months, compound]);

  return (
    <div className="border p-6 rounded-md shadow-md bg-white w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-4">
        <TokenSelector onChange={setTokenInput} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
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

          <div className="flex items-center mt-2 sm:col-span-2">
            <input
              id={`${title}-compound`}
              type="checkbox"
              className="mr-2"
              checked={compound}
              onChange={(e) => setCompound(e.target.checked)}
            />
            <label htmlFor={`${title}-compound`} className="font-medium">
              Compound Monthly
            </label>
          </div>
        </div>
      </div>

      {result && (
        <>
          <YieldChart data={result} />
          <div className="text-center text-lg font-medium mt-4">
            📈 Final Value:{" "}
            <span className="text-emerald-600">${result.finalValue.toFixed(2)}</span>
            <br />
            💰 Total Yield:{" "}
            <span className="text-emerald-600">${result.totalYield.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
