import React, { useState, useEffect } from 'react';
import { HelpCircle, ArrowUpRight, Plus, X } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'engineering' | 'delivery' | 'sovereignty' | 'pricing';
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // 1. Engineering & Stack
  {
    id: 'faq-1',
    category: 'engineering',
    categoryLabel: 'ENGINEERING & ARCHITECTURE',
    question: 'What technology stack do you engineer with?',
    answer: 'We build strictly on modern enterprise standards: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Supabase / PostgreSQL with pgvector, and Cloudflare Edge runtimes. We do not use fragile no-code builders or bloated generic agency themes.'
  },
  {
    id: 'faq-2',
    category: 'engineering',
    categoryLabel: 'ENGINEERING & ARCHITECTURE',
    question: 'How do you guarantee sub-35ms edge latency?',
    answer: 'Every web application is deployed across Cloudflare V8 edge nodes globally with React 19 SSR streaming and edge asset caching. Assets, fonts, and API payloads are tuned to achieve 100/100 Core Web Vitals out of the box.'
  },
  {
    id: 'faq-3',
    category: 'engineering',
    categoryLabel: 'ENGINEERING & ARCHITECTURE',
    question: 'Can you build custom autonomous AI agents and Telegram bots?',
    answer: 'Yes. We build high-concurrency LangGraph multi-agent workflows, semantic vector search with pgvector, and resilient Telegram webhook bots featuring automated Stripe and Razorpay subscription paywalls.'
  },
  {
    id: 'faq-4',
    category: 'engineering',
    categoryLabel: 'ENGINEERING & ARCHITECTURE',
    question: 'Do you audit security and OWASP compliance before shipping?',
    answer: 'Yes. All production deployments undergo strict OWASP Top 10 security audits, CSRF protection, environment secret isolation, rate-limiting guardrails, and 256-bit SSL encryption.'
  },
  {
    id: 'faq-5',
    category: 'engineering',
    categoryLabel: 'ENGINEERING & ARCHITECTURE',
    question: 'How do client portals and real-time sprint logs work?',
    answer: 'Upon project kickoff, you receive private Client Portal credentials. Your dashboard displays real-time sprint milestones, automated Git commit telemetry, staging preview links, and GST tax invoice receipts.'
  },

  // 2. Delivery & Sprints
  {
    id: 'faq-6',
    category: 'delivery',
    categoryLabel: 'SPRINT CONTINUUM & DELIVERY',
    question: 'How long does a standard production sprint take?',
    answer: 'Our sprints operate on a strict 7-day continuum: Monday scoping and schema design, Tuesday-Thursday rapid parallel engineering, Friday hardening and automated testing, and Sunday production deployment.'
  },
  {
    id: 'faq-7',
    category: 'delivery',
    categoryLabel: 'SPRINT CONTINUUM & DELIVERY',
    question: 'How do we communicate with your engineering team?',
    answer: 'You communicate directly with senior engineers through a dedicated private Slack or Telegram channel with a guaranteed 2-hour SLA callback. No account managers or middleman delays.'
  },
  {
    id: 'faq-8',
    category: 'delivery',
    categoryLabel: 'SPRINT CONTINUUM & DELIVERY',
    question: 'What happens if we need modifications during the sprint?',
    answer: 'We run on modular, agile milestones. Scope adjustments are evaluated collaboratively within the sprint roadmap without pausing development velocity.'
  },
  {
    id: 'faq-9',
    category: 'delivery',
    categoryLabel: 'SPRINT CONTINUUM & DELIVERY',
    question: 'Do you provide weekend deployment support?',
    answer: 'Yes. Our weekend protocol includes round-the-clock telemetry monitoring, edge failover checks, and continuous uptime safeguards across global edge regions.'
  },

  // 3. Code Sovereignty & IP
  {
    id: 'faq-10',
    category: 'sovereignty',
    categoryLabel: 'CODE SOVEREIGNTY & IP',
    question: 'Do we get 100% full intellectual property and code ownership?',
    answer: 'Yes, 100%. Upon milestone completion, we initiate a private GitHub repository transfer directly to your organization. You own the code, design tokens, Docker containers, database schemas, and all intellectual property permanently.'
  },
  {
    id: 'faq-11',
    category: 'sovereignty',
    categoryLabel: 'CODE SOVEREIGNTY & IP',
    question: 'Is there any proprietary vendor lock-in?',
    answer: 'Zero vendor lock-in. All systems are architected with open industry standards (TypeScript, Next.js, standard PostgreSQL, Docker). Any competent engineering team can inspect, build, or deploy your codebase independently.'
  },
  {
    id: 'faq-12',
    category: 'sovereignty',
    categoryLabel: 'CODE SOVEREIGNTY & IP',
    question: 'Do you sign non-disclosure agreements (NDAs)?',
    answer: 'Yes. We sign bilateral enterprise NDAs prior to architecture discovery, ensuring your proprietary business logic, data models, and trade secrets remain strictly confidential.'
  },
  {
    id: 'faq-13',
    category: 'sovereignty',
    categoryLabel: 'CODE SOVEREIGNTY & IP',
    question: 'How do you handle production handover and credentials?',
    answer: 'Handover includes an exhaustive technical runbook, environment secret migrations, DNS delegation, and an interactive 60-minute recorded architecture walkthrough with your team.'
  },

  // 4. Pricing & Retainers
  {
    id: 'faq-14',
    category: 'pricing',
    categoryLabel: 'PRICING & RETAINERS',
    question: 'How are projects priced?',
    answer: 'We offer fixed-scope milestone sprints and dedicated monthly engineering retainers. Every quote is transparent with itemized milestones—zero hidden agency fees or surprise overages.'
  },
  {
    id: 'faq-15',
    category: 'pricing',
    categoryLabel: 'PRICING & RETAINERS',
    question: 'What payment methods do you support?',
    answer: 'We accept domestic and international payments securely through Stripe and Razorpay, including wire transfers, corporate credit cards, and GST-compliant invoicing.'
  },
  {
    id: 'faq-16',
    category: 'pricing',
    categoryLabel: 'PRICING & RETAINERS',
    question: 'Do you offer ongoing post-launch maintenance retainers?',
    answer: 'Yes. We provide dedicated engineering retainers that cover 24/7 uptime monitoring, security patching, new feature velocity, and continuous edge optimization.'
  }
];

interface FAQSectionProps {
  onOpenContact?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isInView, setIsInView] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true // First item open by default matching reference Image 1
  });

  useEffect(() => {
    const el = document.getElementById('faq');
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px 50px 0px' }
    );
    observer.observe(el);

    // Initial viewport check
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsInView(true);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: 'all', label: 'All', count: FAQ_DATA.length },
    { id: 'engineering', label: 'Architecture & Stack', count: FAQ_DATA.filter(f => f.category === 'engineering').length },
    { id: 'delivery', label: 'Delivery & Sprints', count: FAQ_DATA.filter(f => f.category === 'delivery').length },
    { id: 'sovereignty', label: 'Code Sovereignty', count: FAQ_DATA.filter(f => f.category === 'sovereignty').length },
    { id: 'pricing', label: 'Pricing & Retainers', count: FAQ_DATA.filter(f => f.category === 'pricing').length }
  ];

  const filteredItems = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(item => item.category === activeCategory);

  // Group by categoryLabel for structured rendering like Image 1
  const categoriesList = Array.from(new Set(filteredItems.map(item => item.categoryLabel)));

  return (
    <section className="faq-section" id="faq" data-testid="faq-section">
      <div className="faq-container">
        {/* Left Column: Heading & Filter Pills */}
        <div className={`faq-left-col scroll-reveal ${isInView ? 'in-view' : ''}`} data-inview={isInView ? "true" : "false"}>
          <div className="faq-eyebrow animate-word" style={{ animationDelay: '0.08s' }}>FAQ</div>
          <h2 className="faq-main-heading">
            <span className="animate-word" style={{ animationDelay: '0.18s' }}>Questions?</span><br />
            <span className="faq-heading-accent">
              <span className="animate-word" style={{ animationDelay: '0.28s' }}>We've</span>{' '}
              <span className="animate-word" style={{ animationDelay: '0.36s' }}>got</span>{' '}
              <span className="animate-word" style={{ animationDelay: '0.44s' }}>answers.</span>
            </span>
          </h2>

          {/* Category Filter Pills (Image 1 Exact Recreation) */}
          <div className={`faq-pills-wrap scroll-reveal scroll-reveal-delay-1 ${isInView ? 'in-view' : ''}`} role="tablist" aria-label="FAQ Categories">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`faq-pill ${isActive ? 'faq-pill-active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="faq-pill-label">{cat.label}</span>
                  <span className="faq-pill-count">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* Help Support Card on Desktop (Image 1 Exact Recreation - Sticky Left Column) */}
          <div className={`faq-support-card faq-support-desktop-only scroll-reveal scroll-reveal-delay-2 ${isInView ? 'in-view' : ''}`}>
            <div className="faq-support-icon">
              <HelpCircle size={20} />
            </div>
            <h3 className="faq-support-title">Still have questions?</h3>
            <p className="faq-support-desc">
              Our senior engineering team is happy to review your architecture and help you decide.
            </p>
            <button
              onClick={() => {
                if (onOpenContact) {
                  onOpenContact();
                } else {
                  const el = document.getElementById('contact') || document.getElementById('inquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="faq-support-btn"
              data-testid="faq-ask-team-btn"
            >
              <span>Ask Our Team</span>
              <span className="faq-support-btn-arrow">
                <ArrowUpRight size={15} />
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Category Header, Accordion List, and Ask Our Team Box at the Bottom for Mobile */}
        <div className="faq-right-col">
          {categoriesList.map(catLabel => {
            const itemsInCat = filteredItems.filter(item => item.categoryLabel === catLabel);
            return (
              <div key={catLabel} className={`faq-category-block scroll-reveal ${isInView ? 'in-view' : ''}`}>
                <div className="faq-cat-header-label">{catLabel}</div>
                <div className="faq-accordion-list">
                  {itemsInCat.map((item, itemIdx) => {
                    const isOpen = !!openItems[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`faq-accordion-item scroll-reveal ${isInView ? 'in-view' : ''} ${isOpen ? 'faq-item-open' : ''}`}
                        style={{ transitionDelay: `${(itemIdx % 5) * 0.06}s` }}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="faq-accordion-trigger"
                          aria-expanded={isOpen}
                        >
                          <span className="faq-question-text">{item.question}</span>
                          <span className={`faq-toggle-btn ${isOpen ? 'faq-toggle-btn-open' : ''}`}>
                            {isOpen ? <X size={15} /> : <Plus size={15} />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="faq-accordion-content">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Help Support Card placed below all questions for Mobile Only */}
          <div className="faq-support-card-wrap faq-support-mobile-only">
            <div className="faq-support-card">
              <div className="faq-support-icon">
                <HelpCircle size={20} />
              </div>
              <h3 className="faq-support-title">Still have questions?</h3>
              <p className="faq-support-desc">
                Our senior engineering team is happy to review your architecture and help you decide.
              </p>
              <button
                onClick={() => {
                  if (onOpenContact) {
                    onOpenContact();
                  } else {
                    const el = document.getElementById('contact') || document.getElementById('inquiry');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="faq-support-btn"
                data-testid="faq-ask-team-btn-mobile"
              >
                <span>Ask Our Team</span>
                <span className="faq-support-btn-arrow">
                  <ArrowUpRight size={15} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
