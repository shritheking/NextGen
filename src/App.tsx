import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, ArrowDownRight, ArrowDown, Menu, X, Sparkles, Send, Check, MessageCircle, Terminal, Bot, Zap, ShieldCheck, ExternalLink, Code2, Cpu, Globe, Database, Play, Pause, CheckCircle2, Lock, User, RefreshCw, FileText, ChevronRight, ChevronLeft, Download, CreditCard, Key, HelpCircle, Search, MoreVertical, Paperclip, Smile, Mic, ChevronDown, Camera, Briefcase, Rocket, Activity, Layers, AlertTriangle, Brain, GitBranch, Gauge, Lightbulb, Headphones, Clock, Hammer, MessageSquare } from 'lucide-react';
import { ClientPortalView } from './pages/ClientPortalView';
import { LegalPolicyView } from './pages/LegalPolicyView';
import { ContextualHint } from './components/ContextualHint';
import { EMCLogo } from './components/EMCLogo';
import { FAQSection } from './components/FAQSection';
import { AnimatedCounter } from './components/AnimatedCounter';

const TelegramDoubleTick = ({ color = '#ffffff' }: { color?: string }) => (
  <svg
    width="16"
    height="11"
    viewBox="0 0 16 11"
    fill="none"
    className="tg-double-tick"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path
      d="M1 5.8L4.2 9L11 2"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5.8L8.2 9L15 2"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Stage {
  id: string;
  name: string;
  kicker: string;
  p99: string;
  telemetry: string;
  details: string[];
}

const AI_STAGES: Stage[] = [
  {
    id: '1',
    name: 'User Ingestion',
    kicker: 'INGEST',
    p99: '3.2ms',
    telemetry: '[INGEST] Payload: 42 tokens | Edge Latency: 3.2ms | Source: Web/API Gateway (SSL Verified)',
    details: ['Payload validated & sanitized', 'Edge rate limit: passed (0/1000)', 'Session token: bearer_jwt_200']
  },
  {
    id: '2',
    name: 'AI Orchestrator',
    kicker: 'TRIAGE',
    p99: '12ms',
    telemetry: '[ORCHESTRATOR] Intent: TAX_RECONCILIATION_FINANCE -> Routing to Specialized Financial Subagent Cluster',
    details: ['Cluster routing: cluster-in-s1', 'Model fallback: Claude-3.5-Sonnet / GPT-4o', 'Confidence score: 0.984']
  },
  {
    id: '3',
    name: 'Reasoning Engine',
    kicker: 'VECTOR SEARCH',
    p99: '18ms',
    telemetry: '[REASONING] Generating 1536-dim vector embedding via pgvector match (cosine similarity: 0.941)',
    details: ['Supabase pgvector index queried', 'Context window: 4,096 tokens', 'Top 5 document chunks retrieved']
  },
  {
    id: '4',
    name: 'Tools & APIs',
    kicker: 'EXECUTION',
    p99: '15ms',
    telemetry: '[TOOL_CALL] db.getInvoices({ quarter: "Q3", status: "mismatched" }) -> 3 matching records found',
    details: ['PostgreSQL query resolved in 11ms', 'Razorpay & Stripe webhook verified', 'Idempotency key: verified']
  },
  {
    id: '5',
    name: 'Deterministic Guardrails',
    kicker: 'VERIFY',
    p99: '8ms',
    telemetry: '[GUARDRAILS] Deterministic verification: Zero hallucinations confirmed against strict JSON schema',
    details: ['Schema validator: 100% compliant', 'PII redaction filter: passed', 'JSON schema match: verified']
  },
  {
    id: '6',
    name: 'Verified Delivery',
    kicker: 'DELIVERY',
    p99: '4.1ms',
    telemetry: '[COMPLETE] HTTP 200 OK | Deterministic resolution delivered in 28ms total latency budget',
    details: ['Status code: 200 OK', 'Egress payload signed: SHA-256', 'Client UI state updated in real-time']
  }
];

const WORDS = ['Agentic AI Systems.', 'High-Velocity Web.', 'Custom Telegram Bots.', 'Intelligent Systems.'];
const MONUMENTAL_LETTERS = ['N', 'E', 'X', 'T', 'G', 'E', 'N', ' ', 'W', 'E', 'B', ' ', 'S', 'T', 'U', 'D', 'I', 'O'];

const STAGE_JSON_PAYLOADS = [
  {
    stage: '01_USER_INGESTION',
    source: 'api_gateway_edge',
    request_id: 'req_edge_8820f1',
    client_ip: '103.21.244.0 (Cloudflare CF-Ray)',
    payload_tokens: 42,
    tls_fingerprint: 'TLS_AES_128_GCM_SHA256',
    rate_limit: { allowed: true, consumed: 1, remaining: 999 }
  },
  {
    stage: '02_ORCHESTRATOR',
    detected_intent: 'FINANCE_RECONCILIATION',
    confidence: 0.984,
    target_cluster: 'cluster-in-s1-mumbai',
    active_agent: 'FinancialAnalysisSubagent',
    context_tokens: 820,
    routing_latency_ms: 12.1
  },
  {
    stage: '03_REASONING_ENGINE',
    model: 'claude-3-5-sonnet-20241022',
    embedding_dims: 1536,
    similarity_metric: 'cosine',
    vector_match_score: 0.941,
    retrieved_chunks: 5,
    db: 'supabase_pgvector_ap_south_1'
  },
  {
    stage: '04_TOOLS_EXECUTION',
    function_called: 'db.getInvoices',
    arguments: { quarter: 'Q3', status: 'mismatched' },
    records_found: 3,
    db_query_time_ms: 11.2,
    webhooks_verified: ['Razorpay', 'Stripe'],
    idempotency_key: 'idem_8f7b3c2e1'
  },
  {
    stage: '05_GUARDRAILS',
    deterministic_check: 'PASS',
    hallucination_score: 0.00,
    json_schema_valid: true,
    pii_redacted: true,
    guardrail_engine: 'NextGen Deterministic Verifier v2.4'
  },
  {
    stage: '06_VERIFIED_DELIVERY',
    status: 200,
    status_text: 'OK',
    total_pipeline_latency_ms: 28.4,
    response_format: 'application/json',
    signature: 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  }
];

interface ServiceStageItem {
  num: string;
  module: string;
  title: string;
  description: string;
  badgeText: string;
  badgeType: 'green' | 'cyan' | 'blue';
  iconType: 'globe' | 'code' | 'shield' | 'database' | 'bot' | 'activity' | 'zap' | 'card' | 'rocket';
  tags: string[];
  price: string;
  packageIndex: number;
}

interface ServiceDisciplineConfig {
  id: 'web' | 'ai' | 'tg';
  tabLabel: string;
  countLabel: string;
  statusKicker: string;
  whyDifferences: string[];
  stages: ServiceStageItem[];
}

const SERVICE_DISCIPLINES: Record<'web' | 'ai' | 'tg', ServiceDisciplineConfig> = {
  web: {
    id: 'web',
    tabLabel: 'Web Development & OS',
    countLabel: '3 Stages',
    statusKicker: 'WEB ENGINEERING',
    whyDifferences: [
      'Zero bloated templates — 100% hand-tuned React 19 & Next.js 15 architecture',
      'Sub-35ms edge latency platforms with guaranteed 100/100 Core Web Vitals',
      'Complete private GitHub repository transfer with 100% IP & code sovereignty'
    ],
    stages: [
      {
        num: '01',
        module: '01',
        title: 'High-Velocity Architecture & Design System',
        description: 'Bespoke Figma design tokens, Next.js 15 SSR scaffolding, Tailwind CSS 4 utility architecture, and sub-35ms edge routing.',
        badgeText: 'Ends with live staging preview',
        badgeType: 'green',
        iconType: 'globe',
        tags: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Figma Tokens', 'Edge SSR', 'Core Web Vitals'],
        price: 'from ₹45,000 / $550',
        packageIndex: 0
      },
      {
        num: '02',
        module: '02',
        title: 'Full-Stack Custom Engine & Client Portal',
        description: 'PostgreSQL relational schemas, Supabase Auth & RLS, offline-first POS billing engine, automated client portal, and dynamic API endpoints.',
        badgeText: 'Ends with POS & Portal OS',
        badgeType: 'cyan',
        iconType: 'code',
        tags: ['Supabase', 'PostgreSQL', 'Client Portal', 'POS Software', 'Cloudflare Edge', 'Stripe API'],
        price: 'from ₹65,000 / $790',
        packageIndex: 0
      },
      {
        num: '03',
        module: '03',
        title: 'Global Edge Deployment & Production Handover',
        description: '100/100 Core Web Vitals pass, Cloudflare CDN distribution, OWASP Top-10 security audit, and complete private GitHub handover.',
        badgeText: '100% Code Sovereignty Handover',
        badgeType: 'blue',
        iconType: 'shield',
        tags: ['Cloudflare CDN', '100/100 Vitals', 'OWASP Hardened', 'Private Git Handover', 'CI/CD Pipeline'],
        price: 'from ₹85,000 / $1,050',
        packageIndex: 0
      }
    ]
  },
  ai: {
    id: 'ai',
    tabLabel: 'Agentic AI Systems',
    countLabel: '3 Stages',
    statusKicker: 'AUTONOMOUS AI',
    whyDifferences: [
      'Zero hallucination standard — deterministic retrieval via Supabase pgvector',
      'Strict type-safe execution guardrails using Zod and Pydantic schemas',
      'Isolated Docker micro-VM sandboxes for safe tool calling & 24/7 telemetry'
    ],
    stages: [
      {
        num: '01',
        module: '01',
        title: 'Domain Knowledge & Supabase pgvector RAG',
        description: 'High-density vector embeddings (1536-dim), custom document chunking pipelines, cosine similarity search, and automated knowledge base sync.',
        badgeText: 'Zero Hallucination Standard',
        badgeType: 'green',
        iconType: 'database',
        tags: ['pgvector', 'OpenAI Embeddings', 'Cosine Search', 'Document Chunking', 'Supabase', 'RAG Pipeline'],
        price: 'from ₹60,000 / $750',
        packageIndex: 1
      },
      {
        num: '02',
        module: '02',
        title: 'Autonomous LangGraph Multi-Agent Workflows',
        description: 'Deterministic reasoning loops, multi-agent collaboration, function calling with Claude 3.5 & GPT-4o, and strict Pydantic/Zod type validation.',
        badgeText: 'Ends with autonomous agent',
        badgeType: 'cyan',
        iconType: 'bot',
        tags: ['LangGraph', 'Claude 3.5 Sonnet', 'GPT-4o', 'Tool Calling', 'Zod Schemas', 'Multi-Agent'],
        price: 'from ₹95,000 / $1,190',
        packageIndex: 1
      },
      {
        num: '03',
        module: '03',
        title: 'Sandboxed Execution & 24/7 Live Telemetry',
        description: 'Isolated Docker micro-VM sandboxes for code execution, sub-30ms execution guardrails, 24/7 synthetic health monitoring, and client telemetry dashboard.',
        badgeText: 'Live Telemetry Dashboard',
        badgeType: 'blue',
        iconType: 'activity',
        tags: ['Docker Sandbox', 'Live Telemetry', '24/7 Runtime', 'Pydantic Guardrails', 'Health Loops'],
        price: 'from ₹1,35,000 / $1,650',
        packageIndex: 1
      }
    ]
  },
  tg: {
    id: 'tg',
    tabLabel: 'Telegram Bots & Paywalls',
    countLabel: '3 Stages',
    statusKicker: 'TELEGRAM AUTOMATION',
    whyDifferences: [
      'Sub-50ms webhook response with zero dropped Telegram updates',
      'Native Razorpay & Stripe automated VIP link and subscription engine',
      'Low-latency MT5 & TradingView financial relay bridges with webhook listeners'
    ],
    stages: [
      {
        num: '01',
        module: '01',
        title: 'High-Concurrency Webhook Bot Engine',
        description: 'Async Python event loops, Telegram Bot API & MTProto GramJS integration, instant inline keyboards, and zero-drop webhook listener architecture.',
        badgeText: 'Sub-50ms Response Time',
        badgeType: 'green',
        iconType: 'zap',
        tags: ['Telegram Bot API', 'GramJS / Telethon', 'Async Engine', 'Webhooks', 'Sub-50ms Ping'],
        price: 'from ₹35,000 / $420',
        packageIndex: 2
      },
      {
        num: '02',
        module: '02',
        title: 'Automated VIP Subscription Paywalls & Billing',
        description: 'Seamless Razorpay & Stripe checkout relays, automatic private VIP invite link generation, subscription expiry tracking, and kick/ban automation.',
        badgeText: 'Auto VIP Paywall System',
        badgeType: 'cyan',
        iconType: 'card',
        tags: ['Razorpay', 'Stripe Webhooks', 'Auto Invite Links', 'Subscription Billing', 'Kick Automation'],
        price: 'from ₹55,000 / $690',
        packageIndex: 2
      },
      {
        num: '03',
        module: '03',
        title: 'MT5 & TradingView Instant Financial Relays',
        description: 'MetaTrader 5 bridge, TradingView webhook signals, sub-second execution order routing, and encrypted trading channel distribution.',
        badgeText: 'Real-Time Signal Routing',
        badgeType: 'blue',
        iconType: 'rocket',
        tags: ['MetaTrader 5 (MT5)', 'TradingView Alerts', 'Sub-second Latency', 'Financial Relays', 'Encrypted Channels'],
        price: 'from ₹75,000 / $920',
        packageIndex: 2
      }
    ]
  }
};

interface WalkAwayItem {
  num: string;
  verb: string;
  desc: string;
  iconType: 'code' | 'brain' | 'zap' | 'card' | 'shield' | 'globe' | 'lock';
}

const WALK_AWAY_ITEMS: WalkAwayItem[] = [
  {
    num: '01',
    verb: 'BUILD',
    desc: 'Responsive frontend applications, reactive Next.js 15 platforms, client portals, and bespoke POS software.',
    iconType: 'code'
  },
  {
    num: '02',
    verb: 'THINK',
    desc: 'Understand client-server architecture, APIs, databases and system design fundamentals.',
    iconType: 'brain'
  },
  {
    num: '03',
    verb: 'INTEGRATE',
    desc: 'Autonomous LangGraph multi-agent systems, Supabase pgvector cosine search, embeddings, and schema-enforced tool calling.',
    iconType: 'zap'
  },
  {
    num: '04',
    verb: 'MONETIZE',
    desc: 'High-concurrency webhook Telegram bots with automated Razorpay and Stripe subscription paywalls.',
    iconType: 'card'
  },
  {
    num: '05',
    verb: 'SECURE',
    desc: '256-bit SSL encryption, OWASP guardrails, rate limiting, and zero-trust authentication.',
    iconType: 'shield'
  },
  {
    num: '06',
    verb: 'SHIP',
    desc: 'Sub-35ms global edge infrastructure, Docker containerization, and automated CI/CD pipelines.',
    iconType: 'globe'
  },
  {
    num: '07',
    verb: 'OWN 100%',
    desc: 'Complete intellectual property sovereignty, private GitHub repository transfer, and zero vendor lock-in.',
    iconType: 'lock'
  }
];

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<'web' | 'ai' | 'tg'>('web');
  const [activeJourneyStage, setActiveJourneyStage] = useState<number>(0);
  const [activeDemoTab, setActiveDemoTab] = useState<'ai' | 'tg'>('ai');
  const [activeStage, setActiveStage] = useState(2);
  const [isSimulating, setIsSimulating] = useState(true);
  const [telemetryTab, setTelemetryTab] = useState<'log' | 'json' | 'waterfall'>('log');
  const [isTgTyping, setIsTgTyping] = useState(false);

  // Auto-looping Flow Pills selection state (0: Frontend, 1: Backend APIs, 2: Database & RAG, 3: Autonomous AI, 4: Edge Handover)
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlowIndex(prev => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Running Word Switcher for Post-Kickoff Section (Image 2 style: ✦ actually / ✦ provably / ✦ reliably / ✦ guaranteed)
  const RUNNING_WORDS = ['actually', 'provably', 'reliably', 'guaranteed'];
  const [runningWordIndex, setRunningWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRunningWordIndex(prev => (prev + 1) % RUNNING_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // DevOps Infinity-Loop Active Node State (0: 01 Code Ownership, 1: 02 Sub-35ms Standard, 2: 03 Zero Tech Debt)
  const [activeDevOpsNode, setActiveDevOpsNode] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDevOpsNode(prev => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // View Navigation Router: 'home' | 'portal' | 'privacy' | 'terms' | 'refunds'
  const [currentView, setCurrentView] = useState<'home' | 'portal' | 'privacy' | 'terms' | 'refunds'>('home');

  const navigateTo = (view: 'home' | 'portal' | 'privacy' | 'terms' | 'refunds') => {
    setCurrentView(view);
    if (view === 'home' || view === 'portal') {
      // Keep root URL clean so page reloads always load the website home cleanly
      if (window.location.hash || window.location.search) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      window.history.replaceState(null, '', `#${view}`);
    }
  };

  useEffect(() => {
    const handleLocation = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#privacy') {
        setCurrentView('privacy');
      } else if (hash === '#terms') {
        setCurrentView('terms');
      } else if (hash === '#refunds') {
        setCurrentView('refunds');
      } else {
        // Any other reload, or if hash was #portal or path was /client, clean URL and load Home!
        if (hash === '#portal' || path === '/client') {
          window.history.replaceState(null, '', window.location.pathname);
        }
        setCurrentView('home');
      }
    };

    handleLocation();
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  // Subtle desktop hero grid parallax & scroll-linked progress
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroGrid = document.querySelector('.hero-grid-matrix') as HTMLElement;
      if (heroGrid && y < 1200) {
        heroGrid.style.transform = `translateY(${y * 0.14}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Client Portal & Legal Modals State
  const [clientPortalOpen, setClientPortalOpen] = useState(false);
  const [portalTab, setPortalTab] = useState<'milestones' | 'billing' | 'deliverables' | 'support'>('milestones');
  const [clientKeyInput, setClientKeyInput] = useState('DEMO-2026');
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(true);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'refunds'>('privacy');

  // Auto-simulation pipeline loop
  useEffect(() => {
    if (!isSimulating || activeDemoTab !== 'ai') return;
    const timer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % AI_STAGES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isSimulating, activeDemoTab]);

  // Viewport tracking for Contextual Onboarding Hints, Highlights, and Animated Telemetry Statistics
  const [isSection1InView, setIsSection1InView] = useState(false);
  const [isDemosInView, setIsDemosInView] = useState(false);
  const [isProblemInView, setIsProblemInView] = useState(false);
  const [isJourneyInView, setIsJourneyInView] = useState(false);
  const [isWalkAwayInView, setIsWalkAwayInView] = useState(false);
  const [isTriangleInView, setIsTriangleInView] = useState(false);

  // Auto-looping Walk Away Capabilities selection state (0: BUILD, 1: THINK, 2: INTEGRATE, 3: MONETIZE, 4: SECURE, 5: SHIP, 6: OWN 100%)
  const [activeWalkAwayIndex, setActiveWalkAwayIndex] = useState(1); // 02 THINK active initially matching user Image
  const [isWalkAwayPaused, setIsWalkAwayPaused] = useState(false);

  useEffect(() => {
    if (!isWalkAwayInView || isWalkAwayPaused) return;
    const timer = setInterval(() => {
      setActiveWalkAwayIndex(prev => (prev + 1) % 7);
    }, 2600);
    return () => clearInterval(timer);
  }, [isWalkAwayInView, isWalkAwayPaused]);

  // FutureStack Scroll In-View State Map (persists once in view across re-renders!)
  const [inViewSections, setInViewSections] = useState<Record<string, boolean>>({
    hero: true, // Hero animates smoothly on initial page load
  });

  // Animated Telemetry Facts & Counters (count up on scroll)
  const [statProjects, setStatProjects] = useState(0);
  const [statCodeSov, setStatCodeSov] = useState(0);
  const [statLatency, setStatLatency] = useState(0);
  const [statUptime, setStatUptime] = useState(0);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setStatProjects(24);
      setStatCodeSov(100);
      setStatLatency(35);
      setStatUptime(24);
      setHasAnimatedStats(true);
      setIsProblemInView(true);
      setIsJourneyInView(true);
      setIsWalkAwayInView(true);
      setIsTriangleInView(true);
      setIsSection1InView(true);
      setIsDemosInView(true);
      setInViewSections({
        hero: true,
        ecosystem: true,
        statement: true,
        problem: true,
        journey: true,
        postkickoff: true,
        demos: true,
        work: true,
        walkaway: true,
        contact: true,
      });
      document.querySelectorAll('[data-inview]').forEach(el => el.setAttribute('data-inview', 'true'));
      document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('in-view'));
      return;
    }

    // IntersectionObserver strictly controlling FutureStack data-inview on scroll
    const inviewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const sectionId = target.getAttribute('data-inview-id') || target.id;
            if (sectionId) {
              setInViewSections(prev => prev[sectionId] ? prev : ({ ...prev, [sectionId]: true }));
            }
            target.setAttribute('data-inview', 'true');
            target.querySelectorAll('.highlight-pill, .journey-sub-pill-tag, .problem-wavy-curve, .walk-away-curve-svg').forEach(el => {
              el.classList.add('drawn');
            });
            if (sectionId === 'services' || sectionId === 'journey' || target.classList.contains('journey-section') || target.classList.contains('journey-head')) {
              setIsJourneyInView(true);
              setIsSection1InView(true);
            }
            if (sectionId === 'problem' || target.classList.contains('problem-section') || target.classList.contains('problem-content-left')) {
              setIsProblemInView(true);
            }
            if (sectionId === 'walkaway' || target.classList.contains('walk-away-wrapper') || target.classList.contains('walk-away-header')) {
              setIsWalkAwayInView(true);
            }
            if (sectionId === 'demos') {
              setIsDemosInView(true);
            }
            if (sectionId === 'postkickoff' || target.classList.contains('post-kickoff-container')) {
              setInViewSections(prev => ({ ...prev, postkickoff: true }));
            }
            inviewObserver.unobserve(target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    document.querySelectorAll('[data-inview], [data-inview-id]').forEach(el => inviewObserver.observe(el));

    // For elements initially in viewport on page load (e.g. Hero), trigger after 150ms for smooth entrance
    const vh = window.innerHeight;
    document.querySelectorAll('[data-inview="false"]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= -50 && rect.top < vh * 0.7) {
        const sectionId = el.getAttribute('data-inview-id');
        setTimeout(() => {
          el.setAttribute('data-inview', 'true');
          if (sectionId) {
            setInViewSections(prev => ({ ...prev, [sectionId]: true }));
          }
        }, 150);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;

            // Facts & Telemetry counters (triggers once smoothly)
            if (target.classList.contains('emc-bento-card') && !hasAnimatedStats) {
              setHasAnimatedStats(true);
              target.classList.add('in-view');
              const startTime = performance.now();
              const duration = 1400;
              const animateStats = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Cubic ease-out curve
                const ease = 1 - Math.pow(1 - progress, 3);
                setStatProjects(Math.round(ease * 24));
                setStatCodeSov(Math.round(ease * 100));
                setStatLatency(Math.round(ease * 35));
                setStatUptime(Math.round(ease * 24));
                if (progress < 1) {
                  requestAnimationFrame(animateStats);
                }
              };
              requestAnimationFrame(animateStats);
            }

            // Statement Strip / Core Architecture Diagram
            if (target.classList.contains('statement-strip') || target.classList.contains('circular-core-container') || target.getAttribute('data-testid') === 'studio-statement') {
              setIsTriangleInView(true);
            }

            // Contextual Tooltips
            if (target.classList.contains('service-discipline-tabs-container') || target.id === 'services') {
              setIsSection1InView(true);
            }
            if (target.classList.contains('demo-tabs') || target.id === 'demos') {
              setIsDemosInView(true);
            }

            // General scroll reveal elements
            if (target.classList.contains('scroll-reveal')) {
              target.classList.add('in-view');
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    const s1Target = document.querySelector('.service-discipline-tabs-container');
    const s2Target = document.querySelector('.demo-tabs');
    const bentoTarget = document.querySelector('.emc-bento-card');
    const statementTarget = document.querySelector('.statement-strip');

    if (s1Target) observer.observe(s1Target);
    if (s2Target) observer.observe(s2Target);
    if (bentoTarget) observer.observe(bentoTarget);
    if (statementTarget) observer.observe(statementTarget);

    let revealRafId: number | null = null;
    const checkAndObserveScrollReveal = () => {
      if (revealRafId) return;
      revealRafId = requestAnimationFrame(() => {
        revealRafId = null;
        const vh = window.innerHeight;
        document.querySelectorAll('.scroll-reveal:not(.in-view)').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < vh - 20 && rect.bottom > 0) {
            el.classList.add('in-view');
          }
        });
      });
    };

    checkAndObserveScrollReveal();
    window.addEventListener('scroll', checkAndObserveScrollReveal, { passive: true });
    window.addEventListener('resize', checkAndObserveScrollReveal, { passive: true });

    return () => {
      if (revealRafId) cancelAnimationFrame(revealRafId);
      inviewObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', checkAndObserveScrollReveal);
      window.removeEventListener('resize', checkAndObserveScrollReveal);
    };
  }, [hasAnimatedStats]);

  // Scroll-driven animation for Section 01 Stage Cards (Image 3: slides in from right + logo glow on scroll down, reverses on scroll up)
  // AND dynamic synchronization of the sticky sidebar with the active stage being viewed all the way through Stage 3
  // With continuous fluid liquid scroll progress for the vertical green connecting lines (Image 4)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-scroll-view');
          } else {
            entry.target.classList.remove('in-scroll-view');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const rows = document.querySelectorAll('.journey-stage-row');
    rows.forEach((row) => observer.observe(row));

    let stageRafId: number | null = null;
    const updateStageScrollAndContinuousLines = () => {
      const journeySec = document.getElementById('services');
      if (!journeySec) return;
      const secRect = journeySec.getBoundingClientRect();
      // Keep running while anywhere near the journey timeline
      if (secRect.bottom < 50 || secRect.top > window.innerHeight * 0.95) {
        return;
      }

      const stageRows = document.querySelectorAll<HTMLElement>('.journey-stage-row');
      if (stageRows.length < 2) return;

      const circle0 = stageRows[0]?.querySelector('.node-icon-circle');
      const circle1 = stageRows[1]?.querySelector('.node-icon-circle');
      const circle2 = stageRows[2]?.querySelector('.node-icon-circle');

      const lineFill0 = stageRows[0]?.querySelector<HTMLElement>('.node-connecting-line-fill');
      const lineFill1 = stageRows[1]?.querySelector<HTMLElement>('.node-connecting-line-fill');

      if (!circle0 || !circle1) return;

      const r0 = circle0.getBoundingClientRect();
      const r1 = circle1.getBoundingClientRect();
      const r2 = circle2 ? circle2.getBoundingClientRect() : null;

      const y0 = r0.top + r0.height * 0.5;
      const y1 = r1.top + r1.height * 0.5;
      const y2 = r2 ? r2.top + r2.height * 0.5 : y1 + (y1 - y0);

      // Smooth focal trigger line at 52% of viewport height
      const focalY = window.innerHeight * 0.52;

      // Continuous progress for segment 0 (Node 0 -> Node 1)
      const p0 = Math.max(0, Math.min(1, (focalY - y0) / Math.max(1, y1 - y0)));
      // Continuous progress for segment 1 (Node 1 -> Node 2)
      const p1 = Math.max(0, Math.min(1, (focalY - y1) / Math.max(1, y2 - y1)));

      if (lineFill0) {
        lineFill0.style.height = `${(p0 * 100).toFixed(1)}%`;
      }
      if (lineFill1) {
        lineFill1.style.height = `${(p1 * 100).toFixed(1)}%`;
      }

      // Update reached glow on node circles
      if (circle0) {
        if (p0 > 0 || r0.top < window.innerHeight * 0.8) {
          circle0.classList.add('active-reached');
          circle0.classList.remove('inactive-unreached');
        }
      }
      if (circle1) {
        if (p0 >= 0.96 || p1 > 0) {
          circle1.classList.add('active-reached');
          circle1.classList.remove('inactive-unreached');
        } else {
          circle1.classList.remove('active-reached');
          circle1.classList.add('inactive-unreached');
        }
      }
      if (circle2) {
        if (p1 >= 0.96) {
          circle2.classList.add('active-reached');
          circle2.classList.remove('inactive-unreached');
        } else {
          circle2.classList.remove('active-reached');
          circle2.classList.add('inactive-unreached');
        }
      }

      // Continuous synchronization of the active journey stage (0, 1, or 2)
      let activeIdx = 0;
      if (p1 >= 0.5) {
        activeIdx = 2;
      } else if (p0 >= 0.5) {
        activeIdx = 1;
      }
      setActiveJourneyStage(prev => (prev === activeIdx ? prev : activeIdx));
    };

    const handleStageScroll = () => {
      if (stageRafId) return;
      stageRafId = requestAnimationFrame(() => {
        stageRafId = null;
        updateStageScrollAndContinuousLines();
      });
    };

    window.addEventListener('scroll', handleStageScroll, { passive: true });
    window.addEventListener('resize', handleStageScroll, { passive: true });
    handleStageScroll();

    return () => {
      if (stageRafId) cancelAnimationFrame(stageRafId);
      rows.forEach((row) => observer.unobserve(row));
      observer.disconnect();
      window.removeEventListener('scroll', handleStageScroll);
      window.removeEventListener('resize', handleStageScroll);
    };
  }, [activeServiceTab]);

  // Dynamic Typewriter / Changing Text State (inspired by errormakesclever.com)
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2100);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % WORDS.length);
      return;
    }
    const speed = isDeleting ? 40 : 90;
    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (isDeleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex]);

  // Telegram Simulator State - Authentic Re-creation of Image 3 (PrimeScalpers bot developed by NextGen)
  const [tgMessages, setTgMessages] = useState<Array<{
    sender: 'bot' | 'user';
    text?: string;
    time: string;
    dateLabel?: string;
    header?: string;
    bulletPoints?: string[];
    footerNote?: string;
    footerTag?: string;
    bubbleColor?: 'blue' | 'purple';
    btnRows?: string[][];
  }>>([
    {
      sender: 'bot',
      bulletPoints: [
        'Reg ID: #1',
        'Participant: Shri Dharsan (@shridharsan1)',
        'Telegram ID: 5188160752',
        'Challenge: $1,000 Challenge',
        'Trader ID: 678907543',
        'Auto-Verification: NOT_FOUND',
        'Deposit: $0.00 / $1000'
      ],
      footerNote: 'Open /admin to inspect.',
      time: '09:21'
    },
    {
      sender: 'user',
      text: '/challenges',
      time: '18:29',
      bubbleColor: 'purple'
    },
    {
      sender: 'bot',
      header: '⚠️ Already Registered',
      bulletPoints: [
        'Challenge: $1,000 Challenge',
        'Status: SUBMITTED',
        'Verification: NOT_FOUND'
      ],
      footerNote: "Check details under 'My Registration Status'.",
      time: '18:29',
      btnRows: [
        ['🔄 Refresh', '🚀 New Challenge'],
        ['💬 Support ↗', '🏠 Menu']
      ]
    },
    {
      sender: 'user',
      text: '/start',
      time: '20:58',
      bubbleColor: 'blue',
      dateLabel: 'November 5'
    },
    {
      sender: 'bot',
      header: '⚡ PRIME SCALPERS CHALLENGE',
      text: 'Welcome! Register for the challenge, verify your eligibility, and receive your private community invite link.',
      bulletPoints: [
        'Live Setups & Market Analysis',
        'Private Community Access',
        'Direct Support: @primescalperbinary'
      ],
      footerTag: '🛠 Developed by NextGen',
      time: '20:58',
      btnRows: [
        ['🚀 Register for Challenge'],
        ['📋 My Status', '💬 Support ↗']
      ]
    }
  ]);
  const [tgInput, setTgInput] = useState('');

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: 'Agentic AI Systems',
    budget: '₹50,000 - ₹1,50,000 (~$1.8K)',
    idea: ''
  });

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (index: number) => {
    setSelectedPackage(index);
    scrollTo('contact');
    const serviceNames = ['Full-Stack Web Development', 'Agentic AI Systems', 'Telegram Bot Engineering'];
    setFormData(prev => ({
      ...prev,
      service: serviceNames[index],
      idea: prev.idea ? prev.idea : `Interested in: ${serviceNames[index]}`
    }));
  };

  const handleTgCommand = (cmd: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isPurple = cmd.startsWith('/') || cmd.includes('Menu') || cmd.includes('challenges');
    const userMsg = {
      sender: 'user' as const,
      text: cmd,
      time,
      bubbleColor: (isPurple ? 'purple' : 'blue') as ('blue' | 'purple')
    };
    setTgMessages(prev => [...prev, userMsg]);
    setTgInput('');
    setIsTgTyping(true);

    setTimeout(() => {
      setIsTgTyping(false);
      let botMsg: {
        sender: 'bot';
        text: string;
        time: string;
        header?: string;
        bulletPoints?: string[];
        footerTag?: string;
        btnRows?: string[][];
      };

      if (cmd === '🚀 Register for Challenge' || cmd.includes('Register')) {
        botMsg = {
          sender: 'bot',
          header: '🎯 APPLICATION SUBMITTED',
          text: 'Your registration application has been logged to the edge webhook database.\nVerification code: PS-8829',
          bulletPoints: [
            'Target Account: $1,000 Scalper Evaluation',
            'Verification Status: IN_REVIEW (p50: 12ms)',
            'VIP Private Channel Link: Pending Webhook Approval'
          ],
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['📋 My Status', '🔄 Refresh'],
            ['💬 Support ↗', '🏠 Menu']
          ]
        };
      } else if (cmd === '📋 My Status' || cmd.includes('Status')) {
        botMsg = {
          sender: 'bot',
          header: '📊 TRADER ACCOUNT STATUS',
          text: 'Account lookup resolved from Supabase PostgreSQL pool:',
          bulletPoints: [
            'Trader ID: #TRD-8821 (PrimeScalpers)',
            'Status: ACTIVE & VERIFIED ✓',
            'Cohort: $1,000 Scaling Group',
            'Execution Latency: 24ms from broker bridge'
          ],
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['🔄 Refresh', '🚀 New Challenge'],
            ['💬 Support ↗']
          ]
        };
      } else if (cmd === '🔄 Refresh') {
        botMsg = {
          sender: 'bot',
          header: '🔄 TELEMETRY REFRESHED',
          text: 'Synced with Cloudflare Worker edge webhook in 18ms. All market signal relays are active.',
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['📋 My Status', '🏠 Menu']
          ]
        };
      } else if (cmd === '🚀 New Challenge') {
        botMsg = {
          sender: 'bot',
          header: '🏆 SELECT CHALLENGE TIER',
          text: 'Choose an active challenge cohort to register:',
          bulletPoints: [
            '1. $1,000 Micro Scalper Evaluation',
            '2. $5,000 Professional Funding',
            '3. $10,000 Institutional Tier'
          ],
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['🚀 Register for Challenge'],
            ['🏠 Menu']
          ]
        };
      } else if (cmd === '💬 Support ↗' || cmd.includes('Support')) {
        botMsg = {
          sender: 'bot',
          header: '💬 DIRECT STUDIO SUPPORT',
          text: 'Connect directly with NextGen lead bot engineers:',
          bulletPoints: [
            'Telegram: @shridharsan1 / @primescalperbinary',
            'WhatsApp: +91 63791 40067',
            'Email: nextgenwebstudio63@gmail.com'
          ],
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['🏠 Menu', '/services']
          ]
        };
      } else if (cmd === '🏠 Menu' || cmd === '/menu' || cmd === '/services') {
        botMsg = {
          sender: 'bot',
          header: '⚡ NEXTGEN AUTOMATION ENGINE',
          text: 'Custom Telegram bot capabilities built from Coimbatore studio:',
          bulletPoints: [
            '1. MT5 & TradingView Instant Signal Relays',
            '2. Automated VIP Private Channel Razorpay/Stripe Paywalls',
            '3. Autonomous LangGraph & OpenAI Reasoning Agents',
            '4. Sub-40ms Webhook Reliability with 100% Code Ownership'
          ],
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['/quote', '/contact'],
            ['🚀 Register for Challenge']
          ]
        };
      } else if (cmd === '/quote') {
        botMsg = {
          sender: 'bot',
          header: '💼 PROJECT ESTIMATOR',
          text: 'Bespoke Telegram bot builds start from ₹25,000 (~$350 USD). Average delivery: 5 to 10 business days with 100% full intellectual property transfer.',
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['/contact', '/services']
          ]
        };
      } else if (cmd === '/contact') {
        botMsg = {
          sender: 'bot',
          header: '🚀 COIMBATORE STUDIO CONTACT',
          text: 'WhatsApp: +91 63791 40067\nTelegram: @shridharsan1\nEmail: nextgenwebstudio63@gmail.com\nCoimbatore, Tamil Nadu, India.',
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['/services', '🏠 Menu']
          ]
        };
      } else {
        botMsg = {
          sender: 'bot',
          header: '🤖 COMMAND PROCESSED',
          text: `Command "${cmd}" received by NextGen edge webhook relay. How can we architect your Telegram automation today?`,
          footerTag: '🛠 Developed by NextGen',
          time,
          btnRows: [
            ['/services', '/quote'],
            ['💬 Support ↗']
          ]
        };
      }

      setTgMessages(prev => [...prev, botMsg]);
    }, 380);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.idea) return;
    
    // 1. Local storage backup for instant offline reliability
    try {
      const existing = JSON.parse(localStorage.getItem('nextgen_inquiries') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('nextgen_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage fallback:', err);
    }

    // 2. Dispatch to live backend API so inquiries appear immediately in Admin Panel & CRM leads
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.whatsapp || 'Not Specified',
      whatsapp: formData.whatsapp || 'Not Specified',
      projectType: formData.service || 'Agentic AI Systems',
      budget: formData.budget,
      message: formData.idea,
      source: 'NextGen V2 Web Studio Scoping Brief'
    };

    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const baseUrl = isLocal ? '' : 'https://nextgen-studio-czz7.onrender.com';
      await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (netErr) {
      console.warn('Live API dispatch error (stored in local backup):', netErr);
    }

    setFormSubmitted(true);
  };

  return (
    <div className="portfolio">
      {/* ==========================================================================
          HEADER (Rendered on Home view only; Portal and Legal views use their own clean headers)
          ========================================================================== */}
      {currentView === 'home' && (
        <header className="site-header" data-testid="site-navigation">
          <div className="header-inner">
            <button
              onClick={() => { navigateTo('home'); scrollTo('top'); }}
              className="nextgen-brand-logo-btn"
              data-testid="brand-home-link"
              aria-label="NextGen Web Studio"
            >
              <EMCLogo />
            </button>

            <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
              <button onClick={() => { setMobileMenuOpen(false); scrollTo('services'); }} data-testid="nav-services-link">
                Services
              </button>
              <button onClick={() => { setMobileMenuOpen(false); scrollTo('demos'); }} data-testid="nav-demos-link">
                Interactive Demos
              </button>
              <button onClick={() => { setMobileMenuOpen(false); scrollTo('work'); }} data-testid="nav-work-link">
                Selected Work
              </button>
              <button onClick={() => { setMobileMenuOpen(false); scrollTo('about'); }} data-testid="nav-about-link">
                Approach
              </button>
              <button onClick={() => { setMobileMenuOpen(false); scrollTo('faq'); }} data-testid="nav-faq-link">
                FAQ
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-portal-btn ${currentView === 'portal' ? 'active' : ''}`}
                data-testid="nav-portal-btn"
                title="Access Agency OS Client Portal"
              >
                <Lock size={12} />
                <span>Client Portal</span>
                <span className="portal-live-dot"></span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); scrollTo('contact'); }}
                className="nav-cta"
                data-testid="nav-contact-link"
              >
                <span>Start a project</span>
                <ArrowUpRight className="lucide-arrow-up-right" size={14} />
              </button>
            </nav>

            <button
              aria-label="Open menu"
              className="mobile-menu"
              data-testid="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
      )}

      {currentView === 'portal' ? (
        <ClientPortalView
          onBackToHome={() => {
            navigateTo('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContact={() => {
            navigateTo('home');
            scrollTo('contact');
          }}
        />
      ) : currentView === 'privacy' || currentView === 'terms' || currentView === 'refunds' ? (
        <LegalPolicyView
          initialPolicy={currentView}
          onBackToHome={() => {
            navigateTo('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <>

      {/* ==========================================================================
          HERO SECTION
          ========================================================================== */}
      {/* ==========================================================================
          HERO SECTION (ERROR MAKES CLEVER INSPIRED CLEAN ARCHITECTURAL HERO)
          ========================================================================== */}
      <section className="hero-new" data-testid="hero-section" id="top">
        {/* Architectural Mosaic Grid Positioned Exclusively On Right Side (Image 2 Match) */}
        <div className="hero-grid-matrix" aria-hidden="true">
          {Array.from({ length: 48 }).map((_, i) => {
            const isTinted1 = [3, 7, 10, 16, 21, 26, 31, 38, 43].includes(i);
            const isTinted2 = [5, 12, 19, 28, 35, 46].includes(i);
            const isBlue = [9, 25].includes(i);
            return (
              <span
                key={i}
                className={`grid-matrix-cell ${isTinted1 ? 'tint-1' : ''} ${isTinted2 ? 'tint-2' : ''} ${isBlue ? 'tint-blue' : ''}`}
              />
            );
          })}
        </div>

        <div className="hero-layout">
          <div className="hero-main">
            {/* Eyebrow Subtitle (Image 1 Match: The Way We Build Software Is Changing.) */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-text">
                The Way We Build Software Is <strong>Changing.</strong>
              </span>
            </div>

            {/* Hero Heading: Centered layout with starburst badge and pill capsule (Image 1 Reference Match) */}
            <div className="hero-emc-heading" data-inview={inViewSections['hero'] ? "true" : "false"} data-inview-id="hero">
              <h1>
                <span className="hero-desktop-headline">
                  <span className="hero-desktop-line-1">
                    <span className="hero-star-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="hero-star-icon">
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                      </svg>
                    </span>
                    <span className="animate-word" style={{ animationDelay: '0.10s' }}>Helping</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.18s' }}>ambitious</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.26s' }}>businesses</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.34s' }}>scale</span>
                  </span>
                  <span className="hero-desktop-line-2">
                    <span className="animate-word" style={{ animationDelay: '0.44s' }}>by</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.52s' }}>engineering</span>{' '}
                    <span className="hero-pill-capsule animate-word" style={{ animationDelay: '0.62s' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="hero-capsule-sparkle" aria-hidden="true">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                      </svg>
                      <span className="hero-capsule-text">
                        {WORDS[wordIndex].substring(0, subIndex)}
                        <span className="hero-changing-cursor" style={{ opacity: blink ? 1 : 0 }}>|</span>
                      </span>
                    </span>
                  </span>
                </span>

                <span className="hero-mobile-headline">
                  <span className="hero-line hero-line-1">
                    <span className="hero-star-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="hero-star-icon">
                        <line x1="12" y1="2" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                      </svg>
                    </span>
                    <span className="animate-word" style={{ animationDelay: '0.10s' }}>Helping</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.18s' }}>ambitious</span>
                  </span>
                  <span className="hero-line hero-line-2">
                    <span className="animate-word" style={{ animationDelay: '0.26s' }}>businesses</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.34s' }}>scale</span>
                  </span>
                  <span className="hero-line hero-line-3">
                    <span className="animate-word" style={{ animationDelay: '0.44s' }}>by</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.52s' }}>engineering</span>
                  </span>
                  <span className="hero-line hero-line-4">
                    <span className="hero-pill-capsule animate-word" style={{ animationDelay: '0.62s' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="hero-capsule-sparkle" aria-hidden="true">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                      </svg>
                      <span className="hero-capsule-text">
                        {WORDS[wordIndex].substring(0, subIndex)}
                        <span className="hero-changing-cursor" style={{ opacity: blink ? 1 : 0 }}>|</span>
                      </span>
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* 1. Lead Intro Sentence */}
            <p className="emc-showcase-intro">
              NextGen Web Studio is an elite digital engineering studio,<br className="emc-break-desktop" />{' '}
              designed by senior engineers to take ambitious businesses from:
            </p>

            {/* 2. Interactive Pipeline Flow Pills with Looping Auto-Selection & Animated Moving Arrow SVGs */}
            <div className="emc-flow-pills-row">
              {[
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend APIs' },
                { id: 'database', label: 'Database & RAG' },
                { id: 'ai', label: 'Autonomous AI' },
                { id: 'edge', label: 'Edge Handover' }
              ].map((pill, idx, arr) => (
                <React.Fragment key={pill.id}>
                  <div
                    className={`emc-flow-pill ${activeFlowIndex === idx ? 'emc-flow-pill-highlight' : ''}`}
                    onClick={() => setActiveFlowIndex(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="emc-flow-dot"></span>
                    <span>{pill.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className={`emc-flow-arrow emc-flow-arrow-${idx} ${activeFlowIndex === idx ? 'arrow-active' : ''}`}>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 32 12"
                        className="flow-arrow-svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 6h25" strokeDasharray="3 3" className="animate-flow-dash" />
                        <path d="M23 2.5 L27 6 L23 9.5" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 3. 4 Highlight Value Badges Row */}
            <div className="emc-feature-badges-row">
              <div className="emc-feature-badge">
                <div className="emc-badge-icon yellow">
                  <Zap size={15} />
                </div>
                <span className="emc-badge-label">Sub-35ms Edge Latency</span>
              </div>
              <span className="emc-badge-sep">•</span>

              <div className="emc-feature-badge">
                <div className="emc-badge-icon cyan">
                  <Bot size={15} />
                </div>
                <span className="emc-badge-label">Autonomous AI Agents</span>
              </div>
              <span className="emc-badge-sep">•</span>

              <div className="emc-feature-badge">
                <div className="emc-badge-icon mint">
                  <Lock size={14} />
                </div>
                <span className="emc-badge-label">100% Code Sovereignty</span>
              </div>
              <span className="emc-badge-sep">•</span>

              <div className="emc-feature-badge">
                <div className="emc-badge-icon blue">
                  <Rocket size={14} />
                </div>
                <span className="emc-badge-label">2-Hour SLA Callback</span>
              </div>
            </div>

            {/* 4. Action Buttons & Subtext */}
            <div className="emc-cta-actions">
              <button
                onClick={() => scrollTo('contact')}
                className="emc-cta-button-primary"
                data-testid="showcase-cta-start"
              >
                <span>Start Your NextGen Project</span>
                <span className="emc-btn-circle-icon">
                  <ArrowUpRight size={14} />
                </span>
              </button>

              <button
                onClick={() => scrollTo('services')}
                className="emc-cta-link-secondary"
              >
                <span>Explore Architecture</span>
                <ArrowDown size={14} />
              </button>
            </div>

            <p className="emc-cta-subtext">
              Inspect our deterministic multi-agent systems, client portals, and live telemetry before you decide.
            </p>

            {/* 5. STUDIO FACTS Bento Card */}
            <div className="emc-bento-card scroll-reveal">
              <div className="emc-bento-header">
                <span className="emc-bento-title">STUDIO FACTS &amp; TELEMETRY</span>
                <span className="emc-bento-badge">Full Stack × AI</span>
              </div>

              <div className={`emc-bento-grid ${hasAnimatedStats ? 'stats-active' : ''}`}>
                {/* Card 1: 24+ Projects Shipped */}
                <div className="emc-fact-tile">
                  <div className="emc-tile-top">
                    <div className="emc-tile-icon yellow">
                      <Layers size={16} />
                    </div>
                    <div className="emc-tile-meta">
                      <span className="emc-tile-number" data-testid="stat-projects">
                        {hasAnimatedStats ? `${statProjects}+` : '0+'}
                      </span>
                      <span className="emc-tile-label">Projects Shipped</span>
                    </div>
                  </div>
                  <div className={`emc-progress-segments ${hasAnimatedStats ? 'animate-fill' : ''}`}>
                    <span className="emc-seg active"></span>
                    <span className="emc-seg active"></span>
                    <span className="emc-seg active"></span>
                    <span className="emc-seg active"></span>
                  </div>
                </div>

                {/* Card 2: 100% Code Sovereignty */}
                <div className="emc-fact-tile">
                  <div className="emc-tile-top">
                    <div className="emc-tile-icon mint">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="emc-tile-meta">
                      <span className="emc-tile-number" data-testid="stat-codesov">
                        {hasAnimatedStats ? `${statCodeSov}%` : '0%'}
                      </span>
                      <span className="emc-tile-label">Code Sovereignty</span>
                    </div>
                  </div>
                  <div className={`emc-vertical-ticks ${hasAnimatedStats ? 'animate-grow' : ''}`}>
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span
                        key={i}
                        className="emc-tick"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* Card 3: < 35ms Edge Latency */}
                <div className="emc-fact-tile">
                  <div className="emc-tile-top">
                    <div className="emc-tile-icon blue">
                      <Activity size={16} />
                    </div>
                    <div className="emc-tile-meta">
                      <span className="emc-tile-number" data-testid="stat-latency">
                        {hasAnimatedStats ? (statLatency >= 35 ? '< 35ms' : `< ${statLatency}ms`) : '0ms'}
                      </span>
                      <span className="emc-tile-label">Edge Latency</span>
                    </div>
                  </div>
                  <div className={`emc-dot-matrix matrix-64 ${hasAnimatedStats ? 'animate-dots' : ''}`}>
                    {Array.from({ length: 64 }).map((_, i) => (
                      <span
                        key={i}
                        className="emc-matrix-dot"
                        style={{ animationDelay: `${(i % 16) * 0.04}s` }}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* Card 4: 24/7 Autonomous Uptime */}
                <div className="emc-fact-tile">
                  <div className="emc-tile-top">
                    <div className="emc-tile-icon cyan">
                      <Cpu size={16} />
                    </div>
                    <div className="emc-tile-meta">
                      <span className="emc-tile-number" data-testid="stat-uptime">
                        {hasAnimatedStats ? `${statUptime}/7` : '0/7'}
                      </span>
                      <span className="emc-tile-label">Autonomous Uptime</span>
                    </div>
                  </div>
                  <div className={`emc-dot-matrix matrix-96 ${hasAnimatedStats ? 'animate-dots' : ''}`}>
                    {Array.from({ length: 96 }).map((_, i) => (
                      <span
                        key={i}
                        className="emc-matrix-dot"
                        style={{ animationDelay: `${(i % 24) * 0.03}s` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Highlight Pill Bar */}
              <div className="emc-bento-bottom-banner">
                <div className="emc-banner-icon">
                  <Briefcase size={14} />
                </div>
                <span>
                  <strong>100% Intellectual Property Sovereignty</strong> &amp; Private GitHub Organization Transfer upon milestone settlement
                </span>
              </div>

              {/* 4 Trust Badges from Image 1 */}
              <div className="emc-trust-badges-bar">
                <div className="emc-trust-badge">
                  <ShieldCheck size={16} className="trust-icon cyan" />
                  <span className="trust-title">Razorpay</span>
                  <span className="trust-sub">Verified Gateway</span>
                </div>
                <div className="emc-trust-badge">
                  <CreditCard size={16} className="trust-icon cyan" />
                  <span className="trust-title">Stripe</span>
                  <span className="trust-sub">Global Processing</span>
                </div>
                <div className="emc-trust-badge">
                  <Lock size={16} className="trust-icon green" />
                  <span className="trust-title">256-Bit SSL</span>
                  <span className="trust-sub">Encrypted</span>
                </div>
                <div className="emc-trust-badge">
                  <CheckCircle2 size={16} className="trust-icon cyan" />
                  <span className="trust-title">100% Code</span>
                  <span className="trust-sub">Sovereignty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span className="hero-scroll-line"></span>
          <span>EST. COIMBATORE, TN • WORLDWIDE</span>
        </div>
      </section>

      {/* ==========================================================================
          BATTLE-TESTED ENGINEERING STACK & RUNNING SQUIRCLE GRID
          ========================================================================== */}
      <section className="brand-ecosystem" data-testid="brand-ecosystem">
        <div className="ecosystem-wrap">
          <div className="ecosystem-card-container" data-inview={inViewSections['ecosystem'] ? "true" : "false"} data-inview-id="ecosystem">
            <div className="ecosystem-card-header">
              <h3 className="ecosystem-main-heading">
                <span className="animate-word" style={{ animationDelay: '0.08s' }}>Battle-Tested</span>{' '}
                <span className="animate-word" style={{ animationDelay: '0.20s' }}>Engineering</span>{' '}
                <span className="animate-word" style={{ animationDelay: '0.32s' }}>Stack</span>
              </h3>
              <div className="animate-rise" style={{ animationDelay: '0.45s' }}>
                <p className="ecosystem-sub-copy">
                  Production frameworks, multi-agent reasoning loops, and distributed ledgers powering our shipped systems.
                </p>
              </div>
            </div>

            {/* Running Vertical Multi-Column Squircle Marquee (Attachment 4 Exact Recreation) */}
            <div className="ecosystem-marquee-window">
              <div className="ecosystem-columns-track">
                {/* Column 1 - Marquee Up */}
                <div className="ecosystem-running-col col-up-1">
                  <div className="ecosystem-col-inner">
                    {[
                      { name: 'Firebase', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#FFA000" d="M3.9 15.7L6.3 1a.65.65 0 0 1 1.1-.2l3.2 6-6.7 8.9z"/><path fill="#F57C00" d="M15.9 7.8L13.8 3.8a.65.65 0 0 0-1.2 0L3.9 15.7l8 4.5a1.3 1.3 0 0 0 1.3 0l7-3.9-4.3-8.5z"/><path fill="#FFCA28" d="M20.2 16.3l-3.3-6.6-6.4 8.6 5.4 3a1.3 1.3 0 0 0 1.3 0l3-1.7a1.3 1.3 0 0 0 .7-1.1c0-.1 0-.1 0-.2z"/></svg> },
                      { name: 'HTML5', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#E34F26" d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0z"/><path fill="#EF652A" d="M12 22.2l7-2.1 1.6-18.2H12v20.3z"/><path fill="#EBEBEB" d="M12 9.7H8l-.3-3.1H12V3.4H4.7l.8 9.4H12V9.7zm0 6.6l-.1.1-3.2-.9-.2-2.3H5.5l.4 4.6 6.1 1.7v-3.2z"/><path fill="#FFF" d="M12 9.7h4l-.4 4.2-3.6 1v3.2l6.1-1.7.8-9.4H12V9.7zm0-6.3v3.2h7.3l.3-3.2H12z"/></svg> },
                      { name: 'CSS3', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#1572B6" d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0z"/><path fill="#33A9DC" d="M12 22.2l7-2.1 1.6-18.2H12v20.3z"/><path fill="#EBEBEB" d="M12 9.7H8l-.3-3.1H12V3.4H4.7l.8 9.4H12V9.7zm0 6.6l-.1.1-3.2-.9-.2-2.3H5.5l.4 4.6 6.1 1.7v-3.2z"/><path fill="#FFF" d="M12 9.7h4l-.4 4.2-3.6 1v3.2l6.1-1.7.8-9.4H12V9.7zm0-6.3v3.2h7.3l.3-3.2H12z"/></svg> },
                      { name: 'Express', icon: <div style={{ fontWeight: 800, fontSize: '18px', color: '#111827', fontFamily: 'monospace' }}>ex</div> },
                      { name: 'TypeScript', icon: <svg width="26" height="26" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3178C6"/><path fill="#FFF" d="M11.7 15.5c.3.2.7.4 1.1.5.4.1.9.1 1.3.1.8 0 1.5-.2 1.9-.6.4-.4.7-1 .7-1.7 0-.5-.1-.9-.3-1.2-.2-.3-.5-.6-.9-.9-.4-.3-1-.5-1.6-.8-.6-.2-1.1-.5-1.4-.7-.3-.2-.6-.5-.7-.7-.2-.3-.2-.6-.2-1 0-.7.2-1.2.7-1.6.5-.4 1.2-.6 2-.6.7 0 1.3.1 1.9.4.6.2 1 .6 1.3 1l-1.3 1.6c-.3-.3-.6-.5-.9-.7-.3-.2-.7-.2-1.1-.2-.5 0-.8.1-1.1.3-.2.2-.4.5-.4.8 0 .3.1.5.2.7.2.2.4.4.7.5.3.2.8.4 1.3.6.7.3 1.3.6 1.7.8.4.3.7.6.9.9.2.4.3.8.3 1.4 0 .8-.3 1.5-.8 2-.5.5-1.4.8-2.4.8-.9 0-1.7-.2-2.5-.5-.7-.3-1.3-.8-1.7-1.4l1.6-1.5zM7.2 8.7v10.1H4.6V8.7H1.4V6.6h9v2.1H7.2z"/></svg> },
                      { name: 'Python', icon: <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#3776AB" d="M11.9 1c-4.4 0-4.1 1.9-4.1 1.9l.1 2h4.1v.6H5.8S3 5.2 3 9.6s2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.2s2.4 0 2.4-2.4V4.4S16.4 1 11.9 1zm-1.2 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/><path fill="#FFD438" d="M12.1 23c4.4 0 4.1-1.9 4.1-1.9l-.1-2h-4.1v-.6h6.2s2.8.3 2.8-4.1-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5H10.3s-2.4 0-2.4 2.4v2.5S7.6 23 12.1 23zm1.2-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/></svg> },
                      // Duplicate for seamless infinite loop
                      { name: 'Firebase', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#FFA000" d="M3.9 15.7L6.3 1a.65.65 0 0 1 1.1-.2l3.2 6-6.7 8.9z"/><path fill="#F57C00" d="M15.9 7.8L13.8 3.8a.65.65 0 0 0-1.2 0L3.9 15.7l8 4.5a1.3 1.3 0 0 0 1.3 0l7-3.9-4.3-8.5z"/><path fill="#FFCA28" d="M20.2 16.3l-3.3-6.6-6.4 8.6 5.4 3a1.3 1.3 0 0 0 1.3 0l3-1.7a1.3 1.3 0 0 0 .7-1.1c0-.1 0-.1 0-.2z"/></svg> },
                      { name: 'HTML5', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#E34F26" d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0z"/><path fill="#EF652A" d="M12 22.2l7-2.1 1.6-18.2H12v20.3z"/><path fill="#EBEBEB" d="M12 9.7H8l-.3-3.1H12V3.4H4.7l.8 9.4H12V9.7zm0 6.6l-.1.1-3.2-.9-.2-2.3H5.5l.4 4.6 6.1 1.7v-3.2z"/><path fill="#FFF" d="M12 9.7h4l-.4 4.2-3.6 1v3.2l6.1-1.7.8-9.4H12V9.7zm0-6.3v3.2h7.3l.3-3.2H12z"/></svg> },
                      { name: 'CSS3', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#1572B6" d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0z"/><path fill="#33A9DC" d="M12 22.2l7-2.1 1.6-18.2H12v20.3z"/><path fill="#EBEBEB" d="M12 9.7H8l-.3-3.1H12V3.4H4.7l.8 9.4H12V9.7zm0 6.6l-.1.1-3.2-.9-.2-2.3H5.5l.4 4.6 6.1 1.7v-3.2z"/><path fill="#FFF" d="M12 9.7h4l-.4 4.2-3.6 1v3.2l6.1-1.7.8-9.4H12V9.7zm0-6.3v3.2h7.3l.3-3.2H12z"/></svg> },
                      { name: 'Express', icon: <div style={{ fontWeight: 800, fontSize: '18px', color: '#111827', fontFamily: 'monospace' }}>ex</div> },
                      { name: 'TypeScript', icon: <svg width="26" height="26" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3178C6"/><path fill="#FFF" d="M11.7 15.5c.3.2.7.4 1.1.5.4.1.9.1 1.3.1.8 0 1.5-.2 1.9-.6.4-.4.7-1 .7-1.7 0-.5-.1-.9-.3-1.2-.2-.3-.5-.6-.9-.9-.4-.3-1-.5-1.6-.8-.6-.2-1.1-.5-1.4-.7-.3-.2-.6-.5-.7-.7-.2-.3-.2-.6-.2-1 0-.7.2-1.2.7-1.6.5-.4 1.2-.6 2-.6.7 0 1.3.1 1.9.4.6.2 1 .6 1.3 1l-1.3 1.6c-.3-.3-.6-.5-.9-.7-.3-.2-.7-.2-1.1-.2-.5 0-.8.1-1.1.3-.2.2-.4.5-.4.8 0 .3.1.5.2.7.2.2.4.4.7.5.3.2.8.4 1.3.6.7.3 1.3.6 1.7.8.4.3.7.6.9.9.2.4.3.8.3 1.4 0 .8-.3 1.5-.8 2-.5.5-1.4.8-2.4.8-.9 0-1.7-.2-2.5-.5-.7-.3-1.3-.8-1.7-1.4l1.6-1.5zM7.2 8.7v10.1H4.6V8.7H1.4V6.6h9v2.1H7.2z"/></svg> },
                      { name: 'Python', icon: <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#3776AB" d="M11.9 1c-4.4 0-4.1 1.9-4.1 1.9l.1 2h4.1v.6H5.8S3 5.2 3 9.6s2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.2s2.4 0 2.4-2.4V4.4S16.4 1 11.9 1zm-1.2 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/><path fill="#FFD438" d="M12.1 23c4.4 0 4.1-1.9 4.1-1.9l-.1-2h-4.1v-.6h6.2s2.8.3 2.8-4.1-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5H10.3s-2.4 0-2.4 2.4v2.5S7.6 23 12.1 23zm1.2-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/></svg> }
                    ].map((item, idx) => (
                      <div key={idx} className="ecosystem-squircle-tile" title={item.name}>
                        {item.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 - Marquee Down */}
                <div className="ecosystem-running-col col-down-1">
                  <div className="ecosystem-col-inner">
                    {[
                      { name: 'MongoDB', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#47A248" d="M12 0s-2.7 3.5-3.6 7.4c-.9 3.9-.3 8.3 3.6 13.9 3.9-5.6 4.5-10 3.6-13.9C14.7 3.5 12 0 12 0zm-.2 23.9c-.3 0-.6-.1-.8-.3-.5-.4-.7-1.1-.3-1.6.4-.5 1.1-.7 1.6-.3.5.4.7 1.1.3 1.6-.2.4-.5.6-.8.6z"/></svg> },
                      { name: 'Node.js', icon: <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#539E43" d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3z"/><path fill="#539E43" d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z"/></svg> },
                      { name: 'React', icon: <svg width="30" height="30" viewBox="-11.5 -10.23 23 20.46"><circle cx="0" cy="0" r="2.05" fill="#00D8FF"/><g stroke="#00D8FF" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
                      { name: 'JavaScript', icon: <svg width="28" height="28" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M7.7 18.2c.5.8 1.1 1.4 2.1 1.4 1 0 1.6-.5 1.6-1.5v-7.3h2.3v7.3c0 2.2-1.3 3.2-3.8 3.2-1.7 0-2.8-.8-3.4-2.1l1.2-1zm8.3.2c.7.4 1.5.7 2.4.7 1 0 1.6-.5 1.6-1.1 0-.8-.7-1-1.8-1.5-1.5-.7-2.5-1.6-2.5-3.1 0-1.7 1.3-3 3.3-3 1.2 0 2 .3 2.7.8l-.8 1.6c-.5-.4-1.1-.6-1.8-.6-.8 0-1.3.4-1.3 1 0 .6.5.9 1.5 1.3 1.7.7 2.8 1.5 2.8 3.3 0 1.9-1.5 3.1-3.7 3.1-1.5 0-2.6-.4-3.4-1l1-1.5z"/></svg> },
                      { name: 'PostgreSQL', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1v-2.3c-2.4-1.2-4-3.7-4-6.8 0-4.4 3.6-8 8-8s8 3.6 8 8c0 3.1-1.6 5.6-4 6.8v2.3c3.5-1.5 6-5 6-9.1 0-5.5-4.5-10-10-10z"/></svg> },
                      // Duplicate for seamless infinite loop
                      { name: 'MongoDB', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#47A248" d="M12 0s-2.7 3.5-3.6 7.4c-.9 3.9-.3 8.3 3.6 13.9 3.9-5.6 4.5-10 3.6-13.9C14.7 3.5 12 0 12 0zm-.2 23.9c-.3 0-.6-.1-.8-.3-.5-.4-.7-1.1-.3-1.6.4-.5 1.1-.7 1.6-.3.5.4.7 1.1.3 1.6-.2.4-.5.6-.8.6z"/></svg> },
                      { name: 'Node.js', icon: <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#539E43" d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3z"/><path fill="#539E43" d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z"/></svg> },
                      { name: 'React', icon: <svg width="30" height="30" viewBox="-11.5 -10.23 23 20.46"><circle cx="0" cy="0" r="2.05" fill="#00D8FF"/><g stroke="#00D8FF" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
                      { name: 'JavaScript', icon: <svg width="28" height="28" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M7.7 18.2c.5.8 1.1 1.4 2.1 1.4 1 0 1.6-.5 1.6-1.5v-7.3h2.3v7.3c0 2.2-1.3 3.2-3.8 3.2-1.7 0-2.8-.8-3.4-2.1l1.2-1zm8.3.2c.7.4 1.5.7 2.4.7 1 0 1.6-.5 1.6-1.1 0-.8-.7-1-1.8-1.5-1.5-.7-2.5-1.6-2.5-3.1 0-1.7 1.3-3 3.3-3 1.2 0 2 .3 2.7.8l-.8 1.6c-.5-.4-1.1-.6-1.8-.6-.8 0-1.3.4-1.3 1 0 .6.5.9 1.5 1.3 1.7.7 2.8 1.5 2.8 3.3 0 1.9-1.5 3.1-3.7 3.1-1.5 0-2.6-.4-3.4-1l1-1.5z"/></svg> },
                      { name: 'PostgreSQL', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1v-2.3c-2.4-1.2-4-3.7-4-6.8 0-4.4 3.6-8 8-8s8 3.6 8 8c0 3.1-1.6 5.6-4 6.8v2.3c3.5-1.5 6-5 6-9.1 0-5.5-4.5-10-10-10z"/></svg> }
                    ].map((item, idx) => (
                      <div key={idx} className="ecosystem-squircle-tile" title={item.name}>
                        {item.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3 - Marquee Up */}
                <div className="ecosystem-running-col col-up-2">
                  <div className="ecosystem-col-inner">
                    {[
                      { name: 'Redux', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#764ABC" d="M15.7 11.5c-.2-.4-.6-.7-1.1-.9.5-.5.8-1.2.8-2 0-1.6-1.3-2.8-2.9-2.8-.5 0-1 .1-1.4.4-.4-.5-1-.8-1.7-.8-1.6 0-2.9 1.3-2.9 2.9 0 .4.1.8.3 1.2-.5.5-.8 1.1-.8 1.8 0 1.4.9 2.5 2.2 2.8.2.7.8 1.2 1.5 1.5-.3.6-.5 1.3-.5 2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.9-.3-1.7-.8-2.3 1-.7 1.6-1.9 1.6-3.2 0-.3 0-.5-.1-.7z"/></svg> },
                      { name: 'Tailwind CSS', icon: <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#38BDF8" d="M12 6c-4 0-6.5 2-7.5 6 1.5-2 3.5-2.5 5.5-1.5 1.1.6 2 1.6 2.9 2.6C14.4 14.7 16.2 17 21 17c4 0 6.5-2 7.5-6-1.5 2-3.5 2.5-5.5 1.5-1.1-.6-2-1.6-2.9-2.6C18.6 8.3 16.8 6 12 6zm-9 6c-4 0-6.5 2-7.5 6 1.5-2 3.5-2.5 5.5-1.5 1.1.6 2 1.6 2.9 2.6C5.4 20.7 7.2 23 12 23c4 0 6.5-2 7.5-6-1.5 2-3.5 2.5-5.5 1.5-1.1-.6-2-1.6-2.9-2.6C9.6 14.3 7.8 12 3 12z"/></svg> },
                      { name: 'GitHub', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#181717" d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3 .6-3.8-.7-4-1.4-.1-.3-.7-1.4-1.2-1.7-.4-.2-1-.8 0-.8 1 0 1.6.9 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12c0-6.6-5.4-12-12-12z"/></svg> },
                      { name: 'Supabase', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#3ECF8E" d="M13.4 2.1a1 1 0 0 0-1.7.5L8.2 12.3a1 1 0 0 0 .9 1.4h5.2l-3.7 8.2a1 1 0 0 0 1.7.9l7.5-9.7a1 1 0 0 0-.8-1.6h-5.2l3.6-7.4a1 1 0 0 0-4-2z"/></svg> },
                      { name: 'Next.js', icon: <svg width="28" height="28" viewBox="0 0 180 180"><circle cx="90" cy="90" r="90" fill="#000"/><path d="M149.5 157.4L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.4z" fill="#FFF"/><rect x="115" y="54" width="12" height="72" fill="#FFF"/></svg> },
                      // Duplicate for seamless infinite loop
                      { name: 'Redux', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#764ABC" d="M15.7 11.5c-.2-.4-.6-.7-1.1-.9.5-.5.8-1.2.8-2 0-1.6-1.3-2.8-2.9-2.8-.5 0-1 .1-1.4.4-.4-.5-1-.8-1.7-.8-1.6 0-2.9 1.3-2.9 2.9 0 .4.1.8.3 1.2-.5.5-.8 1.1-.8 1.8 0 1.4.9 2.5 2.2 2.8.2.7.8 1.2 1.5 1.5-.3.6-.5 1.3-.5 2 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.9-.3-1.7-.8-2.3 1-.7 1.6-1.9 1.6-3.2 0-.3 0-.5-.1-.7z"/></svg> },
                      { name: 'Tailwind CSS', icon: <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#38BDF8" d="M12 6c-4 0-6.5 2-7.5 6 1.5-2 3.5-2.5 5.5-1.5 1.1.6 2 1.6 2.9 2.6C14.4 14.7 16.2 17 21 17c4 0 6.5-2 7.5-6-1.5 2-3.5 2.5-5.5 1.5-1.1-.6-2-1.6-2.9-2.6C18.6 8.3 16.8 6 12 6zm-9 6c-4 0-6.5 2-7.5 6 1.5-2 3.5-2.5 5.5-1.5 1.1.6 2 1.6 2.9 2.6C5.4 20.7 7.2 23 12 23c4 0 6.5-2 7.5-6-1.5 2-3.5 2.5-5.5 1.5-1.1-.6-2-1.6-2.9-2.6C9.6 14.3 7.8 12 3 12z"/></svg> },
                      { name: 'GitHub', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#181717" d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3 .6-3.8-.7-4-1.4-.1-.3-.7-1.4-1.2-1.7-.4-.2-1-.8 0-.8 1 0 1.6.9 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12c0-6.6-5.4-12-12-12z"/></svg> },
                      { name: 'Supabase', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#3ECF8E" d="M13.4 2.1a1 1 0 0 0-1.7.5L8.2 12.3a1 1 0 0 0 .9 1.4h5.2l-3.7 8.2a1 1 0 0 0 1.7.9l7.5-9.7a1 1 0 0 0-.8-1.6h-5.2l3.6-7.4a1 1 0 0 0-4-2z"/></svg> },
                      { name: 'Next.js', icon: <svg width="28" height="28" viewBox="0 0 180 180"><circle cx="90" cy="90" r="90" fill="#000"/><path d="M149.5 157.4L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.4z" fill="#FFF"/><rect x="115" y="54" width="12" height="72" fill="#FFF"/></svg> }
                    ].map((item, idx) => (
                      <div key={idx} className="ecosystem-squircle-tile" title={item.name}>
                        {item.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 4 - Marquee Down */}
                <div className="ecosystem-running-col col-down-2">
                  <div className="ecosystem-col-inner">
                    {[
                      { name: 'Node.js', icon: <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#539E43" d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3z"/><path fill="#539E43" d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z"/></svg> },
                      { name: 'React 19', icon: <svg width="30" height="30" viewBox="-11.5 -10.23 23 20.46"><circle cx="0" cy="0" r="2.05" fill="#00D8FF"/><g stroke="#00D8FF" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
                      { name: 'Firebase', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#FFA000" d="M3.9 15.7L6.3 1a.65.65 0 0 1 1.1-.2l3.2 6-6.7 8.9z"/><path fill="#F57C00" d="M15.9 7.8L13.8 3.8a.65.65 0 0 0-1.2 0L3.9 15.7l8 4.5a1.3 1.3 0 0 0 1.3 0l7-3.9-4.3-8.5z"/><path fill="#FFCA28" d="M20.2 16.3l-3.3-6.6-6.4 8.6 5.4 3a1.3 1.3 0 0 0 1.3 0l3-1.7a1.3 1.3 0 0 0 .7-1.1c0-.1 0-.1 0-.2z"/></svg> },
                      { name: 'Telegram API', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#229ED9" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.6 6.8l-1.1 7.2c-.1.7-.4 1-.7 1-.6 0-1-.4-1.6-.7-.9-.6-1.4-1-2.2-1.5-1-.7-.4-1 .2-1.6.2-.2 2.7-2.5 2.8-2.7a.2.2 0 0 0 0-.2c-.1 0-.2 0-.3 0-.1 0-1.5.9-4.2 2.8-.4.3-.8.4-1.1.4-.4 0-1-.2-1.6-.4-.6-.2-1.1-.3-1.1-.7 0-.2.3-.3.7-.5 2.9-1.3 4.9-2.1 5.8-2.5 2.8-1.2 3.4-1.4 3.7-1.4.1 0 .3 0 .4.1.1.1.1.2.1.3 0 .1 0 .3 0 .5z"/></svg> },
                      { name: 'Razorpay', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#0C2340" d="M14.5 2L7 14h5.5l-2 8L18 10h-5.5l2-8z"/></svg> },
                      { name: 'Stripe', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#635BFF" d="M13.9 9.3c0-.7-.6-1.1-1.5-1.1-1.4 0-3.1.5-4.2 1.1L7 6.1c1.3-.7 3.2-1.2 5.3-1.2 3.8 0 6.3 1.9 6.3 5.4 0 5.3-7.2 4.4-7.2 6.7 0 .9.8 1.2 1.9 1.2 1.6 0 3.7-.6 4.9-1.3l1.1 3.2c-1.5.8-3.7 1.4-6.1 1.4-4 0-6.6-2-6.6-5.5 0-5.7 7.3-4.7 7.3-6.7z"/></svg> },
                      // Duplicate for seamless infinite loop
                      { name: 'Node.js', icon: <svg width="30" height="30" viewBox="0 0 24 24"><path fill="#539E43" d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7 3.6 16.8V7.1L12 2.3z"/><path fill="#539E43" d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z"/></svg> },
                      { name: 'React 19', icon: <svg width="30" height="30" viewBox="-11.5 -10.23 23 20.46"><circle cx="0" cy="0" r="2.05" fill="#00D8FF"/><g stroke="#00D8FF" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
                      { name: 'Firebase', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#FFA000" d="M3.9 15.7L6.3 1a.65.65 0 0 1 1.1-.2l3.2 6-6.7 8.9z"/><path fill="#F57C00" d="M15.9 7.8L13.8 3.8a.65.65 0 0 0-1.2 0L3.9 15.7l8 4.5a1.3 1.3 0 0 0 1.3 0l7-3.9-4.3-8.5z"/><path fill="#FFCA28" d="M20.2 16.3l-3.3-6.6-6.4 8.6 5.4 3a1.3 1.3 0 0 0 1.3 0l3-1.7a1.3 1.3 0 0 0 .7-1.1c0-.1 0-.1 0-.2z"/></svg> },
                      { name: 'Telegram API', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#229ED9" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.6 6.8l-1.1 7.2c-.1.7-.4 1-.7 1-.6 0-1-.4-1.6-.7-.9-.6-1.4-1-2.2-1.5-1-.7-.4-1 .2-1.6.2-.2 2.7-2.5 2.8-2.7a.2.2 0 0 0 0-.2c-.1 0-.2 0-.3 0-.1 0-1.5.9-4.2 2.8-.4.3-.8.4-1.1.4-.4 0-1-.2-1.6-.4-.6-.2-1.1-.3-1.1-.7 0-.2.3-.3.7-.5 2.9-1.3 4.9-2.1 5.8-2.5 2.8-1.2 3.4-1.4 3.7-1.4.1 0 .3 0 .4.1.1.1.1.2.1.3 0 .1 0 .3 0 .5z"/></svg> },
                      { name: 'Razorpay', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#0C2340" d="M14.5 2L7 14h5.5l-2 8L18 10h-5.5l2-8z"/></svg> },
                      { name: 'Stripe', icon: <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#635BFF" d="M13.9 9.3c0-.7-.6-1.1-1.5-1.1-1.4 0-3.1.5-4.2 1.1L7 6.1c1.3-.7 3.2-1.2 5.3-1.2 3.8 0 6.3 1.9 6.3 5.4 0 5.3-7.2 4.4-7.2 6.7 0 .9.8 1.2 1.9 1.2 1.6 0 3.7-.6 4.9-1.3l1.1 3.2c-1.5.8-3.7 1.4-6.1 1.4-4 0-6.6-2-6.6-5.5 0-5.7 7.3-4.7 7.3-6.7z"/></svg> }
                    ].map((item, idx) => (
                      <div key={idx} className="ecosystem-squircle-tile" title={item.name}>
                        {item.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipped Real-World Systems Bar */}
            <div className="ecosystem-client-bar">
              <div className="ecosystem-client-pill">
                <strong>Boomers Lounge</strong>
                <span>Esports OS • Coimbatore</span>
              </div>
              <div className="ecosystem-client-pill">
                <strong>GoatTurf Arena</strong>
                <span>Sports SaaS • Realtime</span>
              </div>
              <div className="ecosystem-client-pill">
                <strong>NeiMozhi Foods</strong>
                <span>Pure Ghee • D2C</span>
              </div>
              <div className="ecosystem-client-pill">
                <strong>NextGen Billing</strong>
                <span>Offline POS & GST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          STATEMENT STRIP
          ========================================================================== */}
      <section className="statement-strip scroll-reveal" data-testid="studio-statement" data-inview={inViewSections['statement'] ? "true" : "false"} data-inview-id="statement">
        <div>
          <span className="animate-word" style={{ animationDelay: '0.08s' }}>BEYOND</span>{' '}
          <span className="animate-word" style={{ animationDelay: '0.18s' }}>WEBSITES.</span>
          <br />
          <em>
            <span className="animate-word" style={{ animationDelay: '0.28s' }}>INTELLIGENT</span>{' '}
            <span className="animate-word" style={{ animationDelay: '0.38s' }}>DIGITAL</span>{' '}
            <span className="animate-word" style={{ animationDelay: '0.48s' }}>FUTURES.</span>
          </em>
        </div>

        <div className="statement-detail">
          <div className="animate-rise" style={{ animationDelay: '0.55s' }}>
            <p>
              Headquartered in Coimbatore, Tamil Nadu, NextGen Web Studio merges high-velocity full-stack engineering with cutting-edge agentic intelligence. We don't construct generic marketing pages; we build mission-critical digital machinery that has <span className="text-blue-underline">raised the bar.</span>
            </p>
          </div>

          {/* 3 Engineering Principles (Clean 01, 02, 03 Metrics: Row 1 has 01 & 02; Row 2 has 03 Centered) */}
          <div className="statement-metrics">
            <div className="statement-metric-item animate-card-in" style={{ animationDelay: '0.65s' }}>
              <span className="statement-metric-num">01</span>
              <span className="statement-metric-label">100% Code Sovereignty</span>
            </div>
            <div className="statement-metric-item animate-card-in" style={{ animationDelay: '0.78s' }}>
              <span className="statement-metric-num">02</span>
              <span className="statement-metric-label">Sub-35ms Edge Latency</span>
            </div>
            <div className="statement-metric-item statement-metric-item-center animate-card-in" style={{ animationDelay: '0.90s' }}>
              <span className="statement-metric-num">03</span>
              <span className="statement-metric-label">Zero Tech Debt</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          THE PROBLEM WITH CONVENTIONAL AGENCIES (IMAGE 2 RECREATION)
          ========================================================================== */}
      <section className="problem-section" id="problem">
        <div className="section-wrap">
          <div className="problem-card">
            <div className="problem-content-left" data-inview={inViewSections['problem'] || isProblemInView ? "true" : "false"} data-inview-id="problem">
              <div className="problem-badge animate-word" style={{ animationDelay: '0.08s' }}>
                <AlertTriangle size={13} />
                <span>THE PROBLEM</span>
              </div>
              <h2 className="problem-main-title">
                <span><span className="animate-word" style={{ animationDelay: '0.18s' }}>The</span> </span>
                <span className="problem-highlight animate-word" style={{ animationDelay: '0.28s' }}>
                  problem
                  <svg className={`problem-wavy-curve ${isProblemInView ? 'drawn' : ''}`} viewBox="0 0 115 14" fill="none">
                    <path
                      d="M 2 9 C 18 1, 30 13, 46 9 C 62 4, 76 13, 92 8 C 102 4, 108 12, 113 9"
                      stroke="#dc2626"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                <span><span className="animate-word" style={{ animationDelay: '0.38s' }}>with</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.46s' }}>how</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.54s' }}>most</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.62s' }}>agencies</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.70s' }}>build</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.78s' }}>software</span></span>
              </h2>
              <div className="animate-rise" style={{ animationDelay: '0.65s' }}>
                <p className="problem-lead-copy">
                  Most traditional agencies follow the <strong className="problem-red-text">same broken cycle</strong>:
                </p>
              </div>
            </div>

            <div className="problem-orbit-container scroll-reveal scroll-reveal-delay-1" data-testid="agency-trap-orbit">
              {/* Technical Dot Grid Background & Radial Rose Ambient Glow */}
              <div className="problem-orbit-grid-bg" aria-hidden="true"></div>
              <div className="problem-orbit-glow" aria-hidden="true"></div>

              {/* Concentric Reference Rings (Image 2 Match: Inner Pink Ring + Middle Slate Ring) */}
              <div className="problem-orbit-middle-ring" aria-hidden="true"></div>
              <div className="problem-orbit-inner-ring" aria-hidden="true"></div>

              {/* Orbiting Track with Directional Clockwise Arrows */}
              <div className="problem-orbit-track">
                {/* Clockwise Direction Flow Arrows Along Track */}
                <div className="orbit-track-arrow arrow-tr" title="Clockwise loop">
                  <svg viewBox="0 0 10 10" className="track-arrow-svg" aria-hidden="true">
                    <path d="M2 2 L8 5 L2 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="orbit-track-arrow arrow-bl" title="Clockwise loop">
                  <svg viewBox="0 0 10 10" className="track-arrow-svg" aria-hidden="true">
                    <path d="M8 8 L2 5 L8 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Orbiting Red Laser Particle with Glowing Trail Halo (Image 2 Match) */}
                <div className="orbit-laser-rotator">
                  <span className="orbit-laser-halo"></span>
                  <span className="orbit-laser-dot"></span>
                </div>
              </div>

              {/* Center Repeat Loop Hub (Image 2 Match: Clean Crimson Loop Arrow) */}
              <div className="problem-orbit-center" title="Continuous agency trap loop">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="problem-center-icon">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.6L21 8" />
                  <polyline points="21 3 21 8 16 8" />
                </svg>
              </div>

              {/* 4 Orbital Pill Cards with Rich Badges (Image 3 Match) */}
              <div className="orbit-card orbit-card-top" role="group" aria-label="Problem 01: Bloated templates">
                <div className="orbit-card-icon-wrap">
                  <Layers size={14} />
                </div>
                <span className="orbit-card-num">01</span>
                <span className="orbit-card-label">Bloated templates</span>
              </div>

              <div className="orbit-card orbit-card-right" role="group" aria-label="Problem 02: Fragile wrappers">
                <div className="orbit-card-icon-wrap">
                  <Bot size={14} />
                </div>
                <span className="orbit-card-num">02</span>
                <span className="orbit-card-label">Fragile wrappers</span>
              </div>

              <div className="orbit-card orbit-card-bottom" role="group" aria-label="Problem 03: Vendor lock-in">
                <div className="orbit-card-icon-wrap">
                  <Lock size={14} />
                </div>
                <span className="orbit-card-num">03</span>
                <span className="orbit-card-label">Vendor lock-in</span>
              </div>

              <div className="orbit-card orbit-card-left" role="group" aria-label="Problem 04: Endless delays">
                <div className="orbit-card-icon-wrap">
                  <Clock size={14} />
                </div>
                <span className="orbit-card-num">04</span>
                <span className="orbit-card-label">Endless delays</span>
              </div>
            </div>
          </div>

          {/* ==========================================================================
              WHY NEXTGEN IS DIFFERENT (IMAGE 1 & 2 EXACT RECREATION)
              ========================================================================== */}
          <div className="why-nextgen-section-match" data-inview={inViewSections['problem'] || isProblemInView ? "true" : "false"} data-inview-id="whynextgen">
            <div className="why-nextgen-heading-wrap scroll-reveal">
              <h3 className="why-nextgen-main-title">
                <span>Why</span>{' '}
                <span className="why-nextgen-capsule-pill">NextGen</span>{' '}
                <span>is different</span>
              </h3>
              <p className="why-nextgen-sub">
                Four shifts from how most agencies build software.
              </p>
            </div>

            <div className="why-nextgen-cards-grid">
              {/* Card 1 */}
              <div className="why-card-v2 scroll-reveal">
                <div className="why-card-icon-squircle">
                  <Hammer size={18} />
                </div>
                <h4 className="why-card-title">Build, don't stall</h4>
                <div className="why-card-points">
                  <p className="why-point-cross">
                    <span className="cross-sym">✕</span>
                    <span>Copying bloated WordPress themes and slow templates</span>
                  </p>
                  <p className="why-point-check">
                    <span className="check-sym">✓</span>
                    <span>Hand-tuned Next.js 15 SSR, custom edge code from day one</span>
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="why-card-v2 scroll-reveal scroll-reveal-delay-1">
                <div className="why-card-icon-squircle">
                  <Layers size={18} />
                </div>
                <h4 className="why-card-title">One connected stack</h4>
                <div className="why-card-points">
                  <p className="why-point-cross">
                    <span className="cross-sym">✕</span>
                    <span>Fragmented freelancers and disjointed tools with zero coherence</span>
                  </p>
                  <p className="why-point-check">
                    <span className="check-sym">✓</span>
                    <span>Connect the entire stack: Full Stack × AI, together</span>
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="why-card-v2 scroll-reveal scroll-reveal-delay-2">
                <div className="why-card-icon-squircle">
                  <Sparkles size={18} />
                </div>
                <h4 className="why-card-title">AI inside your apps</h4>
                <div className="why-card-points">
                  <p className="why-point-cross">
                    <span className="cross-sym">✕</span>
                    <span>Superficial prompt wrappers that hallucinate in production</span>
                  </p>
                  <p className="why-point-check">
                    <span className="check-sym">✓</span>
                    <span>Deterministic pgvector RAG, agentic tools &amp; workflows</span>
                  </p>
                </div>
              </div>

              {/* Card 4 - Active Highlighted Card like Image 2 */}
              <div className="why-card-v2 why-card-active-proof scroll-reveal scroll-reveal-delay-3">
                <div className="why-card-icon-squircle mint">
                  <Rocket size={18} />
                </div>
                <h4 className="why-card-title">Proof, not just progress</h4>
                <div className="why-card-points">
                  <p className="why-point-cross">
                    <span className="cross-sym">✕</span>
                    <span>Basic prototypes and slide decks that never reach production</span>
                  </p>
                  <p className="why-point-check">
                    <span className="check-sym">✓</span>
                    <span>Sub-35ms live production releases every 7 days with 100% IP handover</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Cobalt Blue Statement Banner spanning below the 4 cards (Image 2 Match) */}
            <div className="cobalt-statement-banner-v2 scroll-reveal scroll-reveal-delay-2">
              <p>
                Don't spend 6 months waiting for{' '}
                <span className="cobalt-strike-red">bloated templates</span>. Spend 7 days to{' '}
                <span className="cobalt-highlight-yellow">build and ship</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          01 / THE 3-STAGE DELIVERY JOURNEY (DEDICATED SERVICE TIMELINES & 7-DAY SPRINT)
          ========================================================================== */}
      <section className="journey-section" data-testid="services-section" id="services">
        <div className="section-wrap">
          <div className="journey-head" data-inview={inViewSections['journey'] || isJourneyInView ? "true" : "false"} data-inview-id="journey">
            <p className="section-number animate-word" style={{ animationDelay: '0.08s' }}>01 / CAPABILITIES &amp; DELIVERY TIMELINE</p>
            <h2 className="journey-main-title">
              <span><span className="animate-word" style={{ animationDelay: '0.18s' }}>The</span> </span>
              <span className="animate-word" style={{ animationDelay: '0.30s' }}><span className={`highlight-pill ${isJourneyInView ? 'drawn' : ''}`}>3-Stage</span></span>{' '}
              <span><span className="animate-word" style={{ animationDelay: '0.42s' }}>Journey</span></span>
            </h2>
            <div className={`journey-sub-pill-tag ${isJourneyInView ? 'drawn' : ''}`}>
              <span>
                <span className="animate-word" style={{ animationDelay: '0.52s' }}>+</span>{' '}
                <span className="animate-word" style={{ animationDelay: '0.60s' }}>100%</span>{' '}
                <span className="animate-word" style={{ animationDelay: '0.68s' }}>Code</span>{' '}
                <span className="animate-word" style={{ animationDelay: '0.76s' }}>Sovereignty</span>{' '}
                <span className="animate-word" style={{ animationDelay: '0.84s' }}>Handover</span>
              </span>
            </div>
            <div className="animate-rise" style={{ animationDelay: '0.65s' }}>
              <p className="journey-lead-copy">
                Select your engineering discipline below. Choose an individual high-velocity stage or engage the complete end-to-end 3-stage delivery journey with complete private intellectual property transfer.
              </p>
            </div>
          </div>

          {/* Section 1 Contextual Onboarding Tooltip */}
          <ContextualHint
            id="disciplines"
            title="Explore capabilities"
            description="Switch between Web, AI and Telegram Bot services."
            variant="tooltip"
            accent="blue"
            placement="top"
            isVisible={isSection1InView}
            duration={6500}
            storageKey="ng_hint_disciplines_seen"
          />

          {/* Discipline Selector Tabs: Web, Agentic AI, Telegram Bots */}
          <div className="service-discipline-tabs-container">
            <div className="service-discipline-tabs" role="tablist" aria-label="Engineering Disciplines">
              {(['web', 'ai', 'tg'] as const).map(tabKey => {
                const disc = SERVICE_DISCIPLINES[tabKey];
                const isActive = activeServiceTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    role="tab"
                    data-testid={`service-tab-${tabKey}`}
                    aria-selected={isActive}
                    className={`discipline-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveServiceTab(tabKey);
                      setActiveJourneyStage(0);
                    }}
                  >
                    {tabKey === 'web' && <Globe size={17} />}
                    {tabKey === 'ai' && <Bot size={17} />}
                    {tabKey === 'tg' && <MessageCircle size={17} />}
                    <span className="discipline-btn-title">{disc.tabLabel}</span>
                    <span className="discipline-count-pill">{disc.countLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="journey-grid-layout">
            {/* Left Column: Interactive Status & Value Props tailored to active discipline */}
            <div className="journey-sidebar">
              <div className="journey-status-card">
                <div className="journey-status-top">
                  <span className="journey-status-tag">YOU ARE HERE</span>
                  <span className="journey-status-count">0{activeJourneyStage + 1} / 03</span>
                </div>
                <h3 className="journey-status-title">
                  Stage 0{activeJourneyStage + 1}
                </h3>

                {/* 3-Segment Progress Bar */}
                <div className="journey-progress-track">
                  <div className={`track-seg ${activeJourneyStage >= 0 ? 'active' : ''}`}></div>
                  <div className={`track-seg ${activeJourneyStage >= 1 ? 'active' : ''}`}></div>
                  <div className={`track-seg ${activeJourneyStage >= 2 ? 'active' : ''}`}></div>
                </div>

                <p className="journey-status-desc">
                  {SERVICE_DISCIPLINES[activeServiceTab].stages[activeJourneyStage].title}
                </p>

                <button
                  onClick={() => handleSelectPackage(SERVICE_DISCIPLINES[activeServiceTab].stages[activeJourneyStage].packageIndex)}
                  className="journey-cta-btn-green"
                  data-testid="journey-cta-btn"
                >
                  <span>Select this stage</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Why NextGen is Different */}
              <div className="journey-why-card">
                <h4 className="journey-why-title">
                  Why <span className="highlight-pill always-drawn">NextGen</span> is different
                </h4>
                <ul className="journey-why-list">
                  {SERVICE_DISCIPLINES[activeServiceTab].whyDifferences.map((point, pIdx) => (
                    <li key={pIdx}>
                      <span className="why-check">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Middle & Right: Spine Timeline & 3 Connected Stage Cards */}
            <div className="journey-timeline-column" key={activeServiceTab} data-inview={inViewSections['journey'] || isJourneyInView ? "true" : "false"}>
              {SERVICE_DISCIPLINES[activeServiceTab].stages.map((stage, idx) => {
                const isSelected = activeJourneyStage === idx;
                return (
                  <div
                    key={`${activeServiceTab}-${stage.num}`}
                    className={`journey-stage-row animate-card-in ${isSelected ? 'selected' : ''}`}
                    style={{ animationDelay: `${0.35 + idx * 0.22}s` }}
                    data-stage-index={idx}
                    onMouseEnter={() => setActiveJourneyStage(idx)}
                    onClick={() => setActiveJourneyStage(idx)}
                    data-testid={`service-package-${idx}`}
                  >
                    <div className="journey-spine-node">
                      <div className={`node-icon-circle ${activeJourneyStage >= idx ? 'active-reached' : 'inactive-unreached'}`}>
                        {stage.iconType === 'globe' && <Globe size={18} />}
                        {stage.iconType === 'code' && <Code2 size={18} />}
                        {stage.iconType === 'shield' && <ShieldCheck size={18} />}
                        {stage.iconType === 'database' && <Database size={18} />}
                        {stage.iconType === 'bot' && <Bot size={18} />}
                        {stage.iconType === 'activity' && <Activity size={18} />}
                        {stage.iconType === 'zap' && <Zap size={18} />}
                        {stage.iconType === 'card' && <CreditCard size={18} />}
                        {stage.iconType === 'rocket' && <Rocket size={18} />}
                      </div>
                      {idx < 2 && (
                        <div className="node-connecting-line">
                          <div
                            className="node-connecting-line-fill"
                            data-line-idx={idx}
                          />
                        </div>
                      )}
                    </div>

                    <div className="journey-card">
                      <div className="journey-card-meta">
                        <span className="stage-meta-tag">STAGE {stage.num} • MODULE {stage.module}</span>
                        <span className={`stage-badge-pill ${stage.badgeType}`}>
                          {stage.badgeType === 'green' && <Check size={12} />}
                          {stage.badgeType === 'cyan' && <Bot size={12} />}
                          {stage.badgeType === 'blue' && <ShieldCheck size={12} />}
                          <span>{stage.badgeText}</span>
                        </span>
                      </div>

                      <h4 className="journey-card-heading">{stage.title}</h4>
                      <p className="journey-card-text">{stage.description}</p>

                      <div className="journey-card-tags">
                        {stage.tags.map((tag, tIdx) => (
                          <span key={tIdx}>{tag}</span>
                        ))}
                      </div>

                      <div className="journey-card-footer">
                        <span className="journey-card-price">{stage.price}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPackage(stage.packageIndex);
                          }}
                          className="stage-select-link"
                        >
                          <span>Choose Stage {stage.num}</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==========================================================================
              WHAT WILL ACTUALLY HAPPEN AFTER PROJECT KICKOFF? (BENTO CADENCE & ARCHITECTURE)
              ========================================================================== */}
          <div className="post-kickoff-container" data-testid="post-kickoff-section" data-inview={inViewSections['postkickoff'] ? "true" : "false"} data-inview-id="postkickoff">
            <div className="post-kickoff-header scroll-reveal" data-inview={inViewSections['postkickoff'] ? "true" : "false"}>
              <h3 className="post-kickoff-title">
                <span><span className="animate-word" style={{ animationDelay: '0.1s' }}>What</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.2s' }}>will</span> </span>
                <span className="running-capsule animate-word" style={{ animationDelay: '0.3s' }}>
                  <span className="running-sparkle">✦</span>
                  <span className="running-word-slot" key={runningWordIndex}>
                    {RUNNING_WORDS[runningWordIndex]}
                  </span>
                </span>{' '}
                <span><span className="animate-word" style={{ animationDelay: '0.4s' }}>happen</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.48s' }}>after</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.56s' }}>you</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.64s' }}>partner</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.72s' }}>with</span> </span>
                <span><span className="animate-word" style={{ animationDelay: '0.80s' }}>us?</span></span>
              </h3>
              <div className="animate-rise" style={{ animationDelay: '0.6s' }}>
                <p className="post-kickoff-subtitle">
                  Our transparent 7-day engineering cadence. Continuous code commits, live staging relays, and sub-35ms production releases with complete code sovereignty.
                </p>
              </div>
            </div>

            <div className="post-kickoff-grid">
              {/* Left Column: Weekly Rhythm / Sprint Cadence */}
              <div className="post-kickoff-rhythm-col scroll-reveal scroll-reveal-delay-1">
                <div className="post-kickoff-col-tag animate-rise" style={{ animationDelay: '0.2s' }}>WEEKLY RHYTHM</div>
                
                <div className="rhythm-flow-list">
                  {/* Step 1: Monday */}
                  <div className="rhythm-card animate-card-in" style={{ animationDelay: '0.25s' }}>
                    <div className="rhythm-icon-squircle mint">
                      <Lightbulb size={18} />
                    </div>
                    <div className="rhythm-card-content">
                      <span className="rhythm-day-badge">MONDAY</span>
                      <h4 className="rhythm-card-title">Architecture Lock + Live Kickoff</h4>
                      <p className="rhythm-card-desc">Bespoke Figma design tokens, Next.js 15 SSR scaffolding, database schemas &amp; client repository initialization.</p>
                    </div>
                  </div>

                  <div className="rhythm-flow-arrow">
                    <ArrowDown size={14} />
                  </div>

                  {/* Step 2: Wednesday */}
                  <div className="rhythm-card animate-card-in" style={{ animationDelay: '0.38s' }}>
                    <div className="rhythm-icon-squircle mint">
                      <Terminal size={18} />
                    </div>
                    <div className="rhythm-card-content">
                      <span className="rhythm-day-badge">WEDNESDAY</span>
                      <h4 className="rhythm-card-title">Core Development + Staging Relay</h4>
                      <p className="rhythm-card-desc">Daily branch PRs deployed to private client preview URLs with automated webhook and API integrations.</p>
                    </div>
                  </div>

                  <div className="rhythm-flow-arrow">
                    <ArrowDown size={14} />
                  </div>

                  {/* Step 3: Friday */}
                  <div className="rhythm-card animate-card-in" style={{ animationDelay: '0.50s' }}>
                    <div className="rhythm-icon-squircle mint">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="rhythm-card-content">
                      <span className="rhythm-day-badge">FRIDAY</span>
                      <h4 className="rhythm-card-title">Edge Benchmarks + Security Audit</h4>
                      <p className="rhythm-card-desc">Sub-35ms global latency verification, OWASP top-10 security guardrails, and full automated test suite pass.</p>
                    </div>
                  </div>

                  <div className="rhythm-flow-arrow">
                    <ArrowDown size={14} />
                  </div>

                  {/* Step 4: Saturday */}
                  <div className="rhythm-card highlight-blue animate-card-in" style={{ animationDelay: '0.62s' }}>
                    <div className="rhythm-icon-squircle blue">
                      <Hammer size={18} />
                    </div>
                    <div className="rhythm-card-content">
                      <span className="rhythm-day-badge blue">SATURDAY</span>
                      <h4 className="rhythm-card-title">Build Lab + Interactive Code Review</h4>
                      <p className="rhythm-card-desc">Guided staging walkthrough, live feature demos, and client acceptance testing (UAT sign-off).</p>
                    </div>
                  </div>

                  <div className="rhythm-flow-arrow">
                    <ArrowDown size={14} />
                  </div>

                  {/* Step 5: Weekend */}
                  <div className="rhythm-card highlight-gold animate-card-in" style={{ animationDelay: '0.75s' }}>
                    <div className="rhythm-icon-squircle gold">
                      <Lock size={18} />
                    </div>
                    <div className="rhythm-card-content">
                      <span className="rhythm-day-badge gold">WEEKEND &amp; HANDOVER</span>
                      <h4 className="rhythm-card-title">Production Ship &amp; Sovereignty Transfer</h4>
                      <p className="rhythm-card-desc">Private GitHub organization transfer with 100% intellectual property ownership, zero vendor lock-in, and 24/7 telemetry monitoring.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Difference + Engagement Structure + Bento Cards */}
              <div className="post-kickoff-bento-col">
                {/* 1. The Difference Card */}
                <div className="bento-difference-card scroll-reveal scroll-reveal-delay-2">
                  <div className="post-kickoff-col-tag">THE DIFFERENCE</div>
                  <h4 className="bento-diff-title">
                    You're guaranteed production-grade, sovereign software.
                  </h4>
                  <p className="bento-diff-subtitle">
                    We never deploy bloated templates. Every system is hand-tuned Next.js 15, sub-35ms edge infrastructure with zero vendor lock-in.
                  </p>

                  <div className="bento-bars-container">
                    <div className="bento-bar-row">
                      <span className="bento-bar-label">LEGACY AGENCIES</span>
                      <div className="bento-bar-track dashed-track">
                        <span className="bento-bar-chip">6-Month Lock-In</span>
                        <span className="bento-bar-chip">Bloated Retainers</span>
                        <span className="bento-bar-chip">Hostage Code</span>
                      </div>
                    </div>
                    <div className="bento-bar-row">
                      <span className="bento-bar-label green">NEXTGEN VELOCITY</span>
                      <div className="bento-bar-track green-solid-track">
                        <span className="bento-bar-fill-text">7-Day Sprints • Sub-35ms Edge • 100% Code Handover</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Engagement Structure Math Card */}
                <div className="bento-structure-card scroll-reveal scroll-reveal-delay-3">
                  <div className="post-kickoff-col-tag">ENGAGEMENT STRUCTURE</div>
                  <div className="structure-formula-grid">
                    <div className="formula-cell">
                      <span className="formula-big-val">7</span>
                      <span className="formula-sub">Days / Sprint</span>
                    </div>
                    <div className="formula-operator">×</div>
                    <div className="formula-cell">
                      <span className="formula-big-val">Daily</span>
                      <span className="formula-sub">Code Commits</span>
                    </div>
                    <div className="formula-operator">=</div>
                    <div className="formula-cell highlight-cell">
                      <span className="formula-big-val green">&lt; 35ms</span>
                      <span className="formula-sub green">Production Handover</span>
                    </div>
                  </div>
                  <div className="structure-badge-row animate-rise" style={{ animationDelay: '0.85s' }}>
                    <span className="structure-pill-tag">
                      <span className="pill-dot green"></span>
                      Continuous Staging Feature Relays
                    </span>
                    <span className="structure-pill-tag">
                      <span className="pill-dot blue"></span>
                      Client Portal Real-Time Telemetry
                    </span>
                  </div>
                </div>

                {/* 3. Metrics Dual Row */}
                <div className="bento-metrics-row">
                  <div className="bento-stat-card animate-card-in" style={{ animationDelay: '0.65s' }}>
                    <span className="bento-stat-num">
                      <AnimatedCounter end={24} suffix="+" />
                    </span>
                    <span className="bento-stat-label">total production systems shipped</span>
                  </div>
                  <div className="bento-stat-card green-tint animate-card-in" style={{ animationDelay: '0.75s' }}>
                    <div className="bento-stat-header">
                      <span className="bento-stat-num">
                        <AnimatedCounter end={100} suffix="%" />
                      </span>
                      <div className="bento-stat-badge">
                        <CheckCircle2 size={15} />
                      </div>
                    </div>
                    <span className="bento-stat-label">IP sovereignty &amp; private repo transfer</span>
                  </div>
                </div>

                {/* 4. Bento Support Row (Image 6 Match) */}
                <div className="bento-support-grid">
                  <div className="bento-support-card animate-card-in" style={{ animationDelay: '0.70s' }}>
                    <div className="support-card-top">
                      <div className="support-icon mint">
                        <Headphones size={16} />
                      </div>
                      <div className="support-slider-telemetry">
                        <div className="slider-track-line">
                          <div className="slider-active-beam"></div>
                        </div>
                        <div className="slider-timestamps">
                          <span>9 am</span>
                          <span className="active-dot-ping">Active Relay</span>
                          <span>9 pm</span>
                        </div>
                      </div>
                    </div>
                    <h5 className="support-card-title">Dedicated Senior Engineer Support</h5>
                    <p className="support-card-desc">
                      Continuous guidance, architecture reviews, and direct Slack/Telegram access with dedicated lead engineers (9 am to 9 pm everyday).
                    </p>
                  </div>

                  <div className="bento-support-card animate-card-in" style={{ animationDelay: '0.82s' }}>
                    <div className="support-card-top">
                      <div className="support-icon blue">
                        <MessageSquare size={16} />
                      </div>
                      <div className="support-badges-pill-group">
                        <span className="day-badge">SAT</span>
                        <span className="day-badge">SUN</span>
                        <span className="live-badge">
                          <span className="live-dot pulse"></span>
                          LIVE
                        </span>
                      </div>
                    </div>
                    <h5 className="support-card-title">Interactive Staging Reviews</h5>
                    <p className="support-card-desc">
                      Guided weekend walkthroughs, live webhook inspections, and staging deployment verification before production handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Strip */}
            <div className="sprint-weekend-banner">
              <div className="sprint-weekend-left">
                <RefreshCw size={14} className="sprint-refresh-icon" />
                <span>
                  <strong>Weekend Protocol:</strong> Continuous autonomous monitoring, synthetic health pings, and client portal telemetry.
                </span>
              </div>
              <div className="sprint-weekend-pills desktop-only">
                <span className="sprint-weekend-badge">
                  <span className="sprint-badge-dot"></span>
                  99.99% Uptime SLA
                </span>
                <span className="sprint-weekend-badge">
                  <span className="sprint-badge-dot pulse"></span>
                  Real-Time Telemetry
                </span>
                <span className="sprint-weekend-badge">
                  <span className="sprint-badge-dot"></span>
                  &lt; 2h Emergency Relays
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          INTERACTIVE DEMONSTRATIONS SECTION
          ========================================================================== */}
      <section className="demo-section" id="demos">
        <div className="section-wrap" data-inview={inViewSections['demos'] || isDemosInView ? "true" : "false"} data-inview-id="demos">
          <p className="section-number animate-word" style={{ animationDelay: '0.08s' }}>LIVE DEMONSTRATIONS</p>
          <div className="section-head" style={{ marginBottom: '20px' }}>
            <h2>
              <span className="animate-word" style={{ animationDelay: '0.18s' }}>Inspect</span>{' '}
              <span className="animate-word" style={{ animationDelay: '0.28s' }}>our</span>
              <br />
              <i className="animate-word" style={{ animationDelay: '0.38s' }}>machinery.</i>
            </h2>
            <div className="animate-rise" style={{ animationDelay: '0.50s' }}>
              <p className="section-copy">
                Test drive our autonomous reasoning engine and interactive Telegram bot simulator in real-time.
              </p>
            </div>
          </div>

          {/* Section 2 Contextual Onboarding Tooltip */}
          <ContextualHint
            id="demos"
            title="Interactive demo"
            description="Switch between AI Reasoning and Telegram Bot simulation."
            variant="tooltip"
            accent="violet"
            placement="top"
            isVisible={isDemosInView}
            duration={6500}
            storageKey="ng_hint_demos_seen"
          />

          <div className="demo-tabs">
            <button
              onClick={() => setActiveDemoTab('ai')}
              className={`demo-tab-btn ${activeDemoTab === 'ai' ? 'active' : ''}`}
            >
              01 • AI REASONING PIPELINE
            </button>
            <button
              onClick={() => setActiveDemoTab('tg')}
              className={`demo-tab-btn ${activeDemoTab === 'tg' ? 'active' : ''}`}
            >
              02 • TELEGRAM BOT SIMULATOR
            </button>
          </div>

          <div className="demo-container">
            <div className="demo-content">
              {activeDemoTab === 'ai' ? (
                <div>
                  <div className="demo-header-bar">
                    <div className="demo-title-group">
                      <h4>Deterministic Multi-Agent Orchestrator</h4>
                      <span className="demo-cluster-tag">CLUSTER IN-S1 • AP-SOUTH-1</span>
                    </div>
                    <div className="demo-controls-group">
                      <button
                        onClick={() => setIsSimulating(!isSimulating)}
                        className="demo-sim-btn"
                        title={isSimulating ? "Pause automated step simulation" : "Resume automated step simulation"}
                      >
                        {isSimulating ? <Pause size={12} /> : <Play size={12} />}
                        <span>{isSimulating ? 'PAUSE PIPELINE' : 'RESUME AUTO'}</span>
                      </button>
                      <div className="window-status">
                        <span className="status-pulse-dot"></span>
                        <span>LIVE TELEMETRY</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Stepper with Visual Progress Track & Icons */}
                  <div className="pipeline-stepper-wrapper">
                    <div className="pipeline-progress-track">
                      <div
                        className="pipeline-progress-bar"
                        style={{ width: `${(activeStage / (AI_STAGES.length - 1)) * 100}%` }}
                      ></div>
                    </div>

                    <div className="pipeline-stepper">
                      {AI_STAGES.map((s, idx) => {
                        const icons = [
                          <Terminal size={14} key="0" />,
                          <Cpu size={14} key="1" />,
                          <Sparkles size={14} key="2" />,
                          <Database size={14} key="3" />,
                          <ShieldCheck size={14} key="4" />,
                          <CheckCircle2 size={14} key="5" />
                        ];
                        return (
                          <div
                            key={s.id}
                            onClick={() => {
                              setActiveStage(idx);
                              setIsSimulating(false);
                            }}
                            className={`step-box ${idx === activeStage ? 'active' : idx < activeStage ? 'passed' : ''}`}
                          >
                            <div className="step-box-top">
                              <span className="step-num">0{idx + 1}</span>
                              <span className={`step-icon-indicator ${idx === activeStage ? 'active' : idx < activeStage ? 'passed' : ''}`}>
                                {icons[idx]}
                              </span>
                            </div>
                            <div className="step-title">{s.name}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span className="step-kicker">{s.kicker}</span>
                              <span className="step-p99">{s.p99}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Telemetry Console with 3 Interactive Views */}
                  <div className="telemetry-board">
                    <div className="telemetry-window-bar">
                      <div className="window-dots">
                        <span className="dot-red"></span>
                        <span className="dot-yellow"></span>
                        <span className="dot-green"></span>
                      </div>
                      <span className="window-tab">agentic-orchestrator.telemetry.sh</span>
                      <span className="window-status">
                        <span className="status-pulse-dot"></span>
                        UPTIME: 99.98%
                      </span>
                    </div>

                    {/* Console Tab Switcher */}
                    <div className="telemetry-tabs-nav">
                      <button
                        onClick={() => setTelemetryTab('log')}
                        className={`telemetry-tab-item ${telemetryTab === 'log' ? 'active' : ''}`}
                      >
                        01. EXECUTION STREAM
                      </button>
                      <button
                        onClick={() => setTelemetryTab('json')}
                        className={`telemetry-tab-item ${telemetryTab === 'json' ? 'active' : ''}`}
                      >
                        02. STRUCTURED JSON
                      </button>
                      <button
                        onClick={() => setTelemetryTab('waterfall')}
                        className={`telemetry-tab-item ${telemetryTab === 'waterfall' ? 'active' : ''}`}
                      >
                        03. LATENCY WATERFALL
                      </button>
                    </div>

                    <div className="telemetry-body">
                      {telemetryTab === 'log' && (
                        <>
                          <div className="telemetry-stage-row">
                            <span className="telemetry-stage-pill">STAGE 0{activeStage + 1} / 06</span>
                            <strong className="telemetry-stage-title">{AI_STAGES[activeStage].name}</strong>
                            <span className="telemetry-p99-meta">
                              p99 LATENCY: <b className="telemetry-p99-value">{AI_STAGES[activeStage].p99}</b>
                            </span>
                          </div>

                          <div className="telemetry-log-hero">
                            <div className="telemetry-log-prompt-line">
                              <span className="telemetry-log-badge">CONSOLE</span>
                              <span className="telemetry-log-text">{AI_STAGES[activeStage].telemetry}</span>
                            </div>
                          </div>

                          <div className="telemetry-details-list">
                            {AI_STAGES[activeStage].details.map((detail, dIdx) => (
                              <div key={dIdx} className="telemetry-detail-item">
                                <CheckCircle2 size={13} />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {telemetryTab === 'json' && (
                        <div>
                          <div className="telemetry-stage-row">
                            <span className="telemetry-stage-pill">JSON PAYLOAD CONTRACT</span>
                            <strong className="telemetry-stage-title">{AI_STAGES[activeStage].name}</strong>
                          </div>
                          <pre className="telemetry-json-viewer">
                            {JSON.stringify(STAGE_JSON_PAYLOADS[activeStage], null, 2)}
                          </pre>
                        </div>
                      )}

                      {telemetryTab === 'waterfall' && (
                        <div>
                          <div className="telemetry-stage-row">
                            <span className="telemetry-stage-pill">STAGE-BY-STAGE LATENCY BUDGET</span>
                            <strong className="telemetry-stage-title">Total: 28.4ms (Budget: &lt; 35ms)</strong>
                          </div>
                          <div className="waterfall-bars-list">
                            {AI_STAGES.map((s, idx) => {
                              const ms = parseFloat(s.p99);
                              const widthPct = Math.min(100, Math.max(15, (ms / 20) * 100));
                              const isCurrent = idx === activeStage;
                              return (
                                <div key={s.id} className="waterfall-bar-row">
                                  <span className={`waterfall-stage-name ${isCurrent ? 'active' : ''}`}>
                                    {s.name}
                                  </span>
                                  <div className="waterfall-bar-track">
                                    <div
                                      className={`waterfall-bar-fill ${isCurrent ? 'active' : ''}`}
                                      style={{
                                        width: `${widthPct}%`
                                      }}
                                    ></div>
                                  </div>
                                  <span className={`waterfall-stage-latency ${isCurrent ? 'active' : ''}`}>
                                    {s.p99}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="telemetry-gauges-footer">
                      <div className="telemetry-gauge-item">
                        <strong>28ms (p99)</strong>
                        <span>EXECUTION LATENCY</span>
                      </div>
                      <div className="telemetry-gauge-item">
                        <strong>480 tok/s</strong>
                        <span>TOKEN THROUGHPUT</span>
                      </div>
                      <div className="telemetry-gauge-item">
                        <strong>0.96 cosine</strong>
                        <span>VECTOR SIMILARITY</span>
                      </div>
                      <div className="telemetry-gauge-item">
                        <strong>100% Deterministic</strong>
                        <span>GUARDRAILS VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Telegram Bot Simulator (Exact Image 1 Telegram Desktop UI Recreation) */
                <div className="tg-desktop-window">
                  {/* Telegram Top Title Bar */}
                  <div className="tg-desktop-header">
                    <div className="tg-header-left">
                      <div className="tg-back-btn" title="Back">
                        <ChevronLeft size={20} />
                      </div>
                      <div className="tg-avatar-wrap">
                        <img
                          src="/primescalpers-avatar.png"
                          alt="PrimeScalpers"
                          className="tg-avatar-img"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (!img.src.includes('assets/primescalpers-avatar.png')) {
                              img.src = '/assets/primescalpers-avatar.png';
                            }
                          }}
                        />
                      </div>
                      <div className="tg-header-info">
                        <div className="tg-header-title">
                          <span>PrimeScalpers</span>
                        </div>
                        <div className="tg-header-sub">bot</div>
                      </div>
                    </div>

                    <div className="tg-header-tools">
                      <div className="tg-tool-btn tg-desktop-only" title="Search messages">
                        <Search size={16} />
                      </div>
                      <div className="tg-tool-btn" title="More options">
                        <MoreVertical size={18} />
                      </div>
                      <div className="tg-window-controls tg-desktop-only">
                        <span title="Minimize" style={{ cursor: 'pointer' }}>—</span>
                        <span title="Maximize" style={{ cursor: 'pointer' }}>⬜</span>
                        <span title="Close" style={{ cursor: 'pointer' }}>✕</span>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Chat Feed with Authentic Doodle Wallpaper */}
                  <div className="tg-doodle-canvas" id="tgChatFeed">
                    {tgMessages.map((m, i) => (
                      <React.Fragment key={i}>
                        {m.dateLabel && (
                          <div className="tg-date-pill">{m.dateLabel}</div>
                        )}

                        {m.sender === 'user' ? (
                          <div className="tg-user-row">
                            <div className={`tg-user-bubble ${m.bubbleColor === 'purple' ? 'purple' : 'blue'}`}>
                              <span className={m.text?.startsWith('/') ? 'tg-cmd-link' : ''}>{m.text}</span>
                              <span className="tg-user-meta">
                                <span>{m.time}</span>
                                <TelegramDoubleTick color="#ffffff" />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="tg-bot-row">
                            <div className="tg-bot-bubble">
                              {m.header && <h6 className="tg-bot-header">{m.header}</h6>}
                              {m.text && <p className="tg-bot-lead">{m.text}</p>}
                              {m.bulletPoints && (
                                <div className="tg-bot-bullet-list">
                                  {m.bulletPoints.map((bp, bidx) => {
                                    const colonIdx = bp.indexOf(':');
                                    if (colonIdx !== -1 && !bp.startsWith('•')) {
                                      const key = bp.slice(0, colonIdx);
                                      const val = bp.slice(colonIdx + 1);
                                      return (
                                        <div key={bidx} className="tg-bot-kv-line">
                                          <span className="tg-kv-key">{key}:</span>
                                          <span className="tg-kv-val">
                                            {val.includes('@') ? (
                                              val.split(/(@[a-zA-Z0-9_]+)/g).map((part, pidx) =>
                                                part.startsWith('@') ? (
                                                  <span key={pidx} className="tg-link-accent">{part}</span>
                                                ) : (
                                                  part
                                                )
                                              )
                                            ) : (
                                              val
                                            )}
                                          </span>
                                        </div>
                                      );
                                    }
                                    const bulletContent = bp.replace(/^[•\s]+/, '');
                                    return (
                                      <div key={bidx} className="tg-bot-bullet-line">
                                        <span className="tg-bullet-dot">•</span>
                                        <span>
                                          {bulletContent.includes('@') ? (
                                            bulletContent.split(/(@[a-zA-Z0-9_]+)/g).map((part, pidx) =>
                                              part.startsWith('@') ? (
                                                <span key={pidx} className="tg-link-accent">{part}</span>
                                              ) : (
                                                part
                                              )
                                            )
                                          ) : (
                                            bulletContent
                                          )}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              {m.footerNote && (
                                <p className="tg-bot-footer-note">
                                  {m.footerNote.split(/(\/[a-zA-Z0-9_]+)/g).map((part, pidx) =>
                                    part.startsWith('/') ? (
                                      <span key={pidx} className="tg-link-accent" onClick={() => handleTgCommand(part)}>
                                        {part}
                                      </span>
                                    ) : (
                                      part
                                    )
                                  )}
                                </p>
                              )}
                              <div className="tg-bot-footer-line">
                                {m.footerTag ? (
                                  <span className="tg-bot-dev-tag">{m.footerTag}</span>
                                ) : (
                                  <span></span>
                                )}
                                <span className="tg-bot-timestamp">{m.time}</span>
                              </div>
                            </div>

                            {/* Inline Keyboard Grid */}
                            {m.btnRows && (
                              <div className="tg-inline-keyboard">
                                {m.btnRows.map((row, rIdx) => (
                                  <div key={rIdx} className="tg-inline-row">
                                    {row.map(b => (
                                      <button
                                        key={b}
                                        onClick={() => handleTgCommand(b)}
                                        className={`tg-inline-btn-chip ${row.length === 1 ? 'primary' : ''}`}
                                      >
                                        {b}
                                      </button>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                    {isTgTyping && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ab2f2', fontSize: '12px', padding: '6px 12px' }}>
                        <Bot size={14} />
                        <span>PrimeScalpers bot is typing</span>
                        <div className="tg-typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Telegram Bottom Dock - Image 3 & Image 1 Recreation */}
                  <div className="tg-desktop-dock">
                    <button
                      className="tg-menu-btn"
                      onClick={() => handleTgCommand('🏠 Menu')}
                      title="Open Telegram Bot Menu"
                    >
                      <Menu size={14} />
                      <span>Menu</span>
                    </button>

                    <div className="tg-dock-attach" title="Attach file">
                      <Paperclip size={18} />
                    </div>

                    <div className="tg-dock-input-capsule">
                      <input
                        type="text"
                        className="tg-dock-input"
                        placeholder="Message"
                        value={tgInput}
                        onChange={e => setTgInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && tgInput.trim() && handleTgCommand(tgInput)}
                      />

                      <div className="tg-dock-emoji" title="Insert emoji">
                        <Smile size={18} />
                      </div>
                    </div>

                    <button
                      className="tg-voice-send-btn"
                      onClick={() => tgInput.trim() ? handleTgCommand(tgInput) : handleTgCommand('🎤 Voice Note')}
                      title={tgInput.trim() ? "Send message" : "Voice message"}
                    >
                      {tgInput.trim() ? <Send size={15} /> : <Mic size={17} />}
                    </button>

                    <button
                      className="tg-scroll-down-btn"
                      onClick={() => {
                        const feed = document.getElementById('tgChatFeed');
                        if (feed) feed.scrollTop = feed.scrollHeight;
                      }}
                      title="Scroll to bottom"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          02 / SELECTED WORK (OUR AUTHENTIC COMMERCIAL PROJECTS)
          ========================================================================== */}
      <section className="work-new" data-testid="work-section" id="work">
        <div className="section-wrap" data-inview={inViewSections['work'] ? "true" : "false"} data-inview-id="work">
          <div className="work-heading scroll-reveal">
            <div>
              <p className="section-number">02 / SELECTED WORK</p>
              <h2>
                Quietly
                <br />
                <i>effective.</i>
              </h2>
            </div>
            <p>Selected commercial collaborations where good taste met a real business problem in Coimbatore and worldwide.</p>
          </div>

          <div className="work-list">
            {/* Project 01: Boomers Gaming */}
            <article className="work-item scroll-reveal" data-testid="project-card-0">
              <div className="project-photo">
                <img
                  alt="Boomers Gaming Lounge Management"
                  src="/images/boomers_cafe_new.png"
                  onError={e => {
                    const img = e.currentTarget;
                    if (!img.src.includes('assets/images/boomers_cafe_new.png')) {
                      img.src = '/assets/images/boomers_cafe_new.png';
                    }
                  }}
                />
                <button
                  aria-label="View Boomers Gaming"
                  onClick={() => scrollTo('contact')}
                  className="photo-btn"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="project-info">
                <p>GAMING LOUNGE MANAGEMENT • COIMBATORE</p>
                <h3>Boomers Gaming Lounge OS</h3>
                <span>Complete LAN center management system with real-time PC slot allocations, session timers, and UPI billing.</span>
                <b>100% automated slot timers &amp; UPI billing</b>
              </div>
            </article>

            {/* Project 02: GoatTurf */}
            <article className="work-item scroll-reveal scroll-reveal-delay-1" data-testid="project-card-1">
              <div className="project-photo">
                <img
                  alt="GoatTurf Sports Venue Reservation"
                  src="/images/turf_dashboard_new.png"
                  onError={e => {
                    const img = e.currentTarget;
                    if (!img.src.includes('assets/images/turf_dashboard_new.png')) {
                      img.src = '/assets/images/turf_dashboard_new.png';
                    }
                  }}
                />
                <button
                  aria-label="View GoatTurf"
                  onClick={() => scrollTo('contact')}
                  className="photo-btn"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="project-info">
                <p>SPORTS VENUE SAAS • COIMBATORE</p>
                <h3>GoatTurf Sports Arena Platform</h3>
                <span>Multi-court booking platform with sub-second slot conflict prevention, WhatsApp confirmation passes, and instant ledger syncing.</span>
                <b>Sub-second conflict locking &amp; WhatsApp vouchers</b>
              </div>
            </article>

            {/* Project 03: NeiMozhi */}
            <article className="work-item scroll-reveal" data-testid="project-card-2">
              <div className="project-photo">
                <img
                  alt="NeiMozhi Native Pure Ghee Ecommerce"
                  src="/images/neimozhi_new.png"
                  onError={e => {
                    const img = e.currentTarget;
                    if (!img.src.includes('assets/images/neimozhi_new.png')) {
                      img.src = '/assets/images/neimozhi_new.png';
                    }
                  }}
                />
                <button
                  aria-label="View NeiMozhi"
                  onClick={() => scrollTo('contact')}
                  className="photo-btn"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="project-info">
                <p>DIRECT-TO-CONSUMER COMMERCE • COIMBATORE</p>
                <h3>NeiMozhi Native Pure Ghee</h3>
                <span>Custom high-velocity storefront with sub-second cart checkout, automated order routing, and instant WhatsApp receipts.</span>
                <b>Sub-second cart checkout &amp; 3.8× conversion</b>
              </div>
            </article>

            {/* Project 04: Billing Software */}
            <article className="work-item scroll-reveal scroll-reveal-delay-1" data-testid="project-card-3">
              <div className="project-photo">
                <img
                  alt="NextGen Multi-Tenant GST Billing System"
                  src="/images/billing_software_new.png"
                  onError={e => {
                    const img = e.currentTarget;
                    if (!img.src.includes('assets/images/billing_software_new.png')) {
                      img.src = '/assets/images/billing_software_new.png';
                    }
                  }}
                />
                <button
                  aria-label="View NextGen Billing System"
                  onClick={() => scrollTo('contact')}
                  className="photo-btn"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="project-info">
                <p>ENTERPRISE POS &amp; TAX INVOICING</p>
                <h3>NextGen Multi-Tenant GST Billing</h3>
                <span>High-speed offline-first POS with thermal receipt printing, real-time GST tax calculations, and automated PDF invoice generation.</span>
                <b>Offline-first POS &amp; instant PDF generation</b>
              </div>
            </article>
          </div>

          <div className="work-more scroll-reveal scroll-reveal-delay-2">
            <button onClick={() => scrollTo('contact')} className="under-button">
              <span>Have a project like this?</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          03 / OUR APPROACH (LESS NOISE, MORE SIGNAL)
          ========================================================================== */}
      <section className="about-new" data-testid="about-section" id="about">
        <div className="section-wrap" data-inview={inViewSections['about'] ? "true" : "false"} data-inview-id="about">
          <div className="section-head scroll-reveal" style={{ marginBottom: '28px' }}>
            <p className="section-number">03 / OUR APPROACH</p>
            <h2>
              Less noise.
              <br />
              <i>More signal.</i>
            </h2>
            <p className="section-copy">
              Rooted in Coimbatore's industrial precision engineering culture, we reject generic SaaS templates and speculative AI wrappers. We construct resilient, deterministic digital machinery built to outperform.
            </p>
          </div>

          <div className="approach-grid-v2">
            {/* Pillar 01 */}
            <div className="approach-card-v2 scroll-reveal">
              <div>
                <span className="approach-card-num">01 / ARCHITECTURE</span>
                <h3 className="approach-card-title">Discovery &amp; Unfair Edge</h3>
                <p className="approach-card-copy">
                  Before writing a single line of code, we reverse-engineer your technical bottleneck. We model global edge distribution, token budget consumption, and UX ergonomics to forge your unfair market advantage.
                </p>
              </div>
              <div className="approach-card-metrics">
                <span>TARGET: &lt; 35ms TTFB</span>
                <b style={{ color: '#2563eb' }}>01 / DISCOVER</b>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="approach-card-v2 scroll-reveal scroll-reveal-delay-1">
              <div>
                <span className="approach-card-num">02 / DETERMINISM</span>
                <h3 className="approach-card-title">Multi-Agent Verification</h3>
                <p className="approach-card-copy">
                  Zero hallucination standard. We orchestrate stateful LangGraph agents with strict Zod/Pydantic schemas and Supabase pgvector cosine search. Every LLM response is deterministically verified before delivery.
                </p>
              </div>
              <div className="approach-card-metrics">
                <span>GUARDRAIL: 100% SCHEMA</span>
                <b style={{ color: '#2563eb' }}>02 / REASON</b>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="approach-card-v2 scroll-reveal scroll-reveal-delay-2">
              <div>
                <span className="approach-card-num">03 / VELOCITY</span>
                <h3 className="approach-card-title">High-Velocity Edge Compute</h3>
                <p className="approach-card-copy">
                  Built on Next.js 15, React 19, and Cloudflare V8 Workers. We eliminate bulky WordPress builders and heavy plugin bloat in favor of hand-tuned concurrent architectures with 100/100 Core Web Vitals.
                </p>
              </div>
              <div className="approach-card-metrics">
                <span>CORE VITALS: 100/100</span>
                <b style={{ color: '#2563eb' }}>03 / DELIVER</b>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="approach-card-v2 scroll-reveal scroll-reveal-delay-3">
              <div>
                <span className="approach-card-num">04 / SOVEREIGNTY</span>
                <h3 className="approach-card-title">100% Code Ownership</h3>
                <p className="approach-card-copy">
                  Upon milestone settlement, 100% of all intellectual property, Git repositories, Supabase databases, and deployment pipelines transfer completely to you. Backed by our 30-day Coimbatore studio warranty.
                </p>
              </div>
              <div className="approach-card-metrics">
                <span>LOCK-IN: 0% ZERO</span>
                <b style={{ color: '#2563eb' }}>04 / OWN</b>
              </div>
            </div>
          </div>

          {/* ==========================================================================
              WALK AWAY WITH (IMAGE 4 EXACT RECREATION)
              ========================================================================== */}
          <div className="walk-away-wrapper scroll-reveal" data-testid="walk-away-section" data-inview={inViewSections['walkaway'] || isWalkAwayInView ? "true" : "false"} data-inview-id="walkaway">
            <div className="walk-away-header">
              <div>
                <h3 className="walk-away-title">
                  <span className="walk-away-line-1">
                    <span className="animate-word" style={{ animationDelay: '0.1s' }}>Capabilities</span>{' '}
                    <span className="animate-word" style={{ animationDelay: '0.2s' }}>You</span>
                  </span>
                  <span className="walk-away-line-2">
                    <span className="animate-word" style={{ animationDelay: '0.3s' }}>Will</span>{' '}
                    <span className="walk-away-underline-target">
                      <span className="animate-word" style={{ animationDelay: '0.38s' }}>Walk</span>{' '}
                      <span className="animate-word" style={{ animationDelay: '0.46s' }}>Away</span>{' '}
                      <span className="animate-word" style={{ animationDelay: '0.54s' }}>With</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 240 16"
                        preserveAspectRatio="none"
                        className={`walk-away-curve-svg ${isWalkAwayInView ? 'drawn' : ''}`}
                      >
                        <path
                          d="M3 11 C 55 3, 120 3, 237 8"
                          pathLength="1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </span>
                </h3>
                <div className="animate-rise" style={{ animationDelay: '0.6s' }}>
                  <p className="walk-away-subtitle">
                    Every production system we engineer delivers immediate competitive velocity and permanent intellectual property ownership.
                  </p>
                </div>
              </div>
              <button onClick={() => scrollTo('contact')} className="walk-away-top-cta">
                <span>Start a Project</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div
              className={`walk-away-table ${isWalkAwayInView ? 'in-view' : ''}`}
              onMouseLeave={() => setIsWalkAwayPaused(false)}
            >
              {WALK_AWAY_ITEMS.map((item, idx) => {
                const isSelected = activeWalkAwayIndex === idx;
                return (
                  <div
                    key={item.num}
                    className={`walk-away-row ${isSelected ? 'active-selected' : ''}`}
                    data-active={isSelected}
                    onClick={() => {
                      setActiveWalkAwayIndex(idx);
                      setIsWalkAwayPaused(true);
                    }}
                    onMouseEnter={() => {
                      setActiveWalkAwayIndex(idx);
                      setIsWalkAwayPaused(true);
                    }}
                    data-testid={`walk-away-row-${item.num}`}
                  >
                    <span className="walk-away-row-sweep" aria-hidden="true" />
                    <span className="walk-away-num">{item.num}</span>
                    <h3 data-on={isSelected} className="text-outline-fill walk-away-big-verb">
                      {item.verb}
                    </h3>
                    <p className="walk-away-desc">{item.desc}</p>
                    <span className="walk-away-icon" aria-hidden="true">
                      {item.iconType === 'code' && <Code2 size={18} />}
                      {item.iconType === 'brain' && <Brain size={18} />}
                      {item.iconType === 'zap' && <Zap size={18} />}
                      {item.iconType === 'card' && <CreditCard size={18} />}
                      {item.iconType === 'shield' && <ShieldCheck size={18} />}
                      {item.iconType === 'globe' && <Globe size={18} />}
                      {item.iconType === 'lock' && <Lock size={18} />}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          03.5 / FREQUENTLY ASKED QUESTIONS (IMAGE 1 RECREATION)
          ========================================================================== */}
      <FAQSection onOpenContact={() => scrollTo('contact')} />

      {/* ==========================================================================
          04 / GET IN TOUCH (BLUE SECTION - COIMBATORE CONTACTS)
          ========================================================================== */}
      <section className="contact-new" data-testid="contact-section" id="contact">
        <div className="section-wrap contact-grid">
          <div className="contact-lead scroll-reveal" data-inview={inViewSections['contact'] ? "true" : "false"} data-inview-id="contact">
            <p className="section-number animate-word" style={{ animationDelay: '0.08s' }}>04 / GET IN TOUCH</p>
            <h2>
              <span className="animate-word" style={{ animationDelay: '0.18s' }}>Have</span>{' '}
              <span className="animate-word" style={{ animationDelay: '0.28s' }}>a</span>
              <br />
              <i className="animate-word" style={{ animationDelay: '0.38s' }}>good one?</i>
            </h2>
            <div className="animate-rise" style={{ animationDelay: '0.48s' }}>
              <p>Tell us what you’re thinking. A rough idea is more than enough to start scoping your architecture.</p>
            </div>

            <div className="direct-links scroll-reveal scroll-reveal-delay-1">
              <a data-testid="email-contact-link" href="mailto:nextgenwebstudio63@gmail.com">
                <span>nextgenwebstudio63@gmail.com</span>
                <ArrowUpRight size={14} />
              </a>
              <a href="https://wa.me/916379140067" target="_blank" rel="noreferrer">
                <span>WhatsApp / +91 63791 40067</span>
                <ArrowUpRight size={14} />
              </a>
              <a data-testid="telegram-contact-link" href="https://t.me/shridharsan1" target="_blank" rel="noreferrer">
                <span>Telegram / @shridharsan1</span>
                <ArrowUpRight size={14} />
              </a>
              <div style={{ paddingTop: '10px', font: '10px "DM Mono", monospace', color: 'rgba(241, 238, 232, 0.7)' }}>
                Coimbatore, Tamil Nadu 641001, India
              </div>
            </div>
          </div>

          <div className="form-panel scroll-reveal scroll-reveal-delay-2">
            {formSubmitted ? (
              <div className="success">
                <span>
                  <Check size={24} />
                </span>
                <h3>Inquiry sent!</h3>
                <p>
                  Thanks for reaching out, {formData.name}. Our lead engineers in Coimbatore will review your technical scope and contact you on WhatsApp / Email within 4 to 12 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', whatsapp: '', service: 'Agentic AI Systems', budget: '₹50,000 - ₹1,50,000 (~$1.8K)', idea: '' });
                  }}
                  className="under-button"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form data-testid="contact-form" onSubmit={handleSubmit}>
                <label>
                  Your name *
                  <input
                    data-testid="contact-name-input"
                    placeholder="Sundararajan"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>

                <label>
                  Work email *
                  <input
                    data-testid="contact-email-input"
                    placeholder="sundar@company.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>

                <label>
                  WhatsApp number *
                  <input
                    placeholder="+91 98765 43210"
                    required
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </label>

                <div className="contact-dropdown-grid">
                  <label>
                    Discipline
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      style={{ border: '0', borderBottom: '1px solid #99948a', background: 'none', padding: '8px 0', font: '13px Manrope, sans-serif', color: 'var(--ink)' }}
                    >
                      <option value="Agentic AI Systems">Agentic AI Systems</option>
                      <option value="Full-Stack Web Development">Full-Stack Web Dev</option>
                      <option value="Telegram Bot Engineering">Telegram Bot Engineering</option>
                      <option value="Full Agency Retainer">Full Agency Retainer</option>
                    </select>
                  </label>

                  <label>
                    Estimated budget
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      style={{ border: '0', borderBottom: '1px solid #99948a', background: 'none', padding: '8px 0', font: '13px Manrope, sans-serif', color: 'var(--ink)' }}
                    >
                      <option value="< ₹50,000">&lt; ₹50,000 (~$600)</option>
                      <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (~$1.8K)</option>
                      <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000 (~$6K)</option>
                      <option value="₹5,00,000+">₹5,00,000+ (Enterprise)</option>
                    </select>
                  </label>
                </div>

                <label>
                  Project Scope &amp; Engineering Goals *
                  <textarea
                    data-testid="contact-idea-input"
                    placeholder="Describe your technical requirements, APIs, architecture, or automation goals..."
                    required
                    rows={3}
                    value={formData.idea}
                    onChange={e => setFormData({ ...formData, idea: e.target.value })}
                  ></textarea>
                </label>

                <button
                  className="solid-button"
                  data-testid="contact-submit-button"
                  type="submit"
                >
                  <span>Send enquiry</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================================================
          NEXTGEN WEB STUDIO — PREMIUM EDITORIAL FOOTER REDESIGN
          (PRESERVES ROUTING & ALL INTEGRATIONS — EDITORIAL TECHNOLOGY BRANDING)
          ========================================================================== */}
      <footer className="site-footer scroll-reveal" data-testid="site-footer">
        {/* =========================================================================
            1. HORIZONTAL CALL-TO-ACTION STRIP (Above Navigation Columns)
            ========================================================================= */}
        <div className="footer-cta-strip" data-testid="footer-cta-strip">
          <div className="footer-cta-container">
            <div className="footer-cta-copy">
              <span className="footer-cta-eyebrow">READY TO SCALE</span>
              <h3 className="footer-cta-headline">Have an ambitious idea?</h3>
              <p className="footer-cta-subtext">Let's engineer something extraordinary.</p>
            </div>
            <div className="footer-cta-actions">
              <button
                onClick={() => scrollTo('contact')}
                className="footer-cta-primary-btn"
                data-testid="footer-cta-start-btn"
              >
                <span>Start Your Project</span>
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => scrollTo('work')}
                className="footer-cta-secondary-link"
                data-testid="footer-cta-explore-btn"
              >
                <span>Explore Our Work</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. MAIN 4-COLUMN FOOTER NAVIGATION & BRAND SECTION
            ========================================================================= */}
        <div className="footer-main-container">
          {/* Monumental Editorial Brand Showcase (Reference Quality) */}
          <div className="footer-editorial-banner scroll-reveal" data-testid="footer-brand-banner">
            <div className="footer-editorial-text">NEXTGEN WEB STUDIO</div>
            <div className="footer-editorial-subtext">
              <span>Autonomous Digital Engineering</span>
              <span className="sub-pill">Sub-35ms Edge Architecture</span>
              <span>Worldwide Production Handover</span>
            </div>
          </div>

          <div className="footer-grid-layout">
            {/* Top Brand Presentation / Left Column on Desktop */}
            <div className="footer-brand-section">
              <button
                onClick={() => { setCurrentView('home'); scrollTo('top'); }}
                className="footer-logo-btn"
                aria-label="NextGen Web Studio"
              >
                <EMCLogo theme="dark" />
              </button>
              <p className="footer-brand-bio">
                Engineering high-performance digital products, autonomous AI systems, and intelligent business infrastructure.
              </p>
              <div className="footer-location-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-loc-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>

              {/* Minimalist Circular Social Media Icons */}
              <div className="footer-social-cluster" aria-label="Official Social Links">
                <a
                  href="https://wa.me/916379140067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill social-wa"
                  title="WhatsApp: +91 63791 40067"
                  aria-label="WhatsApp"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 2C6.511 2 2.025 6.486 2.025 12.006c0 1.76.458 3.479 1.33 5.001L2 22l5.127-1.344a9.98 9.98 0 004.904 1.35h.004c5.518 0 10.005-4.486 10.005-10.006A10.015 10.015 0 0012.031 2zm0 18.283h-.003a8.27 8.27 0 01-4.218-1.157l-.302-.18-3.137.823.837-3.058-.197-.314a8.267 8.267 0 01-1.267-4.391c0-4.57 3.718-8.288 8.288-8.288 2.215 0 4.297.863 5.862 2.43a8.238 8.238 0 012.427 5.863c0 4.57-3.719 8.282-8.289 8.282zm4.544-6.205c-.249-.125-1.474-.727-1.703-.81-.229-.083-.396-.125-.562.125-.167.25-.646.81-.792.977-.146.166-.292.187-.541.062s-1.054-.388-2.007-1.238c-.742-.662-1.243-1.48-1.389-1.73-.146-.25-.016-.385.109-.509.112-.112.25-.291.375-.437.125-.146.166-.25.25-.416.083-.167.042-.313-.021-.438s-.563-1.354-.771-1.854c-.203-.488-.41-.422-.563-.43-.146-.008-.313-.01-.479-.01s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.021 2.583c.125.167 1.764 2.694 4.274 3.777.597.258 1.064.412 1.428.528.6.191 1.146.164 1.577.1.48-.072 1.474-.603 1.682-1.185.209-.583.209-1.083.146-1.187-.062-.104-.229-.167-.478-.292z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/shridharsan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill social-gh"
                  title="GitHub: @shridharsan1"
                  aria-label="GitHub"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/shridharsan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill social-li"
                  title="LinkedIn: Shridharsan"
                  aria-label="LinkedIn"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/nextgenwebstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill social-ig"
                  title="Instagram: @nextgenwebstudio"
                  aria-label="Instagram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/shridharsan1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill social-tg"
                  title="Telegram: @shridharsan1"
                  aria-label="Telegram"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* COLUMN 01 — DISCIPLINES */}
            <div className="footer-nav-col footer-disciplines-col">
              <h4 className="footer-col-header">
                <span className="footer-heading-square" aria-hidden="true" />
                <span>Disciplines</span>
              </h4>
              <ul className="footer-nav-links">
                <li>
                  <button onClick={() => scrollTo('services')} className="footer-nav-link">
                    Full-Stack Web Engineering
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('services')} className="footer-nav-link">
                    Agentic AI &amp; Multi-Agent Systems
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('services')} className="footer-nav-link">
                    Telegram Bots &amp; Paywalls
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('demos')} className="footer-nav-link">
                    Interactive AI Telemetry Stepper
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('demos')} className="footer-nav-link">
                    In-Browser Bot Simulator
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('portal');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="footer-nav-link"
                  >
                    Client Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 02 — SELECTED WORK */}
            <div className="footer-nav-col footer-work-col">
              <h4 className="footer-col-header">
                <span className="footer-heading-square" aria-hidden="true" />
                <span>Selected Work</span>
              </h4>
              <ul className="footer-nav-links">
                <li>
                  <button onClick={() => scrollTo('work')} className="footer-nav-link footer-project-link">
                    <span>Boomers Gaming Lounge OS</span>
                    <span className="footer-project-tag">[Esports]</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="footer-nav-link footer-project-link">
                    <span>GoatTurf Sports Arena</span>
                    <span className="footer-project-tag">[SaaS]</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="footer-nav-link footer-project-link">
                    <span>NeiMozhi Pure Ghee</span>
                    <span className="footer-project-tag">[D2C]</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('work')} className="footer-nav-link footer-project-link">
                    <span>NextGen Cloud POS Engine</span>
                    <span className="footer-project-tag">[Ledger]</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('about')} className="footer-nav-link">
                    Our Engineering Principles
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 03 — LEGAL & POLICIES */}
            <div className="footer-nav-col footer-legal-col">
              <h4 className="footer-col-header">
                <span className="footer-heading-square" aria-hidden="true" />
                <span>Legal &amp; Policies</span>
              </h4>
              <ul className="footer-nav-links">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('privacy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="footer-nav-link"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('terms');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="footer-nav-link"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('refunds');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="footer-nav-link"
                  >
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 04 — STUDIO DIRECT */}
            <div className="footer-nav-col footer-studio-direct-col">
              <h4 className="footer-col-header">
                <span className="footer-heading-square" aria-hidden="true" />
                <span>Studio Direct</span>
              </h4>
              <ul className="footer-nav-links">
                <li>
                  <a href="mailto:nextgenwebstudio63@gmail.com" className="footer-nav-link footer-email-link">
                    <span>nextgenwebstudio63@gmail.com</span>
                    <ArrowUpRight size={14} className="footer-link-arrow" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/916379140067"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link footer-whatsapp-link"
                  >
                    <span>WhatsApp: +91 63791 40067</span>
                    <ArrowUpRight size={14} className="footer-link-arrow" />
                  </a>
                </li>
                <li className="footer-info-item">
                  <span className="footer-info-muted">Coimbatore, Tamil Nadu, India</span>
                </li>
                <li className="footer-info-item">
                  <span className="footer-delivery-badge">
                    <span className="footer-delivery-dot" />
                    Worldwide Delivery
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* =========================================================================
              3. BOTTOM COPYRIGHT & TELEMETRY STATUS BAR
              ========================================================================= */}
          <div className="footer-bottom-bar">
            <div className="footer-copyright">
              © {new Date().getFullYear()} NextGen Web Studio. Built with precision in Coimbatore, India. All rights reserved.
            </div>
            <div className="footer-status-indicator">
              <span className="footer-live-emerald-dot" />
              <span className="footer-status-text">Autonomous Web Engineering · Worldwide Delivery</span>
            </div>
          </div>
        </div>
      </footer>
      </>
      )}

      {/* Floating Direct WhatsApp Pill with Official WhatsApp Logo (Not Generic Message Icon) */}
      <a
        href="https://wa.me/916379140067"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with NextGen Web Studio"
        className="floating-whatsapp"
        title="Chat with NextGen on WhatsApp (+91 63791 40067)"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2C6.511 2 2.025 6.486 2.025 12.006c0 1.76.458 3.479 1.33 5.001L2 22l5.127-1.344a9.98 9.98 0 004.904 1.35h.004c5.518 0 10.005-4.486 10.005-10.006A10.015 10.015 0 0012.031 2zm0 18.283h-.003a8.27 8.27 0 01-4.218-1.157l-.302-.18-3.137.823.837-3.058-.197-.314a8.267 8.267 0 01-1.267-4.391c0-4.57 3.718-8.288 8.288-8.288 2.215 0 4.297.863 5.862 2.43a8.238 8.238 0 012.427 5.863c0 4.57-3.719 8.282-8.289 8.282zm4.544-6.205c-.249-.125-1.474-.727-1.703-.81-.229-.083-.396-.125-.562.125-.167.25-.646.81-.792.977-.146.166-.292.187-.541.062s-1.054-.388-2.007-1.238c-.742-.662-1.243-1.48-1.389-1.73-.146-.25-.016-.385.109-.509.112-.112.25-.291.375-.437.125-.146.166-.25.25-.416.083-.167.042-.313-.021-.438s-.563-1.354-.771-1.854c-.203-.488-.41-.422-.563-.43-.146-.008-.313-.01-.479-.01s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.021 2.583c.125.167 1.764 2.694 4.274 3.777.597.258 1.064.412 1.428.528.6.191 1.146.164 1.577.1.48-.072 1.474-.603 1.682-1.185.209-.583.209-1.083.146-1.187-.062-.104-.229-.167-.478-.292z"/>
        </svg>
      </a>

      {/* ==========================================================================
          AGENCY OS CLIENT PORTAL MODAL
          ========================================================================== */}
      {clientPortalOpen && (
        <div className="portal-modal-backdrop" onClick={() => setClientPortalOpen(false)}>
          <div className="portal-modal-window" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="portal-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: '#2563eb',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#ffffff'
                }}>
                  OS
                </div>
                <div>
                  <div style={{ font: '700 14px "Space Grotesk", sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>NextGen Agency OS • Client Portal</span>
                    <span style={{ font: '10px "DM Mono", monospace', background: '#111827', border: '1px solid #334155', color: '#38bdf8', padding: '2px 6px', borderRadius: '3px' }}>
                      KEY: PRJ-NG-2026-COIMBATORE
                    </span>
                  </div>
                  <div style={{ font: '11px "DM Mono", monospace', color: '#94a3b8' }}>
                    Client: PrimeScalpers / Boomers Lounge • Active Production Sprint
                  </div>
                </div>
              </div>

              <button
                onClick={() => setClientPortalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                title="Close Portal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Portal Tab Switcher */}
            <div className="portal-tabs-nav">
              <button
                onClick={() => setPortalTab('milestones')}
                className={`portal-tab-btn ${portalTab === 'milestones' ? 'active' : ''}`}
              >
                <CheckCircle2 size={13} />
                <span>01. SPRINT MILESTONES (85%)</span>
              </button>
              <button
                onClick={() => setPortalTab('billing')}
                className={`portal-tab-btn ${portalTab === 'billing' ? 'active' : ''}`}
              >
                <CreditCard size={13} />
                <span>02. BILLING &amp; RAZORPAY INVOICES</span>
              </button>
              <button
                onClick={() => setPortalTab('deliverables')}
                className={`portal-tab-btn ${portalTab === 'deliverables' ? 'active' : ''}`}
              >
                <Key size={13} />
                <span>03. REPOSITORIES &amp; MASTER KEYS</span>
              </button>
              <button
                onClick={() => setPortalTab('support')}
                className={`portal-tab-btn ${portalTab === 'support' ? 'active' : ''}`}
              >
                <HelpCircle size={13} />
                <span>04. PRIORITY SUPPORT TICKET</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="portal-modal-body">
              {portalTab === 'milestones' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ margin: 0, font: '700 16px "Space Grotesk", sans-serif' }}>Sprint 3 Delivery Tracker</h4>
                      <p style={{ margin: '4px 0 0', font: '12px "Manrope", sans-serif', color: '#94a3b8' }}>
                        Autonomous multi-agent Telegram dispatcher &amp; MT5 broker webhook integration.
                      </p>
                    </div>
                    <span style={{ font: '700 12px "DM Mono", monospace', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '4px 10px', borderRadius: '4px' }}>
                      ON SCHEDULE (TARGET: NOV 14)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
                    <div style={{ height: '100%', width: '85%', background: '#2563eb', borderRadius: '4px' }}></div>
                  </div>

                  {/* Milestone Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', font: '12px "DM Mono", monospace' }}>
                    {[
                      { num: '01', title: 'Technical Scoping, Threat Model & SLA Sign-off', status: 'VERIFIED', date: 'Oct 28', badge: '#22c55e' },
                      { num: '02', title: 'High-Fidelity Telegram Desktop Interface & Brand Tokens', status: 'VERIFIED', date: 'Nov 02', badge: '#22c55e' },
                      { num: '03', title: 'Cloudflare V8 Edge Webhook Relay (sub-40ms latency)', status: 'ACTIVE • LIVE', date: 'Nov 06', badge: '#38bdf8' },
                      { num: '04', title: 'Supabase PostgreSQL Schema Pool & pgvector Indexing', status: 'ACTIVE • 85%', date: 'Nov 08', badge: '#38bdf8' },
                      { num: '05', title: '100% Code Sovereignty & Private Git Transfer', status: 'PENDING UAT', date: 'Nov 12', badge: '#64748b' }
                    ].map((m, idx) => (
                      <div key={idx} style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 1fr 120px 100px',
                        alignItems: 'center',
                        padding: '12px 16px',
                        background: '#141c2e',
                        border: '1px solid #1e293b',
                        borderRadius: '6px'
                      }}>
                        <span style={{ color: '#64748b', fontWeight: 700 }}>{m.num}</span>
                        <span style={{ color: '#f1f5f9' }}>{m.title}</span>
                        <span style={{ color: m.badge, fontWeight: 600 }}>{m.status}</span>
                        <span style={{ color: '#64748b', textAlign: 'right' }}>{m.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portalTab === 'billing' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: '#141c2e', border: '1px solid #1e293b', padding: '16px', borderRadius: '6px' }}>
                      <span style={{ font: '10px "DM Mono", monospace', color: '#94a3b8' }}>TOTAL CONTRACT VALUE</span>
                      <strong style={{ display: 'block', font: '700 20px "Space Grotesk", sans-serif', color: '#ffffff', marginTop: '4px' }}>₹80,000</strong>
                    </div>
                    <div style={{ background: '#141c2e', border: '1px solid #1e293b', padding: '16px', borderRadius: '6px' }}>
                      <span style={{ font: '10px "DM Mono", monospace', color: '#94a3b8' }}>SETTLED TO DATE</span>
                      <strong style={{ display: 'block', font: '700 20px "Space Grotesk", sans-serif', color: '#22c55e', marginTop: '4px' }}>₹45,000</strong>
                    </div>
                    <div style={{ background: '#141c2e', border: '1px solid #1e293b', padding: '16px', borderRadius: '6px' }}>
                      <span style={{ font: '10px "DM Mono", monospace', color: '#94a3b8' }}>REMAINING BALANCE</span>
                      <strong style={{ display: 'block', font: '700 20px "Space Grotesk", sans-serif', color: '#38bdf8', marginTop: '4px' }}>₹35,000</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', font: '12px "DM Mono", monospace' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 100px 120px 140px',
                      alignItems: 'center',
                      padding: '14px 18px',
                      background: '#141c2e',
                      border: '1px solid #1e293b',
                      borderRadius: '6px'
                    }}>
                      <span style={{ color: '#94a3b8' }}>INV-NG-8821</span>
                      <span style={{ color: '#ffffff' }}>Sprint 1 &amp; 2 Initial Scoping Deposit</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>₹45,000</span>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>PAID ✓</span>
                      <button
                        onClick={() => alert('Downloading official GST Tax Invoice #INV-NG-8821...')}
                        style={{ background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
                      >
                        <Download size={11} /> PDF Receipt
                      </button>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 100px 120px 140px',
                      alignItems: 'center',
                      padding: '14px 18px',
                      background: '#141c2e',
                      border: '1px solid #2563eb',
                      borderRadius: '6px'
                    }}>
                      <span style={{ color: '#94a3b8' }}>INV-NG-8894</span>
                      <span style={{ color: '#ffffff' }}>Sprint 3 Final Handover &amp; Sovereignty Transfer</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>₹35,000</span>
                      <span style={{ color: '#38bdf8', fontWeight: 600 }}>DUE NOV 14</span>
                      <button
                        onClick={() => alert('Initiating secure Razorpay checkout gateway for ₹35,000...')}
                        style={{ background: '#2563eb', border: 'none', color: '#ffffff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700 }}
                      >
                        <CreditCard size={11} /> Pay via Razorpay
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {portalTab === 'deliverables' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: '#141c2e', border: '1px solid #1e293b', padding: '16px 20px', borderRadius: '6px' }}>
                    <div style={{ font: '700 14px "Space Grotesk", sans-serif', color: '#ffffff', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Code2 size={16} color="#38bdf8" />
                      <span>Private Client Git Repository</span>
                    </div>
                    <p style={{ font: '12px "DM Mono", monospace', color: '#94a3b8', margin: '0 0 10px' }}>
                      github.com/nextgen-web-studio/client-primescalpers-v2 [Private Repo]
                    </p>
                    <button
                      onClick={() => alert('Accessing private GitHub token authentication...')}
                      style={{ background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', font: '11px "DM Mono", monospace' }}
                    >
                      Authorize GitHub Access →
                    </button>
                  </div>

                  <div style={{ background: '#141c2e', border: '1px solid #1e293b', padding: '16px 20px', borderRadius: '6px' }}>
                    <div style={{ font: '700 14px "Space Grotesk", sans-serif', color: '#ffffff', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={16} color="#22c55e" />
                      <span>Staging Preview URL</span>
                    </div>
                    <p style={{ font: '12px "DM Mono", monospace', color: '#94a3b8', margin: '0 0 10px' }}>
                      https://staging-primescalpers.nextgenwebstudio.in [Edge SSL Protected]
                    </p>
                    <a
                      href="https://nextgenwebstudio.in"
                      target="_blank"
                      rel="noreferrer"
                      style={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', font: '11px "DM Mono", monospace', display: 'inline-block' }}
                    >
                      Launch Staging Preview ↗
                    </a>
                  </div>
                </div>
              )}

              {portalTab === 'support' && (
                <div>
                  <h4 style={{ margin: '0 0 8px', font: '700 15px "Space Grotesk", sans-serif' }}>Direct Engineer Dispatch</h4>
                  <p style={{ font: '12px "Manrope", sans-serif', color: '#94a3b8', margin: '0 0 18px' }}>
                    Directly pings our on-duty Coimbatore engineers via WhatsApp and Telegram emergency alerts.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Ticket Title (e.g. MT5 Webhook rate limit adjustment)..."
                      style={{ background: '#141c2e', border: '1px solid #334155', color: '#ffffff', padding: '10px 14px', borderRadius: '6px', font: '12px "DM Mono", monospace' }}
                    />
                    <textarea
                      rows={4}
                      placeholder="Describe the technical requirement or bug..."
                      style={{ background: '#141c2e', border: '1px solid #334155', color: '#ffffff', padding: '10px 14px', borderRadius: '6px', font: '12px "DM Mono", monospace' }}
                    />
                    <button
                      onClick={() => alert('Support ticket logged to NextGen emergency pager! An engineer will reply within 30 minutes.')}
                      style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', font: '700 12px "DM Mono", monospace', cursor: 'pointer', alignSelf: 'flex-start' }}
                    >
                      Dispatch Priority Ticket
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
