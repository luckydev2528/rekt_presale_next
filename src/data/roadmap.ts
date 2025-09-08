export interface Phase {
  titleKey: string;
  goalKey: string;
  itemKeys: string[];
}

export const phases: Phase[] = [
  {
    titleKey: 'roadmap.phases.phase1.title',
    goalKey: 'roadmap.phases.phase1.goal',
    itemKeys: [
      'roadmap.phases.phase1.items.smartContract',
      'roadmap.phases.phase1.items.socialMedia',
      'roadmap.phases.phase1.items.dashboard',
      'roadmap.phases.phase1.items.autoStaking',
      'roadmap.phases.phase1.items.lossClaim',
      'roadmap.phases.phase1.items.audit'
    ]
  },
  {
    titleKey: 'roadmap.phases.phase2.title',
    goalKey: 'roadmap.phases.phase2.goal',
    itemKeys: [
      'roadmap.phases.phase2.items.dexTax',
      'roadmap.phases.phase2.items.rageClaim',
      'roadmap.phases.phase2.items.leaderboard',
      'roadmap.phases.phase2.items.lossClaimV2',
      'roadmap.phases.phase2.items.burnTracker',
      'roadmap.phases.phase2.items.nftDrop'
    ]
  },
  {
    titleKey: 'roadmap.phases.phase3.title',
    goalKey: 'roadmap.phases.phase3.goal',
    itemKeys: [
      'roadmap.phases.phase3.items.cexOutreach',
      'roadmap.phases.phase3.items.memeWars',
      'roadmap.phases.phase3.items.rektLabs',
      'roadmap.phases.phase3.items.finalAudit'
    ]
  }
];
