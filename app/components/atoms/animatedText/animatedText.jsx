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
  color = "var(--black)"
}) {
  const el = useRef(null);
  const splitRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    if (!el.current) return;

    let rafId;

    const init = () => {
      if (!el.current) return;

      // Clean up any previous split
      splitRef.current?.revert();
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }

      splitRef.current = new SplitText(el.current, { type: 'lines' });

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
        markers: false,
        id: `animatedText-${Math.random().toString(36).substring(2, 7)}`,
      });
    };

    // Wait for fonts then double RAF to ensure layout is fully painted
    document.fonts.ready.then(() => {
      rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          init();
          ScrollTrigger.refresh();
        });
      });
    });

    const handleResize = () => {
      if (!splitRef.current) return;
      splitRef.current.revert();
      splitRef.current = new SplitText(el.current, { type: 'lines' });

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
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);

      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }

      splitRef.current?.revert();

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
      <p ref={el} className={`${styles.animatedText} ${className}`} style={{ color }}>
        {text}
      </p>
    </div>
  );
}