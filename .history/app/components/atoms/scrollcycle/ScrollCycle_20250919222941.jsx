'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollCycle({
  sectionA,
  sectionB,
  bottomStripA,
  topStripB,
  prompt = 'scroll up',
}) {
  // which content is on the main stage
  const [main, setMain] = useState('A');            // 'A' | 'B'
  // Top Buffer lock/unlock; TB always rendered, but locked initially
  const [tbUnlocked, setTbUnlocked] = useState(false);
  const [tbHeight, setTbHeight] = useState(0);

  // sentinels & refs
  const topRef = useRef(null);        // 👈 at absolute document top (before TB)
  const bottomRef = useRef(null);     // just above BB
  const topBufferRef = useRef(null);  // TB element (for gate)
  const gateActiveRef = useRef(false);

  // guards
  const lockRef = useRef(false);      // prevents double triggers during swaps
  const enforcingRef = useRef(false); // avoids re-entrant scroll correction
  const bottomObserverRef = useRef(null);
  const topObserverRef = useRef(null);

  // --- helpers ---

  // Pin to an edge when needed (we avoid using this on A->B to prevent the "jump")
  const pinTo = (edge) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (edge === 'bottom') {
          const h = document.documentElement.scrollHeight || document.body.scrollHeight;
          window.scrollTo({ top: h, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setTimeout(() => { lockRef.current = false; }, 180);
      });
    });
  };

  // While TB is locked, prevent scrolling into it (keep user at >= tbHeight)
  const enforceTbLock = () => {
    if (tbUnlocked || tbHeight <= 0) return;
    const y = window.scrollY || 0;
    if (y < tbHeight && !enforcingRef.current) {
      enforcingRef.current = true;
      window.scrollTo({ top: tbHeight, behavior: 'auto' });
      requestAnimationFrame(() => { enforcingRef.current = false; });
    }
  };

  // After returning to A (with TB visible/unlocked), hide TB once you scroll past it
  // and compensate scroll by tbHeight to avoid a visual jump.
  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      const tb = topBufferRef.current;
      if (!tb) return;
      const rect = tb.getBoundingClientRect();
      if (rect.bottom <= 0) {
        // record current Y, remove TB, then compensate by tbHeight so no jump
        const prevY = window.scrollY || 0;
        setTbUnlocked(false); // lock again (TB still rendered, but locked)
        // hide TB by compensating scroll position
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: Math.max(0, prevY - tbHeight), behavior: 'auto' });
            window.removeEventListener('scroll', onScroll);
            gateActiveRef.current = false;
          });
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  // --- initial setup ---
  useEffect(() => {
    const vh = window.innerHeight || 0;
    setTbHeight(vh);
    // Start at top of MAIN (i.e., just under TB). TB is locked, so you can't scroll into it.
    window.scrollTo({ top: vh, behavior: 'auto' });
  }, []);

  // Enforce TB lock whenever scrolling and TB is locked
  useEffect(() => {
    if (tbUnlocked) return;
    const onScroll = () => enforceTbLock();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tbUnlocked, tbHeight]);

  // Bottom observer — always armed (no jump now, because we start below TB)
  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // 🚫 DO NOT pin to bottom here — that was causing the "jump".
      // Just swap main → B and unlock TB so the user can scroll up into it.
      setMain('B');
      setTbUnlocked(true);
      // unlock done; when/if we later need pinning, we let user scroll naturally.
      setTimeout(() => { lockRef.current = false; }, 120);
    };

    const io = new IntersectionObserver(
      (entries) => onHitBottom(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    bottomObserverRef.current = io;
    return () => io.disconnect();
  }, []);

  // Top observer — only meaningful when TB is unlocked (you can reach scrollY === 0)
  useEffect(() => {
    const el = topRef.current;
    if (!el || !tbUnlocked) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Switch back to A. We are already at top; do not scroll programmatically.
      setMain('A');

      // After we're in A with TB unlocked, we start the gate so TB re-locks once you scroll down 100svh.
      requestAnimationFrame(() => activateGate());

      setTimeout(() => { lockRef.current = false; }, 120);
    };

    const io = new IntersectionObserver(
      (entries) => onHitTop(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    topObserverRef.current = io;
    return () => io.disconnect();
  }, [tbUnlocked]);

  // If content swap to B grows/shrinks, we still avoid the bottom jump since we don't call pinTo('bottom').
  // If you want pinning on return to A, you can call pinTo('top') — but it's not required.

  return (
    <main style={styles.page}>
      {/* 👇 Top sentinel must be the very first element to detect true top (scrollY === 0) */}
      <div ref={topRef} style={styles.sentinel} />

      {/* Top Buffer (always present to avoid layout shift). Shows B strip content. */}
      <section ref={topBufferRef} style={{ ...styles.topBuffer, height: tbHeight || '100svh' }}>
        {topStripB}
      </section>

      {/* Main Stage */}
      <section style={styles.mainStage}>
        {main === 'A' ? sectionA : sectionB}
      </section>

      {/* Sticky prompt at visual bottom */}
      <div aria-live="polite" style={styles.prompt}>
        {prompt}
      </div>

      {/* Bottom sentinel (fires at true bottom) */}
      <div ref={bottomRef} style={styles.sentinel} />

      {/* Bottom Buffer — always present; shows A strip */}
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
    // fixed 100svh region at top; always in DOM
  },
  bottomBuffer: {
    // fixed 100svh region at bottom; always in DOM
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
