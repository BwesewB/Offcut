'use client';

import React from 'react';
import styles from './GridLayout.module.css';

export default function GridLayout({
  children,
  columns = 5,
  gap = 'var(--gap)',
  height = 'var(--containerHeight)',
  style = {},
}) {
  return (
    <div
      className={styles.Grid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        height,
        ...style,
      }}
    >
      {React.Children.map(children, (child) => child)}
    </div>
  );
}
