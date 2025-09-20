'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function ScrollCycle({
  sectionA,
  sectionB,
  bottomStripA,
  topStripB,
}) {
  // Which content is on the Main Stage
  const [main, setMain] = useState('A'); // 'A' | 'B'
  // Top Buffer overlay visibility (fixed overlay, not in layout)
  const [tbVisible, setTbVisible] = useState(false);
  const [ready, setReady] = useState(false);

  // Cached viewport height for spacer
  const [vh, setVh] = useState(0);

  // Sentinels
  const topRef = useRef(null);      // at absolute top (fires at scrollY===0)
  const bottomRef = useRef(null);   // at true end of page (after bottom buffer)

  // Guards
  const lockRef = useRef(false);
  const gateActiveRef = useRef(false);
  const enforcingRef = useRef(false);

  // ---- helpers ----

  // Keep user from entering the top region during lock (always locked; we never remove the spacer)
  const enforceTopLock = () => {
    if (!vh) return;
    const y = window.scrollY || 0;
    if (y < vh && !enforcingRef.current) {
      enforcingRef.current = true;
      // snap back immediately; no smooth
      window.scrollTo({ top: vh, behavior: 'auto' });
      requestAnimationFrame(() => { enforcingRef.current = false; });
    }
  };

  // Gate: after returning to A with TB visible, hide the TB overlay once user scrolls >= 100svh down
  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      if ((window.scrollY || 0) >= vh) {
        setTbVisible(false); // hide overlay (no layout change)
        window.removeEventListener('scroll', onScroll);
        gateActiveRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  // ---- initial setup (before first paint) ----
  useLayoutEffect(() => {
    const curVh = window.innerHeight || 0;
    setVh(curVh);

    // Start user right below the spacer (top locked region)
    window.scrollTo({ top: curVh, behavior: 'auto' });

    // Hard-disable smooth scrolling to avoid browser animating our corrective scrolls
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    // also reduce scroll anchoring interference
    document.documentElement.style.overflowAnchor = 'none';

    setReady(true);

    // restore scroll-behavior on unmount
    return () => {
      html.style.scrollBehavior = prev || '';
      document.documentElement.style.overflowAnchor = '';
    };
  }, []);

  // Enforce the “can’t scroll into top” rule (spacer guarantees layout; we just guard the scroll)
  useEffect(() => {
    const onScroll = () => enforceTopLock();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vh]);

  // Bottom observer — at the very end (after bottom buffer)
  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Swap A -> B and show TB overlay (no programmatic scroll; no layout change)
      setMain('B');
      setTbVisible(true);

      setTimeout(() => { lockRef.current = false; }, 100);
    };

    const io = new IntersectionObserver(
      (entries) => onHitBottom(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Top observer — only matters when TB overlay is visible (so you can reach scrollY===0)
  useEffect(() => {
    const el = topRef.current;
    if (!el || !tbVisible) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;

      // Switch back to A (already at top). Keep TB overlay visible until user scrolls down >= 100svh.
      setMain('A');
      requestAnimationFrame(() => activateGate());

      setTimeout(() => { lockRef.current = false; }, 100);
    };

    const io = new IntersectionObserver(
      (entries) => onHitTop(entries[0]),
      { root: null, threshold: 1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [tbVisible]);

  // Optional: handle orientationchange/resize so spacer matches new viewport height
  useEffect(() => {
    const onResize = () => {
      const nv = window.innerHeight || 0;
      // Adjust scroll to keep user at same visual place relative to spacer
      const dy = nv - vh;
      setVh(nv);
      if (dy && (window.scrollY || 0) < (vh + 1)) {
        // If we're near the top-locked zone, keep us sitting right below it
        window.scrollTo({ top: nv, behavior: 'auto' });
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [vh]);

  return (
    <main
      style={{
        ...styles.page,
        visibility: ready ? 'visible' : 'hidden',
        // prevent scrollbars from changing width mid-run
        scrollbarGutter: 'stable',
      }}
    >
      {/* Top sentinel at absolute top (fires at scrollY === 0) */}
      <div ref={topRef} style={styles.sentinel} />

      {/* Spacer that represents the locked top region; ALWAYS in flow */}
      <div style={{ height: vh || '100svh' }} />

      {/* Fixed Top Buffer overlay (not in layout). Show only when tbVisible=true */}
      <div
        aria-hidden={!tbVisible}
        style={{
          ...styles.topOverlay,
          pointerEvents: tbVisible ? 'auto' : 'none',
          opacity: tbVisible ? 1 : 0,
        }}
      >
        {topStripB}
      </div>

      {/* Main Stage */}
      <section style={styles.mainStage}>
        {main === 'A' ? sectionA : sectionB}
      </section>

      {/* Bottom Buffer — always present; shows A strip */}
      <section style={{ ...styles.bottomBuffer, height: vh || '100svh' }}>
        {bottomStripA}
      </section>

      {/* True bottom sentinel at the very end */}
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
  // Fixed overlay: decouples TB visuals from layout (no CLS, no flash)
  topOverlay: {
    position: 'fixed',
    inset: 0,            // top:0; right:0; bottom:0; left:0
    zIndex: 10,
    transition: 'opacity 120ms linear', // optional; can remove if you want instant toggle
    background: 'transparent',
  },
  bottomBuffer: {
    // in normal flow
  },
  mainStage: {
    // your content defines height
  },
  sentinel: { height: 1 },
};
