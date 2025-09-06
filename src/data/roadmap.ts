export interface Phase {
  title: string;
  goal: string;
  items: string[];
}

export const phases: Phase[] = [
  {
    title: 'Launch & Foundation',
    goal: 'Fair launch, instant staking, lean & meme-ready setup.',
    items: [
      'Deploying Smart Contract.',
      'Open X (Twitter) & Telegram.',
      'Dashboard: REKT Score Leaderboard, Vesting Tracker, Staking Reward, Burn Cap.',
      'Auto Staking For All Presale Tokens, Start Earning From Day One.',
      'Loss Claim V1 (Only For Presale Investors From $350 Transaction, 1 Claim Per Wallet, On-Chain Verified).',
      'Solidproof Audit.'
    ]
  },
  {
    title: 'Utility & REKT Logic',
    goal: 'Activate tokenomics, engage stakers, drive on-chain volume.',
    items: [
      '1% Dex Tax: 50% Staking, 25% Treasury, And 25% Burn (Until 200M Burned).',
      'Rage Claim Penalties Scale Over Time (20% -> 5%).',
      'REKT Score Leaderboard.',
      'Loss Claim V2: Wallet Age Multiplies, Cooldowns.',
      'Burn Cap Tracker + Live Staking Stats.',
      'Optional NFT Drop To Refill Staking Pool.'
    ]
  },
  {
    title: 'Scaling & Community Chaos',
    goal: 'Meme-powered growth and ecosystem expansion.',
    items: [
      'CEX Outreach (Solana-Friendly).',
      'MEME Wars: Community Leaderboard + Airdrops.',
      'Rekt Labs: Experimental Staking/NFT Features.',
      'Final Audit (Certik Or Ottersec).'
    ]
  }
];
