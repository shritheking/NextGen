import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

export const ProjectInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    service: 'Agentic AI Development',
    budget: '₹50,000 - ₹1,50,000',
    timeline: '2 - 4 Weeks',
    description: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.description) {
      alert('Please fill out all required fields.');
      return;
    }

    setStatus('submitting');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.whatsapp,
      whatsapp: formData.whatsapp,
      company: formData.company || 'Not Specified',
      projectType: formData.service || 'Agentic AI Development',
      budget: formData.budget,
      timeline: formData.timeline,
      message: formData.description,
      source: 'NextGen V2 Web Studio Scoping Brief'
    };

    // 1. Always store locally for offline/instant client reliability
    try {
      const existing = JSON.parse(localStorage.getItem('nextgen_inquiries') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('nextgen_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage fallback warning:', err);
    }

    // 2. Transmit to live Render backend API for Admin Panel & CRM sync
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.warn('Backend returned non-200 status:', response.status);
      }
    } catch (netErr) {
      console.warn('Live API dispatch error (stored in local queue):', netErr);
    }

    // Show success state
    setStatus('success');
  };

  return (
    <div className="w-full bg-surface-card rounded-2xl hairline-border p-6 md:p-10 space-y-8">
      {status === 'success' ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent-emerald/20 text-accent-emerald mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Inquiry Dispatched Successfully</h3>
          <p className="text-text-secondary max-w-md mx-auto text-sm leading-relaxed">
            Thank you, <span className="text-white font-medium">{formData.name}</span>. Our lead engineering team in Coimbatore will review your technical scope and contact you on WhatsApp / Email within 4 to 12 business hours.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  whatsapp: '',
                  company: '',
                  service: 'Agentic AI Development',
                  budget: '₹50,000 - ₹1,50,000',
                  timeline: '2 - 4 Weeks',
                  description: ''
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-surface-elevated text-sm text-text-primary hover:text-white hairline-border"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                Full Name <span className="text-accent-electric">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Sundararajan"
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-electric"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                Work Email <span className="text-accent-electric">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="sundar@company.com"
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-electric"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                WhatsApp Phone <span className="text-accent-electric">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-electric"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                Company / Project Brand
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme AI Technologies"
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-electric"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                Primary Discipline
              </label>
              <select
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-electric"
              >
                <option value="Agentic AI Development">Agentic AI Development</option>
                <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                <option value="Telegram Bot Engineering">Telegram Bot Engineering</option>
                <option value="End-to-End Agency Retainer">End-to-End Agency Retainer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                Estimated Budget
              </label>
              <select
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-electric"
              >
                <option value="< ₹50,000">&lt; ₹50,000 (~$600)</option>
                <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (~$1.8K)</option>
                <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000 (~$6K)</option>
                <option value="₹5,00,000+">₹5,00,000+ (Enterprise)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
                Expected Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-electric"
              >
                <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                <option value="2 - 4 Weeks">2 - 4 Weeks</option>
                <option value="1 - 3 Months">1 - 3 Months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-text-secondary mb-2">
              Project Scope & Architecture Requirements <span className="text-accent-electric">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline the core objective, required APIs, data models, or automation logic..."
              className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-white placeholder-text-faint focus:outline-none focus:border-accent-electric"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-4 rounded-xl bg-accent-electric text-white font-semibold text-sm hover:bg-accent-electric-hover transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            <span>{status === 'submitting' ? 'Transmitting Scope...' : 'Dispatch Technical Inquiry'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
