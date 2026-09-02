import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, BookOpen } from 'lucide-react';
import { JournalEntry } from '../types';

interface ArticleModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          id="article-modal-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-surface border border-stroke rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-6 md:p-8 border-b border-stroke flex items-center justify-between bg-surface/90 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#89AACC] uppercase tracking-[0.2em]">
                {entry.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-stroke/50 hover:bg-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-text-primary tracking-tight leading-snug">
              {entry.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6 text-xs font-mono text-muted border-y border-stroke/60 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#89AACC]" />
                <span>{entry.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#89AACC]" />
                <span>{entry.readTime}</span>
              </div>
            </div>

            {/* Feature Image */}
            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-stroke">
              <img
                src={entry.image}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content text */}
            <div className="text-base text-text-primary/90 leading-relaxed space-y-4 whitespace-pre-line font-light">
              {entry.content}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
