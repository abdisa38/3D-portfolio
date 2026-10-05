import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award } from 'lucide-react';
import { ExplorationItem } from '../types';

interface ExplorationModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const ExplorationModal: React.FC<ExplorationModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          id="exploration-modal-dialog"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl bg-surface border border-stroke rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 border-b border-stroke flex items-center justify-between bg-surface/90">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#89AACC]" />
              <span className="text-xs font-mono text-[#89AACC] uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stroke/50 hover:bg-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <div className="w-full aspect-square bg-bg relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-surface">
            <h3 className="text-xl font-light text-text-primary mb-1">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              {item.subtitle}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
