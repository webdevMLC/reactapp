// components/ParticleBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      phase: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 25000); // reduced density
      
      const colors = [
        'rgba(255, 255, 255, 1)',
        'rgba(220, 200, 255, 1)',
        'rgba(200, 220, 255, 1)',
        'rgba(240, 210, 255, 1)',
      ];

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          baseSize: Math.random() * 2 + 1.5,
          phase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticles = (timestamp: number) => {
      timeRef.current = timestamp / 500;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (so they appear behind dots)
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased max distance and opacity for better visibility
          const maxDistance = 180;
          if (distance < maxDistance) {
            ctx.beginPath();
            // Opacity ranges from 0.3 at close range to 0 at maxDistance
            const opacity = 0.4 * (1 - distance / maxDistance);
            ctx.strokeStyle = `rgba(220, 200, 255, ${opacity})`; // brighter line color
            ctx.lineWidth = 1.2; // thicker lines
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      // Draw particles on top
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulsing effect
        const pulse = Math.sin(timeRef.current + particle.phase) * 0.3 + 0.7;
        const currentSize = particle.baseSize * (0.7 + 0.5 * pulse);
        const opacity = 0.7 + 0.3 * pulse;

        const colorMatch = particle.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (colorMatch) {
          const [r, g, b] = [colorMatch[1], colorMatch[2], colorMatch[3]];
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else {
          ctx.fillStyle = particle.color;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Optional subtle glow
        ctx.shadowColor = 'rgba(200, 180, 255, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resize();
    initParticles();
    drawParticles(0);

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}