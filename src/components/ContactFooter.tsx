import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Copy, Check, ArrowUpRight, Mail, Github, Linkedin, Send } from 'lucide-react';

interface ContactChannel {
  name: string;
  handle: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  badge: string;
  accent: string;
  glow: string;
  hoverBorder: string;
}

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    name: 'GitHub',
    handle: '@abdisa38',
    description: '90+ Repositories, open source projects & active commits',
    url: 'https://github.com/abdisa38',
    icon: <Github className="w-6 h-6 text-white group-hover:scale-110 group-hover:text-white transition-all duration-300" />,
    badge: 'Code & Builds',
    accent: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.22)',
    hoverBorder: 'hover:border-white/50',
  },
  {
    name: 'LinkedIn',
    handle: 'in/abdisa-awel',
    description: 'Professional experience, leadership roles & recommendations',
    url: 'https://www.linkedin.com/in/abdisa-awel-92b963383/',
    icon: <Linkedin className="w-6 h-6 text-[#89AACC] group-hover:scale-110 group-hover:text-[#38bdf8] transition-all duration-300" />,
    badge: 'Network',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.3)',
    hoverBorder: 'hover:border-sky-500/50',
  },
  {
    name: 'Telegram',
    handle: '@bdisa38',
    description: 'Direct instant messaging for quick chats & collaborations',
    url: 'https://t.me/bdisa38',
    icon: <Send className="w-6 h-6 text-[#6BA3D6] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all duration-300" />,
    badge: 'Instant Chat',
    accent: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.3)',
    hoverBorder: 'hover:border-cyan-500/50',
  },
  {
    name: 'Email',
    handle: 'abdisaawel82@gmail.com',
    description: 'Formal inquiries, technical roles & project proposals',
    url: 'mailto:abdisaawel82@gmail.com',
    icon: <Mail className="w-6 h-6 text-rose-400 group-hover:scale-110 group-hover:text-rose-300 transition-all duration-300" />,
    badge: 'Direct Mail',
    accent: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.3)',
    hoverBorder: 'hover:border-rose-500/50',
  },
];

export const ContactFooter: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [tiltMap, setTiltMap] = useState<Record<string, { x: number; y: number }>>({});
  const [spotlightMap, setSpotlightMap] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // GSAP Infinite Continuous Marquee
  useEffect(() => {
    const marqueeTrack = marqueeRef.current;
    if (!marqueeTrack) return;

    const tween = gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('abdisaawel82@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMouseMove = (name: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = ((y / rect.height) - 0.5) * -16;
    const tiltY = ((x / rect.width) - 0.5) * 16;

    setTiltMap((prev) => ({ ...prev, [name]: { x: tiltX, y: tiltY } }));
    setSpotlightMap((prev) => ({
      ...prev,
      [name]: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 },
    }));
  };

  const handleMouseEnter = (name: string) => {
    setHoveredCard(name);
  };

  const handleMouseLeave = (name: string) => {
    setHoveredCard(null);
    setTiltMap((prev) => ({ ...prev, [name]: { x: 0, y: 0 } }));
  };

  const marqueeText = Array(8).fill('FULL-STACK ENGINEERING • MODERN INTERFACES • ENTERPRISE ARCHITECTURES • CLEAN CODE • ').join('');

  return (
    <footer
      id="contact"
      className="relative bg-bg/75 backdrop-blur-md pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden border-t border-stroke/40"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-gradient pointer-events-none opacity-60" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(78,133,191,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/80 border border-white/10 backdrop-blur-md mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          {/* <span className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
            Available For Opportunities
          </span> */}
        </div>

        {/* Big Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-text-primary mb-6 max-w-4xl leading-[1.05]">
          Let&apos;s build something <br className="hidden sm:inline" />
          <span
            className="font-display italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 60%, #89AACC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            extraordinary together.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-muted max-w-xl mb-10 md:mb-12 leading-relaxed">
          Currently open for full-stack engineering roles, scalable web applications, and high-impact digital ventures. Whether you have a project idea, a position to fill, or just want to say hi — I&apos;ll get back to you!
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 sm:mb-20">
          {/* Main "Say Hello" button */}
          <a
            id="footer-email-button"
            href="mailto:abdisaawel82@gmail.com"
            className="group relative inline-flex rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105 cursor-pointer shadow-2xl"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-90 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
            <span className="relative z-10 inline-flex items-center gap-3 bg-white text-black hover:bg-white/95 rounded-full px-8 sm:px-10 py-4 text-sm sm:text-base font-semibold transition-all">
              <Mail className="w-4 h-4 text-[#4E85BF]" />
              <span>Say Hello</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          {/* Quick Copy Action */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-muted hover:text-text-primary bg-surface/70 hover:bg-surface border border-white/10 rounded-full px-5 py-3.5 transition-all cursor-pointer backdrop-blur-sm"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied: abdisaawel82@gmail.com</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy email address</span>
              </>
            )}
          </button>
        </div>

        {/* 4-Card 3D Interactive Social & Contact Channels Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {CONTACT_CHANNELS.map((channel) => {
            const tilt = tiltMap[channel.name] || { x: 0, y: 0 };
            const spotlight = spotlightMap[channel.name] || { x: 50, y: 50 };
            const isHovered = hoveredCard === channel.name;

            return (
              <a
                key={channel.name}
                href={channel.url}
                target={channel.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                onMouseMove={(e) => handleMouseMove(channel.name, e)}
                onMouseEnter={() => handleMouseEnter(channel.name)}
                onMouseLeave={() => handleMouseLeave(channel.name)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
                    isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
                  }`,
                  transition: isHovered
                    ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
                    : 'transform 0.5s ease-out, box-shadow 0.5s ease',
                  boxShadow: isHovered
                    ? `0 20px 45px -10px ${channel.glow}, 0 0 25px 0 ${channel.glow}`
                    : '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
                className={`group relative text-left rounded-3xl p-6 sm:p-7 bg-surface/60 hover:bg-surface/90 border border-white/10 ${channel.hoverBorder} backdrop-blur-md transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer select-none`}
              >
                {/* 1. Real-time Cursor Spotlight */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle 240px at ${spotlight.x}% ${spotlight.y}%, ${channel.glow} 0%, transparent 75%)`
                      : 'none',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* 2. Top-Right Ambient Sheen */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white/[0.04] to-transparent pointer-events-none rounded-tr-3xl" />

                <div className="relative z-10">
                  {/* Header with icon and badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                      style={{
                        borderColor: isHovered ? channel.accent : undefined,
                        boxShadow: isHovered ? `0 0 15px ${channel.glow}` : undefined,
                      }}
                    >
                      {channel.icon}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted group-hover:text-white bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/5 transition-colors">
                      {channel.badge}
                    </span>
                  </div>

                  {/* Channel Name */}
                  <h3 className="text-lg font-medium text-text-primary group-hover:text-white mb-1 flex items-center justify-between transition-colors">
                    <span>{channel.name}</span>
                    <ArrowUpRight
                      className="w-4 h-4 text-muted group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      style={{ color: isHovered ? channel.accent : undefined }}
                    />
                  </h3>

                  {/* Handle */}
                  <p
                    className="text-xs font-mono mb-3 transition-colors"
                    style={{ color: isHovered ? channel.accent : '#89AACC' }}
                  >
                    {channel.handle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-muted/90 group-hover:text-muted leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                {/* Bottom connect prompt */}
                <div className="relative z-10 pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-muted/80 group-hover:text-white font-medium transition-colors">
                  <span>Open {channel.name}</span>
                  <span className="text-[11px] font-mono group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* GSAP Continuous Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden py-4 my-6 border-y border-stroke/40 bg-surface/30 backdrop-blur-sm select-none">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap will-change-transform text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-muted/60"
        >
          <span className="inline-block px-4">{marqueeText}</span>
          <span className="inline-block px-4">{marqueeText}</span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Availability location */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Addis Ababa, Ethiopia &middot; Open to Worldwide Remote & Relocation</span>
        </div>

        {/* Quick Social links */}
        <div className="flex items-center gap-5 sm:gap-6 flex-wrap justify-center">
          {CONTACT_CHANNELS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noreferrer"
              className="text-xs font-mono text-muted hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-muted/70">
          <span>&copy; 2026 Abdisa Awel Tahir. Crafted with care.</span>
        </div>
      </div>
    </footer>
  );
};
