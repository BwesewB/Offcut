'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LottieArrow({ size = '8rem', rotation = 180, }) {

const rotationValue =
    typeof rotation === 'number' ? `${rotation}deg` : rotation;

  return (
    <div style={{ width: size, height: size, overflow: 'hidden', }}>
        <DotLottieReact
            src="https://lottie.host/d87db903-bd4e-4236-9120-fa907615187f/PG4nNO9MrD.lottie"
            autoplay
            style={{  
                transform: `scale(1.4) rotate(${rotationValue})`,
                transition: 'transform 0.3s ease',
                display: 'block', }}
        />
    </div>

  );
}