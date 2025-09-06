import React, { useState, useCallback, useEffect } from 'react';

export interface AssetLoadingState {
  isLoading: boolean;
  hasError: boolean;
  isLoaded: boolean;
}

export interface UseOptimizedImageProps {
  src: string;
  priority?: boolean;
  preload?: boolean;
}


export const useOptimizedImage = ({ 
  src, 
  priority = false, 
  preload = false 
}: UseOptimizedImageProps) => {
  const [state, setState] = useState<AssetLoadingState>({
    isLoading: true,
    hasError: false,
    isLoaded: false,
  });

  const handleLoad = useCallback(() => {
    setState({
      isLoading: false,
      hasError: false,
      isLoaded: true,
    });
  }, []);

  const handleError = useCallback(() => {
    setState({
      isLoading: false,
      hasError: true,
      isLoaded: false,
    });
  }, []);


  useEffect(() => {
    if (preload && priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, preload, priority]);

  return {
    ...state,
    handleLoad,
    handleError,
  };
};


export interface ImageFallbackProps {
  type: 'mascot' | 'chart' | 'background' | 'line' | 'border';
  className?: string;
  children?: React.ReactNode;
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({ 
  type, 
  className = '',
  children 
}) => {
  const fallbackContent = {
    mascot: { icon: '🤖', text: 'Mascot unavailable' },
    chart: { icon: '📊', text: 'Chart unavailable' },
    background: { icon: '🎨', text: 'Background unavailable' },
    line: { icon: '📈', text: 'Line unavailable' },
    border: { icon: '🖼️', text: 'Border unavailable' },
  };

  const { icon, text } = fallbackContent[type];

  return React.createElement('div', {
    className: `asset-fallback ${className}`,
    role: 'img',
    'aria-label': text
  }, children || React.createElement('div', {
    className: 'fallback-content'
  }, [
    React.createElement('span', {
      key: 'icon',
      className: 'fallback-icon',
      'aria-hidden': 'true'
    }, icon),
    React.createElement('span', {
      key: 'text',
      className: 'fallback-text'
    }, text)
  ]));
};


export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  unoptimized?: boolean;
  loading?: 'eager' | 'lazy';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export const getOptimizedImageProps = (
  baseProps: OptimizedImageProps,
  isCritical: boolean = false
): OptimizedImageProps => {
  const finalPriority = Boolean(isCritical || baseProps.priority);

  const loadingProp = finalPriority ? undefined : (baseProps.loading || 'lazy');

  return {
    ...baseProps,
    priority: finalPriority,
    sizes: baseProps.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    loading: loadingProp,
    quality: 85, // Balanced quality/performance
    placeholder: 'blur',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  };
};


export const ASSET_PRIORITIES = {
  
  critical: [
    '/assets/Rektonomics/frame_rektonomics.webp',
    '/assets/Rektonomics/total supply background.svg',
  ],

  important: [
    '/assets/Rektonomics/tokenomics chart.webp',
    '/assets/Rektonomics/presale line.svg',
    '/assets/Rektonomics/treasury line.svg',
  ],

  lazy: [
    '/assets/Rektonomics/main gif in the rektonomics put it the middle.gif',
    '/assets/Rektonomics/tax.webp',
    '/assets/Rektonomics/liquidity line.svg',
    '/assets/Rektonomics/Staking pool line.svg',
    '/assets/Rektonomics/community fund line.svg',
  ],
} as const;


export const isAssetCritical = (src: string): boolean => {
  return (ASSET_PRIORITIES.critical as readonly string[]).includes(src);
};

export const isAssetImportant = (src: string): boolean => {
  return (ASSET_PRIORITIES.important as readonly string[]).includes(src);
};


export const getResponsiveSizes = (componentType: string): string => {
  const sizeMap = {
    mascot: '(max-width: 768px) 150px, (max-width: 1024px) 180px, 200px',
    chart: '(max-width: 768px) 250px, (max-width: 1024px) 280px, 300px',
    line: '(max-width: 768px) 150px, (max-width: 1024px) 180px, 200px',
    banner: '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw',
    background: '100vw',
  };

  return sizeMap[componentType as keyof typeof sizeMap] || '100vw';
};