import React from 'react';
import { RektonomicsSectionProps } from './types';
import { DEFAULT_TOKENOMICS_DATA, TAX_BREAKDOWN_ITEMS, getAssetBundle, getDistributionItems } from './constants';
import styles from './RektonomicsSection.module.css';


import MainContainer from './components/MainContainer';
import TaxContainer from './components/TaxContainer';
import TotalSupplyBanner from './components/TotalSupplyBanner';
import DistributionBreakdown from './components/DistributionBreakdown';
import MascotCenter from './components/MascotCenter';
import PieChart from './components/PieChart';
import TaxInfoSection from './components/TaxInfoSection';
import AssetPreloader from './components/AssetPreloader';


const RektonomicsMobile: React.FC<RektonomicsSectionProps> = ({
  data = DEFAULT_TOKENOMICS_DATA,
  className = '',
}) => {

  const assets = getAssetBundle(true);
  const distributionItems = getDistributionItems(true);

  return (
    <div className={`${styles.mobileWrapper} ${className || ''}`}>

      <AssetPreloader />


      <MainContainer className={styles.mainContainer} borderSrc={assets.border}>

        <div className={styles.headerSection}>
          {assets.headerAccents && (
            <img
              src={assets.headerAccents}
              alt=""
              aria-hidden="true"
              className={styles.headerAccents}
            />
          )}
          <h2 className={styles.sectionTitle}>Rektonomics</h2>
          <p className={styles.sectionSubtitle}>Fair distribution for maximum chaos</p>
          <TotalSupplyBanner
            totalSupply={data.totalSupply.amount}
            tokenSymbol={data.totalSupply.symbol}
            backgroundSrc={assets.totalSupplyBg}
            variant="mobile"
            hideText={true}
          />
        </div>

        
        <div className={styles.pieChart}>
          <PieChart data={distributionItems} chartImageSrc={assets.chart} />
        </div>

        
        <div className={styles.contentGrid}>
          <MascotCenter gifSrc={assets.mascot} altText="REKT Mascot Animation" />

          <div className={styles.distributionSection}>
            <h3 className={styles.distributionTitle}>Distribution Breakdown</h3>
            <DistributionBreakdown items={distributionItems} />
          </div>
        </div>
      </MainContainer>

      
      <TaxContainer className={styles.taxContainer} backgroundSrc={assets.taxBackground}>
        <TaxInfoSection
          taxPercentage={data.tax.percentage}
          breakdown={TAX_BREAKDOWN_ITEMS}
          description={data.tax.burnCapDescription}
          variant="mobile"
        />
      </TaxContainer>
    </div>
  );
};

export default RektonomicsMobile;
