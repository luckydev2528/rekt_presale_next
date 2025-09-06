
export interface TokenomicsData {
  totalSupply: {
    amount: string;
    symbol: string;
  };
  distribution: {
    presale: number;
    treasury: number;
    liquidityPool: number;
    stakingPool: number;
    communityFund: number;
  };
  tax: {
    percentage: number;
    breakdown: {
      stakingPool: number;
      treasury: number;
      burn: number;
    };
    burnCapDescription: string;
  };
}


export interface RektonomicsAssets {
  border: string;
  totalSupplyBg: string;
  mascotGif: string;
  pieChart: string;
  taxBackground: string;
  distributionLines: {
    presale: string;
    treasury: string;
    liquidity: string;
    staking: string;
    community: string;
  };

  alternativeMascots?: {
    mainGif: string;
    coindustGif: string;
  };
  alternativeCharts?: {
    rektonomicsChart: string;
  };
  additionalAssets?: {
    alternativeBorder: string;
    groupElement: string;
  };
}


export interface RektonomicsMobileAssets {
  border: string;
  totalSupplyBg: string;
  mascotGif: string;
  pieChart: string;
  taxBackground: string;
  headerAccents?: string;
  distributionLines: {
    presale: string;
    treasury: string;
    liquidity: string;
    staking: string;
    community: string;
  };
}


export interface DistributionItem {
  name: string;
  percentage: number;
  svgAsset: string;
  color?: string;
}


export interface TaxBreakdownItem {
  name: string;
  percentage: number;
  color: string;
  description?: string;
}


export interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
  borderSrc?: string;
}

export interface TotalSupplyBannerProps {
  totalSupply: string;
  tokenSymbol: string;
  backgroundSrc?: string;
  className?: string;
  variant?: 'default' | 'mobile';
  hideText?: boolean;
}

export interface DistributionBreakdownProps {
  items: DistributionItem[];
}

export interface MascotCenterProps {
  gifSrc: string;
  altText: string;
}

export interface PieChartProps {
  data: DistributionItem[];
  chartImageSrc: string;
}

export interface TaxInfoSectionProps {
  taxPercentage: number;
  breakdown: TaxBreakdownItem[];
  description: string;
  variant?: 'default' | 'mobile';
}

export interface TaxContainerProps {
  children: React.ReactNode;
  className?: string;
  backgroundSrc?: string;
}

export interface RektonomicsSectionProps {
  data?: TokenomicsData;
  className?: string;
}