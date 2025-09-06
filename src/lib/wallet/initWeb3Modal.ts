"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { wagmiConfig } from "./wagmiConfig";

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
