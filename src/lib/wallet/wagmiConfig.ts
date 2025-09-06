"use client";

import { http, createConfig } from "wagmi";
import { mainnet, base, polygon, bsc, arbitrum, optimism } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { walletConnect } from "wagmi/connectors";


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string | undefined;

if (typeof window !== "undefined" && !projectId) {
  console.warn(
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Connect modal will still open but WalletConnect QR may not work."
  );
}

const connectors = [
  injected({ shimDisconnect: true }),
  ...(projectId ? [walletConnect({ projectId, showQrModal: false })] : []),
];

export const wagmiConfig = createConfig({
  chains: [base, mainnet, polygon, bsc, arbitrum, optimism],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  connectors,
});
