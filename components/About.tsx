'use client';

import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { value: '2026', label: 'Founded' },
    { value: '5+', label: 'Products Underway' },
    { value: 'AI-1st', label: 'Engineering Philosophy' },
    { value: '∞', label: 'Ambition Uncapped' },
  ];

  const pillars = [
    {
      number: '01',
      title: 'Innovation First',
      description: 'We prioritize original design, blue-sky thinking, and questioning established conventions.',
    },
    {
      number: '02',
      title: 'Engineering Excellence',
      description: 'Clean abstractions, optimal performance, and robust security represent our baseline standards.',
    },
    {
      number: '03',
      title: 'AI-First Mindset',
      description: 'We build systems with intelligence embedded at the core, rather than patched on top.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-surface-2 border-y border-border/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Info + Stats */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-xs font-display font-semibold tracking-widest text-accent uppercase">
                Who We Are
              </span>
              <h2 className="font-display font-bold text-text text-2xl md:text-4xl tracking-tight mt-2 mb-6">
                Shaping cognitive computing and digital environments.
              </h2>
              <p className="font-body text-sm md:text-base text-text-muted leading-relaxed">
                IJKTEC is an independent technology collective based in Mumbai, India. We construct software, systems, and tools across artificial intelligence, clinical health intelligence, mobile interfaces, and automation. Our motto is simple: engineer intelligence, build the future.
              </p>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border/25">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display font-semibold text-2xl md:text-3xl text-text tracking-tight mb-1">
                    {stat.value}
                  </span>
                  <span className="font-body text-xs text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Large monogram graphic + 3 pillars */}
          <div className="relative flex flex-col gap-10 bg-surface/50 border border-border/30 rounded-3xl p-8 md:p-10 overflow-hidden min-h-[450px] justify-between">
            {/* Faded Large SVG Monogram */}
            <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-[0.03] dark:opacity-[0.02] transform translate-x-16 -translate-y-16">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full text-text">
                <g transform="translate(18, 25)">
                  <path d="M12 25 C12 20, 14 18, 16 18 C18 18, 19 20, 19 25 L19 40 C19 42, 17 44, 15 44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="16" cy="10" r="3.5" fill="currentColor" />
                  <path d="M28 18 L28 48 C28 56, 22 60, 16 60 C12 60, 10 58, 10 55" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="28" cy="10" r="3.5" fill="currentColor" />
                  <path d="M42 12 L42 44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M54 18 L43 30 L54 44" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="M43 30 L49 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                </g>
              </svg>
            </div>

            <div>
              <span className="text-xs font-display font-semibold tracking-widest text-accent uppercase mb-6 block">
                Our Core Pillars
              </span>

              {/* Numbered Pillars */}
              <div className="flex flex-col gap-6">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="font-display font-semibold text-accent text-sm md:text-base leading-none pt-1">
                      {pillar.number}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-display font-semibold text-text text-sm md:text-base leading-none">
                        {pillar.title}
                      </h4>
                      <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
