import React from 'react';
import { motion } from 'motion/react';
import { STATS } from '../data/portfolioData';

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="bg-bg/80 backdrop-blur-sm py-16 md:py-24 border-y border-stroke/50 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, index) => {
            return (
              <motion.div
                key={stat.label}
                id={`stat-card-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-start p-6 md:p-8 rounded-3xl bg-surface/40 border border-stroke hover:border-white/20 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle top accent gradient line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Big Display Stat Value */}
                <span className="text-6xl sm:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight leading-none mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {stat.value}
                </span>

                {/* Stat Label */}
                <h3 className="text-lg sm:text-xl font-medium text-text-primary mb-1">
                  {stat.label}
                </h3>

                {/* Sublabel */}
                <p className="text-xs sm:text-sm text-muted mb-4 leading-relaxed">
                  {stat.sublabel}
                </p>

                {/* Badge */}
                {stat.change && (
                  <span className="mt-auto text-[11px] font-mono text-muted/80 bg-stroke/50 px-3 py-1 rounded-full border border-stroke">
                    {stat.change}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
