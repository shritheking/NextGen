import React, { useState } from 'react';
import { Send, Bot, Check, User, Sparkles, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  buttons?: string[];
}

export const TelegramSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '🤖 Welcome to NextGen Automation Engine!\n\nWe engineer custom high-velocity Telegram bots, algorithmic trading relays, private channel VIP subscription gates, and AI assistants.\n\nSelect a command below to explore live capabilities:',
      timestamp: '10:42 AM',
      buttons: ['/services', '/quote', '/contact']
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleCommand = (cmd: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: cmd,
      timestamp: time
    };

    let botResponse: ChatMessage;

    if (cmd === '/services' || cmd.toLowerCase().includes('service')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '⚡ NEXTGEN BOT DISCIPLINES:\n\n1. 📊 Algorithmic Trading Bots (MT5, Binance, Bybit webhooks)\n2. 🔐 VIP Subscription Gates (Razorpay / Stripe automated paywalls)\n3. 🤖 Custom AI Agents (LangGraph reasoning on Telegram)\n4. 📢 Broadcast & Anti-Spam Gatekeepers',
        timestamp: time,
        buttons: ['/quote', '/start']
      };
    } else if (cmd === '/quote' || cmd.toLowerCase().includes('quote')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '💼 PROJECT ESTIMATOR:\n\nCustom Telegram bots start from ₹25,000 / $350 USD depending on webhook complexity, database schema, and payment gateways.\n\nAverage turnaround time: 5 to 10 business days.',
        timestamp: time,
        buttons: ['/contact', '/services']
      };
    } else if (cmd === '/contact' || cmd.toLowerCase().includes('contact')) {
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: '🚀 Direct Engineering Contact:\n\n• WhatsApp: +91 63791 40067\n• Telegram: @shridharsan1\n• Email: nextgenwebstudio63@gmail.com\n• Studio Location: Coimbatore, Tamil Nadu, India',
        timestamp: time,
        buttons: ['/start']
      };
    } else {
      botResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Received: "${cmd}"\n\nCommand recognized by Telegram edge webhook dispatcher. How can we architect your automation today?`,
        timestamp: time,
        buttons: ['/services', '/quote']
      };
    }

    setMessages(prev => [...prev, userMsg, botResponse]);
    setInputValue('');
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: '🤖 Welcome to NextGen Automation Engine!\n\nWe engineer custom high-velocity Telegram bots, algorithmic trading relays, private channel VIP subscription gates, and AI assistants.\n\nSelect a command below to explore live capabilities:',
        timestamp: '10:42 AM',
        buttons: ['/services', '/quote', '/contact']
      }
    ]);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#17212B] rounded-2xl hairline-border shadow-elevated overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="bg-[#242F3D] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-electric flex items-center justify-center text-white font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>NextGen Automation Bot</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald inline-block"></span>
            </div>
            <div className="text-xs text-[#6C7883] font-mono">bot • sub-50ms webhook active</div>
          </div>
        </div>
        <button
          onClick={handleReset}
          title="Reset conversation"
          className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 terminal-scroll bg-[#0E1621]">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.sender === 'user'
                  ? 'bg-[#2B5278] text-white rounded-br-none'
                  : 'bg-[#182533] text-gray-100 rounded-bl-none hairline-border'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
              <div className="text-[10px] text-right mt-1 opacity-60 flex items-center justify-end gap-1">
                <span>{msg.timestamp}</span>
                {msg.sender === 'user' && <Check className="w-3 h-3 text-accent-cyan" />}
              </div>
            </div>

            {/* Quick Action Inline Buttons */}
            {msg.buttons && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                {msg.buttons.map(btn => (
                  <button
                    key={btn}
                    onClick={() => handleCommand(btn)}
                    className="px-3 py-1 rounded-lg text-xs bg-[#242F3D] text-[#6AB2F2] hover:bg-[#2B5278] hover:text-white transition-all hairline-border font-mono font-medium"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-[#17212B] border-t border-white/5 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && inputValue.trim() && handleCommand(inputValue)}
          placeholder="Type /services or your message..."
          className="flex-1 bg-[#242F3D] text-sm text-white px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-accent-electric placeholder-gray-500 font-mono"
        />
        <button
          onClick={() => inputValue.trim() && handleCommand(inputValue)}
          className="p-2.5 rounded-xl bg-accent-electric text-white hover:bg-accent-electric-hover transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-[#111822] px-4 py-1.5 text-center text-[10px] text-text-muted font-mono">
        Interactive Web Demonstration • Zero live Telegram API credentials needed
      </div>
    </div>
  );
};
