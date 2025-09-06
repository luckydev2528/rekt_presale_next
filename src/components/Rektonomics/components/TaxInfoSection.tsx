import React from 'react';
import { TaxInfoSectionProps } from '../types';
import styles from './TaxInfoSection.module.css';

const TaxInfoSection: React.FC<TaxInfoSectionProps> = ({
  taxPercentage,
  breakdown,
  description,
  variant = 'default',
}) => {
  return (
    <div className={`${styles.taxInfoSection} ${variant === 'mobile' ? styles.mobile : ''}`}>
        
        <div className={styles.titleSection}>
          <h3 className={`${styles.title} ${variant === 'mobile' ? styles.mobileTitle : ''}`}>
            {taxPercentage}% Tax on Every Buy/Sell
          </h3>
        </div>
        
        
        <div className={`${styles.breakdownSection} ${variant === 'mobile' ? styles.mobileBreakdown : ''}`}>
          {variant !== 'mobile' && (
            breakdown.map((item) => (
              <div key={item.name} className={styles.breakdownItem}>
                <span 
                  className={styles.percentage}
                  style={{ color: item.color }}
                >
                  {item.percentage}%
                </span>
                <div className={styles.itemDetails}>
                  <span className={styles.itemName} style={{ color: item.color }}>
                    {item.name.toUpperCase()}
                  </span>
                  {item.description && (
                    <span className={styles.itemDescription} style={{ color: item.color }}>
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}

          {variant === 'mobile' && (
            <div className={styles.mobileList}>
              {breakdown.map((item) => (
                <div key={item.name} className={styles.mobileRow}>
                  <span className={styles.mobileLabel} style={{ color: item.color }}>
                    {item.name.toUpperCase()}
                  </span>
                  <span className={styles.mobilePercent} style={{ color: item.color }}>
                    {item.percentage}%
                  </span>
                  {item.name.toLowerCase() === 'burn' && item.description && (
                    <span className={styles.mobileSubnote} style={{ color: item.color }}>
                      {item.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
      
      <div className={styles.descriptionSection}>
        <p className={`${styles.description} ${variant === 'mobile' ? styles.mobileDescription : ''}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default TaxInfoSection;