import React from 'react';
import Image from 'next/image';
import { MainContainerProps } from '../types';
import { REKTONOMICS_ASSETS } from '../constants';
import { 
  useOptimizedImage, 
  ImageFallback, 
  getOptimizedImageProps, 
  isAssetCritical,
  getResponsiveSizes 
} from '../utils/assetOptimization';
import styles from './MainContainer.module.css';
import fallbackStyles from '../utils/assetOptimization.module.css';

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className = '',
  borderSrc,
}) => {
  const src = borderSrc ?? REKTONOMICS_ASSETS.border;
  const critical = isAssetCritical(src);
  const { isLoading, hasError, handleLoad, handleError } = useOptimizedImage({
    src,
    priority: critical,
    preload: critical,
  });

  const imageProps = getOptimizedImageProps({
    src,
    alt: 'Futuristic container border decoration',
    fill: true,
    className: `${styles.borderImage} ${isLoading ? fallbackStyles.imageLoading : fallbackStyles.imageLoaded}`,
    priority: critical,
  }, critical);

  return (
    <div className={`${styles.mainContainer} ${className}`}>
      
      <div className={styles.borderOverlay}>
        {hasError ? (
          <ImageFallback 
            type="border" 
            className={`${styles.borderImage} ${fallbackStyles.assetFallback}`}
          />
        ) : (
          <Image
            {...imageProps}
            onLoad={handleLoad}
            onError={handleError}
            sizes={getResponsiveSizes('background')}
            alt={imageProps.alt || 'Futuristic container border decoration'}
          />
        )}
      </div>
      
      
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;