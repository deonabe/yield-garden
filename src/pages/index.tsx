import Head from "next/head";
import Header from "@/components/Header";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { simulateYieldPlan } from "@/lib/apySimulator";
import YieldChart from "@/components/YieldChart";
import StrategyBuilder from "@/components/StrategyBuilder";

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
      <main className="min-h-screen p-4 bg-white text-black">
        <Header />
        <section className="mt-8">
          <ConnectWalletButton />
          <YieldChart data={samplePlan} />
          <StrategyBuilder />
          <p className="mt-4 text-lg">
            Plan your crypto yield strategy visually using real DeFi APY data. 🌱
          </p>
        </section>
      </main>
    </>
  );
}
