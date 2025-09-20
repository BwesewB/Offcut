'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Minimal cyclic scroll swapper:
 * - chapters: [{ id, node }, ...] (use 2+)
 * - Reaches BOTTOM  -> swap to next chapter, stay pinned at bottom
 * - Reaches TOP     -> swap to next chapter, stay pinned at top
 * - Locks between swaps to avoid double fires from momentum/resize
 */
export default function ScrollSwap({
  chapters = [],
  prompt = 'scroll up',
}) {
  const [idx, setIdx] = useState(0);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const lockRef = useRef(false);
  const edgeRef = useRef('top'); // 'top' | 'bottom' — where to pin after swap

  // Safety: if fewer than 2 chapters, just render the first and bail
  if (!Array.isArray(chapters) || chapters.length === 0) {
    return null;
  }
  if (chapters.length === 1) {
    return (
      <main style={styles.main}>
        <div style={styles.topSentinel} />
        <div style={styles.content}>{chapters[0].node}</div>
        <div aria-live="polite" style={styles.promptBar}>{prompt}</div>
        <div style={styles.bottomSentinel} />
      </main>
    );
  }

  // Keep pinned to the requested edge after a swap
  const pinToEdge = (edge) => {
    // Two RAFs ensures React committed & layout is final before we scroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (edge === 'bottom') {
          const h = document.documentElement.scrollHeight || document.body.scrollHeight;
          window.scrollTo({ top: h, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        // small unlock delay to ignore momentum / resize
        setTimeout(() => { lockRef.current = false; }, 200);
      });
    });
  };

  // Observe TOP and BOTTOM sentinels
  useEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!top || !bottom) return;

    const onHitTop = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;
      edgeRef.current = 'top';
      setIdx((i) => (i + 1) % chapters.length);
    };

    const onHitBottom = (entry) => {
      if (!entry.isIntersecting || lockRef.current) return;
      lockRef.current = true;
      edgeRef.current = 'bottom';
      setIdx((i) => (i + 1) % chapters.length);
    };

    // threshold:1 => only when fully visible (true top/bottom)
    const opts = { root: null, threshold: 1 };

    const ioTop = new IntersectionObserver((ents) => onHitTop(ents[0]), opts);
    const ioBottom = new IntersectionObserver((ents) => onHitBottom(ents[0]), opts);

    ioTop.observe(top);
    ioBottom.observe(bottom);

    return () => {
      ioTop.disconnect();
      ioBottom.disconnect();
    };
  }, [chapters.length]);

  // After idx changes (we swapped chapters), pin to last requested edge
  useEffect(() => {
    pinToEdge(edgeRef.current);
  }, [idx]);

  // Ensure we start at top on first mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main style={styles.main}>
      {/* TOP sentinel (fires when user reaches the top edge) */}
      <div ref={topRef} style={styles.topSentinel} />

      {/* CHAPTER CONTENT */}
      <div style={styles.content}>
        {chapters[idx]?.node}
      </div>

      {/* Sticky prompt that sits at the bottom visually */}
      <div aria-live="polite" style={styles.promptBar}>{prompt}</div>

      {/* BOTTOM sentinel (fires when user reaches the bottom edge) */}
      <div ref={bottomRef} style={styles.bottomSentinel} />
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100svh',
    display: 'flex',
    flexDirection: 'column',
    // optional debug border: border: '1px solid #ddd',
  },
  topSentinel: { height: 1 },
  bottomSentinel: { height: 1 },
  content: {
    // Your content naturally pushes; no scroll hijacking.
    // Add padding/margins inside your chapter nodes as needed.
  },
  promptBar: {
    position: 'sticky',
    bottom: 0,
    textAlign: 'center',
    padding: '0.75rem 1rem',
    background: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0))',
    fontSize: '0.9rem',
    userSelect: 'none',
  },
};
