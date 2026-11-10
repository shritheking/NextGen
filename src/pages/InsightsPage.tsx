import React from 'react';
import { BookOpen, Terminal, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (page: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const articles = [
    {
      id: '1',
      title: 'Engineering Multi-Agent Systems with Deterministic Guardrails',
      summary: 'Why probabilistic LLMs fail in enterprise production without strict JSON schema verification, hierarchical agent routing, and sandboxed tool-calling policies.',
      category: 'Agentic AI',
      date: 'November 2026',
      readTime: '6 min read'
    },
    {
      id: '2',
      title: 'Achieving Sub-35ms Edge Latency: Benchmarking Vercel vs Cloudflare Workers',
      summary: 'A deep-dive into edge middleware, streaming SSR, and asset cache invalidation strategies that deliver instant visual render times.',
      category: 'Web Stack',
      date: 'October 2026',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Architecting High-Concurrency Telegram Bot Webhooks for Financial Alerts',
      summary: 'Handling thousands of simultaneous MT5 webhook dispatches with sub-50ms reaction times, cryptographic HMAC validation, and database connection pooling.',
      category: 'Telegram Bots',
      date: 'September 2026',
      readTime: '5 min read'
    },
    {
      id: '4',
      title: 'Real-Time Vector Similarity: Supabase pgvector in Production Workflows',
      summary: 'How we index 1536-dimensional embeddings with HNSW indexing to power sub-second customer support retrieval without memory blowups.',
      category: 'Database & RAG',
      date: 'August 2026',
      readTime: '7 min read'
    }
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-electric/10 hairline-border font-mono text-xs text-accent-electric">
          <span>ENGINEERING DISPATCHES & KNOWLEDGE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Technical Insights from the Studio.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Unfiltered engineering essays, architecture breakdowns, and implementation lessons from building autonomous agents, edge web platforms, and bots.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map(art => (
          <article
            key={art.id}
            className="bg-surface-card rounded-2xl p-8 hairline-border hairline-border-hover space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="text-accent-electric font-semibold">{art.category}</span>
                <div className="flex items-center gap-2">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-white hover:text-accent-electric transition-colors leading-snug">
                {art.title}
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle flex items-center justify-between font-mono text-xs text-accent-electric">
              <span className="flex items-center gap-1.5 hover:underline cursor-pointer">
                Read Technical Essay <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-text-muted">NextGen Studio Press</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
