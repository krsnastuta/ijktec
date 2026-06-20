'use client';

export default function Ticker() {
  const items = [
    'Artificial Intelligence',
    'Healthcare Technology',
    'Mobile Applications',
    'SaaS Platforms',
    'Automation Systems',
    'Impact Just KickedIn',
    'Estd. 2026',
  ];

  // Duplicate items to ensure a seamless looping effect
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-surface-2 border-y border-border/40 py-5 overflow-hidden flex select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 text-xs font-display font-medium tracking-widest text-text-muted uppercase">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  );
}
