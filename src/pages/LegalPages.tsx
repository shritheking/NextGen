import React, { useState } from 'react';
import { ShieldCheck, FileText, RefreshCw } from 'lucide-react';

export const LegalPages: React.FC<{ initialTab?: 'privacy' | 'terms' | 'refunds' }> = ({ initialTab = 'privacy' }) => {
  const [tab, setTab] = useState<'privacy' | 'terms' | 'refunds'>(initialTab);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Tabs */}
      <div className="flex border-b border-border-subtle gap-4 font-mono text-xs">
        <button
          onClick={() => setTab('privacy')}
          className={`pb-3 font-semibold transition-colors ${
            tab === 'privacy' ? 'text-accent-electric border-b-2 border-accent-electric' : 'text-text-muted hover:text-white'
          }`}
        >
          PRIVACY POLICY
        </button>
        <button
          onClick={() => setTab('terms')}
          className={`pb-3 font-semibold transition-colors ${
            tab === 'terms' ? 'text-accent-electric border-b-2 border-accent-electric' : 'text-text-muted hover:text-white'
          }`}
        >
          TERMS & CONDITIONS
        </button>
        <button
          onClick={() => setTab('refunds')}
          className={`pb-3 font-semibold transition-colors ${
            tab === 'refunds' ? 'text-accent-electric border-b-2 border-accent-electric' : 'text-text-muted hover:text-white'
          }`}
        >
          REFUND POLICY
        </button>
      </div>

      {tab === 'privacy' && (
        <div className="space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed bg-surface-card p-8 rounded-2xl hairline-border">
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
          <p className="font-mono text-xs text-text-muted">Last Updated: November 2026 • NextGen Web Studio, Coimbatore</p>
          <p>
            NextGen Web Studio respects your privacy. When you submit project briefs via our contact forms or interact with our Telegram bots, we collect only the necessary contact details (name, email, phone number, company name) required to deliver software engineering and scoping services.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Data Protection & Non-Disclosure</h2>
          <p>
            All client technical specifications, code repositories, database credentials, and business logic remain strictly confidential. We execute standard Non-Disclosure Agreements (NDAs) prior to onboarding proprietary projects.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Third-Party Processors</h2>
          <p>
            Our web applications may utilize trusted infrastructure providers including Supabase (PostgreSQL), Vercel (Edge Compute), and Razorpay / Stripe (Payment Rails). We never sell or monetize client telemetry.
          </p>
        </div>
      )}

      {tab === 'terms' && (
        <div className="space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed bg-surface-card p-8 rounded-2xl hairline-border">
          <h1 className="text-2xl font-bold text-white">Terms and Conditions</h1>
          <p className="font-mono text-xs text-text-muted">Last Updated: November 2026 • NextGen Web Studio, Coimbatore</p>
          <p>
            By commissioning software engineering, agentic AI development, or Telegram bot implementation from NextGen Web Studio, you agree to standard milestone-based contracts defined in your project Statement of Work (SOW).
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Code Ownership & Intellectual Property</h2>
          <p>
            Upon settlement of final project invoices, 100% full intellectual property and code ownership of bespoke software artifacts transfers entirely to the client. NextGen Web Studio claims no ongoing equity or proprietary lock-in.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Warranty & Bug Fix Support</h2>
          <p>
            All custom projects include a standard 30-day post-launch warranty period covering bug fixes and schema adjustments within the original scope.
          </p>
        </div>
      )}

      {tab === 'refunds' && (
        <div className="space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed bg-surface-card p-8 rounded-2xl hairline-border">
          <h1 className="text-2xl font-bold text-white">Cancellation & Refund Policy</h1>
          <p className="font-mono text-xs text-text-muted">Last Updated: November 2026 • NextGen Web Studio, Coimbatore</p>
          <p>
            Due to the custom architectural nature of software engineering and cloud infrastructure provisioning, initial scoping deposits are non-refundable once development sprints commence.
          </p>
          <h2 className="text-lg font-bold text-white pt-2">Milestone Protections</h2>
          <p>
            Projects are structured with distinct milestone deliverables (Discovery & Wireframing, Architecture & Database Schema, Front-End Build, Production Testing). If a client elects to terminate a project, fees are calculated strictly against completed and approved milestones.
          </p>
        </div>
      )}
    </div>
  );
};
