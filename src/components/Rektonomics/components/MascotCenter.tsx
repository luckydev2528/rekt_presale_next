import React from 'react';
import Image from 'next/image';
import { MascotCenterProps } from '../types';
import { 
  useOptimizedImage, 
  ImageFallback, 
  getOptimizedImageProps, 
  isAssetCritical,
  getResponsiveSizes 
} from '../utils/assetOptimization';
import styles from './MascotCenter.module.css';
import fallbackStyles from '../utils/assetOptimization.module.css';

const MascotCenter: React.FC<MascotCenterProps> = ({
  gifSrc,
  altText,
}) => {
  const { isLoading, hasError, handleLoad, handleError } = useOptimizedImage({
    src: gifSrc,
    priority: false, // Not critical for initial page load
    preload: false,
  });

  const imageProps = getOptimizedImageProps({
    src: gifSrc,
    alt: altText || 'REKT mascot character animation',
    width: 200,
    height: 200,
    className: `${styles.mascotGif} ${isLoading ? fallbackStyles.imageLoading : fallbackStyles.imageLoaded}`,
    priority: false,
    unoptimized: true, // Preserve GIF animation
  }, isAssetCritical(gifSrc));

  return (
    <div className={styles.mascotCenter}>
      {hasError ? (
        <ImageFallback 
          type="mascot" 
          className={`${styles.mascotGif} ${fallbackStyles.assetFallback}`}
        >
          <div className={styles.errorFallback}>
            <div className={fallbackStyles.fallbackContent}>
              <span className={fallbackStyles.fallbackIcon} aria-hidden="true">🤖</span>
              <span className={fallbackStyles.fallbackText}>Mascot unavailable</span>
            </div>
          </div>
        </ImageFallback>
      ) : (
        <Image
          {...imageProps}
          onLoad={handleLoad}
          onError={handleError}
          sizes={getResponsiveSizes('mascot')}
          alt={imageProps.alt || 'REKT mascot character animation'}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      )}
    </div>
  );
};

export default MascotCenter;