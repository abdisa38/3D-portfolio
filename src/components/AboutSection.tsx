import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, GraduationCap, Sparkles, Terminal, Server, Users, Brain, CheckCircle2, Award } from 'lucide-react';

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

const CAREER_STEPS: CareerStep[] = [
  {
    id: 'step-1',
    period: 'Freshman - 2nd Year',
    role: 'Foundations & Bootcamp Immersion',
    organization: 'Evangadi Tech & Wabiskills',
    description:
      'Began my software engineering journey at university, completing an intensive 6 month full-stack immersion across the Evangadi Full-Stack Bootcamp and WabiSkills mastering core computer science, modern JavaScript, and MERN stack architectures.',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.22)',
    icon: <Terminal className="w-5 h-5 text-sky-400" />,
    tags: [],
  },
  {
    id: 'step-2',
    period: '2025 - 3 Months',
    role: 'Backend Engineering Intern',
    organization: 'Kuraz Technologies',
    description:
      'Worked with the core backend team building REST APIs in Node.js/Express. Audited MongoDB aggregation queries and added compound indexes to lower endpoint latency by 30%.',
    accent: '#4E85BF',
    glow: 'rgba(78, 133, 191, 0.25)',
    icon: <Server className="w-5 h-5 text-[#89AACC]" />,
    tags: []
  },
  {
    id: 'step-3',
    period: '3rd Year - Present',
    role: 'CTC Software Development Leader @ MWU',
    organization: 'Software Development Leader',
    description:
      'Appointed Software Development Leader for the CTC Club at Madda Walabu University. Directing system architecture, conducting code reviews, and mentoring fellow student engineers in production engineering standards.',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    icon: <Users className="w-5 h-5 text-emerald-400" />,
    tags: [],
  },
  {
    id: 'step-4',
    period: '4th Year & Beyond',
    role: 'AI Engineering & Autonomous Systems',
    organization: 'Madda Walabu University',
    description:
      'Advanced into specialized AI Engineering via ScrimbaAI Engineer program. Actively architecting large scale intelligent systems, LLM powered autonomous agents, vector search pipelines, and cutting edge software.',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.25)',
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    tags: [],
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

    const tiltX = ((y / rect.height) - 0.5) * -14;
    const tiltY = ((x / rect.width) - 0.5) * 14;

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
      className="relative bg-bg/80 backdrop-blur-sm py-16 md:py-24 border-t border-stroke/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(78,133,191,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(137,170,204,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                About Me
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-text-primary">
              Crafting software & <span className="font-display italic">leading teams</span>
            </h2>
          </div>

          <p className="text-sm text-muted max-w-md leading-relaxed">
            Full-stack engineer and CTC Tech Lead at Madda Walabu University. Passionate about building fast, reliable web applications and helping student developers ship real code.
          </p>
        </motion.div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Profile Card & Quick Context (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28 max-w-md mx-auto w-full lg:max-w-none">
            {/* Portrait Frame Card with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseMove={(e) => handleMouseMove('portrait', e)}
              onMouseEnter={() => handleMouseEnter('portrait')}
              onMouseLeave={() => handleMouseLeave('portrait')}
              style={{
                transform: `perspective(1000px) rotateX(${tiltMap['portrait']?.x || 0}deg) rotateY(${tiltMap['portrait']?.y || 0}deg) ${
                  hoveredCard === 'portrait' ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                }`,
                transition: hoveredCard === 'portrait'
                  ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                  : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                boxShadow: hoveredCard === 'portrait'
                  ? '0 25px 50px -12px rgba(78, 133, 191, 0.3), 0 0 25px rgba(78, 133, 191, 0.2)'
                  : '0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
              className="group relative rounded-3xl p-2.5 bg-surface/70 hover:bg-surface/90 border border-white/10 hover:border-[#4E85BF]/60 backdrop-blur-md overflow-hidden shadow-2xl transition-colors duration-300 cursor-default select-none"
            >
              <div className="relative aspect-[4/4.6] sm:aspect-[4/4.8] rounded-2xl overflow-hidden bg-bg">
                <img
                  src="/assets/Abdisa Awel profile.jpg"
                  alt="Abdisa Awel"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent opacity-90" />

                {/* Holographic light sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Live Status Badge */}
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                  {/* <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> */}
                  {/* <span className="text-[11px] font-mono text-white/90">Available for Opportunities</span> */}
                </div>

                {/* Profile info on card bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                      Abdisa Awel
                    </span>
                    {/* <Sparkles className="w-4 h-4 text-[#89AACC] opacity-80" /> */}
                  </div>
                  <span className="text-xs font-mono text-[#89AACC]">
                    Full-Stack Developer & CTC Tech Lead
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Context Card with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseMove={(e) => handleMouseMove('at-a-glance', e)}
              onMouseEnter={() => handleMouseEnter('at-a-glance')}
              onMouseLeave={() => handleMouseLeave('at-a-glance')}
              style={{
                transform: `perspective(1000px) rotateX(${tiltMap['at-a-glance']?.x || 0}deg) rotateY(${tiltMap['at-a-glance']?.y || 0}deg) ${
                  hoveredCard === 'at-a-glance' ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                }`,
                transition: hoveredCard === 'at-a-glance'
                  ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                  : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                boxShadow: hoveredCard === 'at-a-glance'
                  ? '0 15px 35px -10px rgba(137, 170, 204, 0.25)'
                  : '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
              className="group p-6 rounded-3xl bg-surface/50 hover:bg-surface/80 border border-white/10 hover:border-white/20 backdrop-blur-md flex flex-col gap-4 shadow-xl transition-colors duration-300 cursor-default select-none"
            >
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#89AACC] group-hover:rotate-12 transition-transform duration-300" />
                  <span>At a Glance</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Verified Profile
                </span>
              </div> */}

              <div className="space-y-3 text-xs text-muted">
                <div className="flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-white/[0.04]">
                  <MapPin className="w-4 h-4 text-[#89AACC] shrink-0 mt-0.5" />
                  <span className="text-muted/90 group-hover:text-white transition-colors">
                    Based in Addis Ababa, Ethiopia <strong className="font-normal text-[#89AACC]">(Open to Remote & Relocation)</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-white/[0.04]">
                  <GraduationCap className="w-4 h-4 text-[#89AACC] shrink-0 mt-0.5" />
                  <span className="text-muted/90 group-hover:text-white transition-colors">
                    4th-year Computer Science student <strong className="font-normal text-white">(Class of &apos;27)</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-white/[0.04]">
                  <Briefcase className="w-4 h-4 text-[#89AACC] shrink-0 mt-0.5" />
                  <span className="text-muted/90 group-hover:text-white transition-colors">
                    2+ Years Production Experience across Fullstack, MERN & Cloud Systems
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Animated Milestones Track Record (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
              <span className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#89AACC]" />
                <span>Experience & Education Timeline</span>
              </span>
              <span className="text-[11px] font-mono text-[#89AACC] bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                4 Milestones
              </span>
            </div>

            <div className="space-y-4">
              {CAREER_STEPS.map((step, idx) => {
                const tilt = tiltMap[step.id] || { x: 0, y: 0 };
                const spotlight = spotlightMap[step.id] || { x: 50, y: 50 };
                const isHovered = hoveredCard === step.id;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onMouseMove={(e) => handleMouseMove(step.id, e)}
                    onMouseEnter={() => handleMouseEnter(step.id)}
                    onMouseLeave={() => handleMouseLeave(step.id)}
                    style={{
                      transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                        isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
                      }`,
                      transition: isHovered
                        ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                        : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                      boxShadow: isHovered
                        ? `0 20px 40px -10px ${step.glow}, 0 0 20px 0 ${step.glow}`
                        : '0 4px 20px rgba(0, 0, 0, 0.4)',
                    }}
                    className="group relative rounded-3xl p-6 sm:p-7 bg-surface/50 hover:bg-surface/85 border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden cursor-default select-none flex flex-col justify-between"
                  >
                    {/* 1. Dynamic Cursor Spotlight */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                      style={{
                        background: isHovered
                          ? `radial-gradient(circle 260px at ${spotlight.x}% ${spotlight.y}%, ${step.glow} 0%, transparent 75%)`
                          : 'none',
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    {/* 2. Left Glowing Indicator Bar on Hover */}
                    <div
                      className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full transition-all duration-300"
                      style={{
                        backgroundColor: step.accent,
                        boxShadow: isHovered ? `0 0 14px ${step.accent}` : 'none',
                        opacity: isHovered ? 1 : 0.3,
                      }}
                    />

                    {/* 3. Top Ambient Sheen */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none rounded-tr-3xl" />

                    <div className="relative z-10 pl-2">
                      {/* Top Header Row with Icon, Period & Organization */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{
                              borderColor: isHovered ? step.accent : undefined,
                              boxShadow: isHovered ? `0 0 15px ${step.glow}` : undefined,
                            }}
                          >
                            {step.icon}
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
                          className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 transition-colors"
                          style={{
                            color: isHovered ? step.accent : '#89AACC',
                            borderColor: isHovered ? `${step.accent}55` : undefined,
                          }}
                        >
                          {step.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted/90 leading-relaxed mb-4 mt-3">
                        {step.description}
                      </p>

                      {/* Interactive Tags Badges */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono text-muted/80 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-white/[0.08] hover:text-white"
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
