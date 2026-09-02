import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { JournalEntry } from '../types';
import { JOURNAL_ENTRIES } from '../data/portfolioData';

interface JournalSectionProps {
  onSelectArticle: (entry: JournalEntry) => void;
  onViewAllArticles: () => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  onSelectArticle,
  onViewAllArticles,
}) => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          id="journal-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                Journal & Essays
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-text-primary mb-3">
              Recent <span className="font-display italic">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Perspectives on interface design, performance engineering, and the future of human-computer interaction.
            </p>
          </div>

          {/* "View all" Button */}
          <div className="hidden md:inline-flex">
            <button
              id="view-all-journal-button"
              onClick={onViewAllArticles}
              className="group relative rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              <span className="relative z-10 inline-flex items-center gap-2 bg-surface rounded-full px-5 py-2.5 text-xs sm:text-sm text-text-primary border border-white/10 group-hover:border-transparent transition-colors">
                <span>View all essays</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* 4 Journal Entries as Horizontal Pills */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {JOURNAL_ENTRIES.map((entry, index) => {
            return (
              <motion.article
                key={entry.id}
                id={`journal-pill-${entry.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => onSelectArticle(entry)}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 md:p-5 rounded-[28px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                {/* Left: Thumbnail & Title */}
                <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-stroke relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title & Excerpt */}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-text-primary group-hover:text-white transition-colors truncate">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-muted truncate hidden sm:block mt-0.5">
                      {entry.excerpt}
                    </p>
                  </div>
                </div>

                {/* Right: Meta & Arrow */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 text-xs text-muted shrink-0 pl-16 sm:pl-0 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted/70" />
                    <span>{entry.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-muted/70" />
                    <span>{entry.readTime}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center bg-surface/80 group-hover:bg-text-primary group-hover:text-bg transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
