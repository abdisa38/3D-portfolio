import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Download } from 'lucide-react';
import { ParticleUniverse } from './ParticleUniverse';

interface HeroSectionProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
  isReady: boolean;
}

const ROLES = ['Full-Stack Developer', 'Creative Engineer', 'Problem Solver', 'Tech Leader'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSeeWorks,
  onReachOut,
  isReady,
}) => {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [nameTilt, setNameTilt] = useState({ x: 0, y: 0 });

  // Cycle role every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Eyebrow fade in
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: -20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
        0.2
      );

      // Name reveal with scale
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out' },
        0.3
      );

      // Role & description blur-in
      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(12px)', y: 25 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.15 },
        0.6
      );

      // CTA buttons slide up
      tl.fromTo(
        '.cta-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
        1.0
      );

      // Decorative elements fade in
      tl.fromTo(
        '.hero-deco',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
        0.8
      );

      // Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.5
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, [isReady]);

  // 3D perspective tilt on name hover
  const handleNameMouseMove = (e: React.MouseEvent) => {
    if (!nameRef.current) return;
    const rect = nameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setNameTilt({ x: y, y: x });
  };

  const handleNameMouseLeave = () => {
    setNameTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      ref={heroContainerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden pt-28 pb-10 px-4 md:px-8"
    >
      {/* 3D Particle Universe Background */}
      <ParticleUniverse isReady={isReady} />

      {/* Radial gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Central dark vignette for text contrast */}
        <div className="absolute inset-0 bg-radial-gradient" />
        {/* Bottom fade to page background */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
        {/* Top subtle fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg/40 to-transparent" />
      </div>

      {/* Floating Decorative Glow Orbs */}
      <div className="hero-deco absolute top-[18%] left-[8%] w-2 h-2 rounded-full bg-[#4E85BF] blur-[2px] opacity-0 animate-float-slow pointer-events-none z-[2]" />
      <div className="hero-deco absolute top-[25%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#89AACC] blur-[1px] opacity-0 animate-float-medium pointer-events-none z-[2]" />
      <div className="hero-deco absolute bottom-[30%] left-[15%] w-1 h-1 rounded-full bg-[#6BA3D6] blur-[1px] opacity-0 animate-float-fast pointer-events-none z-[2]" />
      <div className="hero-deco absolute top-[40%] right-[6%] w-2.5 h-2.5 rounded-full bg-[#4E85BF]/60 blur-[3px] opacity-0 animate-float-slow pointer-events-none z-[2]" />
      <div className="hero-deco absolute bottom-[35%] right-[20%] w-1 h-1 rounded-full bg-[#89AACC] blur-[1px] opacity-0 animate-float-medium pointer-events-none z-[2]" />
      <div className="hero-deco absolute top-[60%] left-[5%] w-1.5 h-1.5 rounded-full bg-[#4E85BF]/40 blur-[2px] opacity-0 animate-float-fast pointer-events-none z-[2]" />

      {/* Side Framing Lines */}
      <div className="hidden lg:flex absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 flex-col gap-10 pointer-events-none opacity-15 z-[2]">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#4E85BF]/40 to-transparent" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#89AACC]/30 to-transparent" />
      </div>
      <div className="hidden lg:flex absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 flex-col gap-10 pointer-events-none opacity-15 z-[2]">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#89AACC]/30 to-transparent" />
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#4E85BF]/40 to-transparent" />
      </div>

      {/* Top spacing */}
      <div className="w-full h-4" />

      {/* Hero Centered Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto my-auto py-10 px-4 sm:px-6">
        {/* Eyebrow */}
        <span
          id="hero-eyebrow"
          className="hero-eyebrow text-[10px] sm:text-xs text-muted uppercase tracking-[0.4em] mb-8 md:mb-10 font-mono font-medium block"
        >
          CREATIVE PORTFOLIO &apos;26
        </span>

        {/* Name with 3D tilt */}
        <h1
          id="hero-name"
          ref={nameRef}
          onMouseMove={handleNameMouseMove}
          onMouseLeave={handleNameMouseLeave}
          className="name-reveal text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] sm:leading-[0.85] tracking-tight text-white mb-6 md:mb-8 selection:bg-white/10 cursor-default transition-transform duration-200 ease-out text-center break-words max-w-full px-2"
          style={{
            transform: `perspective(1000px) rotateX(${nameTilt.x}deg) rotateY(${nameTilt.y}deg)`,
            textShadow: '0 0 80px rgba(78, 133, 191, 0.15)',
          }}
        >
          Abdisa Awel
        </h1>

        {/* Role line */}
        <div className="blur-in flex flex-col items-center gap-4 mb-10 md:mb-14 px-2">
          <p className="text-base sm:text-xl md:text-2xl text-white font-light flex items-center justify-center gap-2 flex-wrap text-center">
            <span>A</span>
            <span
              key={roleIndex}
              className="font-display italic text-2xl sm:text-3xl md:text-4xl text-white animate-role-fade-in inline-block px-1 font-normal"
              style={{
                background: 'linear-gradient(90deg, #89AACC, #4E85BF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {ROLES[roleIndex]}
            </span>
            <span>based in Addis Ababa.</span>
          </p>

          <p className="blur-in text-sm text-muted max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Passionate Full-Stack Developer crafting elegant web experiences,
            scalable architectures, and pixel-perfect interfaces that bring
            ideas to life.
          </p>
        </div>

        {/* CTA Buttons with Glassmorphism */}
        <div className="cta-buttons flex items-center justify-center gap-4 sm:gap-5 flex-wrap">
          {/* "See Works" — Glassmorphism Solid Button */}
          <button
            id="hero-see-works-button"
            onClick={onSeeWorks}
            className="group relative px-8 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Glow background */}
            <div className="absolute inset-0 rounded-full bg-white opacity-100 group-hover:opacity-90 transition-opacity" />
            {/* Hover glow ring */}
            <div className="absolute -inset-1 rounded-full bg-[#4E85BF]/0 group-hover:bg-[#4E85BF]/20 blur-lg transition-all duration-500" />
            <span className="relative z-10 text-black group-hover:text-black">See Works</span>
          </button>

          {/* "Download Resume" — Glassmorphism Action Button */}
          <a
            id="hero-download-resume-button"
            href="/assets/Abdisa_Awel_Tahir_Resume.pdf"
            download="Abdisa_Awel_Tahir_Resume.pdf"
            className="group relative p-[1.5px] rounded-full transition-all duration-300 cursor-pointer"
          >
            {/* Animated gradient ring */}
            <div className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500 glass-border-gradient" />
            {/* Inner glass panel */}
            <div className="relative px-8 sm:px-9 py-[13px] sm:py-[14px] rounded-full text-sm font-semibold text-white backdrop-blur-md bg-white/5 border border-white/10 group-hover:border-transparent group-hover:bg-white/10 transition-all duration-300 flex items-center gap-2.5">
              <Download className="w-4 h-4 text-[#89AACC] group-hover:translate-y-0.5 transition-transform duration-300" />
              <span>Download Resume</span>
            </div>
            {/* Outer glow on hover */}
            <div className="absolute -inset-2 rounded-full bg-[#4E85BF]/0 group-hover:bg-[#4E85BF]/10 blur-xl transition-all duration-500 pointer-events-none" />
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        id="hero-scroll-indicator"
        className="scroll-indicator relative z-10 flex flex-col items-center gap-3 cursor-pointer pb-2 group"
        onClick={() => {
          const el = document.getElementById('work');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] text-muted tracking-[0.3em] font-mono font-medium group-hover:text-white transition-colors">
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/3 accent-gradient"
            style={{ animation: 'scroll-line 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
};
