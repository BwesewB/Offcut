'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * ScrollCycle (JS version)
 * - Initial: TB hidden, MS=A, BB=A. Only bottom sentinel armed.
 * - Bottom hit: MS→B, show TB=B, keep BB=A, pin bottom, arm top.
 * - Top hit: MS→A, keep TB=B, pin top, then after user scrolls down ≥100svh remove TB.
 */
export default function ScrollCycle({
  sectionA,
  sectionB,
  bottomStripA,
  topStripB,
  prompt = 'scroll up',
}) {
  const [main, setMain] = useState('A');      // 'A' | 'B'
  const [showTB, setShowTB] = useState(false);

  const topRef = useRef(null);     // sentinel below TB (when TB exists)
  const bottomRef = useRef(null);  // sentinel above BB

  const lockRef = useRef(false);       // prevents double-fires
  const armedTopRef = useRef(false);   // arm top only after bottom first fires
  const gateActiveRef = useRef(false); // gate active only after returning to A with TB visible

  const pinTo = (edge) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (edge === 'bottom') {
          const h =
            document.documentElement.scrollHeight || document.body.scrollHeight;
          window.scrollTo({ top: h, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setTimeout(() => { lockRef.current = false; }, 200);
      });
    });
  };

  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      const vh = window.innerHeight || 0;
      if (window.scrollY >= vh) {
        setShowTB(false); // remove TB; can't go back to B top
        window.removeEventListener('scroll', onScroll, { passive: true });
        gateActiveRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  // Bottom observer (armed initially)
  useEffect(() => {
    const bottomEl = bottomRef.current;
    if (!bottomEl) return;

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      setMain('B');       // MS -> B
      setShowTB(true);    // show TB = B
      armedTopRef.current = true; // arm top observer afterward
    };

    const ioBottom = new IntersectionObserver(
      (entries) => onHitBottom(entries[0]),
      { root: null, threshold: 1 }
    );

    ioBottom.observe(bottomEl);
    return () => ioBottom.disconnect();
  }, []);

  // Top observer (attach only when TB is visible and top is armed)
  useEffect(() => {
    const topEl = topRef.current;
    if (!topEl || !showTB || !armedTopRef.current) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      setMain('A'); // MS -> A (TB still B for now; removed by gate after scrolling down)
    };

    const ioTop = new IntersectionObserver(
      (entries) => onHitTop(entries[0]),
      { root: null, threshold: 1 }
    );

    ioTop.observe(topEl);
    return () => ioTop.disconnect();
  }, [showTB]);

  // Pin after swaps + start/stop gate
  useEffect(() => {
    if (main === 'B') {
      pinTo('bottom');
    } else {
      pinTo('top');
      if (showTB) activateGate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main]);

  return (
    <main style={styles.page}>
      {/* Top Buffer — hidden initially; appears with B */}
      {showTB && (
        <section style={styles.topBuffer}>
          {topStripB}
        </section>
      )}

      {/* Top sentinel (just below TB if present) */}
      <div ref={topRef} style={styles.sentinel} />

      {/* Main Stage */}
      <section style={styles.mainStage}>
        {main === 'A' ? sectionA : sectionB}
      </section>

      {/* Sticky prompt */}
      <div aria-live="polite" style={styles.prompt}>
        {prompt}
      </div>

      {/* Bottom sentinel (just above BB) */}
      <div ref={bottomRef} style={styles.sentinel} />

      {/* Bottom Buffer — always present, shows A */}
      <section style={styles.bottomBuffer}>
        {bottomStripA}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100svh',
    display: 'flex',
    flexDirection: 'column',
  },
  topBuffer: {
    height: '100svh',
  },
  bottomBuffer: {
    height: '100svh',
  },
  mainStage: {
    // your content defines its own height
  },
  prompt: {
    position: 'sticky',
    bottom: 0,
    textAlign: 'center',
    padding: '0.75rem 1rem',
    background:
      'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0))',
    fontSize: '0.9rem',
    userSelect: 'none',
  },
  sentinel: { height: 1 },
};
