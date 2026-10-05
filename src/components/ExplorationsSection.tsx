import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award, ShieldCheck } from 'lucide-react';
import { ExplorationItem } from '../types';
import { EXPLORATIONS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationsSectionProps {
  onSelectExploration: (item: ExplorationItem) => void;
}

export const ExplorationsSection: React.FC<ExplorationsSectionProps> = ({
  onSelectExploration,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinnedContent = pinnedContentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!container || !pinnedContent || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      // 1. Pin the center title layer
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContent,
        pinSpacing: false,
      });

      // 2. Parallax columns movement
      gsap.fromTo(
        col1,
        { y: '10%' },
        {
          y: '-25%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        col2,
        { y: '25%' },
        {
          y: '-35%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const col1Items = EXPLORATIONS.filter((item) => item.column === 1);
  const col2Items = EXPLORATIONS.filter((item) => item.column === 2);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[200vh] md:min-h-[230vh] bg-bg/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen flex flex-col justify-center items-center text-center px-6 pointer-events-none z-10"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-[#89AACC]" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
              Accreditations & Honors
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-text-primary mb-4">
            Verified <span className="font-display italic">credentials</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted max-w-md mb-8 leading-relaxed">
            Industry-recognized software certifications, enterprise backend training, and venture incubation distinctions backing production craft.
          </p>

          {/* LinkedIn Button (Pointer events active) */}
          <div className="pointer-events-auto">
            <a
              href="https://www.linkedin.com/in/abdisa-awel-92b963383/"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              <span className="relative z-10 inline-flex items-center gap-2 bg-surface/90 backdrop-blur-md rounded-full px-6 py-3 text-xs sm:text-sm text-text-primary border border-white/10 group-hover:border-transparent transition-colors">
                <ShieldCheck className="w-4 h-4 text-[#89AACC]" />
                <span>Verify on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute/relative overlay) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex justify-center items-start pt-24 pb-32">
        <div className="w-full max-w-[1400px] px-4 sm:px-8 md:px-12 grid grid-cols-2 gap-8 sm:gap-14 md:gap-32 lg:gap-44">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-24 sm:gap-36 md:gap-48 items-center sm:items-start">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectExploration(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="pointer-events-auto w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl md:rounded-3xl bg-surface border border-stroke p-2 sm:p-2.5 overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-0 hover:border-white/30 cursor-pointer group"
              >
                <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#89AACC]">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-24 sm:gap-36 md:gap-48 items-center sm:items-end pt-32 sm:pt-48">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectExploration(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="pointer-events-auto w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl md:rounded-3xl bg-surface border border-stroke p-2 sm:p-2.5 overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-0 hover:border-white/30 cursor-pointer group"
              >
                <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#89AACC]">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
