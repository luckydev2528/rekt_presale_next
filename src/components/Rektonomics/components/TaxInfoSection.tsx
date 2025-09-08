import React from 'react';
import { useTranslations } from 'next-intl';
import { TaxInfoSectionProps } from '../types';
import styles from './TaxInfoSection.module.css';

const TaxInfoSection: React.FC<TaxInfoSectionProps> = ({
  taxPercentage,
  breakdown,
  variant = 'default',
}) => {
  const t = useTranslations('tax');
  
  return (
    <div className={`${styles.taxInfoSection} ${variant === 'mobile' ? styles.mobile : ''}`}>
        
        <div className={styles.titleSection}>
          <h3 className={`${styles.title} ${variant === 'mobile' ? styles.mobileTitle : ''}`}>
            {t('title', { percentage: taxPercentage })}
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
                    {t(`breakdown.${item.name}`).toUpperCase()}
                  </span>
                  {item.description && (
                    <span className={styles.itemDescription} style={{ color: item.color }}>
                      {t(item.description)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}

          {variant === 'mobile' && (
            <div className={styles.mobileList}>
              {breakdown.map((item) => (
                <div key={item.name} className={styles.mobileItem}>
                  <span 
                    className={styles.mobilePercentage}
                    style={{ color: item.color }}
                  >
                    {item.percentage}%
                  </span>
                  <span 
                    className={styles.mobileName}
                    style={{ color: item.color }}
                  >
                    {t(`breakdown.${item.name}`).toUpperCase()}
                  </span>
                  {item.description && (
                    <span className={styles.mobileDescription} style={{ color: item.color }}>
                      {t(item.description)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        
        <div className={styles.descriptionSection}>
          <p className={`${styles.description} ${variant === 'mobile' ? styles.mobileDescription : ''}`}>
            {t('burnCapDescription')}
          </p>
        </div>
    </div>
  );
};

export default TaxInfoSection;