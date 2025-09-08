import React from 'react';
import { RektonomicsSectionProps } from './types';
import { DEFAULT_TOKENOMICS_DATA, getAssetBundle, getDistributionItems, getTaxBreakdownItems } from './constants';
import { useTranslations } from 'next-intl';
import styles from './RektonomicsSection.module.css';

// Component imports
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
  const t = useTranslations();
  const assets = getAssetBundle(true);
  const distributionItems = getDistributionItems(true, t);
  const taxBreakdownItems = getTaxBreakdownItems();

  return (
    <div className={`${styles.mobileWrapper} ${className || ''}`}>
      {/* Asset Preloader */}
      <AssetPreloader />

      {/* Main Container */}
      <MainContainer className={styles.mainContainer} borderSrc={assets.border}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          {assets.headerAccents && (
            <img
              src={assets.headerAccents}
              alt=""
              aria-hidden="true"
              className={styles.headerAccents}
            />
          )}
          <h2 className={styles.sectionTitle}>{t('sections.rektonomics.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('sections.rektonomics.subtitle')}</p>
          <TotalSupplyBanner
            totalSupply={data.totalSupply.amount}
            tokenSymbol={data.totalSupply.symbol}
            backgroundSrc={assets.totalSupplyBg}
            variant="mobile"
            hideText={true}
          />
        </div>

        {/* Pie Chart */}
        <div className={styles.pieChart}>
          <PieChart data={distributionItems} chartImageSrc={assets.chart} />
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          <MascotCenter gifSrc={assets.mascot} altText="REKT Mascot Animation" />

          <div className={styles.distributionSection}>
            <h3 className={styles.distributionTitle}>{t('sections.rektonomics.distributionTitle')}</h3>
            <DistributionBreakdown items={distributionItems} />
          </div>
        </div>
      </MainContainer>

      {/* Tax Container */}
      <TaxContainer className={styles.taxContainer} backgroundSrc={assets.taxBackground}>
        <TaxInfoSection
          taxPercentage={data.tax.percentage}
          breakdown={taxBreakdownItems}
          variant="mobile"
        />
      </TaxContainer>
    </div>
  );
};

export default RektonomicsMobile;
