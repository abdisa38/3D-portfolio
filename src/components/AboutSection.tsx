import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

interface CareerStep {
  period: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
}

const CAREER_STEPS: CareerStep[] = [
  {
    period: 'Freshman - 2nd Year',
    role: 'Foundations & Bootcamp Immersion',
    organization: 'Evangadi Tech & Wabiskills',
    description:
      'Began my software engineering journey at university, completing an intensive 6 month full-stack immersion across the Evangadi Full-Stack Bootcamp and WabiSkills mastering core computer science, modern JavaScript, and MERN stack architectures.',
    tags: ['Full-Stack', 'React', 'Node.js', 'Database Design'],
  },
  {
    period: '2025',
    role: 'Backend Engineering Intern',
    organization: 'Kuraz Technologies',
    description:
      'Worked with the core backend team building REST APIs in Node.js/Express. Audited MongoDB aggregation queries and added compound indexes to lower endpoint latency by 30%.',
    tags: ['Node.js', 'Express', 'MongoDB Aggregation', 'API Performance'],
  },
  {
    period: '3rd Year - Present',
    role: 'CTC Software Development Leader @ MWU',
    organization: 'Software Development Leader',
    description:
      'Appointed Software Development Leader for the CTC Club at Madda Walabu University. Directing system architecture, conducting code reviews, and mentoring fellow student engineers in production engineering standards.',
    tags: ['Tech Leadership', 'Code Reviews', 'MERN Stack', 'Socket.io'],
  },
  {
    period: '4th Year & Beyond',
    role: 'AI Engineering & Autonomous Systems',
    organization: 'Madda Walabu University',
    description:
      'Advanced into specialized AI Engineering via ScrimbaAI Engineer program. Actively architecting large scale intelligent systems, LLM powered autonomous agents, vector search pipelines, and cutting edge software.',
    tags: [],
  },
];


export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative bg-bg/80 backdrop-blur-sm py-16 md:py-24 border-t border-stroke/40 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(78,133,191,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(137,170,204,0.05)_0%,_transparent_70%)] pointer-events-none" />

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
          {/* Left Column: Profile & Quick Facts (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Portrait Frame Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl p-2 bg-surface/70 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20"
            >
              <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] rounded-2xl overflow-hidden bg-bg">
                <img
                  src="/assets/Abdisa Awel profile.jpg"
                  alt="Abdisa Awel Tahir"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-90" />

                {/* Status Badge */}
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-white/90">Available for Opportunities</span>
                </div>

                {/* Profile info on card bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col">
                  <span className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                    Abdisa Awel Tahir
                  </span>
                  <span className="text-xs font-mono text-[#89AACC] mt-0.5">
                    Full-Stack Developer & CTC Tech Lead
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Context Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-5 rounded-2xl bg-surface/40 border border-white/10 backdrop-blur-md flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" />
                <span>At a Glance</span>
              </div>
              <div className="space-y-2 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-text-primary/70 shrink-0" />
                  <span>Based in Addis Ababa, Ethiopia (Open to Remote & Relocation)</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-text-primary/70 shrink-0" />
                  <span>I am a 4th-year Computer Science student (Class of &apos;27)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-text-primary/70 shrink-0" />
                  <span>2+ Years Production Experience across MERN, Python & Cloud</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Track Record / Career Journey (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Experience & Education
              </span>
              <span className="text-[11px] font-mono text-[#89AACC]">
                4 Milestones
              </span>
            </div>

            <div className="space-y-3.5">
              {CAREER_STEPS.map((step, idx) => (
                <motion.div
                  key={step.role + step.organization}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-4 sm:p-5 rounded-2xl bg-surface/40 hover:bg-surface/70 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-base font-medium text-text-primary">
                      {step.role}
                    </span>
                    <span className="text-[11px] font-mono text-[#89AACC] px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                      {step.period}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-muted mb-2">
                    {step.organization}
                  </p>

                  <p className="text-xs sm:text-sm text-muted/90 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-muted/80 bg-white/[0.03] border border-white/5 px-2.5 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
