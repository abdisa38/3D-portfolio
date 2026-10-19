import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Flame, Terminal, ArrowUpRight, TrendingUp } from 'lucide-react';
import { STATS } from '../data/portfolioData';

const STAT_CONFIG = [
  {
    icon: <Terminal className="w-4 h-4 text-sky-400" />,
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.22)',
    tag: 'Production Craft',
  },
  {
    icon: <GitBranch className="w-4 h-4 text-[#89AACC]" />,
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.22)',
    tag: 'Open Source',
  },
  {
    icon: <Flame className="w-4 h-4 text-rose-400" />,
    accent: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.22)',
    tag: 'Commit Velocity',
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

    const tiltX = ((y / rect.height) - 0.5) * -10;
    const tiltY = ((x / rect.width) - 0.5) * 10;

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
    <section id="stats" className="bg-bg/80 backdrop-blur-sm py-12 md:py-16 border-y border-stroke/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(circle,_rgba(78,133,191,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {STATS.map((stat, index) => {
            const tilt = tiltMap[index] || { x: 0, y: 0 };
            const spotlight = spotlightMap[index] || { x: 50, y: 50 };
            const isHovered = hoveredCard === index;
            const config = STAT_CONFIG[index % STAT_CONFIG.length];

            return (
              <motion.div
                key={stat.label}
                id={`stat-card-${index}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
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
                    ? `0 18px 35px -10px ${config.glow}, 0 0 20px 0 ${config.glow}`
                    : '0 4px 16px rgba(0, 0, 0, 0.35)',
                }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface/50 hover:bg-surface/85 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 overflow-hidden cursor-default select-none max-w-md md:max-w-none w-full mx-auto"
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

                {/* 2. Top Glowing Neon Accent Line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-all duration-300"
                  style={{
                    background: isHovered ? config.accent : 'transparent',
                    boxShadow: isHovered ? `0 0 10px ${config.accent}` : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div className="relative z-10">
                  {/* Top Row: Icon Badge & Status Chip */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-all duration-300"
                      style={{
                        borderColor: isHovered ? config.accent : undefined,
                        boxShadow: isHovered ? `0 0 12px ${config.glow}` : undefined,
                      }}
                    >
                      {config.icon}
                    </div>

                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-muted/90 flex items-center gap-1.5 transition-colors group-hover:text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: config.accent }}
                      />
                      <span>{config.tag}</span>
                    </span>
                  </div>

                  {/* Stat Value & Label in compact layout */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-4xl sm:text-5xl font-display italic tracking-tight leading-none text-white block transition-all duration-300"
                      style={{
                        textShadow: isHovered ? `0 0 24px ${config.accent}` : undefined,
                      }}
                    >
                      {stat.value}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-text-primary group-hover:text-white transition-colors">
                      {stat.label}
                    </h3>
                  </div>

                  {/* Sublabel */}
                  <p className="text-xs text-muted/80 leading-relaxed mt-1">
                    {stat.sublabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
