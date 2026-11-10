import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'services', label: 'services' },
    { id: 'agentic-ai', label: 'agentic ai' },
    { id: 'web-dev', label: 'web dev' },
    { id: 'telegram-bots', label: 'telegram bots' },
    { id: 'portfolio', label: 'work' },
    { id: 'about', label: 'about' },
    { id: 'insights', label: 'insights' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-canvas/85 backdrop-blur-md transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-left"
        >
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-accent-electric transition-colors">
              nextgen
            </span>
            <span className="w-1.5 h-4 bg-accent-electric inline-block animate-pulse"></span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-5 font-mono text-xs text-text-secondary">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors py-1 ${
                  currentPage === link.id
                    ? 'text-white font-semibold border-b border-accent-electric'
                    : 'hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wide bg-white text-black hover:bg-gray-200 transition-all shadow-sm"
          >
            START A PROJECT
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-card border-b border-border-subtle px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left py-1.5 transition-colors ${
                  currentPage === link.id ? 'text-accent-electric font-bold' : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-border-subtle">
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-accent-electric text-white font-semibold text-xs text-center font-mono tracking-wider"
            >
              START A PROJECT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
