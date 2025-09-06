import React from 'react';
import { RektonomicsSectionProps } from './types';
import { DEFAULT_TOKENOMICS_DATA, TAX_BREAKDOWN_ITEMS, getAssetBundle, getDistributionItems } from './constants';
import { useIsMobile } from './utils/useIsMobile';
import { useTranslations } from 'next-intl';
import styles from './RektonomicsSection.module.css';


import MainContainer from './components/MainContainer';
import TaxContainer from './components/TaxContainer';
import TotalSupplyBanner from './components/TotalSupplyBanner';
import DistributionBreakdown from './components/DistributionBreakdown';
import MascotCenter from './components/MascotCenter';
import PieChart from './components/PieChart';
import TaxInfoSection from './components/TaxInfoSection';
import AssetPreloader from './components/AssetPreloader';
import RektonomicsMobile from './RektonomicsMobile';

const RektonomicsSection: React.FC<RektonomicsSectionProps> = ({
  data = DEFAULT_TOKENOMICS_DATA,
  className = '',
}) => {
  const isMobile = useIsMobile();
  const t = useTranslations('sections');
  

  if (isMobile) {
    return (
      <section className={`relative ${styles.rektonomicsSection} ${className}`}>
        <div className="relative w-full p-0 m-0">
          <RektonomicsMobile data={data} className="" />
        </div>
      </section>
    );
  }


  const assets = getAssetBundle(false);
  const distributionItems = getDistributionItems(false);

  return (
    <section className={`${styles.rektonomicsSection} ${className}`}>

      <AssetPreloader />
      
      
      <MainContainer className={styles.mainContainer} borderSrc={assets.border}>
        
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>{t('rektonomics.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('rektonomics.subtitle')}</p>
          <TotalSupplyBanner
            totalSupply={data.totalSupply.amount}
            tokenSymbol={data.totalSupply.symbol}
            backgroundSrc={assets.totalSupplyBg}
          />
        </div>

        
        <div className={styles.contentGrid}>
          <div className={styles.distributionSection}>
            <h3 className={styles.distributionTitle}>{t('rektonomics.distributionTitle')}</h3>
            <DistributionBreakdown items={distributionItems} />
          </div>
          <MascotCenter
            gifSrc={assets.mascot}
            altText="REKT Mascot Animation"
          />
          <div className={styles.pieChart}>
            <PieChart
              data={distributionItems}
              chartImageSrc={assets.chart}
            />
          </div>
        </div>
      </MainContainer>

      
      <TaxContainer className={styles.taxContainer}>
        <TaxInfoSection
          taxPercentage={data.tax.percentage}
          breakdown={TAX_BREAKDOWN_ITEMS}
          description={data.tax.burnCapDescription}
        />
      </TaxContainer>
    </section>
  );
};

export default RektonomicsSection;