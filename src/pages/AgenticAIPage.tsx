import React from 'react';
import { Bot, Cpu, ShieldCheck, Database, Layers, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { OrchestratorPipeline } from '../components/OrchestratorPipeline';

interface AgenticAIPageProps {
  onNavigate: (page: string) => void;
}

export const AgenticAIPage: React.FC<AgenticAIPageProps> = ({ onNavigate }) => {
  const capabilities = [
    {
      title: 'Multi-Agent Orchestration',
      description: 'Hierarchical agent clusters where specialized sub-agents coordinate, plan, execute, and verify tasks autonomously.',
      tag: 'LangGraph / AutoGen'
    },
    {
      title: 'Deterministic Reasoning Loops',
      description: 'Structured JSON outputs and step-level schema validation eliminating LLM hallucinations in enterprise operations.',
      tag: 'Guardrails'
    },
    {
      title: 'Enterprise Document Intelligence',
      description: 'High-dimensional embeddings indexed in Supabase pgvector for sub-second contextual memory and semantic RAG.',
      tag: 'pgvector / RAG'
    },
    {
      title: 'Sandboxed Tool Calling',
      description: 'API-connected AI agents capable of executing database mutations, payment triggers, and external webhook calls safely.',
      tag: 'REST / GraphQL'
    },
    {
      title: 'Autonomous Customer Support',
      description: 'Triage incoming tickets across email, WhatsApp, and web chat with automated resolution and zero operator fatigue.',
      tag: 'Omnichannel'
    },
    {
      title: 'Business Process Automation',
      description: 'End-to-end operational automation replacing slow manual spreadsheets with self-healing intelligent workflows.',
      tag: 'Full Automation'
    }
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-electric/10 hairline-border font-mono text-xs text-accent-electric">
          <span>FLAGSHIP ENGINEERING DISCIPLINE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Agentic AI Engineering & Multi-Agent Systems.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          We don’t build toy chatbots. We architect deterministic, autonomous AI systems that reason, execute tools, query enterprise databases, and automate mission-critical business workflows.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-accent-electric text-white font-mono text-xs font-semibold hover:bg-accent-electric-hover transition-all flex items-center gap-2"
          >
            <span>COMMISSION AN AI AGENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Architecture Stepper */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">Pipeline Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Interactive Reasoning Engine Simulator</h2>
        </div>
        <OrchestratorPipeline />
      </div>

      {/* Capabilities Grid */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-electric">Production Capabilities</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How We Deploy Agentic Intelligence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, i) => (
            <div key={i} className="bg-surface-card p-6 rounded-2xl hairline-border hairline-border-hover space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded hairline-border">
                  {c.tag}
                </span>
                <span className="font-mono text-xs text-text-faint">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{c.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
