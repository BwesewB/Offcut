'use client';
import { useEffect } from 'react';

export default function LockVh({ children }) {
  useEffect(() => {
    // Lock small viewport (chrome visible) — never changes
    const vh = document.documentElement.clientHeight;
    document.documentElement.style.setProperty('--locked-vh', `${vh}px`);

    // Probe for lvh via CSS unit — may equal svh on older browsers at mount time
    const probe = document.createElement('div');
    probe.style.cssText = 'position:fixed;height:100lvh;width:0;visibility:hidden;pointer-events:none;';
    document.body.appendChild(probe);
    let lvh = probe.getBoundingClientRect().height;
    document.body.removeChild(probe);
    document.documentElement.style.setProperty('--locked-lvh', `${lvh}px`);

    // Track the true large viewport: update --locked-lvh upward whenever
    // visualViewport grows (browser chrome retracts). Never shrinks.
    const trackMax = () => {
      const h = window.visualViewport?.height || window.innerHeight;
      if (h > lvh) {
        lvh = h;
        document.documentElement.style.setProperty('--locked-lvh', `${h}px`);
      }
    };
    window.visualViewport?.addEventListener('resize', trackMax);
    return () => window.visualViewport?.removeEventListener('resize', trackMax);
  }, []);

  return children;
}