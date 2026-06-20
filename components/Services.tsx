'use client';

import { Cpu, Smartphone, Heart, Globe, Cloud } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'AI Solutions',
      description: 'Custom ML models, large language model (LLM) integrations, and intelligent automation pipelines.',
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      title: 'Mobile Development',
      description: 'Flutter-powered, cross-platform mobile apps built for performance and high-fidelity feel.',
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: 'Healthcare Technology',
      description: 'Clinical-grade diagnostic intelligence engines and smart patient data management systems.',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: 'Web Platforms',
      description: 'Enterprise-grade SaaS architectures, dashboards, and scalable frontends built on modern frameworks.',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: 'Cloud Solutions',
      description: 'Serverless deployment models, optimized DevOps configurations, and Cloudflare/Vercel edge networks.',
      icon: <Cloud className="w-6 h-6" />,
    },
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <span className="text-xs font-display font-semibold tracking-widest text-accent uppercase">
          Capabilities
        </span>
        <h2 className="font-display font-bold text-text text-2xl md:text-4xl tracking-tight mt-2 max-w-xl">
          Engineered to scale. Built to perform.
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-surface-2 p-6 border border-border/50 hover:border-accent hover:shadow-[0_0_15px_var(--color-accent-glow)] transition-all duration-300 flex flex-col gap-5 justify-between min-h-[220px]"
          >
            <div className="text-text-muted group-hover:text-accent transition-colors duration-300">
              {service.icon}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-display font-semibold text-text text-base md:text-lg tracking-tight">
                {service.title}
              </h3>
              <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
