import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

interface Msg {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm NextGen AI Assistant. I can guide you through our Agentic AI engineering, web stack architecture, or Telegram bot capabilities. What are you looking to build?"
    }
  ]);
  const [input, setInput] = useState('');

  const send = (txt: string) => {
    if (!txt.trim()) return;
    const userMsg: Msg = { sender: 'user', text: txt };
    let reply = "We engineer custom digital solutions tailored to that exact requirement! Our senior engineers in Coimbatore build with LangGraph, PostgreSQL pgvector, and Next.js edge runtimes. Would you like to submit a scoping brief or schedule a technical chat on WhatsApp?";
    
    const lower = txt.toLowerCase();
    if (lower.includes('agent') || lower.includes('ai') || lower.includes('llm')) {
      reply = "For Agentic AI, we build multi-agent orchestrators with deterministic guardrails, structured JSON outputs, Supabase pgvector RAG, and automated API tools. Check out our Agentic AI page or submit a project scope!";
    } else if (lower.includes('telegram') || lower.includes('bot')) {
      reply = "Our Telegram bot engineering covers algorithmic MT5 trading alerts, private channel VIP subscription paywalls (Razorpay/Stripe), and conversational AI bots with sub-50ms reaction times.";
    } else if (lower.includes('web') || lower.includes('site') || lower.includes('ecommerce') || lower.includes('app')) {
      reply = "Our Web Stack engineering specializes in sub-35ms edge latency, bespoke Next.js and React architectures, custom booking engines (like GoatTurf), and high-performance commerce (like NeiMozhi).";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
      reply = "Project pricing starts around ₹25,000 (~$350 USD) for custom Telegram bots, ₹45,000 for high-performance web applications, and ₹75,000+ for enterprise agentic AI orchestration pipelines.";
    }

    setMessages(prev => [...prev, userMsg, { sender: 'ai', text: reply }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[360px] sm:w-[400px] h-[500px] bg-surface-card rounded-2xl hairline-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-surface-elevated px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent-electric/20 text-accent-electric flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>NextGen AI Studio Copilot</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                </div>
                <div className="text-[10px] text-text-muted font-mono">Autonomous Architecture Advisor</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 terminal-scroll bg-canvas-inset/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-accent-electric text-white rounded-br-none'
                      : 'bg-surface-base text-text-secondary hairline-border rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-surface-base/80 border-t border-border-subtle flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => send('What are your Agentic AI capabilities?')}
              className="px-2.5 py-1 rounded-full bg-surface-elevated text-text-secondary whitespace-nowrap hairline-border hover:text-white"
            >
              Agentic AI
            </button>
            <button
              onClick={() => send('How much does a custom Telegram bot cost?')}
              className="px-2.5 py-1 rounded-full bg-surface-elevated text-text-secondary whitespace-nowrap hairline-border hover:text-white"
            >
              Telegram Bot Pricing
            </button>
            <button
              onClick={() => send('Tell me about your Web Development services')}
              className="px-2.5 py-1 rounded-full bg-surface-elevated text-text-secondary whitespace-nowrap hairline-border hover:text-white"
            >
              Web Stack
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-surface-card border-t border-border-subtle flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Ask about AI, web stack or bots..."
              className="flex-1 bg-surface-base text-xs text-white px-3.5 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-accent-electric placeholder-text-faint"
            />
            <button
              onClick={() => send(input)}
              className="p-2.5 rounded-xl bg-accent-electric text-white hover:bg-accent-electric-hover transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface-elevated text-white hairline-border hover:border-accent-electric shadow-2xl transition-all hover:scale-105"
        >
          <div className="w-6 h-6 rounded-full bg-accent-electric flex items-center justify-center text-white">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Ask NextGen AI</span>
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
        </button>
      )}
    </div>
  );
};
