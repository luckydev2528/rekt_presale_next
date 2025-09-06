"use client";

import { ReactNode, useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { wagmiConfig } from "./wagmiConfig";

interface Props {
  children: ReactNode;
}

let queryClientSingleton: QueryClient | null = null;


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";
if (typeof window !== "undefined" && projectId) {
  const w = window as Window & typeof globalThis & { __W3M_INITIALIZED__?: boolean };
  if (!w.__W3M_INITIALIZED__) {
    try {
      createWeb3Modal({
        wagmiConfig,
        projectId,
        enableAnalytics: false,
        themeMode: "dark",
      });
      w.__W3M_INITIALIZED__ = true;
    } catch {

    }
  }
}

export default function Web3Providers({ children }: Props) {
  const queryClient = useMemo(() => {
    if (!queryClientSingleton) {
      queryClientSingleton = new QueryClient();
    }
    return queryClientSingleton;
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
