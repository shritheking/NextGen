import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ArrowRight, Layers, Tag } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

interface Project {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'automation';
  categoryLabel: string;
  location: string;
  image: string;
  problem: string;
  solution: string;
  tech: string[];
  status: string;
}

const PROJECTS: Project[] = [
  {
    id: 'boomers',
    title: 'Boomers Gaming Lounge Management',
    category: 'web',
    categoryLabel: 'Gaming Lounge OS',
    location: 'Coimbatore, India',
    image: '/images/boomers_cafe_new.png',
    problem: 'LAN gaming center suffered manual cash collection, unmonitored PC time overstays, and fragmented cafe food ordering.',
    solution: 'Built an end-to-end station lock engine with real-time WebSocket timers, integrated snack ordering, and UPI billing.',
    tech: ['React', 'Node.js', 'Socket.io', 'Razorpay UPI', 'Tailwind CSS'],
    status: 'Live Commercial Deployment'
  },
  {
    id: 'goatturf',
    title: 'GoatTurf Sports Arena Reservation Platform',
    category: 'web',
    categoryLabel: 'Sports Venue SaaS',
    location: 'Coimbatore, India',
    image: '/images/turf_dashboard_new.png',
    problem: 'Double-booking collisions between phone call reservations and walk-in players causing revenue disputes.',
    solution: 'Engineered sub-second slot locking with PostgreSQL transaction isolation, WhatsApp automated vouchers, and real-time manager calendar syncing.',
    tech: ['Next.js Edge', 'Supabase', 'PostgreSQL Locks', 'WhatsApp Cloud API'],
    status: 'Live Commercial Deployment'
  },
  {
    id: 'neimozhi',
    title: 'NeiMozhi Native Pure Ghee Ecommerce',
    category: 'web',
    categoryLabel: 'D2C E-Commerce',
    location: 'Coimbatore, India',
    image: '/images/neimozhi_new.png',
    problem: 'Traditional organic ghee producer lacked direct-to-consumer digital channels and struggled with slow checkout drops.',
    solution: 'Custom high-velocity storefront with sub-second cart checkout, automated order routing, and instant WhatsApp tracking receipts.',
    tech: ['Next.js', 'Tailwind CSS', 'Razorpay', 'PostgreSQL', 'Shiprocket API'],
    status: 'Live Commercial Deployment'
  },
  {
    id: 'billing',
    title: 'NextGen Multi-Tenant GST Billing System',
    category: 'web',
    categoryLabel: 'Enterprise POS',
    location: 'Coimbatore, India',
    image: '/images/billing_software_new.png',
    problem: 'SMEs burdened by expensive, slow accounting software with poor inventory reconciliation and barcode scanning.',
    solution: 'High-speed offline-first POS with thermal receipt printing, real-time GST tax calculations, and automated PDF invoice generation.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'PDFKit'],
    status: 'Live Commercial Deployment'
  },
  {
    id: 'ai-assistant',
    title: 'Autonomous Technical Interview Agent',
    category: 'ai',
    categoryLabel: 'Agentic AI',
    location: 'Proprietary System',
    image: '/images/ai_assistant.jpg',
    problem: 'Engineering teams spent 40+ hours per candidate round conducting repetitive initial technical screeners.',
    solution: 'Autonomous AI interview agent with speech-to-text, real-time code rubric evaluations, and structured candidate assessment reports.',
    tech: ['LangGraph', 'Whisper STT', 'FastAPI', 'pgvector', 'Tailwind CSS'],
    status: 'Internal Production Tool'
  },
  {
    id: 'aegis',
    title: 'AEGIS-ORBIT Space Debris Tracker',
    category: 'ai',
    categoryLabel: 'Telemetry & Modeling',
    location: 'R&D Concept',
    image: '/images/parallax_landing.jpg',
    problem: 'Low Earth Orbit (LEO) satellite operators need real-time collision prediction modeling across 30,000+ debris fragments.',
    solution: 'Spatial 3D orbital simulation engine with GPU-accelerated trajectory calculation and collision alert webhooks.',
    tech: ['Three.js', 'WebGL', 'TypeScript', 'Orbital Mechanics API'],
    status: 'Advanced Concept System'
  },
  {
    id: 'skydrop',
    title: 'SkyDrop Autonomous Drone Delivery Dispatch',
    category: 'automation',
    categoryLabel: 'Autonomous Logistics',
    location: 'R&D Concept',
    image: '/images/storefront_mockup.jpg',
    problem: 'Coimbatore suburban medical supply drops require automated flight corridors and weather-aware dispatch.',
    solution: 'Fleet telemetry dashboard with automated waypoint routing, battery threshold monitoring, and payload release locks.',
    tech: ['React', 'Leaflet GIS', 'FastAPI', 'MQTT Telemetry'],
    status: 'Advanced Concept System'
  }
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'ai' | 'automation'>('all');

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-electric/10 hairline-border font-mono text-xs text-accent-electric">
          <span>COMMERCIAL PROOF & DELIVERED SYSTEMS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Production Software Engineered to Deliver.
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          An honest review of real client platforms, deployed booking systems, and architecture concepts shipped by our engineering studio in Coimbatore.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(['all', 'web', 'ai', 'automation'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                filter === cat
                  ? 'bg-accent-electric text-white shadow-sm'
                  : 'bg-surface-elevated text-text-secondary hover:text-white hairline-border'
              }`}
            >
              {cat === 'all' ? 'ALL PROJECTS' : cat === 'web' ? 'WEB STACK' : cat === 'ai' ? 'AGENTIC AI' : 'AUTOMATION'}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map(project => (
          <div key={project.id} className="bg-surface-card rounded-2xl overflow-hidden hairline-border hairline-border-hover group flex flex-col justify-between">
            <div>
              {/* Image Container */}
              <div className="h-64 sm:h-72 bg-surface-base relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-canvas/85 backdrop-blur-md hairline-border font-mono text-[10px] text-accent-emerald">
                  ● {project.status}
                </div>
              </div>

              {/* Details */}
              <div className="p-7 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-accent-electric">
                  <span>{project.categoryLabel}</span>
                  <span className="text-text-muted">{project.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-accent-electric transition-colors">
                  {project.title}
                </h3>
                <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
                  <div><strong className="text-white font-mono text-[11px]">PROBLEM:</strong> {project.problem}</div>
                  <div><strong className="text-white font-mono text-[11px]">SOLUTION:</strong> {project.solution}</div>
                </div>
              </div>
            </div>

            <div className="px-7 pb-7 pt-2 border-t border-border-subtle flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-surface-elevated text-[11px] font-mono text-text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
