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

  return (
    <section
      id="explorations"
      className="relative bg-bg/85 backdrop-blur-sm py-20 md:py-28 border-t border-stroke/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(78,133,191,0.1)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(137,170,204,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#89AACC] animate-pulse" />
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
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/80 border border-[#4E85BF]/40 shadow-lg shadow-[#4E85BF]/15">
            {/* <ShieldCheck className="w-4 h-4 text-emerald-400" /> */}
            <span className="text-xs font-mono text-white/95 tracking-wide">
              Official Certificates &bull; 100% Verified
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" />
          </div>
        </motion.div>

        {/* 3D Certificate Grid with Enhanced Certificate Visibility & Height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {EXPLORATIONS.map((item, index) => {
            const tilt = tiltMap[item.id] || { x: 0, y: 0 };
            const spotlight = spotlightMap[item.id] || { x: 50, y: 50 };
            const isHovered = hoveredCard === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={(e) => handleMouseMove(item.id, e)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                onClick={() => onSelectExploration(item)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                    isHovered ? 'scale3d(1.025, 1.025, 1.025)' : 'scale3d(1, 1, 1)'
                  }`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                    : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                  boxShadow: isHovered
                    ? '0 25px 50px -10px rgba(78, 133, 191, 0.32), 0 0 20px rgba(78, 133, 191, 0.2)'
                    : '0 6px 24px rgba(0, 0, 0, 0.45)',
                }}
                className="group relative rounded-3xl bg-surface/60 hover:bg-surface/90 border border-white/10 hover:border-[#4E85BF]/70 p-4 shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden select-none max-w-sm sm:max-w-none w-full mx-auto"
              >
                {/* 1. Real-time Cursor Spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle 240px at ${spotlight.x}% ${spotlight.y}%, rgba(78, 133, 191, 0.2) 0%, transparent 75%)`
                      : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* 2. Top-Right Ambient Sheen */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-tr-3xl" />

                {/* 3. Certificate Paper Frame with Added Height & Full Visibility */}
                <div className="relative w-full h-56 sm:h-60 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.03] to-black/60 border border-white/10 mb-4 p-2 flex items-center justify-center group-hover:border-[#4E85BF]/50 transition-colors">
                  {/* The Certificate Paper Document (crisp, elevated, fully visible) */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/15 bg-[#0a0d14] flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Holographic light sheen gliding on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Verified Chip Badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-emerald-500/30 backdrop-blur-md shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono text-emerald-300 font-medium tracking-wider">VERIFIED</span>
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl group-hover:scale-105">
                    <span className="text-[10px] font-mono text-white/90">Inspect</span>
                    <ExternalLink className="w-3 h-3 text-[#89AACC]" />
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="relative z-10 px-1 pb-1 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#89AACC] group-hover:text-sky-300 transition-colors block mb-1 font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-base font-medium text-text-primary group-hover:text-white transition-colors leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted/80 leading-relaxed line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Bottom interactive action bar */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted/70 group-hover:text-white transition-colors">
                    <span>View credential</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
