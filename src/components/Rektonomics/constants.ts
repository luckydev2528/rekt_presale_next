  import { RektonomicsAssets, TokenomicsData, DistributionItem, TaxBreakdownItem, RektonomicsMobileAssets } from './types';
export const REKTONOMICS_ASSETS: RektonomicsAssets = {
  border: '/assets/Rektonomics/frame_rektonomics.webp',
  totalSupplyBg: '/assets/Rektonomics/total supply background.svg',
  mascotGif: '/assets/Rektonomics/main gif in the rektonomics put it the middle.gif',
  pieChart: '/assets/Rektonomics/tokenomics chart.webp',
  taxBackground: '/assets/Rektonomics/tax.webp',
  distributionLines: {
    presale: '/assets/Rektonomics/presale line.svg',
    treasury: '/assets/Rektonomics/treasury line.svg',
    liquidity: '/assets/Rektonomics/liquidity line.svg',
    staking: '/assets/Rektonomics/Staking pool line.svg',
    community: '/assets/Rektonomics/community fund line.svg',
  },

  alternativeMascots: {
    mainGif: '/assets/Rektonomics/main gif in the rektonomics put it the middle.gif',
    coindustGif: '/assets/Rektonomics/rek_coindust1 in the middle of the tokenomics.gif',
  },
  alternativeCharts: {
    rektonomicsChart: '/assets/Rektonomics/tokenomics chart.webp',
  },
  additionalAssets: {
    alternativeBorder: '/assets/Rektonomics/233cec39dec809a95b0f5b6c99908077fd634b28.webp',
    groupElement: '/assets/Rektonomics/Group 2648.svg',
  },
};


export const REKTONOMICS_MOBILE_ASSETS: RektonomicsMobileAssets = {
  border: '/assets/Mobileview/rektonomics/borderframerektonomics.svg',
  totalSupplyBg: '/assets/Mobileview/rektonomics/totalsupplybackground.svg',
  mascotGif: '/assets/Mobileview/rektonomics/macot-donut-gif.gif',
  pieChart: '/assets/Mobileview/rektonomics/chart.svg',
  taxBackground: '/assets/Mobileview/rektonomics/tax.svg',
  distributionLines: {
    presale: '/assets/Mobileview/rektonomics/Presale Line.svg',
    treasury: '/assets/Mobileview/rektonomics/Treasuryline.svg',
    liquidity: '/assets/Mobileview/rektonomics/Liquiditypool.svg',
    staking: '/assets/Mobileview/rektonomics/Stakingpool.svg',
    community: '/assets/Mobileview/rektonomics/communityfundline.svg',
  },
};


export const DEFAULT_TOKENOMICS_DATA: TokenomicsData = {
  totalSupply: {
    amount: '1,000,000,000',
    symbol: '$REKT',
  },
  distribution: {
    presale: 50,
    treasury: 20,
    liquidityPool: 15,
    stakingPool: 10,
    communityFund: 5,
  },
  tax: {
    percentage: 1,
    breakdown: {
      stakingPool: 50,
      treasury: 25,
      burn: 25,
    },
    burnCapDescription: 'Once 200M $REKT have been burned, burning will stop permanently. 50% will go to the treasury, and 50% will go to staking to encourage long-term growth.',
  },
};


export const DISTRIBUTION_ITEMS: DistributionItem[] = [
  {
    name: 'Presale',
    percentage: DEFAULT_TOKENOMICS_DATA.distribution.presale,
    svgAsset: REKTONOMICS_ASSETS.distributionLines.presale,
    color: '#8c5dff',
  },
  {
    name: 'Treasury',
    percentage: DEFAULT_TOKENOMICS_DATA.distribution.treasury,
    svgAsset: REKTONOMICS_ASSETS.distributionLines.treasury,
    color: '#00d1ff',
  },
  {
    name: 'Liquidity Pool',
    percentage: DEFAULT_TOKENOMICS_DATA.distribution.liquidityPool,
    svgAsset: REKTONOMICS_ASSETS.distributionLines.liquidity,
    color: '#007bff',
  },
  {
    name: 'Staking Pool',
    percentage: DEFAULT_TOKENOMICS_DATA.distribution.stakingPool,
    svgAsset: REKTONOMICS_ASSETS.distributionLines.staking,
    color: '#0052cc', 
  },
  {
    name: 'Community Fund',
    percentage: DEFAULT_TOKENOMICS_DATA.distribution.communityFund,
    svgAsset: REKTONOMICS_ASSETS.distributionLines.community,
    color: '#4dc3ff', 
  },
];


export const getAssetBundle = (isMobile: boolean = false) => {
  const src = isMobile ? REKTONOMICS_MOBILE_ASSETS : REKTONOMICS_ASSETS;
  return {
    mascot: src.mascotGif,
    chart: src.pieChart,
    border: src.border,
    totalSupplyBg: src.totalSupplyBg,
    taxBackground: src.taxBackground,
 
    headerAccents: 'headerAccents' in src ? src.headerAccents : undefined,
  };
};

export const getDistributionItems = (isMobile: boolean = false, t?: (key: string) => string): DistributionItem[] => {
  const src = isMobile ? REKTONOMICS_MOBILE_ASSETS : REKTONOMICS_ASSETS;
  return [
    {
      name: t ? t('distribution.presale') : 'Presale',
      percentage: DEFAULT_TOKENOMICS_DATA.distribution.presale,
      svgAsset: src.distributionLines.presale,
      color: '#8c5dff',
    },
    {
      name: t ? t('distribution.treasury') : 'Treasury',
      percentage: DEFAULT_TOKENOMICS_DATA.distribution.treasury,
      svgAsset: src.distributionLines.treasury,
      color: '#00d1ff',
    },
    {
      name: t ? t('distribution.liquidityPool') : 'Liquidity Pool',
      percentage: DEFAULT_TOKENOMICS_DATA.distribution.liquidityPool,
      svgAsset: src.distributionLines.liquidity,
      color: '#007bff',
    },
    {
      name: t ? t('distribution.stakingPool') : 'Staking Pool',
      percentage: DEFAULT_TOKENOMICS_DATA.distribution.stakingPool,
      svgAsset: src.distributionLines.staking,
      color: '#0052cc',
    },
    {
      name: t ? t('distribution.communityFund') : 'Community Fund',
      percentage: DEFAULT_TOKENOMICS_DATA.distribution.communityFund,
      svgAsset: src.distributionLines.community,
      color: '#4dc3ff',
    },
  ];
};


export const getTaxBreakdownItems = (): TaxBreakdownItem[] => [
  {
    name: 'stakingPool',
    percentage: DEFAULT_TOKENOMICS_DATA.tax.breakdown.stakingPool,
    color: '#00ff41',
  },
  {
    name: 'treasury',
    percentage: DEFAULT_TOKENOMICS_DATA.tax.breakdown.treasury,
    color: '#00ff41',
  },
  {
    name: 'burn',
    percentage: DEFAULT_TOKENOMICS_DATA.tax.breakdown.burn,
    color: '#ff1744', 
    description: 'burnCapReached'
  },
];


export const REKTONOMICS_COLORS = {
  primaryBackground: '#1a0f2b',
  containerBackground: '#2a1a45',
  vibrantPurple: '#8a2be2',
  brightCyan: '#00ffff',
  hotPink: '#ff007f',
  primaryText: '#ffffff',
  secondaryText: '#a9a9a9',
  dataViz: {
    chartPurple: '#8c5dff',
    chartCyan: '#00d1ff',
    chartBlue: '#007bff',
    chartDeepBlue: '#0052cc',
    chartLightBlue: '#4dc3ff',
  },
} as const;


export const SPACING = {
  baseUnit: 8,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
} as const;


export const ASSET_OPTIONS = {

  MASCOTS: {
    COINDUST: REKTONOMICS_ASSETS.alternativeMascots?.coindustGif || REKTONOMICS_ASSETS.mascotGif,
    MAIN: REKTONOMICS_ASSETS.alternativeMascots?.mainGif || '/assets/Rektonomics/main gif in the rektonomics put it the middle.gif',
  },
  

  CHARTS: {
    REKTONOMICS: REKTONOMICS_ASSETS.alternativeCharts?.rektonomicsChart || '/assets/Rektonomics/tokenomics chart.webp',
  },
} as const;


export const getCurrentAssets = () => ({
  mascot: REKTONOMICS_ASSETS.mascotGif,
  chart: REKTONOMICS_ASSETS.pieChart,
  border: REKTONOMICS_ASSETS.border,
  totalSupplyBg: REKTONOMICS_ASSETS.totalSupplyBg,
  taxBackground: REKTONOMICS_ASSETS.taxBackground,
});


export const validateAssets = () => {
  const requiredAssets = [
    REKTONOMICS_ASSETS.border,
    REKTONOMICS_ASSETS.totalSupplyBg,
    REKTONOMICS_ASSETS.mascotGif,
    REKTONOMICS_ASSETS.pieChart,
    REKTONOMICS_ASSETS.taxBackground,
    ...Object.values(REKTONOMICS_ASSETS.distributionLines),
  ];
  
  return requiredAssets.every(asset => asset && asset.length > 0);
};