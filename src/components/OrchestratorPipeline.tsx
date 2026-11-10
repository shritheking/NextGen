import React, { useState } from 'react';
import { Cpu, Terminal, ArrowRight, CheckCircle2, ShieldCheck, Database, Layers, MessageSquare, Zap } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  description: string;
  telemetry: string;
}

interface Scenario {
  id: string;
  title: string;
  category: string;
  request: string;
  stages: Stage[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'support',
    title: 'Autonomous Support & Knowledge RAG',
    category: 'Enterprise AI Agent',
    request: 'User asks: "How do I reconcile invoice GST differences for Q3 transactions in billing dashboard?"',
    stages: [
      { id: '1', name: 'User Request', description: 'Inbound prompt parsed and sanitized via edge gateway.', telemetry: '[INGEST] Token count: 28 | Latency: 4ms | IP Location: Verified' },
      { id: '2', name: 'AI Orchestrator', description: 'Intent classified as TAX_RECONCILIATION_FINANCE.', telemetry: '[ORCHESTRATOR] Routing to TaxEngineAgent v2.4 (Confidence: 0.98)' },
      { id: '3', name: 'Reasoning & Planning', description: 'Extracts user organization ID and constructs semantic vector query.', telemetry: '[REASONING] Generating 1536-dim embedding via pgvector match.' },
      { id: '4', name: 'Tools & API Integrations', description: 'Queries Supabase pgvector and cross-references GSTR-1 filings.', telemetry: '[TOOL_CALL] db.getInvoices({ quarter: "Q3", status: "mismatched" }) -> 3 rows' },
      { id: '5', name: 'Execution', description: 'Synthesizes step-by-step resolution with deep link to credit notes.', telemetry: '[SYNTHESIS] Validating guardrails: Zero hallucinations detected.' },
      { id: '6', name: 'Verified Result', description: 'Formatted interactive solution returned to user in 320ms.', telemetry: '[COMPLETE] HTTP 200 OK | Rendered interactive resolution drawer.' }
    ]
  },
  {
    id: 'finance',
    title: 'Algorithmic Financial Risk & Execution',
    category: 'Fintech Automation',
    request: 'Inbound tick: MT5 EURUSD volatility surge detected across 5-minute Bollinger threshold.',
    stages: [
      { id: '1', name: 'User Request', description: 'High-frequency telemetry received via edge WebSocket.', telemetry: '[INGEST] WebSocket packet seq#88129 | Timestamp delta: 2.1ms' },
      { id: '2', name: 'AI Orchestrator', description: 'Volatility classified as EVENT_RISK_SPIKE.', telemetry: '[ORCHESTRATOR] Triggering Hedging & Risk Verification Routine.' },
      { id: '3', name: 'Reasoning & Planning', description: 'Evaluates current portfolio delta exposure against maximum drawdown limits.', telemetry: '[REASONING] Portfolio VaR at 0.8% < Max Allowable 2.0%.' },
      { id: '4', name: 'Tools & API Integrations', description: 'Simulates slippage on secondary liquidity provider via FIX protocol.', telemetry: '[TOOL_CALL] fix.quote("EURUSD", 10_LOTS) -> Spread: 0.2 pips' },
      { id: '5', name: 'Execution', description: 'Dispatches balanced hedging orders across twin liquidity pools.', telemetry: '[EXECUTE] Fill confirmation received: Ticket #9928341' },
      { id: '6', name: 'Verified Result', description: 'Trade logged to audit ledger with cryptographic signature.', telemetry: '[COMPLETE] Position hedged. Zero net overnight slippage.' }
    ]
  },
  {
    id: 'telegram',
    title: 'Telegram Subscription & VIP Webhook Gate',
    category: 'Community Engineering',
    request: 'Razorpay webhook received: Successful subscription payment of ₹4,999/month for Alpha Desk.',
    stages: [
      { id: '1', name: 'User Request', description: 'Encrypted webhook payload received with HMAC SHA256 signature.', telemetry: '[INGEST] Webhook validated: signature_match = true' },
      { id: '2', name: 'AI Orchestrator', description: 'Identifies paying member Telegram account ID via metadata mapping.', telemetry: '[ORCHESTRATOR] Matched Telegram ID @client_trading' },
      { id: '3', name: 'Reasoning & Planning', description: 'Verifies active member tier and calculates expiry date (+30 days).', telemetry: '[REASONING] Tier: VIP_PRO | Expiration: 2026-12-08T00:00:00Z' },
      { id: '4', name: 'Tools & API Integrations', description: 'Calls Telegram Bot API to generate single-use auto-revoking invite link.', telemetry: '[TOOL_CALL] bot.createChatInviteLink({ member_limit: 1, expire_date: +86400 })' },
      { id: '5', name: 'Execution', description: 'Delivers custom welcome DM with rules, invite link, and onboarding guide.', telemetry: '[EXECUTE] Telegram message ID #14092 sent via Bot API.' },
      { id: '6', name: 'Verified Result', description: 'Audit record persisted to Supabase and recurring cron job scheduled.', telemetry: '[COMPLETE] Member onboarded in 180ms without human intervention.' }
    ]
  }
];

export const OrchestratorPipeline: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('support');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(2);

  const scenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <div className="w-full bg-surface-card rounded-2xl hairline-border p-6 md:p-8 space-y-6">
      {/* Scenario Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">Interactive Demonstration</span>
          <h3 className="text-xl font-bold text-text-primary mt-1">AI Reasoning & Orchestration Engine</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenarioId(s.id);
                setActiveStageIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeScenarioId === s.id
                  ? 'bg-accent-electric text-white shadow-sm'
                  : 'bg-surface-elevated text-text-secondary hover:text-white hairline-border'
              }`}
            >
              {s.title.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Trigger Request Bar */}
      <div className="bg-canvas-inset rounded-xl p-4 hairline-border flex items-start gap-3">
        <MessageSquare className="w-5 h-5 text-accent-electric mt-0.5 shrink-0" />
        <div className="space-y-1">
          <div className="font-mono text-xs text-text-muted uppercase">Inbound Request:</div>
          <div className="text-sm font-medium text-text-primary">{scenario.request}</div>
        </div>
      </div>

      {/* 6-Stage Visual Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-2">
        {scenario.stages.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all hairline-border flex flex-col justify-between min-h-[96px] ${
                isActive
                  ? 'bg-accent-electric/15 border-accent-electric shadow-card-glow'
                  : isPassed
                  ? 'bg-surface-elevated/70 border-accent-emerald/40'
                  : 'bg-surface-base border-border-subtle hover:border-border-medium'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`font-mono text-xs font-bold ${isActive ? 'text-accent-electric' : isPassed ? 'text-accent-emerald' : 'text-text-muted'}`}>
                  0{idx + 1}
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />}
                {isActive && <span className="w-2 h-2 rounded-full bg-accent-electric animate-ping" />}
              </div>
              <div className="mt-2">
                <div className="text-xs font-semibold text-text-primary leading-tight">{stage.name}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Stage Detail & Telemetry Console */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-surface-base rounded-xl p-5 hairline-border space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-accent-electric">STAGE 0{activeStageIndex + 1}</span>
            <span className="text-text-muted">•</span>
            <span className="text-sm font-semibold text-text-primary">{scenario.stages[activeStageIndex].name}</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {scenario.stages[activeStageIndex].description}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setActiveStageIndex(prev => (prev > 0 ? prev - 1 : 0))}
              disabled={activeStageIndex === 0}
              className="px-3 py-1.5 rounded-lg text-xs bg-surface-elevated text-text-secondary disabled:opacity-30 hairline-border hover:text-white"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStageIndex(prev => (prev < scenario.stages.length - 1 ? prev + 1 : 0))}
              className="px-3 py-1.5 rounded-lg text-xs bg-accent-electric text-white font-medium hover:bg-accent-electric-hover flex items-center gap-1.5"
            >
              <span>{activeStageIndex === scenario.stages.length - 1 ? 'Restart Loop' : 'Next Stage'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Real-time Telemetry Stream */}
        <div className="bg-surface-terminal rounded-xl p-5 hairline-border font-mono text-xs space-y-2">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2 text-text-muted">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent-emerald" />
              <span>telemetry_stream.log</span>
            </div>
            <span className="text-[10px] text-accent-emerald">● ACTIVE</span>
          </div>
          <div className="pt-1 text-accent-cyan font-medium">
            {scenario.stages[activeStageIndex].telemetry}
          </div>
          <div className="text-text-faint text-[11px] pt-1">
            Status: Execution within 35ms latency budget. Zero telemetry dropped.
          </div>
        </div>
      </div>
    </div>
  );
};
