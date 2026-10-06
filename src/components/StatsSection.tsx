import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Flame, ArrowUpRight, TrendingUp } from 'lucide-react';
import { STATS } from '../data/portfolioData';

const STAT_CONFIG = [
  // {
  //   icon: <Sparkles className="w-6 h-6 text-sky-400" />,
  //   accent: '#38bdf8',
  //   glow: 'rgba(56, 189, 248, 0.28)',
  //   tagBg: 'group-hover:bg-sky-500/10 group-hover:text-sky-300 group-hover:border-sky-500/30',
  // },
  {
    icon: <GitBranch className="w-6 h-6 text-[#89AACC]" />,
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.28)',
    tagBg: 'group-hover:bg-[#4E85BF]/10 group-hover:text-[#89AACC] group-hover:border-[#4E85BF]/30',
  },
  {
    icon: <Flame className="w-6 h-6 text-rose-400" />,
    accent: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.28)',
    tagBg: 'group-hover:bg-rose-500/10 group-hover:text-rose-300 group-hover:border-rose-500/30',
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

    const tiltX = ((y / rect.height) - 0.5) * -16;
    const tiltY = ((x / rect.width) - 0.5) * 16;

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
    <section id="stats" className="bg-bg/80 backdrop-blur-sm py-18 md:py-28 border-y border-stroke/50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,_rgba(78,133,191,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STATS.map((stat, index) => {
            const tilt = tiltMap[index] || { x: 0, y: 0 };
            const spotlight = spotlightMap[index] || { x: 50, y: 50 };
            const isHovered = hoveredCard === index;
            const config = STAT_CONFIG[index % STAT_CONFIG.length];

            return (
              <motion.div
                key={stat.label}
                id={`stat-card-${index}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={(e) => handleMouseMove(index, e)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                    isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
                  }`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                    : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                  boxShadow: isHovered
                    ? `0 25px 50px -10px ${config.glow}, 0 0 25px 0 ${config.glow}`
                    : '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 md:p-9 rounded-3xl bg-surface/50 hover:bg-surface/85 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 overflow-hidden cursor-default select-none max-w-md md:max-w-none w-full mx-auto"
              >
                {/* 1. Real-time Cursor Spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle 260px at ${spotlight.x}% ${spotlight.y}%, ${config.glow} 0%, transparent 75%)`
                      : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* 2. Top Glowing Neon Accent Line */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2.5px] rounded-b-full transition-all duration-300"
                  style={{
                    background: isHovered ? config.accent : 'transparent',
                    boxShadow: isHovered ? `0 0 14px ${config.accent}` : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* 3. Top-Right Ambient Sheen */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-tr-3xl" />

                <div className="relative z-10">
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                      style={{
                        borderColor: isHovered ? config.accent : undefined,
                        boxShadow: isHovered ? `0 0 15px ${config.glow}` : undefined,
                      }}
                    >
                      {config.icon}
                    </div>

                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                  {/* Big Display Stat Value with Vibrant Shadow */}
                  <div className="mb-4">
                    <span
                      className="text-6xl sm:text-7xl lg:text-8xl font-display italic tracking-tight leading-none text-white block transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        textShadow: isHovered ? `0 0 35px ${config.accent}` : undefined,
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>

                  {/* Stat Label */}
                  <h3 className="text-xl font-medium text-text-primary group-hover:text-white transition-colors mb-2">
                    {stat.label}
                  </h3>

                  {/* Sublabel */}
                  <p className="text-xs sm:text-sm text-muted/90 group-hover:text-muted leading-relaxed">
                    {stat.sublabel}
                  </p>
                </div>

                {/* Bottom Badge with Micro-Animation */}
                {stat.change && (
                  <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 transition-all duration-300 ${config.tagBg}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: config.accent }}
                      />
                      <span>{stat.change}</span>
                    </span>

                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: isHovered ? config.accent : '#89AACC' }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
