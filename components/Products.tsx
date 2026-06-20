'use client';

import { motion } from 'framer-motion';
import { Brain, Stethoscope, Sparkles } from 'lucide-react';
import React, { useRef } from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  progress: number;
  status: string;
  statusColor: string;
  icon: React.ReactNode;
  className?: string;
  dashed?: boolean;
}

function ProductCard({
  title,
  description,
  progress,
  status,
  statusColor,
  icon,
  className = '',
  dashed = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-3xl bg-surface-2 p-8 transition-all duration-500 overflow-hidden ${
        dashed ? 'border-2 border-dashed border-border' : 'border border-border/60 hover:border-accent/40'
      } ${className}`}
    >
      {/* Radial hover glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--color-accent-glow), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full gap-8">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-text-muted group-hover:text-accent transition-colors duration-300">
              {icon}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 bg-surface text-xs font-body">
              <span className={`w-1.5 h-1.5 rounded-full ${statusColor} animate-pulse`} />
              <span className="text-text-muted">{status}</span>
            </div>
          </div>

          {/* Title & Desc */}
          <h3 className="font-display font-semibold text-text text-xl md:text-2xl tracking-tight mb-2">
            {title}
          </h3>
          <p className="font-body text-text-muted text-sm md:text-base leading-relaxed max-w-lg">
            {description}
          </p>
        </div>

        {/* Progress Section */}
        <div>
          <div className="flex justify-between items-center text-xs font-body text-text-muted mb-2">
            <span>Development Progress</span>
            <span className="font-semibold text-text">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-surface-offset rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="mb-16">
        <span className="text-xs font-display font-semibold tracking-widest text-accent uppercase">
          Product Ecosystem
        </span>
        <h2 className="font-display font-bold text-text text-2xl md:text-4xl tracking-tight mt-2 max-w-xl">
          Intelligent solutions designed for rapid impact.
        </h2>
      </div>

      {/* Asymmetric Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: AlogiX - Col Span 2 */}
        <ProductCard
          title="AlogiX"
          description="Advanced AI intelligence platform powering cognitive reasoning, complex workflows, and predictive analytics for modern enterprises."
          progress={80}
          status="Launching Soon"
          statusColor="bg-accent"
          icon={<Brain className="w-8 h-8" />}
          className="md:col-span-2 min-h-[300px]"
        />

        {/* Card 2: AI Healthcare - Col Span 1 */}
        <ProductCard
          title="AI Healthcare"
          description="Clinical-grade diagnostic assistance and smart health intelligence platforms to revolutionize patient assessment."
          progress={65}
          status="Launching Soon"
          statusColor="bg-accent"
          icon={<Stethoscope className="w-8 h-8" />}
          className="md:col-span-1 min-h-[300px]"
        />

        {/* Card 3: Future Products - Col Span 3 (Dashed) */}
        <ProductCard
          title="Future Products"
          description="We are incubating SaaS tools, automation interfaces, and innovative hardware pipelines. Stay tuned for more project reveals."
          progress={40}
          status="In Research"
          statusColor="bg-text-faint"
          icon={<Sparkles className="w-8 h-8" />}
          className="md:col-span-3 min-h-[220px]"
          dashed={true}
        />
      </div>
    </section>
  );
}
