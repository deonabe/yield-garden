import { YieldPlanResult } from "@/lib/apySimulator";

interface ComparisonSummaryProps {
  strategyA: YieldPlanResult | null;
  strategyB: YieldPlanResult | null;
}

export default function ComparisonSummary({ strategyA, strategyB }: ComparisonSummaryProps) {
  if (!strategyA || !strategyB) return null;

  const diff = strategyB.finalValue - strategyA.finalValue;
  const pct = (diff / strategyA.finalValue) * 100;

  const winner = diff > 0 ? "Strategy B" : diff < 0 ? "Strategy A" : "Both strategies";
  const direction = diff > 0 ? "outperformed" : diff < 0 ? "underperformed" : "performed equally";

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 text-center mt-6 shadow-sm">
      <p className="text-lg font-medium">
        {winner} {direction} by{" "}
        <span className="font-bold text-emerald-600">
          ${Math.abs(diff).toFixed(2)} ({Math.abs(pct).toFixed(2)}%)
        </span>
      </p>
    </div>
  );
}
