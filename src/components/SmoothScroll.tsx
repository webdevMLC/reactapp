// components/SmoothScroll.tsx
'use client';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.3,                // Very short – almost instant
      easing: (t) => t,              // Linear – no curve
      smoothWheel: true,
      wheelMultiplier: 2,          // Adjust speed to your liking
      touchMultiplier: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenisRef.current?.destroy();
  }, []);

  return <>{children}</>;
}