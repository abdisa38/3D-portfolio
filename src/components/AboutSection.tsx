import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Terminal,
  Server,
  Users,
  Brain,
  ShieldCheck,
  ArrowUpRight,
  Award,
  Download,
  FileText,
  Code2,
} from 'lucide-react';

interface EngineeringPillar {
  id: string;
  title: string;
  metric: string;
  description: string;
  accent: string;
  glow: string;
  icon: React.ReactNode;
  tags: string[];
}

interface CareerStep {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  accent: string;
  glow: string;
  icon: React.ReactNode;
  tags: string[];
}

const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    id: 'pillar-backend',
    title: 'Enterprise APIs & Distributed Data',
    metric: '-30% Latency Benchmark',
    description:
      'Designing REST & GraphQL services in Node.js/Express. Audited MongoDB aggregation queries and applied compound indexing to reduce API response latency by 30%.',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.22)',
    icon: <Server className="w-5 h-5 text-sky-400" />,
    tags: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'pillar-frontend',
    title: 'Creative 60fps Web & UI Systems',
    metric: 'WebGL & Interactive Motion',
    description:
      'Developing responsive React & TypeScript platforms with Three.js WebGL particle physics, Tailwind CSS v4, and hardware-accelerated motion mechanics.',
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.25)',
    icon: <Terminal className="w-5 h-5 text-[#89AACC]" />,
    tags: ['React', 'TypeScript', 'Three.js', 'Tailwind'],
  },
  {
    id: 'pillar-ai',
    title: 'Autonomous Systems & LLM Integrations',
    metric: 'RAG & Intelligent Search',
    description:
      'Building generative workflows with Google Gemini AI and vector semantic discovery, enabling conversational property matching and intelligent campus verification.',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    tags: ['Gemini AI', 'Vector Search', 'Agents', 'LLMs'],
  },
  {
    id: 'pillar-leadership',
    title: 'MWU CTC Club Technical Leadership',
    metric: '80+ Student Developers',
    description:
      'Directing software architecture, conducting test-driven PR reviews, and running full-stack bootcamps for student engineers shipping production software.',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    icon: <Users className="w-5 h-5 text-emerald-400" />,
    tags: ['System Architecture', 'Code Reviews', 'Mentorship'],
  },
];

const CAREER_STEPS: CareerStep[] = [
  {
    id: 'step-4',
    period: '2024 - PRESENT',
    role: 'AI Engineering & Next-Gen Systems',
    organization: 'Madda Walabu University',
    description:
      'Advanced into specialized AI Engineering via Scrimba AI program. Architecting autonomous LLM agents, vector embeddings, and resilient micro-frontends.',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    icon: <Brain className="w-4 h-4 text-purple-400" />,
    tags: ['AI Agents', 'Vector Search', 'Full-Stack'],
  },
  {
    id: 'step-3',
    period: '3RD YEAR - PRESENT',
    role: 'CTC Software Development Leader',
    organization: 'Madda Walabu University',
    description:
      'Directing system architecture and production deployment for campus software initiatives including MWU CMS and the CTC Learning Platform.',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    icon: <Users className="w-4 h-4 text-emerald-400" />,
    tags: ['Tech Lead', 'System Architecture', 'Node.js'],
  },
  {
    id: 'step-2',
    period: '2025 - 3 MONTHS',
    role: 'Backend Engineering Intern',
    organization: 'Kuraz Technologies',
    description:
      'Engineered core backend services in Node.js/Express. Audited complex MongoDB queries & added compound indexes to lower endpoint latency by 30%.',
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.25)',
    icon: <Server className="w-4 h-4 text-[#89AACC]" />,
    tags: ['REST APIs', 'MongoDB', 'Performance'],
  },
  {
    id: 'step-1',
    period: 'FRESHMAN - 2ND YEAR',
    role: 'Foundations & Bootcamp Immersion',
    organization: 'Evangadi Tech & Wabiskills',
    description:
      'Completed an intensive 6-month full-stack immersion across Evangadi Bootcamp and WabiSkills, mastering computer science principles and MERN architecture.',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.22)',
    icon: <Terminal className="w-4 h-4 text-sky-400" />,
    tags: ['MERN Stack', 'CS Core', 'JavaScript'],
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
      className="relative bg-bg/85 backdrop-blur-sm py-20 md:py-28 border-t border-stroke/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle,_rgba(78,133,191,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(137,170,204,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
              <Code2 className="w-3.5 h-3.5 text-[#89AACC]" />
              <span className="text-[11px] text-muted uppercase tracking-[0.25em] font-mono">
                Identity & Engineering Craft
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.15]">
              Architecting scalable software with{' '}
              <span className="font-display italic text-[#89AACC]">discipline</span> &{' '}
              <span className="font-display italic">precision.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed">
            Full-stack engineer and CTC Software Development Leader at Madda Walabu University. Specialized in high-performance Node.js backends, modern reactive interfaces, and intelligent AI workflows.
          </p>
        </motion.div>

        {/* Top Bento Row: Executive Profile Card + 4 Engineering Disciplines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          {/* Left: Executive Engineer Profile Card (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseMove={(e) => handleMouseMove('profile-card', e)}
            onMouseEnter={() => handleMouseEnter('profile-card')}
            onMouseLeave={() => handleMouseLeave('profile-card')}
            style={{
              transform: `perspective(1000px) rotateX(${tiltMap['profile-card']?.x || 0}deg) rotateY(${tiltMap['profile-card']?.y || 0}deg) ${
                hoveredCard === 'profile-card' ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
              }`,
              transition: hoveredCard === 'profile-card'
                ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                : 'transform 0.5s ease-out, box-shadow 0.5s ease',
              boxShadow: hoveredCard === 'profile-card'
                ? '0 25px 50px -12px rgba(78, 133, 191, 0.28), 0 0 25px rgba(78, 133, 191, 0.15)'
                : '0 8px 30px rgba(0, 0, 0, 0.4)',
            }}
            className="lg:col-span-5 rounded-3xl p-6 sm:p-7 bg-surface/60 hover:bg-surface/85 border border-white/10 hover:border-[#4E85BF]/60 backdrop-blur-md flex flex-col justify-between transition-colors duration-300 relative overflow-hidden select-none"
          >
            {/* Ambient Corner Sheen */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-tr-3xl" />

            <div className="relative z-10">
              {/* Profile Header Row: Avatar & Live Badge */}
              <div className="flex items-start gap-4 sm:gap-5 mb-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-bg border-2 border-white/20 shadow-xl shrink-0 group">
                  <img
                    src="/assets/Abdisa Awel profile.jpg"
                    alt="Abdisa Awel"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex flex-col">
                  {/* Status beacon */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono mb-2 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open to Opportunities</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                    Abdisa Awel Tahir
                  </h3>
                  <p className="text-xs font-mono text-[#89AACC] mt-0.5">
                    Full-Stack & CTC Tech Lead
                  </p>
                </div>
              </div>

              {/* Developer DNA Narrative */}
              <p className="text-xs sm:text-sm text-text-primary/90 leading-relaxed mb-5 font-light">
                Engineering fast, resilient systems from the ground up. Whether optimizing database queries for high throughput or crafting immersive 3D interfaces, I build software that performs cleanly under real load.
              </p>

              {/* Quick Credentials / Facts */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.08] text-xs font-mono text-muted">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#89AACC] shrink-0" />
                  <span>Addis Ababa, Ethiopia &middot; Open to Remote & Relocation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#89AACC] shrink-0" />
                  <span>B.Sc. Computer Science (Class of &apos;27) @ MWU</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#89AACC] shrink-0" />
                  <span>2+ Years Production Experience across Full-Stack & Cloud</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 pt-5 mt-5 border-t border-white/[0.08] flex items-center gap-3">
              <a
                href="/assets/Abdisa_Awel_Tahir_Resume.pdf"
                download="Abdisa_Awel_Tahir_Resume.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#89AACC]" />
                <span>Resume (PDF)</span>
              </a>
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Say Hello</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right: 4 Core Engineering Discipline Cards (lg:col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENGINEERING_PILLARS.map((pillar, idx) => {
              const tilt = tiltMap[pillar.id] || { x: 0, y: 0 };
              const spotlight = spotlightMap[pillar.id] || { x: 50, y: 50 };
              const isHovered = hoveredCard === pillar.id;

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseMove={(e) => handleMouseMove(pillar.id, e)}
                  onMouseEnter={() => handleMouseEnter(pillar.id)}
                  onMouseLeave={() => handleMouseLeave(pillar.id)}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                      isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                    }`,
                    transition: isHovered
                      ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
                      : 'transform 0.4s ease-out, box-shadow 0.4s ease',
                    boxShadow: isHovered
                      ? `0 20px 40px -10px ${pillar.glow}, 0 0 20px 0 ${pillar.glow}`
                      : '0 4px 18px rgba(0, 0, 0, 0.35)',
                  }}
                  className="group relative rounded-3xl p-5 sm:p-6 bg-surface/50 hover:bg-surface/85 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default select-none"
                >
                  {/* Spotlight */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                    style={{
                      background: isHovered
                        ? `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, ${pillar.glow} 0%, transparent 75%)`
                        : 'none',
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Top neon indicator */}
                  <div
                    className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full transition-all duration-300"
                    style={{
                      background: isHovered ? pillar.accent : 'transparent',
                      boxShadow: isHovered ? `0 0 10px ${pillar.accent}` : 'none',
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5">
                      <div
                        className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{
                          borderColor: isHovered ? pillar.accent : undefined,
                          boxShadow: isHovered ? `0 0 12px ${pillar.glow}` : undefined,
                        }}
                      >
                        {pillar.icon}
                      </div>

                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10"
                        style={{ color: isHovered ? pillar.accent : '#89AACC' }}
                      >
                        {pillar.metric}
                      </span>
                    </div>

                    <h4 className="text-base font-medium text-text-primary group-hover:text-white transition-colors mb-2">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-muted/90 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="relative z-10 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-muted/80 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-md transition-colors group-hover:border-white/10 group-hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bento Row: Executive Experience & Milestone Roadmap (Changelog Format) */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
            <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#89AACC]" />
              <span>Career Milestones & Leadership Track Record</span>
            </span>
            <span className="text-[11px] font-mono text-[#89AACC] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              4 Verified Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseMove={(e) => handleMouseMove(step.id, e)}
                  onMouseEnter={() => handleMouseEnter(step.id)}
                  onMouseLeave={() => handleMouseLeave(step.id)}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                      isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                    }`,
                    transition: isHovered
                      ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
                      : 'transform 0.4s ease-out, box-shadow 0.4s ease',
                    boxShadow: isHovered
                      ? `0 18px 35px -10px ${step.glow}, 0 0 18px 0 ${step.glow}`
                      : '0 4px 16px rgba(0, 0, 0, 0.35)',
                  }}
                  className="group relative rounded-2xl p-5 bg-surface/50 hover:bg-surface/85 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default select-none"
                >
                  {/* Spotlight */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: isHovered
                        ? `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, ${step.glow} 0%, transparent 75%)`
                        : 'none',
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Left glowing border on hover */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[2.5px] rounded-r-full transition-all duration-300"
                    style={{
                      backgroundColor: step.accent,
                      boxShadow: isHovered ? `0 0 10px ${step.accent}` : 'none',
                      opacity: isHovered ? 1 : 0.3,
                    }}
                  />

                  <div className="relative z-10 pl-1.5">
                    {/* Period & Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
                        style={{ color: isHovered ? step.accent : '#89AACC' }}
                      >
                        {step.period}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center"
                        style={{ borderColor: isHovered ? step.accent : undefined }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors leading-snug mb-1">
                      {step.role}
                    </h4>
                    <p className="text-[11px] font-mono text-muted/80 mb-2.5">
                      {step.organization}
                    </p>

                    <p className="text-xs text-muted/90 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="relative z-10 pl-1.5 flex flex-wrap gap-1 pt-2.5 border-t border-white/[0.06]">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-muted/70 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
