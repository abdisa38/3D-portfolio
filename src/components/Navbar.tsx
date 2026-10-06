import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

interface NavItem {
  id: string;
  label: string;
  target?: string;
  action?: 'navigate' | 'resume';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', target: 'home', action: 'navigate' },
  { id: 'about', label: 'About', target: 'about', action: 'navigate' },
  { id: 'skills', label: 'Tech Stack', target: 'skills', action: 'navigate' },
  { id: 'work', label: 'Work', target: 'work', action: 'navigate' },
  { id: 'explorations', label: 'Credentials', target: 'explorations', action: 'navigate' },
  { id: 'resume', label: 'Resume', action: 'resume' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.action === 'resume') {
      onOpenResume();
    } else if (item.target) {
      if (item.target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onNavigate('home');
      } else {
        const el = document.getElementById(item.target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          onNavigate(item.target);
        }
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none"
    >
      <nav
        id="navbar-pill"
        className={`relative inline-flex items-center gap-1 sm:gap-2 rounded-full backdrop-blur-xl border bg-surface/85 px-2 py-1.5 sm:px-2.5 sm:py-2 pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? 'shadow-2xl shadow-black/50 border-white/20 bg-surface/95 scale-[0.98]'
            : 'shadow-xl shadow-black/20 border-white/10'
        }`}
      >
        {/* Monogram Logo with Ambient Glow */}
        <button
          id="nav-logo"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigate('home');
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105 flex items-center justify-center cursor-pointer group"
          aria-label="Home logo"
        >
          {/* Animated gradient ring */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              logoHovered ? 'accent-gradient-reverse' : 'accent-gradient'
            }`}
          />
          {/* Inner circle */}
          <span className="relative z-10 w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[12px] sm:text-[13px] text-text-primary tracking-tight font-medium">
              AA
            </span>
          </span>
        </button>

        {/* Vertical divider */}
        <div className="hidden lg:block w-px h-4 bg-white/10 mx-1" />

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.action === 'navigate' && activeSection === item.id;

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item)}
                className={`relative text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm -z-10" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical divider */}
        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* "Say hi" Primary CTA Button */}
        <button
          id="nav-say-hi-button"
          onClick={onOpenContact}
          className="relative group text-xs rounded-full p-[1px] transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          <span className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
          <span className="relative z-10 inline-flex items-center gap-1.5 bg-surface/90 rounded-full px-3 sm:px-4 py-1.5 backdrop-blur-md text-text-primary border border-white/10 group-hover:border-transparent transition-colors font-medium">
            <span>Say hi</span>
            <ArrowUpRight className="w-3 h-3 text-[#89AACC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </span>
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          id="nav-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-white transition-colors cursor-pointer ml-0.5"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown Card */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-surface/95 border border-white/15 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl pointer-events-auto flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-1">
            <span className="text-[11px] font-mono text-muted uppercase tracking-widest">
              Navigation
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="text-left px-4 py-2.5 rounded-2xl text-sm font-medium text-text-primary hover:bg-white/5 transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-muted">&rarr;</span>
            </button>
          ))}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenContact();
            }}
            className="mt-2 w-full py-3 rounded-2xl accent-gradient text-black font-semibold text-sm flex items-center justify-center gap-2"
          >
            <span>Initiate Contact</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
