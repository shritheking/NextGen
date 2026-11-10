import React from 'react';
import { Send, Bot, Shield, Zap, Lock, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { TelegramSimulator } from '../components/TelegramSimulator';

interface TelegramBotPageProps {
  onNavigate: (page: string) => void;
}

export const TelegramBotPage: React.FC<TelegramBotPageProps> = ({ onNavigate }) => {
  const botDisciplines = [
    {
      title: 'Algorithmic Financial Signal Relays',
      description: 'Instant MT5, TradingView, and exchange webhook forwarders with sub-50ms execution and chart attachments.',
      icon: Zap
    },
    {
      title: 'VIP Private Channel Subscription Paywalls',
      description: 'Automated Razorpay, Stripe, and Crypto paywalls with auto-generated 1-time invite links and auto-removal on expiration.',
      icon: Lock
    },
    {
      title: 'Conversational AI Telegram Agents',
      description: 'LangGraph and OpenAI powered assistants running directly on Telegram with conversation context memory.',
      icon: Bot
    },
    {
      title: 'Anti-Spam & Community Gatekeepers',
      description: 'Captcha verifications, automated member bans, link filters, and scheduled community announcement relays.',
      icon: Shield
    }
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 hairline-border font-mono text-xs text-accent-violet">
          <span>AUTOMATION & COMMUNITY ENGINEERING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Telegram Bots That Actually Do Work.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Custom Telegram bots built for automation, payments, notifications, APIs and business workflows. Your bot. Your workflow. Your infrastructure.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-accent-violet text-white font-mono text-xs font-semibold hover:bg-violet-600 transition-all flex items-center gap-2"
          >
            <span>COMMISSION A TELEGRAM BOT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-accent-violet uppercase tracking-wider">Interactive Test Flight</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Live In-Browser Telegram Simulator</h2>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Test commands like <span className="font-mono text-accent-cyan">/services</span>, <span className="font-mono text-accent-cyan">/quote</span>, or ask a question directly in our demonstration UI.
          </p>
        </div>
        <TelegramSimulator />
      </div>

      {/* Disciplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {botDisciplines.map((d, i) => {
          const Icon = d.icon;
          return (
            <div key={i} className="bg-surface-card p-6 rounded-2xl hairline-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-accent-violet/10 text-accent-violet flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{d.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{d.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
