'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedText.module.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  reverse = false,
  tilt = false,
  trigger = '85%',
}) {
  const el = useRef(null);
  const splitRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    if (!el.current) return;

    // --- 1. Split the text into lines ---
    splitRef.current = new SplitText(el.current, { type: 'lines' });

    // Wrap each line in its own masking div
    splitRef.current.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.classList.add(styles.lineMask);
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      splitRef.current.lines,
      {
        y: '100%',
        ...(tilt && { rotateZ: 5, transformOrigin: 'left bottom' }),
      },
      {
        y: '0%',
        ...(tilt && { rotateZ: 0 }),
        ease: 'power4.out',
        duration: 1,
        delay,
        stagger: {
          amount: 0.3,
          from: reverse ? 'end' : 'start',
        },
      }
    );

    triggerRef.current = ScrollTrigger.create({
      trigger: el.current,
      start: reverse ? 'bottom 80%' : `top ${trigger}`,
      end: reverse ? 'top top' : 'bottom 20%',
      onEnter: reverse ? null : () => tl.play(),
      onEnterBack: reverse ? () => tl.play() : null,
      markers: true,
      id: `animatedText-${Math.random().toString(36).substring(2, 7)}`,
    });
    
    // --- 3. On resize, only reflow the lines, not reanimate ---
    const handleResize = () => {
      if (!splitRef.current) return;
      splitRef.current.revert();
      splitRef.current = new SplitText(el.current, { type: 'lines' });

      // Re-apply the masks (since SplitText rebuilds DOM)
      splitRef.current.lines.forEach(line => {
        const wrapper = document.createElement('div');
        wrapper.classList.add(styles.lineMask);
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      // ✅ Kill only this component’s trigger
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }

      // ✅ Clean up GSAP split
      splitRef.current?.revert();

      // ✅ Remove orphaned triggers if element is gone
      ScrollTrigger.getAll().forEach(trigger => {
        const target = trigger?.vars?.trigger;
        if (target && !document.body.contains(target)) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <div className={styles.animatedTextContainer}>
      <p ref={el} className={`${styles.animatedText} ${className}`}>
        {text}
      </p>
    </div>
  );
}