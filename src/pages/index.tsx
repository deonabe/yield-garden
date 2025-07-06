import Head from "next/head";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { simulateYieldPlan } from "@/lib/apySimulator";
import YieldChart from "@/components/YieldChart";
import StrategyBuilder from "@/components/StrategyBuilder";
import StrategyCard from "@/components/StrategyCard";

const samplePlan = simulateYieldPlan({
  initialAmount: 1000,
  apy: 0.15,
  months: 12,
  compoundMonthly: true,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Yield Garden</title>
      </Head>
      <main className="min-h-screen bg-white text-black px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <section className="space-y-4">
            <ConnectWalletButton />
            <YieldChart data={samplePlan} />
            <StrategyBuilder />
            <StrategyCard title="My Yield Strategy" />
            <p className="text-lg text-center">
              Plan your crypto yield strategy visually using real DeFi APY data. 🌱
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

