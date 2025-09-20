'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollCycle({
  sectionA,
  sectionB,
  bottomStripA,
  topStripB,
  prompt = 'scroll up',
}) {
  const [main, setMain] = useState('A');      // 'A' | 'B'
  const [showTB, setShowTB] = useState(false);

  // 👇 NEW: state (not ref) so effect re-runs and attaches bottom observer
  const [bottomArmed, setBottomArmed] = useState(false);

  const topRef = useRef(null);        // sentinel just below TB (when TB exists)
  const bottomRef = useRef(null);     // sentinel just above BB
  const topBufferRef = useRef(null);  // the actual Top Buffer
  const gateRef = useRef(null);       // marker immediately after TB

  // control flags
  const lockRef = useRef(false);            // prevents double-fires
  const armedTopRef = useRef(false);        // top armed only after first bottom hit
  const gateActiveRef = useRef(false);      // gate active only after returning to A with TB visible

  const pinTo = (edge) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (edge === 'bottom') {
          const h = document.documentElement.scrollHeight || document.body.scrollHeight;
          window.scrollTo({ top: h, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setTimeout(() => { lockRef.current = false; }, 200);
      });
    });
  };

  // Gate: hide TB once its gate marker crosses the top of the viewport
  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      const gate = gateRef.current;
      if (!gate) return;
      const { top } = gate.getBoundingClientRect();
      if (top <= 0) {
        setShowTB(false); // TB gone; can't go back to B top strip
        window.removeEventListener('scroll', onScroll);
        gateActiveRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  // Arm bottom observer only after the user actually interacts (prevents initial jump)
  useEffect(() => {
    const arm = () => {
      setBottomArmed(true);
      window.removeEventListener('scroll', arm);
      window.removeEventListener('wheel', arm);
      window.removeEventListener('touchmove', arm);
    };
    window.addEventListener('scroll', arm, { passive: true });
    window.addEventListener('wheel', arm, { passive: true });
    window.addEventListener('touchmove', arm, { passive: true });
    return () => {
      window.removeEventListener('scroll', arm);
      window.removeEventListener('wheel', arm);
      window.removeEventListener('touchmove', arm);
    };
  }, []);

  // Bottom observer (attaches when bottomArmed flips to true)
  useEffect(() => {
    if (!bottomArmed) return;
    const bottomEl = bottomRef.current;
    if (!bottomEl) return;

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;
      // Switch to B, reveal TB=B, arm top; pin happens in next effect
      setMain('B');
      setShowTB(true);
      armedTopRef.current = true;
    };

    const ioBottom = new IntersectionObserver(
      (entries) => onHitBottom(entries[0]),
      { root: null, threshold: 1 } // true bottom only
    );

    ioBottom.observe(bottomEl);
    return () => ioBottom.disconnect();
  }, [bottomArmed]);

  // Top observer (attach only when TB is visible and top armed)
  useEffect(() => {
    const topEl = topRef.current;
    if (!topEl || !showTB || !armedTopRef.current) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;
      // Reached true top (with TB visible): switch Main back to A
      setMain('A');
      // Gate is activated after pin-to-top in the next effect
    };

    const ioTop = new IntersectionObserver(
      (entries) => onHitTop(entries[0]),
      { root: null, threshold: 1 }
    );

    ioTop.observe(topEl);
    return () => ioTop.disconnect();
  }, [showTB]);

  // After main changes, pin to edge and (if coming back to A with TB) start the gate
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
      {/* Top Buffer — hidden initially; appears when we switch to B */}
      {showTB && (
        <section ref={topBufferRef} style={styles.topBuffer}>
          {topStripB}
        </section>
      )}

      {/* Gate marker: immediately after TB (only meaningful when TB is shown) */}
      {showTB && <div ref={gateRef} style={styles.gateMarker} />}

      {/* Top sentinel (just below TB/gate if present) */}
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
  gateMarker: {
    height: 0, // marker only; no layout change
  },
  bottomBuffer: {
    height: '100svh',
  },
  mainStage: {},
  prompt: {
    position: 'sticky',
    bottom: 0,
    textAlign: 'center',
    padding: '0.75rem 1rem',
    background: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0))',
    fontSize: '0.9rem',
    userSelect: 'none',
  },
  sentinel: { height: 1 },
};
