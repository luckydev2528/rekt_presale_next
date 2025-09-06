import React, { useEffect } from 'react';
import { ASSET_PRIORITIES } from '../utils/assetOptimization';

interface AssetPreloaderProps {
  onPreloadComplete?: () => void;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ onPreloadComplete }) => {
  useEffect(() => {
    const preloadAssets = async () => {
      const preloadPromises = ASSET_PRIORITIES.critical.map((src) => {
        return new Promise<void>((resolve) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          
          link.onload = () => resolve();
          link.onerror = () => {
            console.warn(`Failed to preload asset: ${src}`);
            resolve();
          };
          
          document.head.appendChild(link);
          
          setTimeout(() => {
            try {
              document.head.removeChild(link);
            } catch {
            }
          }, 10000);
        });
      });

      try {
        await Promise.allSettled(preloadPromises);
        onPreloadComplete?.();
      } catch (error) {
        console.warn('Asset preloading completed with some failures:', error);
        onPreloadComplete?.();
      }
    };

    preloadAssets();
  }, [onPreloadComplete]);

  return null;
};

export default AssetPreloader;