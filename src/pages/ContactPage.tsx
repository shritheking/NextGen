import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { ProjectInquiryForm } from '../components/ProjectInquiryForm';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-electric/10 hairline-border font-mono text-xs text-accent-electric">
          <span>TECHNICAL PROJECT SCOPING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Commission NextGen Web Studio.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Submit your project requirements, technical challenges, or automation scope. Our senior engineering leads in Coimbatore review all submissions and provide a direct roadmap and pricing estimate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Form Col */}
        <div className="lg:col-span-7">
          <ProjectInquiryForm />
        </div>

        {/* Contact Information & Channels Col */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Channels Card */}
          <div className="bg-surface-card rounded-2xl p-7 hairline-border space-y-6">
            <h3 className="text-lg font-bold text-white">Direct Communication Channels</h3>

            <div className="space-y-4 text-xs font-mono">
              <a
                href="https://wa.me/916379140067"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated hairline-border text-white hover:border-accent-emerald hover:text-accent-emerald transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 text-accent-emerald flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-text-muted">DIRECT WHATSAPP (INSTANT CHAT)</div>
                  <div className="text-sm font-semibold">+91 63791 40067</div>
                </div>
              </a>

              <a
                href="https://t.me/shridharsan1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated hairline-border text-white hover:border-accent-cyan hover:text-accent-cyan transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 text-accent-cyan flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-text-muted">TELEGRAM DIRECT CHAT</div>
                  <div className="text-sm font-semibold">@shridharsan1</div>
                </div>
              </a>

              <a
                href="mailto:nextgenwebstudio63@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated hairline-border text-white hover:border-accent-electric hover:text-accent-electric transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-electric/10 text-accent-electric flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-text-muted">STUDIO INQUIRIES EMAIL</div>
                  <div className="text-xs font-semibold">nextgenwebstudio63@gmail.com</div>
                </div>
              </a>
            </div>
          </div>

          {/* Location & Response Guarantee */}
          <div className="bg-surface-base rounded-2xl p-7 hairline-border space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-emerald">
              <Clock className="w-4 h-4" />
              <span>SLA Response Commitment</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every scoping brief receives an engineering review from our Coimbatore office within 4 to 12 business hours. No automatic pushy sales spam.
            </p>
            <div className="pt-2 border-t border-border-subtle text-[11px] font-mono text-text-muted flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent-electric" />
              <span>Coimbatore, Tamil Nadu 641001, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
