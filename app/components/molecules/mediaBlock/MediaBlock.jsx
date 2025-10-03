'use client';

import Image from 'next/image';
import styles from './MediaBlock.module.css';

const MediaBlock = ({ 
  image, 
  alt = 'Media Image', 
  fit = 'height', 
  width,
  style = {} 
}) => {

  let wrapperStyle;

  if (width) {
    // Explicit width prop overrides everything
    wrapperStyle = { width, height: 'auto' };
  } else if (fit === 'height') {
    wrapperStyle = { width: '100%', height: 'auto' };
  } else {
    wrapperStyle = { width: 'auto', height: '100%' };
  }

  return (
    <div 
      className={styles.mediaWrapper}
      style={{ ...wrapperStyle, ...style }}
    >
      <Image
        src={image}
        alt={alt}
        width={image.width}
        height={image.height}
        className={styles.mediaImage}
      />
    </div>
  );
};

export default MediaBlock;