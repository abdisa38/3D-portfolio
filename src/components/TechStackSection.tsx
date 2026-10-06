import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Laptop, Settings, Database, Rocket, Bot, Cpu, Sparkles, CheckCircle2, Terminal } from 'lucide-react';
import { TECH_STACK_CATEGORIES } from '../data/portfolioData';

interface CategoryTheme {
  accent: string;
  glow: string;
  borderGlow: string;
  badgeBg: string;
  badgeHover: string;
  badgeBorder: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  frontend: {
    accent: '#38bdf8', // Sky Cyan
    glow: 'rgba(56, 189, 248, 0.25)',
    borderGlow: 'rgba(56, 189, 248, 0.6)',
    badgeBg: 'hover:bg-sky-500/10',
    badgeHover: 'hover:text-sky-300',
    badgeBorder: 'hover:border-sky-500/40',
  },
  backend: {
    accent: '#f43f5e', // Rose / Crimson (matching reference)
    glow: 'rgba(244, 63, 94, 0.28)',
    borderGlow: 'rgba(244, 63, 94, 0.7)',
    badgeBg: 'hover:bg-rose-500/10',
    badgeHover: 'hover:text-rose-300',
    badgeBorder: 'hover:border-rose-500/40',
  },
  database: {
    accent: '#10b981', // Emerald
    glow: 'rgba(16, 185, 129, 0.25)',
    borderGlow: 'rgba(16, 185, 129, 0.6)',
    badgeBg: 'hover:bg-emerald-500/10',
    badgeHover: 'hover:text-emerald-300',
    badgeBorder: 'hover:border-emerald-500/40',
  },
  devops: {
    accent: '#f59e0b', // Amber / Orange
    glow: 'rgba(245, 158, 11, 0.25)',
    borderGlow: 'rgba(245, 158, 11, 0.6)',
    badgeBg: 'hover:bg-amber-500/10',
    badgeHover: 'hover:text-amber-300',
    badgeBorder: 'hover:border-amber-500/40',
  },
  'ai-modern': {
    accent: '#a855f7', // Purple / Violet
    glow: 'rgba(168, 85, 247, 0.28)',
    borderGlow: 'rgba(168, 85, 247, 0.6)',
    badgeBg: 'hover:bg-purple-500/10',
    badgeHover: 'hover:text-purple-300',
    badgeBorder: 'hover:border-purple-500/40',
  },
};

export const TechStackSection: React.FC = () => {
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});
  const [spotlightMap, setSpotlightMap] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y / rect.height) - 0.5) * -16;
    const tiltY = ((x / rect.width) - 0.5) * 16;

    setTiltMap((prev) => ({ ...prev, [id]: { x: tiltX, y: tiltY } }));
    setSpotlightMap((prev) => ({
      ...prev,
      [id]: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 },
    }));
  };

  const handleMouseEnter = (id: string) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = (id: string) => {
    setHoveredCard(null);
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const renderIcon = (id: string, iconName: string, theme: CategoryTheme) => {
    switch (id) {
      case 'frontend':
        return (
          <div className="relative">
            <Laptop className="w-8 h-8 text-white/95 group-hover:scale-110 group-hover:text-sky-400 transition-all duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 animate-ping opacity-75" />
          </div>
        );
      case 'backend':
        return (
          <div className="relative">
            <Settings className="w-8 h-8 text-white/95 group-hover:rotate-90 group-hover:text-rose-400 transition-all duration-700 ease-out" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          </div>
        );
      case 'database':
        return (
          <div className="relative">
            <Database className="w-8 h-8 text-white/95 group-hover:-translate-y-1 group-hover:text-emerald-400 transition-all duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        );
      case 'devops':
        return (
          <div className="relative">
            <Rocket className="w-8 h-8 text-white/95 group-hover:-translate-y-1.5 group-hover:translate-x-1.5 group-hover:text-amber-400 transition-all duration-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-75" />
          </div>
        );
      case 'ai-modern':
        return (
          <div className="relative">
            <Bot className="w-8 h-8 text-white/95 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          </div>
        );
      default:
        return <Cpu className="w-8 h-8 text-white/90" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative bg-bg/85 backdrop-blur-sm py-20 md:py-28 border-t border-stroke/40 overflow-hidden"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[radial-gradient(circle,_rgba(244,63,94,0.07)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-[radial-gradient(circle,_rgba(56,189,248,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
              Skills & Architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary mb-4">
            Technical <span className="font-display italic">Arsenal</span>
          </h2>

          <p className="text-sm md:text-base text-muted leading-relaxed">
            A comprehensive suite of modern technologies for building scalable, high-performance applications.
          </p>
        </motion.div>

        {/* 3D Tech Arsenal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TECH_STACK_CATEGORIES.map((category, index) => {
            const tilt = tiltMap[category.id] || { x: 0, y: 0 };
            const spotlight = spotlightMap[category.id] || { x: 50, y: 50 };
            const isHovered = hoveredCard === category.id;
            const theme = CATEGORY_THEMES[category.id] || CATEGORY_THEMES.backend;
            const isHighlighted = category.highlighted;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={(e) => handleMouseMove(category.id, e)}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={() => handleMouseLeave(category.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                    isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
                  }`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                    : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                  boxShadow: isHovered
                    ? `0 20px 45px -10px ${theme.glow}, 0 0 25px 0 ${theme.glow}`
                    : isHighlighted
                    ? '0 10px 30px -10px rgba(244, 63, 94, 0.25)'
                    : '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
                className={`group relative rounded-3xl p-7 md:p-8 bg-surface/60 hover:bg-surface/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default select-none ${
                  isHighlighted
                    ? 'border-rose-500/50 hover:border-rose-500'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* 1. Dynamic Cursor Spotlight (Follows mouse across the card surface) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle 240px at ${spotlight.x}% ${spotlight.y}%, ${theme.glow} 0%, transparent 80%)`
                      : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* 2. Top-Right Ambient Sheen */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-tr-3xl" />

                {/* 3. Highlighted Bottom Glow Bar */}
                {isHighlighted && (
                  <div
                    className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full transition-all duration-300"
                    style={{
                      background: theme.accent,
                      boxShadow: `0 -2px 14px ${theme.accent}, 0 0 8px ${theme.accent}`,
                    }}
                  />
                )}

                {/* 4. Active Animated Border Beam on Hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: `1.5px solid ${theme.accent}`,
                      boxShadow: `inset 0 0 15px ${theme.glow}`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Icon Area */}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        borderColor: isHovered ? theme.borderGlow : undefined,
                        boxShadow: isHovered ? `0 0 20px ${theme.glow}` : undefined,
                      }}
                    >
                      {renderIcon(category.id, category.iconName, theme)}
                    </div>

                    {/* <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles
                        className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                        style={{ color: theme.accent }}
                      />
                    </div> */}
                  </div>

                  {/* Category Title with Glowing Dot */}
                  <div className="flex items-center gap-2.5 mb-6">
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: theme.accent,
                        boxShadow: `0 0 10px ${theme.accent}, 0 0 18px ${theme.accent}`,
                      }}
                    />
                    <h3 className="text-xl sm:text-2xl font-medium text-text-primary tracking-tight group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Pill Badges with Micro-Animations */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={skill}
                        className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-normal text-muted/90 bg-white/[0.04] border border-white/5 transition-all duration-200 cursor-default hover:scale-108 hover:shadow-lg ${theme.badgeBg} ${theme.badgeHover} ${theme.badgeBorder}`}
                        style={{
                          transitionDelay: `${sIdx * 15}ms`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Meta & Status */}
                <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted/70 group-hover:text-muted transition-colors">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2
                      className="w-3.5 h-3.5 transition-colors"
                      style={{ color: isHovered ? theme.accent : undefined }}
                    />
                    <span>Production Grade</span>
                  </div>
                  <span
                    className="font-medium transition-colors"
                    style={{ color: isHovered ? theme.accent : '#89AACC' }}
                  >
                    {category.skills.length} Technologies
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
