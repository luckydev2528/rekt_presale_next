import React from 'react';
import { DistributionBreakdownProps } from '../types';
import styles from './DistributionBreakdown.module.css';

interface DistributionItemProps {
  item: {
    name: string;
    percentage: number;
    svgAsset: string;
    color?: string;
  };
  index: number;
}

const DistributionItem: React.FC<DistributionItemProps> = ({ item }) => {
  return (
    <div className={styles.distributionItem}>
      <div className={styles.lineContainer}>
        <div className={styles.svgContainer}>
          <img 
            src={item.svgAsset}
            alt={`${item.name} distribution line`}
            className={styles.svgAsset}
          />
        </div>
        <div className={styles.textOverlay}>
          <span className={styles.percentageLabel}>
            {item.percentage}%
          </span>
          <span className={styles.itemName}>
            {item.name.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

const DistributionBreakdown: React.FC<DistributionBreakdownProps> = ({
  items = [],
}) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <DistributionItem 
          key={`${item.name}-${index}`} 
          item={item} 
          index={index} 
        />
      ))}
    </div>
  );
};

export default DistributionBreakdown;