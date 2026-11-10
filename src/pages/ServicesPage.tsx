import React from 'react';
import { Bot, Globe, Send, CheckCircle2, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-electric/10 hairline-border font-mono text-xs text-accent-electric">
          <span>ENGINEERING DISCIPLINES CATALOG</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          What We Build at NextGen Web Studio.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          From multi-agent reasoning systems to high-velocity edge web applications and algorithmic Telegram bots, explore our core engineering disciplines.
        </p>
      </div>

      {/* 3 Main Disciplines */}
      <div className="space-y-8">
        {/* Discipline 1 */}
        <div className="bg-surface-card rounded-2xl p-8 hairline-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-accent-electric/10 text-accent-electric flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Agentic AI Development</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              We engineer custom autonomous multi-agent systems, deterministic reasoning loops with step-level JSON validation, LLM tool integrations, and Supabase pgvector high-dimensional embeddings for enterprise RAG memory.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">LangGraph</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Supabase pgvector</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Structured Outputs</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Tool Calling</span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => onNavigate('agentic-ai')}
              className="px-6 py-3 rounded-xl bg-accent-electric text-white font-mono text-xs font-semibold hover:bg-accent-electric-hover transition-all flex items-center gap-2"
            >
              <span>DEEP DIVE AGENTIC AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discipline 2 */}
        <div className="bg-surface-card rounded-2xl p-8 hairline-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Full-Stack Web Stack Development</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Sub-35ms edge latency platforms, modern React and Next.js applications, bespoke reservation portals, multi-tenant GST billing software, and custom checkout flows with native Razorpay and Stripe rails.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Next.js Edge</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">PostgreSQL</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Razorpay UPI</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">100/100 Lighthouse</span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => onNavigate('web-dev')}
              className="px-6 py-3 rounded-xl bg-accent-cyan text-black font-mono text-xs font-semibold hover:bg-cyan-300 transition-all flex items-center gap-2"
            >
              <span>DEEP DIVE WEB STACK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discipline 3 */}
        <div className="bg-surface-card rounded-2xl p-8 hairline-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Telegram Bot Engineering</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              High-concurrency webhook bot architectures, automated VIP subscription paywalls, MT5 financial trading signals, private channel member gates, and AI-powered conversational Telegram bots.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Sub-50ms Webhooks</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">MT5 Financial Feeds</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">VIP Paywalls</span>
              <span className="px-3 py-1 rounded-md bg-surface-elevated text-xs font-mono text-text-muted">Bot API</span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => onNavigate('telegram-bots')}
              className="px-6 py-3 rounded-xl bg-accent-violet text-white font-mono text-xs font-semibold hover:bg-violet-600 transition-all flex items-center gap-2"
            >
              <span>DEEP DIVE TELEGRAM BOTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
