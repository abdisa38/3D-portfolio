import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { ExplorationItem } from '../types';
import { EXPLORATIONS } from '../data/portfolioData';

interface ExplorationsSectionProps {
  onSelectExploration: (item: ExplorationItem) => void;
}

export const ExplorationsSection: React.FC<ExplorationsSectionProps> = ({
  onSelectExploration,
}) => {
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTiltMap((prev) => ({ ...prev, [id]: { x: y, y: x } }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltMap((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  return (
    <section
      id="explorations"
      className="relative bg-bg/85 backdrop-blur-sm py-20 md:py-28 border-t border-stroke/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(78,133,191,0.09)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#89AACC]" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
              Accreditations & Honors
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary mb-4">
            Verified <span className="font-display italic">credentials</span>
          </h2>

          <p className="text-sm md:text-base text-muted leading-relaxed">
            Industry-recognized software certifications, enterprise backend training, and venture incubation distinctions backing production craft.
          </p>

          {/* Central 3D Verification Badge */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/80 border border-[#4E85BF]/30 shadow-lg shadow-[#4E85BF]/10">
            {/* <ShieldCheck className="w-4 h-4 text-emerald-400" /> */}
            <span className="text-xs font-mono text-white/90 tracking-wide">
              Official Certificates &bull; 100% Verified
            </span>
            {/* <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" /> */}
          </div>
        </motion.div>

        {/* 3D Certificate Grid (Balanced layout, zero dead space) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {EXPLORATIONS.map((item, index) => {
            const tilt = tiltMap[item.id] || { x: 0, y: 0 };

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseMove={(e) => handleMouseMove(item.id, e)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                onClick={() => onSelectExploration(item)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="group relative rounded-3xl bg-surface/60 hover:bg-surface/90 border border-white/10 hover:border-[#4E85BF]/50 p-3 sm:p-3.5 shadow-2xl hover:shadow-[0_0_35px_rgba(78,133,191,0.2)] transition-colors duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Glow ring on hover */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-[#89AACC]/20 to-[#4E85BF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Certificate Image Frame */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg border border-white/5 mb-3.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Verified chip */}
                  {/* <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/10 backdrop-blur-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-mono text-white/90">Verified</span>
                  </div> */}

                  {/* View indicator */}
                  <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-1 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#89AACC] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-medium text-text-primary group-hover:text-white transition-colors leading-snug mb-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {item.subtitle}
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

