import React from 'react';
import { MapPin, ShieldCheck, Terminal, Cpu, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-electric/10 hairline-border font-mono text-xs text-accent-electric">
          <span>STUDIO MANIFESTO & IDENTITY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Engineered in Coimbatore. Delivered Internationally.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          NextGen Web Studio is an independent AI engineering and digital product studio located in Coimbatore, Tamil Nadu. We build intelligent agentic systems, sub-second web platforms, and automated Telegram bots for ambitious founders and enterprises worldwide.
        </p>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-surface-card p-8 rounded-2xl hairline-border space-y-4">
          <div className="font-mono text-xs text-accent-electric font-semibold">01 • CODE FIDELITY</div>
          <h3 className="text-xl font-bold text-white">Zero Slop, Zero Smoke-and-Mirrors</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            We don't wrap basic OpenAI prompts and call it "enterprise AI". We build multi-agent orchestrators with deterministic guardrails, structured JSON outputs, Supabase pgvector RAG, and automated API tools.
          </p>
        </div>

        <div className="bg-surface-card p-8 rounded-2xl hairline-border space-y-4">
          <div className="font-mono text-xs text-accent-cyan font-semibold">02 • SOVEREIGN OWNERSHIP</div>
          <h3 className="text-xl font-bold text-white">100% Client Code Ownership</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            You own every single line of code, database migration script, and deployment configuration. No vendor lock-in. No proprietary black boxes. Deploy on your Vercel, Supabase, and AWS accounts.
          </p>
        </div>

        <div className="bg-surface-card p-8 rounded-2xl hairline-border space-y-4">
          <div className="font-mono text-xs text-accent-violet font-semibold">03 • EDGE LATENCY</div>
          <h3 className="text-xl font-bold text-white">Sub-35ms Latency Standard</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Speed is a feature. We engineer web applications with sub-second page loads, zero cumulative layout shifts (CLS 0.00), and automated edge caching distributed globally.
          </p>
        </div>
      </div>

      {/* Studio Location & Contact Banner */}
      <div className="bg-surface-base p-8 sm:p-12 rounded-2xl hairline-border grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">Location & Heritage</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Rooted in Coimbatore's Industrial Tech Spirit</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Known as the Manchester of South India, Coimbatore has always been a hub of relentless precision manufacturing and engineering. We bring that exact same culture of mechanical reliability to software architecture, agentic intelligence, and web development.
          </p>
        </div>

        <div className="bg-surface-terminal p-6 rounded-xl hairline-border font-mono text-xs space-y-3">
          <div className="text-accent-electric font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Coimbatore Studio Coordinates</span>
          </div>
          <div className="text-text-muted">Latitude: 11.0168° N | Longitude: 76.9558° E</div>
          <div className="text-text-muted">State: Tamil Nadu, India • Pin: 641001</div>
          <div className="text-text-muted">Operating Hours: Monday – Saturday (09:00 - 18:00 IST)</div>
          <div className="pt-2 border-t border-border-subtle flex items-center gap-4 text-white">
            <a href="https://wa.me/916379140067" target="_blank" rel="noreferrer" className="text-accent-emerald hover:underline">
              WhatsApp: +91 63791 40067
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
