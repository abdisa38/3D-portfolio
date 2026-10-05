import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Laptop, Settings, Database, Rocket, Bot, Cpu, Sparkles } from 'lucide-react';
import { TECH_STACK_CATEGORIES } from '../data/portfolioData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="w-8 h-8 text-white/90" />,
  Settings: <Settings className="w-8 h-8 text-white/90" />,
  Database: <Database className="w-8 h-8 text-white/90" />,
  Rocket: <Rocket className="w-8 h-8 text-white/90" />,
  Bot: <Bot className="w-8 h-8 text-white/90" />,
};

export const TechStackSection: React.FC = () => {
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTiltMap((prev) => ({ ...prev, [id]: { x: y, y: x } }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  return (
    <section
      id="skills"
      className="relative bg-bg/85 backdrop-blur-sm py-20 md:py-28 border-t border-stroke/40 overflow-hidden"
    >
      {/* Ambient background glow matching the dark luxury aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,_rgba(239,68,68,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(78,133,191,0.08)_0%,_transparent_70%)] pointer-events-none" />

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
            <Cpu className="w-4 h-4 text-rose-400" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {TECH_STACK_CATEGORIES.map((category, index) => {
            const tilt = tiltMap[category.id] || { x: 0, y: 0 };
            const isHighlighted = category.highlighted;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseMove={(e) => handleMouseMove(category.id, e)}
                onMouseLeave={() => handleMouseLeave(category.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className={`group relative rounded-3xl p-7 md:p-8 bg-surface/50 hover:bg-surface/85 border transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden cursor-default ${
                  isHighlighted
                    ? 'border-rose-500/40 shadow-[0_0_35px_rgba(239,68,68,0.15)] hover:border-rose-500/70'
                    : 'border-white/10 hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]'
                }`}
              >
                {/* Highlighted bottom bar indicator (as seen in reference design) */}
                {isHighlighted && (
                  <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-rose-500 rounded-t-full shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                )}

                {/* Subtle top spotlight */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none rounded-tr-3xl" />

                <div>
                  {/* Icon Area */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-white/20 transition-all duration-300">
                      {ICON_MAP[category.iconName] || <Cpu className="w-8 h-8 text-white/90" />}
                    </div>

                    <Sparkles className="w-4 h-4 text-muted/30 group-hover:text-rose-400/80 transition-colors" />
                  </div>

                  {/* Category Title with Glowing Dot */}
                  <div className="flex items-center gap-2.5 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
                    <h3 className="text-xl sm:text-2xl font-medium text-text-primary tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Pill Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-mono font-normal text-muted/90 bg-white/[0.04] border border-white/5 group-hover:border-white/10 group-hover:text-white transition-all duration-200 hover:scale-105 hover:bg-white/[0.08]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom subtle accent line */}
                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-muted/60">
                  <span>Production Ready</span>
                  <span className="text-[#89AACC]">{category.skills.length} Techs</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
