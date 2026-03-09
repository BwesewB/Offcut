'use client';

import Image from 'next/image';
import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './MediaBlock.module.css';

const MediaBlock = ({ 
  image, 
  alt = 'Media Image', 
  fit = 'height', 
  width,
  style = {},
  parallax = false,
  parallaxScale = 1.15,
  revealOnLoad = false
}) => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [maxTravel, setMaxTravel] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const calculateMaxTravel = useCallback(() => {
    if (!parallax || !imageRef.current) return;
    const imgHeight = imageRef.current.offsetHeight;
    if (imgHeight === 0) return;
    const extraPixels = (imgHeight * parallaxScale - imgHeight) / 2;
    setMaxTravel(extraPixels);
  }, [parallax, parallaxScale]);

  useEffect(() => {
    if (!parallax) return;
    const timeout = setTimeout(calculateMaxTravel, 100);
    window.addEventListener('resize', calculateMaxTravel);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', calculateMaxTravel);
    };
  }, [parallax, calculateMaxTravel]);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) return;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const totalTravelDistance = viewportHeight / 2 + rect.height / 2;

      setOffsetY((distanceFromCenter / totalTravelDistance) * maxTravel);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax, maxTravel]);

  let wrapperStyle;
  if (width) {
    wrapperStyle = { width, height: 'auto' };
  } else if (fit === 'height') {
    wrapperStyle = { width: '100%', height: 'auto' };
  } else if (fit === 'width') {
    wrapperStyle = { width: 'auto', height: '100%' };
  }

  const imageStyle = {
    ...(parallax ? {
      transform: `translateY(${offsetY}px) scale(${parallaxScale})`,
      transformOrigin: 'center center',
    } : {}),
    ...(revealOnLoad ? {
      opacity: loaded ? 1 : 0,
      filter: loaded ? 'blur(0px)' : 'blur(12px)',
      scale: loaded ? '1' : '1.13',
      transition: 'opacity 0.8s ease, filter 0.8s ease, scale 0.8s ease, transform 0.05s linear',
    } : {
      transition: 'transform 0.05s linear',
    }),
  };

  return (
    <div 
      ref={wrapperRef}
      className={styles.mediaWrapper}
      style={{ ...wrapperStyle, ...style }}
    >
      <Image
        ref={imageRef}
        src={image}
        alt={alt}
        width={image.width}
        height={image.height}
        className={styles.mediaImage}
        style={imageStyle}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default MediaBlock;