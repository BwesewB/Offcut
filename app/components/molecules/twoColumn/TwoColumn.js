'use client'

import styles from './TwoColumn.module.css';

export default function TwoColumn({ left, right, }) {
  return (
    <div className={styles.TwoColumnGrid}>
      <div className={styles.ColumnOne}>
        {left || null}
      </div>
      <div className={styles.ColumnTwo}>
        {right || null}
      </div>
    </div>
  );
};