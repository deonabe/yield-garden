"use client";

import { FC, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletAdapterNetwork
} from "@solana/wallet-adapter-base";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => "https://api.devnet.solana.com", []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
