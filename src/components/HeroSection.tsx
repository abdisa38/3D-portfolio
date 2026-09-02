import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface HeroSectionProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
  isReady: boolean;
}

const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar'];
const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSeeWorks,
  onReachOut,
  isReady,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Initialize HLS Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple HLS support
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Cycle role every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Name Reveal
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      // Blur In elements
      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="home"
      ref={heroContainerRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden pt-28 pb-10 px-4 md:px-8"
    >
      {/* Background Video Layer & Immersive Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
          aria-hidden="true"
        />
        {/* Ambient video simulation radiance */}
        <div className="absolute inset-0 hero-video-sim pointer-events-none" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-75" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      {/* Decorative Side Framing Lines (Immersive UI Theme) */}
      <div className="hidden lg:flex absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 flex-col gap-12 pointer-events-none opacity-20 z-10">
        <div className="w-px h-24 bg-white/30" />
        <div className="w-px h-24 bg-white/30" />
      </div>
      <div className="hidden lg:flex absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 flex-col gap-12 pointer-events-none opacity-20 z-10">
        <div className="w-px h-24 bg-white/30" />
        <div className="w-px h-24 bg-white/30" />
      </div>

      {/* Top spacing placeholder */}
      <div className="w-full h-4" />

      {/* Hero Centered Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto my-auto py-10 px-4 sm:px-6">
        {/* Eyebrow */}
        <span
          id="hero-eyebrow"
          className="blur-in text-[10px] sm:text-xs text-muted uppercase tracking-[0.4em] mb-8 md:mb-10 font-mono font-medium block"
        >
          COLLECTION &apos;26
        </span>

        {/* Name */}
        <h1
          id="hero-name"
          className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.85] tracking-tight text-white mb-6 md:mb-8 selection:bg-white/10"
        >
          Michael Smith
        </h1>

        {/* Role line */}
        <div className="blur-in flex flex-col items-center gap-3 mb-10 md:mb-14">
          <p className="text-lg sm:text-xl md:text-2xl text-white font-light flex items-center justify-center gap-2 flex-wrap">
            <span>A</span>
            <span
              key={roleIndex}
              className="font-display italic text-2xl sm:text-3xl md:text-4xl text-white animate-role-fade-in inline-block px-1 font-normal underline decoration-[#4E85BF]/50 underline-offset-4"
            >
              {ROLES[roleIndex]}
            </span>
            <span>lives in Chicago.</span>
          </p>

          <p className="text-sm text-muted max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="blur-in flex items-center justify-center gap-4 sm:gap-5 flex-wrap">
          {/* "See Works" Solid Button */}
          <button
            id="hero-see-works-button"
            onClick={onSeeWorks}
            className="px-8 sm:px-9 py-3.5 sm:py-4 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer"
          >
            See Works
          </button>

          {/* "Reach out..." Outlined Button with Accent Gradient Border */}
          <button
            id="hero-reach-out-button"
            onClick={onReachOut}
            className="relative p-[2px] rounded-full group hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            {/* Gradient ring on hover */}
            <div className="absolute inset-0 rounded-full accent-gradient opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative px-8 sm:px-9 py-[13px] sm:py-[14px] bg-[#0a0a0a] border border-white/10 rounded-full text-sm font-semibold text-white">
              Reach out...
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        id="hero-scroll-indicator"
        className="relative z-10 flex flex-col items-center gap-3 cursor-pointer pb-2 group"
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
