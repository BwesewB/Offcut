'use client';

import { useRef } from 'react';
import MediaBlock from '../MediaBlock/MediaBlock';
import styles from './MobileCarousel.module.css';

export default function MobileCarousel({ items }) {
  const trackRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    trackRef.current.classList.add(styles.dragging);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    trackRef.current.classList.remove(styles.dragging);
  };

  const onMouseUp = () => {
    isDown.current = false;
    trackRef.current.classList.remove(styles.dragging);
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // 1.5 = drag speed multiplier
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className={styles.carouselOuter}>
      <div
        ref={trackRef}
        className={styles.carouselTrack}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {items.map((item, i) => (
          <div key={i} className={styles.carouselSlide}>
            <MediaBlock
              image={item.image}
              alt={item.alt}
              width='100%'
              parallaxScale={item.parallaxScale}
              parallax={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}