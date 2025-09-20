'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollCycle({
  sectionA,
  sectionB,
  bottomStripA,
  topStripB,
}) {
  const [main, setMain] = useState('A');            // 'A' | 'B'
  const [tbUnlocked, setTbUnlocked] = useState(false);
  const [tbHeight, setTbHeight] = useState(0);

  // sentinels & refs
  const topRef = useRef(null);        // absolute document top (fires at scrollY === 0)
  const bottomRef = useRef(null);     // 👈 at the very end of the page (after Bottom Buffer)
  const topBufferRef = useRef(null);  // Top Buffer element (for gate)
  const gateActiveRef = useRef(false);

  // guards
  const lockRef = useRef(false);
  const enforcingRef = useRef(false);

  // --- helpers ---

  // We rarely pin now; leaving the helpers in case you want to re-enable.
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

  // While TB is locked, keep the user from scrolling into it (stay at ≥ tbHeight)
  const enforceTbLock = () => {
    if (tbUnlocked || tbHeight <= 0) return;
    const y = window.scrollY || 0;
    if (y < tbHeight && !enforcingRef.current) {
      enforcingRef.current = true;
      window.scrollTo({ top: tbHeight, behavior: 'auto' });
      requestAnimationFrame(() => { enforcingRef.current = false; });
    }
  };

  // After returning to A (with TB visible/unlocked), hide TB once you scroll past it,
  // compensating the scroll so there’s no visual jump.
  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      const tb = topBufferRef.current;
      if (!tb) return;
      const rect = tb.getBoundingClientRect();
      if (rect.bottom <= 0) {
        const prevY = window.scrollY || 0;
        setTbUnlocked(false); // lock TB again
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
    // Start user at the top of MAIN (i.e., just below TB). TB is locked, so you can't enter it.
    window.scrollTo({ top: vh, behavior: 'auto' });
  }, []);

  // Enforce TB lock whenever scrolling (only when TB is locked)
  useEffect(() => {
    if (tbUnlocked) return;
    const onScroll = () => enforceTbLock();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tbUnlocked, tbHeight]);

  // Bottom observer — now at the very end of the page (after Bottom Buffer)
  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Swap A -> B and unlock TB (no programmatic scroll → no jump).
      setMain('B');
      setTbUnlocked(true);

      setTimeout(() => { lockRef.current = false; }, 120);
    };

    const io = new IntersectionObserver(
      (entries) => onHitBottom(entries[0]),
      { root: null, threshold: 1 } // true bottom only
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Top observer — only meaningful when TB is unlocked (so you can reach scrollY === 0)
  useEffect(() => {
    const el = topRef.current;
    if (!el || !tbUnlocked) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Switch back to A (we're already at top; no programmatic scroll needed).
      setMain('A');
      // Start the gate so TB re-locks once you scroll down ≥ 100svh
      requestAnimationFrame(() => activateGate());

      setTimeout(() => { lockRef.current = false; }, 120);
    };

    const io = new IntersectionObserver(
      (entries) => onHitTop(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [tbUnlocked]);

  return (
    <main style={styles.page}>
      {/* Top sentinel at absolute top (fires at scrollY === 0) */}
      <div ref={topRef} style={styles.sentinel} />

      {/* Top Buffer — always present; shows B strip. Initially locked via JS. */}
      <section ref={topBufferRef} style={{ ...styles.topBuffer, height: tbHeight || '100svh' }}>
        {topStripB}
      </section>

      {/* Main Stage */}
      <section style={styles.mainStage}>
        {main === 'A' ? sectionA : sectionB}
      </section>

      {/* Bottom Buffer — always present; shows A strip */}
      <section style={{ ...styles.bottomBuffer, height: tbHeight || '100svh' }}>
        {bottomStripA}
      </section>

      {/* 👇 Bottom sentinel at the true end of the page (after Bottom Buffer) */}
      <div ref={bottomRef} style={styles.sentinel} />
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
  sentinel: { height: 1 },
};
