import React from 'react';
import Link from 'next/link';
import { Typography } from '../../html';
import styles from './styles.module.scss';

const AnalyticsLink = () => (
  <Link
    className={styles.analyticsLink}
    href="/analytics"
  >
    <span className={styles.analyticsIcon} />
    <div className={styles.analyticsTooltip}>
      <Typography type="p" className={styles.analyticsTooltipTitle}>Analytics Dashboard</Typography>
      <Typography type="p" className={styles.analyticsTooltipTitleDescr}>Statistics and useful insights about solutions and assets.</Typography>
    </div>
  </Link>
);

export default AnalyticsLink;
