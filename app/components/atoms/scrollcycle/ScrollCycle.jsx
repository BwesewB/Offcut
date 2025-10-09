'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollCycle({ sectionA, sectionB, bottomStripA, topStripB }) {
  const [main, setMain] = useState('A');            // 'A' | 'B'
  const [tbUnlocked, setTbUnlocked] = useState(false);
  const [tbHeight, setTbHeight] = useState(0);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const topBufferRef = useRef(null);
  const gateActiveRef = useRef(false);

  const lockRef = useRef(false);
  const enforcingRef = useRef(false);

  const enforceTbLock = () => {
    if (tbUnlocked || tbHeight <= 0) return;
    const y = window.scrollY || 0;
    if (y < tbHeight && !enforcingRef.current) {
      enforcingRef.current = true;
      window.scrollTo({ top: tbHeight, behavior: 'auto' });
      requestAnimationFrame(() => { enforcingRef.current = false; });
    }
  };

  const activateGate = () => {
    if (gateActiveRef.current) return;
    gateActiveRef.current = true;

    const onScroll = () => {
      const tbEl = topBufferRef.current;
      if (!tbEl) return;
      const rect = tbEl.getBoundingClientRect();
      if (rect.bottom <= 0) {
        const html = document.documentElement;
        const prevBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        const target = Math.max(0, (window.scrollY || 0) - tbHeight);
        window.scrollTo(0, target);
        setTbUnlocked(false);
        html.style.scrollBehavior = prevBehavior || '';
        window.removeEventListener('scroll', onScroll);
        gateActiveRef.current = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  };

  useEffect(() => {
    const vh = window.innerHeight || 0;
    setTbHeight(vh);
    window.scrollTo({ top: vh, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (tbUnlocked) return;
    const onScroll = () => enforceTbLock();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tbUnlocked, tbHeight]);

  // --- Bottom observer (more forgiving) + scroll fallback ---
  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const hitBottom = () => {
      if (lockRef.current) return;
      lockRef.current = true;
      setMain('B');
      setTbUnlocked(true);
      setTimeout(() => { lockRef.current = false; }, 120);
    };

    // IO: fire when any part of the sentinel is visible, with a tiny negative margin
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) hitBottom();
      },
      { root: null, threshold: 0, rootMargin: '0px 0px -1px 0px' }
    );
    io.observe(el);

    // Fallback: if we're within 2px of bottom, consider it bottom
    const onScroll = () => {
      if (main !== 'A' || tbUnlocked) return; // only in initial A phase (TB locked)
      const doc = document.documentElement;
      const bottomY = (window.scrollY || 0) + (window.innerHeight || 0);
      const maxY = Math.max(doc.scrollHeight, document.body.scrollHeight);
      if (maxY - bottomY <= 2) hitBottom();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [main, tbUnlocked]);

  // Top observer — only when TB is unlocked (you can reach scrollY === 0)
  useEffect(() => {
    const el = topRef.current;
    if (!el || !tbUnlocked) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;
      setMain('A');
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
      <div ref={topRef} style={styles.sentinel} />

      <section ref={topBufferRef} style={{ ...styles.topBuffer, height: tbHeight || '100dvh' }}>
        {topStripB}
      </section>

      <section style={styles.mainStage}>
        {main === 'A' ? sectionA : sectionB}
      </section>

      <section style={{ ...styles.bottomBuffer, height: tbHeight || '100dvh' }}>
        {bottomStripA}
      </section>

      {/* true bottom sentinel */}
      <div ref={bottomRef} style={styles.sentinel} />
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
  },
  topBuffer: {},
  bottomBuffer: {},
  mainStage: {},
  sentinel: { height: 2 }, // slightly taller helps some mobile browsers
};
