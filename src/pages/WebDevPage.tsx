import React from 'react';
import { Globe, Cpu, Zap, Shield, CheckCircle2, ArrowRight, Gauge, Layers, Terminal } from 'lucide-react';

interface WebDevPageProps {
  onNavigate: (page: string) => void;
}

export const WebDevPage: React.FC<WebDevPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Sub-35ms Edge Latency Standard',
      description: 'Distributed Vercel / Cloudflare edge compute ensuring immediate server-rendered responses globally.',
      icon: Zap
    },
    {
      title: 'Zero Layout Shift (CLS 0.00)',
      description: 'Mathematical spacing tokens and font preloading eliminating jarring cumulative layout shifts completely.',
      icon: Gauge
    },
    {
      title: 'Resilient PostgreSQL & Supabase Backends',
      description: 'Row-level security, ACID compliance, and connection pooling handling high concurrent traffic seamlessly.',
      icon: Layers
    },
    {
      title: 'Integrated Payment Rails',
      description: 'Native Razorpay, Stripe, and UPI checkout flows with automated webhook reconciliations.',
      icon: Shield
    }
  ];

  const services = [
    'Bespoke Business Web Applications',
    'High-Velocity SaaS Platforms',
    'Custom Headless E-Commerce Engines',
    'Real-Time Sports & Arena Booking Portals',
    'Multi-Tenant GST POS & Billing Software',
    'Enterprise Admin Dashboards & Telemetry',
    'High-Conversion International Landing Pages',
    'REST & GraphQL Custom API Microservices'
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 hairline-border font-mono text-xs text-accent-cyan">
          <span>FULL-STACK WEB DISCIPLINES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Sub-Second Web Platforms & Custom SaaS Engines.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          We don't use clunky WordPress templates or drag-and-drop builders. Every NextGen web project is custom-coded in modern React, TypeScript, and edge runtime architectures engineered for speed, security, and conversion.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-accent-cyan text-black font-mono text-xs font-semibold hover:bg-cyan-300 transition-all flex items-center gap-2"
          >
            <span>COMMISSION A WEB PLATFORM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lighthouse 100/100 Terminal */}
      <div className="bg-surface-card rounded-2xl p-6 md:p-8 hairline-border space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <span className="font-mono text-xs text-accent-cyan">AUDIT STANDARD</span>
            <h3 className="text-xl font-bold text-white mt-1">Google Lighthouse Performance Targets</h3>
          </div>
          <span className="font-mono text-xs text-accent-emerald flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            STRICT ZERO-REGRESSION BENCHMARK
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-surface-base p-5 rounded-xl hairline-border space-y-2">
            <div className="text-3xl font-extrabold text-accent-emerald font-mono">100</div>
            <div className="text-xs font-mono text-text-secondary">PERFORMANCE</div>
          </div>
          <div className="bg-surface-base p-5 rounded-xl hairline-border space-y-2">
            <div className="text-3xl font-extrabold text-accent-emerald font-mono">100</div>
            <div className="text-xs font-mono text-text-secondary">ACCESSIBILITY</div>
          </div>
          <div className="bg-surface-base p-5 rounded-xl hairline-border space-y-2">
            <div className="text-3xl font-extrabold text-accent-emerald font-mono">100</div>
            <div className="text-xs font-mono text-text-secondary">BEST PRACTICES</div>
          </div>
          <div className="bg-surface-base p-5 rounded-xl hairline-border space-y-2">
            <div className="text-3xl font-extrabold text-accent-emerald font-mono">100</div>
            <div className="text-xs font-mono text-text-secondary">SEO SCORE</div>
          </div>
        </div>
      </div>

      {/* Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="bg-surface-card p-6 rounded-2xl hairline-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-surface-elevated text-accent-cyan flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{p.description}</p>
            </div>
          );
        })}
      </div>

      {/* Services List */}
      <div className="bg-surface-base rounded-2xl p-8 hairline-border space-y-6">
        <h3 className="text-xl font-bold text-white">Full-Stack Scope of Work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs font-mono text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
