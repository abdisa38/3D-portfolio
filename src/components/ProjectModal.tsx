import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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
          id="project-modal-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-surface border border-stroke rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-stroke flex items-center justify-between bg-surface/90 backdrop-blur-sm sticky top-0 z-20">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted uppercase tracking-[0.2em] block mb-1">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-text-primary">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-stroke/50 hover:bg-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8">
            {/* Hero Image */}
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-stroke relative group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-bg border border-stroke text-xs font-mono">
              <div className="flex items-center gap-2 text-muted">
                <Calendar className="w-4 h-4 text-[#89AACC]" />
                <span>Year: <strong className="text-text-primary font-normal">{project.year}</strong></span>
              </div>
              {project.client && (
                <div className="flex items-center gap-2 text-muted">
                  <User className="w-4 h-4 text-[#89AACC]" />
                  <span>Client: <strong className="text-text-primary font-normal">{project.client}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted col-span-2 sm:col-span-1">
                <Tag className="w-4 h-4 text-[#89AACC]" />
                <span>Role: <strong className="text-text-primary font-normal">Lead Engineering</strong></span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                Overview & Architecture
              </h3>
              <p className="text-sm md:text-base text-text-primary/90 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Deliverables */}
            {project.deliverables && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                  Key Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.deliverables.map((item) => (
                    <div
                      key={item}
                      className="p-3 rounded-xl bg-bg border border-stroke text-xs font-mono text-text-primary/90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Tags */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-3">
                Stack & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-text-primary bg-stroke/60 px-3 py-1.5 rounded-full border border-stroke"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links / CTAs */}
            {(project.demo || project.github) && (
              <div className="pt-4 border-t border-stroke flex items-center gap-4 flex-wrap">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-surface hover:bg-stroke text-text-primary border border-stroke px-6 py-3 rounded-full text-xs font-mono transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
