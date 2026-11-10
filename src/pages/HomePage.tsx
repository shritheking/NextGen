import React from 'react';
import { ArrowRight, Bot, Globe, Send, Terminal, CheckCircle2, ShieldCheck, Zap, Layers, Cpu, Code2, ArrowUpRight } from 'lucide-react';
import { OrbitalCenterpiece } from '../three/OrbitalCenterpiece';
import { OrchestratorPipeline } from '../components/OrchestratorPipeline';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow CLI Indicator */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hairline-border text-[11px] sm:text-xs font-mono text-text-secondary mb-8 max-w-full">
            <span className="text-accent-electric whitespace-nowrap">~/coimbatore-tn</span>
            <span className="text-text-muted hidden sm:inline">•</span>
            <span className="text-accent-emerald flex items-center gap-1.5 font-medium whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-ping inline-block"></span>
              STATUS: ACCEPTING CLIENT DEPLOYMENTS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Building Intelligent{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-electric via-blue-400 to-accent-violet">
                  Digital Experiences.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
                We engineer intelligent AI systems, powerful web applications and automated digital solutions that help businesses scale.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono tracking-wider hover:bg-gray-200 transition-all shadow-sm flex items-center gap-2 group"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('portfolio')}
                  className="px-6 py-3.5 rounded-xl bg-surface-card text-white font-medium text-xs font-mono tracking-wider hairline-border hover:bg-surface-hover transition-all"
                >
                  EXPLORE OUR WORK
                </button>
              </div>

              {/* Core Quality Pillars */}
              <div className="pt-6 border-t border-border-subtle grid grid-cols-3 gap-4 font-mono text-xs text-text-muted">
                <div>
                  <div className="text-white font-bold text-sm">100%</div>
                  <div>Full Code Ownership</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">&lt; 35ms</div>
                  <div>Edge Latency Standard</div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">24/7</div>
                  <div>Autonomous Bot Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Orbital Centerpiece with macOS Terminal Glass */}
            <div className="lg:col-span-5 relative">
              <div className="bg-surface-card rounded-2xl hairline-border shadow-elevated overflow-hidden">
                {/* Window Bar */}
                <div className="bg-surface-elevated px-4 py-2.5 border-b border-border-subtle flex items-center justify-between font-mono text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    <span className="ml-2 text-[11px] text-text-secondary">nextgen • neural-orbital-canvas</span>
                  </div>
                  <span className="text-[10px] text-accent-emerald flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                    WebGL Active
                  </span>
                </div>

                {/* 3D WebGL Canvas */}
                <div className="p-2 relative bg-canvas-inset/90">
                  <OrbitalCenterpiece className="h-[300px]" />
                  <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-canvas/80 hairline-border font-mono text-[10px] text-text-muted">
                    <Zap className="w-3 h-3 text-accent-electric" />
                    <span>Procedural Three.js Node Graph</span>
                  </div>
                </div>

                {/* Live Console Output */}
                <div className="bg-surface-terminal p-4 border-t border-border-subtle font-mono text-[11px] space-y-1.5 text-text-muted">
                  <div className="flex items-center justify-between">
                    <span className="text-accent-electric">[AGENT_TRIAGE] Processing inbound task:</span>
                    <span className="text-accent-emerald">SYNTHESIS_OK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-electric">[VECTOR_SEARCH] Supabase pgvector match:</span>
                    <span className="text-accent-cyan">18ms (cosine: 0.94)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-electric">[GATEWAY] Razorpay / MT5 edge relay:</span>
                    <span className="text-accent-emerald">VERIFIED_200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND POSITIONING MANIFESTO */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-base rounded-2xl p-8 sm:p-12 hairline-border space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">
            Brand Positioning
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-3xl leading-snug">
            “Beyond Websites. Beyond Automation. We Build Intelligent Digital Futures.”
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Headquartered in Coimbatore, Tamil Nadu, NextGen Web Studio merges high-velocity full-stack engineering with cutting-edge agentic intelligence. We don't construct generic marketing pages; we build mission-critical digital machinery designed to outperform.
          </p>
        </div>
      </section>

      {/* 3. THREE FLAGSHIP SERVICES */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Three Specialized Engineering Disciplines.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-mono text-accent-electric hover:text-accent-electric-hover flex items-center gap-1"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Agentic AI */}
          <div className="bg-surface-card rounded-2xl p-7 hairline-border hairline-border-hover space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent-electric/10 text-accent-electric flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Agentic AI Development</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Autonomous multi-agent systems, deterministic reasoning loops, custom LLM tool-calling, and real-time knowledge retrieval on Supabase pgvector.
              </p>
              <ul className="space-y-1.5 font-mono text-xs text-text-muted pt-2 border-t border-border-subtle">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-electric"></span>
                  Multi-Agent Orchestration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-electric"></span>
                  LangGraph & AutoGen Workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-electric"></span>
                  Enterprise Document Intelligence
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('agentic-ai')}
              className="w-full py-2.5 rounded-xl bg-surface-elevated text-xs font-mono text-text-primary hover:text-white hairline-border flex items-center justify-center gap-2"
            >
              <span>Explore Agentic AI</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: Web Dev */}
          <div className="bg-surface-card rounded-2xl p-7 hairline-border hairline-border-hover space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Full-Stack Web Stack</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Sub-35ms edge latency platforms, bespoke booking portals, high-conversion SaaS web applications, and multi-tenant inventory & billing engines.
              </p>
              <ul className="space-y-1.5 font-mono text-xs text-text-muted pt-2 border-t border-border-subtle">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                  Next.js & React Edge Deployments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                  Razorpay & Stripe Integrated Checkout
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                  100/100 Core Web Vitals Audited
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('web-dev')}
              className="w-full py-2.5 rounded-xl bg-surface-elevated text-xs font-mono text-text-primary hover:text-white hairline-border flex items-center justify-center gap-2"
            >
              <span>Explore Web Stack</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: Telegram Bots */}
          <div className="bg-surface-card rounded-2xl p-7 hairline-border hairline-border-hover space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Telegram Bot Engineering</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Automated VIP community paywalls, MT5 financial signal broadcasts, private channel access gatekeepers, and conversational AI bots.
              </p>
              <ul className="space-y-1.5 font-mono text-xs text-text-muted pt-2 border-t border-border-subtle">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                  Sub-50ms Webhook Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                  MT5 & Crypto Exchange Alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet"></span>
                  Auto-Expiring VIP Invite Links
                </li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('telegram-bots')}
              className="w-full py-2.5 rounded-xl bg-surface-elevated text-xs font-mono text-text-primary hover:text-white hairline-border flex items-center justify-center gap-2"
            >
              <span>Explore Telegram Bots</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE AI WORKFLOW DEMONSTRATION */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">
            Orchestration Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Our Autonomous Systems Execute.
          </h2>
          <p className="text-sm text-text-secondary max-w-xl">
            Explore live workflow simulation showing ingestion, reasoning, tool selection, and verified execution across enterprise domains.
          </p>
        </div>

        <OrchestratorPipeline />
      </section>

      {/* 5. FEATURED CLIENT CASE STUDIES */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Production Software Shipped & Verified.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="text-xs font-mono text-accent-electric hover:text-accent-electric-hover flex items-center gap-1"
          >
            <span>View All 7 Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1: Boomers Gaming */}
          <div className="bg-surface-card rounded-2xl overflow-hidden hairline-border hairline-border-hover group">
            <div className="h-64 overflow-hidden bg-surface-base relative">
              <img
                src="/images/boomers_cafe_new.png"
                alt="Boomers Gaming Cafe Management Software"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-canvas/80 backdrop-blur-md hairline-border font-mono text-[10px] text-accent-emerald">
                ● LIVE COMMERCIAL CLIENT
              </div>
            </div>
            <div className="p-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-electric">
                <span>Gaming Lounge OS</span>
                <span>•</span>
                <span>Coimbatore</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-accent-electric transition-colors">
                Boomers Gaming Lounge Management
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Complete LAN center management system with real-time PC slot allocations, customer session timers, cafe food ordering, and UPI billing.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">React</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">Node.js</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">Socket.io</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">Razorpay UPI</span>
              </div>
            </div>
          </div>

          {/* Project 2: GoatTurf */}
          <div className="bg-surface-card rounded-2xl overflow-hidden hairline-border hairline-border-hover group">
            <div className="h-64 overflow-hidden bg-surface-base relative">
              <img
                src="/images/turf_dashboard_new.png"
                alt="GoatTurf Arena Booking Platform"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-canvas/80 backdrop-blur-md hairline-border font-mono text-[10px] text-accent-emerald">
                ● LIVE COMMERCIAL CLIENT
              </div>
            </div>
            <div className="p-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-electric">
                <span>Sports Arena SaaS</span>
                <span>•</span>
                <span>Coimbatore</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-accent-electric transition-colors">
                GoatTurf Sports Venue Reservation
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Multi-court booking platform with sub-second slot conflict prevention, WhatsApp confirmation passes, and instant manager ledger syncing.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">Next.js Edge</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">Supabase</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">PostgreSQL Locks</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">WhatsApp Cloud API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION & TECHNICAL INQUIRY BANNER */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-surface-card via-surface-elevated to-surface-card rounded-2xl p-8 sm:p-14 hairline-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">
              Ready to Build?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Architect Your Digital System with NextGen Studio.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Tell us your objectives, integration requirements, or automation hurdles. Our engineers in Coimbatore will review your scope and provide a direct roadmap.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-xl bg-accent-electric text-white font-semibold text-xs font-mono tracking-wider hover:bg-accent-electric-hover transition-all shrink-0 shadow-card-glow"
          >
            START TECHNICAL SCOPING
          </button>
        </div>
      </section>
    </div>
  );
};
