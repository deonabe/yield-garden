import { useState } from "react";
import Head from "next/head";
import StrategyCard from "@/components/StrategyCard";
import ComparisonSummary from "@/components/ComparisonSummary";
import { YieldPlanResult } from "@/lib/apySimulator";

export default function ComparePage() {
  const [resultA, setResultA] = useState<YieldPlanResult | null>(null);
  const [resultB, setResultB] = useState<YieldPlanResult | null>(null);

  return (
    <>
      <Head>
        <title>Compare Strategies | Yield Garden</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          🌿 Compare Two Yield Strategies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <StrategyCard
            title="Strategy A"
            defaultToken="USDC"
            defaultAmount={1000}
            defaultApy={0.05}
            defaultMonths={12}
            defaultCompound={true}
            onResult={setResultA}
          />

          <StrategyCard
            title="Strategy B"
            defaultToken="SOL"
            defaultAmount={1000}
            defaultApy={0.12}
            defaultMonths={12}
            defaultCompound={true}
            onResult={setResultB}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <ComparisonSummary strategyA={resultA} strategyB={resultB} />
        </div>
      </main>
    </>
  );
}
