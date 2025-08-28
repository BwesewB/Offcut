'use client';

import Image from 'next/image';
import styles from './MediaBlock.module.css';

const MediaBlock = ({ image, alt = 'Media Image', fit, style = {} }) => {
  return (
    <div 
      className={styles.mediaWrapper}
      style={{
        ...(fit === 'height'
          ? { width: '100%', height: 'auto' }
          : { width: 'auto', height: '100%' }),
        ...style,
      }}
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