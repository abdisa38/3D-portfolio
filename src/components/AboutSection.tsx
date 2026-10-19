import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, GraduationCap, Terminal, Server, Users, Brain, CheckCircle2, Award, Code, Sparkles, ChevronRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface CareerStep {
  id: string;
  stepNumber: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  metric: string;
  accent: string;
  glow: string;
  icon: React.ReactNode;
  tags: string[];
}

const CAREER_STEPS: CareerStep[] = [
  {
    id: 'step-4',
    stepNumber: '01',
    period: '4th Year & Beyond',
    role: 'AI Engineering & Autonomous Systems',
    organization: 'Madda Walabu University / Scrimba AI',
    description:
      'Architecting intelligent enterprise workflows, LLM-powered autonomous agents, and vector embeddings search pipelines with real-time reactive interfaces.',
    metric: 'LLM Agents & Vector Search Pipelines',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    icon: <Brain className="w-4 h-4 text-purple-400" />,
    tags: ['LangChain', 'Gemini AI API', 'Vector Embeddings', 'Autonomous Agents', 'Next.js'],
  },
  {
    id: 'step-3',
    stepNumber: '02',
    period: '3rd Year - Present',
    role: 'CTC Software Development Leader',
    organization: 'Madda Walabu University',
    description:
      'Directing system architecture, conducting production code reviews, and mentoring 80+ student developers across the campus LMS and digital clearance platforms.',
    metric: '80+ Student Engineers Mentored',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    icon: <Users className="w-4 h-4 text-emerald-400" />,
    tags: ['System Architecture', 'Code Reviews', 'Socket.io', 'MERN Platform', 'Team Leadership'],
  },
  {
    id: 'step-2',
    stepNumber: '03',
    period: '2025 - 3 Months',
    role: 'Backend Engineering Intern',
    organization: 'Kuraz Technologies',
    description:
      'Collaborated with senior backend engineers building scalable REST endpoints in Node.js/Express. Audited MongoDB aggregation queries and implemented compound indexes.',
    metric: '30% Reduction in Query Latency',
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.25)',
    icon: <Server className="w-4 h-4 text-[#89AACC]" />,
    tags: ['Node.js', 'Express', 'MongoDB Indexing', 'RESTful APIs', 'Query Profiling'],
  },
  {
    id: 'step-1',
    stepNumber: '04',
    period: 'Freshman - 2nd Year',
    role: 'Full-Stack Foundations & Immersion',
    organization: 'Evangadi Tech & Wabiskills',
    description:
      'Completed an intensive 6-month software engineering fellowship mastering modern computer science fundamentals, data structures, algorithms, and full-stack MERN engineering.',
    metric: 'Certified Full-Stack Engineer',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.22)',
    icon: <Terminal className="w-4 h-4 text-sky-400" />,
    tags: ['Data Structures', 'Modern JavaScript', 'React', 'Database Design', 'Git Workflows'],
  },
];

export const AboutSection: React.FC = () => {
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});
  const [spotlightMap, setSpotlightMap] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y / rect.height) - 0.5) * -12;
    const tiltY = ((x / rect.width) - 0.5) * 12;

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
      id="about"
      className="relative bg-bg/85 backdrop-blur-sm py-16 md:py-24 border-t border-stroke/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(78,133,191,0.07)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(137,170,204,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
                ENGINEERING IDENTITY & VECTORS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-text-primary">
              Engineering resilient systems, <br className="hidden sm:inline" />
              <span className="font-display italic">mentoring the next generation.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-muted max-w-md leading-relaxed">
            Full-stack software developer and CTC Tech Lead at Madda Walabu University. Specializing in high-throughput cloud backends, reactive interfaces, and autonomous AI architectures with a focus on production reliability.
          </p>
        </motion.div>

        {/* 2-Column Senior Developer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Developer Command Center & Identity (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-24 max-w-md mx-auto w-full lg:max-w-none">
            {/* 1. Developer Profile Card (Sleek, Compact & Authentic) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              onMouseMove={(e) => handleMouseMove('profile-card', e)}
              onMouseEnter={() => handleMouseEnter('profile-card')}
              onMouseLeave={() => handleMouseLeave('profile-card')}
              style={{
                transform: `perspective(1000px) rotateX(${tiltMap['profile-card']?.x || 0}deg) rotateY(${tiltMap['profile-card']?.y || 0}deg) ${
                  hoveredCard === 'profile-card' ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                }`,
                transition: hoveredCard === 'profile-card'
                  ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
                  : 'transform 0.4s ease-out, box-shadow 0.4s ease',
                boxShadow: hoveredCard === 'profile-card'
                  ? '0 20px 40px -10px rgba(78, 133, 191, 0.3)'
                  : '0 6px 24px rgba(0, 0, 0, 0.4)',
              }}
              className="group relative rounded-2xl p-4 sm:p-5 bg-surface/65 hover:bg-surface/90 border border-white/10 hover:border-[#4E85BF]/60 backdrop-blur-md overflow-hidden transition-all duration-300 cursor-default select-none"
            >
              {/* Dynamic Cursor Spotlight */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
                style={{
                  background: hoveredCard === 'profile-card'
                    ? `radial-gradient(circle 220px at ${spotlightMap['profile-card']?.x || 50}% ${spotlightMap['profile-card']?.y || 50}%, rgba(78, 133, 191, 0.2) 0%, transparent 75%)`
                    : 'none',
                  opacity: hoveredCard === 'profile-card' ? 1 : 0,
                }}
              />

              <div className="relative z-10 flex items-center gap-4">
                {/* Profile Photo Thumbnail with Active Status Ring */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-xl bg-bg">
                  <img
                    src="/assets/Abdisa Awel profile.jpg"
                    alt="Abdisa Awel"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Developer Persona & Vitals */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-medium text-white tracking-tight truncate">
                      Abdisa Awel
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <p className="text-xs font-mono text-[#89AACC] truncate mb-1">
                    Full-Stack Developer & CTC Tech Lead
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted/80">
                    <MapPin className="w-3 h-3 text-[#89AACC] shrink-0" />
                    <span className="truncate">Addis Ababa, ET &bull; Remote Ready</span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted/80">
                <span className="inline-flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Available for Select Contracts
                </span>
                <span className="text-[#89AACC]">Class of &apos;27</span>
              </div>
            </motion.div>

            {/* 2. Developer Interactive Code Terminal (Real Software Engineering Vibe) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl bg-[#0b0e14]/90 border border-white/10 shadow-2xl overflow-hidden font-mono text-xs"
            >
              {/* Terminal Header */}
              <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] text-muted tracking-wider">engineer.spec.ts</span>
                <Code className="w-3.5 h-3.5 text-[#89AACC]/60" />
              </div>

              {/* Code Snippet Body */}
              <div className="p-4 space-y-1.5 text-[11px] leading-relaxed overflow-x-auto text-muted/90">
                <p>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-sky-300">abdisa</span>:{' '}
                  <span className="text-amber-300">LeadEngineer</span> = {'{'}
                </p>
                <p className="pl-3">
                  <span className="text-[#89AACC]">role</span>:{' '}
                  <span className="text-emerald-300">&quot;Full-Stack & Systems Developer&quot;</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#89AACC]">leadership</span>:{' '}
                  <span className="text-emerald-300">&quot;CTC Tech Leader @ MWU&quot;</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#89AACC]">stack</span>: [
                  <span className="text-amber-200">&quot;TypeScript&quot;</span>,{' '}
                  <span className="text-amber-200">&quot;Node.js&quot;</span>,{' '}
                  <span className="text-amber-200">&quot;React&quot;</span>,{' '}
                  <span className="text-amber-200">&quot;Docker&quot;</span>],
                </p>
                <p className="pl-3">
                  <span className="text-[#89AACC]">aiFocus</span>:{' '}
                  <span className="text-emerald-300">&quot;LLM Autonomous Agents & Vector Search&quot;</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#89AACC]">ethos</span>:{' '}
                  <span className="text-emerald-300">&quot;Clean abstractions &amp; high reliability&quot;</span>,
                </p>
                <p>{'};'}</p>
              </div>
            </motion.div>

            {/* 3. Engineering Pillars Micro-Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-surface/50 border border-white/5 hover:border-white/15 transition-colors">
                <div className="flex items-center gap-2 mb-1.5 text-sky-400 font-mono text-[11px]">
                  <Server className="w-3.5 h-3.5" />
                  <span>Systems & Cloud</span>
                </div>
                <p className="text-[11px] text-muted/80 leading-normal">
                  High-throughput REST/GraphQL APIs, indexing optimizations, modular schemas.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/50 border border-white/5 hover:border-white/15 transition-colors">
                <div className="flex items-center gap-2 mb-1.5 text-emerald-400 font-mono text-[11px]">
                  <Users className="w-3.5 h-3.5" />
                  <span>Tech Leadership</span>
                </div>
                <p className="text-[11px] text-muted/80 leading-normal">
                  Directing 80+ student engineers at MWU, PR code reviews, and agile sprints.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Connected Engineering Circuit Timeline (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
              <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#89AACC]" />
                <span>Production Experience & Leadership Roadmap</span>
              </span>
              <span className="text-[11px] font-mono text-[#89AACC] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                4 Key Phases
              </span>
            </div>

            {/* Circuit Timeline Cards */}
            <div className="space-y-4">
              {CAREER_STEPS.map((step, idx) => {
                const tilt = tiltMap[step.id] || { x: 0, y: 0 };
                const spotlight = spotlightMap[step.id] || { x: 50, y: 50 };
                const isHovered = hoveredCard === step.id;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    onMouseMove={(e) => handleMouseMove(step.id, e)}
                    onMouseEnter={() => handleMouseEnter(step.id)}
                    onMouseLeave={() => handleMouseLeave(step.id)}
                    style={{
                      transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                        isHovered ? 'scale3d(1.015, 1.015, 1.015)' : 'scale3d(1, 1, 1)'
                      }`,
                      transition: isHovered
                        ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
                        : 'transform 0.4s ease-out, box-shadow 0.4s ease',
                      boxShadow: isHovered
                        ? `0 16px 36px -8px ${step.glow}, 0 0 16px 0 ${step.glow}`
                        : '0 4px 18px rgba(0, 0, 0, 0.35)',
                    }}
                    className="group relative rounded-2xl p-5 sm:p-6 bg-surface/50 hover:bg-surface/85 border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden cursor-default select-none flex flex-col justify-between"
                  >
                    {/* 1. Dynamic Cursor Spotlight */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
                      style={{
                        background: isHovered
                          ? `radial-gradient(circle 240px at ${spotlight.x}% ${spotlight.y}%, ${step.glow} 0%, transparent 75%)`
                          : 'none',
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    {/* 2. Left Glowing Indicator Bar on Hover */}
                    <div
                      className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full transition-all duration-300"
                      style={{
                        backgroundColor: step.accent,
                        boxShadow: isHovered ? `0 0 12px ${step.accent}` : 'none',
                        opacity: isHovered ? 1 : 0.3,
                      }}
                    />

                    <div className="relative z-10 pl-2">
                      {/* Top Header Row with Index, Role, Organization & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                        <div className="flex items-center gap-3">
                          {/* Step Index Circle */}
                          <div
                            className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-xs font-semibold transition-all duration-300"
                            style={{
                              borderColor: isHovered ? step.accent : undefined,
                              color: isHovered ? step.accent : '#89AACC',
                            }}
                          >
                            {step.stepNumber}
                          </div>

                          <div>
                            <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-white transition-colors leading-snug">
                              {step.role}
                            </h3>
                            <p className="text-xs font-mono text-muted/90">
                              {step.organization}
                            </p>
                          </div>
                        </div>

                        {/* Period Tag */}
                        <span
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 transition-colors"
                          style={{
                            color: isHovered ? step.accent : '#89AACC',
                            borderColor: isHovered ? `${step.accent}55` : undefined,
                          }}
                        >
                          {step.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted/90 leading-relaxed mb-3 mt-2">
                        {step.description}
                      </p>

                      {/* Key Metric Highlight */}
                      <div className="flex items-center gap-2 mb-3 text-[11px] font-mono" style={{ color: step.accent }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.accent }} />
                        <span>{step.metric}</span>
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/[0.04]">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-muted/80 bg-white/[0.03] border border-white/5 px-2.5 py-0.5 rounded-md transition-all duration-200 hover:scale-105 hover:bg-white/[0.08] hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
