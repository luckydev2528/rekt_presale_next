import React from 'react';
import { TaxContainerProps } from '../types';
import styles from './TaxContainer.module.css';

const TaxContainer: React.FC<TaxContainerProps> = ({
  children,
  className = '',
  backgroundSrc,
}) => {
  return (
    <div
      className={`${styles.taxContainer} ${className}`}
      style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined}
    >
      
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
};

export default TaxContainer;