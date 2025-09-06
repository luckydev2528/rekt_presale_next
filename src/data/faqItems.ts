export type FAQItem = {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'sell-after-launch',
    question: 'Can I sell everything after launch?',
    answer:
      '30% unlocks at launch, the rest vests over 6 months. Want more early? Rage claim but expect a burn penalty.'
  },
  {
    id: 'rewards-on-locked',
    question: 'Do I earn rewards on locked tokens?',
    answer:
      'Yes! All presale tokens are automatically staked and earning rewards from day one.'
  },
  {
    id: 'after-burn-cap',
    question: 'What happens after the burn cap?',
    answer:
      'Once 200M tokens are burned, the burn mechanism stops. Tax distribution shifts to 50% treasury, 50% staking.'
  },
  {
    id: 'loss-claims-supported',
    question: 'Which tokens can I use for Loss Claims?',
    answer:
      'Any verified loss from DeFi protocols, CEX liquidations, or rug pulls can be claimed with proper verification.'
  },
  {
    id: 'stake-after-presale',
    question: 'Can I stake if I buy after the presale?',
    answer:
      'Absolutely! Staking is available to all $REKT holders, not just presale participants.'
  },
  {
    id: 'claim-amount',
    question: 'How much REKT can I claim from losses?',
    answer:
      'Claims are calculated based on verified loss amount, wallet age, and community tier multipliers.'
  }
]
