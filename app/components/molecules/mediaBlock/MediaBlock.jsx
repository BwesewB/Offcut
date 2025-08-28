'use client';

import Image from 'next/image';
import styles from './MediaBlock.module.css';

const MediaBlock = ({ image, alt = 'Media Image', style = {} }) => {
  return (
    <div 
      className={styles.mediaWrapper}
      style={{ ...style }}
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