'use client';

import { useEffect, useRef } from 'react';
import styles from './HoverImage.module.css';
import heroRock from '/public/images/TransparentRockHero1.png';
import MediaBlock from '../../molecules/mediaBlock/MediaBlock';

export default function HoverImage() {
  const wrapperRef = useRef(null); // ⚡ this is the moving element

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Disable on mobile / touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let currentX = 0,
      currentY = 0,
      targetX = 0,
      targetY = 0;

    const strength = 35; // max px shift from center
    const ease = 0.015; // easing for smooth follow

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      el.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.05)`; // ⚡ small scale hides edges
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx); // divide by 10 to dampen motion
        const dy = (e.clientY - cy);

      // Clamp to keep image from exposing background
      const maxX = Math.min(Math.max((dx / rect.width) * strength, -strength), strength);
      const maxY = Math.min(Math.max((dy / rect.height) * strength, -strength), strength);

      targetX = maxX;
      targetY = maxY;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <div ref={wrapperRef} className={styles.heroImageWrap}>
        <MediaBlock image={heroRock} alt="A stone on a white background" />
      </div>
    </div>
  );
}
