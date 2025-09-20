'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollCycle({
  sectionA,
  sectionB,
  bottomStripA,
  topStripB,
  prompt = 'scroll up',
}) {
  const [main, setMain] = useState('A');           // 'A' | 'B'
  const [tbUnlocked, setTbUnlocked] = useState(false); // TB lock state
  const [tbHeight, setTbHeight] = useState(0);     // cached viewport height at mount

  // Sentinels
  const topRef = useRef(null);        // very top of the page (fires when scrollY === 0)
  const bottomRef = useRef(null);     // just above BB
  const gateActiveRef = useRef(false);

  // Control flags
  const lockRef = useRef(false);      // prevents double-fire during swaps
  const enforcingRef = useRef(false); // prevents re-entrant scroll correction
  const bottomObserverRef = useRef(null);
  const topObserverRef = useRef(null);

  // --- helpers ---
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

  // Ensure: while TB is LOCKED, you cannot scroll above TB height
  const enforceTbLock = () => {
    if (tbUnlocked) return;
    if (tbHeight <= 0) return;
    const y = window.scrollY || 0;
    if (y < tbHeight && !enforcingRef.current) {
      enforcingRef.current = true;
      // snap back immediately; 'auto' avoids animation/jitter
      window.scrollTo({ top: tbHeight, behavior: 'auto' });
      // allow next corrections
      requestAnimationFrame(() => { enforcingRef.current = false; });
    }
  };

  // Activate gate after returning to A (with TB unlocked). Once user scrolls ≥ TB height, re-lock TB.
  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      // when user has scrolled down beyond TB height, lock TB again
      if ((window.scrollY || 0) >= tbHeight) {
        setTbUnlocked(false);
        window.removeEventListener('scroll', onScroll);
        gateActiveRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  // Initial setup: measure TB height (use viewport), start at TB bottom
  useEffect(() => {
    const vh = window.innerHeight || 0;
    setTbHeight(vh);
    // Start user at the top of MAIN (i.e., just below TB)
    window.scrollTo({ top: vh, behavior: 'auto' });
  }, []);

  // Enforce TB lock while scrolling (lightweight)
  useEffect(() => {
    // Only enforce when locked
    if (tbUnlocked) return;

    const onScroll = () => enforceTbLock();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tbUnlocked, tbHeight]);

  // Bottom observer (armed immediately; no jump now because we start at tbHeight)
  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Switch to B and UNLOCK TB so user can scroll up into it
      setMain('B');
      setTbUnlocked(true);
      // pin bottom in the next effect when main becomes 'B'
    };

    const io = new IntersectionObserver(
      (entries) => onHitBottom(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    bottomObserverRef.current = io;
    return () => io.disconnect();
  }, []);

  // Top observer (only meaningful when TB is unlocked — i.e., after switching to B)
  useEffect(() => {
    const el = topRef.current;
    if (!el) return;

    // Only arm top when TB is unlocked (user can reach scrollY 0)
    if (!tbUnlocked) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Reached true top with TB visible: switch main back to A and pin to top
      setMain('A');
      // gate will re-lock TB after user scrolls down ≥ tbHeight
    };

    const io = new IntersectionObserver(
      (entries) => onHitTop(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    topObserverRef.current = io;
    return () => io.disconnect();
  }, [tbUnlocked]);

  // After main changes, pin and maybe start gate
  useEffect(() => {
    if (main === 'B') {
      pinTo('bottom');
    } else {
      pinTo('top');
      // We are back to A; if TB is still unlocked, start the gate to re-lock after 100svh
      if (tbUnlocked) activateGate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main]);

  return (
    <main style={styles.page}>
      {/* Top Buffer (always present; shows B strip content). Locked/unlocked is enforced by JS. */}
      <section style={{ ...styles.topBuffer, height: tbHeight || '100svh' }}>
        {topStripB}
      </section>

      {/* Top sentinel at absolute top of the page */}
      <div ref={topRef} style={styles.sentinel} />

      {/* Main Stage */}
      <section style={styles.mainStage}>
        {main === 'A' ? sectionA : sectionB}
      </section>

      {/* Sticky prompt */}
      <div aria-live="polite" style={styles.prompt}>
        {prompt}
      </div>

      {/* Bottom sentinel just above BB */}
      <div ref={bottomRef} style={styles.sentinel} />

      {/* Bottom Buffer — always A strip */}
      <section style={{ ...styles.bottomBuffer, height: tbHeight || '100svh' }}>
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
    // fixed 100svh area; always in DOM to avoid layout shift
  },
  bottomBuffer: {
    // fixed 100svh area; always in DOM
  },
  mainStage: {
    // your content defines its height
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
