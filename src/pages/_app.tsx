import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Header from "@/components/Header"; // 👈 import your header

const WalletConnectionProvider = dynamic(
  () => import("@/context/WalletContext").then((mod) => mod.WalletConnectionProvider),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <Header /> {/* globally applied */}
      <Component {...pageProps} />
    </WalletConnectionProvider>
  );
}
