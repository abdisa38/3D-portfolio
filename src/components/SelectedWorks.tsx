import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  onSelectProject,
  onViewAllProjects,
}) => {
  return (
    <section id="work" className="bg-bg/80 backdrop-blur-sm py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          id="work-header"
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
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-text-primary mb-3">
              Featured <span className="font-display italic">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* "View all work" Button (Desktop) */}
          <div className="hidden md:inline-flex">
            <button
              id="view-all-work-button"
              onClick={onViewAllProjects}
              className="group relative rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              <span className="relative z-10 inline-flex items-center gap-2 bg-surface rounded-full px-5 py-2.5 text-xs sm:text-sm text-text-primary border border-white/10 group-hover:border-transparent transition-colors">
                <span>View all work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Bento Grid (7 / 5 / 5 / 7) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, index) => {
            return (
              <motion.article
                key={project.id}
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => onSelectProject(project)}
                className={`group relative ${project.colSpan} ${project.aspectRatio} min-h-[300px] md:min-h-[360px] bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:border-white/20 transition-all duration-500`}
              >
                {/* Background Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Halftone Overlay */}
                <div
                  className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none"
                  aria-hidden="true"
                />

                {/* Subtle base gradient for title legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent pointer-events-none" />

                {/* Persistent Card Meta info (bottom left) */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                  <div>
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light text-text-primary">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-muted border border-stroke px-2.5 py-1 rounded-full bg-surface/80 backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>

                {/* Hover Reveal Overlay */}
                <div className="absolute inset-0 bg-bg/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center z-20">
                  {/* Category & Summary */}
                  <span className="text-xs font-mono text-muted uppercase tracking-[0.2em] mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.category}
                  </span>
                  
                  <p className="text-xs sm:text-sm text-text-primary/80 max-w-xs mb-6 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.summary}
                  </p>

                  {/* Hover label: pill with animated gradient border, white/dark bg, "View — Title" */}
                  <div className="relative group/pill p-[1.5px] rounded-full animate-gradient-shift">
                    <span className="absolute inset-0 rounded-full accent-border-gradient animate-gradient-shift" />
                    <span className="relative z-10 inline-flex items-center gap-2 bg-text-primary text-bg px-5 py-2 rounded-full font-medium text-xs sm:text-sm shadow-md">
                      <span>View —</span>
                      <span className="font-display italic text-sm sm:text-base font-normal">
                        {project.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5 group-hover/pill:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            id="mobile-view-all-work"
            onClick={onViewAllProjects}
            className="w-full relative group rounded-full p-[1.5px] cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-80" />
            <span className="relative z-10 flex items-center justify-center gap-2 bg-surface rounded-full px-6 py-3 text-sm text-text-primary">
              <span>View all work</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
