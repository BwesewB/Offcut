'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LottieArrow({ size = '8rem', rotation = 180, immediate = false }) {
  const containerRef = useRef(null);
  const [dotLottie, setDotLottie] = useState(null);
  const hasPlayed = useRef(false);
  const triggerRef = useRef(null);

  const rotationValue = typeof rotation === 'number' ? `${rotation}deg` : rotation;

  useEffect(() => {
    if (!dotLottie) return;

    const onLoad = () => {
      if (immediate) {
        dotLottie.play();
        return;
      }

      dotLottie.pause();
      dotLottie.setFrame(0);

      triggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasPlayed.current) return;
          hasPlayed.current = true;
          dotLottie.setFrame(0);
          dotLottie.play();
        },
      });
    };

    dotLottie.addEventListener('load', onLoad);

    return () => {
      dotLottie.removeEventListener('load', onLoad);
      triggerRef.current?.kill();
    };
  }, [dotLottie, immediate]);

  return (
    <div ref={containerRef} style={{ width: size, height: size, overflow: 'hidden' }}>
      <DotLottieReact
        src="https://lottie.host/d87db903-bd4e-4236-9120-fa907615187f/PG4nNO9MrD.lottie"
        autoplay={false}
        dotLottieRefCallback={setDotLottie}
        style={{
          transform: `scale(1.4) rotate(${rotationValue})`,
          transition: 'transform 0.3s ease',
          display: 'block',
        }}
      />
    </div>
  );
}