import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TotalSupplyBannerProps } from '../types';
import { REKTONOMICS_ASSETS } from '../constants';

import { 
  useOptimizedImage, 
  ImageFallback, 
  getOptimizedImageProps, 
  isAssetCritical,
  getResponsiveSizes 
} from '../utils/assetOptimization';
import styles from './TotalSupplyBanner.module.css';
import fallbackStyles from '../utils/assetOptimization.module.css';

const TotalSupplyBanner: React.FC<TotalSupplyBannerProps> = ({
  totalSupply,
  tokenSymbol,
  backgroundSrc,
  className,
  variant = 'default',
  hideText = false,
}) => {
  const t = useTranslations('sections');
  const src = backgroundSrc ?? REKTONOMICS_ASSETS.totalSupplyBg;
  const critical = isAssetCritical(src);
  const { isLoading, hasError, handleLoad, handleError } = useOptimizedImage({
    src,
    priority: critical,
    preload: critical,
  });

  const imageProps = getOptimizedImageProps({
    src,
    alt: 'Total supply banner background',
    fill: true,
    className: `${styles.backgroundImage} ${isLoading ? fallbackStyles.imageLoading : fallbackStyles.imageLoaded}`,
    priority: critical,
  }, critical);

  const containerClass = [
    styles.totalSupplyBanner,
    variant === 'mobile' ? styles.mobileBanner : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      
      <div className={styles.backgroundContainer}>
        {hasError ? (
          <ImageFallback 
            type="background" 
            className={`${styles.backgroundImage} ${fallbackStyles.assetFallback}`}
          />
        ) : (
          <Image
            {...imageProps}
            onLoad={handleLoad}
            onError={handleError}
            sizes={getResponsiveSizes('banner')}
            alt={imageProps.alt || 'Total supply banner background'}
          />
        )}
      </div>
      
      
      {!hideText && (
        <div className={styles.contentOverlay}>
          <span className={styles.totalSupplyText}>
            {t('rektonomics.totalSupply', { amount: totalSupply, symbol: tokenSymbol })}
          </span>
        </div>
      )}
    </div>
  );
};

export default TotalSupplyBanner;