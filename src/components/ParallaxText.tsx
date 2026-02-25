'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

export default function ParallaxText({ 
  children, 
  baseVelocity = -5,
  className = '' 
}: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const [contentWidth, setContentWidth] = useState(0);
  const [repeatedContent, setRepeatedContent] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setContentWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  useEffect(() => {
    if (contentWidth > 0) {
      const screenWidth = window.innerWidth;
      const copies = Math.ceil(screenWidth / contentWidth) + 2;
      setRepeatedContent(Array(copies).fill(children));
    }
  }, [contentWidth, children]);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    
    const scrollVelocity = scrollY.getVelocity() / 1000;
    moveBy += scrollVelocity * 2;
    
    baseX.set(baseX.get() + moveBy);
    
    if (baseX.get() < -contentWidth) {
      baseX.set(0);
    }
    if (baseX.get() > contentWidth) {
      baseX.set(0);
    }
  });

  const springX = useSpring(baseX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(springX, (v) => {
    if (contentWidth === 0) return "0px";
    return `${v}px`;
  });

  return (
    <div 
      ref={containerRef}
      className={`parallax-text-container overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div 
        className="parallax-text-content inline-block"
        style={{ x }}
      >
        <span ref={textRef} className="inline-block text-2xl md:text-4xl font-light tracking-wider">
          {children}
        </span>
        <span className="inline-block mx-8 text-purple-400">•</span>
        {repeatedContent.map((text, index) => (
          <span key={index} className="inline-block">
            <span className="text-2xl md:text-4xl font-light tracking-wider">{text}</span>
            <span className="inline-block mx-8 text-purple-400">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}