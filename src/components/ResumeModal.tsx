import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Briefcase, Award, Code, MapPin, Mail } from 'lucide-react';
import { RESUME_DETAILS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = RESUME_DETAILS.resumePdfUrl || '/assets/Abdisa_Awel_Tahir_Resume.pdf';
    a.download = 'Abdisa_Awel_Tahir_Resume.pdf';
    a.target = '_blank';
    a.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          id="resume-modal-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-surface border border-stroke rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-stroke flex items-center justify-between bg-surface/80 backdrop-blur-sm sticky top-0 z-20">
            <div>
              <span className="text-[11px] font-mono text-muted uppercase tracking-[0.2em] block mb-1">
                Curriculum Vitae
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-text-primary">
                Abdisa <span className="font-display italic">Awel</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 text-xs font-mono text-text-primary bg-stroke/60 hover:bg-stroke px-4 py-2 rounded-full border border-stroke transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#89AACC]" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-stroke/40 hover:bg-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8 text-sm">
            {/* Bio & Location Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-bg border border-stroke">
              <div className="flex items-center gap-2 text-xs font-mono text-muted">
                <MapPin className="w-4 h-4 text-[#89AACC]" />
                <span>{RESUME_DETAILS.location}</span>
              </div>
              <a
                href={`mailto:${RESUME_DETAILS.email}`}
                className="flex items-center gap-2 text-xs font-mono text-text-primary hover:text-[#89AACC] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#89AACC]" />
                <span>{RESUME_DETAILS.email}</span>
              </a>
            </div>

            <p className="text-text-primary/90 leading-relaxed">
              {RESUME_DETAILS.bio}
            </p>

            {/* Experience */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-[#89AACC]" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
                  Work Experience
                </h3>
              </div>
              <div className="space-y-4">
                {RESUME_DETAILS.experience.map((item) => (
                  <div
                    key={item.role + item.company}
                    className="p-4 rounded-2xl bg-bg/50 border border-stroke/70"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-medium text-text-primary text-base">
                        {item.role} &middot; <span className="text-muted font-normal">{item.company}</span>
                      </h4>
                      <span className="text-xs font-mono text-muted bg-stroke/40 px-2.5 py-0.5 rounded-full w-fit">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-4 h-4 text-[#89AACC]" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
                  Expertise & Toolkit
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {RESUME_DETAILS.skills.map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="p-4 rounded-2xl bg-bg/50 border border-stroke/70"
                  >
                    <h4 className="text-xs font-mono text-[#89AACC] uppercase tracking-wider mb-2">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-mono text-text-primary/90 bg-stroke/40 px-2 py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-[#89AACC]" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
                  Honors & Awards
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RESUME_DETAILS.awards.map((award) => (
                  <div
                    key={award}
                    className="flex items-center gap-3 p-3 rounded-xl bg-bg/50 border border-stroke/70 text-xs font-mono text-text-primary/90"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
