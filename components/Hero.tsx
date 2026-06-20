'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Spring presets
  const smooth = { type: 'spring', damping: 30, stiffness: 200 } as const;
  const gentle = { type: 'spring', damping: 20, stiffness: 120 } as const;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles array
    const particleCount = 120;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      isGold: boolean;
    }> = [];

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000 };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        isGold: Math.random() < 0.25, // 25% particles are gold
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Get color tokens dynamically from ComputedStyle (handles light/dark transition)
      const style = getComputedStyle(document.documentElement);
      const textRaw = style.getPropertyValue('--color-text').trim() || '#000000';
      const accentRaw = style.getPropertyValue('--color-accent').trim() || '#c8a84b';

      // Draw and update particles
      particles.forEach((p) => {
        // Subtle drift towards mouse if close
        if (mouse.x > -500) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.15;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep inside bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold ? accentRaw : textRaw;
        ctx.globalAlpha = p.isGold ? 0.6 : 0.35;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.08;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = pi.isGold || pj.isGold ? accentRaw : textRaw;
            ctx.stroke();
          }
        }
      }

      // Draw connection to mouse
      if (mouse.x > -500) {
        ctx.globalAlpha = 0.15;
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.isGold ? accentRaw : textRaw;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8">
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-2 text-xs font-body text-text-muted mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Estd. 2026 — Impact Just KickedIn</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 0.25 }}
          className="font-display font-semibold tracking-tight text-hero text-text leading-[0.9] md:leading-[0.85] text-center"
        >
          Engineering
          <br />
          <span className="italic text-accent">Intelligence</span>
          <br />
          for Tomorrow.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...gentle, delay: 0.5 }}
          className="font-body text-lg md:text-xl text-text-muted mt-8 max-w-xl text-center leading-relaxed"
        >
          Building AI-powered products and digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smooth, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full max-w-xs sm:max-w-none"
        >
          <a
            href="#products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-text text-bg hover:bg-text-muted font-body font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-border hover:border-text font-body font-semibold text-sm transition-all duration-300 flex items-center justify-center"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-faint font-body">Scroll</span>
          <div className="w-[1.5px] h-10 bg-border/40 relative overflow-hidden rounded-full">
            <motion.div
              animate={{
                y: [0, 40, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-0 left-0 right-0 h-1/3 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
