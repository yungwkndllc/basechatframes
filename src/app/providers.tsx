"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import merge from "lodash.merge";

const { wallets } = getDefaultWallets();

coinbaseWallet.preference = "all";

const myTheme = merge(darkTheme(), {
  colors: {
    connectButtonBackground: "#2151f5",
    connectButtonInnerBackground: "#2151f5",
    closeButtonBackground: "#2151f5",
    modalBackground: "#2151f5",
    accentColor: "#2151f5",
  },
} as Theme);

const config = getDefaultConfig({
  appName: "basechat",
  projectId: "a601a67d73adedaf21f65300af9e9ca8",
  wallets: [
    ...wallets,
    {
      groupName: "Popular",
      wallets: [coinbaseWallet],
    },
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [base],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
