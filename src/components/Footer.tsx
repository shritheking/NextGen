import React from 'react';
import { Terminal, Shield, ArrowUpRight, Heart, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-border-subtle bg-surface-base text-text-secondary mt-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-xl tracking-tight text-white">nextgen</span>
              <span className="w-1.5 h-4 bg-accent-electric inline-block"></span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Beyond Websites. Beyond Automation. We Build Intelligent Digital Futures.
            </p>
            <div className="pt-2 text-xs space-y-1.5 font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-electric" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-electric" />
                <span>nextgenwebstudio63@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent-electric" />
                <span>+91 63791 40067</span>
              </div>
            </div>
          </div>

          {/* Disciplines Col */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
              Engineering
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => onNavigate('agentic-ai')} className="hover:text-white transition-colors">
                  Agentic AI Systems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('web-dev')} className="hover:text-white transition-colors">
                  Full-Stack Web Dev
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('telegram-bots')} className="hover:text-white transition-colors">
                  Telegram Bot Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Custom Architecture Retainer
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Col */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
              Studio
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors">
                  Selected Work & Proof
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Studio Manifest & DNA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-white transition-colors">
                  Technical Insights & Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Scope a Project
                </button>
              </li>
            </ul>
          </div>

          {/* System Telemetry & Trust Col */}
          <div className="space-y-4">
            <div className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
              Operations & Trust
            </div>
            <div className="bg-surface-terminal rounded-xl p-4 hairline-border font-mono text-[11px] space-y-2">
              <div className="flex items-center justify-between text-accent-emerald">
                <span>● TELEMETRY STATUS</span>
                <span>OPERATIONAL</span>
              </div>
              <div className="text-text-muted">Edge Gateway: 28ms avg</div>
              <div className="text-text-muted">Cluster: IN-S1 (Coimbatore)</div>
              <div className="text-text-muted">Uptime: 99.98% SLA</div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-text-muted pt-1">
              <button onClick={() => onNavigate('privacy')} className="hover:text-white">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => onNavigate('terms')} className="hover:text-white">Terms</button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted gap-4">
          <div>
            © {new Date().getFullYear()} NextGen Web Studio. Engineered with precision in Coimbatore, India.
          </div>
          <div className="flex items-center gap-2">
            <span>TasteSkill • Impeccable • img2threejs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
