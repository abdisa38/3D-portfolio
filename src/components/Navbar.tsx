import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (linkName: string) => {
    if (linkName === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNavigate('home');
    } else if (linkName === 'Work') {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      onNavigate('work');
    } else if (linkName === 'Resume') {
      onOpenResume();
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none"
    >
      <nav
        id="navbar-pill"
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-1.5 sm:py-2 pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'shadow-xl shadow-black/40 border-white/15 bg-surface/95' : 'shadow-md shadow-black/10'
        }`}
      >
        {/* 1. Logo */}
        <button
          id="nav-logo"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigate('home');
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
          aria-label="Home logo"
        >
          {/* Accent gradient ring */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              logoHovered ? 'accent-gradient-reverse' : 'accent-gradient'
            }`}
          />
          {/* Inner circle */}
          <span className="relative z-10 w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary tracking-tight">
              AA
            </span>
          </span>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1.5" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {['Home', 'Work', 'Resume'].map((link) => {
            const isActive =
              (link === 'Home' && activeSection === 'home') ||
              (link === 'Work' && activeSection === 'work');

            return (
              <button
                key={link}
                id={`nav-link-${link.toLowerCase()}`}
                onClick={() => handleLinkClick(link)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-text-primary bg-stroke/50 font-medium'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }`}
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5" />

        {/* 5. "Say hi" Button */}
        <button
          id="nav-say-hi-button"
          onClick={onOpenContact}
          className="relative group text-xs sm:text-sm rounded-full p-[1px] transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          {/* Gradient border behind on hover */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
          
          <span className="relative z-10 inline-flex items-center gap-1.5 bg-surface rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md text-text-primary border border-white/5 group-hover:border-transparent transition-colors">
            <span>Say hi</span>
            <span className="text-[11px] font-mono transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </span>
        </button>
      </nav>
    </header>
  );
};
