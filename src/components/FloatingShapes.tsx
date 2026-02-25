'use client';

import { motion } from 'framer-motion';

interface FloatingShapesProps {
  mousePosition: { x: number; y: number };
}

export default function FloatingShapes({ mousePosition }: FloatingShapesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full mix-blend-screen filter blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${
              i % 2 === 0 ? '#8B5CF6' : '#3B82F6'
            }40, transparent 70%)`,
            left: `${20 + i * 15}%`,
            top: `${15 + i * 20}%`,
            x: mousePosition.x * (0.02 + i * 0.01),
            y: mousePosition.y * (0.02 + i * 0.01),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}