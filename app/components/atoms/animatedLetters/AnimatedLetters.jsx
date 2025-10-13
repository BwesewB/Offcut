'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedLetters.module.css';

export default function AnimatedLetters({
  text = '',
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.05,
  ease = 'power4.out',
}) {
  const rootRef = useRef(null);
  const lettersRef = useRef([]);

  // build spans once
  const chars = Array.from(text);

  useLayoutEffect(() => {
    const els = lettersRef.current.filter(Boolean);
    if (!els.length) return;

    // set initial state BEFORE paint to avoid flash
    gsap.set(els, { yPercent: 100, opacity: 0 });

    // then animate up
    const tl = gsap.to(els, {
      yPercent: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
    });

    return () => tl.kill();
  }, [text, delay, duration, stagger, ease]);

  return (
    <h1 ref={rootRef} className={`${styles.title} ${className}`}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          ref={el => (lettersRef.current[i] = el)}
          className={styles.letter}
          aria-hidden="true"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
      {/* Optional: visually hidden full text for accessibility */}
      <span className={styles.sronly}>{text}</span>
    </h1>
  );
}
