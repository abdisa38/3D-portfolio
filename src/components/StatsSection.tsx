import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Flame, Briefcase, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { STATS } from '../data/portfolioData';

interface StatConfig {
  tag: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
  borderHover: string;
  badge: string;
}

const STAT_CONFIGS: StatConfig[] = [
  {
    tag: 'EXPERIENCE & CRAFT',
    icon: <Briefcase className="w-4 h-4 text-sky-400" />,
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.22)',
    borderHover: 'hover:border-sky-500/50',
    badge: 'Production Ready',
  },
  {
    tag: 'CODEBASE & ARCHITECTURE',
    icon: <GitBranch className="w-4 h-4 text-[#89AACC]" />,
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.25)',
    borderHover: 'hover:border-[#4E85BF]/60',
    badge: 'Active GitHub',
  },
  {
    tag: 'SHIPPING VELOCITY',
    icon: <Flame className="w-4 h-4 text-emerald-400" />,
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.22)',
    borderHover: 'hover:border-emerald-500/50',
    badge: 'High Impact',
  },
];

export const StatsSection: React.FC = () => {
  const [tiltMap, setTiltMap] = useState<Record<number, { x: number; y: number }>>({});
  const [spotlightMap, setSpotlightMap] = useState<Record<number, { x: number; y: number }>>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y / rect.height) - 0.5) * -12;
    const tiltY = ((x / rect.width) - 0.5) * 12;

    setTiltMap((prev) => ({ ...prev, [index]: { x: tiltX, y: tiltY } }));
    setSpotlightMap((prev) => ({
      ...prev,
      [index]: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 },
    }));
  };

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = (index: number) => {
    setHoveredCard(null);
    setTiltMap((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  return (
    <section id="stats" className="bg-bg/85 backdrop-blur-sm py-10 md:py-14 border-y border-stroke/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(circle,_rgba(78,133,191,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {STATS.map((stat, index) => {
            const tilt = tiltMap[index] || { x: 0, y: 0 };
            const spotlight = spotlightMap[index] || { x: 50, y: 50 };
            const isHovered = hoveredCard === index;
            const config = STAT_CONFIGS[index % STAT_CONFIGS.length];

            return (
              <motion.div
                key={stat.label}
                id={`stat-card-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={(e) => handleMouseMove(index, e)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                    isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                  }`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
                    : 'transform 0.4s ease-out, box-shadow 0.4s ease',
                  boxShadow: isHovered
                    ? `0 16px 32px -8px ${config.glow}, 0 0 16px 0 ${config.glow}`
                    : '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
                className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-surface/50 hover:bg-surface/85 border border-white/10 ${config.borderHover} backdrop-blur-md transition-all duration-300 overflow-hidden cursor-default select-none`}
              >
                {/* 1. Real-time Cursor Spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, ${config.glow} 0%, transparent 75%)`
                      : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* 2. Top Glowing Accent Bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-all duration-300"
                  style={{
                    background: isHovered ? config.accent : 'transparent',
                    boxShadow: isHovered ? `0 0 10px ${config.accent}` : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div className="relative z-10">
                  {/* Compact Header: Icon, Tag & Micro-Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          borderColor: isHovered ? config.accent : undefined,
                        }}
                      >
                        {config.icon}
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-muted uppercase">
                        {config.tag}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[#89AACC]">
                      {config.badge}
                    </span>
                  </div>

                  {/* Stat Value & Title inline/stacked cleanly */}
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span
                      className="text-3xl sm:text-4xl font-display italic tracking-tight text-white block transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{
                        textShadow: isHovered ? `0 0 20px ${config.accent}` : undefined,
                      }}
                    >
                      {stat.value}
                    </span>
                    <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
                      {stat.label}
                    </h3>
                  </div>

                  {/* Sublabel description */}
                  <p className="text-xs text-muted/80 leading-relaxed mb-3">
                    {stat.sublabel}
                  </p>

                  {/* Senior Developer Micro-Visual */}
                  {index === 0 && (
                    <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-muted/70">
                      <span className="inline-flex items-center gap-1.5 text-sky-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                        Full-Stack / Systems
                      </span>
                      <span>MERN + Cloud</span>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-muted/70">
                      <span className="inline-flex items-center gap-1.5 text-[#89AACC]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                        TypeScript &bull; Node &bull; React
                      </span>
                      <span>Verified Repos</span>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-muted/70">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-300" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500" />
                        <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
                      </div>
                      <span className="text-emerald-400 font-mono">Active Streak</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
