"use client"

import { ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl, type Cluster } from "@solana/web3.js"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  CoinbaseWalletAdapter,
  MathWalletAdapter,
  TokenaryWalletAdapter,
  BitgetWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { SOLANA_CLUSTER, SOLANA_RPC_URL } from "./solanaConfig"


interface Props {
  children: ReactNode
}

export default function SolanaProviders({ children }: Props) {
  const endpoint = useMemo(() => {
    if (SOLANA_RPC_URL) return SOLANA_RPC_URL
    const isCluster = (v: string): v is Cluster => v === 'devnet' || v === 'testnet' || v === 'mainnet-beta'
    const cluster: Cluster = isCluster(SOLANA_CLUSTER) ? SOLANA_CLUSTER : 'mainnet-beta'
    return clusterApiUrl(cluster)
  }, [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new MathWalletAdapter(),
      new TokenaryWalletAdapter(),
      new BitgetWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
